"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedStatProps {
  value: string;
  accent: string;
  className?: string;
}

/**
 * Counts from 0 up to the numeric portion of `value`, then appends any
 * non-numeric suffix (e.g. "750+" → counts 0→750 then shows "750+").
 * Non-numeric values (e.g. "∞") are rendered as-is.
 */
export default function AnimatedStat({ value, accent, className = "" }: AnimatedStatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [displayed, setDisplayed] = useState("0");
  const [hasAnimated, setHasAnimated] = useState(false);

  // Parse numeric prefix + suffix
  const match = value.match(/^(\d+)(.*)$/);
  const isNumeric = match !== null;
  const target = isNumeric ? parseInt(match![1], 10) : 0;
  const suffix = isNumeric ? match![2] : "";

  useEffect(() => {
    if (!isNumeric) {
      setDisplayed(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          const duration = 1400; // ms
          const steps = Math.min(target, 60);
          const stepTime = duration / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += Math.ceil(target / steps);
            if (current >= target) {
              current = target;
              clearInterval(timer);
            }
            setDisplayed(current + suffix);
          }, stepTime);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isNumeric, target, suffix, value, hasAnimated]);

  return (
    <div
      ref={ref}
      className={`text-5xl sm:text-6xl font-extrabold font-mono tabular-nums ${className}`}
      style={{ color: accent }}
    >
      {displayed}
    </div>
  );
}
