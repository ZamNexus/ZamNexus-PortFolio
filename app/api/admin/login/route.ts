import { cookies } from "next/headers";
import { authConfig, isSameSiteRequest } from "@/lib/auth/guard";
import { verifyPassword } from "@/lib/auth/password";
import { SESSION_COOKIE, SESSION_TTL_SECONDS, signSession } from "@/lib/auth/session";
import { clientIp } from "@/lib/leads";
import { limited } from "@/lib/rateLimit";
import { fail, ok } from "@/lib/cms/api";

export const dynamic = "force-dynamic";

// Signs an administrator in. There is no sign-up route anywhere: the only account is the one configured in the
// server's environment. Failed attempts are rate limited, and a wrong email and a wrong password look identical.
export async function POST(req: Request) {
  if (!isSameSiteRequest(req)) return fail(403, "This request did not come from the sign-in page.");
  if (limited(`admin-login:${clientIp(req)}`)) return fail(429, "Too many attempts. Wait a minute and try again.");

  const cfg = authConfig();
  if (!cfg.configured) return fail(503, "The admin panel is not set up on this server yet.");

  let body: { email?: unknown; password?: unknown } = {};
  try {
    const raw = await req.text();
    if (raw.length > 2000) return fail(413, "That request is too large.");
    body = JSON.parse(raw);
  } catch {
    return fail(400, "The request was not valid.");
  }
  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!email || !password) return fail(400, "Enter your email and password.");

  // Always run the password check, even when the email is wrong, so timing does not reveal which was wrong.
  const passwordOk = await verifyPassword(password, cfg.passwordHash);
  if (!(email === cfg.email && passwordOk)) return fail(401, "That email and password do not match.");

  (await cookies()).set({
    name: SESSION_COOKIE,
    value: signSession(cfg.email, cfg.secret),
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
  return ok({ ok: true });
}
