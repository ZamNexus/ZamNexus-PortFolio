import { ogImage, ogSize } from "@/lib/ogImage";

export const alt = "ZamNexus: Tell us what you need.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Contact", title: "Tell us what you need." });
}
