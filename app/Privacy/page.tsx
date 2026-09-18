import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tableOfContents = [
  { id: "introduction", title: "1. Introduction & Controller Details" },
  { id: "data-collection", title: "2. Personal Data We Collect" },
  { id: "lawful-bases", title: "3. Lawful Bases for Processing" },
  { id: "purposes", title: "4. How We Use Personal Data" },
  { id: "sharing-disclosures", title: "5. Data Sharing & Sub-Processors" },
  { id: "international-transfers", title: "6. International Transfers" },
  { id: "retention", title: "7. Data Retention & Disposal" },
  { id: "security-measures", title: "8. Security & Cryptographic Safeguards" },
  { id: "your-rights", title: "9. Your Rights Under UK & EU GDPR" },
  { id: "cookies", title: "10. Cookies & Tracking Technologies" },
  { id: "children", title: "11. Children's Privacy" },
  { id: "supervisory-authority", title: "12. Regulatory Complaints & ICO" },
  { id: "contact-dpo", title: "13. Contact & Privacy Inquiries" },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-300 font-sans selection:bg-[var(--accent-hover)] selection:text-black">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-14 pt-36 pb-24">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs font-mono text-zinc-500">
            <li>
              <Link href="/" className="hover:text-zinc-300 transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-zinc-400">Legal</li>
            <li>/</li>
            <li className="text-[var(--accent-hover)] font-medium">Privacy Policy</li>
          </ol>
        </nav>

        {/* Page Header */}
        <header className="border-b border-zinc-800 pb-10 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/60 text-xs font-mono text-[var(--accent-hover)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-hover)]" />
            Compliance &amp; Data Protection
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-3xl leading-relaxed">
            This Privacy Policy explains how ZamNexus, a technology brand of Zamooq Limited,
            collects, processes, stores, and safeguards personal data in strict compliance with the
            UK General Data Protection Regulation (UK GDPR), the Data Protection Act 2018 (DPA 2018),
            and applicable international privacy regulations.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-8 text-xs font-mono text-zinc-400">
            <div>
              <span className="text-zinc-500">Effective Date:</span> 1 March 2026
            </div>
            <div>
              <span className="text-zinc-500">Last Reviewed:</span> March 2026
            </div>
            <div>
              <span className="text-zinc-500">Jurisdiction:</span> England &amp; Wales, United Kingdom
            </div>
          </div>
        </header>

        {/* Corporate Entity Notice Box */}
        <div className="p-5 sm:p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-hover)]">
              Data Controller Identity
            </span>
            <p className="text-sm font-semibold text-white">
              Zamooq Limited (Trading as ZamNexus)
            </p>
            <p className="text-xs text-zinc-400">
              Registered Office: 34 Beaconsfield, Luton, Bedfordshire, LU2 0RW, United Kingdom
            </p>
          </div>
          <div className="text-xs font-mono text-zinc-400 shrink-0">
            <span>DPO Contact: </span>
            <a
              href="mailto:{{OFFICIAL_EMAIL}}"
              className="text-[var(--accent-hover)] hover:underline"
            >
              {"{{OFFICIAL_EMAIL}}"}
            </a>
          </div>
        </div>

        {/* Two-Column Layout: Sticky TOC + Legal Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sticky Table of Contents (Desktop) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-28 p-6 rounded-2xl border border-zinc-800 bg-zinc-950/60 backdrop-blur-md">
            <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400 mb-4 pb-2 border-b border-zinc-800">
              Table of Contents
            </h2>
            <nav aria-label="Table of Contents" className="space-y-2">
              {tableOfContents.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="block text-xs text-zinc-400 hover:text-[var(--accent-hover)] hover:translate-x-1 transition-all py-1"
                >
                  {item.title}
                </a>
              ))}
            </nav>
            <div className="mt-6 pt-4 border-t border-zinc-800/80 text-[11px] text-zinc-500 font-mono">
              Need assistance? Email{" "}
              <a href="mailto:{{OFFICIAL_EMAIL}}" className="text-zinc-400 hover:text-white underline">
                {"{{OFFICIAL_EMAIL}}"}
              </a>
            </div>
          </aside>

          {/* Legal Content Document */}
          <article className="lg:col-span-8 space-y-12 text-sm leading-relaxed text-zinc-300">
            {/* Section 1 */}
            <section id="introduction" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-hover)] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  01
                </span>
                Introduction &amp; Controller Details
              </h2>
              <p>
                ZamNexus is a technology and engineering brand owned and operated by{" "}
                <strong className="text-white">Zamooq Limited</strong>, a company incorporated
                under the laws of England and Wales, with its registered address at{" "}
                <strong className="text-white">34 Beaconsfield, Luton, Bedfordshire, LU2 0RW, United Kingdom</strong>.
              </p>
              <p>
                This Privacy Policy applies to personal data collected through our corporate website
                (zamnexus.com), client portals, communication channels, and our proprietary software suite
                (including ZNXERP, ZNXePOS, ZNXEdu, and ZNXCare), as well as related cloud architecture,
                consulting, and integration engagements.
              </p>
              <p>
                When you engage with us directly, Zamooq Limited acts as the{" "}
                <strong className="text-white">Data Controller</strong> for your personal data. Where we host
                or process data on behalf of our enterprise clients through our multi-tenant SaaS products,
                we act as a <strong className="text-white">Data Processor</strong> in accordance with the
                applicable Data Processing Agreement (DPA) executed with the client.
              </p>
            </section>

            {/* Section 2 */}
            <section id="data-collection" className="scroll-mt-32 space-y-4 border-t border-zinc-800/80 pt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-hover)] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  02
                </span>
                Personal Data We Collect
              </h2>
              <p>
                We only collect personal information that is adequate, relevant, and strictly necessary to fulfill
                our legitimate operational, contractual, and legal purposes. This data falls into the following categories:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                <li>
                  <strong className="text-white">Identity &amp; Professional Contact Data:</strong> Full name,
                  business email address, corporate telephone number, job title, department, employer organization name,
                  and official correspondence records.
                </li>
                <li>
                  <strong className="text-white">Technical &amp; Telemetry Data:</strong> IP address, browser type and
                  version, operating system, device hardware identifiers, access timestamps, referral source, session
                  duration, and system diagnostic telemetry.
                </li>
                <li>
                  <strong className="text-white">Commercial &amp; Engagement Records:</strong> Inquiries submitted via
                  contact forms, consultation requests, scope-of-work specifications, customer relationship history,
                  and transaction metadata (excluding raw payment card numbers).
                </li>
                <li>
                  <strong className="text-white">Client-Managed Application Data:</strong> Where our enterprise
                  software is deployed (e.g. clinic records in ZNXCare or campus files in ZNXEdu), data is stored
                  in encrypted customer database partitions subject to strict enterprise tenant isolation.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section id="lawful-bases" className="scroll-mt-32 space-y-4 border-t border-zinc-800/80 pt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-hover)] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  03
                </span>
                Lawful Bases for Processing
              </h2>
              <p>
                Under Article 6 of the UK GDPR, we process your personal data only when an explicit legal basis applies:
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/80">
                  <span className="font-semibold text-white block mb-1">Contractual Necessity (Article 6(1)(b))</span>
                  <p className="text-xs text-zinc-400">
                    Processing necessary to evaluate project briefs, deliver contracted software licenses,
                    provision cloud instances, execute service-level agreements, and issue billing invoices.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/80">
                  <span className="font-semibold text-white block mb-1">Legitimate Interests (Article 6(1)(f))</span>
                  <p className="text-xs text-zinc-400">
                    Processing necessary to maintain network security, protect systems against unauthorized intrusions,
                    improve platform reliability, resolve operational bugs, and conduct business-to-business communications.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/80">
                  <span className="font-semibold text-white block mb-1">Legal Obligation (Article 6(1)(c))</span>
                  <p className="text-xs text-zinc-400">
                    Processing required to comply with statutory legal mandates, financial audit reporting, corporate
                    tax accounting (HM Revenue &amp; Customs), and regulatory anti-fraud statutes.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-zinc-900/30 border border-zinc-800/80">
                  <span className="font-semibold text-white block mb-1">Explicit Consent (Article 6(1)(a))</span>
                  <p className="text-xs text-zinc-400">
                    Where you have provided voluntary, affirmative consent — such as subscribing to technical architecture
                    briefings or permitting optional analytical cookies. Consent can be revoked at any time.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 4 */}
            <section id="purposes" className="scroll-mt-32 space-y-4 border-t border-zinc-800/80 pt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-hover)] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  04
                </span>
                How We Use Personal Data
              </h2>
              <p>
                We use the personal information collected for specific, legitimate business purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                <li>Providing, maintaining, and supporting our enterprise products and technical consulting engagements.</li>
                <li>Responding to inquiries, advisory requests, and technical support requests submitted via email or contact forms.</li>
                <li>Monitoring system health, uptime, and load balancing across multi-tenant cloud application environments.</li>
                <li>Preventing malicious attacks, unauthorized access, identity impersonation, and fraudulent activities.</li>
                <li>Fulfilling corporate record-keeping, statutory audits, and legal dispute defense obligations.</li>
              </ul>
              <p className="text-zinc-400 font-medium">
                We do not sell, rent, or trade your personal data to third parties or marketing brokers for advertising purposes.
              </p>
            </section>

            {/* Section 5 */}
            <section id="sharing-disclosures" className="scroll-mt-32 space-y-4 border-t border-zinc-800/80 pt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-hover)] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  05
                </span>
                Data Sharing &amp; Sub-Processors
              </h2>
              <p>
                We only disclose personal data to third parties under strictly controlled legal, contractual, and technical safeguards:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                <li>
                  <strong className="text-white">Cloud Hosting &amp; Infrastructure Providers:</strong> Tier-1 data center
                  and cloud infrastructure vendors (such as Amazon Web Services and Microsoft Azure within UK and European regions)
                  acting as sub-processors under compliant Data Processing Agreements.
                </li>
                <li>
                  <strong className="text-white">Professional Advisers:</strong> Certified auditors, legal counsel, chartered
                  accountants, and insurers who are bound by professional codes of confidentiality and legal privilege.
                </li>
                <li>
                  <strong className="text-white">Regulatory &amp; Statutory Authorities:</strong> Law enforcement agencies,
                  courts, or government authorities where required by compulsory legal process, court orders, or applicable UK law.
                </li>
              </ul>
            </section>

            {/* Section 6 */}
            <section id="international-transfers" className="scroll-mt-32 space-y-4 border-t border-zinc-800/80 pt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-hover)] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  06
                </span>
                International Data Transfers
              </h2>
              <p>
                Our primary servers and operations are located in the United Kingdom and the European Economic Area (EEA).
                Where personal data is transferred across international borders outside the UK or EEA, we ensure that appropriate
                safeguards are in place in accordance with Chapter V of the UK GDPR.
              </p>
              <p>
                These safeguards include transferring data to countries recognized by the UK Government as providing an adequate
                level of protection, or executing the UK International Data Transfer Agreement (IDTA) or the European Commission&apos;s
                Standard Contractual Clauses (SCCs) supplemented by mandatory technical transfer impact assessments.
              </p>
            </section>

            {/* Section 7 */}
            <section id="retention" className="scroll-mt-32 space-y-4 border-t border-zinc-800/80 pt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-hover)] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  07
                </span>
                Data Retention &amp; Disposal
              </h2>
              <p>
                We retain personal data only for as long as necessary to achieve the specific purposes for which it was collected,
                satisfy contractual requirements, or comply with statutory retention mandates.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                <li>
                  <strong className="text-white">Client Account &amp; Contract Data:</strong> Retained for the duration of the
                  active agreement plus six (6) years following contract termination to comply with statutory limitation periods under the Limitation Act 1980.
                </li>
                <li>
                  <strong className="text-white">Financial &amp; Invoicing Records:</strong> Retained for seven (7) years in accordance with
                  UK Companies Act and HM Revenue &amp; Customs (HMRC) accounting standards.
                </li>
                <li>
                  <strong className="text-white">General Inquiries:</strong> Retained for twelve (12) months following resolution unless
                  superseded by an active business relationship.
                </li>
                <li>
                  <strong className="text-white">Security &amp; Web Access Logs:</strong> Retained for ninety (90) days to six (6) months
                  for threat detection and audit investigations, after which they are automatically purged.
                </li>
              </ul>
            </section>

            {/* Section 8 */}
            <section id="security-measures" className="scroll-mt-32 space-y-4 border-t border-zinc-800/80 pt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-hover)] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  08
                </span>
                Security &amp; Cryptographic Safeguards
              </h2>
              <p>
                We implement comprehensive technical and organizational security controls designed to prevent accidental loss,
                unauthorized access, alteration, or unlawful destruction of your data:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/40">
                  <span className="font-mono text-xs text-[var(--accent-hover)] font-bold block mb-1">In-Transit Encryption</span>
                  <p className="text-xs text-zinc-400">All external and internal microservices traffic is protected using TLS 1.3 protocol suites.</p>
                </div>
                <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/40">
                  <span className="font-mono text-xs text-[var(--accent-hover)] font-bold block mb-1">At-Rest Encryption</span>
                  <p className="text-xs text-zinc-400">Database storage volumes, backups, and object stores are encrypted with AES-256 keys.</p>
                </div>
                <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/40">
                  <span className="font-mono text-xs text-[var(--accent-hover)] font-bold block mb-1">Role-Based Access (RBAC)</span>
                  <p className="text-xs text-zinc-400">Least-privilege access model enforced via multi-factor authentication (MFA) and zero-trust credentials.</p>
                </div>
                <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/40">
                  <span className="font-mono text-xs text-[var(--accent-hover)] font-bold block mb-1">Immutable Audit Logging</span>
                  <p className="text-xs text-zinc-400">Cryptographically verifiable, tamper-evident audit logs monitoring all administrative actions.</p>
                </div>
              </div>
            </section>

            {/* Section 9 */}
            <section id="your-rights" className="scroll-mt-32 space-y-4 border-t border-zinc-800/80 pt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-hover)] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  09
                </span>
                Your Rights Under UK &amp; EU GDPR
              </h2>
              <p>
                Under the UK Data Protection Act 2018 and the UK GDPR, you possess specific legal rights regarding your personal data:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                <li><strong className="text-white">Right of Access:</strong> You may request confirmation of whether we process your data and obtain a copy via a Subject Access Request (SAR).</li>
                <li><strong className="text-white">Right to Rectification:</strong> You may require us to correct inaccurate or incomplete personal records.</li>
                <li><strong className="text-white">Right to Erasure (&quot;Right to be Forgotten&quot;):</strong> You may request deletion of your personal data where there is no overriding legal reason for retention.</li>
                <li><strong className="text-white">Right to Restriction of Processing:</strong> You may request that we suspend active processing under certain conditions (e.g. while data accuracy is verified).</li>
                <li><strong className="text-white">Right to Data Portability:</strong> You may request that we transmit your personal data to you or another provider in a structured, machine-readable format.</li>
                <li><strong className="text-white">Right to Object:</strong> You may object at any time to processing based on legitimate interests or direct marketing.</li>
                <li><strong className="text-white">Right to Withdraw Consent:</strong> Where processing is based on consent, you may withdraw it at any time without affecting past processing lawfulness.</li>
              </ul>
              <p className="pt-2">
                To exercise any of these rights, submit your request to{" "}
                <a href="mailto:{{OFFICIAL_EMAIL}}" className="text-[var(--accent-hover)] hover:underline">
                  {"{{OFFICIAL_EMAIL}}"}
                </a>
                . We respond to all verified statutory requests within one (1) calendar month free of charge.
              </p>
            </section>

            {/* Section 10 */}
            <section id="cookies" className="scroll-mt-32 space-y-4 border-t border-zinc-800/80 pt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-hover)] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  10
                </span>
                Cookies &amp; Tracking Technologies
              </h2>
              <p>
                Our website utilizes cookies and minimal browser storage tokens. These fall into two primary categories:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                <li>
                  <strong className="text-white">Strictly Necessary Cookies:</strong> Essential for site navigation, security token
                  verification, session persistence, and accessibility preferences. These cannot be disabled.
                </li>
                <li>
                  <strong className="text-white">Functional &amp; Diagnostic Cookies:</strong> Used to understand aggregate usage
                  patterns, diagnose page rendering errors, and optimize site speed. These cookies are pseudonymized and do not track users across external domains.
                </li>
              </ul>
              <p>
                You can configure your browser settings to decline all or some browser cookies. Note that disabling necessary cookies may impair platform functionality.
              </p>
            </section>

            {/* Section 11 */}
            <section id="children" className="scroll-mt-32 space-y-4 border-t border-zinc-800/80 pt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-hover)] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  11
                </span>
                Children&apos;s Privacy
              </h2>
              <p>
                Our services, products, and website are directed exclusively to business enterprises and professionals aged 18 and older.
                We do not knowingly collect or solicit personal data from children. If you believe that a minor has provided us with personal information,
                please contact us immediately at{" "}
                <a href="mailto:{{OFFICIAL_EMAIL}}" className="text-[var(--accent-hover)] hover:underline">
                  {"{{OFFICIAL_EMAIL}}"}
                </a>{" "}
                so we can investigate and promptly delete the records.
              </p>
            </section>

            {/* Section 12 */}
            <section id="supervisory-authority" className="scroll-mt-32 space-y-4 border-t border-zinc-800/80 pt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-hover)] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  12
                </span>
                Regulatory Complaints &amp; The ICO
              </h2>
              <p>
                We take data protection with the utmost seriousness and invite you to contact us first if you have any questions,
                concerns, or complaints regarding how we manage your information.
              </p>
              <p>
                You also have the statutory right to lodge a formal complaint with the UK data protection supervisory authority:
              </p>
              <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/30 text-xs text-zinc-300 space-y-1">
                <strong className="text-white block">Information Commissioner&apos;s Office (ICO)</strong>
                <p>Wycliffe House, Water Lane, Wilmslow, Cheshire, SK9 5AF, United Kingdom</p>
                <p>Telephone: +44 303 123 1113 · Website: <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-[var(--accent-hover)] underline">ico.org.uk</a></p>
              </div>
            </section>

            {/* Section 13 */}
            <section id="contact-dpo" className="scroll-mt-32 space-y-4 border-t border-zinc-800/80 pt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-hover)] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  13
                </span>
                Contact &amp; Privacy Inquiries
              </h2>
              <p>
                For any questions regarding this Privacy Policy, to exercise your GDPR rights, or to speak with our Data Protection team, contact:
              </p>
              <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 space-y-2 text-xs font-mono">
                <div className="text-white font-bold">Zamooq Limited t/a ZamNexus</div>
                <div className="text-zinc-400">Attention: Legal &amp; Data Protection Lead</div>
                <div className="text-zinc-400">Address: 34 Beaconsfield, Luton, Bedfordshire, LU2 0RW, United Kingdom</div>
                <div className="text-zinc-400">
                  Email:{" "}
                  <a href="mailto:{{OFFICIAL_EMAIL}}" className="text-[var(--accent-hover)] underline">
                    {"{{OFFICIAL_EMAIL}}"}
                  </a>
                </div>
                <div className="text-zinc-400">Phone / WhatsApp Advisory: +44 7859 043361</div>
              </div>
            </section>
          </article>
        </div>
      </main>

      <Footer />
    </div>
  );
}
