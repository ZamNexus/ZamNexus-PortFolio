import type { InsightArticle } from "@/app/insights/insightsData";
import { isPublic } from "./repository";
import { readData } from "./store";
import type { Article, PipelineStep, SystemSpec } from "./types";

// What the public pages read. Only published articles whose publish time has arrived ever get this far, so a
// draft, an unpublished article or a scheduled one cannot leak into a listing, a count or a page.

export interface InsightView {
  id: string; // the slug, used in the URL
  title: string;
  subtitle: string;
  category: string;
  categoryLabel: string;
  accent: string;
  readTime: string;
  minutes: number;
  date: string;
  publishedAt: string;
  author: string;
  coverImage: string | null;
  tags: string[];
  featured: boolean;
  // Only the original blueprints have these; newer articles are plain prose and leave them empty.
  pipeline: PipelineStep[];
  specs: SystemSpec[];
}

export interface CategoryCount {
  id: string;
  label: string;
  count: number;
  // the topic page introduction, if one has been written
  description?: string;
}

const DEFAULT_ACCENT = "var(--accent-text)";

const dateLabel = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { month: "long", year: "numeric", timeZone: "UTC" });

function toView(a: Article, labels: Map<string, string>): InsightView {
  return {
    id: a.slug,
    title: a.title,
    subtitle: a.excerpt,
    category: a.category,
    categoryLabel: a.legacy?.categoryLabel ?? labels.get(a.category) ?? "Insights",
    accent: a.legacy?.accent ?? DEFAULT_ACCENT,
    readTime: `${a.readMinutes} min read`,
    minutes: a.readMinutes,
    date: dateLabel(a.publishedAt ?? a.createdAt),
    publishedAt: a.publishedAt ?? a.createdAt,
    author: a.author,
    coverImage: a.coverImage,
    tags: a.tags,
    featured: a.featured,
    pipeline: a.legacy?.pipeline ?? [],
    specs: a.legacy?.specs ?? [],
  };
}

const newestFirst = (a: Article, b: Article) => Date.parse(b.publishedAt ?? b.createdAt) - Date.parse(a.publishedAt ?? a.createdAt);

export async function getPublishedInsights(): Promise<{ articles: InsightView[]; categories: CategoryCount[] }> {
  const { data } = await readData();
  const now = Date.now();
  const labels = new Map(data.categories.map((c) => [c.id, c.label]));
  const live = data.articles.filter((a) => isPublic(a, now)).sort(newestFirst);
  const articles = live.map((a) => toView(a, labels));
  const categories = data.categories
    .map((c) => ({ id: c.id, label: c.label, count: live.filter((a) => a.category === c.id).length, description: c.description ?? "" }))
    .filter((c) => c.count > 0);
  return { articles, categories };
}

export async function getPublishedArticle(slug: string): Promise<{ article: Article; view: InsightView; categoryLabel: string } | null> {
  const { data } = await readData();
  const clean = slug.trim().toLowerCase();
  const article = data.articles.find((a) => a.slug === clean);
  if (!article || !isPublic(article)) return null;
  const labels = new Map(data.categories.map((c) => [c.id, c.label]));
  return { article, view: toView(article, labels), categoryLabel: labels.get(article.category) ?? "Insights" };
}

// Preview for admins: the same view regardless of status.
export async function getArticleView(id: string): Promise<{ article: Article; view: InsightView } | null> {
  const { data } = await readData();
  const article = data.articles.find((a) => a.id === id);
  if (!article) return null;
  const labels = new Map(data.categories.map((c) => [c.id, c.label]));
  return { article, view: toView(article, labels) };
}

// Related reading: the same category first, then the newest, never the article itself.
export async function getRelatedInsights(slug: string, limit = 2): Promise<InsightView[]> {
  const { articles } = await getPublishedInsights();
  const current = articles.find((a) => a.id === slug);
  const others = articles.filter((a) => a.id !== slug);
  const same = others.filter((a) => current && a.category === current.category);
  return [...same, ...others.filter((a) => !same.includes(a))].slice(0, limit);
}

export async function getLatestInsight(): Promise<InsightView | null> {
  const { articles } = await getPublishedInsights();
  return articles.find((a) => a.featured) ?? articles[0] ?? null;
}

// A topic page: one category's published articles, newest first, with the other topics for onward links.
// Only a category with at least one published article has a page, so search engines never see an empty one.
export interface TopicView {
  id: string;
  label: string;
  intro: string;
  // false when no introduction has been written and the intro is the generic fallback
  hasOwnIntro: boolean;
  articles: InsightView[];
  others: CategoryCount[];
  // the newest publish date in the topic, for the sitemap
  updatedAt: string;
}

export async function getTopics(): Promise<TopicView[]> {
  const { articles, categories } = await getPublishedInsights();
  return categories.map((c) => {
    const own = (c.description ?? "").trim();
    const items = articles.filter((a) => a.category === c.id);
    return {
      id: c.id,
      label: c.label,
      intro: own || `Articles from ZamNexus engineers on ${c.label}: how the systems are designed, built and run in production.`,
      hasOwnIntro: !!own,
      articles: items,
      others: categories.filter((o) => o.id !== c.id),
      updatedAt: items[0]?.publishedAt ?? new Date(0).toISOString(),
    };
  });
}

export async function getTopic(id: string): Promise<TopicView | null> {
  return (await getTopics()).find((t) => t.id === id) ?? null;
}

// The original structured article page takes the old InsightArticle shape; rebuild it from the stored record.
export function toBlueprint(a: Article, view: InsightView): InsightArticle | null {
  const l = a.legacy;
  if (!l) return null;
  return {
    id: a.slug,
    category: a.category as InsightArticle["category"],
    categoryLabel: l.categoryLabel,
    accent: l.accent,
    title: a.title,
    seoTitle: a.seoTitle || a.title,
    subtitle: a.excerpt,
    readTime: view.readTime,
    date: view.date,
    author: a.author,
    authorRole: l.authorRole,
    keyTakeaways: l.keyTakeaways,
    fullSummary: l.fullSummary,
    architectureBlueprint: l.architectureBlueprint,
    specs: l.specs,
    challenge: l.challenge,
    solution: l.solution,
    pipeline: l.pipeline,
    techStack: l.techStack,
  };
}
