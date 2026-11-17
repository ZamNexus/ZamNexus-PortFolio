import type { Metadata } from "next";
import CategoriesManager from "@/components/admin/CategoriesManager";

export const metadata: Metadata = { title: "Categories" };

export default function CategoriesPage() {
  return (
    <>
      <div className="adm-head">
        <div>
          <h1 className="adm-title">Categories</h1>
          <p className="adm-sub">Topics that group articles. The filters on the public Insights page are built from the categories that have published articles.</p>
        </div>
      </div>
      <CategoriesManager />
    </>
  );
}
