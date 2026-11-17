"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import StatusBadge from "@/components/admin/StatusBadge";
import { ApiError, api } from "@/components/admin/api";
import { useToast } from "@/components/admin/Toaster";
import { IconEdit, IconExternal, IconEye, IconPlus, IconTrash } from "@/components/admin/icons";
import type { EffectiveStatus } from "@/lib/cms/types";

interface Row {
  id: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  effectiveStatus: EffectiveStatus;
  status: string;
  coverImage: string | null;
  isBlueprint: boolean;
  updatedAt: string;
}

interface Page {
  items: Row[];
  total: number;
  page: number;
  pages: number;
}

interface Props {
  categories: { id: string; label: string }[];
}

const PAGE_SIZE = 10;
const when = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });

export default function ArticlesTable({ categories }: Props) {
  const toast = useToast();
  const labels = new Map(categories.map((c) => [c.id, c.label]));

  const [search, setSearch] = useState("");
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [category, setCategory] = useState("all");
  const [page, setPage] = useState(1);
  const [data, setData] = useState<Page | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loadedKey, setLoadedKey] = useState<string | null>(null);
  const [reload, setReload] = useState(0);
  // A request is "loading" until the one for the current filters has answered.
  const key = `${q}|${status}|${category}|${page}|${reload}`;
  const loading = loadedKey !== key;
  const [working, setWorking] = useState<string | null>(null);
  const [toDelete, setToDelete] = useState<Row | null>(null);

  // Search waits for a pause in typing, and always returns to the first page.
  useEffect(() => {
    const t = window.setTimeout(() => {
      setQ(search.trim());
      setPage(1);
    }, 300);
    return () => window.clearTimeout(t);
  }, [search]);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({ q, status, category, page: String(page), pageSize: String(PAGE_SIZE) });
    fetch(`/api/admin/articles?${params}`, { credentials: "same-origin", cache: "no-store", signal: controller.signal })
      .then(async (res) => {
        if (res.status === 401) {
          // A full page load on purpose: signed out, so every cached client-side page must go.
          // eslint-disable-next-line @next/next/no-location-assign-relative-destination
          window.location.href = "/admin/login";
          return;
        }
        const json = await res.json();
        if (!res.ok) throw new ApiError(json.error ?? "Could not load articles.", res.status);
        setData(json as Page);
        setError(null);
        setLoadedKey(key);
      })
      .catch((e: unknown) => {
        if ((e as Error).name === "AbortError") return;
        setError(e instanceof ApiError ? e.message : "Network error. Check your connection and try again.");
        setLoadedKey(key);
      });
    return () => controller.abort();
  }, [key, q, status, category, page]);

  const refresh = () => setReload((n) => n + 1);

  const changeStatus = async (row: Row, action: "publish" | "unpublish") => {
    setWorking(row.id);
    try {
      await api(`/api/admin/articles/${row.id}/status`, { method: "POST", body: { action } });
      toast.success(action === "publish" ? `Published "${row.title}".` : `Unpublished "${row.title}". It is no longer public.`);
      refresh();
    } catch (e) {
      if (e instanceof ApiError && e.fields) {
        toast.error(`Not published: ${Object.values(e.fields)[0]} Open the article to fix it.`);
      } else {
        toast.error(e instanceof ApiError ? e.message : "That did not work. Nothing was changed.");
      }
    } finally {
      setWorking(null);
    }
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    setWorking(toDelete.id);
    try {
      await api(`/api/admin/articles/${toDelete.id}`, { method: "DELETE" });
      toast.success(`Deleted "${toDelete.title}".`);
      setToDelete(null);
      if (data && data.items.length === 1 && page > 1) setPage(page - 1);
      refresh();
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : "That did not work. The article was not deleted.");
    } finally {
      setWorking(null);
    }
  };

  const filtering = q !== "" || status !== "all" || category !== "all";
  const resetFilters = () => {
    setSearch("");
    setQ("");
    setStatus("all");
    setCategory("all");
    setPage(1);
  };

  return (
    <>
      <div className="adm-filters">
        <div className="adm-field">
          <label className="adm-label" htmlFor="f-search">Search</label>
          <input id="f-search" className="adm-input" type="search" placeholder="Title, slug, author or tag" value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <div className="adm-field">
          <label className="adm-label" htmlFor="f-status">Status</label>
          <select id="f-status" className="adm-select" value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="unpublished">Unpublished</option>
            <option value="scheduled">Scheduled</option>
          </select>
        </div>
        <div className="adm-field">
          <label className="adm-label" htmlFor="f-category">Category</label>
          <select id="f-category" className="adm-select" value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }}>
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {error && !loading ? (
        <div className="adm-alert" role="alert">
          <div style={{ flex: 1 }}>
            <b style={{ display: "block", marginBottom: 2 }}>The article list could not be loaded</b>
            {error}
          </div>
          <button type="button" className="adm-btn adm-btn--sm" onClick={refresh}>Try again</button>
        </div>
      ) : loading && !data ? (
        <div className="adm-table-wrap" aria-busy="true" aria-label="Loading articles">
          <div style={{ display: "grid", gap: 14, padding: 20 }}>
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="adm-skel" style={{ height: 44 }} />
            ))}
          </div>
        </div>
      ) : data && data.total === 0 ? (
        <div className="adm-empty">
          <b>{filtering ? "No articles match those filters" : "No articles yet"}</b>
          <span>{filtering ? "Try a different search, or clear the filters." : "Create your first article to get started."}</span>
          {filtering ? (
            <button type="button" className="adm-btn adm-btn--sm" onClick={resetFilters}>Clear filters</button>
          ) : (
            <Link href="/admin/articles/create" className="adm-btn adm-btn--primary adm-btn--sm"><IconPlus /> Create article</Link>
          )}
        </div>
      ) : data ? (
        <>
          <div className="adm-table-wrap" style={{ opacity: loading ? 0.6 : 1, transition: "opacity 200ms" }}>
            <table className="adm-table">
              <thead>
                <tr>
                  <th scope="col">Article</th>
                  <th scope="col">Category</th>
                  <th scope="col">Status</th>
                  <th scope="col">Author</th>
                  <th scope="col">Updated</th>
                  <th scope="col"><span className="sr-only">Actions</span></th>
                </tr>
              </thead>
              <tbody>
                {data.items.map((row) => {
                  const live = row.effectiveStatus === "published";
                  const busy = working === row.id;
                  return (
                    <tr key={row.id}>
                      <td>
                        <div className="adm-row-title">
                          <span className="adm-thumb">
                            {row.coverImage ? <Image src={row.coverImage} alt="" fill sizes="56px" className="object-cover" /> : null}
                          </span>
                          <span style={{ minWidth: 0 }}>
                            <b>{row.title}</b>
                            <small>/insights/{row.slug}{row.isBlueprint ? " · blueprint" : ""}</small>
                          </span>
                        </div>
                      </td>
                      <td>{labels.get(row.category) ?? row.category}</td>
                      <td><StatusBadge status={row.effectiveStatus} /></td>
                      <td>{row.author || "—"}</td>
                      <td style={{ whiteSpace: "nowrap" }}>{when(row.updatedAt)}</td>
                      <td>
                        <div className="adm-row-actions">
                          <Link href={`/admin/articles/edit/${row.id}`} className="adm-btn adm-btn--sm"><IconEdit /> Edit</Link>
                          <Link href={`/admin/preview/${row.id}`} target="_blank" rel="noopener" className="adm-btn adm-btn--sm" aria-label={`Preview ${row.title}`} title="Preview"><IconEye /></Link>
                          {live ? (
                            <Link href={`/insights/${row.slug}`} target="_blank" rel="noopener" className="adm-btn adm-btn--sm" aria-label={`View ${row.title} on the site`} title="View on the site"><IconExternal /></Link>
                          ) : null}
                          {row.status === "published" ? (
                            <button type="button" className="adm-btn adm-btn--sm" disabled={busy} onClick={() => changeStatus(row, "unpublish")}>
                              {busy ? <span className="adm-spin" aria-hidden="true" /> : null} Unpublish
                            </button>
                          ) : (
                            <button type="button" className="adm-btn adm-btn--sm adm-btn--primary" disabled={busy} onClick={() => changeStatus(row, "publish")}>
                              {busy ? <span className="adm-spin" aria-hidden="true" /> : null} Publish
                            </button>
                          )}
                          <button type="button" className="adm-btn adm-btn--sm adm-btn--danger" disabled={busy} onClick={() => setToDelete(row)} aria-label={`Delete ${row.title}`}><IconTrash /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <nav className="adm-pager" aria-label="Pagination">
            <span>
              {data.total} article{data.total === 1 ? "" : "s"} · page {data.page} of {data.pages}
            </span>
            <span style={{ display: "flex", gap: 8 }}>
              <button type="button" className="adm-btn adm-btn--sm" disabled={data.page <= 1 || loading} onClick={() => setPage(data.page - 1)}>← Previous</button>
              <button type="button" className="adm-btn adm-btn--sm" disabled={data.page >= data.pages || loading} onClick={() => setPage(data.page + 1)}>Next →</button>
            </span>
          </nav>
        </>
      ) : null}

      {toDelete ? (
        <ConfirmDialog
          title="Delete this article?"
          message={`"${toDelete.title}" will be permanently deleted${toDelete.effectiveStatus === "published" ? " and removed from the public site" : ""}. This cannot be undone.`}
          confirmLabel="Delete permanently"
          danger
          busy={working === toDelete.id}
          onConfirm={confirmDelete}
          onCancel={() => setToDelete(null)}
        />
      ) : null}
    </>
  );
}
