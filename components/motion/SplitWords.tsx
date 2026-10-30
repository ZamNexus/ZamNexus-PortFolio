import { Fragment, type CSSProperties } from "react";

interface SplitWordsProps {
  text: string;
  // "load": rises on page load (hero). "reveal": rises when the parent Reveal enters the viewport.
  mode?: "load" | "reveal";
}

// Splits a heading into words that rise from behind a mask, one after another.
// The words are real text in order, so screen readers and search engines read the heading normally.
export default function SplitWords({ text, mode = "reveal" }: SplitWordsProps) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        // The space sits outside the masked word: inside an inline-block, trailing whitespace collapses.
        <Fragment key={i}>
          <span className={`split-word split-word--${mode}`}>
            <span style={{ "--w": i } as CSSProperties}>{word}</span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </>
  );
}
