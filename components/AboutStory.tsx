import type { CSSProperties } from "react";
import { products } from "@/lib/catalog";

// The About story as a diagram: years of client projects branch into the four platforms they
// led to. Drawn in when it enters the viewport (wrap in <Reveal variant="draw">), with pulses
// flowing out to each platform on .dg-anim only, so it is complete without any animation.

const SOURCE = { x: 70, y: 120 };
const ROWS = [36, 92, 148, 204];

export default function AboutStory() {
  return (
    <div className="service-diagram about-story">
      <svg viewBox="0 0 360 240" role="img" aria-label={`Our client projects led to four platforms: ${products.map((p) => p.code).join(", ")}.`}>
        {products.map((p, i) => (
          <path
            key={p.slug}
            id={`about-path-${i}`}
            d={`M${SOURCE.x + 52} ${SOURCE.y} C200 ${SOURCE.y} 200 ${ROWS[i]} 262 ${ROWS[i]}`}
            pathLength={1}
            className="dg-line dg-line--flow"
          />
        ))}
        {/* Pulses travel out to each platform, passing under the boxes */}
        {products.map((p, i) => (
          <circle key={p.slug} r={4} className="dg-anim dg-pulse about-story__pulse" style={{ "--rail": p.accent } as CSSProperties}>
            <animateMotion dur="3.2s" begin={`${i * 0.8}s`} repeatCount="indefinite">
              <mpath href={`#about-path-${i}`} />
            </animateMotion>
          </circle>
        ))}
        <g className="dg-node dg-d1">
          <rect x={SOURCE.x - 56} y={SOURCE.y - 34} width={112} height={68} rx={12} className="dg-box dg-box--accent" />
          <text x={SOURCE.x} y={SOURCE.y - 6} className="dg-label">
            Client projects
          </text>
          <text x={SOURCE.x} y={SOURCE.y + 10} className="dg-sub">
            Dynamics 365,
          </text>
          <text x={SOURCE.x} y={SOURCE.y + 23} className="dg-sub">
            ledgers, CRM
          </text>
        </g>
        {products.map((p, i) => (
          <g key={p.slug} className={`dg-node dg-d${(i + 2) as 2 | 3 | 4 | 5}`} style={{ "--rail": p.accent } as CSSProperties}>
            <rect x={262} y={ROWS[i] - 18} width={92} height={36} rx={10} className="dg-box about-story__product" />
            <circle cx={278} cy={ROWS[i]} r={4} className="about-story__dot" />
            <text x={290} y={ROWS[i] + 4} className="dg-label dg-label--start">
              {p.code}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
