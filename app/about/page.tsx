import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SectionHeader from "@/components/SectionHeader";
import { company } from "@/lib/siteFacts";

const principles = [
  { title: "Business first", text: "We start from the outcome you need, not the technology." },
  { title: "Senior and accountable", text: "The people who design your system are the people who deliver it." },
  { title: "Built to be run", text: "Security, monitoring and support are part of the build, not extras." },
  { title: "Long-term", text: "We support what we ship for years, not weeks." },
];

const offices = [
  { city: "Luton, United Kingdom", address: "34 Beaconsfield, Luton LU2 0RW", role: "Registered office, UK and European clients" },
  { city: "Islamabad, Pakistan", address: "Suite 1, 2nd Floor, I-9 Markaz, Islamabad", role: "Engineering and delivery" },
  { city: "United Arab Emirates", address: "Opening soon", role: "Middle East clients" },
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
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <Navbar />

      <main className="relative z-10">
        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section aria-labelledby="about-hero" className="max-w-6xl mx-auto px-4 sm:px-6 pt-40 pb-16">
          <p className="text-xs font-mono uppercase tracking-widest font-bold text-accent-text">About</p>
          <h1 id="about-hero" className="mt-6 font-heading text-4xl sm:text-6xl font-bold tracking-tight leading-[1.08] text-foreground-strong">
            About ZamNexus
          </h1>
          <p className="mt-6 text-base sm:text-xl text-foreground-muted max-w-3xl leading-relaxed">
            We&apos;re the technology brand of {company.legalName}. We build and run the software that manufacturers,
            retailers, schools and hospitals depend on every day.
          </p>
        </section>

        {/* ── STORY ────────────────────────────────────────────────────────── */}
        <section aria-labelledby="story-heading" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-zinc-800/60">
          <SectionHeader id="story-heading" title="From enterprise projects to our own platforms." />
          <div className="max-w-3xl space-y-5 text-foreground leading-relaxed">
            <p>
              {company.legalName} has delivered business systems{since}: Microsoft Dynamics 365, financial ledgers and
              CRM for organisations where the numbers have to be right.
            </p>
            <p>
              ZamNexus grew out of that work. The same problems kept coming up in manufacturing, retail, education and
              healthcare, so we built a platform for each: ZNXERP, ZNXePOS, ZNXEdu and ZNXCare. Alongside them, our
              engineers deliver AI, cloud, SaaS and integration projects for clients in the UK, Pakistan and the UAE.
            </p>
          </div>
        </section>

        {/* ── PRINCIPLES (the only "why us" block on the site) ────────────── */}
        <section aria-labelledby="principles-heading" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-zinc-800/60">
          <SectionHeader id="principles-heading" title="How we work with clients." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((p) => (
              <div key={p.title} className="rounded-3xl bg-surface/80 border border-[var(--border-subtle)] p-6">
                <h3 className="text-lg font-bold text-foreground-strong">{p.title}</h3>
                <p className="mt-2 text-sm text-foreground-muted leading-relaxed">{p.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── LEADERSHIP ───────────────────────────────────────────────────── */}
        <section aria-labelledby="leadership-heading" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-zinc-800/60">
          <SectionHeader id="leadership-heading" title="Who leads ZamNexus." />
          <div className="max-w-2xl rounded-3xl bg-surface/80 border border-[var(--border-subtle)] p-8 flex items-start gap-5">
            <div className="w-14 h-14 shrink-0 rounded-full bg-accent flex items-center justify-center font-bold text-white" aria-hidden="true">
              MH
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground-strong">Mir Mujeeb Ul Hassan</h3>
              <p className="mt-1 text-sm text-accent-text">Founder &amp; Chief Executive Officer, {company.legalName}</p>
              <p className="mt-4 text-foreground-muted leading-relaxed">
                Leads technical architecture and delivery across the UK, Pakistan and the UAE.
              </p>
            </div>
          </div>
          {/* Further team members and partner credentials go here once confirmed (Phase 3, About §4–5). */}
        </section>

        {/* ── OFFICES ──────────────────────────────────────────────────────── */}
        <section aria-labelledby="offices-heading" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-zinc-800/60">
          <SectionHeader id="offices-heading" title="Where to find us." />
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.map((o) => (
              <li key={o.city} className="rounded-3xl bg-surface/80 border border-[var(--border-subtle)] p-6">
                <h3 className="text-lg font-bold text-foreground-strong">{o.city}</h3>
                <p className="mt-2 text-sm text-foreground">{o.address}</p>
                <p className="mt-1 text-sm text-foreground-muted">{o.role}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* ── COMPANY DETAILS ──────────────────────────────────────────────── */}
        <section aria-labelledby="company-heading" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-zinc-800/60">
          <SectionHeader id="company-heading" title={company.legalName} />
          <dl className="max-w-2xl divide-y divide-zinc-800/80 border-y border-zinc-800/80">
            {details.map((d) => (
              <div key={d.label} className="py-4 grid grid-cols-1 sm:grid-cols-3 gap-1">
                <dt className="text-sm text-foreground-muted">{d.label}</dt>
                <dd className="sm:col-span-2 text-foreground">{d.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8">
            <Link href="/contact" className="font-semibold text-accent-text hover:underline">
              Get in touch →
            </Link>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
