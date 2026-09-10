import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ZNXERP — Enterprise Resource Planning | ZamNexus",
  description:
    "ZNXERP unifies finance, HR, procurement, inventory, production, sales and quality control on one intelligent platform. Trusted by Grays Pharmaceutical, Khyber Textile Mills and more.",
  openGraph: {
    title: "ZNXERP — Enterprise Resource Planning | ZamNexus",
    description: "Run every part of your business on one intelligent platform.",
    type: "website",
    siteName: "ZamNexus",
  },
};

export default function ZNXERPLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
