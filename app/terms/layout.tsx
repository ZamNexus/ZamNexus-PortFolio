import type { Metadata } from "next";
import { pageMetadata, jsonLd, breadcrumbs } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Service | ZamNexus",
  description:
    "The terms that govern use of the ZamNexus website, software products and services provided by Zamooq Limited, under the laws of England and Wales.",
  path: "/terms",
});

const structuredData = [
  breadcrumbs([{ name: "Home", path: "/" }, { name: "Terms of Service", path: "/terms" }]),
];

export default function TermsLayout({
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
