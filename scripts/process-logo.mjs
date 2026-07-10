/**
 * One-off logo processing: white background → transparent (edge flood-fill
 * only, so white counters inside glyphs survive), then tight crops:
 *  - full lockup with tagline  → public/logo-lockup.png
 *  - lockup without tagline    → public/logo-nav.png (nav-height friendly)
 *  - square सं-mark crop        → app/icon.png source (favicon)
 */
import fs from "node:fs";
import { PNG } from "pngjs";

const [, , input] = process.argv;
const png = PNG.sync.read(fs.readFileSync(input));
const { width: W, height: H, data } = png;

const idx = (x, y) => (W * y + x) << 2;
const isWhite = (x, y) => {
  const i = idx(x, y);
  return data[i] > 245 && data[i + 1] > 245 && data[i + 2] > 245;
};

// flood fill from all edges
const seen = new Uint8Array(W * H);
const queue = [];
for (let x = 0; x < W; x++) queue.push([x, 0], [x, H - 1]);
for (let y = 0; y < H; y++) queue.push([0, y], [W - 1, y]);
while (queue.length) {
  const [x, y] = queue.pop();
  if (x < 0 || y < 0 || x >= W || y >= H) continue;
  const s = W * y + x;
  if (seen[s] || !isWhite(x, y)) continue;
  seen[s] = 1;
  data[idx(x, y) + 3] = 0;
  queue.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
}

// bounding box of visible pixels
let minX = W, minY = H, maxX = 0, maxY = 0;
for (let y = 0; y < H; y++)
  for (let x = 0; x < W; x++)
    if (data[idx(x, y) + 3] > 8) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
console.log(`content bbox: x ${minX}-${maxX}, y ${minY}-${maxY}`);

function crop(x0, y0, x1, y1, pad, out) {
  x0 = Math.max(0, x0 - pad); y0 = Math.max(0, y0 - pad);
  x1 = Math.min(W - 1, x1 + pad); y1 = Math.min(H - 1, y1 + pad);
  const cw = x1 - x0 + 1, ch = y1 - y0 + 1;
  const c = new PNG({ width: cw, height: ch });
  for (let y = 0; y < ch; y++)
    data.copy(c.data, (cw * y) << 2, idx(x0, y0 + y), idx(x0, y0 + y) + (cw << 2));
  fs.writeFileSync(out, PNG.sync.write(c));
  console.log(`${out}: ${cw}x${ch}`);
}

// row profile to find the tagline gap (largest horizontal empty band inside bbox)
const rows = [];
for (let y = minY; y <= maxY; y++) {
  let any = false;
  for (let x = minX; x <= maxX && !any; x++) if (data[idx(x, y) + 3] > 8) any = true;
  rows.push(any ? 1 : 0);
}
let gapStart = -1, gapLen = 0, bestStart = -1, bestLen = 0;
rows.forEach((v, i) => {
  if (v === 0) { if (gapStart < 0) gapStart = i; gapLen++; if (gapLen > bestLen) { bestLen = gapLen; bestStart = gapStart; } }
  else { gapStart = -1; gapLen = 0; }
});
console.log(`largest gap: rows ${minY + bestStart}..${minY + bestStart + bestLen - 1}`);

crop(minX, minY, maxX, maxY, 8, "public/logo-lockup.png");
if (bestLen > 10) {
  crop(minX, minY, maxX, minY + bestStart - 1, 8, "public/logo-nav.png");
} else {
  crop(minX, minY, maxX, maxY, 8, "public/logo-nav.png");
}
