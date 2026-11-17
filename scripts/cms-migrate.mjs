// Copies the Insights content from this machine (data/cms.json and the images in data/uploads) into the
// production database and image store. Run it once, when you first connect a database:
//
//   node --env-file=.env.production.local scripts/cms-migrate.mjs            (copy, refuses to overwrite)
//   node --env-file=.env.production.local scripts/cms-migrate.mjs --force    (replace what the database holds)
//
// It needs a database URL (CMS_DATABASE_URL, DATABASE_URL or POSTGRES_URL) and, to copy images, a Vercel Blob
// token (BLOB_READ_WRITE_TOKEN). Without a local data/cms.json there is nothing to copy: the database stores the
// seven original articles by itself on the first save from the admin panel.

import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import postgres from "postgres";
import { put } from "@vercel/blob";

const force = process.argv.includes("--force");
const url = process.env.CMS_DATABASE_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL;
const dataFile = process.env.CMS_DATA_FILE || path.join(process.cwd(), "data", "cms.json");
const uploads = process.env.CMS_UPLOADS_DIR || path.join(process.cwd(), "data", "uploads");
const access = process.env.CMS_BLOB_ACCESS === "private" ? "private" : "public";
const TYPES = { png: "image/png", jpg: "image/jpeg", webp: "image/webp", gif: "image/gif" };

const stop = (message) => {
  console.error(message);
  process.exit(1);
};

if (!url) stop("No database URL. Set CMS_DATABASE_URL, DATABASE_URL or POSTGRES_URL (for example with --env-file).");
if (!existsSync(dataFile)) stop(`Nothing to copy: ${dataFile} does not exist. The database will store the original articles on its first save.`);

const data = JSON.parse(readFileSync(dataFile, "utf8"));
if (data?.version !== 1 || !Array.isArray(data.articles) || !Array.isArray(data.categories)) stop(`${dataFile} is not in the expected format.`);

// Every image an article points at, so only what is used is copied.
const text = JSON.stringify(data);
const images = [...new Set(text.match(/\/media\/[a-f0-9]{32}\.(png|jpg|webp|gif)/g) ?? [])].map((u) => u.slice("/media/".length));

const sql = postgres(url, { max: 1, prepare: false, onnotice: () => undefined });
try {
  await sql`create table if not exists cms_store (id text primary key, data jsonb not null, updated_at timestamptz not null default now())`;
  const [existing] = await sql`select jsonb_array_length(data->'articles') as articles from cms_store where id = 'main'`;
  if (existing && !force) {
    stop(`The database already holds ${existing.articles} articles. Nothing was changed. Run again with --force to replace them with the ${data.articles.length} from this machine.`);
  }

  if (images.length) {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      stop(`${images.length} article images need copying, but BLOB_READ_WRITE_TOKEN is not set. Nothing was changed.`);
    }
    for (const name of images) {
      const file = path.join(uploads, name);
      if (!existsSync(file)) stop(`Image ${name} is used by an article but missing from ${uploads}. Nothing was changed in the database.`);
      await put(`media/${name}`, readFileSync(file), { access, contentType: TYPES[name.split(".").pop()], addRandomSuffix: false, allowOverwrite: true });
      console.log(`copied image ${name}`);
    }
  }

  await sql`insert into cms_store (id, data) values ('main', ${JSON.stringify(data)}::text::jsonb)
            on conflict (id) do update set data = excluded.data, updated_at = now()`;
  const published = data.articles.filter((a) => a.status === "published").length;
  console.log(`Copied ${data.articles.length} articles (${published} published), ${data.categories.length} categories and ${images.length} images.`);
  console.log("Redeploy, or publish any change in the admin panel, so the public pages pick up the new content.");
} finally {
  await sql.end({ timeout: 5 });
}
