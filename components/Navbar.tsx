"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const ANNOUNCEMENT_BAR_HEIGHT = 36;
const ANNOUNCEMENT_DISMISS_KEY = "zn_announcement_dismissed";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [barDismissed, setBarDismissed] = useState(true); // default true until localStorage checked, avoids SSR flash
  const lastScrollY = useRef(0);

  useEffect(() => {
    const dismissed = window.localStorage.getItem(ANNOUNCEMENT_DISMISS_KEY) === "true";
    setBarDismissed(dismissed);
  }, []);

  const dismissBar = () => {
    setBarDismissed(true);
    window.localStorage.setItem(ANNOUNCEMENT_DISMISS_KEY, "true");
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      setScrolled(currentY > 80);

      // Hide on downward scroll past 120px; reveal on upward scroll
      if (delta > 8 && currentY > 120) {
        setVisible(false);
        setMobileOpen(false); // close mobile menu when hiding
      } else if (delta < -5) {
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Solutions", href: "/Solutions" },
    { label: "Services", href: "/Services" },
    { label: "Products", href: "/Products" },
    { label: "Platforms", href: "/Platforms" },
    { label: "Industries", href: "/Industries" },
    { label: "About", href: "/About" },
  ];

  // Active page label for mobile compact indicator
  const currentActiveLink = navLinks.find((link) =>
    link.href === "/Products"
      ? pathname.startsWith("/Products")
      : pathname === link.href
  );
  const activePageLabel = currentActiveLink?.label || "Explore";

  return (
    <>
      {/* ── STICKY ANNOUNCEMENT BAR ── */}
      {!barDismissed && (
        <div
          role="status"
          className="sticky top-0 inset-x-0 z-[60] h-9 flex items-center justify-center gap-3 px-4 text-center bg-gradient-to-r from-[var(--accent)]/20 via-[#8B5CF6]/20 to-[var(--accent)]/20 border-b border-[var(--accent)]/25 backdrop-blur-sm"
        >
          <p className="text-xs sm:text-[13px] font-medium text-zinc-200 truncate">
            <span aria-hidden="true">🚀</span>{" "}
            Now serving <span className="font-bold text-[var(--accent-hover)]">9 industries</span> with AI-powered automation
          </p>
          <button
            type="button"
            onClick={dismissBar}
            aria-label="Dismiss announcement"
            className="flex-shrink-0 text-zinc-400 hover:text-white transition-colors"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      <header
        style={{ top: barDismissed ? 0 : ANNOUNCEMENT_BAR_HEIGHT }}
        className={`fixed inset-x-0 z-50 px-5 sm:px-10 lg:px-14 pt-4 sm:pt-5 pointer-events-none transition-all duration-300 ease-out ${
          visible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* ── TOP LEFT: Standalone Brand Logo ── */}
        <div className="flex-shrink-0">
          <Link
            href="/"
            className="group flex items-center gap-2.5 transition-transform duration-300 hover:scale-[1.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D0FF71]/60 rounded-xl"
            aria-label="ZamNexus Home"
          >
            <Image
              src="/znx_logo_clean.png"
              alt="ZamNexus"
              width={260}
              height={130}
              className="h-12 sm:h-14 md:h-16 lg:h-[4.5rem] w-auto object-contain drop-shadow-[0_0_18px_rgba(208,255,113,0.35)] group-hover:drop-shadow-[0_0_28px_rgba(208,255,113,0.65)] transition-all duration-300"
              priority
            />
          </Link>
        </div>

        {/* ── TOP CENTER: Refined Compact Floating Capsule Navbar ── */}
        <nav
          className={`hidden lg:flex items-center gap-2 rounded-full px-6 py-3 transition-all duration-300 ${
            scrolled
              ? "bg-[#11141D]/85 backdrop-blur-2xl border border-zinc-800/80 shadow-[0_16px_36px_rgba(0,0,0,0.55),0_0_20px_rgba(208,255,113,0.05)] hover:border-zinc-700/80"
              : "bg-transparent backdrop-blur-0 border border-transparent shadow-none"
          }`}
          aria-label="Main navigation"
        >
          {navLinks.map((link) => {
            const isActive =
              link.href === "/Products"
                ? pathname.startsWith("/Products")
                : pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative px-5 py-2.5 rounded-full text-sm font-medium tracking-tight transition-all duration-200 ${
                  isActive
                    ? "bg-zinc-800/90 text-[#D0FF71] shadow-inner font-semibold"
                    : "text-zinc-400 hover:text-white hover:bg-zinc-800/40"
                }`}
              >
                {link.label}
                {isActive ? (
                  <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D0FF71] shadow-[0_0_6px_#D0FF71]"
                    aria-hidden="true"
                  />
                ) : (
                  <span
                    className="absolute bottom-1.5 left-5 right-5 h-px bg-[var(--accent-hover)] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* ── TOP RIGHT: CTA Button (Desktop) ── */}
        <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
          <Link
            href="/Contact"
            className="liquid-lime-btn animate-cta-pulse text-sm py-3 px-7 rounded-full font-semibold flex items-center gap-2"
          >
            <span>Talk to Us</span>
            <span className="arrow-icon w-6 h-6 text-xs" aria-hidden="true">→</span>
          </Link>
        </div>

        {/* ── MOBILE / TABLET CONTROLS ── */}
        <div className="lg:hidden flex items-center gap-2">
          <Link
            href="/Contact"
            className="liquid-lime-btn animate-cta-pulse text-[11px] py-1.5 px-3.5 rounded-full font-semibold"
          >
            <span>Talk to Us</span>
          </Link>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 rounded-full bg-[#11141D]/90 backdrop-blur-xl border border-zinc-800 text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors shadow-lg"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileOpen}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* ── MOBILE MENU DROPDOWN ── */}
      {mobileOpen && (
        <div className="lg:hidden max-w-sm mx-auto mt-3 rounded-3xl bg-[#11141D]/95 backdrop-blur-2xl border border-zinc-800 p-5 shadow-2xl pointer-events-auto space-y-3 animate-fade-in">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/Products"
                  ? pathname.startsWith("/Products")
                  : pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-2 px-3.5 rounded-xl text-sm font-medium transition-all flex items-center justify-between ${
                    isActive
                      ? "bg-zinc-800/70 text-[#D0FF71]"
                      : "text-zinc-300 hover:text-[#D0FF71] hover:bg-zinc-800/30"
                  }`}
                >
                  <span>{link.label}</span>
                  {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#D0FF71]" />}
                </Link>
              );
            })}
          </div>
          <div className="pt-2 border-t border-zinc-800/80">
            <Link
              href="/Contact"
              onClick={() => setMobileOpen(false)}
              className="liquid-lime-btn w-full justify-center text-xs py-2.5"
            >
              <span>Talk to Us</span>
              <span className="arrow-icon w-5 h-5 text-[11px]" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      )}
      </header>
    </>
  );
}
