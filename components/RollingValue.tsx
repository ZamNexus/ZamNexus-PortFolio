"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

type Phase = "idle" | "reset" | "roll";

interface RollingValueProps {
  // The figure exactly as it should read, for example "5+", "98.4%" or "< 1s".
  value: string;
  // Milliseconds to wait before the digits start, so a row of figures can cascade.
  delay?: number;
}

// Two runs of 0-9 per column, so every digit makes one full turn before it settles.
const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

// A figure that rolls up like a mechanical odometer when it scrolls into view: each digit is a
// window onto a column of numbers that spins from 0 to its value, one digit after another, and
// symbols such as "+" or "s" fade in once the digits land.
//
// The server renders the finished figure, so it is correct without JavaScript. After hydration the
// digits snap to zero, wait until the figure is on screen, then roll (see .roll-val in globals.css).
// Reduced motion keeps the finished figure.
export default function RollingValue({ value, delay = 0 }: RollingValueProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        // Two frames, so the zeroed digits are painted before they start to move.
        frame = requestAnimationFrame(() => {
          frame = requestAnimationFrame(() => setPhase("roll"));
        });
      },
      { threshold: 0.6 },
    );
    // Reset first, then start watching, so "roll" can never arrive before "reset".
    frame = requestAnimationFrame(() => {
      setPhase("reset");
      observer.observe(el);
    });
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  const chars = Array.from(value);
  const isDigit = (c: string) => c >= "0" && c <= "9";

  return (
    <span ref={ref} className="roll-val" data-phase={phase} style={{ "--roll-delay": `${delay}ms` } as CSSProperties}>
      <span className="sr-only">{value}</span>
      <span className="roll-val__chars" aria-hidden="true">
        {chars.map((c, i) =>
          isDigit(c) ? (
            <span
              key={i}
              className="roll-digit"
              style={{ "--d": Number(c), "--k": chars.slice(0, i).filter(isDigit).length } as CSSProperties}
            >
              <span className="roll-digit__col">
                {DIGITS.map((d, n) => (
                  <span key={n}>{d}</span>
                ))}
              </span>
            </span>
          ) : (
            <span key={i} className="roll-static">
              {c}
            </span>
          ),
        )}
      </span>
    </span>
  );
}
