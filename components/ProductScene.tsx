import type { ProductSlug } from "@/lib/siteFacts";

// One small looping scene per product, showing the moment each platform is built around:
// stock clearing QC on its way to the ledger, a till that keeps selling offline, a student
// arriving and a parent told, a patient's record filling in. CSS keyframes on .ps-* elements,
// all switched off for reduced motion, where each scene rests in a complete state.

interface ProductSceneProps {
  slug: ProductSlug;
}

function Erp() {
  return (
    <svg viewBox="0 0 360 220" role="img" aria-label="Deliveries move along the line, are released by quality control, and post straight to the ledger.">
      {/* Ledger card: lights up as each batch posts */}
      <g className="ps-ledger">
        <rect x={250} y={18} width={96} height={62} rx={10} className="ps-card" />
        <text x={262} y={38} className="ps-label ps-label--start">
          Ledger
        </text>
        <rect x={262} y={48} width={70} height={5} rx={2.5} className="ps-bar" />
        <rect x={262} y={60} width={52} height={5} rx={2.5} className="ps-bar" />
      </g>
      <path d="M298 80 V112" className="ps-link" />
      {/* QC gate with a scan beam that fires as each crate passes */}
      <rect x={166} y={88} width={48} height={62} rx={8} className="ps-frame" />
      <path d="M190 96 V144" className="ps-beam" />
      {/* Conveyor */}
      <rect x={16} y={150} width={328} height={14} rx={7} className="ps-belt" />
      <path d="M26 157 H334" className="ps-belt-move" />
      {[0, 1, 2].map((i) => (
        <g key={i} className={`ps-crate ps-crate--${i}`}>
          <rect x={18} y={122} width={34} height={28} rx={5} className="ps-crate-box" />
          <path d="M24 136 H46" className="ps-crate-line" />
        </g>
      ))}
      <text x={40} y={190} className="ps-label">
        Goods in
      </text>
      <text x={190} y={190} className="ps-label">
        QC release
      </text>
      <text x={312} y={190} className="ps-label">
        Dispatch
      </text>
    </svg>
  );
}

function Epos() {
  return (
    <svg viewBox="0 0 360 220" role="img" aria-label="A till rings up a sale and prints the receipt; when the connection drops, sales are saved on the till and sync when it returns.">
      {/* Till screen: items appear as they are scanned */}
      <rect x={20} y={24} width={160} height={124} rx={12} className="ps-card" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} className={`ps-row ps-row--${i}`}>
          <rect x={34} y={42 + i * 20} width={88 - (i % 2) * 22} height={6} rx={3} className="ps-bar" />
          <rect x={146} y={42 + i * 20} width={20} height={6} rx={3} className="ps-bar ps-bar--accent" />
        </g>
      ))}
      <path d="M34 128 H166" className="ps-rule" />
      {/* Receipt unrolls */}
      <g className="ps-receipt">
        <path d="M206 24 H326 V150 L316 156 L306 150 L296 156 L286 150 L276 156 L266 150 L256 156 L246 150 L236 156 L226 150 L216 156 L206 150 Z" className="ps-paper" />
        {[0, 1, 2].map((i) => (
          <rect key={i} x={220} y={44 + i * 16} width={70 - i * 12} height={5} rx={2.5} className="ps-ink" />
        ))}
        <rect x={220} y={104} width={92} height={7} rx={3.5} className="ps-ink ps-ink--strong" />
      </g>
      {/* Connection: drops, sales queue on the till, then sync */}
      <g className="ps-status ps-status--online">
        <rect x={20} y={172} width={132} height={30} rx={15} className="ps-pill" />
        <circle cx={38} cy={187} r={4} className="ps-dot-ok" />
        <text x={50} y={191} className="ps-label ps-label--start">
          Online, synced
        </text>
      </g>
      <g className="ps-status ps-status--offline">
        <rect x={20} y={172} width={176} height={30} rx={15} className="ps-pill ps-pill--warn" />
        <circle cx={38} cy={187} r={4} className="ps-dot-warn" />
        <text x={50} y={191} className="ps-label ps-label--start">
          Offline, saving on the till
        </text>
      </g>
      {[0, 1, 2].map((i) => (
        <rect key={i} x={212 + i * 16} y={180} width={10} height={14} rx={2} className={`ps-queued ps-queued--${i}`} />
      ))}
    </svg>
  );
}

function Edu() {
  return (
    <svg viewBox="0 0 360 220" role="img" aria-label="Students pass through the gate and are marked present, and each parent is notified on their phone.">
      <path d="M12 168 H240" className="ps-rule" />
      {/* Turnstile */}
      <rect x={138} y={104} width={10} height={64} rx={4} className="ps-frame" />
      <rect x={186} y={104} width={10} height={64} rx={4} className="ps-frame" />
      <path d="M148 128 H186" className="ps-arm" />
      {[0, 1, 2].map((i) => (
        <g key={i} className={`ps-student ps-student--${i}`}>
          <circle cx={30} cy={122} r={8} className="ps-head" />
          <rect x={20} y={133} width={20} height={30} rx={8} className="ps-body" />
        </g>
      ))}
      <text x={167} y={192} className="ps-label">
        Gate
      </text>
      {/* Parent's phone */}
      <rect x={262} y={24} width={82} height={150} rx={16} className="ps-card" />
      <rect x={290} y={32} width={26} height={4} rx={2} className="ps-bar" />
      <g className="ps-notify">
        <rect x={270} y={58} width={66} height={44} rx={10} className="ps-bubble" />
        <circle cx={283} cy={72} r={5} className="ps-dot-ok" />
        <text x={293} y={76} className="ps-label ps-label--start ps-label--small">
          Arrived
        </text>
        <rect x={278} y={86} width={48} height={5} rx={2.5} className="ps-bar" />
      </g>
      <text x={303} y={192} className="ps-label">
        Parent app
      </text>
    </svg>
  );
}

function Care() {
  const rows = ["Registration", "Triage", "Lab result", "Pharmacy"];
  return (
    <svg viewBox="0 0 360 220" role="img" aria-label="A patient's vital signs are monitored while their record fills in from registration through triage and lab results to pharmacy.">
      {/* Monitor trace */}
      <path d="M12 40 H330" className="ps-rule" />
      <path
        d="M12 52 H84 L94 52 L102 30 L112 74 L120 44 L128 52 H200 L210 52 L218 30 L228 74 L236 44 L244 52 H330"
        pathLength={1}
        className="ps-ecg-base"
      />
      <path
        d="M12 52 H84 L94 52 L102 30 L112 74 L120 44 L128 52 H200 L210 52 L218 30 L228 74 L236 44 L244 52 H330"
        pathLength={1}
        className="ps-ecg"
      />
      {/* The record, completed step by step */}
      <rect x={24} y={92} width={312} height={118} rx={14} className="ps-card" />
      {rows.map((row, i) => (
        <g key={row} className={`ps-field ps-field--${i}`}>
          <text x={42} y={120 + i * 24} className="ps-label ps-label--start">
            {row}
          </text>
          <rect x={150} y={113 + i * 24} width={120 - i * 14} height={6} rx={3} className="ps-bar" />
          <circle cx={312} cy={116 + i * 24} r={7} className="ps-check" />
          <path d={`M308 ${116 + i * 24} l3 3 l5 -6`} className="ps-check-mark" />
        </g>
      ))}
    </svg>
  );
}

const scenes: Record<ProductSlug, () => React.JSX.Element> = {
  znxerp: Erp,
  znxepos: Epos,
  znxedu: Edu,
  znxcare: Care,
};

export default function ProductScene({ slug }: ProductSceneProps) {
  const Scene = scenes[slug];
  return (
    <div className={`product-scene product-scene--${slug}`}>
      <Scene />
    </div>
  );
}
