import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import ServiceIndex from "@/components/ServiceIndex";
import ProcessTimeline from "@/components/ProcessTimeline";
import Reveal from "@/components/motion/Reveal";
import Stagger from "@/components/motion/Stagger";
import SplitWords from "@/components/motion/SplitWords";
import Spotlight from "@/components/motion/Spotlight";
import Parallax from "@/components/motion/Parallax";
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

const textLink =
  "font-semibold text-accent-text underline decoration-accent-text/40 underline-offset-[5px] hover:decoration-accent-text transition-colors duration-300";

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-clip">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />
      <Navbar />

      <main className="relative z-10">
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section aria-labelledby="services-hero" className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-36 sm:pt-44 pb-16">
          <Parallax className="services-hero__grid" range={40} />
          <h1
            id="services-hero"
            className="font-heading text-[2.6rem] leading-[1.04] sm:text-6xl lg:text-[4.4rem] font-bold tracking-[-0.035em] text-foreground-strong max-w-4xl text-balance"
          >
            <SplitWords mode="load" text="Engineering services for systems that can't fail." />
          </h1>
          <p data-enter="4" className="mt-6 text-lg sm:text-xl text-foreground-muted max-w-3xl leading-relaxed">
            Six services, one senior team. We scope, build, integrate and support, so you deal with the same people from
            first call to go-live.
          </p>
          {/* Phones and tablets: jump links. Desktop gets the sticky index beside the services. */}
          <nav aria-label="Jump to a service" data-enter="5" className="mt-10 flex flex-wrap gap-2 lg:hidden">
            {services.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="px-4 py-2 rounded-full border border-[var(--border-subtle)] text-sm text-foreground hover:border-[var(--border-strong)] hover:text-foreground-strong active:scale-[0.97] transition-all duration-300"
              >
                {s.name}
              </a>
            ))}
          </nav>
          <div data-enter="6" className="mt-10">
            <Link href="/contact" className="liquid-lime-btn text-base py-3.5 px-7">
              Book a consultation
            </Link>
          </div>
        </section>

        {/* ── THE SIX SERVICES, with a sticky index on desktop ─────────────── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-12">
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-32 pt-20">
              <ServiceIndex items={services.map((s) => ({ id: s.id, name: s.label }))} />
            </div>
          </aside>

          <div className="lg:col-span-9">
            {services.map((s) => (
              <section
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-heading`}
                className="relative py-20 border-t border-[var(--border-subtle)] scroll-mt-28"
              >
                {/* Former anchor ids, so links to the old eight-service page still land here */}
                {s.aliases.map((alias) => (
                  <span key={alias} id={alias} className="absolute -top-28" aria-hidden="true" />
                ))}
                <Reveal variant="words" replay={false} className="max-w-2xl">
                  <h2 id={`${s.id}-heading`} className="font-heading text-3xl sm:text-[2.75rem] font-bold tracking-tight leading-[1.08] text-foreground-strong">
                    <SplitWords text={s.name} />
                  </h2>
                  <p className="reveal-sub mt-5 text-lg text-foreground-muted leading-relaxed">{s.outcome}</p>
                </Reveal>

                <Spotlight as="div" className="deliverables mt-10">
                  <h3 className="text-base font-semibold text-foreground-strong">What you get</h3>
                  <Stagger as="ul" className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex gap-3 text-foreground leading-snug">
                        <svg className="tick" viewBox="0 0 20 20" aria-hidden="true">
                          <path d="M4 10.5l4 4 8-9" />
                        </svg>
                        {d}
                      </li>
                    ))}
                  </Stagger>
                </Spotlight>

                {s.related ? (
                  <p className="mt-8 text-foreground-muted">
                    Related reading:{" "}
                    <Link href={s.related.href} className={textLink}>
                      {s.related.label}
                    </Link>
                  </p>
                ) : null}
              </section>
            ))}
          </div>
        </div>

        {/* ── PROCESS (the only copy on the site) ──────────────────────────── */}
        <section
          id="process"
          aria-labelledby="process-heading"
          className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 border-t border-[var(--border-subtle)] scroll-mt-28"
        >
          <div className="lg:grid lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <SectionHeader
                  id="process-heading"
                  title="How an engagement runs."
                  intro="Six steps, each with a sign-off, so you always know where your project stands."
                />
              </div>
            </div>
            <div className="lg:col-span-7">
              <ProcessTimeline steps={steps} />
            </div>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────────────────────────── */}
        <section aria-labelledby="faq-heading" className="max-w-3xl mx-auto px-4 sm:px-6 py-20 sm:py-24 border-t border-[var(--border-subtle)]">
          <SectionHeader id="faq-heading" title="Common questions." />
          <Stagger className="faq">
            {faqs.map((f) => (
              <details key={f.q} className="faq__item group">
                <summary className="faq__question">
                  {f.q}
                  <span className="faq__icon" aria-hidden="true" />
                </summary>
                <p className="faq__answer">{f.a}</p>
              </details>
            ))}
          </Stagger>
        </section>
      </main>

      <Footer />
    </div>
  );
}
