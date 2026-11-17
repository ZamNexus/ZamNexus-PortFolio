import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedArticle, getPublishedInsights, getRelatedInsights, toBlueprint } from "@/lib/cms/public";
import { pageMetadata, jsonLd, breadcrumbs, SITE_URL } from "@/lib/seo";
import CmsArticleView from "@/components/cms/CmsArticleView";
import ArticleClientView from "./ArticleClientView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Articles are read from the content store. Pages are built on first visit and refreshed whenever the admin
// panel publishes, edits, unpublishes or deletes (and at least every five minutes, for scheduled articles).
// A slug that is not published is a real 404, never a "coming soon" page.
export const revalidate = 300;
export const dynamicParams = true;

// Trims at a word boundary so search snippets don't end mid-word.
function snippet(text: string, max = 155): string {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,;:]$/, "") + "…";
}

export async function generateStaticParams() {
  const { articles } = await getPublishedInsights();
  return articles.map((a) => ({ slug: a.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const found = await getPublishedArticle(slug);
  if (!found) return {};
  const { article } = found;
  const meta = pageMetadata({
    title: article.seoTitle || article.title,
    description: article.seoDescription || snippet(article.excerpt),
    path: `/insights/${article.slug}`,
    type: "article",
  });
  // A social sharing image chosen in the admin panel replaces the generated card.
  if (!article.socialImage) return meta;
  return {
    ...meta,
    openGraph: { ...meta.openGraph, images: [{ url: article.socialImage }] },
    twitter: { ...meta.twitter, images: [article.socialImage] },
  };
}

export default async function InsightArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const found = await getPublishedArticle(slug);
  if (!found) notFound();
  const { article, view } = found;
  const related = await getRelatedInsights(article.slug, 2);

  const path = `/insights/${article.slug}`;
  const structuredData = [
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Insights", path: "/insights" },
      { name: article.seoTitle || article.title, path },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.seoDescription || article.excerpt,
      datePublished: article.publishedAt ?? undefined,
      dateModified: article.updatedAt,
      image: article.socialImage ?? article.coverImage ?? undefined,
      keywords: article.tags.length ? article.tags.join(", ") : undefined,
      // The original blueprints are credited to the organisation until their named authors are confirmed as staff.
      author: article.legacy ? { "@id": `${SITE_URL}/#organization` } : { "@type": "Person", name: article.author },
      publisher: { "@id": `${SITE_URL}/#organization` },
      mainEntityOfPage: `${SITE_URL}${path}`,
    },
  ];

  const blueprint = toBlueprint(article, view);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      {blueprint ? (
        <ArticleClientView article={blueprint} related={related} coverImage={article.coverImage} />
      ) : (
        <CmsArticleView article={article} view={view} related={related} />
      )}
    </>
  );
}
