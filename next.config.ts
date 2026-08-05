import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  images: {
    unoptimized: true,
  },

  basePath: "/METC-website",
  assetPrefix: "/METC-website/",
};

export default nextConfig;