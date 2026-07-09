"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counter (Build Book §4) — mono tabular numerals, ticks 0→value over 1.2s
 * ease-out on first viewport entry, once. Reduced motion: static value.
 * Uses the same curve family as --ease-out (cubic ease-out on progress).
 */

type CounterProps = {
  value: number;
  /** decimal places to render */
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

const DURATION_MS = 1200;

export function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const t0 = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - t0) / DURATION_MS, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          setDisplay(value * eased);
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value]);

  return (
    <span ref={ref} className={`text-figure ${className ?? ""}`}>
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
