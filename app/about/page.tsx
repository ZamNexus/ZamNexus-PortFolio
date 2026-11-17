import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import AboutStory from "@/components/AboutStory";
import Reveal from "@/components/motion/Reveal";
import Stagger from "@/components/motion/Stagger";
import SplitWords from "@/components/motion/SplitWords";
import Parallax from "@/components/motion/Parallax";
import ScrollProgress from "@/components/motion/ScrollProgress";
import { engagementSteps, products, services } from "@/lib/catalog";
import { company } from "@/lib/siteFacts";

// One row of the "ZamNexus today" panel: a count, what it counts, and the things themselves. Items with an
// href link to their page; the rest are set as plain text.
interface FactItem {
  label: string;
  href?: string;
}

interface FactRow {
  noun: string;
  items: FactItem[];
  // Plain-text rows are written as a sentence instead of a list of items.
  sentence?: string;
}

interface Point {
  title: string;
  text: string;
}

const principles: Point[] = [
  { title: "Business first", text: "We start from the outcome you need, not the technology." },
  { title: "Senior and accountable", text: "The people who design your system are the people who deliver it." },
  { title: "Built to be run", text: "Security, monitoring and support are part of the build, not extras." },
  { title: "Long-term", text: "We support what we ship for years, not weeks." },
];

// How the engineering is approached, drawn from how the services and platforms actually work.
const approach: Point[] = [
  {
    title: "People stay in control",
    text: "AI reads, drafts and prepares. People approve anything that matters, and every action is logged so a decision can be explained afterwards.",
  },
  {
    title: "Replace without switching off",
    text: "Old systems are replaced piece by piece, with data checked at each step, instead of a risky big-bang switch-over.",
  },
  {
    title: "Keep working when things fail",
    text: "Our retail platform keeps tills selling when the internet drops, and brings every branch back in step when the connection returns.",
  },
];

const textLink =
  "font-semibold text-accent-text underline decoration-accent-text/40 underline-offset-[5px] hover:decoration-accent-text transition-colors duration-300";

const since = company.foundingYear.confirmed ? ` since ${company.foundingYear.value}` : "";

export default function AboutPage() {
  // Taken from the catalogue, so the names and counts always match the Products and Services pages.
  const today: FactRow[] = [
    { noun: "Platforms", items: products.map((p) => ({ label: p.code, href: `/products/${p.slug}` })) },
    { noun: "Engineering services", items: services.map((s) => ({ label: s.label, href: `/services#${s.id}` })) },
    {
      noun: "Countries served",
      items: [{ label: "United Kingdom" }, { label: "Pakistan" }, { label: "United Arab Emirates" }],
      sentence: "The UK, Pakistan and the UAE.",
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-clip">
      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">
        {/* ── HERO: fills the first screen, so the story only starts once you scroll ── */}
        <section
          aria-labelledby="about-hero"
          className="relative flex min-h-[calc(100svh-var(--announce-h,0px))] flex-col justify-center"
        >
          <Parallax className="services-hero__grid" range={40} />
          <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pt-32 pb-24">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,30rem)] gap-12 lg:gap-16 items-center">
              <div>
                <p data-enter="1" className="text-xs font-mono uppercase tracking-widest font-bold text-accent-text">About</p>
                <h1 id="about-hero" className="mt-6 font-heading text-4xl sm:text-6xl font-bold tracking-tight leading-[1.08] text-foreground-strong">
                  <SplitWords mode="load" text="About ZamNexus" />
                </h1>
                <p data-enter="4" className="mt-6 text-base sm:text-xl text-foreground-muted max-w-xl leading-relaxed">
                  We build and run the software that manufacturers,
                  retailers, schools and hospitals depend on every day.
                </p>
              </div>

              {/* The company at a glance: each count beside its word, with the things it counts. */}
              <div
                data-enter="5"
                className="rounded-3xl border border-[var(--border-subtle)] bg-surface px-6 py-2 sm:px-8 shadow-[0_24px_60px_-28px_rgb(0_0_0_/_0.45)]"
              >
                <h2 id="about-today" className="py-5 font-heading text-base font-semibold text-foreground-strong">
                  ZamNexus today
                </h2>
                <dl aria-labelledby="about-today">
                  {today.map((row) => (
                    <div key={row.noun} className="border-t border-[var(--border-subtle)] py-5">
                      <dt className="flex items-baseline gap-3">
                        <span className="w-9 shrink-0 font-heading text-[2.75rem] font-bold leading-none tracking-[-0.04em] tabular-nums text-accent-text">
                          {row.items.length}
                        </span>
                        <span className="font-heading text-lg font-semibold text-foreground-strong">{row.noun}</span>
                      </dt>
                      <dd className="mt-3 sm:pl-12">
                        {row.sentence ? (
                          <p className="text-[15px] leading-relaxed text-foreground-muted">{row.sentence}</p>
                        ) : (
                          <ul className="flex flex-wrap gap-2">
                            {row.items.map((item) => (
                              <li key={item.label}>
                                {item.href ? (
                                  <Link href={item.href} className="about-fact-chip">
                                    {item.label}
                                  </Link>
                                ) : (
                                  <span className="about-fact-chip">{item.label}</span>
                                )}
                              </li>
                            ))}
                          </ul>
                        )}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          <Link
            href="#story"
            aria-label="Scroll to our story"
            className="hero-cue absolute bottom-5 left-1/2 -translate-x-1/2"
          >
            <span>Scroll</span>
            <svg className="hero-cue__arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </section>

        {/* ── STORY ────────────────────────────────────────────────────────── */}
        <section id="story" aria-labelledby="story-heading" className="scroll-mt-12 max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-zinc-800/60">
          <SectionHeader id="story-heading" title="From enterprise projects to our own platforms." />
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] gap-12 items-center">
            <Stagger className="max-w-3xl space-y-5 text-foreground leading-relaxed">
              <p>
                {company.legalName} has delivered business systems{since}: Microsoft Dynamics 365, financial ledgers and
                CRM for organisations where the numbers have to be right.
              </p>
              <p>
                Our platforms grew out of that work. The same problems kept coming up in manufacturing, retail, education and
                healthcare, so we built a platform for each: ZNXERP, ZNXePOS, ZNXEdu and ZNXCare. Alongside them, our
                engineers deliver AI, cloud, SaaS and integration projects for clients in the UK, Pakistan and the UAE.
              </p>
            </Stagger>
            <Reveal variant="draw">
              <AboutStory />
            </Reveal>
          </div>
        </section>

        {/* ── PRINCIPLES ───────────────────────────────────────────────────── */}
        <section aria-labelledby="principles-heading" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-zinc-800/60">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-16">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <SectionHeader id="principles-heading" title="How we work with clients." />
            </div>
            <Stagger as="ul" className="border-t border-[var(--border-subtle)]">
              {principles.map((p) => (
                <li key={p.title} className="group border-b border-[var(--border-subtle)] py-7 sm:py-9">
                  <h3 className="font-heading text-2xl sm:text-3xl font-semibold tracking-[-0.02em] text-foreground-strong transition-colors duration-300 group-hover:text-accent-text">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-foreground-muted leading-relaxed">{p.text}</p>
                </li>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ── APPROACH TO TECHNOLOGY ───────────────────────────────────────── */}
        <section aria-labelledby="approach-heading" className="bg-background-secondary">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
            <SectionHeader
              id="approach-heading"
              title="How we approach technology."
              intro="Easy to trust, easy to change and hard to break."
            />
            <Stagger as="ul" className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-10">
              {approach.map((a) => (
                <li key={a.title} className="border-t border-[var(--border-subtle)] pt-6">
                  <h3 className="font-heading text-xl font-bold tracking-[-0.01em] text-foreground-strong">{a.title}</h3>
                  <p className="mt-3 text-foreground-muted leading-relaxed">{a.text}</p>
                </li>
              ))}
            </Stagger>
          </div>
        </section>

        {/* ── HOW AN ENGAGEMENT RUNS: the names only; the full timeline lives on Services ── */}
        <section aria-labelledby="engagement-heading" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24">
          <SectionHeader
            id="engagement-heading"
            title="How an engagement runs."
            intro="Every project follows the same six steps, and each one ends with a sign-off."
          />
          <Stagger as="ol" className="flex flex-wrap gap-3">
            {engagementSteps.map((s, i) => (
              <li key={s.name} className="rounded-full border border-[var(--border-subtle)] px-5 py-2.5 text-foreground">
                <span className="mr-2 text-foreground-muted" aria-hidden="true">
                  {i + 1}
                </span>
                {s.name}
              </li>
            ))}
          </Stagger>
          <Link href="/services#process" className={`mt-8 inline-block ${textLink}`}>
            See the full process
          </Link>
        </section>

        {/* ── CLOSING STATEMENT: a dark band that ends the story before the footer ── */}
        <section aria-label="What we believe" className="on-dark ink-teal teal-band relative overflow-hidden">
          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
            <Reveal variant="words" replay={false}>
              <p className="max-w-4xl font-heading text-[2rem] sm:text-5xl lg:text-6xl font-bold tracking-[-0.035em] leading-[1.08] text-foreground-strong text-balance">
                <SplitWords text="We judge our work by how it runs in year five, not on launch day." />
              </p>
            </Reveal>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
