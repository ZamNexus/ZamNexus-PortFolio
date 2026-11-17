import type { Metadata } from "next";
import ArticleEditor from "@/components/admin/ArticleEditor";
import { listCategories } from "@/lib/cms/repository";

export const metadata: Metadata = { title: "Create article" };

export default async function CreateArticlePage() {
  const categories = await listCategories();
  return <ArticleEditor mode="create" categories={categories.map((c) => ({ id: c.id, label: c.label }))} />;
}
