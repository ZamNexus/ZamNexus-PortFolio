import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroBackground from "@/components/HeroBackground";
import SectionHeader from "@/components/SectionHeader";
import { products, services } from "@/lib/catalog";
import { clients, company, confirmed } from "@/lib/siteFacts";
import { featuredInsight } from "./insights/insightsData";

// Shown under the hero when no client logos are approved yet. Only facts already stated elsewhere on the site.
const facts = [
  ...(company.foundingYear.confirmed ? [`Established ${company.foundingYear.value}`] : []),
  "Offices in Luton, UK and Islamabad, Pakistan",
  "4 production platforms",
  "6 engineering services",
];

const sectors = [
  { name: "Manufacturing & pharma", product: "ZNXERP", href: "/products/znxerp" },
  { name: "Retail & distribution", product: "ZNXePOS", href: "/products/znxepos" },
  { name: "Education", product: "ZNXEdu", href: "/products/znxedu" },
  { name: "Healthcare", product: "ZNXCare", href: "/products/znxcare" },
];

const principles = [
  { title: "Senior people on your project", text: "The architects who scope your project stay to deliver it." },
  { title: "Fixed milestones", text: "Discovery, build, go-live and support, each with a sign-off." },
  { title: "Support after launch", text: "We run and improve what we ship." },
];

const card =
  "rounded-3xl bg-surface/80 border border-[var(--border-subtle)] transition-all duration-300 hover:border-[var(--border-strong)] hover:-translate-y-1";

export default function HomePage() {
  const approvedClients = confirmed(clients);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <HeroBackground />
      <Navbar />

      <main className="relative z-10">
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section aria-labelledby="home-hero-heading" className="max-w-6xl mx-auto px-4 sm:px-6 pt-40 pb-16 text-center">
          <p className="text-xs font-mono uppercase tracking-widest font-bold text-accent-text">
            ZamNexus · A Zamooq Limited company
          </p>
          <h1
            id="home-hero-heading"
            className="mt-6 font-heading text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight leading-[1.08] text-foreground-strong max-w-5xl mx-auto"
          >
            Software that runs your operations, and the engineers who build the rest.
          </h1>
          <p className="mt-6 text-base sm:text-xl text-foreground-muted max-w-3xl mx-auto leading-relaxed">
            ZamNexus makes four business platforms for manufacturing, retail, education and healthcare, and delivers
            custom AI, cloud, Microsoft and Salesforce projects for organisations in the UK, Pakistan and the UAE.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact" className="liquid-lime-btn text-base py-4 px-8">
              <span>Book a consultation</span>
              <span className="arrow-icon w-8 h-8 text-sm" aria-hidden="true">→</span>
            </Link>
            <Link
              href="/products"
              className="px-7 py-4 rounded-full border border-[var(--border-subtle)] text-foreground font-semibold text-sm hover:border-[var(--border-strong)] hover:text-foreground-strong transition-all duration-300"
            >
              See the products
            </Link>
          </div>

          {/* Proof strip: approved client names, otherwise plain facts */}
          <ul className="mt-16 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-foreground-muted">
            {(approvedClients.length ? approvedClients.map((c) => c.name) : facts).map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* ── PRODUCTS ─────────────────────────────────────────────────────── */}
        <section aria-labelledby="home-products" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24 border-t border-zinc-800/60">
          <SectionHeader
            id="home-products"
            tag="Products"
            title="Four platforms, ready to deploy."
            intro="Each one covers a sector end to end, and can be configured to your processes."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {products.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className={`${card} group p-8 flex flex-col`}>
                <div className="flex items-center justify-between gap-4">
                  <Image src={p.logo} alt={p.code} width={130} height={40} className="h-7 w-auto object-contain" />
                  <span className="text-xs font-mono uppercase tracking-wider text-foreground-muted">{p.sector}</span>
                </div>
                <h3 className="mt-6 text-xl sm:text-2xl font-bold text-foreground-strong">{p.category}</h3>
                <p className="mt-3 text-foreground-muted leading-relaxed">{p.purpose}</p>
                <span className="mt-6 text-sm font-semibold text-accent-text group-hover:underline">See {p.code} →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── SERVICES ─────────────────────────────────────────────────────── */}
        <section aria-labelledby="home-services" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24 border-t border-zinc-800/60">
          <SectionHeader
            id="home-services"
            tag="Services"
            title="When you need something built."
            intro="Six engineering services, delivered by one senior team."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s) => (
              <Link key={s.id} href={`/services#${s.id}`} className={`${card} group p-6`}>
                <h3 className="text-lg font-bold text-foreground-strong">{s.name}</h3>
                <p className="mt-2 text-sm text-foreground-muted leading-relaxed">{s.short}</p>
                <span className="mt-4 inline-block text-sm font-semibold text-accent-text group-hover:underline">Learn more →</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── WHO WE WORK WITH ─────────────────────────────────────────────── */}
        <section aria-labelledby="home-sectors" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24 border-t border-zinc-800/60">
          <SectionHeader id="home-sectors" tag="Who we work with" title="Built for regulated, high-volume operations." />
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {sectors.map((s) => (
              <li key={s.name}>
                <Link href={s.href} className={`${card} block p-6 h-full`}>
                  <span className="block text-lg font-bold text-foreground-strong">{s.name}</span>
                  <span className="mt-1 block text-sm text-accent-text">{s.product} →</span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-foreground-muted">
            Financial services, professional services, property or public sector? Our engineering services cover you.{" "}
            <Link href="/contact" className="font-semibold text-accent-text hover:underline">
              Talk to us →
            </Link>
          </p>
        </section>

        {/* ── HOW WE WORK ──────────────────────────────────────────────────── */}
        <section aria-labelledby="home-how" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24 border-t border-zinc-800/60">
          <SectionHeader id="home-how" tag="How we work" title="One accountable team from first call to go-live." />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((p) => (
              <div key={p.title} className="rounded-3xl bg-surface/80 border border-[var(--border-subtle)] p-6">
                <h3 className="text-lg font-bold text-foreground-strong">{p.title}</h3>
                <p className="mt-2 text-sm text-foreground-muted leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
          <Link href="/services#process" className="mt-8 inline-block font-semibold text-accent-text hover:underline">
            See our full delivery process →
          </Link>
        </section>

        {/* Testimonial section goes here once a quote is approved (Phase 3, Home §7). */}

        {/* ── LATEST INSIGHT ───────────────────────────────────────────────── */}
        <section aria-labelledby="home-insight" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-24 border-t border-zinc-800/60">
          <SectionHeader id="home-insight" tag="Latest insight" title="From the systems we build." />
          <Link href={`/insights/${featuredInsight.id}`} className={`${card} group block p-8`}>
            <span className="text-xs font-mono uppercase tracking-wider text-foreground-muted">
              {featuredInsight.categoryLabel} · {featuredInsight.readTime}
            </span>
            <h3 className="mt-3 text-xl sm:text-2xl font-bold text-foreground-strong">{featuredInsight.title}</h3>
            <p className="mt-3 text-foreground-muted leading-relaxed">{featuredInsight.subtitle}</p>
            <span className="mt-6 inline-block text-sm font-semibold text-accent-text group-hover:underline">Read the article →</span>
          </Link>
          <Link href="/insights" className="mt-6 inline-block font-semibold text-accent-text hover:underline">
            All insights →
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}
