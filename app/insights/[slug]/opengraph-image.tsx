import { ogImage, ogSize } from "@/lib/ogImage";
import { getPublishedArticle, getPublishedInsights } from "@/lib/cms/public";

export const alt = "ZamNexus engineering insight";
export const size = ogSize;
export const contentType = "image/png";
export const revalidate = 300;

export async function generateStaticParams() {
  const { articles } = await getPublishedInsights();
  return articles.map((a) => ({ slug: a.id }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const found = await getPublishedArticle(slug);
  return ogImage({
    eyebrow: `Insights · ${found?.view.categoryLabel ?? "Engineering"}`,
    title: found?.article.seoTitle || found?.article.title || "Engineering insights",
  });
}
