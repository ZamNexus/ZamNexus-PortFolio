import { authorizeAdminRequest } from "@/lib/auth/guard";
import { handle, ok, readJson, revalidatePublicContent } from "@/lib/cms/api";
import { deleteArticle, getArticle, NotFoundError, updateArticle, ValidationError } from "@/lib/cms/repository";
import { normalizeInput } from "@/lib/cms/validate";

export const dynamic = "force-dynamic";

interface Ctx {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: Ctx) {
  const auth = await authorizeAdminRequest(req);
  if ("response" in auth) return auth.response;
  return handle(async () => {
    const article = await getArticle((await params).id);
    if (!article) throw new NotFoundError("Article not found.");
    return ok({ article });
  });
}

export async function PUT(req: Request, { params }: Ctx) {
  const auth = await authorizeAdminRequest(req);
  if ("response" in auth) return auth.response;
  return handle(async () => {
    const { input, errors } = normalizeInput(await readJson(req));
    if (!input) throw new ValidationError(errors, "Fix the highlighted fields and try again.");
    const article = await updateArticle((await params).id, input);
    revalidatePublicContent();
    return ok({ article });
  });
}

export async function DELETE(req: Request, { params }: Ctx) {
  const auth = await authorizeAdminRequest(req);
  if ("response" in auth) return auth.response;
  return handle(async () => {
    const article = await deleteArticle((await params).id);
    revalidatePublicContent();
    return ok({ deleted: article.id });
  });
}
