"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type KeyboardEvent } from "react";
import Link from "next/link";
import { flows, products } from "@/lib/catalog";

const STEP_MS = 2600;

function subscribeReducedMotion(onChange: () => void) {
  const query = window.matchMedia("(prefers-reduced-motion: reduce)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// The homepage's interactive centrepiece: one real event traced through a platform's modules.
// It plays on its own while in view; any click or key press hands control to the visitor.
export default function SystemMap() {
  const [flowIdx, setFlowIdx] = useState(0);
  const [step, setStep] = useState(0);
  const [steered, setSteered] = useState(false);
  const [inView, setInView] = useState(false);
  const reducedMotion = useSyncExternalStore(subscribeReducedMotion, prefersReducedMotion, () => true);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const flow = flows[flowIdx];
  const product = products.find((p) => p.slug === flow.slug)!;
  const last = flow.steps.length - 1;
  const playing = inView && !steered && !reducedMotion;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Autoplay: walk the steps, then move on to the next sector.
  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => {
      if (step < last) setStep(step + 1);
      else {
        setFlowIdx((flowIdx + 1) % flows.length);
        setStep(0);
      }
    }, step === last ? STEP_MS * 1.6 : STEP_MS);
    return () => window.clearTimeout(id);
  }, [playing, step, last, flowIdx]);

  const chooseFlow = (i: number) => {
    setSteered(true);
    setFlowIdx(i);
    setStep(0);
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const delta = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (i + delta + flows.length) % flows.length;
    chooseFlow(next);
    tabRefs.current[next]?.focus();
  };

  const progress = last ? step / last : 0;

  return (
    <div
      ref={rootRef}
      className="system-map"
      style={{ "--signal": product.accent, "--progress": progress } as CSSProperties}
    >
      <div className="system-map__head">
        <div role="tablist" aria-label="Choose a sector" className="system-map__tabs">
          {flows.map((f, i) => (
            <button
              key={f.slug}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`map-tab-${f.slug}`}
              aria-selected={i === flowIdx}
              aria-controls="map-panel"
              tabIndex={i === flowIdx ? 0 : -1}
              onClick={() => chooseFlow(i)}
              onKeyDown={(e) => onTabKey(e, i)}
              className="system-map__tab"
            >
              {f.sector}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setSteered(!steered)}
          className="system-map__play"
          hidden={reducedMotion}
        >
          {steered ? "Play the walkthrough" : "Pause"}
        </button>
      </div>

      <div id="map-panel" role="tabpanel" aria-labelledby={`map-tab-${flow.slug}`} className="system-map__panel">
        <p className="system-map__event">
          <span className="system-map__product">{product.code}</span>
          {flow.event}
        </p>

        <div className="system-map__track">
          <span className="system-map__pulse" aria-hidden="true" />
          <ol className="system-map__stops">
            {flow.steps.map((s, i) => (
              <li key={s.code} className="system-map__stop" data-state={i < step ? "done" : i === step ? "active" : "next"}>
                <button
                  type="button"
                  onClick={() => {
                    setSteered(true);
                    setStep(i);
                  }}
                  aria-current={i === step ? "step" : undefined}
                  className="system-map__node"
                >
                  <span className="system-map__dot" aria-hidden="true" />
                  <span className="system-map__code">{s.code}</span>
                  <span className="system-map__name">{s.name}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>

        <div className="system-map__detail" aria-live="polite">
          <p key={`${flow.slug}-${step}`} className="system-map__detail-text">
            {flow.steps[step].detail}
          </p>
          <Link href={`/products/${flow.slug}`} className="system-map__link">
            How {product.code} runs this
          </Link>
        </div>
      </div>
    </div>
  );
}
