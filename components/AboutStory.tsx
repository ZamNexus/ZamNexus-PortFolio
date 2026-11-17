import type { CSSProperties } from "react";
import { products } from "@/lib/catalog";

// The About story as a diagram: years of client projects branch into the four platforms they
// led to. Drawn in when it enters the viewport (wrap in <Reveal variant="draw">), with pulses
// flowing out to each platform on .dg-anim only, so it is complete without any animation.

const SOURCE = { x: 70, y: 120 };
const ROWS = [36, 92, 148, 204];

// What the client projects were built with, drawn as a stack of layers: Microsoft's cloud and low-code
// platforms, then the web stack used for this site and the platforms (Next.js and React on TypeScript, with
// Node.js back ends).
const TECH = ["Microsoft Azure", "Power Platform", "Next.js · React", "TypeScript", "Node.js"];
const STACK = { x: 18, top: 72, step: 25, width: 98, height: 20 };

export default function AboutStory() {
  return (
    <div className="service-diagram about-story">
      <svg viewBox="0 0 360 240" role="img" aria-label={`Our client projects, built with ${TECH.join(", ").replace(" · ", " and ")}, led to four platforms: ${products.map((p) => p.code).join(", ")}.`}>
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
          <rect x={8} y={34} width={118} height={166} rx={14} className="dg-box dg-box--accent" />
          <text x={67} y={53} className="dg-label">
            Client projects
          </text>
          <text x={67} y={65} className="dg-sub">
            built with
          </text>
          {/* the spine that holds the layers together */}
          <path
            d={`M${STACK.x + 9} ${STACK.top + STACK.height / 2}V${STACK.top + (TECH.length - 1) * STACK.step + STACK.height / 2}`}
            className="about-story__spine"
          />
          {TECH.map((tech, i) => {
            const y = STACK.top + i * STACK.step;
            return (
              <g key={tech}>
                <rect x={STACK.x} y={y} width={STACK.width} height={STACK.height} rx={6} className="about-story__layer" />
                <circle cx={STACK.x + 9} cy={y + STACK.height / 2} r={2.6} className="about-story__node" />
                <text x={STACK.x + 18} y={y + 13.5} className="about-story__tech">
                  {tech}
                </text>
              </g>
            );
          })}
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
