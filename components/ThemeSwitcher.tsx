"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "zn-theme";

interface ThemeOption {
  id: string;
  label: string;
  /** Background swatch, accent swatch (kept in sync with app/globals.css). */
  base: string;
  accent: string;
}

const themes: ThemeOption[] = [
  { id: "graphite", label: "Graphite", base: "bg-[#0F1214]", accent: "bg-[#2DD4BF]" },
  { id: "paper", label: "Light", base: "bg-[#F6F5F2]", accent: "bg-[#0F766E]" },
];

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

function readTheme(): string {
  const current = document.documentElement.getAttribute("data-theme");
  return current && themes.some((t) => t.id === current) ? current : "graphite";
}

function applyTheme(id: string) {
  if (id === "graphite") document.documentElement.removeAttribute("data-theme");
  else document.documentElement.setAttribute("data-theme", id);
  try {
    window.localStorage.setItem(STORAGE_KEY, id);
  } catch {
    // Storage can be blocked; the theme still applies for this visit.
  }
  listeners.forEach((notify) => notify());
}

// Instant colour switcher. The saved choice is applied before first paint by the inline script
// in app/layout.tsx; this component only reflects it and lets the visitor change it.
export default function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const active = useSyncExternalStore(subscribe, readTheme, () => "graphite");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const choose = (id: string) => {
    applyTheme(id);
  };

  return (
    <div ref={rootRef} className="fixed bottom-5 left-5 z-[60] flex flex-col items-start gap-2">
      {open && (
        <div
          role="radiogroup"
          aria-label="Colour theme"
          className="rounded-2xl border border-[var(--border-subtle)] bg-surface/95 p-2 shadow-2xl backdrop-blur"
        >
          {themes.map((t) => (
            <button
              key={t.id}
              type="button"
              role="radio"
              aria-checked={active === t.id}
              onClick={() => choose(t.id)}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                active === t.id
                  ? "bg-surface-2 text-foreground-strong"
                  : "text-foreground-muted hover:bg-surface-2 hover:text-foreground-strong"
              }`}
            >
              <span className={`relative h-6 w-6 shrink-0 overflow-hidden rounded-full border border-white/15 ${t.base}`}>
                <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-tl-full ${t.accent}`} />
              </span>
              {t.label}
            </button>
          ))}
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Change colour theme"
        className="flex h-11 items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-surface/95 px-4 text-sm font-medium text-foreground-strong shadow-lg backdrop-blur transition-colors hover:border-[var(--border-strong)]"
      >
        <span className="h-3.5 w-3.5 rounded-full bg-accent-text" aria-hidden="true" />
        Colours
      </button>
    </div>
  );
}
