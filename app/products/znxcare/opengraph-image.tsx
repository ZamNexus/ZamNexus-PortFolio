import { ogImage, ogSize } from "@/lib/ogImage";

export const alt = "ZNXCare hospital management and EHR";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "ZNXCare · Hospital management & EHR", title: "The right patient record, in front of the right clinician.", accent: "#2DD4BF" });
}
