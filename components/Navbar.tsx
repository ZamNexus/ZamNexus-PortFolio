"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";

const ANNOUNCEMENT_BAR_HEIGHT = 36;
const ANNOUNCEMENT_DISMISS_KEY = "zn_announcement_dismissed";
const DROPDOWN_CLOSE_DELAY_MS = 140;

interface DropdownItem {
  label: string;
  href: string;
  description?: string;
}

interface NavItem {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
  /** 1 = narrow single-column, 2 = wider two-column mega-menu. Default: 1. */
  columns?: 1 | 2;
}

const navLinks: NavItem[] = [
  {
    label: "Solutions",
    href: "/Solutions",
    dropdown: [
      { label: "AI-Powered Business", href: "/Solutions", description: "Copilots, agents, and AI-native workflows" },
      { label: "SaaS Platforms", href: "/Solutions", description: "Multi-tenant products, API-first" },
      { label: "Cloud-Native Solutions", href: "/Solutions", description: "Serverless, event-driven backends" },
      { label: "Intelligent Automation", href: "/Solutions", description: "Workflows that decide and act" },
      { label: "Connected Enterprise", href: "/Solutions", description: "Unified data, systems, and intelligence" },
    ],
  },
  {
    label: "Services",
    href: "/Services",
    dropdown: [
      { label: "AI & Intelligent Solutions", href: "/Services", description: "Strategy, architecture, agents" },
      { label: "SaaS Product Development", href: "/Services", description: "From concept to enterprise scale" },
      { label: "Cloud-Native Engineering", href: "/Services", description: "AWS, TypeScript, event-driven" },
      { label: "Intelligent Automation", href: "/Services", description: "Business process automation + AI" },
      { label: "Microsoft Solutions", href: "/Services", description: "Dynamics 365, Power Platform, Azure" },
      { label: "Salesforce Solutions", href: "/Services", description: "Implementation, integration, AI" },
    ],
  },
  {
    label: "Products",
    href: "/Products",
    dropdown: [
      { label: "ZNXERP", href: "/Products/znxerp", description: "Enterprise resource planning" },
      { label: "ZNXePOS", href: "/Products/znxepos", description: "Point of sale for retail" },
      { label: "ZNXEdu", href: "/Products/znxedu", description: "Education management system" },
      { label: "ZNXCare", href: "/Products/znxcare", description: "Patient management" },
    ],
  },
  {
    label: "Platforms",
    href: "/Platforms",
    dropdown: [
      { label: "Microsoft Dynamics 365", href: "/Platforms", description: "Sales, Service, Field Service" },
      { label: "Power Platform", href: "/Platforms", description: "Power Apps, Power Automate, Copilot" },
      { label: "Microsoft Azure", href: "/Platforms", description: "Cloud infrastructure & integration" },
      { label: "Salesforce", href: "/Platforms", description: "CRM, automation, data cloud" },
    ],
  },
  {
    label: "Industries",
    href: "/Industries",
    columns: 2,
    dropdown: [
      { label: "Financial Services", href: "/Industries" },
      { label: "Professional Services", href: "/Industries" },
      { label: "Property & Facilities", href: "/Industries" },
      { label: "Retail & E-Commerce", href: "/Industries" },
      { label: "Education", href: "/Industries" },
      { label: "Healthcare", href: "/Industries" },
      { label: "Public Sector", href: "/Industries" },
      { label: "Non-Profit Organisations", href: "/Industries" },
      { label: "Technology & SaaS", href: "/Industries" },
    ],
  },
  {
    label: "About",
    href: "/About",
    dropdown: [
      { label: "Our Story", href: "/About", description: "Who we are, why we build" },
      { label: "Insights", href: "/Insights", description: "Perspectives from the team" },
      { label: "Contact", href: "/Contact", description: "Start a conversation" },
    ],
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
  const [barDismissed, setBarDismissed] = useState(true);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [indicator, setIndicator] = useState<IndicatorStyle>({ left: 0, width: 0, opacity: 0 });

  const lastScrollY = useRef(0);
  const navRef = useRef<HTMLElement>(null);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const dismissed = window.localStorage.getItem(ANNOUNCEMENT_DISMISS_KEY) === "true";
    setBarDismissed(dismissed);
  }, []);

  const dismissBar = () => {
    setBarDismissed(true);
    window.localStorage.setItem(ANNOUNCEMENT_DISMISS_KEY, "true");
  };

  // ── Scroll: full hide on scroll-down / reveal on scroll-up ──
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      setScrolled(currentY > 40);

      if (delta > 8 && currentY > 120) {
        setVisible(false);
        setMobileOpen(false);
        setOpenIdx(null);
      } else if (delta < -5) {
        setVisible(true);
      }

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Escape closes any open dropdown ──
  useEffect(() => {
    const onKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIdx(null);
    };
    window.addEventListener("keydown", onKeydown);
    return () => window.removeEventListener("keydown", onKeydown);
  }, []);

  // ── Morphing indicator: measure the target link's text bounds ──
  const activeIdx = navLinks.findIndex((link) =>
    link.href === "/Products" ? pathname.startsWith("/Products") : pathname === link.href
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

      {/* ── PRIMARY NAV BAR ─────────────────────────────────────────────────── */}
      <header
        style={{ top: barDismissed ? 0 : ANNOUNCEMENT_BAR_HEIGHT }}
        className={`fixed inset-x-0 z-50 transition-all duration-300 ease-out ${
          visible ? "translate-y-0" : "-translate-y-full"
        } ${
          scrolled
            ? "bg-[#0A0F1E]/85 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-14 flex items-center justify-between h-[80px]">
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
                  key={link.href}
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
                    >
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
                            {item.description && (
                              <span className="nav-dropdown-item-desc">
                                {item.description}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
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
            <Link href="/Contact" className="nav-cta">
              <span>Talk to Us</span>
              <span className="nav-cta-arrow" aria-hidden="true">→</span>
            </Link>
          </div>

          {/* ── MOBILE / TABLET CONTROLS ── */}
          <div className="lg:hidden flex items-center gap-2">
            <Link href="/Contact" className="nav-cta nav-cta--compact">
              <span>Talk to Us</span>
            </Link>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md text-zinc-300 hover:text-white hover:bg-white/5 transition-colors"
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

        {/* ── MOBILE MENU PANEL ── */}
        {mobileOpen && (
          <div className="lg:hidden absolute top-full inset-x-0 border-t border-white/[0.06] bg-[#0A0F1E]/95 backdrop-blur-xl shadow-2xl animate-fade-in max-h-[calc(100vh-96px)] overflow-y-auto">
            <div className="max-w-7xl mx-auto px-5 sm:px-10 py-6 space-y-1">
              {navLinks.map((link) => {
                const isActive =
                  link.href === "/Products"
                    ? pathname.startsWith("/Products")
                    : pathname === link.href;
                const expanded = mobileExpanded === link.label;
                const hasDropdown = !!link.dropdown;
                return (
                  <div key={link.href} className="border-b border-white/[0.04]">
                    <div className="flex items-center justify-between">
                      <Link
                        href={link.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex-1 py-3.5 px-2 text-base font-medium transition-colors ${
                          isActive
                            ? "text-[var(--accent-hover)]"
                            : "text-zinc-300 hover:text-white"
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
                          className="p-3 text-zinc-500 hover:text-white transition-colors"
                          aria-label={expanded ? "Collapse" : "Expand"}
                          aria-expanded={expanded}
                        >
                          <svg
                            className={`w-4 h-4 transition-transform duration-200 ${
                              expanded ? "rotate-180" : ""
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
                      <div className="pb-3 pl-4 space-y-1">
                        {link.dropdown!.map((item) => (
                          <Link
                            key={`${item.label}-${item.href}`}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="block py-2 px-2 text-sm text-zinc-400 hover:text-[var(--accent-hover)] transition-colors"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
              <div className="pt-4">
                <Link
                  href="/Contact"
                  onClick={() => setMobileOpen(false)}
                  className="nav-cta w-full justify-center"
                >
                  <span>Talk to Us</span>
                  <span className="nav-cta-arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
