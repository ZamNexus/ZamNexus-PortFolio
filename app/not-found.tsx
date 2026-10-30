import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Page not found | ZamNexus",
  robots: { index: false },
};

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)] font-sans overflow-x-hidden">
      <Navbar />
      <main className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 pt-40 pb-28 text-center">
        <p className="text-xs font-mono uppercase tracking-widest font-bold text-[var(--accent-text)]">Error 404</p>
        <h1 className="mt-4 text-4xl sm:text-6xl font-bold tracking-tight text-[var(--foreground-strong)]">
          We couldn&apos;t find that page.
        </h1>
        <p className="mt-5 text-base text-[var(--foreground-muted)] leading-relaxed">
          It may have moved when we reorganised the site. These pages should get you where you need to go.
        </p>
        <nav aria-label="Suggested pages" className="mt-10 flex flex-wrap justify-center gap-3">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="px-5 py-3 rounded-full border border-[var(--border-subtle)] text-sm font-semibold text-[var(--foreground)] hover:border-[var(--border-strong)] hover:text-[var(--foreground-strong)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent-text)] transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </main>
      <Footer hideCTA />
    </div>
  );
}
