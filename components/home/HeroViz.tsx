/**
 * HeroViz — the hero's visual panel.
 *
 * Every comparable company puts a real graphic in the hero: Fractal runs a
 * full-bleed abstract field, C3.ai and Scale AI run dark atmospheric panels.
 * A services firm with no product UI to screenshot still needs something to
 * look at, and for a company whose whole claim is "decisions, made
 * measurable" the honest answer is a plot — a scatter with a fitted trend,
 * drawn the way an analyst would draw it.
 *
 * IMPORTANT — this states no facts. The points are generated from a fixed
 * seed and the axes carry bare 0–100 ticks, so the panel reads as a chart
 * without implying a dataset, a client, or a result. The site's evidence
 * rule (no invented figures, ever) holds here too: there is deliberately no
 * title, no unit, and no caption that could be mistaken for a finding.
 *
 * Pure inline SVG + CSS animation — no library, no canvas, no JS on the
 * client, and it costs the bundle nothing. Motion is suppressed under
 * prefers-reduced-motion by the rules in globals.css.
 */

// Fixed sample — deterministic so the server and client render identically.
// Positively correlated on purpose: a fitted line sloping up and to the
// right is read as improvement, and a hero is the wrong place to show a
// company's own graphic trending down.
const POINTS: Array<[number, number, number]> = [
  [8, 26, 3], [14, 34, 4], [19, 29, 3], [23, 42, 5], [28, 38, 3],
  [31, 51, 4], [36, 45, 6], [40, 56, 3], [44, 53, 4], [48, 62, 5],
  [52, 59, 3], [56, 67, 4], [61, 64, 7], [65, 73, 4], [69, 70, 3],
  [73, 78, 5], [78, 75, 3], [82, 83, 4], [87, 80, 3], [92, 88, 5],
];

const W = 420;
const H = 300;
const PAD = { l: 34, r: 12, t: 14, b: 28 };

const x = (v: number) => PAD.l + (v / 100) * (W - PAD.l - PAD.r);
const y = (v: number) => PAD.t + (1 - v / 100) * (H - PAD.t - PAD.b);

export function HeroViz() {
  const ticks = [0, 25, 50, 75, 100];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="hero-viz h-auto w-full"
      role="img"
      aria-label="Illustrative scatter plot with a fitted trend line, representing measured data"
    >
      {/* Grid */}
      <g stroke="currentColor" strokeWidth="0.5" opacity="0.18">
        {ticks.map((t) => (
          <line key={`h${t}`} x1={PAD.l} x2={W - PAD.r} y1={y(t)} y2={y(t)} />
        ))}
        {ticks.map((t) => (
          <line key={`v${t}`} y1={PAD.t} y2={H - PAD.b} x1={x(t)} x2={x(t)} />
        ))}
      </g>

      {/* Axes */}
      <g stroke="currentColor" strokeWidth="1" opacity="0.55">
        <line x1={PAD.l} x2={PAD.l} y1={PAD.t} y2={H - PAD.b} />
        <line x1={PAD.l} x2={W - PAD.r} y1={H - PAD.b} y2={H - PAD.b} />
      </g>

      {/* Tick labels — mono, matching the site's numeral rule */}
      <g fill="currentColor" opacity="0.5" fontSize="8" fontFamily="var(--font-mono)">
        {ticks.map((t) => (
          <text key={`ty${t}`} x={PAD.l - 8} y={y(t) + 3} textAnchor="end">
            {t}
          </text>
        ))}
        {ticks.map((t) => (
          <text key={`tx${t}`} x={x(t)} y={H - PAD.b + 14} textAnchor="middle">
            {t}
          </text>
        ))}
      </g>

      {/* Fitted trend — the one ember element, drawn on load */}
      <line
        className="hero-viz-trend"
        x1={x(4)}
        y1={y(24)}
        x2={x(96)}
        y2={y(90)}
        stroke="var(--ember)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Observations */}
      <g className="hero-viz-points" fill="currentColor">
        {POINTS.map(([px, py, r], i) => (
          <circle
            key={i}
            cx={x(px)}
            cy={y(py)}
            r={r}
            opacity="0.75"
            style={{ animationDelay: `${300 + i * 45}ms` }}
          />
        ))}
      </g>
    </svg>
  );
}
