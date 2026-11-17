import type { DocNode } from "./types";

// The structured blocks an article can contain besides ordinary text. They are the same sections the original
// seven articles are built from (key figures, the problem and the fix, a step-by-step flow, takeaways), so an
// article written in the admin panel looks like the originals. Pure and browser-safe: the editor, the validator,
// the SEO checklist and the public renderer all use these definitions.

export interface Figure {
  value: string;
  label: string;
}

export interface KeyFiguresAttrs {
  heading: string;
  items: Figure[];
}

export interface ProblemFixAttrs {
  problemTitle: string;
  problemText: string;
  impact: string;
  fixTitle: string;
  fixText: string;
  points: string[];
}

export interface Step {
  phase: string;
  title: string;
  detail: string;
}

export interface StepsAttrs {
  heading: string;
  intro: string;
  steps: Step[];
}

export interface TakeawaysAttrs {
  heading: string;
  points: string[];
  stack: string[];
}

export interface BlockAttrs {
  keyFigures: KeyFiguresAttrs;
  problemFix: ProblemFixAttrs;
  steps: StepsAttrs;
  takeaways: TakeawaysAttrs;
}

export type BlockType = keyof BlockAttrs;

export const BLOCK_TYPES: BlockType[] = ["keyFigures", "problemFix", "steps", "takeaways"];

export const isBlock = (type: string): type is BlockType => (BLOCK_TYPES as string[]).includes(type);

// Limits. Generous enough for real writing, small enough that the layout never breaks.
export const LIMITS = {
  heading: 80,
  intro: 300,
  figures: [2, 4] as const,
  figureValue: 24,
  figureLabel: 60,
  title: 120,
  text: 1200,
  impact: 300,
  points: 6,
  point: 240,
  steps: [2, 6] as const,
  phase: 28,
  stepTitle: 100,
  stepDetail: 600,
  stack: 12,
  stackItem: 40,
};

// What the editor inserts. The text is a prompt for the author, written as the finished block would read.
export const BLOCK_DEFAULTS: { [K in BlockType]: () => BlockAttrs[K] } = {
  keyFigures: () => ({
    heading: "Key figures",
    items: [
      { value: "", label: "" },
      { value: "", label: "" },
      { value: "", label: "" },
    ],
  }),
  problemFix: () => ({ problemTitle: "", problemText: "", impact: "", fixTitle: "", fixText: "", points: ["", ""] }),
  steps: () => ({
    heading: "How it works",
    intro: "",
    steps: [
      { phase: "", title: "", detail: "" },
      { phase: "", title: "", detail: "" },
      { phase: "", title: "", detail: "" },
    ],
  }),
  takeaways: () => ({ heading: "Key takeaways", points: ["", "", ""], stack: [] }),
};

export const BLOCK_NAMES: Record<BlockType, string> = {
  keyFigures: "Key figures",
  problemFix: "Problem and fix",
  steps: "Steps",
  takeaways: "Key takeaways",
};

export const BLOCK_HELP: Record<BlockType, string> = {
  keyFigures: "Two to four short numbers with a label, shown side by side.",
  problemFix: "The problem and its business impact next to the fix and its main points.",
  steps: "A numbered flow, two to six steps, drawn as a line and explained one by one.",
  takeaways: "The points a reader should remember, with the technologies used.",
};

/* ───────── Cleaning (every write) ───────── */

const str = (v: unknown, max: number): string => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "");
const list = (v: unknown): unknown[] => (Array.isArray(v) ? v : []);
const obj = (v: unknown): Record<string, unknown> => (v && typeof v === "object" ? (v as Record<string, unknown>) : {});

// Returns a copy holding only known fields, each trimmed and cut to its limit. Empty rows are kept while the
// author is writing; the renderer skips them, so a half-finished block never shows a gap on the site.
export function cleanBlockAttrs(type: BlockType, raw: unknown): BlockAttrs[BlockType] {
  const a = obj(raw);
  switch (type) {
    case "keyFigures":
      return {
        heading: str(a.heading, LIMITS.heading),
        items: list(a.items).slice(0, LIMITS.figures[1]).map((i) => ({ value: str(obj(i).value, LIMITS.figureValue), label: str(obj(i).label, LIMITS.figureLabel) })),
      };
    case "problemFix":
      return {
        problemTitle: str(a.problemTitle, LIMITS.title),
        problemText: str(a.problemText, LIMITS.text),
        impact: str(a.impact, LIMITS.impact),
        fixTitle: str(a.fixTitle, LIMITS.title),
        fixText: str(a.fixText, LIMITS.text),
        points: list(a.points).slice(0, LIMITS.points).map((p) => str(p, LIMITS.point)),
      };
    case "steps":
      return {
        heading: str(a.heading, LIMITS.heading),
        intro: str(a.intro, LIMITS.intro),
        steps: list(a.steps)
          .slice(0, LIMITS.steps[1])
          .map((s) => ({ phase: str(obj(s).phase, LIMITS.phase), title: str(obj(s).title, LIMITS.stepTitle), detail: str(obj(s).detail, LIMITS.stepDetail) })),
      };
    case "takeaways":
      return {
        heading: str(a.heading, LIMITS.heading),
        points: list(a.points).slice(0, LIMITS.points).map((p) => str(p, LIMITS.point)),
        stack: list(a.stack).slice(0, LIMITS.stack).map((t) => str(t, LIMITS.stackItem)).filter(Boolean),
      };
  }
}

/* ───────── What is actually shown ───────── */

// The filled-in parts of a block, as the public page renders them. null when nothing would be shown.
export function visibleBlock<K extends BlockType>(type: K, raw: unknown): BlockAttrs[K] | null {
  const a = cleanBlockAttrs(type, raw) as BlockAttrs[BlockType];
  switch (type) {
    case "keyFigures": {
      const b = a as KeyFiguresAttrs;
      const items = b.items.filter((i) => i.value && i.label);
      return (items.length ? { heading: b.heading || BLOCK_NAMES.keyFigures, items } : null) as BlockAttrs[K] | null;
    }
    case "problemFix": {
      const b = a as ProblemFixAttrs;
      // each side shows only when it has both a title and its text
      const problem = !!(b.problemTitle && b.problemText);
      const fix = !!(b.fixTitle && b.fixText);
      if (!problem && !fix) return null;
      return {
        problemTitle: problem ? b.problemTitle : "",
        problemText: problem ? b.problemText : "",
        impact: problem ? b.impact : "",
        fixTitle: fix ? b.fixTitle : "",
        fixText: fix ? b.fixText : "",
        points: fix ? b.points.filter(Boolean) : [],
      } as BlockAttrs[K];
    }
    case "steps": {
      const b = a as StepsAttrs;
      const steps = b.steps.filter((s) => s.title && s.detail).map((s) => ({ ...s, phase: s.phase || s.title }));
      return (steps.length >= LIMITS.steps[0] ? { heading: b.heading || BLOCK_NAMES.steps, intro: b.intro, steps } : null) as BlockAttrs[K] | null;
    }
    case "takeaways": {
      const b = a as TakeawaysAttrs;
      const points = b.points.filter(Boolean);
      return (points.length ? { heading: b.heading || BLOCK_NAMES.takeaways, points, stack: b.stack } : null) as BlockAttrs[K] | null;
    }
  }
  return null;
}

// The headings a block puts on the page: the first is an H2, the rest H3.
export function blockHeadings(node: DocNode): string[] {
  if (!isBlock(node.type)) return [];
  const v = visibleBlock(node.type, node.attrs);
  if (!v) return [];
  switch (node.type) {
    case "keyFigures":
      return [(v as KeyFiguresAttrs).heading];
    case "problemFix": {
      const b = v as ProblemFixAttrs;
      return [b.problemTitle, b.fixTitle].filter(Boolean);
    }
    case "steps": {
      const b = v as StepsAttrs;
      return [b.heading, ...b.steps.map((s) => s.title)];
    }
    case "takeaways":
      return [(v as TakeawaysAttrs).heading];
  }
  return [];
}

// All the words a block shows, for word counts, reading time and the SEO checklist.
export function blockText(node: DocNode): string {
  if (!isBlock(node.type)) return "";
  const v = visibleBlock(node.type, node.attrs);
  if (!v) return "";
  switch (node.type) {
    case "keyFigures":
      return [(v as KeyFiguresAttrs).heading, ...(v as KeyFiguresAttrs).items.flatMap((i) => [i.value, i.label])].join("\n");
    case "problemFix": {
      const b = v as ProblemFixAttrs;
      return [b.problemTitle, b.problemText, b.impact, b.fixTitle, b.fixText, ...b.points].filter(Boolean).join("\n");
    }
    case "steps": {
      const b = v as StepsAttrs;
      return [b.heading, b.intro, ...b.steps.flatMap((s) => [s.title, s.detail])].filter(Boolean).join("\n");
    }
    case "takeaways": {
      const b = v as TakeawaysAttrs;
      return [b.heading, ...b.points, ...b.stack].filter(Boolean).join("\n");
    }
  }
  return "";
}

/* ───────── Contents list ───────── */

export interface OutlineEntry {
  // position of the block among the document's top-level blocks
  index: number;
  id: string;
  name: string;
}

const anchor = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60) || "section";

function plain(node: DocNode): string {
  if (node.type === "text") return node.text ?? "";
  return (node.content ?? []).map(plain).join("");
}

// The article's sections, in order: every top-level H2 and every block that has something to show. Both the
// contents list and the renderer use this, so each entry's link always matches an id on the page.
export function outline(doc: DocNode): OutlineEntry[] {
  const used = new Set<string>();
  const entries: OutlineEntry[] = [];
  (doc.content ?? []).forEach((node, index) => {
    let name = "";
    if (node.type === "heading" && Number(node.attrs?.level) <= 2) name = plain(node).trim();
    else if (node.type === "problemFix" && visibleBlock("problemFix", node.attrs)) name = BLOCK_NAMES.problemFix;
    else if (isBlock(node.type)) name = blockHeadings(node)[0] ?? "";
    if (!name) return;
    let id = anchor(name);
    for (let n = 2; used.has(id); n++) id = `${anchor(name)}-${n}`;
    used.add(id);
    // the contents column is narrow: long headings are shortened there (the heading itself is unchanged)
    const cut = name.lastIndexOf(" ", 26);
    entries.push({ index, id, name: name.length > 28 ? `${name.slice(0, cut > 0 ? cut : 26)}…` : name });
  });
  return entries;
}
