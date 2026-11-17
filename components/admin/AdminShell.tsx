"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Toaster from "@/components/admin/Toaster";
import { api } from "@/components/admin/api";
import { IconArticles, IconClose, IconLogout, IconMenu, IconOverview, IconPlus, IconSettings, IconTag, IconExternal } from "@/components/admin/icons";

interface NavItem {
  href: string;
  label: string;
  icon: (p: React.SVGProps<SVGSVGElement>) => React.JSX.Element;
  active: (path: string) => boolean;
}

const NAV: NavItem[] = [
  { href: "/admin/dashboard", label: "Overview", icon: IconOverview, active: (p) => p === "/admin/dashboard" },
  { href: "/admin/articles", label: "Articles", icon: IconArticles, active: (p) => p === "/admin/articles" || p.startsWith("/admin/articles/edit") },
  { href: "/admin/articles/create", label: "Create Article", icon: IconPlus, active: (p) => p === "/admin/articles/create" },
  { href: "/admin/categories", label: "Categories", icon: IconTag, active: (p) => p.startsWith("/admin/categories") },
  { href: "/admin/settings", label: "Settings", icon: IconSettings, active: (p) => p.startsWith("/admin/settings") },
];

export default function AdminShell({ email, children }: { email: string; children: ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const signOut = async () => {
    setSigningOut(true);
    try {
      await api("/api/admin/logout", { method: "POST", body: {} });
    } catch {
      // Even if the request fails, leave: the cookie expires on its own and the proxy gates every page.
    }
    // A full page load on purpose: signed out, so every cached client-side page must go.
    // eslint-disable-next-line @next/next/no-location-assign-relative-destination
    window.location.href = "/admin/login";
  };

  return (
    <Toaster>
      <div className="adm-shell">
        <header className="adm-topbar">
          <Link href="/admin/dashboard" className="adm-brand" style={{ padding: 0 }}>
            <Image src="/znx_logo_teal.png" alt="ZamNexus" width={110} height={55} className="adm-brand__logo logo-dark" />
            <Image src="/znx_logo_teal_light.png" alt="" aria-hidden="true" width={110} height={55} className="adm-brand__logo logo-light" />
          </Link>
          <button type="button" className="adm-btn adm-btn--sm" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}>
            <IconMenu />
          </button>
        </header>

        {open ? <div className="adm-scrim" onClick={() => setOpen(false)} aria-hidden="true" /> : null}

        <aside className="adm-side" data-open={open} aria-label="Admin navigation">
          <div className="adm-brand">
            <Image src="/znx_logo_teal.png" alt="ZamNexus" width={110} height={55} className="adm-brand__logo logo-dark" priority />
            <Image src="/znx_logo_teal_light.png" alt="" aria-hidden="true" width={110} height={55} className="adm-brand__logo logo-light" priority />
            <span className="adm-brand__tag">Admin</span>
            <button type="button" className="adm-btn adm-btn--sm lg:hidden" style={{ marginLeft: 6, display: open ? undefined : "none" }} onClick={() => setOpen(false)} aria-label="Close menu">
              <IconClose />
            </button>
          </div>

          <nav className="adm-nav">
            {NAV.map(({ href, label, icon: Icon, active }) => (
              <Link key={href} href={href} className="adm-nav__link" aria-current={active(pathname) ? "page" : undefined} onClick={() => setOpen(false)}>
                <Icon />
                {label}
              </Link>
            ))}
            <Link href="/insights" className="adm-nav__link" target="_blank" rel="noopener">
              <IconExternal />
              View Insights page
            </Link>
          </nav>

          <div className="adm-side__foot">
            <span className="adm-user">
              Signed in as <b>{email}</b>
            </span>
            <button type="button" className="adm-btn adm-btn--block" onClick={signOut} disabled={signingOut}>
              {signingOut ? <span className="adm-spin" aria-hidden="true" /> : <IconLogout />}
              Logout
            </button>
          </div>
        </aside>

        <main className="adm-main">
          <div className="adm-container">{children}</div>
        </main>
      </div>
    </Toaster>
  );
}
