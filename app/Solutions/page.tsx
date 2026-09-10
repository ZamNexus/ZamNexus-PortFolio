"use client";

import { useState, useRef, useEffect, type CSSProperties, type MouseEvent } from "react";
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

// Register GSAP plugins at module scope (safe in "use client" Next.js)
gsap.registerPlugin(ScrollTrigger);

// ─── Type Definitions ────────────────────────────────────────────────────────

interface ArchitectureNode {
  label: string;
  sub: string;
  type: "input" | "core" | "output";
}

interface SolutionData {
  id: string;
  index: string;
  tag: string;
  title: string;
  description: string;
  accent: string;
  icon: string;
  metric: { value: string; label: string };
  category: "ai" | "saas" | "cloud" | "enterprise";
  pipeline: ArchitectureNode[];
  capabilities: string[];
  visualType: "neural" | "automation" | "multitenant" | "cloudflow" | "enterprise" | "transform";
}

interface ChallengeMatcher {
  id: string;
  challenge: string;
  icon: string;
  targetSolutionId: string;
  recommendation: string;
}

interface ValuePillar {
  number: string;
  title: string;
  description: string;
  accent: string;
  metric: string;
}

// ─── Static Data ─────────────────────────────────────────────────────────────

const solutionsData: SolutionData[] = [
  {
    id: "ai-powered",
    index: "01",
    tag: "AI & INTELLIGENT SOLUTIONS",
    title: "AI-Powered Business",
    description:
      "We help organisations put Artificial Intelligence to practical use — building copilots, autonomous agents, knowledge intelligence systems and governed AI pipelines that create measurable business outcomes, not just proof-of-concepts.",
    accent: "#8B5CF6", // Violet
    icon: "◈",
    metric: { value: "85%", label: "Manual Effort Automated" },
    category: "ai",
    capabilities: [
      "Enterprise AI Copilots & Assistants",
      "Autonomous Multi-Agent Systems",
      "RAG & Domain Knowledge Pipelines",
      "Generative AI Content Systems",
      "Responsible & Governed AI Policies",
      "AI Strategy, Benchmarking & Audit",
    ],
    pipeline: [
      { label: "Data Ingestion", sub: "APIs, Vector DBs, Docs", type: "input" },
      { label: "Agentic Loop", sub: "LLM Orchestration + Guardrails", type: "core" },
      { label: "Verified Action", sub: "Autonomous Execution & Insights", type: "output" },
    ],
    visualType: "neural",
  },
  {
    id: "intelligent-automation",
    index: "02",
    tag: "AUTOMATION",
    title: "Intelligent Automation",
    description:
      "We connect applications, eliminate manual work and build intelligent workflows — combining traditional automation with AI agents that can reason, decide and act on your behalf, freeing your teams to focus on higher-value activity.",
    accent: "#F59E0B", // Amber
    icon: "⟐",
    metric: { value: "4.2x", label: "Workflow Throughput" },
    category: "ai",
    capabilities: [
      "End-to-End Process Automation",
      "Event-Driven Micro-Workflows",
      "Agentic Decision Orchestration",
      "Cross-Application Integration",
      "Automated Exception Handling",
      "Process Mining & Optimization",
    ],
    pipeline: [
      { label: "System Events", sub: "Webhooks, Message Queues", type: "input" },
      { label: "Agentic Logic", sub: "Dynamic Rules + Intent Parser", type: "core" },
      { label: "State Sync", sub: "Zero-Latency API Propagation", type: "output" },
    ],
    visualType: "automation",
  },
  {
    id: "saas-platforms",
    index: "03",
    tag: "SAAS PRODUCT DEVELOPMENT",
    title: "SaaS Platforms",
    description:
      "From early concept to enterprise-ready SaaS product, we design and build scalable, multi-tenant platforms with security, performance and growth built in from the start — so your product can scale without rebuilding.",
    accent: "#06B6D4", // Cyan
    icon: "⬡",
    metric: { value: "100%", label: "Multi-Tenant Isolation" },
    category: "saas",
    capabilities: [
      "Multi-Tenant Cloud Architecture",
      "Customer & Partner Self-Serve Portals",
      "API-First Headless Platform Design",
      "Stripe & Paddle Billing Engines",
      "Granular RBAC & Audit Logging",
      "Zero-Downtime CI/CD Pipelines",
    ],
    pipeline: [
      { label: "Tenant Ingress", sub: "Subdomains, Custom Domains, Auth0", type: "input" },
      { label: "Isolated Compute", sub: "Dynamic Tenant Context & Shards", type: "core" },
      { label: "Global Edge", sub: "Sub-50ms Global CDN Distribution", type: "output" },
    ],
    visualType: "multitenant",
  },
  {
    id: "cloud-native",
    index: "04",
    tag: "CLOUD-NATIVE ENGINEERING",
    title: "Cloud-Native Solutions",
    description:
      "Modern backend systems and cloud infrastructure built for resilience, performance and cost-efficiency. We architect and deliver serverless, event-driven platforms on AWS that adapt as your business evolves — without the operational overhead.",
    accent: "#6366F1", // Indigo
    icon: "⬢",
    metric: { value: "99.99%", label: "Target Availability" },
    category: "cloud",
    capabilities: [
      "AWS Serverless Backend (Node.js/TS)",
      "Event-Driven Microservices (EventBridge)",
      "Infrastructure-as-Code (Terraform, CDK)",
      "Auto-Scaling Elastic Workloads",
      "Distributed Caching & Real-Time Sync",
      "Zero-Trust Cloud Governance",
    ],
    pipeline: [
      { label: "Client Influx", sub: "API Gateway & CloudFront", type: "input" },
      { label: "Serverless Mesh", sub: "Lambda, Step Functions, SQS", type: "core" },
      { label: "ACID State", sub: "DynamoDB, Aurora Serverless", type: "output" },
    ],
    visualType: "cloudflow",
  },
  {
    id: "connected-enterprise",
    index: "05",
    tag: "MICROSOFT & SALESFORCE",
    title: "Connected Enterprise",
    description:
      "We help organisations get more from their enterprise platforms — Microsoft Dynamics 365, Power Platform, Azure and Salesforce — connecting systems, automating processes and using AI to unlock the value of data you already have.",
    accent: "#10B981", // Emerald
    icon: "⊞",
    metric: { value: "360°", label: "Unified ERP/CRM View" },
    category: "enterprise",
    capabilities: [
      "Microsoft Dynamics 365 Architecture",
      "Power Platform, Dataverse & Power Automate",
      "Microsoft Copilot Enterprise Studio",
      "Salesforce Sales & Service Cloud",
      "Bi-Directional ERP/CRM Sync",
      "Enterprise Data Pipelines & Fabric",
    ],
    pipeline: [
      { label: "Siloed Platforms", sub: "Dynamics 365, Salesforce, SAP", type: "input" },
      { label: "Universal Dataverse", sub: "Real-Time ETL & Unified Schema", type: "core" },
      { label: "Copilot Automation", sub: "Role-Based AI Automation", type: "output" },
    ],
    visualType: "enterprise",
  },
  {
    id: "digital-transformation",
    index: "06",
    tag: "DIGITAL TRANSFORMATION",
    title: "Digital Transformation",
    description:
      "End-to-end digital change programmes that move organisations from fragmented, manual systems to modern, connected and intelligent technology ecosystems — delivering lasting efficiency, agility and competitive advantage.",
    accent: "#F43F5E", // Rose
    icon: "⊙",
    metric: { value: "3.5x", label: "Accelerated Time-to-Market" },
    category: "enterprise",
    capabilities: [
      "Technology Modernisation Roadmaps",
      "Monolith Decoupling & Modern APIs",
      "Secure Cloud Migration & Data Transition",
      "Executive Tech Strategy & Architecture",
      "Continuous Improvement Frameworks",
      "Enterprise Security & Compliance",
    ],
    pipeline: [
      { label: "Legacy Audit", sub: "System Mapping & Tech Debt", type: "input" },
      { label: "Agile Migration", sub: "Strangler Fig Pattern & APIs", type: "core" },
      { label: "Autonomous Ops", sub: "Cloud-Native Scalable Ecosystem", type: "output" },
    ],
    visualType: "transform",
  },
];

const challengeMatchers: ChallengeMatcher[] = [
  {
    id: "c1",
    challenge: "Manual workflows & repetitive tasks slowing teams down",
    icon: "⚡",
    targetSolutionId: "intelligent-automation",
    recommendation: "Intelligent Automation & AI Agents",
  },
  {
    id: "c2",
    challenge: "Need to build a scalable multi-tenant SaaS product",
    icon: "🚀",
    targetSolutionId: "saas-platforms",
    recommendation: "SaaS Product Development",
  },
  {
    id: "c3",
    challenge: "Legacy systems & fragmented enterprise CRM/ERP data",
    icon: "🔗",
    targetSolutionId: "connected-enterprise",
    recommendation: "Connected Enterprise (Dynamics & Salesforce)",
  },
  {
    id: "c4",
    challenge: "High cloud bills, slow legacy servers, or scaling limits",
    icon: "☁️",
    targetSolutionId: "cloud-native",
    recommendation: "Cloud-Native & Serverless Engineering",
  },
  {
    id: "c5",
    challenge: "Unlocking company knowledge with secure, governed AI",
    icon: "🧠",
    targetSolutionId: "ai-powered",
    recommendation: "AI-Powered Business & Enterprise Copilots",
  },
];

const valuePillars: ValuePillar[] = [
  {
    number: "01",
    title: "Business Outcomes, Not Deliverables",
    description: "Every architectural decision is tied directly to measurable commercial impact — reduced cycle time, lower compute costs, or revenue growth.",
    accent: "#F59E0B",
    metric: "100% Impact Driven",
  },
  {
    number: "02",
    title: "Connected By Design",
    description: "We eliminate silos before writing a line of code. Data, APIs, intelligence, and business workflows communicate continuously in real time.",
    accent: "#8B5CF6",
    metric: "Zero Data Silos",
  },
  {
    number: "03",
    title: "Intelligence Built-In, Not Bolted-On",
    description: "AI is embedded into data models, transaction pipelines, and UI flows — not an afterthought wrapper around an external API.",
    accent: "#06B6D4",
    metric: "Native AI Fabric",
  },
  {
    number: "04",
    title: "Enterprise Security & Governance",
    description: "Zero-trust IAM, end-to-end data encryption, and transparent audit logging are architected into every deployment from day one.",
    accent: "#10B981",
    metric: "SOC2 / HIPAA Ready",
  },
  {
    number: "05",
    title: "Engineered to Evolve",
    description: "Loose coupling, event-driven architectures, and Infrastructure-as-Code ensure your systems adapt cleanly as technology evolves.",
    accent: "#F43F5E",
    metric: "Zero Legacy Lock-in",
  },
];

// ─── Dynamic Blueprint Visualizers with Real-Time Data Flow ──────────────────

function SolutionVisualizer({
  type,
  accent,
}: {
  type: SolutionData["visualType"];
  accent: string;
}) {
  switch (type) {
    case "neural":
      return (
        <div className="relative w-full h-64 rounded-2xl bg-zinc-950/80 border border-zinc-800 p-5 overflow-hidden flex flex-col justify-between shadow-2xl">
          <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-ping" style={{ background: accent }} />
              Agentic Orchestration Mesh
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
              Latency: 142ms
            </span>
          </div>

          {/* Interactive neural node graph with traveling energy pulse */}
          <div className="relative flex items-center justify-around py-4">
            <motion.div
              whileHover={{ scale: 1.1, rotate: -4 }}
              className="flex flex-col items-center gap-1.5 cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-xs font-mono text-zinc-300 shadow-md">
                DB
              </div>
              <span className="text-[9px] font-mono text-zinc-500">Vector Embeddings</span>
            </motion.div>

            {/* Glowing laser connection 1 with traveling particle */}
            <div className="w-14 h-0.5 bg-zinc-800 relative overflow-hidden">
              <motion.div
                animate={{ x: [-20, 60] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
                className="w-4 h-full rounded-full"
                style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
              />
            </div>

            <motion.div
              whileHover={{ scale: 1.12, rotate: 4 }}
              className="flex flex-col items-center gap-1.5 cursor-pointer"
            >
              <div
                className="w-14 h-14 rounded-2xl border flex items-center justify-center text-sm font-bold shadow-xl"
                style={{
                  background: `${accent}18`,
                  borderColor: accent,
                  color: accent,
                  boxShadow: `0 0 24px -4px ${accent}40`,
                }}
              >
                AI Core
              </div>
              <span className="text-[9px] font-mono text-zinc-400">Autonomous Agent</span>
            </motion.div>

            {/* Glowing laser connection 2 with traveling particle */}
            <div className="w-14 h-0.5 bg-zinc-800 relative overflow-hidden">
              <motion.div
                animate={{ x: [-20, 60] }}
                transition={{ repeat: Infinity, duration: 1.6, ease: "linear", delay: 0.8 }}
                className="w-4 h-full rounded-full"
                style={{ background: accent, boxShadow: `0 0 8px ${accent}` }}
              />
            </div>

            <motion.div
              whileHover={{ scale: 1.1, rotate: -4 }}
              className="flex flex-col items-center gap-1.5 cursor-pointer"
            >
              <div className="w-11 h-11 rounded-xl bg-zinc-900 border border-zinc-700 flex items-center justify-center text-xs font-mono text-zinc-300 shadow-md">
                ACT
              </div>
              <span className="text-[9px] font-mono text-zinc-500">Verified Action</span>
            </motion.div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-zinc-800/40">
            <span>Governance: Active (RBAC + PII Masked)</span>
            <span style={{ color: accent }}>Accuracy: 99.4%</span>
          </div>
        </div>
      );

    case "automation":
      return (
        <div className="relative w-full h-64 rounded-2xl bg-zinc-950/80 border border-zinc-800 p-5 overflow-hidden flex flex-col justify-between shadow-2xl">
          <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: accent }} />
              Event-Driven Pipeline Dispatcher
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
              1,840 ops/sec
            </span>
          </div>

          <div className="grid grid-cols-3 gap-3 my-2">
            {[
              { title: "Trigger Ingest", time: "0.02s", status: "Resolved" },
              { title: "Agentic Eval", time: "0.18s", status: "Executed" },
              { title: "State Commit", time: "0.05s", status: "Synced" },
            ].map((step, idx) => (
              <motion.div
                key={step.title}
                whileHover={{ y: -3, scale: 1.03 }}
                className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between cursor-default"
              >
                <span className="text-[10px] font-mono text-zinc-500">0{idx + 1}</span>
                <span className="text-xs font-semibold text-zinc-200 mt-1 leading-snug">{step.title}</span>
                <span className="text-[10px] font-mono mt-2" style={{ color: accent }}>{step.status}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-zinc-800/40">
            <span>Zero manual intervention</span>
            <span style={{ color: accent }}>Error Rate: 0.00%</span>
          </div>
        </div>
      );

    case "multitenant":
      return (
        <div className="relative w-full h-64 rounded-2xl bg-zinc-950/80 border border-zinc-800 p-5 overflow-hidden flex flex-col justify-between shadow-2xl">
          <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: accent }} />
              Multi-Tenant Isolation Shards
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
              Zero-Trust
            </span>
          </div>

          <div className="space-y-2 py-1">
            {["Tenant-A (Enterprise Core)", "Tenant-B (FinTech Pro)", "Tenant-C (Healthcare)"].map((tenant, i) => (
              <motion.div
                key={tenant}
                whileHover={{ x: 4 }}
                className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900/50 border border-zinc-800/70 text-xs font-mono cursor-default"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full shadow" style={{ background: accent }} />
                  <span className="text-zinc-300">{tenant}</span>
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">Isolated Shard #{i + 1}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-zinc-800/40">
            <span>Encrypted at Rest & Transit</span>
            <span style={{ color: accent }}>Global Edge: 32 Regions</span>
          </div>
        </div>
      );

    case "cloudflow":
      return (
        <div className="relative w-full h-64 rounded-2xl bg-zinc-950/80 border border-zinc-800 p-5 overflow-hidden flex flex-col justify-between shadow-2xl">
          <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: accent }} />
              Serverless Event Mesh (AWS)
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
              Auto-Scaling
            </span>
          </div>

          <div className="flex items-center justify-around py-3">
            <motion.div whileHover={{ scale: 1.05 }} className="text-center cursor-pointer">
              <div className="px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 shadow">
                API Gateway
              </div>
              <span className="text-[9px] font-mono text-zinc-500 mt-1 block">Traffic Ingress</span>
            </motion.div>

            <span className="text-zinc-600 font-mono text-sm">➔</span>

            <motion.div whileHover={{ scale: 1.08 }} className="text-center cursor-pointer">
              <div
                className="px-3.5 py-2.5 rounded-xl border text-xs font-mono font-bold shadow-lg"
                style={{ background: `${accent}15`, borderColor: accent, color: accent }}
              >
                Lambda Mesh
              </div>
              <span className="text-[9px] font-mono text-zinc-400 mt-1 block">Sub-millisecond</span>
            </motion.div>

            <span className="text-zinc-600 font-mono text-sm">➔</span>

            <motion.div whileHover={{ scale: 1.05 }} className="text-center cursor-pointer">
              <div className="px-3 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 shadow">
                DynamoDB
              </div>
              <span className="text-[9px] font-mono text-zinc-500 mt-1 block">ACID State</span>
            </motion.div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-zinc-800/40">
            <span>Cost Efficiency: 68% savings</span>
            <span style={{ color: accent }}>99.99% Availability</span>
          </div>
        </div>
      );

    case "enterprise":
      return (
        <div className="relative w-full h-64 rounded-2xl bg-zinc-950/80 border border-zinc-800 p-5 overflow-hidden flex flex-col justify-between shadow-2xl">
          <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: accent }} />
              Enterprise Data Bridge (Dynamics & Salesforce)
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
              Live Bi-directional
            </span>
          </div>

          <div className="flex items-center justify-between gap-3 py-3">
            <motion.div whileHover={{ scale: 1.03 }} className="p-3.5 rounded-xl bg-zinc-900/80 border border-sky-500/30 flex-1 text-center shadow">
              <span className="text-xs font-bold text-sky-400 block">Microsoft 365</span>
              <span className="text-[10px] font-mono text-zinc-400">Power Platform</span>
            </motion.div>

            <div className="flex flex-col items-center px-1">
              <span className="text-sm text-zinc-500 font-mono">⟷</span>
              <span className="text-[9px] font-mono font-bold" style={{ color: accent }}>Dataverse</span>
            </div>

            <motion.div whileHover={{ scale: 1.03 }} className="p-3.5 rounded-xl bg-zinc-900/80 border border-emerald-500/30 flex-1 text-center shadow">
              <span className="text-xs font-bold text-emerald-400 block">Salesforce</span>
              <span className="text-[10px] font-mono text-zinc-400">Sales & Service</span>
            </motion.div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-zinc-800/40">
            <span>Unified Single Source of Truth</span>
            <span style={{ color: accent }}>Zero Data Duplication</span>
          </div>
        </div>
      );

    case "transform":
      return (
        <div className="relative w-full h-64 rounded-2xl bg-zinc-950/80 border border-zinc-800 p-5 overflow-hidden flex flex-col justify-between shadow-2xl">
          <div className="flex items-center justify-between border-b border-zinc-800/60 pb-3">
            <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: accent }} />
              Modernisation Velocity Matrix
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
              Phased Sprint
            </span>
          </div>

          <div className="space-y-2.5 py-1">
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-mono text-zinc-400 w-16">Phase 1</span>
              <div className="h-2 flex-1 rounded-full bg-zinc-800 overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: "100%" }} viewport={{ once: false }} transition={{ duration: 0.8 }} className="h-full rounded-full bg-rose-500" />
              </div>
              <span className="text-[10px] font-mono text-rose-400 font-bold">Decoupled</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-mono text-zinc-400 w-16">Phase 2</span>
              <div className="h-2 flex-1 rounded-full bg-zinc-800 overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: "85%" }} viewport={{ once: false }} transition={{ duration: 0.8, delay: 0.1 }} className="h-full rounded-full bg-rose-500" />
              </div>
              <span className="text-[10px] font-mono text-zinc-400">85% Cloud</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-[10px] font-mono text-zinc-400 w-16">Phase 3</span>
              <div className="h-2 flex-1 rounded-full bg-zinc-800 overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: "60%" }} viewport={{ once: false }} transition={{ duration: 0.8, delay: 0.2 }} className="h-full rounded-full bg-rose-500" />
              </div>
              <span className="text-[10px] font-mono text-zinc-400">Agentic Ops</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-zinc-800/40">
            <span>Strangler Fig Migration</span>
            <span style={{ color: accent }}>Zero System Downtime</span>
          </div>
        </div>
      );
  }
}

// ─── 3D Interactive Blueprint Card with Cursor Follow & Re-entry Glow ────────

function BlueprintCard({
  solution,
  isHighlighted,
}: {
  solution: SolutionData;
  isHighlighted: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [coords, setCoords] = useState<{ x: number; y: number } | null>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [activeTab, setActiveTab] = useState<"pipeline" | "capabilities">("pipeline");
  const inView = useInView(cardRef, { once: false, margin: "-70px" });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCoords({ x, y });
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rX = ((y - centerY) / centerY) * -5;
    const rY = ((x - centerX) / centerX) * 5;
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
      id={`solution-${solution.id}`}
      initial={{ opacity: 0.3, y: 35, rotateX: -6 }}
      animate={{
        opacity: inView ? 1 : 0.4,
        y: inView ? 0 : 25,
        rotateX: isHovered ? rotateX : (inView ? 0 : -6),
        rotateY: isHovered ? rotateY : 0,
        scale: isHighlighted ? 1.02 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 240,
        damping: 22,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`group relative p-8 sm:p-12 rounded-3xl border transition-all duration-500 overflow-hidden ${
        isHighlighted
          ? "border-2 bg-zinc-900/90 shadow-[0_0_60px_-10px_rgba(255,255,255,0.2)]"
          : "border-zinc-800/80 bg-zinc-900/40 hover:bg-zinc-900/60"
      }`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        borderColor: isHighlighted ? solution.accent : undefined,
        boxShadow: inView
          ? `0 20px 45px -15px rgba(0,0,0,0.6), 0 0 40px -10px ${solution.accent}24`
          : "none",
      }}
    >
      {/* Dynamic Cursor Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity: coords ? 1 : 0,
          background: coords
            ? `radial-gradient(450px circle at ${coords.x}px ${coords.y}px, ${solution.accent}25, transparent 70%)`
            : "none",
        }}
        aria-hidden="true"
      />

      {/* Top Accent Gradient Line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2.5px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${solution.accent}, transparent)`,
        }}
      />

      {/* Ambient background glow — re-activates on scroll back */}
      <div
        className="pointer-events-none absolute -top-12 -right-12 w-72 h-72 blur-3xl transition-opacity duration-700 -z-10"
        style={{
          background: solution.accent,
          opacity: inView ? 0.14 : 0.02,
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left column: Info & Interactive Toggles */}
        <div className="lg:col-span-7 flex flex-col justify-between h-full">
          <div>
            {/* Header: Index, Tag, Metric Pill */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-3">
                <span
                  className="text-2xl font-mono"
                  style={{ color: solution.accent }}
                  aria-hidden="true"
                >
                  {solution.icon}
                </span>
                <span
                  className="text-xs font-mono uppercase tracking-widest font-bold"
                  style={{ color: solution.accent }}
                >
                  {solution.tag}
                </span>
                <span className="text-xs font-mono text-zinc-600">
                  {solution.index} / 06
                </span>
              </div>

              {/* Live Metric Badge */}
              <div
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-mono font-semibold"
                style={{
                  borderColor: `${solution.accent}40`,
                  background: `${solution.accent}12`,
                  color: solution.accent,
                }}
              >
                <span>{solution.metric.value}</span>
                <span className="text-zinc-400 font-normal">{solution.metric.label}</span>
              </div>
            </div>

            {/* Title & Description */}
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white mt-2 mb-4 tracking-tight leading-tight">
              {solution.title}
            </h3>
            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed mb-8">
              {solution.description}
            </p>

            {/* Sub-view Switcher Tabs */}
            <div className="flex items-center gap-2 p-1 rounded-xl bg-zinc-950/60 border border-zinc-800 w-fit mb-6">
              <button
                onClick={() => setActiveTab("pipeline")}
                className={`px-4 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                  activeTab === "pipeline"
                    ? "bg-zinc-800 text-white shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Architecture Pipeline
              </button>
              <button
                onClick={() => setActiveTab("capabilities")}
                className={`px-4 py-1.5 rounded-lg text-xs font-mono font-semibold transition-all ${
                  activeTab === "capabilities"
                    ? "bg-zinc-800 text-white shadow"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Included Capabilities ({solution.capabilities.length})
              </button>
            </div>

            {/* Tab 1: Architecture Pipeline */}
            {activeTab === "pipeline" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-3 relative"
              >
                {/* Horizontal Traveling Beam (Desktop) */}
                <div className="hidden sm:block absolute top-1/2 left-6 right-6 h-[1.5px] -translate-y-1/2 bg-zinc-800 pointer-events-none -z-0">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${solution.accent}, transparent)`,
                      boxShadow: `0 0 8px ${solution.accent}`,
                    }}
                    animate={{ x: ["0%", "100%"], opacity: [0.2, 1, 0.2] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 relative z-10">
                  {solution.pipeline.map((node, i) => (
                    <motion.div
                      key={node.label}
                      whileHover={{ y: -3, scale: 1.02 }}
                      className="p-3.5 rounded-2xl bg-zinc-950/85 border border-zinc-800/90 relative overflow-hidden cursor-default backdrop-blur-sm shadow-md"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 mb-1">
                        <span className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: solution.accent }} />
                          STAGE 0{i + 1}
                        </span>
                        <span className="uppercase text-[9px] font-bold" style={{ color: solution.accent }}>
                          {node.type}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-white mb-0.5">{node.label}</div>
                      <div className="text-[11px] text-zinc-400 leading-snug">{node.sub}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Tab 2: Capabilities Checklist */}
            {activeTab === "capabilities" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2.5"
              >
                {solution.capabilities.map((cap) => (
                  <motion.div
                    key={cap}
                    whileHover={{ x: 4 }}
                    className="flex items-center gap-2.5 text-xs text-zinc-300 py-1 cursor-default"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0 shadow"
                      style={{ background: solution.accent }}
                    />
                    <span>{cap}</span>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Action Links */}
          <div className="mt-8 pt-6 border-t border-zinc-800/60 flex flex-wrap items-center gap-6">
            <Link
              href="/Contact"
              className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all"
              style={{ color: solution.accent }}
            >
              Discuss This Architecture
              <span aria-hidden="true">→</span>
            </Link>
            <Link
              href="/Services"
              className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors"
            >
              View Service Specifications
            </Link>
          </div>
        </div>

        {/* Right column: Interactive Visual Simulation */}
        <div className="lg:col-span-5 w-full flex flex-col justify-center">
          <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Telemetry &amp; Blueprint Engine</span>
            <span className="text-zinc-600">ARCH-{solution.id}</span>
          </div>
          <SolutionVisualizer type={solution.visualType} accent={solution.accent} />
        </div>
      </div>
    </motion.div>
  );
}

// ─── Smooth Animated Counter for Telemetry Numbers ──────────────────────────

function DynamicStatCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, margin: "-40px" });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) {
      return;
    }
    const num = parseFloat(value.replace(/[^0-9.]/g, ""));
    if (isNaN(num)) {
      setDisplay(value);
      return;
    }
    const isDecimal = value.includes(".");
    const duration = 1200;
    const startTime = performance.now();
    let frameId = 0;
    const animate = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * num;
      setDisplay(isDecimal ? current.toFixed(2) + "%" : Math.floor(current) + (value.includes("+") ? "+" : ""));
      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setDisplay(value);
      }
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [inView, value]);

  return <span ref={ref} suppressHydrationWarning>{display}</span>;
}

// ─── Page Component (Interactive Client) ─────────────────────────────────────

export default function SolutionsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // Top scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const filteredSolutions =
    selectedCategory === "all"
      ? solutionsData
      : solutionsData.filter((s) => s.category === selectedCategory);

  const handleChallengeClick = (targetId: string) => {
    setHighlightedId(targetId);
    const element = document.getElementById(`solution-${targetId}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  // Clear highlight after 5 seconds
  useEffect(() => {
    if (highlightedId) {
      const timer = setTimeout(() => setHighlightedId(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [highlightedId]);

  return (
    <div suppressHydrationWarning className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[var(--accent-hover)] selection:text-black overflow-x-hidden">
      {/* Top scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-violet-500 via-sky-500 to-emerald-500 origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* Unique Blueprint/Circuit Grid Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="solutions-blueprint-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
              <circle cx="60" cy="0" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#solutions-blueprint-grid)" />
        </svg>

        {/* Ambient atmospheric glows */}
        <div className="absolute top-[10%] right-[10%] w-[550px] h-[550px] rounded-full bg-violet-600/[0.06] blur-[150px] pointer-events-none animate-pulse" />
        <div className="absolute bottom-[20%] left-[5%] w-[650px] h-[650px] rounded-full bg-sky-600/[0.06] blur-[170px] pointer-events-none animate-pulse" />
      </div>

      <Navbar />

      <main className="relative z-10">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="solutions-hero-heading"
          className="max-w-6xl mx-auto px-6 pt-44 pb-20 text-center flex flex-col items-center"
          style={{ perspective: "1000px" }}
        >
          {/* Top category chip with ping */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono font-medium text-[var(--accent-hover)] mb-8 backdrop-blur-xl shadow-lg"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-hover)] animate-ping" />
            Architected for Impact · Engineered for Scale
          </motion.div>

          {/* Heading with 3D perspective flip */}
          <motion.h1
            id="solutions-hero-heading"
            initial={{ opacity: 0, y: 35, rotateX: -20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]"
          >
            Technology solutions designed{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[var(--accent-hover)] to-violet-400">
              around your business.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-7 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            Six modular solution disciplines that connect intelligence, eliminate manual friction,
            and deliver deterministic outcomes across your enterprise.
          </motion.p>

          {/* Hero CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link href="/Contact" className="liquid-lime-btn text-base py-4 px-8">
                <span>Request Solution Blueprint</span>
                <span className="arrow-icon w-8 h-8 text-sm" aria-hidden="true">→</span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href="/Services"
                className="px-7 py-4 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-600 font-semibold text-sm transition-all duration-300 block"
              >
                View Services Specs →
              </Link>
            </motion.div>
          </motion.div>

          {/* Top Telemetry / System Stats Bar with Dynamic Counters */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="mt-16 w-full max-w-4xl grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-800/20 backdrop-blur-md shadow-2xl"
          >
            {[
              { val: "6", label: "Core Disciplines" },
              { val: "99.99%", label: "Target Reliability" },
              { val: "Zero", label: "Vendor Lock-In" },
              { val: "Governed", label: "Enterprise AI Core" },
            ].map((stat) => (
              <div key={stat.label} className="bg-zinc-900/40 px-5 py-4 text-center group hover:bg-zinc-800/40 transition-colors">
                <div className="text-xl sm:text-2xl font-bold font-mono text-white group-hover:text-[var(--accent-hover)] transition-colors">
                  {stat.val.match(/[0-9]/) ? <DynamicStatCounter value={stat.val} /> : stat.val}
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mt-1">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* ── INTERACTIVE CHALLENGE MATCHER ("What are you solving for?") ────── */}
        <section
          aria-labelledby="challenge-matcher-heading"
          className="max-w-6xl mx-auto px-6 py-16 border-t border-zinc-800/60"
        >
          <div className="p-8 sm:p-12 rounded-3xl bg-zinc-950/60 border border-zinc-800/80 backdrop-blur-md relative overflow-hidden shadow-2xl">
            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
                  Interactive Decision Engine
                </span>
                <h2
                  id="challenge-matcher-heading"
                  className="text-2xl sm:text-4xl font-extrabold text-white mt-2 tracking-tight"
                >
                  What is your primary technology objective?
                </h2>
                <p className="mt-2 text-zinc-400 text-sm max-w-xl">
                  Click any enterprise scenario below to jump straight to its recommended architectural solution.
                </p>
              </div>
              <div className="text-xs font-mono text-zinc-500 flex items-center gap-1.5 flex-shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Matching Active
              </div>
            </div>

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {challengeMatchers.map((item) => (
                <motion.button
                  key={item.id}
                  whileHover={{ y: -4, scale: 1.015 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleChallengeClick(item.targetSolutionId)}
                  className="text-left p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/90 hover:border-[var(--accent-hover)] hover:bg-zinc-800/40 transition-all duration-300 group flex flex-col justify-between cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0 p-2 rounded-xl bg-zinc-800/60 border border-zinc-700/60 group-hover:border-[var(--accent-hover)]/40 transition-colors">
                      {item.icon}
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-zinc-200 group-hover:text-white leading-snug">
                        {item.challenge}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-[11px] font-mono text-zinc-500 group-hover:text-[var(--accent-hover)] transition-colors">
                    <span>Jump to Solution</span>
                    <span>→</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        {/* ── THE SIX SOLUTION BLUEPRINTS ───────────────────────────────────── */}
        <section
          aria-labelledby="solutions-matrix-heading"
          className="max-w-6xl mx-auto px-6 py-12 pb-24"
        >
          {/* Header and Filter Pills */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
                The Architecture Portfolio
              </span>
              <h2
                id="solutions-matrix-heading"
                className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-2"
              >
                Six Solution Blueprints
              </h2>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-zinc-900/60 border border-zinc-800 w-fit">
              {[
                { id: "all", label: "All Disciplines" },
                { id: "ai", label: "AI & Automation" },
                { id: "saas", label: "SaaS Platforms" },
                { id: "cloud", label: "Cloud-Native" },
                { id: "enterprise", label: "Enterprise Ecosystems" },
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setSelectedCategory(filter.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
                    selectedCategory === filter.id
                      ? "bg-[var(--accent-hover)] text-black font-semibold shadow"
                      : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </div>

          {/* Cards Stack with Staggered Viewport Re-entry and Re-glow */}
          <div className="space-y-10">
            {filteredSolutions.map((sol) => (
              <BlueprintCard
                key={sol.id}
                solution={sol}
                isHighlighted={highlightedId === sol.id}
              />
            ))}
          </div>
        </section>

        {/* ── ARCHITECTURAL PILLARS (Why ZamNexus Solutions) ────────────────── */}
        <section
          aria-labelledby="pillars-heading"
          className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
              Engineering Principles
            </span>
            <h2
              id="pillars-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-2"
            >
              Five Pillars of Every ZamNexus Solution
            </h2>
            <p className="mt-3 text-zinc-400 text-base max-w-xl">
              We do not believe in disposable software. Every blueprint is engineered for decade-scale agility.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {valuePillars.map((pillar) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0.3, y: 25, rotateX: -6 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: false, margin: "-50px" }}
                whileHover={{ y: -7, scale: 1.02 }}
                transition={{ duration: 0.4 }}
                className="p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-zinc-700 relative overflow-hidden flex flex-col justify-between group shadow-xl"
                style={{ perspective: "1000px" }}
              >
                {/* Top accent bar */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px]"
                  style={{
                    background: `linear-gradient(90deg, transparent, ${pillar.accent}, transparent)`,
                  }}
                />

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-sm border"
                      style={{
                        background: `${pillar.accent}15`,
                        borderColor: `${pillar.accent}40`,
                        color: pillar.accent,
                      }}
                    >
                      {pillar.number}
                    </span>
                    <span
                      className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full border"
                      style={{
                        borderColor: `${pillar.accent}30`,
                        color: pillar.accent,
                        background: `${pillar.accent}08`,
                      }}
                    >
                      {pillar.metric}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/50 flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span>Standard Architecture</span>
                  <span style={{ color: pillar.accent }}>Verified</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* ── DELIVERY ARCHITECTURE ROADMAP ─────────────────────────────────── */}
        <section
          aria-labelledby="delivery-framework-heading"
          className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="rounded-3xl bg-gradient-to-br from-zinc-900/80 via-zinc-900/50 to-zinc-950 border border-zinc-800 p-10 sm:p-16 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-12">
            <div className="max-w-xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
                Delivery Framework
              </span>
              <h2
                id="delivery-framework-heading"
                className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-3 leading-tight"
              >
                From System Architecture to Autonomous Operations
              </h2>
              <p className="mt-5 text-zinc-400 text-base leading-relaxed">
                We work across structured sprints — combining architecture blueprints, rapid prototyping,
                continuous integration, and automated verification so that you gain immediate working software
                without enterprise delivery delays.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link href="/Contact" className="liquid-lime-btn text-base py-3.5 px-7">
                    <span>Schedule Solution Call</span>
                    <span className="arrow-icon w-8 h-8 text-sm" aria-hidden="true">→</span>
                  </Link>
                </motion.div>
                <Link
                  href="/Services"
                  className="px-6 py-3.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-sm font-semibold text-zinc-300 border border-zinc-700 transition-colors"
                >
                  View Delivery Stages →
                </Link>
              </div>
            </div>

            {/* Stages Stack */}
            <div className="w-full lg:w-96 space-y-3">
              {[
                { step: "01", title: "Architecture Discovery", sub: "Threat modeling & data schema" },
                { step: "02", title: "Working Prototype", sub: "Target cloud sandbox in 14 days" },
                { step: "03", title: "Production Hardening", sub: "Zero-trust & load testing" },
                { step: "04", title: "Autonomous Evolution", sub: "Continuous AI monitoring" },
              ].map((stage) => (
                <motion.div
                  key={stage.step}
                  whileHover={{ x: 6, scale: 1.02 }}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors cursor-default"
                >
                  <span className="text-sm font-mono font-bold text-[var(--accent-hover)]">
                    {stage.step}
                  </span>
                  <div>
                    <h4 className="text-sm font-bold text-white leading-snug">{stage.title}</h4>
                    <p className="text-[11px] text-zinc-500 font-mono">{stage.sub}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HIGH-CONVERSION BOTTOM CTA ───────────────────────────────────── */}
        <section
          aria-labelledby="solutions-cta-heading"
          className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
              Ready to Architect Your Solution?
            </span>
            <h2
              id="solutions-cta-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white"
            >
              Let&apos;s build what&apos;s next — together.
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed max-w-xl mx-auto">
              Whether you are automating manual workflows, building a new SaaS platform, or integrating
              enterprise AI agents — our engineering architects are ready to assist.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link href="/Contact" className="liquid-lime-btn text-base py-4 px-8">
                  <span>Start a Conversation</span>
                  <span className="arrow-icon w-8 h-8 text-sm" aria-hidden="true">→</span>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/Industries"
                  className="px-7 py-4 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-600 font-semibold text-sm transition-all duration-300 block"
                >
                  Explore Industries →
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
