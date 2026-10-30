import { ogImage, ogSize } from "@/lib/ogImage";

export const alt = "ZamNexus: About ZamNexus Limited.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "About", title: "About ZamNexus Limited." });
}
