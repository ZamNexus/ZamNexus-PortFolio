"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback, useSyncExternalStore } from "react";

const ANNOUNCEMENT_BAR_HEIGHT = 36;
const ANNOUNCEMENT_DISMISS_KEY = "zn_announcement_dismissed";

function subscribeToStorage(onChange: () => void) {
  window.addEventListener("storage", onChange);
  return () => window.removeEventListener("storage", onChange);
}

function readDismissed(): boolean {
  try {
    return window.localStorage.getItem(ANNOUNCEMENT_DISMISS_KEY) === "true";
  } catch {
    return false;
  }
}
const DROPDOWN_CLOSE_DELAY_MS = 0;

interface DropdownItem {
  label: string;
  href: string;
}

interface DropdownGroup {
  groupLabel: string;
  items: DropdownItem[];
}

interface NavItem {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
  groups?: DropdownGroup[];
  /** 1 = narrow single-column, 2 = wider two-column mega-menu. Default: 1. */
  columns?: 1 | 2;
}

const navLinks: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    columns: 2,
    dropdown: [
      { label: "AI & Automation", href: "/services#ai-automation" },
      { label: "SaaS Product Development", href: "/services#saas" },
      { label: "Cloud-Native Engineering", href: "/services#cloud" },
      { label: "Integration & Modernisation", href: "/services#integration" },
      { label: "Microsoft Dynamics 365", href: "/services#microsoft" },
      { label: "Salesforce", href: "/services#salesforce" },
    ],
  },
  {
    label: "Products",
    href: "/products",
    dropdown: [
      { label: "ZNXERP: ERP for manufacturers", href: "/products/znxerp" },
      { label: "ZNXePOS: Retail point of sale", href: "/products/znxepos" },
      { label: "ZNXEdu: School & campus management", href: "/products/znxedu" },
      { label: "ZNXCare: Hospital management & EHR", href: "/products/znxcare" },
    ],
  },
  {
    label: "Insights",
    href: "/insights",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

interface IndicatorStyle {
  left: number;
  width: number;
  opacity: number;
}

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  // Hidden on the server and until the stored choice is read, so it never flashes for people who closed it.
  const storedDismissed = useSyncExternalStore(subscribeToStorage, readDismissed, () => true);
  const [dismissedNow, setDismissedNow] = useState(false);
  const barDismissed = storedDismissed || dismissedNow;
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [indicator, setIndicator] = useState<IndicatorStyle>({ left: 0, width: 0, opacity: 0 });

  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const dismissBar = () => {
    setDismissedNow(true);
    try {
      window.localStorage.setItem(ANNOUNCEMENT_DISMISS_KEY, "true");
    } catch {
      // Storage blocked (private mode): the bar stays closed for this visit only.
    }
  };

  // ── Scroll: full hide on scroll-down / reveal on scroll-up ──
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      setScrolled(currentY > 40);

      if (delta > 8 && currentY > 120) {
        if (!mobileOpen) {
          setVisible(false);
          setOpenIdx(null);
        }
      } else if (delta < -5) {
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileOpen]);

  // ── Lock background scroll & interaction when mobile drawer is open ──
  useEffect(() => {
    if (mobileOpen) {
      const originalOverflow = document.body.style.overflow;
      const originalTouchAction = document.body.style.touchAction;
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.touchAction = originalTouchAction;
      };
    }
  }, [mobileOpen]);

  // ── Escape closes any open dropdown or mobile menu ──
  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenIdx(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, []);

  // ── Auto-close mobile drawer on desktop resize ──
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ── Morphing indicator: measure the target link's text bounds ──
  const activeIdx = navLinks.findIndex((link) =>
    link.href !== "/" ? pathname.startsWith(link.href) : pathname === "/"
  );

  const measureIndicator = useCallback(() => {
    const targetIdx = hoveredIdx !== null ? hoveredIdx : activeIdx;
    if (targetIdx < 0 || !navRef.current || !linkRefs.current[targetIdx]) {
      setIndicator((s) => ({ ...s, opacity: 0 }));
      return;
    }
    const linkEl = linkRefs.current[targetIdx]!;
    const textEl = linkEl.querySelector<HTMLElement>(".nav-link-text");
    const measured = textEl ?? linkEl;
    const navRect = navRef.current.getBoundingClientRect();
    const rect = measured.getBoundingClientRect();
    setIndicator({
      left: rect.left - navRect.left,
      width: rect.width,
      opacity: 1,
    });
  }, [hoveredIdx, activeIdx]);

  useEffect(() => {
    measureIndicator();
  }, [measureIndicator, scrolled]);

  useEffect(() => {
    const onResize = () => measureIndicator();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [measureIndicator]);

  // ── Dropdown open/close helpers with delayed close for cursor bridge ──
  const openDropdown = (idx: number) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setHoveredIdx(idx);
    if (navLinks[idx].dropdown) setOpenIdx(idx);
  };

  const scheduleClose = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = setTimeout(() => {
      setOpenIdx(null);
      setHoveredIdx(null);
    }, DROPDOWN_CLOSE_DELAY_MS);
  };

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* ── STICKY ANNOUNCEMENT BAR ─────────────────────────────────────────── */}
      {!barDismissed && (
        <div
          role="status"
          className="sticky top-0 inset-x-0 z-[60] h-9 flex items-center justify-center gap-3 px-4 text-center bg-gradient-to-r from-[var(--accent)]/20 via-[#8B5CF6]/20 to-[var(--accent)]/20 border-b border-[var(--accent)]/25 backdrop-blur-sm"
        >
          <p className="text-xs sm:text-[13px] font-medium text-zinc-200 truncate">
            Four platforms for manufacturing, retail, education and healthcare.{" "}
            <Link href="/products" className="font-bold text-[var(--accent-text)] hover:underline">
              See the products →
            </Link>
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

      {/* ── PRIMARY NAV BAR ─────────────────────────────────────────────────── */}
      <header
        style={{ top: barDismissed ? 0 : ANNOUNCEMENT_BAR_HEIGHT }}
        className={`fixed inset-x-0 z-50 transition-all duration-300 ease-out ${
          visible || mobileOpen ? "translate-y-0" : "-translate-y-full"
        } ${
          mobileOpen
            ? "bg-[#090b10] border-b border-white/[0.08]"
            : scrolled
            ? "bg-[#0A0F1E]/85 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="relative z-50 max-w-7xl mx-auto px-5 sm:px-10 lg:px-14 flex items-center justify-between h-[80px]">
          {/* ── LEFT: Brand Logo ── */}
          <Link
            href="/"
            className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-hover)]/60 rounded-lg"
            aria-label="ZamNexus Home"
          >
            <Image
              src="/znx_logo_clean.png"
              alt="ZamNexus"
              width={220}
              height={110}
              className="h-12 sm:h-14 w-auto object-contain transition-all duration-300 drop-shadow-[0_0_14px_rgba(37,99,235,0.35)] group-hover:drop-shadow-[0_0_20px_rgba(59,130,246,0.55)]"
              priority
            />
          </Link>

          {/* ── CENTER: Inline Nav with dropdowns + morphing indicator ── */}
          <nav
            ref={navRef}
            className="hidden lg:flex relative items-center h-full"
            aria-label="Main navigation"
            onMouseLeave={() => {
              setHoveredIdx(null);
              scheduleClose();
            }}
          >
            {navLinks.map((link, idx) => {
              const isActive = idx === activeIdx;
              const isOpen = openIdx === idx;
              const hasDropdown = !!link.dropdown;
              return (
                <div
                  key={link.label}
                  className="nav-item"
                  onMouseEnter={() => openDropdown(idx)}
                >
                  <Link
                    href={link.href}
                    ref={(el) => {
                      linkRefs.current[idx] = el;
                    }}
                    aria-haspopup={hasDropdown ? "menu" : undefined}
                    aria-expanded={hasDropdown ? isOpen : undefined}
                    className={`nav-link ${isActive ? "nav-link--active" : ""}`}
                  >
                    <span className="nav-link-text">{link.label}</span>
                    {hasDropdown && (
                      <span
                        className={`nav-chevron ${isOpen ? "nav-chevron--open" : ""}`}
                        aria-hidden="true"
                      >
                        <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M3 4.5l3 3 3-3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    )}
                  </Link>

                  {/* ── DROPDOWN ── */}
                  {hasDropdown && (
                    <div
                      role="menu"
                      aria-hidden={!isOpen}
                      className={`nav-dropdown ${isOpen ? "nav-dropdown--open" : ""} ${
                        link.columns === 2 ? "nav-dropdown--wide" : ""
                      }`}
                      style={{ transition: "opacity 150ms ease-out, transform 150ms ease-out" }}
                    >
                      {link.groups ? (
                        /* Grouped mega-menu for Products */
                        <div className="nav-dropdown-inner flex gap-6 min-w-[280px]">
                          {link.groups.map((group) => (
                            <div key={group.groupLabel} className="flex-1 min-w-[120px]">
                              <div className="text-[10px] font-mono uppercase tracking-widest text-foreground-muted font-bold px-2 pb-2 border-b border-zinc-800/60 mb-1">
                                {group.groupLabel}
                              </div>
                              {group.items.map((item) => (
                                <Link
                                  key={`${item.label}-${item.href}`}
                                  href={item.href}
                                  role="menuitem"
                                  className="nav-dropdown-item"
                                  onClick={() => setOpenIdx(null)}
                                >
                                  <span className="nav-dropdown-item-label">{item.label}</span>
                                </Link>
                              ))}
                            </div>
                          ))}
                        </div>
                      ) : (
                        /* Standard flat dropdown */
                        <div
                          className={`nav-dropdown-inner ${
                            link.columns === 2 ? "nav-dropdown-inner--grid" : ""
                          }`}
                        >
                          {link.dropdown!.map((item) => (
                            <Link
                              key={`${item.label}-${item.href}`}
                              href={item.href}
                              role="menuitem"
                              className="nav-dropdown-item"
                              onClick={() => setOpenIdx(null)}
                            >
                              <span className="nav-dropdown-item-label">{item.label}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Single morphing indicator */}
            <span
              aria-hidden="true"
              className="nav-indicator"
              style={{
                transform: `translateX(${indicator.left}px)`,
                width: `${indicator.width}px`,
                opacity: indicator.opacity,
              }}
            />
          </nav>

          {/* ── RIGHT: CTA ── */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            <Link href="/contact" className="nav-cta">
              <span>Book a consultation</span>
              <span className="nav-cta-arrow" aria-hidden="true">→</span>
            </Link>
          </div>

          {/* ── MOBILE / TABLET CONTROLS ── */}
          <div className="lg:hidden flex items-center gap-2">
            <Link href="/contact" className="nav-cta nav-cta--compact">
              <span>Book a consultation</span>
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2.5 rounded-lg text-zinc-300 hover:text-white hover:bg-white/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-hover)]"
              aria-label={mobileOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav-drawer"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ── MOBILE NAV DRAWER (FULL-VIEWPORT FULLY OPAQUE BACKDROP) ── */}
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className={`lg:hidden fixed inset-0 top-0 left-0 right-0 bottom-0 w-full h-[100dvh] min-h-screen bg-[#090b10] z-40 flex flex-col transition-transform duration-[220ms] ease-out will-change-transform ${
            mobileOpen
              ? "translate-x-0 pointer-events-auto visible"
              : "translate-x-full pointer-events-none invisible"
          }`}
          style={{
            paddingTop: barDismissed ? "80px" : `${ANNOUNCEMENT_BAR_HEIGHT + 80}px`,
          }}
        >
          {/* Scrollable Nav Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6 space-y-2 overscroll-contain flex flex-col justify-between">
            <div className="space-y-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href !== "/"
                    ? pathname.startsWith(link.href)
                    : pathname === "/";
                const expanded = mobileExpanded === link.label;
                const hasDropdown = !!link.dropdown;
                return (
                  <div key={link.label} className="border-b border-white/[0.05]">
                    <div className="flex items-center justify-between">
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex-1 py-3.5 px-2 text-base font-semibold transition-colors ${
                          isActive
                            ? "text-[var(--accent-hover)] font-bold"
                            : "text-zinc-200 hover:text-white"
                        }`}
                      >
                        {link.label}
                      </Link>
                      {hasDropdown && (
                        <button
                          type="button"
                          onClick={() =>
                            setMobileExpanded(expanded ? null : link.label)
                          }
                          className="p-3 text-zinc-400 hover:text-white transition-colors"
                          aria-label={expanded ? `Collapse ${link.label}` : `Expand ${link.label}`}
                          aria-expanded={expanded}
                        >
                          <svg
                            className={`w-4 h-4 transition-transform duration-200 ${
                              expanded ? "rotate-180 text-[var(--accent-hover)]" : ""
                            }`}
                            viewBox="0 0 12 12"
                            fill="none"
                          >
                            <path
                              d="M3 4.5l3 3 3-3"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                      )}
                    </div>
                    {hasDropdown && expanded && (
                      <div className="pb-3 pl-4 space-y-1 bg-zinc-950/60 rounded-xl mb-2 p-2 border border-zinc-800/40">
                        {link.dropdown!.map((item) => (
                          <Link
                            key={`${item.label}-${item.href}`}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-2 px-3 text-sm text-zinc-300 hover:text-[var(--accent-hover)] hover:bg-zinc-800/50 rounded-lg transition-colors font-medium"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Bottom Drawer Actions & Enterprise Links */}
            <div className="pt-6 pb-8 space-y-4">
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="liquid-lime-btn w-full justify-center text-sm py-3.5"
              >
                <span>Book a consultation</span>
                <span className="arrow-icon w-6 h-6 text-xs" aria-hidden="true">→</span>
              </Link>

              <div className="flex items-center justify-between text-xs font-mono text-foreground-muted pt-2 border-t border-zinc-800/60">
                <Link
                  href="/privacy"
                  onClick={() => setMobileOpen(false)}
                  className="hover:text-zinc-300 transition-colors"
                >
                  Privacy Policy
                </Link>
                <span>·</span>
                <Link
                  href="/terms"
                  onClick={() => setMobileOpen(false)}
                  className="hover:text-zinc-300 transition-colors"
                >
                  Terms of Service
                </Link>
                <span>·</span>
                <span className="text-foreground-muted">Enterprise AI</span>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
