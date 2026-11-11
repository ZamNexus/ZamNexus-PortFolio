// Every client-supplied claim on the site lives here. Items render only when `confirmed` is true,
// so an unverified figure, client name or credential can never reach the page by accident.
// To publish one: confirm it with ZamNexus Limited (in writing for client names), then set confirmed: true.

export interface Claim {
  value: string;
  label: string;
  confirmed: boolean;
}

export type ProductSlug = "znxerp" | "znxepos" | "znxedu" | "znxcare";

export const productStats: Record<ProductSlug, Claim[]> = {
  znxerp: [
    { value: "8", label: "Integrated modules", confirmed: true },
    { value: "1", label: "Database from gate to ledger", confirmed: true },
    { value: "5+", label: "Industrial plants live", confirmed: true },
    { value: "< 1s", label: "Ledger posting", confirmed: true },
  ],
  znxepos: [
    { value: "8", label: "Integrated modules", confirmed: true },
    { value: "Offline", label: "Tills keep trading without internet", confirmed: true },
    { value: "750+", label: "Active stores", confirmed: true },
    { value: "142k+", label: "SKUs synced across hubs", confirmed: true },
  ],
  znxedu: [
    { value: "8", label: "Integrated modules", confirmed: true },
    { value: "Multi-campus", label: "Central control of every site", confirmed: true },
    { value: "14k+", label: "Daily active users", confirmed: true },
    { value: "98.4%", label: "Fee recovery rate", confirmed: true },
  ],
  znxcare: [
    { value: "8", label: "Integrated modules", confirmed: true },
    { value: "HL7", label: "Lab analyser integration", confirmed: true },
    { value: "5+", label: "Specialist hospitals live", confirmed: true },
    { value: "< 60s", label: "Emergency intake to triage", confirmed: true },
  ],
};

// Client names and figures below are approved by ZamNexus.
// `logo` is an optional file under /public (for example "/clients/grays.svg"); without one the name is set as a wordmark.
export const clients: { name: string; sector: string; products: ProductSlug[]; confirmed: boolean; logo?: string }[] = [
  { name: "Grays Pharmaceutical", sector: "Pharmaceutical manufacturing", products: ["znxerp"], confirmed: true },
  { name: "Lotus Pharmaceuticals", sector: "Pharmaceutical manufacturing", products: ["znxerp"], confirmed: true },
  { name: "Panacea Pharmaceuticals", sector: "Pharmaceutical manufacturing", products: ["znxerp"], confirmed: true },
  { name: "Khyber Textile Mills", sector: "Textile manufacturing", products: ["znxerp"], confirmed: true },
  { name: "National Tariff Commission", sector: "Government commission", products: [], confirmed: true },
];

export const company = {
  legalName: "ZamNexus Limited",
  foundingYear: { value: "2009", label: "Established", confirmed: false } satisfies Claim,
  companyNumber: { value: "", label: "Company No.", confirmed: false } satisfies Claim,
  icoNumber: { value: "", label: "ICO registration", confirmed: false } satisfies Claim,
  // When true, articles show their named author; otherwise they're credited to "ZamNexus Engineering".
  articleAuthorsAreStaff: false,
};

export function confirmed<T extends { confirmed: boolean }>(items: T[]): T[] {
  return items.filter((item) => item.confirmed);
}
