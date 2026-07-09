import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
import { LenisProvider } from "@/components/site/LenisProvider";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SITE_NAME, SITE_URL, CONTACT } from "@/lib/constants";
import { SERVICES } from "@/lib/services";

/**
 * Fonts: Geist Sans + Geist Mono, variable, self-hosted (Build Book §1/§6).
 * display: "swap" + adjustFontFallback keeps swap CLS at zero.
 * Mukta (Devanagari) is added here only if Nepali is approved; until then
 * Devanagari renders via the documented system fallback stack (globals.css).
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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Decisions, made measurable`,
    template: `%s — ${SITE_NAME}`,
  },
  // [PLACEHOLDER — verify description copy before launch]
  description:
    "Sankhya AI designs and builds data systems, analytics, and applied AI for organizations in Nepal.",
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
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
