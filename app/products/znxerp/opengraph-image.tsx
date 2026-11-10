import { ogImage, ogSize } from "@/lib/ogImage";

export const alt = "ZNXERP enterprise resource planning";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "ZNXERP · Enterprise resource planning", title: "Run your whole plant on one system, from gate to general ledger.", accent: "#2DD4BF" });
}
