import type { Metadata } from "next";
import { pageMetadata, jsonLd, breadcrumbs } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Software Engineering Services | AI, Cloud, Dynamics 365",
  description:
    "AI and automation, SaaS development, cloud-native engineering, systems integration, Microsoft Dynamics 365 and Salesforce. Senior teams, fixed milestones.",
  path: "/services",
});

const structuredData = [
  breadcrumbs([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }]),
];

export default function ServicesLayout({
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
