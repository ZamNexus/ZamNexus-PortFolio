import Reveal from "@/components/motion/Reveal";
import SplitWords from "@/components/motion/SplitWords";

interface SectionHeaderProps {
  id: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
}

// H2 + optional intro. `id` labels the parent <section aria-labelledby>. A heading is a single
// statement, so its words rise into place once rather than replaying.
export default function SectionHeader({ id, title, intro, align = "left" }: SectionHeaderProps) {
  const centred = align === "center";
  return (
    <Reveal variant="words" replay={false} className={`max-w-3xl mb-12 ${centred ? "mx-auto text-center" : ""}`}>
      <h2 id={id} className="font-heading text-3xl sm:text-5xl font-bold tracking-tight text-foreground-strong">
        <SplitWords text={title} />
      </h2>
      {intro ? <p className="reveal-sub mt-4 text-lg text-foreground-muted leading-relaxed">{intro}</p> : null}
    </Reveal>
  );
}
