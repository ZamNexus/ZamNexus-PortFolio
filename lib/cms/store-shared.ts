import type { CmsData } from "./types";

// Pieces both storage drivers (file and Postgres) share.

export class StorageUnavailableError extends Error {}

export function assertShape(v: unknown, where: string): asserts v is CmsData {
  const d = v as Partial<CmsData> | null;
  if (!d || d.version !== 1 || !Array.isArray(d.articles) || !Array.isArray(d.categories)) {
    throw new Error(`Content in ${where} is not in the expected format. Fix or remove it; it was not overwritten.`);
  }
}

export interface StorageStatus {
  driver: string;
  // where the content lives, in words an administrator can act on
  location: string;
  // false while the content is still the built-in seed and has never been saved
  persisted: boolean;
  writable: boolean;
}
