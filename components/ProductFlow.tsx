import { flows } from "@/lib/catalog";
import type { ProductSlug } from "@/lib/siteFacts";

// The product's own event flow (lib/catalog.ts) as a small diagram for the hero: one event
// travels through five modules and each lights as it arrives. Plays on page load (CSS, like the
// hero entrance), loops on .dg-anim only, and is complete without any animation.

interface ProductFlowProps {
  slug: ProductSlug;
}

const X = [36, 108, 180, 252, 324];
const Y = 96;
// The pulse crosses the line in the first 80% of each loop, then all stops reset together.
const TRAVEL = 0.8;

function litTiming(i: number) {
  if (i === 0) return { values: "1;1;0", keyTimes: "0;0.94;1" };
  const t = (TRAVEL * i) / (X.length - 1);
  return { values: "0;0;1;1;0", keyTimes: `0;${(t - 0.02).toFixed(3)};${t.toFixed(3)};0.94;1` };
}

export default function ProductFlow({ slug }: ProductFlowProps) {
  const flow = flows.find((f) => f.slug === slug);
  if (!flow) return null;
  const pathId = `pf-path-${slug}`;
  const names = flow.steps.map((s) => s.name.toLowerCase()).join(", ");

  return (
    <div className="product-flow">
      <svg viewBox="0 0 360 190" role="img" aria-label={`${flow.event}: ${names}, all on one system.`}>
        <text x={180} y={22} className="dg-sub dg-sub--strong dg-node dg-d1">
          {flow.event}
        </text>
        <path id={pathId} d={`M${X[0]} ${Y} H${X[X.length - 1]}`} pathLength={1} className="dg-line dg-line--flow" />
        {/* Wrapped so the load fade (CSS) never fights the SMIL loop */}
        <g className="pf-late">
          <circle r={5} className="dg-anim dg-pulse">
            <animateMotion dur="6.5s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes={`0;${TRAVEL};1`} calcMode="linear">
              <mpath href={`#${pathId}`} />
            </animateMotion>
          </circle>
        </g>
        {flow.steps.map((step, i) => {
          const lit = litTiming(i);
          return (
            <g key={step.code} className={`dg-node dg-d${(i + 1) as 1 | 2 | 3 | 4 | 5}`}>
              <circle cx={X[i]} cy={Y} r={22} className="dg-box" />
              <circle cx={X[i]} cy={Y} r={22} className="dg-anim pf-lit">
                <animate attributeName="opacity" values={lit.values} keyTimes={lit.keyTimes} dur="6.5s" repeatCount="indefinite" />
              </circle>
              <text x={X[i]} y={Y + 4} className="pf-code">
                {step.code}
              </text>
              <text x={X[i]} y={Y + 44} className="dg-sub">
                {step.name}
              </text>
            </g>
          );
        })}
        <text x={180} y={176} className="dg-caption dg-node dg-d5">
          One record, every step
        </text>
      </svg>
    </div>
  );
}
