"use client";

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ServicesPage() {
  const detailedServices = [
    {
      id: "staff-augmentation",
      title: "Staff Augmentation & Dedicated Squads",
      category: "Talent Scaling",
      desc: "Scale your technical team seamlessly with top 1% pre-vetted engineers, technical leads, and product architects ready to integrate directly into your workflow.",
      deliverables: ["Dedicated Full-Stack Developers", "Embedded DevOps Engineers", "Flexible Hourly or Milestone Contracts", "Timezone-Aligned Collaboration"],
      icon: "👥",
    },
    {
      id: "ai-development",
      title: "Artificial Intelligence & Agentic Workflows",
      category: "AI & Data",
      desc: "Transform enterprise operations with production-ready AI. We build autonomous agent pipelines, custom LLM fine-tuning, RAG retrieval engines, and computer vision systems.",
      deliverables: ["Multi-Agent Reasoning Systems", "Custom Model Fine-Tuning & Evaluation", "Vector Database Indexing & Search", "Enterprise AI Security & Governance"],
      icon: "🧠",
    },
    {
      id: "cyber-security",
      title: "Cyber Security & Zero-Trust Defense",
      category: "Security",
      desc: "Protect your infrastructure from evolving attack vectors. We implement defense-in-depth protocols, penetration testing, compliance automation, and real-time SIEM monitoring.",
      deliverables: ["SOC2 / ISO 27001 Compliance Prep", "Penetration Testing & Threat Auditing", "Cloud Workload Protection (CWPP)", "Identity & Access Management (IAM)"],
      icon: "🛡️",
    },
    {
      id: "cloud-engineering",
      title: "Cloud Engineering & DevOps Modernization",
      category: "Infrastructure",
      desc: "Harness the power of high-efficiency cloud environments. We architect serverless edge platforms, automated CI/CD pipelines, and multi-region Kubernetes clusters.",
      deliverables: ["Kubernetes & Container Orchestration", "Terraform & Infrastructure-as-Code", "Multi-Region Disaster Recovery", "Cloud Cost Optimization (FinOps)"],
      icon: "☁️",
    },
    {
      id: "mobile-development",
      title: "Mobile Application Engineering",
      category: "Mobile",
      desc: "Deliver fluid native and cross-platform mobile apps for iOS and Android. Designed with micro-interactions, offline resilience, and biometric authentication.",
      deliverables: ["React Native & Flutter Development", "Swift & Kotlin Native Implementations", "In-App Purchases & Payment Gateways", "App Store Optimization & Deployment"],
      icon: "📱",
    },
    {
      id: "custom-software",
      title: "Custom Web & Software Development",
      category: "Full-Stack",
      desc: "Bespoke SaaS platforms, client portals, and microservices architected from ground zero to deliver speed, security, and measurable ROI.",
      deliverables: ["Next.js & React High-Speed Frontends", "Scalable Go, Node & Python APIs", "Real-Time WebSockets & Streaming", "Legacy System Migration & Refactoring"],
      icon: "⚡",
    },
  ];

  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[#D0FF71] selection:text-black">
      <div className="fixed inset-0 bg-ziel-grid opacity-60 pointer-events-none z-0" />
      <Navbar currentPath="/Services" />

      <main className="relative z-10 pt-32 pb-20">
        <section className="max-w-6xl mx-auto px-6 mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono font-medium text-[#D0FF71] mb-6">
            Comprehensive Capabilities
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            High-Impact Software Engineering &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D0FF71] to-emerald-300">
              Cloud Solutions
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            From strategic technical consulting to end-to-end full-stack development, Zamooq delivers enterprise software that drives growth.
          </p>
        </section>

        {/* Services List */}
        <section className="max-w-6xl mx-auto px-6 space-y-8">
          {detailedServices.map((srv, i) => (
            <div
              key={srv.id}
              className="p-8 sm:p-12 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 hover:border-[#D0FF71]/50 hover:bg-zinc-900/80 transition-all duration-300 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8"
            >
              <div className="max-w-2xl space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{srv.icon}</span>
                  <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
                    0{i + 1} / {srv.category}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white">
                  {srv.title}
                </h2>
                <p className="text-zinc-400 text-base leading-relaxed">
                  {srv.desc}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
                  {srv.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D0FF71]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex-shrink-0">
                <Link href="/Contact" className="liquid-lime-btn text-sm py-3 px-6">
                  <span>Inquire for this</span>
                  <span className="arrow-icon w-6 h-6 text-xs">→</span>
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
