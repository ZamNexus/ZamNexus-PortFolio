import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoRequestForm from "@/components/DemoRequestForm";

export const metadata: Metadata = {
  title: "ZNXCare — Patient Management Solution | ZamNexus",
  description:
    "ZNXCare gives clinics and hospitals a complete real-time view of every patient — registration, billing, lab, pharmacy, doctor records and management dashboards.",
  openGraph: {
    title: "ZNXCare — Patient Management | ZamNexus",
    description: "The right information, for the right decision, at the right time.",
    type: "website",
    siteName: "ZamNexus",
  },
};

const ACCENT = "#6ee7b7";

const departments = [
  { code: "REG", label: "Registration", desc: "Patient registration with complete identity and medical history capture." },
  { code: "ADM", label: "Admissions", desc: "Inpatient admissions, ward allocation and discharge management." },
  { code: "BIL", label: "Billing", desc: "Automatic billing tied to consultations, procedures and medications." },
  { code: "LAB", label: "Laboratory", desc: "Lab test requests, results and doctor linkage — no paper trail needed." },
  { code: "PHR", label: "Pharmacy", desc: "Prescription management and pharmacy dispensing integrated at the point of care." },
  { code: "XRY", label: "X-Ray & Imaging", desc: "Radiology records connected to the patient file and doctor notes." },
  { code: "PNL", label: "Panel & Corporate", desc: "Automatic handling of panel and corporate treatment records and billing." },
  { code: "MIS", label: "Management Dashboard", desc: "Drill-down insights with Excel export — instant answers, not monthly surprises." },
];

export default function ZNXCarePage() {
  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[#6ee7b7] selection:text-black">
      <div className="fixed inset-0 bg-ziel-grid opacity-60 pointer-events-none z-0" aria-hidden="true" />
      <Navbar />

      <main className="relative z-10">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="care-hero-heading"
          className="max-w-6xl mx-auto px-6 pt-44 pb-16"
        >
          <div className="flex items-center gap-3 mb-6">
            <Link href="/Products" className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors">
              ← Products
            </Link>
            <span className="text-zinc-700">/</span>
            <span className="text-xs font-mono font-bold" style={{ color: ACCENT }}>ZNXCare</span>
          </div>

          <div className="relative mb-8">
            <div
              className="text-7xl sm:text-9xl font-extrabold font-mono tracking-tight"
              style={{ color: ACCENT }}
              aria-hidden="true"
            >
              CARE
            </div>
            <div
              className="absolute -inset-4 blur-3xl opacity-15 rounded-3xl pointer-events-none"
              style={{ background: ACCENT }}
              aria-hidden="true"
            />
          </div>

          <h1
            id="care-hero-heading"
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6 max-w-4xl"
          >
            The right information. The right decision.{" "}
            <span style={{ color: ACCENT }}>At the right time.</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-relaxed max-w-2xl">
            ZNXCare is a patient management solution built for clinics, hospitals and health
            panels that need a complete, real-time view of every patient — with doctor
            information and prescriptions tied in so nothing falls between departments.
          </p>
        </section>

        {/* ── DEPARTMENT GRID ──────────────────────────────────────────────── */}
        <section
          aria-labelledby="care-modules-heading"
          className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800/60"
        >
          <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: ACCENT }}>
            End-to-End Connected
          </span>
          <h2 id="care-modules-heading" className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-10">
            Every department. One connected record.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {departments.map((dept) => (
              <div
                key={dept.code}
                className="group p-6 rounded-3xl border border-zinc-800 bg-zinc-900/40 hover:bg-zinc-900/70 hover:border-[#6ee7b7]/30 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className="text-xs font-mono font-bold mb-3 px-2 py-1 rounded inline-block"
                  style={{ background: `${ACCENT}15`, color: ACCENT }}
                >
                  {dept.code}
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#6ee7b7] transition-colors">
                  {dept.label}
                </h3>
                <p className="text-xs text-zinc-500 leading-relaxed">{dept.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── ZERO PAPERWORK ───────────────────────────────────────────────── */}
        <section
          aria-labelledby="care-paperwork-heading"
          className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800/60"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: ACCENT }}>
                Less Admin. More Care.
              </span>
              <h2 id="care-paperwork-heading" className="text-3xl sm:text-4xl font-extrabold text-white mt-3 leading-tight">
                Spend less time on paperwork. More time on patients.
              </h2>
              <p className="mt-4 text-zinc-400 leading-relaxed">
                Payments and expenses are tracked as they happen. A drill-down dashboard
                with Excel export gives management instant answers instead of
                end-of-month surprises. Full administrative controls for backup,
                user rights and data security keep everything safe and auditable.
              </p>
            </div>
            <ul className="space-y-3">
              {[
                "Complete patient record — registration through discharge",
                "Automatic payment and expense tracking",
                "Panel and corporate billing handled automatically",
                "Drill-down management dashboard with Excel export",
                "Backup, user rights and data security controls",
                "Doctor prescriptions linked across all departments",
              ].map((point) => (
                <li key={point} className="check-item">{point}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── DEMO FORM ────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="care-demo-heading"
          className="max-w-3xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="text-center mb-10">
            <span className="text-xs font-mono uppercase tracking-widest font-bold" style={{ color: ACCENT }}>
              For Your Healthcare Facility
            </span>
            <h2 id="care-demo-heading" className="text-3xl sm:text-4xl font-extrabold text-white mt-3">
              Request a ZNXCare Demo
            </h2>
            <p className="mt-3 text-zinc-400">
              Whether you run a single clinic or a multi-department hospital, ZNXCare
              gives your team a complete real-time picture of every patient.
            </p>
          </div>
          <div className="p-8 sm:p-12 rounded-3xl border border-zinc-800 bg-zinc-900/60">
            <DemoRequestForm productName="ZNXCare" accentColor={ACCENT} />
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
