"use client";

import { Node, NodeViewWrapper, ReactNodeViewRenderer, type Editor, type NodeViewProps } from "@tiptap/react";
import { IconClose } from "@/components/admin/icons";
import {
  BLOCK_DEFAULTS, BLOCK_HELP, BLOCK_NAMES, BLOCK_TYPES, LIMITS, cleanBlockAttrs,
  type BlockType, type KeyFiguresAttrs, type ProblemFixAttrs, type StepsAttrs, type TakeawaysAttrs,
} from "@/lib/cms/blocks";

// The structured sections in the article editor. Each is one block whose content lives in its attributes and is
// edited through a small form, so its layout on the site is always the designed one (see ArticleBlocks.tsx).
// Blocks may only sit at the top level of the article: they belong to their own "section" group, which only
// the document accepts.

/* ───────── Form pieces ───────── */

interface FieldProps {
  label: string;
  value: string;
  max: number;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}

function Field({ label, value, max, onChange, placeholder, rows }: FieldProps) {
  return (
    <label className="adm-block__field">
      <span className="adm-block__label">{label}</span>
      {rows ? (
        <textarea className="adm-textarea" rows={rows} value={value} maxLength={max} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className="adm-input" value={value} maxLength={max} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

interface ListEditorProps {
  label: string;
  items: string[];
  max: number;
  limit: number;
  addLabel: string;
  placeholder: string;
  onChange: (items: string[]) => void;
}

function ListEditor({ label, items, max, limit, addLabel, placeholder, onChange }: ListEditorProps) {
  return (
    <div className="adm-block__field">
      <span className="adm-block__label">{label}</span>
      {items.map((item, i) => (
        <div key={i} className="adm-block__row">
          <input className="adm-input" aria-label={`${label} ${i + 1}`} value={item} maxLength={max} placeholder={placeholder} onChange={(e) => onChange(items.map((x, j) => (j === i ? e.target.value : x)))} />
          <button type="button" className="adm-btn adm-btn--sm" aria-label={`Remove ${label.toLowerCase()} ${i + 1}`} onClick={() => onChange(items.filter((_, j) => j !== i))}>
            <IconClose width={12} height={12} />
          </button>
        </div>
      ))}
      {items.length < limit ? (
        <button type="button" className="adm-btn adm-btn--sm adm-block__add" onClick={() => onChange([...items, ""])}>
          {addLabel}
        </button>
      ) : null}
    </div>
  );
}

/* ───────── The block frame ───────── */

function moveBlock(editor: Editor, pos: number, size: number, dir: -1 | 1) {
  const { state } = editor;
  const index = state.doc.resolve(pos).index(0);
  const target = index + dir;
  if (target < 0 || target >= state.doc.childCount) return;
  const node = state.doc.nodeAt(pos);
  if (!node) return;
  const other = state.doc.child(target);
  const tr = state.tr;
  if (dir === -1) tr.delete(pos, pos + size).insert(pos - other.nodeSize, node);
  else tr.insert(pos + size + other.nodeSize, node).delete(pos, pos + size);
  editor.view.dispatch(tr.scrollIntoView());
}

function Frame({ type, props, children }: { type: BlockType; props: NodeViewProps; children: React.ReactNode }) {
  const { editor, getPos, node, deleteNode, selected } = props;
  const pos = typeof getPos === "function" ? getPos() : undefined;
  const index = typeof pos === "number" ? editor.state.doc.resolve(pos).index(0) : -1;
  const last = editor.state.doc.childCount - 1;
  return (
    <NodeViewWrapper className="adm-block" data-selected={selected ? "true" : undefined} data-type={type}>
      <div className="adm-block__head">
        <span className="adm-block__name">{BLOCK_NAMES[type]}</span>
        <span className="adm-block__help">{BLOCK_HELP[type]}</span>
        <span className="adm-block__tools">
          <button type="button" className="adm-btn adm-btn--sm" disabled={index <= 0} onClick={() => typeof pos === "number" && moveBlock(editor, pos, node.nodeSize, -1)} aria-label={`Move ${BLOCK_NAMES[type]} up`}>
            ↑
          </button>
          <button type="button" className="adm-btn adm-btn--sm" disabled={index < 0 || index >= last} onClick={() => typeof pos === "number" && moveBlock(editor, pos, node.nodeSize, 1)} aria-label={`Move ${BLOCK_NAMES[type]} down`}>
            ↓
          </button>
          <button type="button" className="adm-btn adm-btn--sm adm-btn--danger" onClick={deleteNode} aria-label={`Remove ${BLOCK_NAMES[type]}`}>
            Remove
          </button>
        </span>
      </div>
      <div className="adm-block__body">{children}</div>
    </NodeViewWrapper>
  );
}

/* ───────── The four forms ───────── */

function KeyFiguresView(props: NodeViewProps) {
  const a = props.node.attrs as KeyFiguresAttrs;
  const set = (patch: Partial<KeyFiguresAttrs>) => props.updateAttributes(patch);
  const setItem = (i: number, patch: Partial<KeyFiguresAttrs["items"][number]>) => set({ items: a.items.map((x, j) => (j === i ? { ...x, ...patch } : x)) });
  return (
    <Frame type="keyFigures" props={props}>
      <Field label="Heading" value={a.heading} max={LIMITS.heading} onChange={(heading) => set({ heading })} placeholder="Key figures" />
      <div className="adm-block__grid">
        {a.items.map((item, i) => (
          <div key={i} className="adm-block__card">
            <Field label={`Figure ${i + 1}`} value={item.value} max={LIMITS.figureValue} onChange={(value) => setItem(i, { value })} placeholder="e.g. 0.08s" />
            <Field label="What it measures" value={item.label} max={LIMITS.figureLabel} onChange={(label) => setItem(i, { label })} placeholder="e.g. Offline scan time" />
            {a.items.length > LIMITS.figures[0] ? (
              <button type="button" className="adm-btn adm-btn--sm" onClick={() => set({ items: a.items.filter((_, j) => j !== i) })}>Remove figure</button>
            ) : null}
          </div>
        ))}
      </div>
      {a.items.length < LIMITS.figures[1] ? (
        <button type="button" className="adm-btn adm-btn--sm adm-block__add" onClick={() => set({ items: [...a.items, { value: "", label: "" }] })}>Add a figure</button>
      ) : null}
    </Frame>
  );
}

function ProblemFixView(props: NodeViewProps) {
  const a = props.node.attrs as ProblemFixAttrs;
  const set = (patch: Partial<ProblemFixAttrs>) => props.updateAttributes(patch);
  return (
    <Frame type="problemFix" props={props}>
      <div className="adm-block__grid adm-block__grid--two">
        <div className="adm-block__card">
          <span className="adm-block__side">The problem</span>
          <Field label="Title" value={a.problemTitle} max={LIMITS.title} onChange={(problemTitle) => set({ problemTitle })} placeholder="e.g. Tills stop when the internet drops" />
          <Field label="Explanation" value={a.problemText} max={LIMITS.text} onChange={(problemText) => set({ problemText })} rows={4} />
          <Field label="Business impact (optional)" value={a.impact} max={LIMITS.impact} onChange={(impact) => set({ impact })} rows={2} />
        </div>
        <div className="adm-block__card">
          <span className="adm-block__side">The fix</span>
          <Field label="Title" value={a.fixTitle} max={LIMITS.title} onChange={(fixTitle) => set({ fixTitle })} placeholder="e.g. Each till keeps its own copy of the catalogue" />
          <Field label="Explanation" value={a.fixText} max={LIMITS.text} onChange={(fixText) => set({ fixText })} rows={4} />
          <ListEditor label="Main point" items={a.points} max={LIMITS.point} limit={LIMITS.points} addLabel="Add a point" placeholder="One short sentence" onChange={(points) => set({ points })} />
        </div>
      </div>
    </Frame>
  );
}

function StepsView(props: NodeViewProps) {
  const a = props.node.attrs as StepsAttrs;
  const set = (patch: Partial<StepsAttrs>) => props.updateAttributes(patch);
  const setStep = (i: number, patch: Partial<StepsAttrs["steps"][number]>) => set({ steps: a.steps.map((x, j) => (j === i ? { ...x, ...patch } : x)) });
  return (
    <Frame type="steps" props={props}>
      <Field label="Heading" value={a.heading} max={LIMITS.heading} onChange={(heading) => set({ heading })} placeholder="How it works" />
      <Field label="Introduction (optional)" value={a.intro} max={LIMITS.intro} onChange={(intro) => set({ intro })} placeholder="One sentence on what the steps show" />
      <ol className="adm-block__steps">
        {a.steps.map((step, i) => (
          <li key={i} className="adm-block__card">
            <span className="adm-block__side">Step {i + 1}</span>
            <div className="adm-block__grid adm-block__grid--two">
              <Field label="Step title" value={step.title} max={LIMITS.stepTitle} onChange={(title) => setStep(i, { title })} />
              <Field label="Short label on the diagram" value={step.phase} max={LIMITS.phase} onChange={(phase) => setStep(i, { phase })} placeholder="Uses the title if empty" />
            </div>
            <Field label="What happens" value={step.detail} max={LIMITS.stepDetail} onChange={(detail) => setStep(i, { detail })} rows={3} />
            {a.steps.length > LIMITS.steps[0] ? (
              <button type="button" className="adm-btn adm-btn--sm" onClick={() => set({ steps: a.steps.filter((_, j) => j !== i) })}>Remove step</button>
            ) : null}
          </li>
        ))}
      </ol>
      {a.steps.length < LIMITS.steps[1] ? (
        <button type="button" className="adm-btn adm-btn--sm adm-block__add" onClick={() => set({ steps: [...a.steps, { phase: "", title: "", detail: "" }] })}>Add a step</button>
      ) : null}
    </Frame>
  );
}

function TakeawaysView(props: NodeViewProps) {
  const a = props.node.attrs as TakeawaysAttrs;
  const set = (patch: Partial<TakeawaysAttrs>) => props.updateAttributes(patch);
  return (
    <Frame type="takeaways" props={props}>
      <Field label="Heading" value={a.heading} max={LIMITS.heading} onChange={(heading) => set({ heading })} placeholder="Key takeaways" />
      <ListEditor label="Takeaway" items={a.points} max={LIMITS.point} limit={LIMITS.points} addLabel="Add a takeaway" placeholder="One sentence a reader should remember" onChange={(points) => set({ points })} />
      <ListEditor label="Technology" items={a.stack} max={LIMITS.stackItem} limit={LIMITS.stack} addLabel="Add a technology" placeholder="e.g. Azure Functions" onChange={(stack) => set({ stack })} />
    </Frame>
  );
}

const VIEWS: Record<BlockType, (props: NodeViewProps) => React.ReactNode> = {
  keyFigures: KeyFiguresView,
  problemFix: ProblemFixView,
  steps: StepsView,
  takeaways: TakeawaysView,
};

/* ───────── Extensions ───────── */

// The document accepts ordinary blocks and the structured sections; nothing else accepts the sections.
export const ArticleDocument = Node.create({
  name: "doc",
  topNode: true,
  content: "(block | section)+",
});

function blockNode(type: BlockType) {
  const defaults = BLOCK_DEFAULTS[type]() as unknown as Record<string, unknown>;
  return Node.create({
    name: type,
    group: "section",
    atom: true,
    selectable: true,
    draggable: false,
    isolating: true,
    addAttributes() {
      return Object.fromEntries(Object.keys(defaults).map((k) => [k, { default: defaults[k], rendered: false }]));
    },
    parseHTML() {
      return [
        {
          tag: `div[data-block="${type}"]`,
          getAttrs: (el: HTMLElement) => {
            try {
              return cleanBlockAttrs(type, JSON.parse(el.getAttribute("data-attrs") ?? "{}")) as unknown as Record<string, unknown>;
            } catch {
              return false;
            }
          },
        },
      ];
    },
    renderHTML({ node }) {
      return ["div", { "data-block": type, "data-attrs": JSON.stringify(node.attrs) }];
    },
    addNodeView() {
      return ReactNodeViewRenderer(VIEWS[type]);
    },
  });
}

export const BlockNodes = BLOCK_TYPES.map(blockNode);

// Inserts a block after the top-level block holding the cursor, with an empty paragraph after it when it ends
// the article, so there is always somewhere to keep writing.
export function insertBlock(editor: Editor, type: BlockType) {
  const { $from, to } = editor.state.selection;
  const pos = $from.depth > 0 ? $from.after(1) : to;
  const atEnd = pos >= editor.state.doc.content.size;
  const content = [{ type, attrs: BLOCK_DEFAULTS[type]() as unknown as Record<string, unknown> }, ...(atEnd ? [{ type: "paragraph" }] : [])];
  editor.chain().insertContentAt(pos, content).setNodeSelection(pos).scrollIntoView().run();
}
