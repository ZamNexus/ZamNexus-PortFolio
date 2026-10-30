"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoRequestForm from "@/components/DemoRequestForm";
import ProductScene from "@/components/ProductScene";
import FlowWalkthrough from "@/components/FlowWalkthrough";
import ScrollProgress from "@/components/motion/ScrollProgress";
import Reveal from "@/components/motion/Reveal";
import Stagger from "@/components/motion/Stagger";
import SplitWords from "@/components/motion/SplitWords";
import Spotlight from "@/components/motion/Spotlight";
import { ProductStats, ProductClients, ProductAudience, ProductFaq, IllustrativeNote } from "@/components/ProductSections";

const ACCENT = "#8B5CF6";

// ─── 4-Stage Campus Operational & Academic Lifecycle ─────────────────────────

const campusWorkflow = [
  {
    step: "01",
    phase: "PAPERLESS ADMISSIONS & OCR",
    title: "Digital Applicant Intake, Document OCR & RFID Issuance",
    desc: "Prospective students submit documents through the online portal. Automated OCR verifies transcripts, entrance exam scores are ranked by a merit algorithm, and admitted students receive digital RFID credentials before step-one orientation.",
    telemetry: "100%",
    telemetryLabel: "Paperless Intake Rate",
    subsystems: ["MOD-ADM Online Portal", "MOD-OCR Verification", "MOD-ID RFID Issuance"],
    outputs: ["Zero Paper Application Intake", "Automated Merit Ranking", "Instant RFID Student Profile"],
  },
  {
    step: "02",
    phase: "CLASH-FREE TIMETABLE ENGINE",
    title: "Algorithmic Course, Teacher & Classroom Constraint Solver",
    desc: "ZNXEdu evaluates room capacities, lab equipment, and faculty availability. Its AI constraint solver synthesizes campus-wide semester timetables in under 30 seconds with zero double-bookings and automated teacher substitute allocation.",
    telemetry: "< 30 sec",
    telemetryLabel: "Campus Schedule Synthesis",
    subsystems: ["MOD-SCH Constraint Solver", "MOD-SUB Faculty Substitution", "MOD-CAP Rooms"],
    outputs: ["Zero Double-Booking Guarantee", "Instant Teacher Substitution", "Room Capacity Optimization"],
  },
  {
    step: "03",
    phase: "SMART TURNSTILES & PARENT APP",
    title: "Biometric Gate Check-In & Instant 1.2s Parent Notifications",
    desc: "As students scan their RFID card or face at campus turnstiles, attendance is recorded on immutable rosters. Parents receive an immediate push alert and SMS within 1.2 seconds, along with daily homework diaries and teacher messages.",
    telemetry: "1.2 sec",
    telemetryLabel: "Gate-to-Parent Notification",
    subsystems: ["MOD-ATT Turnstiles", "MOD-SMS Push Gateway", "MOD-APP Parent Portal"],
    outputs: ["Real-Time Gate Verification", "1.2s Parent Safety Ping", "Daily Homework Diary Feed"],
  },
  {
    step: "04",
    phase: "AUTOMATED FEE BILLING & BANK LINK",
    title: "Recurring Challans, 1Link Bank APIs & Defaulter Automation",
    desc: "Monthly fee vouchers are automatically generated with custom family concession rules. Direct 1Link and bank API links reconcile student payments instantly, while automated WhatsApp alerts remind guardians without uncomfortable phone calls.",
    telemetry: "98.4%",
    telemetryLabel: "On-Time Fee Recovery Rate",
    subsystems: ["MOD-FEE Voucher Engine", "MOD-BNK 1Link Integration", "MOD-REC Auto Reconcile"],
    outputs: ["Automated Bank Challan Sync", "Direct Gateway Settlement", "Automated Defaulter Reminders"],
  },
];

// ─── 8-Module Integrated Campus Grid ─────────────────────────────────────────

const modules = [
  {
    icon: "🎓",
    code: "MOD-ADM",
    label: "Digital Admissions & Enrollment",
    desc: "Paperless applicant portal, automated document checks, entrance exam scoring, and instant student ID allocation.",
    bullets: ["Online Application Flow", "Document Verification", "Merit List Generator"],
  },
  {
    icon: "💳",
    code: "MOD-FEE",
    label: "Automated Fee Billing & Bank Link",
    desc: "Recurring voucher generation, direct integration with banking APIs, credit card processing, and automated overdue alerts.",
    bullets: ["Direct 1Link/Bank APIs", "Installment Plans", "Instant Digital Receipts"],
  },
  {
    icon: "⏱️",
    code: "MOD-ATT",
    label: "Biometric & RFID Attendance",
    desc: "Seamless hardware integration with turnstiles and biometric sensors, triggering instant parent SMS/app alerts upon entry.",
    bullets: ["Instant Parent SMS Alert", "Faculty Clock-In Matrix", "Automated Leave Tracking"],
  },
  {
    icon: "📝",
    code: "MOD-EXM",
    label: "Gradebook & Exam Architecture",
    desc: "Custom grading scales, GPA/CGPA calculations, automated report card compilation, and immutable transcript generation.",
    bullets: ["Dynamic Report Card PDFs", "Curved Grading Models", "Online Result Publishing"],
  },
  {
    icon: "🗓️",
    code: "MOD-SCH",
    label: "Clash-Free Timetable Engine",
    desc: "Algorithmic scheduling optimizing teacher availability, room capacity, and course combinations with zero scheduling conflicts.",
    bullets: ["Zero-Clash Scheduling", "Instant Teacher Substitution", "Room Allocation Engine"],
  },
  {
    icon: "📚",
    code: "MOD-LIB",
    label: "Smart Campus Library",
    desc: "Barcode-driven checkout and returns, Dewey decimal cataloging, digital repository access, and automatic overdue fine logging.",
    bullets: ["Barcode Borrow/Return", "E-Book Repository", "Automated Fine Ledgers"],
  },
  {
    icon: "🚌",
    code: "MOD-FLT",
    label: "Fleet & Transport Telemetry",
    desc: "Real-time school bus GPS tracking, designated stop route management, student pickup check-ins, and driver performance logs.",
    bullets: ["Live Bus GPS on App", "Safe Stop Validation", "Maintenance & Fuel Logs"],
  },
  {
    icon: "📱",
    code: "MOD-APP",
    label: "Parent & Student Mobile Hub",
    desc: "Native mobile app for parents to pay fees, inspect live attendance, check daily homework, and message faculty directly.",
    bullets: ["Real-Time Push Alerts", "Direct In-App Fee Pay", "Homework & Diary Feeds"],
  },
];

// ─── Live Telemetry Simulator Tabs ───────────────────────────────────────────

const simulatorTabs = [
  {
    id: "scheduling",
    label: "Campus Schedule Engine",
    badge: "1,200 Classes Allocated",
    data: {
      "Schedule Synthesis": "0 Schedule Conflicts Detected",
      "Teacher Substitution": "Math Sec-B Reallocated to Prof. Vance",
      "Room Utilization": "92.4% Optimal Classroom Fill",
      "Synthesis Duration": "14.2s Full Campus Generation",
    },
  },
  {
    id: "fees",
    label: "Automated Fee & Bank Link",
    badge: "Bank Reconciliation Live",
    data: {
      "Vouchers Issued": "3,450 Challans Synced",
      "Online Collection": "98.4% On-Time Collection Rate",
      "Direct Bank Reconcile": "Automated via 1Link API",
      "Defaulter Reminders": "Automated WhatsApp Triggered",
    },
  },
  {
    id: "parent-app",
    label: "Parent Mobile Engagement",
    badge: "14,820 Connected Guardians",
    data: {
      "Gate Check-In": "Turnstile Synced (SMS Delivered in 1.2s)",
      "Daily Homework Feed": "100% Subject Upload Completed",
      "Teacher Direct Chat": "< 12min Median Response Time",
      "Parent Satisfaction": "4.9/5 Active App Rating",
    },
  },
];


export default function ZNXEduPage() {
  const [activeWorkflowIdx, setActiveWorkflowIdx] = useState(0);
  const [activeTabId, setActiveTabId] = useState(simulatorTabs[0].id);
  const activeTab = simulatorTabs.find((t) => t.id === activeTabId) || simulatorTabs[0];
  const activeFlow = campusWorkflow[activeWorkflowIdx];

  return (
    <div
      suppressHydrationWarning
      className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[#8B5CF6] selection:text-white overflow-x-clip"
      style={{ "--rail": ACCENT } as CSSProperties}
    >
      {/* Background Cyber Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="edu-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#edu-grid)" />
        </svg>

        {/* Ambient Halos */}
        <div className="absolute top-[15%] left-[5%] w-[650px] h-[650px] rounded-full bg-violet-600/[0.06] blur-[180px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[8%] w-[600px] h-[600px] rounded-full bg-purple-600/[0.04] blur-[180px] pointer-events-none" />
      </div>

      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="edu-hero-heading"
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
              ZNXEdu
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <div data-enter="2" className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs font-mono font-bold text-violet-400 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
                ZNXEdu · School & campus management
              </div>

              <h1
                id="edu-hero-heading"
                className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-6"
              >
                <SplitWords mode="load" text="One system for every campus, classroom and parent." />
              </h1>

              <p data-enter="4" className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
                ZNXEdu brings admissions, fees, attendance, exams, timetables and parent communication together, so your staff stop reconciling spreadsheets and parents always know what&apos;s happening.
              </p>

              <div data-enter="5" className="flex flex-wrap items-center gap-4">
                <a href="#demo-form" className="liquid-lime-btn text-sm py-3.5 px-7">
                  <span>Request a ZNXEdu demo</span>
                  <span className="arrow-icon w-7 h-7 text-xs" aria-hidden="true">→</span>
                </a>
                <a
                  href="#workflow-section"
                  className="px-6 py-3.5 rounded-full border border-zinc-700 hover:border-zinc-500 bg-zinc-900/50 text-zinc-300 hover:text-white text-sm font-semibold transition-all"
                >
                  Inspect Campus Workflow ↓
                </a>
              </div>
            </div>

            {/* The product's event flow, then confirmed figures only (lib/siteFacts.ts) */}
            <div data-enter="6" className="lg:col-span-5 space-y-6">
              <ProductScene slug="znxedu" />
              <ProductStats slug="znxedu" accent={ACCENT} />
            </div>
          </div>
        </section>

        {/* ── FOLLOW ONE EVENT (lib/catalog.ts flows) ───────────────────────── */}
        <FlowWalkthrough slug="znxedu" />

        {/* ── BESPOKE CAMPUS OPERATIONAL & ACADEMIC WORKFLOW CONSOLE ───────── */}
        <section
          id="workflow-section"
          aria-labelledby="workflow-heading"
          className="max-w-7xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <Reveal variant="words" replay={false} className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-bold">
              Academic & Operational Lifecycle
            </span>
            <h2
              id="workflow-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-2"
            >
              <SplitWords text="The Modern Campus Operational Pipeline" />
            </h2>
            <p className="reveal-sub text-zinc-400 text-sm sm:text-base mt-3">
              How ZNXEdu automates student admissions, generates clash-free schedules, alerts parents upon campus entry, and reconciles tuition fees directly with banks.
            </p>
          </Reveal>

          {/* Stepper Buttons */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {campusWorkflow.map((item, idx) => {
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
            <span style={{ "--p": (activeWorkflowIdx + 1) / campusWorkflow.length } as CSSProperties} />
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
                  <div className="text-xs font-mono font-bold tracking-wider text-violet-400 uppercase">
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
                    Automated Campus Outputs:
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
            <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-bold">
              Campus Telemetry Engine
            </span>
            <h2
              id="simulator-heading"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-2"
            >
              <SplitWords text="Interactive Campus Operations Console" />
            </h2>
            <p className="reveal-sub text-zinc-400 text-sm mt-3">
              Simulate algorithmic timetable generation, automated fee reconciliations, and parent app check-in notifications.
            </p>
            <IllustrativeNote />
          </Reveal>

          <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/90 shadow-2xl relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/60 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ background: ACCENT }} />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  ZNX_EDU_NODE // CAMPUS CORE
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
                  <span className="text-zinc-400">Campus Status:</span>
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
              <span>Encrypted Student Records · Role-Based Access</span>
              <span className="text-emerald-400">● Live Campus Cluster</span>
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
            <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-bold">
              Subsystem Grid
            </span>
            <h2
              id="modules-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-2"
            >
              <SplitWords text="Eight Integrated Campus Modules" />
            </h2>
            <p className="reveal-sub text-zinc-400 text-sm sm:text-base mt-3">
              Eliminating administrative redundancy across academic affairs, finance, exams, and parent communications.
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
                    <span className="text-[10px] font-mono text-foreground-muted font-bold group-hover:text-violet-400">
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
        <ProductClients slug="znxedu" />

        <ProductAudience
          id="znxedu-audience"
          title="Built for schools that have outgrown spreadsheets."
          items={[
            { title: "Private schools", text: "Admissions, fees and attendance in one place, with a parent app from day one." },
            { title: "College groups", text: "Timetables, exams and results across departments and programmes." },
            { title: "Multi-campus networks", text: "Each campus runs day to day; head office sees and controls them all." },
          ]}
        />

        <ProductFaq
          id="znxedu-faq"
          items={[
            { q: "Can it manage several campuses?", a: "Yes. Each campus runs its own day-to-day operations, while head office sees fees, attendance and results across all of them." },
            { q: "How are parents kept informed?", a: "The parent app shows attendance alerts, fee status, results and school notices." },
            { q: "Is student data secure?", a: "Records are encrypted, and each member of staff only sees what their role allows." },
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
              <span className="text-xs font-mono uppercase tracking-widest text-violet-400 font-bold">
                Deploy ZNXEdu
              </span>
              <h2 id="demo-heading" className="text-3xl font-extrabold text-white mt-2">
                <SplitWords text="Request a ZNXEdu demo" />
              </h2>
              <p className="reveal-sub text-zinc-400 text-sm mt-3">
                Tell us about your campuses and student numbers.
              </p>
            </Reveal>

            <DemoRequestForm productName="ZNXEdu" />
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
