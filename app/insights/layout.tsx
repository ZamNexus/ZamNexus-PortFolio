import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Engineering Insights | ZamNexus",
  description:
    "Practical engineering articles: offline-first retail, real-time ERP ledgers, AI agents with guardrails, hospital lab integration and legacy modernisation.",
  path: "/insights",
});

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
