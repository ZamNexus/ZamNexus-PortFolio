"use client";

import type { CSSProperties, PointerEvent, ReactNode } from "react";

interface SpotlightProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

// A soft light that follows the pointer across an item (styled by .spotlight in globals.css).
// Writes CSS variables straight to the element, so moving the mouse never re-renders React.
export default function Spotlight({ children, className = "", style }: SpotlightProps) {
  const onPointerMove = (e: PointerEvent<HTMLElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - box.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - box.top}px`);
  };
  return (
    <article className={`spotlight ${className}`} style={style} onPointerMove={onPointerMove}>
      {children}
    </article>
  );
}
