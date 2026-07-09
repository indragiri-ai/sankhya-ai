import type { NextConfig } from "next";

/**
 * Security headers (Phase 10 §C.5). CSP allows exactly what the site uses:
 * self-hosted assets, inline styles (Next/Tailwind), the Plausible script +
 * its event endpoint, and Next's inline runtime scripts. No other origins.
 */
const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://plausible.io",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data:",
      "font-src 'self'",
      "connect-src 'self' https://plausible.io",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "DENY" },
];

/**
 * STATIC_EXPORT=1 (scripts/build-static.mjs) builds a fully static site for
 * GitHub Pages at https://indragiri-ai.github.io/sankhya-ai/ — no server, so
 * the contact API and OG image route are excluded by the script and
 * `headers()` (unsupported on export) is skipped; GitHub Pages cannot send
 * custom headers anyway. The default build (Vercel/self-hosted) is unchanged.
 */
const isStaticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = isStaticExport
  ? {
      output: "export",
      basePath: "/sankhya-ai",
      trailingSlash: true,
    }
  : {
      async headers() {
        return [{ source: "/(.*)", headers: securityHeaders }];
      },
    };

export default nextConfig;
