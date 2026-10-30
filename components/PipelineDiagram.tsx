import type { CSSProperties } from "react";

interface PipelineStage {
  step: string;
  phase: string;
}

interface PipelineDiagramProps {
  steps: PipelineStage[];
  accent: string;
  // Unique per copy on the page, for the SVG ids
  uid: string;
  // Small, unlabelled version for article cards; its pulse runs only while the card is hovered
  compact?: boolean;
}

// An article's pipeline as a line of stages with a pulse that lights each in turn. The loop is
// SVG on .dg-anim only, which reduced motion hides; the drawn pipeline is complete without it.
const TRAVEL = 0.8;
const DUR = "5s";

function litTiming(i: number, n: number) {
  if (i === 0) return { values: "1;1;0", keyTimes: "0;0.94;1" };
  const t = (TRAVEL * i) / (n - 1);
  return { values: "0;0;1;1;0", keyTimes: `0;${(t - 0.02).toFixed(3)};${t.toFixed(3)};0.94;1` };
}

// "Deterministic Validation" -> ["Deterministic", "Validation"]; short phases stay on one line.
function lines(phase: string): string[] {
  const words = phase.split(" ");
  if (phase.length <= 14 || words.length < 2) return [phase];
  const mid = Math.ceil(words.length / 2);
  return [words.slice(0, mid).join(" "), words.slice(mid).join(" ")];
}

export default function PipelineDiagram({ steps, accent, uid, compact = false }: PipelineDiagramProps) {
  const n = steps.length;
  const x = (i: number) => 45 + (270 * i) / Math.max(n - 1, 1);
  const y = compact ? 22 : 50;
  const r = compact ? 8 : 22;
  const pathId = `${uid}-pipe`;

  return (
    <div className={`pipeline ${compact ? "pipeline--compact" : ""}`} style={{ "--rail": accent } as CSSProperties}>
      <svg
        viewBox={compact ? "0 0 360 44" : "0 0 360 130"}
        role={compact ? undefined : "img"}
        aria-hidden={compact ? true : undefined}
        aria-label={compact ? undefined : `Pipeline: ${steps.map((s) => s.phase).join(", then ")}.`}
      >
        <path id={pathId} d={`M${x(0)} ${y} H${x(n - 1)}`} pathLength={1} className="dg-line pl-line" />
        <circle r={compact ? 4 : 5} className="dg-anim pl-pulse">
          <animateMotion dur={DUR} repeatCount="indefinite" keyPoints="0;1;1" keyTimes={`0;${TRAVEL};1`} calcMode="linear">
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </circle>
        {steps.map((s, i) => {
          const lit = litTiming(i, n);
          return (
            <g key={s.step} className={`dg-node dg-d${Math.min(i + 1, 5) as 1 | 2 | 3 | 4 | 5}`}>
              <circle cx={x(i)} cy={y} r={r} className="pl-node" />
              <circle cx={x(i)} cy={y} r={r} className="dg-anim pl-lit">
                <animate attributeName="opacity" values={lit.values} keyTimes={lit.keyTimes} dur={DUR} repeatCount="indefinite" />
              </circle>
              {compact ? null : (
                <>
                  <text x={x(i)} y={y + 4} className="pl-step">
                    {s.step}
                  </text>
                  {lines(s.phase).map((line, j) => (
                    <text key={line} x={x(i)} y={y + 44 + j * 13} className="dg-sub">
                      {line}
                    </text>
                  ))}
                </>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
