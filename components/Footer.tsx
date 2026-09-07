import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#090b10] text-zinc-400 py-16 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Pre-footer CTA Banner */}
        <div className="rounded-3xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800 p-8 sm:p-14 mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
              Ready to Transform Your Business?
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Let&apos;s connect your ideas,<br className="hidden sm:block" /> technology and intelligence.
            </h3>
            <p className="text-zinc-400 text-base max-w-md">
              Whether you are exploring AI, building a SaaS product, developing cloud-native systems or automating complex processes — ZamNexus is ready to help.
            </p>
          </div>
          <div className="flex-shrink-0">
            <Link href="/Contact" className="liquid-lime-btn text-base py-3.5 px-8">
              <span>Start a Conversation</span>
              <span className="arrow-icon w-8 h-8 text-sm">→</span>
            </Link>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#D0FF71] flex items-center justify-center text-black font-extrabold text-sm">
                Z
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-2xl font-bold tracking-tight text-white">
                  ZamNexus<span className="text-[#D0FF71]">.</span>
                </span>
                <span className="text-[8px] font-mono text-zinc-500 tracking-wider">
                  A ZAMOOQ LIMITED BRAND
                </span>
              </div>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              Connecting Intelligence. Enabling Action. We design and deliver intelligent solutions powered by AI, cloud-native engineering, SaaS, automation and modern business applications.
            </p>
          </div>

          {/* Solutions & Services */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-4">
              Solutions
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/Solutions" className="hover:text-[#D0FF71] transition-colors">
                  AI-Powered Business
                </Link>
              </li>
              <li>
                <Link href="/Solutions" className="hover:text-[#D0FF71] transition-colors">
                  SaaS Platforms
                </Link>
              </li>
              <li>
                <Link href="/Solutions" className="hover:text-[#D0FF71] transition-colors">
                  Cloud-Native Solutions
                </Link>
              </li>
              <li>
                <Link href="/Solutions" className="hover:text-[#D0FF71] transition-colors">
                  Intelligent Automation
                </Link>
              </li>
              <li>
                <Link href="/Solutions" className="hover:text-[#D0FF71] transition-colors">
                  Connected Enterprise
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
                <Link href="/Services" className="hover:text-[#D0FF71] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/Platforms" className="hover:text-[#D0FF71] transition-colors">
                  Platforms
                </Link>
              </li>
              <li>
                <Link href="/Industries" className="hover:text-[#D0FF71] transition-colors">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="/Insights" className="hover:text-[#D0FF71] transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/About" className="hover:text-[#D0FF71] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/Contact" className="hover:text-[#D0FF71] transition-colors">
                  Contact
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
                <Link href="/Services" className="hover:text-[#D0FF71] transition-colors">
                  AI & Intelligent Solutions
                </Link>
              </li>
              <li>
                <Link href="/Services" className="hover:text-[#D0FF71] transition-colors">
                  Cloud-Native Engineering
                </Link>
              </li>
              <li>
                <Link href="/Platforms" className="hover:text-[#D0FF71] transition-colors">
                  Microsoft Solutions
                </Link>
              </li>
              <li>
                <Link href="/Platforms" className="hover:text-[#D0FF71] transition-colors">
                  Salesforce Solutions
                </Link>
              </li>
              <li>
                <Link href="/Services" className="hover:text-[#D0FF71] transition-colors">
                  SaaS Development
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <div>
            © {new Date().getFullYear()} ZamNexus, a technology brand of Zamooq Limited. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/Contact" className="hover:text-zinc-300 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/Contact" className="hover:text-zinc-300 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
