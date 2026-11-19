"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
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
      <Link key={i} href={m[2]} className="font-semibold text-accent-text underline underline-offset-2 hover:opacity-80 transition-opacity">
        {m[1]}
      </Link>
    ) : (
      part
    );
  });
}

export default function ChatWidget() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  // True while the launcher sits over the dark home hero (marked data-dark-hero), where it turns white in the
  // Light theme too. The homepage opens on the hero, so it starts true there and the colour never flashes.
  const [onHero, setOnHero] = useState(pathname === "/");
  const end = useRef<HTMLDivElement>(null);

  useEffect(() => {
    end.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs, open]);

  useEffect(() => {
    const check = () => {
      const hero = document.querySelector("[data-dark-hero]");
      // the launcher's centre: 20px from the bottom edge plus half its 48px height
      const y = window.innerHeight - 44;
      const rect = hero?.getBoundingClientRect();
      setOnHero(!!rect && rect.top < y && rect.bottom > y);
    };
    const frame = window.requestAnimationFrame(check);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [pathname]);

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

  // The visitor chat has no place inside the admin panel.
  if (pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3">
      {open && (
        <div
          id="zn-chat-panel"
          className="chat-panel flex h-[28rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-3xl border border-[var(--border-subtle)] bg-surface/95 shadow-2xl backdrop-blur-2xl"
        >
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-5 py-3 text-xs font-mono font-bold uppercase tracking-widest text-accent-text">
            <span>ZamNexus Enterprise Assistant</span>
            <span className="h-2 w-2 rounded-full bg-success animate-pulse" aria-hidden="true" />
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4 text-sm" aria-live="polite">
            {msgs.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <span
                  className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-4 py-2 ${
                    m.role === "user"
                      ? "chat-fill font-medium"
                      : "border border-[var(--border-subtle)] bg-surface-2 text-foreground"
                  }`}
                >
                  {m.role === "assistant" ? <Rich text={m.content} /> : m.content}
                </span>
              </div>
            ))}
            {busy && msgs.at(-1)?.role === "user" && (
              <p className="animate-pulse text-xs font-mono text-accent-text">Consulting architecture knowledge base…</p>
            )}
            <div ref={end} />
          </div>
          <form onSubmit={send} className="flex gap-2 border-t border-[var(--border-subtle)] bg-background/40 p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              maxLength={2000}
              placeholder="Ask an architectural question…"
              aria-label="Message"
              className="min-w-0 flex-1 rounded-full border border-[var(--border-subtle)] bg-background px-4 py-2 text-sm text-foreground-strong outline-none transition-colors focus:border-[var(--border-strong)] placeholder:text-foreground-muted"
            />
            <button disabled={busy} className="chat-fill chat-send rounded-full px-4 py-2 text-sm font-semibold">
              Send
            </button>
          </form>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        aria-controls="zn-chat-panel"
        data-on-hero={onHero}
        className="chat-launcher"
      >
        <span className="chat-launcher__icon" aria-hidden="true">
          {open ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="M4 11.5C4 7.4 7.6 4.5 12 4.5s8 2.9 8 7-3.6 7-8 7c-1 0-1.9-.1-2.8-.4L5 19.5l1.2-3.4C4.8 14.9 4 13.3 4 11.5Z"
                fill="currentColor"
              />
              <circle className="chat-launcher__dot" cx="8.6" cy="11.6" r="1.15" />
              <circle className="chat-launcher__dot" cx="12" cy="11.6" r="1.15" />
              <circle className="chat-launcher__dot" cx="15.4" cy="11.6" r="1.15" />
            </svg>
          )}
        </span>
        <span>{open ? "Close" : "Chat with us"}</span>
      </button>
    </div>
  );
}
