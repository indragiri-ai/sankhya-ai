"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Reveal (Build Book §4) — the site's only entrance pattern.
 * opacity 0→1, translateY var(--reveal-y)→0, var(--dur-base), var(--ease-out),
 * triggers at 20% viewport entry, once. `step` multiplies var(--stagger)
 * for orchestrated groups. Reduced motion: renders static.
 */

const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]; // = --ease-out
const DUR_BASE = 0.5; // = --dur-base
const STAGGER = 0.06; // = --stagger
const REVEAL_Y = 12; // = --reveal-y

type RevealProps = {
  children: ReactNode;
  /** stagger step within a group: delay = step × 60ms */
  step?: number;
  /** extra delay in seconds, added after stagger */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "span" | "li";
};

export function Reveal({
  children,
  step = 0,
  delay = 0,
  className,
  as = "div",
}: RevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as];

  if (reduced) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: REVEAL_Y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: DUR_BASE,
        ease: EASE_OUT,
        delay: step * STAGGER + delay,
      }}
    >
      {children}
    </Tag>
  );
}
