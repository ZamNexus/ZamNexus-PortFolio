"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");

  const videoReels = [
    {
      src: "https://zielglobal.com/wp-content/uploads/2024/10/18069164-hd_720_1280_24fps.mp4",
      tag: "Autonomous AI",
      title: "Neural Engine 2.0",
    },
    {
      src: "https://zielglobal.com/wp-content/uploads/2024/10/18069236-hd_720_1280_24fps.mp4",
      tag: "Cloud Scale",
      title: "Global Edge Mesh",
    },
    {
      src: "https://zielglobal.com/wp-content/uploads/2024/12/6917323_Motion-Graphics_Motion-Graphic_720x1280.mp4",
      tag: "Motion Graphics",
      title: "FinTech Settlement",
    },
    {
      src: "https://zielglobal.com/wp-content/uploads/2024/10/18069233-hd_720_1280_24fps.mp4",
      tag: "Zero-Trust",
      title: "Security Shield",
    },
    {
      src: "https://zielglobal.com/wp-content/uploads/2025/01/11922068_720_1280_30fps.mp4",
      tag: "Mobile UX",
      title: "Real-Time Telemetry",
    },
  ];

  const clientLogos = [
    { name: "Zown", src: "https://zielglobal.com/wp-content/uploads/2024/12/ZownDarkBlueLogo-D9IsBafu@2x.webp" },
    { name: "Reliance", src: "https://zielglobal.com/wp-content/uploads/2024/12/Logo@2x.webp" },
    { name: "Visionnect", src: "https://zielglobal.com/wp-content/uploads/2024/12/Logo-White-01@2x.webp" },
    { name: "Marina Park", src: "https://zielglobal.com/wp-content/uploads/2024/12/Group-1@2x.webp" },
    { name: "TechnoQ", src: "https://zielglobal.com/wp-content/uploads/2024/12/Group-18106@2x.webp" },
    { name: "Jascon", src: "https://zielglobal.com/wp-content/uploads/2024/12/jascon-logo13-2@2x.webp" },
    { name: "Naviti", src: "https://zielglobal.com/wp-content/uploads/2024/12/NMgmtLogo_Smoothed-1@2x.webp" },
  ];

  const creativeProjects = [
    {
      id: 1,
      category: "ai",
      categoryName: "Artificial Intelligence",
      client: "Zown Logistics",
      title: "AI-Powered Fleet Dispatch & Transit Routing Engine",
      stats: "42% Faster Dispatch",
      desc: "Architected a predictive machine learning pipeline that recalculates real-time freight distribution corridors dynamically across 32 regional transit hubs.",
      stack: ["Next.js", "Python", "Kafka", "Kubernetes"],
      video: "https://zielglobal.com/wp-content/uploads/2024/10/18069164-hd_720_1280_24fps.mp4",
    },
    {
      id: 2,
      category: "fintech",
      categoryName: "FinTech Platform",
      client: "Visionnect",
      title: "Microsecond Cross-Border Liquidity & Settlement Gateway",
      stats: "$1.4B+ Monthly Volume",
      desc: "Built a fault-tolerant multi-currency ledger processing high-frequency institutional transactions with zero packet loss and instant fraud heuristics.",
      stack: ["Go", "Redis Cluster", "Zero-Trust TLS", "Docker"],
      video: "https://zielglobal.com/wp-content/uploads/2024/12/6917323_Motion-Graphics_Motion-Graphic_720x1280.mp4",
    },
    {
      id: 3,
      category: "cloud",
      categoryName: "Cloud & DevOps",
      client: "Reliance Housing Trust",
      title: "Tenant Operations Platform with Automated Government Grants",
      stats: "120k+ Active Users",
      desc: "Scalable cloud-native resident portal managing rental assignments, maintenance tracking, and direct government subsidy payment disbursements.",
      stack: ["React", "AWS Fargate", "PostgreSQL", "Node.js"],
      video: "https://zielglobal.com/wp-content/uploads/2024/10/18069236-hd_720_1280_24fps.mp4",
    },
  ];

  const filteredProjects =
    activeFilter === "all"
      ? creativeProjects
      : creativeProjects.filter((p) => p.category === activeFilter);

  const services = [
    {
      title: "Staff Augmentation",
      desc: "We provide highly skilled, on-demand technical talent and dedicated engineering squads to accelerate your delivery.",
      icon: "👥",
      tag: "TALENT SCALING",
    },
    {
      title: "Artificial Intelligence",
      desc: "Harness LLMs, autonomous reasoning agents, and predictive machine learning models to extract exponential business value.",
      icon: "🧠",
      tag: "AI & ML",
    },
    {
      title: "Cyber Security",
      desc: "Cutting-edge defense protocols, zero-trust infrastructure, penetration auditing, and real-time vulnerability mitigation.",
      icon: "🛡️",
      tag: "DEFENSE",
    },
    {
      title: "Cloud Engineering",
      desc: "Empowering businesses to harness elastic multi-cloud architectures, Kubernetes orchestrations, and sub-10ms edge compute.",
      icon: "☁️",
      tag: "CLOUD & DEVOPS",
    },
    {
      title: "Mobile App Development",
      desc: "Bespoke iOS and Android mobile experiences engineered for maximum user retention, performance, and seamless offline sync.",
      icon: "📱",
      tag: "MOBILE",
    },
    {
      title: "Custom Software Development",
      desc: "Enterprise-grade web applications, resilient backend microservices, and bespoke SaaS platforms designed for limitless scale.",
      icon: "⚡",
      tag: "FULL-STACK",
    },
  ];

  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[#D0FF71] selection:text-black overflow-x-hidden">
      {/* Background Matrix Grid */}
      <div className="fixed inset-0 bg-ziel-grid opacity-60 pointer-events-none z-0" />

      {/* Floating Capsule Header */}
      <Navbar currentPath="/" />

      <main className="relative z-10 pt-28">
        {/* HERO SECTION */}
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono font-medium text-zinc-300 mb-8 backdrop-blur-xl">
            <span className="w-2 h-2 rounded-full bg-[#D0FF71] animate-pulse" />
            Software and Consulting That Drives Impact
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight max-w-4xl text-balance leading-[1.08] text-white">
            Your Trusted Partner for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D0FF71] to-emerald-300">
              Digital Transformation
            </span>
          </h1>

          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl leading-relaxed text-balance">
            Accelerate innovation with our comprehensive software development, artificial intelligence engineering, and cloud-based solutions.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
            <Link href="/Contact" className="liquid-lime-btn text-base py-4 px-8">
              <span>Start a project</span>
              <span className="arrow-icon w-8 h-8 text-sm">→</span>
            </Link>

            <Link
              href="/Work"
              className="px-7 py-4 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 border border-zinc-800 hover:border-zinc-600 font-semibold text-sm transition-all"
            >
              Explore Creative Work →
            </Link>
          </div>
        </section>

        {/* ZIEL GLOBAL VIDEO REELS ANIMATION SLIDER */}
        <section className="w-full pb-20 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#D0FF71] animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
                Live Production Showcase
              </span>
            </div>
            <span className="text-xs font-mono text-zinc-500">Autonomous Motion & UI</span>
          </div>

          {/* Moving Video Reels Track */}
          <div className="relative w-full overflow-hidden flex py-4">
            <div className="animate-reel-scroll flex gap-6 px-4">
              {[...videoReels, ...videoReels].map((reel, idx) => (
                <div
                  key={idx}
                  className="flex-shrink-0 w-64 sm:w-72 h-96 sm:h-[430px] rounded-3xl overflow-hidden relative border border-zinc-800 bg-zinc-900 group hover:border-[#D0FF71]/80 hover:scale-[1.02] transition-all duration-300 shadow-2xl"
                >
                  <video
                    src={reel.src}
                    playsInline
                    muted
                    loop
                    autoPlay
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent pointer-events-none" />
                  <div className="absolute bottom-6 left-6 right-6 pointer-events-none">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#D0FF71] font-bold px-2 py-0.5 rounded bg-black/60 backdrop-blur-md inline-block mb-1">
                      {reel.tag}
                    </span>
                    <h3 className="text-lg font-bold text-white leading-tight">
                      {reel.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CLIENT LOGO INFINITE MARQUEE TICKER */}
        <section className="w-full border-y border-zinc-800/80 bg-zinc-950/60 py-10 overflow-hidden">
          <p className="text-center text-xs font-mono uppercase tracking-widest text-zinc-500 mb-8">
            Trusted by Industry-Leading Brands Globally
          </p>

          <div className="relative w-full overflow-hidden flex">
            <div className="animate-marquee items-center gap-16 px-8">
              {[...clientLogos, ...clientLogos].map((logo, i) => (
                <div
                  key={i}
                  className="flex items-center justify-center grayscale hover:grayscale-0 opacity-60 hover:opacity-100 transition-all duration-300 flex-shrink-0 px-4"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="h-9 sm:h-11 w-auto max-w-[140px] object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CREATIVE WORK & CASE STUDIES */}
        <section id="creative-work" className="max-w-6xl mx-auto px-6 py-24">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
                Creative Portfolio
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-2">
                Creative Work That Inspires
              </h2>
            </div>

            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2 p-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono font-medium">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeFilter === "all" ? "bg-[#D0FF71] text-black font-bold" : "text-zinc-400 hover:text-white"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter("ai")}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeFilter === "ai" ? "bg-[#D0FF71] text-black font-bold" : "text-zinc-400 hover:text-white"
                }`}
              >
                AI & Agents
              </button>
              <button
                onClick={() => setActiveFilter("fintech")}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeFilter === "fintech" ? "bg-[#D0FF71] text-black font-bold" : "text-zinc-400 hover:text-white"
                }`}
              >
                FinTech
              </button>
              <button
                onClick={() => setActiveFilter("cloud")}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeFilter === "cloud" ? "bg-[#D0FF71] text-black font-bold" : "text-zinc-400 hover:text-white"
                }`}
              >
                Cloud Platforms
              </button>
            </div>
          </div>

          {/* Project Showcase Cards */}
          <div className="space-y-12">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group p-8 sm:p-12 rounded-3xl bg-zinc-900/50 border border-zinc-800 hover:border-[#D0FF71]/70 transition-all duration-300 shadow-2xl flex flex-col lg:flex-row items-center gap-10"
              >
                {/* Video Preview */}
                <div className="w-full lg:w-5/12 h-64 sm:h-80 rounded-2xl overflow-hidden relative bg-black flex-shrink-0 border border-zinc-800">
                  <video
                    src={project.video}
                    playsInline
                    muted
                    loop
                    autoPlay
                    className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-md bg-black/70 backdrop-blur-md text-[#D0FF71] text-xs font-mono font-bold">
                    {project.client}
                  </div>
                </div>

                {/* Details */}
                <div className="w-full lg:w-7/12 space-y-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
                    {project.categoryName}
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
                    {project.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.stack.map((tech, i) => (
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
                        Verified Outcome
                      </span>
                      <span className="text-lg font-mono font-bold text-white">{project.stats}</span>
                    </div>
                    <Link href="/Contact" className="liquid-lime-btn text-xs py-2.5 px-5">
                      <span>Start Similar</span>
                      <span className="arrow-icon w-5 h-5 text-[10px]">→</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SERVICES SECTION */}
        <section id="services" className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
                Capabilities
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-2">
                What We Deliver
              </h2>
            </div>
            <Link
              href="/Services"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#D0FF71] hover:underline"
            >
              View all services in detail →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((srv, idx) => (
              <Link
                key={idx}
                href="/Services"
                className="group p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-[#D0FF71]/60 hover:bg-zinc-900/80 transition-all duration-300 hover:-translate-y-1.5 shadow-xl flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-zinc-800/60 border border-zinc-700/60 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 group-hover:bg-[#D0FF71] group-hover:text-black transition-all">
                    {srv.icon}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
                    {srv.tag}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-2 mb-3 group-hover:text-[#D0FF71] transition-colors">
                    {srv.title}
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {srv.desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs font-semibold text-zinc-300 group-hover:text-white transition-colors">
                  <span>Learn more</span>
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* OWNER & CEO SPOTLIGHT */}
        <section className="max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60">
          <div className="rounded-3xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800 p-8 sm:p-12 relative overflow-hidden">
            <div className="flex flex-col md:flex-row items-center gap-8 justify-between relative z-10">
              <div className="space-y-3 text-center md:text-left max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#D0FF71]/10 text-[#D0FF71] border border-[#D0FF71]/20 text-xs font-mono font-semibold">
                  EXECUTIVE LEADERSHIP
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white leading-relaxed">
                  &ldquo;We don&apos;t just build software — we engineer competitive advantages that drive measurable digital impact.&rdquo;
                </h3>
                <div className="pt-2">
                  <div className="text-white font-extrabold text-lg">Mir Mujeeb Ul Hassan</div>
                  <div className="text-[#D0FF71] font-mono text-sm">Owner & Chief Executive Officer (CEO), Zamooq</div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <Link
                  href="/About"
                  className="px-6 py-3.5 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-sm transition-all inline-flex items-center gap-2"
                >
                  <span>Meet Mir Mujeeb Ul Hassan & Team</span>
                  <span className="text-[#D0FF71]">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
