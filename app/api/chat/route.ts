import { appendFile } from "node:fs/promises";
import { stream, type ChatMessage } from "@/lib/llm";
import { SYSTEM } from "@/lib/knowledge";
import { limited } from "@/lib/rateLimit";

const TOOLS = [
  {
    type: "function",
    function: {
      name: "save_lead",
      description: "Save a visitor who wants to be contacted by the ZamNexus team.",
      parameters: {
        type: "object",
        properties: {
          name: { type: "string" },
          email: { type: "string" },
          phone: { type: "string" },
          company: { type: "string" },
          need: { type: "string", description: "What they want help with and the service recommended" },
        },
        required: ["name", "need"],
      },
    },
  },
];

const MAX_TURNS = 20;
const MAX_LEN = 1000;
const MAX_BODY = 20_000;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE = /^\+?[\d\s().-]{7,20}$/;

// Trims, caps length and validates contact details; returns null if unusable.
function cleanLead(raw: Record<string, unknown>) {
  const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
  const lead = {
    name: str(raw.name, 100),
    email: str(raw.email, 120),
    phone: str(raw.phone, 25),
    company: str(raw.company, 120),
    need: str(raw.need, 500),
  };
  if (lead.email && !EMAIL.test(lead.email)) return null;
  if (lead.phone && !PHONE.test(lead.phone)) return null;
  if (!lead.name || !lead.need || (!lead.email && !lead.phone)) return null;
  return lead;
}

export async function POST(req: Request) {
  // Block other sites from using our endpoint (and our OpenRouter bill). Origin "null" or malformed is rejected too.
  const origin = req.headers.get("origin");
  if (origin && originHost(origin) !== req.headers.get("host")) {
    return Response.json({ error: "forbidden" }, { status: 403 });
  }
  if (limited(clientIp(req))) {
    return Response.json({ error: "Too many messages. Please wait a minute and try again." }, { status: 429 });
  }
  // Reject oversized bodies from the header before reading them, then re-check the real size.
  if (Number(req.headers.get("content-length") ?? 0) > MAX_BODY) {
    return Response.json({ error: "too large" }, { status: 413 });
  }
  const raw = await req.text();
  if (raw.length > MAX_BODY) return Response.json({ error: "too large" }, { status: 413 });
  const body: { messages?: { role: string; content: string }[] } = (() => {
    try {
      return JSON.parse(raw);
    } catch {
      return {};
    }
  })();
  const history = (body.messages ?? [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_LEN) })) as ChatMessage[];
  if (history.at(-1)?.role !== "user") return Response.json({ error: "bad request" }, { status: 400 });

  const messages: ChatMessage[] = [{ role: "system", content: SYSTEM }, ...history];
  const enc = new TextEncoder();
  const body$ = new ReadableStream({
    async start(ctrl) {
      const send = (o: object) => ctrl.enqueue(enc.encode(JSON.stringify(o) + "\n"));
      try {
        let sent = false;
        let thinking = false;
        let saved = false; // one lead per request
        for (let round = 0; round < 2; round++) {
          let reply: ChatMessage | undefined;
          for await (const ev of stream(messages, TOOLS, req.signal)) {
            if (ev.kind === "thinking") {
              if (!thinking) send({ type: "thinking" });
              thinking = true;
            }
            else if (ev.kind === "text") {
              sent = true;
              send({ type: "text", text: ev.text });
            } else reply = ev.message;
          }
          if (!reply?.tool_calls?.length) break;
          messages.push(reply);
          for (const call of reply.tool_calls) {
            const lead = call.function.name === "save_lead" && !saved ? cleanLead(safeParse(call.function.arguments)) : null;
            let result = "error: need a name, what they need, and a valid email or phone. Ask the visitor.";
            if (lead) {
              await saveLead({ at: new Date().toISOString(), ...lead });
              saved = true;
              result = "saved";
            }
            messages.push({ role: "tool", tool_call_id: call.id, content: result });
          }
        }
        if (!sent) send({ type: "text", text: "Sorry, I could not answer that. Please try rephrasing." });
      } catch {
        send({ type: "error", text: "Chat is unavailable right now." });
      }
      ctrl.close();
    },
  });
  return new Response(body$, { headers: { "Content-Type": "application/x-ndjson" } });
}

// ponytail: local file for dev; on Vercel the disk is read-only so it falls back to the function logs.
// Replace with an email/CRM/Slack webhook before relying on leads in production.
async function saveLead(lead: object) {
  const line = JSON.stringify(lead);
  try {
    await appendFile(".leads.jsonl", line + "\n");
  } catch {
    console.error("LEAD", line);
  }
}

function originHost(origin: string): string | null {
  try {
    return new URL(origin).host;
  } catch {
    return null;
  }
}

// Trust a client-IP header only where the platform sets it (Vercel overwrites x-vercel-forwarded-for).
// Everywhere else every header is client-controlled, so all traffic shares one bucket: it can't be
// spoofed, but one noisy client throttles the rest. Fine for local dev; self-hosting needs a trusted proxy header.
function clientIp(req: Request): string {
  return (process.env.VERCEL && req.headers.get("x-vercel-forwarded-for")) || "unknown";
}

function safeParse(s: string): Record<string, unknown> {
  try {
    return JSON.parse(s);
  } catch {
    return { raw: s };
  }
}
