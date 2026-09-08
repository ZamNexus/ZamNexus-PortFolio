import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoRequestForm from "@/components/DemoRequestForm";

export const metadata: Metadata = {
  title: "ZNXEdu — Education Management System | ZamNexus",
  description:
    "ZNXEdu covers admissions to graduation in one platform — student registration, fees, attendance, exams, timetables, parent portal, library and more.",
  openGraph: {
    title: "ZNXEdu — Education System Manager | ZamNexus",
    description: "One system for every campus, classroom and conversation.",
    type: "website",
    siteName: "ZamNexus",
  },
};

const ACCENT = "#c4b5fd";

const modules = [
  { area: "Academic", items: ["Student Registration & Admissions", "Fee Management", "Attendance Tracking", "Examination Management", "Timetable Scheduling"] },
  { area: "Administration", items: ["Library Management", "Hostel Management", "Transport Management", "HR & Staff Administration", "Built-in Accounting & Inventory"] },
  { area: "Communication", items: ["Web & Mobile Parent Portal", "Real-time Progress Updates", "Homework & Fee Status", "Integrated SMS & Chat", "School-wide Notifications"] },
];

export default function ZNXEduPage() {
  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[#c4b5fd] selection:text-black">
      <div className="fixed inset-0 bg-ziel-grid opacity-60 pointer-events-none z-0" aria-hidden="true" />
      <Navbar />

      <main className="relative z-10">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="edu-hero-heading"
          className="max-w-6xl mx-auto px-6 pt-44 pb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <Link href="/Products" className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors">
              ← Products
            </Link>
            <span className="text-zinc-700">/</span>
            <span className="text-xs font-mono font-bold" style={{ color: ACCENT }}>ZNXEdu</span>
          </div>

          {/* Big typographic treatment */}
          <div className="relative mb-8">
            <div
              className="text-7xl sm:text-9xl font-extrabold font-mono tracking-tight"
              style={{ color: ACCENT }}
              aria-hidden="true"
            >
              EDU
            </div>
            <div
              className="absolute -inset-4 blur-3xl opacity-20 rounded-3xl pointer-events-none"
              style={{ background: ACCENT }}
              aria-hidden="true"
            />
          </div>

          <h1
            id="edu-hero-heading"
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6 max-w-4xl"
          >
            One system for every campus,{" "}
            <span style={{ color: ACCENT }}>classroom and conversation.</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
            ZNXEdu is a complete education management system for schools, colleges,
            institutes and universities — covering everything from admissions to
            graduation in one connected platform.
          </p>
        </section>

        {/* ── THREE PILLARS ────────────────────────────────────────────────── */}
        <section
          aria-labelledby="edu-modules-heading"
          className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800/60"
        >
          <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: ACCENT }}>
            Complete Coverage
          </span>
          <h2 id="edu-modules-heading" className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-10">
            Academic. Administrative. Connected.
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {modules.map((group) => (
              <div
                key={group.area}
                className="p-8 rounded-3xl border border-zinc-800 bg-zinc-900/40 hover:border-[#c4b5fd]/30 transition-all duration-300"
              >
                <div
                  className="text-xs font-mono uppercase tracking-widest font-bold mb-5"
                  style={{ color: ACCENT }}
                >
                  {group.area}
                </div>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span
                        className="flex-shrink-0 w-5 h-5 rounded mt-0.5 flex items-center justify-center text-[10px] font-bold"
                        style={{ background: `${ACCENT}15`, color: ACCENT }}
                        aria-hidden="true"
                      >
                        ✓
                      </span>
                      <span className="text-sm text-zinc-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── CONNECTED COMMUNITY ──────────────────────────────────────────── */}
        <section
          aria-labelledby="edu-community-heading"
          className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800/60"
        >
          <div className="rounded-3xl p-10 sm:p-14 border relative overflow-hidden"
            style={{ background: `${ACCENT}05`, borderColor: `${ACCENT}15` }}
          >
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-10 pointer-events-none"
              style={{ background: ACCENT }}
              aria-hidden="true"
            />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: ACCENT }}>
                  Parents · Students · Teachers
                </span>
                <h2 id="edu-community-heading" className="text-3xl sm:text-4xl font-extrabold text-white mt-3 leading-tight">
                  The whole school community, connected in real time.
                </h2>
                <p className="mt-4 text-zinc-400 leading-relaxed">
                  A web and mobile portal keeps parents, students and teachers on the same
                  page — with progress, attendance, homework and fee status available at a
                  glance, alongside an integrated SMS and chat system for instant communication.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {["Progress Reports", "Live Attendance", "Fee Status", "Homework Updates", "SMS Alerts", "Chat System"].map((feat) => (
                  <div
                    key={feat}
                    className="p-4 rounded-2xl border text-xs font-semibold text-center"
                    style={{ background: `${ACCENT}08`, borderColor: `${ACCENT}20`, color: ACCENT }}
                  >
                    {feat}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── DEMO FORM ────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="edu-demo-heading"
          className="max-w-3xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: ACCENT }}>
              For Your Institution
            </span>
            <h2 id="edu-demo-heading" className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
              Request a ZNXEdu Demo
            </h2>
            <p className="mt-3 text-zinc-400">
              Whether you run a single campus or a multi-site institution, ZNXEdu
              scales to match. Let us show you how.
            </p>
          </div>
          <div className="p-8 sm:p-12 rounded-3xl border border-zinc-800 bg-zinc-900/60">
            <DemoRequestForm productName="ZNXEdu" accentColor={ACCENT} />
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
