import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — ZamNexus | Zamooq Limited",
  description:
    "Official Privacy Policy of ZamNexus (a technology brand of Zamooq Limited). Outlining our data protection practices, lawful bases under UK GDPR and DPA 2018, and your legal rights.",
  openGraph: {
    title: "Privacy Policy — ZamNexus",
    description:
      "Data protection practices, lawful bases under UK GDPR and DPA 2018, and privacy rights across ZamNexus platforms and software products.",
    type: "website",
    siteName: "ZamNexus",
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
