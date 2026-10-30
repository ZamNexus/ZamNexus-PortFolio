import { ogImage, ogSize } from "@/lib/ogImage";
import { getInsightBySlug, getAllInsightSlugs } from "../insightsData";

export const alt = "ZamNexus engineering insight";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllInsightSlugs().map((slug) => ({ slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);
  return ogImage({
    eyebrow: `Insights · ${article?.categoryLabel ?? "Engineering"}`,
    title: article?.seoTitle ?? "Engineering insights",
    accent: article?.accent,
  });
}
