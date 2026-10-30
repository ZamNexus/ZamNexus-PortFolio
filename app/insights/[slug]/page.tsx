import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getInsightBySlug, getAllInsightSlugs } from "../insightsData";
import { pageMetadata, jsonLd, breadcrumbs, SITE_URL } from "@/lib/seo";
import ArticleClientView from "./ArticleClientView";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Only the articles in insightsData exist; any other slug is a real 404, not a "coming soon" page.
export const dynamicParams = false;

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

// "September 2026" -> "2026-09" (ISO 8601 year-month) for structured data.
function isoMonth(date: string): string | undefined {
  const [month, year] = date.toLowerCase().split(" ");
  const m = MONTHS.indexOf(month);
  return m >= 0 && year ? `${year}-${String(m + 1).padStart(2, "0")}` : undefined;
}

// Trims at a word boundary so search snippets don't end mid-word.
function snippet(text: string, max = 155): string {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,;:]$/, "") + "…";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getInsightBySlug(slug);
  if (!article) return {};
  return pageMetadata({
    title: article.seoTitle,
    description: snippet(article.subtitle),
    path: `/insights/${article.id}`,
    type: "article",
  });
}

export async function generateStaticParams() {
  return getAllInsightSlugs().map((slug) => ({ slug }));
}

export default async function InsightArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getInsightBySlug(slug);
  if (!article) notFound();

  const path = `/insights/${article.id}`;
  const structuredData = [
    breadcrumbs([
      { name: "Home", path: "/" },
      { name: "Insights", path: "/insights" },
      { name: article.seoTitle, path },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      description: article.subtitle,
      datePublished: isoMonth(article.date),
      // Bylines are pending confirmation that the named authors are real staff, so credit the organisation.
      author: { "@id": `${SITE_URL}/#organization` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      mainEntityOfPage: `${SITE_URL}${path}`,
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      <ArticleClientView article={article} />
    </>
  );
}
