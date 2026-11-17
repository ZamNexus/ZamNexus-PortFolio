import { MEDIA_PATH, hasContent, validateDoc } from "./content";
import type { Article, ArticleInput, FieldErrors } from "./types";

export const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90)
    .replace(/-$/, "");
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

// Turns an untrusted request body into the fields an admin may edit, or the problems with it. This is the
// "can it be saved at all" check, so it only demands a title; what an article needs to go live is checked
// separately by publishProblems().
export function normalizeInput(raw: unknown): { input?: ArticleInput; errors: FieldErrors } {
  const errors: FieldErrors = {};
  const b = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;

  const title = str(b.title, 200);
  if (title.length < 3) errors.title = "Enter a title of at least 3 characters.";
  else if (title.length > 160) errors.title = "Keep the title under 160 characters.";

  let slug = str(b.slug, 120).toLowerCase();
  if (!slug && title) slug = slugify(title);
  if (!slug) errors.slug = "Enter a URL slug.";
  else if (!SLUG.test(slug) || slug.length > 90) errors.slug = "Use lowercase letters, numbers and single hyphens only (up to 90 characters).";

  const excerpt = str(b.excerpt, 600);
  if (excerpt.length > 400) errors.excerpt = "Keep the short description under 400 characters.";

  const docResult = validateDoc(b.content ?? { type: "doc", content: [{ type: "paragraph" }] });
  if (!docResult.ok) errors.content = docResult.error;

  const image = (v: unknown, field: "coverImage" | "socialImage") => {
    if (v === null || v === undefined || v === "") return null;
    if (typeof v === "string" && MEDIA_PATH.test(v)) return v;
    errors[field] = "Use an image uploaded through the panel.";
    return null;
  };
  const coverImage = image(b.coverImage, "coverImage");
  const socialImage = image(b.socialImage, "socialImage");

  const tags = Array.isArray(b.tags)
    ? [...new Set(b.tags.map((t) => str(t, 40)).filter(Boolean))].slice(0, 12)
    : [];

  const seoTitle = str(b.seoTitle, 120);
  if (seoTitle.length > 70) errors.seoTitle = "Keep the SEO title under 70 characters.";
  const seoDescription = str(b.seoDescription, 300);
  if (seoDescription.length > 200) errors.seoDescription = "Keep the meta description under 200 characters.";
  const focusKeyword = str(b.focusKeyword, 120);
  if (focusKeyword.length > 60) errors.focusKeyword = "Keep the focus keyword under 60 characters.";

  if (Object.keys(errors).length || !docResult.ok) return { errors };

  return {
    errors,
    input: {
      title,
      slug,
      excerpt,
      content: docResult.doc,
      coverImage,
      author: str(b.author, 80),
      category: str(b.category, 60),
      tags,
      featured: b.featured === true,
      seoTitle,
      seoDescription,
      focusKeyword,
      socialImage,
    },
  };
}

// What an article needs before it can be published; checked on every publish, so a draft can stay rough.
export function publishProblems(a: Pick<Article, "title" | "slug" | "excerpt" | "content" | "author" | "category">, categoryIds: string[]): FieldErrors {
  const errors: FieldErrors = {};
  if (!a.title.trim()) errors.title = "A title is required to publish.";
  if (!a.slug) errors.slug = "A URL slug is required to publish.";
  if (a.excerpt.trim().length < 20) errors.excerpt = "Write a short description of at least 20 characters to publish.";
  if (!hasContent(a.content)) errors.content = "Add the article content to publish.";
  if (!a.author.trim()) errors.author = "Add an author name to publish.";
  if (!a.category || !categoryIds.includes(a.category)) errors.category = "Choose a category to publish.";
  return errors;
}
