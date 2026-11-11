import { ogImage, ogSize } from "@/lib/ogImage";

export const alt = "ZNXePOS retail point of sale";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "ZNXePOS · Retail point of sale", title: "Checkout that never stops, and stock you can trust across every branch.", accent: "#2DD4BF" });
}
