import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import { Space_Grotesk, Tiro_Devanagari_Hindi } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/site/LenisProvider";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SITE_NAME, SITE_URL, CONTACT } from "@/lib/constants";
import { SERVICES } from "@/lib/services";

/**
 * Fonts. Four roles, no overlap:
 *   Space Grotesk — display. Every headline, 600–700 weight.
 *   Geist Sans    — interface and body copy, 15–17px.
 *   Geist Mono    — every numeral, eyebrow, and label. Tabular.
 *   Tiro Deva     — संख्या and any Nepali.
 *
 * Geist is self-hosted from ./fonts. The two Google faces are downloaded and
 * self-hosted by next/font at build time, so the static export ships with no
 * third-party font requests — which also keeps the CSP in next.config.ts
 * honest (it allows no external origins). display: "swap" throughout.
 */
const geistSans = localFont({
  src: "./fonts/GeistVF.woff2",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff2",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

// Space Grotesk replaced Newsreader on 2026-08-13. The editorial serif gave
// the site a magazine voice; the brief is a premium AI and data company, and
// that register is a heavy technical grotesque. Space Grotesk keeps real
// character in its digits and its 'g' — enough to avoid looking like every
// Inter/Poppins site — while carrying 700 weight cleanly at display size.
const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
  display: "swap",
});

const tiroDevanagari = Tiro_Devanagari_Hindi({
  subsets: ["devanagari", "latin"],
  variable: "--font-tiro-deva",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Decisions, made measurable`,
    template: `%s — ${SITE_NAME}`,
  },
  // [PLACEHOLDER — verify description copy before launch]
  description:
    "Sankhya AI designs and builds data systems, analytics, and applied AI for organizations in Nepal.",
  // PREVIEW PERIOD (2026-07-10): site is live for team review with [SAMPLE]
  // content — keep search engines out until real facts land. REMOVE at launch.
  robots: { index: false, follow: false },
  openGraph: {
    siteName: SITE_NAME,
    type: "website",
    locale: "en_US",
  },
};

/** Organization + Service structured data (Phase 9 §C.6) — true fields only.
 *  `sameAs` stays empty until real social profiles are confirmed. */
function jsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_URL,
        email: CONTACT.email,
        address: { "@type": "PostalAddress", addressLocality: "Kathmandu", addressCountry: "NP" },
      },
      ...SERVICES.map((s) => ({
        "@type": "Service",
        name: s.title,
        description: s.oneLiner,
        provider: { "@type": "Organization", name: SITE_NAME },
        url: `${SITE_URL}/services#${s.slug}`,
      })),
    ],
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    /* The four font variables live on <html>, not <body>: the type scale in
       globals.css resolves them through @theme tokens (--font-serif →
       --font-display) declared at :root. With the variables only on <body>,
       those tokens resolve against an undefined value at :root and every
       headline silently falls back to a system face. */
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${displayFont.variable} ${tiroDevanagari.variable}`}
    >
      <body className="antialiased">
        <a href="#content" className="skip-link">
          Skip to content
        </a>
        <LenisProvider>
          <Nav />
          <main id="content">{children}</main>
          <Footer />
        </LenisProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd()) }}
        />
        {plausibleDomain ? (
          <Script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}
