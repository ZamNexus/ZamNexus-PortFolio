"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductScene from "@/components/ProductScene";
import { products } from "@/lib/catalog";

interface Pitch {
  hook: string;
  story: string;
}

// The creative line and the short story for each platform. The facts restate the outcomes in lib/catalog.ts.
const pitches: Record<string, Pitch> = {
  znxerp: {
    hook: "Every batch, from goods-in to dispatch, on one thread.",
    story:
      "Most plants run on spreadsheets stitched to a ledger. ZNXERP replaces the stitching: a delivery lands, QC holds it, production draws it down, and finance sees the cost the moment it moves.",
  },
  znxepos: {
    hook: "The till that never stops selling.",
    story:
      "A dropped connection should not cost you a Saturday. Every branch keeps trading offline and syncs quietly afterwards, so the stock head office sees is the stock on the shelf.",
  },
  znxedu: {
    hook: "Fewer chasing calls. More time for teaching.",
    story:
      "Fees reconcile with the bank by themselves, timetables stop clashing, and parents hear about arrival as it happens, so the school office stops being a switchboard.",
  },
  znxcare: {
    hook: "One record that follows the patient.",
    story:
      "From registration to pharmacy it is the same chart. Lab results land in it on their own and every dispensed item is barcode-checked, so clinicians spend their time with patients, not screens.",
  },
};

interface RowProps {
  index: number;
  product: (typeof products)[number];
}

// One platform per row. Rows alternate: text left with the animation right, then the reverse.
// Each side slides in from its own edge the first time the row scrolls into view.
function StageRow({ index, product }: RowProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);
  const flip = index % 2 === 1;
  const pitch = pitches[product.slug];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={ref}
      data-flip={flip}
      data-seen={seen}
      className="stage-row"
      style={{ "--rail": product.accent } as CSSProperties}
    >
      <div className="stage-row__copy">
        <p className="stage-row__eyebrow">
          <span>{String(index + 1).padStart(2, "0")}</span>
          {product.sector}
        </p>
        <Image
          src={product.logo}
          alt={product.code}
          width={165}
          height={56}
          className="logo-dark mt-5 h-14 w-auto object-contain"
        />
        <Image
          src={product.logo.replace(".png", "-light.png")}
          alt=""
          aria-hidden="true"
          width={165}
          height={56}
          className="logo-light mt-5 h-14 w-auto object-contain"
        />
        <h3 className="mt-6 font-heading text-3xl sm:text-4xl font-bold leading-[1.08] tracking-[-0.025em] text-foreground-strong text-balance">
          {pitch.hook}
        </h3>
        <p className="mt-4 text-foreground-muted leading-relaxed max-w-[48ch]">{pitch.story}</p>
        <ul className="stage-row__outcomes">
          {product.outcomes.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
        <Link href={`/products/${product.slug}`} className="stage-row__link">
          See {product.code}
        </Link>
      </div>

      <div className="stage-row__visual" aria-hidden="true">
        <ProductScene slug={product.slug} />
        <p className="stage-row__caption">
          <span />
          {product.code}: {product.category}
        </p>
      </div>
    </article>
  );
}

export default function ProductStage() {
  return (
    <div className="stage-rows">
      {products.map((p, i) => (
        <StageRow key={p.slug} index={i} product={p} />
      ))}
    </div>
  );
}
