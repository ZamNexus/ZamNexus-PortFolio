import InsightsIndex from "./InsightsIndex";
import { jsonLd, breadcrumbs } from "@/lib/seo";

// Server page: publishes the breadcrumb structured data, then the interactive index.
export default function InsightsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs([{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }])) }} />
      <InsightsIndex />
    </>
  );
}
