import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── SEO Metadata ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Industries — ZamNexus | Technology Solutions by Sector",
  description:
    "ZamNexus serves Financial Services, Professional Services, Property, Public Sector, Education, Healthcare, Retail and Technology & SaaS with AI, cloud and enterprise platform solutions.",
  openGraph: {
    title: "Industries — ZamNexus",
    description:
      "Intelligent technology solutions tailored to your industry — from financial services to healthcare, education to retail.",
    type: "website",
    siteName: "ZamNexus",
  },
};

// ─── Types ───────────────────────────────────────────────────────────────────

interface IndustryBlock {
  id: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  capabilities: string[];
}

interface CrossCapability {
  title: string;
  description: string;
}

// ─── Static Data (from docx INDUSTRIES section) ──────────────────────────────

const industries: IndustryBlock[] = [
  {
    id: "financial-services",
    tag: "FINANCIAL SERVICES",
    title: "Financial Services",
    subtitle: "Secure, compliant and intelligent technology for financial institutions",
    description:
      "We help financial services organisations modernise operations, enhance customer experiences and meet regulatory requirements — using cloud-native engineering, intelligent automation and AI-powered insights.",
    capabilities: [
      "Regulatory & Compliance Automation",
      "Secure Cloud-Native Platforms",
      "AI-Driven Risk & Fraud Detection",
      "Customer Onboarding & Self-Service Portals",
      "Real-Time Data & Analytics",
      "Legacy System Modernisation",
    ],
  },
  {
    id: "professional-services",
    tag: "PROFESSIONAL SERVICES",
    title: "Professional Services",
    subtitle: "Connected technology for consulting, advisory and managed services",
    description:
      "We support professional services firms with scalable platforms, intelligent workflows and data-driven client engagement — enabling growth without proportional headcount increases.",
    capabilities: [
      "Client Portal & Engagement Platforms",
      "Project & Resource Management Solutions",
      "AI-Powered Knowledge Management",
      "Workflow Automation & Integration",
      "CRM & Business Development Tools",
      "Reporting & Business Intelligence",
    ],
  },
  {
    id: "property-facilities",
    tag: "PROPERTY & FACILITIES",
    title: "Property & Facilities Management",
    subtitle: "Connected, intelligent technology for property and estate management",
    description:
      "We help property and facilities management organisations digitise operations, automate processes and create connected tenant and building experiences — from maintenance to compliance.",
    capabilities: [
      "Tenant & Landlord Portals",
      "IoT-Connected Building Management",
      "Maintenance & Work Order Automation",
      "Lease Management & Document Intelligence",
      "Compliance & Regulatory Reporting",
      "Sustainability & Energy Monitoring",
    ],
  },
  {
    id: "public-sector",
    tag: "PUBLIC SECTOR",
    title: "Public Sector",
    subtitle: "Accessible, secure and efficient technology for public services",
    description:
      "We work with public sector organisations to deliver accessible digital services, automate administrative processes and improve citizen engagement — with security, compliance and inclusivity at the core.",
    capabilities: [
      "Citizen-Facing Digital Services",
      "Case Management & Workflow Automation",
      "Accessible, Inclusive Design",
      "Secure Cloud Hosting & Data Governance",
      "Grant & Funding Management Systems",
      "Reporting, Transparency & Compliance",
    ],
  },
  {
    id: "education",
    tag: "EDUCATION",
    title: "Education",
    subtitle: "Connected platforms for learning, administration and student experience",
    description:
      "We help education providers build connected platforms that improve student experiences, streamline administration and support data-driven decision-making across institutions.",
    capabilities: [
      "Student Portal & Experience Platforms",
      "Admissions & Enrolment Automation",
      "Learning Management Integration",
      "Staff & Resource Management",
      "Reporting, Analytics & Compliance",
      "AI-Enhanced Student Support",
    ],
  },
  {
    id: "healthcare",
    tag: "HEALTHCARE",
    title: "Healthcare",
    subtitle: "Secure, interoperable and intelligent technology for healthcare",
    description:
      "We support healthcare organisations with technology solutions that improve patient care, streamline operations and enable secure, compliant data sharing across systems and providers.",
    capabilities: [
      "Patient Portal & Experience Platforms",
      "Clinical Workflow Automation",
      "Health Data Integration & Interoperability",
      "AI-Assisted Decision Support",
      "Regulatory Compliance & Data Governance",
      "Remote Care & Telehealth Solutions",
    ],
  },
  {
    id: "retail-ecommerce",
    tag: "RETAIL & E-COMMERCE",
    title: "Retail & E-Commerce",
    subtitle: "Intelligent platforms for modern retail and digital commerce",
    description:
      "We help retail and e-commerce businesses build connected, scalable platforms — using AI personalisation, real-time analytics and modern SaaS architecture to drive revenue and improve customer experience.",
    capabilities: [
      "E-Commerce Platform Development",
      "Customer Data & Personalisation (AI)",
      "Inventory & Order Management Systems",
      "Omnichannel Integration",
      "Payment & Checkout Optimisation",
      "Marketing Automation & Analytics",
    ],
  },
  {
    id: "technology-saas",
    tag: "TECHNOLOGY & SAAS",
    title: "Technology & SaaS",
    subtitle: "Building and scaling technology products and platforms",
    description:
      "We partner with technology companies and SaaS businesses to design, build and scale products — from early-stage MVPs to enterprise-ready, multi-tenant platforms with AI, automation and API-first architecture.",
    capabilities: [
      "SaaS Product Strategy & Architecture",
      "Multi-Tenant Platform Development",
      "API-First & Event-Driven Design",
      "AI & Intelligent Feature Development",
      "DevOps, CI/CD & Infrastructure Automation",
      "Performance Engineering & Scalability",
    ],
  },
];

const crossCapabilities: CrossCapability[] = [
  {
    title: "Artificial Intelligence & Intelligent Automation",
    description: "AI agents, copilots, process automation and data-driven intelligence embedded across every solution.",
  },
  {
    title: "Cloud-Native Engineering",
    description: "Serverless, event-driven systems designed for resilience, performance and cost-efficiency.",
  },
  {
    title: "SaaS & Platform Development",
    description: "Scalable, multi-tenant applications with API-first architecture.",
  },
  {
    title: "Microsoft & Salesforce Solutions",
    description: "Dynamics 365, Power Platform, Azure, Sales Cloud, Service Cloud and AI enablement.",
  },
  {
    title: "Integration & Connected Technology",
    description: "APIs, data pipelines and system connectors that bring your ecosystem together.",
  },
  {
    title: "Security, Governance & Compliance",
    description: "Built into every solution from the start — not bolted on afterwards.",
  },
];

// ─── Page Component (Server) ──────────────────────────────────────────────────

export default function IndustriesPage() {
  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[#D0FF71] selection:text-black">
      <div className="fixed inset-0 bg-ziel-grid opacity-60 pointer-events-none z-0" aria-hidden="true" />
      <Navbar />

      <main className="relative z-10">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="industries-hero-heading"
          className="max-w-6xl mx-auto px-6 pt-44 pb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono font-medium text-[#D0FF71] mb-8 backdrop-blur-xl">
            Connecting Technology to Industry Needs
          </div>
          <h1
            id="industries-hero-heading"
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]"
          >
            Intelligent solutions designed{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D0FF71] to-emerald-300">
              around your world.
            </span>
          </h1>
          <p className="mt-7 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Every industry has unique challenges, regulations and opportunities. We bring
            technology expertise shaped by real understanding of the sectors we serve.
          </p>
        </section>

        {/* ── INDUSTRY BLOCKS ───────────────────────────────────────────────── */}
        <section
          aria-labelledby="industry-list-heading"
          className="max-w-6xl mx-auto px-6 py-10 pb-20"
        >
          <h2 id="industry-list-heading" className="sr-only">
            Industries We Serve
          </h2>

          <div className="space-y-6">
            {industries.map((ind, i) => (
              <article
                key={ind.id}
                id={ind.id}
                className={`group p-8 sm:p-12 rounded-3xl border transition-all duration-300 shadow-2xl ${
                  i % 2 === 0
                    ? "bg-zinc-900/40 border-zinc-800 hover:border-[#D0FF71]/50 hover:bg-zinc-900/70"
                    : "bg-zinc-900/25 border-zinc-800/60 hover:border-[#D0FF71]/40 hover:bg-zinc-900/50"
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="step-number text-sm group-hover:bg-[#D0FF71] group-hover:text-black transition-all duration-300" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
                    {ind.tag}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {ind.title}
                </h3>
                <p className="text-sm text-[#D0FF71]/80 font-medium mb-4">
                  {ind.subtitle}
                </p>
                <p className="text-zinc-400 text-base leading-relaxed mb-6 max-w-3xl">
                  {ind.description}
                </p>

                {/* How we can help */}
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-3">
                    How We Can Help
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                    {ind.capabilities.map((cap) => (
                      <li key={cap} className="check-item text-xs sm:text-sm">
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-6 border-t border-zinc-800/60">
                  <Link
                    href="/Contact"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#D0FF71] hover:underline underline-offset-4 transition-all"
                  >
                    Discuss {ind.title} Solutions
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── CROSS-INDUSTRY CAPABILITIES ───────────────────────────────────── */}
        <section
          aria-labelledby="cross-cap-heading"
          className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
              Technology Capabilities
            </span>
            <h2
              id="cross-cap-heading"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-3"
            >
              Our Technology Capabilities Across Industries
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl text-base leading-relaxed">
              Regardless of sector, every engagement draws on our core technology capabilities.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {crossCapabilities.map((cap, idx) => (
              <div
                key={cap.title}
                className="group p-7 rounded-3xl bg-zinc-900/40 border border-zinc-800 hover:border-[#D0FF71]/50 hover:bg-zinc-900/70 transition-all duration-300 hover:-translate-y-1 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="step-number text-sm" aria-hidden="true">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#D0FF71] transition-colors leading-snug">
                    {cap.title}
                  </h3>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">{cap.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CLOSING + CTA ─────────────────────────────────────────────────── */}
        <section
          aria-labelledby="industries-cta-heading"
          className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
              Your Industry. Your Challenges. Your Solution.
            </span>
            <h2
              id="industries-cta-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white"
            >
              Let&apos;s discuss how technology can transform your sector.
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed max-w-xl mx-auto">
              Whether you operate in financial services, healthcare, education
              or technology — ZamNexus can help you design, build and connect
              intelligent solutions tailored to your industry.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link href="/Contact" className="liquid-lime-btn text-base py-4 px-8">
                <span>Talk to Us</span>
                <span className="arrow-icon w-8 h-8 text-sm" aria-hidden="true">→</span>
              </Link>
              <Link
                href="/Solutions"
                className="px-7 py-4 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-600 font-semibold text-sm transition-all duration-300"
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
