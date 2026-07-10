/**
 * One-off: light-on-dark logo variant for the dark hero nav. Violet/navy
 * pixels → bone; the ember AI and white bindu details stay as they are.
 */
import fs from "node:fs";
import { PNG } from "pngjs";

const png = PNG.sync.read(fs.readFileSync("public/logo-nav.png"));
const d = png.data;
for (let i = 0; i < d.length; i += 4) {
  if (d[i + 3] === 0) continue;
  // deep violet/navy: low red+green, any blue → bone (#FAF7F1)
  if (d[i] < 120 && d[i + 1] < 100) {
    d[i] = 250; d[i + 1] = 247; d[i + 2] = 241;
  }
}
fs.writeFileSync("public/logo-nav-dark.png", PNG.sync.write(png));
console.log("public/logo-nav-dark.png written");
