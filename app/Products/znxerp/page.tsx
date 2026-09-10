import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoRequestForm from "@/components/DemoRequestForm";

export const metadata: Metadata = {
  title: "ZNXERP — Enterprise Resource Planning | ZamNexus",
  description:
    "ZNXERP unifies finance, HR, procurement, inventory, production, sales and quality control on one intelligent platform. Trusted by Grays Pharmaceutical, Khyber Textile Mills and more.",
  openGraph: {
    title: "ZNXERP — Enterprise Resource Planning | ZamNexus",
    description: "Run every part of your business on one intelligent platform.",
    type: "website",
    siteName: "ZamNexus",
  },
};

const ACCENT = "var(--accent-hover)";

const modules = [
  { icon: "💰", label: "Finance & Accounting", desc: "Real-time P&L, ledgers and financial reporting across every entity." },
  { icon: "👥", label: "Human Resources", desc: "Payroll, attendance, leave management and employee records in one place." },
  { icon: "📦", label: "Procurement", desc: "Purchase orders, supplier management and automated approval workflows." },
  { icon: "🏭", label: "Inventory & Warehouse", desc: "Live stock levels, batch tracking, warehouse movement and costing." },
  { icon: "⚙️", label: "Production & Manufacturing", desc: "Batch costing, formulation management and production floor visibility." },
  { icon: "📈", label: "Sales & CRM", desc: "Quotes, orders, invoicing and customer relationship tracking." },
  { icon: "✅", label: "Quality Control", desc: "QC checks integrated into the production and delivery workflow." },
  { icon: "📊", label: "MIS Dashboard", desc: "Leadership-level window into sales, costs, losses and pending decisions." },
];

const clients = [
  "Grays Pharmaceutical",
  "Lotus Pharmaceuticals",
  "Panacea Pharmaceuticals",
  "Khyber Textile Mills",
  "National Tariff Commission",
];

export default function ZNXERPPage() {
  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[var(--accent-hover)] selection:text-black">
      <div className="fixed inset-0 bg-ziel-grid opacity-60 pointer-events-none z-0" aria-hidden="true" />
      <Navbar />

      <main className="relative z-10">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="erp-hero-heading"
          className="max-w-6xl mx-auto px-6 pt-44 pb-16"
        >
          <div className="flex flex-col lg:flex-row items-start gap-12">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <Link
                  href="/Products"
                  className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  ← Products
                </Link>
                <span className="text-zinc-700">/</span>
                <span className="text-xs font-mono text-[var(--accent-hover)] font-bold">ZNXERP</span>
              </div>

              <div
                className="text-7xl sm:text-9xl font-extrabold font-mono tracking-tight mb-4"
                style={{ color: ACCENT }}
                aria-hidden="true"
              >
                ERP
              </div>

              <h1
                id="erp-hero-heading"
                className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6"
              >
                Run every part of your business on{" "}
                <span style={{ color: ACCENT }}>one intelligent platform.</span>
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
                ZNXERP is a full-scale Enterprise Resource Planning platform built for medium
                and large organizations that need to move fast without losing control — from
                the production floor to the boardroom.
              </p>
            </div>

            {/* Stat block */}
            <div className="lg:flex-shrink-0 flex flex-col gap-4 lg:pt-16">
              <div className="p-8 rounded-3xl border text-center" style={{ background: `${ACCENT}08`, borderColor: `${ACCENT}20` }}>
                <div className="text-5xl font-extrabold font-mono" style={{ color: ACCENT }}>5+</div>
                <div className="text-xs font-mono text-zinc-500 mt-1 uppercase tracking-wider">Enterprise Clients</div>
              </div>
              <div className="p-6 rounded-3xl border border-zinc-800 bg-zinc-900/40 text-center">
                <div className="text-3xl font-extrabold font-mono text-white">8</div>
                <div className="text-xs font-mono text-zinc-500 mt-1 uppercase tracking-wider">Integrated Modules</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── MODULE GRID ──────────────────────────────────────────────────── */}
        <section
          aria-labelledby="erp-modules-heading"
          className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800/60"
        >
          <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: ACCENT }}>
            What It Covers
          </span>
          <h2 id="erp-modules-heading" className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-10">
            Every department. One platform.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((mod) => (
              <div
                key={mod.label}
                className="group p-6 rounded-3xl border border-zinc-800 bg-zinc-900/40 hover:border-[var(--accent-hover)]/40 hover:bg-zinc-900/70 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-3xl mb-3" aria-hidden="true">{mod.icon}</div>
                <h3 className="text-sm font-bold text-white mb-2 group-hover:text-[var(--accent-hover)] transition-colors">
                  {mod.label}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{mod.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── KEY ADVANTAGES ───────────────────────────────────────────────── */}
        <section
          aria-labelledby="erp-advantages-heading"
          className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800/60"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: ACCENT }}>
                Built Different
              </span>
              <h2 id="erp-advantages-heading" className="text-3xl sm:text-4xl font-extrabold text-white mt-3 leading-tight">
                Fast to deploy. Fast to pay for itself.
              </h2>
              <p className="mt-4 text-zinc-400 leading-relaxed">
                Every department and every customer, supplier and partner works from the same
                accurate, real-time data. Built-in SMS alerts keep teams informed as things
                happen — not hours later.
              </p>
            </div>
            <ul className="space-y-3">
              {[
                "Connected finance, HR, ops and sales — no silos",
                "Real-time MIS dashboard for leadership",
                "Built-in SMS alerts as events happen",
                "Batch costing and formulation for manufacturers",
                "Deploys quickly — starts paying back fast",
              ].map((point) => (
                <li key={point} className="check-item">{point}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── TRUSTED BY ───────────────────────────────────────────────────── */}
        <section
          aria-labelledby="erp-clients-heading"
          className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800/60"
        >
          <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: ACCENT }}>
            Trusted By
          </span>
          <h2 id="erp-clients-heading" className="sr-only">Client Organizations</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {clients.map((client, idx) => (
              <div
                key={client}
                className="flex items-center gap-4 p-5 rounded-2xl border border-zinc-800 bg-zinc-900/30 hover:border-[var(--accent-hover)]/30 transition-all duration-300"
              >
                <span
                  className="text-xs font-mono font-bold flex-shrink-0"
                  style={{ color: ACCENT }}
                  aria-hidden="true"
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span className="text-sm font-semibold text-zinc-200">{client}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── DEMO FORM ────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="erp-demo-heading"
          className="max-w-3xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: ACCENT }}>
              Get Started
            </span>
            <h2 id="erp-demo-heading" className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
              Request a ZNXERP Demo
            </h2>
            <p className="mt-3 text-zinc-400">
              Tell us about your organization and we&apos;ll walk you through exactly how
              ZNXERP can connect your operations.
            </p>
          </div>
          <div className="p-8 sm:p-12 rounded-3xl border border-zinc-800 bg-zinc-900/60">
            <DemoRequestForm productName="ZNXERP" accentColor={ACCENT} />
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
