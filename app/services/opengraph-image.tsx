import { ogImage, ogSize } from "@/lib/ogImage";

export const alt = "ZamNexus engineering services";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({ eyebrow: "Services", title: "Engineering services for systems that can't fail.", subtitle: "AI & automation · SaaS · Cloud · Integration · Dynamics 365 · Salesforce" });
}
