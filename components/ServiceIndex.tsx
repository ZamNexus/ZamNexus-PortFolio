"use client";

import { useEffect, useState, type CSSProperties } from "react";

interface ServiceIndexProps {
  items: { id: string; name: string }[];
}

// Sticky table of contents for the services page (desktop). A highlight slides to the
// service being read; every entry is a plain anchor, so it works without JavaScript too.
export default function ServiceIndex({ items }: ServiceIndexProps) {
  const [active, setActive] = useState(0);

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
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="Services on this page" className="service-index" style={{ "--active": active } as CSSProperties}>
      <span className="service-index__marker" aria-hidden="true" />
      <ul>
        {items.map((item, i) => (
          <li key={item.id}>
            <a href={`#${item.id}`} aria-current={i === active ? "location" : undefined} className="service-index__link">
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
