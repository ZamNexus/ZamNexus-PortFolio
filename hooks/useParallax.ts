"use client";

import { useEffect, useRef } from "react";

/**
 * Returns a ref for a decorative background element. As the page scrolls,
 * the element shifts vertically by a small offset (clamped to maxOffset)
 * based on its position relative to the viewport centre — a subtle
 * parallax effect. No-ops under prefers-reduced-motion.
 */
export function useParallax<T extends HTMLElement>(
  speed: number = 0.12,
  maxOffset: number = 20
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let rafId = 0;

    const update = () => {
      rafId = 0;
      const rect = el.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const distanceFromCenter = elementCenter - viewportCenter;
      const raw = -(distanceFromCenter * speed);
      const clamped = Math.max(-maxOffset, Math.min(maxOffset, raw));
      el.style.transform = `translate3d(0, ${clamped.toFixed(1)}px, 0)`;
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
  }, [speed, maxOffset]);

  return ref;
}
