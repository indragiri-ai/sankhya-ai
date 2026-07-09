import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

// Required for output: "export" (GitHub Pages build); no-op otherwise.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/styleguide", "/api/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
