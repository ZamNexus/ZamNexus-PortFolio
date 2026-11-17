import { allInsights, categories as legacyCategories, featuredInsight } from "@/app/insights/insightsData";
import type { InsightArticle } from "@/app/insights/insightsData";
import { readingMinutes } from "./content";
import type { Article, Category, CmsData, DocNode } from "./types";

// One-time migration. The seven original articles lived in app/insights/insightsData.ts; the first time the
// content store is created they are copied into it, and from then on the store is the only source. This file
// is the last place that reads the old arrays, and nothing on the public site imports them any more.

// Starting introductions for the topic pages; editable in the admin panel (Categories).
const TOPIC_INTROS: Record<string, string> = {
  ai: "How we put AI agents and large language models to work inside regulated processes, with guardrails, human approval and a full audit trail.",
  enterprise: "Architecture for ERP and finance systems: real-time ledger posting, replacing legacy software piece by piece, and designs that keep running as they change.",
  retail: "Engineering for shops and retail chains: offline-first tills, stock that stays in step across branches, and sync that recovers safely after an outage.",
  healthcare: "Software for hospitals and clinics: HL7 lab integration, PACS imaging workflows and patient records that move between systems without retyping.",
  cloud: "Cloud-native engineering on AWS: serverless and Kubernetes trade-offs, event-driven design and connected systems that scale without a big operations team.",
};

const MONTHS = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];

// "September 2026" -> 2026-09-01. Earlier entries in the old list were newer, so each gets a minute more than the next.
function publishedAtFor(date: string, rank: number, total: number): string {
  const [month = "", year = ""] = date.toLowerCase().split(" ");
  const m = MONTHS.indexOf(month);
  const base = m >= 0 && /^\d{4}$/.test(year) ? Date.UTC(Number(year), m, 1, 9, 0, 0) : Date.UTC(2026, 0, 1, 9, 0, 0);
  return new Date(base + (total - rank) * 60_000).toISOString();
}

function bodyFor(a: InsightArticle): DocNode {
  return {
    type: "doc",
    content: [
      { type: "paragraph", content: [{ type: "text", text: a.fullSummary }] },
      { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Key takeaways" }] },
      {
        type: "bulletList",
        content: a.keyTakeaways.map((t) => ({
          type: "listItem",
          content: [{ type: "paragraph", content: [{ type: "text", text: t }] }],
        })),
      },
    ],
  };
}

function toArticle(a: InsightArticle, rank: number, total: number): Article {
  const content = bodyFor(a);
  const publishedAt = publishedAtFor(a.date, rank, total);
  return {
    id: crypto.randomUUID(),
    title: a.title,
    slug: a.id,
    excerpt: a.subtitle,
    content,
    coverImage: null,
    author: a.author,
    category: a.category,
    tags: a.techStack.slice(0, 4),
    status: "published",
    featured: a.id === featuredInsight.id,
    seoTitle: a.seoTitle,
    seoDescription: a.subtitle.slice(0, 200),
    socialImage: null,
    readMinutes: parseInt(a.readTime, 10) || readingMinutes(content),
    createdAt: publishedAt,
    updatedAt: publishedAt,
    publishedAt,
    legacy: {
      categoryLabel: a.categoryLabel,
      accent: a.accent,
      authorRole: a.authorRole,
      keyTakeaways: a.keyTakeaways,
      fullSummary: a.fullSummary,
      architectureBlueprint: a.architectureBlueprint,
      specs: a.specs,
      challenge: a.challenge,
      solution: a.solution,
      pipeline: a.pipeline,
      techStack: a.techStack,
    },
  };
}

export function buildSeed(): CmsData {
  const now = new Date().toISOString();
  const categories: Category[] = legacyCategories
    .filter((c) => c.id !== "all")
    .map((c) => ({ id: c.id, label: c.label, description: TOPIC_INTROS[c.id] ?? "", createdAt: now }));
  return {
    version: 1,
    categories,
    articles: allInsights.map((a, i) => toArticle(a, i, allInsights.length)),
  };
}
