import type { ReactNode } from "react";
import { services } from "@/lib/catalog";

// The Services hero illustration: "six services, one senior team", drawn as a honeycomb. Each service is a cell
// locked around the team cell at the centre, so the picture says the same thing as the sentence beside it. Six
// is the number of cells that fit exactly around one, which is why the shape works; the drawing therefore shows
// the first six services in the catalogue. Every cell is a link to that service further down the page.
// Static; names come from lib/catalog.ts and colours from the .hx-* classes in globals.css, so it follows the theme.

const R = 76; // cell radius, centre to corner
const GAP = 10; // space between neighbouring cells
const CX = 206;
const CY = 214;
const STEP = Math.sqrt(3) * R + GAP; // centre-to-centre distance between neighbours
const round = (v: number) => Math.round(v * 100) / 100;

// A flat-topped hexagon with softened corners.
function cellPath(cx: number, cy: number, r: number, soften = 8): string {
  const corner = (i: number): [number, number] => {
    const a = (Math.PI / 3) * i;
    return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
  };
  const t = soften / r; // every edge is r long
  let d = "";
  for (let i = 0; i < 6; i++) {
    const [x, y] = corner(i);
    const [px, py] = corner(i + 5);
    const [nx, ny] = corner(i + 1);
    d += `${i === 0 ? "M" : "L"}${round(x + (px - x) * t)} ${round(y + (py - y) * t)}`;
    d += `Q${round(x)} ${round(y)} ${round(x + (nx - x) * t)} ${round(y + (ny - y) * t)}`;
  }
  return `${d}Z`;
}

// A long name is set on two lines, broken at the space nearest its middle.
function labelLines(label: string): string[] {
  if (label.length <= 15) return [label];
  const mid = label.length / 2;
  const spaces = [...label].flatMap((ch, i) => (ch === " " ? [i] : []));
  if (!spaces.length) return [label];
  const cut = spaces.reduce((best, i) => (Math.abs(i - mid) < Math.abs(best - mid) ? i : best));
  return [label.slice(0, cut), label.slice(cut + 1)];
}

// One glyph per service, each drawn on a 24-unit grid in the same line weight.
const ICONS: Record<string, ReactNode> = {
  // a spark: AI at work
  "ai-automation": (
    <>
      <path d="M11 4.5C11.6 9 14 11.4 18.5 12C14 12.6 11.6 15 11 19.5C10.4 15 8 12.6 3.5 12C8 11.4 10.4 9 11 4.5Z" />
      <path d="M19.5 3.2v4.6M17.2 5.5h4.6" />
    </>
  ),
  // an application window with code in it
  saas: (
    <>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <path d="M3 9h18M10.2 12.2L8 14.4l2.2 2.2M13.8 12.2l2.2 2.2-2.2 2.2" />
    </>
  ),
  cloud: <path d="M7 19a5 5 0 0 1-.9-9.92a6.5 6.5 0 0 1 12.4 1.42a4.3 4.3 0 0 1-.8 8.5Z" />,
  // three systems joined
  integration: (
    <>
      <circle cx="5.5" cy="12" r="2.3" />
      <circle cx="18.5" cy="6" r="2.3" />
      <circle cx="18.5" cy="18" r="2.3" />
      <path d="M7.8 12H10c3 0 3-6 6.2-6M10 12c3 0 3 6 6.2 6" />
    </>
  ),
  // a business process: one step feeding two
  microsoft: (
    <>
      <rect x="8.5" y="3.5" width="7" height="5" rx="1.4" />
      <rect x="2.5" y="15.5" width="7" height="5" rx="1.4" />
      <rect x="14.5" y="15.5" width="7" height="5" rx="1.4" />
      <path d="M12 8.5V12M6 15.5v-2A1.5 1.5 0 0 1 7.5 12h9a1.5 1.5 0 0 1 1.5 1.5v2" />
    </>
  ),
  // the customer
  salesforce: (
    <>
      <circle cx="12" cy="8.5" r="3.6" />
      <path d="M4.8 20a7.2 7.2 0 0 1 14.4 0" />
    </>
  ),
};

const FALLBACK_ICON = <circle cx="12" cy="12" r="6" />;

export default function ServicesHeroArt() {
  const ring = services.slice(0, 6);

  return (
    <div className="hero-art hero-art--hex">
      <svg viewBox="0 0 412 428" role="group" aria-label="Six services around one senior team. Each one links to its section below.">
        <circle cx={CX} cy={CY} r={150} className="hx-glow" />

        {ring.map((s, i) => {
          // the first service sits at the top; the rest follow clockwise
          const angle = -Math.PI / 2 + (Math.PI / 3) * i;
          const cx = CX + STEP * Math.cos(angle);
          const cy = CY + STEP * Math.sin(angle);
          const lines = labelLines(s.label);
          const two = lines.length > 1;
          // a pin across the gap, joining the cell to the team cell
          const inner = (Math.sqrt(3) / 2) * R;
          const pin = `M${round(CX + inner * Math.cos(angle))} ${round(CY + inner * Math.sin(angle))}L${round(CX + (inner + GAP) * Math.cos(angle))} ${round(CY + (inner + GAP) * Math.sin(angle))}`;

          return (
            <a key={s.id} id={`hex-${s.id}`} href={`#${s.id}`} aria-label={s.label} className="hx-cell">
              <path d={cellPath(cx, cy, R)} className="hx-shape" />
              <path d={pin} className="hx-pin" />
              <g transform={`translate(${round(cx - 15)} ${round(cy - (two ? 47 : 40))}) scale(1.25)`} className="hx-icon">
                {ICONS[s.id] ?? FALLBACK_ICON}
              </g>
              <text className="hx-label" x={round(cx)} y={round(cy + (two ? 12 : 22))}>
                {lines.map((line, n) => (
                  <tspan key={line} x={round(cx)} dy={n === 0 ? 0 : 16}>
                    {line}
                  </tspan>
                ))}
              </text>
            </a>
          );
        })}

        <path d={cellPath(CX, CY, R)} className="hx-core" />
        <text className="hx-core-label" x={CX} y={CY - 4}>
          <tspan x={CX}>One senior</tspan>
          <tspan x={CX} dy={19}>
            team
          </tspan>
        </text>
      </svg>
    </div>
  );
}
