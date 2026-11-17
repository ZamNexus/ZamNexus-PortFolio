import type { Metadata } from "next";
import Link from "next/link";
import StatusBadge from "@/components/admin/StatusBadge";
import { IconExternal, IconPlus } from "@/components/admin/icons";
import { computeStats, effectiveStatus, listArticles, listCategories } from "@/lib/cms/repository";

export const metadata: Metadata = { title: "Overview" };

const when = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

// Every number on this page is computed from the stored articles on each request.
async function loadOverview() {
  const [articles, categories] = await Promise.all([listArticles(), listCategories()]);
  const now = Date.now();
  const lastPublished = articles
    .filter((a) => effectiveStatus(a, now) === "published" && a.publishedAt)
    .sort((a, b) => Date.parse(b.publishedAt!) - Date.parse(a.publishedAt!))[0];
  const recent = articles.slice(0, 6).map((a) => ({ article: a, status: effectiveStatus(a, now) }));
  return { stats: computeStats(articles, now), recent, categories, lastPublished };
}

export default async function DashboardPage() {
  const { stats, recent, categories, lastPublished } = await loadOverview();

  const cards = [
    { label: "Total articles", value: stats.total, note: "Everything in the library", dot: "var(--accent-text)" },
    { label: "Published articles", value: stats.published, note: stats.scheduled ? `${stats.scheduled} more scheduled` : "Live on the public site", dot: "var(--success)" },
    { label: "Draft articles", value: stats.draft, note: "Work in progress", dot: "var(--foreground-muted)" },
    { label: "Unpublished articles", value: stats.unpublished, note: "Taken offline", dot: "#D97706" },
  ];
  const segments = [
    { label: "Published", n: stats.published, color: "var(--success)" },
    { label: "Scheduled", n: stats.scheduled, color: "var(--accent-text)" },
    { label: "Draft", n: stats.draft, color: "var(--foreground-muted)" },
    { label: "Unpublished", n: stats.unpublished, color: "#D97706" },
  ];

  return (
    <>
      <div className="adm-head">
        <div>
          <h1 className="adm-title">Overview</h1>
          <p className="adm-sub">What is in the Insights library right now, and what visitors can see.</p>
        </div>
        <div className="adm-actions">
          <Link href="/insights" target="_blank" rel="noopener" className="adm-btn">
            <IconExternal /> View Insights page
          </Link>
          <Link href="/admin/articles/create" className="adm-btn adm-btn--primary">
            <IconPlus /> Create article
          </Link>
        </div>
      </div>

      <div className="adm-stats">
        {cards.map((c) => (
          <div key={c.label} className="adm-stat" style={{ "--dot": c.dot } as React.CSSProperties}>
            <p className="adm-stat__label">{c.label}</p>
            <p className="adm-stat__value">{c.value}</p>
            <p className="adm-stat__note">{c.note}</p>
          </div>
        ))}
      </div>

      <div className="adm-two">
        <section className="adm-card" aria-labelledby="recent-title">
          <h2 id="recent-title" className="adm-card__title">
            Recent articles
            <Link href="/admin/articles" className="adm-btn adm-btn--sm">View all</Link>
          </h2>
          {recent.length === 0 ? (
            <div className="adm-empty">
              <b>No articles yet</b>
              <span>Create your first article and publish it to the Insights page.</span>
              <Link href="/admin/articles/create" className="adm-btn adm-btn--primary adm-btn--sm">Create article</Link>
            </div>
          ) : (
            <div className="adm-list">
              {recent.map(({ article: a, status }) => (
                <div key={a.id} className="adm-list__row">
                  <Link href={`/admin/articles/edit/${a.id}`} className="adm-list__link">
                    <b>{a.title}</b>
                    <small>Updated {when(a.updatedAt)}</small>
                  </Link>
                  <StatusBadge status={status} />
                </div>
              ))}
            </div>
          )}
        </section>

        <div className="adm-grid">
          <section className="adm-card" aria-labelledby="status-title">
            <h2 id="status-title" className="adm-card__title">Publication status</h2>
            <div className="adm-seg" role="img" aria-label={segments.map((s) => `${s.n} ${s.label}`).join(", ")}>
              {segments.map((s) => (
                <span key={s.label} style={{ width: `${stats.total ? (s.n / stats.total) * 100 : 0}%`, background: s.color }} />
              ))}
            </div>
            <div className="adm-legend">
              {segments.map((s) => (
                <span key={s.label}>
                  <i style={{ background: s.color }} />
                  {s.label} <b style={{ color: "var(--foreground-strong)" }}>{s.n}</b>
                </span>
              ))}
            </div>
          </section>

          <section className="adm-card" aria-labelledby="overview-title">
            <h2 id="overview-title" className="adm-card__title">Content overview</h2>
            <div className="adm-list">
              <div className="adm-list__row"><span>Categories</span><b style={{ color: "var(--foreground-strong)" }}>{categories.length}</b></div>
              <div className="adm-list__row"><span>Live on the public site</span><b style={{ color: "var(--foreground-strong)" }}>{stats.published}</b></div>
              <div className="adm-list__row">
                <span>Last published</span>
                <b style={{ color: "var(--foreground-strong)", textAlign: "right" }}>{lastPublished ? when(lastPublished.publishedAt!) : "Nothing yet"}</b>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
