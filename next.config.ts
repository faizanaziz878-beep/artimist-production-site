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
      { source: "/services.html", destination: "/services", permanent: true },
      { source: "/about.html", destination: "/about", permanent: true },
      { source: "/partners.html", destination: "/partners", permanent: true },
      { source: "/foundermessage.html", destination: "/founder-message", permanent: true },
      { source: "/skills.html", destination: "/skills", permanent: true },
      { source: "/services/architecture", destination: "/architecture", permanent: true },
      { source: "/services/bim-drafting", destination: "/bim-drafting", permanent: true },
      { source: "/services/visualization", destination: "/visualization", permanent: true },
    ];
  },
};

export default nextConfig;
