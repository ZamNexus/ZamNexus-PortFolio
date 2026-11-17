import type { Metadata } from "next";
import Link from "next/link";
import ArticlesTable from "@/components/admin/ArticlesTable";
import { IconPlus } from "@/components/admin/icons";
import { listCategories } from "@/lib/cms/repository";

export const metadata: Metadata = { title: "Articles" };

export default async function ArticlesPage() {
  const categories = await listCategories();
  return (
    <>
      <div className="adm-head">
        <div>
          <h1 className="adm-title">Articles</h1>
          <p className="adm-sub">Create, edit, publish and remove the articles shown on the Insights page.</p>
        </div>
        <div className="adm-actions">
          <Link href="/admin/articles/create" className="adm-btn adm-btn--primary">
            <IconPlus /> Create article
          </Link>
        </div>
      </div>
      <ArticlesTable categories={categories.map((c) => ({ id: c.id, label: c.label }))} />
    </>
  );
}
