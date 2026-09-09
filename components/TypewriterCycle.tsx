"use client";

import { useEffect, useRef, useState } from "react";

interface TypewriterCycleProps {
  words: string[];
  className?: string;
  typingSpeedMs?: number;
  deletingSpeedMs?: number;
  pauseMs?: number;
}

/**
 * Types out each word, pauses, deletes it, then moves to the next —
 * classic typewriter cycling. Width is reserved to the longest word
 * via a stacked grid so surrounding text never reflows.
 */
export default function TypewriterCycle({
  words,
  className = "",
  typingSpeedMs = 90,
  deletingSpeedMs = 45,
  pauseMs = 1600,
}: TypewriterCycleProps) {
  const [display, setDisplay] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "deleting">("typing");
  const reducedMotion = useRef(false);

  useEffect(() => {
    reducedMotion.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion.current) setDisplay(words[0] ?? "");
  }, [words]);

  useEffect(() => {
    if (reducedMotion.current) return;

    const currentWord = words[wordIndex] ?? "";
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (display.length < currentWord.length) {
        timeout = setTimeout(() => {
          setDisplay(currentWord.slice(0, display.length + 1));
        }, typingSpeedMs);
      } else {
        timeout = setTimeout(() => setPhase("deleting"), pauseMs);
      }
    } else {
      if (display.length > 0) {
        timeout = setTimeout(() => {
          setDisplay(currentWord.slice(0, display.length - 1));
        }, deletingSpeedMs);
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [display, phase, wordIndex, words, typingSpeedMs, deletingSpeedMs, pauseMs]);

  const longest = words.reduce((a, b) => (b.length > a.length ? b : a), "");

  return (
    <span className={`typewriter-cycle ${className}`}>
      <span className="typewriter-ghost" aria-hidden="true">
        {longest}
      </span>
      <span className="typewriter-text" aria-hidden="true">
        {display}
        <span className="typewriter-caret" />
      </span>
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}
