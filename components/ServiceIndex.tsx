"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

interface ServiceIndexProps {
  items: { id: string; name: string }[];
  label?: string;
}

// Sticky table of contents for the services page (desktop). A highlight slides to the service
// being read, each entry fills a thin line as that service is read, and finished ones get a tick.
// Every entry is a plain anchor, so it works without JavaScript too.
export default function ServiceIndex({ items, label = "Services on this page" }: ServiceIndexProps) {
  const [active, setActive] = useState(0);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    // A section counts as "being read" once it crosses the band 40–55% down the window.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(sections.indexOf(entry.target as HTMLElement));
        }
      },
      { rootMargin: "-40% 0px -45% 0px" }
    );
    sections.forEach((s) => observer.observe(s));

    // Reading progress per section: how far the middle of the window has travelled through it.
    // Written straight to CSS variables, so scrolling never re-renders React.
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight * 0.5;
      sections.forEach((section, i) => {
        const link = linkRefs.current[i];
        if (!link) return;
        const box = section.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (mid - box.top) / box.height));
        link.style.setProperty("--read", p.toFixed(3));
        link.dataset.done = p >= 0.98 ? "true" : "false";
      });
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items]);

  return (
    <nav aria-label={label} className="service-index" style={{ "--active": active } as CSSProperties}>
      <span className="service-index__marker" aria-hidden="true" />
      <ul>
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              ref={(el) => {
                linkRefs.current[i] = el;
              }}
              href={`#${item.id}`}
              aria-current={i === active ? "location" : undefined}
              className="service-index__link"
            >
              <span className="service-index__name">{item.name}</span>
              <svg className="service-index__tick" viewBox="0 0 20 20" aria-hidden="true">
                <path d="M4 10.5l4 4 8-9" />
              </svg>
              <span className="service-index__read" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
