import { authorizeAdminRequest } from "@/lib/auth/guard";
import { fail, handle, ok } from "@/lib/cms/api";
import { MAX_UPLOAD_BYTES, saveUpload } from "@/lib/cms/media";

export const dynamic = "force-dynamic";

// Image upload for covers and in-article pictures. Admin only; the file's real type and size are checked here.
export async function POST(req: Request) {
  const auth = await authorizeAdminRequest(req);
  if ("response" in auth) return auth.response;
  return handle(async () => {
    if (Number(req.headers.get("content-length") ?? 0) > MAX_UPLOAD_BYTES + 200_000) {
      return fail(413, "Images must be 5 MB or smaller.");
    }
    let form: FormData;
    try {
      form = await req.formData();
    } catch {
      return fail(400, "The upload could not be read.");
    }
    const file = form.get("file");
    if (!(file instanceof File)) return fail(400, "Choose an image to upload.");
    return ok(await saveUpload(file), 201);
  });
}
