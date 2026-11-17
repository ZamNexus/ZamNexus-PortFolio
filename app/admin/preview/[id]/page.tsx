import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CmsArticleView from "@/components/cms/CmsArticleView";
import ArticleClientView from "@/app/insights/[slug]/ArticleClientView";
import StatusBadge from "@/components/admin/StatusBadge";
import { requireAdminPage } from "@/lib/auth/guard";
import { getArticleView, getRelatedInsights, toBlueprint } from "@/lib/cms/public";
import { effectiveStatus } from "@/lib/cms/repository";

export const metadata: Metadata = { title: "Preview" };
export const dynamic = "force-dynamic";

// The article exactly as visitors will see it, whatever its status. Only administrators can open it; drafts and
// unpublished articles are never reachable from the public site.
export default async function PreviewPage({ params }: { params: Promise<{ id: string }> }) {
  await requireAdminPage();
  const found = await getArticleView((await params).id);
  if (!found) notFound();
  const { article, view } = found;
  const related = await getRelatedInsights(article.slug, 2);
  const status = effectiveStatus(article);

  const banner = (
    <div className="adm-preview-bar" style={{ position: "relative", top: 0, marginTop: 0 }}>
      <span style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
        <b>Preview</b> <StatusBadge status={status} />
        {status === "published" ? "This is what visitors see." : "Not public: visitors cannot open this article yet."}
      </span>
      <Link href={`/admin/articles/edit/${article.id}`}>← Back to the editor</Link>
    </div>
  );

  const blueprint = toBlueprint(article, view);
  return (
    <>
      {banner}
      {blueprint ? (
        <ArticleClientView article={blueprint} related={related} coverImage={article.coverImage} />
      ) : (
        <CmsArticleView article={article} view={view} related={related} />
      )}
    </>
  );
}
