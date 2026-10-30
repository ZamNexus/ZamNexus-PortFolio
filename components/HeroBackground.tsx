"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

// three.js loads only in the browser, after the page is interactive, and only from 768px wide.
const Nexus3DBackground = dynamic(() => import("@/components/Nexus3DBackground"), { ssr: false });

const WIDE = "(min-width: 768px)";

function subscribeWide(onChange: () => void) {
  const query = window.matchMedia(WIDE);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

// The particle network behind the homepage hero. It answers the pointer and fades out over the
// first 600px of scrolling, so it frames the headline and never competes with the system map.
export default function HeroBackground() {
  const wide = useSyncExternalStore(subscribeWide, () => window.matchMedia(WIDE).matches, () => false);
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 600], [1, 0]);

  if (!wide) return null;

  return (
    <motion.div className="hero-network" style={reduced ? undefined : { opacity }} aria-hidden="true">
      <Nexus3DBackground />
    </motion.div>
  );
}
