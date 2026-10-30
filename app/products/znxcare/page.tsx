"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoRequestForm from "@/components/DemoRequestForm";
import ProductFlow from "@/components/ProductFlow";
import ScrollProgress from "@/components/motion/ScrollProgress";
import Reveal from "@/components/motion/Reveal";
import Stagger from "@/components/motion/Stagger";
import SplitWords from "@/components/motion/SplitWords";
import Spotlight from "@/components/motion/Spotlight";
import { ProductStats, ProductClients, ProductAudience, ProductFaq, IllustrativeNote } from "@/components/ProductSections";

const ACCENT = "#10B981";

// ─── 4-Stage Clinical Healthcare & Hospital Patient Continuum ────────────────

const clinicalWorkflow = [
  {
    step: "01",
    phase: "EMERGENCY INTAKE & TRIAGE",
    title: "Biometric Intake, Unique MRN Generation & Emergency Triage",
    desc: "Patients arriving at Emergency or OPD reception are instantly identified via biometric or national ID lookup. A permanent Medical Record Number (MRN) is assigned, emergency triage color codes allocate immediate severity beds, and corporate panel insurance eligibility is verified within seconds.",
    telemetry: "< 60 sec",
    telemetryLabel: "Intake to Triage Bed",
    subsystems: ["MOD-REG Master Index", "MOD-TRG Triage Matrix", "MOD-INS Insurance Check"],
    outputs: ["Permanent Patient MRN", "Emergency Triage Status", "Insurance Eligibility Stamp"],
  },
  {
    step: "02",
    phase: "CLINICAL EHR & DRUG GUARD",
    title: "Structured SOAP Charting, ICD-10 & Adverse Interaction Guard",
    desc: "Attending physicians record longitudinal SOAP clinical notes and ICD-10 diagnostic codes. ZNXCare's built-in safety engine automatically cross-checks prescribed medications against patient allergy history and concurrent prescriptions, preventing life-threatening adverse drug reactions.",
    telemetry: "0",
    telemetryLabel: "Adverse Drug Interactions",
    subsystems: ["MOD-EHR Clinical Notes", "MOD-ICD Diagnostics", "MOD-SAF Drug Allergy Guard"],
    outputs: ["Immutable Clinical Record", "Zero Drug-Allergy Conflicts", "Electronic Diagnostic Orders"],
  },
  {
    step: "03",
    phase: "AUTOMATED LIS & HL7 LINK",
    title: "Direct Machine Analyzer Interfacing & Critical Value Panic Alerts",
    desc: "Phlebotomy blood samples are scanned via barcoded vacutainers. Automated clinical analyzers (e.g. Sysmex) communicate bidirectionally via HL7 standards, pushing results straight into doctor EHR charts. Panic values trigger immediate high-priority doctor alerts.",
    telemetry: "Instant",
    telemetryLabel: "Result Push to Doctor Chart",
    subsystems: ["MOD-LIS Auto-Analyzers", "MOD-HL7 Interfacing", "MOD-ALR Panic Alerts"],
    outputs: ["Bidirectional HL7 Telemetry", "Critical Panic Alerts", "Digital Pathologist Sign-Off"],
  },
  {
    step: "04",
    phase: "PHARMACY FIFO & DISCHARGE",
    title: "E-Rx Barcode Dispense, Expiry Quarantine & Zero-Leak Billing",
    desc: "Hospital pharmacy technicians scan doctor electronic prescriptions, enforcing strict First-In First-Out (FIFO) batch expiry quarantine. Upon physician discharge sign-off, an automated itemized bill consolidates bed charges, nursing procedures, and medications without manual leakage.",
    telemetry: "0.0%",
    telemetryLabel: "Pharmacy Dispense Discrepancy",
    subsystems: ["MOD-PHR FIFO Dispense", "MOD-BIL Zero-Leak Bills", "MOD-IPD Ward Clearance"],
    outputs: ["Barcoded E-Rx Dispensing", "FIFO Expiry Batch Lock", "Zero-Leakage Discharge Clearance"],
  },
];

// ─── 8-Module Integrated Clinical Grid ───────────────────────────────────────

const modules = [
  {
    icon: "🏥",
    code: "MOD-REG",
    label: "Patient Master Index & Intake",
    desc: "Biometric identity matching, instant MRN generation, emergency fast-track admissions, and corporate panel eligibility checks.",
    bullets: ["Instant MRN Issuance", "Insurance & Panel Verification", "Emergency Triage Route"],
  },
  {
    icon: "🩺",
    code: "MOD-EHR",
    label: "Clinical EHR & Doctor Station",
    desc: "Structured SOAP clinical documentation, ICD-10 diagnostic coding, drug allergy contraindication alerts, and past medical history.",
    bullets: ["ICD-10 Diagnostic Engine", "Drug Allergy Guardrails", "Past Clinical Timeline"],
  },
  {
    icon: "🛏️",
    code: "MOD-IPD",
    label: "Inpatient Ward & OT Management",
    desc: "Real-time bed occupancy matrix, nurse care plan administration, operating theater scheduling, and daily doctor rounding notes.",
    bullets: ["Visual Bed Grid Map", "Nurse Station Tasks", "OT Booking & Sterilization"],
  },
  {
    icon: "🧪",
    code: "MOD-LIS",
    label: "Automated Laboratory (LIS) & HL7",
    desc: "Direct bidirectional machine interfaces for CBC and biochemistry analyzers, automated sample barcoding, and panic value notifications.",
    bullets: ["Bidirectional HL7 Interfacing", "Critical Value Alerts", "Digital Pathologist Sign-Off"],
  },
  {
    icon: "💊",
    code: "MOD-PHR",
    label: "Hospital Pharmacy & FIFO Dispense",
    desc: "Doctor e-prescription verification, strict batch expiry quarantine, automated dose validation, and cross-department stock replenishment.",
    bullets: ["Barcode Dispense Verification", "Expiry Batch Quarantine", "Automated Ward Indents"],
  },
  {
    icon: "💳",
    code: "MOD-BIL",
    label: "Medical Billing & Insurance Claims",
    desc: "Automated itemized patient billing tied to doctor orders, corporate panel copay splits, and seamless discharge clearance.",
    bullets: ["Zero-Leakage Itemized Bills", "Corporate Panel Routing", "Instant Discharge Clearance"],
  },
  {
    icon: "🩻",
    code: "MOD-RAD",
    label: "Radiology & DICOM / PACS Link",
    desc: "Seamless connection to imaging servers, structured radiology report templates, and instant physician bedside image viewing.",
    bullets: ["PACS / DICOM Viewer Link", "Modality Worklist Sync", "Structured Imaging Reports"],
  },
  {
    icon: "📊",
    code: "MOD-MIS",
    label: "Clinical Governance & Hospital MIS",
    desc: "Hospital-wide KPI monitoring: average length of stay (ALOS), infection control surveillance, bed turnaround times, and departmental revenue.",
    bullets: ["Bed Occupancy Ratio (BOR)", "Average Length of Stay (ALOS)", "Real-Time Revenue Feeds"],
  },
];

// ─── Live Telemetry Simulator Tabs ───────────────────────────────────────────

const simulatorTabs = [
  {
    id: "clinical",
    label: "Patient Station (EHR)",
    badge: "Patient #MRN-80492 Admitted",
    data: {
      "Primary Vitals": "BP: 120/78 · HR: 74 bpm · SpO2: 99%",
      "Clinical Diagnosis": "ICD-10 J06.9 (Acute Upper Respiratory)",
      "Contraindication Check": "0 Adverse Drug Interactions Detected",
      "Doctor Electronic Order": "Stat IV Hydration + Lab Blood Work",
    },
  },
  {
    id: "laboratory",
    label: "Automated LIS & HL7 Link",
    badge: "Analyzer #Sysmex-XN9000 Synced",
    data: {
      "Sample Barcode": "BC-49021 (Venous Blood)",
      "Automated Results": "WBC: 7.2 x10^3/µL · Hb: 14.2 g/dL",
      "Panic Value Status": "All Parameters Within Safe Clinical Range",
      "Pathologist Sign-Off": "Dr. A. Vance (Digital Signature Verified)",
    },
  },
  {
    id: "pharmacy",
    label: "Hospital Pharmacy & FIFO Dispense",
    badge: "Doctor E-Rx Verified",
    data: {
      "Prescription Link": "Matched to Consultation #7489",
      "Batch Expiry Validation": "Batch #PH-992 (Exp: 11/2027) Allocated",
      "Dispensing Security": "Dual Nurse Barcode Scan Verified",
      "Stock Balance": "Central Pharmacy Depleted (-2 units)",
    },
  },
];


export default function ZNXCarePage() {
  const [activeWorkflowIdx, setActiveWorkflowIdx] = useState(0);
  const [activeTabId, setActiveTabId] = useState(simulatorTabs[0].id);
  const activeTab = simulatorTabs.find((t) => t.id === activeTabId) || simulatorTabs[0];
  const activeFlow = clinicalWorkflow[activeWorkflowIdx];

  return (
    <div
      suppressHydrationWarning
      className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[#10B981] selection:text-white overflow-x-clip"
      style={{ "--rail": ACCENT } as CSSProperties}
    >
      {/* Background Cyber Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="care-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#care-grid)" />
        </svg>

        {/* Ambient Halos */}
        <div className="absolute top-[15%] left-[5%] w-[650px] h-[650px] rounded-full bg-emerald-600/[0.06] blur-[180px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[8%] w-[600px] h-[600px] rounded-full bg-teal-600/[0.04] blur-[180px] pointer-events-none" />
      </div>

      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="care-hero-heading"
          className="max-w-7xl mx-auto px-6 pt-40 pb-16"
        >
          <div data-enter="1" className="flex items-center gap-3 mb-6">
            <Link
              href="/products"
              className="text-xs font-mono text-foreground-muted hover:text-zinc-300 transition-colors"
            >
              ← Products
            </Link>
            <span className="text-foreground-muted">/</span>
            <span className="text-xs font-mono font-bold" style={{ color: ACCENT }}>
              ZNXCare
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <div data-enter="2" className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-xs font-mono font-bold text-emerald-400 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ZNXCare · Hospital management & EHR
              </div>

              <h1
                id="care-hero-heading"
                className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-6"
              >
                <SplitWords mode="load" text="The right patient record, in front of the right clinician, when it matters." />
              </h1>

              <p data-enter="4" className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
                ZNXCare connects registration, emergency triage, OPD and IPD, lab machines, pharmacy and billing for hospitals, multi-specialty clinics and diagnostic labs, so information follows the patient.
              </p>

              <div data-enter="5" className="flex flex-wrap items-center gap-4">
                <a href="#demo-form" className="liquid-lime-btn text-sm py-3.5 px-7">
                  <span>Request a ZNXCare demo</span>
                  <span className="arrow-icon w-7 h-7 text-xs" aria-hidden="true">→</span>
                </a>
                <a
                  href="#workflow-section"
                  className="px-6 py-3.5 rounded-full border border-zinc-700 hover:border-zinc-500 bg-zinc-900/50 text-zinc-300 hover:text-white text-sm font-semibold transition-all"
                >
                  Inspect Clinical Workflow ↓
                </a>
              </div>
            </div>

            {/* The product's event flow, then confirmed figures only (lib/siteFacts.ts) */}
            <div data-enter="6" className="lg:col-span-5 space-y-6">
              <ProductFlow slug="znxcare" />
              <ProductStats slug="znxcare" accent={ACCENT} />
            </div>
          </div>
        </section>

        {/* ── BESPOKE CLINICAL PATIENT CONTINUUM & CARE WORKFLOW CONSOLE ───── */}
        <section
          id="workflow-section"
          aria-labelledby="workflow-heading"
          className="max-w-7xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <Reveal variant="words" replay={false} className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Patient Care Continuum
            </span>
            <h2
              id="workflow-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-2"
            >
              <SplitWords text="The Clinical Patient Continuum" />
            </h2>
            <p className="reveal-sub text-zinc-400 text-sm sm:text-base mt-3">
              Follow a patient’s uninterrupted journey through emergency triage, doctor SOAP charting with drug contraindication guardrails, automated HL7 lab analyzers, and hospital pharmacy dispensing.
            </p>
          </Reveal>

          {/* Stepper Buttons */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {clinicalWorkflow.map((item, idx) => {
              const isCurrent = idx === activeWorkflowIdx;
              return (
                <button
                  key={item.step}
                  onClick={() => setActiveWorkflowIdx(idx)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden group ${
                    isCurrent
                      ? "bg-zinc-900/90 shadow-xl"
                      : "bg-zinc-950/40 hover:bg-zinc-900/40 border-zinc-800/80"
                  }`}
                  style={{
                    borderColor: isCurrent ? ACCENT : undefined,
                    boxShadow: isCurrent ? `0 0 20px ${ACCENT}25` : undefined,
                  }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                      style={{
                        borderColor: isCurrent ? `${ACCENT}60` : "#27272a",
                        background: isCurrent ? `${ACCENT}15` : "#18181b",
                        color: isCurrent ? ACCENT : "#71717a",
                      }}
                    >
                      STAGE {item.step}
                    </span>
                    <span className="text-[9px] font-mono text-foreground-muted">
                      {idx < activeWorkflowIdx ? "✓ COMPLETE" : isCurrent ? "● ACTIVE" : "PENDING"}
                    </span>
                  </div>
                  <div className="text-xs font-bold font-mono text-white whitespace-normal break-words">
                    {item.phase}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Progress through the lifecycle, up to the stage being shown */}
          <div className="stage-rail mb-8" aria-hidden="true">
            <span style={{ "--p": (activeWorkflowIdx + 1) / clinicalWorkflow.length } as CSSProperties} />
          </div>

          {/* Active Stage Deep-Dive Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFlow.step}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3 }}
              className="p-8 sm:p-10 rounded-3xl bg-zinc-950/80 border border-zinc-800 shadow-2xl relative overflow-hidden"
              style={{
                borderLeftWidth: "4px",
                borderLeftColor: ACCENT,
              }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/70 pb-5 mb-6">
                <div>
                  <div className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">
                    Stage {activeFlow.step} {"//"} {activeFlow.phase}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                    {activeFlow.title}
                  </h3>
                </div>

                <div className="p-3 px-5 rounded-2xl bg-zinc-900/60 border border-zinc-800 text-right">
                  <div className="text-xs font-mono text-zinc-400">{activeFlow.telemetryLabel}</div>
                  <div className="text-xl sm:text-2xl font-mono font-black" style={{ color: ACCENT }}>
                    {activeFlow.telemetry}
                  </div>
                </div>
              </div>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-4xl mb-8">
                {activeFlow.desc}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-zinc-800/60">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-foreground-muted font-bold block mb-2">
                    Subsystems Synchronized:
                  </span>
                  <div className="stage-items flex flex-wrap gap-2">
                    {activeFlow.subsystems.map((sub) => (
                      <span
                        key={sub}
                        className="px-3 py-1 rounded-lg text-xs font-mono bg-zinc-900 border border-zinc-800 text-zinc-200"
                      >
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-foreground-muted font-bold block mb-2">
                    Verified Clinical Outputs:
                  </span>
                  <div className="stage-items space-y-1.5">
                    {activeFlow.outputs.map((out) => (
                      <div key={out} className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                        <span>{out}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* ── INTERACTIVE LIVE OPERATIONS CONSOLE (WORKFLOW SIMULATOR) ─────── */}
        <section
          aria-labelledby="simulator-heading"
          className="max-w-7xl mx-auto px-6 py-16 border-t border-zinc-800/60"
        >
          <Reveal variant="words" replay={false} className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Clinical Telemetry Engine
            </span>
            <h2
              id="simulator-heading"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-2"
            >
              <SplitWords text="Interactive Clinical Operations Console" />
            </h2>
            <p className="reveal-sub text-zinc-400 text-sm mt-3">
              Simulate patient electronic vitals, bidirectional HL7 laboratory results, and pharmacy FIFO barcode dispensing.
            </p>
            <IllustrativeNote />
          </Reveal>

          <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/90 shadow-2xl relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/60 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ background: ACCENT }} />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  ZNX_CARE_STATION // CLINICAL NODE #01
                </span>
              </div>

              <div className="flex items-center gap-2">
                {simulatorTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTabId(tab.id)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer ${
                      activeTabId === tab.id
                        ? "bg-zinc-800 text-white shadow border border-zinc-700"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs font-mono">
                  <span className="text-zinc-400">Clinical State:</span>
                  <span className="font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ background: ACCENT }} />
                    {activeTab.badge}
                  </span>
                </div>

                <div className="stage-items grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {Object.entries(activeTab.data).map(([k, v]) => (
                    <div
                      key={k}
                      className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/60 flex items-center justify-between text-xs font-mono"
                    >
                      <span className="text-zinc-400">{k}</span>
                      <span className="font-bold text-white" style={{ color: ACCENT }}>{v}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-foreground-muted">
              <span>Encrypted Patient Health Records · Full Audit Trail</span>
              <span className="text-emerald-400">● Live Hospital Mesh</span>
            </div>
          </div>
        </section>

        {/* ── 8-MODULE ARCHITECTURE GRID ───────────────────────────────────── */}
        <section
          id="modules-grid"
          aria-labelledby="modules-heading"
          className="max-w-7xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <Reveal variant="words" replay={false} className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
              Subsystem Grid
            </span>
            <h2
              id="modules-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-2"
            >
              <SplitWords text="Eight Integrated Clinical Modules" />
            </h2>
            <p className="reveal-sub text-zinc-400 text-sm sm:text-base mt-3">
              Eliminating medical errors, preventing prescription leakage, and synchronizing clinical workflows across all departments.
            </p>
          </Reveal>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((mod) => (
              <Spotlight key={mod.label} as="div" className="lift-card p-6 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800" aria-hidden="true">
                      {mod.icon}
                    </span>
                    <span className="text-[10px] font-mono text-foreground-muted font-bold group-hover:text-emerald-400">
                      {mod.code}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {mod.label}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                    {mod.desc}
                  </p>
                </div>

                <div className="space-y-1 pt-4 border-t border-zinc-800/60">
                  {mod.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: ACCENT }} />
                      <span>{bullet}</span>
                    </div>
                  ))}
                </div>
              </Spotlight>
            ))}
          </Stagger>
        </section>

        {/* ── CLIENTS (confirmed only), AUDIENCE, FAQ ─────────────────────── */}
        <ProductClients slug="znxcare" />

        <ProductAudience
          id="znxcare-audience"
          title="Built for clinical teams."
          items={[
            { title: "Hospitals", text: "Emergency, OPD, IPD, lab, pharmacy and billing on one patient record." },
            { title: "Multi-specialty clinics", text: "Appointments, consultations and prescriptions across departments." },
            { title: "Diagnostic laboratories", text: "Analyser results returned to the patient record automatically over HL7." },
          ]}
        />

        <ProductFaq
          id="znxcare-faq"
          items={[
            { q: "Does it connect to our lab analysers?", a: "Yes. ZNXCare uses HL7 interfaces to send orders to analysers and bring results back into the patient record. Tell us which models you use and we'll confirm." },
            { q: "Can it handle insurance panels?", a: "Yes. Panel eligibility is checked at registration, and claims are prepared from the same record." },
            { q: "How is patient data protected?", a: "Records are encrypted, access is role-based, and every change is kept in an audit trail." },
          ]}
        />

        {/* ── DEMO REQUEST & CLOSING FORM ──────────────────────────────────── */}
        <section
          id="demo-form"
          aria-labelledby="demo-heading"
          className="max-w-4xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="p-8 sm:p-14 rounded-3xl bg-zinc-900/50 border border-zinc-800 shadow-2xl">
            <Reveal variant="words" replay={false} className="text-center mb-10">
              <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                Deploy ZNXCare
              </span>
              <h2 id="demo-heading" className="text-3xl font-extrabold text-white mt-2">
                <SplitWords text="Request a ZNXCare demo" />
              </h2>
              <p className="reveal-sub text-zinc-400 text-sm mt-3">
                Tell us about your facility and departments.
              </p>
            </Reveal>

            <DemoRequestForm productName="ZNXCare" />
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
