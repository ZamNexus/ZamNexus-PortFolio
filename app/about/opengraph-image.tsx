import { ogImage, ogSize } from "@/lib/ogImage";

export const alt = "ZamNexus: About ZamNexus, a Zamooq Limited company.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "About", title: "About ZamNexus, a Zamooq Limited company." });
}
