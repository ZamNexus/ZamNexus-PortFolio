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
