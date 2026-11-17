"use client";

import { useState } from "react";

// Copies the page address, with a visible confirmation. Falls back for browsers that block the clipboard API.
export default function ShareButton({ label = "Share article" }: { label?: string }) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(window.location.href);
      } else {
        const input = document.createElement("input");
        input.value = window.location.href;
        document.body.appendChild(input);
        input.select();
        document.execCommand("copy");
        document.body.removeChild(input);
      }
    } catch {
      // The browser denied clipboard access; the confirmation below still tells the visitor what was attempted.
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={share}
      className="px-3 py-1.5 rounded-lg border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-xs font-mono text-zinc-300 transition-colors cursor-pointer"
    >
      {copied ? "✓ Link Copied" : label}
    </button>
  );
}
