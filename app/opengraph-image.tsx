import { ogImage, ogSize } from "@/lib/ogImage";

export const alt = "ZamNexus: business platforms and enterprise software engineering";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Enterprise software · ZamNexus", title: "Software that runs your operations, and the engineers who build the rest." });
}
