import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ArticleEditor from "@/components/admin/ArticleEditor";
import { getArticle, listCategories } from "@/lib/cms/repository";

export const metadata: Metadata = { title: "Edit article" };

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [article, categories] = await Promise.all([getArticle(id), listCategories()]);
  if (!article) notFound();
  return <ArticleEditor key={article.id} mode="edit" article={article} categories={categories.map((c) => ({ id: c.id, label: c.label }))} />;
}
