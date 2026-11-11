import { clients, confirmed, productStats, type ProductSlug } from "@/lib/siteFacts";
import type { FaqItem } from "@/lib/productFaqs";
import Reveal from "@/components/motion/Reveal";
import Stagger from "@/components/motion/Stagger";
import SplitWords from "@/components/motion/SplitWords";
import Spotlight from "@/components/motion/Spotlight";
import RollingValue from "@/components/RollingValue";

// Shared sections for the four product pages. Figures and client names come from lib/siteFacts.ts
// and render only once confirmed, so the pages can't publish an unverified claim.

interface ProductStatsProps {
  slug: ProductSlug;
  accent: string;
  // Roll the figures up from zero when they scroll into view.
  animate?: boolean;
}

export function ProductStats({ slug, accent, animate = false }: ProductStatsProps) {
  return (
    <dl className="grid grid-cols-2 gap-3">
      {confirmed(productStats[slug]).map((item, index) => (
        <div key={item.label} className="p-5 rounded-2xl bg-surface/80 border border-[var(--border-subtle)]">
          <dt className="sr-only">{item.label}</dt>
          <dd className="text-2xl sm:text-3xl font-bold font-mono" style={{ color: accent }}>
            {animate && /\d/.test(item.value) ? <RollingValue value={item.value} delay={index * 180} /> : item.value}
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
      <Stagger as="ul" className="flex flex-wrap justify-center gap-4">
        {names.map((c) => (
          <li key={c.name} className="px-4 py-2 rounded-xl bg-surface/80 border border-[var(--border-subtle)] text-sm text-foreground">
            {c.name}
          </li>
        ))}
      </Stagger>
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
      <Reveal variant="words" replay={false}>
        <p className="reveal-sub text-xs font-mono uppercase tracking-widest font-bold text-accent-text">Who it&apos;s for</p>
        <h2 id={id} className="mt-3 font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground-strong">
          <SplitWords text={title} />
        </h2>
      </Reveal>
      <Stagger className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <Spotlight key={item.title} as="div" className="lift-card p-6">
            <h3 className="text-lg font-bold text-foreground-strong">{item.title}</h3>
            <p className="mt-2 text-sm text-foreground-muted leading-relaxed">{item.text}</p>
          </Spotlight>
        ))}
      </Stagger>
    </section>
  );
}

export function ProductFaq({ id, items }: { id: string; items: FaqItem[] }) {
  return (
    <section aria-labelledby={id} className="max-w-3xl mx-auto px-4 sm:px-6 py-20 border-t border-zinc-800/60">
      <Reveal variant="words" replay={false}>
        <p className="reveal-sub text-xs font-mono uppercase tracking-widest font-bold text-accent-text">FAQ</p>
        <h2 id={id} className="mt-3 font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground-strong">
          <SplitWords text="Common questions." />
        </h2>
      </Reveal>
      <Stagger className="faq mt-8">
        {items.map((f) => (
          <details key={f.q} className="faq__item">
            <summary className="faq__question">
              {f.q}
              <span className="faq__icon" aria-hidden="true" />
            </summary>
            <p className="faq__answer">{f.a}</p>
          </details>
        ))}
      </Stagger>
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
