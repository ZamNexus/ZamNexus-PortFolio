"use client";

import { useRef, useSyncExternalStore, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

const DESKTOP = "(min-width: 768px)";

function subscribeDesktop(onChange: () => void) {
  const query = window.matchMedia(DESKTOP);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

interface ParallaxProps {
  children?: ReactNode;
  // Total drift across the element's pass through the viewport, in px (kept within ±40).
  range?: number;
  className?: string;
}

// Background-layer drift tied to scroll. Desktop only, off under reduced motion, never for text.
export default function Parallax({ children, range = 40, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const desktop = useSyncExternalStore(subscribeDesktop, () => window.matchMedia(DESKTOP).matches, () => false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const half = Math.min(Math.abs(range), 40) / 2;
  const y = useTransform(scrollYProgress, [0, 1], [half, -half]);

  return (
    <motion.div ref={ref} className={className} style={desktop && !reduced ? { y } : undefined} aria-hidden="true">
      {children}
    </motion.div>
  );
}
