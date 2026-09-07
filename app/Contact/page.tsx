"use client";

import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ─── Types ───────────────────────────────────────────────────────────────────

interface ContactFormData {
  name: string;
  email: string;
  company: string;
  service: string;
  message: string;
}

const serviceOptions = [
  "AI & Intelligent Solutions",
  "SaaS Product Development",
  "Cloud-Native Engineering",
  "Intelligent Automation",
  "Microsoft Solutions (Dynamics 365, Power Platform)",
  "Salesforce Solutions",
  "Digital Transformation",
  "Connected Enterprise & Integration",
] as const;

// ─── Component ────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    service: serviceOptions[0],
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[#D0FF71] selection:text-black">
      <div className="fixed inset-0 bg-ziel-grid opacity-60 pointer-events-none z-0" aria-hidden="true" />
      <Navbar />

      <main className="relative z-10">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section
          aria-labelledby="contact-hero-heading"
          className="max-w-6xl mx-auto px-6 pt-44 pb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono font-medium text-[#D0FF71] mb-8 backdrop-blur-xl">
            Get In Touch
          </div>
          <h1
            id="contact-hero-heading"
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.08]"
          >
            Start a conversation with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D0FF71] to-emerald-300">
              ZamNexus.
            </span>
          </h1>
          <p className="mt-7 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Tell us about your challenge, your idea or your ambition. Our team
            will review your brief and respond within one business day.
          </p>
        </section>

        {/* ── FORM + SIDEBAR ────────────────────────────────────────────────── */}
        <section
          aria-labelledby="contact-form-heading"
          className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 lg:grid-cols-12 gap-12"
        >
          <h2 id="contact-form-heading" className="sr-only">Contact Form</h2>

          {/* Left — Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-6">
              <h3 className="text-xl font-bold text-white">Direct Channels</h3>

              <div className="space-y-5">
                <div>
                  <div className="text-xs font-mono text-zinc-500 uppercase mb-1">Email</div>
                  <a
                    href="mailto:contact@zamooq.com"
                    className="text-base font-semibold text-[#D0FF71] hover:underline"
                  >
                    contact@zamooq.com
                  </a>
                </div>

                <div>
                  <div className="text-xs font-mono text-zinc-500 uppercase mb-1">WhatsApp</div>
                  <a
                    href="https://wa.me/447456234972"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-gentle-pulse" aria-hidden="true" />
                    <span>Chat on WhatsApp (+44 7456 234972) →</span>
                  </a>
                </div>

                <div>
                  <div className="text-xs font-mono text-zinc-500 uppercase mb-1">Response Time</div>
                  <div className="text-sm text-zinc-300">
                    Guaranteed within 1 business day
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800 text-sm text-zinc-400 leading-relaxed">
              <span className="font-semibold text-white block mb-1">Confidential by Default</span>
              All project enquiries and proprietary information shared with
              ZamNexus are treated as confidential under strict non-disclosure terms.
            </div>

            {/* Capabilities quick-links */}
            <div className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800">
              <div className="text-xs font-mono text-zinc-500 uppercase mb-3">Explore Our Work</div>
              <div className="flex flex-wrap gap-2">
                {["Solutions", "Services", "Platforms", "Industries"].map((label) => (
                  <a
                    key={label}
                    href={`/${label}`}
                    className="tech-pill hover:border-[#D0FF71]/40 hover:text-[#D0FF71]"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right — Form Column */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/70 border border-zinc-800 shadow-2xl">
              {submitted ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#D0FF71]/20 border border-[#D0FF71] text-[#D0FF71] flex items-center justify-center text-2xl mx-auto">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Received!</h3>
                  <p className="text-zinc-400 max-w-md mx-auto">
                    Thank you, {formData.name}. The ZamNexus team will review
                    your enquiry and respond within one business day.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-4 text-xs font-mono text-[#D0FF71] underline cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2"
                      >
                        Your Name *
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#D0FF71] transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2"
                      >
                        Work Email *
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#D0FF71] transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="contact-company"
                        className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2"
                      >
                        Company Name
                      </label>
                      <input
                        id="contact-company"
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Acme Ltd"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#D0FF71] transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-service"
                        className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2"
                      >
                        Service Interest
                      </label>
                      <select
                        id="contact-service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-[#D0FF71] transition-colors text-sm"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2"
                    >
                      Tell Us About Your Project *
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Briefly describe your challenge, objectives or timeline..."
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#D0FF71] transition-colors text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    id="contact-submit-btn"
                    className="liquid-lime-btn w-full justify-center text-base py-4"
                  >
                    <span>Send Your Message</span>
                    <span className="arrow-icon w-7 h-7 text-xs" aria-hidden="true">→</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
