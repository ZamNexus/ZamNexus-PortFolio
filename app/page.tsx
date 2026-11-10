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
import { clients, company, confirmed } from "@/lib/siteFacts";
import { featuredInsight } from "./insights/insightsData";

const principles = [
  { title: "Senior people on your project", text: "The architects who scope your project stay to deliver it." },
  { title: "Fixed milestones", text: "Discovery, build, go-live and support, each with a sign-off." },
  { title: "Support after launch", text: "We run and improve what we ship, for years rather than weeks." },
];

const textLink =
  "font-semibold text-accent-text underline decoration-accent-text/40 underline-offset-[5px] hover:decoration-accent-text transition-colors duration-300";

export default function HomePage() {
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
        <section aria-labelledby="home-hero-heading" className="max-w-6xl mx-auto px-4 sm:px-6 pt-32 sm:pt-36 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <h1
              id="home-hero-heading"
              className="lg:col-span-7 font-heading text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.4rem] font-bold tracking-[-0.035em] text-foreground-strong text-balance"
            >
              <SplitWords mode="load" text="Software that runs your operations, and the engineers who build the rest." />
            </h1>
            <div className="lg:col-span-5 lg:pt-3">
              <p data-enter="5" className="text-lg text-foreground-muted leading-relaxed">
                ZamNexus builds the systems organisations run on: four ready-to-deploy platforms, plus senior engineers for
                custom AI, cloud, SaaS, Microsoft and Salesforce work across the UK, Pakistan and the UAE. The people
                who scope your project build it, and support it after go-live.
              </p>
              <p data-enter="6" className="mt-8 border-l-2 border-accent pl-4 font-heading text-xl leading-snug tracking-[-0.01em] text-foreground-strong">
                Good systems go unnoticed. The people running them get their evenings back.
              </p>
              <p data-enter="7" className="hero-platforms">
                <Link href="/products/znxerp">ZNXERP</Link>
                <Link href="/products/znxepos">ZNXePOS</Link>
                <Link href="/products/znxedu">ZNXEdu</Link>
                <Link href="/products/znxcare">ZNXCare</Link>
              </p>
              {proof ? <p data-enter="8" className="mt-4 text-sm text-foreground-muted">{proof}</p> : null}
            </div>
          </div>
        </section>

        {/* ── SYSTEM MAP: the page's one interactive moment ────────────────── */}
        <section aria-labelledby="map-heading" className="max-w-6xl mx-auto px-4 sm:px-6 pb-12 sm:pb-16">
          <h2 id="map-heading" className="sr-only">
            How a ZamNexus platform handles one event
          </h2>
          <Reveal variant="draw">
            <SystemMap />
          </Reveal>
        </section>

        {/* ── PRODUCTS ─────────────────────────────────────────────────────── */}
        <section aria-labelledby="home-products" className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <SectionHeader
            id="home-products"
            title="Four platforms, ready to deploy."
            intro="Each covers one sector end to end and can be configured to the way you work."
          />
          <ProductStage />
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
        <section aria-labelledby="home-insight" className="max-w-6xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
          <h2 id="home-insight" className="text-foreground-muted text-lg">
            From our engineering notes
          </h2>
          <Reveal variant="fade">
          <Link href={`/insights/${featuredInsight.id}`} className="group mt-4 block max-w-4xl">
            <span className="block font-heading text-2xl sm:text-4xl font-bold tracking-tight leading-tight text-foreground-strong">
              <span className="insight-title">{featuredInsight.title}</span>
            </span>
            <span className="mt-4 block text-foreground-muted leading-relaxed max-w-3xl">{featuredInsight.subtitle}</span>
          </Link>
          </Reveal>
          <Link href="/insights" className={`mt-8 inline-block ${textLink}`}>
            All insights
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
