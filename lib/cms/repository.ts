import { readingMinutes } from "./content";
import { effectiveStatus, isPublic } from "./status";
import { mutate, readData } from "./store";
import { publishProblems, slugify } from "./validate";
import type { Article, ArticleInput, ArticleStatus, Category, EffectiveStatus, FieldErrors } from "./types";

// Every read and write of articles and categories goes through here, so the rules live in one place and the
// admin panel and the public pages can never disagree about what is published.

export class NotFoundError extends Error {}
export class DuplicateSlugError extends Error {
  constructor(public slug: string) {
    super(`The slug "${slug}" is already used by another article.`);
  }
}
export class ValidationError extends Error {
  constructor(public fields: FieldErrors, message = "Some fields need attention.") {
    super(message);
  }
}
export class ConflictError extends Error {}

export type StatusAction = "publish" | "unpublish" | "draft";

export { effectiveStatus, isPublic };

const byRecent = (a: Article, b: Article) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt);

export async function listArticles(): Promise<Article[]> {
  return (await readData()).data.articles.slice().sort(byRecent);
}

export async function getArticle(id: string): Promise<Article | null> {
  return (await readData()).data.articles.find((a) => a.id === id) ?? null;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const clean = slug.trim().toLowerCase();
  return (await readData()).data.articles.find((a) => a.slug === clean) ?? null;
}

export async function listCategories(): Promise<Category[]> {
  return (await readData()).data.categories.slice();
}

export interface ArticleQuery {
  q?: string;
  status?: EffectiveStatus | "all";
  category?: string;
  page?: number;
  pageSize?: number;
}

export async function queryArticles(query: ArticleQuery) {
  const now = Date.now();
  const pageSize = Math.min(50, Math.max(1, query.pageSize ?? 10));
  const q = (query.q ?? "").trim().toLowerCase();
  const all = await listArticles();
  const filtered = all.filter((a) => {
    if (query.status && query.status !== "all" && effectiveStatus(a, now) !== query.status) return false;
    if (query.category && query.category !== "all" && a.category !== query.category) return false;
    if (q && ![a.title, a.slug, a.excerpt, a.author, ...a.tags].some((t) => t.toLowerCase().includes(q))) return false;
    return true;
  });
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const page = Math.min(pages, Math.max(1, query.page ?? 1));
  return {
    total: filtered.length,
    page,
    pages,
    pageSize,
    items: filtered.slice((page - 1) * pageSize, page * pageSize),
  };
}

export function computeStats(articles: Article[], now = Date.now()) {
  const count = (s: EffectiveStatus) => articles.filter((a) => effectiveStatus(a, now) === s).length;
  return {
    total: articles.length,
    published: count("published"),
    draft: count("draft"),
    unpublished: count("unpublished"),
    scheduled: count("scheduled"),
  };
}

function ensureUniqueSlug(articles: Article[], slug: string, exceptId?: string) {
  if (articles.some((a) => a.slug === slug && a.id !== exceptId)) throw new DuplicateSlugError(slug);
}

// Only one article is featured at a time (the large panel on the Insights page).
function clearFeatured(articles: Article[], exceptId: string) {
  for (const a of articles) if (a.id !== exceptId) a.featured = false;
}

export async function createArticle(input: ArticleInput): Promise<Article> {
  return mutate((data) => {
    ensureUniqueSlug(data.articles, input.slug);
    const now = new Date().toISOString();
    const article: Article = {
      ...input,
      id: crypto.randomUUID(),
      status: "draft",
      readMinutes: readingMinutes(input.content),
      createdAt: now,
      updatedAt: now,
      publishedAt: null,
      legacy: null,
    };
    if (article.featured) clearFeatured(data.articles, article.id);
    data.articles.push(article);
    return article;
  });
}

export async function updateArticle(id: string, input: ArticleInput): Promise<Article> {
  return mutate((data) => {
    const article = data.articles.find((a) => a.id === id);
    if (!article) throw new NotFoundError("Article not found.");

    // The original blueprints keep their address and their structured body; everything else is editable.
    const slug = article.legacy ? article.slug : input.slug;
    ensureUniqueSlug(data.articles, slug, id);

    const next: Article = {
      ...article,
      ...input,
      slug,
      content: article.legacy ? article.content : input.content,
      readMinutes: article.legacy ? article.readMinutes : readingMinutes(input.content),
      updatedAt: new Date().toISOString(),
    };

    // A live article must stay complete, so an edit can never leave a published page half-empty.
    if (article.status === "published") {
      const problems = publishProblems(next, data.categories.map((c) => c.id));
      if (Object.keys(problems).length) throw new ValidationError(problems, "This article is live, so it must keep its required fields. Unpublish it first to blank them.");
    }

    Object.assign(article, next);
    if (article.featured) clearFeatured(data.articles, article.id);
    return article;
  });
}

export async function changeStatus(id: string, action: StatusAction, opts: { publishedAt?: string } = {}): Promise<Article> {
  return mutate((data) => {
    const article = data.articles.find((a) => a.id === id);
    if (!article) throw new NotFoundError("Article not found.");
    const now = new Date().toISOString();

    if (action === "publish") {
      const problems = publishProblems(article, data.categories.map((c) => c.id));
      if (Object.keys(problems).length) throw new ValidationError(problems, "This article is not ready to publish.");
      let when = article.publishedAt ?? now;
      if (opts.publishedAt) {
        const t = Date.parse(opts.publishedAt);
        if (Number.isNaN(t)) throw new ValidationError({ publishedAt: "Enter a valid publish date and time." });
        when = new Date(t).toISOString();
      } else if (article.status !== "unpublished") {
        when = now;
      }
      article.status = "published";
      article.publishedAt = when;
    } else if (action === "unpublish") {
      if (article.status !== "published") throw new ConflictError("Only a published article can be unpublished.");
      article.status = "unpublished";
    } else {
      article.status = "draft";
    }
    article.updatedAt = now;
    return article;
  });
}

export async function deleteArticle(id: string): Promise<Article> {
  return mutate((data) => {
    const i = data.articles.findIndex((a) => a.id === id);
    if (i < 0) throw new NotFoundError("Article not found.");
    return data.articles.splice(i, 1)[0];
  });
}

/* ───────── Categories ───────── */

function cleanLabel(label: unknown): string {
  const text = typeof label === "string" ? label.trim() : "";
  if (text.length < 2 || text.length > 60) throw new ValidationError({}, "Enter a category name of 2 to 60 characters.");
  return text;
}

export async function createCategory(label: unknown): Promise<Category> {
  const text = cleanLabel(label);
  return mutate((data) => {
    const id = slugify(text);
    if (!id) throw new ValidationError({}, "Use letters or numbers in the category name.");
    if (data.categories.some((c) => c.id === id || c.label.toLowerCase() === text.toLowerCase())) {
      throw new ConflictError("A category with that name already exists.");
    }
    const category = { id, label: text, createdAt: new Date().toISOString() };
    data.categories.push(category);
    return category;
  });
}

function cleanDescription(value: unknown): string {
  const text = typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
  if (text.length > 300) throw new ValidationError({}, "Keep the topic introduction under 300 characters.");
  return text;
}

// Renames a category and, when given, replaces its description (the introduction on its topic page).
export async function renameCategory(id: string, label: unknown, description?: unknown): Promise<Category> {
  const text = cleanLabel(label);
  const intro = description === undefined ? undefined : cleanDescription(description);
  return mutate((data) => {
    const category = data.categories.find((c) => c.id === id);
    if (!category) throw new NotFoundError("Category not found.");
    if (data.categories.some((c) => c.id !== id && c.label.toLowerCase() === text.toLowerCase())) {
      throw new ConflictError("A category with that name already exists.");
    }
    category.label = text;
    if (intro !== undefined) category.description = intro;
    return category;
  });
}

export async function deleteCategory(id: string): Promise<void> {
  await mutate((data) => {
    const i = data.categories.findIndex((c) => c.id === id);
    if (i < 0) throw new NotFoundError("Category not found.");
    const used = data.articles.filter((a) => a.category === id).length;
    if (used) throw new ConflictError(`${used} article${used === 1 ? "" : "s"} still use this category. Move them first.`);
    data.categories.splice(i, 1);
  });
}

export type { ArticleStatus };
