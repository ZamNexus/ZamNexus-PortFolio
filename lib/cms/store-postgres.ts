import postgres from "postgres";
import { buildSeed } from "./seed";
import { assertShape, StorageUnavailableError, type StorageStatus } from "./store-shared";
import type { CmsData } from "./types";

// Postgres storage, for hosts without a durable disk (Vercel, containers without a volume). The whole content
// document lives in one row as JSON, so the rest of the CMS works exactly as it does with the file store. Every
// change runs in a transaction that locks that row first, so two administrators saving at once are applied one
// after the other, even across separate serverless instances.
//
// Connection string: CMS_DATABASE_URL, or the DATABASE_URL / POSTGRES_URL that Vercel's Postgres integrations
// (Neon, Supabase) set. Use the pooled connection string on serverless hosts.

const TABLE = "cms_store";
const ROW = "main";

export function databaseUrl(): string | undefined {
  return process.env.CMS_DATABASE_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL || undefined;
}

let client: ReturnType<typeof postgres> | null = null;
let ready: Promise<void> | null = null;

function db() {
  if (!client) {
    const url = databaseUrl();
    if (!url) throw new StorageUnavailableError("No database is configured.");
    client = postgres(url, {
      max: Number(process.env.CMS_DB_POOL_MAX) || 3,
      idle_timeout: 20,
      connect_timeout: 10,
      // pooled connection strings (PgBouncer, Neon pooler) do not support prepared statements
      prepare: false,
      onnotice: () => undefined,
    });
  }
  return client;
}

// Creates the table the first time this process touches the database.
function ensureTable(): Promise<void> {
  if (!ready) {
    ready = db()
      .unsafe(`create table if not exists ${TABLE} (id text primary key, data jsonb not null, updated_at timestamptz not null default now())`)
      .then(() => undefined)
      .catch((e: unknown) => {
        ready = null;
        throw e;
      });
  }
  return ready;
}

function unavailable(e: unknown): never {
  if (e instanceof StorageUnavailableError) throw e;
  const reason = e instanceof Error ? e.message : String(e);
  throw new StorageUnavailableError(`The content database could not be reached (${reason.slice(0, 120)}). Nothing was changed.`);
}

function parse(text: string): CmsData {
  const parsed: unknown = JSON.parse(text);
  assertShape(parsed, `the ${TABLE} table`);
  return parsed;
}

export async function pgRead(): Promise<{ data: CmsData; persisted: boolean }> {
  await ensureTable();
  const rows = await db()<{ data: string }[]>`select data::text as data from cms_store where id = ${ROW}`;
  if (!rows.length) return { data: buildSeed(), persisted: false };
  return { data: parse(rows[0].data), persisted: true };
}

export async function pgMutate<T>(change: (data: CmsData) => T | Promise<T>): Promise<T> {
  try {
    await ensureTable();
  } catch (e) {
    unavailable(e);
  }
  let failedInChange = false;
  try {
    return (await db().begin(async (tx) => {
      // the first save stores the seed, so the original articles are kept
      await tx`insert into cms_store (id, data) values (${ROW}, ${JSON.stringify(buildSeed())}::text::jsonb) on conflict (id) do nothing`;
      const rows = await tx<{ data: string }[]>`select data::text as data from cms_store where id = ${ROW} for update`;
      const data = parse(rows[0].data);
      let result: T;
      try {
        result = await change(data);
      } catch (e) {
        failedInChange = true;
        throw e;
      }
      await tx`update cms_store set data = ${JSON.stringify(data)}::text::jsonb, updated_at = now() where id = ${ROW}`;
      return result;
    })) as T;
  } catch (e) {
    // a validation or not-found error from the change itself is passed on as it is; anything else is the database
    if (failedInChange) throw e;
    unavailable(e);
  }
}

export async function pgStatus(): Promise<StorageStatus> {
  let persisted = false;
  let writable = true;
  try {
    persisted = (await pgRead()).persisted;
    await db()`select 1`;
  } catch {
    writable = false;
  }
  return { driver: "Postgres", location: `the ${TABLE} table in your database`, persisted, writable };
}
