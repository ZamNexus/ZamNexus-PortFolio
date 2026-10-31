import type { Metadata } from "next";

export const SITE_URL = "https://zamnexus.com";
export const SITE_NAME = "ZamNexus";

interface PageMeta {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
}

// Title, description, self-referencing canonical and social tags for one page.
// Social images come from the nearest opengraph-image.tsx file.
export function pageMetadata({ title, description, path, type = "website" }: PageMeta): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: SITE_NAME, type, locale: "en_GB" },
    twitter: { card: "summary_large_image", title, description },
  };
}

// Serialises JSON-LD for a <script type="application/ld+json"> tag; escapes "<" so content can't close the tag.
export function jsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function breadcrumbs(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

// FAQPage structured data from question and answer pairs.
export function faqPage(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}
