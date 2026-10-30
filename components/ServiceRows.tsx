"use client";

import { useState, type PointerEvent } from "react";
import Link from "next/link";
import ServiceDiagram from "@/components/ServiceDiagram";
import Stagger from "@/components/motion/Stagger";
import { services } from "@/lib/catalog";

// Homepage services list. On desktop, hovering a service brings up its diagram in a card that
// follows the pointer, so the list previews what each service does. Pointer position is written
// to CSS variables, so moving the mouse never re-renders React. Touch and keyboard users get the
// plain list; the preview is decoration (aria-hidden).
export default function ServiceRows() {
  const [hovered, setHovered] = useState<string | null>(null);

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--px", `${e.clientX - box.left}px`);
    e.currentTarget.style.setProperty("--py", `${e.clientY - box.top}px`);
  };

  return (
    <div className="service-rows" onPointerMove={onPointerMove} onPointerLeave={() => setHovered(null)}>
      <Stagger as="ul" className="grid grid-cols-1 md:grid-cols-2 gap-x-12 border-t border-[var(--border-subtle)]">
        {services.map((s) => (
          <li key={s.id} className="service-item" onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(s.id)}>
            <Link href={`/services#${s.id}`} className="service-row">
              <span className="service-row__name text-lg font-semibold text-foreground-strong">{s.name}</span>
              <span className="text-foreground-muted">{s.short}</span>
            </Link>
          </li>
        ))}
      </Stagger>
      <div className="service-preview" data-visible={hovered !== null} aria-hidden="true">
        {hovered ? (
          <div key={hovered} className="dg-play">
            <ServiceDiagram id={hovered} instance="home" />
          </div>
        ) : null}
      </div>
    </div>
  );
}
