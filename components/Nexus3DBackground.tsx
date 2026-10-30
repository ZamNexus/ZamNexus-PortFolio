"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface Nexus3DBackgroundProps {
  interactive?: boolean;
  className?: string;
}

export default function Nexus3DBackground({
  interactive = true,
  className = "",
}: Nexus3DBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect reduced motion settings
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Setup Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x080b11, 0.04);

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 8;
    camera.position.y = 0;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));

    container.appendChild(renderer.domElement);
    setIsReady(true);

    // ─── Floating 3D Cosmic Data Field (Stars / Data Nodes) ──────────────────
    const particleCount = 1400;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const cyanColor = new THREE.Color(0x38bdf8);
    const indigoColor = new THREE.Color(0x818cf8);
    const emeraldColor = new THREE.Color(0x34d399);

    for (let i = 0; i < particleCount; i++) {
      // Cylindrical / volumetric distribution across the full viewport depth
      const radius = 3 + Math.random() * 16;
      const theta = Math.random() * Math.PI * 2;
      const z = (Math.random() - 0.5) * 20;

      positions[i * 3] = radius * Math.cos(theta);
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 2] = z;

      // Color variation
      const choice = Math.random();
      const col = choice < 0.6 ? cyanColor : choice < 0.85 ? indigoColor : emeraldColor;
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.038,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      fog: true,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // ─── Subtle Mouse Parallax Tracking ──────────────────────────────────────
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.targetX = x * 0.35;
      mouse.targetY = y * 0.25;
    };

    if (interactive) {
      window.addEventListener("pointermove", handlePointerMove);
    }

    // ─── Resize Handling ─────────────────────────────────────────────────────
    let resizeTimer: number;
    const handleResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        if (!container) return;
        const w = container.clientWidth || window.innerWidth;
        const h = container.clientHeight || window.innerHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }, 100);
    };

    window.addEventListener("resize", handleResize);

    // ─── Animation Loop ──────────────────────────────────────────────────────
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        // Smooth mouse parallax lerp
        mouse.x += (mouse.targetX - mouse.x) * 0.04;
        mouse.y += (mouse.targetY - mouse.y) * 0.04;

        // Gentle, slow ambient cosmic drift
        particles.rotation.y = elapsedTime * 0.012 + mouse.x;
        particles.rotation.x = mouse.y * 0.6;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // ─── Cleanup ─────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      if (interactive) {
        window.removeEventListener("pointermove", handlePointerMove);
      }
      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [interactive]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden pointer-events-none ${className}`}
      aria-hidden="true"
    >
      {/* Soft Ambient Cosmic Halos */}
      <div className="absolute top-[8%] left-[5%] w-[600px] h-[600px] rounded-full bg-sky-500/[0.05] blur-[160px] pointer-events-none" />
      <div className="absolute top-[35%] right-[5%] w-[650px] h-[650px] rounded-full bg-indigo-600/[0.05] blur-[180px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[10%] w-[550px] h-[550px] rounded-full bg-emerald-500/[0.035] blur-[150px] pointer-events-none" />

      {/* Cyber Grid Plane with high-precision subtle line opacity */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="nexus-grid-3d"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 56 0 L 0 0 0 56"
              fill="none"
              stroke="#38bdf8"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#nexus-grid-3d)" />
      </svg>
    </div>
  );
}
