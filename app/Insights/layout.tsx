import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Insights & Engineering Architecture — ZamNexus",
  description:
    "In-depth research, architectural blueprints, and technology perspectives on agentic AI, zero-downtime retail mesh, industrial ERP formulation, and clinical health records.",
  openGraph: {
    title: "Insights & Engineering Architecture — ZamNexus",
    description:
      "Research, blueprints, and engineering perspectives from the ZamNexus team.",
    type: "website",
    siteName: "ZamNexus",
  },
};

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
