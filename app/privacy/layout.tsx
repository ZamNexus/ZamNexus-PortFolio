import type { Metadata } from "next";
import { pageMetadata, jsonLd, breadcrumbs } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy Policy | ZamNexus",
  description:
    "How ZamNexus and Zamooq Limited collect, use and protect personal data under UK GDPR and the Data Protection Act 2018, and your rights.",
  path: "/privacy",
});

const structuredData = [
  breadcrumbs([{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy" }]),
];

export default function PrivacyLayout({
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
