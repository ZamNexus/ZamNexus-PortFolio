import type { Metadata } from "next";
import { pageMetadata, jsonLd, breadcrumbs, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "ZNXePOS | Multi-Branch Retail POS That Works Offline",
  description:
    "Fast barcode checkout that keeps trading when the internet drops, with live stock across every branch and built-in wholesale ledgers. Request a demo.",
  path: "/products/znxepos",
});

const structuredData = [
  breadcrumbs([{ name: "Home", path: "/" }, { name: "Products", path: "/products" }, { name: "ZNXePOS", path: "/products/znxepos" }]),
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ZNXePOS",
    description: "Offline-first point of sale with multi-branch stock control for retailers and wholesalers.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${SITE_URL}/products/znxepos`,
    publisher: { "@id": `${SITE_URL}/#organization` },
  },
];

export default function ZNXePOSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(structuredData) }} />
      {children}
    </>
  );
}
