"use client";

import { useState, useId } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { submitLead } from "@/lib/submitLead";

interface DemoRequestFormProps {
  productName: string;
  accentColor?: string;
}

interface FormData {
  name: string;
  email: string;
  company: string;
  role: string;
  message: string;
  website: string;
}

export default function DemoRequestForm({
  productName,
  accentColor = "var(--accent-hover)",
}: DemoRequestFormProps) {
  const uid = useId();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    company: "",
    role: "",
    message: "",
    website: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    const failure = await submitLead({ source: "demo", product: productName, ...form });
    setSending(false);
    if (failure) setError(failure);
    else setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-14 space-y-4">
        <div
          className="w-16 h-16 rounded-full border flex items-center justify-center text-2xl mx-auto"
          style={{
            background: `${accentColor}20`,
            borderColor: `${accentColor}40`,
            color: accentColor,
          }}
        >
          ✓
        </div>
        <h3 className="text-2xl font-bold text-white">Demo Request Received!</h3>
        <p className="text-zinc-400 max-w-sm mx-auto">
          Thanks {form.name} — our team will be in touch within one business day
          to schedule your {productName} demo.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="text-xs font-mono underline cursor-pointer"
          style={{ color: accentColor }}
        >
          Submit another request
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 rounded-xl bg-zinc-950 border border-zinc-800 text-white placeholder-zinc-600 text-sm transition-colors outline-none focus:border-[var(--demo-accent)]";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
      style={{ "--demo-accent": accentColor } as React.CSSProperties}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor={`${uid}-name`}
            className="block text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2"
          >
            Your Name *
          </label>
          <input
            id={`${uid}-name`}
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Jane Smith"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor={`${uid}-email`}
            className="block text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2"
          >
            Work Email *
          </label>
          <input
            id={`${uid}-email`}
            type="email"
            name="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="jane@company.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label
            htmlFor={`${uid}-company`}
            className="block text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2"
          >
            Company *
          </label>
          <input
            id={`${uid}-company`}
            type="text"
            name="company"
            required
            value={form.company}
            onChange={handleChange}
            placeholder="Acme Corp"
            className={inputClass}
          />
        </div>
        <div>
          <label
            htmlFor={`${uid}-role`}
            className="block text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2"
          >
            Your Role
          </label>
          <input
            id={`${uid}-role`}
            type="text"
            name="role"
            value={form.role}
            onChange={handleChange}
            placeholder="Operations Manager"
            className={inputClass}
          />
        </div>
      </div>

      {/* Pre-filled product badge */}
      <div>
        <div className="text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2">
          Requesting Demo For
        </div>
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold border"
          style={{
            background: `${accentColor}10`,
            borderColor: `${accentColor}30`,
            color: accentColor,
          }}
        >
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: accentColor }} aria-hidden="true" />
          {productName}
        </div>
      </div>

      <div>
        <label
          htmlFor={`${uid}-message`}
          className="block text-xs font-mono uppercase tracking-wider text-zinc-500 mb-2"
        >
          Tell Us About Your Business
        </label>
        <textarea
          id={`${uid}-message`}
          name="message"
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder="How many locations, users, what are your biggest operational challenges..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Honeypot: hidden from people, filled by bots */}
      <input
        type="text"
        name="website"
        value={form.website}
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

      <button
        type="submit"
        id={`${uid}-submit`}
        disabled={sending}
        className="w-full py-4 rounded-full font-bold text-base text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(37,99,235,0.35)] disabled:opacity-60 disabled:cursor-wait"
        style={{ background: accentColor }}
      >
        {sending ? "Sending…" : `Request Your ${productName} Demo →`}
      </button>
    </form>
  );
}
