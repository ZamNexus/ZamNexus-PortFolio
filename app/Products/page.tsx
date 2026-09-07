import { redirect } from "next/navigation";

/**
 * /Products is a legacy route — permanently redirected to /Platforms.
 */
export default function ProductsRedirect() {
  redirect("/Platforms");
}
