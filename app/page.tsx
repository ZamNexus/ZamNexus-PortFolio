"use client";

import { useState, useRef, useEffect, type CSSProperties, type MouseEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useInView,
} from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FinalCTA from "@/components/FinalCTA";
import ParticleNetwork from "@/components/ParticleNetwork";
import PillTab from "@/components/PillTab";
import { useHeroMotion } from "@/components/useHeroMotion";

// ─── Type Definitions ────────────────────────────────────────────────────────

type SolutionCategory =
  | "ai"
  | "saas"
  | "cloud"
  | "automation"
  | "microsoft"
  | "salesforce";

interface Solution {
  id: SolutionCategory;
  icon: string;
  tag: string;
  shortLabel?: string;
  title: string;
  description: string;
  capabilities: string[];
  accent: string;
  telemetry: string;
}

interface ProductEngineItem {
  id: string;
  code: string;
  name: string;
  tagline: string;
  description: string;
  stat: string;
  statLabel: string;
  accent: string;
  logo: string;
  href: string;
  modules: string[];
}

interface WhyPoint {
  title: string;
  description: string;
  icon: string;
  accent: string;
}

interface DeliveryStep {
  number: string;
  label: string;
  description: string;
}

// ─── Static Data ─────────────────────────────────────────────────────────────

const flagshipProducts: ProductEngineItem[] = [
  {
    id: "znxerp",
    code: "ZNXERP",
    name: "Enterprise Resource Planning",
    tagline: "Run every part of your business on one intelligent platform.",
    description:
      "A complete enterprise core designed for mid-to-large enterprises. Integrates supply chain, manufacturing floor execution, real-time ledgers, and multi-entity consolidation.",
    stat: "5+",
    statLabel: "Industrial Plants",
    accent: "#3B82F6",
    logo: "/product-logos/znxerp.png",
    href: "/Products/znxerp",
    modules: ["Finance & Ledgers", "Supply Chain", "MES Shopfloor", "MIS Analytics"],
  },
  {
    id: "znxepos",
    code: "ZNXePOS",
    name: "Point of Sale & Retail Intelligence",
    tagline: "Complete visibility of your business, in a single click.",
    description:
      "Engineered for high-volume retail chains and supermarkets. Delivers millisecond barcode scanning, multi-till synchronization, and offline-first reliability.",
    stat: "750+",
    statLabel: "Live Retail Tills",
    accent: "#F59E0B",
    logo: "/product-logos/znxepos.png",
    href: "/Products/znxepos",
    modules: ["Cloud & Offline POS", "Multi-Till Sync", "Real-Time Stock", "Sales Telemetry"],
  },
  {
    id: "znxedu",
    code: "ZNXEdu",
    name: "Multi-Campus Education Management",
    tagline: "One system for every campus, classroom and conversation.",
    description:
      "Unified operational backbone for school networks and colleges. Connects student admissions, automated fee billing, biometrics, grading, and parent portals.",
    stat: "∞",
    statLabel: "Infinite Campuses",
    accent: "#8B5CF6",
    logo: "/product-logos/znxedu.png",
    href: "/Products/znxedu",
    modules: ["Student Admissions", "Automated Fees", "Biometrics", "Parent Mobile App"],
  },
  {
    id: "znxcare",
    code: "ZNXCare",
    name: "Patient & Hospital Management Solution",
    tagline: "The right information, for the right decision, at the right time.",
    description:
      "Purpose-built clinical platform for hospitals and diagnostic labs. Integrates patient EHR, triage, laboratory auto-analyzers, and OPD/IPD billing.",
    stat: "5+",
    statLabel: "Specialist Hospitals",
    accent: "#10B981",
    logo: "/product-logos/znxcare.png",
    href: "/Products/znxcare",
    modules: ["Clinical EHR", "Automated Lab LIS", "IPD/OPD Billing", "Hospital Pharmacy"],
  },
];

const solutions: Solution[] = [
  {
    id: "ai",
    icon: "◈",
    tag: "AI & ML",
    shortLabel: "AI & ML",
    title: "AI & Intelligent Solutions",
    description:
      "Practical Artificial Intelligence that gets things done. From custom copilots and autonomous AI agents to document intelligence and governed, responsible automation.",
    capabilities: [
      "AI Assistants & Copilots",
      "Autonomous AI Agents",
      "Generative AI Solutions",
      "Responsible & Governed AI",
      "Knowledge & Document Intelligence",
      "AI Strategy & Architecture",
    ],
    accent: "#8B5CF6",
    telemetry: "Production AI copilot RAG latency < 350ms",
  },
  {
    id: "saas",
    icon: "⬡",
    tag: "SAAS PRODUCTS",
    shortLabel: "SaaS Products",
    title: "SaaS Product Development",
    description:
      "We design and build scalable, multi-tenant SaaS products — from early concept to enterprise-ready platform — with security, API-first architecture, and growth built in.",
    capabilities: [
      "Product Strategy & Architecture",
      "Multi-Tenant Backends",
      "Customer & Partner Portals",
      "API-First Platforms",
      "Subscription & Billing Integrations",
      "Performance Engineering",
    ],
    accent: "#06B6D4",
    telemetry: "Zero-downtime multi-tenant tenant isolation",
  },
  {
    id: "cloud",
    icon: "⬢",
    tag: "CLOUD & DEVOPS",
    shortLabel: "Cloud & DevOps",
    title: "Cloud-Native & Serverless Engineering",
    description:
      "Modern, event-driven backend systems built with Node.js, TypeScript and AWS serverless architecture — resilient, cost-efficient, and designed to scale.",
    capabilities: [
      "Cloud-Native Backend Development",
      "Event-Driven Microservices",
      "Infrastructure-as-Code (Terraform)",
      "Automated CI/CD Pipelines",
      "AWS Serverless Architecture",
      "High-Availability Engineering",
    ],
    accent: "#6366F1",
    telemetry: "99.99% verified infrastructure SLA uptime",
  },
  {
    id: "automation",
    icon: "⟐",
    tag: "AUTOMATION",
    shortLabel: "Automation",
    title: "Intelligent Automation",
    description:
      "We connect applications, eliminate manual transcription, and orchestrate workflows that combine traditional automation with autonomous AI agents.",
    capabilities: [
      "Workflow Automation",
      "Intelligent Process Automation",
      "AI-Enhanced Workflows",
      "Event-Driven Automation",
      "Agentic Decision Making",
      "Operational Orchestration",
    ],
    accent: "#F59E0B",
    telemetry: "-84% manual workflow execution cycle",
  },
  {
    id: "microsoft",
    icon: "⊞",
    tag: "MICROSOFT",
    shortLabel: "Microsoft Platforms",
    title: "Microsoft Business Solutions",
    description:
      "Consulting, architecture and delivery across Dynamics 365, Power Platform, Azure and Microsoft Copilot — helping you get more from the ecosystem you already invest in.",
    capabilities: [
      "Dynamics 365 Enterprise",
      "Power Platform & Dataverse",
      "Microsoft Copilot Studio",
      "Azure Integration Services",
      "Dataverse & BI Analytics",
      "Enterprise Automation",
    ],
    accent: "#0EA5E9",
    telemetry: "Full Dataverse sync with sub-second parity",
  },
  {
    id: "salesforce",
    icon: "⊙",
    tag: "SALESFORCE",
    shortLabel: "Salesforce Cloud",
    title: "Salesforce Solutions",
    description:
      "Implementation, architecture, integration and AI — built around your business processes and your growth ambitions, not just standard platform features.",
    capabilities: [
      "Salesforce Consulting & Strategy",
      "Solution Architecture",
      "Sales & Service Cloud CRM",
      "Einstein AI & Agentforce",
      "MuleSoft Integration",
      "Customer 360 Data Cloud",
    ],
    accent: "#10B981",
    telemetry: "Autonomous Agentforce case resolution active",
  },
];

const whyPoints: WhyPoint[] = [
  {
    title: "Business-Focused Engineering",
    description: "We start with your commercial challenges, opportunities, and goals — never technology for technology's sake.",
    icon: "🎯",
    accent: "#F59E0B",
  },
  {
    title: "Intelligence-Driven Systems",
    description: "We embed AI, automation, and real-time data feeds directly into operations to help your teams act faster and decide smarter.",
    icon: "🧠",
    accent: "#8B5CF6",
  },
  {
    title: "15+ Years Enterprise Rigor",
    description: "Established in 2009 by Zamooq Limited, our delivery track record spans enterprise applications, ledgers, and critical infrastructure.",
    icon: "🏛️",
    accent: "#2563EB",
  },
  {
    title: "Cloud-Native & Serverless",
    description: "Systems designed to be secure, resilient, infinitely scalable, and immediately adaptable as your market evolves.",
    icon: "⚡",
    accent: "#14B8A6",
  },
  {
    title: "Security & Governance by Design",
    description: "Security, compliance (HIPAA, GDPR, ISO), and responsible AI practice built in from day one of code.",
    icon: "🛡️",
    accent: "#F43F5E",
  },
  {
    title: "Decade-Scale Partnership",
    description: "We provide ongoing architectural stewardship, quarterly upgrades, and sub-15 minute emergency critical SLAs.",
    icon: "🤝",
    accent: "#10B981",
  },
];

const deliverySteps: DeliveryStep[] = [
  { number: "01", label: "Discover", description: "We map your commercial bottlenecks, technology landscape, and data models." },
  { number: "02", label: "Design", description: "We architect secure, scalable solutions designed to connect systems and enable intelligence." },
  { number: "03", label: "Build", description: "We develop and configure using rapid agile delivery — keeping cycles short and quality uncompromised." },
  { number: "04", label: "Connect", description: "We integrate applications, APIs, and data into a unified, synchronized technology mesh." },
  { number: "05", label: "Automate", description: "We deploy autonomous AI agents and automated workflows to eliminate repetitive labor." },
  { number: "06", label: "Evolve", description: "We continuously monitor telemetry and evolve your systems as your market demands change." },
];

const industriesList = [
  { name: "Financial Services", icon: "💳", accent: "#10B981", desc: "Regulated fintech, ledgers & real-time risk scoring." },
  { name: "Professional Services", icon: "💼", accent: "#F59E0B", desc: "Client portals, billing automation & document intelligence." },
  { name: "Property & Facilities", icon: "🏢", accent: "#14B8A6", desc: "Building IoT diagnostics, maintenance & lease workflows." },
  { name: "Public Sector", icon: "🏛️", accent: "#0EA5E9", desc: "Citizen portals, case intake & strict sovereign governance." },
  { name: "Education", icon: "🎓", accent: "#8B5CF6", desc: "Campus management, fee reconciliation & student portals." },
  { name: "Healthcare", icon: "🏥", accent: "#F43F5E", desc: "Clinical EHR, lab auto-analyzers & hospital pharmacy FIFO." },
  { name: "Retail & E-Commerce", icon: "🛍️", accent: "#F97316", desc: "Offline-first POS, multi-till sync & live store analytics." },
  { name: "Technology & SaaS", icon: "☁️", accent: "#6366F1", desc: "Multi-tenant architecture, serverless APIs & AI copilots." },
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

// ─── Hydration-Safe Counter ──────────────────────────────────────────────────

function AnimatedStat({ value, suffix = "" }: { value: string; suffix?: string }) {
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

// ─── 3D Magnetic Gyroscope Tilt Card ─────────────────────────────────────────

function GyroCard({
  children,
  className = "",
  accent = "#3B82F6",
}: {
  children: React.ReactNode;
  className?: string;
  accent?: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rX = ((y - centerY) / centerY) * -6;
    const rY = ((x - centerX) / centerX) * 6;
    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords(null);
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        scale: isHovered ? 1.015 : 1,
      }}
      transition={{ type: "spring", stiffness: 240, damping: 22 }}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      className={`relative overflow-hidden rounded-3xl border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/60 backdrop-blur-md shadow-2xl transition-all ${className}`}
    >
      {/* Cursor Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity: coords ? 1 : 0,
          background: coords
            ? `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, ${accent}22, transparent 70%)`
            : "none",
        }}
        aria-hidden="true"
      />
      {children}
    </motion.div>
  );
}

// ─── Main Home Page Component ────────────────────────────────────────────────

export default function HomePage() {
  const heroMotion = useHeroMotion();
  const [activeSolutionId, setActiveSolutionId] = useState<SolutionCategory>("ai");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const activeSolution =
    solutions.find((s) => s.id === activeSolutionId) || solutions[0];

  return (
    <div
      suppressHydrationWarning
      className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[var(--accent-hover)] selection:text-black overflow-x-hidden"
    >
      {/* Top Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-500 via-violet-500 via-amber-500 to-emerald-500 origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* Cyber Background Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <ParticleNetwork />
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="home-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#home-grid)" />
        </svg>

        {/* Ambient Halo Glows */}
        <div className="absolute top-[12%] left-[5%] w-[650px] h-[650px] rounded-full bg-blue-600/[0.05] blur-[180px] pointer-events-none" />
        <div className="absolute top-[35%] right-[5%] w-[650px] h-[650px] rounded-full bg-violet-600/[0.05] blur-[180px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-[8%] w-[650px] h-[650px] rounded-full bg-emerald-600/[0.04] blur-[180px] pointer-events-none" />
      </div>

      <Navbar />

      <main className="relative z-10">

        {/* ── HERO: THE NEURAL NEXUS ENGINE ─────────────────────────────────── */}
        <section
          aria-labelledby="home-hero-heading"
          className="max-w-7xl mx-auto px-6 pt-40 pb-20 text-center flex flex-col items-center"
        >
          {/* Top Category Badge */}
          <motion.div
            {...heroMotion.badge}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono font-medium text-[var(--accent-hover)] mb-8 backdrop-blur-xl shadow-lg"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-hover)] animate-pulse" />
            Connecting Intelligence · Enabling Action
          </motion.div>

          {/* Heading */}
          <motion.h1
            id="home-hero-heading"
            {...heroMotion.heading}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]"
          >
            Engineering mission-critical systems for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-400 via-violet-400 to-emerald-400">
              the autonomous enterprise.
            </span>
          </motion.h1>

          <motion.p
            {...heroMotion.paragraph}
            className="mt-6 text-base sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
          >
            ZamNexus synthesizes 15+ years of enterprise architecture with artificial intelligence,
            cloud-native engineering, and four purpose-built proprietary SaaS engines.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            {...heroMotion.actions}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link href="/Contact" className="liquid-lime-btn text-base py-4 px-8">
              <span>Start an Engagement</span>
              <span className="arrow-icon w-8 h-8 text-sm" aria-hidden="true">→</span>
            </Link>
            <Link
              href="/Products"
              className="px-7 py-4 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-600 font-semibold text-sm transition-all duration-300"
            >
              Explore Flagship Products →
            </Link>
          </motion.div>

          {/* System Telemetry HUD */}
          <motion.div
            {...heroMotion.telemetry}
            className="mt-16 w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-800/20 backdrop-blur-md shadow-2xl"
          >
            {[
              { val: "15+", label: "Years Enterprise Heritage" },
              { val: "750+", label: "Live Retail Registers" },
              { val: "5+", label: "Industrial Plants" },
              { val: "99.99%", label: "Verified Core Uptime" },
            ].map((stat) => (
              <div key={stat.label} className="bg-zinc-900/40 px-5 py-4 text-center group hover:bg-zinc-800/40 transition-colors">
                <div className="text-xl sm:text-2xl font-bold font-mono text-white group-hover:text-[var(--accent-hover)] transition-colors">
                  <AnimatedStat value={stat.val} />
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── FLAGSHIP PRODUCTS 3D GYROSCOPE SHOWCASE ──────────────────────── */}
        <section
          aria-labelledby="flagship-products-heading"
          className="max-w-7xl mx-auto px-6 py-24 border-t border-zinc-800/60"
        >
          {/* Live Connected Enterprise Workflow Highway */}
          <div className="mb-14 p-5 sm:p-6 rounded-3xl bg-zinc-950/80 border border-zinc-800/90 shadow-2xl relative overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/70 pb-3.5 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full animate-ping bg-[var(--accent-hover)]" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                  ZamNexus Unified Enterprise Highway // Live Telemetry Stream
                </span>
              </div>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Zero-Downtime Mesh Synced
              </span>
            </div>

            {/* Visual 4-Core Workflow Stream with Moving Energy Packets */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 relative z-10">
              {[
                { code: "ZNXERP", step: "01. Industrial MES", stat: "99.2% Yield", accent: "#3B82F6" },
                { code: "ZNXePOS", step: "02. Retail Tills", stat: "0.08s Scan", accent: "#F59E0B" },
                { code: "ZNXEdu", step: "03. Campus Ops", stat: "1.2s Alerts", accent: "#8B5CF6" },
                { code: "ZNXCare", step: "04. Hospital EHR", stat: "0 Error Dispense", accent: "#10B981" },
              ].map((node, i) => (
                <div
                  key={node.code}
                  className="p-3.5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between"
                  style={{ borderLeftWidth: "3px", borderLeftColor: node.accent }}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-1">
                    <span className="font-bold text-white">{node.code}</span>
                    <span style={{ color: node.accent }}>{node.stat}</span>
                  </div>
                  <div className="text-xs font-mono text-zinc-300 font-semibold">{node.step}</div>
                </div>
              ))}
            </div>

            {/* Glowing Pipeline Connector Beam */}
            <div className="hidden lg:block relative mt-4 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #3B82F6, #F59E0B, #8B5CF6, #10B981)",
                  boxShadow: "0 0 12px #3B82F6",
                }}
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 3,
                  ease: "linear",
                }}
              />
            </div>
          </div>

          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
              Proprietary Technology Cores
            </span>
            <h2
              id="flagship-products-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3 leading-tight"
            >
              Four Purpose-Built Enterprise Engines
            </h2>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
              Tailored industrial cores engineered with real-time ledgers, offline edge resilience, and unified AI copilots.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {flagshipProducts.map((prod) => (
              <GyroCard key={prod.id} accent={prod.accent} className="p-8 sm:p-10 flex flex-col justify-between group">
                <div className="relative z-10">
                  {/* Top Accent Gradient Line */}
                  <div
                    className="absolute -top-8 -left-8 -right-8 h-[2.5px]"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${prod.accent}, transparent)`,
                    }}
                  />

                  <div className="flex items-center justify-between mb-6">
                    <div className="p-2.5 rounded-2xl bg-zinc-950/80 border border-zinc-800 shadow">
                      <Image
                        src={prod.logo}
                        alt={`${prod.code} Logo`}
                        width={130}
                        height={40}
                        className="h-7 w-auto object-contain"
                      />
                    </div>
                    <span
                      className="text-xs font-mono font-bold px-3 py-1 rounded-full border"
                      style={{
                        borderColor: `${prod.accent}50`,
                        background: `${prod.accent}12`,
                        color: prod.accent,
                      }}
                    >
                      {prod.stat} {prod.statLabel}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {prod.name}
                  </h3>
                  <p className="text-xs font-mono mb-4" style={{ color: prod.accent }}>
                    {prod.tagline}
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {prod.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-8">
                    {prod.modules.map((mod) => (
                      <span
                        key={mod}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-zinc-950/70 border border-zinc-800 text-zinc-300"
                      >
                        {mod}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 pt-4 border-t border-zinc-800/60 flex flex-wrap sm:flex-nowrap items-center justify-between gap-3">
                  <Link
                    href={prod.href}
                    className="text-xs font-mono font-bold text-white hover:text-[var(--accent-hover)] transition-colors flex items-center gap-2"
                  >
                    <span>Explore {prod.code} Architecture</span>
                    <span>→</span>
                  </Link>
                  <Link
                    href="/Contact"
                    className="inline-flex items-center justify-center px-3.5 py-1.5 rounded-full border border-zinc-700 bg-zinc-800/80 hover:bg-zinc-700/90 hover:border-zinc-500 text-zinc-100 hover:text-white text-xs font-mono font-semibold transition-all duration-150 ease-out hover:scale-[1.03] hover:-translate-y-0.5 active:scale-[0.98] shadow-sm flex-shrink-0"
                  >
                    Request Demo
                  </Link>
                </div>
              </GyroCard>
            ))}
          </div>
        </section>

        {/* ── INTERACTIVE SOLUTIONS ENGINE (TABBED PROGRESSIVE MATRIX) ─────── */}
        <section
          aria-labelledby="solutions-matrix-heading"
          className="max-w-7xl mx-auto px-6 py-24 border-t border-zinc-800/60"
        >
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
              Engineering Disciplines
            </span>
            <h2
              id="solutions-matrix-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3 leading-tight"
            >
              The Intelligent Solutions Engine
            </h2>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
              Click through our specialized technology practices to inspect live capability profiles, architectures, and metrics.
            </p>
          </div>

          {/* Interactive Category Switcher Tabs */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            {solutions.map((sol) => (
              <PillTab
                key={sol.id}
                variant="pill"
                isSelected={sol.id === activeSolutionId}
                onClick={() => setActiveSolutionId(sol.id)}
                icon={<span style={{ color: sol.accent }}>{sol.icon}</span>}
                label={sol.shortLabel || sol.tag}
                accent={sol.accent}
                layoutId="solution-tab-pill"
              />
            ))}
          </div>

          {/* Active Solution Stage with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSolution.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.35 }}
              className="p-8 sm:p-14 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md shadow-2xl relative overflow-hidden"
              style={{ borderLeftWidth: "3px", borderLeftColor: activeSolution.accent }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                <div className="lg:col-span-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-2xl" style={{ color: activeSolution.accent }}>
                      {activeSolution.icon}
                    </span>
                    <span
                      className="text-xs font-mono font-bold uppercase tracking-widest"
                      style={{ color: activeSolution.accent }}
                    >
                      {activeSolution.tag}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
                    {activeSolution.title}
                  </h3>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-8">
                    {activeSolution.description}
                  </p>

                  <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 mb-8 flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-500">Benchmark Telemetry:</span>
                    <span className="font-semibold text-white flex items-center gap-2" style={{ color: activeSolution.accent }}>
                      <span>⚡</span>
                      {activeSolution.telemetry}
                    </span>
                  </div>

                  <Link href="/Solutions" className="liquid-lime-btn text-xs sm:text-sm py-3 px-6 inline-flex">
                    <span>Explore Solution Blueprints</span>
                    <span className="arrow-icon w-6 h-6 text-xs" aria-hidden="true">→</span>
                  </Link>
                </div>

                <div className="lg:col-span-6">
                  <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-4 border-b border-zinc-800/60 pb-3">
                    Key Solution Capabilities ({activeSolution.capabilities.length})
                  </div>
                  <div className="space-y-3">
                    {activeSolution.capabilities.map((cap, i) => (
                      <motion.div
                        key={cap}
                        whileHover={{ x: 6, borderColor: activeSolution.accent }}
                        className="flex items-center justify-between p-3.5 rounded-2xl border border-zinc-800/80 bg-zinc-950/50 text-xs sm:text-sm text-zinc-300 hover:text-white transition-all duration-200"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0"
                            style={{ background: activeSolution.accent }}
                          />
                          <span className="font-medium">{cap}</span>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-600">0{i + 1}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </section>

        {/* ── CROSS-ENGINE INTEGRATION BLUEPRINT (SVG SIGNAL PIPELINES) ───── */}
        <section
          aria-labelledby="blueprint-heading"
          className="max-w-7xl mx-auto px-6 py-24 border-t border-zinc-800/60"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
              Architectural Cohesion
            </span>
            <h2
              id="blueprint-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3 leading-tight"
            >
              The Unified Integration Blueprint
            </h2>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
              How ZamNexus connects proprietary engines, commercial CRMs, and autonomous AI copilots into one continuous data nervous system.
            </p>
          </div>

          <div className="p-8 sm:p-12 rounded-3xl bg-zinc-950/80 border border-zinc-800/90 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center items-center">
              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-blue-500/40">
                <div className="text-2xl mb-2">⚙️</div>
                <div className="font-bold text-white text-sm">Industrial &amp; Retail Core</div>
                <div className="text-xs font-mono text-blue-400 mt-1">ZNXERP + ZNXePOS</div>
                <div className="text-[11px] font-mono text-zinc-400 mt-3">Ledger Entries · SKU Barcodes · Tills</div>
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-emerald-500/50 shadow-2xl">
                <div className="text-2xl mb-2">🧠</div>
                <div className="font-bold text-white text-sm">ZamNexus Reasoning Mesh</div>
                <div className="text-xs font-mono text-emerald-400 mt-1">● Sub-Second Event Broker</div>
                <div className="text-[11px] font-mono text-zinc-300 mt-3 bg-zinc-950 p-2 rounded-lg border border-zinc-800">
                  Zero-Copy Data Lakehouse · Autonomous RAG · SSO
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-violet-500/40">
                <div className="text-2xl mb-2">⊞</div>
                <div className="font-bold text-white text-sm">Enterprise CRMs &amp; Cloud</div>
                <div className="text-xs font-mono text-violet-400 mt-1">Microsoft &amp; Salesforce</div>
                <div className="text-[11px] font-mono text-zinc-400 mt-3">Copilot Studio · Agentforce · Azure</div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONNECTED DELIVERY TIMELINE (DISCOVER TO EVOLVE) ─────────────── */}
        <section
          aria-labelledby="delivery-heading"
          className="max-w-7xl mx-auto px-6 py-24 border-t border-zinc-800/60"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
              Methodology
            </span>
            <h2
              id="delivery-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3 leading-tight"
            >
              From Discovery to Continuous Evolution
            </h2>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
              A disciplined, six-step engineering delivery roadmap designed to eliminate risk and ensure immediate production velocity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverySteps.map((step) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -4 }}
                className="p-7 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 relative overflow-hidden shadow-lg group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-10 h-10 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs font-mono font-bold text-[var(--accent-hover)] flex items-center justify-center">
                      {step.number}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-600">PHASE 0{step.number.slice(-1)}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {step.label}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── 8-INDUSTRY SECTOR BENTO GRID ─────────────────────────────────── */}
        <section
          aria-labelledby="industries-grid-heading"
          className="max-w-7xl mx-auto px-6 py-24 border-t border-zinc-800/60"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
              Sector Mastery
            </span>
            <h2
              id="industries-grid-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3 leading-tight"
            >
              Intelligent Solutions by Sector
            </h2>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
              Every vertical brings unique operational workflows and regulatory mandates. Explore how we engineer solutions tailored to your sector.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {industriesList.map((ind) => (
              <Link
                key={ind.name}
                href="/Products/Industries"
                className="p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:bg-zinc-900/70 hover:border-zinc-600 transition-all duration-300 flex flex-col justify-between group shadow-md"
              >
                <div>
                  <div className="text-2xl mb-3 p-2 rounded-xl bg-zinc-950/80 border border-zinc-800 w-fit">
                    {ind.icon}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1 group-hover:text-white transition-colors">
                    {ind.name}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {ind.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-800/60 text-[10px] font-mono text-zinc-500 group-hover:text-[var(--accent-hover)] transition-colors">
                  Explore Vertical →
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── WHY ZAMNEXUS: THE 6 STRATEGIC MOATS ───────────────────────────── */}
        <section
          aria-labelledby="why-heading"
          className="max-w-7xl mx-auto px-6 py-24 border-t border-zinc-800/60"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
              The Strategic Moat
            </span>
            <h2
              id="why-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3 leading-tight"
            >
              Why Enterprises Partner with ZamNexus
            </h2>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
              We combine deep polyglot engineering with business empathy to guarantee measurable platform outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyPoints.map((point) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -6, borderColor: point.accent }}
                className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 relative overflow-hidden shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="text-3xl mb-4 p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800 w-fit">
                    {point.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {point.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {point.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── CLIENT TRUST MARQUEE ─────────────────────────────────────────── */}
        <section
          aria-labelledby="home-marquee-heading"
          className="border-t border-zinc-800/60 border-b border-zinc-800/60 py-14 overflow-hidden relative bg-zinc-950/40 backdrop-blur-sm"
        >
          <div className="max-w-6xl mx-auto px-6 text-center mb-6">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500 font-bold">
              Trusted By Regulated Enterprises &amp; High-Volume Retail
            </span>
            <h2 id="home-marquee-heading" className="sr-only">Verified Enterprise Clients</h2>
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
        <FinalCTA
          id="home-cta-heading"
          eyebrow="Deploy with Total Confidence"
          headline="Let's build what's next for your business."
          description="Whether you need a dedicated enterprise product deployment, an autonomous AI copilot integration, or complete cloud-native modern engineering — our senior architects are ready to partner with you."
          primaryButton={{
            label: "Schedule Executive Briefing",
            href: "/Contact",
          }}
          secondaryButton={{
            label: "Explore Solutions Architecture →",
            href: "/Solutions",
          }}
          sidePanel={{
            title: "ZamNexus Deployment SLA",
            items: [
              { label: "Direct Principal Architect Pairing", sublabel: "Zero junior gatekeepers" },
              { label: "Penny-Perfect Ledger Guarantee", sublabel: "Parallel ledger reconciliation" },
              { label: "Sub-15min Emergency SLA", sublabel: "24/7 dedicated enterprise TAM" },
            ],
          }}
        />

      </main>

      <Footer hideCTA />
    </div>
  );
}
