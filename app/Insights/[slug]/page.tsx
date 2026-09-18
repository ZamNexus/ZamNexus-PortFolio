import type { Metadata } from "next";
import { getInsightBySlug, getAllInsightSlugs } from "../insightsData";
import ArticleClientView from "./ArticleClientView";

interface PageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  try {
    const resolved = await Promise.resolve(params);
    const slug = resolved?.slug || "";
    const article = getInsightBySlug(slug);

    if (!article) {
      return {
        title: "Architecture Blueprint — ZamNexus Engineering Insights",
        description: "Enterprise software architecture blueprint and technical post-mortem.",
      };
    }

    return {
      title: `${article.title} — ZamNexus Insights`,
      description: article.subtitle,
      openGraph: {
        title: `${article.title} — ZamNexus Architecture Blueprint`,
        description: article.subtitle,
        type: "article",
      },
    };
  } catch {
    return {
      title: "Architecture Blueprint — ZamNexus Engineering Insights",
      description: "Enterprise software architecture blueprint and technical post-mortem.",
    };
  }
}

export async function generateStaticParams() {
  return getAllInsightSlugs().map((slug) => ({
    slug,
  }));
}

export default async function InsightArticlePage({ params }: PageProps) {
  try {
    const resolved = await Promise.resolve(params);
    const slug = resolved?.slug || "";
    const article = getInsightBySlug(slug);

    return <ArticleClientView article={article} slug={slug} />;
  } catch {
    return <ArticleClientView article={undefined} slug="" />;
  }
}
