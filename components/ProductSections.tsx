import { clients, confirmed, productStats, type ProductSlug } from "@/lib/siteFacts";
import { jsonLd } from "@/lib/seo";

// Shared sections for the four product pages. Figures and client names come from lib/siteFacts.ts
// and render only once confirmed, so the pages can't publish an unverified claim.

export function ProductStats({ slug, accent }: { slug: ProductSlug; accent: string }) {
  return (
    <dl className="lg:col-span-5 grid grid-cols-2 gap-3">
      {confirmed(productStats[slug]).map((item) => (
        <div key={item.label} className="p-5 rounded-2xl bg-surface/80 border border-[var(--border-subtle)]">
          <dt className="sr-only">{item.label}</dt>
          <dd className="text-2xl sm:text-3xl font-bold font-mono" style={{ color: accent }}>
            {item.value}
          </dd>
          <dd className="text-sm text-foreground mt-1">{item.label}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ProductClients({ slug }: { slug: ProductSlug }) {
  const names = confirmed(clients).filter((c) => c.products.includes(slug));
  if (!names.length) return null;
  return (
    <section aria-labelledby={`${slug}-clients`} className="max-w-6xl mx-auto px-4 sm:px-6 py-16 border-t border-zinc-800/60 text-center">
      <h2 id={`${slug}-clients`} className="text-xs font-mono uppercase tracking-widest font-bold text-foreground-muted mb-6">
        In use at
      </h2>
      <ul className="flex flex-wrap justify-center gap-4">
        {names.map((c) => (
          <li key={c.name} className="px-4 py-2 rounded-xl bg-surface/80 border border-[var(--border-subtle)] text-sm text-foreground">
            {c.name}
          </li>
        ))}
      </ul>
    </section>
  );
}

interface AudienceItem {
  title: string;
  text: string;
}

export function ProductAudience({ id, title, items }: { id: string; title: string; items: AudienceItem[] }) {
  return (
    <section aria-labelledby={id} className="max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-zinc-800/60">
      <p className="text-xs font-mono uppercase tracking-widest font-bold text-accent-text">Who it&apos;s for</p>
      <h2 id={id} className="mt-3 font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground-strong">
        {title}
      </h2>
      <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.title} className="rounded-3xl bg-surface/80 border border-[var(--border-subtle)] p-6">
            <h3 className="text-lg font-bold text-foreground-strong">{item.title}</h3>
            <p className="mt-2 text-sm text-foreground-muted leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

interface FaqItem {
  q: string;
  a: string;
}

export function ProductFaq({ id, items }: { id: string; items: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <section aria-labelledby={id} className="max-w-3xl mx-auto px-4 sm:px-6 py-20 border-t border-zinc-800/60">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} />
      <p className="text-xs font-mono uppercase tracking-widest font-bold text-accent-text">FAQ</p>
      <h2 id={id} className="mt-3 font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground-strong">
        Common questions.
      </h2>
      <div className="mt-8 divide-y divide-zinc-800/80 border-y border-zinc-800/80">
        {items.map((f) => (
          <details key={f.q} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold text-foreground-strong focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-text">
              {f.q}
              <span className="text-accent-text transition-transform duration-300 group-open:rotate-45" aria-hidden="true">+</span>
            </summary>
            <p className="mt-3 text-foreground-muted leading-relaxed">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

// Shown under each simulated console: its figures are sample data, not customer results.
export function IllustrativeNote() {
  return (
    <p className="mt-3 text-xs font-mono text-foreground-muted">
      Illustrative data. Book a demo to see it with yours.
    </p>
  );
}
