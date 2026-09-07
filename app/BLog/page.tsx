import { redirect } from "next/navigation";

/**
 * /BLog is a legacy route — permanently redirected to /Insights.
 */
export default function BlogRedirect() {
  redirect("/Insights");
}
