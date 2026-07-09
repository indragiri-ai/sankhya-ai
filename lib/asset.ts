/**
 * Prefixes a /public asset path with the deploy base path. Next.js only
 * auto-prefixes next/link and next/image — raw <img>/<a> paths need this
 * when the site is served from a subdirectory (GitHub Pages project site).
 * NEXT_PUBLIC_BASE_PATH is set by scripts/build-static.mjs; empty otherwise.
 */
export function asset(path: string): string {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;
}
