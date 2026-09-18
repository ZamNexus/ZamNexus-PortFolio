"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";

export interface CTAButtonProps {
  label: string;
  href?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
  className?: string;
  ariaLabel?: string;
  target?: string;
  rel?: string;
}

export interface CTASidePanelItem {
  label: string;
  sublabel?: string;
}

export interface CTASidePanel {
  title: string;
  items: CTASidePanelItem[];
}

export interface FinalCTAProps {
  id?: string;
  eyebrow: string;
  headline: string;
  description: string;
  primaryButton: CTAButtonProps;
  secondaryButton?: CTAButtonProps;
  sidePanel?: CTASidePanel;
  className?: string;
  containerClassName?: string;
}

export default function FinalCTA({
  id,
  eyebrow,
  headline,
  description,
  primaryButton,
  secondaryButton,
  sidePanel,
  className = "",
  containerClassName = "",
}: FinalCTAProps) {
  const shouldReduceMotion = useReducedMotion();

  // Animation variants
  const containerVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 28,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const listContainerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.08,
        delayChildren: shouldReduceMotion ? 0 : 0.15,
      },
    },
  };

  const listItemVariants: Variants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      x: shouldReduceMotion ? 0 : 12,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.4,
        ease: "easeOut",
      },
    },
  };

  const renderButton = (btn: CTAButtonProps, isPrimary: boolean) => {
    const isExternal =
      btn.href && (btn.href.startsWith("http://") || btn.href.startsWith("https://"));

    const basePrimaryClass =
      "liquid-lime-btn text-base py-3.5 sm:py-4 px-7 sm:px-8 inline-flex items-center gap-3";
    const baseSecondaryClass =
      "px-7 py-3.5 sm:py-4 rounded-full bg-zinc-800/80 hover:bg-zinc-700/90 text-zinc-200 border border-zinc-700 hover:border-zinc-500 font-semibold text-sm transition-all duration-300 inline-flex items-center gap-2";

    const buttonContent = (
      <>
        <span>{btn.label}</span>
        {isPrimary && (
          <span className="arrow-icon w-8 h-8 text-sm" aria-hidden="true">
            →
          </span>
        )}
      </>
    );

    const buttonClass =
      btn.className || (isPrimary ? basePrimaryClass : baseSecondaryClass);

    return (
      <motion.div
        key={btn.label}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
        whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        {btn.href ? (
          isExternal ? (
            <a
              href={btn.href}
              target={btn.target || "_blank"}
              rel={btn.rel || "noopener noreferrer"}
              onClick={btn.onClick}
              aria-label={btn.ariaLabel}
              className={buttonClass}
            >
              {buttonContent}
            </a>
          ) : (
            <Link
              href={btn.href}
              onClick={btn.onClick}
              aria-label={btn.ariaLabel}
              className={buttonClass}
            >
              {buttonContent}
            </Link>
          )
        ) : (
          <button
            type="button"
            onClick={btn.onClick}
            aria-label={btn.ariaLabel}
            className={`${buttonClass} cursor-pointer`}
          >
            {buttonContent}
          </button>
        )}
      </motion.div>
    );
  };

  const hasSidePanel = Boolean(sidePanel && sidePanel.items?.length > 0);

  return (
    <section
      aria-labelledby={id || "final-cta-heading"}
      className={`max-w-6xl mx-auto px-6 py-20 ${containerClassName}`}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={containerVariants}
        className={`relative isolate overflow-hidden rounded-3xl border border-zinc-800 bg-gradient-to-br from-zinc-900/90 via-zinc-900/60 to-zinc-950 p-8 sm:p-14 lg:p-16 shadow-2xl ${
          hasSidePanel
            ? "flex flex-col lg:flex-row items-center justify-between gap-12"
            : "text-center flex flex-col items-center justify-center"
        } ${className}`}
      >
        {/* Subtle background noise texture */}
        <div className="noise-overlay" aria-hidden="true" />

        {/* Ambient radial accent glow */}
        <div
          className="absolute -top-24 -left-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-40"
          style={{
            background: "radial-gradient(circle, var(--accent, #3B82F6) 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-[100px] pointer-events-none opacity-30"
          style={{
            background: "radial-gradient(circle, #8B5CF6 0%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        {/* Main Content Area */}
        <div className={`relative z-10 ${hasSidePanel ? "max-w-xl text-left" : "max-w-2xl mx-auto"}`}>
          <span className="text-xs font-mono uppercase tracking-widest text-[var(--accent-hover)] font-bold block mb-3">
            {eyebrow}
          </span>
          <h2
            id={id || "final-cta-heading"}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12]"
          >
            {headline}
          </h2>
          <p className="mt-4 text-zinc-400 text-base sm:text-lg leading-relaxed">
            {description}
          </p>

          <div
            className={`mt-8 flex flex-wrap items-center gap-4 ${
              hasSidePanel ? "" : "justify-center"
            }`}
          >
            {renderButton(primaryButton, true)}
            {secondaryButton && renderButton(secondaryButton, false)}
          </div>
        </div>

        {/* Optional Side Panel / Assurance Card (Variant A) */}
        {hasSidePanel && sidePanel && (
          <motion.div
            variants={listContainerVariants}
            className="relative z-10 w-full lg:w-80 p-6 sm:p-7 rounded-2xl bg-zinc-950/80 border border-zinc-800 space-y-4 shadow-xl shrink-0"
          >
            <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 font-bold border-b border-zinc-800/80 pb-3">
              {sidePanel.title}
            </div>

            <div className="space-y-3.5">
              {sidePanel.items.map((item) => (
                <motion.div
                  key={item.label}
                  variants={listItemVariants}
                  className="flex items-start gap-3 text-xs"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 select-none">
                    ✓
                  </span>
                  <div>
                    <div className="font-semibold text-zinc-200 leading-tight">
                      {item.label}
                    </div>
                    {item.sublabel && (
                      <div className="text-zinc-500 text-[11px] font-mono mt-0.5 leading-tight">
                        {item.sublabel}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
