"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Types ───────────────────────────────────────────────────────────────────

type InsightCategory =
  | "all"
  | "ai"
  | "enterprise"
  | "retail"
  | "healthcare"
  | "cloud";

interface InsightArticle {
  id: string;
  category: InsightCategory;
  categoryLabel: string;
  accent: string;
  title: string;
  subtitle: string;
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  keyTakeaways: string[];
  fullSummary: string;
  architectureBlueprint: string[];
}

// ─── Insights Data ───────────────────────────────────────────────────────────

const featuredInsight: InsightArticle = {
  id: "zero-downtime-retail-mesh",
  category: "retail",
  categoryLabel: "Retail & Edge Engineering",
  accent: "#F59E0B", // Amber
  title: "The Zero-Downtime Retail Mesh: How Local SQLite Caching & Delta-Sync Eliminate POS Outages",
  subtitle:
    "An architectural breakdown of why multi-store retail chains suffer till downtime when relying solely on cloud APIs, and how edge SQLite databases guarantee continuous checkout continuity.",
  readTime: "7 min read",
  date: "October 2026",
  author: "Tariq Vance",
  authorRole: "Principal Systems Architect",
  keyTakeaways: [
    "Traditional cloud-only POS systems introduce single-point-of-failure vulnerabilities during store internet cuts.",
    "Dual-mode architecture caches active SKUs and offline transactions in a lightweight, local SQLite buffer.",
    "Multi-master delta synchronization resolves timestamp conflicts seamlessly upon network restoration.",
  ],
  fullSummary:
    "When a busy supermarket or retail pharmacy experiences a fiber cut or network timeout, ringing halts immediately if transactions depend on synchronous cloud API round-trips. In ZNXePOS, each checkout register operates an isolated SQLite instance containing the complete store SKU index and offline transaction ledger. Cashiers continue scanning at 0.08s latency without knowing internet has dropped. Upon reconnect, an encrypted background daemon computes hash deltas, synchronizes inventory reserves, and posts journal credits without duplicate billing.",
  architectureBlueprint: [
    "Edge Till Node: Local SQLite DB + Hardware ESC/POS Driver",
    "Local P2P Broadcast: Sub-50ms till mesh for cart handover",
    "Cloud Sync Daemon: Webhook batching with exponential backoff",
    "Central General Ledger: Immutable journal commit & audit logging",
  ],
};

const articles: InsightArticle[] = [
  {
    id: "sub-second-multi-currency-ledgers",
    category: "enterprise",
    categoryLabel: "Enterprise Architecture",
    accent: "#3B82F6",
    title: "Sub-Second Multi-Currency Ledger Posting: Architectural Lessons from Industrial Pharma ERP",
    subtitle:
      "Eliminating month-end reconciliation nightmares by automating double-entry posting at the exact moment finished goods pass QC lab sign-offs.",
    readTime: "6 min read",
    date: "September 2026",
    author: "Hamza Zamooq",
    authorRole: "Chief Technology Officer",
    keyTakeaways: [
      "Decoupling MES production receipts from periodic accounting batches prevents inventory discrepancies.",
      "Penny-perfect multi-currency FX conversion executed at the transaction timestamp.",
      "Event-driven CQRS pattern ensures read-heavy MIS dashboards never block write-heavy ledger entries.",
    ],
    fullSummary:
      "In heavy manufacturing and pharmaceuticals, finance teams historically spent the first week of every month manually reconciling raw material consumption against shop-floor yields. In ZNXERP, when a Quality Director stamps a digital Certificate of Analysis (COA), an asynchronous event publishes to the ledger service. Work-in-Progress (WIP) accounts are instantly credited, Cost of Goods Sold (COGS) is debited, and currency rates are locked at transaction time with sub-second finality.",
    architectureBlueprint: [
      "Shop-Floor MES: Sensor telemetry & batch yield release",
      "Event Bus: Kafka/EventBridge asynchronous ledger queue",
      "Ledger Microservice: Double-entry immutability engine",
      "Executive Dashboard: Real-time P&L refreshed every 15 seconds",
    ],
  },
  {
    id: "agentic-ai-regulated-supply-chains",
    category: "ai",
    categoryLabel: "Agentic AI & LLMs",
    accent: "#8B5CF6",
    title: "Autonomous Multi-Agent AI in Regulated Supply Chains: Moving from Chat to Verified Action",
    subtitle:
      "Why conversational chatbots fail in mission-critical logistics, and how deterministic guardrailed agents execute real purchase orders.",
    readTime: "8 min read",
    date: "August 2026",
    author: "Elena Rostova",
    authorRole: "Head of AI Research",
    keyTakeaways: [
      "LLMs excel at unstructured intent extraction but cannot be trusted with unbounded database writes.",
      "A dual-tier architecture pairs neural reasoning with deterministic mathematical validation rules.",
      "Automated PO generation adheres to budget caps, vendor scorecards, and regulatory compliance checks.",
    ],
    fullSummary:
      "Enterprise software was flooded with chatbot wrappers that summarize PDFs but cannot take real action. ZamNexus designs autonomous supply chain agents that monitor reorder thresholds across central warehouses. When stock falls below safety levels, the agent drafts purchase requisitions, queries approved vendor pricing APIs, verifies budget allocations, and routes for human executive approval before issuing legally binding POs.",
    architectureBlueprint: [
      "Intent Reasoner: Fine-tuned LLM for supplier communication",
      "Mathematical Guardrails: Strict price ceiling & volume rules",
      "Approval State Machine: Multi-tier digital signatures",
      "Vendor Portal: Direct B2B dispatch integration",
    ],
  },
  {
    id: "biometric-campus-iot-latency",
    category: "enterprise",
    categoryLabel: "Campus Engineering",
    accent: "#8B5CF6",
    title: "Biometric Turnstiles & Instant 1.2s Parent Alerts: Building Ultra-Low-Latency Campus IoT",
    subtitle:
      "Processing 10,000 students entering school gates within 15 minutes while streaming instant push alerts to guardians without queue bottlenecks.",
    readTime: "5 min read",
    date: "July 2026",
    author: "Zayd Malik",
    authorRole: "IoT & Systems Lead",
    keyTakeaways: [
      "Edge facial recognition and RFID readers require local matching tables to prevent turnstile queues.",
      "High-throughput WebSocket brokers deliver push notifications to 14,000+ parents in under 1.5 seconds.",
      "Automated fallback routes to SMS when mobile app data connectivity is temporarily unavailable.",
    ],
    fullSummary:
      "Campus morning rush hours present extreme burst traffic. If attendance verification takes more than 200ms per student, gate lines spill onto public streets. ZNXEdu provisions edge gate controllers with locally synchronized biometric hashes. Turnstiles unlock in 110ms, while a background queue streams attendance events to high-throughput cloud notification hubs, alerting parents on iOS/Android in 1.2 seconds.",
    architectureBlueprint: [
      "Gate Turnstiles: RFID / Facial recognition edge readers",
      "Local Controller: In-memory hash lookup (< 120ms)",
      "Cloud Notification Hub: Parallelized WebSocket broadcast",
      "Guardian Devices: Instant push notification & SMS fallback",
    ],
  },
  {
    id: "hl7-pacs-clinical-automation",
    category: "healthcare",
    categoryLabel: "Healthcare & EHR",
    accent: "#10B981",
    title: "HL7 and PACS Automation in Tertiary Hospitals: Eliminating Clinical Data Friction",
    subtitle:
      "Connecting laboratory auto-analyzers and DICOM radiology imaging directly into doctor EHR charts to cut emergency triage wait times by 42%.",
    readTime: "9 min read",
    date: "June 2026",
    author: "Dr. A. Vance",
    authorRole: "Clinical Systems Advisor",
    keyTakeaways: [
      "Manual paper test transcription is the single largest source of hospital diagnostic delays and errors.",
      "Bidirectional HL7 machine interfacing pushes blood test values straight from Sysmex analyzers to doctor charts.",
      "Real-time panic value flags notify on-duty physicians within 30 seconds of critical lab abnormalities.",
    ],
    fullSummary:
      "In tertiary hospital emergency wards, minutes determine patient outcomes. When phlebotomy samples are analyzed, manual entry of white blood cell counts and electrolytes risks transcription error. ZNXCare integrates bidirectional HL7 machine interfaces: the analyzer scans the test tube barcode, executes the panel, and streams verified results directly into the patient's electronic chart, alerting the attending physician immediately if values exceed critical panic thresholds.",
    architectureBlueprint: [
      "Auto-Analyzer: Sysmex / Roche clinical laboratory equipment",
      "HL7 Gateway: MLLP protocol parsing & schema validation",
      "Doctor EHR Chart: Longitudinal vitals & diagnostic timeline",
      "Panic Alert Engine: Instant emergency physician notification",
    ],
  },
  {
    id: "strangler-fig-legacy-modernization",
    category: "cloud",
    categoryLabel: "Cloud Architecture",
    accent: "#06B6D4",
    title: "The Strangler Fig Pattern: Modernizing Monolithic Legacy Systems Without Downtime",
    subtitle:
      "How enterprise leaders transition legacy ERPs and SQL databases into modular cloud microservices through progressive API strangulation.",
    readTime: "6 min read",
    date: "May 2026",
    author: "Hamza Zamooq",
    authorRole: "Chief Technology Officer",
    keyTakeaways: [
      "Big-bang software replacements have an 84% failure rate in mid-to-large enterprises.",
      "The Strangler Fig pattern places an intelligent API proxy in front of legacy databases.",
      "Modules are migrated incrementally while old and new systems run in penny-perfect parallel sync.",
    ],
    fullSummary:
      "Ripping and replacing an enterprise legacy system in a single weekend is an invitation to business disruption. ZamNexus employs the Strangler Fig architectural pattern: we deploy an intelligent API reverse proxy that intercepts client requests. High-value subsystems (such as real-time inventory or customer portals) are built as modern cloud microservices and placed on the new route, while remaining workflows stay on legacy until systematically superseded.",
    architectureBlueprint: [
      "Reverse Proxy: Intelligent path-based request routing",
      "Legacy Monolith: Retained during phased cutover",
      "New Microservices: Event-driven cloud-native modules",
      "Parallel Verification: 7-day shadow comparison before live cut",
    ],
  },
  {
    id: "aws-serverless-scaling-postmortem",
    category: "cloud",
    categoryLabel: "Cloud-Native Engineering",
    accent: "#6366F1",
    title: "AWS Serverless vs Kubernetes: A Cost & Scaling Post-Mortem for Multi-Tenant SaaS",
    subtitle:
      "Why we migrated high-throughput retail endpoints to AWS Lambda & DynamoDB, reducing cloud operational overhead by 48%.",
    readTime: "7 min read",
    date: "April 2026",
    author: "Tariq Vance",
    authorRole: "Principal Systems Architect",
    keyTakeaways: [
      "Managing Kubernetes clusters for spiky multi-tenant retail workloads created constant over-provisioning.",
      "Event-driven serverless architectures scale instantaneously from zero to 10,000 requests per second.",
      "Fine-grained single-table DynamoDB design delivers single-digit millisecond latency at fraction of the cost.",
    ],
    fullSummary:
      "Retail checkout traffic fluctuates wildly between standard weekday mornings and Black Friday rushes. Running self-managed EKS clusters required DevOps engineers to maintain node groups, ingress controllers, and auto-scaling buffers that burned budget when stores were closed. Transitioning to event-driven serverless architecture using API Gateway, Lambda, and single-table DynamoDB allowed ZamNexus to scale instantaneously with zero idle infrastructure costs.",
    architectureBlueprint: [
      "API Gateway: Sub-10ms ingress routing with rate-limiting",
      "AWS Lambda: Ephemeral compute executing within 50ms",
      "DynamoDB: Single-digit millisecond latency key-value storage",
      "CloudWatch Alarms: Real-time telemetry monitoring & anomaly alerts",
    ],
  },
];

const categories: { id: InsightCategory; label: string }[] = [
  { id: "all", label: "All Insights" },
  { id: "ai", label: "Agentic AI & LLMs" },
  { id: "enterprise", label: "Enterprise Architecture" },
  { id: "retail", label: "Retail & POS Systems" },
  { id: "healthcare", label: "Healthcare & EHR" },
  { id: "cloud", label: "Cloud-Native Engineering" },
];

export default function InsightsPage() {
  const [selectedCategory, setSelectedCategory] = useState<InsightCategory>("all");
  const [activeModalArticle, setActiveModalArticle] = useState<InsightArticle | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "success">("idle");

  const filteredArticles =
    selectedCategory === "all"
      ? articles
      : articles.filter((a) => a.category === selectedCategory);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes("@")) return;
    setNewsletterStatus("success");
    setTimeout(() => {
      setNewsletterEmail("");
      setNewsletterStatus("idle");
    }, 4000);
  };

  return (
    <div
      suppressHydrationWarning
      className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[var(--accent-hover)] selection:text-black overflow-x-hidden"
    >
      {/* Background Cyber Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="insights-grid" width="44" height="44" patternUnits="userSpaceOnUse">
              <path d="M 44 0 L 0 0 0 44" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#insights-grid)" />
        </svg>

        {/* Ambient Halos */}
        <div className="absolute top-[12%] left-[10%] w-[650px] h-[650px] rounded-full bg-violet-600/[0.05] blur-[180px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[8%] w-[600px] h-[600px] rounded-full bg-amber-600/[0.04] blur-[180px] pointer-events-none" />
      </div>

      <Navbar />

      <main className="relative z-10">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="insights-hero-heading"
          className="max-w-7xl mx-auto px-6 pt-40 pb-16 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono font-medium text-[var(--accent-hover)] mb-8 backdrop-blur-xl shadow-lg"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-hover)] animate-pulse" />
            ZamNexus Engineering Research &amp; Architectural Insights
          </motion.div>

          <motion.h1
            id="insights-hero-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]"
          >
            Perspectives on{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[var(--accent-hover)] to-violet-400">
              mission-critical systems.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            In-depth engineering research, architectural post-mortems, and field blueprints from the engineers building ZamNexus.
          </motion.p>
        </section>

        {/* ── FEATURED RESEARCH WHITE-PAPER (HERO CARD) ────────────────────── */}
        <section
          aria-labelledby="featured-heading"
          className="max-w-7xl mx-auto px-6 pb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="p-8 sm:p-12 rounded-3xl bg-zinc-950/80 border border-zinc-800 shadow-2xl relative overflow-hidden group"
            style={{
              borderLeftWidth: "4px",
              borderLeftColor: featuredInsight.accent,
            }}
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3">
                <span
                  className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider border"
                  style={{
                    color: featuredInsight.accent,
                    borderColor: `${featuredInsight.accent}50`,
                    background: `${featuredInsight.accent}15`,
                  }}
                >
                  Featured Research
                </span>
                <span className="text-xs font-mono text-zinc-500">{featuredInsight.categoryLabel}</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-zinc-500">
                <span>{featuredInsight.readTime}</span>
                <span>•</span>
                <span>{featuredInsight.date}</span>
              </div>
            </div>

            <h2 id="featured-heading" className="text-2xl sm:text-4xl font-extrabold text-white mb-4 leading-snug">
              {featuredInsight.title}
            </h2>

            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-4xl mb-8">
              {featuredInsight.subtitle}
            </p>

            {/* Key Takeaways */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {featuredInsight.keyTakeaways.map((point, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs font-mono text-zinc-300 flex items-start gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: featuredInsight.accent }} />
                  <span>{point}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800/70">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-zinc-800 flex items-center justify-center font-mono font-bold text-xs text-white border border-zinc-700">
                  {featuredInsight.author.charAt(0)}
                </div>
                <div>
                  <div className="text-xs font-bold text-white">{featuredInsight.author}</div>
                  <div className="text-[11px] font-mono text-zinc-500">{featuredInsight.authorRole}</div>
                </div>
              </div>

              <button
                onClick={() => setActiveModalArticle(featuredInsight)}
                className="liquid-lime-btn text-xs sm:text-sm py-3 px-6 cursor-pointer"
              >
                <span>Read Full Architecture Blueprint</span>
                <span className="arrow-icon w-6 h-6 text-xs" aria-hidden="true">→</span>
              </button>
            </div>
          </motion.div>
        </section>

        {/* ── INTERACTIVE CATEGORY DOCK ────────────────────────────────────── */}
        <section className="max-w-7xl mx-auto px-6 pb-12">
          <div className="flex items-center justify-center flex-wrap gap-2 p-1.5 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 max-w-4xl mx-auto backdrop-blur-md">
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer relative ${
                    isSelected
                      ? "text-black shadow-lg"
                      : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="active-insights-tab"
                      className="absolute inset-0 rounded-xl bg-[var(--accent-hover)]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </section>

        {/* ── ARTICLES GRID ────────────────────────────────────────────────── */}
        <section
          aria-labelledby="articles-heading"
          className="max-w-7xl mx-auto px-6 pb-20"
        >
          <div className="flex items-center justify-between mb-8 pb-3 border-b border-zinc-800/60">
            <h2 id="articles-heading" className="text-lg font-mono font-bold text-white uppercase tracking-wider">
              Technical Insights ({filteredArticles.length})
            </h2>
            <span className="text-xs font-mono text-zinc-500">
              Peer-reviewed engineering post-mortems
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredArticles.map((article) => (
                <motion.article
                  key={article.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="p-7 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 hover:bg-zinc-900/70 transition-all duration-300 flex flex-col justify-between group shadow-xl relative overflow-hidden"
                >
                  <div>
                    {/* Category & Read Time */}
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="text-[10px] font-mono font-bold px-2 py-0.5 rounded border"
                        style={{
                          color: article.accent,
                          borderColor: `${article.accent}40`,
                          background: `${article.accent}12`,
                        }}
                      >
                        {article.categoryLabel}
                      </span>
                      <span className="text-[11px] font-mono text-zinc-500">{article.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-3 group-hover:text-white transition-colors leading-snug">
                      {article.title}
                    </h3>
                    <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                      {article.subtitle}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                    <div>
                      <div className="text-xs font-mono font-bold text-zinc-200">{article.author}</div>
                      <div className="text-[10px] font-mono text-zinc-500">{article.date}</div>
                    </div>

                    <button
                      onClick={() => setActiveModalArticle(article)}
                      className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-950/80 hover:bg-zinc-800 text-xs font-mono text-white transition-colors cursor-pointer"
                    >
                      Read Blueprint →
                    </button>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* ── EXECUTIVE TECHNOLOGY BRIEFING SUBSCRIPTION ───────────────────── */}
        <section
          aria-labelledby="newsletter-heading"
          className="max-w-4xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-br from-zinc-900/90 to-zinc-950 border border-zinc-800 shadow-2xl text-center">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
              Engineering Dispatch
            </span>
            <h2 id="newsletter-heading" className="text-2xl sm:text-4xl font-extrabold text-white mt-2">
              Subscribe to Executive Technology Briefings
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl mx-auto mt-3 mb-8 leading-relaxed">
              Receive quarterly deep-dives on enterprise software architecture, zero-downtime offline mesh algorithms, and governed AI implementation.
            </p>

            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="director@enterprise.com"
                className="w-full px-5 py-3.5 rounded-full bg-zinc-900 border border-zinc-700 text-zinc-100 text-xs font-mono focus:outline-none focus:border-[var(--accent-hover)] transition-colors"
              />
              <button
                type="submit"
                className="w-full sm:w-auto liquid-lime-btn text-xs py-3.5 px-6 whitespace-nowrap cursor-pointer"
              >
                <span>{newsletterStatus === "success" ? "Subscribed ✓" : "Get Briefings"}</span>
                <span className="arrow-icon w-6 h-6 text-xs" aria-hidden="true">→</span>
              </button>
            </form>

            {newsletterStatus === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-mono text-emerald-400 mt-4"
              >
                ✓ You have been enrolled in the quarterly engineering dispatch.
              </motion.div>
            )}
          </div>
        </section>

      </main>

      {/* ── MODAL: FULL ARTICLE BLUEPRINT SLIDE-OVER ──────────────────────── */}
      <AnimatePresence>
        {activeModalArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModalArticle(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25 }}
              className="relative z-10 w-full max-w-3xl max-h-[85vh] overflow-y-auto p-8 sm:p-10 rounded-3xl bg-[#090b10] border border-zinc-800 shadow-2xl"
              style={{
                borderTopWidth: "4px",
                borderTopColor: activeModalArticle.accent,
              }}
            >
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-800/80">
                <span
                  className="text-xs font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded"
                  style={{
                    color: activeModalArticle.accent,
                    background: `${activeModalArticle.accent}15`,
                  }}
                >
                  {activeModalArticle.categoryLabel}
                </span>

                <button
                  onClick={() => setActiveModalArticle(null)}
                  className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white flex items-center justify-center text-xs font-mono cursor-pointer"
                >
                  ✕
                </button>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-3 leading-snug">
                {activeModalArticle.title}
              </h3>

              <div className="flex items-center gap-3 text-xs font-mono text-zinc-500 mb-6">
                <span>By {activeModalArticle.author} ({activeModalArticle.authorRole})</span>
                <span>•</span>
                <span>{activeModalArticle.readTime}</span>
                <span>•</span>
                <span>{activeModalArticle.date}</span>
              </div>

              <div className="space-y-6 text-sm text-zinc-300 leading-relaxed">
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-2">
                    Executive Summary
                  </h4>
                  <p>{activeModalArticle.fullSummary}</p>
                </div>

                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold mb-2">
                    Architecture Blueprint
                  </h4>
                  <div className="space-y-2">
                    {activeModalArticle.architectureBlueprint.map((layer, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 font-mono text-xs text-zinc-300 flex items-center gap-3"
                      >
                        <span className="w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px]" style={{ background: `${activeModalArticle.accent}25`, color: activeModalArticle.accent }}>
                          {idx + 1}
                        </span>
                        <span>{layer}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800/60 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-xs font-mono text-zinc-500">
                    Want to implement this architecture in your enterprise?
                  </span>
                  <Link
                    href="/Contact"
                    className="liquid-lime-btn text-xs py-3 px-5"
                    onClick={() => setActiveModalArticle(null)}
                  >
                    <span>Schedule Architecture Review</span>
                    <span className="arrow-icon w-6 h-6 text-xs" aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
