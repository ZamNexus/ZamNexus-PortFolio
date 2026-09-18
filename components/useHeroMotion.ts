"use client";

import { useReducedMotion, type Transition, type TargetAndTransition } from "framer-motion";

export interface HeroMotionProps {
  initial: false | TargetAndTransition;
  animate: TargetAndTransition;
  transition: Transition;
}

const CUBIC_EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Standardized Hero Animation Hook
 * 
 * - Starting opacity: 75% minimum (guarantees content is immediately readable on slow connections).
 * - Completion time: Within 400ms (duration <= 0.35s, stagger delay <= 0.05s, total <= 400ms).
 * - prefers-reduced-motion: When requested, animation is completely skipped (initial: false, duration: 0).
 */
export function useHeroMotion() {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    const instant: HeroMotionProps = {
      initial: false,
      animate: { opacity: 1, y: 0, scale: 1, rotateX: 0, x: 0 },
      transition: { duration: 0 },
    };
    return {
      shouldReduceMotion: true,
      badge: instant,
      heading: instant,
      paragraph: instant,
      actions: instant,
      telemetry: instant,
      visual: instant,
      custom: () => instant,
    };
  }

  return {
    shouldReduceMotion: false,
    badge: {
      initial: { opacity: 0.75, y: 8, scale: 0.98 },
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { duration: 0.3, ease: "easeOut" as const },
    },
    heading: {
      initial: { opacity: 0.75, y: 12, rotateX: 0 },
      animate: { opacity: 1, y: 0, rotateX: 0 },
      transition: { duration: 0.35, ease: CUBIC_EASE },
    },
    paragraph: {
      initial: { opacity: 0.75, y: 8 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35, delay: 0.03, ease: CUBIC_EASE },
    },
    actions: {
      initial: { opacity: 0.75, y: 6 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35, delay: 0.05, ease: "easeOut" as const },
    },
    telemetry: {
      initial: { opacity: 0.75, y: 8 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35, delay: 0.05, ease: CUBIC_EASE },
    },
    visual: {
      initial: { opacity: 0.75, scale: 0.98 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.35, delay: 0.05, ease: CUBIC_EASE },
    },
    custom: (options?: { y?: number; x?: number; scale?: number; delay?: number; duration?: number }): HeroMotionProps => {
      const duration = Math.min(options?.duration ?? 0.35, 0.35);
      const delay = Math.min(options?.delay ?? 0.05, 0.4 - duration);
      return {
        initial: {
          opacity: 0.75,
          ...(options?.y !== undefined ? { y: options.y } : {}),
          ...(options?.x !== undefined ? { x: options.x } : {}),
          ...(options?.scale !== undefined ? { scale: options.scale } : {}),
        },
        animate: {
          opacity: 1,
          ...(options?.y !== undefined ? { y: 0 } : {}),
          ...(options?.x !== undefined ? { x: 0 } : {}),
          ...(options?.scale !== undefined ? { scale: 1 } : {}),
        },
        transition: {
          duration,
          delay: Math.max(0, delay),
          ease: CUBIC_EASE,
        },
      };
    },
  };
}
