// The admin panel's only way to talk to the server. It turns every failure into an ApiError with a message a
// person can act on, and sends a signed-out visitor back to the sign-in page instead of leaving a broken screen.

export class ApiError extends Error {
  constructor(message: string, public status: number, public fields?: Record<string, string>) {
    super(message);
  }
}

interface Options {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: unknown;
  form?: FormData;
}

export async function api<T>(path: string, { method = "GET", body, form }: Options = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(path, {
      method,
      credentials: "same-origin",
      cache: "no-store",
      headers: form || body === undefined ? undefined : { "Content-Type": "application/json" },
      body: form ?? (body === undefined ? undefined : JSON.stringify(body)),
    });
  } catch {
    throw new ApiError("Network error. Check your connection and try again.", 0);
  }

  let data: { error?: string; fields?: Record<string, string> } & Record<string, unknown> = {};
  try {
    data = await res.json();
  } catch {
    // an empty or non-JSON body; the status below still tells us what happened
  }

  // A 401 from the sign-in call itself just means the password was wrong; every other 401 means the session ended.
  if (res.status === 401 && path !== "/api/admin/login") {
    // A full page load on purpose: signed out, so every cached client-side page must go.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.href = "/admin/login";
    throw new ApiError("Your session has ended. Sign in again.", 401);
  }
  if (!res.ok) throw new ApiError(data.error ?? `Request failed (${res.status}).`, res.status, data.fields);
  return data as T;
}
