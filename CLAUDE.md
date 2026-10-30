# ZamNexus Platform — CLAUDE.md (Agent Context Reference)

> This file is read by Claude-based AI coding agents. It supplements AGENTS.md with Claude-specific conventions.

@AGENTS.md

---

## Quick Context

- **Project**: ZamNexus Limited: four business platforms + engineering services
- **Owner & CEO**: Mir Mujeeb Ul Hassan
- **Stack**: Next.js 16 (App Router) + React 19 + TypeScript 5 + Tailwind CSS 4
- **Design**: Deep navy (#0A0F1E) with electric blue (#2563EB) accent. Tokens live in `app/globals.css`; it is the source of truth over any colour named elsewhere in these docs
- **Goal**: Enterprise-grade website that wins high-value software project contracts ($50k–$500k+)

---

## Critical Rules (Read Before Writing ANY Code)

### 1. Hydration Safety
This project has had **recurring React hydration mismatch errors**. Before touching any component:
- The root `layout.tsx` MUST remain a **Server Component** (no `"use client"`)
- `<html>` and `<body>` tags MUST have `suppressHydrationWarning`
- NEVER use `typeof window !== 'undefined'` for conditional rendering — use `useEffect` + `useState` pattern instead
- NEVER use `Date.now()`, `Math.random()`, or `new Date()` during server render
- ALWAYS validate HTML nesting (no `<div>` inside `<p>`, no `<p>` inside `<p>`)

### 2. Component Boundaries
```
Server Components (DEFAULT):
├── layout.tsx           ← ALWAYS server
├── Footer.tsx           ← Server (no state, no handlers)
├── metadata exports     ← Server only
└── Static content pages ← Server when no interactivity

Client Components ("use client"):
├── Navbar.tsx           ← Uses useState for mobile menu
├── page.tsx (home)      ← Uses useState for filter tabs
├── Contact/page.tsx     ← Uses useState for form state
└── Any interactive UI   ← Buttons with onClick, forms, animations
```

### 3. Design System Enforcement
Use the Tailwind tokens from `app/globals.css` (`@theme inline`), not raw hex values:
- **Background / surfaces**: `bg-background`, `bg-surface`, `bg-surface-2`
- **Text**: `text-foreground-strong` (headings), `text-foreground` (body), `text-foreground-muted` (captions, 7.5:1)
- **Accent**: `bg-accent` for fills and buttons only (3.7:1 as text fails WCAG AA); `text-accent-text` (#60A5FA) for accent-coloured text
- **Never** use `text-zinc-500`/`600`/`700` for text: they fail WCAG AA on the navy background
- **Borders**: `border-[var(--border-subtle)]` (default), `border-[var(--border-strong)]` (hover/active)
- **Radius**: `rounded-3xl` (cards), `rounded-full` (buttons, navbar)

### 3a. Content Rules
- Every client-supplied figure, client name or credential lives in `lib/siteFacts.ts` and renders only when `confirmed: true`. Never hard-code one in a page.
- Product and service copy shared across pages lives in `lib/catalog.ts`.
- Page metadata comes from `pageMetadata()` in `lib/seo.ts` (title ≤ 60 chars, description ≤ 155, self-canonical).

### 4. Code Quality Non-Negotiables
- **ZERO `any` types** — Define TypeScript interfaces for ALL data structures
- **ZERO unused imports** — Clean every import on every file
- **ZERO inline styles** — Use Tailwind or globals.css only
- **ZERO placeholder text** — Write real ZamNexus-specific content
- **ZERO `console.log`** — Remove all debug statements
- **Use `next/image`** for all images (with `width`/`height` or `fill`)
- **Use `next/link`** for all internal navigation

### 5. Performance Standards
- Keep `"use client"` to the **minimum necessary surface area**
- Prefer Server Components for data-heavy, non-interactive sections
- Use `loading.tsx` for route-level loading states
- Lazy-load below-fold videos with `loading="lazy"`
- Never import entire libraries — use tree-shakeable imports

---

## File Structure Quick Reference

```
app/                      (route folders are lowercase; proxy.ts 308-redirects any mixed-case URL)
├── layout.tsx            → Root layout + homepage metadata — SERVER
├── page.tsx              → Homepage — SERVER
├── globals.css           → Design tokens, animations, utilities
├── services/page.tsx     → 6 services + process + FAQ — SERVER
├── products/page.tsx     → Product hub + comparison — SERVER
├── products/znx*/        → 4 product pages (interactive consoles) — CLIENT
├── insights/             → Article index (CLIENT) + [slug] articles
├── about/page.tsx        → Story, leadership, offices, company details — SERVER
├── contact/page.tsx      → Brief form — CLIENT (form state)
├── privacy/, terms/      → Legal
├── api/lead, api/chat    → Lead pipeline (lib/leads.ts) and chatbot
proxy.ts                  → Legacy and mixed-case URL redirects (next.config redirects match case-insensitively)
lib/
├── catalog.ts            → Shared product and service copy
├── siteFacts.ts          → Client claims, gated by confirmed: true
├── seo.ts                → pageMetadata(), JSON-LD helpers
components/
├── Navbar.tsx            → Floating capsule nav — CLIENT (mobile menu state)
├── Footer.tsx            → Footer with CTA
```

---

## Page Architecture Pattern

Every page follows this consistent structure:

```tsx
"use client"; // Only if the page needs interactivity

import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PageName() {
  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-100 font-sans selection:bg-[#D0FF71] selection:text-black overflow-x-hidden">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-ziel-grid opacity-60 pointer-events-none z-0" />

      {/* Navigation */}
      <Navbar currentPath="/CurrentRoute" />

      <main className="relative z-10 pt-28">
        {/* HERO SECTION */}
        <section className="max-w-6xl mx-auto px-6 pt-16 pb-20 text-center">
          {/* Mono tag → h1 → subtitle → CTAs */}
        </section>

        {/* CONTENT SECTIONS */}
        {/* Each section: max-w-6xl mx-auto px-6 py-20 border-t border-zinc-800/60 */}
      </main>

      <Footer />
    </div>
  );
}
```

---

## Animation Classes (defined in globals.css)

| Class | Animation | Speed |
|-------|-----------|-------|
| `.liquid-lime-btn` | Glow + lift on hover | 300ms cubic-bezier |
| `.animate-marquee` | Infinite horizontal scroll (logos) | 25s linear |
| `.animate-reel-scroll` | Infinite horizontal scroll (videos) | 40s linear |
| `.bg-ziel-grid` | Static editorial background grid | N/A |
| `.animate-pulse` | Tailwind pulse (status badges) | Default |

---

## SEO Metadata Pattern

For pages that are Server Components, export metadata directly:
```tsx
export const metadata: Metadata = {
  title: "Page Title — ZamNexus",
  description: "Compelling description (120-160 chars).",
};
```

For Client Component pages (`"use client"`), metadata must be set via a parent layout or a separate `metadata.ts` file in the route folder.

---

## Common Mistakes to Avoid

1. **Adding `"use client"` to layout.tsx** — This breaks Server Component metadata and causes hydration issues
2. **Using raw `<img>` tags** — Always use `next/image` for optimization
3. **Using `<a>` for internal links** — Always use `next/link`
4. **Forgetting `suppressHydrationWarning`** — Required on `<html>` and `<body>`
5. **Nested invalid HTML** — `<p>` cannot contain `<div>`, block elements can't nest in inline elements
6. **Using `useEffect` for data fetching** — Use Server Components with `async/await` instead
7. **Hardcoding external URLs for assets that should be local** — Use `/public` directory for owned assets
8. **Creating components without TypeScript interfaces** — Every prop must be typed
9. **Using generic Tailwind colors** — Stick to the ZamNexus design system palette only
10. **Ignoring mobile responsiveness** — Every layout must work on 320px–1920px screens
