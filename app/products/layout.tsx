import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Business Software Platforms: ERP, POS, School & Hospital",
  description:
    "ZNXERP, ZNXePOS, ZNXEdu and ZNXCare: four platforms for manufacturing, retail, education and healthcare. Compare them and request a demo.",
  path: "/products",
});

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
