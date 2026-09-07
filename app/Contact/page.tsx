"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "AI & Software Development",
    budget: "$25k - $50k",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[#D0FF71] selection:text-black">
      <div className="fixed inset-0 bg-ziel-grid opacity-60 pointer-events-none z-0" />
      <Navbar currentPath="/Contact" />

      <main className="relative z-10 pt-32 pb-20">
        <section className="max-w-6xl mx-auto px-6 mb-16 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/80 text-xs font-mono font-medium text-[#D0FF71] mb-6">
            Get In Touch
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Start a Project with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#D0FF71] to-emerald-300">
              Zamooq
            </span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto leading-relaxed">
            Tell us about your project or technical requirements. Our engineering team will review your brief and respond within 24 hours.
          </p>
        </section>

        {/* Contact Form & Direct Channels */}
        <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-3xl bg-zinc-900/50 border border-zinc-800 space-y-6">
              <h3 className="text-xl font-bold text-white">Direct Channels</h3>

              <div className="space-y-4">
                <div>
                  <div className="text-xs font-mono text-zinc-500 uppercase">Direct Email</div>
                  <a href="mailto:contact@zamooq.com" className="text-base font-semibold text-[#D0FF71] hover:underline">
                    contact@zamooq.com
                  </a>
                </div>

                <div>
                  <div className="text-xs font-mono text-zinc-500 uppercase">Instant WhatsApp</div>
                  <a
                    href="http://wa.me/447456234972"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white pt-1"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span>Chat on WhatsApp (+44 7456 234972) →</span>
                  </a>
                </div>

                <div>
                  <div className="text-xs font-mono text-zinc-500 uppercase">Executive Office</div>
                  <div className="text-sm text-zinc-300">
                    Mir Mujeeb Ul Hassan (Owner & CEO)
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono text-zinc-500 uppercase">Response Time</div>
                  <div className="text-sm text-zinc-300">
                    Guaranteed within 1 business day
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-zinc-900/30 border border-zinc-800 text-sm text-zinc-400 leading-relaxed">
              <span className="font-semibold text-white block mb-1">NDA Protected</span>
              All project inquiries and proprietary architectures shared with Zamooq are protected by default under strict non-disclosure agreements.
            </div>
          </div>

          {/* Right Form Column */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900/70 border border-zinc-800 shadow-2xl">
              {submitted ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#D0FF71]/20 border border-[#D0FF71] text-[#D0FF71] flex items-center justify-center text-2xl mx-auto">
                    ✓
                  </div>
                  <h3 className="text-2xl font-bold text-white">Project Brief Received!</h3>
                  <p className="text-zinc-400 max-w-md mx-auto">
                    Thank you, {formData.name}. Mir Mujeeb Ul Hassan and the technical lead team have received your request and will follow up promptly.
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
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#D0FF71] transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#D0FF71] transition-colors text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                        Company Name
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Acme Corp"
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#D0FF71] transition-colors text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                        Service Interest
                      </label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-[#D0FF71] transition-colors text-sm"
                      >
                        <option>AI & Software Development</option>
                        <option>Staff Augmentation</option>
                        <option>Cloud Engineering & DevOps</option>
                        <option>Cyber Security</option>
                        <option>Mobile App Development</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                      Project Details & Scope *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe your objectives, timeline, or technical requirements..."
                      className="w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 focus:outline-none focus:border-[#D0FF71] transition-colors text-sm"
                    />
                  </div>

                  <button type="submit" className="liquid-lime-btn w-full justify-center text-base py-4">
                    <span>Send Project Brief</span>
                    <span className="arrow-icon w-7 h-7 text-xs">→</span>
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
