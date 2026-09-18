"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import type { InsightArticle } from "../insightsData";
import { allInsights } from "../insightsData";

interface ArticleClientViewProps {
  article: InsightArticle | undefined;
  slug: string;
}

export default function ArticleClientView({ article, slug }: ArticleClientViewProps) {
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

  // ─── COMING SOON FALLBACK (For invalid / in-progress slugs) ───────────────
  if (!article) {
    return (
      <div className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[var(--accent-hover)] selection:text-black">
        <Navbar />
        <main className="max-w-4xl mx-auto px-6 pt-40 pb-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="p-8 sm:p-14 rounded-3xl bg-zinc-950/80 border border-zinc-800 shadow-2xl relative overflow-hidden"
          >
            <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400 text-2xl mx-auto flex items-center justify-center font-mono font-bold mb-6">
              ⚡
            </div>

            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold block mb-2">
              Architecture In Peer Review
            </span>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Architecture Blueprint Coming Soon
            </h1>

            <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-8">
              The technical specification for{" "}
              <code className="text-zinc-300 font-mono bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 text-xs">
                /{slug}
              </code>{" "}
              is currently completing final latency benchmarks and production validation.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/Insights" className="liquid-lime-btn text-xs py-3.5 px-6">
                <span>Explore Published Insights</span>
                <span className="arrow-icon w-6 h-6 text-xs" aria-hidden="true">→</span>
              </Link>
              <Link
                href="/Contact"
                className="px-6 py-3.5 rounded-full border border-zinc-700 bg-zinc-900 hover:bg-zinc-800 text-xs font-mono text-zinc-200 transition-colors"
              >
                Request Advance Draft
              </Link>
            </div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  // Related insights (first 2 from other articles)
  const relatedInsights = allInsights
    .filter((item) => item.id !== article.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[var(--accent-hover)] selection:text-black">
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

      <Navbar />

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-36 pb-28">
        {/* Quick fade/slide-up transition (200ms) on navigation */}
        <motion.article
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="space-y-12"
        >
          {/* ── TOP BREADCRUMB & BACK LINK ─────────────────────────────────── */}
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/60 pb-6 text-xs font-mono">
            <Link
              href="/Insights"
              className="inline-flex items-center gap-2 text-zinc-400 hover:text-[var(--accent-hover)] transition-colors group"
            >
              <span className="transition-transform group-hover:-translate-x-1">←</span>
              <span>Back to All Insights</span>
            </Link>

            <div className="flex items-center gap-2 text-zinc-500">
              <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/Insights" className="hover:text-zinc-300 transition-colors">Insights</Link>
              <span>/</span>
              <span style={{ color: article.accent }} className="font-bold">{article.categoryLabel}</span>
            </div>
          </nav>

          {/* ── HERO HEADER ───────────────────────────────────────────────── */}
          <header className="space-y-6">
            <div className="flex flex-wrap items-center gap-3">
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
              <span className="text-xs font-mono text-zinc-500">
                {article.readTime} · Published {article.date}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              {article.title}
            </h1>

            <p className="text-base sm:text-xl text-zinc-300 leading-relaxed font-light">
              {article.subtitle}
            </p>

            {/* Author bar & Share button */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800/80">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm text-black shadow-md"
                  style={{ background: article.accent }}
                >
                  {article.author.charAt(0)}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{article.author}</div>
                  <div className="text-xs font-mono text-zinc-500">{article.authorRole}</div>
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
          <section aria-labelledby="specs-heading" className="p-6 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 shadow-xl">
            <h2 id="specs-heading" className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold mb-4">
              Production Architecture Benchmark Targets
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {article.specs.map((spec) => (
                <div key={spec.label} className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/60">
                  <div className="text-[11px] font-mono text-zinc-500 mb-1">{spec.label}</div>
                  <div className="text-lg sm:text-xl font-mono font-bold text-white tracking-tight" style={{ color: article.accent }}>
                    {spec.value}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── THE PROBLEM & THE SOLUTION (Side-by-Side Cards) ─────────────── */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <div
              className="p-6 sm:p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 space-y-4"
              style={{ borderLeftWidth: "4px", borderLeftColor: article.accent }}
            >
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
              <ul className="space-y-2 pt-1">
                {article.solution.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-zinc-300 font-mono">
                    <span className="text-emerald-400 font-bold shrink-0">✓</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* ── FULL SUMMARY / EXECUTIVE NARRATIVE ─────────────────────────── */}
          <section className="p-8 rounded-3xl bg-zinc-950/70 border border-zinc-800/80 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold block">
              Architectural Deep-Dive
            </span>
            <h2 className="text-2xl font-bold text-white">System Dynamics &amp; Execution</h2>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              {article.fullSummary}
            </p>
          </section>

          {/* ── SEQUENTIAL ARCHITECTURE PIPELINE FLOW ──────────────────────── */}
          <section aria-labelledby="pipeline-heading" className="space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold block mb-1">
                System Sequence
              </span>
              <h2 id="pipeline-heading" className="text-2xl font-bold text-white">
                Step-by-Step Data &amp; Logic Flow
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {article.pipeline.map((step) => (
                <div
                  key={step.step}
                  className="p-5 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 flex flex-col justify-between space-y-3 relative overflow-hidden group hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-extrabold font-mono" style={{ color: article.accent }}>
                      {step.step}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider">
                      {step.phase}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white mb-1.5">{step.title}</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ── KEY TAKEAWAYS CALLOUT ──────────────────────────────────────── */}
          <section className="p-8 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest font-bold" style={{ color: article.accent }}>
              <span>★</span>
              <span>Principal Architect Takeaways</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {article.keyTakeaways.map((point, i) => (
                <div key={i} className="p-4 rounded-xl bg-zinc-950/80 border border-zinc-800/80 text-xs font-mono text-zinc-300 flex items-start gap-2.5">
                  <span className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ background: article.accent }} />
                  <span className="leading-relaxed">{point}</span>
                </div>
              ))}
            </div>

            {/* Tech Stack Pills */}
            <div className="pt-4 border-t border-zinc-800/60 flex flex-wrap items-center gap-2">
              <span className="text-xs font-mono text-zinc-500 mr-2">Target Stack:</span>
              {article.techStack.map((tech) => (
                <span key={tech} className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-700/80 text-[11px] font-mono text-zinc-300">
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* ── BOTTOM CALL TO ACTION ──────────────────────────────────────── */}
          <FinalCTA
            id="article-cta-heading"
            eyebrow="Enterprise Deployment"
            headline="Ready to implement this architecture in your organisation?"
            description="Our Senior Principal Architects review technical landscapes, evaluate existing bottlenecks, and design turnkey production rollouts."
            primaryButton={{
              label: "Book Architecture Consultation",
              href: "/Contact",
            }}
            secondaryButton={{
              label: "Explore More Blueprints",
              href: "/Insights",
            }}
            containerClassName="max-w-none px-0 py-0"
          />

          {/* ── RELATED BLUEPRINTS ─────────────────────────────────────────── */}
          {relatedInsights.length > 0 && (
            <aside className="pt-8 border-t border-zinc-800/60 space-y-6">
              <h2 className="text-sm font-mono font-bold text-zinc-400 uppercase tracking-wider">
                Related Technical Blueprints
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedInsights.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/Insights/${rel.id}`}
                    className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/70 hover:border-zinc-700 hover:bg-zinc-900/60 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">{rel.categoryLabel}</span>
                      <h3 className="text-sm font-bold text-white group-hover:text-[var(--accent-hover)] transition-colors mt-1 mb-2 line-clamp-2">
                        {rel.title}
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-zinc-400 group-hover:text-white transition-colors">
                      Read Blueprint →
                    </span>
                  </Link>
                ))}
              </div>
            </aside>
          )}
        </motion.article>
      </main>

      <Footer hideCTA />
    </div>
  );
}
