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
};

export default nextConfig;
