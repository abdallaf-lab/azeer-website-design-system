import type { MetadataRoute } from "next";
import { locales } from "@/i18n/config";

const BASE = "https://azeer.io";

const ROUTES = ["", "/pricing", "/blog"];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.flatMap((route) =>
    locales.map((locale) => ({
      url: `${BASE}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1.0 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${BASE}/${l}${route}`]),
        ),
      },
    })),
  );
}
