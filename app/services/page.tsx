import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import { services } from "@/lib/catalog";
import { jsonLd } from "@/lib/seo";

const steps = [
  { name: "Discover", text: "We map your processes, systems and goals, and agree what success looks like." },
  { name: "Design", text: "Architecture, scope and a fixed milestone plan you sign off." },
  { name: "Build", text: "Working software at regular intervals, demonstrated to you." },
  { name: "Integrate & test", text: "Connected to your systems and tested with your data." },
  { name: "Go live", text: "A planned cut-over with a rollback plan." },
  { name: "Support & improve", text: "Monitoring, fixes and a roadmap after launch." },
];

// Answers marked as pending client confirmation in Phase 3 are left out until confirmed.
const faqs = [
  {
    q: "Do you work with companies outside the UK?",
    a: "Yes. We have teams in the UK and Pakistan and work with clients in the UK, Pakistan and the UAE.",
  },
  {
    q: "Can you take over a system another supplier built?",
    a: "Yes. We start with a technical review, then agree a plan to stabilise and improve it.",
  },
  {
    q: "How do projects start?",
    a: "With a short consultation to understand what you need, followed by a discovery phase that ends in a scoped plan and fixed milestones.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
      <Navbar />

      <main className="relative z-10">
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section aria-labelledby="services-hero" className="max-w-6xl mx-auto px-4 sm:px-6 pt-40 pb-16">
          <p className="text-xs font-mono uppercase tracking-widest font-bold text-accent-text">Services</p>
          <h1
            id="services-hero"
            className="mt-6 font-heading text-4xl sm:text-6xl font-bold tracking-tight leading-[1.08] text-foreground-strong max-w-4xl"
          >
            Engineering services for systems that can&apos;t fail.
          </h1>
          <p className="mt-6 text-base sm:text-xl text-foreground-muted max-w-3xl leading-relaxed">
            Six services, one senior team. We scope, build, integrate and support, so you deal with the same people from
            first call to go-live.
          </p>
          <nav aria-label="Services on this page" className="mt-10 flex flex-wrap gap-2">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-4 py-2 rounded-full border border-[var(--border-subtle)] text-sm text-foreground hover:border-[var(--border-strong)] hover:text-foreground-strong transition-colors duration-300"
              >
                {s.name}
              </a>
            ))}
          </nav>
          <Link href="/contact" className="liquid-lime-btn mt-10 text-base py-4 px-8">
            <span>Book a consultation</span>
            <span className="arrow-icon w-8 h-8 text-sm" aria-hidden="true">→</span>
          </Link>
        </section>

        {/* ── THE SIX SERVICES ─────────────────────────────────────────────── */}
        {services.map((s) => (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-heading`}
            className="relative max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-zinc-800/60 scroll-mt-28"
          >
            {/* Former anchor ids, so links to the old eight-service page still land here */}
            {s.aliases.map((alias) => (
              <span key={alias} id={alias} className="absolute -top-28" aria-hidden="true" />
            ))}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5">
                <h2 id={`${s.id}-heading`} className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground-strong">
                  {s.name}
                </h2>
                <p className="mt-4 text-foreground-muted leading-relaxed">{s.outcome}</p>
                {s.related ? (
                  <p className="mt-6 text-sm">
                    <span className="text-foreground-muted">Related: </span>
                    <Link href={s.related.href} className="font-semibold text-accent-text hover:underline">
                      {s.related.label}
                    </Link>
                  </p>
                ) : null}
              </div>
              <div className="lg:col-span-7 rounded-3xl bg-surface/80 border border-[var(--border-subtle)] p-6 sm:p-8">
                <h3 className="text-sm font-mono uppercase tracking-wider font-bold text-foreground-strong">What you get</h3>
                <ul className="mt-4 space-y-3">
                  {s.deliverables.map((d) => (
                    <li key={d} className="flex gap-3 text-foreground">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}

        {/* ── PROCESS (the only copy on the site) ──────────────────────────── */}
        <section id="process" aria-labelledby="process-heading" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24 border-t border-zinc-800/60 scroll-mt-28">
          <SectionHeader id="process-heading" title="How an engagement runs." />
          <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step, i) => (
              <li key={step.name} className="rounded-3xl bg-surface/80 border border-[var(--border-subtle)] p-6">
                <span className="text-xs font-mono font-bold text-accent-text">Step {i + 1}</span>
                <h3 className="mt-2 text-lg font-bold text-foreground-strong">{step.name}</h3>
                <p className="mt-2 text-sm text-foreground-muted leading-relaxed">{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section aria-labelledby="faq-heading" className="max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-24 border-t border-zinc-800/60">
          <SectionHeader id="faq-heading" title="Common questions." />
          <div className="divide-y divide-zinc-800/80 border-y border-zinc-800/80">
            {faqs.map((f) => (
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
      </main>

      <Footer />
    </div>
  );
}
