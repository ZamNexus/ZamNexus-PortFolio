import { authorizeAdminRequest } from "@/lib/auth/guard";
import { fail, handle, ok, readJson, revalidatePublicContent } from "@/lib/cms/api";
import { changeStatus, type StatusAction } from "@/lib/cms/repository";

export const dynamic = "force-dynamic";

const ACTIONS: StatusAction[] = ["publish", "unpublish", "draft"];

// Publish, unpublish or return to draft. Publishing re-checks the article's required fields on the server and
// only then changes its status, so a failed attempt can never leave an article looking published.
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await authorizeAdminRequest(req);
  if ("response" in auth) return auth.response;
  return handle(async () => {
    const body = (await readJson(req, 4000)) as { action?: unknown; publishedAt?: unknown };
    const action = body.action as StatusAction;
    if (!ACTIONS.includes(action)) return fail(400, "Choose publish, unpublish or draft.");
    const publishedAt = typeof body.publishedAt === "string" && body.publishedAt ? body.publishedAt : undefined;
    const article = await changeStatus((await params).id, action, { publishedAt });
    revalidatePublicContent();
    return ok({ article });
  });
}
