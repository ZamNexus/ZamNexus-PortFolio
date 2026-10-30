import type { Metadata } from "next";
import { pageMetadata, jsonLd, breadcrumbs } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact ZamNexus | Book a Consultation or Demo",
  description:
    "Tell us about your project or request a product demo. A senior engineer replies within one business day. Offices in Luton, UK and Islamabad, Pakistan.",
  path: "/contact",
});

const structuredData = [
  breadcrumbs([{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]),
];

export default function ContactLayout({
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
