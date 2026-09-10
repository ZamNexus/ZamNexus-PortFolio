"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useSpring,
  useInView,
} from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Types ───────────────────────────────────────────────────────────────────

interface CapabilityItem {
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  icon: string;
  tags: string[];
}

interface PhilosophyPrinciple {
  number: string;
  title: string;
  highlight: string;
  description: string;
}

// ─── Static Data ─────────────────────────────────────────────────────────────

const capabilities: CapabilityItem[] = [
  {
    title: "AI & Autonomous Solutions",
    subtitle: "Copilots, Agents & Document Intelligence",
    description:
      "Production-grade AI systems, autonomous task agents, RAG knowledge retrieval, and responsible governance designed to turn enterprise data into immediate action.",
    accent: "#8B5CF6",
    icon: "🧠",
    tags: ["Autonomous Agents", "Copilot Studio", "RAG Knowledge", "AI Governance"],
  },
  {
    title: "SaaS Product Development",
    subtitle: "Multi-Tenant Scalability & Growth",
    description:
      "End-to-end SaaS product engineering from architecture through to multi-tenant backends, partner portals, automated billing, and API-first platform infrastructure.",
    accent: "#F59E0B",
    icon: "⬡",
    tags: ["Multi-Tenant", "API-First", "Billing Engines", "Partner Portals"],
  },
  {
    title: "Cloud-Native Engineering",
    subtitle: "Resilient Serverless Microservices",
    description:
      "Modern, event-driven backends and cloud infrastructure built with Node.js, TypeScript, and AWS serverless architecture — designed for extreme uptime.",
    accent: "#10B981",
    icon: "⚡",
    tags: ["AWS Serverless", "Event-Driven", "IaC Terraform", "Zero-Downtime"],
  },
  {
    title: "Intelligent Automation",
    subtitle: "Agentic Workflows & Process Discovery",
    description:
      "Removing manual friction, connecting disparate applications, and orchestrating workflows that combine traditional automation with autonomous AI agents.",
    accent: "#F43F5E",
    icon: "🔄",
    tags: ["Agentic RPA", "Cross-App Sync", "Event Triggers", "Zero Error Rates"],
  },
  {
    title: "Enterprise Business Platforms",
    subtitle: "Microsoft Dynamics 365 & Salesforce",
    description:
      "Consulting, architecture, and delivery across Dynamics 365, Power Platform, Azure, Sales Cloud, Service Cloud, and Agentforce CRM intelligence.",
    accent: "#0EA5E9",
    icon: "⊞",
    tags: ["Dynamics 365", "Power Platform", "Salesforce CRM", "Agentforce"],
  },
  {
    title: "Integration & Connected Fabric",
    subtitle: "Bi-Directional API Mesh & Data Pipelines",
    description:
      "Connecting disconnected databases, third-party APIs, and legacy ERP ledgers into a synchronized, real-time technology mesh with zero latency.",
    accent: "#14B8A6",
    icon: "🔗",
    tags: ["REST / GraphQL", "MuleSoft & Azure", "Legacy SAP Bridge", "Event Streams"],
  },
];

const philosophyPrinciples: PhilosophyPrinciple[] = [
  {
    number: "01",
    title: "Business First, Technology Enabled",
    highlight: "Process Drives Technology",
    description:
      "We always start with your commercial objectives, operational bottlenecks, and unit economics — not technology dogma. We engineer solutions that solve real business problems.",
  },
  {
    number: "02",
    title: "Connected Ecosystem Thinking",
    highlight: "Zero Information Silos",
    description:
      "We reject isolated point solutions. Every tool, agent, and ledger we deploy is architected as an interoperable node within your broader digital estate.",
  },
  {
    number: "03",
    title: "AI Governance Embedded by Design",
    highlight: "Responsible & Auditable",
    description:
      "We build with security, data privacy, and ethical guardrails baked in from line one of code — ensuring enterprise AI adoption is reliable and audit-proof.",
  },
  {
    number: "04",
    title: "Agile Sprints, Zero Bureaucracy",
    highlight: "High Velocity, High Candor",
    description:
      "We keep communication open, development cycles short, and quality uncompromised. You see production-grade software in weeks, not theoretical slide decks in months.",
  },
  {
    number: "05",
    title: "Decade-Scale Stewardship",
    highlight: "Built to Outlast Market Shifts",
    description:
      "We engineer architectures designed to scale effortlessly, absorb new paradigm shifts, and continue compounding value long into your company's future.",
  },
];

// ─── Hydration-Safe Counter ──────────────────────────────────────────────────

function AnimatedCounter({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-40px" });

  useEffect(() => {
    const rawNum = parseInt(value.replace(/[^0-9]/g, ""), 10);
    if (isNaN(rawNum) || !inView) return;

    const duration = 1200;
    const startTime = performance.now();
    const hasPlus = value.includes("+");
    const hasPct = value.includes("%");

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * rawNum);

      setDisplay(`${current}${hasPlus ? "+" : hasPct ? "%" : ""}`);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplay(value);
      }
    };

    const animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, [inView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

// ─── Main About Page Component ───────────────────────────────────────────────

export default function AboutPage() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      suppressHydrationWarning
      className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[var(--accent-hover)] selection:text-black overflow-x-hidden"
    >
      {/* Top Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500 origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* Grid Pattern Backdrop */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="about-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#about-grid)" />
        </svg>

        {/* Ambient Halo Glows */}
        <div className="absolute top-[18%] left-[10%] w-[650px] h-[650px] rounded-full bg-blue-600/[0.05] blur-[180px] pointer-events-none" />
        <div className="absolute top-[45%] right-[5%] w-[650px] h-[650px] rounded-full bg-violet-600/[0.05] blur-[180px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-[8%] w-[600px] h-[600px] rounded-full bg-emerald-600/[0.04] blur-[180px] pointer-events-none" />
      </div>

      <Navbar />

      <main className="relative z-10">

        {/* ── HERO: 15-YEAR HERITAGE TELEMETRY ──────────────────────────────── */}
        <section
          aria-labelledby="about-hero-heading"
          className="max-w-7xl mx-auto px-6 pt-40 pb-20 text-center flex flex-col items-center"
        >
          {/* Top Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono font-medium text-[var(--accent-hover)] mb-8 backdrop-blur-xl shadow-lg"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-hover)] animate-pulse" />
            ZamNexus · A Technology Brand of Zamooq Limited (Est. 2009)
          </motion.div>

          {/* Heading */}
          <motion.h1
            id="about-hero-heading"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]"
          >
            Connecting Intelligence.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-400 via-violet-400 to-emerald-400">
              Enabling Action.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
          >
            ZamNexus is the technology and digital engineering brand of Zamooq Limited.
            We design and deliver intelligent platforms that connect systems, automate complexity,
            and empower organizations to make smarter, faster business decisions.
          </motion.p>

          {/* 15-Year Heritage Telemetry HUD */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-14 w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-800/20 backdrop-blur-md shadow-2xl"
          >
            {[
              { val: "2009", label: "Founding Year" },
              { val: "15+", label: "Years Enterprise Rigor" },
              { val: "4", label: "Autonomous Flagship Cores" },
              { val: "99.99%", label: "Verified Core SLA Uptime" },
            ].map((stat) => (
              <div key={stat.label} className="bg-zinc-900/40 px-5 py-4 text-center group hover:bg-zinc-800/40 transition-colors">
                <div className="text-xl sm:text-2xl font-bold font-mono text-white group-hover:text-[var(--accent-hover)] transition-colors">
                  {stat.val.includes("+") || stat.val.includes("%") ? (
                    <AnimatedCounter value={stat.val} />
                  ) : (
                    stat.val
                  )}
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── THE HERITAGE & EVOLUTION INTERACTIVE CHRONICLE ────────────────── */}
        <section
          aria-labelledby="heritage-heading"
          className="max-w-7xl mx-auto px-6 py-24 border-t border-zinc-800/60"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
              Our 15-Year Trajectory
            </span>
            <h2
              id="heritage-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3 leading-tight"
            >
              Built on 15+ Years of Enterprise Experience
            </h2>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
              From on-premises enterprise resource planning to modern cloud-native autonomous intelligence.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* Era 01: Enterprise Roots */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="p-8 sm:p-12 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md relative overflow-hidden shadow-xl flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono px-3 py-1 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-400 font-bold">
                    2009 — 2020 · FOUNDATIONS
                  </span>
                  <span className="text-xs font-mono text-zinc-500">Zamooq Limited Era</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  Enterprise Applications &amp; Mission-Critical CRM
                </h3>
                <p className="text-sm text-zinc-300 leading-relaxed mb-6">
                  Zamooq Limited, established in 2009, spent over a decade delivering foundational technology
                  architectures for enterprise environments. With deep mastery in Microsoft Dynamics 365,
                  regulated financial ledgers, and bespoke CRM databases, Zamooq established a reputation
                  for penny-perfect data accuracy and unwavering compliance across financial services, property, and the public sector.
                </p>

                <div className="space-y-2 text-xs font-mono text-zinc-400 border-t border-zinc-800/60 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400 font-bold">✓</span>
                    <span>Multi-entity general ledger consolidation &amp; tax compliance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400 font-bold">✓</span>
                    <span>High-volume CRM workflows for regulated property &amp; finance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400 font-bold">✓</span>
                    <span>Zero data loss migration from legacy on-premises servers</span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Era 02: Autonomous Intelligence Era */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-8 sm:p-12 rounded-3xl bg-zinc-900/60 border border-violet-500/50 backdrop-blur-md relative overflow-hidden shadow-2xl flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-transparent via-violet-500 to-transparent" />
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono px-3 py-1 rounded-full border border-violet-500/50 bg-violet-500/15 text-violet-300 font-bold">
                    2020 — PRESENT · THE EVOLUTION
                  </span>
                  <span className="text-xs font-mono text-zinc-400">ZamNexus AI Brand</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-4">
                  Autonomous AI, Cloud-Native SaaS &amp; Connected Mesh
                </h3>
                <p className="text-sm text-zinc-200 leading-relaxed mb-6">
                  ZamNexus is the modern evolution of that 15-year heritage. We extended enterprise reliability
                  into artificial intelligence, serverless cloud engineering, and proprietary SaaS product engines
                  (ZNXERP, ZNXePOS, ZNXEdu, ZNXCare). We combine the institutional wisdom of seasoned enterprise
                  consultants with the velocity and ambition of modern AI software pioneers.
                </p>

                <div className="space-y-2 text-xs font-mono text-zinc-300 border-t border-zinc-800/60 pt-4">
                  <div className="flex items-center gap-2">
                    <span className="text-violet-400 font-bold">✓</span>
                    <span>Production-grade autonomous AI agents &amp; Copilot Studio extensions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-violet-400 font-bold">✓</span>
                    <span>Sub-second multi-till retail synchronization &amp; offline edge nodes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-violet-400 font-bold">✓</span>
                    <span>Universal Integration Mesh connecting Microsoft, Salesforce, and custom APIs</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── SIX CORE CAPABILITIES BENTO MATRIX ────────────────────────────── */}
        <section
          aria-labelledby="capabilities-heading"
          className="max-w-7xl mx-auto px-6 py-24 border-t border-zinc-800/60"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
              Engineering Depth
            </span>
            <h2
              id="capabilities-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3 leading-tight"
            >
              Six Core Engineering Capabilities
            </h2>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
              Our multidisciplinary expertise spans the complete software lifecycle — from strategic architecture
              through to autonomous agent delivery and 24/7 mission-critical SLA management.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {capabilities.map((cap, idx) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                transition={{ duration: 0.4, delay: idx * 0.06 }}
                whileHover={{ y: -6, borderColor: cap.accent }}
                className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:bg-zinc-900/70 backdrop-blur-md transition-all duration-300 relative overflow-hidden shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800">
                      {cap.icon}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-600 font-bold">0{idx + 1} // 06</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1 group-hover:text-white transition-colors">
                    {cap.title}
                  </h3>
                  <div className="text-xs font-mono mb-3" style={{ color: cap.accent }}>
                    {cap.subtitle}
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                    {cap.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-800/60">
                  {cap.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-950/70 border border-zinc-800 text-zinc-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── OPERATING PHILOSOPHY & PRINCIPLES ─────────────────────────────── */}
        <section
          aria-labelledby="philosophy-heading"
          className="max-w-7xl mx-auto px-6 py-24 border-t border-zinc-800/60"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
                Operating Philosophy
              </span>
              <h2
                id="philosophy-heading"
                className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3 leading-tight"
              >
                Business First. Technology Enabled.{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                  Intelligence Driven.
                </span>
              </h2>
              <p className="mt-5 text-zinc-400 text-sm sm:text-base leading-relaxed">
                Every technical decision must map directly to business revenue, operational efficiency,
                or customer satisfaction. We do not build technology for technology&apos;s sake.
              </p>

              <div className="mt-8">
                <Link
                  href="/Solutions"
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[var(--accent-hover)] hover:underline"
                >
                  Explore How We Architect Solutions →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-4">
              {philosophyPrinciples.map((principle, idx) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ x: 6, borderColor: "rgba(59, 130, 246, 0.5)" }}
                  className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:bg-zinc-900/70 backdrop-blur-sm transition-all duration-300 shadow-md group"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-[var(--accent-hover)]">
                      {principle.highlight}
                    </span>
                    <span className="text-xs font-mono text-zinc-600">{principle.number} // 05</span>
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {principle.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {principle.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VISION & MISSION DUAL-POWER STAGE ─────────────────────────────── */}
        <section
          aria-labelledby="vision-heading"
          className="max-w-7xl mx-auto px-6 py-24 border-t border-zinc-800/60"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.6 }}
              className="p-10 sm:p-14 rounded-3xl bg-gradient-to-br from-zinc-900/90 via-zinc-900/60 to-zinc-950 border border-zinc-800 relative overflow-hidden shadow-2xl"
            >
              <div
                className="absolute top-0 right-0 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none"
                aria-hidden="true"
              />
              <div className="relative z-10">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
                  Our Vision
                </span>
                <h2
                  id="vision-heading"
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-3 leading-snug"
                >
                  To engineer a world where technology is connected, intelligent and immediately actionable.
                </h2>
                <p className="mt-5 text-sm sm:text-base text-zinc-400 leading-relaxed">
                  A future where organizations don&apos;t drown in disconnected software tabs, but operate
                  as a unified, autonomous nervous system — acting faster, deciding smarter, and delivering
                  unparalleled customer value.
                </p>
              </div>
            </motion.div>

            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-10 sm:p-14 rounded-3xl bg-zinc-900/40 border border-zinc-800 relative overflow-hidden shadow-xl"
            >
              <div className="relative z-10">
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  Our Mission
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-3 leading-snug">
                  To connect technology, intelligence and business capability.
                </h3>
                <p className="mt-5 text-sm sm:text-base text-zinc-400 leading-relaxed">
                  We build solutions that synthesize artificial intelligence, event-driven cloud backends,
                  enterprise platforms, and automated workflow agents — giving our clients the structural
                  foundation to scale without friction.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── HIGH-CONVERSION BOTTOM CTA ───────────────────────────────────── */}
        <section
          aria-labelledby="about-cta-heading"
          className="max-w-7xl mx-auto px-6 py-24 border-t border-zinc-800/60"
        >
          <div className="rounded-3xl bg-gradient-to-br from-zinc-900/90 via-zinc-900/60 to-zinc-950 border border-zinc-800 p-10 sm:p-16 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
                Backed by 15 Years of Excellence
              </span>
              <h2
                id="about-cta-heading"
                className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3 leading-tight"
              >
                Let&apos;s build your next enterprise milestone.
              </h2>
              <p className="mt-4 text-zinc-400 text-base sm:text-lg leading-relaxed">
                Whether you are modernizing core enterprise ledgers, embedding autonomous AI copilots,
                or launching a scalable SaaS platform — our senior architects are ready to partner with you.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.98 }}>
                  <Link href="/Contact" className="liquid-lime-btn text-base py-4 px-8">
                    <span>Start a Conversation</span>
                    <span className="arrow-icon w-8 h-8 text-sm" aria-hidden="true">→</span>
                  </Link>
                </motion.div>
                <Link
                  href="/Products"
                  className="px-7 py-4 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 font-semibold text-sm transition-colors"
                >
                  Explore Product Suite →
                </Link>
              </div>
            </div>

            {/* SLA Badge Panel */}
            <div className="w-full lg:w-80 p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800 space-y-4">
              <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold border-b border-zinc-800/60 pb-3">
                ZamNexus Partnership Promise
              </div>
              {[
                { title: "Direct Architect Access", sub: "No junior layer handoffs" },
                { title: "15+ Years Track Record", sub: "Proven delivery across regulated sectors" },
                { title: "Continuous Stewardship", sub: "Proactive long-term engineering TAM" },
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
