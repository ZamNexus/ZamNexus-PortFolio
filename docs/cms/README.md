# Insights CMS and Admin Panel

The Insights page is no longer built from a code file. Articles live in a persistent store, are managed from a
protected admin panel at `/admin`, and the public site reads from the same store. Publishing, unpublishing, editing
or deleting an article changes the public Insights page, its counts, the article pages, the sitemap and the home
page teaser, with no code change and no rebuild.

## What is verified, and how

| Claim | How it was checked |
| --- | --- |
| The full scenario works: 7 articles, sign in, create, draft is private, publish (count 8), article page opens, edit shows publicly, unpublish (count 7), delete, sign out | A script drives the real admin UI in headless Edge and fetches the public pages as an anonymous visitor after every step. 54 checks, 0 failures. |
| It works in production mode, not only in dev | The same 54 checks pass against `next build` + `next start`, so the live update comes from on-demand revalidation, not from dev-mode recompiling. |
| The API refuses unauthorised and malformed requests | 64 HTTP checks (401 without a session, 403 for cross-site writes, validation, duplicate slugs, uploads, status transitions). |
| Admin pages fit phone width, both themes | Measured at 390 px (no horizontal overflow on any admin page) and screenshotted in dark and light. |

Not verified: behaviour on a read-only or serverless host (see "Hosting" below), and any browser other than Edge.

## How a change reaches the public site

1. The admin panel calls `/api/admin/...`. Every handler re-checks the session on the server.
2. The change is written to the store (`lib/cms/repository.ts`, then `lib/cms/store.ts`).
3. Only after the write succeeds, the handler calls `revalidatePath` for `/insights` (and its article pages), `/`
   and `/sitemap.xml`. The next visitor gets fresh pages.
4. A failed write returns an error and the status does not change, so a failed publish can never show as published.

Public pages also use `revalidate = 300` as a safety net. That is what makes a **scheduled** article appear on its
own: it becomes public within five minutes of its publish time.

"Public" has one definition (`isPublic` in `lib/cms/status.ts`): status is `published` and the publish time has
arrived. Drafts, unpublished and still-scheduled articles are not served, not listed, not in the sitemap and not
counted.

## Setup

1. Generate credentials (the password is never taken from the command line):

   ```powershell
   $env:ADMIN_PASSWORD = "a password of 12+ characters"; node scripts/hash-password.mjs
   ```

   Leave `ADMIN_PASSWORD` unset to have a strong one generated and shown once.
2. Put the three printed values in `.env.local` (and in your host's environment variables). Never commit them.

| Variable | Purpose |
| --- | --- |
| `ADMIN_EMAIL` | The one administrator's sign-in email. |
| `ADMIN_PASSWORD_HASH` | scrypt hash (`scrypt:N:r:p:salt:hash`). The plain password is stored nowhere. |
| `ADMIN_SESSION_SECRET` | 32+ random characters; signs the session cookie. Changing it signs everyone out. |
| `CMS_DATA_FILE` | Optional. Where the content file lives. Default `data/cms.json`. |
| `CMS_UPLOADS_DIR` | Optional. Where uploaded images live. Default `data/uploads`. |

Until all three admin variables are set, sign-in returns 503 and the panel stays closed.

3. Run the site and open `/admin/login`.

The first time, the store is empty on disk, so the original seven articles are served from memory and written to
`data/cms.json` by the first save. A fresh checkout therefore looks exactly like the site did before the CMS.
`data/` is in `.gitignore`: content is runtime data, not source.

## Security model

- **One administrator, no registration.** There is no sign-up route and no public way to create an account.
- **Passwords:** scrypt with a per-hash salt; the comparison always does the full derivation.
- **Sessions:** HMAC-signed cookie `zn_admin`, `HttpOnly`, `SameSite=Strict`, `Secure` in production, 8 hours.
- **Layers:** `proxy.ts` redirects anonymous visitors, the panel layout calls `requireAdminPage()`, and every API
  handler calls `authorizeAdminRequest()`. Removing any one layer does not open the panel.
- **Cross-site requests:** every mutating call must carry a same-site `Origin`.
- **Brute force:** sign-in is rate limited per client address.
- **Secrets:** read only on the server; nothing is sent to the browser.
- **Search engines:** `/admin` is `noindex` and disallowed in `robots.txt`.
- **Content safety:** article bodies are stored as structured JSON and checked against a whitelist (allowed node
  and mark types, link schemes `http`, `https`, `mailto`, relative and `#`, images only from `/media/`). They are
  rendered by our own component, never as raw HTML.
- **Uploads:** 5 MB maximum; type decided from the file's first bytes (PNG, JPG, WebP, GIF); SVG refused; stored
  under a content-hash name; served with `nosniff` and a restrictive CSP.

## Admin routes

| Route | Purpose |
| --- | --- |
| `/admin/login` | Sign in |
| `/admin/dashboard` | Total, published, draft and unpublished counts from the store, recent articles |
| `/admin/articles` | Search, filter by status and category, paginate; publish, unpublish, preview, delete (with confirmation) |
| `/admin/articles/create` | Editor |
| `/admin/articles/edit/[id]` | Editor for an existing article |
| `/admin/categories` | Add, rename, delete (blocked while articles use it) |
| `/admin/settings` | Storage status and how the panel is configured |
| `/admin/preview/[id]` | Admin-only preview of any article, including drafts |

The editor has title, slug (from title, editable, unique), short description, cover image, author, category, tags,
featured flag, scheduled publication, SEO title, SEO description and social image, and a rich text body: H1 to H3,
paragraphs, bold, italic, lists, links, blockquotes, code blocks, horizontal rules, and images with captions.

**Section blocks** (toolbar button **+ Block**) are the same sections the original seven articles are built from, so
every article on the site looks the same:

| Block | Shows | On the page |
| --- | --- | --- |
| Key figures | two to four numbers with a label | H2 and a row of figures |
| Problem and fix | the problem and its business impact beside the fix and its main points | two cards, each title an H2 |
| Steps | two to six steps | an H2, the drawn flow, and each step as an H3 |
| Key takeaways | up to six points and the technologies used | H2, the points and technology chips |

Each block is a small form inside the text, with buttons to move it up or down or remove it. Blocks always sit at
the top level of the article (never inside a list or quote). Empty rows are kept while writing and left out on the
site. Both kinds of article draw these sections with the same components (`components/article/ArticleBlocks.tsx`);
the block definitions and limits are in `lib/cms/blocks.ts`.

## API reference

All routes require a valid admin session (401 otherwise); writes also require a same-site `Origin` (403).
Errors are `{ "error": string, "fields"?: { name: message } }`.

| Method and path | Purpose |
| --- | --- |
| `POST /api/admin/login` | Body `{ email, password }`. Sets the session cookie. Not session-protected; rate limited. |
| `POST /api/admin/logout` | Clears the cookie. |
| `GET /api/admin/articles` | Query `q`, `status`, `category`, `page`, `pageSize`. Returns `{ items, total, page, pages, pageSize }`. |
| `POST /api/admin/articles` | Create. Always starts as a draft. |
| `GET /api/admin/articles/[id]` | One article. |
| `PUT /api/admin/articles/[id]` | Update. A live article must stay complete. |
| `DELETE /api/admin/articles/[id]` | Delete. |
| `POST /api/admin/articles/[id]/status` | Body `{ action: "publish" \| "unpublish" \| "draft", publishedAt? }`. Publish re-validates first. |
| `GET/POST /api/admin/categories` | List, create. |
| `PUT/DELETE /api/admin/categories/[id]` | Rename, delete (409 if in use). |
| `POST /api/admin/upload` | `multipart/form-data` with `file`. Returns `{ url: "/media/<hash>.<ext>" }`. |
| `GET /media/[name]` | Public. Serves uploaded images. |

Status codes: 401 no session, 403 cross-site write, 404 not found, 409 conflict (duplicate slug or category in
use), 413 file too large, 415 unsupported image type, 422 validation, 429 too many sign-in attempts, 503 storage
not writable or admin not configured.

An article is ready to publish when it has a title, a valid slug, a description of at least 20 characters, body
content, an author and an existing category.

## Public behaviour

- `/insights`: published articles only, newest first, category filters with live counts (categories with no
  published article are hidden), cover thumbnails and descriptions, one featured article.
- `/insights/[slug]`: cover, title, category, author, date, reading time, body, related articles, back link. A
  draft, unpublished, scheduled or deleted slug returns 404.
- The original seven articles keep their structured "blueprint" layout. Articles written in the panel use the same
  frame and, through the section blocks, the same sections, plus the same "In this article" contents list on wide
  screens (built from the H2s and blocks, shown when there are at least two). Both follow the light and dark themes.
- Sitemap, `generateStaticParams`, Open Graph images, structured data and the home page teaser all read the store.

## SEO features

- **Checklist in the editor** (`lib/cms/seo-check.ts`). Enter a focus keyword and the SEO panel scores the article
  out of 12 as you type: keyword in the page title, address, description, first paragraph and a sub-heading; title
  30–60 and description 120–155 characters; at least 900 words; at least two sub-headings and no H1 in the text
  (the title is the page's H1); every image described; at least two links to other ZamNexus pages. It advises; it
  never blocks publishing. The panel also shows the article as it will look in Google.
- **Topic pages** at `/insights/topic/<category>` (`app/insights/topic/[id]/page.tsx`), one per category with at least
  one published article: their own title, Google description, introduction, article list, breadcrumb structured
  data and links to the other topics. They are in the sitemap, and every article's breadcrumb links to its topic.
  Write each introduction under **Categories → Edit** in the admin panel (120 to 155 characters works best);
  without one, the page uses a generic line. A new install starts with introductions for the five original topics.
- **Section blocks are plain HTML for search engines.** Their text is rendered on the server as ordinary headings,
  paragraphs and lists, so a crawler reads it without running JavaScript. Their headings fit the page outline (one
  H1, the article title; block titles H2; steps H3), they count towards the checklist's word and sub-heading totals,
  and the takeaways star is drawn by CSS, not part of the heading's text (step headings start with their number,
  "01 …", as on the original articles). Every entry in the contents list links to an id on the page.

## Hosting (important)

There are two storage setups, chosen by environment variables. Nothing else in the code changes between them.

| | Articles | Images | Use it for |
| --- | --- | --- | --- |
| **Production (Vercel)** | Postgres: one row in the `cms_store` table | Vercel Blob, under `media/` | zamnexus.com |
| **Local / own server** | `data/cms.json` | `data/uploads/` | your machine, or a server with a lasting disk |

Vercel's servers have no lasting disk, so **on Vercel both a database and Blob must be connected**. Without them the
public site still reads, but every save fails with a clear 503 instead of pretending to succeed.

### Going live on Vercel

1. In the Vercel project: **Storage → Create → Postgres** (Neon or Supabase from the marketplace) and connect it to
   the project. It sets `DATABASE_URL` / `POSTGRES_URL`; the CMS uses the first it finds (`CMS_DATABASE_URL` wins if
   set). Use the pooled connection string.
2. **Storage → Create → Blob** and connect it. It sets `BLOB_READ_WRITE_TOKEN`. If you made the store private, also
   set `CMS_BLOB_ACCESS=private`.
3. Set the three admin variables (see Setup) for Production.
4. Deploy. The table is created by itself; the seven original articles are stored on the first save.
5. Optional: to bring over articles written on your machine, pull the production variables
   (`vercel env pull .env.production.local`) and run `node --env-file=.env.production.local scripts/cms-migrate.mjs`.
   It refuses to overwrite a database that already has content unless you add `--force`.

Images keep the address `/media/<name>` in both setups (served by `app/media/[name]/route.ts`), so an article never
needs changing when its images move.

### How the database setup behaves

- The whole content document is one JSON row. Every save locks that row in a transaction, so saves from two
  administrators, or two serverless instances, are applied one after the other and never overwrite each other.
- If the database cannot be reached, a save returns 503 and nothing changes. Published pages keep serving their
  last good version.
- Publishing refreshes `/insights`, its article pages, the home page and the sitemap at once; all of them also
  refresh every five minutes as a safety net.

### Verified, and not

Verified on this machine against a real Postgres server (PostgreSQL 18 via PGlite, in production mode, with the
file store disabled): the full 54-check browser scenario; ten simultaneous saves (all kept); an article published,
both servers restarted, still live and counted; the migration script's SQL. **Not verified:** Vercel Blob and a live
Neon database, which need your account's credentials. Test those on a Vercel preview deployment before going live.

Back up the database (Neon and Supabase keep point-in-time backups) and the Blob store. Locally, back up
`data/cms.json` and `data/uploads/` together; articles reference images by file name.

## Completed

- Persistent store, migration of the seven existing articles, categories
- Authentication, sessions, rate limiting, layered route and API protection
- Article lifecycle: draft, publish, unpublish, schedule, edit, delete, preview
- Rich text editor with image captions and validated storage
- Image upload and serving
- Public Insights, article pages, sitemap, home teaser reading from the store with on-demand revalidation
- Dashboard, search, filters, pagination, toasts, loading, empty and error states, confirmation before delete
- Light and dark themes, phone layout

## Remaining

- Connecting the production database and Blob store on Vercel, and testing them on a preview deployment
- Multiple admin accounts or roles (today: one administrator)
- Revision history and undo for deleted articles
- Image resizing and alt-text checks on upload
- Automated test suite in CI (the end-to-end and API scripts used for verification are not part of the repo)

## Backend dependencies

The panel needs a Node runtime and the three admin environment variables. In production on Vercel it also needs a
Postgres database and a Vercel Blob store (see Hosting); locally it needs neither. Packages added to `package.json`:
TipTap (`@tiptap/*`) for the editor, `postgres` for the database and `@vercel/blob` for images.
