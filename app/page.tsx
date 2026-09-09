"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ParticleNetwork from "@/components/ParticleNetwork";
import AnimatedStat from "@/components/AnimatedStat";
import ScrollReveal from "@/components/ScrollReveal";
import DeliveryTimeline from "@/components/DeliveryTimeline";
import { useParallax } from "@/hooks/useParallax";

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
  title: string;
  description: string;
  capabilities: string[];
}

type WhyIcon = "briefcase" | "spark" | "building" | "cloud" | "shield" | "trending";

interface WhyPoint {
  title: string;
  description: string;
  icon: WhyIcon;
  accent: string;
}

interface DeliveryStep {
  number: string;
  label: string;
  description: string;
}

interface TechGroup {
  label: string;
  items: string[];
}

interface Industry {
  name: string;
  href: string;
}

// ─── Static Data ─────────────────────────────────────────────────────────────

const solutions: Solution[] = [
  {
    id: "ai",
    icon: "◈",
    tag: "AI & ML",
    title: "AI & Intelligent Solutions",
    description:
      "Practical Artificial Intelligence that gets things done, not AI that just talks about it. From copilots and autonomous AI agents to document intelligence and governed, responsible automation.",
    capabilities: [
      "AI Assistants & Copilots",
      "Autonomous AI Agents",
      "Generative AI",
      "Responsible & Governed AI",
      "Knowledge & Document Intelligence",
      "AI Strategy & Architecture",
    ],
  },
  {
    id: "saas",
    icon: "⬡",
    tag: "SAAS PRODUCTS",
    title: "SaaS Product Development",
    description:
      "We design and build scalable, multi-tenant SaaS products — from early concept to enterprise-ready platform — with security, API-first architecture and growth built in from day one.",
    capabilities: [
      "Product Strategy & Architecture",
      "Multi-Tenant Applications",
      "Customer & Partner Portals",
      "API-First Platforms",
    ],
  },
  {
    id: "cloud",
    icon: "⬢",
    tag: "CLOUD & DEVOPS",
    title: "Cloud-Native & Serverless Engineering",
    description:
      "Modern, event-driven backend systems built with Node.js, TypeScript and AWS serverless architecture — resilient, cost-efficient and designed to adapt as your business grows.",
    capabilities: [
      "Cloud-Native Backend Development",
      "Event-Driven Systems",
      "Infrastructure-as-Code",
      "CI/CD Automation",
    ],
  },
  {
    id: "automation",
    icon: "⟐",
    tag: "AUTOMATION",
    title: "Intelligent Automation",
    description:
      "We connect applications, remove manual work and build workflows that combine traditional automation with AI agents that can act on your behalf — freeing your teams for higher-value work.",
    capabilities: [
      "Workflow Automation",
      "Intelligent Process Automation",
      "AI-Enhanced Workflows",
      "Event-Driven Automation",
    ],
  },
  {
    id: "microsoft",
    icon: "⊞",
    tag: "MICROSOFT",
    title: "Microsoft Business Solutions",
    description:
      "Consulting, architecture and delivery across Dynamics 365, Power Platform, Azure and Microsoft Copilot — helping you get more from the Microsoft ecosystem you already run on.",
    capabilities: [
      "Dynamics 365",
      "Power Platform",
      "Microsoft Copilot",
      "Azure Integration Services",
    ],
  },
  {
    id: "salesforce",
    icon: "⊙",
    tag: "SALESFORCE",
    title: "Salesforce Solutions",
    description:
      "Implementation, architecture, integration and AI — built around your business and your growth ambitions, not just the platform.",
    capabilities: [
      "Salesforce Consulting",
      "Solution Architecture",
      "CRM Optimisation",
      "AI & Data Solutions",
    ],
  },
];

const whyPoints: WhyPoint[] = [
  {
    title: "Business-Focused",
    description:
      "We start with your business challenges, opportunities and goals — not just the technology.",
    icon: "briefcase",
    accent: "#F59E0B",
  },
  {
    title: "Intelligence-Driven",
    description:
      "We help you use AI, automation and real-time data to make smarter decisions and act faster.",
    icon: "spark",
    accent: "#8B5CF6",
  },
  {
    title: "Enterprise Experience",
    description:
      "Proven delivery of complex enterprise applications, integrations and technology programmes.",
    icon: "building",
    accent: "#2563EB",
  },
  {
    title: "Cloud-Native Thinking",
    description:
      "Systems designed to be secure, resilient, scalable and ready to evolve.",
    icon: "cloud",
    accent: "#14B8A6",
  },
  {
    title: "Secure & Responsible by Design",
    description:
      "Security, governance and responsible AI practice built in from the start, not bolted on afterwards.",
    icon: "shield",
    accent: "#F43F5E",
  },
  {
    title: "Built to Scale",
    description:
      "Solutions designed to grow with your organisation and adapt to changing business needs.",
    icon: "trending",
    accent: "#10B981",
  },
];

const deliverySteps: DeliveryStep[] = [
  {
    number: "01",
    label: "Discover",
    description:
      "We understand your business, challenges, technology landscape and opportunities.",
  },
  {
    number: "02",
    label: "Design",
    description:
      "We define the right strategy, architecture and technology approach for your solution.",
  },
  {
    number: "03",
    label: "Build",
    description:
      "We design, develop and configure secure, scalable and intelligent solutions.",
  },
  {
    number: "04",
    label: "Connect",
    description:
      "We integrate your applications, APIs, systems and data to create a connected technology ecosystem.",
  },
  {
    number: "05",
    label: "Automate",
    description:
      "We introduce automation and AI agents to improve efficiency and enable faster action.",
  },
  {
    number: "06",
    label: "Evolve",
    description:
      "We continuously improve and evolve your technology as your organisation and opportunities grow.",
  },
];

const techGroups: TechGroup[] = [
  {
    label: "Artificial Intelligence",
    items: [
      "AI Agents",
      "Generative AI",
      "Copilots",
      "AI Governance",
      "Intelligent Automation",
      "Knowledge Solutions",
    ],
  },
  {
    label: "Cloud & Engineering",
    items: [
      "AWS",
      "Serverless",
      "Node.js",
      "TypeScript",
      "APIs",
      "Event-Driven Architecture",
      "Infrastructure-as-Code",
      "CI/CD",
    ],
  },
  {
    label: "Microsoft",
    items: [
      "Dynamics 365",
      "Power Platform",
      "Azure",
      "Dataverse",
      "Power Apps",
      "Power Automate",
      "Copilot",
    ],
  },
  {
    label: "Salesforce",
    items: [
      "Sales Cloud",
      "Service Cloud",
      "Automation",
      "Integration",
      "Data Solutions",
    ],
  },
];

const industries: Industry[] = [
  { name: "Financial Services", href: "/Industries" },
  { name: "Professional Services", href: "/Industries" },
  { name: "Property & Facilities Management", href: "/Industries" },
  { name: "Retail & E-Commerce", href: "/Industries" },
  { name: "Education", href: "/Industries" },
  { name: "Healthcare", href: "/Industries" },
  { name: "Public Sector", href: "/Industries" },
  { name: "Non-Profit Organisations", href: "/Industries" },
  { name: "Technology & SaaS", href: "/Industries" },
];

// ─── Icons ───────────────────────────────────────────────────────────────────

const whyIconPaths: Record<WhyIcon, string> = {
  briefcase:
    "M3 7h18v13H3V7Z M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2 M3 12h18",
  spark: "M13 2 4 14h6l-1 8 9-12h-6l1-8Z",
  building:
    "M4 3h16v18H4V3Z M9 21v-4h6v4 M9 8h1.5 M13.5 8H15 M9 12h1.5 M13.5 12H15 M9 16h1.5 M13.5 16H15",
  cloud:
    "M6 18h11a4 4 0 0 0 .5-7.97A6 6 0 0 0 5.5 11 4 4 0 0 0 6 18Z",
  shield: "M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z M9 12l2 2 4-4",
  trending: "M3 17l6-6 4 4 8-8 M17 7h4v4",
};

interface WhyPointIconProps {
  icon: WhyIcon;
}

function WhyPointIcon({ icon }: WhyPointIconProps) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={whyIconPaths[icon]} />
    </svg>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeSolution, setActiveSolution] = useState<SolutionCategory>("ai");

  const activeSolutionData = solutions.find((s) => s.id === activeSolution)!;

  // Subtle 20px parallax on decorative background blobs
  const whyBlobRef = useParallax<HTMLDivElement>(0.1, 20);
  const timelineBlobRef = useParallax<HTMLDivElement>(-0.08, 20);
  const visionBlobRef = useParallax<HTMLDivElement>(0.12, 20);

  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[#D0FF71] selection:text-black overflow-x-hidden">
      {/* Background editorial grid */}
      <div className="fixed inset-0 bg-ziel-grid opacity-60 pointer-events-none z-0" aria-hidden="true" />

      {/* Floating Capsule Navbar */}
      <Navbar />

      <main className="relative z-10">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="hero-heading"
          className="relative isolate overflow-hidden max-w-6xl mx-auto px-6 pt-44 pb-24 text-center flex flex-col items-center"
        >
          {/* Floating gradient orb — behind everything */}
          <div className="hero-orb" aria-hidden="true" />

          {/* Particle network — neural-net background */}
          <ParticleNetwork />

          {/* Grain texture for depth */}
          <div className="noise-overlay" aria-hidden="true" />

          {/* Status badge — staggered word reveal on load */}
          <div className="relative z-10 inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-zinc-800 bg-zinc-900/90 text-xs font-mono font-medium text-zinc-300 mb-8 backdrop-blur-xl shadow-xl shadow-black/40">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-hover)] animate-pulse shadow-[0_0_8px_var(--accent-hover)]" aria-hidden="true" />
            <span className="font-semibold tracking-wide text-[var(--accent-hover)]">
              {"Connecting Intelligence. Enabling Action.".split(" ").map((word, i) => (
                <span
                  key={`${word}-${i}`}
                  className="tagline-word"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  {word}
                  {i < 4 ? " " : ""}
                </span>
              ))}
            </span>
          </div>

          {/* H1 — single per page */}
          <h1
            id="hero-heading"
            className="relative z-10 text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl text-balance leading-[1.08] text-white"
          >
            We Build AI Systems That Work.{" "}
            <span className="typewriter-text">Not Demos.</span>
          </h1>

          <p className="relative z-10 mt-7 text-lg sm:text-xl text-zinc-400 max-w-2xl leading-relaxed text-balance">
            ZamNexus helps organisations simplify complex processes, connect
            fragmented systems and unlock the value of their data — using
            Artificial Intelligence, agentic automation, cloud-native
            engineering and modern business applications.
          </p>

          {/* CTAs — each with a secondary micro-copy line */}
          <div className="relative z-10 mt-10 flex flex-wrap items-start justify-center gap-6">
            <div className="flex flex-col items-center gap-2">
              <Link href="/Solutions" className="liquid-lime-btn text-base py-4 px-8">
                <span>Explore Our Solutions</span>
                <span className="arrow-icon w-8 h-8 text-sm" aria-hidden="true">→</span>
              </Link>
              <span className="text-xs text-zinc-500 font-mono">6 capabilities · one team</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Link
                href="/Contact"
                className="px-7 py-4 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-600 font-semibold text-sm transition-all duration-300"
              >
                Talk to Us →
              </Link>
              <span className="text-xs text-zinc-500 font-mono">No commitment · 30-min call</span>
            </div>
          </div>

          {/* Stat bar — counts up on viewport entry */}
          <div className="relative z-10 mt-16 w-full max-w-3xl grid grid-cols-3 gap-px rounded-2xl overflow-hidden border border-zinc-800/60 bg-zinc-800/20">
            {[
              { value: "15+", label: "Years Experience" },
              { value: "6", label: "Core Capabilities" },
              { value: "9", label: "Industries Served" },
            ].map((stat) => (
              <div key={stat.label} className="bg-zinc-900/40 px-6 py-5 text-center">
                <AnimatedStat
                  value={stat.value}
                  accent="#ffffff"
                  className="!text-2xl sm:!text-3xl"
                />
                <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TECHNOLOGY THAT CONNECTS EVERYTHING ───────────────────────────── */}
        <section
          aria-labelledby="connects-heading"
          className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <ScrollReveal className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
                Our Purpose
              </span>
              <h2
                id="connects-heading"
                className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3 leading-tight"
              >
                Technology That Connects Everything
              </h2>
            </div>
            <div className="space-y-5 text-zinc-400 text-base leading-relaxed">
              <p>
                Modern organisations run on a growing web of systems, applications, data sources and
                digital platforms — and increasingly, on AI agents that act within them. ZamNexus brings
                it all together.
              </p>
              <p>
                We combine business expertise, enterprise technology, cloud engineering and Artificial
                Intelligence to build connected solutions that improve efficiency, automate processes and
                support faster, better decisions — in real time, not just in hindsight.
              </p>
              <p>
                Whether you are modernising legacy systems, building a cloud-native platform, launching
                a SaaS product, automating business processes or putting AI agents to work in your
                organisation, we help turn ideas into practical, scalable solutions.
              </p>
            </div>
          </ScrollReveal>
        </section>

        {/* ── WHAT WE DO — INTERACTIVE SOLUTION EXPLORER ────────────────────── */}
        <section
          aria-labelledby="solutions-heading"
          className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <ScrollReveal>
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
              What We Do
            </span>
            <h2
              id="solutions-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3"
            >
              Six Ways We Create Value
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl text-base leading-relaxed line-clamp-2">
              From AI strategy to cloud engineering, our capabilities span the full technology lifecycle.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-0 lg:rounded-3xl lg:overflow-hidden lg:border lg:border-zinc-800">
            {/* Tab selector */}
            <nav
              aria-label="Solution categories"
              className="lg:border-r lg:border-zinc-800 flex flex-row lg:flex-col overflow-x-auto lg:overflow-visible gap-1 lg:gap-0 pb-2 lg:pb-0"
            >
              {solutions.map((sol) => (
                <button
                  key={sol.id}
                  id={`solution-tab-${sol.id}`}
                  aria-selected={activeSolution === sol.id}
                  role="tab"
                  onClick={() => setActiveSolution(sol.id)}
                  className={`flex-shrink-0 lg:flex-shrink text-left px-6 py-5 transition-all duration-200 border-b border-zinc-800/60 last:border-b-0 group ${
                    activeSolution === sol.id
                      ? "bg-[#D0FF71]/8 border-l-2 border-l-[#D0FF71]"
                      : "hover:bg-zinc-900/60"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-xl font-mono transition-colors ${
                        activeSolution === sol.id
                          ? "text-[#D0FF71]"
                          : "text-zinc-600 group-hover:text-zinc-400"
                      }`}
                      aria-hidden="true"
                    >
                      {sol.icon}
                    </span>
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 mb-0.5">
                        {sol.tag}
                      </div>
                      <div
                        className={`text-sm font-semibold leading-snug transition-colors ${
                          activeSolution === sol.id
                            ? "text-white"
                            : "text-zinc-400 group-hover:text-zinc-200"
                        }`}
                      >
                        {sol.title}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </nav>

            {/* Active solution detail panel */}
            <div
              role="tabpanel"
              aria-labelledby={`solution-tab-${activeSolution}`}
              className="lg:col-span-2 p-8 sm:p-12 bg-zinc-900/30"
            >
              <div className="space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
                    {activeSolutionData.tag}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2 leading-snug">
                    {activeSolutionData.title}
                  </h3>
                  <p className="mt-4 text-zinc-400 text-base leading-relaxed">
                    {activeSolutionData.description}
                  </p>
                </div>

                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-zinc-500 mb-3">
                    Capabilities
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeSolutionData.capabilities.map((cap) => (
                      <li key={cap} className="check-item">
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-2">
                  <Link
                    href="/Solutions"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#D0FF71] hover:underline underline-offset-4 transition-all"
                  >
                    Explore {activeSolutionData.title}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          </ScrollReveal>
        </section>

        {/* ── WHY ZAMNEXUS ─────────────────────────────────────────────────── */}
        <section
          aria-labelledby="why-heading"
          className="relative isolate overflow-hidden max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div
            ref={whyBlobRef}
            className="absolute -top-10 -left-16 w-72 h-72 rounded-full bg-zinc-500/5 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <ScrollReveal className="relative z-10">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
                Why ZamNexus
              </span>
              <h2
                id="why-heading"
                className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3"
              >
                Business Understanding Meets Technology Expertise
              </h2>
              <p className="mt-3 text-zinc-400 text-base leading-relaxed max-w-xl line-clamp-2">
                Six reasons enterprise teams choose ZamNexus over a generic dev shop.
              </p>
            </div>
            <Link
              href="/About"
              className="flex-shrink-0 text-sm font-semibold text-zinc-400 hover:text-[#D0FF71] transition-colors"
            >
              About ZamNexus →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
            {whyPoints.map((point, idx) => (
              <ScrollReveal key={point.title} delay={idx * 100} className="h-full">
                <div
                  className="glass-capability-card h-full"
                  style={{ "--card-accent": point.accent } as CSSProperties}
                >
                  <div className="glass-capability-icon">
                    <WhyPointIcon icon={point.icon} />
                  </div>
                  <h3 className="glass-capability-title">
                    {point.title}
                  </h3>
                  <p className="glass-capability-desc">
                    {point.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          </ScrollReveal>
        </section>

        {/* ── FROM IDEA TO INTELLIGENT SOLUTION — DELIVERY PROCESS ──────────── */}
        <section
          aria-labelledby="process-heading"
          className="relative isolate overflow-hidden max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div
            ref={timelineBlobRef}
            className="absolute top-1/3 -right-16 w-72 h-72 rounded-full bg-zinc-500/5 blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <ScrollReveal className="relative z-10">
          <div className="mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
              How We Deliver
            </span>
            <h2
              id="process-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3"
            >
              From Idea to Intelligent Solution
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl text-base leading-relaxed line-clamp-2">
              A proven six-step approach that underpins everything we build.
            </p>
          </div>

          <DeliveryTimeline steps={deliverySteps} />

          <div className="mt-10 text-center">
            <Link
              href="/Services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-[#D0FF71] transition-colors"
            >
              View our full services approach
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          </ScrollReveal>
        </section>

        {/* ── TECHNOLOGIES WE WORK WITH ─────────────────────────────────────── */}
        <section
          aria-labelledby="tech-heading"
          className="py-20 border-t border-zinc-800/60 overflow-hidden"
        >
          <ScrollReveal>
          {/* Section header — constrained width */}
          <div className="max-w-6xl mx-auto px-6 mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
                  Our Technology Stack
                </span>
                <h2
                  id="tech-heading"
                  className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-3"
                >
                  Technologies We Work With
                </h2>
                <p className="mt-3 text-zinc-400 text-base max-w-xl leading-relaxed line-clamp-2">
                  A curated ecosystem of cloud, AI, and enterprise platforms that power every solution we deliver.
                </p>
              </div>
              {/* Live indicator */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#D0FF71] opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#D0FF71]" />
                </span>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                  Continuously Expanding
                </span>
              </div>
            </div>
          </div>

          {/* ── Row 1 — Marquee RTL (AI + Cloud) ── */}
          {(() => {
            const row1: { tech: string; category: string }[] = [
              ...techGroups[0].items.map((t) => ({ tech: t, category: techGroups[0].label })),
              ...techGroups[1].items.map((t) => ({ tech: t, category: techGroups[1].label })),
            ];
            const row1Loop = [...row1, ...row1];
            return (
              <div className="marquee-fade-mask mb-4">
                <div className="animate-marquee flex" style={{ gap: "16px" }}>
                  {row1Loop.map((item, idx) => (
                    <div key={`r1-${idx}`} className="marquee-tech-card" style={{ marginRight: "16px" }}>
                      <span className="tech-category-label">{item.category}</span>
                      <span className="tech-name">{item.tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* ── Row 2 — Marquee RTL reversed (Microsoft + Salesforce) ── */}
          {(() => {
            const row2: { tech: string; category: string }[] = [
              ...techGroups[2].items.map((t) => ({ tech: t, category: techGroups[2].label })),
              ...techGroups[3].items.map((t) => ({ tech: t, category: techGroups[3].label })),
            ];
            const row2Loop = [...row2, ...row2];
            return (
              <div className="marquee-fade-mask">
                <div
                  className="animate-marquee-row2 flex"
                  style={{ gap: "16px", animationDirection: "reverse" }}
                >
                  {row2Loop.map((item, idx) => (
                    <div key={`r2-${idx}`} className="marquee-tech-card" style={{ marginRight: "16px" }}>
                      <span className="tech-category-label">{item.category}</span>
                      <span className="tech-name">{item.tech}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
          </ScrollReveal>
        </section>

        {/* ── INDUSTRIES TEASER ────────────────────────────────────────────── */}
        <section
          aria-labelledby="industries-heading"
          className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
                Industries We Support
              </span>
              <h2
                id="industries-heading"
                className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-3"
              >
                Solutions Adapted to Your Industry
              </h2>
              <p className="mt-3 text-zinc-400 text-base leading-relaxed max-w-xl line-clamp-2">
                Nine sectors, one delivery standard — the same rigour wherever we build.
              </p>
            </div>
            <Link
              href="/Industries"
              className="flex-shrink-0 text-sm font-semibold text-zinc-400 hover:text-[#D0FF71] transition-colors"
            >
              Explore all industries →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {industries.map((industry, idx) => (
              <ScrollReveal key={industry.name} variant="left" delay={idx * 60} threshold={0.4}>
                <Link
                  href={industry.href}
                  className="group flex items-center justify-between px-6 py-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-[#D0FF71]/50 hover:bg-zinc-900/70 transition-all duration-300"
                >
                  <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                    {industry.name}
                  </span>
                  <span
                    className="text-zinc-600 group-hover:text-[#D0FF71] group-hover:translate-x-1 transition-all duration-200"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          </ScrollReveal>
        </section>

        {/* ── THE FUTURE IS CONNECTED — VISION ─────────────────────────────── */}
        <section
          aria-labelledby="vision-heading"
          className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <ScrollReveal className="rounded-3xl bg-gradient-to-br from-zinc-900/90 via-zinc-900/60 to-zinc-950 border border-zinc-800 p-10 sm:p-16 relative overflow-hidden">
            {/* Decorative lime glow blob */}
            <div
              ref={visionBlobRef}
              className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#D0FF71]/5 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative z-10 max-w-3xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
                Our Vision
              </span>
              <h2
                id="vision-heading"
                className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-4 leading-tight"
              >
                The Future Is Connected.{" "}
                <span className="text-[#D0FF71]">Intelligent.</span>{" "}
                Actionable.
              </h2>
              <p className="mt-6 text-zinc-400 text-base sm:text-lg leading-relaxed">
                Artificial Intelligence and cloud technology are changing how organisations operate —
                and the shift from AI that answers questions to AI that takes action is only
                accelerating. ZamNexus helps businesses move beyond disconnected systems, manual
                processes and isolated data, towards a future where applications, data, automation
                and intelligence work together.
              </p>
              <p className="mt-4 text-zinc-400 text-base sm:text-lg leading-relaxed">
                We believe intelligence only creates value when it enables action. That&apos;s why we
                build technology that doesn&apos;t just process information — it helps organisations
                respond, automate, decide and move forward, responsibly and at pace.
              </p>
              <div className="mt-8 flex flex-wrap items-start gap-6">
                <div className="flex flex-col items-center gap-2">
                  <Link href="/Contact" className="liquid-lime-btn text-base py-4 px-8">
                    <span>Start a Conversation</span>
                    <span className="arrow-icon w-8 h-8 text-sm" aria-hidden="true">→</span>
                  </Link>
                  <span className="text-xs text-zinc-500 font-mono">No commitment · 30-min call</span>
                </div>
                <Link
                  href="/Solutions"
                  className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors mt-4"
                >
                  Explore our solutions →
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* ── READY TO TRANSFORM — BOTTOM CTA ──────────────────────────────── */}
        <section
          aria-labelledby="cta-heading"
          className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <ScrollReveal className="text-center max-w-3xl mx-auto space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
              Ready to Transform Your Business?
            </span>
            <h2
              id="cta-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white"
            >
              Let&apos;s connect your ideas, technology and intelligence.
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed max-w-xl mx-auto line-clamp-2">
              Whether you are exploring agentic AI, building a SaaS product or automating complex
              processes — ZamNexus is ready to help.
            </p>
            <div className="flex flex-wrap items-start justify-center gap-6 pt-2">
              <div className="flex flex-col items-center gap-2">
                <Link href="/Contact" className="liquid-lime-btn text-base py-4 px-8">
                  <span>Contact ZamNexus</span>
                  <span className="arrow-icon w-8 h-8 text-sm" aria-hidden="true">→</span>
                </Link>
                <span className="text-xs text-zinc-500 font-mono">No commitment · 30-min call</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <Link
                  href="/Services"
                  className="px-7 py-4 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-600 font-semibold text-sm transition-all duration-300"
                >
                  View our services →
                </Link>
                <span className="text-xs text-zinc-500 font-mono">See what we build</span>
              </div>
            </div>
          </ScrollReveal>
        </section>

      </main>

      <Footer />
    </div>
  );
}
