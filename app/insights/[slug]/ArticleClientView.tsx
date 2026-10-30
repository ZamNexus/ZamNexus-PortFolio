"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import ScrollProgress from "@/components/motion/ScrollProgress";
import Reveal from "@/components/motion/Reveal";
import Stagger from "@/components/motion/Stagger";
import SplitWords from "@/components/motion/SplitWords";
import Spotlight from "@/components/motion/Spotlight";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import type { InsightArticle } from "../insightsData";
import { allInsights } from "../insightsData";
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
}

export default function ArticleClientView({ article }: ArticleClientViewProps) {
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
    : { name: "ZamNexus Engineering", role: "Zamooq Limited" };

  const related = relatedOffer[article.id];

  // Related insights (first 2 from other articles)
  const relatedInsights = allInsights
    .filter((item) => item.id !== article.id)
    .slice(0, 2);

  return (
    <div
      className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[var(--accent-hover)] selection:text-black overflow-x-clip"
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
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-[180px] opacity-10 pointer-events-none"
          style={{ background: article.accent }}
        />
      </div>

      <ScrollProgress />
      <Navbar />

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-36 pb-28">
        <article className="space-y-12">
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
              <span style={{ color: article.accent }} className="font-bold">{article.categoryLabel}</span>
            </div>
          </nav>

          {/* ── HERO HEADER ───────────────────────────────────────────────── */}
          <header className="space-y-6">
            <div data-enter="2" className="flex flex-wrap items-center gap-3">
              <span
                className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border"
                style={{
                  color: article.accent,
                  borderColor: `${article.accent}50`,
                  background: `${article.accent}15`,
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
                  className="w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm text-black shadow-md"
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

          {/* ── QUICK SYSTEM SPECS RIBBON (Scannable Metrics) ──────────────── */}
          <section aria-labelledby="specs-heading" data-enter="6" className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 shadow-xl">
            <h2 id="specs-heading" className="text-xs font-mono uppercase tracking-widest text-foreground-muted font-bold mb-4">
              Production Architecture Benchmark Targets
            </h2>
            <Stagger className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {article.specs.map((spec) => (
                <div key={spec.label} className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
                  <div className="text-[11px] font-mono text-foreground-muted mb-1">{spec.label}</div>
                  <div className="text-lg sm:text-xl font-mono font-bold text-white tracking-tight" style={{ color: article.accent }}>
                    {spec.value}
                  </div>
                </div>
              ))}
            </Stagger>
          </section>

          {/* ── THE PROBLEM & THE SOLUTION (Side-by-Side Cards) ─────────────── */}
          <Stagger as="section" className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Challenge Card */}
            <div className="p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold bg-rose-500/10 text-rose-400 border border-rose-500/30">
                <span>01</span>
                <span>The Architectural Bottleneck</span>
              </div>
              <h3 className="text-xl font-bold text-white">{article.challenge.title}</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {article.challenge.description}
              </p>
              <div className="p-3 rounded-xl bg-rose-950/20 border border-rose-900/40 text-xs font-mono text-rose-300">
                <span className="font-bold">Business Impact:</span> {article.challenge.impact}
              </div>
            </div>

            {/* The Solution Card */}
            <div className="article-solution p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 space-y-4">
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[11px] font-mono font-bold border"
                style={{
                  color: article.accent,
                  borderColor: `${article.accent}40`,
                  background: `${article.accent}15`,
                }}
              >
                <span>02</span>
                <span>The Engineered Resolution</span>
              </div>
              <h3 className="text-xl font-bold text-white">{article.solution.title}</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {article.solution.description}
              </p>
              <Stagger as="ul" className="space-y-2 pt-1">
                {article.solution.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-zinc-300 font-mono">
                    <svg className="tick tick--success" viewBox="0 0 20 20" aria-hidden="true">
                      <path d="M4 10.5l4 4 8-9" />
                    </svg>
                    <span>{h}</span>
                  </li>
                ))}
              </Stagger>
            </div>
          </Stagger>

          {/* ── FULL SUMMARY / EXECUTIVE NARRATIVE ─────────────────────────── */}
          <Reveal as="section" variant="words" replay={false} className="p-8 rounded-3xl bg-zinc-950/70 border border-zinc-800/80 space-y-4">
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
          <section aria-labelledby="pipeline-heading" className="space-y-6">
            <Reveal variant="words" replay={false}>
              <span className="reveal-sub text-xs font-mono uppercase tracking-widest text-foreground-muted font-bold block mb-1">
                System Sequence
              </span>
              <h2 id="pipeline-heading" className="text-2xl font-bold text-white">
                <SplitWords text="Step-by-Step Data & Logic Flow" />
              </h2>
            </Reveal>

            <Stagger className="rollout rollout--tight grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {article.pipeline.map((step) => (
                <div
                  key={step.step}
                  className="rollout__step lift-card p-5 flex flex-col justify-between space-y-3 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-extrabold font-mono" style={{ color: article.accent }}>
                      {step.step}
                    </span>
                    <span className="text-[10px] font-mono text-foreground-muted uppercase tracking-wider">
                      {step.phase}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white mb-1.5">{step.title}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              ))}
            </Stagger>
          </section>

          {/* ── KEY TAKEAWAYS CALLOUT ──────────────────────────────────────── */}
          <section className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-bold" style={{ color: article.accent }}>
              <span>★</span>
              <span>Principal Architect Takeaways</span>
            </div>

            <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {article.keyTakeaways.map((point, i) => (
                <div key={i} className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-xs font-mono text-zinc-300 flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: article.accent }} />
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </Stagger>

            {/* Tech Stack Pills */}
            <div className="pt-4 border-t border-zinc-800/60 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-foreground-muted mr-2">Target Stack:</span>
              {article.techStack.map((tech) => (
                <span key={tech} className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-700/80 text-[11px] font-mono text-zinc-300">
                  {tech}
                </span>
              ))}
            </div>
          </section>

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
