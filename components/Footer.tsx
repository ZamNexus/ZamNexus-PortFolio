import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/80 bg-[#090b10] text-zinc-400 py-16 px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        {/* Pre-footer Banner */}
        <div className="rounded-3xl bg-gradient-to-b from-zinc-900/90 to-zinc-950 border border-zinc-800 p-8 sm:p-14 mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#D0FF71] font-bold">
              Start Your Transformation
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Have a project in mind?
            </h3>
            <p className="text-zinc-400 text-base max-w-md">
              Let&apos;s innovate, create, and deliver high-impact software tailored to your vision.
            </p>
          </div>
          <div>
            <Link href="/Contact" className="liquid-lime-btn text-base py-3.5 px-8">
              <span>Start a project</span>
              <span className="arrow-icon w-8 h-8 text-sm">→</span>
            </Link>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Info */}
          <div className="col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#D0FF71] flex items-center justify-center text-black font-extrabold text-sm">
                Z
              </div>
              <span className="text-2xl font-bold tracking-tight text-white">
                Zamooq<span className="text-[#D0FF71]">.</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm">
              Innovate, Create, Deliver: Software development, AI engineering, and cloud consulting that drives measurable enterprise impact.
            </p>
            <div className="text-xs font-mono text-[#D0FF71]">
              Owner & CEO: Mir Mujeeb Ul Hassan
            </div>
          </div>

          {/* Nav column 1 */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/Services" className="hover:text-[#D0FF71] transition-colors">Services</Link></li>
              <li><Link href="/Work" className="hover:text-[#D0FF71] transition-colors">Work / Portfolio</Link></li>
              <li><Link href="/Products" className="hover:text-[#D0FF71] transition-colors">Products</Link></li>
            </ul>
          </div>

          {/* Nav column 2 */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-4">Company</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/BLog" className="hover:text-[#D0FF71] transition-colors">Blog & Insights</Link></li>
              <li><Link href="/About" className="hover:text-[#D0FF71] transition-colors">About Us</Link></li>
              <li><Link href="/Contact" className="hover:text-[#D0FF71] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services Quicklist */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold mb-4">Capabilities</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link href="/Services" className="hover:text-[#D0FF71] transition-colors">Staff Augmentation</Link></li>
              <li><Link href="/Services" className="hover:text-[#D0FF71] transition-colors">AI & ML Solutions</Link></li>
              <li><Link href="/Services" className="hover:text-[#D0FF71] transition-colors">Cyber Security</Link></li>
              <li><Link href="/Services" className="hover:text-[#D0FF71] transition-colors">Cloud Engineering</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-800/80 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <div>
            © 2026 Zamooq. All rights reserved. Founded by Owner & CEO Mir Mujeeb Ul Hassan.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/Contact" className="hover:text-zinc-300 transition-colors">Privacy Policy</Link>
            <Link href="/Contact" className="hover:text-zinc-300 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
