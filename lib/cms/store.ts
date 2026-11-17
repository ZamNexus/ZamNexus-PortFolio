import { promises as fs } from "node:fs";
import path from "node:path";
import { buildSeed } from "./seed";
import { assertShape, StorageUnavailableError, type StorageStatus } from "./store-shared";
import { databaseUrl, pgMutate, pgRead, pgStatus } from "./store-postgres";
import type { CmsData } from "./types";

// Persistent storage for articles and categories. Two drivers, chosen by the environment:
//
// - Postgres, when a database URL is set (CMS_DATABASE_URL, DATABASE_URL or POSTGRES_URL). This is what a
//   serverless host such as Vercel needs, and it is the production setup. See store-postgres.ts.
// - A JSON file on disk otherwise (data/cms.json, or CMS_DATA_FILE), written atomically (temp file, then
//   rename) with writes queued one at a time. Good for local work and for servers with a durable disk. On a
//   read-only disk every write fails loudly with StorageUnavailableError instead of pretending to succeed.
//
// The rest of the CMS only uses readData, mutate and storageStatus, so it behaves the same on either driver.

export { StorageUnavailableError };
export type { StorageStatus };

export const usingDatabase = () => !!databaseUrl();

// The data folder is a runtime location (it can be moved with CMS_DATA_FILE), not part of the build, so the file
// calls below are marked turbopackIgnore: otherwise Next would trace the whole project into the server bundle.
export const dataFile = () => process.env.CMS_DATA_FILE || path.join(process.cwd(), "data", "cms.json");
export const uploadsDir = () => process.env.CMS_UPLOADS_DIR || path.join(process.cwd(), "data", "uploads");

// Reads the whole store. If nothing has been saved yet, the seven original articles are returned from memory
// (and written by the first save), so a fresh install shows the same site as before.
export async function readData(): Promise<{ data: CmsData; persisted: boolean }> {
  if (usingDatabase()) return pgRead();
  try {
    const parsed: unknown = JSON.parse(await fs.readFile(/*turbopackIgnore: true*/ dataFile(), "utf8"));
    assertShape(parsed, dataFile());
    return { data: parsed, persisted: true };
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "ENOENT") return { data: buildSeed(), persisted: false };
    throw e;
  }
}

async function writeFileData(data: CmsData): Promise<void> {
  const file = dataFile();
  const tmp = `${file}.${process.pid}.tmp`;
  try {
    await fs.mkdir(/*turbopackIgnore: true*/ path.dirname(file), { recursive: true });
    await fs.writeFile(/*turbopackIgnore: true*/ tmp, JSON.stringify(data, null, 2), "utf8");
    await fs.rename(/*turbopackIgnore: true*/ tmp, file);
  } catch (e) {
    await fs.rm(/*turbopackIgnore: true*/ tmp, { force: true }).catch(() => undefined);
    const code = (e as NodeJS.ErrnoException).code ?? "unknown";
    throw new StorageUnavailableError(
      `Content storage is not writable here (${code}). Connect a database (DATABASE_URL), or run the site where its data folder is writable.`
    );
  }
}

// File writes are serialised through this chain. A failed write rejects its own caller but never blocks the next one.
let chain: Promise<unknown> = Promise.resolve();

export function mutate<T>(change: (data: CmsData) => T | Promise<T>): Promise<T> {
  if (usingDatabase()) return pgMutate(change);
  const run = chain.then(async () => {
    const { data } = await readData();
    const result = await change(data);
    await writeFileData(data);
    return result;
  });
  chain = run.catch(() => undefined);
  return run;
}

export async function storageStatus(): Promise<StorageStatus> {
  if (usingDatabase()) return pgStatus();
  const { persisted } = await readData();
  let writable = true;
  try {
    const dir = path.dirname(dataFile());
    await fs.mkdir(/*turbopackIgnore: true*/ dir, { recursive: true });
    await fs.access(/*turbopackIgnore: true*/ dir, fs.constants.W_OK);
  } catch {
    writable = false;
  }
  return { driver: "JSON file", location: path.relative(process.cwd(), dataFile()) || dataFile(), persisted, writable };
}
