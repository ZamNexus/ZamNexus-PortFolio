"use client";

import { useEffect, useState, useSyncExternalStore, type CSSProperties } from "react";

// An example brief that fills itself in beside the Contact hero: what you need, when, who to reply to, the
// project, then "sent" and the reply promise. It plays on its own and loops. Decorative (aria-hidden): the
// real form is below. Server-rendered and reduced-motion visitors see the finished state, never a blank card.

interface DemoStep {
  label: string;
  chips?: string[];
  text?: string;
}

const STEPS: DemoStep[] = [
  { label: "What you need", chips: ["AI & Automation", "ZNXERP"] },
  { label: "When", chips: ["1–3 months"] },
  { label: "Who to reply to", text: "Your name · you@company.com" },
  { label: "The project", text: "Our stock and finance systems don't talk to each other." },
];

const STEP_MS = 1500;
const HOLD_MS = 4200;
const SENT = STEPS.length + 1; // every step answered, then sent

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function BriefDemo() {
  const reduced = useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => true);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced) return;
    const id = window.setTimeout(() => setStep(step >= SENT ? 0 : step + 1), step >= SENT ? HOLD_MS : STEP_MS);
    return () => window.clearTimeout(id);
  }, [step, reduced]);

  const shown = reduced ? SENT : step;
  const answered = Math.min(shown, STEPS.length);
  const sent = shown >= SENT;

  return (
    <div className="brief-demo" aria-hidden="true">
      <div className="brief-demo__head">
        <b>Example brief</b>
        <span>{answered} of {STEPS.length}</span>
      </div>

      <ol className="brief-demo__steps" style={{ "--p": Math.min(answered, STEPS.length - 1) / (STEPS.length - 1) } as CSSProperties}>
        <span className="brief-demo__fill" />
        {STEPS.map((s, i) => (
          <li key={s.label} className="brief-demo__step" data-state={i < answered ? "done" : i === answered ? "active" : "next"}>
            <p className="brief-demo__label">{s.label}</p>
            {s.chips ? (
              <div className="brief-demo__value">
                {s.chips.map((c) => (
                  <span key={c} className="brief-demo__chip">{c}</span>
                ))}
              </div>
            ) : (
              <p className="brief-demo__value brief-demo__type">{s.text}</p>
            )}
          </li>
        ))}
      </ol>

      <div className="brief-demo__sent" data-sent={sent}>
        <span className="brief-demo__pulse" />
        <p>
          <b>Sent.</b> A senior engineer replies within one business day.
        </p>
      </div>
    </div>
  );
}
