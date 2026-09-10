import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — ZamNexus | AI, Cloud, Automation & Enterprise Technology",
  description:
    "Technology expertise to build what's next. AI strategy, SaaS development, cloud-native engineering, intelligent automation, Microsoft Dynamics 365 and Salesforce solutions.",
  openGraph: {
    title: "Services — ZamNexus",
    description:
      "AI, SaaS, cloud engineering, automation, Microsoft and Salesforce services — designed around your business.",
    type: "website",
    siteName: "ZamNexus",
  },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
