/** One-off: square favicon from the सं portion of the transparent lockup. */
import fs from "node:fs";
import { PNG } from "pngjs";

const src = PNG.sync.read(fs.readFileSync("public/logo-nav.png"));
const { width: W, height: H, data } = src;
const idx = (x, y) => (W * y + x) << 2;

// find the gap column between सं and AI: widest run of empty columns
let best = { start: -1, len: 0 }, run = { start: -1, len: 0 };
for (let x = 0; x < W; x++) {
  let any = false;
  for (let y = 0; y < H && !any; y++) if (data[idx(x, y) + 3] > 8) any = true;
  if (!any) {
    if (run.start < 0) run = { start: x, len: 0 };
    run.len++;
    if (run.len > best.len) best = { ...run };
  } else run = { start: -1, len: 0 };
}
const cut = best.start; // सं ends here
console.log(`gap columns ${best.start}..${best.start + best.len - 1}`);

// crop सं, then pad to square with transparent margin
const cw = cut, ch = H;
const size = Math.max(cw, ch) + 16;
const out = new PNG({ width: size, height: size });
const ox = Math.floor((size - cw) / 2), oy = Math.floor((size - ch) / 2);
for (let y = 0; y < ch; y++)
  for (let x = 0; x < cw; x++) {
    const s = idx(x, y), d = (size * (y + oy) + (x + ox)) << 2;
    out.data[d] = data[s]; out.data[d + 1] = data[s + 1];
    out.data[d + 2] = data[s + 2]; out.data[d + 3] = data[s + 3];
  }
fs.writeFileSync("app/icon.png", PNG.sync.write(out));
console.log(`app/icon.png: ${size}x${size}`);
