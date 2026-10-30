"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PillTab from "@/components/PillTab";
import ScrollProgress from "@/components/motion/ScrollProgress";
import Reveal from "@/components/motion/Reveal";
import Stagger from "@/components/motion/Stagger";
import SplitWords from "@/components/motion/SplitWords";
import Spotlight from "@/components/motion/Spotlight";
import { submitLead } from "@/lib/submitLead";
import { company } from "@/lib/siteFacts";
import { jsonLd, breadcrumbs } from "@/lib/seo";

import { featuredInsight, articles, categories } from "./insightsData";
import type { InsightCategory } from "./insightsData";

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState<InsightCategory>("all");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "sending" | "success">("idle");
  const [newsletterError, setNewsletterError] = useState<string | null>(null);

  const filteredArticles =
    selectedCategory === "all"
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setNewsletterStatus("sending");
    setNewsletterError(null);
    const failure = await submitLead({ source: "newsletter", email: newsletterEmail });
    if (failure) {
      setNewsletterError(failure);
      setNewsletterStatus("idle");
      return;
    }
    setNewsletterStatus("success");
    setNewsletterEmail("");
  };

  return (
    <div
      suppressHydrationWarning
      className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[var(--accent-hover)] selection:text-black overflow-x-clip"
    >
      {/* Background Cyber Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="insights-grid" width="44" height="44" patternUnits="userSpaceOnUse">
              <path d="M 44 0 L 0 0 0 44" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#insights-grid)" />
        </svg>

        {/* Ambient Halos */}
        <div className="absolute top-[12%] left-[10%] w-[650px] h-[650px] rounded-full bg-violet-600/[0.05] blur-[180px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[8%] w-[600px] h-[600px] rounded-full bg-amber-600/[0.04] blur-[180px] pointer-events-none" />
      </div>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs([{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }])) }} />
      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="insights-hero-heading"
          className="max-w-7xl mx-auto px-6 pt-40 pb-16 text-center"
        >
          <div
            data-enter="1"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono font-medium text-[var(--accent-hover)] mb-8 backdrop-blur-xl shadow-lg"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-hover)] animate-pulse" />
            ZamNexus Engineering Research &amp; Architectural Insights
          </div>

          <h1
            id="insights-hero-heading"
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]"
          >
            <SplitWords mode="load" text="Engineering insights from the systems we build." />
          </h1>

          <p
            data-enter="4"
            className="mt-6 text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            What we&apos;ve learned building ERP, retail, education and healthcare software, written for the engineers and IT leaders who will run it.
          </p>
        </section>

        {/* ── FEATURED RESEARCH WHITE-PAPER (HERO CARD) ────────────────────── */}
        <section
          aria-labelledby="featured-heading"
          className="max-w-7xl mx-auto px-6 pb-16"
        >
          <div data-enter="5">
          <Spotlight
            as="div"
            className="featured-card p-8 sm:p-12 rounded-3xl bg-zinc-950/80 border border-zinc-800 shadow-2xl overflow-hidden group"
            style={{ "--rail": featuredInsight.accent } as CSSProperties}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <span
                  className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border"
                  style={{
                    color: featuredInsight.accent,
                    borderColor: `${featuredInsight.accent}50`,
                    background: `${featuredInsight.accent}15`,
                  }}
                >
                  Featured Research
                </span>
                <span className="text-xs font-mono text-foreground-muted">{featuredInsight.categoryLabel}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-foreground-muted">
                <span>{featuredInsight.readTime}</span>
                <span>•</span>
                <span>{featuredInsight.date}</span>
              </div>
            </div>

            <Link href={`/insights/${featuredInsight.id}`} className="group/title block">
              <h2 id="featured-heading" className="text-2xl sm:text-4xl font-extrabold text-white mb-4 leading-snug group-hover/title:text-[var(--accent-hover)] transition-colors">
                {featuredInsight.title}
              </h2>
            </Link>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-4xl mb-8">
              {featuredInsight.subtitle}
            </p>

            {/* Key Takeaways */}
            <Stagger className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {featuredInsight.keyTakeaways.map((point, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs font-mono text-zinc-300 flex items-start gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: featuredInsight.accent }} />
                  <span>{point}</span>
                </div>
              ))}
            </Stagger>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800/70">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center font-mono font-bold text-xs text-white border border-zinc-700">
                  {(company.articleAuthorsAreStaff ? featuredInsight.author : "ZamNexus").charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{company.articleAuthorsAreStaff ? featuredInsight.author : "ZamNexus Engineering"}</div>
                  <div className="text-[11px] font-mono text-foreground-muted">{company.articleAuthorsAreStaff ? featuredInsight.authorRole : "ZamNexus Limited"}</div>
                </div>
              </div>

              <Link
                href={`/insights/${featuredInsight.id}`}
                className="liquid-lime-btn text-xs sm:text-sm py-3 px-6 cursor-pointer"
              >
                <span>Read Full Architecture Blueprint</span>
                <span className="arrow-icon w-6 h-6 text-xs" aria-hidden="true">→</span>
              </Link>
            </div>
          </Spotlight>
          </div>
        </section>

        {/* ── INTERACTIVE CATEGORY DOCK ────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 pb-12">
          <div className="flex items-center justify-center flex-wrap gap-2 p-1.5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 max-w-4xl mx-auto backdrop-blur-md">
            {categories.map((cat) => (
              <PillTab
                key={cat.id}
                variant="tab"
                isSelected={selectedCategory === cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                label={cat.label}
                layoutId="active-insights-tab"
                accent="var(--accent-hover)"
              />
            ))}
          </div>
        </section>

        {/* ── ARTICLES GRID ────────────────────────────────────────────────── */}
        <section
          aria-labelledby="articles-heading"
          className="max-w-7xl mx-auto px-6 pb-20"
        >
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-zinc-800/60">
            <h2 id="articles-heading" className="text-lg font-mono font-bold text-white uppercase tracking-wider">
              Technical Insights ({filteredArticles.length})
            </h2>
            <span className="text-xs font-mono text-foreground-muted">
              Peer-reviewed engineering post-mortems
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((article) => (
                <motion.article
                  key={article.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="lift-card product-card p-7 flex flex-col justify-between group"
                  style={{ "--rail": article.accent } as CSSProperties}
                >
                  <div className="product-card__bar" aria-hidden="true" />
                  <div>
                    {/* Category & Read Time */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                        style={{
                          color: article.accent,
                          borderColor: `${article.accent}40`,
                          background: `${article.accent}12`,
                        }}
                      >
                        {article.categoryLabel}
                      </span>
                      <span className="text-[11px] font-mono text-foreground-muted">{article.readTime}</span>
                    </div>

                    <Link href={`/insights/${article.id}`} className="group/title block">
                      <h3 className="text-lg font-bold text-white mb-3 group-hover/title:text-[var(--accent-hover)] transition-colors leading-snug">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                      {article.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono font-bold text-zinc-200">{company.articleAuthorsAreStaff ? article.author : "ZamNexus Engineering"}</div>
                      <div className="text-[10px] font-mono text-foreground-muted">{article.date}</div>
                    </div>

                    <Link
                      href={`/insights/${article.id}`}
                      className="product-card__link px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950/80 hover:bg-zinc-800 hover:border-zinc-700 text-xs font-mono text-white transition-colors cursor-pointer inline-flex items-center gap-1"
                    >
                      <span>Read Blueprint</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* ── EXECUTIVE TECHNOLOGY BRIEFING SUBSCRIPTION ───────────────────── */}
        <section
          aria-labelledby="newsletter-heading"
          className="max-w-4xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <Reveal variant="words" replay={false} className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-zinc-900/90 to-zinc-950 border border-zinc-800 shadow-2xl text-center">
            <span className="reveal-sub text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
              Engineering Dispatch
            </span>
            <h2 id="newsletter-heading" className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
              <SplitWords text="Get new articles by email" />
            </h2>
            <p className="reveal-sub text-zinc-400 text-sm max-w-xl mx-auto mt-3 mb-8 leading-relaxed">
              About once a quarter.
            </p>

            <form onSubmit={handleSubscribe} className="reveal-sub flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="you@company.com"
                aria-label="Email address"
                className="w-full px-5 py-3.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-100 text-xs font-mono focus:outline-none focus:border-[var(--accent-hover)] brief-input"
              />
              <button
                type="submit"
                disabled={newsletterStatus !== "idle"}
                className="w-full sm:w-auto liquid-lime-btn text-xs py-3.5 px-6 whitespace-nowrap cursor-pointer disabled:opacity-60 disabled:cursor-default"
              >
                <span>
                  {newsletterStatus === "success" ? "Subscribed ✓" : newsletterStatus === "sending" ? "Sending…" : "Subscribe"}
                </span>
                <span className="arrow-icon w-6 h-6 text-xs" aria-hidden="true">→</span>
              </button>
            </form>

            {newsletterStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-mono text-emerald-400 mt-4"
              >
                ✓ Thanks. You&apos;re on the list for our quarterly briefings.
              </motion.div>
            )}
            {newsletterError && (
              <p role="alert" className="text-xs font-mono text-red-400 mt-4">
                {newsletterError}
              </p>
            )}
          </Reveal>
        </section>

      </main>

      <Footer />
    </div>
  );
}
