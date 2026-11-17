import { blockHeadings, blockText, isBlock } from "./blocks";
import { slugify } from "./validate";
import type { DocNode } from "./types";

// The SEO checklist shown in the article editor. Pure and browser-safe: it runs on every keystroke. It measures
// what search engines actually see: the page title is the SEO title (or the article title) exactly as written,
// and the description is the meta description (or the short description), cut at 155 characters.

export interface SeoInput {
  keyword: string;
  title: string;
  seoTitle: string;
  slug: string;
  excerpt: string;
  seoDescription: string;
  doc: DocNode;
}

export interface SeoCheck {
  id: string;
  ok: boolean;
  // what is being checked, as a short statement of the goal
  label: string;
  // the current state, or what to do about it
  detail: string;
}

export const TITLE_RANGE = [30, 60] as const;
export const DESCRIPTION_RANGE = [120, 155] as const;
export const MIN_WORDS = 900;
export const MIN_INTERNAL_LINKS = 2;
export const MIN_SUBHEADINGS = 2;

// Cuts a description the way the article page does (app/insights/[slug]/page.tsx), so the preview matches.
export function snippet(text: string, max: number = DESCRIPTION_RANGE[1]): string {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,;:]$/, "") + "…";
}

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();
const has = (haystack: string, keyword: string) => !!keyword && norm(haystack).includes(norm(keyword));

interface DocFacts {
  firstParagraph: string;
  subheadings: string[];
  bodyH1: number;
  words: number;
  images: number;
  imagesWithoutAlt: number;
  internalLinks: number;
}

function textOf(node: DocNode): string {
  if (node.type === "text") return node.text ?? "";
  if (node.type === "hardBreak") return " ";
  return (node.content ?? []).map(textOf).join("");
}

function factsOf(doc: DocNode): DocFacts {
  const facts: DocFacts = { firstParagraph: "", subheadings: [], bodyH1: 0, words: 0, images: 0, imagesWithoutAlt: 0, internalLinks: 0 };
  const links = new Set<string>();
  const countWords = (text: string) => text.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w)).length;
  const visit = (node: DocNode) => {
    if (isBlock(node.type)) {
      // a structured section: its headings are real H2/H3s on the page and its text is read like any other
      facts.subheadings.push(...blockHeadings(node));
      facts.words += countWords(blockText(node));
      return;
    }
    if (node.type === "paragraph" && !facts.firstParagraph) {
      const t = textOf(node).trim();
      if (t) facts.firstParagraph = t;
    }
    if (node.type === "heading") {
      const level = Number(node.attrs?.level);
      if (level === 1) facts.bodyH1++;
      else facts.subheadings.push(textOf(node));
    }
    if (node.type === "image") {
      facts.images++;
      if (!String(node.attrs?.alt ?? "").trim()) facts.imagesWithoutAlt++;
    }
    if (node.type === "text") {
      facts.words += countWords(node.text ?? "");
      for (const mark of node.marks ?? []) {
        const href = mark.type === "link" ? String(mark.attrs?.href ?? "") : "";
        // a link to another page of this site, not to an anchor on the same page
        if (/^\/[^/]/.test(href) || /^https?:\/\/(www\.)?zamnexus\.com\//i.test(href)) links.add(href.replace(/#.*$/, ""));
      }
    }
    for (const child of node.content ?? []) visit(child);
  };
  visit(doc);
  facts.internalLinks = links.size;
  return facts;
}

export function seoChecks(input: SeoInput): { checks: SeoCheck[]; passed: number; words: number } {
  const keyword = input.keyword.trim();
  const pageTitle = (input.seoTitle || input.title).trim();
  const description = (input.seoDescription || input.excerpt).trim();
  const f = factsOf(input.doc);
  const needKeyword = "Add a focus keyword first.";
  const keywordSlug = slugify(keyword);

  const checks: SeoCheck[] = [
    {
      id: "keyword",
      ok: keyword.length > 0,
      label: "A focus keyword is chosen",
      detail: keyword ? `“${keyword}”` : "The phrase people would type into Google to find this article.",
    },
    {
      id: "keyword-title",
      ok: has(pageTitle, keyword),
      label: "The keyword is in the page title",
      detail: keyword ? (has(pageTitle, keyword) ? "Yes." : "Work it into the SEO title, ideally near the start.") : needKeyword,
    },
    {
      id: "title-length",
      ok: pageTitle.length >= TITLE_RANGE[0] && pageTitle.length <= TITLE_RANGE[1],
      label: `The page title is ${TITLE_RANGE[0]}–${TITLE_RANGE[1]} characters`,
      detail: `${pageTitle.length} now.${pageTitle.length > TITLE_RANGE[1] ? " Google cuts off the rest." : ""}`,
    },
    {
      id: "keyword-slug",
      ok: !!keywordSlug && input.slug.includes(keywordSlug),
      label: "The keyword is in the address",
      detail: keyword ? `Looking for “${keywordSlug}” in /insights/${input.slug || "…"}` : needKeyword,
    },
    {
      id: "keyword-description",
      ok: has(description, keyword),
      label: "The keyword is in the description",
      detail: keyword ? (has(description, keyword) ? "Yes." : "Use it in the meta description (or the short description).") : needKeyword,
    },
    {
      id: "description-length",
      ok: description.length >= DESCRIPTION_RANGE[0] && description.length <= DESCRIPTION_RANGE[1],
      label: `The description is ${DESCRIPTION_RANGE[0]}–${DESCRIPTION_RANGE[1]} characters`,
      detail: `${description.length} now.${description.length > DESCRIPTION_RANGE[1] ? " Longer text is cut off." : ""}`,
    },
    {
      id: "keyword-intro",
      ok: has(f.firstParagraph, keyword),
      label: "The keyword is in the first paragraph",
      detail: keyword ? (has(f.firstParagraph, keyword) ? "Yes." : "Mention it early, in the opening paragraph.") : needKeyword,
    },
    {
      id: "keyword-subheading",
      ok: f.subheadings.some((h) => has(h, keyword)),
      label: "The keyword is in a sub-heading",
      detail: keyword ? (f.subheadings.some((h) => has(h, keyword)) ? "Yes." : "Use it, or a close variant, in an H2 or H3.") : needKeyword,
    },
    {
      id: "words",
      ok: f.words >= MIN_WORDS,
      label: `At least ${MIN_WORDS} words`,
      detail: `${f.words} now. Technical topics rank better with depth.`,
    },
    {
      id: "structure",
      ok: f.subheadings.length >= MIN_SUBHEADINGS && f.bodyH1 === 0,
      label: "Sections use sub-headings, not H1",
      detail:
        f.bodyH1 > 0
          ? "The article title is already the page's H1. Change H1s in the text to H2."
          : `${f.subheadings.length} sub-heading${f.subheadings.length === 1 ? "" : "s"} now; use at least ${MIN_SUBHEADINGS}.`,
    },
    {
      id: "alt",
      ok: f.imagesWithoutAlt === 0,
      label: "Every image has a description",
      detail: f.images === 0 ? "No images in the text." : f.imagesWithoutAlt ? `${f.imagesWithoutAlt} of ${f.images} have no description (alt text).` : "Yes.",
    },
    {
      id: "links",
      ok: f.internalLinks >= MIN_INTERNAL_LINKS,
      label: `At least ${MIN_INTERNAL_LINKS} links to other ZamNexus pages`,
      detail: `${f.internalLinks} now. Link to the services or products the article relates to, e.g. /services#cloud.`,
    },
  ];
  return { checks, passed: checks.filter((c) => c.ok).length, words: f.words };
}
