"use client";

import { useState } from "react";
import type { FormEvent, ChangeEvent, CSSProperties } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/motion/ScrollProgress";
import Reveal from "@/components/motion/Reveal";
import Stagger from "@/components/motion/Stagger";
import SplitWords from "@/components/motion/SplitWords";
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

// The choices fall into two kinds, so they are shown as two short groups instead of one long pile.
const intentGroups = [
  { title: "Engineering services", items: projectIntents.slice(0, 6) },
  { title: "Ready-made platforms", items: projectIntents.slice(6) },
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

// ─── Offices ──────────────────────────────────────────────────────────────────

interface Office {
  country: string;
  place: string;
  address: string | null;
}

const offices: Office[] = [
  { country: "United Kingdom", place: "Luton", address: "34 Beaconsfield, Luton, LU2 0RW" },
  { country: "Pakistan", place: "Islamabad", address: "Suite #1, 2nd Floor, I-9 Markaz, Islamabad" },
  { country: "United Arab Emirates", place: "United Arab Emirates", address: null },
];

// The offices as stops on one route line; a stop with no address yet is drawn dashed.
function OfficeRoute() {
  return (
    <section aria-labelledby="offices-heading" className="ct-divide">
      <div className="max-w-6xl mx-auto px-6 pt-24 pb-28">
        <Reveal className="mb-12 max-w-xl">
          <h2 id="offices-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Where to find us
          </h2>
          <p className="mt-3 text-foreground-muted leading-relaxed">Two offices today, and a third on the way.</p>
        </Reveal>

        <Stagger as="ol" className="ct-route">
          {offices.map((office) => {
            const FlagIcon = flagComponents[office.country];
            return (
              <li key={office.country} className="ct-stop" data-pending={office.address === null}>
                <span className="ct-stop__dot" aria-hidden="true" />
                <div className="flex items-center gap-3">
                  {FlagIcon ? <FlagIcon className="w-8 h-5" /> : null}
                  <h3 className="text-xl font-bold text-white">{office.place}</h3>
                </div>
                {office.place !== office.country && <p className="ct-stop__country">{office.country}</p>}
                {office.address ? (
                  <p className="ct-stop__address">{office.address}</p>
                ) : (
                  <p className="ct-stop__address ct-stop__address--pending">Address coming soon</p>
                )}
              </li>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────

export default function ContactPage() {
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

  // Live progress through the four steps (drives the rail and the summary)
  const live = validateLead(formData, ["name", "email", "message"]);
  const done = [
    selectedIntents.length > 0,
    Boolean(selectedTimeline),
    !live.name && !live.email && !live.phone,
    !live.message,
  ];
  const doneCount = done.filter(Boolean).length;
  const selectedLabels = projectIntents.filter((i) => selectedIntents.includes(i.id)).map((i) => i.label);

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
      interests: selectedLabels,
      timeline: selectedTimeline,
    });
    setSending(false);
    if (failure) setError(failure);
    else setSubmitted(true);
  };

  // The marker on the rail: the step number, or a tick once the step is complete.
  const node = (index: number) => (
    <span className="ct-node" aria-hidden="true">
      {done[index] ? "✓" : index + 1}
    </span>
  );

  return (
    <div
      suppressHydrationWarning
      className="min-h-screen bg-background text-zinc-100 font-sans selection:bg-[var(--accent-hover)] selection:text-[#fff] overflow-x-clip"
    >
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
        <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="contact-grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#contact-grid)" />
        </svg>
      </div>

      <ScrollProgress />
      <Navbar />

      <main className="relative z-10">
        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section aria-labelledby="contact-hero-heading" className="relative max-w-6xl mx-auto px-6 pt-40 pb-20">
          <div className="ct-hero-glow" aria-hidden="true" />
          <h1
            id="contact-hero-heading"
            className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-3xl leading-[1.05]"
          >
            <SplitWords mode="load" text="Tell us what you need." />
          </h1>
          <p data-enter="4" className="mt-6 text-base sm:text-lg text-zinc-400 max-w-xl leading-relaxed">
            Send a short brief and a senior engineer will reply within one business day. Prefer email?{" "}
            <a href={`mailto:${OFFICIAL_EMAIL}`} className="text-accent-text hover:underline">
              {OFFICIAL_EMAIL}
            </a>
          </p>
        </section>

        {/* ── THE BRIEF: four steps on a rail, with small tiles beside it ──── */}
        <section
          aria-labelledby="brief-builder-heading"
          className="max-w-6xl mx-auto px-6 pb-28 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_340px] gap-x-20 gap-y-14 items-start"
        >
          <h2 id="brief-builder-heading" className="sr-only">Send us a brief</h2>

          <div data-enter="5">
            <AnimatePresence mode="wait" initial={false}>
              {!submitted ? (
                <motion.form
                  key="contact-form"
                  onSubmit={handleSubmit}
                  noValidate
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="relative"
                >
                  <ol className="ct-steps">
                    {/* Step 1: what they need */}
                    <li className="ct-step" data-done={done[0]}>
                      {node(0)}
                      <div className="min-w-0">
                        <h3 id="intent-label" className="ct-title">What can we help with?</h3>
                        <p className="ct-hint">Choose any that apply.</p>
                        <div role="group" aria-labelledby="intent-label">
                          {intentGroups.map((group) => (
                            <div key={group.title} className="ct-group">
                              <p className="ct-group__title">{group.title}</p>
                              <div className="ct-chips">
                                {group.items.map((intent) => (
                                  <button
                                    key={intent.id}
                                    id={`domain-chip-${intent.id}`}
                                    type="button"
                                    role="checkbox"
                                    aria-checked={selectedIntents.includes(intent.id)}
                                    onClick={() => toggleIntent(intent.id)}
                                    className="ct-chip"
                                  >
                                    <span className="ct-chip__box" aria-hidden="true" />
                                    {intent.label}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </li>

                    {/* Step 2: timing */}
                    <li className="ct-step" data-done={done[1]}>
                      {node(1)}
                      <div className="min-w-0">
                        <h3 id="timeline-label" className="ct-title">When do you want to start?</h3>
                        <div role="radiogroup" aria-labelledby="timeline-label" className="ct-chips mt-4">
                          {timelineOptions.map((timeline) => (
                            <button
                              key={timeline}
                              type="button"
                              role="radio"
                              aria-checked={selectedTimeline === timeline}
                              onClick={() => setSelectedTimeline(timeline)}
                              className="ct-chip ct-chip--radio"
                            >
                              <span className="ct-chip__box" aria-hidden="true" />
                              {timeline}
                            </button>
                          ))}
                        </div>
                      </div>
                    </li>

                    {/* Step 3: who to reply to */}
                    <li className="ct-step" data-done={done[2]}>
                      {node(2)}
                      <div className="min-w-0">
                        <h3 className="ct-title">Who should we reply to?</h3>
                        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-5">
                          <div>
                            <label htmlFor="contact-name" className="ct-label">Full name (required)</label>
                            <input
                              type="text"
                              required
                              id="contact-name"
                              {...errorProps("contact-name", fieldErrors.name)}
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder="Your name"
                              className="ct-input brief-input"
                            />
                            <FieldError id="contact-name" message={fieldErrors.name} />
                          </div>

                          <div>
                            <label htmlFor="contact-email" className="ct-label">Work email (required)</label>
                            <input
                              type="email"
                              required
                              id="contact-email"
                              {...errorProps("contact-email", fieldErrors.email)}
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder="you@company.com"
                              className="ct-input brief-input"
                            />
                            <FieldError id="contact-email" message={fieldErrors.email} />
                          </div>

                          <div>
                            <label htmlFor="contact-company" className="ct-label">Company</label>
                            <input
                              type="text"
                              id="contact-company"
                              name="company"
                              value={formData.company}
                              onChange={handleChange}
                              placeholder="Company name"
                              className="ct-input brief-input"
                            />
                          </div>

                          <div>
                            <label htmlFor="contact-phone" className="ct-label">Phone or WhatsApp</label>
                            <input
                              type="tel"
                              id="contact-phone"
                              {...errorProps("contact-phone", fieldErrors.phone)}
                              name="phone"
                              value={formData.phone}
                              onChange={handleChange}
                              placeholder="+44 …"
                              className="ct-input brief-input"
                            />
                            <FieldError id="contact-phone" message={fieldErrors.phone} />
                          </div>
                        </div>
                      </div>
                    </li>

                    {/* Step 4: the project */}
                    <li className="ct-step" data-done={done[3]}>
                      {node(3)}
                      <div className="min-w-0">
                        <label htmlFor="contact-message" className="ct-title block">
                          Tell us about the project (required)
                        </label>
                        <textarea
                          required
                          rows={5}
                          id="contact-message"
                          {...errorProps("contact-message", fieldErrors.message)}
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="What are you trying to achieve, and what systems do you use today?"
                          className="ct-input brief-input mt-5 resize-none"
                        />
                        <FieldError id="contact-message" message={fieldErrors.message} />

                        {error && (
                          <p role="alert" className="mt-4 text-sm text-red-400 font-mono">
                            {error}
                          </p>
                        )}

                        <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                          <p className="text-[12px] text-foreground-muted max-w-sm leading-relaxed">
                            We use these details only to reply to you. See our{" "}
                            <Link href="/privacy" className="underline hover:text-foreground">Privacy Policy</Link>.
                          </p>
                          <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            type="submit"
                            disabled={sending}
                            className="liquid-lime-btn text-sm py-3.5 px-8 cursor-pointer disabled:opacity-60 disabled:cursor-wait"
                          >
                            <span>{sending ? "Sending…" : "Send brief"}</span>
                            <span className={`arrow-icon w-7 h-7 text-xs ${sending ? "brief-sending" : ""}`} aria-hidden="true">
                              {sending ? "" : "→"}
                            </span>
                          </motion.button>
                        </div>
                      </div>
                    </li>
                  </ol>

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
                </motion.form>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="py-10 max-w-lg space-y-5"
                >
                  <svg viewBox="0 0 64 64" className="brief-success" aria-hidden="true">
                    <circle cx={32} cy={32} r={30} pathLength={1} />
                    <path d="M20 33l8 8 16-18" pathLength={1} />
                  </svg>
                  <h3 className="text-3xl font-extrabold text-white tracking-tight">
                    Thanks, {formData.name || "there"}. We&apos;ve got your brief.
                  </h3>
                  <p className="text-zinc-400 leading-relaxed">
                    A senior engineer will reply to{" "}
                    <span className="text-white font-semibold">{formData.email}</span> within one business day. If it&apos;s
                    urgent, email {OFFICIAL_EMAIL}.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", company: "", phone: "", message: "", website: "" });
                    }}
                    className="px-6 py-2.5 rounded-full border border-zinc-700 bg-zinc-800/80 text-zinc-300 hover:text-white text-sm transition-colors cursor-pointer"
                  >
                    Send another brief
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Beside the rail: a live summary and the direct channels, each its own small tile */}
          <aside data-enter="6" className="grid gap-3 lg:sticky lg:top-28" aria-label="Your brief and direct contact">
            <div className="ct-tile">
              <div className="flex items-center justify-between gap-3">
                <p className="ct-tile__title">Your brief so far</p>
                <span className="ct-count">{doneCount} of {done.length}</span>
              </div>
              <div className="ct-meter" aria-hidden="true">
                <span style={{ "--p": doneCount / done.length } as CSSProperties} />
              </div>
              <ul className="ct-mini" aria-label="Selected services">
                {selectedLabels.map((label) => (
                  <li key={label}>{label}</li>
                ))}
              </ul>
              <p className="mt-3 text-[13px] text-foreground-muted">
                Start: <span className="text-foreground-strong">{selectedTimeline}</span>
              </p>
            </div>

            <div className="ct-tile">
              <p className="ct-tile__title">Email</p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                <a
                  href={`mailto:${OFFICIAL_EMAIL}`}
                  className="font-mono text-sm font-bold text-white hover:text-[var(--accent-text)] transition-colors break-all"
                >
                  {OFFICIAL_EMAIL}
                </a>
                <button type="button" onClick={handleCopyEmail} className="ct-copy">
                  {copiedEmail ? "Copied" : "Copy"}
                </button>
              </div>
            </div>

            <a
              href="https://wa.me/447859043361"
              target="_blank"
              rel="noopener noreferrer"
              className="ct-tile ct-tile--link group"
            >
              <span className="ct-wa" aria-hidden="true">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.54 1.771.816 2.791.817h.001c3.181 0 5.767-2.587 5.768-5.766.001-3.181-2.585-5.768-5.769-5.803zm3.376 8.212c-.145.409-.844.757-1.181.777-.338.021-.767.126-2.529-.603-1.897-.785-3.085-2.735-3.178-2.86-.093-.125-.765-1.02-.765-1.944 0-.924.474-1.378.643-1.567.169-.189.37-.236.493-.236.124 0 .248.001.356.006.113.006.265-.043.415.318.156.376.533 1.303.58 1.399.047.095.078.207.016.332-.063.125-.094.203-.187.312-.094.109-.197.243-.281.327-.094.093-.193.195-.083.383.11.189.489.807 1.05 1.306.723.644 1.332.844 1.521.938.189.094.301.079.412-.048.112-.128.479-.558.607-.749.128-.19.257-.159.432-.095.176.064 1.115.526 1.307.622.193.095.321.143.368.223.047.08.047.465-.098.874zM12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.176L2 22l4.98-1.306A9.957 9.957 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.2c-1.636 0-3.161-.469-4.455-1.283l-.32-.202-2.964.777.791-2.89-.221-.351A8.163 8.163 0 0 1 3.8 12c0-4.521 3.679-8.2 8.2-8.2 4.521 0 8.2 3.679 8.2 8.2 0 4.521-3.679 8.2-8.2 8.2z" />
                </svg>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-white">Phone or WhatsApp</span>
                <span className="block font-mono text-[13px] text-foreground-muted">+44 7859 043361</span>
              </span>
              <span className="ct-tile__go" aria-hidden="true">→</span>
            </a>

            <div className="ct-tile">
              <p className="text-sm font-semibold text-white">Reply within one business day</p>
              <p className="mt-1 text-[13px] text-foreground-muted">From a senior engineer, not a sales team.</p>
            </div>
          </aside>
        </section>

        {/* ── OFFICES ───────────────────────────────────────────────────────── */}
        <OfficeRoute />
      </main>

      <Footer />
    </div>
  );
}
