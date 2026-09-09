import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── SEO Metadata ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Services — ZamNexus | AI, Cloud, Automation & Enterprise Technology",
  description:
    "Technology expertise to build what's next. AI strategy, SaaS development, cloud-native engineering, intelligent automation, Microsoft Dynamics 365 and Salesforce solutions.",
  openGraph: {
    title: "Services — ZamNexus",
    description:
      "AI, SaaS, cloud engineering, automation, Microsoft and Salesforce services — designed around your business.",
    type: "website",
    siteName: "ZamNexus",
  },
};

// ─── Types ───────────────────────────────────────────────────────────────────

interface ServiceBlock {
  id: string;
  index: string;
  tag: string;
  title: string;
  description: string;
  capabilities: string[];
}

interface ProcessStep {
  number: string;
  label: string;
  description: string;
}

interface WhyDifferentiator {
  title: string;
  description: string;
}

// ─── Static Data (from docx SERVICES section) ────────────────────────────────

const services: ServiceBlock[] = [
  {
    id: "ai-intelligent",
    index: "01",
    tag: "AI & INTELLIGENT SOLUTIONS",
    title: "AI & Intelligent Solutions",
    description:
      "Practical AI that delivers real business value — from strategy and architecture through to production-ready AI copilots, autonomous agents, intelligent automation and governed AI systems.",
    capabilities: [
      "AI Strategy & Architecture",
      "AI Copilots & Assistants",
      "Autonomous AI Agents",
      "Generative AI Solutions",
      "Knowledge & Document Intelligence",
      "RAG & Retrieval-Augmented Generation",
      "Responsible AI Governance",
      "AI Integration & Deployment",
    ],
  },
  {
    id: "saas-development",
    index: "02",
    tag: "SAAS PRODUCT DEVELOPMENT",
    title: "SaaS Product Development",
    description:
      "We design and build scalable, secure SaaS products — from product strategy and architecture through to multi-tenant applications, customer portals and API-first platforms built for growth.",
    capabilities: [
      "Product Strategy & Architecture",
      "Multi-Tenant Application Development",
      "Customer & Partner Portals",
      "API-First Platform Design",
      "Subscription & Billing Integration",
      "Performance Engineering",
      "Security & Compliance",
      "Product Roadmapping & Iteration",
    ],
  },
  {
    id: "cloud-native",
    index: "03",
    tag: "CLOUD-NATIVE ENGINEERING",
    title: "Cloud-Native & Serverless Engineering",
    description:
      "Modern, event-driven backend systems and cloud infrastructure built with Node.js, TypeScript and AWS serverless architecture — resilient, cost-efficient and designed to adapt as your business grows.",
    capabilities: [
      "Cloud-Native Backend Development (Node.js, TypeScript)",
      "Serverless Architecture (AWS Lambda, Step Functions)",
      "Event-Driven Systems Design",
      "Infrastructure-as-Code (Terraform, CDK)",
      "CI/CD Pipeline Automation",
      "API Design & Integration",
      "Observability & Monitoring",
      "Legacy Modernisation & Migration",
    ],
  },
  {
    id: "intelligent-automation",
    index: "04",
    tag: "INTELLIGENT AUTOMATION",
    title: "Intelligent Automation",
    description:
      "We remove manual work, connect applications and build workflows that combine traditional automation with AI agents — freeing your people for higher-value work and enabling faster, smarter action.",
    capabilities: [
      "Business Process Automation",
      "Workflow Design & Orchestration",
      "Agentic Automation (AI Agents)",
      "AI-Enhanced Workflows",
      "Event-Driven Automation",
      "Process Discovery & Optimisation",
      "Integration Automation",
      "Automation Governance",
    ],
  },
  {
    id: "microsoft-solutions",
    index: "05",
    tag: "MICROSOFT SOLUTIONS",
    title: "Microsoft Business Solutions",
    description:
      "Consulting, architecture and delivery across Dynamics 365, Power Platform, Azure and Microsoft Copilot — helping you get more from the Microsoft ecosystem you already invest in.",
    capabilities: [
      "Microsoft Dynamics 365 (Sales, Customer Service, Field Service)",
      "Power Platform (Power Apps, Power Automate, Dataverse)",
      "Microsoft Copilot Integration",
      "Azure Integration Services",
      "Enterprise Architecture & Strategy",
      "Data Migration & System Integration",
      "Analytics & Business Intelligence",
      "Continuous Improvement & Support",
    ],
  },
  {
    id: "salesforce-solutions",
    index: "06",
    tag: "SALESFORCE SOLUTIONS",
    title: "Salesforce Solutions",
    description:
      "Implementation, architecture, integration and AI — built around your business processes and growth ambitions, not just the platform features.",
    capabilities: [
      "Salesforce Consulting & Strategy",
      "Solution Architecture",
      "CRM Implementation & Optimisation",
      "Sales & Service Automation",
      "Platform Integration",
      "Data Architecture & Migration",
      "Salesforce AI & Analytics",
      "Ongoing Managed Services",
    ],
  },
];

const processSteps: ProcessStep[] = [
  {
    number: "01",
    label: "Discover",
    description:
      "We understand your business, challenges, technology landscape and opportunities through structured workshops and analysis.",
  },
  {
    number: "02",
    label: "Define",
    description:
      "We define the right strategy, architecture and approach — aligning technology decisions with business goals.",
  },
  {
    number: "03",
    label: "Design",
    description:
      "We architect secure, scalable solutions designed to connect systems, automate processes and enable intelligence.",
  },
  {
    number: "04",
    label: "Build",
    description:
      "We develop, configure and test using agile delivery — keeping quality high and cycles short.",
  },
  {
    number: "05",
    label: "Connect",
    description:
      "We integrate your applications, APIs, data and workflows into a connected technology ecosystem.",
  },
  {
    number: "06",
    label: "Evolve",
    description:
      "We continuously improve and evolve your technology as your organisation and market change.",
  },
];

const whyPoints: WhyDifferentiator[] = [
  {
    title: "Business-Focused",
    description: "We start with your business challenges, opportunities and goals — not just the technology.",
  },
  {
    title: "Intelligence-Driven",
    description: "We help you use AI, automation and real-time data to make smarter decisions and act faster.",
  },
  {
    title: "Enterprise Experience",
    description: "Proven delivery of complex enterprise applications, integrations and technology programmes.",
  },
  {
    title: "Cloud-Native Thinking",
    description: "Systems designed to be secure, resilient, scalable and ready to evolve.",
  },
  {
    title: "Secure & Responsible by Design",
    description: "Security, governance and responsible AI built in from the start, not bolted on afterwards.",
  },
  {
    title: "Built to Scale",
    description: "Solutions designed to grow with your organisation and adapt to changing business needs.",
  },
];

// ─── Page Component (Server) ──────────────────────────────────────────────────

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[#D0FF71] selection:text-black">
      <div className="fixed inset-0 bg-ziel-grid opacity-60 pointer-events-none z-0" aria-hidden="true" />
      <Navbar />

      <main className="relative z-10">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="services-hero-heading"
          className="max-w-6xl mx-auto px-6 pt-44 pb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono font-medium text-[#D0FF71] mb-8 backdrop-blur-xl">
            Full-Lifecycle Engineering Services
          </div>
          <h1
            id="services-hero-heading"
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]"
          >
            Technology expertise to build{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D0FF71] to-emerald-300">
              what&apos;s next.
            </span>
          </h1>
          <p className="mt-7 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed line-clamp-2">
            Deep capability across AI, cloud, SaaS and automation —
            designed around your business objectives, not a technology brief.
          </p>
          <div className="mt-10 flex flex-col items-center gap-2">
            <Link href="/Contact" className="liquid-lime-btn text-base py-4 px-8">
              <span>Talk to Us</span>
              <span className="arrow-icon w-8 h-8 text-sm" aria-hidden="true">→</span>
            </Link>
            <span className="text-xs text-zinc-500 font-mono">No commitment · 30-min call</span>
          </div>
        </section>

        {/* ── CORE SERVICES ─────────────────────────────────────────────────── */}
        <section
          aria-labelledby="core-services-heading"
          className="max-w-6xl mx-auto px-6 py-10 pb-20"
        >
          <h2 id="core-services-heading" className="sr-only">
            Core Technology Services
          </h2>

          <div className="space-y-6">
            {services.map((srv) => (
              <article
                key={srv.id}
                className="group p-8 sm:p-12 rounded-3xl bg-zinc-900/40 border border-zinc-800 hover:border-[#D0FF71]/50 hover:bg-zinc-900/70 transition-all duration-300 shadow-2xl"
              >
                <div className="flex flex-col lg:flex-row items-start gap-8">
                  {/* Left: index + tag */}
                  <div className="flex-shrink-0 flex lg:flex-col items-center lg:items-start gap-4 lg:gap-3 lg:pt-1">
                    <div className="step-number group-hover:bg-[#D0FF71] group-hover:text-black group-hover:shadow-[0_0_20px_rgba(208,255,113,0.3)] transition-all duration-300">
                      {srv.index}
                    </div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
                      {srv.tag}
                    </span>
                  </div>

                  {/* Right: content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                      {srv.title}
                    </h3>
                    <p className="text-zinc-400 text-base leading-relaxed mb-6 max-w-2xl">
                      {srv.description}
                    </p>

                    {/* Capabilities grid */}
                    <div>
                      <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-3">
                        Capabilities
                      </div>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {srv.capabilities.map((cap) => (
                          <li key={cap} className="check-item text-xs sm:text-sm">
                            {cap}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <div className="mt-6 pt-6 border-t border-zinc-800/60">
                      <Link
                        href="/Contact"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#D0FF71] hover:underline underline-offset-4 transition-all"
                      >
                        Discuss {srv.title}
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── HOW WE DELIVER — 6-STEP PROCESS ──────────────────────────────── */}
        <section
          aria-labelledby="process-heading"
          className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
              How We Deliver
            </span>
            <h2
              id="process-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3"
            >
              From Discovery to Evolution
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl text-base leading-relaxed line-clamp-2">
              A structured, repeatable delivery approach — every engagement starts with
              understanding and ends with continuous improvement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {processSteps.map((step) => (
              <div
                key={step.number}
                className="group relative p-7 rounded-3xl bg-zinc-900/40 border border-zinc-800 hover:border-[#D0FF71]/50 hover:bg-zinc-900/60 transition-all duration-300 overflow-hidden"
              >
                <span
                  className="absolute top-4 right-5 text-6xl font-extrabold font-mono text-zinc-800/40 select-none pointer-events-none group-hover:text-[#D0FF71]/10 transition-colors"
                  aria-hidden="true"
                >
                  {step.number}
                </span>
                <div className="relative z-10">
                  <div className="step-number mb-5" aria-hidden="true">
                    {step.number}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{step.label}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── WHY ZAMNEXUS ─────────────────────────────────────────────────── */}
        <section
          aria-labelledby="why-services-heading"
          className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
              Why ZamNexus
            </span>
            <h2
              id="why-services-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3"
            >
              What Sets Us Apart
            </h2>
            <p className="mt-3 text-zinc-400 text-base leading-relaxed max-w-xl line-clamp-2">
              The judgement of a senior team, applied to every engagement we take on.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {whyPoints.map((point, idx) => (
              <div
                key={point.title}
                className="group p-7 rounded-3xl bg-zinc-900/40 border border-zinc-800 hover:border-[#D0FF71]/50 hover:bg-zinc-900/70 transition-all duration-300 hover:-translate-y-1 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="step-number text-sm" aria-hidden="true">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-[#D0FF71] transition-colors">
                    {point.title}
                  </h3>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="services-cta-heading"
          className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
              Ready to Get Started?
            </span>
            <h2
              id="services-cta-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white"
            >
              Let&apos;s build what&apos;s next.
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed max-w-xl mx-auto line-clamp-2">
              Tell us about your challenge, your idea or your ambition — we&apos;ll
              help you define the right approach.
            </p>
            <div className="flex flex-wrap items-start justify-center gap-6 pt-2">
              <div className="flex flex-col items-center gap-2">
                <Link href="/Contact" className="liquid-lime-btn text-base py-4 px-8">
                  <span>Start a Conversation</span>
                  <span className="arrow-icon w-8 h-8 text-sm" aria-hidden="true">→</span>
                </Link>
                <span className="text-xs text-zinc-500 font-mono">No commitment · 30-min call</span>
              </div>
              <Link
                href="/Solutions"
                className="px-7 py-4 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-600 font-semibold text-sm transition-all duration-300 mt-4"
              >
                Explore Solutions →
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
