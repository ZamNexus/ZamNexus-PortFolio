import Image from "next/image";
import Link from "next/link";

import FinalCTA from "@/components/FinalCTA";

interface TechPartner {
  name: string;
}

const techPartners: TechPartner[] = [
  { name: "AWS" },
  { name: "Salesforce" },
  { name: "Microsoft" },
  { name: "Azure" },
];

export default function Footer({ hideCTA = false }: { hideCTA?: boolean } = {}) {
  return (
    <footer className="bg-[#050608] text-zinc-400 pt-16 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* ── PRE-FOOTER CTA ──────────────────────────────────────────────── */}
        {!hideCTA && (
          <FinalCTA
            eyebrow="Let's Talk"
            headline="Ready to connect intelligence?"
            description="Tell us what you're building — we'll show you how AI, automation and connected systems get you there faster."
            primaryButton={{
              label: "Book a Call",
              href: "/Contact",
            }}
            secondaryButton={{
              label: "Explore Services",
              href: "/Services",
            }}
            containerClassName="max-w-none px-0 py-0 mb-16"
          />
        )}

        {/* ── TECH PARTNER STRIP — muted, brightens on hover ───────────────── */}
        <div className="mb-16 pb-16 border-b border-zinc-800/60">
          <div className="text-center text-[10px] font-mono uppercase tracking-widest text-zinc-600 mb-6">
            Built On Enterprise-Grade Technology
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {techPartners.map((partner) => (
              <span
                key={partner.name}
                className="text-lg sm:text-xl font-bold tracking-tight text-zinc-600 grayscale opacity-60 hover:opacity-100 hover:text-white transition-all duration-300 cursor-default select-none"
              >
                {partner.name}
              </span>
            ))}
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Brand Info — large, prominent left column */}
          <div className="lg:col-span-5 space-y-5">
            <Link href="/" className="inline-flex items-center group transition-transform duration-300 hover:scale-105" aria-label="ZamNexus Home">
              <Image
                src="/znx_logo_clean.png"
                alt="ZamNexus Logo"
                width={280}
                height={145}
                className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-[0_0_16px_rgba(37,99,235,0.3)] group-hover:drop-shadow-[0_0_26px_rgba(37,99,235,0.65)] transition-all duration-300"
              />
            </Link>
            <p className="text-base sm:text-lg text-zinc-400 leading-relaxed max-w-md">
              We design and deliver intelligent enterprise solutions powered by AI,
              cloud-native engineering, SaaS, automation and modern business applications.
            </p>
            <div className="pt-1 flex items-center gap-2 text-xs font-mono">
              <span className="text-zinc-500 uppercase tracking-wider">Inquiries:</span>
              <a
                href="mailto:{{OFFICIAL_EMAIL}}"
                className="text-zinc-300 hover:text-[var(--accent-hover)] transition-colors"
              >
                {"{{OFFICIAL_EMAIL}}"}
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Services */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-4">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/Services#ai-intelligent" className="hover:text-[var(--accent-hover)] transition-colors">
                  AI & Intelligent
                </Link>
              </li>
              <li>
                <Link href="/Services#intelligent-automation" className="hover:text-[var(--accent-hover)] transition-colors">
                  Intelligent Automation
                </Link>
              </li>
              <li>
                <Link href="/Services#saas-development" className="hover:text-[var(--accent-hover)] transition-colors">
                  SaaS Platforms
                </Link>
              </li>
              <li>
                <Link href="/Services#cloud-native" className="hover:text-[var(--accent-hover)] transition-colors">
                  Cloud-Native
                </Link>
              </li>
              <li>
                <Link href="/Services#connected-enterprise" className="hover:text-[var(--accent-hover)] transition-colors">
                  Connected Enterprise
                </Link>
              </li>
              <li>
                <Link href="/Services#digital-transformation" className="hover:text-[var(--accent-hover)] transition-colors">
                  Digital Transformation
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/Services" className="hover:text-[var(--accent-hover)] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/Products" className="hover:text-[var(--accent-hover)] transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/Products/Platforms" className="hover:text-[var(--accent-hover)] transition-colors">
                  Platforms
                </Link>
              </li>
              <li>
                <Link href="/Products/Industries" className="hover:text-[var(--accent-hover)] transition-colors">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="/Insights" className="hover:text-[var(--accent-hover)] transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/About" className="hover:text-[var(--accent-hover)] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/Contact" className="hover:text-[var(--accent-hover)] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products Suite */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-4">
              Product Suite
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/Products/znxerp" className="hover:text-[var(--accent-hover)] transition-colors">
                  ZNXERP
                </Link>
              </li>
              <li>
                <Link href="/Products/znxepos" className="hover:text-[#7dd3fc] transition-colors">
                  ZNXePOS
                </Link>
              </li>
              <li>
                <Link href="/Products/znxedu" className="hover:text-[#c4b5fd] transition-colors">
                  ZNXEdu
                </Link>
              </li>
              <li>
                <Link href="/Products/znxcare" className="hover:text-[#6ee7b7] transition-colors">
                  ZNXCare
                </Link>
              </li>
            </ul>
          </div>

          {/* Capabilities */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-4">
              Capabilities
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/Services" className="hover:text-[var(--accent-hover)] transition-colors">
                  AI & Intelligent Solutions
                </Link>
              </li>
              <li>
                <Link href="/Services" className="hover:text-[var(--accent-hover)] transition-colors">
                  Cloud-Native Engineering
                </Link>
              </li>
              <li>
                <Link href="/Services#microsoft-solutions" className="hover:text-[var(--accent-hover)] transition-colors">
                  Microsoft Solutions
                </Link>
              </li>
              <li>
                <Link href="/Services#salesforce-solutions" className="hover:text-[var(--accent-hover)] transition-colors">
                  Salesforce Solutions
                </Link>
              </li>
              <li>
                <Link href="/Services" className="hover:text-[var(--accent-hover)] transition-colors">
                  SaaS Development
                </Link>
              </li>
            </ul>
          </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800/80 pt-8 pb-10 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <div>
            © {new Date().getFullYear()} ZamNexus, a technology brand of Zamooq Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/Privacy" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/Terms" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
