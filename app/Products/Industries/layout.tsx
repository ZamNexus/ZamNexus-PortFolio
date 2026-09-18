import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industries — ZamNexus | Technology Solutions by Sector",
  description:
    "ZamNexus serves Financial Services, Professional Services, Property, Public Sector, Education, Healthcare, Retail and Technology & SaaS with AI, cloud and enterprise platform solutions.",
  openGraph: {
    title: "Industries — ZamNexus",
    description:
      "Intelligent technology solutions tailored to your industry — from financial services to healthcare, education to retail.",
    type: "website",
    siteName: "ZamNexus",
  },
};

export default function IndustriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
