import { ogImage, ogSize } from "@/lib/ogImage";

export const alt = "ZNXEdu campus management system";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "ZNXEdu · Campus management", title: "One system for every campus, classroom and parent.", accent: "#8B5CF6" });
}
