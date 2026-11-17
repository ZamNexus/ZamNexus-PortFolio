import { BLOCK_TYPES, blockText, cleanBlockAttrs, isBlock } from "./blocks";
import type { DocNode } from "./types";

// Rules for the article body. The admin editor produces ProseMirror JSON; this module decides what is allowed
// to be stored. Only the node and mark types below are accepted, so a request that bypasses the editor still
// cannot store anything the renderer does not know how to display safely.

export const MEDIA_PATH = /^\/media\/[a-f0-9]{32}\.(png|jpg|webp|gif)$/;

const NODES = new Set([
  "doc",
  "paragraph",
  "heading",
  "bulletList",
  "orderedList",
  "listItem",
  "blockquote",
  "codeBlock",
  "hardBreak",
  "horizontalRule",
  "image",
  "text",
  // structured sections (lib/cms/blocks.ts); their content lives in attributes, never in child nodes
  ...BLOCK_TYPES,
]);
const MARKS = new Set(["bold", "italic", "strike", "underline", "code", "link"]);

const MAX_NODES = 6000;
const MAX_DEPTH = 14;
const MAX_TEXT = 250_000;

export const emptyDoc = (): DocNode => ({ type: "doc", content: [{ type: "paragraph" }] });

export function isSafeHref(href: string): boolean {
  return /^(https?:\/\/|mailto:|\/(?!\/)|#)/i.test(href.trim());
}

type Result = { ok: true; doc: DocNode } | { ok: false; error: string };

// Checks a value is a well-formed article document and returns a cleaned copy (only known attributes kept).
export function validateDoc(value: unknown): Result {
  let nodes = 0;
  let textLength = 0;

  const clean = (raw: unknown, depth: number): DocNode => {
    if (!raw || typeof raw !== "object") throw new Error("Content contains an invalid block.");
    const n = raw as Record<string, unknown>;
    const type = n.type;
    if (typeof type !== "string" || !NODES.has(type)) throw new Error(`Content contains an unsupported block (${String(type)}).`);
    if (depth > MAX_DEPTH) throw new Error("Content is nested too deeply.");
    if (++nodes > MAX_NODES) throw new Error("Content is too long.");

    const out: DocNode = { type };
    const attrs = (n.attrs && typeof n.attrs === "object" ? n.attrs : {}) as Record<string, unknown>;

    if (type === "heading") {
      const level = Number(attrs.level);
      if (![1, 2, 3].includes(level)) throw new Error("Headings must be level 1, 2 or 3.");
      out.attrs = { level };
    }
    if (type === "orderedList") {
      const start = Number(attrs.start);
      out.attrs = { start: Number.isInteger(start) && start >= 1 && start < 10_000 ? start : 1 };
    }
    if (type === "codeBlock") {
      const language = typeof attrs.language === "string" ? attrs.language.slice(0, 30) : null;
      out.attrs = { language: language && /^[\w+#.-]+$/.test(language) ? language : null };
    }
    if (type === "image") {
      const src = typeof attrs.src === "string" ? attrs.src : "";
      if (!MEDIA_PATH.test(src)) throw new Error("Images must be uploaded through the editor.");
      out.attrs = {
        src,
        alt: typeof attrs.alt === "string" ? attrs.alt.slice(0, 300) : "",
        caption: typeof attrs.caption === "string" ? attrs.caption.slice(0, 500) : "",
      };
    }

    if (isBlock(type)) {
      if (depth !== 1) throw new Error("Blocks such as key figures or steps must sit at the top level of the article.");
      const blockAttrs = cleanBlockAttrs(type, attrs);
      textLength += JSON.stringify(blockAttrs).length;
      if (textLength > MAX_TEXT) throw new Error("Content is too long.");
      out.attrs = blockAttrs as unknown as Record<string, unknown>;
      return out;
    }

    if (type === "text") {
      if (typeof n.text !== "string") throw new Error("Content contains an empty text run.");
      textLength += n.text.length;
      if (textLength > MAX_TEXT) throw new Error("Content is too long.");
      out.text = n.text;
      if (Array.isArray(n.marks) && n.marks.length) {
        out.marks = n.marks.map((m) => {
          const mark = m as Record<string, unknown>;
          if (typeof mark.type !== "string" || !MARKS.has(mark.type)) throw new Error("Content contains an unsupported format.");
          if (mark.type === "link") {
            const href = typeof (mark.attrs as Record<string, unknown> | undefined)?.href === "string" ? String((mark.attrs as Record<string, unknown>).href) : "";
            if (!isSafeHref(href) || href.length > 2000) throw new Error("A link in the content is not a valid web or email address.");
            return { type: "link", attrs: { href: href.trim() } };
          }
          return { type: mark.type };
        });
      }
    } else if (Array.isArray(n.content)) {
      out.content = n.content.map((c) => clean(c, depth + 1));
    }
    return out;
  };

  try {
    const doc = clean(value, 0);
    if (doc.type !== "doc") return { ok: false, error: "Content must be a document." };
    return { ok: true, doc };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : "Content is not valid." };
  }
}

export function docToText(node: DocNode | undefined): string {
  if (!node) return "";
  if (node.type === "text") return node.text ?? "";
  if (isBlock(node.type)) return blockText(node) + "\n";
  const inner = (node.content ?? []).map(docToText);
  const blocks = new Set(["paragraph", "heading", "listItem", "blockquote", "codeBlock"]);
  return inner.join(blocks.has(node.type) ? "" : " ") + (blocks.has(node.type) ? "\n" : "");
}

export function hasContent(doc: DocNode): boolean {
  if (docToText(doc).trim().length > 0) return true;
  const walk = (n: DocNode): boolean => n.type === "image" || (n.content ?? []).some(walk);
  return walk(doc);
}

export function readingMinutes(doc: DocNode): number {
  const words = docToText(doc).trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
