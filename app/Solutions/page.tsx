import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Metadata ────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Solutions — ZamNexus | AI, SaaS, Cloud & Business Technology",
  description:
    "Explore ZamNexus solutions: AI-powered business transformation, intelligent automation, SaaS platforms, cloud-native engineering, Microsoft and Salesforce solutions.",
  openGraph: {
    title: "Solutions — ZamNexus",
    description:
      "Technology solutions designed around your business — AI, SaaS, cloud engineering, automation, Microsoft and Salesforce.",
    type: "website",
    siteName: "ZamNexus",
  },
};

// ─── Types ───────────────────────────────────────────────────────────────────

interface SolutionBlock {
  id: string;
  index: string;
  tag: string;
  title: string;
  description: string;
  includes: string[];
  icon: string;
}

interface Differentiator {
  title: string;
  description: string;
}

// ─── Static Data ─────────────────────────────────────────────────────────────

const solutionBlocks: SolutionBlock[] = [
  {
    id: "ai-powered",
    index: "01",
    tag: "AI & INTELLIGENT SOLUTIONS",
    icon: "◈",
    title: "AI-Powered Business",
    description:
      "We help organisations put Artificial Intelligence to practical use — building copilots, autonomous agents, knowledge intelligence systems and governed AI pipelines that create measurable business outcomes, not just proof-of-concepts.",
    includes: [
      "AI Assistants & Copilots",
      "Autonomous AI Agents",
      "Generative AI Solutions",
      "Knowledge & Document Intelligence",
      "Responsible & Governed AI",
      "AI Strategy & Architecture",
    ],
  },
  {
    id: "intelligent-automation",
    index: "02",
    tag: "AUTOMATION",
    icon: "⟐",
    title: "Intelligent Automation",
    description:
      "We connect applications, eliminate manual work and build intelligent workflows — combining traditional automation with AI agents that can reason, decide and act on your behalf, freeing your teams to focus on higher-value activity.",
    includes: [
      "Business Process Automation",
      "Workflow Design & Implementation",
      "Agentic Automation",
      "AI-Enhanced Workflows",
      "Event-Driven Automation",
      "Process Discovery & Optimisation",
    ],
  },
  {
    id: "saas-platforms",
    index: "03",
    tag: "SAAS PRODUCT DEVELOPMENT",
    icon: "⬡",
    title: "SaaS Platforms",
    description:
      "From early concept to enterprise-ready SaaS product, we design and build scalable, multi-tenant platforms with security, performance and growth built in from the start — so your product can scale without rebuilding.",
    includes: [
      "Product Strategy & Architecture",
      "Multi-Tenant Application Development",
      "Customer & Partner Portals",
      "API-First Platform Design",
      "Subscription & Billing Integration",
      "Product Roadmap & Iteration",
    ],
  },
  {
    id: "cloud-native",
    index: "04",
    tag: "CLOUD-NATIVE ENGINEERING",
    icon: "⬢",
    title: "Cloud-Native Solutions",
    description:
      "Modern backend systems and cloud infrastructure built for resilience, performance and cost-efficiency. We architect and deliver serverless, event-driven platforms on AWS that adapt as your business evolves — without the operational overhead.",
    includes: [
      "Cloud-Native Backend Development",
      "Serverless & Event-Driven Architecture",
      "AWS Cloud Engineering",
      "Infrastructure-as-Code",
      "CI/CD Pipeline Automation",
      "Legacy Modernisation",
    ],
  },
  {
    id: "connected-enterprise",
    index: "05",
    tag: "MICROSOFT & SALESFORCE",
    icon: "⊞",
    title: "Connected Enterprise",
    description:
      "We help organisations get more from their enterprise platforms — Microsoft Dynamics 365, Power Platform, Azure and Salesforce — connecting systems, automating processes and using AI to unlock the value of data you already have.",
    includes: [
      "Microsoft Dynamics 365",
      "Power Platform & Dataverse",
      "Microsoft Copilot",
      "Salesforce CRM & Automation",
      "Platform Integration",
      "Enterprise AI Enablement",
    ],
  },
  {
    id: "digital-transformation",
    index: "06",
    tag: "DIGITAL TRANSFORMATION",
    icon: "⊙",
    title: "Digital Transformation",
    description:
      "End-to-end digital change programmes that move organisations from fragmented, manual systems to modern, connected and intelligent technology ecosystems — delivering lasting efficiency, agility and competitive advantage.",
    includes: [
      "Technology Strategy & Roadmapping",
      "Systems Integration",
      "Data Architecture & Migration",
      "Change Management Support",
      "Governance & Security Design",
      "Continuous Improvement",
    ],
  },
];

const differentiators: Differentiator[] = [
  {
    title: "Business outcomes, not just deliverables",
    description:
      "Every solution is designed around the business result you need — not just the technology component to build.",
  },
  {
    title: "Connected by design",
    description:
      "We think in systems, not silos — ensuring your applications, data and intelligence work together from day one.",
  },
  {
    title: "Intelligence built in, not bolted on",
    description:
      "AI and automation are integral to how we architect solutions, not added as an afterthought.",
  },
  {
    title: "Secure and responsible",
    description:
      "Security, governance and responsible AI practice are built into every solution we design and deliver.",
  },
  {
    title: "Built to evolve",
    description:
      "Our solutions are designed to grow, adapt and improve as your organisation, technology and market change.",
  },
];

// ─── Page Component (Server) ──────────────────────────────────────────────────

export default function SolutionsPage() {
  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[#D0FF71] selection:text-black">
      <div className="fixed inset-0 bg-ziel-grid opacity-60 pointer-events-none z-0" aria-hidden="true" />
      <Navbar />

      <main className="relative z-10">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="solutions-hero-heading"
          className="max-w-6xl mx-auto px-6 pt-44 pb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono font-medium text-[#D0FF71] mb-8 backdrop-blur-xl">
            Enterprise Cloud &amp; AI Solutions
          </div>
          <h1
            id="solutions-hero-heading"
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]"
          >
            Technology solutions designed{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D0FF71] to-emerald-300">
              around your business.
            </span>
          </h1>
          <p className="mt-7 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Six solution areas that connect intelligence, automate complexity and
            deliver real outcomes across your organisation.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/Contact" className="liquid-lime-btn text-base py-4 px-8">
              <span>Let&apos;s Build What&apos;s Next</span>
              <span className="arrow-icon w-8 h-8 text-sm" aria-hidden="true">→</span>
            </Link>
            <Link
              href="/Services"
              className="px-7 py-4 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-600 font-semibold text-sm transition-all duration-300"
            >
              View our services →
            </Link>
          </div>
        </section>

        {/* ── SOLUTION BLOCKS ───────────────────────────────────────────────── */}
        <section
          aria-labelledby="solution-blocks-heading"
          className="max-w-6xl mx-auto px-6 py-10 pb-20"
        >
          <h2 id="solution-blocks-heading" className="sr-only">
            Our Six Solution Areas
          </h2>

          <div className="space-y-6">
            {solutionBlocks.map((sol, i) => (
              <article
                key={sol.id}
                className={`group p-8 sm:p-12 rounded-3xl border transition-all duration-300 shadow-2xl flex flex-col lg:flex-row items-start gap-10 ${
                  i % 2 === 0
                    ? "bg-zinc-900/40 border-zinc-800 hover:border-[#D0FF71]/50 hover:bg-zinc-900/70"
                    : "bg-zinc-900/25 border-zinc-800/60 hover:border-[#D0FF71]/40 hover:bg-zinc-900/50"
                }`}
              >
                {/* Left: number + icon */}
                <div className="flex-shrink-0 flex flex-col items-center gap-3 pt-1">
                  <div className="step-number group-hover:bg-[#D0FF71] group-hover:text-black group-hover:shadow-[0_0_20px_rgba(208,255,113,0.3)] transition-all duration-300">
                    {sol.index}
                  </div>
                  <span
                    className="text-2xl text-zinc-700 group-hover:text-[#D0FF71]/60 transition-colors hidden lg:block"
                    aria-hidden="true"
                  >
                    {sol.icon}
                  </span>
                </div>

                {/* Right: content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
                      {sol.tag}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4 group-hover:text-white transition-colors">
                    {sol.title}
                  </h3>
                  <p className="text-zinc-400 text-base leading-relaxed mb-6 max-w-2xl">
                    {sol.description}
                  </p>

                  {/* Includes list */}
                  <div>
                    <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-3">
                      Includes
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {sol.includes.map((item) => (
                        <li key={item} className="check-item text-xs sm:text-sm">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Explore CTA */}
                  <div className="mt-6 pt-6 border-t border-zinc-800/60">
                    <Link
                      href="/Contact"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#D0FF71] hover:underline underline-offset-4 transition-all"
                    >
                      Discuss this solution
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── WHY CHOOSE ZAMNEXUS ───────────────────────────────────────────── */}
        <section
          aria-labelledby="why-solutions-heading"
          className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            {/* Left: heading + intro */}
            <div className="lg:sticky lg:top-32">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
                Why Choose ZamNexus
              </span>
              <h2
                id="why-solutions-heading"
                className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-3 leading-tight"
              >
                Business understanding meets technology expertise
              </h2>
              <p className="mt-5 text-zinc-400 text-base leading-relaxed">
                We are not just a technology vendor. We are a partner that
                combines deep business understanding with genuine technology
                expertise — to design solutions that create lasting value.
              </p>
              <div className="mt-8">
                <Link href="/About" className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-400 hover:text-[#D0FF71] transition-colors">
                  About ZamNexus
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>

            {/* Right: differentiator list */}
            <div className="space-y-4">
              {differentiators.map((diff, idx) => (
                <div
                  key={diff.title}
                  className="group flex items-start gap-5 p-6 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-[#D0FF71]/50 hover:bg-zinc-900/70 transition-all duration-300"
                >
                  <div className="step-number flex-shrink-0 text-sm group-hover:bg-[#D0FF71] group-hover:text-black transition-all duration-300">
                    {String(idx + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1.5 group-hover:text-[#D0FF71] transition-colors">
                      {diff.title}
                    </h3>
                    <p className="text-sm text-zinc-400 leading-relaxed">
                      {diff.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DELIVERY PROCESS REFERENCE ────────────────────────────────────── */}
        <section
          aria-labelledby="delivery-ref-heading"
          className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="rounded-3xl bg-gradient-to-br from-zinc-900/80 to-zinc-950 border border-zinc-800 p-10 sm:p-14 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-lg">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
                How We Deliver
              </span>
              <h2
                id="delivery-ref-heading"
                className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-3 leading-tight"
              >
                A structured approach from discovery to evolution
              </h2>
              <p className="mt-4 text-zinc-400 text-base leading-relaxed">
                Our six-step delivery framework — Discover, Design, Build, Connect, Automate,
                Evolve — ensures every solution is aligned to your business, built to perform and
                designed to grow.
              </p>
            </div>
            <div className="flex flex-col gap-3 flex-shrink-0 w-full md:w-auto">
              <Link href="/Services" className="liquid-lime-btn text-base py-3.5 px-7 justify-center">
                <span>View Delivery Approach</span>
                <span className="arrow-icon w-8 h-8 text-sm" aria-hidden="true">→</span>
              </Link>
              <Link
                href="/Contact"
                className="px-6 py-3.5 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-center text-sm font-semibold text-zinc-300 transition-colors border border-zinc-700"
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="solutions-cta-heading"
          className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
              Ready to Get Started?
            </span>
            <h2
              id="solutions-cta-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white"
            >
              Let&apos;s build what&apos;s next — together.
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed max-w-xl mx-auto">
              Whether you have a clear brief or an early-stage idea, our team can help you
              define, design and deliver the right solution for your organisation.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link href="/Contact" className="liquid-lime-btn text-base py-4 px-8">
                <span>Start a Conversation</span>
                <span className="arrow-icon w-8 h-8 text-sm" aria-hidden="true">→</span>
              </Link>
              <Link
                href="/Industries"
                className="px-7 py-4 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-600 font-semibold text-sm transition-all duration-300"
              >
                Explore Industries →
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
