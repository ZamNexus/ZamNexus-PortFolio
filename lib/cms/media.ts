import { createHash } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";
import { get, put } from "@vercel/blob";
import { uploadsDir } from "./store";

// Where images are kept: Vercel Blob when BLOB_READ_WRITE_TOKEN is set (needed on hosts without a durable disk),
// otherwise the uploads folder on disk. Either way the public address is /media/<name>, served by
// app/media/[name]/route.ts, so moving between them never breaks an article.
const usingBlob = () => !!process.env.BLOB_READ_WRITE_TOKEN;
// Match the access level of the Blob store: "public" (the default) or "private".
const blobAccess = (): "public" | "private" => (process.env.CMS_BLOB_ACCESS === "private" ? "private" : "public");

// Image uploads for covers and in-article pictures. The type is decided from the file's own first bytes, not
// from its name or the browser's claim, SVG is refused (it can carry script), and files are stored under a
// name made from their content hash, so a name never repeats and can be cached for good.

export class UploadError extends Error {
  constructor(message: string, public status = 400) {
    super(message);
  }
}

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

const TYPES: Record<string, string> = { png: "image/png", jpg: "image/jpeg", webp: "image/webp", gif: "image/gif" };

function sniff(b: Buffer): "png" | "jpg" | "webp" | "gif" | null {
  if (b.length > 12 && b.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return "png";
  if (b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return "jpg";
  if (b.length > 12 && b.subarray(0, 4).toString("ascii") === "RIFF" && b.subarray(8, 12).toString("ascii") === "WEBP") return "webp";
  if (b.length > 6 && ["GIF87a", "GIF89a"].includes(b.subarray(0, 6).toString("ascii"))) return "gif";
  return null;
}

export async function saveUpload(file: File): Promise<{ url: string }> {
  if (file.size === 0) throw new UploadError("That file is empty.");
  if (file.size > MAX_UPLOAD_BYTES) throw new UploadError("Images must be 5 MB or smaller.", 413);
  const bytes = Buffer.from(await file.arrayBuffer());
  const ext = sniff(bytes);
  if (!ext) throw new UploadError("Use a PNG, JPG, WebP or GIF image.", 415);

  const name = `${createHash("sha256").update(bytes).digest("hex").slice(0, 32)}.${ext}`;
  if (usingBlob()) {
    try {
      // the name is the content's hash, so writing the same image again is harmless
      await put(`media/${name}`, bytes, { access: blobAccess(), contentType: TYPES[ext], addRandomSuffix: false, allowOverwrite: true });
    } catch (e) {
      throw new UploadError(`The image store could not be reached, so the upload failed (${e instanceof Error ? e.message.slice(0, 100) : "unknown error"}).`, 503);
    }
    return { url: `/media/${name}` };
  }
  try {
    await fs.mkdir(/*turbopackIgnore: true*/ uploadsDir(), { recursive: true });
    await fs.writeFile(/*turbopackIgnore: true*/ path.join(uploadsDir(), name), bytes);
  } catch {
    throw new UploadError("Image storage is not writable here, so the upload failed. Connect Vercel Blob (BLOB_READ_WRITE_TOKEN) on hosts without a durable disk.", 503);
  }
  return { url: `/media/${name}` };
}

export async function readUpload(name: string): Promise<{ bytes: Buffer; type: string } | null> {
  const m = /^([a-f0-9]{32})\.(png|jpg|webp|gif)$/.exec(name);
  if (!m) return null;
  if (usingBlob()) {
    try {
      const found = await get(`media/${name}`, { access: blobAccess() });
      if (!found || found.statusCode !== 200 || !found.stream) return null;
      return { bytes: Buffer.from(await new Response(found.stream).arrayBuffer()), type: TYPES[m[2]] };
    } catch {
      return null;
    }
  }
  try {
    return { bytes: await fs.readFile(/*turbopackIgnore: true*/ path.join(uploadsDir(), name)), type: TYPES[m[2]] };
  } catch {
    return null;
  }
}
