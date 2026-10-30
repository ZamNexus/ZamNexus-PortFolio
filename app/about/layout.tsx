import type { Metadata } from "next";
import { pageMetadata, jsonLd, breadcrumbs } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About ZamNexus | Business Platforms & Engineering",
  description:
    "ZamNexus Limited has teams in the UK and Pakistan building business platforms and enterprise software.",
  path: "/about",
});

const structuredData = [
  breadcrumbs([{ name: "Home", path: "/" }, { name: "About", path: "/about" }]),
];

export default function AboutLayout({
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
