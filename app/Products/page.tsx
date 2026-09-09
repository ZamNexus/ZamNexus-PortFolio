import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnimatedStat from "@/components/AnimatedStat";

export const metadata: Metadata = {
  title: "Products — ZamNexus | ZNXERP · ZNXePOS · ZNXEdu · ZNXCare",
  description:
    "ZamNexus Product Suite: purpose-built enterprise software for manufacturing, retail, education and healthcare. ZNXERP, ZNXePOS, ZNXEdu and ZNXCare.",
  openGraph: {
    title: "Products — ZamNexus",
    description:
      "Four purpose-built systems. One unified intelligence. ZNXERP, ZNXePOS, ZNXEdu, ZNXCare.",
    type: "website",
    siteName: "ZamNexus",
  },
};

const products = [
  {
    id: "znxerp",
    code: "ZNXERP",
    name: "Enterprise Resource Planning",
    tagline: "Run every part of your business on one intelligent platform.",
    logo: "/product-logos/znxerp.png",
    stat: "5",
    statLabel: "Enterprise clients",
    modules: ["Finance", "HR", "Procurement", "Inventory", "Production", "Sales", "QC", "MIS"],
    accent: "#D0FF71",
    index: "01",
    href: "/Products/znxerp",
  },
  {
    id: "znxepos",
    code: "ZNXePOS",
    name: "Point of Sale",
    tagline: "Complete visibility of your business, in a single click.",
    logo: "/product-logos/znxepos.png",
    stat: "750+",
    statLabel: "Businesses running live",
    modules: ["Sales", "Stock", "Purchasing", "Accounts", "Banking", "Reports"],
    accent: "#f59e0b",
    index: "02",
    href: "/Products/znxepos",
  },
  {
    id: "znxedu",
    code: "ZNXEdu",
    name: "Education System Manager",
    tagline: "One system for every campus, classroom and conversation.",
    logo: "/product-logos/znxedu.png",
    stat: "∞",
    statLabel: "Campuses. One system.",
    modules: ["Admissions", "Fees", "Attendance", "Exams", "Timetables", "Library", "Hostel"],
    accent: "#a78bfa",
    index: "03",
    href: "/Products/znxedu",
  },
  {
    id: "znxcare",
    code: "ZNXCare",
    name: "Patient Management Solution",
    tagline: "The right information, for the right decision, at the right time.",
    logo: "/product-logos/znxcare.png",
    stat: "5",
    statLabel: "Projects sold to clients",
    modules: ["Registration", "Admissions", "Billing", "Laboratory", "Pharmacy", "X-Ray", "Dashboard"],
    accent: "#34d399",
    index: "04",
    href: "/Products/znxcare",
  },
];

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[#D0FF71] selection:text-black">
      <div className="fixed inset-0 bg-ziel-grid opacity-60 pointer-events-none z-0" aria-hidden="true" />
      <Navbar />

      <main className="relative z-10">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="products-hero-heading"
          className="max-w-6xl mx-auto px-6 pt-44 pb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono font-medium text-[#D0FF71] mb-8 backdrop-blur-xl">
            ZamNexus Product Suite
          </div>
          <h1
            id="products-hero-heading"
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]"
          >
            Systems built for how{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D0FF71] to-emerald-300">
              each part of your business runs.
            </span>
          </h1>
          <p className="mt-6 text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed line-clamp-2">
            Four purpose-built platforms. One unified intelligence — whichever
            team you&apos;re equipping.
          </p>

          {/* Product pill navigation */}
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {products.map((p) => (
              <Link
                key={p.id}
                href={p.href}
                className="group px-5 py-2.5 rounded-full border border-zinc-800 bg-zinc-900/60 text-sm font-bold text-zinc-300 hover:text-white hover:border-[#D0FF71]/50 transition-all duration-200 font-mono"
                style={{ "--pill-accent": p.accent } as CSSProperties}
              >
                <span
                  className="inline-block w-2 h-2 rounded-full mr-2 transition-colors duration-200"
                  style={{ background: p.accent }}
                  aria-hidden="true"
                />
                {p.code}
              </Link>
            ))}
          </div>
        </section>

        {/* ── PRODUCT CARDS — glassmorphism grid, equal height ─────────────── */}
        <section
          aria-labelledby="product-list-heading"
          className="max-w-6xl mx-auto px-6 pb-20"
        >
          <h2 id="product-list-heading" className="sr-only">Our Four Products</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            {products.map((product) => (
              <Link
                key={product.id}
                href={product.href}
                aria-label={`${product.code} — ${product.name}`}
                className="group glass-capability-card h-full"
                style={{ "--card-accent": product.accent } as CSSProperties}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="glass-capability-icon glass-capability-icon--logo">
                    <Image
                      src={product.logo}
                      alt={`${product.code} logo`}
                      width={220}
                      height={72}
                      className="h-10 w-auto object-contain"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-600">{product.index} /04</span>
                </div>

                <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3">
                  {product.name}
                </div>

                <h3 className="glass-capability-title text-xl">
                  {product.tagline}
                </h3>

                <div className="flex flex-wrap gap-2 mt-4 mb-6">
                  {product.modules.map((mod, modIdx) => (
                    <span
                      key={`${product.id}-${mod}-${modIdx}`}
                      className="px-3 py-1 rounded-lg text-xs font-mono font-medium border transition-all duration-200"
                      style={{
                        background: `${product.accent}10`,
                        borderColor: `${product.accent}25`,
                        color: `${product.accent}cc`,
                      }}
                    >
                      {mod}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-end justify-between pt-4 border-t border-zinc-800/60">
                  <div>
                    <AnimatedStat value={product.stat} accent={product.accent} className="!text-2xl" />
                    <div className="text-xs font-mono text-zinc-500 mt-1">
                      {product.statLabel}
                    </div>
                  </div>
                  <div
                    className="w-10 h-10 rounded-full border flex items-center justify-center text-lg transition-all duration-300 group-hover:scale-110"
                    style={{ borderColor: `${product.accent}40`, color: product.accent }}
                    aria-hidden="true"
                  >
                    →
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── SOCIAL PROOF STRIP ───────────────────────────────────────────── */}
        <section
          aria-labelledby="clients-heading"
          className="border-t border-zinc-800/60 border-b border-zinc-800/60 py-14"
        >
          <div className="max-w-6xl mx-auto px-6 text-center space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
              Trusted By
            </span>
            <h2 id="clients-heading" className="sr-only">Client Organizations</h2>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
              {[
                "Grays Pharmaceutical",
                "Lotus Pharmaceuticals",
                "Panacea Pharmaceuticals",
                "Khyber Textile Mills",
                "National Tariff Commission",
                "750+ retail businesses",
              ].map((client) => (
                <span key={client} className="text-sm font-semibold text-zinc-400 hover:text-zinc-200 transition-colors">
                  {client}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── UNIFIED INTELLIGENCE ─────────────────────────────────────────── */}
        <section
          aria-labelledby="unified-heading"
          className="max-w-6xl mx-auto px-6 py-20"
        >
          <div className="rounded-3xl bg-gradient-to-br from-zinc-900/90 to-zinc-950 border border-zinc-800 p-10 sm:p-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#D0FF71]/5 blur-3xl pointer-events-none" aria-hidden="true" />
            <div className="relative z-10 max-w-3xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
                One Suite. All Your Operations.
              </span>
              <h2
                id="unified-heading"
                className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-4 leading-tight"
              >
                The same intelligence behind every product.
              </h2>
              <p className="mt-5 text-zinc-400 text-base sm:text-lg leading-relaxed line-clamp-2">
                ZNXERP, ZNXePOS, ZNXEdu and ZNXCare share the same reliability and
                support model. Different jobs, one trusted platform family.
              </p>
              <div className="mt-8 flex flex-wrap items-start gap-6">
                <div className="flex flex-col items-center gap-2">
                  <Link href="/Contact" className="liquid-lime-btn text-base py-4 px-8">
                    <span>Talk to Our Team</span>
                    <span className="arrow-icon w-8 h-8 text-sm" aria-hidden="true">→</span>
                  </Link>
                  <span className="text-xs text-zinc-500 font-mono">No commitment · 30-min call</span>
                </div>
                <Link
                  href="/Solutions"
                  className="px-7 py-4 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-600 font-semibold text-sm transition-all duration-300 mt-0"
                >
                  Explore Solutions →
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
