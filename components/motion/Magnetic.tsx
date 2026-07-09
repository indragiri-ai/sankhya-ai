"use client";

import { motion, useReducedMotion, useSpring } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Magnetic (Build Book §4) — buttons only. Translates toward the cursor,
 * max 3px, springs back on leave. Pointer (fine) devices only; inert on
 * touch and under reduced motion.
 */

const MAX_PULL = 3; // px

type MagneticProps = {
  children: ReactNode;
  className?: string;
};

export function Magnetic({ children, className }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });

  function onPointerMove(e: React.PointerEvent) {
    if (reduced || e.pointerType !== "mouse") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, dx * 0.08)));
    y.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, dy * 0.08)));
  }

  function onPointerLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x, y, display: "inline-block" }}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      {children}
    </motion.div>
  );
}
