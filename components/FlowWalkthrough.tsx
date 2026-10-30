"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import SectionHeader from "@/components/SectionHeader";
import { flows } from "@/lib/catalog";
import type { ProductSlug } from "@/lib/siteFacts";

interface FlowWalkthroughProps {
  slug: ProductSlug;
}

// One real event followed through every module it touches (lib/catalog.ts flows). On desktop a
// sticky rail tracks the step being read and fills as you go; each stop on it jumps to its step.
// On phones the steps simply stack. Content is complete without JavaScript.
export default function FlowWalkthrough({ slug }: FlowWalkthroughProps) {
  const flow = flows.find((f) => f.slug === slug);
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

  if (!flow) return null;
  const event = flow.event.charAt(0).toLowerCase() + flow.event.slice(1);
  const headingId = `${slug}-flow-heading`;

  return (
    <section aria-labelledby={headingId} className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 border-t border-zinc-800/60">
      <SectionHeader
        id={headingId}
        title={`What happens when ${event}.`}
        intro={`One event, followed through the ${flow.steps.length} modules it touches. Nothing is typed in twice.`}
      />

      <div className="walk">
        <nav aria-label="Steps" className="walk__rail" style={{ "--p": active / (flow.steps.length - 1) } as CSSProperties}>
          <span className="walk__track" aria-hidden="true">
            <span />
          </span>
          <ol>
            {flow.steps.map((step, i) => (
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
          {flow.steps.map((step, i) => (
            <li
              key={step.code}
              ref={(el) => {
                stepRefs.current[i] = el;
              }}
              data-active={i === active}
              className="walk__step"
            >
              <p className="walk__count">
                Step {i + 1} of {flow.steps.length}
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
    </section>
  );
}
