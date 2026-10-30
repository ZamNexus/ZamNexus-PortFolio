"use client";

import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from "framer-motion";

interface ProcessTimelineProps {
  steps: { name: string; text: string }[];
}

// A sequence told in order: the line fills as the reader scrolls through it, and each step
// lights when the line reaches it. Rendered fully lit on the server and under reduced motion.
export default function ProcessTimeline({ steps }: ProcessTimelineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 55%"] });
  const [lit, setLit] = useState(steps.length);
  const last = steps.length - 1;

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setLit(Math.floor(p * last + 0.05) + 1);
  });

  return (
    <div ref={ref} className="process">
      <span className="process__rail" aria-hidden="true">
        <motion.span className="process__fill" style={reduced ? undefined : { scaleY: scrollYProgress }} />
      </span>
      <ol className="process__list">
        {steps.map((step, i) => (
          <li key={step.name} className="process__step" data-lit={reduced || i < lit ? "true" : "false"}>
            <span className="process__dot" aria-hidden="true">
              {i + 1}
            </span>
            <h3 className="process__name">{step.name}</h3>
            <p className="process__text">{step.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
