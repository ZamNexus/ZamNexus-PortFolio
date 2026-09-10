"use client";

import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Options & Data ──────────────────────────────────────────────────────────

const projectIntents = [
  { id: "ai", label: "AI & Copilots", icon: "🧠" },
  { id: "saas", label: "SaaS Product Engineering", icon: "⬡" },
  { id: "znxerp", label: "ZNXERP Deployment", icon: "⚙️" },
  { id: "znxepos", label: "ZNXePOS Retail Suite", icon: "🛍️" },
  { id: "znxedu", label: "ZNXEdu Campus System", icon: "🎓" },
  { id: "znxcare", label: "ZNXCare Clinical EHR", icon: "🏥" },
  { id: "microsoft", label: "Dynamics 365 & Power Platform", icon: "⊞" },
  { id: "salesforce", label: "Salesforce Cloud & Agentforce", icon: "⊙" },
  { id: "cloud", label: "Cloud-Native & Serverless", icon: "⚡" },
  { id: "automation", label: "Intelligent Process Automation", icon: "🔄" },
];

const timelineOptions = [
  "Immediate (< 1 Month)",
  "1 – 3 Months (Standard)",
  "3 – 6 Months (Enterprise)",
  "Long-Term Strategic Advisory",
];

export default function ContactPage() {
  const [selectedIntents, setSelectedIntents] = useState<string[]>(["ai"]);
  const [selectedTimeline, setSelectedTimeline] = useState<string>(timelineOptions[1]);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const toggleIntent = (id: string) => {
    if (selectedIntents.includes(id)) {
      if (selectedIntents.length > 1) {
        setSelectedIntents(selectedIntents.filter((item) => item !== id));
      }
    } else {
      setSelectedIntents([...selectedIntents, id]);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("contact@zamooq.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div
      suppressHydrationWarning
      className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[var(--accent-hover)] selection:text-black overflow-x-hidden"
    >
      {/* Background Cyber Grid */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.035]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contact-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)" />
        </svg>

        {/* Ambient Halo Glows */}
        <div className="absolute top-[18%] left-[10%] w-[650px] h-[650px] rounded-full bg-blue-600/[0.05] blur-[180px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[8%] w-[650px] h-[650px] rounded-full bg-emerald-600/[0.04] blur-[180px] pointer-events-none" />
      </div>

      <Navbar />

      <main className="relative z-10">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="contact-hero-heading"
          className="max-w-7xl mx-auto px-6 pt-40 pb-16 text-center flex flex-col items-center"
        >
          {/* Top Category Badge */}
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono font-medium text-[var(--accent-hover)] mb-8 backdrop-blur-xl shadow-lg"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Direct Channel · Guaranteed 1 Business Day Response
          </motion.div>

          {/* Heading */}
          <motion.h1
            id="contact-hero-heading"
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]"
          >
            Start a conversation with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-400 via-violet-400 to-emerald-400">
              our senior architects.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-base sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
          >
            Tell us about your operational challenge, product ambition, or platform modernization goals.
            Every inquiry is evaluated directly by a Principal Architect under strict NDA confidentiality.
          </motion.p>
        </section>

        {/* ── INTERACTIVE BRIEF BUILDER + DIRECT CHANNELS ──────────────────── */}
        <section
          aria-labelledby="brief-builder-heading"
          className="max-w-7xl mx-auto px-6 pb-28 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        >
          <h2 id="brief-builder-heading" className="sr-only">Interactive Project Brief Builder</h2>

          {/* Left Column: Direct VIP Communication Channels & SLA Guarantee */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            {/* Direct Channel Card */}
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-md shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-hover)] to-transparent" />

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold block mb-1">
                  Direct Line
                </span>
                <h3 className="text-xl font-bold text-white">Executive Channels</h3>
              </div>

              {/* Email with copy button */}
              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
                  <span>Official Email</span>
                  <span className="text-emerald-400 font-bold">Monitored 24/7</span>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <a
                    href="mailto:contact@zamooq.com"
                    className="font-mono text-sm font-bold text-white hover:text-[var(--accent-hover)] transition-colors truncate"
                  >
                    contact@zamooq.com
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer flex-shrink-0"
                  >
                    {copiedEmail ? "✓ Copied" : "Copy"}
                  </button>
                </div>
              </div>

              {/* WhatsApp VIP Channel */}
              <a
                href="https://wa.me/447456234972"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/50 hover:bg-emerald-950/50 transition-all cursor-pointer shadow-md"
              >
                <div className="flex items-center gap-3">
                  <span className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse" />
                  <div>
                    <div className="text-xs font-mono text-emerald-400 font-bold">WhatsApp Direct Advisory</div>
                    <div className="text-xs text-zinc-300 font-medium">+44 7456 234972</div>
                  </div>
                </div>
                <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
              </a>

              {/* Guaranteed Response SLA */}
              <div className="pt-4 border-t border-zinc-800/60 space-y-3">
                <div className="flex items-start gap-3 text-xs text-zinc-300">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <div className="font-semibold text-white">1 Business Day Response SLA</div>
                    <div className="text-zinc-500 text-[11px] font-mono">Guaranteed review by Principal Architects</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs text-zinc-300">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <div className="font-semibold text-white">Confidential by Default</div>
                    <div className="text-zinc-500 text-[11px] font-mono">Mutual non-disclosure terms pre-applied</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-xs text-zinc-300">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <div>
                    <div className="font-semibold text-white">Direct Architect Pairing</div>
                    <div className="text-zinc-500 text-[11px] font-mono">Zero junior sales gatekeepers</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Portfolio Links */}
            <div className="p-6 rounded-3xl bg-zinc-900/30 border border-zinc-800/60 text-xs font-mono">
              <span className="text-zinc-500 uppercase tracking-wider block mb-3 font-bold">
                Explore Technology Hubs:
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Products Deck", href: "/Products" },
                  { label: "Solutions", href: "/Solutions" },
                  { label: "Platforms", href: "/Platforms" },
                  { label: "Industries", href: "/Industries" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="px-3 py-1.5 rounded-xl bg-zinc-950/60 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600 transition-colors"
                  >
                    {item.label} →
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Brief Builder Form */}
          <div className="lg:col-span-8">
            <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 backdrop-blur-md shadow-2xl relative overflow-hidden">
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.form
                    key="contact-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8"
                  >
                    {/* Step 1: Interactive Intent Selector */}
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold block mb-3 flex items-center justify-between">
                        <span>1. What technology domain can we accelerate?</span>
                        <span className="text-zinc-600 font-normal">Select all that apply</span>
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {projectIntents.map((intent) => {
                          const isSelected = selectedIntents.includes(intent.id);
                          return (
                            <button
                              type="button"
                              key={intent.id}
                              onClick={() => toggleIntent(intent.id)}
                              className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer flex items-center gap-2.5 ${
                                isSelected
                                  ? "bg-zinc-800 text-white border-[var(--accent-hover)] shadow-md"
                                  : "bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                              }`}
                            >
                              <span className="text-base">{intent.icon}</span>
                              <span className="text-xs font-mono font-medium truncate">{intent.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 2: Timeline Expectation */}
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold block mb-3">
                        2. Target Delivery Timeline
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {timelineOptions.map((timeline) => {
                          const isSelected = selectedTimeline === timeline;
                          return (
                            <button
                              type="button"
                              key={timeline}
                              onClick={() => setSelectedTimeline(timeline)}
                              className={`p-3 rounded-xl border text-xs font-mono text-center transition-all duration-200 cursor-pointer ${
                                isSelected
                                  ? "bg-zinc-800 text-white border-cyan-500 shadow-md"
                                  : "bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                              }`}
                            >
                              {timeline}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 3: Contact & Company Details */}
                    <div>
                      <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold block mb-4">
                        3. Your Executive Contact Details
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <span className="text-xs font-mono text-zinc-500 mb-1 block">Full Name *</span>
                          <input
                            type="text"
                            required
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. Marcus Vance"
                            className="w-full px-4 py-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[var(--accent-hover)] transition-colors"
                          />
                        </div>

                        <div>
                          <span className="text-xs font-mono text-zinc-500 mb-1 block">Work Email *</span>
                          <input
                            type="email"
                            required
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="marcus@enterprise.com"
                            className="w-full px-4 py-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[var(--accent-hover)] transition-colors"
                          />
                        </div>

                        <div>
                          <span className="text-xs font-mono text-zinc-500 mb-1 block">Organization / Company</span>
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="e.g. Apex Global Logistics"
                            className="w-full px-4 py-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[var(--accent-hover)] transition-colors"
                          />
                        </div>

                        <div>
                          <span className="text-xs font-mono text-zinc-500 mb-1 block">Phone / WhatsApp (Optional)</span>
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+44 20 7946 0991"
                            className="w-full px-4 py-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[var(--accent-hover)] transition-colors"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Step 4: Project Scope & Architecture Goals */}
                    <div>
                      <span className="text-xs font-mono text-zinc-500 mb-1 block">
                        Brief Project Overview or Technical Challenge *
                      </span>
                      <textarea
                        required
                        rows={4}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Describe your current software landscape, objectives, or specific integrations required..."
                        className="w-full px-4 py-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-[var(--accent-hover)] transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                      <div className="text-[11px] font-mono text-zinc-500">
                        🔒 Encrypted &amp; confidential under non-disclosure terms.
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="liquid-lime-btn text-sm py-3.5 px-8 cursor-pointer"
                      >
                        <span>Transmit Project Brief</span>
                        <span className="arrow-icon w-7 h-7 text-xs" aria-hidden="true">→</span>
                      </motion.button>
                    </div>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="py-16 text-center space-y-6"
                  >
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/60 text-emerald-400 text-3xl mx-auto flex items-center justify-center">
                      ✓
                    </div>
                    <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-widest">
                      Transmission Confirmed · SLA Active
                    </div>
                    <h3 className="text-3xl font-extrabold text-white tracking-tight">
                      Thank you, {formData.name || "partner"}.
                    </h3>
                    <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                      Your project brief has been routed directly to our Principal Architecture team.
                      We will review your technical requirements and reply to{" "}
                      <span className="text-white font-mono font-semibold">{formData.email}</span> within 1 business day.
                    </p>
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: "", email: "", company: "", phone: "", message: "" });
                        }}
                        className="px-6 py-2.5 rounded-full border border-zinc-700 bg-zinc-800/80 text-zinc-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                      >
                        Submit Another Brief →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
