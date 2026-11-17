import { authorizeAdminRequest } from "@/lib/auth/guard";
import { handle, ok, readJson, revalidatePublicContent } from "@/lib/cms/api";
import { createCategory, listCategories, listArticles } from "@/lib/cms/repository";

export const dynamic = "force-dynamic";

// GET: every category with how many articles use it.
export async function GET(req: Request) {
  const auth = await authorizeAdminRequest(req);
  if ("response" in auth) return auth.response;
  return handle(async () => {
    const [categories, articles] = await Promise.all([listCategories(), listArticles()]);
    return ok({
      categories: categories.map((c) => ({ ...c, articles: articles.filter((a) => a.category === c.id).length })),
    });
  });
}

export async function POST(req: Request) {
  const auth = await authorizeAdminRequest(req);
  if ("response" in auth) return auth.response;
  return handle(async () => {
    const body = (await readJson(req, 2000)) as { label?: unknown };
    const category = await createCategory(body.label);
    revalidatePublicContent();
    return ok({ category }, 201);
  });
}
