import type { JSX } from "react";

// One small diagram per service showing what the service does, drawn in when its section
// enters the viewport (wrap in <Reveal variant="draw">) with a quiet loop that carries the
// story. Loops are SVG <animate>/<animateMotion> on .dg-anim elements, which reduced motion hides;
// the drawn diagram itself is complete without any animation.

interface ServiceDiagramProps {
  id: string;
}

interface BoxProps {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  sub?: string;
  accent?: boolean;
  delay?: 1 | 2 | 3 | 4 | 5;
}

// A labelled node, centred on (x, y).
function Box({ x, y, w, h, label, sub, accent, delay = 1 }: BoxProps) {
  return (
    <g className={`dg-node dg-d${delay}`}>
      <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={10} className={accent ? "dg-box dg-box--accent" : "dg-box"} />
      <text x={x} y={sub ? y - 3 : y + 4} className="dg-label">
        {label}
      </text>
      {sub ? (
        <text x={x} y={y + 12} className="dg-sub">
          {sub}
        </text>
      ) : null}
    </g>
  );
}

function AiAutomation() {
  return (
    <svg viewBox="0 0 360 200" role="img" aria-label="A document passes through an AI agent, waits for a person to approve it, then is posted to the ERP.">
      <path id="dg-ai-path" d="M45 100 H315" pathLength={1} className="dg-line dg-line--flow" />
      {/* The document travels, waits at the human checkpoint, then continues */}
      <circle r={5} className="dg-anim dg-pulse">
        <animateMotion dur="4.5s" repeatCount="indefinite" keyPoints="0;0.667;0.667;1" keyTimes="0;0.45;0.75;1" calcMode="linear">
          <mpath href="#dg-ai-path" />
        </animateMotion>
      </circle>
      <Box x={45} y={100} w={78} h={48} label="Document" sub="Invoice in" delay={1} />
      <Box x={135} y={100} w={78} h={48} label="AI agent" sub="Reads, drafts" delay={2} />
      <g className="dg-node dg-d3">
        <circle cx={225} cy={100} r={34} className="dg-anim dg-halo">
          <animate attributeName="opacity" values="0;0;1;1;0" keyTimes="0;0.45;0.5;0.72;0.78" dur="4.5s" repeatCount="indefinite" />
        </circle>
      </g>
      <Box x={225} y={100} w={78} h={48} label="Approval" sub="A person checks" accent delay={3} />
      <Box x={315} y={100} w={78} h={48} label="ERP" sub="Posted" delay={4} />
      <text x={225} y={160} className="dg-caption dg-node dg-d4">
        Nothing posts without sign-off
      </text>
    </svg>
  );
}

function Saas() {
  const tenants = [60, 180, 300];
  return (
    <svg viewBox="0 0 360 200" role="img" aria-label="One product serves three customers, each with its own isolated data.">
      {tenants.map((x, i) => (
        <path
          key={x}
          id={`dg-saas-path-${i}`}
          d={`M180 58 C180 100 ${x} 96 ${x} 128`}
          pathLength={1}
          className="dg-line dg-line--flow"
        />
      ))}
      {/* Data flows down to each customer, passing under the boxes */}
      {tenants.map((x, i) => (
        <circle key={x} r={4} className="dg-anim dg-pulse">
          <animateMotion dur="2.4s" begin={`${i * 0.8}s`} repeatCount="indefinite">
            <mpath href={`#dg-saas-path-${i}`} />
          </animateMotion>
        </circle>
      ))}
      <Box x={180} y={38} w={132} h={40} label="Your product" accent delay={1} />
      {tenants.map((x, i) => (
        <Box key={x} x={x} y={150} w={100} h={46} label={`Customer ${"ABC"[i]}`} sub="Own data" delay={(i + 2) as 2 | 3 | 4} />
      ))}
    </svg>
  );
}

function Cloud() {
  const servers = [44, 80, 116, 152];
  return (
    <svg viewBox="0 0 360 200" role="img" aria-label="As traffic rises, more servers start; as it falls, they stop.">
      <path d="M14 172 H206" className="dg-axis dg-node dg-d1" />
      <path
        id="dg-cloud-path"
        d="M14 160 C60 160 70 56 110 56 S160 160 206 152"
        pathLength={1}
        className="dg-line dg-line--flow"
      />
      <text x={110} y={192} className="dg-sub dg-node dg-d2">
        Traffic
      </text>
      <circle r={5} className="dg-anim dg-pulse">
        <animateMotion dur="5s" repeatCount="indefinite">
          <mpath href="#dg-cloud-path" />
        </animateMotion>
      </circle>
      {servers.map((y, i) => {
        const server = (
          <>
            <rect x={250} y={y - 14} width={92} height={28} rx={8} className="dg-box dg-box--accent" />
            <circle cx={266} cy={y} r={3.5} className="dg-led" />
            <path d={`M278 ${y} H328`} className="dg-axis" />
          </>
        );
        return (
          <g key={y} className={`dg-node dg-d${(i + 1) as 1 | 2 | 3 | 4}`}>
            {i < 2 ? (
              server
            ) : (
              <>
                {/* An idle slot; the extra server starts only around the traffic peak, then stops */}
                <rect x={250} y={y - 14} width={92} height={28} rx={8} className="dg-column" />
                <g className="dg-anim">
                  <animate attributeName="opacity" values="0;0;1;1;0;0" keyTimes="0;0.25;0.35;0.62;0.72;1" dur="5s" repeatCount="indefinite" />
                  {server}
                </g>
              </>
            )}
          </g>
        );
      })}
      <text x={296} y={192} className="dg-sub dg-node dg-d4">
        Servers
      </text>
    </svg>
  );
}

function Integration() {
  return (
    <svg viewBox="0 0 360 200" role="img" aria-label="ERP and CRM are connected through an API layer, so data entered in one appears in the other.">
      <path id="dg-int-path" d="M58 96 H302" pathLength={1} className="dg-line dg-line--flow" />
      {/* Records travel both ways, passing under the boxes */}
      <circle r={4.5} className="dg-anim dg-pulse">
        <animateMotion dur="2.8s" repeatCount="indefinite">
          <mpath href="#dg-int-path" />
        </animateMotion>
      </circle>
      <circle r={4.5} className="dg-anim dg-pulse dg-pulse--alt">
        <animateMotion dur="2.8s" begin="1.4s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear">
          <mpath href="#dg-int-path" />
        </animateMotion>
      </circle>
      <Box x={58} y={96} w={92} h={56} label="ERP" sub="Finance, stock" delay={1} />
      <Box x={180} y={96} w={96} h={44} label="API layer" sub="REST, GraphQL" accent delay={2} />
      <Box x={302} y={96} w={92} h={56} label="CRM" sub="Customers" delay={3} />
      <text x={180} y={160} className="dg-caption dg-node dg-d4">
        Entered once, everywhere at once
      </text>
    </svg>
  );
}

function Microsoft() {
  const panels = [
    { x: 74, label: "Sales" },
    { x: 180, label: "Service" },
    { x: 286, label: "Finance" },
  ];
  return (
    <svg viewBox="0 0 360 200" role="img" aria-label="Sales, service and finance work inside one Dynamics 365 workspace.">
      <rect x={12} y={14} width={336} height={172} rx={16} className="dg-frame dg-node dg-d1" />
      <text x={30} y={38} className="dg-label dg-label--start dg-node dg-d1">
        Dynamics 365
      </text>
      {panels.map((p, i) => (
        <g key={p.label} className={`dg-panel dg-panel--${i} dg-d${(i + 2) as 2 | 3 | 4}`}>
          <rect x={p.x - 46} y={56} width={92} height={108} rx={10} className="dg-box" />
          <text x={p.x} y={78} className="dg-label">
            {p.label}
          </text>
          <path d={`M${p.x - 30} 98 H${p.x + 30} M${p.x - 30} 114 H${p.x + 18} M${p.x - 30} 130 H${p.x + 26}`} className="dg-axis" />
        </g>
      ))}
      {/* One record moving across all three teams */}
      <rect x={28} y={146} width={12} height={4} rx={2} className="dg-anim dg-sweep">
        <animate attributeName="x" values="28;320;28" dur="5s" repeatCount="indefinite" />
      </rect>
    </svg>
  );
}

function Salesforce() {
  const columns = [
    { x: 64, label: "Lead" },
    { x: 180, label: "Opportunity" },
    { x: 296, label: "Won" },
  ];
  return (
    <svg viewBox="0 0 360 200" role="img" aria-label="A deal moves from lead to opportunity to won, then flows to finance.">
      {columns.map((c, i) => (
        <g key={c.label} className={`dg-node dg-d${(i + 1) as 1 | 2 | 3}`}>
          <rect x={c.x - 52} y={20} width={104} height={136} rx={12} className="dg-column" />
          <text x={c.x} y={42} className="dg-sub dg-sub--strong">
            {c.label}
          </text>
        </g>
      ))}
      {/* Outer group reveals; inner group carries the deal across the pipeline (CSS loop) */}
      <g className="dg-node dg-d4">
        <g className="dg-deal">
          <rect x={26} y={70} width={76} height={34} rx={8} className="dg-box dg-box--accent" />
          <text x={64} y={91} className="dg-label">
            Deal
          </text>
        </g>
      </g>
      <path d="M296 158 V176 H212" className="dg-line dg-line--flow dg-node dg-d5" pathLength={1} />
      <text x={200} y={180} className="dg-sub dg-sub--end dg-node dg-d5">
        To finance
      </text>
    </svg>
  );
}

const diagrams: Record<string, () => JSX.Element> = {
  "ai-automation": AiAutomation,
  saas: Saas,
  cloud: Cloud,
  integration: Integration,
  microsoft: Microsoft,
  salesforce: Salesforce,
};

export default function ServiceDiagram({ id }: ServiceDiagramProps) {
  const Diagram = diagrams[id];
  return Diagram ? (
    <div className="service-diagram">
      <Diagram />
    </div>
  ) : null;
}
