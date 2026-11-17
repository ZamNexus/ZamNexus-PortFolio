// Content model shared by the admin panel, the API and the public Insights pages. There is one source of truth:
// the content store (see store.ts). Nothing on the public site keeps its own list of articles.

export type ArticleStatus = "draft" | "published" | "unpublished";

// What visitors and admins see. "scheduled" is a published article whose publish time is still in the future.
export type EffectiveStatus = ArticleStatus | "scheduled";

// Article body: a ProseMirror/TipTap JSON document, validated on every write (see content.ts) and rendered by
// our own React renderer, so no HTML from the editor is ever injected into a page.
export interface DocMark {
  type: string;
  attrs?: Record<string, unknown>;
}

export interface DocNode {
  type: string;
  attrs?: Record<string, unknown>;
  content?: DocNode[];
  marks?: DocMark[];
  text?: string;
}

export interface PipelineStep {
  step: string;
  phase: string;
  title: string;
  detail: string;
}

export interface SystemSpec {
  label: string;
  value: string;
}

// The seven original articles were written as structured "blueprints" (specs, challenge and solution, a
// pipeline). They are migrated into the store with that structure intact, so their pages look exactly as before.
export interface LegacyBlueprint {
  categoryLabel: string;
  accent: string;
  authorRole: string;
  keyTakeaways: string[];
  fullSummary: string;
  architectureBlueprint: string[];
  specs: SystemSpec[];
  challenge: { title: string; description: string; impact: string };
  solution: { title: string; description: string; highlights: string[] };
  pipeline: PipelineStep[];
  techStack: string[];
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: DocNode;
  coverImage: string | null;
  author: string;
  category: string;
  tags: string[];
  status: ArticleStatus;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  // The search phrase the article targets; drives the editor's SEO checklist. Absent on older records.
  focusKeyword?: string;
  socialImage: string | null;
  readMinutes: number;
  createdAt: string;
  updatedAt: string;
  // For a published article this is when it goes (or went) live; a future time means "scheduled".
  publishedAt: string | null;
  legacy: LegacyBlueprint | null;
}

export interface Category {
  id: string;
  label: string;
  // The introduction on the topic page (/insights/topic/<id>) and its search description. Optional.
  description?: string;
  createdAt: string;
}

export interface CmsData {
  version: 1;
  articles: Article[];
  categories: Category[];
}

// The fields an admin edits. Everything else (id, dates, status, reading time) is set by the server.
export interface ArticleInput {
  title: string;
  slug: string;
  excerpt: string;
  content: DocNode;
  coverImage: string | null;
  author: string;
  category: string;
  tags: string[];
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  focusKeyword: string;
  socialImage: string | null;
}

export type FieldErrors = Partial<Record<keyof ArticleInput | "publishedAt", string>>;
