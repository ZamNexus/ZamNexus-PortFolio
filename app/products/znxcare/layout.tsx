import type { Metadata } from "next";
import { pageMetadata, jsonLd, breadcrumbs, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "ZNXCare | Hospital Management & EHR Software",
  description:
    "Patient records, emergency triage, HL7 lab integration, pharmacy dispensing and insurance claims in one system for hospitals and clinics. Request a demo.",
  path: "/products/znxcare",
});

const structuredData = [
  breadcrumbs([{ name: "Home", path: "/" }, { name: "Products", path: "/products" }, { name: "ZNXCare", path: "/products/znxcare" }]),
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ZNXCare",
    description: "Hospital management and electronic health records for hospitals, clinics and diagnostic labs.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${SITE_URL}/products/znxcare`,
    publisher: { "@id": `${SITE_URL}/#organization` },
  },
];

export default function ZNXCareLayout({
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
