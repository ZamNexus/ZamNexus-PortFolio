import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Platforms — ZamNexus | Microsoft Dynamics 365, Power Platform & Salesforce",
  description:
    "ZamNexus delivers Microsoft Dynamics 365, Power Platform, Azure and Salesforce solutions. Consulting, architecture, implementation and AI enablement for enterprise business platforms.",
  openGraph: {
    title: "Platforms — ZamNexus",
    description:
      "Microsoft and Salesforce platform expertise: Dynamics 365, Power Platform, Azure, Copilot, Sales Cloud, Service Cloud.",
    type: "website",
    siteName: "ZamNexus",
  },
};

export default function PlatformsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
