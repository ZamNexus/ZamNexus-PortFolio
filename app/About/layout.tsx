import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us — ZamNexus | A Technology Brand of Zamooq Limited",
  description:
    "ZamNexus is the technology and digital solutions brand of Zamooq Limited, established in 2009. 15+ years of enterprise experience across AI, SaaS, cloud engineering and business applications.",
  openGraph: {
    title: "About ZamNexus",
    description:
      "Connecting Intelligence. Enabling Action. Learn about ZamNexus, our heritage and our approach to technology.",
    type: "website",
    siteName: "ZamNexus",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
