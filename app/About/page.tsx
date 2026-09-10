import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── SEO Metadata ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "About Us — ZamNexus | A Technology Brand of Zamooq Limited",
  description:
    "ZamNexus is the technology and digital solutions brand of Zamooq Limited, established in 2009. 15+ years of enterprise experience across AI, SaaS, cloud engineering and business applications.",
  openGraph: {
    title: "About ZamNexus",
    description:
      "Connecting Intelligence. Enabling Action. Learn about ZamNexus, our heritage and our approach to technology.",
    type: "website",
    siteName: "ZamNexus",
  },
};

// ─── Types ───────────────────────────────────────────────────────────────────

interface Capability {
  title: string;
  description: string;
}

interface ApproachPoint {
  text: string;
}

// ─── Static Data ─────────────────────────────────────────────────────────────

const capabilities: Capability[] = [
  {
    title: "AI & Intelligent Solutions",
    description: "AI agents, copilots, generative AI, document intelligence and governed, responsible automation.",
  },
  {
    title: "SaaS & Cloud Solutions",
    description: "Scalable, multi-tenant SaaS products and cloud-native platforms designed for growth.",
  },
  {
    title: "Cloud-Native Engineering",
    description: "Event-driven, serverless backend systems built with Node.js, TypeScript and AWS.",
  },
  {
    title: "Intelligent Automation",
    description: "Workflow automation, agentic AI and process optimisation that frees your teams for higher-value work.",
  },
  {
    title: "Business Applications",
    description: "Microsoft Dynamics 365, Power Platform, Azure, Salesforce — consulting, architecture and delivery.",
  },
  {
    title: "Integration & Connected Technology",
    description: "APIs, data pipelines and system connectors that bring your technology ecosystem together.",
  },
];

const approachPoints: ApproachPoint[] = [
  { text: "We start with your business challenges, objectives and opportunities — not just the technology requirement." },
  { text: "We design solutions that connect systems, intelligence and automation — creating a joined-up technology ecosystem." },
  { text: "We build with AI, governance and responsible practice embedded from the start." },
  { text: "We deliver with agility — keeping communication open, cycles short and quality high." },
  { text: "We think long-term — designing solutions that scale, evolve and continue to deliver value." },
];

// ─── Page Component (Server) ──────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[var(--accent-hover)] selection:text-black">
      <div className="fixed inset-0 bg-ziel-grid opacity-60 pointer-events-none z-0" aria-hidden="true" />
      <Navbar />

      <main className="relative z-10">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="about-hero-heading"
          className="max-w-6xl mx-auto px-6 pt-44 pb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono font-medium text-[var(--accent-hover)] mb-8 backdrop-blur-xl">
            About ZamNexus
          </div>
          <h1
            id="about-hero-heading"
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]"
          >
            Connecting Intelligence.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[var(--accent-hover)] to-violet-400">
              Enabling Action.
            </span>
          </h1>
          <p className="mt-7 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            ZamNexus is the technology and digital solutions brand of Zamooq
            Limited — focused on designing and delivering intelligent technology
            that connects systems, automates complexity and enables smarter,
            faster business decisions.
          </p>
        </section>

        {/* ── OUR HERITAGE ──────────────────────────────────────────────────── */}
        <section
          aria-labelledby="heritage-heading"
          className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
                Our Heritage
              </span>
              <h2
                id="heritage-heading"
                className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3 leading-tight"
              >
                Built on 15+ Years of Enterprise Experience
              </h2>
            </div>
            <div className="space-y-5 text-zinc-400 text-base leading-relaxed">
              <p>
                Zamooq Limited, established in 2009, brings over 15 years of
                experience delivering technology solutions across enterprise
                environments. With deep roots in Microsoft Dynamics 365, CRM
                and enterprise business applications, Zamooq has helped
                organisations across financial services, professional services,
                property and the public sector connect their technology to
                their business goals.
              </p>
              <p>
                ZamNexus is the evolution of that expertise — extending our
                enterprise heritage into Artificial Intelligence, cloud-native
                engineering, SaaS product development, intelligent automation
                and connected business technology. We bring the experience and
                reliability of an established technology consultancy, combined
                with the agility and ambition to deliver what&apos;s next.
              </p>
            </div>
          </div>
        </section>

        {/* ── WHAT WE DO ────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="about-capabilities-heading"
          className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
              What We Do
            </span>
            <h2
              id="about-capabilities-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3"
            >
              Six Core Capabilities
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl text-base leading-relaxed">
              Our capabilities span the full technology lifecycle — from strategy and architecture
              through to delivery, integration and continuous improvement.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {capabilities.map((cap, idx) => (
              <div
                key={cap.title}
                className="group p-7 rounded-3xl bg-zinc-900/40 border border-zinc-800 hover:border-[var(--accent-hover)]/50 hover:bg-zinc-900/70 transition-all duration-300 hover:-translate-y-1 shadow-xl"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="step-number text-sm" aria-hidden="true">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-[var(--accent-hover)] transition-colors">
                    {cap.title}
                  </h3>
                </div>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {cap.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ── OUR APPROACH ──────────────────────────────────────────────────── */}
        <section
          aria-labelledby="approach-heading"
          className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
            <div className="lg:sticky lg:top-32">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
                Our Approach
              </span>
              <h2
                id="approach-heading"
                className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-3 leading-tight"
              >
                Business First. Technology Enabled.{" "}
                <span className="text-[var(--accent-hover)]">Intelligence Driven.</span>
              </h2>
              <p className="mt-5 text-zinc-400 text-base leading-relaxed">
                Every engagement starts with understanding your business —
                your objectives, your challenges and your opportunities. From
                there, we design and deliver solutions that are practical,
                scalable and built to create lasting value.
              </p>
            </div>

            <div className="space-y-3">
              {approachPoints.map((point, idx) => (
                <div
                  key={idx}
                  className="group flex items-start gap-4 p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800 hover:border-[var(--accent-hover)]/50 hover:bg-zinc-900/70 transition-all duration-300"
                >
                  <span className="step-number flex-shrink-0 text-sm group-hover:bg-[var(--accent-hover)] group-hover:text-black transition-all duration-300" aria-hidden="true">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm text-zinc-300 leading-relaxed pt-1">
                    {point.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── VISION & MISSION ──────────────────────────────────────────────── */}
        <section
          aria-labelledby="vision-mission-heading"
          className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Vision */}
            <div className="rounded-3xl bg-gradient-to-br from-zinc-900/90 to-zinc-950 border border-zinc-800 p-10 sm:p-12 relative overflow-hidden">
              <div
                className="absolute top-0 right-0 w-64 h-64 rounded-full bg-[var(--accent-hover)]/5 blur-3xl pointer-events-none"
                aria-hidden="true"
              />
              <div className="relative z-10">
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
                  Our Vision
                </span>
                <h2
                  id="vision-mission-heading"
                  className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-3 leading-tight"
                >
                  To create a future where technology is connected, intelligent and actionable.
                </h2>
                <p className="mt-5 text-zinc-400 text-base leading-relaxed">
                  A future where organisations use AI, automation and connected
                  systems to act faster, decide smarter and deliver more — not
                  just a future where more technology exists.
                </p>
              </div>
            </div>

            {/* Mission */}
            <div className="rounded-3xl bg-zinc-900/40 border border-zinc-800 p-10 sm:p-12">
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
                Our Mission
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-3 leading-tight">
                To connect technology, intelligence and business capability.
              </h3>
              <p className="mt-5 text-zinc-400 text-base leading-relaxed">
                We design and deliver solutions that bring together AI,
                automation, data, cloud engineering and enterprise platforms
                — so our clients can transform how they operate, serve their
                customers and grow.
              </p>
            </div>
          </div>
        </section>

        {/* ── CLOSING + CTA ─────────────────────────────────────────────────── */}
        <section
          aria-labelledby="about-cta-heading"
          className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
              Backed by Experience. Built for the Future.
            </span>
            <h2
              id="about-cta-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white"
            >
              Let&apos;s connect your ideas, technology and intelligence.
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed max-w-xl mx-auto">
              Whether you are exploring AI, building a SaaS product, modernising
              your business applications or automating complex processes — we are
              here to help.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link href="/Contact" className="liquid-lime-btn text-base py-4 px-8">
                <span>Start a Conversation</span>
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
