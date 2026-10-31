import type { Metadata } from "next";
import { pageMetadata, jsonLd, breadcrumbs, faqPage, SITE_URL } from "@/lib/seo";
import { productFaqs } from "@/lib/productFaqs";

export const metadata: Metadata = pageMetadata({
  title: "ZNXEdu | School & Campus Management System",
  description:
    "Admissions, fee collection with bank reconciliation, biometric attendance, exams, timetables and a parent app in one system for schools and campuses.",
  path: "/products/znxedu",
});

const structuredData = [
  breadcrumbs([{ name: "Home", path: "/" }, { name: "Products", path: "/products" }, { name: "ZNXEdu", path: "/products/znxedu" }]),
  {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "ZNXEdu",
    description: "Campus management system for schools, colleges and multi-campus groups.",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${SITE_URL}/products/znxedu`,
    publisher: { "@id": `${SITE_URL}/#organization` },
  },
  faqPage(productFaqs.znxedu),
];

export default function ZNXEduLayout({
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
