import { redirect } from "next/navigation";

/**
 * /Work is a legacy route — permanently redirected to /Solutions.
 * This keeps old bookmarks and any external links from breaking.
 */
export default function WorkRedirect() {
  redirect("/Solutions");
}
