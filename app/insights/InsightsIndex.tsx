"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/motion/ScrollProgress";
import HeroScreen from "@/components/HeroScreen";
import Reveal from "@/components/motion/Reveal";
import SplitWords from "@/components/motion/SplitWords";
import { submitLead } from "@/lib/submitLead";

import type { CategoryCount, InsightView } from "@/lib/cms/public";

// The library reads like a trace view: an article's pipeline is a trace, each stage a span.
// Bar length in the library is reading time on a 10-minute gauge.
const GAUGE_MINUTES = 10;

const GLYPH: Record<string, string> = { ai: "AI", enterprise: "ERP", retail: "POS", healthcare: "EHR", cloud: "CLD" };

function minutes(article: InsightView): number {
  return article.minutes;
}

function monthParts(article: InsightView): { month: string; year: string } {
  const [month = "", year = ""] = article.date.split(" ");
  return { month: month.slice(0, 3), year };
}

interface DetailProps {
  article: InsightView;
  stage: number;
  onStage: (index: number) => void;
}

// Preview of one article: its description, then (for the original blueprints) its stages, headline specs and
// stack, or (for newer articles) its tags.
function Detail({ article, stage, onStage }: DetailProps) {
  const current = article.pipeline[Math.min(stage, article.pipeline.length - 1)];
  return (
    <div className="tr-detail">
      {article.coverImage ? (
        <span className="tr-thumb tr-thumb--wide">
          <Image src={article.coverImage} alt="" fill sizes="360px" className="object-cover" />
        </span>
      ) : null}
      <p className="tr-excerpt tr-excerpt--full">{article.subtitle}</p>

      {article.pipeline.length > 0 ? (
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
      ) : article.tags.length > 0 ? (
        <ul className="tr-tags">
          {article.tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      ) : null}

      {article.specs.length > 0 ? (
        <dl className="tr-specs">
          {article.specs.slice(0, 2).map((spec) => (
            <div key={spec.label} className="tr-spec">
              <dd>{spec.value}</dd>
              <dt>{spec.label}</dt>
            </div>
          ))}
        </dl>
      ) : null}

      <Link href={`/insights/${article.id}`} className="tr-open">
        Read the full article <span aria-hidden="true">→</span>
      </Link>
    </div>
  );
}

interface InsightsIndexProps {
  articles: InsightView[];
  categories: CategoryCount[];
}

export default function InsightsIndex({ articles, categories }: InsightsIndexProps) {
  // Everything on this page is derived from the published articles it is given, so the count, the filters, the
  // featured panel and the library can never drift from each other or from what the admin has published.
  const allInsights = articles;
  const featuredInsight = articles.find((a) => a.featured) ?? articles[0];
  const recent = articles.filter((a) => a.id !== featuredInsight?.id).slice(0, 3);
  const filterList = [{ id: "all", label: "All Insights", count: articles.length }, ...categories];
  const libraryStats = [
    { figure: String(articles.length), label: articles.length === 1 ? "article" : "articles" },
    { figure: String(categories.length), label: categories.length === 1 ? "topic" : "topics" },
    { figure: String(articles.reduce((sum, a) => sum + minutes(a), 0)), label: "minutes of reading" },
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selection, setSelection] = useState<{ id: string; stage: number }>({ id: articles[0]?.id ?? "", stage: 0 });
  const [featuredStage, setFeaturedStage] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "sending" | "success">("idle");
  const [newsletterError, setNewsletterError] = useState<string | null>(null);

  const visible =
    selectedCategory === "all" ? allInsights : allInsights.filter((a) => a.category === selectedCategory);
  const active = visible.find((a) => a.id === selection.id) ?? visible[0];
  const activeStage = active && active.id === selection.id ? selection.stage : 0;
  const select = (id: string, stage = 0) => setSelection({ id, stage });

  const steps = featuredInsight?.pipeline ?? [];
  const stepWidth = Math.min(100, (100 / Math.max(1, steps.length)) * 1.3);
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
        <HeroScreen labelledBy="insights-hero-heading" cueHref="#featured" cueLabel="Scroll to the featured article">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,540px)] gap-12 lg:gap-14 items-center">
            <div>
              <h1
                id="insights-hero-heading"
                className="text-4xl sm:text-6xl lg:text-[3rem] xl:text-[3.6rem] font-extrabold tracking-tight text-white max-w-3xl leading-[1.05]"
              >
                <SplitWords mode="load" text="Engineering insights from the systems we build." />
              </h1>
              <p data-enter="4" className="mt-6 text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed">
                What we&apos;ve learned building ERP, retail, education and healthcare software, written for the engineers and IT leaders who will run it.
              </p>
              <dl data-enter="5" className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
                {libraryStats.map((stat) => (
                  <div key={stat.label} className="flex items-baseline gap-2">
                    <dt className="order-2 text-foreground-muted">{stat.label}</dt>
                    <dd className="font-heading text-3xl font-bold tracking-[-0.03em] text-foreground-strong">{stat.figure}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* The most recent articles after the featured one below; each opens its article. */}
            <div data-enter="6">
              <p className="text-sm font-semibold text-foreground-strong">Recent articles</p>
              <ul className="mt-4 border-t border-[var(--border-subtle)]">
                {recent.map((a) => (
                  <li key={a.id} className="border-b border-[var(--border-subtle)]">
                    <Link href={`/insights/${a.id}`} className="group block py-4">
                      <span className="block text-xs font-semibold text-accent-text">{a.categoryLabel}</span>
                      <span className="mt-1.5 block font-heading text-lg font-bold leading-snug tracking-[-0.01em] text-foreground-strong transition-colors duration-300 group-hover:text-accent-text">
                        {a.title}
                      </span>
                      <span className="mt-1.5 block text-sm text-foreground-muted">
                        {a.readTime} · {a.date}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </HeroScreen>

        {/* ── FEATURED: the pipeline drawn as a trace ──────────────────────── */}
        {featuredInsight ? (
        <section id="featured" aria-labelledby="featured-heading" className="scroll-mt-12 max-w-6xl mx-auto px-6 pb-28">
          <div className="tr-panel">
            <div className="tr-panel__head">
              <span className="tr-tag">{steps.length > 0 ? "Featured trace" : "Featured article"}</span>
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

              {steps.length === 0 ? (
                <div className="flex flex-col justify-center gap-6">
                  {featuredInsight.coverImage ? (
                    <span className="tr-thumb tr-thumb--wide">
                      <Image src={featuredInsight.coverImage} alt="" fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" priority />
                    </span>
                  ) : null}
                  <p className="text-base sm:text-lg text-foreground-muted leading-relaxed">{featuredInsight.subtitle}</p>
                  {featuredInsight.tags.length > 0 ? (
                    <ul className="tr-tags">
                      {featuredInsight.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ) : null}
              {steps.length > 0 ? (
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
              ) : null}
            </div>

          </div>
        </section>
        ) : null}

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
              {filterList.map((cat) => {
                const count = cat.count;
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
              {visible.length === 0 ? (
                <li className="tr-row">
                  <p className="text-foreground-muted">No articles have been published yet. Check back soon.</p>
                </li>
              ) : null}
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
                        <span className="tr-glyph">{GLYPH[article.category] ?? article.categoryLabel.slice(0, 3).toUpperCase()}</span>
                        <span>{article.categoryLabel}</span>
                      </div>
                      <Link href={`/insights/${article.id}`} className="tr-title">
                        {article.title}
                      </Link>
                      <p className="tr-excerpt">{article.subtitle}</p>
                      {article.coverImage ? (
                        <span className="tr-thumb">
                          <Image src={article.coverImage} alt="" fill sizes="240px" className="object-cover" />
                        </span>
                      ) : null}
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
