"use client";

import { createElement, type CSSProperties, type PointerEvent, type ReactNode } from "react";

interface SpotlightProps {
  children: ReactNode;
  as?: "article" | "div";
  className?: string;
  style?: CSSProperties;
}

// A soft light that follows the pointer across an item (styled by .spotlight in globals.css).
// Writes CSS variables straight to the element, so moving the mouse never re-renders React.
export default function Spotlight({ children, as = "article", className = "", style }: SpotlightProps) {
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - box.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - box.top}px`);
  };
  return createElement(as, { className: `spotlight ${className}`, style, onPointerMove }, children);
}
