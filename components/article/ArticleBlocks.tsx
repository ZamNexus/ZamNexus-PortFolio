import Reveal from "@/components/motion/Reveal";
import Stagger from "@/components/motion/Stagger";
import PipelineDiagram from "@/components/PipelineDiagram";
import Walkthrough from "@/components/Walkthrough";

// The structured sections of an Insights article. The original seven articles (app/insights/[slug]/
// ArticleClientView.tsx) and articles written in the admin panel (components/cms/RichContent.tsx) both draw their
// sections with these components, so every article on the site looks the same.

const SM_COLS = ["sm:grid-cols-1", "sm:grid-cols-1", "sm:grid-cols-2", "sm:grid-cols-3", "sm:grid-cols-4"];
const MD_COLS = ["md:grid-cols-1", "md:grid-cols-1", "md:grid-cols-2", "md:grid-cols-3"];

interface KeyFiguresProps {
  id: string;
  headingId: string;
  heading: string;
  items: { value: string; label: string }[];
  accent: string;
  // the page-load entrance step, when the block sits in the first screen
  enter?: string;
}

export function KeyFigures({ id, headingId, heading, items, accent, enter }: KeyFiguresProps) {
  return (
    <section id={id} aria-labelledby={headingId} data-enter={enter} className="scroll-mt-28 p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 shadow-xl">
      <h2 id={headingId} className="text-xs font-mono uppercase tracking-widest text-foreground-muted font-bold mb-4">
        {heading}
      </h2>
      <Stagger className={`grid ${items.length === 1 ? "grid-cols-1" : "grid-cols-2"} ${SM_COLS[Math.min(items.length, 4)]} gap-4`}>
        {items.map((item, i) => (
          <div key={i}className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
            <div className="text-[11px] font-mono text-foreground-muted mb-1">{item.label}</div>
            <div className="text-lg sm:text-xl font-mono font-bold text-white tracking-tight" style={{ color: accent }}>
              {item.value}
            </div>
          </div>
        ))}
      </Stagger>
    </section>
  );
}

interface ProblemFixProps {
  id: string;
  accent: string;
  problem: { label: string; title: string; text: string; impactLabel: string; impact: string } | null;
  fix: { label: string; title: string; text: string; points: string[] } | null;
}

export function ProblemFix({ id, accent, problem, fix }: ProblemFixProps) {
  return (
    <Stagger as="section" id={id} className={`scroll-mt-28 grid grid-cols-1 ${problem && fix ? "md:grid-cols-2" : ""} gap-6`}>
      {problem ? (
        <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
            <span>01</span>
            <span>{problem.label}</span>
          </div>
          <h2 className="text-xl font-bold text-white">{problem.title}</h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{problem.text}</p>
          {problem.impact ? (
            <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs font-mono text-rose-300">
              <span className="font-bold">{problem.impactLabel}</span> {problem.impact}
            </div>
          ) : null}
        </div>
      ) : null}

      {fix ? (
        <div className="article-solution p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 space-y-4">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold border"
            style={{
              color: accent,
              borderColor: `color-mix(in srgb, ${accent} 25%, transparent)`,
              background: `color-mix(in srgb, ${accent} 8%, transparent)`,
            }}
          >
            <span>{problem ? "02" : "01"}</span>
            <span>{fix.label}</span>
          </div>
          <h2 className="text-xl font-bold text-white">{fix.title}</h2>
          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">{fix.text}</p>
          {fix.points.length ? (
            <Stagger as="ul" className="space-y-2 pt-1">
              {fix.points.map((h, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-zinc-300 font-mono">
                  <svg className="tick tick--success" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M4 10.5l4 4 8-9" />
                  </svg>
                  <span>{h}</span>
                </li>
              ))}
            </Stagger>
          ) : null}
        </div>
      ) : null}
    </Stagger>
  );
}

interface StepsFlowProps {
  id: string;
  headingId: string;
  heading: string;
  intro?: string;
  steps: { step: string; phase: string; title: string; detail: string }[];
  accent: string;
  // unique per copy on the page, for the diagram's SVG ids
  uid: string;
}

export function StepsFlow({ id, headingId, heading, intro, steps, accent, uid }: StepsFlowProps) {
  return (
    <section id={id} aria-labelledby={headingId} className="scroll-mt-28">
      <Reveal variant="draw" className="mb-12">
        <PipelineDiagram steps={steps} accent={accent} uid={uid} />
      </Reveal>
      <Walkthrough headingId={headingId} title={heading} intro={intro} steps={steps.map((p) => ({ code: p.step, name: p.title, detail: p.detail }))} />
    </section>
  );
}

interface TakeawaysProps {
  id: string;
  heading: string;
  points: string[];
  stackLabel: string;
  stack: string[];
  accent: string;
}

export function Takeaways({ id, heading, points, stackLabel, stack, accent }: TakeawaysProps) {
  return (
    <section id={id} className="scroll-mt-28 p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-6">
      <h2 className="article-label flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-bold" style={{ color: accent }}>
        <span>{heading}</span>
      </h2>

      <Stagger className={`grid grid-cols-1 ${MD_COLS[Math.min(points.length, 3)]} gap-4`}>
        {points.map((point, i) => (
          <div key={i} className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-xs font-mono text-zinc-300 flex items-start gap-2.5">
            <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: accent }} />
            <span className="leading-relaxed">{point}</span>
          </div>
        ))}
      </Stagger>

      {stack.length ? (
        <div className="pt-4 border-t border-zinc-800/60 flex flex-wrap items-center gap-2">
          <span className="text-xs font-mono text-foreground-muted mr-2">{stackLabel}</span>
          {stack.map((tech, i) => (
            <span key={i}className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-700/80 text-[11px] font-mono text-zinc-300">
              {tech}
            </span>
          ))}
        </div>
      ) : null}
    </section>
  );
}
