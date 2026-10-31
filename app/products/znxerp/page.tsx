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
import { productFaqs } from "@/lib/productFaqs";
import { ProductStats, ProductClients, ProductAudience, ProductFaq, IllustrativeNote } from "@/components/ProductSections";

const ACCENT = "#3B82F6";

// ─── 4-Stage Industrial Production Lifecycle Workflow ────────────────────────

const industrialWorkflow = [
  {
    step: "01",
    phase: "RAW MATERIAL INWARD & QC",
    title: "Gate Inward, PO Match & Quarantine Sampling",
    desc: "Every raw material shipment arriving at logistics bays is immediately cross-referenced against approved POs. An automated Goods Received Note (GRN) is generated, barcode bin tags are issued, and a spectrometer QC sampling ticket is dispatched to the laboratory.",
    telemetry: "< 4 min",
    telemetryLabel: "Gate to Lab Sampling",
    subsystems: ["MOD-PRC Procurement", "MOD-QC Spectrometer Lab", "MOD-WMS Inward"],
    outputs: ["Barcoded Binning ID", "Digital Quarantine Lock", "Automated Supplier GRN"],
  },
  {
    step: "02",
    phase: "MES SHOP FLOOR FORMULATION",
    title: "Batch BOM Locking, Machine Scheduling & Yield Optimization",
    desc: "Once quarantine release is approved, production work orders scale the Bill of Materials (BOM) dynamically. High-speed blending or weaving machines receive automated operating recipes, while shop-floor sensors record cycle times, energy draw, and scrap yield in real time.",
    telemetry: "99.2%",
    telemetryLabel: "Shop-Floor Material Yield",
    subsystems: ["MOD-MES Formulation", "MOD-PLN Routing", "MOD-MNT Machine Logs"],
    outputs: ["Batch Recipe Calibration", "Zero Formula Drift", "Live Factory Scrap Telemetry"],
  },
  {
    step: "03",
    phase: "SMART WMS & DISPATCH",
    title: "Automated Binning, FIFO Lot Allocation & Carrier Dispatch",
    desc: "Quality Control verifies finished goods and signs off on the digital Certificate of Analysis (COA). Batches are dynamically routed to zoned racks, allocated to open client orders using strict FIFO rules, and consolidated into cross-docking delivery challans.",
    telemetry: "0.0%",
    telemetryLabel: "Picking Error Rate",
    subsystems: ["MOD-WMS Zoned Racks", "MOD-LOG Fleet Dispatch", "MOD-BAR Barcode Binning"],
    outputs: ["Digital COA Certificate", "FIFO Reservation Lock", "Consolidated Delivery Note"],
  },
  {
    step: "04",
    phase: "CONSOLIDATED LEDGERS",
    title: "Instant Multi-Currency Invoicing & Real-Time Financial Posting",
    desc: "Destination confirmation triggers immediate double-entry ledger postings: Cost of Goods Sold (COGS) is debited, inventory accounts decrease, and revenue is credited across multi-currency ledgers with zero manual journal friction or month-end reconciliation delay.",
    telemetry: "< 1 sec",
    telemetryLabel: "Ledger Posting Across Entities",
    subsystems: ["MOD-FIN General Ledgers", "MOD-TAX Compliance", "MOD-MIS Executive Feeds"],
    outputs: ["Penny-Perfect P&L Balance", "100% Immutable Audit Trail", "Real-Time Balance Sheet"],
  },
];

// ─── 8-Module Integrated Grid ────────────────────────────────────────────────

const modules = [
  {
    icon: "💰",
    code: "MOD-FIN",
    label: "Finance & Multi-Ledgers",
    desc: "Real-time P&L, multi-currency general ledgers, accounts payable/receivable, and automated tax compliance.",
    bullets: ["Instant Balance Sheet", "Audit-Ready Trail", "Bank Reconciliation"],
  },
  {
    icon: "👥",
    code: "MOD-HRM",
    label: "Human Resources & Payroll",
    desc: "Automated salary disbursements, tax deductions, biometric attendance, and staff performance grading.",
    bullets: ["One-Click Payroll Run", "Leave & Shift Matrix", "Statutory Compliance"],
  },
  {
    icon: "📦",
    code: "MOD-PRC",
    label: "Procurement & PO Workflows",
    desc: "Multi-tier approval matrices, vendor scoring, automated purchase requisitions, and price history.",
    bullets: ["Automated PO Routing", "Vendor B2B Portal", "Budget Guardrails"],
  },
  {
    icon: "🏭",
    code: "MOD-WMS",
    label: "Inventory & Smart Warehouse",
    desc: "Multi-location warehouse tracking, automated batch & serial numbers, and dynamic reorder triggers.",
    bullets: ["Barcoded Binning", "FIFO / LIFO Rules", "Cross-Docking Dispatch"],
  },
  {
    icon: "⚙️",
    code: "MOD-MES",
    label: "Manufacturing Execution (MES)",
    desc: "BOM formulation, machine scheduling, shop-floor yield tracking, and scrap reduction analytics.",
    bullets: ["Dynamic BOM Formula", "WIP Routing", "Machine Uptime Logs"],
  },
  {
    icon: "📈",
    code: "MOD-CRM",
    label: "Sales Pipeline & CRM",
    desc: "B2B client management, automated quotation generation, delivery orders, and customer credit limits.",
    bullets: ["Quote-to-Invoice Flow", "Credit Control Engine", "Contract Tracking"],
  },
  {
    icon: "✅",
    code: "MOD-QAC",
    label: "Quality Assurance & QC",
    desc: "Incoming raw material sampling, in-process testing checkpoints, and automated COA generation.",
    bullets: ["COA Generation", "Non-Conformance Logs", "Sample Quarantine"],
  },
  {
    icon: "📊",
    code: "MOD-MIS",
    label: "Executive MIS Analytics",
    desc: "High-level visual KPI feeds, drill-down financial analytics, and predictive cash-flow modeling.",
    bullets: ["Real-Time EBITDA", "Plant Yield Metrics", "Role-Based Data Feeds"],
  },
];

// ─── Live Telemetry Simulator Tabs ───────────────────────────────────────────

const simulatorTabs = [
  {
    id: "manufacturing",
    label: "Plant Floor (MES)",
    badge: "Batch #4092 Active",
    data: {
      "Formulation Status": "Verified (QC Passed)",
      "Machine Utilization": "94.6% Efficiency",
      "Batch Cycle Time": "3.8 hrs (-18% vs avg)",
      "Yield Optimization": "99.2% Material Utilized",
    },
  },
  {
    id: "supply-chain",
    label: "Supply & Inventory",
    badge: "4 Warehouses Synced",
    data: {
      "Total Stock Value": "$4.82M Real-Time",
      "Automated POs": "18 Pending Approval",
      "Critical Stockouts": "0 Detected",
      "Warehouse Latency": "< 45ms Local Node",
    },
  },
  {
    id: "financials",
    label: "Consolidated Ledgers",
    badge: "Month-End Automated",
    data: {
      "Real-Time P&L": "Calculated Live",
      "Multi-Currency": "USD / EUR / GBP / PKR",
      "Audit Trail": "100% Immutable Log",
      "Cash Flow Forecast": "98.7% Model Accuracy",
    },
  },
];


export default function ZNXERPPage() {
  const [activeWorkflowIdx, setActiveWorkflowIdx] = useState(0);
  // The lifecycle plays through on its own until someone picks a stage
  const [stageTouched, setStageTouched] = useState(false);
  const [activeTabId, setActiveTabId] = useState(simulatorTabs[0].id);
  const activeTab = simulatorTabs.find((t) => t.id === activeTabId) || simulatorTabs[0];
  const activeFlow = industrialWorkflow[activeWorkflowIdx];

  return (
    <div
      suppressHydrationWarning
      className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[#3B82F6] selection:text-white overflow-x-clip"
      style={{ "--rail": ACCENT } as CSSProperties}
    >
      {/* Background Cyber Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="erp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#erp-grid)" />
        </svg>

        {/* Ambient Halos */}
        <div className="absolute top-[15%] left-[5%] w-[650px] h-[650px] rounded-full bg-blue-600/[0.06] blur-[180px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[8%] w-[600px] h-[600px] rounded-full bg-cyan-600/[0.04] blur-[180px] pointer-events-none" />
      </div>

      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="erp-hero-heading"
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
              ZNXERP
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <div data-enter="2" className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-mono font-bold text-blue-400 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                ZNXERP · Enterprise resource planning
              </div>

              <h1
                id="erp-hero-heading"
                className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-6"
              >
                <SplitWords mode="load" text="Run your whole plant on one system, from gate to general ledger." />
              </h1>

              <p data-enter="4" className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
                ZNXERP connects procurement, quality control, production, warehousing, finance and HR for manufacturers, pharmaceutical plants and distributors, so every batch, stock movement and transaction is traceable.
              </p>

              <div data-enter="5" className="flex flex-wrap items-center gap-4">
                <a href="#demo-form" className="liquid-lime-btn text-sm py-3.5 px-7">
                  <span>Request a ZNXERP demo</span>
                  <span className="arrow-icon w-7 h-7 text-xs" aria-hidden="true">→</span>
                </a>
                <a
                  href="#workflow-section"
                  className="px-6 py-3.5 rounded-full border border-zinc-700 hover:border-zinc-500 bg-zinc-900/50 text-zinc-300 hover:text-white text-sm font-semibold transition-all"
                >
                  Inspect Plant Workflow ↓
                </a>
              </div>
            </div>

            {/* The product's event flow, then confirmed figures only (lib/siteFacts.ts) */}
            <div data-enter="6" className="lg:col-span-5 space-y-6">
              <ProductScene slug="znxerp" />
              <ProductStats slug="znxerp" accent={ACCENT} />
            </div>
          </div>
        </section>

        {/* ── FOLLOW ONE EVENT (lib/catalog.ts flows) ───────────────────────── */}
        <FlowWalkthrough slug="znxerp" />

        {/* ── BESPOKE INDUSTRIAL PRODUCTION WORKFLOW CONSOLE ───────────────── */}
        <section
          id="workflow-section"
          aria-labelledby="workflow-heading"
          className="stage-auto max-w-7xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <Reveal variant="words" replay={false} className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
              Plant Operational Lifecycle
            </span>
            <h2
              id="workflow-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-2"
            >
              <SplitWords text="The Industrial Production Lifecycle" />
            </h2>
            <p className="reveal-sub text-zinc-400 text-sm sm:text-base mt-3">
              Trace the end-to-end journey of materials through raw quarantine, MES shop-floor batch formulation, WMS rack dispatch, and real-time ledger reconciliations.
            </p>
          </Reveal>

          {/* Workflow Stepper Navigation */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {industrialWorkflow.map((item, idx) => {
              const isCurrent = idx === activeWorkflowIdx;
              return (
                <button
                  key={item.step}
                  onClick={() => {
                    setActiveWorkflowIdx(idx);
                    setStageTouched(true);
                  }}
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
                  {isCurrent && !stageTouched ? (
                    <span
                      className="explorer__timer stage-timer"
                      aria-hidden="true"
                      onAnimationEnd={() => setActiveWorkflowIdx((activeWorkflowIdx + 1) % industrialWorkflow.length)}
                    />
                  ) : null}
                </button>
              );
            })}
          </div>

          {/* Progress through the lifecycle, up to the stage being shown */}
          <div className="stage-rail mb-8" aria-hidden="true">
            <span style={{ "--p": (activeWorkflowIdx + 1) / industrialWorkflow.length } as CSSProperties} />
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
                  <div className="text-xs font-mono font-bold tracking-wider text-blue-400 uppercase">
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
                    Subsystems Synchronized in this Phase:
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
                    Automated Verified Outputs:
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
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
              Operational Telemetry
            </span>
            <h2
              id="simulator-heading"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-2"
            >
              <SplitWords text="Interactive Operations Console" />
            </h2>
            <p className="reveal-sub text-zinc-400 text-sm mt-3">
              Simulate live telemetry across the shop floor, supply chain, and general ledgers.
            </p>
            <IllustrativeNote />
          </Reveal>

          <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/90 shadow-2xl relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/60 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ background: ACCENT }} />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  ZNX_ERP_CONSOLE // v4.8 NODE
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

            <span key={activeTab.id} className="console-scan" aria-hidden="true" />

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
                  <span className="text-zinc-400">Cluster Status:</span>
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
              <span>Encrypted Node Session · 256-bit TLS</span>
              <span className="text-emerald-400">● Live Operational</span>
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
            <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
              Subsystem Grid
            </span>
            <h2
              id="modules-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-2"
            >
              <SplitWords text="Eight Integrated Functional Modules" />
            </h2>
            <p className="reveal-sub text-zinc-400 text-sm sm:text-base mt-3">
              Every subsystem connects seamlessly to the central general ledger and production queue.
            </p>
          </Reveal>

          <div className="module-map">
          <Stagger className="module-map__row module-map__row--top grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.slice(0, 4).map((mod) => (
              <Spotlight key={mod.label} as="div" className="lift-card module-card p-6 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800" aria-hidden="true">
                      {mod.icon}
                    </span>
                    <span className="text-[10px] font-mono text-foreground-muted font-bold group-hover:text-blue-400">
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

          {/* The shared core every module reads and writes; its ports light as a module is hovered */}
          <div className="module-core">
            <div className="module-core__ports" aria-hidden="true">
              <span className="module-core__port module-core__port--t1" />
              <span className="module-core__port module-core__port--t2" />
              <span className="module-core__port module-core__port--t3" />
              <span className="module-core__port module-core__port--t4" />
              <span className="module-core__port module-core__port--b1" />
              <span className="module-core__port module-core__port--b2" />
              <span className="module-core__port module-core__port--b3" />
              <span className="module-core__port module-core__port--b4" />
            </div>
            <span className="module-core__pulse" aria-hidden="true" />
            <p className="module-core__text">
              <strong>ZNXERP core</strong>
              <span>Every module works on the same records, so nothing is entered twice.</span>
            </p>
          </div>

          <Stagger className="module-map__row module-map__row--bottom grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.slice(4).map((mod) => (
              <Spotlight key={mod.label} as="div" className="lift-card module-card p-6 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800" aria-hidden="true">
                      {mod.icon}
                    </span>
                    <span className="text-[10px] font-mono text-foreground-muted font-bold group-hover:text-blue-400">
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
          </div>
        </section>

        {/* ── CLIENTS (confirmed only), AUDIENCE, FAQ ─────────────────────── */}
        <ProductClients slug="znxerp" />

        <ProductAudience
          id="znxerp-audience"
          title="Built for operations that answer to auditors."
          items={[
            { title: "Pharmaceutical manufacturers", text: "Quarantine, QC sampling and batch traceability from goods-in to dispatch." },
            { title: "Textile and industrial plants", text: "Production planning, yield and machine utilisation on the same system as your ledgers." },
            { title: "Distributors", text: "Multi-warehouse stock, dispatch and receivables in one place." },
          ]}
        />

        <ProductFaq id="znxerp-faq" items={productFaqs.znxerp} />

        {/* ── DEMO REQUEST & CLOSING FORM ──────────────────────────────────── */}
        <section
          id="demo-form"
          aria-labelledby="demo-heading"
          className="max-w-4xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="p-8 sm:p-14 rounded-3xl bg-zinc-900/50 border border-zinc-800 shadow-2xl">
            <Reveal variant="words" replay={false} className="text-center mb-10">
              <span className="text-xs font-mono uppercase tracking-widest text-blue-400 font-bold">
                Deploy ZNXERP
              </span>
              <h2 id="demo-heading" className="text-3xl font-extrabold text-white mt-2">
                <SplitWords text="Request a ZNXERP demo" />
              </h2>
              <p className="reveal-sub text-zinc-400 text-sm mt-3">
                Tell us about your plant and we&apos;ll tailor the demo to your process.
              </p>
            </Reveal>

            <DemoRequestForm productName="ZNXERP" />
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
