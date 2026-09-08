import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoRequestForm from "@/components/DemoRequestForm";

export const metadata: Metadata = {
  title: "ZNXePOS — Point of Sale System | ZamNexus",
  description:
    "ZNXePOS is a complete POS and business management system for retail and wholesale. 750+ businesses trust it for sales, stock, accounts and live reporting.",
  openGraph: {
    title: "ZNXePOS — Point of Sale | ZamNexus",
    description: "Complete visibility of your retail or wholesale business, in a single click.",
    type: "website",
    siteName: "ZamNexus",
  },
};

const ACCENT = "#7dd3fc";

const features = [
  { label: "Sales & Invoicing", desc: "Instant invoicing with barcode scanning, flexible discounting and multi-terminal support." },
  { label: "Stock Management", desc: "Real-time stock levels, purchase tracking and profit/loss per item." },
  { label: "Supplier & Client Ledgers", desc: "Automatic credit limits, outstanding invoices and balance tracking for every party." },
  { label: "Accounts & Banking", desc: "Expenses, bank reconciliation and full accounting built directly into POS." },
  { label: "Mobile Dashboard", desc: "Check sales, stock and cash position from your phone — anywhere, anytime." },
  { label: "Unlimited Reports", desc: "Turn daily transactions into business trends with a flexible report writer." },
];

export default function ZNXePOSPage() {
  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[#7dd3fc] selection:text-black">
      <div className="fixed inset-0 bg-ziel-grid opacity-60 pointer-events-none z-0" aria-hidden="true" />
      <Navbar />

      <main className="relative z-10">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="pos-hero-heading"
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
                <span className="text-xs font-mono font-bold" style={{ color: ACCENT }}>ZNXePOS</span>
              </div>

              <div
                className="text-7xl sm:text-9xl font-extrabold font-mono tracking-tight mb-4"
                style={{ color: ACCENT }}
                aria-hidden="true"
              >
                POS
              </div>

              <h1
                id="pos-hero-heading"
                className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6"
              >
                Complete visibility of your business,{" "}
                <span style={{ color: ACCENT }}>in a single click.</span>
              </h1>
              <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
                ZNXePOS brings sales, purchasing, stock, accounts, expenses and banking together
                in one place — so you always know exactly where your business stands,
                down to the profit or loss on a single item.
              </p>
            </div>

            {/* Stat block */}
            <div className="lg:flex-shrink-0 flex flex-col gap-4 lg:pt-16">
              <div className="p-8 rounded-3xl border text-center" style={{ background: `${ACCENT}08`, borderColor: `${ACCENT}20` }}>
                <div className="text-5xl font-extrabold font-mono" style={{ color: ACCENT }}>750+</div>
                <div className="text-xs font-mono text-zinc-500 mt-1 uppercase tracking-wider">Businesses Running Live</div>
              </div>
              <div className="p-6 rounded-3xl border border-zinc-800 bg-zinc-900/40 text-center">
                <div className="text-3xl font-extrabold font-mono text-white">1</div>
                <div className="text-xs font-mono text-zinc-500 mt-1 uppercase tracking-wider">Click to Full Visibility</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FEATURES ─────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="pos-features-heading"
          className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800/60"
        >
          <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: ACCENT }}>
            Everything In One Place
          </span>
          <h2 id="pos-features-heading" className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-10">
            Six systems. One screen.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat, idx) => (
              <div
                key={feat.label}
                className="group p-8 rounded-3xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/70 transition-all duration-300 hover:-translate-y-1"
                style={{ "--feat-accent": ACCENT } as React.CSSProperties}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className="step-number text-sm flex-shrink-0"
                    style={{ background: `${ACCENT}15`, borderColor: `${ACCENT}30`, color: ACCENT }}
                    aria-hidden="true"
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-[#7dd3fc] transition-colors">
                    {feat.label}
                  </h3>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── DESIGNED FOR SCALE ───────────────────────────────────────────── */}
        <section
          aria-labelledby="pos-scale-heading"
          className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800/60"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: ACCENT }}>
                Any Size. Any Location.
              </span>
              <h2 id="pos-scale-heading" className="text-3xl sm:text-4xl font-extrabold text-white mt-3 leading-tight">
                From a single counter to a nationwide chain.
              </h2>
              <p className="mt-4 text-zinc-400 leading-relaxed">
                Multi-terminal support, flexible discounting and an optional mobile dashboard
                mean your operations can grow without outgrowing ZNXePOS.
              </p>
            </div>
            <ul className="space-y-3">
              {[
                "Barcode scanning and multi-terminal support",
                "Profit/loss tracked per item, invoice or customer",
                "Automatic ledger tracking for all suppliers and clients",
                "Optional mobile and web dashboard for remote owners",
                "Unlimited custom report templates",
                "Retail and wholesale operations — any size",
              ].map((point) => (
                <li key={point} className="check-item">{point}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── DEMO FORM ────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="pos-demo-heading"
          className="max-w-3xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: ACCENT }}>
              See It Live
            </span>
            <h2 id="pos-demo-heading" className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
              Request a ZNXePOS Demo
            </h2>
            <p className="mt-3 text-zinc-400">
              Join 750+ businesses already running on ZNXePOS. Let us show you
              what full visibility looks like for your operation.
            </p>
          </div>
          <div className="p-8 sm:p-12 rounded-3xl border border-zinc-800 bg-zinc-900/60">
            <DemoRequestForm productName="ZNXePOS" accentColor={ACCENT} />
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
