import { revalidatePath } from "next/cache";
import { UploadError } from "./media";
import { ConflictError, DuplicateSlugError, NotFoundError, ValidationError } from "./repository";
import { StorageUnavailableError } from "./store";
import type { Article } from "./types";
import { effectiveStatus } from "./repository";

// Shared plumbing for the admin API handlers: turn the repository's errors into precise HTTP responses, and
// refresh the public pages after a change so a published article appears (or disappears) without a rebuild.

const NO_STORE = { "Cache-Control": "no-store" };

export const ok = (body: unknown, status = 200) => Response.json(body, { status, headers: NO_STORE });
export const fail = (status: number, error: string, fields?: Record<string, string>) =>
  Response.json({ error, ...(fields ? { fields } : {}) }, { status, headers: NO_STORE });

export async function readJson(req: Request, maxBytes = 1_500_000): Promise<unknown> {
  if (Number(req.headers.get("content-length") ?? 0) > maxBytes) throw new ValidationError({}, "That request is too large.");
  const raw = await req.text();
  if (raw.length > maxBytes) throw new ValidationError({}, "That request is too large.");
  try {
    return JSON.parse(raw);
  } catch {
    throw new ValidationError({}, "The request was not valid JSON.");
  }
}

export async function handle(run: () => Promise<Response>): Promise<Response> {
  try {
    return await run();
  } catch (e) {
    if (e instanceof ValidationError) return fail(422, e.message, e.fields as Record<string, string>);
    if (e instanceof DuplicateSlugError) return fail(409, e.message, { slug: "This slug is already in use." });
    if (e instanceof NotFoundError) return fail(404, e.message);
    if (e instanceof ConflictError) return fail(409, e.message);
    if (e instanceof StorageUnavailableError) return fail(503, e.message);
    if (e instanceof UploadError) return fail(e.status, e.message);
    console.error("Admin API error", e);
    return fail(500, "Something went wrong on the server. Nothing was changed.");
  }
}

// The public Insights pages, every article page, the homepage teaser and the sitemap.
export function revalidatePublicContent() {
  revalidatePath("/insights", "layout");
  revalidatePath("/");
  revalidatePath("/sitemap.xml");
}

export function articleSummary(a: Article, now = Date.now()) {
  return {
    id: a.id,
    title: a.title,
    slug: a.slug,
    excerpt: a.excerpt,
    category: a.category,
    author: a.author,
    status: a.status,
    effectiveStatus: effectiveStatus(a, now),
    featured: a.featured,
    coverImage: a.coverImage,
    readMinutes: a.readMinutes,
    isBlueprint: !!a.legacy,
    createdAt: a.createdAt,
    updatedAt: a.updatedAt,
    publishedAt: a.publishedAt,
  };
}
