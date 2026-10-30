import Image from "next/image";
import Link from "next/link";

import FinalCTA from "@/components/FinalCTA";
import Reveal from "@/components/motion/Reveal";
import Stagger from "@/components/motion/Stagger";
import { company } from "@/lib/siteFacts";

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  heading: string;
  links: FooterLink[];
}

const columns: FooterColumn[] = [
  {
    heading: "Services",
    links: [
      { label: "AI & Automation", href: "/services#ai-automation" },
      { label: "SaaS Development", href: "/services#saas" },
      { label: "Cloud-Native", href: "/services#cloud" },
      { label: "Integration", href: "/services#integration" },
      { label: "Microsoft Dynamics 365", href: "/services#microsoft" },
      { label: "Salesforce", href: "/services#salesforce" },
    ],
  },
  {
    heading: "Products",
    links: [
      { label: "ZNXERP", href: "/products/znxerp" },
      { label: "ZNXePOS", href: "/products/znxepos" },
      { label: "ZNXEdu", href: "/products/znxedu" },
      { label: "ZNXCare", href: "/products/znxcare" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

// Technologies the team builds on. Not partner badges: those go on About once confirmed.
const technologies = ["AWS", "Microsoft Azure", "Dynamics 365", "Salesforce"];

export default function Footer({ hideCTA = false }: { hideCTA?: boolean } = {}) {
  return (
    <footer className="bg-[#050608] text-[var(--foreground-muted)] pt-16 px-4 sm:px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* ── PRE-FOOTER CTA ──────────────────────────────────────────────── */}
        {!hideCTA && (
          <FinalCTA
            eyebrow="Let's talk"
            headline="Tell us what you need to run better."
            description="Send a short brief and a senior engineer will reply within one business day."
            primaryButton={{
              label: "Book a consultation",
              href: "/contact",
            }}
            secondaryButton={{
              label: "See the products",
              href: "/products",
            }}
            containerClassName="max-w-none px-0 py-0 mb-16"
          />
        )}

        {/* Links Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-12">
          <Reveal className="lg:col-span-5 space-y-5">
            <Link href="/" className="inline-flex items-center" aria-label="ZamNexus home">
              <Image
                src="/znx_logo_clean.png"
                alt="ZamNexus"
                width={280}
                height={145}
                className="h-16 sm:h-20 w-auto object-contain"
              />
            </Link>
            <p className="text-base leading-relaxed max-w-md">
              Business platforms for manufacturing, retail, education and healthcare, and the engineers to build what
              you need next.
            </p>
            <a
              href="mailto:contact@zamnexus.com"
              className="footer-link text-sm text-[var(--foreground)]"
            >
              contact@zamnexus.com
            </a>
            <p className="text-xs">
              Built on {technologies.join(" · ")}
            </p>
          </Reveal>

          <nav aria-label="Footer" className="lg:col-span-7">
            <Stagger className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {columns.map((column) => (
              <div key={column.heading}>
                <h2 className="text-xs font-mono uppercase tracking-widest text-[var(--foreground-strong)] font-bold mb-4">
                  {column.heading}
                </h2>
                <ul className="space-y-2.5 text-sm">
                  {column.links.map((link) => (
                    <li key={link.href + link.label}>
                      <Link href={link.href} className="footer-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            </Stagger>
          </nav>
        </div>

        {/* Bottom Bar */}
        {/* The rule draws across as the bottom bar arrives */}
        <Reveal variant="draw" className="footer-rule">
          <span aria-hidden="true" />
        </Reveal>
        <div className="pt-8 pb-10 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-4">
          <div className="space-y-1">
            <p>© {company.legalName}. All rights reserved.</p>
            <p>
              {company.legalName}, registered in England &amp; Wales
              {company.companyNumber.confirmed ? `, company no. ${company.companyNumber.value}` : ""}. 34 Beaconsfield,
              Luton LU2 0RW, United Kingdom.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="footer-link">
              Privacy Policy
            </Link>
            <Link href="/terms" className="footer-link">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
