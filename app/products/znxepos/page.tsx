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

const ACCENT = "#F59E0B";

// ─── 4-Stage Retail & Store Network Operational Workflow ─────────────────────

const retailWorkflow = [
  {
    step: "01",
    phase: "SUB-SECOND BARCODE SCAN",
    title: "Hardware-Accelerated Item Ringing & Dynamic Basket Pricing",
    desc: "Cashiers scan barcodes or weight-scale PLUs with instant 0.08s hardware response. The till engine automatically checks multi-buy deals, customer loyalty discount tiers, and real-time inventory reservation with zero typing delay.",
    telemetry: "0.08 sec",
    telemetryLabel: "Barcode Scan Latency",
    subsystems: ["MOD-POS Till Terminal", "MOD-PRC Matrix Engine", "MOD-LOY Loyalty Tier"],
    outputs: ["Sub-Second Line Item Ring", "Auto Tiered Promotion", "Live Cart Margin"],
  },
  {
    step: "02",
    phase: "MULTI-TENDER CHECKOUT",
    title: "Zero-Wait Card Link, Split Payments & WhatsApp Digital Receipts",
    desc: "Shoppers can split payment across credit cards, cash, gift cards, and loyalty reward balances. Integrated payment terminals respond immediately with zero wait, while thermal printers print receipts and send automated WhatsApp copies to customer phones.",
    telemetry: "100%",
    telemetryLabel: "Tender Reliability",
    subsystems: ["MOD-GWY Payment Terminal", "MOD-PRN Thermal Drivers", "MOD-MSG WhatsApp Link"],
    outputs: ["Split-Tender Settlement", "Digital WhatsApp Receipt", "Instant Cash Drawer Trigger"],
  },
  {
    step: "03",
    phase: "ZERO-DOWNTIME OFFLINE MESH",
    title: "Local SQLite Persistence & Automatic Cloud Delta Synchronization",
    desc: "If store fiber or 4G drops, registers automatically fall back to local SQLite storage. Cashiers keep ringing baskets uninterrupted. The moment connectivity restores, an encrypted background sync updates central multi-store inventory ledgers.",
    telemetry: "100%",
    telemetryLabel: "Offline Resilient Uptime",
    subsystems: ["MOD-SQL Edge Cache", "MOD-SYN Cloud Mesh", "MOD-STK Stock Balancing"],
    outputs: ["Zero Till Stalls on Internet Cut", "Multi-Master Conflict Resolution", "Cross-Branch Stock Update"],
  },
  {
    step: "04",
    phase: "BLIND SHIFT AUDIT & LEDGERS",
    title: "Cash Drawer Blind Reconciliation, Float Drops & SKU Gross Margins",
    desc: "At shift closeout, cashiers perform blind balancing without seeing expected totals, completely eliminating employee skimming. Mid-day safe drops are locked, and executive dashboards immediately display net revenue, profit margins per SKU, and store performance.",
    telemetry: "$0.00",
    telemetryLabel: "Cashier Variance Discrepancy",
    subsystems: ["MOD-AUD Cash Drawer", "MOD-LED Party Ledgers", "MOD-TEL Mobile Radar"],
    outputs: ["Zero-Skimming Blind Balancing", "Safe Cash Drop Validation", "Real-Time Net Profit per SKU"],
  },
];

// ─── 8-Module Integrated Retail Grid ─────────────────────────────────────────

const modules = [
  {
    icon: "⚡",
    code: "MOD-POS",
    label: "Cloud & Offline Point of Sale",
    desc: "Sub-second barcode scan execution, touch-optimized UI, split cash/card payments, and automated thermal printing.",
    bullets: ["< 0.12s Barcode Scan", "Zero-Wait Split Tenders", "ESC/POS Thermal Drivers"],
  },
  {
    icon: "🏬",
    code: "MOD-STK",
    label: "Multi-Branch Stock Matrix",
    desc: "Real-time stock balance across central hubs and retail branches with automated inter-store stock transfers.",
    bullets: ["Cross-Branch Visibility", "Batch & Expiry Controls", "Dynamic Reorder Triggers"],
  },
  {
    icon: "📡",
    code: "MOD-SYN",
    label: "Zero-Downtime Offline Engine",
    desc: "Local SQLite database ensures cashiers continue ringing transactions during internet cuts with background sync.",
    bullets: ["100% Offline Resilient", "Auto Conflict Resolution", "Encrypted Mesh Sync"],
  },
  {
    icon: "📑",
    code: "MOD-B2B",
    label: "Wholesale & Party Ledgers",
    desc: "Tiered wholesale pricing, customer credit balance limits, automated sales invoices, and supplier payables.",
    bullets: ["Credit Limit Guardrails", "Tiered Bulk Discounts", "Full Party Statements"],
  },
  {
    icon: "🛡️",
    code: "MOD-AUD",
    label: "Cashier Auditing & Till Shifts",
    desc: "Blind shift reconciliation, float balance tracking, mid-day cash drops, and cashier discrepancy logging.",
    bullets: ["Blind Shift Balancing", "Safe Cash Drops", "Theft & Variance Alerts"],
  },
  {
    icon: "🎁",
    code: "MOD-LOY",
    label: "Omnichannel Loyalty & CRM",
    desc: "Point accumulation across all branch visits, VIP customer profiles, SMS/WhatsApp receipts, and promotional campaigns.",
    bullets: ["Universal Loyalty ID", "Instant Digital Receipts", "Discount Rules Engine"],
  },
  {
    icon: "📊",
    code: "MOD-TEL",
    label: "Executive Mobile Telemetry",
    desc: "Live gross margins, hourly footfall metrics, top SKU velocity, and branch performance feeds on mobile.",
    bullets: ["Live Branch Revenue", "Gross Margin per SKU", "Fast/Dead Stock Alerts"],
  },
  {
    icon: "🏷️",
    code: "MOD-PRN",
    label: "Hardware Peripheral Ecosystem",
    desc: "Turnkey plug-and-play support for electronic weighing scales, pole displays, barcode labelers, and cash drawers.",
    bullets: ["Weighing Scale Link", "Custom Label Designer", "Multi-Till Cash Drawers"],
  },
];

// ─── Live Telemetry Simulator Tabs ───────────────────────────────────────────

const simulatorTabs = [
  {
    id: "checkout",
    label: "Till Lane #04",
    badge: "Hardware Scanner Synced",
    data: {
      "Barcode Latency": "0.08s (Hardware Direct)",
      "Active Basket": "6 Items · Total $184.50",
      "Split Tender": "Card $100.00 / Cash $84.50",
      "Receipt Dispatch": "Instant ESC/POS Print + WhatsApp",
    },
  },
  {
    id: "inventory",
    label: "Store Stock Mesh",
    badge: "4 Hubs Synchronized",
    data: {
      "Central Hub Stock": "18,420 Units Available",
      "Branch North (Mall)": "480 Units (Low Stock Alert)",
      "Branch South (HQ)": "1,240 Units (Optimal)",
      "Inter-Store Transfer": "TR-9042 In Transit (120 units)",
    },
  },
  {
    id: "radar",
    label: "Sales & Margin Radar",
    badge: "Live Ledger Reconciled",
    data: {
      "Today's Turnover": "$28,490.00 Net",
      "Average Gross Margin": "34.2% Blended",
      "Fastest Velocity SKU": "Organic Arabica Beans (84 sold)",
      "Shift Variance": "$0.00 Discrepancy",
    },
  },
];


export default function ZNXePOSPage() {
  const [activeWorkflowIdx, setActiveWorkflowIdx] = useState(0);
  const [activeTabId, setActiveTabId] = useState(simulatorTabs[0].id);
  const activeTab = simulatorTabs.find((t) => t.id === activeTabId) || simulatorTabs[0];
  const activeFlow = retailWorkflow[activeWorkflowIdx];

  return (
    <div
      suppressHydrationWarning
      className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[#F59E0B] selection:text-black overflow-x-clip"
      style={{ "--rail": ACCENT } as CSSProperties}
    >
      {/* Background Cyber Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="epos-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#epos-grid)" />
        </svg>

        {/* Ambient Halos */}
        <div className="absolute top-[15%] left-[5%] w-[650px] h-[650px] rounded-full bg-amber-600/[0.06] blur-[180px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[8%] w-[600px] h-[600px] rounded-full bg-orange-600/[0.04] blur-[180px] pointer-events-none" />
      </div>

      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="epos-hero-heading"
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
              ZNXePOS
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7">
              <div data-enter="2" className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-xs font-mono font-bold text-amber-400 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                ZNXePOS · Retail point of sale
              </div>

              <h1
                id="epos-hero-heading"
                className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.08] mb-6"
              >
                <SplitWords mode="load" text="Checkout that never stops, and stock you can trust across every branch." />
              </h1>

              <p data-enter="4" className="text-zinc-400 text-base sm:text-lg leading-relaxed max-w-2xl mb-8">
                ZNXePOS runs the till, stock, promotions and wholesale accounts for supermarkets, retail chains and distributors. Tills keep trading when the internet drops and sync automatically when it&apos;s back.
              </p>

              <div data-enter="5" className="flex flex-wrap items-center gap-4">
                <a href="#demo-form" className="liquid-lime-btn text-sm py-3.5 px-7">
                  <span>Request a ZNXePOS demo</span>
                  <span className="arrow-icon w-7 h-7 text-xs" aria-hidden="true">→</span>
                </a>
                <a
                  href="#workflow-section"
                  className="px-6 py-3.5 rounded-full border border-zinc-700 hover:border-zinc-500 bg-zinc-900/50 text-zinc-300 hover:text-white text-sm font-semibold transition-all"
                >
                  Inspect Store Workflow ↓
                </a>
              </div>
            </div>

            {/* The product's event flow, then confirmed figures only (lib/siteFacts.ts) */}
            <div data-enter="6" className="lg:col-span-5 space-y-6">
              <ProductScene slug="znxepos" />
              <ProductStats slug="znxepos" accent={ACCENT} />
            </div>
          </div>
        </section>

        {/* ── FOLLOW ONE EVENT (lib/catalog.ts flows) ───────────────────────── */}
        <FlowWalkthrough slug="znxepos" />

        {/* ── BESPOKE RETAIL CHECKOUT & STORE WORKFLOW CONSOLE ─────────────── */}
        <section
          id="workflow-section"
          aria-labelledby="workflow-heading"
          className="max-w-7xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <Reveal variant="words" replay={false} className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              Retail Transaction Lifecycle
            </span>
            <h2
              id="workflow-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-2"
            >
              <SplitWords text="The High-Velocity Retail Pipeline" />
            </h2>
            <p className="reveal-sub text-zinc-400 text-sm sm:text-base mt-3">
              How ZNXePOS accelerates checkout throughput, ensures offline continuity during connectivity drops, and prevents till variance.
            </p>
          </Reveal>

          {/* Stepper Buttons */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
            {retailWorkflow.map((item, idx) => {
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
            <span style={{ "--p": (activeWorkflowIdx + 1) / retailWorkflow.length } as CSSProperties} />
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
                  <div className="text-xs font-mono font-bold tracking-wider text-amber-400 uppercase">
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
                    Verified Store Outputs:
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
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              Retail Telemetry Engine
            </span>
            <h2
              id="simulator-heading"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-2"
            >
              <SplitWords text="Interactive ePOS Till Simulator" />
            </h2>
            <p className="reveal-sub text-zinc-400 text-sm mt-3">
              Experience the sub-second response time across retail checkout lanes, cross-branch transfers, and margin tracking.
            </p>
            <IllustrativeNote />
          </Reveal>

          <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-zinc-950/80 border border-zinc-800/90 shadow-2xl relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-800/60 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full animate-ping" style={{ background: ACCENT }} />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  ZNX_EPOS_LANE // TERMINAL #04
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
                  <span className="text-zinc-400">Till Status:</span>
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
              <span>Local SQLite Buffer · Multi-Master Synchronization</span>
              <span className="text-emerald-400">● 100% Till Online</span>
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
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              Subsystem Grid
            </span>
            <h2
              id="modules-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-2"
            >
              <SplitWords text="Eight Integrated Retail Modules" />
            </h2>
            <p className="reveal-sub text-zinc-400 text-sm sm:text-base mt-3">
              Engineered to handle high basket throughput, inventory shrinkage prevention, and automated ledgers.
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
                    <span className="text-[10px] font-mono text-foreground-muted font-bold group-hover:text-amber-400">
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
        <ProductClients slug="znxepos" />

        {/* ── OFFLINE BY DESIGN ────────────────────────────────────────────── */}
        <section aria-labelledby="offline-heading" className="max-w-6xl mx-auto px-4 sm:px-6 py-20 border-t border-zinc-800/60">
          <Reveal variant="words" replay={false}>
            <p className="reveal-sub text-xs font-mono uppercase tracking-widest font-bold text-accent-text">Offline by design</p>
            <h2 id="offline-heading" className="mt-3 font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground-strong max-w-3xl">
              <SplitWords text="Your tills keep selling when the connection doesn't." />
            </h2>
            <p className="reveal-sub mt-4 text-foreground-muted leading-relaxed max-w-3xl">
              Each till keeps its own local database. Sales, returns and receipts carry on during an outage, and everything
              syncs to head office when the connection returns, without duplicate or lost transactions.
            </p>
          </Reveal>
          <Link href="/insights/zero-downtime-retail-mesh" className="mt-6 inline-block font-semibold text-accent-text hover:underline">
            How it works: the zero-downtime retail mesh →
          </Link>
        </section>

        <ProductAudience
          id="znxepos-audience"
          title="Built for high-volume stores."
          items={[
            { title: "Supermarkets & grocery", text: "Fast scanning, weighed items and multi-buy deals at every till." },
            { title: "Retail chains", text: "One stock view across branches, with transfers between stores." },
            { title: "Wholesalers", text: "Customer ledgers, credit limits and bulk pricing alongside retail sales." },
          ]}
        />

        <ProductFaq
          id="znxepos-faq"
          items={[
            { q: "What happens if the internet goes down?", a: "Each till keeps its own local database, so sales, returns and receipts carry on. Everything syncs to head office when the connection returns." },
            { q: "Can we move stock between branches?", a: "Yes. Inter-branch transfers update stock at both stores, and head office sees every branch in one view." },
            { q: "Does it support wholesale and retail in one system?", a: "Yes. Wholesale customers have their own ledgers, credit limits and pricing, alongside your retail tills." },
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
              <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
                Deploy ZNXePOS
              </span>
              <h2 id="demo-heading" className="text-3xl font-extrabold text-white mt-2">
                <SplitWords text="Request a ZNXePOS demo" />
              </h2>
              <p className="reveal-sub text-zinc-400 text-sm mt-3">
                Tell us how many branches and tills you run.
              </p>
            </Reveal>

            <DemoRequestForm productName="ZNXePOS" />
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
