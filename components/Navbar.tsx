"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      // Hide on scroll down past 80px; show on any upward scroll
      if (delta > 0 && currentY > 80) {
        setVisible(false);
        setMobileOpen(false); // close mobile menu when hiding
      } else if (delta < 0) {
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

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 px-4 sm:px-6 pt-4 pointer-events-none transition-transform duration-300 ease-in-out ${
        visible ? "translate-y-0" : "-translate-y-[120%]"
      }`}
    >
      <div className="max-w-6xl mx-auto rounded-full bg-[#11141D]/90 backdrop-blur-2xl border border-zinc-800/80 px-5 py-3 flex items-center justify-between shadow-2xl pointer-events-auto">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group flex-shrink-0"
          aria-label="ZamNexus Home"
        >
          {/* High-contrast brand emblem badge */}
          <div className="h-10 px-2.5 py-1 rounded-xl bg-white flex items-center justify-center shadow-lg shadow-[#D0FF71]/25 border border-white/40 group-hover:scale-105 transition-all duration-300">
            <Image
              src="/logo_znx.png"
              alt="ZamNexus Logo"
              width={54}
              height={36}
              className="h-7 w-auto object-contain"
              priority
            />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-zinc-100 transition-colors">
              ZamNexus<span className="text-[#D0FF71]">.</span>
            </span>
            <span className="text-[8px] font-mono text-zinc-500 tracking-wider hidden sm:block mt-0.5">
              A ZAMOOQ LIMITED BRAND
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/Products"
                ? pathname.startsWith("/Products")
                : pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-zinc-800/90 text-[#D0FF71]"
                    : "text-zinc-300 hover:text-white hover:bg-zinc-800/40"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* CTA — Desktop */}
        <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
          <Link href="/Contact" className="liquid-lime-btn text-sm py-2 px-5">
            <span>Talk to Us</span>
            <span className="arrow-icon w-6 h-6 text-xs" aria-hidden="true">→</span>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileOpen}
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

      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="lg:hidden max-w-sm mx-auto mt-2 rounded-3xl bg-[#11141D]/95 backdrop-blur-2xl border border-zinc-800 p-6 shadow-2xl pointer-events-auto space-y-4 text-center animate-fade-in">
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
                  className={`py-2.5 px-4 rounded-xl text-base font-semibold transition-all ${
                    isActive
                      ? "bg-zinc-800/60 text-[#D0FF71]"
                      : "text-zinc-200 hover:text-[#D0FF71] hover:bg-zinc-800/30"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
          <div className="pt-2 border-t border-zinc-800">
            <Link
              href="/Contact"
              onClick={() => setMobileOpen(false)}
              className="liquid-lime-btn w-full justify-center text-sm py-3"
            >
              <span>Talk to Us</span>
              <span className="arrow-icon w-6 h-6 text-xs" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
