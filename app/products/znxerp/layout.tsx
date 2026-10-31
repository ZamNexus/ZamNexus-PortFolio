import type { Metadata } from "next";
import { pageMetadata, jsonLd, breadcrumbs, faqPage, SITE_URL } from "@/lib/seo";
import { productFaqs } from "@/lib/productFaqs";

export const metadata: Metadata = pageMetadata({
  title: "ZNXERP | ERP for Manufacturing & Pharmaceutical Plants",
  description:
    "One ERP for finance, production, inventory, procurement, HR and quality control, built for manufacturers and pharma plants. Request a ZNXERP demo.",
  path: "/products/znxerp",
});

const structuredData = [
  breadcrumbs([{ name: "Home", path: "/" }, { name: "Products", path: "/products" }, { name: "ZNXERP", path: "/products/znxerp" }]),
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ZNXERP",
    description: "Enterprise resource planning for manufacturers, pharmaceutical plants and distributors.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${SITE_URL}/products/znxerp`,
    publisher: { "@id": `${SITE_URL}/#organization` },
  },
  faqPage(productFaqs.znxerp),
];

export default function ZNXERPLayout({
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
