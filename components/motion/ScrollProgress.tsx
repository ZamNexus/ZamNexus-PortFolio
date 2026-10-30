"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";

// A thin line along the top of the window that fills as the page is read.
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduced = useReducedMotion();
  const smooth = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX: reduced ? scrollYProgress : smooth }} aria-hidden="true" />;
}
