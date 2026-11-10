import type { ProductSlug } from "@/lib/siteFacts";

// A small, distinct animated emblem for each product card on the products hub, each drawn from
// its sector: meshing gears driving a batch (manufacturing), a barcode under a scanning laser
// (retail), a timetable filling class by class (education), a beating heart with live vitals
// (healthcare). Decorative (aria-hidden); CSS keyframes on .em-*, off for reduced motion.

interface ProductEmblemProps {
  slug: ProductSlug;
}

function Erp() {
  return (
    <svg viewBox="0 0 160 96">
      {/* Gear teeth are a dashed stroke around each wheel */}
      <g className="em-gear em-gear--big">
        <circle cx={52} cy={44} r={22} className="em-teeth" strokeDasharray="5 4.21" />
        <circle cx={52} cy={44} r={16} className="em-wheel" />
        <circle cx={52} cy={44} r={5} className="em-hub" />
      </g>
      <g className="em-gear em-gear--small">
        <circle cx={88} cy={30} r={13} className="em-teeth" strokeDasharray="4.08 4.09" />
        <circle cx={88} cy={30} r={9} className="em-wheel" />
        <circle cx={88} cy={30} r={3} className="em-hub" />
      </g>
      {/* The batch the gears are driving */}
      <rect x={110} y={20} width={36} height={56} rx={6} className="em-vessel" />
      <rect x={114} y={24} width={28} height={48} rx={4} className="em-fill" />
      <rect x={22} y={80} width={92} height={4} rx={2} className="em-track" />
    </svg>
  );
}

function Epos() {
  const bars = [3, 1, 2, 1, 3, 2, 1, 1, 3, 1, 2, 3, 1, 2, 1, 3, 1, 2];
  let x = 30;
  return (
    <svg viewBox="0 0 160 96">
      {bars.map((w, i) => {
        const bar = <rect key={i} x={x} y={18} width={w * 1.6} height={52} className="em-bar" />;
        x += w * 1.6 + 2.6;
        return bar;
      })}
      <text x={80} y={86} className="em-digits">
        5 012345 678900
      </text>
      <rect x={20} y={14} width={120} height={2} rx={1} className="em-laser" />
      <circle cx={146} cy={16} r={5} className="em-beep" />
    </svg>
  );
}

function Edu() {
  const cells = [];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 5; col++) {
      cells.push({ row, col, i: row * 5 + col });
    }
  }
  return (
    <svg viewBox="0 0 160 96">
      {["M", "T", "W", "T", "F"].map((d, col) => (
        <text key={col} x={34 + col * 24} y={14} className="em-day">
          {d}
        </text>
      ))}
      {cells.map(({ row, col, i }) => (
        <rect
          key={i}
          x={24 + col * 24}
          y={20 + row * 18}
          width={20}
          height={14}
          rx={3}
          className={`em-slot em-slot--${(i * 7) % 20} em-subject--${(row + col) % 3}`}
        />
      ))}
    </svg>
  );
}

function Care() {
  return (
    <svg viewBox="0 0 160 96">
      <circle cx={56} cy={46} r={18} className="em-ring" />
      <circle cx={56} cy={46} r={18} className="em-ring em-ring--late" />
      <path
        d="M56 60 C40 48 36 40 40 34 C44 28 52 29 56 36 C60 29 68 28 72 34 C76 40 72 48 56 60 Z"
        className="em-heart"
      />
      {/* Live vitals */}
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={98 + i * 10} y={26} width={6} height={44} rx={3} className={`em-vital em-vital--${i}`} />
      ))}
      <rect x={94} y={76} width={52} height={3} rx={1.5} className="em-track" />
    </svg>
  );
}

const emblems: Record<ProductSlug, () => React.JSX.Element> = {
  znxerp: Erp,
  znxepos: Epos,
  znxedu: Edu,
  znxcare: Care,
};

// The three stages along the foot of each panel, in the order the product handles its work.
const flows: Record<ProductSlug, [string, string, string]> = {
  znxerp: ["Goods in", "QC release", "Dispatch"],
  znxepos: ["Scan", "Sell", "Sync"],
  znxedu: ["Admit", "Teach", "Inform"],
  znxcare: ["Register", "Consult", "Dispense"],
};

export default function ProductEmblem({ slug }: ProductEmblemProps) {
  const Emblem = emblems[slug];
  return (
    <div className={`emblem emblem--${slug}`} aria-hidden="true">
      <div className="emblem__chrome">
        <i />
        <i />
        <i />
        <span>{slug}.live</span>
        <em>live</em>
      </div>
      <div className="emblem__stage">
        <Emblem />
      </div>
      <ol className="emblem__flow">
        {flows[slug].map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </div>
  );
}
