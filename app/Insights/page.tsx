import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── SEO Metadata ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  title: "Insights — ZamNexus | AI, Cloud & Technology Perspectives",
  description:
    "Practical perspectives on agentic AI, cloud-native engineering, automation and connected business technology from the ZamNexus team.",
  openGraph: {
    title: "Insights — ZamNexus",
    description:
      "Perspectives on AI, cloud and connected technology.",
    type: "website",
    siteName: "ZamNexus",
  },
};

// ─── Types ───────────────────────────────────────────────────────────────────

interface TopicPreview {
  title: string;
  category: string;
  description: string;
}

// ─── Static Data ─────────────────────────────────────────────────────────────

const topicPreviews: TopicPreview[] = [
  {
    title: "Agentic AI: From Answering Questions to Taking Action",
    category: "Artificial Intelligence",
    description:
      "Exploring how autonomous AI agents are moving beyond chat interfaces to execute real business processes — and what organisations need to prepare for.",
  },
  {
    title: "Building SaaS Products That Scale: Architecture Decisions That Matter",
    category: "SaaS Engineering",
    description:
      "Key architectural choices in multi-tenant SaaS product development — from API-first design to event-driven backend systems.",
  },
  {
    title: "Cloud-Native or Cloud-Hosted: Choosing the Right Migration Strategy",
    category: "Cloud Engineering",
    description:
      "Understanding the difference between lifting workloads to the cloud and truly re-architecting for serverless, event-driven infrastructure.",
  },
  {
    title: "Responsible AI Governance: Building Trust Into Intelligent Systems",
    category: "AI Governance",
    description:
      "Why AI governance is not an afterthought — and how organisations can build responsible, transparent and auditable AI from day one.",
  },
  {
    title: "Microsoft Copilot for Business: Beyond the Hype",
    category: "Microsoft Solutions",
    description:
      "A practical look at how enterprises can integrate Microsoft Copilot into their Dynamics 365 and Power Platform workflows for real productivity gains.",
  },
  {
    title: "The Connected Enterprise: Why Integration is the New Competitive Advantage",
    category: "Digital Transformation",
    description:
      "How connecting applications, data, automation and intelligence creates a compounding advantage over siloed technology investments.",
  },
];

// ─── Page Component (Server) ──────────────────────────────────────────────────

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[#D0FF71] selection:text-black">
      <div className="fixed inset-0 bg-ziel-grid opacity-60 pointer-events-none z-0" aria-hidden="true" />
      <Navbar />

      <main className="relative z-10">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="insights-hero-heading"
          className="max-w-6xl mx-auto px-6 pt-44 pb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono font-medium text-[#D0FF71] mb-8 backdrop-blur-xl">
            ZamNexus Insights
          </div>
          <h1
            id="insights-hero-heading"
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]"
          >
            Perspectives on{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D0FF71] to-emerald-300">
              AI, cloud and connected technology.
            </span>
          </h1>
          <p className="mt-7 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Practical thinking from our team on agentic AI, cloud-native
            engineering, automation and connected business technology.
          </p>
        </section>

        {/* ── COMING SOON NOTICE ────────────────────────────────────────────── */}
        <section className="max-w-6xl mx-auto px-6 pb-12">
          <div className="rounded-3xl bg-gradient-to-br from-zinc-900/90 to-zinc-950 border border-zinc-800 p-10 sm:p-14 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D0FF71]/10 border border-[#D0FF71]/20 text-xs font-mono font-bold text-[#D0FF71] mb-6">
              COMING SOON
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              Our insights content is in development.
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed max-w-lg mx-auto">
              Check back soon for practical perspectives on agentic AI,
              cloud-native engineering, automation and connected business
              technology from the ZamNexus team.
            </p>
            <div className="mt-8">
              <Link href="/Contact" className="liquid-lime-btn text-base py-3.5 px-7">
                <span>Get Notified</span>
                <span className="arrow-icon w-7 h-7 text-xs" aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── FEATURED TOPICS PREVIEW ───────────────────────────────────────── */}
        <section
          aria-labelledby="topics-heading"
          className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="mb-12">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
              What We&apos;re Writing About
            </span>
            <h2
              id="topics-heading"
              className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mt-3"
            >
              Upcoming Topics
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {topicPreviews.map((topic) => (
              <article
                key={topic.title}
                className="group p-8 sm:p-10 rounded-3xl bg-zinc-900/40 border border-zinc-800 hover:border-[#D0FF71]/50 hover:bg-zinc-900/70 transition-all duration-300 hover:-translate-y-1 shadow-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded bg-[#D0FF71]/10 text-[#D0FF71] border border-[#D0FF71]/20 text-xs font-mono font-bold uppercase">
                    {topic.category}
                  </span>
                  <span className="text-xs font-mono text-zinc-600">Coming Soon</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 leading-snug group-hover:text-[#D0FF71] transition-colors">
                  {topic.title}
                </h3>
                <p className="text-sm text-zinc-400 leading-relaxed">
                  {topic.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="insights-cta-heading"
          className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60"
        >
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <h2
              id="insights-cta-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white"
            >
              Have a question or topic you&apos;d like us to cover?
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed max-w-xl mx-auto">
              We&apos;re always happy to share our thinking. Get in touch and
              let&apos;s start a conversation.
            </p>
            <Link href="/Contact" className="liquid-lime-btn text-base py-4 px-8 mx-auto">
              <span>Talk to Us</span>
              <span className="arrow-icon w-8 h-8 text-sm" aria-hidden="true">→</span>
            </Link>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
