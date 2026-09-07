"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProductsPage() {
  const products = [
    {
      name: "Zamooq FlowOS",
      badge: "ENTERPRISE AI PLATFORM",
      tagline: "Autonomous Agent Orchestration & Reasoning Pipeline",
      description: "A full-lifecycle developer platform for deploying multi-agent reasoning graphs, embedding vector search, and evaluating enterprise LLM outputs in real-time.",
      features: ["Low-Latency Agent Mesh", "Multi-Vector Database Connectors", "Guardrails & Hallucination Defense", "Self-Hosted or Cloud Deployment"],
      status: "v2.4 Production Ready",
    },
    {
      name: "Zamooq EdgeShield",
      badge: "SECURITY GATEWAY",
      tagline: "Zero-Trust Edge Gateway & Automated DDoS Neutralizer",
      description: "Inspect, decrypt, and sanitize API traffic at 300+ global edge locations before malicious payloads can reach your backend microservices.",
      features: ["Hardware-Accelerated TLS 1.3", "Automated WAF & Rate-Limiting", "Continuous SOC2 Audit Telemetry", "Sub-5ms Edge Interception"],
      status: "Enterprise Live",
    },
    {
      name: "Zamooq TalentCloud",
      badge: "TALENT PLATFORM",
      tagline: "On-Demand Engineering Squads & Technical Staffing",
      description: "The algorithmic talent matchmaking system that empowers enterprises to spin up dedicated engineering pods in less than 72 hours.",
      features: ["Automated Code Assessment", "Timezone & Skill-Matrix Matching", "Direct Jira & GitHub Integration", "Transparent Hourly Billing"],
      status: "Global Access",
    },
  ];

  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[#D0FF71] selection:text-black">
      <div className="fixed inset-0 bg-ziel-grid opacity-60 pointer-events-none z-0" />
      <Navbar currentPath="/Products" />

      <main className="relative z-10 pt-32 pb-20">
        <section className="max-w-6xl mx-auto px-6 mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono font-medium text-[#D0FF71] mb-6">
            Proprietary Technology
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Software Products Built for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D0FF71] to-emerald-300">
              Modern Scale
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Discover our in-house enterprise SaaS platforms engineered by Zamooq to solve critical operational, security, and AI bottlenecks.
          </p>
        </section>

        {/* Products List */}
        <section className="max-w-6xl mx-auto px-6 space-y-10">
          {products.map((prod, i) => (
            <div
              key={i}
              className="p-8 sm:p-12 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-[#D0FF71]/60 transition-all duration-300 shadow-2xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
            >
              <div className="max-w-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-md bg-[#D0FF71]/10 text-[#D0FF71] border border-[#D0FF71]/20 text-xs font-mono font-bold">
                    {prod.badge}
                  </span>
                  <span className="text-xs font-mono text-zinc-500">{prod.status}</span>
                </div>

                <h2 className="text-3xl font-extrabold text-white">
                  {prod.name}
                </h2>
                <div className="text-sm font-semibold text-[#D0FF71]">
                  {prod.tagline}
                </div>

                <p className="text-zinc-400 text-base leading-relaxed">
                  {prod.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3">
                  {prod.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D0FF71]" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-shrink-0 flex flex-col gap-3 w-full sm:w-auto">
                <Link href="/Contact" className="liquid-lime-btn text-sm py-3.5 px-6 justify-center">
                  <span>Request a Demo</span>
                  <span className="arrow-icon w-6 h-6 text-xs">→</span>
                </Link>
                <Link
                  href="/Contact"
                  className="px-6 py-3 rounded-full bg-zinc-800 text-center hover:bg-zinc-700 text-xs font-mono font-semibold text-zinc-300 transition-colors"
                >
                  Contact Sales Team
                </Link>
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
