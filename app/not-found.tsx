import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SplitWords from "@/components/motion/SplitWords";

export const metadata: Metadata = {
  title: "Page not found | ZamNexus",
  robots: { index: false },
};

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

// A request runs into the missing page, then takes a detour home. Plays on load (CSS, like the
// hero entrance); the loop is SVG on .dg-anim only, which reduced motion hides.
function LostRoute() {
  return (
    <div className="product-flow lost-route mx-auto" data-enter="5">
      <svg viewBox="0 0 360 130" role="img" aria-label="The link you followed leads to a page that no longer exists; the links below take you somewhere that does.">
        <path id="lost-path" d="M44 52 H168" pathLength={1} className="dg-line dg-line--flow" />
        <path d="M222 52 H316" pathLength={1} className="dg-line lost-route__dead" />
        <path id="lost-detour" d="M150 52 C150 104 316 104 316 70" pathLength={1} className="dg-line dg-line--flow" />
        <g className="pf-late">
          <circle r={5} className="dg-anim dg-pulse">
            <animateMotion dur="4s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.4;1" calcMode="linear">
              <mpath href="#lost-path" />
            </animateMotion>
          </circle>
          <circle r={5} className="dg-anim dg-pulse">
            <animateMotion dur="4s" begin="1.6s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;0.5;1" calcMode="linear">
              <mpath href="#lost-detour" />
            </animateMotion>
          </circle>
        </g>
        <g className="dg-node dg-d1">
          <rect x={4} y={36} width={80} height={32} rx={10} className="dg-box" />
          <text x={44} y={56} className="dg-label">
            Your link
          </text>
        </g>
        <g className="dg-node dg-d2">
          <text x={195} y={57} className="lost-route__code">
            404
          </text>
          <circle cx={195} cy={52} r={22} className="dg-anim lost-route__break">
            <animate attributeName="opacity" values="0;0;1;0;0" keyTimes="0;0.38;0.42;0.6;1" dur="4s" repeatCount="indefinite" />
          </circle>
        </g>
        <g className="dg-node dg-d3">
          <rect x={276} y={36} width={80} height={32} rx={10} className="dg-box dg-box--accent" />
          <text x={316} y={56} className="dg-label">
            Home
          </text>
        </g>
        <text x={233} y={122} className="dg-caption dg-node dg-d4">
          Here&apos;s a way back
        </text>
      </svg>
    </div>
  );
}

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans overflow-x-clip">
      <Navbar />
      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-40 pb-28 text-center">
        <p data-enter="1" className="text-xs font-mono uppercase tracking-widest font-bold text-[var(--accent-text)]">Error 404</p>
        <h1 className="mt-4 text-4xl sm:text-6xl font-bold tracking-tight text-[var(--foreground-strong)]">
          <SplitWords mode="load" text="We couldn't find that page." />
        </h1>
        <p data-enter="4" className="mt-5 text-base text-[var(--foreground-muted)] leading-relaxed">
          It may have moved when we reorganised the site. These pages should get you where you need to go.
        </p>
        <div className="mt-10">
          <LostRoute />
        </div>
        <nav aria-label="Suggested pages" data-enter="6" className="mt-10 flex flex-wrap justify-center gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-5 py-3 rounded-full border border-[var(--border-subtle)] text-sm font-semibold text-[var(--foreground)] hover:border-[var(--border-strong)] hover:text-[var(--foreground-strong)] hover:-translate-y-0.5 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-text)] transition-all duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </main>
      <Footer hideCTA />
    </div>
  );
}
