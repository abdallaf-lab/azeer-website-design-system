import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/**
 * @azeer/ui, @azeer/website-ui and @azeer/tokens ship as raw TS source (no
 * build step). Next must transpile them through its compiler — without
 * `transpilePackages` it would try to consume un-compiled TSX from the
 * workspace symlinks and fail.
 */
const nextConfig: NextConfig = {
  transpilePackages: ["@azeer/ui", "@azeer/website-ui", "@azeer/tokens"],
  // Linting runs through the workspace `lint` script (Turbo) with the shared
  // flat config — not Next's bundled eslint-config-next. Don't double-run it
  // during `next build`.
  eslint: { ignoreDuringBuilds: true },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
