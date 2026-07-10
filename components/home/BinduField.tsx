"use client";

import { useEffect, useRef } from "react";

/**
 * BinduField (Phase 3, as-specced) — Canvas 2D, hand-written, zero deps.
 *
 * A field of data points with cursor gravity that periodically resolves into
 * structured formations (grid → normal distribution → network), referencing
 * the anusvara dot of सं and the meaning of Sāṅkhya: enumeration.
 *
 * Every constant lives in CONFIG below and is mirrored in the Build Book.
 * Reduced motion: renders one static network frame — no animation, no listeners.
 * Lifecycle: pauses off-viewport (IntersectionObserver) and on hidden tabs.
 */

const CONFIG = {
  // Density
  AREA_PER_POINT: 9000, // px² per point
  MAX_POINTS: 140,
  MIN_POINTS: 60,
  DPR_CAP: 2,
  RESIZE_DEBOUNCE_MS: 150,

  // Points
  RADIUS_MIN: 2,
  RADIUS_MAX: 3,
  EMBER_FRACTION: 0.08,
  VIOLET_ALPHA: 0.5,
  EMBER_ALPHA: 0.85,
  EDGE_FADE_PX: 20,

  // Ambient drift (slow noise walk)
  DRIFT_VMAX: 0.15, // px/frame
  DRIFT_TURN: 0.08, // rad/frame random walk on heading

  // Cursor gravity
  GRAVITY_RADIUS: 120,
  GRAVITY_STRENGTH: 0.02,
  SPRING_BACK: 0.04,

  // Formation cycle
  FIRST_FORMATION_MS: 3000,
  CYCLE_MS: 9000,
  TWEEN_IN_MS: 600,
  HOLD_MS: 3000,
  TWEEN_OUT_MS: 800,

  // Grid formation
  GRID_GUTTER: 24, // px between cells
  GRID_JITTER: 2, // ±px so it breathes

  // Distribution formation (normal curve dot plot)
  DIST_SIGMA_DIVISOR: 8, // σ = width / 8
  DIST_DOT_SPACING: 10, // vertical stack spacing

  // Network formation
  NET_LINK_DIST: 90,
  NET_LINE_ALPHA: 0.12,
  NET_LINE_FADE_MS: 300,
  NET_PARTICIPATION: 0.55,

  // Dev frame-budget check (fallback ladder step 1: -20% points)
  FRAME_BUDGET_MS: 12,
  BUDGET_WINDOW_MS: 2000,
} as const;

// Brand colors — read once from tokens at mount so the canvas obeys globals.css
function readToken(name: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

const EASE_OUT = (t: number) => 1 - Math.pow(1 - t, 3);

type Phase = "ambient" | "in" | "hold" | "out";
const FORMATIONS = ["grid", "distribution", "network"] as const;

export function BinduField({
  hostRef,
  onDark = false,
}: {
  hostRef: React.RefObject<HTMLElement | null>;
  /** On dark (violet) surfaces the base points render in bone, not violet */
  onDark?: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const violet = onDark
      ? readToken("--bone", "#FAF7F1")
      : readToken("--violet", "#34006F");
    const ember = readToken("--ember", "#FE5000");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;

    let width = 0;
    let height = 0;
    let n = 0;

    // State arrays — allocated on (re)seed only; zero per-frame allocation
    let px: Float32Array = new Float32Array(0); // ambient sim position
    let py: Float32Array = new Float32Array(0);
    let heading: Float32Array = new Float32Array(0);
    let speed: Float32Array = new Float32Array(0);
    let radius: Float32Array = new Float32Array(0);
    let isEmber: Uint8Array = new Uint8Array(0);
    let tx: Float32Array = new Float32Array(0); // formation targets
    let ty: Float32Array = new Float32Array(0);
    let sx: Float32Array = new Float32Array(0); // tween start snapshot
    let sy: Float32Array = new Float32Array(0);
    let rx: Float32Array = new Float32Array(0); // rendered position
    let ry: Float32Array = new Float32Array(0);
    let claimed: Uint8Array = new Uint8Array(0); // grid cell claims

    let phase: Phase = "ambient";
    let formationIdx = -1; // cycles 0,1,2 → grid, distribution, network
    let phaseStart = 0;
    let nextFormationAt = 0;

    let cursorX = -1e6;
    let cursorY = -1e6;
    let cursorIn = false;

    let raf = 0;
    let running = false;
    let inView = true;
    let pageVisible = true;

    // Dev frame budget
    let frameAcc = 0;
    let frameCount = 0;
    let budgetLastCheck = 0;
    let budgetApplied = false;

    function pointCount(): number {
      const target = Math.min(CONFIG.MAX_POINTS, Math.floor((width * height) / CONFIG.AREA_PER_POINT));
      return Math.max(CONFIG.MIN_POINTS, target);
    }

    function seed(preserveFraction = false) {
      const newN = budgetApplied ? Math.floor(pointCount() * 0.8) : pointCount();
      const oldN = n;
      const opx = px, opy = py, ohead = heading, ospd = speed, orad = radius, oemb = isEmber;
      n = newN;
      px = new Float32Array(n); py = new Float32Array(n);
      heading = new Float32Array(n); speed = new Float32Array(n);
      radius = new Float32Array(n); isEmber = new Uint8Array(n);
      tx = new Float32Array(n); ty = new Float32Array(n);
      sx = new Float32Array(n); sy = new Float32Array(n);
      rx = new Float32Array(n); ry = new Float32Array(n);
      claimed = new Uint8Array(n);
      for (let i = 0; i < n; i++) {
        if (preserveFraction && i < oldN) {
          // proportional re-seed on resize: keep relative positions, no jump
          px[i] = opx[i]; py[i] = opy[i];
          heading[i] = ohead[i]; speed[i] = ospd[i];
          radius[i] = orad[i]; isEmber[i] = oemb[i];
        } else {
          px[i] = Math.random() * width;
          py[i] = Math.random() * height;
          heading[i] = Math.random() * Math.PI * 2;
          speed[i] = (0.4 + Math.random() * 0.6) * CONFIG.DRIFT_VMAX;
          radius[i] = CONFIG.RADIUS_MIN + Math.random() * (CONFIG.RADIUS_MAX - CONFIG.RADIUS_MIN);
          isEmber[i] = Math.random() < CONFIG.EMBER_FRACTION ? 1 : 0;
        }
        rx[i] = px[i]; ry[i] = py[i];
      }
    }

    function resize() {
      const rect = host!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      const dpr = Math.min(window.devicePixelRatio || 1, CONFIG.DPR_CAP);
      canvas!.width = Math.round(width * dpr);
      canvas!.height = Math.round(height * dpr);
      canvas!.style.width = `${width}px`;
      canvas!.style.height = `${height}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    /* ---------- formation target computation (runs at trigger, not per frame) ---------- */

    function computeGridTargets() {
      const cols = Math.ceil(Math.sqrt(n));
      const rows = Math.ceil(n / cols);
      const gw = (cols - 1) * CONFIG.GRID_GUTTER;
      const gh = (rows - 1) * CONFIG.GRID_GUTTER;
      const ox = (width - gw) / 2;
      const oy = (height - gh) / 2;
      claimed.fill(0);
      // each point claims its nearest unclaimed cell — honest grid, every cell filled
      for (let i = 0; i < n; i++) {
        let best = -1;
        let bestD = Infinity;
        for (let c = 0; c < n; c++) {
          if (claimed[c]) continue;
          const cx = ox + (c % cols) * CONFIG.GRID_GUTTER;
          const cy = oy + Math.floor(c / cols) * CONFIG.GRID_GUTTER;
          const d = (px[i] - cx) ** 2 + (py[i] - cy) ** 2;
          if (d < bestD) {
            bestD = d;
            best = c;
          }
        }
        claimed[best] = 1;
        tx[i] = ox + (best % cols) * CONFIG.GRID_GUTTER + (Math.random() * 2 - 1) * CONFIG.GRID_JITTER;
        ty[i] = oy + Math.floor(best / cols) * CONFIG.GRID_GUTTER + (Math.random() * 2 - 1) * CONFIG.GRID_JITTER;
      }
    }

    function computeDistributionTargets() {
      // Honest normal-curve dot plot: μ = center-x, σ = width/8.
      // Points fill vertical stacks whose heights follow the Gaussian pdf.
      const mu = width / 2;
      const sigma = width / CONFIG.DIST_SIGMA_DIVISOR;
      const binW = CONFIG.DIST_DOT_SPACING;
      const half = Math.floor((3 * sigma) / binW);
      const bins = 2 * half + 1;
      const baseline = height * 0.72;
      // expected share per bin
      let total = 0;
      const weights = new Float32Array(bins);
      for (let b = 0; b < bins; b++) {
        const x = (b - half) * binW;
        weights[b] = Math.exp(-(x * x) / (2 * sigma * sigma));
        total += weights[b];
      }
      let assigned = 0;
      let i = 0;
      for (let b = 0; b < bins && i < n; b++) {
        let count = Math.round((weights[b] / total) * n);
        if (b === bins - 1) count = n - assigned;
        const bx = mu + (b - half) * binW;
        for (let k = 0; k < count && i < n; k++, i++, assigned++) {
          tx[i] = bx;
          ty[i] = baseline - k * CONFIG.DIST_DOT_SPACING;
        }
      }
      for (; i < n; i++) {
        tx[i] = px[i];
        ty[i] = py[i];
      }
    }

    function computeNetworkTargets() {
      // points keep their positions; lines are drawn between near pairs at render
      for (let i = 0; i < n; i++) {
        tx[i] = px[i];
        ty[i] = py[i];
      }
    }

    function triggerFormation(now: number) {
      formationIdx = (formationIdx + 1) % FORMATIONS.length;
      const f = FORMATIONS[formationIdx];
      if (f === "grid") computeGridTargets();
      else if (f === "distribution") computeDistributionTargets();
      else computeNetworkTargets();
      for (let i = 0; i < n; i++) {
        sx[i] = rx[i];
        sy[i] = ry[i];
      }
      phase = "in";
      phaseStart = now;
    }

    /* ---------- simulation ---------- */

    function stepAmbient() {
      const gravityActive = cursorIn && !isTouch && phase === "ambient";
      for (let i = 0; i < n; i++) {
        heading[i] += (Math.random() - 0.5) * CONFIG.DRIFT_TURN;
        px[i] += Math.cos(heading[i]) * speed[i];
        py[i] += Math.sin(heading[i]) * speed[i];
        // wrap with soft margin (alpha fades near edges at render)
        if (px[i] < -CONFIG.EDGE_FADE_PX) px[i] = width + CONFIG.EDGE_FADE_PX;
        else if (px[i] > width + CONFIG.EDGE_FADE_PX) px[i] = -CONFIG.EDGE_FADE_PX;
        if (py[i] < -CONFIG.EDGE_FADE_PX) py[i] = height + CONFIG.EDGE_FADE_PX;
        else if (py[i] > height + CONFIG.EDGE_FADE_PX) py[i] = -CONFIG.EDGE_FADE_PX;

        if (gravityActive) {
          const dx = cursorX - px[i];
          const dy = cursorY - py[i];
          const d2 = dx * dx + dy * dy;
          if (d2 < CONFIG.GRAVITY_RADIUS * CONFIG.GRAVITY_RADIUS) {
            px[i] += dx * CONFIG.GRAVITY_STRENGTH;
            py[i] += dy * CONFIG.GRAVITY_STRENGTH;
          }
        }
      }
    }

    function edgeAlpha(x: number, y: number): number {
      const m = CONFIG.EDGE_FADE_PX;
      const fx = Math.min(1, Math.max(0, Math.min(x + m, width + m - x) / (2 * m)));
      const fy = Math.min(1, Math.max(0, Math.min(y + m, height + m - y) / (2 * m)));
      return Math.min(fx, fy);
    }

    function render(now: number) {
      ctx!.clearRect(0, 0, width, height);

      // formation blend weight
      let w = 0;
      const f = formationIdx >= 0 ? FORMATIONS[formationIdx] : null;
      if (phase === "in") {
        const p = Math.min((now - phaseStart) / CONFIG.TWEEN_IN_MS, 1);
        w = EASE_OUT(p);
        if (p >= 1) {
          phase = "hold";
          phaseStart = now;
        }
      } else if (phase === "hold") {
        w = 1;
        if (now - phaseStart >= CONFIG.HOLD_MS) {
          phase = "out";
          phaseStart = now;
          for (let i = 0; i < n; i++) {
            sx[i] = rx[i];
            sy[i] = ry[i];
          }
        }
      } else if (phase === "out") {
        const p = Math.min((now - phaseStart) / CONFIG.TWEEN_OUT_MS, 1);
        w = 1 - EASE_OUT(p);
        if (p >= 1) {
          phase = "ambient";
          nextFormationAt = now + CONFIG.CYCLE_MS - CONFIG.TWEEN_IN_MS - CONFIG.HOLD_MS - CONFIG.TWEEN_OUT_MS;
        }
      }

      // positions: blend ambient sim with formation target
      for (let i = 0; i < n; i++) {
        if (phase === "in") {
          rx[i] = sx[i] + (tx[i] - sx[i]) * w;
          ry[i] = sy[i] + (ty[i] - sy[i]) * w;
        } else if (phase === "hold") {
          rx[i] = tx[i];
          ry[i] = ty[i];
          // ambient sim follows the formation so release has no snap
          px[i] = tx[i];
          py[i] = ty[i];
        } else if (phase === "out") {
          rx[i] = sx[i] + (px[i] - sx[i]) * (1 - w);
          ry[i] = sy[i] + (py[i] - sy[i]) * (1 - w);
        } else {
          rx[i] = px[i];
          ry[i] = py[i];
        }
      }

      // network lines — fade in/out over NET_LINE_FADE_MS at hold boundaries
      if (f === "network" && (phase === "hold" || phase === "in" || phase === "out")) {
        let lineAlpha = 0;
        if (phase === "in") {
          const remaining = CONFIG.TWEEN_IN_MS - (now - phaseStart);
          lineAlpha = remaining < CONFIG.NET_LINE_FADE_MS ? 1 - remaining / CONFIG.NET_LINE_FADE_MS : 0;
        } else if (phase === "hold") {
          lineAlpha = Math.min((now - phaseStart) / CONFIG.NET_LINE_FADE_MS + 0.5, 1);
        } else {
          lineAlpha = Math.max(1 - (now - phaseStart) / CONFIG.NET_LINE_FADE_MS, 0);
        }
        if (lineAlpha > 0) {
          drawNetworkLines(ctx!, lineAlpha);
        }
      }

      // points — flat fills, no glow, no gradient
      for (let i = 0; i < n; i++) {
        const a = edgeAlpha(rx[i], ry[i]) * (isEmber[i] ? CONFIG.EMBER_ALPHA : CONFIG.VIOLET_ALPHA);
        if (a <= 0) continue;
        ctx!.globalAlpha = a;
        ctx!.fillStyle = isEmber[i] ? ember : violet;
        ctx!.beginPath();
        ctx!.arc(rx[i], ry[i], radius[i], 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
    }

    function drawNetworkLines(c: CanvasRenderingContext2D, alphaScale: number) {
      const maxLinks = Math.floor(n * CONFIG.NET_PARTICIPATION);
      let links = 0;
      c.strokeStyle = violet;
      c.lineWidth = 1;
      c.globalAlpha = CONFIG.NET_LINE_ALPHA * alphaScale;
      c.beginPath();
      for (let i = 0; i < n && links < maxLinks; i++) {
        for (let j = i + 1; j < n && links < maxLinks; j++) {
          const dx = rx[i] - rx[j];
          const dy = ry[i] - ry[j];
          if (dx * dx + dy * dy < CONFIG.NET_LINK_DIST * CONFIG.NET_LINK_DIST) {
            c.moveTo(rx[i], ry[i]);
            c.lineTo(rx[j], ry[j]);
            links++;
          }
        }
      }
      c.stroke();
      c.globalAlpha = 1;
    }

    /* ---------- static reduced-motion frame ---------- */

    function renderStaticNetwork() {
      resize();
      seed();
      for (let i = 0; i < n; i++) {
        rx[i] = px[i];
        ry[i] = py[i];
      }
      ctx!.clearRect(0, 0, width, height);
      drawNetworkLines(ctx!, 1);
      for (let i = 0; i < n; i++) {
        ctx!.globalAlpha = edgeAlpha(rx[i], ry[i]) * (isEmber[i] ? CONFIG.EMBER_ALPHA : CONFIG.VIOLET_ALPHA);
        ctx!.fillStyle = isEmber[i] ? ember : violet;
        ctx!.beginPath();
        ctx!.arc(rx[i], ry[i], radius[i], 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
    }

    /* ---------- main loop & lifecycle ---------- */

    let lastFrame = 0;
    function loop(now: number) {
      raf = requestAnimationFrame(loop);
      if (phase === "ambient" || phase === "out") stepAmbient();
      if (phase === "ambient" && now >= nextFormationAt) triggerFormation(now);
      render(now);

      // dev-only frame budget check → fallback ladder step: -20% points
      if (process.env.NODE_ENV !== "production" && lastFrame) {
        frameAcc += now - lastFrame;
        frameCount++;
        if (now - budgetLastCheck > CONFIG.BUDGET_WINDOW_MS) {
          const avg = frameAcc / Math.max(frameCount, 1);
          if (avg > CONFIG.FRAME_BUDGET_MS && !budgetApplied) {
            budgetApplied = true;
            console.warn(`[BinduField] avg frame ${avg.toFixed(1)}ms > ${CONFIG.FRAME_BUDGET_MS}ms — reducing points 20%`);
            seed(true);
          }
          frameAcc = 0;
          frameCount = 0;
          budgetLastCheck = now;
        }
      }
      lastFrame = now;
    }

    function start() {
      if (running || !inView || !pageVisible) return;
      running = true;
      lastFrame = 0;
      raf = requestAnimationFrame(loop);
    }

    function stop() {
      if (!running) return;
      running = false;
      cancelAnimationFrame(raf);
    }

    if (reduced) {
      renderStaticNetwork();
      // static frame re-rendered on resize only
      let t: ReturnType<typeof setTimeout>;
      const onResize = () => {
        clearTimeout(t);
        t = setTimeout(renderStaticNetwork, CONFIG.RESIZE_DEBOUNCE_MS);
      };
      window.addEventListener("resize", onResize);
      return () => {
        clearTimeout(t);
        window.removeEventListener("resize", onResize);
      };
    }

    resize();
    seed();
    nextFormationAt = performance.now() + CONFIG.FIRST_FORMATION_MS;

    // cursor gravity reads from the hero wrapper — canvas stays pointer-events:none
    const onPointerMove = (e: PointerEvent) => {
      const rect = host!.getBoundingClientRect();
      cursorX = e.clientX - rect.left;
      cursorY = e.clientY - rect.top;
      cursorIn = true;
    };
    const onPointerLeave = () => {
      cursorIn = false;
    };
    if (!isTouch) {
      host.addEventListener("pointermove", onPointerMove, { passive: true });
      host.addEventListener("pointerleave", onPointerLeave, { passive: true });
    }

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        resize();
        seed(true);
      }, CONFIG.RESIZE_DEBOUNCE_MS);
    };
    window.addEventListener("resize", onResize);

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
        if (inView) start();
        else stop();
      },
      { threshold: 0 }
    );
    io.observe(host);

    const onVisibility = () => {
      pageVisible = document.visibilityState === "visible";
      if (pageVisible) start();
      else stop();
    };
    document.addEventListener("visibilitychange", onVisibility);

    start();

    return () => {
      stop();
      io.disconnect();
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      if (!isTouch) {
        host.removeEventListener("pointermove", onPointerMove);
        host.removeEventListener("pointerleave", onPointerLeave);
      }
    };
  }, [hostRef, onDark]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    />
  );
}
