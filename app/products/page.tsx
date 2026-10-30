import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import { products } from "@/lib/catalog";
import { jsonLd, breadcrumbs } from "@/lib/seo";

const rollout = [
  { name: "Map", text: "We map your processes and the data you have today." },
  { name: "Configure", text: "Modules, roles and approval rules set up to match how you work." },
  { name: "Migrate", text: "Your existing data moved across, then both systems run in parallel." },
  { name: "Go live", text: "Cut-over with on-site training and support." },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs([{ name: "Home", path: "/" }, { name: "Products", path: "/products" }])) }} />
      <Navbar />

      <main className="relative z-10">
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section aria-labelledby="products-hero" className="max-w-6xl mx-auto px-4 sm:px-6 pt-40 pb-16">
          <p className="text-xs font-mono uppercase tracking-widest font-bold text-accent-text">Products</p>
          <h1
            id="products-hero"
            className="mt-6 font-heading text-4xl sm:text-6xl font-bold tracking-tight leading-[1.08] text-foreground-strong max-w-4xl"
          >
            Four platforms, built for the way your sector works.
          </h1>
          <p className="mt-6 text-base sm:text-xl text-foreground-muted max-w-3xl leading-relaxed">
            Each ZamNexus platform covers one industry end to end, so you&apos;re not stitching together generic tools.
            All four can be configured to your processes and integrated with what you already use.
          </p>
          <Link href="/contact" className="liquid-lime-btn mt-10 text-base py-4 px-8">
            <span>Request a demo</span>
            <span className="arrow-icon w-8 h-8 text-sm" aria-hidden="true">→</span>
          </Link>
        </section>

        {/* ── PRODUCT CARDS ────────────────────────────────────────────────── */}
        <section aria-label="Products" className="max-w-6xl mx-auto px-4 sm:px-6 pb-20 sm:pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((p) => (
              <article
                key={p.slug}
                className="relative overflow-hidden rounded-3xl bg-surface/80 border border-[var(--border-subtle)] p-8 flex flex-col transition-all duration-300 hover:border-[var(--border-strong)]"
              >
                <div className="absolute inset-x-0 top-0 h-0.5" style={{ background: p.accent }} aria-hidden="true" />
                <div className="flex items-center justify-between gap-4">
                  <Image src={p.logo} alt={p.code} width={130} height={40} className="h-7 w-auto object-contain" />
                  <span className="text-xs font-mono uppercase tracking-wider text-foreground-muted">{p.sector}</span>
                </div>
                <h2 className="mt-6 text-xl sm:text-2xl font-bold text-foreground-strong">
                  {p.code}: {p.category}
                </h2>
                <p className="mt-3 text-foreground-muted leading-relaxed">{p.purpose}</p>
                <ul className="mt-5 space-y-2 flex-1">
                  {p.outcomes.map((o) => (
                    <li key={o} className="flex gap-3 text-sm text-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: p.accent }} aria-hidden="true" />
                      {o}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href={`/products/${p.slug}`} className="text-sm font-semibold text-accent-text hover:underline">
                    See {p.code} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── COMPARISON ───────────────────────────────────────────────────── */}
        <section aria-labelledby="compare-heading" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24 border-t border-zinc-800/60">
          <SectionHeader id="compare-heading" tag="Compare" title="Which platform is right for you?" />
          <div className="overflow-x-auto rounded-3xl border border-[var(--border-subtle)]">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead className="bg-surface-2 text-foreground-strong">
                <tr>
                  <th scope="col" className="p-4 font-semibold">Platform</th>
                  <th scope="col" className="p-4 font-semibold">Built for</th>
                  <th scope="col" className="p-4 font-semibold">Core modules</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800/80">
                {products.map((p) => (
                  <tr key={p.slug}>
                    <th scope="row" className="p-4 font-semibold text-foreground-strong">
                      <Link href={`/products/${p.slug}`} className="hover:text-accent-text">{p.code}</Link>
                    </th>
                    <td className="p-4 text-foreground-muted">{p.sector}</td>
                    <td className="p-4 text-foreground-muted">{p.modules}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ── IMPLEMENTATION ───────────────────────────────────────────────── */}
        <section aria-labelledby="rollout-heading" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24 border-t border-zinc-800/60">
          <SectionHeader id="rollout-heading" tag="Implementation" title="From kick-off to go-live." />
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {rollout.map((step, i) => (
              <li key={step.name} className="rounded-3xl bg-surface/80 border border-[var(--border-subtle)] p-6">
                <span className="text-xs font-mono font-bold text-accent-text">Step {i + 1}</span>
                <h3 className="mt-2 text-lg font-bold text-foreground-strong">{step.name}</h3>
                <p className="mt-2 text-sm text-foreground-muted leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>
      </main>

      <Footer />
    </div>
  );
}
