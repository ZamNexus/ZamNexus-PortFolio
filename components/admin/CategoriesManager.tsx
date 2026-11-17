"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import ConfirmDialog from "@/components/admin/ConfirmDialog";
import { ApiError, api } from "@/components/admin/api";
import { useToast } from "@/components/admin/Toaster";
import { IconEdit, IconExternal, IconPlus, IconTrash } from "@/components/admin/icons";

interface Cat {
  id: string;
  label: string;
  description?: string;
  articles: number;
}

const fetchCategories = () => api<{ categories: Cat[] }>("/api/admin/categories");

export default function CategoriesManager() {
  const toast = useToast();
  const [cats, setCats] = useState<Cat[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [adding, setAdding] = useState(false);
  const [editing, setEditing] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [draftIntro, setDraftIntro] = useState("");
  const [saving, setSaving] = useState(false);
  const [toDelete, setToDelete] = useState<Cat | null>(null);
  const [deleting, setDeleting] = useState(false);

  const refresh = useCallback(async () => {
    setError(null);
    try {
      setCats((await fetchCategories()).categories);
    } catch (e) {
      setError(e instanceof ApiError ? e.message : "Could not load categories.");
    }
  }, []);

  useEffect(() => {
    let alive = true;
    fetchCategories()
      .then((r) => alive && setCats(r.categories))
      .catch((e: unknown) => alive && setError(e instanceof ApiError ? e.message : "Could not load categories."));
    return () => {
      alive = false;
    };
  }, []);

  const add = async (e: FormEvent) => {
    e.preventDefault();
    setAdding(true);
    try {
      await api("/api/admin/categories", { method: "POST", body: { label: name } });
      toast.success(`Added the category "${name.trim()}".`);
      setName("");
      await refresh();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "That did not work.");
    } finally {
      setAdding(false);
    }
  };

  const rename = async (cat: Cat) => {
    setSaving(true);
    try {
      await api(`/api/admin/categories/${cat.id}`, { method: "PUT", body: { label: draft, description: draftIntro } });
      toast.success("Category saved. The Insights filters and the topic page update straight away.");
      setEditing(null);
      await refresh();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "That did not work.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!toDelete) return;
    setDeleting(true);
    try {
      await api(`/api/admin/categories/${toDelete.id}`, { method: "DELETE" });
      toast.success(`Deleted the category "${toDelete.label}".`);
      setToDelete(null);
      await refresh();
    } catch (err) {
      toast.error(err instanceof ApiError ? err.message : "That did not work.");
      setToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <form onSubmit={add} className="adm-card" style={{ marginBottom: 18, display: "flex", flexWrap: "wrap", gap: 12, alignItems: "flex-end" }}>
        <div className="adm-field" style={{ flex: "1 1 260px" }}>
          <label className="adm-label" htmlFor="cat-name">New category</label>
          <input id="cat-name" className="adm-input" placeholder="For example, Security & Compliance" value={name} onChange={(e) => setName(e.target.value)} maxLength={60} />
        </div>
        <button type="submit" className="adm-btn adm-btn--primary" disabled={adding || name.trim().length < 2}>
          {adding ? <span className="adm-spin" aria-hidden="true" /> : <IconPlus />} Add category
        </button>
      </form>

      {error ? (
        <div className="adm-alert" role="alert">
          <div style={{ flex: 1 }}>{error}</div>
          <button type="button" className="adm-btn adm-btn--sm" onClick={refresh}>Try again</button>
        </div>
      ) : !cats ? (
        <div className="adm-table-wrap" aria-busy="true"><div style={{ display: "grid", gap: 12, padding: 20 }}>{[0, 1, 2].map((i) => <div key={i} className="adm-skel" style={{ height: 40 }} />)}</div></div>
      ) : cats.length === 0 ? (
        <div className="adm-empty"><b>No categories yet</b><span>Add one above. Articles need a category before they can be published.</span></div>
      ) : (
        <div className="adm-table-wrap">
          <table className="adm-table" style={{ minWidth: 560 }}>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Identifier</th>
                <th scope="col">Articles</th>
                <th scope="col"><span className="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              {cats.map((c) => (
                <tr key={c.id}>
                  <td>
                    {editing === c.id ? (
                      <div className="adm-cat-edit">
                        <input className="adm-input" aria-label={`Name of ${c.label}`} value={draft} onChange={(e) => setDraft(e.target.value)} maxLength={60} autoFocus />
                        <textarea
                          className="adm-textarea"
                          aria-label={`Topic page introduction for ${c.label}`}
                          placeholder="Introduction for the topic page and its Google description (120 to 155 characters works best)"
                          rows={3}
                          value={draftIntro}
                          onChange={(e) => setDraftIntro(e.target.value)}
                          maxLength={300}
                        />
                        <span className="adm-count">{draftIntro.length} characters</span>
                      </div>
                    ) : (
                      <div className="adm-cat-view">
                        <b>{c.label}</b>
                        <small>{c.description ? c.description : "No topic introduction yet. Add one so the topic page has its own text for Google."}</small>
                      </div>
                    )}
                  </td>
                  <td style={{ color: "var(--foreground-muted)", fontFamily: "var(--font-geist-mono)", fontSize: "0.8125rem" }}>{c.id}</td>
                  <td>{c.articles}</td>
                  <td>
                    <div className="adm-row-actions">
                      {editing === c.id ? (
                        <>
                          <button type="button" className="adm-btn adm-btn--sm adm-btn--primary" disabled={saving || draft.trim().length < 2} onClick={() => rename(c)}>Save</button>
                          <button type="button" className="adm-btn adm-btn--sm" onClick={() => setEditing(null)}>Cancel</button>
                        </>
                      ) : (
                        <>
                          {c.articles ? (
                            <a className="adm-btn adm-btn--sm" href={`/insights/topic/${c.id}`} target="_blank" rel="noreferrer" aria-label={`View the ${c.label} topic page`} title="View the topic page"><IconExternal /></a>
                          ) : null}
                          <button type="button" className="adm-btn adm-btn--sm" onClick={() => { setEditing(c.id); setDraft(c.label); setDraftIntro(c.description ?? ""); }}><IconEdit /> Edit</button>
                          <button type="button" className="adm-btn adm-btn--sm adm-btn--danger" onClick={() => setToDelete(c)} aria-label={`Delete ${c.label}`}><IconTrash /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {toDelete ? (
        <ConfirmDialog
          title="Delete this category?"
          message={toDelete.articles ? `${toDelete.articles} article(s) still use "${toDelete.label}", so it cannot be deleted until they are moved.` : `"${toDelete.label}" will be removed. This cannot be undone.`}
          confirmLabel={toDelete.articles ? "Try anyway" : "Delete category"}
          danger
          busy={deleting}
          onConfirm={remove}
          onCancel={() => setToDelete(null)}
        />
      ) : null}
    </>
  );
}
