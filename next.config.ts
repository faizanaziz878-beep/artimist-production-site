import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "cloudflare:workers": "./lib/cf-workers-shim.ts",
    },
  },
  async rewrites() {
    return {
      beforeFiles: [
        // Retire the old Parametric Pavilion presentation board everywhere.
        // Any stale component/reference now resolves to the cleaner technical sequence instead.
        { source: "/media/technical/board-01.webp", destination: "/media/walkthrough/canopy/technical-sequence.webp" },
        // The production homepage intentionally keeps the original spatial
        // experience because this template owns the live WebGL/GLB model.
        { source: "/", destination: "/seo-home" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      // Collapse every production HTTP/non-www variant into one HTTPS canonical.
      // The protocol condition is important: Search Console found the HTTP www
      // homepage returning 200 and being indexed independently.
      {
        source: "/:path*",
        has: [{ type: "header", key: "x-forwarded-proto", value: "http" }],
        destination: "https://www.artimistproductions.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "artimistproductions.com" }],
        destination: "https://www.artimistproductions.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "artimist-production-site.vercel.app" }],
        destination: "https://www.artimistproductions.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "artimist-production-site-artimistproductions.vercel.app" }],
        destination: "https://www.artimistproductions.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "artimist-production-site-git-main-artimistproductions.vercel.app" }],
        destination: "https://www.artimistproductions.com/:path*",
        permanent: true,
      },
      { source: "/studio.html", destination: "/", permanent: true },
      { source: "/architecture.html", destination: "/architecture", permanent: true },
      { source: "/bimdrafting.html", destination: "/bim-drafting", permanent: true },
      { source: "/visualization.html", destination: "/visualization", permanent: true },
      { source: "/architectural-visualization-services", destination: "/visualization", permanent: true },
      { source: "/services.html", destination: "/services", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/partners.html", destination: "/partners", permanent: true },
      { source: "/foundermessage.html", destination: "/founder-message", permanent: true },
      { source: "/skills.html", destination: "/services", permanent: true },
      { source: "/services/architecture", destination: "/architecture", permanent: true },
      { source: "/services/bim-drafting", destination: "/bim-drafting", permanent: true },
      { source: "/services/visualization", destination: "/visualization", permanent: true },
    ];
  },
};

export default nextConfig;
