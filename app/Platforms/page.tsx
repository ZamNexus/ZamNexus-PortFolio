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
import PillTab from "@/components/PillTab";
import { useHeroMotion } from "@/components/useHeroMotion";

// ─── Types ───────────────────────────────────────────────────────────────────

interface PlatformPillar {
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  tags: string[];
}

interface PlatformAchievement {
  metric: string;
  label: string;
  text: string;
}

interface PlatformServiceItem {
  number: string;
  title: string;
  description: string;
  icon: string;
}

interface StrategicMoat {
  number: string;
  title: string;
  description: string;
  highlight: string;
  icon: string;
}

// ─── Static Data ─────────────────────────────────────────────────────────────

const microsoftPillars: PlatformPillar[] = [
  {
    title: "Dynamics 365 Enterprise Core",
    subtitle: "CRM, ERP & Field Operations",
    description:
      "Deep architecture across Dynamics 365 Sales, Customer Service, Field Service, and Finance & Operations. Tailored workflows without bloat.",
    icon: "⊞",
    tags: ["Sales CRM", "Customer Service", "Field Service", "Finance & Ops"],
  },
  {
    title: "Power Platform & Automation",
    subtitle: "Low-Code Speed & Enterprise Rigor",
    description:
      "High-impact Power Apps, automated approval flows with Power Automate, executive Power BI telemetry, and resilient Dataverse schemas.",
    icon: "⚡",
    tags: ["Power Apps", "Power Automate", "Power BI", "Dataverse"],
  },
  {
    title: "Microsoft Copilot & AI Studio",
    subtitle: "Autonomous Workforce Enablement",
    description:
      "Custom Copilot Studio agents, Azure OpenAI RAG connectors, and embedded generative AI reasoning across daily business applications.",
    icon: "🧠",
    tags: ["Copilot Studio", "Azure OpenAI", "RAG Knowledge", "Task Agents"],
  },
  {
    title: "Azure Integration Services",
    subtitle: "Mission-Critical Cloud Backbone",
    description:
      "Enterprise event-driven integration using Azure Logic Apps, API Management, Service Bus, and hybrid on-premises gateways.",
    icon: "☁",
    tags: ["Logic Apps", "API Management", "Service Bus", "Event Grid"],
  },
];

const microsoftAchievements: PlatformAchievement[] = [
  { metric: "-45%", label: "Manual Data Entry", text: "Streamline operations with Dynamics 365 and connected cloud applications." },
  { metric: "3.8x", label: "Workflow Velocity", text: "Automate complex approvals and processes with Power Platform and AI-enhanced logic." },
  { metric: "100%", label: "Dataverse Parity", text: "Connect systems, data and processes across your entire Microsoft enterprise ecosystem." },
  { metric: "99.9%", label: "Migration Uptime", text: "Modernise legacy platforms and migrate to Azure Cloud with zero data discrepancy." },
];

const salesforcePillars: PlatformPillar[] = [
  {
    title: "Sales & Service Cloud Mastery",
    subtitle: "Revenue Lifecycle & Omnichannel Support",
    description:
      "Precision-configured Sales Cloud pipeline velocity, CPQ automated pricing rules, and Service Cloud omnichannel case triage.",
    icon: "⊙",
    tags: ["Sales Cloud", "Service Cloud", "Omnichannel Routing", "CPQ Engines"],
  },
  {
    title: "Einstein AI & Agentforce",
    subtitle: "Autonomous CRM Intelligence",
    description:
      "Deploying Salesforce Agentforce autonomous bots to resolve tier-1 service cases, score opportunities, and draft personalized communications.",
    icon: "✨",
    tags: ["Agentforce", "Einstein Copilot", "Predictive Scoring", "Auto-Resolution"],
  },
  {
    title: "MuleSoft & Enterprise API Mesh",
    subtitle: "High-Throughput Integration",
    description:
      "Connecting Salesforce to SAP, legacy databases, financial ledgers, and bespoke customer portals with bi-directional API security.",
    icon: "🔗",
    tags: ["MuleSoft", "REST/GraphQL", "Legacy SAP Bridge", "Event Streams"],
  },
  {
    title: "Data Cloud & Real-Time 360",
    subtitle: "Zero-Copy Customer Data Federation",
    description:
      "Harmonizing disparate transactional records into a single actionable Customer 360 profile with real-time churn triggers.",
    icon: "🌐",
    tags: ["Data Cloud", "Customer 360", "Zero-Copy Ingestion", "Segment Telemetry"],
  },
];

const salesforceAchievements: PlatformAchievement[] = [
  { metric: "+38%", label: "Sales Pipeline Velocity", text: "Accelerate deal closure with automated opportunity scoring and CPQ workflows." },
  { metric: "99.2%", label: "Resolution Accuracy", text: "Deliver omnichannel customer support through autonomous Agentforce triage." },
  { metric: "< 50ms", label: "Ecosystem API Sync", text: "Connect Salesforce seamlessly with your wider ERP, billing and operational stack." },
  { metric: "360°", label: "Unified Visibility", text: "Harness Data Cloud to turn fragmented customer interactions into predictive revenue." },
];

const platformServices: PlatformServiceItem[] = [
  {
    number: "01",
    title: "Platform Strategy & Roadmapping",
    description: "Aligning multi-year Microsoft or Salesforce investments directly with core business revenue objectives and architectural roadmaps.",
    icon: "🎯",
  },
  {
    number: "02",
    title: "Architecture & Solution Design",
    description: "Designing resilient multi-tenant architectures, secure data models, and scalable API topologies built for high concurrency.",
    icon: "🏛️",
  },
  {
    number: "03",
    title: "Implementation & Configuration",
    description: "Agile, rapid-iteration delivery ensuring clean configuration, minimal technical debt, and instant stakeholder adoption.",
    icon: "⚙️",
  },
  {
    number: "04",
    title: "Custom Development & Extensions",
    description: "Full-stack Apex, LWC, C#, PowerFX, and Node.js microservices extending platform capabilities beyond off-the-shelf boundaries.",
    icon: "💻",
  },
  {
    number: "05",
    title: "Automation & Workflow Configuration",
    description: "Eliminating manual data transcription through multi-step Power Automate flows, Salesforce Flow automation, and webhook triggers.",
    icon: "🔄",
  },
  {
    number: "06",
    title: "System Integration & API Mesh",
    description: "Bi-directional data synchronization across Azure API Management, MuleSoft, custom webhooks, and legacy on-premises databases.",
    icon: "🔌",
  },
  {
    number: "07",
    title: "Data Architecture & Migration",
    description: "Sanitizing, mapping, and migrating millions of historical customer, ledger, and transactional records with zero loss.",
    icon: "📊",
  },
  {
    number: "08",
    title: "Legacy Platform Modernisation",
    description: "Decommissioning fragile legacy CRMs and ERPs by re-architecting workflows into modern, cloud-native Microsoft and Salesforce engines.",
    icon: "🚀",
  },
  {
    number: "09",
    title: "AI & Copilot Enablement",
    description: "Embedding Microsoft Copilot Studio and Salesforce Agentforce autonomous agents directly into daily business operations.",
    icon: "🤖",
  },
  {
    number: "10",
    title: "Continuous Managed Evolution",
    description: "Quarterly release management, security auditing, proactive performance tuning, and 24/7 mission-critical platform SLA support.",
    icon: "🛡️",
  },
];

const strategicMoats: StrategicMoat[] = [
  {
    number: "01",
    title: "Business-Led, Not Platform-Dogmatic",
    highlight: "Process Drives Technology",
    description:
      "We never force platform defaults. We reverse-engineer the solution from your exact operational bottlenecks, regulatory needs, and unit economics.",
    icon: "🧭",
  },
  {
    number: "02",
    title: "Polyglot Dual-Ecosystem Mastery",
    highlight: "Certified Microsoft & Salesforce",
    description:
      "Unlike mono-platform vendors, our architects hold deep certifications across both Microsoft and Salesforce ecosystems, allowing true neutral architecture.",
    icon: "⚖️",
  },
  {
    number: "03",
    title: "AI-Native & Autonomous Agent Ready",
    highlight: "Early Adopter Authority",
    description:
      "We were building Copilot Studio plugins and Agentforce autonomous workflows on day one. We turn experimental AI hype into measurable business ROI.",
    icon: "💡",
  },
  {
    number: "04",
    title: "Connected Interoperability Fabric",
    highlight: "Zero Siloed Data",
    description:
      "We treat Microsoft and Salesforce as connected nodes in your wider enterprise grid, seamlessly syncing with your proprietary ERP, warehouse, and finance hubs.",
    icon: "🌐",
  },
  {
    number: "05",
    title: "Full-Lifecycle Long-Term Partnership",
    highlight: "Dedicated TAM & SLA Guarantee",
    description:
      "We don't hand over code and vanish. We provide continuous architectural stewardship, quarterly upgrades, and sub-15 minute emergency critical SLAs.",
    icon: "🤝",
  },
];

// ─── Hydration-Safe Counter ──────────────────────────────────────────────────

function AnimatedMetric({ value, suffix = "" }: { value: string; suffix?: string }) {
  const [display, setDisplay] = useState(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-40px" });

  useEffect(() => {
    const rawNum = parseInt(value.replace(/[^0-9]/g, ""), 10);
    if (isNaN(rawNum) || !inView) return;

    const duration = 1100;
    const startTime = performance.now();
    const prefix = value.startsWith("-") ? "-" : value.startsWith("+") ? "+" : "";
    const hasPct = value.includes("%");
    const hasX = value.includes("x");

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * rawNum);

      setDisplay(`${prefix}${current}${hasPct ? "%" : hasX ? "x" : ""}`);
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

// ─── Main Platforms Page Component ───────────────────────────────────────────

export default function PlatformsPage() {
  const heroMotion = useHeroMotion();
  const [activeTab, setActiveTab] = useState<"microsoft" | "salesforce" | "integration">("microsoft");

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
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#0EA5E9] via-[#8B5CF6] to-[#00A1E0] origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* Cyber Grid Matrix Backdrop */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="platforms-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#platforms-grid)" />
        </svg>

        {/* Ambient Halo Glows */}
        <div className="absolute top-[15%] left-[5%] w-[650px] h-[650px] rounded-full bg-cyan-600/[0.05] blur-[180px] pointer-events-none" />
        <div className="absolute top-[40%] right-[5%] w-[650px] h-[650px] rounded-full bg-blue-600/[0.05] blur-[180px] pointer-events-none" />
        <div className="absolute bottom-[20%] left-[10%] w-[600px] h-[600px] rounded-full bg-violet-600/[0.04] blur-[180px] pointer-events-none" />
      </div>

      <Navbar />

      <main className="relative z-10">

        {/* ── HERO: DUAL-ECOSYSTEM COMMAND NEXUS ────────────────────────────── */}
        <section
          aria-labelledby="platforms-hero-heading"
          className="max-w-7xl mx-auto px-6 pt-40 pb-20 text-center flex flex-col items-center"
        >
          {/* Top Category Badge */}
          <motion.div
            {...heroMotion.badge}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono font-medium text-[var(--accent-hover)] mb-8 backdrop-blur-xl shadow-lg"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            Enterprise Platform Architecture · Microsoft &amp; Salesforce Cores
          </motion.div>

          {/* Heading */}
          <motion.h1
            id="platforms-hero-heading"
            {...heroMotion.heading}
            className="text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08] break-words"
          >
            Maximizing the platforms you{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-400 to-blue-400">
              already run on.
            </span>
          </motion.h1>

          <motion.p
            {...heroMotion.paragraph}
            className="mt-6 text-base sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
          >
            We don&apos;t just configure standard platform features. We engineer high-velocity, connected,
            and AI-native enterprise workflows across Microsoft Dynamics 365, Power Platform, Azure Copilot, and Salesforce Cloud.
          </motion.p>

          {/* Interactive 3-Way Ecosystem Switcher Dock */}
          <motion.div
            {...heroMotion.actions}
            className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-3 p-1.5 sm:p-2 rounded-2xl sm:rounded-full bg-zinc-900/70 border border-zinc-800/80 backdrop-blur-xl shadow-2xl"
          >
            {[
              { id: "microsoft", label: "Microsoft Ecosystem", icon: "⊞", color: "#0EA5E9", anchor: "#microsoft-ecosystem" },
              { id: "salesforce", label: "Salesforce Cloud", icon: "⊙", color: "#00A1E0", anchor: "#salesforce-ecosystem" },
              { id: "integration", label: "Cross-Platform Mesh", icon: "⚡", color: "#8B5CF6", anchor: "#integration-mesh" },
            ].map((tab) => (
              <PillTab
                key={tab.id}
                variant="pill"
                isSelected={activeTab === tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  document.querySelector(tab.anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                icon={<span style={{ color: tab.color }}>{tab.icon}</span>}
                label={tab.label}
                accent={tab.color}
              />
            ))}
          </motion.div>

          {/* Telemetry HUD */}
          <motion.div
            {...heroMotion.telemetry}
            className="mt-12 w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-800/20 backdrop-blur-md shadow-2xl"
          >
            {[
              { val: "100+", label: "Enterprise Deployments" },
              { val: "< 100ms", label: "Dataverse Sync Speed" },
              { val: "100%", label: "Zero-Copy Data Mesh" },
              { val: "24/7", label: "Dedicated TAM SLA" },
            ].map((stat) => (
              <div key={stat.label} className="bg-zinc-900/40 px-5 py-4 text-center group hover:bg-zinc-800/40 transition-colors">
                <div className="text-xl sm:text-2xl font-bold font-mono text-white group-hover:text-cyan-400 transition-colors">
                  {stat.val}
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── ECOSYSTEM 01: MICROSOFT COMMAND STATION ──────────────────────── */}
        <section
          id="microsoft-ecosystem"
          aria-labelledby="microsoft-heading"
          className="max-w-7xl mx-auto px-6 py-24 border-t border-zinc-800/60 relative"
        >
          {/* Subtle Ambient Radial Spotlight */}
          <div
            className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 rounded-full blur-[140px] pointer-events-none -z-10"
            style={{ background: "rgba(14, 165, 233, 0.08)" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Strategic Value & Outcomes */}
            <div className="lg:col-span-5">
              <motion.div
                className="flex items-center gap-3 mb-6"
                initial={{ x: -25, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false, margin: "-80px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-800/60 flex items-center justify-center text-cyan-400 text-xl font-mono shadow-lg">
                  ⊞
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold block">
                    Microsoft Enterprise Solutions
                  </span>
                  <span className="text-xs font-mono text-zinc-500">Tier-1 Consulting &amp; Architecture</span>
                </div>
              </motion.div>

              <motion.h2
                id="microsoft-heading"
                className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-5 leading-tight"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Microsoft Dynamics 365, Power Platform, Azure &amp; Copilot
              </motion.h2>

              <motion.p
                className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-8"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                We architect and deliver transformative solutions across the Microsoft business stack.
                From mission-critical Dynamics CRM and ERP to low-code Power Platform workflows,
                autonomous Copilot agents, and Azure integration pipelines — we ensure your Microsoft investment produces exponential ROI.
              </motion.p>

              {/* Achievement Metrics */}
              <motion.div
                className="grid grid-cols-2 gap-3 mb-8"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                {microsoftAchievements.map((item) => (
                  <div
                    key={item.label}
                    className="p-3.5 rounded-xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm"
                  >
                    <div className="text-xl sm:text-2xl font-bold font-mono text-cyan-400">
                      <AnimatedMetric value={item.metric} />
                    </div>
                    <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
                      {item.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-wrap items-center gap-4"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                <Link
                  href="/Contact"
                  className="liquid-lime-btn text-xs sm:text-sm py-3 px-6"
                >
                  <span>Discuss Microsoft Solutions</span>
                  <span className="arrow-icon w-6 h-6 text-xs" aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/Services"
                  className="px-5 py-3 rounded-full border border-zinc-700 hover:border-zinc-500 bg-zinc-900/50 text-zinc-300 hover:text-white text-xs font-semibold transition-all duration-300"
                >
                  Explore Capabilities
                </Link>
              </motion.div>
            </div>

            {/* Right Column: 4-Pillar Interactive Bento Grid */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {microsoftPillars.map((pillar, idx) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -4, borderColor: "#0EA5E9" }}
                  className="p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/70 backdrop-blur-md transition-all duration-300 relative overflow-hidden group shadow-xl flex flex-col justify-between"
                >
                  {/* Subtle Top Accent */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-cyan-400">
                        {pillar.icon}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-600">0{idx + 1} // 04</span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">
                      {pillar.title}
                    </h3>
                    <div className="text-xs font-mono text-cyan-400/80 mb-3">
                      {pillar.subtitle}
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-800/60">
                    {pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-950/60 border border-zinc-800 text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── ECOSYSTEM 02: SALESFORCE CLOUD ENGINE ────────────────────────── */}
        <section
          id="salesforce-ecosystem"
          aria-labelledby="salesforce-heading"
          className="max-w-7xl mx-auto px-6 py-24 border-t border-zinc-800/60 relative"
        >
          {/* Subtle Ambient Radial Spotlight */}
          <div
            className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 rounded-full blur-[140px] pointer-events-none -z-10"
            style={{ background: "rgba(0, 161, 224, 0.08)" }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column (Inverted): 4-Pillar Interactive Cloud Matrix */}
            <div className="lg:col-span-7 order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {salesforcePillars.map((pillar, idx) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -4, borderColor: "#00A1E0" }}
                  className="p-6 rounded-2xl border border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/70 backdrop-blur-md transition-all duration-300 relative overflow-hidden group shadow-xl flex flex-col justify-between"
                >
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl p-2.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-blue-400">
                        {pillar.icon}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-600">0{idx + 1} // 04</span>
                    </div>

                    <h3 className="text-base font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
                      {pillar.title}
                    </h3>
                    <div className="text-xs font-mono text-blue-400/80 mb-3">
                      {pillar.subtitle}
                    </div>
                    <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed mb-6">
                      {pillar.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-800/60">
                    {pillar.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] font-mono bg-zinc-950/60 border border-zinc-800 text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Column: Strategic CRM Narrative & Outcomes */}
            <div className="lg:col-span-5 order-1 lg:order-2">
              <motion.div
                className="flex items-center gap-3 mb-6"
                initial={{ x: 25, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: false, margin: "-80px" }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-800/60 flex items-center justify-center text-blue-400 text-xl font-mono shadow-lg">
                  ⊙
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold block">
                    Salesforce Cloud Solutions
                  </span>
                  <span className="text-xs font-mono text-zinc-500">CRM, Agentforce &amp; MuleSoft</span>
                </div>
              </motion.div>

              <motion.h2
                id="salesforce-heading"
                className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-5 leading-tight"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                Salesforce CRM, Autonomous AI &amp; Connected Systems
              </motion.h2>

              <motion.p
                className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-8"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                From solution architecture and custom Apex development to Agentforce AI deployments
                and MuleSoft API orchestration — we transform Salesforce into a precision revenue machine
                that empowers sales reps and delights customers.
              </motion.p>

              {/* Achievement Metrics */}
              <motion.div
                className="grid grid-cols-2 gap-3 mb-8"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, margin: "-80px" }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                {salesforceAchievements.map((item) => (
                  <div
                    key={item.label}
                    className="p-3.5 rounded-xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm"
                  >
                    <div className="text-xl sm:text-2xl font-bold font-mono text-blue-400">
                      <AnimatedMetric value={item.metric} />
                    </div>
                    <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mt-0.5">
                      {item.label}
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                className="flex flex-wrap items-center gap-4"
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: false, margin: "-80px" }}
                transition={{ duration: 0.5, delay: 0.35 }}
              >
                <Link
                  href="/Contact"
                  className="liquid-lime-btn text-xs sm:text-sm py-3 px-6"
                >
                  <span>Discuss Salesforce Solutions</span>
                  <span className="arrow-icon w-6 h-6 text-xs" aria-hidden="true">→</span>
                </Link>
                <Link
                  href="/Solutions"
                  className="px-5 py-3 rounded-full border border-zinc-700 hover:border-zinc-500 bg-zinc-900/50 text-zinc-300 hover:text-white text-xs font-semibold transition-all duration-300"
                >
                  View Solutions Mesh
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── CROSS-PLATFORM INTEROPERABILITY GATEWAY (THE INTERCONNECT) ──── */}
        <section
          id="integration-mesh"
          aria-labelledby="interconnect-heading"
          className="max-w-7xl mx-auto px-6 py-24 border-t border-zinc-800/60"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
              Hybrid Ecosystem Architecture
            </span>
            <h2
              id="interconnect-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3 leading-tight"
            >
              The Cross-Platform Integration Gateway
            </h2>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
              Most enterprises don&apos;t run on just one vendor. ZamNexus bridges Microsoft Azure and Salesforce Cloud
              into an intelligent, bi-directional ecosystem with zero data silos.
            </p>
          </div>

          {/* Interactive Visual Interconnect Blueprint */}
          <div className="p-8 sm:p-12 rounded-3xl bg-zinc-950/80 border border-zinc-800/90 shadow-2xl relative overflow-hidden mb-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center">
              {/* Node 1: Microsoft Ecosystem */}
              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-cyan-500/40 shadow-xl">
                <div className="w-12 h-12 rounded-xl bg-cyan-950/70 border border-cyan-500/60 mx-auto flex items-center justify-center text-cyan-400 text-2xl font-mono mb-3">
                  ⊞
                </div>
                <div className="font-bold text-white text-base">Microsoft Dynamics &amp; Azure</div>
                <div className="text-xs font-mono text-cyan-400 mt-1">General Ledger &amp; Operations</div>
                <div className="mt-4 text-[11px] font-mono text-zinc-400 space-y-1">
                  <div>Dataverse Data Entities</div>
                  <div>Power Automate Triggers</div>
                  <div>Azure Service Bus Queue</div>
                </div>
              </div>

              {/* Center Gateway: ZamNexus Interconnect */}
              <div className="p-6 rounded-2xl bg-gradient-to-b from-zinc-900 to-zinc-950 border border-[var(--accent-hover)]/60 shadow-2xl relative">
                <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/60 mx-auto flex items-center justify-center text-blue-400 text-2xl mb-3 shadow-lg">
                  ⚡
                </div>
                <div className="font-bold text-white text-base">ZamNexus Sync Engine</div>
                <div className="text-xs font-mono text-emerald-400 mt-1">● Bi-Directional &amp; Real-Time</div>
                <div className="mt-4 text-[11px] font-mono text-zinc-300 bg-zinc-950/80 p-2.5 rounded-xl border border-zinc-800">
                  Sub-50ms Event Broker · Automated Schema Translation · Zero-Copy Mirror
                </div>
              </div>

              {/* Node 3: Salesforce Cloud */}
              <div className="p-6 rounded-2xl bg-zinc-900/60 border border-blue-500/40 shadow-xl">
                <div className="w-12 h-12 rounded-xl bg-blue-950/70 border border-blue-500/60 mx-auto flex items-center justify-center text-blue-400 text-2xl font-mono mb-3">
                  ⊙
                </div>
                <div className="font-bold text-white text-base">Salesforce &amp; MuleSoft</div>
                <div className="text-xs font-mono text-blue-400 mt-1">CRM, Quotes &amp; Service 360</div>
                <div className="mt-4 text-[11px] font-mono text-zinc-400 space-y-1">
                  <div>Salesforce Data Cloud</div>
                  <div>Agentforce Autonomous Triage</div>
                  <div>MuleSoft High-Throughput API</div>
                </div>
              </div>
            </div>
          </div>

          {/* 4 Interoperability Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Penny-Perfect Ledger Sync", sub: "Dynamics ↔ Salesforce", desc: "Automated real-time synchronization between Salesforce closed-won opportunities and Dynamics 365 general ledgers." },
              { title: "Universal Federated SSO", sub: "Enterprise Azure AD / Okta", desc: "One consolidated security policy and role-based access matrix governing both platform environments." },
              { title: "Dual-Copilot Coordination", sub: "Microsoft & Einstein AI", desc: "Seamless context passing between Microsoft Copilot tasks and Salesforce Agentforce automated actions." },
              { title: "Encrypted API Defense", sub: "Zero-Trust Architecture", desc: "End-to-end token encryption, rate-limiting safeguards, and automated failover routing for 99.99% reliability." },
            ].map((pillar) => (
              <div
                key={pillar.title}
                className="p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
              >
                <div className="text-xs font-mono font-bold text-cyan-400 mb-1">{pillar.sub}</div>
                <div className="font-bold text-white text-sm mb-2">{pillar.title}</div>
                <p className="text-xs text-zinc-400 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── 10-SERVICE FULL-LIFECYCLE DELIVERY DECK ───────────────────────── */}
        <section
          aria-labelledby="delivery-deck-heading"
          className="max-w-7xl mx-auto px-6 py-24 border-t border-zinc-800/60"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
              Full-Spectrum Delivery
            </span>
            <h2
              id="delivery-deck-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3 leading-tight"
            >
              10 Ways We Accelerate Your Platforms
            </h2>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
              From strategic architectural roadmapping to custom code extensions and ongoing SLA management —
              our services cover the full lifespan of your enterprise software.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {platformServices.map((srv, idx) => (
              <motion.div
                key={srv.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -4, borderColor: "rgba(59, 130, 246, 0.6)" }}
                className="p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:bg-zinc-900/70 backdrop-blur-sm transition-all duration-300 flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xl p-2 rounded-xl bg-zinc-950/80 border border-zinc-800">
                      {srv.icon}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-600 font-bold group-hover:text-cyan-400 transition-colors">
                      {srv.number}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 group-hover:text-white transition-colors leading-snug">
                    {srv.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {srv.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-zinc-800/60 text-[10px] font-mono text-zinc-500 group-hover:text-cyan-400 transition-colors">
                  Enterprise Tier →
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── STRATEGIC MOATS: WHY ZAMNEXUS FOR PLATFORMS ───────────────────── */}
        <section
          aria-labelledby="strategic-moats-heading"
          className="max-w-7xl mx-auto px-6 py-24 border-t border-zinc-800/60"
        >
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
              The Architectural Edge
            </span>
            <h2
              id="strategic-moats-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3 leading-tight"
            >
              Why Enterprises Trust ZamNexus
            </h2>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
              We combine deep polyglot engineering with business empathy to guarantee measurable platform outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {strategicMoats.slice(0, 3).map((moat) => (
              <motion.div
                key={moat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-60px" }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 relative overflow-hidden shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800">
                      {moat.icon}
                    </span>
                    <span className="text-xs font-mono text-zinc-600 font-bold">{moat.number} // 05</span>
                  </div>
                  <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-1">
                    {moat.highlight}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-white transition-colors">
                    {moat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {moat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {strategicMoats.slice(3, 5).map((moat) => (
              <motion.div
                key={moat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-60px" }}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 relative overflow-hidden shadow-xl flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-3xl p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800">
                      {moat.icon}
                    </span>
                    <span className="text-xs font-mono text-zinc-600 font-bold">{moat.number} // 05</span>
                  </div>
                  <div className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider mb-1">
                    {moat.highlight}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3 group-hover:text-white transition-colors">
                    {moat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {moat.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── HIGH-CONVERSION EXECUTIVE ADVISORY CTA ───────────────────────── */}
        <FinalCTA
          id="platforms-cta-heading"
          eyebrow="Platform Strategy & Advisory"
          headline="Ready to elevate your platform architecture?"
          description="Schedule a dedicated 30-minute architectural consultation with our principal platform engineers. We'll evaluate your current Microsoft or Salesforce stack and outline immediate optimization pathways."
          primaryButton={{
            label: "Schedule Advisory Call",
            href: "/Contact",
          }}
          secondaryButton={{
            label: "Explore Solution Blueprints →",
            href: "/Solutions",
          }}
          sidePanel={{
            title: "Platform Engineering SLA",
            items: [
              { label: "Dual Certified Architects", sublabel: "Microsoft MVP & Salesforce Lead" },
              { label: "Zero-Disruption Migration", sublabel: "Parallel ledger verification" },
              { label: "Sub-15min Critical Response", sublabel: "24/7 dedicated enterprise TAM" },
            ],
          }}
        />

      </main>

      <Footer hideCTA />
    </div>
  );
}
