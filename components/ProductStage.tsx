"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductScene from "@/components/ProductScene";
import { products } from "@/lib/catalog";

// Homepage products: on desktop the product nearest the middle of the window takes the sticky
// stage beside the list, and its scene plays there in its colour. On phones each product carries
// its own scene inline. Every product is a plain link either way.
export default function ProductStage() {
  const [active, setActive] = useState(0);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDistance = Infinity;
      itemRefs.current.forEach((el, i) => {
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

  const current = products[active];

  return (
    <div className="stage" style={{ "--rail": current.accent } as CSSProperties}>
      <ol className="stage__list">
        {products.map((p, i) => (
          <li
            key={p.slug}
            ref={(el) => {
              itemRefs.current[i] = el;
            }}
            data-active={i === active}
            className="stage__item"
            style={{ "--rail": p.accent } as CSSProperties}
          >
            <Image src={p.logo} alt={p.code} width={130} height={40} className="h-7 w-auto object-contain" />
            <h3 className="mt-5 font-heading text-3xl sm:text-4xl font-bold tracking-tight text-foreground-strong">{p.category}</h3>
            <p className="mt-3 text-foreground-muted leading-relaxed max-w-[46ch]">{p.purpose}</p>
            <ul className="stage__outcomes">
              {p.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
            <Link href={`/products/${p.slug}`} className="stage__link">
              See {p.code}
            </Link>
            <div className="stage__inline">
              <ProductScene slug={p.slug} />
            </div>
          </li>
        ))}
      </ol>

      <div className="stage__sticky" aria-hidden="true">
        <div key={current.slug} className="stage__scene">
          <ProductScene slug={current.slug} />
          <p className="stage__caption">
            <span className="stage__dot" />
            {current.code}: {current.sector}
          </p>
        </div>
        <div className="stage__pips">
          {products.map((p, i) => (
            <span key={p.slug} data-active={i === active} />
          ))}
        </div>
      </div>
    </div>
  );
}
