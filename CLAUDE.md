# Zamooq Platform — CLAUDE.md (Agent Context Reference)

> This file is read by Claude-based AI coding agents. It supplements AGENTS.md with Claude-specific conventions.

@AGENTS.md

---

## Quick Context

- **Project**: Zamooq — Premium software services & consulting platform website
- **Owner & CEO**: Mir Mujeeb Ul Hassan
- **Stack**: Next.js 16 (App Router) + React 19 + TypeScript 5 + Tailwind CSS 4
- **Design**: Dark editorial (#090b10 bg) with signature lime (#D0FF71) accent, inspired by [Ziel Global](https://zielglobal.com/)
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
- **Primary BG**: `#090b10` — Use `bg-[#090b10]` or `var(--background)`
- **Accent**: `#D0FF71` — Use `text-[#D0FF71]` or `bg-[#D0FF71]`
- **Surface**: `#11141D` — Use `bg-[#11141D]/85` with `backdrop-blur-2xl`
- **Text**: `text-white` (headings), `text-zinc-400` (body), `text-zinc-500` (captions)
- **Borders**: `border-zinc-800` (default), `border-[#D0FF71]/60` (hover active)
- **Radius**: `rounded-3xl` (cards), `rounded-full` (buttons, navbar)
- **Shadows**: `shadow-2xl` (elevated), `shadow-[0_0_25px_rgba(208,255,113,0.25)]` (lime glow)

### 4. Code Quality Non-Negotiables
- **ZERO `any` types** — Define TypeScript interfaces for ALL data structures
- **ZERO unused imports** — Clean every import on every file
- **ZERO inline styles** — Use Tailwind or globals.css only
- **ZERO placeholder text** — Write real Zamooq-specific content
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
app/
├── layout.tsx          → Root layout (fonts, metadata, html shell) — SERVER
├── page.tsx            → Homepage — CLIENT (filter state)
├── globals.css         → Design tokens, animations, utilities
├── About/page.tsx      → Company info — CLIENT
├── Services/page.tsx   → Service details — CLIENT
├── Work/page.tsx       → Portfolio showcase — CLIENT
├── Products/page.tsx   → Product catalog — CLIENT
├── BLog/page.tsx       → Blog/insights — CLIENT
├── Contact/page.tsx    → Contact form — CLIENT (form state)
components/
├── Navbar.tsx          → Floating capsule nav — CLIENT (mobile menu state)
├── Footer.tsx          → Footer with CTA — SERVER
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
  title: "Page Title — Zamooq",
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
9. **Using generic Tailwind colors** — Stick to the Zamooq design system palette only
10. **Ignoring mobile responsiveness** — Every layout must work on 320px–1920px screens
