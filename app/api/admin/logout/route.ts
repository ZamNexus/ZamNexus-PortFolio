import { cookies } from "next/headers";
import { isSameSiteRequest } from "@/lib/auth/guard";
import { SESSION_COOKIE } from "@/lib/auth/session";
import { fail, ok } from "@/lib/cms/api";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!isSameSiteRequest(req)) return fail(403, "This request did not come from the admin panel.");
  (await cookies()).set({ name: SESSION_COOKIE, value: "", httpOnly: true, sameSite: "strict", path: "/", maxAge: 0 });
  return ok({ ok: true });
}
