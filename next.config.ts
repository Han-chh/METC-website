import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  allowedDevOrigins: ["127.0.0.1"],

  turbopack: {
    root: process.cwd(),
  },

  images: {
    unoptimized: true,
  },

  basePath: "/METC-website",
};

export default nextConfig;
