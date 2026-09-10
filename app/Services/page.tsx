"use client";

import { useState, useRef, useEffect, type CSSProperties, type MouseEvent } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useInView,
  useMotionValue,
} from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Register GSAP plugins — safe to call at module scope in "use client" files
gsap.registerPlugin(ScrollTrigger);

// ─── Types ───────────────────────────────────────────────────────────────────

interface ServiceBlock {
  id: string;
  index: string;
  tag: string;
  title: string;
  description: string;
  capabilities: string[];
  accent: string;
  icon: string;
}

interface ProcessStep {
  number: string;
  label: string;
  description: string;
}

interface WhyDifferentiator {
  title: string;
  description: string;
  accent: string;
  iconPath: string;
}

// ─── Static Data ─────────────────────────────────────────────────────────────

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
    accent: "#8B5CF6",
    icon: "◈",
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
    accent: "#F59E0B",
    icon: "⬡",
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
    accent: "#14B8A6",
    icon: "⬢",
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
    accent: "#F43F5E",
    icon: "⟐",
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
    accent: "#0EA5E9",
    icon: "⊞",
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
    accent: "#10B981",
    icon: "⊙",
  },
];

const processSteps: ProcessStep[] = [
  { number: "01", label: "Discover", description: "We understand your business, challenges, technology landscape and opportunities through structured workshops and analysis." },
  { number: "02", label: "Define", description: "We define the right strategy, architecture and approach — aligning technology decisions with business goals." },
  { number: "03", label: "Design", description: "We architect secure, scalable solutions designed to connect systems, automate processes and enable intelligence." },
  { number: "04", label: "Build", description: "We develop, configure and test using agile delivery — keeping quality high and cycles short." },
  { number: "05", label: "Connect", description: "We integrate your applications, APIs, data and workflows into a connected technology ecosystem." },
  { number: "06", label: "Evolve", description: "We continuously improve and evolve your technology as your organisation and market change." },
];

const whyPoints: WhyDifferentiator[] = [
  { title: "Business-Focused", description: "We start with your business challenges, opportunities and goals — not just the technology.", accent: "#F59E0B", iconPath: "M3 7h18v13H3V7Z M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2 M3 12h18" },
  { title: "Intelligence-Driven", description: "We help you use AI, automation and real-time data to make smarter decisions and act faster.", accent: "#8B5CF6", iconPath: "M13 2 4 14h6l-1 8 9-12h-6l1-8Z" },
  { title: "Enterprise Experience", description: "Proven delivery of complex enterprise applications, integrations and technology programmes.", accent: "#2563EB", iconPath: "M4 3h16v18H4V3Z M9 21v-4h6v4 M9 8h1.5 M13.5 8H15 M9 12h1.5 M13.5 12H15" },
  { title: "Cloud-Native Thinking", description: "Systems designed to be secure, resilient, scalable and ready to evolve.", accent: "#14B8A6", iconPath: "M6 18h11a4 4 0 0 0 .5-7.97A6 6 0 0 0 5.5 11 4 4 0 0 0 6 18Z" },
  { title: "Secure & Responsible by Design", description: "Security, governance and responsible AI built in from the start, not bolted on afterwards.", accent: "#F43F5E", iconPath: "M12 3 4 6v6c0 5 3.5 8.5 8 9 4.5-.5 8-4 8-9V6l-8-3Z M9 12l2 2 4-4" },
  { title: "Built to Scale", description: "Solutions designed to grow with your organisation and adapt to changing business needs.", accent: "#10B981", iconPath: "M3 17l6-6 4 4 8-8 M17 7h4v4" },
];

// ─── Animated Grid Background (unique to Services) ──────────────────────────

function AnimatedGridBG() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Diagonal grid lines — different from home page's square grid */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="svc-diag" width="80" height="80" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
            <line x1="0" y1="0" x2="0" y2="80" stroke="white" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#svc-diag)" />
      </svg>
      {/* Floating gradient blobs — positioned differently than home */}
      <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full bg-violet-600/[0.04] blur-[120px] animate-[svc-blob1_20s_ease-in-out_infinite_alternate]" />
      <div className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] rounded-full bg-sky-600/[0.04] blur-[140px] animate-[svc-blob2_25s_ease-in-out_infinite_alternate]" />
    </div>
  );
}

// ─── Horizontal Scroll Process (unique interaction — GSAP pinned) ────────────

function HorizontalProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!containerRef.current || !trackRef.current) return;
    const track = trackRef.current;
    const totalScroll = track.scrollWidth - window.innerWidth;

    gsap.to(track, {
      x: -totalScroll,
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: () => `+=${totalScroll}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // Animate each card as it enters viewport
    const cards = track.querySelectorAll(".h-process-card");
    cards.forEach((card) => {
      gsap.fromTo(
        card,
        { opacity: 0.3, scale: 0.88, rotateY: 8 },
        {
          opacity: 1,
          scale: 1,
          rotateY: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: gsap.getById?.("hscroll") || undefined,
            start: "left 80%",
            end: "left 40%",
            scrub: 1,
          },
        }
      );
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Fixed heading that stays during pin */}
      <div className="absolute top-0 left-0 right-0 z-20 px-8 sm:px-16 pt-12 pb-6 bg-gradient-to-b from-[#090b10] via-[#090b10]/90 to-transparent pointer-events-none">
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
          How We Deliver
        </span>
        <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3">
          From Discovery to Evolution
        </h2>
      </div>

      <div
        ref={trackRef}
        className="flex items-center gap-8 px-8 sm:px-16 pt-36 pb-20 min-h-screen"
        style={{ width: `${processSteps.length * 420 + 200}px` }}
      >
        {processSteps.map((step, i) => (
          <div
            key={step.number}
            className="h-process-card flex-shrink-0 w-[360px] sm:w-[400px] p-8 rounded-[28px] border border-zinc-800/50 bg-zinc-900/50 backdrop-blur-md relative overflow-hidden group"
            style={{ perspective: "800px" }}
          >
            {/* Colored top accent — unique per step */}
            <div
              className="absolute top-0 left-0 right-0 h-[3px]"
              style={{
                background: `linear-gradient(90deg, transparent, ${
                  ["#8B5CF6", "#F59E0B", "#14B8A6", "#F43F5E", "#0EA5E9", "#10B981"][i]
                }, transparent)`,
              }}
            />

            {/* Large ghost number */}
            <span className="absolute -top-4 -right-2 text-[120px] font-black font-mono text-white/[0.03] select-none leading-none pointer-events-none">
              {step.number}
            </span>

            <div className="relative z-10">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-bold font-mono mb-6 border"
                style={{
                  background: `color-mix(in srgb, ${["#8B5CF6", "#F59E0B", "#14B8A6", "#F43F5E", "#0EA5E9", "#10B981"][i]} 12%, transparent)`,
                  borderColor: `color-mix(in srgb, ${["#8B5CF6", "#F59E0B", "#14B8A6", "#F43F5E", "#0EA5E9", "#10B981"][i]} 35%, transparent)`,
                  color: ["#8B5CF6", "#F59E0B", "#14B8A6", "#F43F5E", "#0EA5E9", "#10B981"][i],
                }}
              >
                {step.number}
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">{step.label}</h3>
              <p className="text-sm text-zinc-400 leading-relaxed">{step.description}</p>
            </div>

            {/* Bottom connector dot */}
            {i < processSteps.length - 1 && (
              <div className="absolute right-0 top-1/2 translate-x-[calc(100%+12px)] -translate-y-1/2 flex items-center gap-1">
                <div className="w-6 h-px bg-zinc-700" />
                <div className="w-2 h-2 rounded-full bg-zinc-700" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Sticky Service Navigator (unique layout — different from home page) ────

function ServiceScene({
  service,
  isActive,
}: {
  service: ServiceBlock;
  isActive: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={ref}
      id={`service-scene-${service.id}`}
      className="min-h-[80vh] flex items-center py-20 relative"
      initial={{ opacity: 0.3 }}
      animate={{
        opacity: isActive ? 1 : 0.4,
        scale: isActive ? 1 : 0.97,
      }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Full-width ambient glow — unique color per service, stronger when active */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: isActive ? 1 : 0.2,
        }}
        transition={{ duration: 0.6 }}
        style={{
          background: `radial-gradient(ellipse 60% 50% at 80% 50%, color-mix(in srgb, ${service.accent} ${isActive ? '10%' : '3%'}, transparent) 0%, transparent 70%)`,
        }}
      />
      {/* Active side accent bar */}
      <motion.div
        className="absolute left-0 top-[10%] bottom-[10%] w-[3px] rounded-full"
        style={{ background: service.accent }}
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{
          scaleY: isActive ? 1 : 0,
          opacity: isActive ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start w-full">
        {/* Left — service info */}
        <div className="lg:col-span-7">
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="text-4xl font-mono"
              style={{ color: service.accent }}
            >
              {service.icon}
            </span>
            <div>
              <span
                className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold block"
                style={{ color: service.accent }}
              >
                {service.tag}
              </span>
              <span className="text-xs font-mono text-zinc-600">{service.index} / 06</span>
            </div>
          </motion.div>

          <motion.h3
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-[1.1] mb-6"
            initial={{ y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            {service.title}
          </motion.h3>

          <motion.p
            className="text-lg text-zinc-400 leading-relaxed max-w-xl mb-10"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {service.description}
          </motion.p>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <Link
              href="/Contact"
              className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full font-semibold text-sm text-white transition-all duration-300 hover:gap-4 hover:shadow-lg"
              style={{
                background: service.accent,
                boxShadow: `0 0 30px color-mix(in srgb, ${service.accent} 30%, transparent)`,
              }}
            >
              Discuss {service.title}
              <span aria-hidden="true">→</span>
            </Link>
          </motion.div>
        </div>

        {/* Right — capabilities as staggered floating chips */}
        <div className="lg:col-span-5">
          <motion.div
            className="space-y-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, margin: "-80px" }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.06, delayChildren: 0.3 } },
            }}
          >
            <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-4 pl-1">
              {service.capabilities.length} Capabilities
            </div>
            {service.capabilities.map((cap, i) => (
              <motion.div
                key={cap}
                className="flex items-center gap-3 px-5 py-3.5 rounded-2xl border border-zinc-800/50 bg-zinc-900/40 backdrop-blur-sm text-sm text-zinc-300 hover:text-white hover:border-opacity-100 transition-all duration-300 cursor-default group"
                style={{
                  ["--cap-accent" as string]: service.accent,
                }}
                variants={{
                  hidden: { opacity: 0, x: 40, scale: 0.9 },
                  visible: {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    transition: { type: "spring", stiffness: 200, damping: 22 },
                  },
                }}
                whileHover={{
                  x: 6,
                  borderColor: service.accent,
                  transition: { duration: 0.2 },
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-transform duration-300 group-hover:scale-150"
                  style={{ background: service.accent }}
                />
                {cap}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Scroll Progress Bar ─────────────────────────────────────────────────────

function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 80, damping: 30 });

  return (
    <motion.div
      className="scroll-progress-bar"
      style={{ scaleX, width: "100%" }}
    />
  );
}

// ─── Why Card with Parallax Icon ─────────────────────────────────────────────

function WhyCard({ point, index }: { point: WhyDifferentiator; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0, y: 50, rotateX: -8 }}
      animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
      transition={{
        delay: index * 0.1,
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ perspective: "1000px" }}
    >
      <div className="relative p-8 rounded-[28px] border border-zinc-800/40 bg-zinc-900/30 backdrop-blur-lg overflow-hidden transition-all duration-500 hover:border-opacity-100 h-full group-hover:-translate-y-2"
        style={{
          ["--why-accent" as string]: point.accent,
        }}
      >
        {/* Corner accent glow */}
        <div
          className="absolute -top-16 -right-16 w-40 h-40 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: point.accent }}
        />

        {/* Left accent bar */}
        <div
          className="absolute left-0 top-6 bottom-6 w-[3px] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 origin-top scale-y-0 group-hover:scale-y-100"
          style={{ background: point.accent }}
        />

        <div className="relative z-10">
          <motion.div
            className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border"
            style={{
              background: `color-mix(in srgb, ${point.accent} 10%, transparent)`,
              borderColor: `color-mix(in srgb, ${point.accent} 25%, transparent)`,
              color: point.accent,
            }}
            whileHover={{ rotate: -12, scale: 1.15 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
              <path d={point.iconPath} />
            </svg>
          </motion.div>

          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-white/90 transition-colors">
            {point.title}
          </h3>
          <p className="text-sm text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
            {point.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Animated Counter ────────────────────────────────────────────────────────

function AnimatedCounter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const startTime = performance.now();
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

// ─── Main Page Component ─────────────────────────────────────────────────────

export default function ServicesPage() {
  const [activeServiceIdx, setActiveServiceIdx] = useState(0);
  const servicesContainerRef = useRef<HTMLDivElement>(null);

  // Track which service scene is currently in the viewport
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    services.forEach((srv, i) => {
      const el = document.getElementById(`service-scene-${srv.id}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveServiceIdx(i);
        },
        { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <div suppressHydrationWarning className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[var(--accent-hover)] selection:text-black overflow-x-hidden">
      {/* Unique diagonal grid background */}
      <AnimatedGridBG />

      {/* Scroll progress */}
      <ScrollProgressBar />

      <Navbar />

      <main className="relative z-10">

        {/* ══════════════════════════════════════════════════════════════════
            HERO — Split layout with large typography (no particles/orbs)
           ══════════════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="services-hero-heading"
          className="relative min-h-[90vh] flex items-center overflow-hidden"
        >
          {/* Animated geometric lines — unique to Services */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-px bg-gradient-to-r from-transparent via-zinc-700/30 to-transparent"
                style={{
                  top: `${20 + i * 16}%`,
                  left: "-10%",
                  right: "-10%",
                  transformOrigin: "center",
                }}
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{
                  delay: 0.5 + i * 0.15,
                  duration: 1.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            ))}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`v-${i}`}
                className="absolute w-px bg-gradient-to-b from-transparent via-zinc-700/20 to-transparent"
                style={{
                  left: `${25 + i * 25}%`,
                  top: "-10%",
                  bottom: "-10%",
                }}
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                transition={{
                  delay: 0.8 + i * 0.2,
                  duration: 1.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            ))}
          </div>

          <div className="max-w-7xl mx-auto px-6 sm:px-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-32 pb-20">
            {/* Left — text content */}
            <div>
              <motion.div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-800/60 bg-zinc-900/50 backdrop-blur-md text-xs font-mono mb-8"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-zinc-400">6 Services · Full Lifecycle</span>
              </motion.div>

              <motion.h1
                id="services-hero-heading"
                className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] mb-8"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              >
                Technology
                <br />
                expertise to
                <br />
                build{" "}
                <span className="shimmer-text">
                  what&apos;s next.
                </span>
              </motion.h1>

              <motion.p
                className="text-lg text-zinc-400 leading-relaxed max-w-lg mb-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35 }}
              >
                Deep capability across AI, cloud, SaaS and automation —
                designed around your business objectives, not a technology brief.
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <Link href="/Contact" className="liquid-lime-btn text-base py-4 px-8">
                  <span>Talk to Us</span>
                  <span className="arrow-icon w-8 h-8 text-sm" aria-hidden="true">→</span>
                </Link>
                <Link
                  href="#services-section"
                  className="px-7 py-4 rounded-full bg-transparent border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold text-sm transition-all duration-300 inline-flex items-center gap-2"
                >
                  Explore Services
                  <motion.span
                    animate={{ y: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  >
                    ↓
                  </motion.span>
                </Link>
              </motion.div>
            </div>

            {/* Right — floating service grid preview */}
            <motion.div
              className="relative hidden lg:block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="grid grid-cols-2 gap-4">
                {services.map((srv, i) => (
                  <motion.div
                    key={srv.id}
                    className="p-5 rounded-2xl border border-zinc-800/40 bg-zinc-900/30 backdrop-blur-sm group cursor-default hover:border-opacity-100 transition-all duration-400"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.6 + i * 0.1,
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    whileHover={{
                      scale: 1.03,
                      borderColor: srv.accent,
                      transition: { duration: 0.2 },
                    }}
                    style={{ ["--card-accent" as string]: srv.accent }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xl" style={{ color: srv.accent }}>{srv.icon}</span>
                      <span className="text-xs font-mono text-zinc-600">{srv.index}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-zinc-300 group-hover:text-white transition-colors leading-tight">
                      {srv.title}
                    </h3>
                    <div className="mt-2 text-[10px] font-mono text-zinc-600">
                      {srv.capabilities.length} capabilities
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Floating stat overlay — positioned below the grid, centered */}
              <motion.div
                className="mt-6 mx-auto flex items-center gap-4 px-6 py-3.5 rounded-2xl border border-zinc-800/60 bg-zinc-900/80 backdrop-blur-xl shadow-2xl shadow-black/50 w-fit"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
              >
                <div className="text-2xl font-extrabold text-white font-mono">
                  <AnimatedCounter value={48} suffix="+" />
                </div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 leading-tight">
                  Total<br />Capabilities
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            SERVICES — Scrollable scenes with sticky sidebar nav
           ══════════════════════════════════════════════════════════════════ */}
        <section
          id="services-section"
          aria-labelledby="core-services-heading"
          className="relative border-t border-zinc-800/60"
        >
          <div className="max-w-7xl mx-auto px-6 sm:px-10">
            {/* Section header */}
            <motion.div
              className="pt-20 pb-10"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 id="core-services-heading" className="sr-only">
                Core Technology Services
              </h2>
              <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
                What We Do
              </span>
              <p className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3">
                Six Ways We Create Value
              </p>
              <p className="mt-4 text-zinc-400 max-w-2xl text-base leading-relaxed">
                Scroll through each service to explore its full capabilities — from AI strategy to enterprise CRM.
              </p>
            </motion.div>

            <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0" ref={servicesContainerRef}>
              {/* Sticky sidebar navigation — desktop only */}
              <div className="hidden lg:block lg:col-span-3">
                <div className="sticky top-32 space-y-1 pr-6 border-r border-zinc-800/40">
                  {services.map((srv, i) => (
                    <button
                      key={srv.id}
                      onClick={() => {
                        document
                          .getElementById(`service-scene-${srv.id}`)
                          ?.scrollIntoView({ behavior: "smooth", block: "center" });
                      }}
                      className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 group relative ${
                        activeServiceIdx === i
                          ? "bg-zinc-900/60"
                          : "hover:bg-zinc-900/30"
                      }`}
                    >
                      {/* Active indicator */}
                      <motion.div
                        className="absolute left-0 top-2 bottom-2 w-[3px] rounded-full"
                        style={{ background: srv.accent }}
                        initial={false}
                        animate={{
                          scaleY: activeServiceIdx === i ? 1 : 0,
                          opacity: activeServiceIdx === i ? 1 : 0,
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                      <div className="flex items-center gap-3">
                        <span
                          className="text-base font-mono transition-colors duration-300"
                          style={{ color: activeServiceIdx === i ? srv.accent : "#52525b" }}
                        >
                          {srv.icon}
                        </span>
                        <div>
                          <div className={`text-xs font-mono transition-colors duration-300 ${
                            activeServiceIdx === i ? "text-zinc-400" : "text-zinc-600"
                          }`}>
                            {srv.index}
                          </div>
                          <div className={`text-sm font-semibold leading-tight transition-colors duration-300 ${
                            activeServiceIdx === i ? "text-white" : "text-zinc-500"
                          }`}>
                            {srv.title}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Scrollable service scenes */}
              <div className="lg:col-span-9 lg:pl-10">
                {services.map((srv, i) => (
                  <ServiceScene
                    key={srv.id}
                    service={srv}
                    isActive={activeServiceIdx === i}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            PROCESS — GSAP Horizontal Scroll (pinned, unique to Services)
           ══════════════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="process-heading"
          className="border-t border-zinc-800/60"
        >
          <h2 id="process-heading" className="sr-only">
            Our Delivery Process
          </h2>
          <HorizontalProcess />
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            WHY ZAMNEXUS — Offset bento grid (different layout from home)
           ══════════════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="why-services-heading"
          className="max-w-7xl mx-auto px-6 sm:px-10 py-24 border-t border-zinc-800/60"
        >
          <motion.div
            className="mb-14 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
              Why ZamNexus
            </span>
            <h2
              id="why-services-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-3"
            >
              What Sets Us Apart
            </h2>
            <p className="mt-3 text-zinc-400 text-base leading-relaxed">
              The judgement of a senior team, applied to every engagement we take on.
            </p>
          </motion.div>

          {/* Offset grid — top row 2 cols, bottom row 3+1 — different from home's uniform 3-col */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* First two cards span wider on lg */}
            {whyPoints.slice(0, 2).map((point, i) => (
              <div key={point.title} className={i === 0 ? "lg:col-span-2" : ""}>
                <WhyCard point={point} index={i} />
              </div>
            ))}
            {whyPoints.slice(2).map((point, i) => (
              <WhyCard key={point.title} point={point} index={i + 2} />
            ))}
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            CTA — Full-width gradient band (different from home's card CTA)
           ══════════════════════════════════════════════════════════════════ */}
        <section
          aria-labelledby="services-cta-heading"
          className="relative overflow-hidden border-t border-zinc-800/60"
        >
          {/* Full-width gradient wash */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent)]/[0.03] to-transparent pointer-events-none" />

          <motion.div
            className="max-w-4xl mx-auto px-6 sm:px-10 py-24 text-center relative z-10"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="text-6xl sm:text-7xl font-extrabold text-white/[0.04] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap pointer-events-none select-none"
              animate={{ x: ["-50%", "-52%", "-50%"] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            >
              BUILD · CONNECT · AUTOMATE · EVOLVE
            </motion.div>

            <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
              Ready to Get Started?
            </span>
            <h2
              id="services-cta-heading"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mt-4 mb-6"
            >
              Let&apos;s build what&apos;s next.
            </h2>
            <p className="text-zinc-400 text-base leading-relaxed max-w-xl mx-auto mb-10">
              Tell us about your challenge, your idea or your ambition — we&apos;ll
              help you define the right approach.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-5">
              <Link href="/Contact" className="liquid-lime-btn text-base py-4 px-8">
                <span>Start a Conversation</span>
                <span className="arrow-icon w-8 h-8 text-sm" aria-hidden="true">→</span>
              </Link>
              <Link
                href="/Solutions"
                className="px-7 py-4 rounded-full bg-transparent border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-semibold text-sm transition-all duration-300"
              >
                Explore Solutions →
              </Link>
            </div>
          </motion.div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
