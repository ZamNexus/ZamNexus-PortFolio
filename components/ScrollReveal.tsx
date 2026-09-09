"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  /** Direction the element enters from. "left" is used for the ripple effect. */
  variant?: "up" | "left";
  /** Delay in ms before the transition starts, once visible — drives stagger. */
  delay?: number;
  className?: string;
  threshold?: number;
}

/**
 * Fades + slides a block into place the first time it enters the viewport.
 * One IntersectionObserver per instance; disconnects after firing once.
 */
export default function ScrollReveal({
  children,
  variant = "up",
  delay = 0,
  className = "",
  threshold = 0.12,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return (
    <div
      ref={ref}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
      className={`scroll-reveal scroll-reveal--${variant} ${className}`}
    >
      {children}
    </div>
  );
}
