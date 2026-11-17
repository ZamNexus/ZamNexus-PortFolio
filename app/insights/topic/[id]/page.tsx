import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getTopic, getTopics } from "@/lib/cms/public";
import { breadcrumbs, jsonLd, pageMetadata } from "@/lib/seo";
import { snippet } from "@/lib/cms/seo-check";

// One page per Insights topic (a category with published articles), so each topic has its own address, title and
// introduction that search engines can rank, and that collects links to every article in it. Reads the same
// store as the Insights page; publishing refreshes it at once (revalidatePath on /insights), and it also
// refreshes every five minutes.

export const revalidate = 300;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return (await getTopics()).map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const topic = await getTopic((await params).id);
  if (!topic) return {};
  return pageMetadata({
    title: `${topic.label} Insights | ZamNexus`,
    description: snippet(topic.intro),
    path: `/insights/topic/${topic.id}`,
  });
}

export default async function TopicPage({ params }: PageProps) {
  const topic = await getTopic((await params).id);
  if (!topic) notFound();
  const path = `/insights/topic/${topic.id}`;
  const count = topic.articles.length;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-clip">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLd(breadcrumbs([{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }, { name: topic.label, path }])),
        }}
      />
      <Navbar />

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-24">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-mono text-foreground-muted">
          <Link href="/" className="hover:text-accent-text transition-colors">Home</Link>
          <span aria-hidden="true">/</span>
          <Link href="/insights" className="hover:text-accent-text transition-colors">Insights</Link>
          <span aria-hidden="true">/</span>
          <span className="font-bold text-accent-text" aria-current="page">{topic.label}</span>
        </nav>

        <header className="mt-10 max-w-3xl">
          <h1 className="font-heading text-4xl sm:text-6xl font-bold tracking-tight leading-[1.08] text-foreground-strong">{topic.label}</h1>
          <p className="mt-6 text-base sm:text-xl text-foreground-muted leading-relaxed">{topic.intro}</p>
          <p className="mt-4 text-sm text-foreground-muted">
            {count} {count === 1 ? "article" : "articles"}, newest first
          </p>
        </header>

        <ol className="mt-14 border-t border-[var(--border-subtle)]">
          {topic.articles.map((a) => (
            <li key={a.id} className="border-b border-[var(--border-subtle)]">
              <article className="group grid grid-cols-1 sm:grid-cols-[minmax(0,1fr)_200px] gap-6 py-8">
                <div className="min-w-0">
                  <p className="text-sm text-foreground-muted">
                    <time dateTime={a.publishedAt}>{a.date}</time> · {a.readTime}
                  </p>
                  <h2 className="mt-2 font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground-strong">
                    <Link href={`/insights/${a.id}`} className="hover:text-accent-text transition-colors">
                      {a.title}
                    </Link>
                  </h2>
                  <p className="mt-3 max-w-[70ch] text-foreground-muted leading-relaxed">{a.subtitle}</p>
                  <Link href={`/insights/${a.id}`} className="mt-4 inline-block text-sm font-semibold text-accent-text underline decoration-accent-text/40 underline-offset-4 hover:decoration-accent-text" aria-label={`Read ${a.title}`}>
                    Read the article
                  </Link>
                </div>
                {a.coverImage ? (
                  <Link href={`/insights/${a.id}`} tabIndex={-1} aria-hidden="true" className="relative hidden sm:block aspect-[16/10] overflow-hidden rounded-2xl border border-[var(--border-subtle)]">
                    <Image src={a.coverImage} alt="" fill sizes="200px" className="object-cover" />
                  </Link>
                ) : null}
              </article>
            </li>
          ))}
        </ol>

        {topic.others.length ? (
          <section aria-labelledby="other-topics" className="mt-16">
            <h2 id="other-topics" className="font-heading text-lg font-semibold text-foreground-strong">More topics</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {topic.others.map((o) => (
                <li key={o.id}>
                  <Link href={`/insights/topic/${o.id}`} className="about-fact-chip">
                    {o.label} ({o.count})
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/insights" className="about-fact-chip">All insights</Link>
              </li>
            </ul>
          </section>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}
