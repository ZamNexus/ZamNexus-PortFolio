"use client";

import dynamic from "next/dynamic";

// Loads three.js only in the browser and after the page is interactive, so it never delays the hero text.
const Nexus3DBackground = dynamic(() => import("@/components/Nexus3DBackground"), { ssr: false });

export default function HeroBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      <Nexus3DBackground />
    </div>
  );
}
