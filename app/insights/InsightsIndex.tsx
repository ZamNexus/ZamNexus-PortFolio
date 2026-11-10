"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/motion/ScrollProgress";
import Reveal from "@/components/motion/Reveal";
import SplitWords from "@/components/motion/SplitWords";
import { submitLead } from "@/lib/submitLead";

import { featuredInsight, allInsights, categories } from "./insightsData";
import type { InsightArticle, InsightCategory } from "./insightsData";

// The library reads like a trace view: an article's pipeline is a trace, each stage a span.
// Bar length in the library is reading time on a 10-minute gauge.
const GAUGE_MINUTES = 10;

const GLYPH: Record<string, string> = { ai: "AI", enterprise: "ERP", retail: "POS", healthcare: "EHR", cloud: "CLD" };

function minutes(article: InsightArticle): number {
  return parseInt(article.readTime, 10) || 0;
}

function monthParts(article: InsightArticle): { month: string; year: string } {
  const [month = "", year = ""] = article.date.split(" ");
  return { month: month.slice(0, 3), year };
}

interface DetailProps {
  article: InsightArticle;
  stage: number;
  onStage: (index: number) => void;
}

// Preview of one article: its stages (click or hover to read one), headline specs and stack.
function Detail({ article, stage, onStage }: DetailProps) {
  const current = article.pipeline[Math.min(stage, article.pipeline.length - 1)];
  return (
    <div className="tr-detail">
      <div>
        <p className="tr-cap">Pipeline stages</p>
        <ol className="tr-stages">
          {article.pipeline.map((s, i) => (
            <li key={s.step}>
              <button
                type="button"
                className="tr-stage"
                aria-pressed={i === stage}
                onPointerEnter={() => onStage(i)}
                onFocus={() => onStage(i)}
                onClick={() => onStage(i)}
              >
                <i>{s.step}</i>
                {s.phase}
              </button>
            </li>
          ))}
        </ol>
        <div className="tr-readout">
          <b>{current.title}</b>
          {current.detail}
        </div>
      </div>

      <dl className="tr-specs">
        {article.specs.slice(0, 2).map((spec) => (
          <div key={spec.label} className="tr-spec">
            <dd>{spec.value}</dd>
            <dt>{spec.label}</dt>
          </div>
        ))}
      </dl>

      <Link href={`/insights/${article.id}`} className="tr-open">
        Read the full article <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

export default function InsightsIndex() {
  const [selectedCategory, setSelectedCategory] = useState<InsightCategory>("all");
  const [selection, setSelection] = useState<{ id: string; stage: number }>({ id: allInsights[0].id, stage: 0 });
  const [featuredStage, setFeaturedStage] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "sending" | "success">("idle");
  const [newsletterError, setNewsletterError] = useState<string | null>(null);

  const visible =
    selectedCategory === "all" ? allInsights : allInsights.filter((a) => a.category === selectedCategory);
  const active = visible.find((a) => a.id === selection.id) ?? visible[0];
  const activeStage = active && active.id === selection.id ? selection.stage : 0;
  const select = (id: string, stage = 0) => setSelection({ id, stage });

  const steps = featuredInsight.pipeline;
  const stepWidth = Math.min(100, (100 / steps.length) * 1.3);
  const featuredStep = steps[Math.min(featuredStage, steps.length - 1)];

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
      className="min-h-screen bg-background text-zinc-100 font-sans selection:bg-[var(--accent-hover)] selection:text-[#fff] overflow-x-clip"
    >
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="insights-grid" width="44" height="44" patternUnits="userSpaceOnUse">
              <path d="M 44 0 L 0 0 0 44" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#insights-grid)" />
        </svg>
      </div>

      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section aria-labelledby="insights-hero-heading" className="max-w-6xl mx-auto px-6 pt-40 pb-20">
          <h1
            id="insights-hero-heading"
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-3xl leading-[1.05]"
          >
            <SplitWords mode="load" text="Engineering insights from the systems we build." />
          </h1>
          <p data-enter="4" className="mt-6 text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed">
            What we&apos;ve learned building ERP, retail, education and healthcare software, written for the engineers and IT leaders who will run it.
          </p>
        </section>

        {/* ── FEATURED: the pipeline drawn as a trace ──────────────────────── */}
        <section aria-labelledby="featured-heading" className="max-w-6xl mx-auto px-6 pb-28">
          <div className="tr-panel">
            <div className="tr-panel__head">
              <span className="tr-tag">Featured trace</span>
              <span>
                {featuredInsight.categoryLabel}, {featuredInsight.readTime}, {featuredInsight.date}
              </span>
            </div>

            <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-x-14 gap-y-10 p-6 sm:p-10">
              <div className="flex flex-col justify-between gap-10">
                <Link href={`/insights/${featuredInsight.id}`} className="group/title block">
                  <h2
                    id="featured-heading"
                    className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-[1.12] group-hover/title:text-[var(--accent-text)] transition-colors"
                  >
                    {featuredInsight.title}
                  </h2>
                </Link>
                <div>
                  <Link href={`/insights/${featuredInsight.id}`} className="liquid-lime-btn text-sm py-3 px-6">
                    <span>Read the full article</span>
                    <span className="arrow-icon w-6 h-6 text-xs" aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              <div>
                <p className="tr-cap">Pipeline, first stage to last</p>
                <ol className="tr-wf">
                  {steps.map((s, i) => (
                    <li key={s.step}>
                      <button
                        type="button"
                        className="tr-wf__row"
                        aria-pressed={i === featuredStage}
                        onPointerEnter={() => setFeaturedStage(i)}
                        onFocus={() => setFeaturedStage(i)}
                        onClick={() => setFeaturedStage(i)}
                      >
                        <span className="tr-wf__label">
                          <b>{s.phase}</b>
                          <small>{s.title}</small>
                        </span>
                        <span className="tr-track">
                          <span
                            className="tr-wf__bar"
                            style={
                              {
                                "--s": `${steps.length > 1 ? ((100 - stepWidth) * i) / (steps.length - 1) : 0}%`,
                                "--w": `${stepWidth}%`,
                                "--i": i,
                              } as CSSProperties
                            }
                          />
                        </span>
                      </button>
                    </li>
                  ))}
                </ol>
                <div className="tr-readout" aria-live="polite">
                  <b>
                    {featuredStep.step} {featuredStep.title}
                  </b>
                  {featuredStep.detail}
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* ── LIBRARY: every article as a span on a reading-time gauge ──────── */}
        <div className="tr-divide">
        <section aria-labelledby="library-heading" className="max-w-6xl mx-auto px-6 pt-24 pb-28">
          <div className="tr-library-head">
            <h2 id="library-heading" className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-none">
              Full library
            </h2>
            <p className="tr-library-sub">
              <span className="tr-count">{allInsights.length}</span>
              All insights, newest first
            </p>
          </div>

          <p className="tr-legend">
            <span className="tr-legend__bar" aria-hidden="true" />
            Bar length is reading time
            <span className="tr-legend__seg" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            Each segment is one pipeline stage
          </p>

          <div className="mt-10">
            <div role="group" aria-label="Filter articles by topic" className="flex flex-wrap gap-x-7 gap-y-1">
              {categories.map((cat) => {
                const count = cat.id === "all" ? allInsights.length : allInsights.filter((a) => a.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className="tr-filter"
                    aria-pressed={selectedCategory === cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                  >
                    {cat.label}
                    <span className="tr-filter__n">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10 grid lg:grid-cols-[minmax(0,1fr)_360px] gap-x-14 gap-y-6 items-start">
            <ol key={selectedCategory} className="tr-list">
              {visible.map((article, i) => {
                const isActive = active?.id === article.id;
                const when = monthParts(article);
                const prev = visible[i - 1];
                const newMonth = !prev || prev.date !== article.date;
                return (
                  <li
                    key={article.id}
                    className="tr-row"
                    aria-current={isActive ? "true" : undefined}
                    onPointerEnter={() => select(article.id)}
                    onFocus={() => (isActive ? undefined : select(article.id))}
                  >
                    <div className="tr-when">
                      {newMonth && (
                        <>
                          <b>{when.month}</b>
                          {when.year}
                        </>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="tr-meta">
                        <span className="tr-glyph">{GLYPH[article.category] ?? "ZNX"}</span>
                        <span>{article.categoryLabel}</span>
                      </div>
                      <Link href={`/insights/${article.id}`} className="tr-title">
                        {article.title}
                      </Link>
                      <div className="tr-gauge">
                        <div className="tr-gauge__track">
                          <div className="tr-gauge__fill" style={{ "--w": `${(minutes(article) / GAUGE_MINUTES) * 100}%` } as CSSProperties}>
                            {article.pipeline.map((s, si) => (
                              <button
                                key={s.step}
                                type="button"
                                className="tr-seg"
                                aria-label={`${article.title}, stage ${s.step}: ${s.phase}`}
                                aria-pressed={isActive && si === activeStage}
                                onPointerEnter={() => select(article.id, si)}
                                onClick={() => select(article.id, si)}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="tr-min">{minutes(article)} min</span>
                      </div>
                      {isActive && (
                        <div className="lg:hidden mt-5">
                          <Detail article={article} stage={activeStage} onStage={(s) => select(article.id, s)} />
                        </div>
                      )}
                    </div>
                  </li>
                );
              })}
            </ol>

            <aside className="tr-aside hidden lg:block" aria-live="polite" aria-label="Article preview">
              {active && <Detail article={active} stage={activeStage} onStage={(s) => select(active.id, s)} />}
            </aside>
          </div>
        </section>
        </div>

        {/* ── DISPATCH ─────────────────────────────────────────────────────── */}
        <section aria-labelledby="newsletter-heading" className="max-w-6xl mx-auto px-6 pt-4 pb-28">
          <Reveal className="tr-strip">
            <div className="md:flex-1">
              <h2 id="newsletter-heading" className="text-lg sm:text-xl font-extrabold tracking-tight text-white">
                Get new articles by email
              </h2>
              <p className="mt-1 text-sm text-foreground-muted">About once a quarter. No filler.</p>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch gap-2 md:w-[26rem]">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="you@company.com"
                aria-label="Email address"
                className="w-full px-4 py-2.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-100 text-xs font-mono focus:outline-none focus:border-[var(--accent-hover)] brief-input"
              />
              <button
                type="submit"
                disabled={newsletterStatus !== "idle"}
                className="liquid-lime-btn text-xs py-2.5 px-5 whitespace-nowrap cursor-pointer disabled:opacity-60 disabled:cursor-default"
              >
                <span>
                  {newsletterStatus === "success" ? "Subscribed" : newsletterStatus === "sending" ? "Sending…" : "Subscribe"}
                </span>
                <span className="arrow-icon w-6 h-6 text-xs" aria-hidden="true">→</span>
              </button>
            </form>
            {newsletterStatus === "success" && (
              <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="text-xs font-mono text-emerald-400">
                You&apos;re on the list.
              </motion.p>
            )}
            {newsletterError && (
              <p role="alert" className="text-xs font-mono text-red-400">
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
