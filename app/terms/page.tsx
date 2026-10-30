import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const tableOfContents = [
  { id: "agreement", title: "1. Agreement to Terms & Parties" },
  { id: "scope-services", title: "2. Scope of Products & Services" },
  { id: "accounts-security", title: "3. User Accounts & Security" },
  { id: "license-ip", title: "4. Intellectual Property & Licenses" },
  { id: "customer-data", title: "5. Customer Data & Confidentiality" },
  { id: "acceptable-use", title: "6. Acceptable Use & Restrictions" },
  { id: "fees-payment", title: "7. Fees, Invoicing & Payment Terms" },
  { id: "warranties", title: "8. Warranties & Disclaimers" },
  { id: "liability", title: "9. Limitation of Liability" },
  { id: "indemnification", title: "10. Mutual Indemnification" },
  { id: "termination", title: "11. Term, Suspension & Termination" },
  { id: "governing-law", title: "12. Governing Law & Jurisdiction" },
  { id: "general-provisions", title: "13. General Contractual Provisions" },
  { id: "contact-notices", title: "14. Corporate Notices & Inquiries" },
];

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-[#090b10] text-zinc-300 font-sans selection:bg-[var(--accent-hover)] selection:text-black">
      <Navbar />

      <main className="max-w-7xl mx-auto px-5 sm:px-10 lg:px-14 pt-36 pb-24">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs font-mono text-foreground-muted">
            <li>
              <Link href="/" className="hover:text-zinc-300 transition-colors">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="text-zinc-400">Legal</li>
            <li>/</li>
            <li className="text-[var(--accent-hover)] font-medium">Terms of Service</li>
          </ol>
        </nav>

        {/* Page Header */}
        <header className="border-b border-zinc-800 pb-10 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/60 text-xs font-mono text-[var(--accent-hover)] mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-hover)]" />
            Commercial &amp; Regulatory Agreement
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Terms of Service
          </h1>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 max-w-3xl leading-relaxed">
            These Terms of Service constitute a legally binding agreement between you or the entity you represent
            and Zamooq Limited (trading as ZamNexus), governing the access to and use of our enterprise software
            products, cloud-native architectures, API meshes, and technical consulting deliverables.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4 sm:gap-8 text-xs font-mono text-zinc-400">
            <div>
              <span className="text-foreground-muted">Effective Date:</span> 1 March 2026
            </div>
            <div>
              <span className="text-foreground-muted">Last Reviewed:</span> March 2026
            </div>
            <div>
              <span className="text-foreground-muted">Governing Law:</span> England &amp; Wales, United Kingdom
            </div>
          </div>
        </header>

        {/* Commercial Notice Box */}
        <div className="p-5 sm:p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 mb-12 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-hover)]">
              Contracting Commercial Entity
            </span>
            <p className="text-sm font-semibold text-white">
              Zamooq Limited (Trading as ZamNexus)
            </p>
            <p className="text-xs text-zinc-400">
              Registered Office: 34 Beaconsfield, Luton, Bedfordshire, LU2 0RW, United Kingdom
            </p>
          </div>
          <div className="text-xs font-mono text-zinc-400 shrink-0">
            <span>Legal Notices: </span>
            <a
              href="mailto:contact@zamnexus.com"
              className="text-[var(--accent-hover)] hover:underline"
            >
              {"contact@zamnexus.com"}
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
            <div className="mt-6 pt-4 border-t border-zinc-800/80 text-[11px] text-foreground-muted font-mono">
              Enterprise counsel inquiries:{" "}
              <a href="mailto:contact@zamnexus.com" className="text-zinc-400 hover:text-white underline">
                {"contact@zamnexus.com"}
              </a>
            </div>
          </aside>

          {/* Legal Content Document */}
          <article className="lg:col-span-8 space-y-12 text-sm leading-relaxed text-zinc-300">
            {/* Section 1 */}
            <section id="agreement" className="scroll-mt-32 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-hover)] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  01
                </span>
                Agreement to Terms &amp; Parties
              </h2>
              <p>
                These Terms of Service (&quot;Terms&quot;) govern the contractual relationship between{" "}
                <strong className="text-white">Zamooq Limited</strong>, trading as{" "}
                <strong className="text-white">ZamNexus</strong> (&quot;Company&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;),
                a company incorporated under the laws of England and Wales with its registered office at{" "}
                <strong className="text-white">34 Beaconsfield, Luton, Bedfordshire, LU2 0RW, United Kingdom</strong>,
                and the customer, business enterprise, or individual (&quot;Client&quot;, &quot;Customer&quot;, or &quot;you&quot;)
                accessing our website or utilizing our software, products, platforms, or services.
              </p>
              <p>
                By visiting our website (zamnexus.com), signing an Order Form or Statement of Work (SOW), registering for
                a corporate portal, or accessing any ZamNexus software application, you confirm that you have read,
                understood, and agree to be legally bound by these Terms.
              </p>
              <p>
                If you are entering into these Terms on behalf of a corporation, partnership, or other legal entity, you represent
                and warrant that you possess the full legal authority to bind that entity to these provisions.
              </p>
            </section>

            {/* Section 2 */}
            <section id="scope-services" className="scroll-mt-32 space-y-4 border-t border-zinc-800/80 pt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-hover)] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  02
                </span>
                Scope of Products &amp; Services
              </h2>
              <p>
                ZamNexus provides industrial and enterprise software products, technology platforms, and specialized engineering advisory services:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                <li>
                  <strong className="text-white">Flagship Product Cores:</strong> Dedicated and multi-tenant software suites
                  including <strong className="text-white">ZNXERP</strong> (Manufacturing MES, Supply Chain &amp; Double-Entry Ledgers),{" "}
                  <strong className="text-white">ZNXePOS</strong> (Offline-First Multi-Till Retail Point of Sale),{" "}
                  <strong className="text-white">ZNXEdu</strong> (Multi-Campus Academic ERP &amp; Student Portals), and{" "}
                  <strong className="text-white">ZNXCare</strong> (Clinical Hospital Information System, EHR &amp; HL7 Analyzer Interfaces).
                </li>
                <li>
                  <strong className="text-white">Enterprise Platform Deployments:</strong> Architecture, implementation, and managed
                  evolution across Microsoft Dynamics 365, Power Platform, Azure Integration Services, and Salesforce Cloud/Agentforce.
                </li>
                <li>
                  <strong className="text-white">Custom Engineering &amp; Advisory:</strong> Cloud-native microservices, automated
                  workforce agents, database migrations, and systems integration governed by specific Statements of Work.
                </li>
              </ul>
              <p>
                Each commercial deployment is supplemented by a specific Order Form, Service Level Agreement (SLA), or Statement of Work (SOW)
                which sets forth specific fees, module specifications, user seat allocations, and project milestones.
              </p>
            </section>

            {/* Section 3 */}
            <section id="accounts-security" className="scroll-mt-32 space-y-4 border-t border-zinc-800/80 pt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-hover)] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  03
                </span>
                User Accounts &amp; Security
              </h2>
              <p>
                To access certain products or client consoles, Customer must create and maintain an enterprise administrator account.
                Customer is solely responsible for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                <li>Designating authorized users and maintaining strict confidentiality over all login credentials and API keys.</li>
                <li>Enforcing multi-factor authentication (MFA) across all administrative access endpoints.</li>
                <li>All activities, data transfers, and operational actions occurring under Customer&apos;s authorized credentials.</li>
                <li>Immediately notifying ZamNexus at <a href="mailto:contact@zamnexus.com" className="text-[var(--accent-hover)] underline">{"contact@zamnexus.com"}</a> upon discovering any credential compromise or security breach.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section id="license-ip" className="scroll-mt-32 space-y-4 border-t border-zinc-800/80 pt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-hover)] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  04
                </span>
                Intellectual Property &amp; Licenses
              </h2>
              <p>
                <strong className="text-white">Our Intellectual Property:</strong> All software source code, object code,
                architecture designs, algorithms, database schemas, trademarks, documentation, logos, and proprietary workflows
                embodied within ZamNexus and its products remain the exclusive intellectual property of Zamooq Limited and its licensors.
              </p>
              <p>
                <strong className="text-white">License Grant:</strong> Subject to timely payment of applicable fees and full compliance
                with these Terms, Zamooq Limited grants Customer a non-exclusive, non-transferable, non-sublicensable, revocable license
                during the subscription term to access and use the software solely for Customer&apos;s internal business operations.
              </p>
              <p>
                No ownership rights are transferred to Customer under these Terms. All rights not expressly granted herein are reserved
                exclusively by Zamooq Limited.
              </p>
            </section>

            {/* Section 5 */}
            <section id="customer-data" className="scroll-mt-32 space-y-4 border-t border-zinc-800/80 pt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-hover)] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  05
                </span>
                Customer Data &amp; Confidentiality
              </h2>
              <p>
                <strong className="text-white">Customer Data Ownership:</strong> As between the parties, Customer retains all right,
                title, and interest (including all intellectual property rights) in and to all business data, patient records, financial
                ledgers, student files, and operational content uploaded or processed through the software (&quot;Customer Data&quot;).
              </p>
              <p>
                <strong className="text-white">Confidentiality:</strong> Each party agrees to protect the other party&apos;s Confidential Information
                with the same degree of care it uses for its own confidential records (and not less than reasonable care), and shall not disclose
                such information except to employees, subcontractors, and legal/financial advisers who require access to fulfill the engagement
                and are bound by equivalent confidentiality covenants.
              </p>
            </section>

            {/* Section 6 */}
            <section id="acceptable-use" className="scroll-mt-32 space-y-4 border-t border-zinc-800/80 pt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-hover)] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  06
                </span>
                Acceptable Use &amp; Operational Restrictions
              </h2>
              <p>
                Customer agrees that it shall not, and shall not permit any third party to:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                <li>Reverse engineer, decompile, disassemble, or attempt to derive source code or underlying schemas of our software.</li>
                <li>Conduct unauthorized vulnerability assessments, penetration tests, or stress testing against our cloud endpoints without prior written authorization.</li>
                <li>Circumvent or disable software license enforcement, multi-tenant isolation, or cryptographic controls.</li>
                <li>Distribute malicious payloads, worms, trojans, or destructive code through any ZamNexus API.</li>
                <li>Use the software in violation of applicable laws, including UK export control statutes and international trade sanctions.</li>
                <li>Resell, sublicense, white-label, or provide time-sharing access to our products to third parties unless expressly authorized in writing.</li>
              </ul>
            </section>

            {/* Section 7 */}
            <section id="fees-payment" className="scroll-mt-32 space-y-4 border-t border-zinc-800/80 pt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-hover)] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  07
                </span>
                Fees, Invoicing &amp; Payment Terms
              </h2>
              <p>
                <strong className="text-white">Billing &amp; Invoicing:</strong> Customer agrees to pay all fees specified in the applicable
                Order Form or Statement of Work. Unless otherwise stated in an SOW, invoices are issued electronically and are payable within
                thirty (30) calendar days of the invoice date (Net 30).
              </p>
              <p>
                <strong className="text-white">Taxes:</strong> All fees are exclusive of Value Added Tax (VAT) and other applicable taxes,
                which shall be added to the invoice at the prevailing statutory rate where required.
              </p>
              <p>
                <strong className="text-white">Late Payment:</strong> Outstanding balances past the due date shall accrue interest in accordance
                with the UK <em className="text-zinc-400">Late Payment of Commercial Debts (Interest) Act 1998</em> at the statutory rate
                of 8% per annum above the Bank of England base rate, calculated daily until paid in full.
              </p>
            </section>

            {/* Section 8 */}
            <section id="warranties" className="scroll-mt-32 space-y-4 border-t border-zinc-800/80 pt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-hover)] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  08
                </span>
                Warranties &amp; Disclaimers
              </h2>
              <p>
                <strong className="text-white">Software Warranty:</strong> ZamNexus warrants that our production software products will perform
                in all material respects in accordance with their published documentation under normal use during the subscription term.
              </p>
              <p>
                <strong className="text-white">Disclaimer:</strong> Except as expressly provided herein or in an applicable SLA, the website,
                services, and software are provided on an &quot;as is&quot; and &quot;as available&quot; basis. Zamooq Limited disclaims all other
                warranties, express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement.
                We do not warrant that software execution will be completely uninterrupted or error-free.
              </p>
            </section>

            {/* Section 9 */}
            <section id="liability" className="scroll-mt-32 space-y-4 border-t border-zinc-800/80 pt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-hover)] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  09
                </span>
                Limitation of Liability
              </h2>
              <p>
                <strong className="text-white">Non-Excludable Liabilities:</strong> Nothing in these Terms shall limit or exclude either party&apos;s
                liability for death or personal injury caused by negligence, for fraud or fraudulent misrepresentation, or for any liability that
                cannot be excluded under the laws of England and Wales.
              </p>
              <p>
                <strong className="text-white">Consequential Damages Exclusion:</strong> To the maximum extent permitted by applicable law,
                neither party shall be liable for any indirect, incidental, special, punitive, or consequential damages, nor for any loss of profits,
                loss of anticipated savings, loss of business goodwill, or loss or corruption of data.
              </p>
              <p>
                <strong className="text-white">Liability Cap:</strong> Except for Customer&apos;s payment obligations or willful misconduct, each party&apos;s
                total aggregate liability arising out of or related to these Terms shall not exceed the total fees paid or payable by Customer to Zamooq Limited
                under the applicable agreement during the twelve (12) months preceding the incident giving rise to liability.
              </p>
            </section>

            {/* Section 10 */}
            <section id="indemnification" className="scroll-mt-32 space-y-4 border-t border-zinc-800/80 pt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-hover)] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  10
                </span>
                Mutual Indemnification
              </h2>
              <p>
                <strong className="text-white">By ZamNexus:</strong> Zamooq Limited agrees to defend and indemnify Customer against claims brought by an
                independent third party alleging that Customer&apos;s authorized use of the software directly infringes a registered patent or copyright,
                provided Customer gives prompt written notice, sole control of defense, and reasonable cooperation.
              </p>
              <p>
                <strong className="text-white">By Customer:</strong> Customer agrees to defend and indemnify Zamooq Limited against third-party claims
                arising out of Customer Data, Customer&apos;s breach of the Acceptable Use Policy, or Customer&apos;s unlawful processing of personal data.
              </p>
            </section>

            {/* Section 11 */}
            <section id="termination" className="scroll-mt-32 space-y-4 border-t border-zinc-800/80 pt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-hover)] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  11
                </span>
                Term, Suspension &amp; Termination
              </h2>
              <p>
                <strong className="text-white">Term:</strong> These Terms remain in effect for as long as Customer maintains an active account
                or engages ZamNexus services under an Order Form.
              </p>
              <p>
                <strong className="text-white">Termination for Cause:</strong> Either party may terminate these Terms immediately upon written notice
                if the other party commits a material breach and fails to cure such breach within thirty (30) calendar days of receiving written notice,
                or becomes insolvent or enters into liquidation.
              </p>
              <p>
                <strong className="text-white">Post-Termination Data Retrieval:</strong> Upon termination, Customer shall have thirty (30) days to
                export Customer Data using standard export utilities. Following this period, ZamNexus securely deletes Customer Data from active production
                stores in accordance with our data retention protocols.
              </p>
            </section>

            {/* Section 12 */}
            <section id="governing-law" className="scroll-mt-32 space-y-4 border-t border-zinc-800/80 pt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-hover)] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  12
                </span>
                Governing Law &amp; Jurisdiction
              </h2>
              <p>
                These Terms, their subject matter, and their formation (including non-contractual disputes or claims) shall be governed by and
                construed in accordance with the laws of <strong className="text-white">England and Wales</strong>.
              </p>
              <p>
                The courts of <strong className="text-white">England and Wales</strong> shall have exclusive jurisdiction to settle any dispute,
                controversy, or claim arising out of or in connection with these Terms. The parties agree to attempt good-faith executive escalation
                for at least thirty (30) days prior to initiating formal judicial proceedings.
              </p>
            </section>

            {/* Section 13 */}
            <section id="general-provisions" className="scroll-mt-32 space-y-4 border-t border-zinc-800/80 pt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-hover)] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  13
                </span>
                General Contractual Provisions
              </h2>
              <ul className="list-disc pl-6 space-y-2 text-zinc-300">
                <li>
                  <strong className="text-white">Entire Agreement:</strong> These Terms, together with any executed Order Form or Statement of Work,
                  constitute the complete agreement between the parties, superseding all prior oral or written negotiations and proposals.
                </li>
                <li>
                  <strong className="text-white">Severability:</strong> If any provision of these Terms is held to be invalid or unenforceable,
                  that provision shall be severed and the remaining provisions shall continue in full force and effect.
                </li>
                <li>
                  <strong className="text-white">Third-Party Rights:</strong> A person who is not a party to these Terms has no rights under the
                  Contracts (Rights of Third Parties) Act 1999 to enforce any term.
                </li>
                <li>
                  <strong className="text-white">Force Majeure:</strong> Neither party shall be liable for failure to perform its obligations
                  (excluding payment obligations) due to events beyond its reasonable control, including acts of God, war, utility failure, or government embargoes.
                </li>
              </ul>
            </section>

            {/* Section 14 */}
            <section id="contact-notices" className="scroll-mt-32 space-y-4 border-t border-zinc-800/80 pt-10">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <span className="text-xs font-mono text-[var(--accent-hover)] px-2 py-1 rounded bg-zinc-900 border border-zinc-800">
                  14
                </span>
                Corporate Notices &amp; Inquiries
              </h2>
              <p>
                All legal notices, contractual inquiries, and official correspondence under these Terms must be sent in writing to:
              </p>
              <div className="p-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 space-y-2 text-xs font-mono">
                <div className="text-white font-bold">Zamooq Limited t/a ZamNexus</div>
                <div className="text-zinc-400">Attention: Legal &amp; Commercial Contracts Department</div>
                <div className="text-zinc-400">Address: 34 Beaconsfield, Luton, Bedfordshire, LU2 0RW, United Kingdom</div>
                <div className="text-zinc-400">
                  Email:{" "}
                  <a href="mailto:contact@zamnexus.com" className="text-[var(--accent-hover)] underline">
                    {"contact@zamnexus.com"}
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
