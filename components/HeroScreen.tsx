import type { ReactNode } from "react";
import Link from "next/link";
import Parallax from "@/components/motion/Parallax";

interface HeroScreenProps {
  // id of the page's h1, for aria-labelledby
  labelledBy: string;
  // where the "Scroll" cue leads: the id of the first section below the hero
  cueHref: string;
  cueLabel: string;
  // the faint background grid used on Products and Services
  grid?: boolean;
  children: ReactNode;
}

// A page hero that fills the first screen (the viewport minus the announcement bar, whose height Navbar
// publishes as --announce-h), so nothing from the next section shows until the visitor scrolls. Content is
// centred; on short or narrow screens the hero simply grows rather than squeezing its copy.
export default function HeroScreen({ labelledBy, cueHref, cueLabel, grid = false, children }: HeroScreenProps) {
  return (
    <section
      aria-labelledby={labelledBy}
      className="relative flex min-h-[calc(100svh-var(--announce-h,0px))] flex-col justify-center"
    >
      {grid ? <Parallax className="services-hero__grid" range={40} /> : null}
      <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-24">{children}</div>
      <Link href={cueHref} aria-label={cueLabel} className="hero-cue absolute bottom-5 left-1/2 -translate-x-1/2">
        <span>Scroll</span>
        <svg className="hero-cue__arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </Link>
    </section>
  );
}
