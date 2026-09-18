"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
import FinalCTA from "@/components/FinalCTA";
import PillTab from "@/components/PillTab";
import { useHeroMotion } from "@/components/useHeroMotion";

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

export interface InterestField {
  id: string;
  category: "cores" | "platforms" | "industries";
  categoryLabel: string;
  title: string;
  subtitle: string;
  badge: string;
  icon: string;
  accent: string;
  target: string;
  tags: string[];
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

// ─── Interest Navigator Categories & Specializations ────────────────────────

export const interestFields: InterestField[] = [
  // ─── PRODUCT SUITE CORES ───
  {
    id: "core-znxerp",
    category: "cores",
    categoryLabel: "Product Suite Cores",
    title: "ZNXERP — Industrial MES & Supply Chain",
    subtitle: "End-to-end manufacturing formulation, multi-currency ledgers, lab QC & automated GRN.",
    badge: "Active Core",
    icon: "🏭",
    accent: "#3B82F6",
    target: "#product-stage-znxerp",
    tags: ["Manufacturing", "Pharma", "Supply Chain", "WMS", "Accounts", "MES"],
  },
  {
    id: "core-znxepos",
    category: "cores",
    categoryLabel: "Product Suite Cores",
    title: "ZNXePOS — Sub-Second Retail Mesh POS",
    subtitle: "Offline-first multi-till synchronization, central SKU catalog, and barcode billing.",
    badge: "Active Core",
    icon: "⚡",
    accent: "#F59E0B",
    target: "#product-stage-znxepos",
    tags: ["Retail", "Point of Sale", "Multi-Till", "Offline-First", "Barcode", "Inventory"],
  },
  {
    id: "core-znxedu",
    category: "cores",
    categoryLabel: "Product Suite Cores",
    title: "ZNXEdu — Unified Multi-Campus ERP",
    subtitle: "Biometric turnstiles, fee bank reconciliation, grading, and parent portal applications.",
    badge: "Active Core",
    icon: "🎓",
    accent: "#8B5CF6",
    target: "#product-stage-znxedu",
    tags: ["Education", "Schools", "Universities", "Biometrics", "Fee Engine", "Admissions"],
  },
  {
    id: "core-znxcare",
    category: "cores",
    categoryLabel: "Product Suite Cores",
    title: "ZNXCare — Clinical Hospital EHR & LIS",
    subtitle: "Structured SOAP charting, HL7 analyzer integration, bed management & FIFO pharmacy.",
    badge: "Active Core",
    icon: "⟐",
    accent: "#10B981",
    target: "#product-stage-znxcare",
    tags: ["Healthcare", "Hospitals", "EHR", "HL7", "Pharmacy", "Intake", "Diagnostics"],
  },

  // ─── ENTERPRISE PLATFORMS ───
  {
    id: "plat-d365",
    category: "platforms",
    categoryLabel: "Enterprise Platforms",
    title: "Microsoft Dynamics 365 Core",
    subtitle: "Enterprise CRM, Finance & Operations, Field Service, and Customer Engagement.",
    badge: "Platform Hub",
    icon: "⊞",
    accent: "#0EA5E9",
    target: "/Products/Platforms#microsoft-ecosystem",
    tags: ["Dynamics 365", "Microsoft", "CRM", "Finance & Ops", "Field Service"],
  },
  {
    id: "plat-powerplatform",
    category: "platforms",
    categoryLabel: "Enterprise Platforms",
    title: "Power Platform & Automation",
    subtitle: "High-impact Power Apps, automated approval flows with Power Automate, and Power BI.",
    badge: "Platform Hub",
    icon: "⚡",
    accent: "#38BDF8",
    target: "/Products/Platforms#microsoft-ecosystem",
    tags: ["Power Apps", "Power Automate", "Power BI", "Dataverse", "Low-Code"],
  },
  {
    id: "plat-copilot",
    category: "platforms",
    categoryLabel: "Enterprise Platforms",
    title: "Microsoft Copilot & AI Studio",
    subtitle: "Custom Copilot Studio agents, Azure OpenAI RAG connectors, and reasoning engines.",
    badge: "Platform Hub",
    icon: "🧠",
    accent: "#0284C7",
    target: "/Products/Platforms#microsoft-ecosystem",
    tags: ["Copilot", "Azure OpenAI", "RAG", "AI Agents", "GenAI"],
  },
  {
    id: "plat-azure-services",
    category: "platforms",
    categoryLabel: "Enterprise Platforms",
    title: "Azure Integration Services Backbone",
    subtitle: "Enterprise event-driven integrations with Logic Apps, API Management & Service Bus.",
    badge: "Platform Hub",
    icon: "☁️",
    accent: "#0284C7",
    target: "/Products/Platforms#microsoft-ecosystem",
    tags: ["Azure", "Logic Apps", "API Management", "Service Bus", "Event Grid"],
  },
  {
    id: "plat-salesforce-core",
    category: "platforms",
    categoryLabel: "Enterprise Platforms",
    title: "Salesforce Sales & Service Cloud",
    subtitle: "Precision CPQ pricing engines, pipeline velocity, and omnichannel support triage.",
    badge: "Platform Hub",
    icon: "⊙",
    accent: "#00A1E0",
    target: "/Products/Platforms#salesforce-ecosystem",
    tags: ["Salesforce", "Sales Cloud", "Service Cloud", "CPQ", "Omnichannel"],
  },
  {
    id: "plat-agentforce",
    category: "platforms",
    categoryLabel: "Enterprise Platforms",
    title: "Salesforce Agentforce & Einstein AI",
    subtitle: "Autonomous CRM bots, lead scoring, and automated tier-1 case triage resolution.",
    badge: "Platform Hub",
    icon: "✨",
    accent: "#38BDF8",
    target: "/Products/Platforms#salesforce-ecosystem",
    tags: ["Agentforce", "Einstein AI", "Salesforce", "Autonomous Bots", "Predictive"],
  },
  {
    id: "plat-cross-gateway",
    category: "platforms",
    categoryLabel: "Enterprise Platforms",
    title: "The Cross-Platform Integration Gateway",
    subtitle: "High-throughput API mesh bridging Azure, MuleSoft, SAP, and Salesforce federations.",
    badge: "Platform Hub",
    icon: "🔗",
    accent: "#6366F1",
    target: "/Products/Platforms#integration-mesh",
    tags: ["MuleSoft", "Integration Mesh", "Azure Bridge", "SAP", "Zero-Copy Data"],
  },

  // ─── VERTICAL INDUSTRIES ───
  {
    id: "ind-finance",
    category: "industries",
    categoryLabel: "Vertical Industries",
    title: "Financial Services & FinTech",
    subtitle: "Regulatory KYC, AML compliance automation, fraud scoring, and audit traceability.",
    badge: "9 Sectors",
    icon: "💳",
    accent: "#10B981",
    target: "/Products/Industries#financial-services",
    tags: ["Banking", "FinTech", "Compliance", "AML", "KYC", "Audit Trails"],
  },
  {
    id: "ind-healthcare",
    category: "industries",
    categoryLabel: "Vertical Industries",
    title: "Healthcare & Life Sciences",
    subtitle: "Clinical EHR, HL7 lab interoperability, DICOM imaging, and HIPAA/GDPR records.",
    badge: "9 Sectors",
    icon: "🏥",
    accent: "#F43F5E",
    target: "/Products/Industries#healthcare",
    tags: ["Healthcare", "Hospitals", "EHR", "HL7", "Clinical", "HIPAA", "Pharma"],
  },
  {
    id: "ind-retail",
    category: "industries",
    categoryLabel: "Vertical Industries",
    title: "Retail & E-Commerce",
    subtitle: "Cloud & offline POS, multi-till sync, central SKU catalog, and customer loyalty engines.",
    badge: "9 Sectors",
    icon: "🛍️",
    accent: "#F97316",
    target: "/Products/Industries#retail-ecommerce",
    tags: ["Retail", "E-Commerce", "Point of Sale", "SKU Catalog", "Loyalty", "Omnichannel"],
  },
  {
    id: "ind-education",
    category: "industries",
    categoryLabel: "Vertical Industries",
    title: "Education & Academia",
    subtitle: "Multi-campus trusts, biometric admissions, timetable generators & student fee billing.",
    badge: "9 Sectors",
    icon: "🎓",
    accent: "#8B5CF6",
    target: "/Products/Industries#education",
    tags: ["Education", "Schools", "Colleges", "Universities", "Student Portals", "Biometrics"],
  },
  {
    id: "ind-public-sector",
    category: "industries",
    categoryLabel: "Vertical Industries",
    title: "Public Sector & Government",
    subtitle: "WCAG 2.1 AAA accessible citizen portals, case triage & sovereign cloud data governance.",
    badge: "9 Sectors",
    icon: "🏛️",
    accent: "#0EA5E9",
    target: "/Products/Industries#public-sector",
    tags: ["Government", "Public Sector", "WCAG", "Accessibility", "Citizen Portals"],
  },
  {
    id: "ind-prof-services",
    category: "industries",
    categoryLabel: "Vertical Industries",
    title: "Professional Services & Legal",
    subtitle: "Client engagement portals, automated billable hour tracking & AI document OCR.",
    badge: "9 Sectors",
    icon: "💼",
    accent: "#F59E0B",
    target: "/Products/Industries#professional-services",
    tags: ["Legal", "Consulting", "Advisory", "Timesheets", "Billing", "Document OCR"],
  },
  {
    id: "ind-property",
    category: "industries",
    categoryLabel: "Vertical Industries",
    title: "Property & Facilities Management",
    subtitle: "IoT building telemetry, automated tenant lease renewals & dispatch work orders.",
    badge: "9 Sectors",
    icon: "🏢",
    accent: "#14B8A6",
    target: "/Products/Industries#property-facilities",
    tags: ["Real Estate", "Facilities", "IoT", "Sensors", "Tenant Portal", "Leases"],
  },
  {
    id: "ind-saas",
    category: "industries",
    categoryLabel: "Vertical Industries",
    title: "Technology & SaaS Scale-Ups",
    subtitle: "Multi-tenant cloud backends, serverless event queues & embedded AI reasoning agents.",
    badge: "9 Sectors",
    icon: "☁️",
    accent: "#6366F1",
    target: "/Products/Industries#technology-saas",
    tags: ["SaaS", "Microservices", "API", "Cloud-Native", "Serverless", "AI Copilots"],
  },
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
        <div className="lg:col-span-7 pl-6 sm:pl-7">
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
                            className={`text-xs font-bold font-mono whitespace-normal break-words transition-colors ${
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
  const heroMotion = useHeroMotion();
  const router = useRouter();
  const [activeEngineIdx, setActiveEngineIdx] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<"all" | "cores" | "platforms" | "industries">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const enginesContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Filter interest fields based on category filter and search term
  const filteredInterests = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return interestFields.filter((item) => {
      const matchesCategory =
        activeCategoryFilter === "all" || item.category === activeCategoryFilter;
      if (!matchesCategory) return false;
      if (!query) return true;
      return (
        item.title.toLowerCase().includes(query) ||
        item.subtitle.toLowerCase().includes(query) ||
        item.categoryLabel.toLowerCase().includes(query) ||
        item.tags.some((t) => t.toLowerCase().includes(query))
      );
    });
  }, [activeCategoryFilter, searchQuery]);

  // Click outside and Escape key handler for interest dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      // Auto focus search field when opened
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [dropdownOpen]);

  const handleSelectInterest = (item: InterestField) => {
    setDropdownOpen(false);
    try {
      if (item.target.startsWith("#")) {
        const element = document.getElementById(item.target.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
          const engineIndex = productEngines.findIndex(
            (e) => `product-stage-${e.id}` === item.target.slice(1)
          );
          if (engineIndex !== -1) setActiveEngineIdx(engineIndex);
        }
      } else {
        router.push(item.target);
      }
    } catch {
      // Ignore navigation cancellation
    }
  };

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
            {...heroMotion.badge}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono font-medium text-[var(--accent-hover)] mb-8 backdrop-blur-xl shadow-lg"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-hover)] animate-pulse" />
            ZamNexus Enterprise Suite · 4 Industrial Cores
          </motion.div>

          <motion.h1
            id="products-hero-heading"
            {...heroMotion.heading}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]"
          >
            Systems engineered for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-400 via-amber-400 to-emerald-400">
              mission-critical scale.
            </span>
          </motion.h1>

          <motion.p
            {...heroMotion.paragraph}
            className="mt-6 text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            Four purpose-built engines connected through a unified security and intelligence mesh.
            Select an engine to preview its workflow.
          </motion.p>

          {/* ── INTERACTIVE INTEREST NAVIGATOR DROPDOWN & FAST SWITCHER ── */}
          <div className="mt-8 w-full max-w-3xl relative z-30" ref={dropdownRef}>
            {/* Control Bar: Dropdown Trigger + Quick Navigation Pills */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {/* Main Interactive Dropdown Trigger */}
              <button
                type="button"
                id="interest-navigator-btn"
                onClick={() => setDropdownOpen((prev) => !prev)}
                className={`inline-flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all duration-300 cursor-pointer shadow-xl backdrop-blur-xl ${
                  dropdownOpen
                    ? "border-[var(--accent-hover)] bg-zinc-900 ring-2 ring-[var(--accent-hover)]/20"
                    : "border-zinc-700/90 bg-zinc-900/90 hover:border-zinc-500 hover:bg-zinc-900 text-zinc-200"
                }`}
                aria-haspopup="listbox"
                aria-expanded={dropdownOpen}
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-hover)] animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                  Interest Navigator:
                </span>
                <span className="text-white font-medium text-sm">
                  {searchQuery ? `Searching: "${searchQuery}"` : "Jump to Your Field of Interest"}
                </span>
                <motion.span
                  animate={{ rotate: dropdownOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-zinc-400 text-xs ml-1"
                >
                  ▼
                </motion.span>
              </button>

              {/* Quick Direct Link Pill: Enterprise Platforms */}
              <Link
                href="/Products/Platforms"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-blue-500/40 bg-blue-950/40 hover:bg-blue-900/50 text-xs font-mono text-blue-300 hover:text-white transition-all duration-200 shadow-lg hover:border-blue-400 group"
              >
                <span className="text-blue-400">⊞</span>
                <span className="font-semibold">Enterprise Platforms</span>
                <span className="group-hover:translate-x-0.5 transition-transform text-blue-400">→</span>
              </Link>

              {/* Quick Direct Link Pill: Vertical Industries */}
              <Link
                href="/Products/Industries"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-emerald-500/40 bg-emerald-950/40 hover:bg-emerald-900/50 text-xs font-mono text-emerald-300 hover:text-white transition-all duration-200 shadow-lg hover:border-emerald-400 group"
              >
                <span className="text-emerald-400">🏢</span>
                <span className="font-semibold">Vertical Industries (9)</span>
                <span className="group-hover:translate-x-0.5 transition-transform text-emerald-400">→</span>
              </Link>
            </div>

            {/* Interactive Dropdown Panel Modal */}
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={heroMotion.shouldReduceMotion ? false : { opacity: 0.8, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: heroMotion.shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
                  className="absolute left-1/2 -translate-x-1/2 top-full mt-3 w-full max-w-2xl sm:max-w-3xl rounded-3xl bg-[#0c0f17]/95 border border-zinc-700 shadow-[0_25px_80px_rgba(0,0,0,0.95)] backdrop-blur-2xl p-5 text-left z-50 flex flex-col max-h-[75vh]"
                >
                  {/* Search Input Filter Bar */}
                  <div className="relative mb-3.5">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400 text-sm">
                      🔍
                    </div>
                    <input
                      ref={searchInputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Type your sector or interest (e.g., Healthcare, Dynamics 365, Retail POS, ERP, Azure)..."
                      className="w-full pl-10 pr-9 py-2.5 bg-zinc-950/90 border border-zinc-700/80 rounded-xl text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[var(--accent-hover)] focus:ring-1 focus:ring-[var(--accent-hover)] transition-all font-sans"
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-zinc-400 hover:text-white text-xs cursor-pointer"
                      >
                        ✕
                      </button>
                    )}
                  </div>

                  {/* Category Filter Pills */}
                  <div className="flex flex-wrap items-center gap-1.5 mb-3 pb-3 border-b border-zinc-800/80">
                    <PillTab
                      variant="pill"
                      size="sm"
                      isSelected={activeCategoryFilter === "all"}
                      onClick={() => setActiveCategoryFilter("all")}
                      label={`All (${interestFields.length})`}
                    />
                    <PillTab
                      variant="pill"
                      size="sm"
                      isSelected={activeCategoryFilter === "cores"}
                      onClick={() => setActiveCategoryFilter("cores")}
                      icon="⚡"
                      label="Product Cores (4)"
                      accent="var(--accent-hover)"
                    />
                    <PillTab
                      variant="pill"
                      size="sm"
                      isSelected={activeCategoryFilter === "platforms"}
                      onClick={() => setActiveCategoryFilter("platforms")}
                      icon="⊞"
                      label="Enterprise Platforms (7)"
                      accent="#0EA5E9"
                    />
                    <PillTab
                      variant="pill"
                      size="sm"
                      isSelected={activeCategoryFilter === "industries"}
                      onClick={() => setActiveCategoryFilter("industries")}
                      icon="🏢"
                      label="Vertical Industries (8)"
                      accent="#10B981"
                    />
                  </div>

                  {/* Scrollable Matching List */}
                  <div className="overflow-y-auto space-y-2 pr-1 custom-scrollbar max-h-[48vh]">
                    {filteredInterests.length === 0 ? (
                      <div className="py-8 text-center text-zinc-500 font-mono text-xs">
                        No matching interest fields found for &ldquo;{searchQuery}&rdquo;. Try another term.
                      </div>
                    ) : (
                      filteredInterests.map((item) => (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => handleSelectInterest(item)}
                          className="w-full text-left p-3.5 rounded-2xl bg-zinc-900/50 hover:bg-zinc-800/80 border border-zinc-800/80 hover:border-zinc-600 transition-all duration-200 group flex items-start justify-between gap-3 cursor-pointer"
                        >
                          <div className="flex items-start gap-3">
                            <span
                              className="text-xl p-2 rounded-xl bg-zinc-950 border border-zinc-800 shrink-0 mt-0.5"
                              style={{ color: item.accent }}
                            >
                              {item.icon}
                            </span>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-bold text-white group-hover:text-white transition-colors">
                                  {item.title}
                                </span>
                                <span
                                  className="text-[10px] font-mono px-2 py-0.5 rounded-md uppercase tracking-wider"
                                  style={{
                                    backgroundColor: `color-mix(in srgb, ${item.accent} 15%, transparent)`,
                                    color: item.accent,
                                  }}
                                >
                                  {item.badge}
                                </span>
                              </div>
                              <p className="text-xs text-zinc-400 mt-1 leading-relaxed line-clamp-2">
                                {item.subtitle}
                              </p>
                              <div className="flex flex-wrap gap-1 mt-2">
                                {item.tags.slice(0, 4).map((t) => (
                                  <span
                                    key={t}
                                    className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-zinc-950/80 text-zinc-400 border border-zinc-800/60"
                                  >
                                    {t}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="shrink-0 flex items-center gap-1 text-xs font-mono text-zinc-400 group-hover:text-white pt-1">
                            <span>{item.target.startsWith("#") ? "Jump" : "Explore"}</span>
                            <span className="group-hover:translate-x-1 transition-transform">
                              {item.target.startsWith("#") ? "↓" : "→"}
                            </span>
                          </div>
                        </button>
                      ))
                    )}
                  </div>

                  {/* Modal Footer Quick Action Tip */}
                  <div className="mt-3 pt-3 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span>💡 Click any option to navigate directly</span>
                    <span className="text-zinc-500">Esc to close</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 4-Engine Cockpit Cards Grid */}
          <motion.div
            {...heroMotion.telemetry}
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
                <div className="text-xs font-mono text-zinc-400 whitespace-normal break-words mt-0.5">
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
                          <div className="text-[11px] font-mono text-zinc-500 whitespace-normal break-words mt-0.5">
                            {p.name.split(" ").slice(0, 2).join(" ")}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}

                  {/* Ecosystem Sub-Pages Navigation Links */}
                  <div className="pt-4 mt-4 border-t border-zinc-800/80 space-y-1">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 px-4 mb-2 font-bold">
                      Ecosystem Sub-Pages
                    </div>
                    
                    <Link
                      href="/Products/Platforms"
                      className="w-full text-left px-4 py-3 rounded-xl transition-all duration-300 group hover:bg-zinc-900/50 block border border-transparent hover:border-blue-500/30"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base font-mono text-blue-400 group-hover:scale-110 transition-transform">
                          ⊞
                        </span>
                        <div>
                          <div className="text-xs font-semibold text-zinc-300 group-hover:text-blue-300 transition-colors flex items-center gap-1.5">
                            <span>Platforms</span>
                            <span className="text-[10px] font-mono text-blue-400">→</span>
                          </div>
                          <div className="text-[10px] font-mono text-zinc-500 whitespace-normal break-words">
                            Dynamics 365 &amp; Salesforce
                          </div>
                        </div>
                      </div>
                    </Link>

                    <Link
                      href="/Products/Industries"
                      className="w-full text-left px-4 py-3 rounded-xl transition-all duration-300 group hover:bg-zinc-900/50 block border border-transparent hover:border-emerald-500/30"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-base font-mono text-emerald-400 group-hover:scale-110 transition-transform">
                          🏢
                        </span>
                        <div>
                          <div className="text-xs font-semibold text-zinc-300 group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
                            <span>Industries</span>
                            <span className="text-[10px] font-mono text-emerald-400">→</span>
                          </div>
                          <div className="text-[10px] font-mono text-zinc-500 whitespace-normal break-words">
                            9 Regulated Sectors
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
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

        {/* ── PLATFORMS & INDUSTRY EXTENSIONS ─────────────────────────────── */}
        <section
          aria-labelledby="platforms-industries-heading"
          className="max-w-7xl mx-auto px-6 py-24 border-t border-zinc-800/60"
        >
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
              Ecosystem Extensions
            </span>
            <h2
              id="platforms-industries-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3 leading-tight"
            >
              Enterprise Platforms &amp; Vertical Industries
            </h2>
            <p className="mt-4 text-zinc-400 text-sm sm:text-base leading-relaxed">
              Explore how our products integrate natively with global enterprise platforms, or inspect our tailored software configurations for regulated industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Platforms Card */}
            <Link
              href="/Products/Platforms"
              className="group p-8 sm:p-10 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-blue-500/60 transition-all duration-300 flex flex-col justify-between relative overflow-hidden shadow-xl hover:bg-zinc-900/70"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30">
                    Enterprise Platforms
                  </span>
                  <span className="text-xs font-mono text-zinc-500">Microsoft &amp; Salesforce</span>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                  Microsoft Dynamics 365, Power Platform &amp; Salesforce
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Enterprise-grade ecosystem engineering. Full-lifecycle delivery across Microsoft Dynamics 365, Azure Integration Services, Salesforce Agentforce, and Data Cloud.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Dynamics 365", "Power Platform", "Salesforce Cloud", "Agentforce", "Azure"].map((p) => (
                    <span key={p} className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300">
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-blue-400 group-hover:text-blue-300">
                <span>Explore Enterprise Platforms</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>

            {/* Industries Card */}
            <Link
              href="/Products/Industries"
              className="group p-8 sm:p-10 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-emerald-500/60 transition-all duration-300 flex flex-col justify-between relative overflow-hidden shadow-xl hover:bg-zinc-900/70"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    Vertical Specializations
                  </span>
                  <span className="text-xs font-mono text-zinc-500">9 Regulated Sectors</span>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                  Tailored Configurations for Regulated Sectors
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  Every vertical brings unique regulatory mandates and operational workflows. Inspect pre-configured compliance matrices for Financial Services, Healthcare, Retail, and Education.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {["Financial Services", "Healthcare EHR", "Retail POS", "Campus IoT", "Public Sector"].map((ind) => (
                    <span key={ind} className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-zinc-950 border border-zinc-800 text-zinc-300">
                      {ind}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-6 mt-6 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-emerald-400 group-hover:text-emerald-300">
                <span>Explore Industry Configurations</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          </div>
        </section>

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
        <FinalCTA
          id="products-cta-heading"
          eyebrow="Deploy with Total Confidence"
          headline="Experience the Product Suite in Action"
          description="Schedule a dedicated 30-minute demonstration tailored to your exact operational requirements. See how ZNXERP, ZNXePOS, ZNXEdu, or ZNXCare seamlessly maps to your workflow."
          primaryButton={{
            label: "Schedule Executive Demo",
            href: "/Contact",
          }}
          secondaryButton={{
            label: "Explore Services →",
            href: "/Services",
          }}
          sidePanel={{
            title: "Deployment Assurance",
            items: [
              { label: "Zero-Downtime Migration", sublabel: "Parallel ledger verification" },
              { label: "24/7 Priority Support", sublabel: "< 15 minute critical response" },
              { label: "Custom Module Extensions", sublabel: "Tailored to regulatory needs" },
            ],
          }}
        />

      </main>

      <Footer hideCTA />
    </div>
  );
}
