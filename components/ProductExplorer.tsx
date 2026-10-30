"use client";

import { useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductScene from "@/components/ProductScene";
import { products } from "@/lib/catalog";

// Products hub centrepiece: choose a sector and its platform's scene plays beside what it does,
// in that product's colour. Until someone chooses, it moves through the four on a visible timer
// (its animationend advances), which hovering pauses and reduced motion removes.
export default function ProductExplorer() {
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const product = products[active];

  return (
    <div className="explorer explorer--products" style={{ "--rail": product.accent } as CSSProperties}>
      <div role="tablist" aria-label="Platforms by sector" className="explorer__tabs">
        {products.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            role="tab"
            id={`platform-tab-${p.slug}`}
            aria-selected={i === active}
            aria-controls="platform-panel"
            onClick={() => {
              setActive(i);
              setTouched(true);
            }}
            className="explorer__tab"
            style={{ "--rail": p.accent } as CSSProperties}
          >
            <span className="explorer__tab-name">
              <span className="explorer__swatch" aria-hidden="true" />
              {p.sector}
            </span>
            <span className="explorer__tab-short">
              {p.code}: {p.category}
            </span>
            {i === active && !touched ? (
              <span className="explorer__timer" aria-hidden="true" onAnimationEnd={() => setActive((active + 1) % products.length)} />
            ) : null}
          </button>
        ))}
      </div>

      <div id="platform-panel" role="tabpanel" aria-labelledby={`platform-tab-${product.slug}`} className="explorer__panel">
        <div key={product.slug} className="explorer__stage explorer__stage--product">
          <ProductScene slug={product.slug} />
          <div className="explorer__copy">
            <Image src={product.logo} alt={product.code} width={130} height={40} className="h-7 w-auto object-contain" />
            <p className="explorer__outcome">{product.purpose}</p>
            <ul className="explorer__points">
              {product.outcomes.map((o) => (
                <li key={o}>{o}</li>
              ))}
            </ul>
            <Link href={`/products/${product.slug}`} className="explorer__more">
              See {product.code}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
