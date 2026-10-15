// ponytail: in-memory, per server instance. Serverless instances don't share it, so the real limit is
// looser than stated. Swap for Upstash/Vercel KV when traffic or abuse justifies it.
const hits = new Map<string, number[]>();
const WINDOWS: [ms: number, max: number][] = [
  [60_000, 8],
  [3_600_000, 60],
];

export function limited(key: string, now = Date.now()): boolean {
  const longest = WINDOWS[WINDOWS.length - 1][0];
  const recent = (hits.get(key) ?? []).filter((t) => now - t < longest);
  if (WINDOWS.some(([ms, max]) => recent.filter((t) => now - t < ms).length >= max)) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (now - v[v.length - 1] > longest) hits.delete(k);
  return false;
}
