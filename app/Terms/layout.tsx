import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service — ZamNexus | Zamooq Limited",
  description:
    "Official Terms of Service governing the use of ZamNexus enterprise products, software applications, and engineering consulting services provided by Zamooq Limited.",
  openGraph: {
    title: "Terms of Service — ZamNexus",
    description:
      "Enterprise software licensing, cloud architecture, acceptable use, and commercial terms governed by the laws of England and Wales.",
    type: "website",
    siteName: "ZamNexus",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
