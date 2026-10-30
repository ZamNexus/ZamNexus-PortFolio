"use client";

import { useState, useRef } from "react";
import type { FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PillTab from "@/components/PillTab";
import { useHeroMotion } from "@/components/useHeroMotion";
import { submitLead } from "@/lib/submitLead";
import { validateLead, type FieldErrors, type LeadField } from "@/lib/validateLead";
import FieldError, { errorProps } from "@/components/FieldError";

// ─── Options & Data ──────────────────────────────────────────────────────────

const OFFICIAL_EMAIL = "contact@zamnexus.com";

const projectIntents = [
  { id: "ai-automation", label: "AI & Automation" },
  { id: "saas", label: "SaaS Product Development" },
  { id: "cloud", label: "Cloud-Native Engineering" },
  { id: "integration", label: "Integration & Modernisation" },
  { id: "microsoft", label: "Microsoft Dynamics 365" },
  { id: "salesforce", label: "Salesforce" },
  { id: "znxerp", label: "ZNXERP" },
  { id: "znxepos", label: "ZNXePOS" },
  { id: "znxedu", label: "ZNXEdu" },
  { id: "znxcare", label: "ZNXCare" },
];

const timelineOptions = [
  "Within a month",
  "1–3 months",
  "3–6 months",
  "Just exploring",
];

// ─── Visual Flag Components (Cross-Platform Consistent) ──────────────────────

function UKFlag({ className = "w-8 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={`${className} rounded-[3px] overflow-hidden shadow-sm border border-white/20 shrink-0`}
      aria-label="Flag of the United Kingdom"
      role="img"
    >
      <rect width="60" height="40" fill="#012169" />
      {/* White saltire */}
      <path d="M0 0 L60 40 M60 0 L0 40" stroke="#FFFFFF" strokeWidth="8" />
      {/* Red saltire */}
      <path d="M0 0 L26 17.3 M60 40 L34 22.7 M60 0 L34 17.3 M0 40 L26 22.7" stroke="#C8102E" strokeWidth="2.8" />
      {/* White cross */}
      <path d="M30 0 v40 M0 20 h60" stroke="#FFFFFF" strokeWidth="12" />
      {/* Red cross */}
      <path d="M30 0 v40 M0 20 h60" stroke="#C8102E" strokeWidth="7.2" />
    </svg>
  );
}

function PakistanFlag({ className = "w-8 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={`${className} rounded-[3px] overflow-hidden shadow-sm border border-white/20 shrink-0`}
      aria-label="Flag of Pakistan"
      role="img"
    >
      <rect width="60" height="40" fill="#01411C" />
      <rect width="15" height="40" fill="#FFFFFF" />
      {/* Crescent */}
      <circle cx="39" cy="20" r="11" fill="#FFFFFF" />
      <circle cx="42" cy="18" r="9.5" fill="#01411C" />
      {/* 5-pointed star */}
      <polygon
        points="41,12 42.1,14.5 44.8,14.8 42.8,16.7 43.3,19.4 41,18 38.7,19.4 39.2,16.7 37.2,14.8 39.9,14.5"
        fill="#FFFFFF"
        transform="rotate(-15 41 16)"
      />
    </svg>
  );
}

function UAEFlag({ className = "w-8 h-5" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 40"
      className={`${className} rounded-[3px] overflow-hidden shadow-sm border border-white/20 shrink-0`}
      aria-label="Flag of the United Arab Emirates"
      role="img"
    >
      <rect x="15" y="0" width="45" height="13.33" fill="#00732F" />
      <rect x="15" y="13.33" width="45" height="13.34" fill="#FFFFFF" />
      <rect x="15" y="26.67" width="45" height="13.33" fill="#000000" />
      <rect x="0" y="0" width="15" height="40" fill="#E00000" />
    </svg>
  );
}

const flagComponents: Record<string, React.FC<{ className?: string }>> = {
  "United Kingdom": UKFlag,
  "Pakistan": PakistanFlag,
  "United Arab Emirates": UAEFlag,
};

// ─── Office Locations Data ────────────────────────────────────────────────────

const offices = [
  {
    country: "United Kingdom",
    region: "EUROPE",
    address: "34 Beaconsfield, Luton, LU2 0RW",
    pending: false,
    accent: "#3B82F6",
  },
  {
    country: "Pakistan",
    region: "SOUTH ASIA",
    address: "Suite #1, 2nd Floor, I-9 Markaz, Islamabad",
    pending: false,
    accent: "#10B981",
  },
  {
    country: "United Arab Emirates",
    region: "MIDDLE EAST",
    address: null,
    pending: true,
    accent: "#F59E0B",
  },
] as const;

// ─── Office Locations Section Component ───────────────────────────────────────

function OfficeLocationsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      aria-labelledby="offices-heading"
      className="max-w-7xl mx-auto px-6 pb-24 border-t border-zinc-800/60 pt-20"
    >
      {/* Section header */}
      <div className="mb-10">
        <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold">
          Global Presence
        </span>
        <h2
          id="offices-heading"
          className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-2"
        >
          Our Offices
        </h2>
        <p className="mt-2 text-sm text-foreground-muted max-w-md">
          Reach us at either office, or by email. We reply within one business day.
        </p>
      </div>

      {/* Cards grid: 1-col mobile → 3-col desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {offices.map((office, i) => {
          const FlagIcon = flagComponents[office.country];
          return (
            <motion.div
              key={office.country}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.3, ease: "easeOut", delay: i * 0.08 }}
              className="relative p-6 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-md shadow-xl overflow-hidden group"
            >
              {/* Accent top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[2px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${office.accent}, transparent)`,
                }}
              />

              {/* Subtle corner glow on hover */}
              <div
                className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: office.accent }}
              />

              <div className="relative z-10 flex flex-col gap-3">
                {/* Flag + Region */}
                <div className="flex items-center justify-between">
                  {FlagIcon ? <FlagIcon className="w-8 h-5" /> : null}
                  <span
                    className="text-[10px] font-mono font-bold uppercase tracking-[0.15em]"
                    style={{ color: office.accent }}
                  >
                    {office.region}
                  </span>
                </div>

              {/* Country name */}
              <h3 className="text-sm font-bold text-white leading-snug">
                {office.country}
              </h3>

              {/* Address or pending placeholder */}
              {office.pending ? (
                <div className="flex items-center gap-2 mt-0.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
                    style={{ background: office.accent }}
                  />
                  <span
                    className="text-xs font-mono font-semibold"
                    style={{ color: office.accent }}
                  >
                    Address coming soon
                  </span>
                </div>
              ) : (
                <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                  {office.address}
                </p>
              )}
            </div>
          </motion.div>
        );
      })}
      </div>
    </section>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function ContactPage() {
  const heroMotion = useHeroMotion();
  const [selectedIntents, setSelectedIntents] = useState<string[]>(["ai-automation"]);
  const [selectedTimeline, setSelectedTimeline] = useState<string>(timelineOptions[1]);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    website: "",
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

  const handleCopyEmail = async () => {
    try {
      if (typeof window !== "undefined" && navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(OFFICIAL_EMAIL);
      } else if (typeof window !== "undefined") {
        const input = document.createElement("input");
        input.value = OFFICIAL_EMAIL;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFieldErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const errors = validateLead(formData, ["name", "email", "message"]);
    setFieldErrors(errors);
    const firstInvalid = (["name", "email", "phone", "message"] as LeadField[]).find((f) => errors[f]);
    if (firstInvalid) {
      document.getElementById(`contact-${firstInvalid}`)?.focus();
      return;
    }
    setSending(true);
    setError(null);
    const failure = await submitLead({
      source: "contact",
      ...formData,
      interests: projectIntents.filter((i) => selectedIntents.includes(i.id)).map((i) => i.label),
      timeline: selectedTimeline,
    });
    setSending(false);
    if (failure) setError(failure);
    else setSubmitted(true);
  };

  return (
    <div
      suppressHydrationWarning
      className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[var(--accent-hover)] selection:text-black overflow-x-hidden"
    >
      {/* Dynamic Background Network */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contact-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)" />
        </svg>

        {/* Ambient Halo Glows */}
        <div className="absolute top-[10%] right-[15%] w-[600px] h-[600px] rounded-full bg-blue-600/[0.05] blur-[180px] pointer-events-none" />
        <div className="absolute top-[40%] left-[5%] w-[650px] h-[650px] rounded-full bg-violet-600/[0.05] blur-[180px] pointer-events-none" />
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
            {...heroMotion.badge}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-[11px] sm:text-xs font-mono font-medium text-[var(--accent-hover)] mb-6 sm:mb-8 backdrop-blur-xl shadow-lg max-w-full text-center"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
            <span>Contact</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            id="contact-hero-heading"
            {...heroMotion.heading}
            className="text-2xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.12] break-words"
          >
            Tell us what you need.
          </motion.h1>

          <motion.p
            {...heroMotion.paragraph}
            className="mt-6 text-base sm:text-xl text-zinc-400 max-w-3xl mx-auto leading-relaxed"
          >
            Send a short brief and a senior engineer will reply within one business day. Prefer email?{" "}
            <a href={`mailto:${OFFICIAL_EMAIL}`} className="text-accent-text hover:underline">
              {OFFICIAL_EMAIL}
            </a>
          </motion.p>
        </section>

        {/* ── INTERACTIVE BRIEF BUILDER + DIRECT CHANNELS ──────────────────── */}
        <section
          aria-labelledby="brief-builder-heading"
          className="max-w-7xl mx-auto px-4 sm:px-6 pb-28 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
        >
          <h2 id="brief-builder-heading" className="sr-only">Send us a brief</h2>

          {/* Left Column: Direct VIP Communication Channels & SLA Guarantee */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-32">
            {/* Direct Channel Card */}
            <div className="p-5 sm:p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-md shadow-xl space-y-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent-hover)] to-transparent" />

              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold block mb-1">
                  Direct
                </span>
                <h3 className="text-xl font-bold text-white">Talk to us directly</h3>
              </div>

              {/* Email with copy button */}
              <div className="p-4 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 space-y-2.5">
                <div className="flex flex-wrap items-center justify-between gap-1 text-xs font-mono text-foreground-muted">
                  <span>Email</span>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 min-w-0">
                  <a
                    href={`mailto:${OFFICIAL_EMAIL}`}
                    className="font-mono text-xs sm:text-sm font-bold text-white hover:text-[var(--accent-hover)] transition-colors break-words whitespace-normal min-w-0 flex-1 leading-snug py-0.5"
                  >
                    {OFFICIAL_EMAIL}
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="w-full sm:w-auto px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-800 hover:bg-zinc-700 text-zinc-200 transition-all duration-150 ease-out cursor-pointer shrink-0 font-medium active:scale-95 border border-zinc-700/60 text-center"
                  >
                    {copiedEmail ? "✓ Copied" : "Copy"}
                  </button>
                </div>
              </div>

              {/* WhatsApp Direct Advisory Channel */}
              <a
                href="https://wa.me/447859043361"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between p-4 rounded-2xl bg-emerald-950/30 border border-emerald-800/50 hover:bg-emerald-950/50 hover:border-emerald-600/60 hover:scale-[1.01] transition-all duration-150 ease-out cursor-pointer shadow-md"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center shrink-0 group-hover:border-emerald-400/50 group-hover:bg-emerald-500/20 transition-colors duration-150">
                    <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.771.816 2.791.817h.001c3.181 0 5.767-2.587 5.768-5.766.001-3.181-2.585-5.768-5.769-5.803zm3.376 8.212c-.145.409-.844.757-1.181.777-.338.021-.767.126-2.529-.603-1.897-.785-3.085-2.735-3.178-2.86-.093-.125-.765-1.02-.765-1.944 0-.924.474-1.378.643-1.567.169-.189.37-.236.493-.236.124 0 .248.001.356.006.113.006.265-.043.415.318.156.376.533 1.303.58 1.399.047.095.078.207.016.332-.063.125-.094.203-.187.312-.094.109-.197.243-.281.327-.094.093-.193.195-.083.383.11.189.489.807 1.05 1.306.723.644 1.332.844 1.521.938.189.094.301.079.412-.048.112-.128.479-.558.607-.749.128-.19.257-.159.432-.095.176.064 1.115.526 1.307.622.193.095.321.143.368.223.047.08.047.465-.098.874zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.176L2 22l4.98-1.306A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.636 0-3.161-.469-4.455-1.283l-.32-.202-2.964.777.791-2.89-.221-.351A8.163 8.163 0 0 1 3.8 12c0-4.521 3.679-8.2 8.2-8.2 4.521 0 8.2 3.679 8.2 8.2 0 4.521-3.679 8.2-8.2 8.2z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-xs font-mono text-emerald-400 font-bold">Phone / WhatsApp</div>
                    <div className="text-xs text-zinc-300 font-medium font-mono">+44 7859 043361</div>
                  </div>
                </div>
                <span className="text-emerald-400 group-hover:translate-x-1 transition-transform duration-150">→</span>
              </a>

              {/* Reply-time promise */}
              <div className="pt-4 border-t border-zinc-800/60 flex items-start gap-3 text-sm">
                <span className="text-success font-bold" aria-hidden="true">✓</span>
                <div>
                  <div className="font-semibold text-white">Reply within one business day</div>
                  <div className="text-foreground-muted">From a senior engineer, not a sales team.</div>
                </div>
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
                    noValidate
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-8"
                  >
                    {/* Step 1: Interactive Intent Selector */}
                    <div>
                      <p id="intent-label" className="text-xs font-mono uppercase tracking-wider text-foreground font-bold mb-3 flex items-center justify-between">
                        <span>1. What can we help with?</span>
                        <span className="text-foreground-muted font-normal normal-case tracking-normal">Choose any</span>
                      </p>
                      <div
                        role="group"
                        aria-labelledby="intent-label"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5"
                      >
                        {projectIntents.map((intent) => {
                          const isSelected = selectedIntents.includes(intent.id);
                          return (
                            <PillTab
                              key={intent.id}
                              id={`domain-chip-${intent.id}`}
                              variant="card"
                              isSelected={isSelected}
                              onClick={() => toggleIntent(intent.id)}
                              label={intent.label}
                              ariaLabel={intent.label}
                              role="checkbox"
                              accent="var(--accent-hover)"
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 2: Timeline Expectation */}
                    <div>
                      <p id="timeline-label" className="text-xs font-mono uppercase tracking-wider text-foreground font-bold mb-3">
                        2. When do you want to start?
                      </p>
                      <div role="radiogroup" aria-labelledby="timeline-label" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
                        {timelineOptions.map((timeline) => {
                          const isSelected = selectedTimeline === timeline;
                          return (
                            <PillTab
                              key={timeline}
                              variant="card"
                              size="sm"
                              isSelected={isSelected}
                              onClick={() => setSelectedTimeline(timeline)}
                              label={timeline}
                              accent="#06B6D4"
                              role="radio"
                            />
                          );
                        })}
                      </div>
                    </div>

                    {/* Step 3: Contact & Company Details */}
                    <div>
                      <p className="text-xs font-mono uppercase tracking-wider text-foreground font-bold mb-4">
                        3. Your details
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="contact-name" className="text-sm text-foreground mb-1.5 block">Full name (required)</label>
                          <input
                            type="text"
                            required
                            id="contact-name"
                            {...errorProps("contact-name", fieldErrors.name)}
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your name"
                            className="w-full px-4 py-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-[var(--accent-hover)] transition-colors data-[invalid]:border-danger"
                          />
                          <FieldError id="contact-name" message={fieldErrors.name} />
                        </div>

                        <div>
                          <label htmlFor="contact-email" className="text-sm text-foreground mb-1.5 block">Work email (required)</label>
                          <input
                            type="email"
                            required
                            id="contact-email"
                            {...errorProps("contact-email", fieldErrors.email)}
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="you@company.com"
                            className="w-full px-4 py-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-[var(--accent-hover)] transition-colors data-[invalid]:border-danger"
                          />
                          <FieldError id="contact-email" message={fieldErrors.email} />
                        </div>

                        <div>
                          <label htmlFor="contact-company" className="text-sm text-foreground mb-1.5 block">Company</label>
                          <input
                            type="text"
                            id="contact-company"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Company name"
                            className="w-full px-4 py-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-[var(--accent-hover)] transition-colors"
                          />
                        </div>

                        <div>
                          <label htmlFor="contact-phone" className="text-sm text-foreground mb-1.5 block">Phone or WhatsApp</label>
                          <input
                            type="tel"
                            id="contact-phone"
                            {...errorProps("contact-phone", fieldErrors.phone)}
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="+44 …"
                            className="w-full px-4 py-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-[var(--accent-hover)] transition-colors data-[invalid]:border-danger"
                          />
                          <FieldError id="contact-phone" message={fieldErrors.phone} />
                        </div>
                      </div>
                    </div>

                    {/* Step 4: Project Scope & Architecture Goals */}
                    <div>
                      <label htmlFor="contact-message" className="text-xs font-mono uppercase tracking-wider text-foreground font-bold mb-3 block">
                        4. Tell us about the project (required)
                      </label>
                      <textarea
                        required
                        rows={4}
                        id="contact-message"
                        {...errorProps("contact-message", fieldErrors.message)}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="What are you trying to achieve, and what systems do you use today?"
                        className="w-full px-4 py-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-sm text-white placeholder-zinc-400 focus:outline-none focus:border-[var(--accent-hover)] transition-colors resize-none data-[invalid]:border-danger"
                      />
                      <FieldError id="contact-message" message={fieldErrors.message} />
                    </div>

                    {/* Honeypot: hidden from people, filled by bots */}
                    <input
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                      aria-hidden="true"
                      className="absolute -left-[9999px] w-px h-px opacity-0"
                    />

                    {error && (
                      <p role="alert" className="text-sm text-red-400 font-mono">
                        {error}
                      </p>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                      <div className="text-[11px] font-mono text-foreground-muted">
                        We use these details only to reply to you. See our{" "}
                        <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={sending}
                        className="liquid-lime-btn text-sm py-3.5 px-8 cursor-pointer disabled:opacity-60 disabled:cursor-wait"
                      >
                        <span>{sending ? "Sending…" : "Send brief"}</span>
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
                      Brief received
                    </div>
                    <h3 className="text-3xl font-extrabold text-white tracking-tight">
                      Thanks, {formData.name || "there"}. We&apos;ve got your brief.
                    </h3>
                    <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
                      A senior engineer will reply to{" "}
                      <span className="text-white font-semibold">{formData.email}</span> within one business day. If it&apos;s
                      urgent, email {OFFICIAL_EMAIL}.
                    </p>
                    <div className="pt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: "", email: "", company: "", phone: "", message: "", website: "" });
                        }}
                        className="px-6 py-2.5 rounded-full border border-zinc-700 bg-zinc-800/80 text-zinc-300 hover:text-white text-xs font-mono transition-colors cursor-pointer"
                      >
                        Send another brief
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>
        {/* ── GLOBAL OFFICES ─────────────────────────────────────────────── */}
        <OfficeLocationsSection />

      </main>

      <Footer />
    </div>
  );
}
