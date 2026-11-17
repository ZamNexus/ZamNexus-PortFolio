import type { MetadataRoute } from "next";
import { getPublishedInsights, getTopics } from "@/lib/cms/public";
import { SITE_URL } from "@/lib/seo";

// Update a page's date when its content meaningfully changes; a build-time `new Date()`
// would tell search engines every page changed on every deploy.
const CONTENT_UPDATED = "2026-10-30";
const LEGAL_UPDATED = "2026-03-01";

// Publishing refreshes the sitemap at once; this five-minute refresh is the safety net (for scheduled articles,
// and for a server that restarted before the refresh happened), matching the Insights pages.
export const revalidate = 300;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ articles }, topics] = await Promise.all([getPublishedInsights(), getTopics()]);
  const pages: [path: string, lastModified: string][] = [
    ["/", CONTENT_UPDATED],
    ["/services", CONTENT_UPDATED],
    ["/products", CONTENT_UPDATED],
    ["/products/znxerp", CONTENT_UPDATED],
    ["/products/znxepos", CONTENT_UPDATED],
    ["/products/znxedu", CONTENT_UPDATED],
    ["/products/znxcare", CONTENT_UPDATED],
    ["/insights", CONTENT_UPDATED],
    ["/about", CONTENT_UPDATED],
    ["/contact", CONTENT_UPDATED],
    ["/privacy", LEGAL_UPDATED],
    ["/terms", LEGAL_UPDATED],
  ];

  return [
    ...pages.map(([path, lastModified]) => ({ url: `${SITE_URL}${path === "/" ? "" : path}`, lastModified })),
    ...topics.map((t) => ({ url: `${SITE_URL}/insights/topic/${t.id}`, lastModified: t.updatedAt })),
    ...articles.map((a) => ({ url: `${SITE_URL}/insights/${a.id}`, lastModified: a.publishedAt })),
  ];
}
