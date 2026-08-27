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
        { source: "/", destination: "/studio.html" },
        { source: "/architecture", destination: "/architecture.html" },
        { source: "/bim-drafting", destination: "/bimdrafting.html" },
        { source: "/visualization", destination: "/visualization.html" },
        { source: "/services", destination: "/services.html" },
        { source: "/about", destination: "/about.html" },
        { source: "/partners", destination: "/partners.html" },
        { source: "/founder-message", destination: "/foundermessage.html" },
        { source: "/skills", destination: "/skills.html" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "artimistproductions.com" }],
        destination: "https://www.artimistproductions.com/:path*",
        permanent: true,
      },
      { source: "/services/architecture", destination: "/architecture", permanent: true },
      { source: "/services/bim-drafting", destination: "/bim-drafting", permanent: true },
      { source: "/services/visualization", destination: "/visualization", permanent: true },
    ];
  },
};

export default nextConfig;
