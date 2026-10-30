import { ogImage, ogSize } from "@/lib/ogImage";

export const alt = "ZamNexus product suite";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Products", title: "Four platforms, built for the way your sector works.", subtitle: "ZNXERP · ZNXePOS · ZNXEdu · ZNXCare" });
}
