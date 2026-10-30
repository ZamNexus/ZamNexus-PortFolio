import type { MetadataRoute } from "next";
import { allInsights } from "./insights/insightsData";
import { SITE_URL } from "@/lib/seo";

// Update a page's date when its content meaningfully changes; a build-time `new Date()`
// would tell search engines every page changed on every deploy.
const CONTENT_UPDATED = "2026-10-30";
const LEGAL_UPDATED = "2026-03-01";

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

function articleDate(date: string): string {
  const [month, year] = date.toLowerCase().split(" ");
  const m = MONTHS.indexOf(month);
  return m >= 0 && year ? `${year}-${String(m + 1).padStart(2, "0")}-01` : CONTENT_UPDATED;
}

export default function sitemap(): MetadataRoute.Sitemap {
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
    ...allInsights.map((a) => ({ url: `${SITE_URL}/insights/${a.id}`, lastModified: articleDate(a.date) })),
  ];
}
