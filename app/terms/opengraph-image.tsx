import { ogImage, ogSize } from "@/lib/ogImage";

export const alt = "ZamNexus: Terms of Service";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Legal", title: "Terms of Service" });
}
