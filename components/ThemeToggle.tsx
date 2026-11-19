"use client";

import { useSyncExternalStore } from "react";
import type { MouseEvent } from "react";
import { flushSync } from "react-dom";

// Light/dark switch in the navbar: a plain sun/moon pill with no animation of its own. The saved choice is
// applied before first paint by the inline script in app/layout.tsx, and the switch's look is driven by CSS from
// <html data-theme>, so it is right from the first frame. React only tracks the state for the accessible name.

const STORAGE_KEY = "zn-theme";

type Theme = "graphite" | "paper";

const listeners = new Set<() => void>();

function subscribe(onChange: () => void) {
  listeners.add(onChange);
  return () => listeners.delete(onChange);
}

function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "paper" ? "paper" : "graphite";
}

function applyTheme(next: Theme) {
  if (next === "paper") document.documentElement.setAttribute("data-theme", "paper");
  else document.documentElement.removeAttribute("data-theme");
  try {
    window.localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // Storage can be blocked; the theme still applies for this visit.
  }
  listeners.forEach((notify) => notify());
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore<Theme>(subscribe, readTheme, () => "graphite");
  const isDark = theme === "graphite";

  // The new theme spreads out from the switch as a growing circle where the browser supports view transitions;
  // elsewhere, and for visitors who prefer reduced motion, it changes at once.
  const toggle = (event: MouseEvent<HTMLButtonElement>) => {
    // Read from the page itself, so the switch always flips what is actually shown.
    const next: Theme = readTheme() === "graphite" ? "paper" : "graphite";
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced || typeof document.startViewTransition !== "function") {
      applyTheme(next);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));

    root.classList.add("theme-switching");
    const transition = document.startViewTransition(() => flushSync(() => applyTheme(next)));
    transition.ready
      .then(() => {
        root.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
          { duration: 600, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" }
        );
      })
      .catch(() => undefined);
    transition.finished.finally(() => root.classList.remove("theme-switching")).catch(() => undefined);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="Dark mode"
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className="theme-toggle"
    >
      {/* Sun on the left, moon on the right; a teal disc sits behind the one in use. */}
      <span className="theme-toggle__thumb" aria-hidden="true" />
      <svg className="theme-toggle__icon theme-toggle__sun" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="4" fill="currentColor" />
        <path
          d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
      <svg className="theme-toggle__icon theme-toggle__moon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20.5 13.6A8.6 8.6 0 0 1 10.4 3.5a8.6 8.6 0 1 0 10.1 10.1Z" fill="currentColor" />
      </svg>
    </button>
  );
}
