import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZNXePOS — Cloud & Offline Retail POS Engine | ZamNexus",
  description:
    "ZNXePOS powers 750+ retail stores and wholesale distributors with sub-second barcode checkout, multi-branch inventory sync, offline resilience, and built-in ledgers.",
  openGraph: {
    title: "ZNXePOS — Cloud & Offline Retail POS Engine | ZamNexus",
    description: "Sub-second checkout speed with total multi-branch inventory control.",
    type: "website",
    siteName: "ZamNexus",
  },
};

export default function ZNXePOSLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
