import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "cloudflare:workers": "./lib/cf-workers-shim.ts",
    },
  },
  async rewrites() {
    return {
      beforeFiles: [{ source: "/", destination: "/studio.html" }],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      { source: "/services/architecture", destination: "/architecture", permanent: true },
      { source: "/services/bim-drafting", destination: "/bim-drafting", permanent: true },
      { source: "/services/visualization", destination: "/visualization", permanent: true },
      ];
  },
};

export default nextConfig;
