"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import SectionHeader from "@/components/SectionHeader";

export interface WalkStep {
  code: string;
  name: string;
  detail: string;
}

interface WalkthroughProps {
  headingId: string;
  title: string;
  intro: string;
  steps: WalkStep[];
}

// A sequence read one step at a time. On desktop a sticky rail tracks the step being read and
// fills as you go; each stop on it jumps to its step. On phones the steps simply stack. Content is
// complete without JavaScript. Used for product event flows and article pipelines.
export default function Walkthrough({ headingId, title, intro, steps }: WalkthroughProps) {
  const [active, setActive] = useState(0);
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  // The active step is the one whose centre is nearest the middle of the window.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDistance = Infinity;
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const box = el.getBoundingClientRect();
        const distance = Math.abs(box.top + box.height / 2 - mid);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      });
      setActive(best);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <SectionHeader id={headingId} title={title} intro={intro} />

      <div className="walk">
        <nav aria-label="Steps" className="walk__rail" style={{ "--p": active / Math.max(steps.length - 1, 1) } as CSSProperties}>
          <span className="walk__track" aria-hidden="true">
            <span />
          </span>
          <ol>
            {steps.map((step, i) => (
              <li key={step.code} data-state={i < active ? "done" : i === active ? "active" : "todo"}>
                <button
                  type="button"
                  className="walk__stop"
                  aria-current={i === active ? "step" : undefined}
                  onClick={() => stepRefs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" })}
                >
                  <span className="walk__code">{step.code}</span>
                  <span className="walk__name">{step.name}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <ol className="walk__steps">
          {steps.map((step, i) => (
            <li
              key={step.code}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              data-active={i === active}
              className="walk__step"
            >
              <p className="walk__count">
                Step {i + 1} of {steps.length}
              </p>
              <h3 className="walk__title">
                <span className="walk__chip">{step.code}</span>
                {step.name}
              </h3>
              <p className="walk__detail">{step.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
