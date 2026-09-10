"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useInView,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ───────────────────────────────────────────────────────────────────

interface MinimalWorkflowPhase {
  id: string;
  step: string;
  shortTitle: string;
  action: string;
  telemetry: string;
  telemetryLabel: string;
}

interface ProductEngine {
  id: string;
  code: string;
  name: string;
  headline: string;
  tag: string;
  icon: string;
  logo: string;
  stat: string;
  statLabel: string;
  accent: string;
  index: string;
  href: string;
  targetIndustries: string[];
  capabilities: string[];
  workflow: MinimalWorkflowPhase[];
}

interface DeploymentStep {
  step: string;
  title: string;
  duration: string;
  description: string;
  accent: string;
  deliverables: string[];
}

// ─── Streamlined Minimalist Product Engines ─────────────────────────────────

const productEngines: ProductEngine[] = [
  {
    id: "znxerp",
    code: "ZNXERP",
    name: "Industrial Core & Resource Planning",
    headline: "Zero reconciliation friction from the shop floor to the boardroom.",
    tag: "INDUSTRIAL MES & RESOURCE PLANNING",
    icon: "◈",
    logo: "/product-logos/znxerp.png",
    stat: "5+",
    statLabel: "Industrial Deployments",
    accent: "#3B82F6", // Blue
    index: "01",
    href: "/Products/znxerp",
    targetIndustries: ["Pharmaceuticals", "Textile Mills", "Manufacturing", "Distribution"],
    capabilities: [
      "MOD-FIN: Multi-Currency General Ledgers & Real-Time P&L",
      "MOD-MES: Batch BOM Locking & Machine Routing Telemetry",
      "MOD-WMS: Zoned Rack Binning, FIFO Allocation & Dispatch",
      "MOD-QC: Spectrometer Lab Sampling & Digital COA Sign-off",
      "MOD-PRC: Multi-Tier PO Approvals & B2B Vendor Portal",
      "MOD-HRM: Biometric Attendance & One-Click Payroll Runs",
      "MOD-MNT: Preventive Asset Calibration & Maintenance",
      "MOD-TAX: Multi-Jurisdiction E-Invoicing & Audit Trails",
    ],
    workflow: [
      {
        id: "erp-w1",
        step: "01",
        shortTitle: "Material Inward & QC",
        action: "Auto-GRN against PO with barcoded binning and automated lab quarantine sampling.",
        telemetry: "< 4 min",
        telemetryLabel: "Gate to Lab Sampling",
      },
      {
        id: "erp-w2",
        step: "02",
        shortTitle: "MES Formulation",
        action: "Dynamic BOM locked to batch scale with live machine line scheduling and yield tracking.",
        telemetry: "99.2%",
        telemetryLabel: "Shop-Floor Material Yield",
      },
      {
        id: "erp-w3",
        step: "03",
        shortTitle: "Smart WMS Dispatch",
        action: "Digital COA sign-off with zoned rack binning, FIFO lot reservation, and carrier dispatch.",
        telemetry: "0.0%",
        telemetryLabel: "Dispatch Picking Error",
      },
      {
        id: "erp-w4",
        step: "04",
        shortTitle: "Consolidated Ledgers",
        action: "Instant tax-compliant invoice generation with automated multi-currency posting.",
        telemetry: "< 1 sec",
        telemetryLabel: "Multi-Entity Ledger Posting",
      },
    ],
  },
  {
    id: "znxepos",
    code: "ZNXePOS",
    name: "Retail & Wholesale POS Intelligence",
    headline: "Sub-second checkout velocity with total multi-branch stock control.",
    tag: "RETAIL & WHOLESALE POS INTELLIGENCE",
    icon: "⬡",
    logo: "/product-logos/znxepos.png",
    stat: "750+",
    statLabel: "Active Stores Daily",
    accent: "#F59E0B", // Amber
    index: "02",
    href: "/Products/znxepos",
    targetIndustries: ["Supermarkets", "Commercial Pharmacies", "Apparel", "FMCG Distributors"],
    capabilities: [
      "Hardware-Accelerated Barcode Scan Engine (0.08s Latency)",
      "Split-Tender Checkout (Cash, Debit/Credit, QR & Wallet)",
      "Zero-Downtime Offline SQLite Caching & Background Mesh",
      "Multi-Branch Centralized Stock Matrix & Auto-Transfers",
      "Dynamic Promotional Rules, Loyalty & Instant Discounts",
      "Automated WhatsApp & Paperless Digital Receipt Delivery",
      "Blind Cash Drawer Shift Closeout & Skimming Prevention",
      "Direct PO-to-Supplier Goods Received Note (GRN) Inward",
    ],
    workflow: [
      {
        id: "pos-w1",
        step: "01",
        shortTitle: "Sub-Second Scan",
        action: "Hardware-accelerated barcode lookup with dynamic loyalty match and basket calculation.",
        telemetry: "0.08 sec",
        telemetryLabel: "Barcode Scan Latency",
      },
      {
        id: "pos-w2",
        step: "02",
        shortTitle: "Split-Tender Payment",
        action: "Instant card/cash split tender with zero-latency link and WhatsApp receipt delivery.",
        telemetry: "100%",
        telemetryLabel: "Tender Reliability",
      },
      {
        id: "pos-w3",
        step: "03",
        shortTitle: "Zero-Downtime Sync",
        action: "Local SQLite keeps ringing transactions during internet cuts with background mesh sync.",
        telemetry: "100%",
        telemetryLabel: "Offline Resilience",
      },
      {
        id: "pos-w4",
        step: "04",
        shortTitle: "Blind Shift Audit",
        action: "Blind shift closeout prevents skimming, logs safe cash drops, and calculates SKU gross margins.",
        telemetry: "$0.00",
        telemetryLabel: "Cashier Variance",
      },
    ],
  },
  {
    id: "znxedu",
    code: "ZNXEdu",
    name: "Multi-Campus Education Management",
    headline: "One operating system for every campus, classroom, and parent.",
    tag: "CAMPUS & ACADEMY MANAGEMENT",
    icon: "⬢",
    logo: "/product-logos/znxedu.png",
    stat: "∞",
    statLabel: "Infinite Campuses Unified",
    accent: "#8B5CF6", // Violet
    index: "03",
    href: "/Products/znxedu",
    targetIndustries: ["K-12 School Networks", "Colleges", "Vocational Institutes", "Academies"],
    capabilities: [
      "Biometric Student & Staff Attendance Gates with RFID Logging",
      "Automated SMS & WhatsApp Parent Arrival Notifications (1.2s)",
      "Algorithmic Clash-Free Campus Timetable & Room Synthesis (<30s)",
      "Digital Fee Challan Generation & Direct Bank API Reconciliation",
      "Curriculum Progression, Exam Weighting & GPA Calculation",
      "Student & Parent Mobile Self-Service Portal & Homework App",
      "Library RFID Book Tracking, Barcode Check-Out & Catalog",
      "Multi-Campus Executive Telemetry & Centralized Ledger Hub",
    ],
    workflow: [
      {
        id: "edu-w1",
        step: "01",
        shortTitle: "Paperless Intake",
        action: "Automated applicant document OCR, merit ranking engine, and digital student RFID allocation.",
        telemetry: "100%",
        telemetryLabel: "Paperless Application Rate",
      },
      {
        id: "edu-w2",
        step: "02",
        shortTitle: "Clash-Free Timetable",
        action: "Algorithmic constraint solver synthesizes campus schedules without teacher or room clashes.",
        telemetry: "< 30 sec",
        telemetryLabel: "Campus Schedule Synthesis",
      },
      {
        id: "edu-w3",
        step: "03",
        shortTitle: "Smart Turnstiles & App",
        action: "RFID turnstile swipe logs attendance and delivers automated push notifications to parents in 1.2s.",
        telemetry: "1.2 sec",
        telemetryLabel: "Gate-to-Parent Notification",
      },
      {
        id: "edu-w4",
        step: "04",
        shortTitle: "Bank Fee Link",
        action: "Recurring voucher generation with direct 1Link / banking API auto-reconciliation.",
        telemetry: "98.4%",
        telemetryLabel: "On-Time Fee Recovery",
      },
    ],
  },
  {
    id: "znxcare",
    code: "ZNXCare",
    name: "Clinical Healthcare & Hospital EHR",
    headline: "The right clinical data, for the right decision, at the exact right second.",
    tag: "CLINICAL HEALTHCARE & HOSPITAL EHR",
    icon: "⟐",
    logo: "/product-logos/znxcare.png",
    stat: "5+",
    statLabel: "Specialist Hospital Deployments",
    accent: "#10B981", // Emerald
    index: "04",
    href: "/Products/znxcare",
    targetIndustries: ["Tertiary Hospitals", "Specialist Clinics", "Diagnostic Labs", "Surgical Centers"],
    capabilities: [
      "Biometric Patient Intake & Emergency Triage Allocation (<60s)",
      "Structured SOAP Clinical EHR & ICD-10 Diagnosis Charting",
      "Real-Time Drug Interaction & Allergy Safety Guardrails",
      "Bidirectional HL7 / LIS Automated Lab Analyzer Results Link",
      "Inpatient Ward Bed Allocation & Real-Time Nurse Station Feeds",
      "Pharmacy FIFO Batch Dispense with Expiry Quarantine Lock",
      "Itemized Medical Billing, Copay Tracking & Insurance Claims",
      "Doctor OPD Clinic Roster, Scheduling & Telehealth Console",
    ],
    workflow: [
      {
        id: "care-w1",
        step: "01",
        shortTitle: "Intake & Triage",
        action: "Biometric intake with unique MRN issuance, emergency triage scoring, and bed assignment.",
        telemetry: "< 60 sec",
        telemetryLabel: "Intake to Triage Allocation",
      },
      {
        id: "care-w2",
        step: "02",
        shortTitle: "Clinical EHR & Orders",
        action: "Structured SOAP charting, ICD-10 coding, and real-time drug allergy contraindication safety.",
        telemetry: "0",
        telemetryLabel: "Adverse Drug Interactions",
      },
      {
        id: "care-w3",
        step: "03",
        shortTitle: "Automated HL7 Lab",
        action: "Bidirectional HL7 auto-analyzer link pulls test results with critical panic value alerts.",
        telemetry: "Instant",
        telemetryLabel: "Result Push to Doctor Chart",
      },
      {
        id: "care-w4",
        step: "04",
        shortTitle: "Pharmacy FIFO & Billing",
        action: "Doctor e-prescription verification with FIFO batch quarantine and zero-leakage itemized billing.",
        telemetry: "0.0%",
        telemetryLabel: "Pharmacy Dispense Error",
      },
    ],
  },
];

const deploymentPipeline: DeploymentStep[] = [
  {
    step: "01",
    title: "Process & Data Architecture",
    duration: "Week 1–2",
    accent: "#3B82F6",
    description: "Deep-dive workshops mapping your chart of accounts, production recipes, store catalogues, or clinical workflows into modular entities.",
    deliverables: ["Entity Relationship Blueprint", "Security & RBAC Matrix", "Data Migration Roadmap"],
  },
  {
    step: "02",
    title: "Core Configuration & Nodes",
    duration: "Week 3–4",
    accent: "#F59E0B",
    description: "Provisioning dedicated multi-tenant cloud environments with encrypted database instances and edge offline caching nodes.",
    deliverables: ["Dedicated Instance Setup", "Edge Node Syncing", "Single Sign-On Integration"],
  },
  {
    step: "03",
    title: "Legacy Data Reconciliation",
    duration: "Week 5–6",
    accent: "#8B5CF6",
    description: "Automated sanitization and migration of historical ledger records, patient charts, SKUs, and student files with zero data loss.",
    deliverables: ["Historical Balance Check", "SKU Catalog Match", "100% Audit Reconciled"],
  },
  {
    step: "04",
    title: "User Role Training & Staging",
    duration: "Week 7–8",
    accent: "#10B981",
    description: "Interactive simulation training for cashiers, production floor managers, accountants, and doctors with role-tailored sandbox access.",
    deliverables: ["Operator Certifications", "Custom SOP Playbooks", "End-to-End Sandbox Pass"],
  },
  {
    step: "05",
    title: "Parallel Run & Cutover",
    duration: "Week 9",
    accent: "#0EA5E9",
    description: "Operating ZamNexus in tandem with existing legacy tools for 7 days to verify penny-perfect matching before complete switchover.",
    deliverables: ["Parallel Verification", "Zero Downtime Cutover", "Live Production Certification"],
  },
  {
    step: "06",
    title: "Continuous 24/7 Evolution",
    duration: "Ongoing",
    accent: "#EC4899",
    description: "Proactive telemetry monitoring, microservices auto-scaling, quarterly module enhancements, and 24/7 critical tier-1 support.",
    deliverables: ["< 15min Emergency SLA", "Quarterly Feature Releases", "Dedicated TAM Account"],
  },
];

const clientMarquee = [
  "Grays Pharmaceutical",
  "Lotus Pharmaceuticals",
  "Panacea Pharmaceuticals",
  "Khyber Textile Mills",
  "National Tariff Commission",
  "750+ Live Retail Outlets",
  "Regional Education Trust",
  "Specialist Diagnostic Network",
];

// ─── Hydration-Safe Animated Number Counter ─────────────────────────────────

function AnimatedStat({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });

  useEffect(() => {
    if (value === "∞") {
      setDisplay("∞");
      return;
    }
    const num = parseInt(value.replace(/\D/g, ""), 10);
    if (isNaN(num) || !inView) return;

    const duration = 1200;
    const startTime = performance.now();
    const hasPlus = value.includes("+");

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * num);
      setDisplay(`${current}${hasPlus ? "+" : ""}`);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplay(value);
      }
    };
    const id = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(id);
  }, [inView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

// ─── Interactive Product Scene (Clean Staggered Animation like Services) ────

function ProductScene({
  engine,
  isActive,
}: {
  engine: ProductEngine;
  isActive: boolean;
}) {
  const [activeStepIdx, setActiveStepIdx] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<"capabilities" | "workflow">("capabilities");
  const activePhase = engine.workflow[activeStepIdx] || engine.workflow[0];

  // Auto-play workflow runner if enabled
  useEffect(() => {
    if (!isAutoPlaying || !isActive) return;
    const interval = setInterval(() => {
      setActiveStepIdx((prev) => (prev < engine.workflow.length - 1 ? prev + 1 : 0));
    }, 2800);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isActive, engine.workflow.length]);

  return (
    <motion.div
      id={`product-stage-${engine.id}`}
      className="min-h-[85vh] flex items-center py-20 relative border-b border-zinc-800/40 last:border-b-0"
      initial={{ opacity: 0.35 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false, margin: "-120px" }}
      transition={{ duration: 0.6 }}
    >
      {/* Dynamic Ambient Spotlight */}
      <motion.div
        className="absolute inset-0 pointer-events-none -z-10"
        animate={{
          opacity: isActive ? 1 : 0.2,
        }}
        transition={{ duration: 0.6 }}
        style={{
          background: `radial-gradient(ellipse 65% 55% at 75% 50%, color-mix(in srgb, ${engine.accent} ${isActive ? "10%" : "3%"}, transparent) 0%, transparent 70%)`,
        }}
        aria-hidden="true"
      />

      {/* Side Active Indicator Line */}
      <motion.div
        className="absolute left-0 top-[10%] bottom-[10%] w-[3px] rounded-full"
        style={{ background: engine.accent }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{
          scaleY: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start w-full">
        
        {/* Left Column: Brand, Narrative, Metrics & CTAs */}
        <div className="lg:col-span-7">
          {/* Header Tag with Icon and Logo */}
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 shadow-md flex items-center gap-2.5">
              <span className="text-xl font-mono" style={{ color: engine.accent }}>
                {engine.icon}
              </span>
              <Image
                src={engine.logo}
                alt={`${engine.code} Logo`}
                width={110}
                height={32}
                className="h-6 w-auto object-contain"
              />
            </div>
            <div>
              <span
                className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold block"
                style={{ color: engine.accent }}
              >
                {engine.tag}
              </span>
              <span className="text-xs font-mono text-zinc-600">{engine.index} / 04</span>
            </div>
          </motion.div>

          {/* Large Hero Title */}
          <motion.h3
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-2"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {engine.code}
          </motion.h3>

          <div className="text-lg sm:text-xl font-medium text-zinc-300 mb-4">
            {engine.name}
          </div>

          {/* Descriptive Narrative */}
          <motion.p
            className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-xl mb-6"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {engine.headline}
          </motion.p>

          {/* Real-World Stat Card & Target Industries */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-3.5 px-4 py-2.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-sm">
              <div className="text-2xl font-extrabold font-mono" style={{ color: engine.accent }}>
                <AnimatedStat value={engine.stat} />
              </div>
              <div>
                <div className="text-xs font-mono text-zinc-300 font-semibold leading-tight">
                  {engine.statLabel}
                </div>
                <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live Cluster Operational
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {engine.targetIndustries.map((ind) => (
                <span
                  key={ind}
                  className="px-2.5 py-1 rounded-md text-[10px] font-mono bg-zinc-950/70 border border-zinc-800/80 text-zinc-400"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <motion.div
            className="flex flex-wrap items-center gap-3"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <Link
              href={engine.href}
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-300 hover:gap-4 hover:shadow-lg"
              style={{
                background: engine.accent,
                boxShadow: `0 0 30px color-mix(in srgb, ${engine.accent} 30%, transparent)`,
              }}
            >
              <span>Explore {engine.code} Architecture</span>
              <span aria-hidden="true">→</span>
            </Link>

            <Link
              href="/Contact"
              className="px-5 py-3.5 rounded-full border border-zinc-800 hover:border-zinc-600 bg-zinc-900/40 hover:bg-zinc-800/50 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
            >
              Discuss {engine.code} →
            </Link>
          </motion.div>
        </div>

        {/* Right Column: Clean Staggered Capabilities (like Services page) + 4-Phase Flow */}
        <div className="lg:col-span-5">
          {/* Header Switcher: Capabilities vs 4-Phase Flow */}
          <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3 mb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 pl-1">
              {viewMode === "capabilities"
                ? `${engine.capabilities.length} Core Capabilities`
                : "4-Phase Production Flow"}
            </span>

            <div className="flex items-center gap-1 p-1 rounded-xl bg-zinc-950 border border-zinc-800/80">
              <button
                type="button"
                onClick={() => setViewMode("capabilities")}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  viewMode === "capabilities"
                    ? "bg-zinc-800 text-white shadow-sm font-semibold"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
                style={{
                  color: viewMode === "capabilities" ? engine.accent : undefined,
                }}
              >
                ✦ Capabilities ({engine.capabilities.length})
              </button>
              <button
                type="button"
                onClick={() => setViewMode("workflow")}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                  viewMode === "workflow"
                    ? "bg-zinc-800 text-white shadow-sm font-semibold"
                    : "text-zinc-500 hover:text-zinc-300"
                }`}
                style={{
                  color: viewMode === "workflow" ? engine.accent : undefined,
                }}
              >
                ⚡ 4-Phase Flow
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {viewMode === "capabilities" ? (
              /* Staggered Animated Capabilities (exactly like Services page) */
              <motion.div
                key="capabilities-view"
                className="space-y-3"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-80px" }}
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
                }}
                exit={{ opacity: 0, y: -10 }}
              >
                {engine.capabilities.map((cap) => (
                  <motion.div
                    key={cap}
                    className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-zinc-800/50 bg-zinc-900/40 backdrop-blur-sm text-sm text-zinc-300 hover:text-white hover:border-opacity-100 transition-all duration-300 cursor-default group"
                    style={{
                      ["--cap-accent" as string]: engine.accent,
                    }}
                    variants={{
                      hidden: { opacity: 0, x: 40, scale: 0.9 },
                      visible: {
                        opacity: 1,
                        x: 0,
                        scale: 1,
                        transition: { type: "spring", stiffness: 200, damping: 22 },
                      },
                    }}
                    whileHover={{
                      x: 6,
                      borderColor: engine.accent,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-transform duration-300 group-hover:scale-150"
                      style={{
                        background: engine.accent,
                        boxShadow: `0 0 8px ${engine.accent}`,
                      }}
                    />
                    <span className="leading-snug">{cap}</span>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              /* Interactive 4-Phase Workflow Rail & Equalizer */
              <motion.div
                key="workflow-view"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-4"
              >
                {/* Auto-runner control */}
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400 pb-1">
                  <span>Interactive Phase Simulation</span>
                  <button
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="px-2.5 py-1 rounded-full border text-[11px] font-mono transition-all flex items-center gap-1.5 cursor-pointer"
                    style={{
                      borderColor: isAutoPlaying ? engine.accent : "#27272a",
                      background: isAutoPlaying ? `color-mix(in srgb, ${engine.accent} 15%, transparent)` : "#18181b",
                      color: isAutoPlaying ? engine.accent : "#a1a1aa",
                    }}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isAutoPlaying ? "animate-pulse" : ""}`} style={{ background: isAutoPlaying ? engine.accent : "#71717a" }} />
                    <span>{isAutoPlaying ? "Auto-Flow Playing ⏸" : "Auto-Run Flow ▶"}</span>
                  </button>
                </div>

                {/* 4-Phase Stepper with Connected SVG Beam */}
                <div className="relative">
                  <div className="hidden sm:block absolute top-1/2 left-4 right-4 h-[2px] -translate-y-1/2 bg-zinc-800 -z-0 pointer-events-none">
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, transparent, ${engine.accent}, transparent)`,
                        boxShadow: `0 0 10px ${engine.accent}`,
                      }}
                      animate={{
                        x: ["0%", "100%"],
                        opacity: [0.3, 1, 0.3],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 2.2,
                        ease: "easeInOut",
                      }}
                    />
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 relative z-10">
                    {engine.workflow.map((phase, idx) => {
                      const isCurrent = idx === activeStepIdx;
                      return (
                        <button
                          key={phase.id}
                          onClick={() => {
                            setActiveStepIdx(idx);
                            setIsAutoPlaying(false);
                          }}
                          className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer relative overflow-hidden group ${
                            isCurrent
                              ? "bg-zinc-800/95 shadow-xl"
                              : "bg-zinc-950/70 hover:bg-zinc-900/70 border-zinc-800/80 backdrop-blur-sm"
                          }`}
                          style={{
                            borderColor: isCurrent ? engine.accent : undefined,
                            boxShadow: isCurrent ? `0 0 20px ${engine.accent}30` : undefined,
                          }}
                        >
                          {isCurrent && (
                            <motion.div
                              layoutId={`mini-workflow-pill-${engine.id}`}
                              className="absolute top-0 left-0 right-0 h-[2.5px]"
                              style={{ background: engine.accent }}
                              transition={{ type: "spring", stiffness: 350, damping: 30 }}
                            />
                          )}

                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[10px] font-mono font-bold" style={{ color: isCurrent ? engine.accent : "#71717a" }}>
                              PHASE 0{idx + 1}
                            </span>
                            <span className="text-[9px] font-mono text-zinc-500">
                              {isCurrent ? "● ACTIVE" : "QUEUE"}
                            </span>
                          </div>

                          <div
                            className={`text-xs font-bold font-mono truncate transition-colors ${
                              isCurrent ? "text-white" : "text-zinc-400 group-hover:text-zinc-200"
                            }`}
                          >
                            {phase.shortTitle}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Workflow Live Action Box with Waveform */}
                <motion.div
                  key={activePhase.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-5 sm:p-6 rounded-2xl bg-zinc-900/70 border border-zinc-800/90 backdrop-blur-md shadow-2xl relative overflow-hidden"
                  style={{
                    borderLeftWidth: "3.5px",
                    borderLeftColor: engine.accent,
                  }}
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/60 pb-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="w-2 h-2 rounded-full" style={{ background: engine.accent }} />
                      <span className="text-xs font-mono font-bold text-white">
                        Phase {activePhase.step} · {activePhase.shortTitle}
                      </span>

                      {/* Animated Waveform Equalizer */}
                      <div className="hidden sm:flex items-center gap-0.5 ml-2">
                        {[0.8, 1.2, 0.6, 1.4, 0.9].map((height, i) => (
                          <motion.span
                            key={i}
                            animate={{ scaleY: [0.3, height, 0.3] }}
                            transition={{
                              repeat: Infinity,
                              duration: 1,
                              delay: i * 0.15,
                              ease: "easeInOut",
                            }}
                            className="w-1 h-3 rounded-full origin-bottom"
                            style={{ background: engine.accent }}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-zinc-500">{activePhase.telemetryLabel}:</span>
                      <span className="font-extrabold text-white" style={{ color: engine.accent }}>
                        {activePhase.telemetry}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed mb-4">
                    {activePhase.action}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-800/60 text-xs font-mono">
                    <Link
                      href={engine.href}
                      className="text-xs font-bold hover:underline inline-flex items-center gap-1.5"
                      style={{ color: engine.accent }}
                    >
                      <span>Launch Deep-Dive Console</span>
                      <span>→</span>
                    </Link>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setIsAutoPlaying(false);
                          setActiveStepIdx((prev) => (prev > 0 ? prev - 1 : engine.workflow.length - 1));
                        }}
                        className="px-2.5 py-1 rounded-lg border border-zinc-800 bg-zinc-950/70 hover:bg-zinc-800 text-zinc-400 hover:text-white text-[11px] font-mono cursor-pointer"
                      >
                        ←
                      </button>
                      <button
                        onClick={() => {
                          setIsAutoPlaying(false);
                          setActiveStepIdx((prev) => (prev < engine.workflow.length - 1 ? prev + 1 : 0));
                        }}
                        className="px-3 py-1 rounded-lg border text-white text-[11px] font-mono cursor-pointer"
                        style={{
                          background: `color-mix(in srgb, ${engine.accent} 25%, #18181b)`,
                          borderColor: `color-mix(in srgb, ${engine.accent} 50%, transparent)`,
                        }}
                      >
                        Next Phase →
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Horizontal Deployment Lifecycle Section (GSAP ScrollTrigger) ────────────

function HorizontalDeploymentPipeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!containerRef.current || !trackRef.current) return;
      const track = trackRef.current;
      const totalScroll = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -totalScroll,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: () => `+=${totalScroll}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      const cards = track.querySelectorAll(".h-deploy-card");
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0.35, scale: 0.9, rotateY: 6 },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "left 85%",
              end: "left 45%",
              scrub: 1,
            },
          }
        );
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="relative overflow-hidden border-t border-zinc-800/60 bg-[#090b10]">
      <div className="absolute top-0 left-0 right-0 z-20 px-8 sm:px-16 pt-12 pb-6 bg-gradient-to-b from-[#090b10] via-[#090b10]/95 to-transparent pointer-events-none">
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
          Deployment &amp; Lifecycle Architecture
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-2">
          From Architecture to Go-Live
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base mt-2 max-w-xl">
          A structured 6-stage delivery framework guaranteeing zero data loss, penny-perfect ledger balancing, and zero downtime cutover.
        </p>
      </div>

      <div
        ref={trackRef}
        className="flex items-center gap-8 px-8 sm:px-16 pt-44 pb-20 min-h-screen"
        style={{ width: `${deploymentPipeline.length * 420 + 260}px` }}
      >
        {deploymentPipeline.map((step) => (
          <div
            key={step.step}
            className="h-deploy-card flex-shrink-0 w-[360px] sm:w-[400px] p-8 rounded-3xl border border-zinc-800/70 bg-zinc-900/50 backdrop-blur-md relative overflow-hidden group"
            style={{ perspective: "800px" }}
          >
            <div
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${step.accent}, transparent)`,
              }}
            />

            <span className="absolute -top-3 -right-2 text-[110px] font-black font-mono text-white/[0.03] select-none leading-none pointer-events-none">
              {step.step}
            </span>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-sm font-bold font-mono border"
                  style={{
                    background: `color-mix(in srgb, ${step.accent} 12%, transparent)`,
                    borderColor: `color-mix(in srgb, ${step.accent} 35%, transparent)`,
                    color: step.accent,
                  }}
                >
                  {step.step}
                </div>
                <span className="text-xs font-mono px-2.5 py-1 rounded-full border border-zinc-800 bg-zinc-950/60 text-zinc-400">
                  {step.duration}
                </span>
              </div>

              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                {step.description}
              </p>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block mb-2">
                  Verified Deliverables:
                </span>
                <div className="space-y-1.5">
                  {step.deliverables.map((del) => (
                    <div key={del} className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: step.accent }} />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Products Hub Page Component ────────────────────────────────────────

export default function ProductsPage() {
  const [activeEngineIdx, setActiveEngineIdx] = useState(0);
  const enginesContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    productEngines.forEach((eng, i) => {
      const el = document.getElementById(`product-stage-${eng.id}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveEngineIdx(i);
        },
        { rootMargin: "-35% 0px -35% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div
      suppressHydrationWarning
      className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[var(--accent-hover)] selection:text-black overflow-x-hidden"
    >
      {/* Top Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-500 via-amber-500 via-violet-500 to-emerald-500 origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* Hexagonal Grid Matrix Backdrop */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="products-hex-grid" width="48" height="84" patternUnits="userSpaceOnUse" patternTransform="scale(1)">
              <path
                d="M 24 0 L 48 14 L 48 42 L 24 56 L 0 42 L 0 14 Z M 24 84 L 48 70 L 48 42 L 24 56 L 0 42 L 0 70 Z"
                fill="none"
                stroke="white"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#products-hex-grid)" />
        </svg>

        {/* Dynamic ambient color glow that shifts with active product */}
        <motion.div
          className="absolute top-[18%] left-[10%] w-[650px] h-[650px] rounded-full blur-[180px] pointer-events-none transition-all duration-1000"
          style={{
            background: `color-mix(in srgb, ${productEngines[activeEngineIdx].accent} 12%, transparent)`,
          }}
        />
        <div className="absolute bottom-[20%] right-[8%] w-[650px] h-[650px] rounded-full bg-emerald-600/[0.04] blur-[180px] pointer-events-none" />
      </div>

      <Navbar />

      <main className="relative z-10">

        {/* ── HERO: 4-ENGINE COCKPIT & SYSTEM TELEMETRY ─────────────────────── */}
        <section
          aria-labelledby="products-hero-heading"
          className="max-w-7xl mx-auto px-6 pt-40 pb-16 text-center flex flex-col items-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono font-medium text-[var(--accent-hover)] mb-8 backdrop-blur-xl shadow-lg"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-hover)] animate-pulse" />
            ZamNexus Enterprise Suite · 4 Industrial Cores
          </motion.div>

          <motion.h1
            id="products-hero-heading"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]"
          >
            Systems engineered for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-400 via-amber-400 to-emerald-400">
              mission-critical scale.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            Four purpose-built engines connected through a unified security and intelligence mesh.
            Select an engine to preview its workflow.
          </motion.p>

          {/* 4-Engine Cockpit Cards Grid */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-12 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {productEngines.map((engine, idx) => (
              <button
                key={engine.id}
                onClick={() => {
                  document
                    .getElementById(`product-stage-${engine.id}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className="p-4 sm:p-5 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/80 backdrop-blur-md transition-all duration-300 text-left group cursor-pointer relative overflow-hidden"
              >
                <div
                  className="absolute top-0 left-0 right-0 h-[2.5px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${engine.accent}, transparent)`,
                  }}
                />

                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-zinc-950/80 border border-zinc-800">
                    <Image
                      src={engine.logo}
                      alt={engine.code}
                      width={90}
                      height={26}
                      className="h-5 w-auto object-contain"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">0{idx + 1} // 04</span>
                </div>

                <div className="font-mono text-sm font-bold text-white group-hover:text-[var(--accent-hover)] transition-colors">
                  {engine.code}
                </div>
                <div className="text-xs font-mono text-zinc-400 truncate mt-0.5">
                  {engine.name}
                </div>

                <div className="mt-3 pt-2.5 border-t border-zinc-800/60 flex items-center justify-between text-[10px] font-mono">
                  <span className="text-zinc-500">4-Phase Flow</span>
                  <span style={{ color: engine.accent }}>{engine.stat} {engine.statLabel.split(" ")[0]}</span>
                </div>
              </button>
            ))}
          </motion.div>
        </section>

        {/* ── FLAGSHIP ENGINE STAGES WITH STICKY NAVIGATOR ─────────────────── */}
        <section
          id="engines-deck"
          aria-labelledby="flagship-engines-heading"
          className="relative border-t border-zinc-800/60"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-10">
            {/* Section Header like Services Page */}
            <motion.div
              className="pt-20 pb-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 id="flagship-engines-heading" className="sr-only">
                Flagship Enterprise Platforms
              </h2>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
                What We Build
              </span>
              <p className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3">
                Four Cores Engineered for Scale
              </p>
              <p className="mt-4 text-zinc-400 max-w-2xl text-base leading-relaxed">
                Scroll through each platform to explore its full capabilities — from shop-floor MES formulation to sub-second retail mesh and clinical EHR.
              </p>
            </motion.div>
            
            {/* Stage Grid with Sticky Sidebar */}
            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0" ref={enginesContainerRef}>
              
              {/* Sticky Sidebar Navigation — Desktop Only */}
              <div className="hidden lg:block lg:col-span-3">
                <div className="sticky top-32 space-y-1 pr-6 border-r border-zinc-800/40">
                  {productEngines.map((p, i) => (
                    <button
                      key={p.id}
                      onClick={() => {
                        document
                          .getElementById(`product-stage-${p.id}`)
                          ?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                      className={`w-full text-left px-4 py-3.5 rounded-xl transition-all duration-300 group relative cursor-pointer ${
                        activeEngineIdx === i
                          ? "bg-zinc-900/60"
                          : "hover:bg-zinc-900/30"
                      }`}
                    >
                      {/* Active indicator */}
                      <motion.div
                        className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full"
                        style={{ background: p.accent }}
                        initial={false}
                        animate={{
                          scaleY: activeEngineIdx === i ? 1 : 0,
                          opacity: activeEngineIdx === i ? 1 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                      <div className="flex items-center gap-3">
                        <span
                          className="text-base font-mono transition-colors duration-300"
                          style={{ color: activeEngineIdx === i ? p.accent : "#52525b" }}
                        >
                          {p.icon}
                        </span>
                        <div>
                          <div className={`text-xs font-mono transition-colors duration-300 ${
                            activeEngineIdx === i ? "text-zinc-400" : "text-zinc-600"
                          }`}>
                            {p.index} // 04
                          </div>
                          <div className={`text-sm font-semibold leading-tight transition-colors duration-300 ${
                            activeEngineIdx === i ? "text-white" : "text-zinc-500"
                          }`}>
                            {p.code}
                          </div>
                          <div className="text-[11px] font-mono text-zinc-500 truncate mt-0.5">
                            {p.name.split(" ").slice(0, 2).join(" ")}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrollable Product Scenes */}
              <div className="lg:col-span-9 lg:pl-10">
                {productEngines.map((engine, idx) => (
                  <ProductScene
                    key={engine.id}
                    engine={engine}
                    isActive={activeEngineIdx === idx}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── HORIZONTAL DEPLOYMENT & LIFECYCLE PIPELINE (GSAP PINNED) ──────── */}
        <HorizontalDeploymentPipeline />

        {/* ── CLIENT TRUST MARQUEE ─────────────────────────────────────────── */}
        <section
          aria-labelledby="marquee-heading"
          className="border-t border-zinc-800/60 border-b border-zinc-800/60 py-14 overflow-hidden relative bg-zinc-950/40 backdrop-blur-sm"
        >
          <div className="max-w-6xl mx-auto px-6 text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold">
              Trusted By Regulated Industries &amp; High-Volume Retail
            </span>
            <h2 id="marquee-heading" className="sr-only">
              Verified Enterprise Clients
            </h2>
          </div>

          <div className="flex overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
              className="flex items-center gap-12 whitespace-nowrap flex-shrink-0"
            >
              {[...clientMarquee, ...clientMarquee].map((client, idx) => (
                <div
                  key={`${client}-${idx}`}
                  className="flex items-center gap-3 text-sm sm:text-base font-mono font-semibold text-zinc-400 hover:text-white transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-hover)]" />
                  <span>{client}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── HIGH-CONVERSION BOTTOM CTA ───────────────────────────────────── */}
        <section
          aria-labelledby="products-cta-heading"
          className="max-w-6xl mx-auto px-6 py-24"
        >
          <div className="rounded-3xl bg-gradient-to-br from-zinc-900/90 via-zinc-900/60 to-zinc-950 border border-zinc-800 p-10 sm:p-16 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
                Deploy with Total Confidence
              </span>
              <h2
                id="products-cta-heading"
                className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3 leading-tight"
              >
                Experience the Product Suite in Action
              </h2>
              <p className="mt-4 text-zinc-400 text-base leading-relaxed">
                Schedule a dedicated 30-minute demonstration tailored to your exact operational requirements.
                See how ZNXERP, ZNXePOS, ZNXEdu, or ZNXCare seamlessly maps to your workflow.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                  <Link href="/Contact" className="liquid-lime-btn text-base py-4 px-8">
                    <span>Schedule Executive Demo</span>
                    <span className="arrow-icon w-8 h-8 text-sm" aria-hidden="true">→</span>
                  </Link>
                </motion.div>
                <Link
                  href="/Solutions"
                  className="px-7 py-4 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-semibold text-sm transition-colors"
                >
                  Explore Solutions Architecture →
                </Link>
              </div>
            </div>

            {/* SLA Badge Panel */}
            <div className="w-full lg:w-80 p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold border-b border-zinc-800/60 pb-3">
                Deployment Assurance
              </div>
              {[
                { title: "Zero-Downtime Migration", sub: "Parallel ledger verification" },
                { title: "24/7 Priority Support", sub: "< 15 minute critical response" },
                { title: "Custom Module Extensions", sub: "Tailored to regulatory needs" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 text-xs">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <div className="font-semibold text-zinc-200">{item.title}</div>
                    <div className="text-zinc-500 text-[11px] font-mono">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
