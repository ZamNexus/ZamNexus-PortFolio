import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import AboutStory from "@/components/AboutStory";
import Reveal from "@/components/motion/Reveal";
import Stagger from "@/components/motion/Stagger";
import SplitWords from "@/components/motion/SplitWords";
import Spotlight from "@/components/motion/Spotlight";
import Parallax from "@/components/motion/Parallax";
import ScrollProgress from "@/components/motion/ScrollProgress";
import { company } from "@/lib/siteFacts";

const principles = [
  { title: "Business first", text: "We start from the outcome you need, not the technology." },
  { title: "Senior and accountable", text: "The people who design your system are the people who deliver it." },
  { title: "Built to be run", text: "Security, monitoring and support are part of the build, not extras." },
  { title: "Long-term", text: "We support what we ship for years, not weeks." },
];

const offices = [
  { city: "Luton, United Kingdom", address: "34 Beaconsfield, Luton LU2 0RW", role: "Registered office, UK and European clients", open: true },
  { city: "Islamabad, Pakistan", address: "Suite 1, 2nd Floor, I-9 Markaz, Islamabad", role: "Engineering and delivery", open: true },
  { city: "United Arab Emirates", address: "Opening soon", role: "Middle East clients", open: false },
];

const since = company.foundingYear.confirmed ? ` since ${company.foundingYear.value}` : "";

export default function AboutPage() {
  const details = [
    { label: "Legal name", value: company.legalName },
    { label: "Registered in", value: "England & Wales" },
    ...(company.companyNumber.confirmed ? [{ label: company.companyNumber.label, value: company.companyNumber.value }] : []),
    ...(company.icoNumber.confirmed ? [{ label: company.icoNumber.label, value: company.icoNumber.value }] : []),
    { label: "Registered office", value: "34 Beaconsfield, Luton LU2 0RW, United Kingdom" },
    { label: "Email", value: "contact@zamnexus.com" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-clip">
      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section aria-labelledby="about-hero" className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-40 pb-16">
          <Parallax className="services-hero__grid" range={40} />
          <p data-enter="1" className="text-xs font-mono uppercase tracking-widest font-bold text-accent-text">About</p>
          <h1 id="about-hero" className="mt-6 font-heading text-4xl sm:text-6xl font-bold tracking-tight leading-[1.08] text-foreground-strong">
            <SplitWords mode="load" text="About ZamNexus" />
          </h1>
          <p data-enter="4" className="mt-6 text-base sm:text-xl text-foreground-muted max-w-3xl leading-relaxed">
            We build and run the software that manufacturers,
            retailers, schools and hospitals depend on every day.
          </p>
        </section>

        {/* ── STORY ────────────────────────────────────────────────────────── */}
        <section aria-labelledby="story-heading" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-zinc-800/60">
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

        {/* ── PRINCIPLES (the only "why us" block on the site) ────────────── */}
        <section aria-labelledby="principles-heading" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-zinc-800/60">
          <SectionHeader id="principles-heading" title="How we work with clients." />
          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((p, i) => (
              <Spotlight key={p.title} as="div" className="lift-card principle-card p-6">
                <span className="principle-card__num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 text-lg font-bold text-foreground-strong">{p.title}</h3>
                <p className="mt-2 text-sm text-foreground-muted leading-relaxed">{p.text}</p>
              </Spotlight>
            ))}
          </Stagger>
        </section>

        {/* ── LEADERSHIP ───────────────────────────────────────────────────── */}
        <section aria-labelledby="leadership-heading" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-zinc-800/60">
          <SectionHeader id="leadership-heading" title="Who leads ZamNexus." />
          <Reveal variant="draw" className="max-w-2xl">
            <Spotlight as="div" className="lift-card leader p-8 flex items-start gap-5">
              <div className="leader__avatar" aria-hidden="true">
                <svg viewBox="0 0 64 64">
                  <circle cx={32} cy={32} r={30} pathLength={1} className="leader__ring" />
                </svg>
                MH
              </div>
              <div className="leader__text">
                <h3 className="text-xl font-bold text-foreground-strong">Mir Mujeeb Ul Hassan</h3>
                <p className="mt-1 text-sm text-accent-text">Founder &amp; Chief Executive Officer, {company.legalName}</p>
                <p className="mt-4 text-foreground-muted leading-relaxed">
                  Leads technical architecture and delivery across the UK, Pakistan and the UAE.
                </p>
              </div>
            </Spotlight>
          </Reveal>
          {/* Further team members and partner credentials go here once confirmed (Phase 3, About §4–5). */}
        </section>

        {/* ── OFFICES ──────────────────────────────────────────────────────── */}
        <section aria-labelledby="offices-heading" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-zinc-800/60">
          <SectionHeader id="offices-heading" title="Where to find us." />
          <Stagger as="ul" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.map((o) => (
              <li key={o.city} className="lift-card p-6">
                <span className={`office-status ${o.open ? "" : "office-status--soon"}`}>
                  <span className="office-status__dot" aria-hidden="true" />
                  {o.open ? "Open" : "Opening soon"}
                </span>
                <h3 className="mt-4 text-lg font-bold text-foreground-strong">{o.city}</h3>
                {o.open ? <p className="mt-2 text-sm text-foreground">{o.address}</p> : null}
                <p className="mt-1 text-sm text-foreground-muted">{o.role}</p>
              </li>
            ))}
          </Stagger>
        </section>

        {/* ── COMPANY DETAILS ──────────────────────────────────────────────── */}
        <section aria-labelledby="company-heading" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-zinc-800/60">
          <SectionHeader id="company-heading" title={company.legalName} />
          <Stagger as="dl" className="details max-w-2xl">
            {details.map((d) => (
              <div key={d.label} className="details__row py-4 grid grid-cols-1 sm:grid-cols-3 gap-1">
                <dt className="text-sm text-foreground-muted">{d.label}</dt>
                <dd className="sm:col-span-2 text-foreground">{d.value}</dd>
              </div>
            ))}
          </Stagger>
          <p className="mt-8">
            <Link href="/contact" className="product-card__link font-semibold text-accent-text hover:underline">
              Get in touch <span aria-hidden="true">→</span>
            </Link>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
