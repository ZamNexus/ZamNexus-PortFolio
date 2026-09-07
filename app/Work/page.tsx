"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function WorkPage() {
  const [activeTab, setActiveTab] = useState("all");

  const projects = [
    {
      id: "zown",
      category: "ai",
      categoryName: "Artificial Intelligence",
      client: "Zown Logistics",
      logo: "https://zielglobal.com/wp-content/uploads/2024/12/ZownDarkBlueLogo-D9IsBafu@2x.webp",
      video: "https://zielglobal.com/wp-content/uploads/2024/10/18069164-hd_720_1280_24fps.mp4",
      title: "AI-Powered Fleet Dispatch & Transit Routing Engine",
      stats: "42% Faster Delivery",
      description: "Architected a predictive machine learning pipeline that recalculates real-time freight distribution corridors dynamically across 32 regional transit hubs, reducing idle truck times and fuel costs.",
      stack: ["Next.js", "Python", "Kubernetes", "Kafka", "PostgreSQL"],
    },
    {
      id: "visionnect",
      category: "fintech",
      categoryName: "FinTech & Security",
      client: "Visionnect FinTech",
      logo: "https://zielglobal.com/wp-content/uploads/2024/12/Logo-White-01@2x.webp",
      video: "https://zielglobal.com/wp-content/uploads/2024/12/6917323_Motion-Graphics_Motion-Graphic_720x1280.mp4",
      title: "Microsecond Cross-Border Liquidity & Settlement Gateway",
      stats: "$1.4B+ Monthly Volume",
      description: "Built a fault-tolerant multi-currency ledger processing high-frequency institutional transactions with zero packet loss, hardware-accelerated TLS encryption, and real-time fraud heuristics.",
      stack: ["Go", "Redis Cluster", "Zero-Trust TLS", "Docker", "gRPC"],
    },
    {
      id: "reliance",
      category: "cloud",
      categoryName: "Cloud Platform",
      client: "Reliance Social Housing",
      logo: "https://zielglobal.com/wp-content/uploads/2024/12/Logo@2x.webp",
      video: "https://zielglobal.com/wp-content/uploads/2024/10/18069236-hd_720_1280_24fps.mp4",
      title: "Tenant Operations Platform with Automated Government Grants",
      stats: "120,000+ Active Users",
      description: "Engineered an accessible, high-concurrency public tenant management portal handling rental allocation, maintenance ticketing, and direct government subsidy payment disbursements.",
      stack: ["React", "TypeScript", "Node.js", "AWS Fargate", "Tailwind CSS"],
    },
    {
      id: "marina",
      category: "iot",
      categoryName: "Mobile & Smart IoT",
      client: "Marina Park Properties",
      logo: "https://zielglobal.com/wp-content/uploads/2024/12/Group-1@2x.webp",
      video: "https://zielglobal.com/wp-content/uploads/2025/01/11922068_720_1280_30fps.mp4",
      title: "Commercial Estate Automation & Smart Energy Matrix",
      stats: "35,000 Connected Devices",
      description: "Designed cross-platform iOS and Android mobile apps enabling commercial estate managers to automate HVAC, smart access gates, and renewable energy consumption.",
      stack: ["React Native", "MQTT", "GraphQL", "AWS IoT Core"],
    },
  ];

  const filtered = activeTab === "all" ? projects : projects.filter((p) => p.category === activeTab);

  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[#D0FF71] selection:text-black">
      <div className="fixed inset-0 bg-ziel-grid opacity-60 pointer-events-none z-0" />
      <Navbar currentPath="/Work" />

      <main className="relative z-10 pt-32 pb-20">
        <section className="max-w-6xl mx-auto px-6 mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono font-medium text-[#D0FF71] mb-6">
            Creative Portfolio & Case Studies
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Creative Work That Drives{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D0FF71] to-emerald-300">
              Measurable Impact
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Discover how Zamooq partners with global enterprises to innovate, solve complex engineering challenges, and scale breakthrough software.
          </p>

          {/* Interactive Filter Pills */}
          <div className="mt-10 flex flex-wrap justify-center gap-2 p-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono font-medium w-fit mx-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-5 py-2.5 rounded-full transition-all ${
                activeTab === "all" ? "bg-[#D0FF71] text-black font-bold shadow-md shadow-[#D0FF71]/20" : "text-zinc-400 hover:text-white"
              }`}
            >
              All Projects
            </button>
            <button
              onClick={() => setActiveTab("ai")}
              className={`px-5 py-2.5 rounded-full transition-all ${
                activeTab === "ai" ? "bg-[#D0FF71] text-black font-bold shadow-md shadow-[#D0FF71]/20" : "text-zinc-400 hover:text-white"
              }`}
            >
              AI & Automation
            </button>
            <button
              onClick={() => setActiveTab("fintech")}
              className={`px-5 py-2.5 rounded-full transition-all ${
                activeTab === "fintech" ? "bg-[#D0FF71] text-black font-bold shadow-md shadow-[#D0FF71]/20" : "text-zinc-400 hover:text-white"
              }`}
            >
              FinTech
            </button>
            <button
              onClick={() => setActiveTab("cloud")}
              className={`px-5 py-2.5 rounded-full transition-all ${
                activeTab === "cloud" ? "bg-[#D0FF71] text-black font-bold shadow-md shadow-[#D0FF71]/20" : "text-zinc-400 hover:text-white"
              }`}
            >
              Cloud
            </button>
            <button
              onClick={() => setActiveTab("iot")}
              className={`px-5 py-2.5 rounded-full transition-all ${
                activeTab === "iot" ? "bg-[#D0FF71] text-black font-bold shadow-md shadow-[#D0FF71]/20" : "text-zinc-400 hover:text-white"
              }`}
            >
              Mobile & IoT
            </button>
          </div>
        </section>

        {/* Case Studies Grid with Video Animation & Logos */}
        <section className="max-w-6xl mx-auto px-6 space-y-12">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className="group p-8 sm:p-12 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-[#D0FF71]/70 transition-all duration-300 shadow-2xl flex flex-col lg:flex-row items-center gap-10"
            >
              {/* Video Preview */}
              <div className="w-full lg:w-5/12 h-64 sm:h-84 rounded-2xl overflow-hidden relative bg-black flex-shrink-0 border border-zinc-800">
                <video
                  src={proj.video}
                  playsInline
                  muted
                  loop
                  autoPlay
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute top-4 left-4 p-2 rounded-lg bg-black/70 backdrop-blur-md flex items-center gap-2">
                  <img src={proj.logo} alt={proj.client} className="h-5 w-auto max-w-[90px] object-contain" />
                </div>
              </div>

              {/* Details */}
              <div className="w-full lg:w-7/12 space-y-4">
                <div className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
                  {proj.categoryName} • {proj.client}
                </div>

                <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                  {proj.title}
                </h2>

                <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                  {proj.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  {proj.stack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg bg-zinc-800 text-xs font-mono text-zinc-300 border border-zinc-700/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-6 border-t border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                      Key Milestone
                    </span>
                    <span className="text-lg font-mono font-bold text-white">{proj.stats}</span>
                  </div>
                  <Link href="/Contact" className="liquid-lime-btn text-xs py-2.5 px-5">
                    <span>Start Similar Project</span>
                    <span className="arrow-icon w-5 h-5 text-[10px]">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
}
