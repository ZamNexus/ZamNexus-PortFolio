// Animated icon for each rollout step on the products hub: a lens scanning your processes (Map),
// switches set to how you work (Configure), records moving across (Migrate), and a status that
// turns live (Go live). Decorative (aria-hidden); off for reduced motion.

interface RolloutIconProps {
  step: 0 | 1 | 2 | 3;
}

function MapIcon() {
  return (
    <svg viewBox="0 0 48 48">
      {[0, 1, 2].map((row) =>
        [0, 1, 2].map((col) => <circle key={`${row}-${col}`} cx={10 + col * 10} cy={12 + row * 10} r={2} className="ri-dot" />)
      )}
      <g className="ri-lens">
        <circle cx={20} cy={22} r={9} className="ri-stroke" />
        <path d="M27 29 L36 38" className="ri-stroke" />
      </g>
    </svg>
  );
}

function ConfigureIcon() {
  return (
    <svg viewBox="0 0 48 48">
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={8} y={9 + i * 12} width={32} height={8} rx={4} className="ri-track" />
          <circle cx={12} cy={13 + i * 12} r={5} className={`ri-knob ri-knob--${i}`} />
        </g>
      ))}
    </svg>
  );
}

function MigrateIcon() {
  return (
    <svg viewBox="0 0 48 48">
      <rect x={4} y={14} width={14} height={20} rx={3} className="ri-stroke" />
      <rect x={30} y={14} width={14} height={20} rx={3} className="ri-stroke ri-stroke--accent" />
      {[0, 1, 2].map((i) => (
        <rect key={i} x={8} y={22} width={6} height={4} rx={1} className={`ri-record ri-record--${i}`} />
      ))}
    </svg>
  );
}

function GoLiveIcon() {
  return (
    <svg viewBox="0 0 48 48">
      <circle cx={24} cy={24} r={16} className="ri-live-ring" />
      <circle cx={24} cy={24} r={16} pathLength={1} className="ri-live-arc" />
      <path d="M17 24.5l5 5 9-10" pathLength={1} className="ri-live-tick" />
    </svg>
  );
}

const icons = [MapIcon, ConfigureIcon, MigrateIcon, GoLiveIcon];

export default function RolloutIcon({ step }: RolloutIconProps) {
  const Icon = icons[step];
  return (
    <span className="rollout-icon" aria-hidden="true">
      <Icon />
    </span>
  );
}
