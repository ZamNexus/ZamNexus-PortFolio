import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import ScrollProgress from "@/components/motion/ScrollProgress";
import SplitWords from "@/components/motion/SplitWords";
import Stagger from "@/components/motion/Stagger";
import Spotlight from "@/components/motion/Spotlight";
import RichContent from "@/components/cms/RichContent";
import ShareButton from "@/components/cms/ShareButton";
import ServiceIndex from "@/components/ServiceIndex";
import { outline } from "@/lib/cms/blocks";
import type { InsightView } from "@/lib/cms/public";
import type { Article } from "@/lib/cms/types";

interface CmsArticleViewProps {
  article: Article;
  view: InsightView;
  related: InsightView[];
  // Shown above the page when an admin previews an article that is not public.
  banner?: ReactNode;
}

// The public page for an article written in the admin panel. It uses the same frame, header, typography,
// cards and call to action as the original article pages, so every new article inherits the site's design.
export default function CmsArticleView({ article, view, related, banner }: CmsArticleViewProps) {
  const contents = outline(article.content).map((e) => ({ id: e.id, name: e.name }));
  return (
    <div className="min-h-screen bg-background text-zinc-100 font-sans selection:bg-[var(--accent-hover)] selection:text-[#fff] overflow-x-clip">
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
      {banner}

      <main
        className={`relative z-10 mx-auto px-6 pt-36 pb-28 ${
          contents.length >= 2 ? "max-w-6xl xl:grid xl:grid-cols-[210px_minmax(0,1fr)] xl:gap-14" : "max-w-4xl"
        }`}
      >
        {/* Sticky contents with reading progress (wide screens), built from the article's sections */}
        {contents.length >= 2 ? (
          <aside className="hidden xl:block">
            <div className="sticky top-32">
              <ServiceIndex label="In this article" items={contents} />
            </div>
          </aside>
        ) : null}

        <article className="space-y-12 min-w-0">
          <nav aria-label="Breadcrumb" data-enter="1" className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/60 pb-6 text-xs font-mono">
            <Link href="/insights" className="inline-flex items-center gap-2 text-zinc-400 hover:text-[var(--accent-hover)] transition-colors group">
              <span className="transition-transform group-hover:-translate-x-1">←</span>
              <span>Back to All Insights</span>
            </Link>
            <div className="flex items-center gap-2 text-foreground-muted">
              <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/insights" className="hover:text-zinc-300 transition-colors">Insights</Link>
              <span>/</span>
              <Link href={`/insights/topic/${view.category}`} className="font-bold text-accent-text hover:underline underline-offset-4">
                {view.categoryLabel}
              </Link>
            </div>
          </nav>

          <header className="space-y-6">
            <div data-enter="2" className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border border-accent/30 bg-accent/10 text-accent-text">
                {view.categoryLabel}
              </span>
              <span className="text-xs font-mono text-foreground-muted">
                {view.readTime} · Published {view.date}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.15] text-balance [overflow-wrap:anywhere]">
              <SplitWords mode="load" text={article.title} />
            </h1>

            <p data-enter="4" className="text-base sm:text-xl text-zinc-300 leading-relaxed font-light">
              {article.excerpt}
            </p>

            <div data-enter="5" className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800/80">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center font-mono font-bold text-sm text-background bg-accent-text shadow-md">
                  {article.author.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="text-sm font-bold text-white">{article.author}</div>
                  <div className="text-xs font-mono text-foreground-muted">ZamNexus</div>
                </div>
              </div>
              <ShareButton />
            </div>
          </header>

          {article.coverImage ? (
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/40">
              <Image src={article.coverImage} alt="" fill sizes="(min-width: 1024px) 896px, 100vw" className="object-cover" priority />
            </div>
          ) : null}

          <RichContent doc={article.content} uid={`article-${article.id}`} />

          {article.tags.length > 0 ? (
            <ul className="flex flex-wrap items-center gap-2 pt-2" aria-label="Tags">
              {article.tags.map((tag) => (
                <li key={tag} className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-700/80 text-[11px] font-mono text-zinc-300">
                  {tag}
                </li>
              ))}
            </ul>
          ) : null}

          <FinalCTA
            id="article-cta-heading"
            eyebrow="Let's talk"
            headline="Want this working in your organisation?"
            description="Send a short brief and a senior engineer will reply within one business day."
            primaryButton={{ label: "Book a consultation", href: "/contact" }}
            secondaryButton={{ label: "More insights", href: "/insights" }}
            containerClassName="max-w-none px-0 py-0"
          />

          {related.length > 0 && (
            <aside className="pt-8 border-t border-zinc-800/60 space-y-6">
              <h2 className="text-sm font-mono font-bold text-zinc-400 uppercase tracking-wider">Related articles</h2>
              <Stagger className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((rel) => (
                  <Spotlight key={rel.id} as="div" className="lift-card">
                    <Link href={`/insights/${rel.id}`} className="p-5 group flex h-full flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-foreground-muted uppercase">{rel.categoryLabel}</span>
                        <h3 className="text-sm font-bold text-white group-hover:text-[var(--accent-hover)] transition-colors mt-1 mb-2 line-clamp-2">{rel.title}</h3>
                      </div>
                      <span className="text-xs font-mono text-zinc-400 group-hover:text-white transition-colors">Read article →</span>
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
