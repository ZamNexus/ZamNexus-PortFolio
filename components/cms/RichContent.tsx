import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { KeyFigures, ProblemFix, StepsFlow, Takeaways } from "@/components/article/ArticleBlocks";
import { isBlock, outline, visibleBlock } from "@/lib/cms/blocks";
import type { DocMark, DocNode } from "@/lib/cms/types";

// Renders a stored article document as React elements. There is no dangerouslySetInnerHTML anywhere: the
// document was validated on the way in (see lib/cms/content.ts) and only the node and mark types handled
// below can ever appear, each turned into a plain element. Styling comes from .cms-prose in globals.css.

function withMarks(text: string, marks: DocMark[] | undefined, key: string): ReactNode {
  let node: ReactNode = text;
  for (const mark of marks ?? []) {
    switch (mark.type) {
      case "bold":
        node = <strong key={key}>{node}</strong>;
        break;
      case "italic":
        node = <em key={key}>{node}</em>;
        break;
      case "strike":
        node = <s key={key}>{node}</s>;
        break;
      case "underline":
        node = <u key={key}>{node}</u>;
        break;
      case "code":
        node = <code key={key}>{node}</code>;
        break;
      case "link": {
        const href = String(mark.attrs?.href ?? "");
        node = /^https?:\/\//i.test(href) ? (
          <a key={key} href={href} target="_blank" rel="noopener noreferrer">
            {node}
          </a>
        ) : href.startsWith("/") ? (
          <Link key={key} href={href}>
            {node}
          </Link>
        ) : (
          <a key={key} href={href}>
            {node}
          </a>
        );
        break;
      }
    }
  }
  return node;
}

function children(node: DocNode, path: string): ReactNode[] {
  return (node.content ?? []).map((c, i) => render(c, `${path}.${i}`));
}

function render(node: DocNode, key: string): ReactNode {
  switch (node.type) {
    case "text":
      return <span key={key}>{withMarks(node.text ?? "", node.marks, key)}</span>;
    case "paragraph":
      return (node.content ?? []).length ? <p key={key}>{children(node, key)}</p> : null;
    case "heading": {
      const level = Number(node.attrs?.level);
      return level === 3 ? <h3 key={key}>{children(node, key)}</h3> : <h2 key={key} className={level === 1 ? "cms-h1" : undefined}>{children(node, key)}</h2>;
    }
    case "bulletList":
      return <ul key={key}>{children(node, key)}</ul>;
    case "orderedList":
      return (
        <ol key={key} start={Number(node.attrs?.start) || 1}>
          {children(node, key)}
        </ol>
      );
    case "listItem":
      return <li key={key}>{children(node, key)}</li>;
    case "blockquote":
      return <blockquote key={key}>{children(node, key)}</blockquote>;
    case "codeBlock":
      return (
        <pre key={key}>
          <code>{(node.content ?? []).map((c) => c.text ?? "").join("")}</code>
        </pre>
      );
    case "hardBreak":
      return <br key={key} />;
    case "horizontalRule":
      return <hr key={key} />;
    case "image": {
      const src = String(node.attrs?.src ?? "");
      const alt = String(node.attrs?.alt ?? "");
      const caption = String(node.attrs?.caption ?? "");
      return (
        <figure key={key}>
          <Image src={src} alt={alt} width={1400} height={900} sizes="(min-width: 1024px) 800px, 100vw" className="w-full h-auto" />
          {caption ? <figcaption>{caption}</figcaption> : null}
        </figure>
      );
    }
    default:
      return null;
  }
}

const ACCENT = "var(--accent-text)";

// A structured section, drawn by the same components as the original articles' sections.
function renderBlock(node: DocNode, id: string, uid: string): ReactNode {
  switch (node.type) {
    case "keyFigures": {
      const b = visibleBlock("keyFigures", node.attrs);
      return b ? <KeyFigures key={id} id={id} headingId={`${id}-h`} heading={b.heading} items={b.items} accent={ACCENT} /> : null;
    }
    case "problemFix": {
      const b = visibleBlock("problemFix", node.attrs);
      if (!b) return null;
      return (
        <ProblemFix
          key={id}
          id={id}
          accent={ACCENT}
          problem={b.problemTitle && b.problemText ? { label: "The problem", title: b.problemTitle, text: b.problemText, impactLabel: "Business impact:", impact: b.impact } : null}
          fix={b.fixTitle && b.fixText ? { label: "The fix", title: b.fixTitle, text: b.fixText, points: b.points } : null}
        />
      );
    }
    case "steps": {
      const b = visibleBlock("steps", node.attrs);
      if (!b) return null;
      const steps = b.steps.map((s, i) => ({ step: String(i + 1).padStart(2, "0"), phase: s.phase, title: s.title, detail: s.detail }));
      return <StepsFlow key={id} id={id} headingId={`${id}-h`} heading={b.heading} intro={b.intro || undefined} steps={steps} accent={ACCENT} uid={`${uid}-${id}`} />;
    }
    case "takeaways": {
      const b = visibleBlock("takeaways", node.attrs);
      return b ? <Takeaways key={id} id={id} heading={b.heading} points={b.points} stackLabel="Technologies:" stack={b.stack} accent={ACCENT} /> : null;
    }
  }
  return null;
}

interface RichContentProps {
  doc: DocNode;
  // unique per article, for the SVG ids inside step diagrams
  uid?: string;
}

// Runs of ordinary text are set in .cms-prose; each structured block sits between them at full width, outside the
// prose styles, so it looks exactly like the same section in an original article.
export default function RichContent({ doc, uid = "article" }: RichContentProps) {
  const anchors = new Map(outline(doc).map((e) => [e.index, e.id]));
  const groups: ReactNode[] = [];
  let run: ReactNode[] = [];
  const flush = () => {
    if (run.length) groups.push(<div key={`p${groups.length}`} className="cms-prose">{run}</div>);
    run = [];
  };

  (doc.content ?? []).forEach((node, i) => {
    const key = `d.${i}`;
    const id = anchors.get(i);
    if (isBlock(node.type)) {
      const block = renderBlock(node, id ?? `block-${i}`, uid);
      if (block) {
        flush();
        groups.push(block);
      }
      return;
    }
    if (node.type === "heading" && id) {
      const level = Number(node.attrs?.level);
      run.push(
        <h2 key={key} id={id} className={`scroll-mt-28${level === 1 ? " cms-h1" : ""}`}>
          {children(node, key)}
        </h2>
      );
      return;
    }
    run.push(render(node, key));
  });
  flush();

  return <div className="space-y-12">{groups}</div>;
}
