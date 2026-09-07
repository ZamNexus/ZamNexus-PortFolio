"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: "Solutions", href: "/Solutions" },
    { label: "Services", href: "/Services" },
    { label: "Platforms", href: "/Platforms" },
    { label: "Industries", href: "/Industries" },
    { label: "Insights", href: "/Insights" },
    { label: "About", href: "/About" },
  ];

  return (
    <header className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 pt-4 pointer-events-none">
      <div className="max-w-6xl mx-auto rounded-full bg-[#11141D]/85 backdrop-blur-2xl border border-zinc-800/80 px-6 py-3 flex items-center justify-between shadow-2xl pointer-events-auto transition-all">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-full bg-[#D0FF71] flex items-center justify-center text-black font-extrabold text-sm group-hover:scale-110 transition-transform shadow-md shadow-[#D0FF71]/20">
            Z
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-xl font-bold tracking-tight text-white">
              ZamNexus<span className="text-[#D0FF71]">.</span>
            </span>
            <span className="text-[8px] font-mono text-zinc-500 tracking-wider hidden sm:block">
              A ZAMOOQ LIMITED BRAND
            </span>
          </div>
        </Link>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center gap-0.5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
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

        {/* CTA Button — Desktop */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/Contact"
            className="liquid-lime-btn text-sm py-2 px-5"
          >
            <span>Talk to Us</span>
            <span className="arrow-icon w-6 h-6 text-xs">→</span>
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileOpen && (
        <div className="lg:hidden max-w-sm mx-auto mt-2 rounded-3xl bg-[#11141D]/95 backdrop-blur-2xl border border-zinc-800 p-6 shadow-2xl pointer-events-auto space-y-4 text-center animate-fade-in">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
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
              <span className="arrow-icon w-6 h-6 text-xs">→</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
