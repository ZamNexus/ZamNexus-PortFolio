import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import SystemMap from "@/components/SystemMap";
import Reveal from "@/components/motion/Reveal";
import Stagger from "@/components/motion/Stagger";
import SplitWords from "@/components/motion/SplitWords";
import ScrollProgress from "@/components/motion/ScrollProgress";
import ClientMarquee from "@/components/ClientMarquee";
import ProductStage from "@/components/ProductStage";
import ServiceRows from "@/components/ServiceRows";
import TechEcosystem from "@/components/TechEcosystem";
import PlatformStrip from "@/components/PlatformStrip";
import { services } from "@/lib/catalog";
import { clients, company, confirmed } from "@/lib/siteFacts";
import { getLatestInsight } from "@/lib/cms/public";

// The first screen: who ZamNexus is, what it delivers, and where it focuses. No product names or cards.
const heroPillars = [
  {
    label: "Who we are",
    text: "A UK software company serving organisations across the UK, Pakistan and the UAE. The architects who scope your project stay to build it and support it after go-live.",
  },
  {
    label: "What we deliver",
    text: "Ready-to-deploy business platforms and custom-built software, delivered to fixed milestones with a sign-off at each, and supported for years after launch.",
  },
  {
    label: "What we focus on",
    text: "Operations software for manufacturing, retail, education and healthcare, and senior engineering in",
  },
];

const principles = [
  { title: "Senior people on your project", text: "The architects who scope your project stay to deliver it." },
  { title: "Fixed milestones", text: "Discovery, build, go-live and support, each with a sign-off." },
  { title: "Support after launch", text: "We run and improve what we ship, for years rather than weeks." },
];

const textLink =
  "font-semibold text-accent-text underline decoration-accent-text/40 underline-offset-[5px] hover:decoration-accent-text transition-colors duration-300";

// Refreshed when the admin panel publishes or unpublishes an article, and at least every five minutes.
export const revalidate = 300;

export default async function HomePage() {
  const latestInsight = await getLatestInsight();
  const approvedClients = confirmed(clients).map((c) => c.name);
  // Shown only once approved in lib/siteFacts.ts: client names first, then the founding year. Offices live on Contact.
  const proof = approvedClients.length
    ? null
    : company.foundingYear.confirmed
      ? `Established ${company.foundingYear.value}.`
      : null;

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-clip">
      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        {/* The whole first screen is the company introduction: no product content until the visitor scrolls.
            Height is the viewport minus the announcement bar (--announce-h, set by Navbar); the 80px fixed nav
            is cleared by the top padding. On short or narrow screens it grows rather than squeezing the copy. */}
        <section
          aria-labelledby="home-hero-heading"
          data-dark-hero
          className="on-dark ink-teal dark-band relative flex min-h-[calc(100svh-var(--announce-h,0px))] flex-col justify-center overflow-hidden"
        >
          <div aria-hidden="true" className="hero-orb" />
          <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 pt-28 sm:pt-28 lg:pt-24 pb-16 sm:pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
              <h1
                id="home-hero-heading"
                className="lg:col-span-9 font-heading text-[2.5rem] leading-[1.02] sm:text-[clamp(2.75rem,6.4vh+1rem,4rem)] lg:text-[clamp(2.9rem,8.6vh,4.6rem)] font-bold tracking-[-0.04em] text-foreground-strong text-balance"
              >
                <SplitWords mode="load" text="Software that runs your operations, and the engineers who build the rest." />
              </h1>
              <div className="lg:col-span-3">
                <p data-enter="5" className="font-heading text-lg sm:text-xl leading-snug tracking-[-0.01em] text-foreground-muted text-pretty">
                  Good systems go unnoticed. The people running them get their evenings back.
                </p>
                <div data-enter="6" className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
                  <Link href="/contact" className="liquid-lime-btn text-base py-3.5 px-7">
                    Book a consultation
                  </Link>
                  <Link href="#products" className={textLink}>
                    See what we build
                  </Link>
                </div>
                {proof ? <p data-enter="7" className="mt-4 text-sm text-foreground-muted">{proof}</p> : null}
              </div>
            </div>

            {/* One trace runs through the three statements and draws itself once on load (see .hero-rail). */}
            <ul className="hero-rail mt-10 sm:mt-12">
              {heroPillars.map((pillar) => (
                <li key={pillar.label} className="hero-rail__item">
                  <h2 className="font-heading text-lg font-semibold tracking-[-0.01em] text-foreground-strong">{pillar.label}</h2>
                  <p className="mt-2 max-w-[34ch] text-[15px] lg:text-base text-foreground-muted leading-relaxed">
                    {pillar.text}
                    {pillar.label === "What we focus on" ? (
                      <>
                        {" "}
                        {services.map((s, i) => (
                          <span key={s.id}>
                            <Link href={`/services#${s.id}`} className="text-foreground underline decoration-[var(--border-strong,var(--border-subtle))] underline-offset-4 hover:text-accent-text hover:decoration-accent-text transition-colors duration-300">
                              {s.label}
                            </Link>
                            {i < services.length - 2 ? ", " : i === services.length - 2 ? " and " : "."}
                          </span>
                        ))}
                      </>
                    ) : null}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="#products"
            aria-label="Scroll to our products"
            className="hero-cue absolute bottom-5 left-1/2 -translate-x-1/2"
          >
            <span>Scroll</span>
            <svg className="hero-cue__arrow" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </section>

        {/* ── PRODUCTS ─────────────────────────────────────────────────────── */}
        <section id="products" aria-labelledby="home-products" className="scroll-mt-12 max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <SectionHeader
            id="home-products"
            title="Four platforms, ready to deploy."
            intro="Each covers one sector end to end and can be configured to the way you work."
          />
          <ProductStage />
        </section>

        {/* ── SYSTEM MAP: one platform event, traced end to end ────────────── */}
        <section aria-labelledby="map-heading" className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
          <h2 id="map-heading" className="sr-only">
            How a ZamNexus platform handles one event
          </h2>
          <Reveal variant="draw">
            <SystemMap />
          </Reveal>
        </section>

        <ClientMarquee />

        {/* ── SERVICES ─────────────────────────────────────────────────────── */}
        <section aria-labelledby="home-services" className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <SectionHeader
            id="home-services"
            title="When you need something built."
            intro="Six engineering services from one senior team."
          />
          <ServiceRows />
          <p className="mt-10 max-w-2xl text-foreground-muted leading-relaxed">
            Financial services, professional services, property or public sector? These services cover you too.{" "}
            <Link href="/contact" className={textLink}>
              Tell us what you need
            </Link>
          </p>
        </section>

        {/* ── TECHNOLOGY ECOSYSTEM ─────────────────────────────────────────── */}
        <section aria-labelledby="home-tech" className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <SectionHeader
            id="home-tech"
            title="The technology behind the work."
            intro="The platforms and tools our engineers use across all six services."
          />
          <PlatformStrip />
          <TechEcosystem />
        </section>

        {/* ── HOW WE WORK ──────────────────────────────────────────────────── */}
        <section aria-labelledby="home-how" className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <SectionHeader id="home-how" title="One accountable team, from first call to go-live." />
          <Stagger className="principles grid grid-cols-1 md:grid-cols-3 gap-10">
            {principles.map((p) => (
              <div key={p.title} className="principle">
                <h3 className="text-lg font-semibold text-foreground-strong">{p.title}</h3>
                <p className="mt-2 text-foreground-muted leading-relaxed">{p.text}</p>
              </div>
            ))}
          </Stagger>
          <Link href="/services#process" className={`mt-10 inline-block ${textLink}`}>
            See how an engagement runs
          </Link>
        </section>

        {/* Testimonial section goes here once a quote is approved (Phase 3, Home §7). */}

        {/* ── LATEST INSIGHT ───────────────────────────────────────────────── */}
        {latestInsight ? (
        <section aria-labelledby="home-insight" className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <h2 id="home-insight" className="text-foreground-muted text-lg">
            From our engineering notes
          </h2>
          <Reveal variant="fade">
          <Link href={`/insights/${latestInsight.id}`} className="group mt-4 block max-w-4xl">
            <span className="block font-heading text-2xl sm:text-4xl font-bold tracking-tight leading-tight text-foreground-strong">
              <span className="insight-title">{latestInsight.title}</span>
            </span>
            <span className="mt-4 block text-foreground-muted leading-relaxed max-w-3xl">{latestInsight.subtitle}</span>
          </Link>
          </Reveal>
          <Link href="/insights" className={`mt-8 inline-block ${textLink}`}>
            All insights
          </Link>
        </section>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}
