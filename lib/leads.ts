import { appendFile } from "node:fs/promises";

export type LeadSource = "chat" | "contact" | "demo" | "newsletter";

export interface Lead {
  source: LeadSource;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  role?: string;
  product?: string;
  interests?: string[];
  timeline?: string;
  message?: string;
}

// Sends the lead to LEAD_WEBHOOK_URL (Slack, Zapier, Make, Power Automate, CRM inbound hook).
// The payload carries a readable `text` line for chat webhooks plus every field for automation tools.
// Without a webhook it falls back to a local file in dev and the function logs on Vercel (read-only disk).
// Returns false only when a configured webhook rejects the lead, so the form can tell the visitor.
export async function saveLead(lead: Lead): Promise<boolean> {
  const filled = Object.entries(lead).filter(([, v]) => (Array.isArray(v) ? v.length : v));
  const record = { at: new Date().toISOString(), ...Object.fromEntries(filled) };
  const url = process.env.LEAD_WEBHOOK_URL;
  if (url) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: summary(lead), ...record }),
        signal: AbortSignal.timeout(8000),
      });
      if (res.ok) return true;
    } catch {
      // network error or timeout: handled below
    }
    // Keep a copy in the logs so a webhook outage never loses the lead outright.
    console.error("LEAD (webhook failed)", JSON.stringify(record));
    return false;
  }
  const line = JSON.stringify(record);
  try {
    await appendFile(".leads.jsonl", line + "\n");
  } catch {
    console.error("LEAD", line);
  }
  return true;
}

function summary(lead: Lead): string {
  const who = [lead.name, lead.company && `(${lead.company})`].filter(Boolean).join(" ") || "Someone";
  const contact = [lead.email, lead.phone].filter(Boolean).join(" · ");
  const topic = lead.product || lead.interests?.join(", ") || "";
  return [`New ${lead.source} lead: ${who}`, contact, topic, lead.timeline, lead.message]
    .filter(Boolean)
    .join("\n");
}

// Same-origin check: blocks other sites from posting to our endpoints. Origin "null" or malformed is rejected too.
export function crossOrigin(req: Request): boolean {
  const origin = req.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host !== req.headers.get("host");
  } catch {
    return true;
  }
}

// Trust a client-IP header only where the platform sets it (Vercel overwrites x-vercel-forwarded-for).
// Everywhere else every header is client-controlled, so all traffic shares one bucket: it can't be
// spoofed, but one noisy client throttles the rest. Fine for local dev; self-hosting needs a trusted proxy header.
export function clientIp(req: Request): string {
  return (process.env.VERCEL && req.headers.get("x-vercel-forwarded-for")) || "unknown";
}
