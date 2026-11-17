import { authorizeAdminRequest } from "@/lib/auth/guard";
import { handle, ok, readJson, revalidatePublicContent } from "@/lib/cms/api";
import { deleteCategory, renameCategory } from "@/lib/cms/repository";

export const dynamic = "force-dynamic";

interface Ctx {
  params: Promise<{ id: string }>;
}

export async function PUT(req: Request, { params }: Ctx) {
  const auth = await authorizeAdminRequest(req);
  if ("response" in auth) return auth.response;
  return handle(async () => {
    const body = (await readJson(req, 4000)) as { label?: unknown; description?: unknown };
    const category = await renameCategory((await params).id, body.label, body.description);
    revalidatePublicContent();
    return ok({ category });
  });
}

export async function DELETE(req: Request, { params }: Ctx) {
  const auth = await authorizeAdminRequest(req);
  if ("response" in auth) return auth.response;
  return handle(async () => {
    await deleteCategory((await params).id);
    revalidatePublicContent();
    return ok({ deleted: true });
  });
}
