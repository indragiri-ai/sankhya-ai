import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

// Required for output: "export" (GitHub Pages build); no-op otherwise.
export const dynamic = "force-static";

/** Exactly the live pages — /styleguide is deliberately excluded. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/services", "/approach", "/about", "/careers", "/contact", "/legal/privacy"];
  return pages.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
