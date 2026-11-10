"use client";

import React, { type ReactNode } from "react";
import { motion } from "framer-motion";

export interface PillTabProps {
  id?: string;
  label: ReactNode;
  sublabel?: string;
  icon?: ReactNode;
  badge?: ReactNode;
  isSelected?: boolean;
  onClick?: () => void;
  variant?: "pill" | "card" | "tab";
  size?: "sm" | "md" | "lg";
  accent?: string;
  layoutId?: string;
  className?: string;
  ariaLabel?: string;
  role?: string;
  disabled?: boolean;
}

/**
 * PillTab / InteractiveChip Component
 *
 * Designed to eliminate mid-word truncations across tabs, filter pills,
 * and selection chips site-wide. Allows text to wrap or fit responsively,
 * provides complete WAI-ARIA accessible naming for screen readers,
 * and renders a crisp ~150ms visual active-state transition.
 */
export default function PillTab({
  id,
  label,
  sublabel,
  icon,
  badge,
  isSelected = false,
  onClick,
  variant = "pill",
  size = "md",
  accent,
  layoutId,
  className = "",
  ariaLabel,
  role,
  disabled = false,
}: PillTabProps) {
  // Smooth active-state transition (~150ms)
  const baseTransition = "transition-all duration-150 ease-out";

  // Size styling
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-xs sm:text-sm",
    lg: "px-5 py-2.5 text-sm sm:text-base",
  }[size];

  // ── Variant: "card" (e.g. Contact domain selector cards) ─────────────
  if (variant === "card") {
    const textLabel = typeof label === "string" ? label : ariaLabel || "";
    const computedAriaLabel = ariaLabel || textLabel || undefined;
    const labelId = id ? `${id}-label` : undefined;

    return (
      <button
        type="button"
        id={id}
        onClick={onClick}
        disabled={disabled}
        role={role || "checkbox"}
        aria-checked={isSelected}
        aria-label={computedAriaLabel}
        aria-labelledby={labelId}
        className={`group relative p-3 sm:p-3.5 rounded-xl border text-left cursor-pointer flex items-center justify-between gap-2.5 min-w-0 ${baseTransition} active:scale-[0.98] ${
          isSelected
            ? "bg-zinc-800 text-white shadow-md border-[var(--accent-hover)] ring-1 ring-[var(--accent-hover)]/30"
            : "bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60 hover:border-zinc-700"
        } ${className}`}
        style={{
          borderColor: isSelected ? (accent || "var(--accent-hover)") : undefined,
        }}
      >
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {icon && (
            <span className="text-base shrink-0 leading-none" aria-hidden="true">
              {icon}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <span
              id={labelId}
              className="font-mono text-xs font-medium whitespace-normal break-words leading-snug block text-zinc-100"
            >
              {label}
            </span>
            {sublabel && (
              <span className="text-[11px] font-mono text-foreground-muted whitespace-normal break-words mt-0.5 block">
                {sublabel}
              </span>
            )}
          </div>
        </div>

        {/* Selected-state visual confirmation indicator (~150ms animation) */}
        <span
          aria-hidden="true"
          className={`shrink-0 w-4 h-4 rounded-md border flex items-center justify-center text-[10px] font-mono font-bold transition-all duration-150 ease-out ${
            isSelected
              ? "bg-[var(--accent-hover)] border-[var(--accent-hover)] text-[#fff] scale-100 opacity-100 shadow-sm"
              : "border-zinc-700/80 bg-zinc-900/60 text-transparent scale-90 opacity-40 group-hover:border-zinc-600"
          }`}
          style={{
            backgroundColor: isSelected && accent ? accent : undefined,
            borderColor: isSelected && accent ? accent : undefined,
          }}
        >
          ✓
        </span>

        {isSelected && layoutId && (
          <motion.div
            layoutId={layoutId}
            className="absolute inset-0 rounded-xl border-2 pointer-events-none"
            style={{ borderColor: accent || "var(--accent-hover)" }}
            transition={{ type: "spring", stiffness: 350, damping: 30 }}
          />
        )}
      </button>
    );
  }

  // ── Variant: "tab" (docked flat tab with sliding highlight) ──────────
  if (variant === "tab") {
    const textLabel = typeof label === "string" ? label : ariaLabel || "";
    const computedAriaLabel = ariaLabel || textLabel || undefined;
    const labelId = id ? `${id}-label` : undefined;

    return (
      <button
        type="button"
        id={id}
        onClick={onClick}
        disabled={disabled}
        role={role || "tab"}
        aria-selected={isSelected}
        aria-label={computedAriaLabel}
        aria-labelledby={labelId}
        className={`relative ${sizeClasses} rounded-xl font-mono font-bold cursor-pointer flex items-center justify-center gap-2 min-w-0 ${baseTransition} active:scale-[0.98] ${
          isSelected
            ? "text-[#fff] shadow-lg"
            : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
        } ${className}`}
      >
        {isSelected && (
          <motion.div
            layoutId={layoutId || "pill-tab-active-indicator"}
            className="absolute inset-0 rounded-xl"
            style={{ background: accent || "var(--accent-hover)" }}
            transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
        <span className="relative z-10 flex items-center gap-1.5 whitespace-normal break-words text-center">
          {icon && <span className="shrink-0 leading-none" aria-hidden="true">{icon}</span>}
          <span id={labelId}>{label}</span>
          {badge && <span className="text-[10px] opacity-80 shrink-0">{badge}</span>}
        </span>
      </button>
    );
  }

  // ── Variant: "pill" (standard rounded-full pill) ─────────────────────
  const textLabel = typeof label === "string" ? label : ariaLabel || "";
  const computedAriaLabel = ariaLabel || textLabel || undefined;
  const labelId = id ? `${id}-label` : undefined;

  return (
    <button
      type="button"
      id={id}
      onClick={onClick}
      disabled={disabled}
      role={role || "button"}
      aria-pressed={role === "button" ? isSelected : undefined}
      aria-selected={role === "tab" ? isSelected : undefined}
      aria-label={computedAriaLabel}
      aria-labelledby={labelId}
      className={`relative ${sizeClasses} rounded-full font-mono font-bold cursor-pointer flex items-center justify-center gap-2 min-w-0 ${baseTransition} active:scale-[0.98] ${
        isSelected
          ? "bg-zinc-800 text-white border shadow-md ring-1 ring-[var(--accent-hover)]/30"
          : "bg-zinc-900/60 hover:bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800/80 hover:border-zinc-700"
      } ${className}`}
      style={{
        borderColor: isSelected ? (accent || "var(--accent-hover)") : undefined,
      }}
    >
      {icon && <span className="shrink-0 leading-none" aria-hidden="true">{icon}</span>}
      <span id={labelId} className="whitespace-normal break-words text-center leading-tight">
        {label}
      </span>
      {badge && (
        <span className="shrink-0 text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-zinc-800 text-zinc-300">
          {badge}
        </span>
      )}
      {isSelected && layoutId && (
        <motion.div
          layoutId={layoutId}
          className="absolute inset-0 rounded-full border-2 pointer-events-none"
          style={{ borderColor: accent || "var(--accent-hover)" }}
          transition={{ type: "spring", stiffness: 350, damping: 30 }}
        />
      )}
    </button>
  );
}

// Re-export aliases for semantic clarity across different pages
export { PillTab as InteractiveChip, PillTab as FilterChip };
