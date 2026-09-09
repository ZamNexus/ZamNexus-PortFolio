"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

const LINK_DISTANCE = 140;
const DENSITY = 9000; // px^2 of hero area per particle — keeps the effect subtle

/**
 * Canvas-based neural-net particle background. No external libraries.
 * Particles drift slowly and draw a line to nearby neighbours, fading
 * with distance. Renders a single static frame under prefers-reduced-motion.
 */
export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let rafId = 0;
    let resizeRafId = 0;

    function seedParticles() {
      const count = Math.max(24, Math.min(70, Math.round((width * height) / DENSITY)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
      }));
    }

    function resize() {
      const rect = parent!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      seedParticles();
    }

    function drawFrame(animate: boolean) {
      ctx!.clearRect(0, 0, width, height);

      if (animate) {
        for (const p of particles) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x <= 0 || p.x >= width) p.vx *= -1;
          if (p.y <= 0 || p.y >= height) p.vy *= -1;
        }
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DISTANCE) {
            const alpha = (1 - dist / LINK_DISTANCE) * 0.18;
            ctx!.strokeStyle = `rgba(96, 165, 250, ${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      for (const p of particles) {
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(147, 197, 253, 0.55)";
        ctx!.fill();
      }

      if (animate) {
        rafId = requestAnimationFrame(() => drawFrame(true));
      }
    }

    function handleResize() {
      // Cancel-and-reschedule rather than a boolean guard: if a browser
      // drops a queued rAF callback (e.g. tab backgrounded mid-resize), a
      // boolean guard can get stuck permanently. This can't.
      if (resizeRafId) cancelAnimationFrame(resizeRafId);
      resizeRafId = requestAnimationFrame(() => {
        resizeRafId = 0;
        resize();
        if (reducedMotion) drawFrame(false);
      });
    }

    resize();
    drawFrame(!reducedMotion);
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (rafId) cancelAnimationFrame(rafId);
      if (resizeRafId) cancelAnimationFrame(resizeRafId);
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-network-canvas" aria-hidden="true" />;
}
