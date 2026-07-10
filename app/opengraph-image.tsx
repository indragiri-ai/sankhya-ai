import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/constants";

/**
 * OG image (reconstructed 2026-07-09; per Build Book §6: "generated —
 * violet + wordmark", provisional until the logo SVG arrives). Typographic
 * lockup on flat brand violet; ember bindu as the one accent. Tokens are
 * duplicated as literals — no CSS vars in ImageResponse.
 */

export const runtime = "edge";
export const alt = "Sankhya AI — data & AI systems, built in Nepal";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#34006F", // --violet, flat per token law
          color: "#FAF7F1", // --bone
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            borderRadius: "50%",
            background: "#FE5000", // --ember bindu
          }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 96, fontWeight: 600, letterSpacing: -2 }}>
            {SITE_NAME}
          </div>
          <div style={{ fontSize: 32, opacity: 0.75, marginTop: 16 }}>
            Data &amp; AI systems, built in Nepal
          </div>
        </div>
      </div>
    ),
    size
  );
}
