"use client";

import { useEffect, useRef, useState } from "react";

interface DeliveryStep {
  number: string;
  label: string;
  description: string;
}

interface DeliveryTimelineProps {
  steps: DeliveryStep[];
}

/**
 * Horizontal timeline that fills its connecting line and reveals each
 * step node in sequence as the section scrolls through the upper half
 * of the viewport. Progress is a continuous 0–1 value driven by scroll
 * position, not a one-shot IntersectionObserver trigger.
 */
export default function DeliveryTimeline({ steps }: DeliveryTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setProgress(1);
      return;
    }

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // Reveal begins as the timeline enters the lower part of the viewport,
      // completes once it reaches the upper-middle — a comfortable scroll range.
      const start = vh * 0.85;
      const end = vh * 0.4;
      const raw = (start - rect.top) / (start - end);
      setProgress(Math.min(1, Math.max(0, raw)));
    };

    const onScroll = () => {
      // Cancel-and-reschedule rather than a "ticking" boolean guard: if a
      // browser drops a queued rAF callback (e.g. the tab was backgrounded
      // mid-scroll), a boolean guard can get stuck permanently. This can't.
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div ref={containerRef} className="delivery-timeline">
      <div className="delivery-timeline-track" aria-hidden="true">
        <div
          className="delivery-timeline-fill"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="delivery-timeline-steps">
        {steps.map((step, idx) => {
          const threshold = idx / steps.length;
          const revealed = progress >= threshold;
          return (
            <div
              key={step.number}
              className="delivery-timeline-step"
              data-revealed={revealed}
            >
              <div className="delivery-timeline-node" aria-hidden="true">
                {step.number}
              </div>
              <h3 className="delivery-timeline-label">{step.label}</h3>
              <p className="delivery-timeline-desc">{step.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
