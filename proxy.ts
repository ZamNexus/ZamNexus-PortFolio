import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Old URLs whose page was removed or merged, keyed by lowercased path.
// Lives here rather than in next.config redirects because those match case-insensitively,
// so a "/Services" -> "/services" rule there would redirect to itself forever.
const MOVED: Record<string, string> = {
  "/industries": "/",
  "/products/industries": "/",
  "/platforms": "/services#microsoft",
  "/products/platforms": "/services#microsoft",
  "/solutions": "/services",
  "/solutions/ai-powered-business": "/services#ai-automation",
  "/solutions/ai-powered": "/services#ai-automation",
  "/solutions/intelligent-automation": "/services#ai-automation",
  "/solutions/saas-platforms": "/services#saas",
  "/solutions/saas-development": "/services#saas",
  "/solutions/cloud-native-solutions": "/services#cloud",
  "/solutions/cloud-native": "/services#cloud",
  "/solutions/connected-enterprise": "/services#integration",
  "/solutions/digital-transformation": "/services#integration",
  "/privacy-policy": "/privacy",
  "/terms-of-service": "/terms",
  "/terms-and-conditions": "/terms",
};

// Sends every legacy or mixed-case URL to its final lowercase address in a single 308 hop.
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const lower = pathname.toLowerCase().replace(/\/+$/, "") || "/";
  const target = MOVED[lower] ?? (lower.startsWith("/solutions/") ? "/services" : lower !== pathname ? lower : null);
  if (!target) return NextResponse.next();
  const url = new URL(target, request.url);
  if (!target.includes("#")) url.search = search;
  return NextResponse.redirect(url, 308);
}

export const config = {
  // Skip framework assets, API routes and files with an extension (images, robots.txt, sitemap.xml).
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
