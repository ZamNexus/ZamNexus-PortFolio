interface SectionHeaderProps {
  id: string;
  tag: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}

// Mono tag + H2 + optional intro. `id` labels the parent <section aria-labelledby>.
export default function SectionHeader({ id, tag, title, intro, align = "left" }: SectionHeaderProps) {
  const centred = align === "center";
  return (
    <div className={`max-w-3xl mb-12 ${centred ? "mx-auto text-center" : ""}`}>
      <p className="text-xs font-mono uppercase tracking-widest font-bold text-accent-text">{tag}</p>
      <h2 id={id} className="mt-3 font-heading text-3xl sm:text-5xl font-bold tracking-tight text-foreground-strong">
        {title}
      </h2>
      {intro ? <p className="mt-4 text-base text-foreground-muted leading-relaxed">{intro}</p> : null}
    </div>
  );
}
