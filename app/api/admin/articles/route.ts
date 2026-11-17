import { authorizeAdminRequest } from "@/lib/auth/guard";
import { articleSummary, fail, handle, ok, readJson, revalidatePublicContent } from "@/lib/cms/api";
import { createArticle, queryArticles, ValidationError } from "@/lib/cms/repository";
import { normalizeInput } from "@/lib/cms/validate";
import type { EffectiveStatus } from "@/lib/cms/types";

export const dynamic = "force-dynamic";

const STATUSES = ["all", "draft", "published", "unpublished", "scheduled"];

// GET: the article list for the admin table, filtered, searched and paginated on the server.
export async function GET(req: Request) {
  const auth = await authorizeAdminRequest(req);
  if ("response" in auth) return auth.response;
  return handle(async () => {
    const p = new URL(req.url).searchParams;
    const status = p.get("status") ?? "all";
    if (!STATUSES.includes(status)) return fail(400, "Unknown status filter.");
    const result = await queryArticles({
      q: p.get("q") ?? "",
      status: status as EffectiveStatus | "all",
      category: p.get("category") ?? "all",
      page: Number(p.get("page")) || 1,
      pageSize: Number(p.get("pageSize")) || 10,
    });
    const now = Date.now();
    return ok({ ...result, items: result.items.map((a) => articleSummary(a, now)) });
  });
}

// POST: create an article. It always starts as a draft; publishing is a separate, checked step.
export async function POST(req: Request) {
  const auth = await authorizeAdminRequest(req);
  if ("response" in auth) return auth.response;
  return handle(async () => {
    const { input, errors } = normalizeInput(await readJson(req));
    if (!input) throw new ValidationError(errors, "Fix the highlighted fields and try again.");
    const article = await createArticle(input);
    revalidatePublicContent();
    return ok({ article }, 201);
  });
}
