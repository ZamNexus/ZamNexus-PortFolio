import { ogImage, ogSize } from "@/lib/ogImage";

export const alt = "ZamNexus: Engineering insights from the systems we build.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Insights", title: "Engineering insights from the systems we build." });
}
