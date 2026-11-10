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
  /** Number the items 1, 2, 3 instead of ticking them. */
  numbered?: boolean;
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
const secondaryClass = "cta-panel__ghost px-7 py-3.5 sm:py-4 rounded-full font-semibold text-sm active:scale-[0.98] transition-all duration-300 inline-flex items-center";

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
        className={`cta-panel relative isolate overflow-hidden rounded-3xl p-8 sm:p-14 lg:p-16 ${
          hasSidePanel
            ? "flex flex-col lg:flex-row items-stretch justify-between gap-10 lg:gap-16"
            : "text-center flex flex-col items-center justify-center"
        } ${className}`}
      >

        <div className={`relative z-10 ${hasSidePanel ? "max-w-xl text-left flex flex-col justify-center" : "max-w-2xl mx-auto"}`}>
          <p className="cta-panel__eyebrow">{eyebrow}</p>
          <h2
            id={headingId}
            className="cta-panel__title font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.08] text-balance"
          >
            {headline}
          </h2>
          <p className="cta-panel__text mt-4 text-base sm:text-lg leading-relaxed">{description}</p>

          <div className={`mt-8 flex flex-wrap items-center gap-4 ${hasSidePanel ? "" : "justify-center"}`}>
            <CTAButton btn={primaryButton} primary />
            {secondaryButton ? <CTAButton btn={secondaryButton} primary={false} /> : null}
          </div>
        </div>

        {hasSidePanel && sidePanel ? (
          <div className="cta-panel__side relative z-10 w-full lg:w-[22rem] p-6 sm:p-8 rounded-2xl shrink-0">
            <p className="cta-panel__side-title">{sidePanel.title}</p>
            <Stagger as="ol" className="cta-panel__steps">
              {sidePanel.items.map((item, i) => (
                <li key={item.label}>
                  <span className="cta-panel__num" aria-hidden="true">
                    {sidePanel.numbered ? i + 1 : "✓"}
                  </span>
                  <span>
                    <span className="cta-panel__step-label">{item.label}</span>
                    {item.sublabel ? <span className="cta-panel__step-text">{item.sublabel}</span> : null}
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
