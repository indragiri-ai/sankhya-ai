/**
 * Static-export build for GitHub Pages (https://indragiri-ai.github.io/sankhya-ai/).
 *
 * `output: "export"` cannot build server-only routes, so this script
 * temporarily sets aside:
 *   - app/api            (contact POST handler — the static site shows a
 *                         direct-email card instead, see ContactForm.tsx)
 *   - app/opengraph-image.tsx (edge-runtime OG image)
 * runs `next build` with the static env, then restores them (also on failure).
 * Output lands in out/ with a .nojekyll marker for GitHub Pages.
 */
import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const aside = path.join(root, ".static-excluded");

const EXCLUDED = [
  ["app/api", "api"],
  ["app/opengraph-image.tsx", "opengraph-image.tsx"],
];

const moved = [];
fs.mkdirSync(aside, { recursive: true });

// Self-heal: if a previous run crashed before restoring, put its files back
// before doing anything else.
for (const [rel, name] of EXCLUDED) {
  const leftover = path.join(aside, name);
  const home = path.join(root, rel);
  if (fs.existsSync(leftover) && !fs.existsSync(home)) {
    fs.renameSync(leftover, home);
    console.warn(`Restored leftover from previous run: ${rel}`);
  }
}

try {
  for (const [rel, name] of EXCLUDED) {
    const from = path.join(root, rel);
    const to = path.join(aside, name);
    if (fs.existsSync(from)) {
      fs.renameSync(from, to);
      moved.push([to, from]);
    }
  }

  execSync("npx next build", {
    cwd: root,
    stdio: "inherit",
    env: {
      ...process.env,
      STATIC_EXPORT: "1",
      NEXT_PUBLIC_STATIC_EXPORT: "1",
      NEXT_PUBLIC_BASE_PATH: "/sankhya-ai",
      NEXT_PUBLIC_SITE_URL: "https://indragiri-ai.github.io/sankhya-ai",
    },
  });

  // GitHub Pages runs Jekyll by default, which drops _next/ — disable it.
  fs.writeFileSync(path.join(root, "out", ".nojekyll"), "");
  console.log("\nStatic site written to out/");
} finally {
  // Restore every moved file; retry (Windows can hold transient locks) and
  // never let one failure skip the rest. Loud failure > silent loss.
  const failed = [];
  for (const [to, from] of moved) {
    let restored = false;
    for (let attempt = 0; attempt < 5 && !restored; attempt++) {
      try {
        fs.renameSync(to, from);
        restored = true;
      } catch {
        // brief blocking backoff
        const until = Date.now() + 200 * (attempt + 1);
        while (Date.now() < until) {
          /* wait */
        }
      }
    }
    if (!restored) failed.push(from);
  }
  if (failed.length === 0) {
    fs.rmSync(aside, { recursive: true, force: true });
  } else {
    console.error(
      `FAILED TO RESTORE (files remain in ${aside} — move them back by hand):\n` +
        failed.map((f) => `  ${f}`).join("\n")
    );
    process.exitCode = 1;
  }
}
