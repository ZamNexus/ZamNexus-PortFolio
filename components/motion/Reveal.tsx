"use client";

import { createElement, useEffect, useState, type CSSProperties, type ReactNode } from "react";

type RevealTag = "div" | "section" | "ul" | "ol" | "dl" | "article" | "p" | "header";

interface RevealProps {
  children: ReactNode;
  as?: RevealTag;
  // "rise": the element fades and rises. "group": its children do, one after another
  // (see [data-reveal="group"] in globals.css). "fade": opacity only. "draw": nothing moves
  // by itself; descendants style off the state (the system map draws its line). "words": a
  // SplitWords heading rises word by word, then any .reveal-sub follows.
  variant?: "rise" | "group" | "fade" | "draw" | "words";
  // Replay each time the element re-enters the viewport, or reveal once.
  replay?: boolean;
  delay?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
  "aria-labelledby"?: string;
}

// Scroll reveal that never hides content by default. The server renders it visible; only after
// mount does an element outside the viewport get data-state="out", and it turns "in" as it enters.
// No JavaScript, no IntersectionObserver or reduced motion: the attribute is never set, so it stays visible.
export default function Reveal({ children, as = "div", variant = "rise", replay = true, delay, className, style, ...rest }: RevealProps) {
  const [el, setEl] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!el || !("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.dataset.state = "in";
          if (!replay) observer.disconnect();
        } else if (replay || el.dataset.state !== "in") {
          el.dataset.state = "out";
        }
      },
      { rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [el, replay]);

  return createElement(
    as,
    {
      ref: setEl,
      "data-reveal": variant,
      className,
      style: delay ? { ...style, "--reveal-delay": `${delay}ms` } : style,
      ...rest,
    },
    children
  );
}
