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
import FinalCTA from "@/components/FinalCTA";
import { useHeroMotion } from "@/components/useHeroMotion";

// ─── Types ───────────────────────────────────────────────────────────────────

interface IndustryDetail {
  id: string;
  index: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  icon: string;
  stat: string;
  statLabel: string;
  capabilities: string[];
}

interface UniversalCapability {
  title: string;
  description: string;
  accent: string;
  icon: string;
}

// ─── Static Data ─────────────────────────────────────────────────────────────

const industries: IndustryDetail[] = [
  {
    id: "financial-services",
    index: "01",
    tag: "FINANCIAL SERVICES",
    title: "Financial Services",
    subtitle: "Secure, compliant and intelligent technology for financial institutions",
    description:
      "We help financial institutions modernize core banking operations, enhance customer onboarding journeys, and meet rigorous regulatory audits — using secure cloud architectures, intelligent automation, and AI risk scoring.",
    accent: "#10B981", // Emerald
    icon: "💳",
    stat: "100%",
    statLabel: "Audit Trail Traceability",
    capabilities: [
      "Regulatory & Compliance Automation",
      "Secure Cloud-Native Platforms",
      "AI-Driven Risk & Fraud Detection",
      "Customer Onboarding & KYC Portals",
      "Real-Time Data & Financial Analytics",
      "Legacy Core System Modernisation",
    ],
  },
  {
    id: "professional-services",
    index: "02",
    tag: "PROFESSIONAL SERVICES",
    title: "Professional Services",
    subtitle: "Connected technology for consulting, advisory and legal practices",
    description:
      "We support professional services practices with scalable client portals, automated billable hour tracking, and AI-driven document intelligence — enabling continuous firm growth without linear headcount inflation.",
    accent: "#F59E0B", // Amber
    icon: "💼",
    stat: "+32%",
    statLabel: "Resource Utilization",
    capabilities: [
      "Client Portal & Engagement Platforms",
      "Project & Resource Scheduling Hubs",
      "AI-Powered Knowledge & Document Search",
      "Multi-Entity Billing & Timesheets",
      "CRM & Enterprise BD Pipelines",
      "Executive Utilization Telemetry",
    ],
  },
  {
    id: "property-facilities",
    index: "03",
    tag: "PROPERTY & FACILITIES",
    title: "Property & Facilities Management",
    subtitle: "Connected, intelligent technology for property and estate management",
    description:
      "We help commercial property networks and estate managers digitize building operations, automate tenant lease renewals, and stream IoT sensor telemetry — from predictive HVAC maintenance to ESG compliance.",
    accent: "#14B8A6", // Teal
    icon: "🏢",
    stat: "< 15m",
    statLabel: "Maintenance Dispatch",
    capabilities: [
      "Tenant & Landlord Digital Portals",
      "IoT-Connected Building Diagnostics",
      "Maintenance & Work Order Automation",
      "Lease Contracts & Document OCR",
      "ESG Compliance & Energy Monitoring",
      "Automated Rent & Arrears Collection",
    ],
  },
  {
    id: "public-sector",
    index: "04",
    tag: "PUBLIC SECTOR",
    title: "Public Sector & Government",
    subtitle: "Accessible, secure and efficient technology for public services",
    description:
      "We partner with government agencies and municipal authorities to deliver WCAG-compliant citizen services, automate high-volume case intake, and maintain impenetrable data sovereignty and governance.",
    accent: "#0EA5E9", // Sky Blue
    icon: "🏛️",
    stat: "99.99%",
    statLabel: "Citizen Portal Uptime",
    capabilities: [
      "Citizen-Facing Self-Service Portals",
      "High-Volume Case Intake Workflows",
      "WCAG 2.1 AAA Accessible Design",
      "Sovereign Cloud Data Governance",
      "Automated Grant & Subsidy Processing",
      "Public Transparency & FOI Reporting",
    ],
  },
  {
    id: "education",
    index: "05",
    tag: "EDUCATION",
    title: "Education & Academia",
    subtitle: "Connected platforms for learning, administration and campus life",
    description:
      "We empower school networks, colleges, and university trusts with unified multi-campus platforms connecting biometric admissions, fee bank reconciliation, timetables, grading, and native parent mobile portals.",
    accent: "#8B5CF6", // Violet
    icon: "🎓",
    stat: "14k+",
    statLabel: "Active Student App Users",
    capabilities: [
      "Student & Parent Native Mobile Apps",
      "Paperless Admissions & Merit Engines",
      "Automated Fee Challans & Bank APIs",
      "Conflict-Free Timetable Scheduling",
      "Biometric Turnstile Attendance",
      "Tamper-Proof Grade & Exam Engine",
    ],
  },
  {
    id: "healthcare",
    index: "06",
    tag: "HEALTHCARE",
    title: "Healthcare & Life Sciences",
    subtitle: "Secure, interoperable and intelligent technology for patient care",
    description:
      "We engineer clinical platforms, electronic health records (EHR), automated laboratory auto-analyzer interfaces, and hospital pharmacy FIFO inventories — keeping patient outcomes at the center of innovation.",
    accent: "#F43F5E", // Rose
    icon: "🏥",
    stat: "< 60s",
    statLabel: "Emergency Intake Speed",
    capabilities: [
      "Clinical EHR & SOAP Medical Records",
      "HL7 Auto-Analyzer Laboratory Sync",
      "Consolidated OPD/IPD Billing Engine",
      "Hospital Pharmacy Batch FIFO Guard",
      "PACS / DICOM Diagnostic Imaging Link",
      "HIPAA/GDPR Medical Record Encryption",
    ],
  },
  {
    id: "retail-ecommerce",
    index: "07",
    tag: "RETAIL & E-COMMERCE",
    title: "Retail & E-Commerce",
    subtitle: "Intelligent platforms for high-volume retail chains and digital commerce",
    description:
      "We help retail chains and omnichannel storefronts process sales at lightning speed — combining offline-first POS cash registers, multi-till synchronization, real-time multi-store SKU inventories, and customer loyalty engines.",
    accent: "#F97316", // Orange
    icon: "🛍️",
    stat: "0.12s",
    statLabel: "Scan-to-Receipt Speed",
    capabilities: [
      "Cloud & Offline-First POS Engine",
      "Central SKU Catalog (140k+ Items)",
      "Millisecond Multi-Till Synchronization",
      "Automated Vendor Purchase Bills",
      "Customer Loyalty & Reward Points",
      "Live Hourly Store Velocity Telemetry",
    ],
  },
  {
    id: "technology-saas",
    index: "08",
    tag: "TECHNOLOGY & SAAS",
    title: "Technology & SaaS",
    subtitle: "Building and scaling technology products, APIs and cloud infrastructure",
    description:
      "We partner with high-growth SaaS scale-ups and technology leaders to engineer multi-tenant microservices, API-first integrations, serverless event-driven backends, and embedded generative AI reasoning agents.",
    accent: "#6366F1", // Indigo
    icon: "☁️",
    stat: "100%",
    statLabel: "API-First Architecture",
    capabilities: [
      "Multi-Tenant SaaS Product Architecture",
      "Event-Driven Serverless Backends",
      "GraphQL & RESTful API Mesh Design",
      "Embedded AI Copilot Integrations",
      "Zero-Downtime CI/CD Infrastructure",
      "High-Concurrency Performance Tuning",
    ],
  },
];

const universalCapabilities: UniversalCapability[] = [
  {
    title: "Artificial Intelligence & Intelligent Automation",
    description: "Autonomous task agents, RAG document search, predictive scoring, and automated business workflows embedded across every sector.",
    accent: "#8B5CF6",
    icon: "🧠",
  },
  {
    title: "Cloud-Native & Serverless Engineering",
    description: "Resilient, auto-scaling architectures built with TypeScript, Node.js, and AWS Lambda designed to adapt as your workload multiplies.",
    accent: "#10B981",
    icon: "⚡",
  },
  {
    title: "Multi-Tenant SaaS & Platform Architecture",
    description: "Scalable, secure multi-tenant backends engineered with enterprise RBAC, billing hooks, and API-first platform infrastructure.",
    accent: "#F59E0B",
    icon: "⬡",
  },
  {
    title: "Microsoft & Salesforce Ecosystem Cores",
    description: "Consulting and delivery across Dynamics 365, Power Platform, Azure, Sales Cloud, Service Cloud, and Agentforce autonomous AI.",
    accent: "#0EA5E9",
    icon: "⊞",
  },
  {
    title: "Integration Mesh & Connected Systems",
    description: "Bi-directional APIs, event streams, and legacy database bridges that bring your entire disconnected tech stack into unified focus.",
    accent: "#EC4899",
    icon: "🔗",
  },
  {
    title: "Security, Governance & Regulatory Compliance",
    description: "Military-grade encryption, immutable audit trails, and strict adherence to sector regulations (HIPAA, GDPR, financial ISO) built in.",
    accent: "#14B8A6",
    icon: "🛡️",
  },
];

// ─── Hydration-Safe Counter ──────────────────────────────────────────────────

function AnimatedStat({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-40px" });

  useEffect(() => {
    const rawNum = parseInt(value.replace(/[^0-9]/g, ""), 10);
    if (isNaN(rawNum) || !inView) return;

    const duration = 1100;
    const startTime = performance.now();
    const prefix = value.startsWith("+") ? "+" : value.startsWith("<") ? "< " : "";
    const hasPct = value.includes("%");
    const hasK = value.includes("k");

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * rawNum);

      setDisplay(`${prefix}${current}${hasPct ? "%" : hasK ? "k+" : ""}`);
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

// ─── Main Industries Page Component ──────────────────────────────────────────

export default function IndustriesPage() {
  const heroMotion = useHeroMotion();
  const [activeSectorIdx, setActiveSectorIdx] = useState(0);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Track active sector scene with IntersectionObserver
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    industries.forEach((ind, i) => {
      const el = document.getElementById(ind.id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSectorIdx(i);
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
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-emerald-500 via-sky-500 via-violet-500 to-orange-500 origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* Grid Pattern Backdrop */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="industries-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#industries-grid)" />
        </svg>

        {/* Dynamic ambient color glow tracking active sector */}
        <motion.div
          className="absolute top-[20%] left-[10%] w-[650px] h-[650px] rounded-full blur-[180px] pointer-events-none transition-all duration-1000"
          style={{
            background: `color-mix(in srgb, ${industries[activeSectorIdx].accent} 12%, transparent)`,
          }}
        />
        <div className="absolute bottom-[20%] right-[8%] w-[650px] h-[650px] rounded-full bg-violet-600/[0.04] blur-[180px] pointer-events-none" />
      </div>

      <Navbar />

      <main className="relative z-10">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="industries-hero-heading"
          className="max-w-7xl mx-auto px-6 pt-40 pb-16 text-center flex flex-col items-center"
        >
          {/* Top Category Chip */}
          <motion.div
            {...heroMotion.badge}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono font-medium text-[var(--accent-hover)] mb-8 backdrop-blur-xl shadow-lg"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Sector Intelligence · 8 Mission-Critical Domains
          </motion.div>

          {/* Heading */}
          <motion.h1
            id="industries-hero-heading"
            {...heroMotion.heading}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]"
          >
            Intelligent systems built{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-emerald-400 via-sky-400 to-violet-400">
              around your sector.
            </span>
          </motion.h1>

          <motion.p
            {...heroMotion.paragraph}
            className="mt-6 text-base sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
          >
            Every industry has unique compliance mandates, operational nuances, and customer expectations.
            We bring deep engineering expertise shaped by genuine understanding of the sectors we serve.
          </motion.p>

          {/* Interactive 8-Sector Jump Dock */}
          <motion.div
            {...heroMotion.actions}
            className="mt-12 flex flex-wrap justify-center gap-2.5 max-w-5xl"
          >
            {industries.map((ind, i) => (
              <button
                key={ind.id}
                onClick={() => {
                  document.getElementById(ind.id)?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md ${
                  activeSectorIdx === i
                    ? "bg-zinc-800 text-white border border-zinc-700 shadow-lg scale-105"
                    : "bg-zinc-900/60 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800/80"
                }`}
              >
                <span>{ind.icon}</span>
                <span>{ind.title}</span>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: ind.accent }}
                />
              </button>
            ))}
          </motion.div>

          {/* Telemetry HUD */}
          <motion.div
            {...heroMotion.telemetry}
            className="mt-12 w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-800/20 backdrop-blur-md shadow-2xl"
          >
            {[
              { val: "8 Sectors", label: "Tailored Architectures" },
              { val: "100%", label: "Regulatory Adherence" },
              { val: "AI-Driven", label: "Autonomous Workflows" },
              { val: "99.99%", label: "Verified Core Uptime" },
            ].map((stat) => (
              <div key={stat.label} className="bg-zinc-900/40 px-5 py-4 text-center group hover:bg-zinc-800/40 transition-colors">
                <div className="text-xl sm:text-2xl font-bold font-mono text-white group-hover:text-emerald-400 transition-colors">
                  {stat.val}
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── 8 SECTOR COMMAND STAGES ───────────────────────────────────────── */}
        <section
          id="sectors-deck"
          aria-labelledby="sectors-deck-heading"
          className="max-w-7xl mx-auto px-6 py-12 pb-24 border-t border-zinc-800/60"
        >
          <h2 id="sectors-deck-heading" className="sr-only">
            Specialized Industry Sectors
          </h2>

          <div className="space-y-16">
            {industries.map((ind, i) => (
              <motion.article
                key={ind.id}
                id={ind.id}
                initial={{ opacity: 0.35, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-80px" }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 sm:p-14 rounded-3xl border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/60 backdrop-blur-md relative overflow-hidden shadow-2xl transition-all group"
                style={{
                  boxShadow: activeSectorIdx === i
                    ? `0 20px 45px -15px rgba(0,0,0,0.7), 0 0 30px -10px ${ind.accent}25`
                    : undefined,
                }}
              >
                {/* Top Accent Gradient Border */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2.5px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${ind.accent}, transparent)`,
                  }}
                />

                {/* Ambient Radial Spotlight inside card */}
                <div
                  className="absolute -top-16 -right-16 w-80 h-80 rounded-full blur-3xl pointer-events-none -z-10 transition-opacity duration-700"
                  style={{
                    background: ind.accent,
                    opacity: activeSectorIdx === i ? 0.12 : 0.03,
                  }}
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
                  {/* Left Column: Sector Identity, Narrative, Stat & CTA */}
                  <div className="lg:col-span-6 flex flex-col justify-between h-full">
                    <div>
                      {/* Sector Badge & Number */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                          <span className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl bg-zinc-950/80 border border-zinc-800 shadow-md">
                            {ind.icon}
                          </span>
                          <div>
                            <span
                              className="text-xs font-mono font-bold uppercase tracking-widest block"
                              style={{ color: ind.accent }}
                            >
                              {ind.tag}
                            </span>
                            <span className="text-[11px] font-mono text-zinc-500">
                              Domain Architecture {ind.index} // 08
                            </span>
                          </div>
                        </div>
                        <span className="text-xs font-mono text-zinc-600 hidden sm:block">
                          {ind.index} / 08
                        </span>
                      </div>

                      {/* Title & Subtitle */}
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-snug mb-3">
                        {ind.title}
                      </h3>
                      <p className="text-sm font-medium mb-5" style={{ color: ind.accent }}>
                        {ind.subtitle}
                      </p>
                      <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-8">
                        {ind.description}
                      </p>

                      {/* Benchmark Stat Pill */}
                      <div className="flex items-center gap-4 mb-8 p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 max-w-sm">
                        <div
                          className="text-2xl sm:text-3xl font-extrabold font-mono"
                          style={{ color: ind.accent }}
                        >
                          <AnimatedStat value={ind.stat} />
                        </div>
                        <div className="text-xs font-mono text-zinc-400 leading-tight">
                          {ind.statLabel}
                        </div>
                      </div>
                    </div>

                    {/* Action Row */}
                    <div className="pt-2">
                      <Link
                        href="/Contact"
                        className="liquid-lime-btn text-xs sm:text-sm py-3 px-6 inline-flex"
                      >
                        <span>Discuss {ind.title} Solutions</span>
                        <span className="arrow-icon w-6 h-6 text-xs" aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: 6 Staggered Capability Chips */}
                  <div className="lg:col-span-6">
                    <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-4 flex items-center justify-between border-b border-zinc-800/60 pb-3">
                      <span>Core Functional Capabilities</span>
                      <span style={{ color: ind.accent }}>{ind.capabilities.length} Capabilities</span>
                    </div>

                    <div className="space-y-3">
                      {ind.capabilities.map((cap, capIdx) => (
                        <motion.div
                          key={cap}
                          whileHover={{
                            x: 6,
                            borderColor: ind.accent,
                            backgroundColor: "rgba(24, 24, 27, 0.8)",
                          }}
                          className="flex items-center justify-between p-4 rounded-2xl border border-zinc-800/80 bg-zinc-950/40 backdrop-blur-sm text-xs sm:text-sm text-zinc-300 hover:text-white transition-all duration-300 cursor-default group/cap"
                        >
                          <div className="flex items-center gap-3.5">
                            <span
                              className="w-2 h-2 rounded-full flex-shrink-0 transition-transform duration-300 group-hover/cap:scale-150"
                              style={{ background: ind.accent, boxShadow: `0 0 8px ${ind.accent}80` }}
                            />
                            <span className="font-medium">{cap}</span>
                          </div>
                          <span className="text-[10px] font-mono text-zinc-600 group-hover/cap:text-zinc-400">
                            0{capIdx + 1}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* ── CROSS-INDUSTRY CAPABILITIES (UNIVERSAL INTELLIGENCE) ─────────── */}
        <section
          aria-labelledby="universal-capabilities-heading"
          className="max-w-7xl mx-auto px-6 py-24 border-t border-zinc-800/60"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
              Universal Standards
            </span>
            <h2
              id="universal-capabilities-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3 leading-tight"
            >
              Cross-Industry Technology Fabric
            </h2>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
              Regardless of your specific sector, every solution we deliver is anchored by our shared
              standards in enterprise security, AI reasoning copilots, and cloud-native resilience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {universalCapabilities.map((cap) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                whileHover={{ y: -6, borderColor: cap.accent }}
                transition={{ duration: 0.4 }}
                className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 relative overflow-hidden shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="text-3xl mb-5 p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800 w-fit">
                    {cap.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-500">
                  <span>Universal Standard</span>
                  <span style={{ color: cap.accent }}>Active</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── HIGH-CONVERSION BOTTOM CTA ───────────────────────────────────── */}
        <FinalCTA
          id="industries-cta-heading"
          eyebrow="Industry-Specific Advisory"
          headline="Ready to transform your sector operations?"
          description="Connect with our industry architects. We will conduct a thorough 30-minute discovery evaluating your sector regulations, tech stack bottlenecks, and AI automation opportunities."
          primaryButton={{
            label: "Schedule Industry Discovery",
            href: "/Contact",
          }}
          secondaryButton={{
            label: "Explore Solution Blueprints →",
            href: "/Solutions",
          }}
          sidePanel={{
            title: "Industry Delivery Assurance",
            items: [
              { label: "Strict Compliance Guard", sublabel: "HIPAA, GDPR, ISO 27001 verified" },
              { label: "Zero Data Disruption", sublabel: "Parallel cutover & reconciliation" },
              { label: "Domain Expert Lead", sublabel: "Direct consultation with sector architects" },
            ],
          }}
        />

      </main>

      <Footer hideCTA />
    </div>
  );
}
