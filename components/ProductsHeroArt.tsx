import type { ReactNode } from "react";
import { products } from "@/lib/catalog";
import type { ProductSlug } from "@/lib/siteFacts";

// The Products hero illustration: the four places the platforms run, a factory, a shop, a school and a hospital,
// drawn in one line style on one ground line, each named with its platform and sector. It pictures the headline
// ("built for the way your sector works") without repeating the product blocks below, which show the software.
// Static; names come from lib/catalog.ts and colours from the .sk-* classes in globals.css, so it follows the theme.

const GROUND = 214;
const MARGIN = 8;
const COLUMN = 99; // each building has its own column; four of them and the margins make the 412-unit width

interface Building {
  width: number;
  art: ReactNode;
}

// Which ward windows are lit, as "row-column"
const LIT_WARDS = new Set(["0-1", "2-0", "3-2", "4-1"]);

// Every building is drawn from its own left edge (x = 0) and stands on the ground line (y = 214).
const BUILDINGS: Record<ProductSlug, Building> = {
  // Manufacturing: a hall with a saw-tooth roof and a chimney
  znxerp: {
    width: 86,
    art: (
      <>
        <circle cx="20" cy="47" r="5" className="sk-smoke" />
        <circle cx="30" cy="36" r="7" className="sk-smoke" />
        <circle cx="43" cy="28" r="5" className="sk-smoke" />
        <rect x="9" y="66" width="14" height="148" className="sk-body" />
        <rect x="7" y="61" width="18" height="6" rx="1.5" className="sk-shade" />
        <path d="M9 82h14M9 92h14" className="sk-line" />
        <path d="M0 140V116L28.67 140V116L57.33 140V116L86 140Z" className="sk-shade" />
        <rect x="0" y="140" width="86" height="74" className="sk-body" />
        <rect x="8" y="154" width="10" height="14" rx="1" className="sk-win" />
        <rect x="22" y="154" width="10" height="14" rx="1" className="sk-lit" />
        <rect x="36" y="154" width="10" height="14" rx="1" className="sk-win" />
        <rect x="8" y="184" width="38" height="10" rx="1" className="sk-win" />
        <rect x="52" y="172" width="26" height="42" className="sk-shade" />
        <path d="M52 182h26M52 192h26M52 202h26" className="sk-line" />
      </>
    ),
  },
  // Retail: a shopfront with a striped awning
  znxepos: {
    width: 78,
    art: (
      <>
        <rect x="0" y="110" width="78" height="104" className="sk-body" />
        <rect x="-3" y="105" width="84" height="6" rx="1.5" className="sk-shade" />
        <rect x="10" y="122" width="20" height="24" rx="1" className="sk-win" />
        <rect x="48" y="122" width="20" height="24" rx="1" className="sk-lit" />
        <path d="M10 134h20M48 134h20" className="sk-mullion" />
        <rect x="9" y="154" width="60" height="11" rx="2.5" className="sk-shade" />
        <rect x="23" y="158" width="32" height="3" rx="1.5" className="sk-lit" />
        <path d="M0 170H78L83 183H-5Z" className="sk-body" />
        <path d="M0 170H13L9.67 183H-5ZM26 170H39V183H24.33ZM52 170H65L68.33 183H53.67Z" className="sk-lit" />
        <path d="M0 170H78L83 183H-5Z" className="sk-line" />
        <rect x="8" y="190" width="36" height="18" rx="1" className="sk-win" />
        <path d="M26 190v18" className="sk-mullion" />
        <rect x="52" y="188" width="18" height="26" className="sk-shade" />
        <circle cx="55.5" cy="202" r="1.1" className="sk-lit" />
      </>
    ),
  },
  // Education: two wings, a clock under the pediment and a flag
  znxedu: {
    width: 88,
    art: (
      <>
        <path d="M44 100V76" className="sk-line" />
        <path d="M44 77H57L54 81.5L57 86H44Z" className="sk-lit" />
        <rect x="0" y="138" width="88" height="76" className="sk-body" />
        <rect x="-2" y="134" width="92" height="5" rx="1.2" className="sk-shade" />
        <rect x="29" y="122" width="30" height="92" className="sk-body" />
        <path d="M25 122L44 100L63 122Z" className="sk-shade" />
        <circle cx="44" cy="113.5" r="4.6" className="sk-body" />
        <path d="M44 113.5V110.6M44 113.5H46.4" className="sk-line" />
        <rect x="39" y="134" width="10" height="14" rx="1" className="sk-lit" />
        <path d="M38 214V198a6 6 0 0 1 12 0V214Z" className="sk-shade" />
        <rect x="5" y="150" width="8" height="12" rx="1" className="sk-win" />
        <rect x="16" y="150" width="8" height="12" rx="1" className="sk-lit" />
        <rect x="5" y="176" width="8" height="12" rx="1" className="sk-win" />
        <rect x="16" y="176" width="8" height="12" rx="1" className="sk-win" />
        <rect x="64" y="150" width="8" height="12" rx="1" className="sk-win" />
        <rect x="75" y="150" width="8" height="12" rx="1" className="sk-win" />
        <rect x="64" y="176" width="8" height="12" rx="1" className="sk-lit" />
        <rect x="75" y="176" width="8" height="12" rx="1" className="sk-win" />
      </>
    ),
  },
  // Healthcare: a ward tower over an entrance block, with a cross
  znxcare: {
    width: 84,
    art: (
      <>
        <path d="M60 30V17" className="sk-line" />
        <circle cx="60" cy="15.5" r="1.4" className="sk-lit" />
        <rect x="22" y="23" width="16" height="7" className="sk-shade" />
        <rect x="14" y="30" width="56" height="184" className="sk-body" />
        <rect x="33" y="40" width="18" height="18" rx="4.5" className="sk-badge" />
        <path d="M40.2 43.5h3.6v3.7h3.7v3.6h-3.7v3.7h-3.6v-3.7h-3.7v-3.6h3.7Z" className="sk-lit" />
        {[70, 88, 106, 124, 142].flatMap((y, row) =>
          [21, 37, 53].map((x, col) => (
            <rect
              key={`${row}-${col}`}
              x={x}
              y={y}
              width="10"
              height="10"
              rx="1"
              className={LIT_WARDS.has(`${row}-${col}`) ? "sk-lit" : "sk-win"}
            />
          ))
        )}
        <rect x="0" y="166" width="84" height="48" className="sk-body" />
        <rect x="26" y="184" width="32" height="4" rx="2" className="sk-lit" />
        <rect x="33" y="190" width="18" height="24" className="sk-shade" />
        <path d="M42 190v24" className="sk-line" />
        <rect x="6" y="176" width="14" height="9" rx="1" className="sk-win" />
        <rect x="6" y="194" width="14" height="9" rx="1" className="sk-win" />
        <rect x="64" y="176" width="14" height="9" rx="1" className="sk-lit" />
        <rect x="64" y="194" width="14" height="9" rx="1" className="sk-win" />
      </>
    ),
  },
};

// "Manufacturing & pharma" is set on two lines so it fits under its building.
function sectorLines(sector: string): string[] {
  const [first, second] = sector.split(" & ");
  return second ? [first, `& ${second}`] : [sector];
}

const TREES: { x: number; r: number }[] = [
  { x: 109, r: 6.5 },
  { x: 203.5, r: 5 },
];

export default function ProductsHeroArt() {
  const columns = products.map((p, i) => ({ product: p, cx: MARGIN + COLUMN * (i + 0.5), building: BUILDINGS[p.slug] }));
  const summary = `The four platforms and the sectors they are built for: ${products
    .map((p) => `${p.code} for ${p.sector.toLowerCase()}`)
    .join(", ")}.`;

  return (
    <div className="hero-art hero-art--skyline">
      <svg viewBox="0 0 412 286" role="img" aria-label={summary}>
        {columns.map(({ product, cx, building }) => (
          <g key={product.slug} transform={`translate(${cx - building.width / 2} 0)`}>
            {building.art}
          </g>
        ))}

        <path d={`M2 ${GROUND}H410`} className="sk-ground" />

        {TREES.map((t) => (
          <g key={t.x}>
            <path d={`M${t.x} ${GROUND}V${GROUND - 9}`} className="sk-line" />
            <circle cx={t.x} cy={GROUND - 9 - t.r} r={t.r} className="sk-tree" />
          </g>
        ))}

        {columns.map(({ product, cx }) => (
          <g key={product.slug}>
            <circle cx={cx} cy={GROUND} r="3" className="sk-node" />
            <path d={`M${cx} ${GROUND + 6}V${GROUND + 15}`} className="sk-tick" />
            <text className="sk-code" x={cx} y={GROUND + 33}>
              {product.code}
            </text>
            <text className="sk-sector" x={cx} y={GROUND + 49}>
              {sectorLines(product.sector).map((line, n) => (
                <tspan key={line} x={cx} dy={n === 0 ? 0 : 14}>
                  {line}
                </tspan>
              ))}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
