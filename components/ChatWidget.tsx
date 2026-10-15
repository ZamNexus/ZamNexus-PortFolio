"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface Msg {
  role: "user" | "assistant";
  content: string;
}

const GREETING: Msg = {
  role: "assistant",
  content: "Hi! I'm the ZamNexus assistant. Ask me about our services, or tell me what you need and I'll connect you with the team.",
};

// Renders [text](/internal-path) as links; anything else stays plain text.
function Rich({ text }: { text: string }) {
  return text.split(/(\[[^\]]+\]\(\/[^)\s]*\))/g).map((part, i) => {
    const m = part.match(/^\[([^\]]+)\]\((\/[^)\s]*)\)$/);
    return m ? (
      <Link key={i} href={m[2]} className="font-semibold text-[#D0FF71] underline">
        {m[1]}
      </Link>
    ) : (
      part
    );
  });
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  async function send(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || busy) return;
    const next: Msg[] = [...msgs, { role: "user", content: text }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    const setLast = (content: string) => setMsgs([...next, { role: "assistant", content }]);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // greeting is UI-only, the API needs history starting at the visitor's first message
        body: JSON.stringify({ messages: next.slice(1) }),
      });
      if (res.status === 429) {
        setLast("You're sending messages too quickly. Please wait a minute and try again.");
        return;
      }
      if (!res.ok || !res.body) throw new Error("bad response");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buf = "";
      let answer = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += decoder.decode(value, { stream: true });
        const lines = buf.split("\n");
        buf = lines.pop() ?? "";
        for (const line of lines.filter(Boolean)) {
          const ev: { type: string; text?: string } = JSON.parse(line);
          if (ev.type === "text") answer += ev.text;
          if (ev.type === "error") answer = ev.text ?? "Something went wrong.";
          if (ev.type !== "thinking") setLast(answer);
        }
      }
    } catch {
      setLast("Network error. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      {open && (
        <div className="flex h-[28rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-zinc-800/80 bg-[#11141D]/95 shadow-2xl backdrop-blur-2xl">
          <div className="border-b border-zinc-800 px-5 py-3 text-xs font-mono font-bold uppercase tracking-widest text-[#D0FF71]">
            ZamNexus Assistant
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <span
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2 ${
                    m.role === "user" ? "bg-[#D0FF71] text-black" : "bg-zinc-900 text-zinc-300"
                  }`}
                >
                  {m.role === "assistant" ? <Rich text={m.content} /> : m.content}
                </span>
              </div>
            ))}
            {busy && msgs.at(-1)?.role === "user" && (
              <p className="animate-pulse text-xs text-zinc-500">Thinking…</p>
            )}
            <div ref={end} />
          </div>
          <form onSubmit={send} className="flex gap-2 border-t border-zinc-800 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={2000}
              placeholder="Type your message"
              aria-label="Message"
              className="min-w-0 flex-1 rounded-full border border-zinc-800 bg-[#090b10] px-4 py-2 text-sm text-white outline-none focus:border-[#D0FF71]/60"
            />
            <button
              disabled={busy}
              className="rounded-full bg-[#D0FF71] px-4 py-2 text-sm font-semibold text-black disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="rounded-full bg-[#D0FF71] px-5 py-3 text-sm font-semibold text-black shadow-[0_0_25px_rgba(208,255,113,0.25)]"
      >
        {open ? "Close" : "Chat with us"}
      </button>
    </div>
  );
}
