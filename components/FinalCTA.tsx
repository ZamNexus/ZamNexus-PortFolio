import type { MouseEvent } from "react";
import Link from "next/link";
import Reveal from "@/components/motion/Reveal";
import Stagger from "@/components/motion/Stagger";

export interface CTAButtonProps {
  label: string;
  href?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  className?: string;
  ariaLabel?: string;
  target?: string;
  rel?: string;
}

export interface CTASidePanelItem {
  label: string;
  sublabel?: string;
}

export interface CTASidePanel {
  title: string;
  items: CTASidePanelItem[];
}

export interface FinalCTAProps {
  id?: string;
  eyebrow: string;
  headline: string;
  description: string;
  primaryButton: CTAButtonProps;
  secondaryButton?: CTAButtonProps;
  sidePanel?: CTASidePanel;
  className?: string;
  containerClassName?: string;
}

const primaryClass = "liquid-lime-btn text-base py-3.5 sm:py-4 px-7 sm:px-8";
const secondaryClass =
  "px-7 py-3.5 sm:py-4 rounded-full border border-[var(--border-subtle)] text-foreground font-semibold text-sm hover:border-[var(--border-strong)] hover:text-foreground-strong active:scale-[0.98] transition-all duration-300 inline-flex items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-text";

function CTAButton({ btn, primary }: { btn: CTAButtonProps; primary: boolean }) {
  const className = btn.className || (primary ? primaryClass : secondaryClass);
  if (!btn.href) {
    return (
      <button type="button" onClick={btn.onClick} aria-label={btn.ariaLabel} className={`${className} cursor-pointer`}>
        {btn.label}
      </button>
    );
  }
  if (/^https?:\/\//.test(btn.href)) {
    return (
      <a
        href={btn.href}
        target={btn.target || "_blank"}
        rel={btn.rel || "noopener noreferrer"}
        onClick={btn.onClick}
        aria-label={btn.ariaLabel}
        className={className}
      >
        {btn.label}
      </a>
    );
  }
  return (
    <Link href={btn.href} onClick={btn.onClick} aria-label={btn.ariaLabel} className={className}>
      {btn.label}
    </Link>
  );
}

// Closing call to action: a single statement, so it settles in once rather than replaying.
export default function FinalCTA({
  id,
  eyebrow,
  headline,
  description,
  primaryButton,
  secondaryButton,
  sidePanel,
  className = "",
  containerClassName = "",
}: FinalCTAProps) {
  const hasSidePanel = Boolean(sidePanel && sidePanel.items.length > 0);
  const headingId = id || "final-cta-heading";

  return (
    <section aria-labelledby={headingId} className={`max-w-6xl mx-auto px-6 py-20 ${containerClassName}`}>
      <Reveal
        replay={false}
        className={`relative isolate overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-gradient-to-br from-surface via-surface/70 to-background p-8 sm:p-14 lg:p-16 ${
          hasSidePanel
            ? "flex flex-col lg:flex-row items-center justify-between gap-12"
            : "text-center flex flex-col items-center justify-center"
        } ${className}`}
      >
        <div className="noise-overlay" aria-hidden="true" />
        <div className="final-cta__glow" aria-hidden="true" />

        <div className={`relative z-10 ${hasSidePanel ? "max-w-xl text-left" : "max-w-2xl mx-auto"}`}>
          <p className="text-base font-semibold text-accent-text mb-3">{eyebrow}</p>
          <h2
            id={headingId}
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground-strong tracking-tight leading-[1.1] text-balance"
          >
            {headline}
          </h2>
          <p className="mt-4 text-foreground-muted text-base sm:text-lg leading-relaxed">{description}</p>

          <div className={`mt-8 flex flex-wrap items-center gap-4 ${hasSidePanel ? "" : "justify-center"}`}>
            <CTAButton btn={primaryButton} primary />
            {secondaryButton ? <CTAButton btn={secondaryButton} primary={false} /> : null}
          </div>
        </div>

        {hasSidePanel && sidePanel ? (
          <div className="relative z-10 w-full lg:w-80 p-6 sm:p-7 rounded-2xl bg-background/80 border border-[var(--border-subtle)] shrink-0">
            <p className="text-sm font-semibold text-foreground-strong border-b border-[var(--border-subtle)] pb-3">
              {sidePanel.title}
            </p>
            <Stagger as="ul" className="mt-4 space-y-3.5">
              {sidePanel.items.map((item) => (
                <li key={item.label} className="flex items-start gap-3 text-sm">
                  <span className="text-success font-bold mt-0.5" aria-hidden="true">
                    ✓
                  </span>
                  <span>
                    <span className="block font-semibold text-foreground">{item.label}</span>
                    {item.sublabel ? <span className="block text-foreground-muted mt-0.5">{item.sublabel}</span> : null}
                  </span>
                </li>
              ))}
            </Stagger>
          </div>
        ) : null}
      </Reveal>
    </section>
  );
}
