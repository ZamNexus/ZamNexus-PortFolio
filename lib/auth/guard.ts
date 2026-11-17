import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { SESSION_COOKIE, verifySession, type AdminSession } from "./session";

// The server-side checks behind every admin page and every admin API handler. The proxy also redirects
// anonymous visitors away from /admin, but that is a convenience: these functions are the real protection and
// run on every request regardless of how it arrived.

export function authConfig() {
  const secret = process.env.ADMIN_SESSION_SECRET ?? "";
  const email = (process.env.ADMIN_EMAIL ?? "").trim().toLowerCase();
  const passwordHash = process.env.ADMIN_PASSWORD_HASH ?? "";
  return { secret, email, passwordHash, configured: secret.length >= 32 && !!email && !!passwordHash };
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  return verifySession(token, authConfig().secret);
}

// For pages: anonymous visitors are sent to the login page.
export async function requireAdminPage(): Promise<AdminSession> {
  const session = await getAdminSession();
  if (!session || session.role !== "admin") redirect("/admin/login");
  return session;
}

const json = (status: number, error: string) => Response.json({ error }, { status, headers: { "Cache-Control": "no-store" } });

// For API handlers. Returns the session, or the Response to send back: 401 when not signed in, 403 for the
// wrong role or (for requests that change data) a request that did not come from this site.
export async function authorizeAdminRequest(req: Request): Promise<{ session: AdminSession } | { response: Response }> {
  const session = await getAdminSession();
  if (!session) return { response: json(401, "Sign in to continue.") };
  if (session.role !== "admin") return { response: json(403, "You do not have permission to do that.") };

  if (!["GET", "HEAD", "OPTIONS"].includes(req.method) && !isSameSiteRequest(req)) {
    return { response: json(403, "This request did not come from the admin panel.") };
  }
  return { session };
}

// Requests that change data must carry an Origin header that matches this site. The session cookie is
// SameSite=Strict as well; this is a second, independent check.
export function isSameSiteRequest(req: Request): boolean {
  const origin = req.headers.get("origin");
  try {
    return !!origin && new URL(origin).host === req.headers.get("host");
  } catch {
    return false;
  }
}
