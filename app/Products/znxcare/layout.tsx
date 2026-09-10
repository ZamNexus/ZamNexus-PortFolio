import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZNXCare — Hospital & Electronic Health Records (EHR) | ZamNexus",
  description:
    "ZNXCare unifies hospital operations, electronic medical records, HL7 laboratory machines, pharmacy dispensing, and insurance claims into one real-time platform.",
  openGraph: {
    title: "ZNXCare — Hospital & Electronic Health Records (EHR) | ZamNexus",
    description: "The right clinical data, for the right medical decision, at the exact right second.",
    type: "website",
    siteName: "ZamNexus",
  },
};

export default function ZNXCareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
