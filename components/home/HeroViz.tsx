/**
 * HeroViz — the hero's background constellation.
 *
 * Fusemachines runs a node-and-edge field behind its hero; C3.ai and Scale
 * run dark atmospheric panels. A network reads as "AI" instantly and costs
 * nothing, so this is that.
 *
 * The graph is GENERATED, not hand-listed, from a fixed-seed PRNG: a
 * hand-written list was too sparse and rendered as a few long diagonals
 * across the screen instead of a network. Sixty-odd nodes connected only to
 * near neighbours give a field that reads as a mesh at any width. The seed
 * makes it deterministic, so server and client markup match exactly.
 *
 * Wide viewBox (160×90) so the field keeps its density on a desktop hero
 * rather than being scaled up until the lines look like beams.
 *
 * Inline SVG + CSS animation. No library, no canvas, no client JS. Carries
 * no data — it is atmosphere, and makes no claim.
 */

const W = 160;
const H = 90;
const COUNT = 64;
const LINK_RADIUS = 22; // only join nearby nodes, or it becomes a solid web
const MAX_LINKS_PER_NODE = 3;

// mulberry32 — small deterministic PRNG so the layout never shifts.
function rng(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type Node = { x: number; y: number; r: number; hot: boolean };

const { NODES, EDGES } = (() => {
  const rand = rng(20260813);
  const nodes: Node[] = [];

  for (let i = 0; i < COUNT; i++) {
    nodes.push({
      x: rand() * W,
      y: rand() * H,
      r: 0.28 + rand() * 0.42,
      hot: rand() < 0.16, // roughly one in six picks up the ember accent
    });
  }

  const edges: Array<[number, number]> = [];
  const degree = new Array(COUNT).fill(0);

  for (let i = 0; i < COUNT; i++) {
    // nearest neighbours first, so links stay short and local
    const near = nodes
      .map((n, j) => ({ j, d: Math.hypot(n.x - nodes[i].x, n.y - nodes[i].y) }))
      .filter((c) => c.j !== i && c.d < LINK_RADIUS)
      .sort((a, b) => a.d - b.d);

    for (const { j } of near) {
      if (degree[i] >= MAX_LINKS_PER_NODE) break;
      if (degree[j] >= MAX_LINKS_PER_NODE) continue;
      if (edges.some(([a, b]) => (a === i && b === j) || (a === j && b === i))) continue;
      edges.push([i, j]);
      degree[i]++;
      degree[j]++;
    }
  }

  return { NODES: nodes, EDGES: edges };
})();

export function HeroViz() {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      className="hero-net h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <g stroke="#FFFFFF" strokeWidth="0.09" opacity="0.16">
        {EDGES.map(([a, b], i) => (
          <line
            key={i}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            style={{ animationDelay: `${(i % 24) * 55}ms` }}
          />
        ))}
      </g>
      <g>
        {NODES.map((n, i) => (
          <circle
            key={i}
            cx={n.x}
            cy={n.y}
            r={n.r}
            fill={n.hot ? "var(--ember)" : "#FFFFFF"}
            style={{
              // consumed by the net-in keyframe in globals.css
              ["--net-o" as string]: n.hot ? 0.9 : 0.45,
              animationDelay: `${(i % 20) * 70}ms`,
            }}
          />
        ))}
      </g>
    </svg>
  );
}
