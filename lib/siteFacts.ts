// Every client-supplied claim on the site lives here. Items render only when `confirmed` is true,
// so an unverified figure, client name or credential can never reach the page by accident.
// To publish one: confirm it with Zamooq Limited (in writing for client names), then set confirmed: true.

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
    { value: "5+", label: "Industrial plants live", confirmed: false },
    { value: "< 1s", label: "Ledger posting", confirmed: false },
  ],
  znxepos: [
    { value: "8", label: "Integrated modules", confirmed: true },
    { value: "Offline", label: "Tills keep trading without internet", confirmed: true },
    { value: "750+", label: "Active stores", confirmed: false },
    { value: "142k+", label: "SKUs synced across hubs", confirmed: false },
  ],
  znxedu: [
    { value: "8", label: "Integrated modules", confirmed: true },
    { value: "Multi-campus", label: "Central control of every site", confirmed: true },
    { value: "14k+", label: "Daily active users", confirmed: false },
    { value: "98.4%", label: "Fee recovery rate", confirmed: false },
  ],
  znxcare: [
    { value: "8", label: "Integrated modules", confirmed: true },
    { value: "HL7", label: "Lab analyser integration", confirmed: true },
    { value: "5+", label: "Specialist hospitals live", confirmed: false },
    { value: "< 60s", label: "Emergency intake to triage", confirmed: false },
  ],
};

// Client names need written permission before they're shown. National Tariff Commission is a government body.
export const clients: { name: string; products: ProductSlug[]; confirmed: boolean }[] = [
  { name: "Grays Pharmaceutical", products: ["znxerp"], confirmed: false },
  { name: "Lotus Pharmaceuticals", products: ["znxerp"], confirmed: false },
  { name: "Panacea Pharmaceuticals", products: ["znxerp"], confirmed: false },
  { name: "Khyber Textile Mills", products: ["znxerp"], confirmed: false },
  { name: "National Tariff Commission", products: [], confirmed: false },
];

export const company = {
  legalName: "Zamooq Limited",
  foundingYear: { value: "2009", label: "Established", confirmed: false } satisfies Claim,
  companyNumber: { value: "", label: "Company No.", confirmed: false } satisfies Claim,
  icoNumber: { value: "", label: "ICO registration", confirmed: false } satisfies Claim,
  // When true, articles show their named author; otherwise they're credited to "ZamNexus Engineering".
  articleAuthorsAreStaff: false,
};

export function confirmed<T extends { confirmed: boolean }>(items: T[]): T[] {
  return items.filter((item) => item.confirmed);
}
