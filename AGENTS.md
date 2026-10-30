<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

---

# ZamNexus Platform — Agent Coding Standards & Architecture Guide

> **Company**: ZamNexus Limited — Software Development & Consulting  
> **Owner & CEO**: Mir Mujeeb Ul Hassan  
> **Stack**: Next.js 16 · React 19 · TypeScript 5 · Tailwind CSS 4  
> **Design tokens**: `app/globals.css` is the source of truth (deep navy #0A0F1E, electric blue #2563EB). The lime palette in §3 below is historical and no longer used.

---

## 1. Project Identity & Business Context

ZamNexus is a **premium software services & consulting company** targeting enterprise clients.
The website must communicate:

- **Technical authority** — the visitor should immediately trust that ZamNexus builds production-grade systems.
- **Creative polish** — every pixel, micro-interaction, and animation should feel intentional and premium.
- **Enterprise readiness** — design choices must signal that this company handles large-scale projects ($50k–$500k+ budgets).

Every design and code decision must serve this goal. No generic templates, no placeholder content, no amateur layouts.

---

## 2. Tech Stack & Versions (LOCKED)

| Technology      | Version  | Notes                                      |
| --------------- | -------- | ------------------------------------------ |
| Next.js         | 16.3.4   | App Router only. No Pages Router.          |
| React           | 19.2.8   | Server Components by default.              |
| TypeScript      | ^5       | Strict mode. No `any` types.               |
| Tailwind CSS    | ^4       | v4 syntax with `@import "tailwindcss"`.    |
| PostCSS         | Latest   | Via `@tailwindcss/postcss`.                |
| ESLint          | ^9       | `eslint-config-next` for code quality.     |
| Font            | Geist    | Sans + Mono via `next/font/google`.        |

**DO NOT** install additional UI libraries (shadcn, MUI, Chakra, Radix, etc.) unless explicitly requested by the user.

---

## 3. Design System — Token Reference

### 3.1 Color Palette

```
--background:       #090b10    (Deep space black — primary bg)
--foreground:       #f4f4f5    (Zinc-100 — primary text)
--accent-lime:      #D0FF71    (Signature lime green — CTAs, highlights)
--accent-lime-hover:#b8f547    (Lime hover state)
--surface-primary:  #11141D    (Elevated surface — navbar, cards)
--surface-secondary:#0f1117    (Subtle surface variation)
--border-subtle:    rgba(39, 39, 42, 0.8)   (zinc-800/80)
--border-active:    rgba(208, 255, 113, 0.6) (lime border on hover)
--text-secondary:   #a1a1aa    (zinc-400 — body/secondary text)
--text-tertiary:    #71717a    (zinc-500 — captions, labels)
```

### 3.2 Typography Scale

- **Display (h1)**: `text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.08]`
- **Section Heading (h2)**: `text-3xl sm:text-5xl font-extrabold tracking-tight`
- **Card Title (h3)**: `text-xl sm:text-2xl font-bold`
- **Body**: `text-sm sm:text-base text-zinc-400 leading-relaxed`
- **Label/Tag**: `text-xs font-mono uppercase tracking-widest font-bold text-[#D0FF71]`
- **Caption**: `text-[10px] font-mono uppercase tracking-wider text-zinc-500`

### 3.3 Spacing & Layout

- **Max content width**: `max-w-6xl` (1152px)
- **Section padding**: `py-20 sm:py-24 px-6`
- **Card border radius**: `rounded-3xl`
- **Button border radius**: `rounded-full` (pill shape)
- **Grid gaps**: `gap-6` (cards), `gap-8` (sections)

### 3.4 Elevation & Effects

- **Card surface**: `bg-zinc-900/40 sm:bg-zinc-900/50 border border-zinc-800`
- **Hover state**: `hover:border-[#D0FF71]/60 hover:-translate-y-1.5 transition-all duration-300`
- **Backdrop blur**: `backdrop-blur-2xl` (glassmorphism on navbar, overlays)
- **Glow effects**: `shadow-[0_0_25px_rgba(208,255,113,0.25)]` on lime buttons
- **Background grid**: `.bg-ziel-grid` class for subtle editorial grid

### 3.5 Signature Components

#### Liquid Lime Button (`.liquid-lime-btn`)
```css
/* Primary CTA — lime pill with embedded arrow icon */
display: inline-flex; align-items: center; gap: 12px;
background: #D0FF71; color: #000; font-weight: 600;
border-radius: 9999px; box-shadow: 0 0 25px rgba(208,255,113,0.25);
/* Hover: glow intensifies, translateY(-1px), arrow rotates */
```

#### Floating Capsule Navbar
```
fixed top-0 z-50 → max-w-6xl → rounded-full → bg-[#11141D]/85 backdrop-blur-2xl
border border-zinc-800/80 → shadow-2xl
```

#### Infinite Marquee (`.animate-marquee`)
```css
translateX(0%) → translateX(-50%) at 25s linear infinite
Pause on hover via animation-play-state: paused
```

#### Video Reel Scroll (`.animate-reel-scroll`)
```css
Same translateX pattern at 40s linear infinite
Cards: rounded-3xl, border glow on hover, gradient overlay
```

---

## 4. Architecture & File Conventions

### 4.1 Directory Structure

```
app/
├── layout.tsx          # Root layout (Server Component — fonts, metadata, html/body)
├── page.tsx            # Homepage (Client Component — hero, reels, services)
├── globals.css         # Design tokens, animations, utility classes
├── favicon.ico
├── About/page.tsx      # About — company pillars, CEO section
├── Services/page.tsx   # Services — detailed service cards
├── Work/page.tsx       # Portfolio — case studies with video previews
├── Products/page.tsx   # Product offerings
├── BLog/page.tsx       # Blog/insights page
├── Contact/page.tsx    # Contact form with budget/service selectors
components/
├── Navbar.tsx          # Floating capsule navigation (Client Component)
├── Footer.tsx          # Pre-footer CTA banner + link grid (Server Component)
public/
├── (static assets — images, icons, SVGs, videos)
```

### 4.2 Server vs Client Component Rules

| Rule | Details |
|------|---------|
| **Default to Server Components** | Every component is a Server Component unless it needs interactivity. |
| **`"use client"` only when required** | Use ONLY for: `useState`, `useEffect`, `useRef`, event handlers (`onClick`, `onChange`), browser APIs. |
| **Never use `"use client"` on `layout.tsx`** | The root layout MUST remain a Server Component. |
| **Keep client boundaries small** | Extract interactive parts into small Client Components. Don't make entire pages `"use client"` unless truly necessary. |

### 4.3 Routing Conventions

- **Folder-based routing**: `app/about/page.tsx` → `/about`
- **All page files MUST export a default function component**
- **Route folders are lowercase** (`about`, `services`, `products`, `insights`, `contact`). `proxy.ts` redirects old and mixed-case URLs; add moved pages to its `MOVED` map, not to `next.config.ts` redirects (those match case-insensitively and would loop)
- **Dynamic routes**: Use `[slug]` folder convention when needed
- **Loading states**: Use `loading.tsx` in route folders for Suspense boundaries
- **Error boundaries**: Use `error.tsx` for route-level error handling
- **Metadata**: Export `metadata` object from Server Component pages for SEO

---

## 5. Component Architecture Standards

### 5.1 Component Design Rules

```typescript
// ✅ CORRECT — Typed props with interface, proper defaults
interface ServiceCardProps {
  title: string;
  description: string;
  icon: string;
  tag: string;
  href?: string;
}

export default function ServiceCard({ title, description, icon, tag, href = "/Services" }: ServiceCardProps) {
  // ...
}

// ❌ WRONG — Untyped, inline objects, no interface
export default function ServiceCard(props: any) { ... }
```

### 5.2 Component Checklist (for every component)

- [ ] **TypeScript interface** for all props (no `any`, no implicit `any`)
- [ ] **Semantic HTML** — use `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>`, `<main>`
- [ ] **Unique IDs** on all interactive elements (buttons, forms, links)
- [ ] **Accessible labels** — `aria-label` on icon-only buttons, `alt` on all images
- [ ] **Responsive design** — mobile-first with `sm:`, `md:`, `lg:` breakpoints
- [ ] **Hover/focus states** — every interactive element must have visible feedback
- [ ] **Transitions** — `transition-all duration-300` minimum on hover effects
- [ ] **Loading states** — skeleton/spinner for async content
- [ ] **Error boundaries** — graceful fallbacks, never blank screens

### 5.3 Reusable Components (extract when used 2+ times)

| Component | Location | Purpose |
|-----------|----------|---------|
| `Navbar` | `components/Navbar.tsx` | Floating capsule header with nav links |
| `Footer` | `components/Footer.tsx` | Pre-footer CTA + link grid + copyright |
| `SectionHeader` | `components/SectionHeader.tsx` | Mono tag + heading combo |
| `ServiceCard` | `components/ServiceCard.tsx` | Service grid item |
| `ProjectCard` | `components/ProjectCard.tsx` | Case study showcase |
| `LimeButton` | `components/LimeButton.tsx` | Primary CTA button (liquid lime style) |

---

## 6. Code Quality Gates

### 6.1 TypeScript Standards

```typescript
// ✅ Strict typing — no escape hatches
type ServiceCategory = "ai" | "fintech" | "cloud" | "cybersecurity" | "mobile";

interface Project {
  id: number;
  category: ServiceCategory;
  title: string;
  client: string;
  stats: string;
  description: string;
  stack: string[];
  videoSrc: string;
}

// ❌ NEVER DO THIS
const data: any = fetchSomething();
const items = data as unknown as SomeType; // double assertion = code smell
```

### 6.2 Performance Rules

| Rule | Implementation |
|------|---------------|
| **Images** | Always use `next/image` with explicit `width`/`height` or `fill`. Never use raw `<img>` for local assets. |
| **Videos** | Use `<video>` with `playsInline muted loop autoPlay`. Add `loading="lazy"` for below-fold content. |
| **Fonts** | Load via `next/font/google` only. Never import from CDN links in `<head>`. |
| **Links** | Always use `next/link` for internal navigation. Never use `<a>` for internal routes. |
| **CSS** | No inline `style={}` unless dynamically computed. Use Tailwind classes or globals.css. |
| **Bundle size** | Avoid importing entire libraries. Use tree-shakeable imports. |
| **Client components** | Minimize `"use client"` surface area. Wrap only interactive DOM. |

### 6.3 Hydration Error Prevention

> **CRITICAL**: The #1 recurring bug in this project has been React hydration mismatches.

**Root causes and fixes:**

| Cause | Fix |
|-------|-----|
| Browser extensions injecting attributes (e.g., `bis_skin_checked`) | `suppressHydrationWarning` on `<html>` and `<body>`. Observer script in `<head>` to strip injected attrs. |
| `typeof window !== 'undefined'` branches | Never conditionally render based on environment. Use `useEffect` for client-only code. |
| `Date.now()`, `Math.random()` in render | Move to `useEffect` or `useState` with initial value of `null`. |
| HTML nesting violations (`<p>` inside `<p>`, `<div>` inside `<p>`) | Validate HTML nesting. Use `<div>` or `<span>` appropriately. |
| Dynamic content without snapshots | Pass server-computed values as props, not computed at render time. |

**Pattern for safe client-only rendering:**
```tsx
"use client";
import { useState, useEffect } from "react";

export default function DynamicWidget() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return <div className="h-20 animate-pulse bg-zinc-800 rounded-2xl" />;
  
  return <div>{/* Client-only content here */}</div>;
}
```

---

## 7. SEO & Metadata Standards

### 7.1 Per-Page Metadata (Server Components)

```typescript
// Every page MUST export metadata
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services — ZamNexus | Enterprise Software Development & AI Solutions",
  description: "Explore ZamNexus's enterprise capabilities: AI engineering, cloud architecture, cybersecurity, staff augmentation, and custom software development.",
  openGraph: {
    title: "Services — ZamNexus",
    description: "Enterprise software development and consulting.",
    type: "website",
    siteName: "ZamNexus",
  },
};
```

### 7.2 SEO Checklist (every page)

- [ ] Unique `<title>` tag with company name
- [ ] Compelling `<meta description>` (120–160 chars)
- [ ] Single `<h1>` per page
- [ ] Proper heading hierarchy (`h1` → `h2` → `h3`, no skips)
- [ ] Semantic HTML elements (`<main>`, `<section>`, `<article>`, `<nav>`)
- [ ] `alt` text on every image
- [ ] `lang="en"` on `<html>`
- [ ] Canonical URLs for production

---

## 8. Animation & Interaction Guidelines

### 8.1 Animation Hierarchy

| Priority | Type | Duration | Easing |
|----------|------|----------|--------|
| 1 | Hover transitions | 200–300ms | `ease` or `cubic-bezier(0.16, 1, 0.3, 1)` |
| 2 | Page section reveals | 400–600ms | `ease-out` |
| 3 | Infinite marquees | 20–40s | `linear` |
| 4 | Skeleton loaders | `animate-pulse` | Built-in |

### 8.2 Interaction Patterns

- **Buttons**: Lift on hover (`translateY(-1px)`), glow intensify, arrow rotate
- **Cards**: Border color shift to lime, subtle scale (`scale-[1.02]`) or lift (`-translate-y-1.5`)
- **Links**: Color transition to `#D0FF71`, optional underline
- **Videos**: Opacity shift from 80% → 100% on hover, subtle scale
- **Logo marquee**: Grayscale → full color on hover, opacity 60% → 100%

---

## 9. Page-Specific Requirements

### Homepage (`/`)
- Hero with animated status badge, gradient headline, dual CTAs
- Auto-scrolling video reel showcase (infinite horizontal scroll)
- Client logo marquee ticker (infinite, pause on hover)
- Creative work / case study cards with video previews and filter tabs
- Services grid with icon cards
- CEO spotlight banner with quote

### Services (`/Services`)
- Detailed service cards with deliverables list
- Each service: icon, category tag, title, description, bullet deliverables
- Link back to Contact for engagement

### Work (`/Work`)
- Portfolio showcase with category filters
- Each project: video preview, client name, title, description, tech stack, outcome stat
- Case study format with verified outcomes

### Products (`/Products`)
- Product cards with feature highlights
- Status badges (Live, Beta, Coming Soon)

### Blog (`/BLog`)
- Article cards with category, date, read time
- Clean editorial layout

### About (`/About`)
- Company pillars / values section
- CEO and leadership section
- Company story / mission

### Contact (`/Contact`)
- Multi-field form: name, email, company, service selector, budget range, message
- Form validation with clear error states
- Success state after submission
- Contact info sidebar

---

## 10. Git & Deployment Standards

- **Branch strategy**: `main` is production, feature branches for development
- **Commit messages**: Conventional commits (`feat:`, `fix:`, `refactor:`, `style:`, `docs:`)
- **Build check**: Run `npm run build` before every push — zero errors, zero warnings
- **Lint check**: Run `npm run lint` — clean output required
- **No console.log**: Remove all debug statements before committing
- **No unused imports**: Clean imports on every file

---

## 11. Critical Anti-Patterns (NEVER DO THESE)

| ❌ Anti-Pattern | ✅ Correct Approach |
|----------------|---------------------|
| Using `any` type | Define proper TypeScript interfaces |
| Raw `<img>` for local images | Use `next/image` with dimensions |
| `<a>` for internal links | Use `next/link` |
| Inline `style={}` for static styles | Use Tailwind classes or globals.css |
| `"use client"` on layout.tsx | Keep layouts as Server Components |
| Placeholder text ("Lorem ipsum") | Write real, contextual copy for ZamNexus |
| Generic colors (plain red, blue) | Use design system tokens only |
| Missing `key` prop in lists | Always use unique, stable keys |
| `useEffect` for data fetching | Use Server Components or `fetch` in RSC |
| Hardcoded absolute URLs | Use relative paths or env variables |
