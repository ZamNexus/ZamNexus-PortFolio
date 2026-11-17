"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { EditorContent, useEditor, useEditorState, type Editor, type JSONContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TiptapImage from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import StatusBadge from "@/components/admin/StatusBadge";
import { ApiError, api } from "@/components/admin/api";
import { useToast } from "@/components/admin/Toaster";
import {
  IconClose, IconCode, IconExternal, IconEye, IconImage, IconLink, IconList, IconListOrdered, IconQuote, IconRedo, IconRule, IconUndo, IconUpload,
} from "@/components/admin/icons";
import { ArticleDocument, BlockNodes, insertBlock } from "@/components/admin/BlockNodes";
import { BLOCK_HELP, BLOCK_NAMES, BLOCK_TYPES } from "@/lib/cms/blocks";
import { emptyDoc, isSafeHref } from "@/lib/cms/content";
import { effectiveStatus } from "@/lib/cms/status";
import { slugify } from "@/lib/cms/validate";
import { seoChecks, snippet, TITLE_RANGE } from "@/lib/cms/seo-check";
import type { Article, DocNode } from "@/lib/cms/types";

// Images in articles carry an optional caption alongside the standard alt text.
const CaptionImage = TiptapImage.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      caption: {
        default: "",
        parseHTML: (el: HTMLElement) => el.getAttribute("data-caption") ?? "",
        renderHTML: (attrs: Record<string, unknown>) => (attrs.caption ? { "data-caption": String(attrs.caption) } : {}),
      },
    };
  },
});

interface Props {
  mode: "create" | "edit";
  categories: { id: string; label: string }[];
  article?: Article;
}

type Busy = "save" | "publish" | "unpublish" | null;

const toLocalInput = (iso: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

/* ───────── Toolbar ───────── */

interface ToolButtonProps {
  label: string;
  pressed?: boolean;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

// mouseDown is prevented so pressing a button never steals focus (and the selection) from the editor.
function ToolButton({ label, pressed, onClick, disabled, children }: ToolButtonProps) {
  return (
    <button type="button" className="adm-tool" aria-label={label} title={label} aria-pressed={pressed} disabled={disabled} onMouseDown={(e) => e.preventDefault()} onClick={onClick}>
      {children}
    </button>
  );
}

function Toolbar({ editor, onImage, uploading }: { editor: Editor; onImage: () => void; uploading: boolean }) {
  const toast = useToast();
  const [linkOpen, setLinkOpen] = useState(false);
  const [href, setHref] = useState("");
  const [linkError, setLinkError] = useState("");
  const [blocksOpen, setBlocksOpen] = useState(false);

  const s = useEditorState({
    editor,
    selector: ({ editor: e }) => ({
      h1: e?.isActive("heading", { level: 1 }) ?? false,
      h2: e?.isActive("heading", { level: 2 }) ?? false,
      h3: e?.isActive("heading", { level: 3 }) ?? false,
      p: e?.isActive("paragraph") ?? false,
      bold: e?.isActive("bold") ?? false,
      italic: e?.isActive("italic") ?? false,
      ul: e?.isActive("bulletList") ?? false,
      ol: e?.isActive("orderedList") ?? false,
      quote: e?.isActive("blockquote") ?? false,
      code: e?.isActive("codeBlock") ?? false,
      link: e?.isActive("link") ?? false,
      image: e?.isActive("image") ?? false,
      imgAlt: String(e?.getAttributes("image").alt ?? ""),
      imgCaption: String(e?.getAttributes("image").caption ?? ""),
      canUndo: e?.can().undo() ?? false,
      canRedo: e?.can().redo() ?? false,
    }),
  });

  const run = () => editor.chain().focus();

  const openLink = () => {
    setHref(String(editor.getAttributes("link").href ?? ""));
    setLinkError("");
    setLinkOpen(true);
  };

  const applyLink = () => {
    let url = href.trim();
    if (!url) {
      run().extendMarkRange("link").unsetLink().run();
      setLinkOpen(false);
      return;
    }
    if (!/^(https?:\/\/|mailto:|\/|#)/i.test(url)) url = `https://${url}`;
    if (!isSafeHref(url)) {
      setLinkError("Enter a web address (https://…), an email (mailto:…) or a path starting with /.");
      return;
    }
    run().extendMarkRange("link").setLink({ href: url }).run();
    setLinkOpen(false);
    toast.success("Link added.");
  };

  return (
    <>
      <div className="adm-toolbar" role="toolbar" aria-label="Text formatting">
        <ToolButton label="Heading 1" pressed={s.h1} onClick={() => run().toggleHeading({ level: 1 }).run()}>H1</ToolButton>
        <ToolButton label="Heading 2" pressed={s.h2} onClick={() => run().toggleHeading({ level: 2 }).run()}>H2</ToolButton>
        <ToolButton label="Heading 3" pressed={s.h3} onClick={() => run().toggleHeading({ level: 3 }).run()}>H3</ToolButton>
        <ToolButton label="Paragraph" pressed={s.p} onClick={() => run().setParagraph().run()}>¶</ToolButton>
        <span className="adm-sep" />
        <ToolButton label="Bold" pressed={s.bold} onClick={() => run().toggleBold().run()}><b>B</b></ToolButton>
        <ToolButton label="Italic" pressed={s.italic} onClick={() => run().toggleItalic().run()}><i>I</i></ToolButton>
        <ToolButton label="Link" pressed={s.link} onClick={openLink}><IconLink /></ToolButton>
        <span className="adm-sep" />
        <ToolButton label="Bullet list" pressed={s.ul} onClick={() => run().toggleBulletList().run()}><IconList /></ToolButton>
        <ToolButton label="Numbered list" pressed={s.ol} onClick={() => run().toggleOrderedList().run()}><IconListOrdered /></ToolButton>
        <ToolButton label="Blockquote" pressed={s.quote} onClick={() => run().toggleBlockquote().run()}><IconQuote /></ToolButton>
        <ToolButton label="Code block" pressed={s.code} onClick={() => run().toggleCodeBlock().run()}><IconCode /></ToolButton>
        <ToolButton label="Divider" onClick={() => run().setHorizontalRule().run()}><IconRule /></ToolButton>
        <span className="adm-sep" />
        <ToolButton label="Insert image" onClick={onImage} disabled={uploading}>{uploading ? <span className="adm-spin" aria-hidden="true" /> : <IconImage />}</ToolButton>
        <ToolButton label="Add a section block" pressed={blocksOpen} onClick={() => { setBlocksOpen(!blocksOpen); setLinkOpen(false); }}>+ Block</ToolButton>
        <span className="adm-sep" />
        <ToolButton label="Undo" disabled={!s.canUndo} onClick={() => run().undo().run()}><IconUndo /></ToolButton>
        <ToolButton label="Redo" disabled={!s.canRedo} onClick={() => run().redo().run()}><IconRedo /></ToolButton>
      </div>

      {linkOpen ? (
        <div className="adm-subbar">
          <label className="sr-only" htmlFor="link-url">Link address</label>
          <input id="link-url" className="adm-input" placeholder="https://example.com" value={href} autoFocus onChange={(e) => setHref(e.target.value)} onKeyDown={(e: KeyboardEvent) => { if (e.key === "Enter") { e.preventDefault(); applyLink(); } if (e.key === "Escape") setLinkOpen(false); }} />
          <button type="button" className="adm-btn adm-btn--sm adm-btn--primary" onClick={applyLink}>Apply</button>
          <button type="button" className="adm-btn adm-btn--sm" onClick={() => { run().extendMarkRange("link").unsetLink().run(); setLinkOpen(false); }}>Remove link</button>
          <button type="button" className="adm-btn adm-btn--sm" onClick={() => setLinkOpen(false)} aria-label="Close"><IconClose /></button>
          {linkError ? <span className="adm-error" role="alert" style={{ flexBasis: "100%" }}>{linkError}</span> : null}
        </div>
      ) : null}

      {blocksOpen ? (
        <div className="adm-subbar adm-blockmenu" role="group" aria-label="Section blocks">
          <span className="adm-blockmenu__intro">Add a section like the ones in the original articles. It goes below the paragraph you are in.</span>
          {BLOCK_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              className="adm-blockmenu__item"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                insertBlock(editor, type);
                setBlocksOpen(false);
              }}
            >
              <b>{BLOCK_NAMES[type]}</b>
              <small>{BLOCK_HELP[type]}</small>
            </button>
          ))}
        </div>
      ) : null}

      {s.image ? (
        <div className="adm-subbar">
          <strong style={{ fontSize: "0.8125rem" }}>Image</strong>
          <input className="adm-input" aria-label="Image description (alt text)" placeholder="Describe the image for screen readers" value={s.imgAlt} onChange={(e) => editor.commands.updateAttributes("image", { alt: e.target.value })} />
          <input className="adm-input" aria-label="Image caption" placeholder="Caption shown under the image (optional)" value={s.imgCaption} onChange={(e) => editor.commands.updateAttributes("image", { caption: e.target.value })} />
        </div>
      ) : null}
    </>
  );
}

/* ───────── Editor ───────── */

export default function ArticleEditor({ mode, categories, article }: Props) {
  const toast = useToast();
  const isBlueprint = !!article?.legacy;

  const [id, setId] = useState<string | null>(article?.id ?? null);
  const [status, setStatus] = useState<Article["status"]>(article?.status ?? "draft");
  const [publishedAt, setPublishedAt] = useState<string | null>(article?.publishedAt ?? null);
  const [slugValue, setSlugValue] = useState<string | null>(article?.slug ?? null);

  const [title, setTitle] = useState(article?.title ?? "");
  const [slug, setSlug] = useState(article?.slug ?? "");
  const [slugTouched, setSlugTouched] = useState(mode === "edit");
  const [excerpt, setExcerpt] = useState(article?.excerpt ?? "");
  const [author, setAuthor] = useState(article?.author ?? "");
  const [category, setCategory] = useState(article?.category ?? "");
  const [tags, setTags] = useState<string[]>(article?.tags ?? []);
  const [tagInput, setTagInput] = useState("");
  const [coverImage, setCoverImage] = useState<string | null>(article?.coverImage ?? null);
  const [featured, setFeatured] = useState(article?.featured ?? false);
  const [seoTitle, setSeoTitle] = useState(article?.seoTitle ?? "");
  const [seoDescription, setSeoDescription] = useState(article?.seoDescription ?? "");
  const [focusKeyword, setFocusKeyword] = useState(article?.focusKeyword ?? "");
  const [socialImage, setSocialImage] = useState<string | null>(article?.socialImage ?? null);
  const [scheduleAt, setScheduleAt] = useState(() => (article && effectiveStatus(article) === "scheduled" ? toLocalInput(article.publishedAt) : ""));
  const [doc, setDoc] = useState<DocNode>(article?.content ?? emptyDoc());

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState<Busy>(null);
  const [dirty, setDirty] = useState(false);
  const [uploading, setUploading] = useState<"cover" | "social" | "inline" | null>(null);

  const coverInput = useRef<HTMLInputElement>(null);
  const socialInput = useRef<HTMLInputElement>(null);
  const inlineInput = useRef<HTMLInputElement>(null);

  const touch = <T,>(set: (v: T) => void) => (v: T) => {
    set(v);
    setDirty(true);
  };

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ document: false, heading: { levels: [1, 2, 3] }, link: { openOnClick: false, autolink: true } }),
      ArticleDocument,
      ...BlockNodes,
      CaptionImage.configure({ allowBase64: false }),
      Placeholder.configure({ placeholder: "Start writing the article…" }),
    ],
    content: (article?.content ?? emptyDoc()) as JSONContent,
    editorProps: { attributes: { class: "cms-prose", "aria-label": "Article content", role: "textbox", "aria-multiline": "true" } },
    onUpdate: ({ editor: e }) => {
      setDoc(e.getJSON() as DocNode);
      setDirty(true);
    },
  });

  // Warn before leaving with unsaved changes.
  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => e.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const onTitle = (v: string) => {
    setTitle(v);
    setDirty(true);
    if (!slugTouched) setSlug(slugify(v));
  };

  const payload = () => ({
    title,
    slug: slug || slugify(title),
    excerpt,
    content: doc,
    coverImage,
    author,
    category,
    tags,
    featured,
    seoTitle,
    seoDescription,
    focusKeyword,
    socialImage,
  });

  const failWith = (e: unknown, fallback: string) => {
    if (e instanceof ApiError) {
      setErrors(e.fields ?? {});
      toast.error(e.message || fallback);
    } else {
      toast.error(fallback);
    }
  };

  // Saves the article's fields. The status never changes here, so saving can never publish anything.
  const persist = useCallback(async (): Promise<Article | null> => {
    try {
      const res = id
        ? await api<{ article: Article }>(`/api/admin/articles/${id}`, { method: "PUT", body: payload() })
        : await api<{ article: Article }>("/api/admin/articles", { method: "POST", body: payload() });
      if (!id) window.history.replaceState(null, "", `/admin/articles/edit/${res.article.id}`);
      setId(res.article.id);
      setStatus(res.article.status);
      setSlug(res.article.slug);
      setSlugValue(res.article.slug);
      setErrors({});
      setDirty(false);
      return res.article;
    } catch (e) {
      failWith(e, "Could not save the article. Nothing was changed.");
      return null;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, title, slug, excerpt, doc, coverImage, author, category, tags, featured, seoTitle, seoDescription, focusKeyword, socialImage]);

  const save = async () => {
    setBusy("save");
    const saved = await persist();
    if (saved) toast.success(saved.status === "published" ? "Changes saved. They are live on the site." : "Draft saved.");
    setBusy(null);
  };

  const publish = async () => {
    setBusy("publish");
    const saved = await persist();
    if (!saved) {
      setBusy(null);
      return;
    }
    try {
      const body: { action: string; publishedAt?: string } = { action: "publish" };
      if (scheduleAt) body.publishedAt = new Date(scheduleAt).toISOString();
      const res = await api<{ article: Article }>(`/api/admin/articles/${saved.id}/status`, { method: "POST", body });
      setStatus(res.article.status);
      setPublishedAt(res.article.publishedAt);
      setErrors({});
      const later = res.article.publishedAt && Date.parse(res.article.publishedAt) > Date.now();
      toast.success(later ? "Scheduled. It will appear on the Insights page at the chosen time." : "Published. It is now live on the Insights page.");
    } catch (e) {
      // Saved, but not published: the status stays exactly as it was.
      failWith(e, "Saved, but it could not be published.");
      if (e instanceof ApiError && e.fields) toast.error("Saved, but not published. Fix the highlighted fields and try again.");
    }
    setBusy(null);
  };

  const unpublish = async () => {
    if (!id) return;
    setBusy("unpublish");
    try {
      const res = await api<{ article: Article }>(`/api/admin/articles/${id}/status`, { method: "POST", body: { action: "unpublish" } });
      setStatus(res.article.status);
      toast.success("Unpublished. It has been removed from the public site.");
    } catch (e) {
      failWith(e, "Could not unpublish. The article is unchanged.");
    }
    setBusy(null);
  };

  const preview = async () => {
    const tab = window.open("", "_blank");
    let target = id;
    if (!id || dirty) {
      setBusy("save");
      const saved = await persist();
      setBusy(null);
      target = saved?.id ?? null;
    }
    if (!target) {
      tab?.close();
      return;
    }
    if (tab) tab.location.href = `/admin/preview/${target}`;
  };

  const upload = async (file: File, kind: "cover" | "social" | "inline") => {
    setUploading(kind);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await api<{ url: string }>("/api/admin/upload", { method: "POST", form });
      if (kind === "cover") touch(setCoverImage)(res.url);
      else if (kind === "social") touch(setSocialImage)(res.url);
      else editor?.chain().focus().setImage({ src: res.url, alt: "" }).run();
      toast.success("Image uploaded.");
    } catch (e) {
      toast.error(e instanceof ApiError ? e.message : "The image could not be uploaded.");
    } finally {
      setUploading(null);
    }
  };

  const pick = (kind: "cover" | "social" | "inline") => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (file) void upload(file, kind);
  };

  const addTag = (raw: string) => {
    const t = raw.trim().replace(/,$/, "").trim();
    if (!t || tags.includes(t) || tags.length >= 12) return;
    touch(setTags)([...tags, t]);
    setTagInput("");
  };

  const err = (k: string) => (errors[k] ? <p id={`err-${k}`} className="adm-error" role="alert">{errors[k]}</p> : null);
  const invalid = (k: string) => (errors[k] ? true : undefined);
  const effective = id ? effectiveStatus({ status, publishedAt }) : "draft";
  const seo = useMemo(
    () => seoChecks({ keyword: focusKeyword, title, seoTitle, slug, excerpt, seoDescription, doc }),
    [focusKeyword, title, seoTitle, slug, excerpt, seoDescription, doc]
  );
  const previewTitle = (seoTitle || title || "Article title").trim();
  const isLive = effective === "published";

  return (
    <>
      <div className="adm-head">
        <div>
          <h1 className="adm-title">{id ? "Edit article" : "Create article"}</h1>
          <p className="adm-sub">
            {isLive ? "This article is live. Saving changes updates the public site straight away." : "Save as a draft any time. Nothing is public until you publish."}
          </p>
        </div>
        <div className="adm-actions" style={{ alignItems: "center" }}>
          <StatusBadge status={effective} />
          {dirty ? <span className="adm-hint" role="status">Unsaved changes</span> : null}
        </div>
      </div>

      <div className="adm-edit">
        <div className="adm-grid">
          <section className="adm-card" aria-label="Basic information" style={{ display: "grid", gap: 18 }}>
            <div className="adm-field">
              <label className="adm-label" htmlFor="a-title">Article title</label>
              <input id="a-title" className="adm-input adm-input--title" placeholder="A clear, specific headline" value={title} onChange={(e) => onTitle(e.target.value)} aria-invalid={invalid("title")} aria-describedby={errors.title ? "err-title" : undefined} maxLength={200} />
              {err("title")}
            </div>

            <div className="adm-field">
              <label className="adm-label" htmlFor="a-slug">URL slug<small>/insights/{slug || "…"}</small></label>
              <div style={{ display: "flex", gap: 8 }}>
                <input id="a-slug" className="adm-input" value={slug} onChange={(e) => { setSlugTouched(true); touch(setSlug)(e.target.value.toLowerCase()); }} disabled={isBlueprint} aria-invalid={invalid("slug")} aria-describedby={errors.slug ? "err-slug" : undefined} maxLength={90} />
                {!isBlueprint ? <button type="button" className="adm-btn" onClick={() => { setSlugTouched(false); touch(setSlug)(slugify(title)); }}>From title</button> : null}
              </div>
              {isBlueprint ? <p className="adm-hint">The address of an original blueprint is fixed so existing links keep working.</p> : null}
              {err("slug")}
            </div>

            <div className="adm-field">
              <label className="adm-label" htmlFor="a-excerpt">Short description<small>shown on cards and in search results</small></label>
              <textarea id="a-excerpt" className="adm-textarea" rows={3} value={excerpt} onChange={(e) => touch(setExcerpt)(e.target.value)} aria-invalid={invalid("excerpt")} aria-describedby={errors.excerpt ? "err-excerpt" : undefined} maxLength={400} />
              <p className="adm-count">{excerpt.length} / 400</p>
              {err("excerpt")}
            </div>
          </section>

          <section className="adm-card" aria-label="Article content">
            <div className="adm-card__title">Article content</div>
            {isBlueprint ? (
              <p className="adm-note">
                This is one of the original architecture blueprints. Its structured sections (benchmark specs, the problem and the fix, the pipeline) keep their
                original layout, so the body is not edited here. You can change its title, description, category, tags, cover image, SEO fields and publication status.
              </p>
            ) : (
              <div className="adm-editor" data-invalid={invalid("content") ? "true" : undefined}>
                {editor ? <Toolbar editor={editor} onImage={() => inlineInput.current?.click()} uploading={uploading === "inline"} /> : <div className="adm-skel" style={{ height: 460 }} aria-busy="true" />}
                {editor ? <EditorContent editor={editor} /> : null}
              </div>
            )}
            <input ref={inlineInput} type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden onChange={pick("inline")} aria-label="Upload an image into the article" />
            {err("content")}
          </section>
        </div>

        <div className="adm-side-stack">
          <section className="adm-card" aria-label="Publishing">
            <div className="adm-card__title">Publish <StatusBadge status={effective} /></div>
            <div style={{ display: "grid", gap: 10 }}>
              <button type="button" className="adm-btn adm-btn--block" onClick={save} disabled={busy !== null}>
                {busy === "save" ? <span className="adm-spin" aria-hidden="true" /> : null}
                {isLive ? "Save changes" : "Save as draft"}
              </button>
              <button type="button" className="adm-btn adm-btn--block" onClick={preview} disabled={busy !== null || !title.trim()}>
                <IconEye /> Preview
              </button>
              {isLive ? (
                <>
                  <Link href={`/insights/${slugValue}`} target="_blank" rel="noopener" className="adm-btn adm-btn--block"><IconExternal /> View on site</Link>
                  <button type="button" className="adm-btn adm-btn--block adm-btn--danger" onClick={unpublish} disabled={busy !== null}>
                    {busy === "unpublish" ? <span className="adm-spin" aria-hidden="true" /> : null} Unpublish
                  </button>
                </>
              ) : (
                <>
                  <div className="adm-field">
                    <label className="adm-label" htmlFor="a-schedule">Schedule<small>optional</small></label>
                    <input id="a-schedule" className="adm-input" type="datetime-local" value={scheduleAt} onChange={(e) => touch(setScheduleAt)(e.target.value)} aria-invalid={invalid("publishedAt")} />
                    {err("publishedAt")}
                    <p className="adm-hint">Leave empty to publish immediately.</p>
                  </div>
                  <button type="button" className="adm-btn adm-btn--primary adm-btn--block" onClick={publish} disabled={busy !== null || !title.trim()}>
                    {busy === "publish" ? <span className="adm-spin" aria-hidden="true" /> : null}
                    {scheduleAt ? "Schedule" : "Publish"}
                  </button>
                </>
              )}
            </div>
          </section>

          <section className="adm-card" aria-label="Details" style={{ display: "grid", gap: 16 }}>
            <div className="adm-field">
              <label className="adm-label" htmlFor="a-category">Category</label>
              <select id="a-category" className="adm-select" value={category} onChange={(e) => touch(setCategory)(e.target.value)} aria-invalid={invalid("category")} aria-describedby={errors.category ? "err-category" : undefined}>
                <option value="">Choose a category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
              {err("category")}
              <Link href="/admin/categories" className="adm-hint" style={{ textDecoration: "underline" }}>Manage categories</Link>
            </div>
            <div className="adm-field">
              <label className="adm-label" htmlFor="a-author">Author name</label>
              <input id="a-author" className="adm-input" value={author} onChange={(e) => touch(setAuthor)(e.target.value)} aria-invalid={invalid("author")} aria-describedby={errors.author ? "err-author" : undefined} maxLength={80} />
              {err("author")}
            </div>
            <div className="adm-field">
              <label className="adm-label" htmlFor="a-tags">Tags<small>press Enter to add</small></label>
              <div className="adm-chips">
                {tags.map((t) => (
                  <span key={t} className="adm-chip">{t}<button type="button" aria-label={`Remove tag ${t}`} onClick={() => touch(setTags)(tags.filter((x) => x !== t))}><IconClose width={12} height={12} /></button></span>
                ))}
                <input id="a-tags" value={tagInput} onChange={(e) => setTagInput(e.target.value.endsWith(",") ? (addTag(e.target.value), "") : e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(tagInput); } if (e.key === "Backspace" && !tagInput && tags.length) touch(setTags)(tags.slice(0, -1)); }} onBlur={() => addTag(tagInput)} placeholder={tags.length ? "" : "e.g. AWS, ERP"} maxLength={40} />
              </div>
            </div>
            <label className="adm-toggle">
              <input type="checkbox" checked={featured} onChange={(e) => touch(setFeatured)(e.target.checked)} />
              Feature this article on the Insights page
            </label>
          </section>

          <section className="adm-card" aria-label="Cover image" style={{ display: "grid", gap: 12 }}>
            <div className="adm-card__title">Cover image</div>
            <div className="adm-cover" data-filled={!!coverImage}>
              {coverImage ? <Image src={coverImage} alt="Cover preview" fill sizes="320px" className="object-cover" /> : <span><IconImage width={22} height={22} /><br />No cover image</span>}
            </div>
            {err("coverImage")}
            <input ref={coverInput} type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden onChange={pick("cover")} aria-label="Choose a cover image" />
            <div style={{ display: "flex", gap: 8 }}>
              <button type="button" className="adm-btn adm-btn--sm" style={{ flex: 1 }} onClick={() => coverInput.current?.click()} disabled={uploading === "cover"}>
                {uploading === "cover" ? <span className="adm-spin" aria-hidden="true" /> : <IconUpload />} {coverImage ? "Replace" : "Upload"}
              </button>
              {coverImage ? <button type="button" className="adm-btn adm-btn--sm adm-btn--danger" onClick={() => touch(setCoverImage)(null)}>Remove</button> : null}
            </div>
            <p className="adm-hint">PNG, JPG, WebP or GIF, up to 5 MB. 16:9 works best.</p>
          </section>

          <section className="adm-card" aria-label="SEO settings" style={{ display: "grid", gap: 16 }}>
            <div className="adm-card__title">
              SEO
              <span className="adm-seo-score" data-level={seo.passed >= 10 ? "good" : seo.passed >= 6 ? "fair" : "low"}>
                {seo.passed} of {seo.checks.length}
              </span>
            </div>
            <div className="adm-field">
              <label className="adm-label" htmlFor="a-keyword">Focus keyword<small>what people search for</small></label>
              <input
                id="a-keyword"
                className="adm-input"
                value={focusKeyword}
                onChange={(e) => touch(setFocusKeyword)(e.target.value)}
                placeholder="e.g. offline POS system"
                aria-invalid={invalid("focusKeyword")}
                maxLength={80}
              />
              {err("focusKeyword")}
            </div>
            <ul className="adm-seo-list" aria-label="SEO checklist">
              {seo.checks.map((c) => (
                <li key={c.id} data-ok={c.ok ? "true" : "false"}>
                  <span className="adm-seo-mark" aria-hidden="true">{c.ok ? "✓" : "!"}</span>
                  <span>
                    <b>{c.label}</b>
                    <span className="sr-only">{c.ok ? " (done)" : " (to do)"}</span>
                    <small>{c.detail}</small>
                  </span>
                </li>
              ))}
            </ul>
            <div className="adm-field">
              <label className="adm-label" htmlFor="a-seotitle">SEO title<small>defaults to the title</small></label>
              <input id="a-seotitle" className="adm-input" value={seoTitle} onChange={(e) => touch(setSeoTitle)(e.target.value)} aria-invalid={invalid("seoTitle")} maxLength={120} />
              <p className="adm-count">{seoTitle.length} / 70</p>
              {err("seoTitle")}
            </div>
            <div className="adm-field">
              <label className="adm-label" htmlFor="a-seodesc">Meta description<small>defaults to the short description</small></label>
              <textarea id="a-seodesc" className="adm-textarea" rows={3} value={seoDescription} onChange={(e) => touch(setSeoDescription)(e.target.value)} aria-invalid={invalid("seoDescription")} maxLength={300} />
              <p className="adm-count">{seoDescription.length} / 200</p>
              {err("seoDescription")}
            </div>
            <div className="adm-field">
              <span className="adm-label">Social sharing image</span>
              <div className="adm-cover" data-filled={!!socialImage}>
                {socialImage ? <Image src={socialImage} alt="Social image preview" fill sizes="320px" className="object-cover" /> : <span>Uses the generated card</span>}
              </div>
              {err("socialImage")}
              <input ref={socialInput} type="file" accept="image/png,image/jpeg,image/webp,image/gif" hidden onChange={pick("social")} aria-label="Choose a social sharing image" />
              <div style={{ display: "flex", gap: 8 }}>
                <button type="button" className="adm-btn adm-btn--sm" style={{ flex: 1 }} onClick={() => socialInput.current?.click()} disabled={uploading === "social"}>
                  {uploading === "social" ? <span className="adm-spin" aria-hidden="true" /> : <IconUpload />} {socialImage ? "Replace" : "Upload"}
                </button>
                {socialImage ? <button type="button" className="adm-btn adm-btn--sm adm-btn--danger" onClick={() => touch(setSocialImage)(null)}>Remove</button> : null}
              </div>
            </div>
            <div className="adm-serp" aria-label="How the article looks in Google">
              <span className="adm-serp__site">zamnexus.com › insights › {slug || "…"}</span>
              <b className="adm-serp__title">
                {previewTitle.length > TITLE_RANGE[1] ? `${previewTitle.slice(0, previewTitle.lastIndexOf(" ", TITLE_RANGE[1]))} …` : previewTitle}
              </b>
              <span className="adm-serp__desc">{snippet(seoDescription || excerpt || "The short description appears here.")}</span>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
