import { MetadataRoute } from "next";
import { getOrThrowEnv } from "@Components/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/*", "/_next/static/chunks/*$", "/_next/static/css/*$"],
      },
    ],
    sitemap: `${getOrThrowEnv("NEXT_PUBLIC_BASE_URL")}/sitemap.xml`,
  };
}
