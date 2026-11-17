import type { Article, EffectiveStatus } from "./types";

// Pure status rules with no server dependencies, so the admin editor (which runs in the browser) and the server
// can share them. Anything that touches storage lives in repository.ts and must never be imported by client code.

// "scheduled" is a published article whose publish time is still in the future.
export function effectiveStatus(a: Pick<Article, "status" | "publishedAt">, now = Date.now()): EffectiveStatus {
  return a.status === "published" && a.publishedAt && Date.parse(a.publishedAt) > now ? "scheduled" : a.status;
}

// The one definition of "visible to the public": published, and its publish time has arrived.
export function isPublic(a: Pick<Article, "status" | "publishedAt">, now = Date.now()): boolean {
  return a.status === "published" && !!a.publishedAt && Date.parse(a.publishedAt) <= now;
}
