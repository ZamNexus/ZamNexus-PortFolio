import InsightsIndex from "./InsightsIndex";
import { getPublishedInsights } from "@/lib/cms/public";
import { jsonLd, breadcrumbs } from "@/lib/seo";

// Refresh at least every five minutes (so an article scheduled for later appears on time); publishing, editing,
// unpublishing or deleting in the admin panel refreshes it straight away.
export const revalidate = 300;

// Server page: reads the published articles from the content store, publishes the breadcrumb structured data,
// then hands the articles to the interactive index.
export default async function InsightsPage() {
  const { articles, categories } = await getPublishedInsights();
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbs([{ name: "Home", path: "/" }, { name: "Insights", path: "/insights" }])) }} />
      <InsightsIndex articles={articles} categories={categories} />
    </>
  );
}
