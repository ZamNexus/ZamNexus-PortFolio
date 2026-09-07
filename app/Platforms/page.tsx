import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── SEO Metadata ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Platforms — ZamNexus | Microsoft Dynamics 365, Power Platform & Salesforce",
  description:
    "ZamNexus delivers Microsoft Dynamics 365, Power Platform, Azure and Salesforce solutions. Consulting, architecture, implementation and AI enablement for enterprise business platforms.",
  openGraph: {
    title: "Platforms — ZamNexus",
    description:
      "Microsoft and Salesforce platform expertise: Dynamics 365, Power Platform, Azure, Copilot, Sales Cloud, Service Cloud.",
    type: "website",
    siteName: "ZamNexus",
  },
};

// ─── Types ───────────────────────────────────────────────────────────────────

interface PlatformExpertise {
  label: string;
}

interface PlatformAchievement {
  text: string;
}

interface PlatformService {
  name: string;
}

// ─── Static Data (from docx PLATFORMS section) ───────────────────────────────

const microsoftExpertise: PlatformExpertise[] = [
  { label: "Microsoft Dynamics 365 (Sales, Customer Service, Field Service, Finance & Operations)" },
  { label: "Power Platform (Power Apps, Power Automate, Power BI, Power Pages, Dataverse)" },
  { label: "Microsoft Copilot (customisation, integration and enablement)" },
  { label: "Azure Integration Services (Logic Apps, API Management, Service Bus)" },
  { label: "Enterprise Architecture & Technology Strategy" },
  { label: "Data Architecture, Migration & Analytics" },
  { label: "Security, Governance & Compliance" },
];

const microsoftAchievements: PlatformAchievement[] = [
  { text: "Streamline operations with Dynamics 365 and connected cloud applications" },
  { text: "Automate complex workflows with Power Platform and AI-enhanced logic" },
  { text: "Empower teams with Microsoft Copilot for faster, smarter work" },
  { text: "Connect systems, data and processes across your Microsoft ecosystem" },
  { text: "Modernise legacy platforms and migrate to the cloud with confidence" },
];

const salesforceExpertise: PlatformExpertise[] = [
  { label: "Salesforce Consulting & Strategy" },
  { label: "Solution Architecture & Design" },
  { label: "CRM Implementation & Optimisation (Sales Cloud, Service Cloud)" },
  { label: "Automation & Workflow Configuration" },
  { label: "System Integration & API Development" },
  { label: "Data Architecture, Migration & Quality" },
  { label: "Salesforce AI & Analytics" },
];

const salesforceAchievements: PlatformAchievement[] = [
  { text: "Improve sales performance with optimised CRM processes and automation" },
  { text: "Deliver better customer service through connected, intelligent workflows" },
  { text: "Connect Salesforce with your wider technology ecosystem seamlessly" },
  { text: "Use AI and analytics to turn customer data into actionable insight" },
  { text: "Build a scalable Salesforce architecture designed for growth" },
];

const platformServices: PlatformService[] = [
  { name: "Platform Strategy & Roadmapping" },
  { name: "Architecture & Solution Design" },
  { name: "Implementation & Configuration" },
  { name: "Custom Development & Extensions" },
  { name: "Automation & AI Enablement" },
  { name: "Integration & Connected Systems" },
  { name: "Data Migration & Architecture" },
  { name: "Legacy Modernisation" },
  { name: "AI & Copilot Enablement" },
  { name: "Continuous Improvement & Managed Services" },
];

// ─── Page Component (Server) ──────────────────────────────────────────────────

export default function PlatformsPage() {
  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[#D0FF71] selection:text-black">
      <div className="fixed inset-0 bg-ziel-grid opacity-60 pointer-events-none z-0" aria-hidden="true" />
      <Navbar />

      <main className="relative z-10">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="platforms-hero-heading"
          className="max-w-6xl mx-auto px-6 pt-44 pb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono font-medium text-[#D0FF71] mb-8 backdrop-blur-xl">
            Connecting Platforms. Enabling Intelligent Business.
          </div>
          <h1
            id="platforms-hero-heading"
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]"
          >
            Enterprise platforms that{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D0FF71] to-emerald-300">
              power your business.
            </span>
          </h1>
          <p className="mt-7 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            We help organisations get more from Microsoft and Salesforce — connecting
            systems, automating processes and enabling AI-driven decisions across
            your enterprise platforms.
          </p>
        </section>

        {/* ── MICROSOFT SOLUTIONS ───────────────────────────────────────────── */}
        <section
          aria-labelledby="microsoft-heading"
          className="max-w-6xl mx-auto px-6 py-16"
        >
          <article className="rounded-3xl bg-zinc-900/40 border border-zinc-800 p-8 sm:p-14 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="step-number">⊞</span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
                Microsoft Solutions
              </span>
            </div>

            <h2
              id="microsoft-heading"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-6 leading-tight"
            >
              Microsoft Dynamics 365, Power Platform, Azure & Copilot
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed max-w-3xl mb-8">
              ZamNexus has deep expertise across the Microsoft business applications ecosystem. From
              CRM and ERP to low-code automation, AI copilots and cloud integration — we help
              organisations transform how they operate using the platforms they already invest in.
            </p>

            {/* Expertise */}
            <div className="mb-10">
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-3">
                Our Microsoft Expertise
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {microsoftExpertise.map((item) => (
                  <li key={item.label} className="check-item text-sm">
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* What we help you achieve */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/60 border border-zinc-800/60">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#D0FF71] font-bold mb-4">
                What We Help You Achieve
              </div>
              <ul className="space-y-3">
                {microsoftAchievements.map((item) => (
                  <li key={item.text} className="check-item text-sm">
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <Link
                href="/Contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#D0FF71] hover:underline underline-offset-4 transition-all"
              >
                Discuss Microsoft Solutions
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        </section>

        {/* ── SALESFORCE SOLUTIONS ──────────────────────────────────────────── */}
        <section
          aria-labelledby="salesforce-heading"
          className="max-w-6xl mx-auto px-6 py-8"
        >
          <article className="rounded-3xl bg-zinc-900/30 border border-zinc-800/60 p-8 sm:p-14 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <span className="step-number">⊙</span>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
                Salesforce Solutions
              </span>
            </div>

            <h2
              id="salesforce-heading"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-6 leading-tight"
            >
              Salesforce CRM, Automation, Integration & AI
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed max-w-3xl mb-8">
              From strategy and architecture to implementation and ongoing optimisation — we help
              organisations build and evolve their Salesforce ecosystem to support better customer
              relationships, smarter automation and data-driven decisions.
            </p>

            {/* Expertise */}
            <div className="mb-10">
              <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-3">
                Our Salesforce Expertise
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {salesforceExpertise.map((item) => (
                  <li key={item.label} className="check-item text-sm">
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* What we help you achieve */}
            <div className="p-6 sm:p-8 rounded-2xl bg-zinc-950/60 border border-zinc-800/60">
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#D0FF71] font-bold mb-4">
                What We Help You Achieve
              </div>
              <ul className="space-y-3">
                {salesforceAchievements.map((item) => (
                  <li key={item.text} className="check-item text-sm">
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <Link
                href="/Contact"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#D0FF71] hover:underline underline-offset-4 transition-all"
              >
                Discuss Salesforce Solutions
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        </section>

        {/* ── MORE THAN PLATFORM IMPLEMENTATION ─────────────────────────────── */}
        <section
          aria-labelledby="platform-services-heading"
          className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60 mt-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div className="lg:sticky lg:top-32">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
                Platform Services
              </span>
              <h2
                id="platform-services-heading"
                className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-3 leading-tight"
              >
                More Than Platform Implementation
              </h2>
              <p className="mt-5 text-zinc-400 text-base leading-relaxed">
                Our platform services go beyond configuration and customisation. We bring strategy,
                architecture, AI, integration and continuous improvement together — so your
                platforms deliver real business value, not just technical capability.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {platformServices.map((srv, idx) => (
                <div
                  key={srv.name}
                  className="group flex items-center gap-3 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-[#D0FF71]/50 hover:bg-zinc-900/70 transition-all duration-300"
                >
                  <span className="text-xs font-mono text-zinc-600 font-bold group-hover:text-[#D0FF71] transition-colors">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                    {srv.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── APPROACH ──────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="platform-approach-heading"
          className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="rounded-3xl bg-gradient-to-br from-zinc-900/90 via-zinc-900/60 to-zinc-950 border border-zinc-800 p-10 sm:p-16 relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#D0FF71]/5 blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div className="relative z-10 max-w-3xl">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
                Our Approach
              </span>
              <h2
                id="platform-approach-heading"
                className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-4 leading-tight"
              >
                Business First. Platform Enabled.{" "}
                <span className="text-[#D0FF71]">Intelligence Driven.</span>
              </h2>
              <p className="mt-6 text-zinc-400 text-base sm:text-lg leading-relaxed">
                We don&apos;t just implement platforms — we connect them to your business strategy,
                your data, your processes and your people. Every platform engagement starts with
                understanding your objectives and designing a solution that delivers measurable value.
              </p>
            </div>
          </div>
        </section>

        {/* ── WHY ZAMNEXUS FOR PLATFORMS ────────────────────────────────────── */}
        <section
          aria-labelledby="why-platforms-heading"
          className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
              Why ZamNexus
            </span>
            <h2
              id="why-platforms-heading"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-3"
            >
              The Right Partner for Your Platforms
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { title: "Business-led, not platform-led", desc: "We design platform solutions around your business needs, not the other way around." },
              { title: "Deep technical expertise", desc: "Real, hands-on architecture and development experience across Microsoft and Salesforce ecosystems." },
              { title: "AI-first mindset", desc: "We actively look for opportunities to integrate Copilot, AI agents and intelligent automation into your platforms." },
              { title: "Connected thinking", desc: "We don't just configure a platform — we connect it to your wider technology ecosystem and data landscape." },
              { title: "Long-term partnership", desc: "We are here for the full journey — from strategy and implementation through to optimisation and continuous improvement." },
            ].map((item, idx) => (
              <div
                key={item.title}
                className="group p-7 rounded-3xl bg-zinc-900/40 border border-zinc-800 hover:border-[#D0FF71]/50 hover:bg-zinc-900/70 transition-all duration-300 hover:-translate-y-1 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="step-number text-sm" aria-hidden="true">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-[#D0FF71] transition-colors">
                    {item.title}
                  </h3>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="platforms-cta-heading"
          className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
              Ready to Transform Your Platforms?
            </span>
            <h2
              id="platforms-cta-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white"
            >
              Talk to our platform team.
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed max-w-xl mx-auto">
              Whether you are implementing Dynamics 365, optimising your Salesforce CRM
              or connecting your enterprise platforms with AI and automation — we can help.
            </p>
            <Link href="/Contact" className="liquid-lime-btn text-base py-4 px-8 mx-auto">
              <span>Talk to Our Team</span>
              <span className="arrow-icon w-8 h-8 text-sm" aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
