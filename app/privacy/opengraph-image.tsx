import { ogImage, ogSize } from "@/lib/ogImage";

export const alt = "ZamNexus: Privacy Policy";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Legal", title: "Privacy Policy" });
}
