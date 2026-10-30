import type { ProductSlug } from "@/lib/siteFacts";

// Shared product and service copy for Home, /products, /services and the footer, so each is written once.

export interface Product {
  slug: ProductSlug;
  code: string;
  category: string;
  sector: string;
  purpose: string;
  outcomes: string[];
  modules: string;
  accent: string;
  logo: string;
}

export const products: Product[] = [
  {
    slug: "znxerp",
    code: "ZNXERP",
    category: "Enterprise resource planning",
    sector: "Manufacturing & pharma",
    purpose: "Finance, production, inventory and quality control in one system, for manufacturers and pharmaceutical plants.",
    outcomes: [
      "Every batch traceable from goods-in to dispatch",
      "Material held in quarantine until QC releases it",
      "Stock movements post to the ledger as they happen",
    ],
    modules: "Finance, HR & payroll, procurement, inventory, production, sales, QC, reporting",
    accent: "#3B82F6",
    logo: "/product-logos/znxerp.png",
  },
  {
    slug: "znxepos",
    code: "ZNXePOS",
    category: "Retail point of sale",
    sector: "Retail & distribution",
    purpose: "Fast checkout that keeps working offline, with stock synced across every branch.",
    outcomes: [
      "Tills keep selling when the internet drops",
      "One live stock view across all branches",
      "Retail and wholesale accounts in one system",
    ],
    modules: "POS, multi-branch stock, offline sync, promotions & loyalty, wholesale ledgers, cash control",
    accent: "#F59E0B",
    logo: "/product-logos/znxepos.png",
  },
  {
    slug: "znxedu",
    code: "ZNXEdu",
    category: "School & campus management",
    sector: "Education",
    purpose: "Admissions, fees, attendance, timetables and a parent app, for schools and multi-campus groups.",
    outcomes: [
      "Fee vouchers reconciled with the bank automatically",
      "Parents alerted the moment their child arrives",
      "Clash-free timetables for every campus",
    ],
    modules: "Admissions, fees & bank link, attendance, timetabling, exams, parent app, HR & payroll",
    accent: "#8B5CF6",
    logo: "/product-logos/znxedu.png",
  },
  {
    slug: "znxcare",
    code: "ZNXCare",
    category: "Hospital management & EHR",
    sector: "Healthcare",
    purpose: "Patient records, lab machines, pharmacy and billing connected, for hospitals and clinics.",
    outcomes: [
      "One medical record that follows the patient",
      "Lab results returned to the chart automatically (HL7)",
      "Barcode-checked pharmacy dispensing",
    ],
    modules: "Registration, triage, OPD & IPD, clinical records, laboratory, pharmacy, billing & insurance",
    accent: "#10B981",
    logo: "/product-logos/znxcare.png",
  },
];

// One real event per platform, traced through the modules it touches. Drives the homepage system map;
// steps paraphrase each product page's own workflow section.
export interface FlowStep {
  code: string;
  name: string;
  detail: string;
}

export interface Flow {
  slug: Product["slug"];
  sector: string;
  event: string;
  steps: FlowStep[];
}

export const flows: Flow[] = [
  {
    slug: "znxerp",
    sector: "Manufacturing",
    event: "A raw-material delivery arrives at the gate",
    steps: [
      { code: "PRC", name: "Goods in", detail: "The delivery is matched to its purchase order, and a goods-received note and bin labels are created." },
      { code: "QC", name: "Quarantine", detail: "The stock is locked until the lab tests a sample and releases it." },
      { code: "MES", name: "Production", detail: "The batch runs against the approved formulation, with yield and machine time recorded." },
      { code: "WMS", name: "Dispatch", detail: "Finished goods are picked oldest-first and shipped to the customer." },
      { code: "FIN", name: "Ledger", detail: "Every movement has already posted to the general ledger. No month-end catch-up." },
    ],
  },
  {
    slug: "znxepos",
    sector: "Retail",
    event: "A customer reaches the till",
    steps: [
      { code: "POS", name: "Scan", detail: "Items are scanned, and multi-buy deals and loyalty discounts apply automatically." },
      { code: "PAY", name: "Payment", detail: "The customer splits the bill between cash and card. The receipt prints or goes to WhatsApp." },
      { code: "SYN", name: "Offline sync", detail: "The sale is saved on the till itself, so trading carries on even if the internet drops." },
      { code: "STK", name: "Stock", detail: "Branch stock updates, and a reorder is raised when an item falls below its threshold." },
      { code: "FIN", name: "Ledger", detail: "At shift end the cashier counts blind, and the day's sales post to the ledger." },
    ],
  },
  {
    slug: "znxedu",
    sector: "Education",
    event: "A student walks through the school gate",
    steps: [
      { code: "ID", name: "Gate", detail: "The student's card or fingerprint is read at the turnstile." },
      { code: "ATT", name: "Attendance", detail: "They're marked present for the day's classes, with no register to fill in." },
      { code: "APP", name: "Parent alert", detail: "A parent gets a notification on the app that their child has arrived." },
      { code: "FEE", name: "Fees", detail: "Any overdue fee shows on the student's record, matched against the bank automatically." },
      { code: "MIS", name: "Head office", detail: "Attendance and fees roll up across every campus in one report." },
    ],
  },
  {
    slug: "znxcare",
    sector: "Healthcare",
    event: "A patient arrives at the emergency desk",
    steps: [
      { code: "REG", name: "Registration", detail: "The patient is identified and given a permanent medical record number." },
      { code: "TRG", name: "Triage", detail: "Severity is assessed, a bed is assigned and insurance cover is checked." },
      { code: "EHR", name: "Doctor", detail: "Notes are written with drug-interaction checks, and lab tests are ordered." },
      { code: "LIS", name: "Lab", detail: "The analyser sends results straight back into the patient's record over HL7." },
      { code: "PHR", name: "Pharmacy", detail: "Medicines are dispensed with a barcode check, and the bill is prepared." },
    ],
  },
];

export interface Service {
  id: string;
  // Former anchor ids that must keep working for old links (fragments never reach the server).
  aliases: string[];
  name: string;
  short: string;
  outcome: string;
  deliverables: string[];
  related?: { label: string; href: string };
}

export const services: Service[] = [
  {
    id: "ai-automation",
    aliases: ["ai-intelligent", "intelligent-automation", "ai-powered-business", "ai-powered", "automation"],
    name: "AI & Automation",
    short: "Put AI to work inside your real processes, with guardrails.",
    outcome:
      "Put AI to work inside the processes you already run, such as approvals, document handling and customer service, with a person in control where it matters.",
    deliverables: [
      "AI readiness assessment and use-case shortlist",
      "Copilots and assistants trained on your own documents (RAG)",
      "Document extraction and OCR",
      "Multi-step agents with approval checkpoints",
      "Process automation across ERP and CRM",
      "Guardrails, logging and audit trails",
    ],
    related: { label: "Multi-agent AI in regulated supply chains", href: "/insights/agentic-ai-regulated-supply-chains" },
  },
  {
    id: "saas",
    aliases: ["saas-development", "saas-platforms"],
    name: "SaaS Product Development",
    short: "From architecture to a product customers pay for.",
    outcome:
      "Turn a product idea or an internal tool into a secure multi-tenant SaaS product that customers can sign up for and pay for.",
    deliverables: [
      "Product and technical architecture",
      "Multi-tenant design with data isolation",
      "Self-serve customer portals",
      "Subscription billing (Stripe, Paddle)",
      "Roles, permissions and audit logs",
      "CI/CD with zero-downtime releases",
    ],
    related: { label: "AWS Serverless vs Kubernetes for multi-tenant SaaS", href: "/insights/aws-serverless-scaling-postmortem" },
  },
  {
    id: "cloud",
    aliases: ["cloud-native", "cloud-native-solutions"],
    name: "Cloud-Native Engineering",
    short: "Serverless AWS systems that scale and cost less to run.",
    outcome:
      "Back-end systems on AWS that scale up for peaks and down to save money, defined as code so they're repeatable and auditable.",
    deliverables: [
      "Serverless back ends (AWS Lambda, Step Functions) in Node.js/TypeScript",
      "Event-driven services (EventBridge, SQS)",
      "Infrastructure as code (Terraform, AWS CDK)",
      "Monitoring, tracing and alerting",
      "Zero-trust security reviews",
      "Cloud cost reviews",
    ],
  },
  {
    id: "integration",
    aliases: ["connected-enterprise", "digital-transformation"],
    name: "Integration & Modernisation",
    short: "Connect your systems and retire legacy safely.",
    outcome:
      "Connect your ERP, CRM and line-of-business systems so data is entered once, and replace legacy software step by step without a risky big-bang switch-over.",
    deliverables: [
      "Modernisation roadmap and technical due diligence",
      "Real-time ERP and CRM sync",
      "API layer for legacy systems (REST, GraphQL)",
      "Gradual migration using the strangler-fig pattern",
      "Data migration, cleansing and verification",
      "Azure API Management or MuleSoft gateways",
    ],
    related: { label: "The strangler fig pattern", href: "/insights/strangler-fig-legacy-modernization" },
  },
  {
    id: "microsoft",
    aliases: ["microsoft-solutions", "platforms"],
    name: "Microsoft Dynamics 365 & Power Platform",
    short: "Implementation, customisation and Copilot.",
    outcome:
      "Implement or rescue Dynamics 365 and Power Platform so your sales, service and finance teams work in one place.",
    deliverables: [
      "Dynamics 365 Sales, Customer Service and Field Service",
      "Power Apps and Power Automate",
      "Azure integration",
      "Copilot setup",
      "Data migration and user training",
    ],
  },
  {
    id: "salesforce",
    aliases: ["salesforce-solutions"],
    name: "Salesforce",
    short: "Sales and Service Cloud, integrated with the rest of your stack.",
    outcome:
      "Configure and integrate Salesforce so it reflects how you actually sell and serve, not how the default setup assumes you do.",
    deliverables: [
      "Sales Cloud and Service Cloud setup",
      "Agentforce and AI features",
      "Integration with ERP and finance systems",
      "Data migration and clean-up",
      "Admin training",
    ],
  },
];
