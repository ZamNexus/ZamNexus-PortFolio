"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import ScrollProgress from "@/components/motion/ScrollProgress";
import Reveal from "@/components/motion/Reveal";
import Stagger from "@/components/motion/Stagger";
import SplitWords from "@/components/motion/SplitWords";
import Spotlight from "@/components/motion/Spotlight";
import ServiceIndex from "@/components/ServiceIndex";
import { KeyFigures, ProblemFix, StepsFlow, Takeaways } from "@/components/article/ArticleBlocks";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import type { InsightArticle } from "../insightsData";
import type { InsightView } from "@/lib/cms/public";
import { company } from "@/lib/siteFacts";

interface RelatedOffer {
  name: string;
  text: string;
  href: string;
  cta: string;
}

// The product or service each article supports, shown before the closing call to action.
const relatedOffer: Record<string, RelatedOffer> = {
  "zero-downtime-retail-mesh": {
    name: "ZNXePOS",
    text: "Retail point of sale that keeps trading offline, with stock synced across every branch.",
    href: "/products/znxepos",
    cta: "See ZNXePOS",
  },
  "sub-second-multi-currency-ledgers": {
    name: "ZNXERP",
    text: "One ERP for finance, production, inventory and quality control, built for manufacturers and pharma plants.",
    href: "/products/znxerp",
    cta: "See ZNXERP",
  },
  "agentic-ai-regulated-supply-chains": {
    name: "AI & Automation",
    text: "Put AI to work inside the processes you already run, with a person in control where it matters.",
    href: "/services#ai-automation",
    cta: "See the service",
  },
  "biometric-campus-iot-latency": {
    name: "ZNXEdu",
    text: "Admissions, fees, attendance, timetables and a parent app in one system for schools and campuses.",
    href: "/products/znxedu",
    cta: "See ZNXEdu",
  },
  "hl7-pacs-clinical-automation": {
    name: "ZNXCare",
    text: "Patient records, lab machines, pharmacy and billing connected, for hospitals and clinics.",
    href: "/products/znxcare",
    cta: "See ZNXCare",
  },
  "strangler-fig-legacy-modernization": {
    name: "Integration & Modernisation",
    text: "Connect your systems and replace legacy software step by step, without a risky big-bang switch-over.",
    href: "/services#integration",
    cta: "See the service",
  },
  "aws-serverless-scaling-postmortem": {
    name: "SaaS Product Development",
    text: "Turn a product idea or internal tool into a secure multi-tenant SaaS product customers pay for.",
    href: "/services#saas",
    cta: "See the service",
  },
};

interface ArticleClientViewProps {
  article: InsightArticle;
  related: InsightView[];
  coverImage?: string | null;
}

export default function ArticleClientView({ article, related: relatedInsights, coverImage }: ArticleClientViewProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (typeof window === "undefined") return;
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
      } else {
        const input = document.createElement("input");
        input.value = window.location.href;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback state if browser denies clipboard permission
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const byline = company.articleAuthorsAreStaff
    ? { name: article.author, role: article.authorRole }
    : { name: "ZamNexus Engineering", role: "ZamNexus Limited" };

  const related = relatedOffer[article.id];

  const sections = [
    { id: "overview", name: "Overview" },
    { id: "problem", name: "Problem and fix" },
    { id: "deep-dive", name: "Deep dive" },
    { id: "how-it-works", name: "How it works" },
    { id: "takeaways", name: "Takeaways" },
  ];

  return (
    <div
      className="min-h-screen bg-background text-zinc-100 font-sans selection:bg-[var(--accent-hover)] selection:text-[#fff] overflow-x-clip"
      style={{ "--rail": article.accent } as CSSProperties}
    >
      {/* Background Cyber Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="article-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#article-grid)" />
        </svg>
      </div>

      <ScrollProgress />
      <Navbar />

      <main className="relative z-10 max-w-6xl mx-auto px-6 pt-36 pb-28 xl:grid xl:grid-cols-[210px_minmax(0,1fr)] xl:gap-14">
        {/* Sticky contents with reading progress (wide screens) */}
        <aside className="hidden xl:block">
          <div className="sticky top-32">
            <ServiceIndex label="In this article" items={sections} />
          </div>
        </aside>

        <article className="space-y-12 min-w-0">
          {/* ── TOP BREADCRUMB & BACK LINK ─────────────────────────────────── */}
          <nav aria-label="Breadcrumb" data-enter="1" className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/60 pb-6 text-xs font-mono">
            <Link
              href="/insights"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-[var(--accent-hover)] transition-colors group"
            >
              <span className="transition-transform group-hover:-translate-x-1">←</span>
              <span>Back to All Insights</span>
            </Link>

            <div className="flex items-center gap-2 text-foreground-muted">
              <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/insights" className="hover:text-zinc-300 transition-colors">Insights</Link>
              <span>/</span>
              <Link href={`/insights/topic/${article.category}`} style={{ color: article.accent }} className="font-bold hover:underline underline-offset-4">
                {article.categoryLabel}
              </Link>
            </div>
          </nav>

          {/* ── HERO HEADER ───────────────────────────────────────────────── */}
          <header className="space-y-6">
            <div data-enter="2" className="flex flex-wrap items-center gap-3">
              <span
                className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border"
                style={{
                  color: article.accent,
                  borderColor: `color-mix(in srgb, ${article.accent} 31%, transparent)`,
                  background: `color-mix(in srgb, ${article.accent} 8%, transparent)`,
                }}
              >
                {article.categoryLabel}
              </span>
              <span className="text-xs font-mono text-foreground-muted">
                {article.readTime} · Published {article.date}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              <SplitWords mode="load" text={article.title} />
            </h1>

            <p data-enter="4" className="text-base sm:text-xl text-zinc-300 leading-relaxed font-light">
              {article.subtitle}
            </p>

            {/* Author bar & Share button */}
            <div data-enter="5" className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800/80">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm text-background shadow-md"
                  style={{ background: article.accent }}
                >
                  {byline.name.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{byline.name}</div>
                  <div className="text-xs font-mono text-foreground-muted">{byline.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleShare}
                  className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-xs font-mono text-zinc-300 transition-colors cursor-pointer"
                >
                  {copied ? "✓ Link Copied" : "Share Blueprint"}
                </button>
              </div>
            </div>
          </header>

          {coverImage ? (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/40">
              <Image src={coverImage} alt="" fill sizes="(min-width: 1280px) 880px, 100vw" className="object-cover" priority />
            </div>
          ) : null}

          {/* ── KEY FIGURES ────────────────────────────────────────────────── */}
          <KeyFigures
            id="overview"
            headingId="specs-heading"
            heading="Production Architecture Benchmark Targets"
            items={article.specs}
            accent={article.accent}
            enter="6"
          />

          {/* ── THE PROBLEM & THE SOLUTION ─────────────────────────────────── */}
          <ProblemFix
            id="problem"
            accent={article.accent}
            problem={{
              label: "The Architectural Bottleneck",
              title: article.challenge.title,
              text: article.challenge.description,
              impactLabel: "Business Impact:",
              impact: article.challenge.impact,
            }}
            fix={{
              label: "The Engineered Resolution",
              title: article.solution.title,
              text: article.solution.description,
              points: article.solution.highlights,
            }}
          />

          {/* ── FULL SUMMARY / EXECUTIVE NARRATIVE ─────────────────────────── */}
          <Reveal as="section" id="deep-dive" variant="words" replay={false} className="scroll-mt-28 p-8 rounded-3xl bg-zinc-950/70 border border-zinc-800/80 space-y-4">
            <span className="reveal-sub text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold block">
              Architectural Deep-Dive
            </span>
            <h2 className="text-2xl font-bold text-white">
              <SplitWords text="System Dynamics & Execution" />
            </h2>
            <p className="reveal-sub text-sm sm:text-base text-zinc-300 leading-relaxed">
              {article.fullSummary}
            </p>
          </Reveal>

          {/* ── SEQUENTIAL ARCHITECTURE PIPELINE FLOW ──────────────────────── */}
          <StepsFlow
            id="how-it-works"
            headingId="pipeline-heading"
            heading="Step-by-step data and logic flow."
            intro="The pipeline in order, from the first event to the final posting."
            steps={article.pipeline}
            accent={article.accent}
            uid={`article-${article.id}`}
          />

          {/* ── KEY TAKEAWAYS ──────────────────────────────────────────────── */}
          <Takeaways
            id="takeaways"
            heading="Principal Architect Takeaways"
            points={article.keyTakeaways}
            stackLabel="Target Stack:"
            stack={article.techStack}
            accent={article.accent}
          />

          {/* ── RELATED PRODUCT OR SERVICE ─────────────────────────────────── */}
          {related ? (
            <Reveal as="section" aria-labelledby="article-related-heading" className="mb-12">
              <Link href={related.href} className="product-card lift-card group block p-8">
                <span className="text-xs font-mono uppercase tracking-widest font-bold text-accent-text">Related</span>
                <h2 id="article-related-heading" className="mt-2 text-xl sm:text-2xl font-bold text-foreground-strong">
                  {related.name}
                </h2>
                <p className="mt-2 text-foreground-muted leading-relaxed">{related.text}</p>
                <span className="product-card__link mt-4 inline-block text-sm font-semibold text-accent-text group-hover:underline">
                  {related.cta} <span aria-hidden="true">→</span>
                </span>
              </Link>
            </Reveal>
          ) : null}

          {/* ── BOTTOM CALL TO ACTION ──────────────────────────────────────── */}
          <FinalCTA
            id="article-cta-heading"
            eyebrow="Let's talk"
            headline="Want this working in your organisation?"
            description="Send a short brief and a senior engineer will reply within one business day."
            primaryButton={{
              label: "Book a consultation",
              href: "/contact",
            }}
            secondaryButton={{
              label: "More insights",
              href: "/insights",
            }}
            containerClassName="max-w-none px-0 py-0"
          />

          {/* ── RELATED BLUEPRINTS ─────────────────────────────────────────── */}
          {relatedInsights.length > 0 && (
            <aside className="pt-8 border-t border-zinc-800/60 space-y-6">
              <h2 className="text-sm font-mono font-bold text-zinc-400 uppercase tracking-wider">
                Related Technical Blueprints
              </h2>
              <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedInsights.map((rel) => (
                  <Spotlight key={rel.id} as="div" className="lift-card">
                  <Link href={`/insights/${rel.id}`} className="p-5 group flex h-full flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-mono text-foreground-muted uppercase">{rel.categoryLabel}</span>
                      <h3 className="text-sm font-bold text-white group-hover:text-[var(--accent-hover)] transition-colors mt-1 mb-2 line-clamp-2">
                        {rel.title}
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-zinc-400 group-hover:text-white transition-colors">
                      Read Blueprint →
                    </span>
                  </Link>
                  </Spotlight>
                ))}
              </Stagger>
            </aside>
          )}
        </article>
      </main>

      <Footer hideCTA />
    </div>
  );
}
