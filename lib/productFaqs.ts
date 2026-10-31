import type { ProductSlug } from "@/lib/siteFacts";

export interface FaqItem {
  q: string;
  a: string;
}

// Product page FAQs. The pages show them; each product layout publishes them as FAQPage
// structured data (server-rendered, since client components can't render <script>).
export const productFaqs: Record<ProductSlug, FaqItem[]> = {
  znxerp: [
    { q: "Can we migrate from our current system?", a: "Yes. We migrate master data, open balances and history, then run both systems in parallel before cut-over." },
    { q: "Does it handle multiple companies and currencies?", a: "Yes. Each company keeps its own ledgers in its own currency, with consolidated reporting across the group." },
    { q: "How does ZNXERP handle quality control?", a: "Incoming material is held in quarantine until the QC lab releases it, and every batch keeps its test results for audit." },
  ],
  znxepos: [
    { q: "What happens if the internet goes down?", a: "Each till keeps its own local database, so sales, returns and receipts carry on. Everything syncs to head office when the connection returns." },
    { q: "Can we move stock between branches?", a: "Yes. Inter-branch transfers update stock at both stores, and head office sees every branch in one view." },
    { q: "Does it support wholesale and retail in one system?", a: "Yes. Wholesale customers have their own ledgers, credit limits and pricing, alongside your retail tills." },
  ],
  znxedu: [
    { q: "Can it manage several campuses?", a: "Yes. Each campus runs its own day-to-day operations, while head office sees fees, attendance and results across all of them." },
    { q: "How are parents kept informed?", a: "The parent app shows attendance alerts, fee status, results and school notices." },
    { q: "Is student data secure?", a: "Records are encrypted, and each member of staff only sees what their role allows." },
  ],
  znxcare: [
    { q: "Does it connect to our lab analysers?", a: "Yes. ZNXCare uses HL7 interfaces to send orders to analysers and bring results back into the patient record. Tell us which models you use and we'll confirm." },
    { q: "Can it handle insurance panels?", a: "Yes. Panel eligibility is checked at registration, and claims are prepared from the same record." },
    { q: "How is patient data protected?", a: "Records are encrypted, access is role-based, and every change is kept in an audit trail." },
  ],
};
