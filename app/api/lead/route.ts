import { limited } from "@/lib/rateLimit";
import { saveLead, crossOrigin, clientIp, type Lead, type LeadSource } from "@/lib/leads";
import { EMAIL, PHONE } from "@/lib/validateLead";

const MAX_BODY = 10_000;
const SOURCES: LeadSource[] = ["contact", "demo", "newsletter"];

// Trims and caps every field, then applies the per-form required fields; returns null if unusable.
function cleanLead(raw: Record<string, unknown>): Lead | null {
  const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const source = SOURCES.find((s) => s === raw.source);
  if (!source) return null;
  const lead: Lead = {
    source,
    name: str(raw.name, 100),
    email: str(raw.email, 120),
    phone: str(raw.phone, 25),
    company: str(raw.company, 120),
    role: str(raw.role, 100),
    product: str(raw.product, 60),
    interests: Array.isArray(raw.interests) ? raw.interests.slice(0, 12).map((i) => str(i, 60)).filter(Boolean) : [],
    timeline: str(raw.timeline, 60),
    message: str(raw.message, 2000),
  };
  if (!EMAIL.test(lead.email ?? "")) return null;
  if (lead.phone && !PHONE.test(lead.phone)) return null;
  if (source !== "newsletter" && !lead.name) return null;
  if (source === "contact" && !lead.message) return null;
  if (source === "demo" && (!lead.company || !lead.product)) return null;
  return lead;
}

export async function POST(req: Request) {
  if (crossOrigin(req)) return Response.json({ error: "forbidden" }, { status: 403 });
  if (limited(`lead:${clientIp(req)}`)) {
    return Response.json({ error: "Too many submissions. Please wait a minute and try again." }, { status: 429 });
  }
  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY) {
    return Response.json({ error: "too large" }, { status: 413 });
  }
  const raw = await req.text();
  if (raw.length > MAX_BODY) return Response.json({ error: "too large" }, { status: 413 });
  let body: Record<string, unknown>;
  try {
    body = JSON.parse(raw);
  } catch {
    return Response.json({ error: "bad request" }, { status: 400 });
  }

  // Honeypot: real visitors never see or fill `website`. Pretend success so bots don't retry.
  if (typeof body.website === "string" && body.website) return Response.json({ ok: true });

  const lead = cleanLead(body);
  if (!lead) return Response.json({ error: "Please check the required fields and your email address." }, { status: 400 });
  if (!(await saveLead(lead))) {
    return Response.json({ error: "We couldn't send that right now. Please email contact@zamnexus.com." }, { status: 502 });
  }
  return Response.json({ ok: true });
}
