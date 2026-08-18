import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The site is authored against the Cloudflare Workers runtime. When it is
  // built for a Node host (Vercel), point the platform-only module at a shim
  // that reports every binding as unavailable. Data access already falls back
  // to the bundled studio content when that happens.
  turbopack: {
    resolveAlias: {
      "cloudflare:workers": "./lib/cf-workers-shim.ts",
    },
  },
};

export default nextConfig;
