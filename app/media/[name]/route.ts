import { readUpload } from "@/lib/cms/media";

// Serves uploaded article images. Files are named by their content hash, so they never change and can be
// cached forever; anything that is not exactly such a name is a 404.
export async function GET(_req: Request, { params }: { params: Promise<{ name: string }> }) {
  const file = await readUpload((await params).name);
  if (!file) return new Response("Not found", { status: 404 });
  return new Response(new Uint8Array(file.bytes), {
    headers: {
      "Content-Type": file.type,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; img-src 'self'; style-src 'unsafe-inline'",
    },
  });
}
