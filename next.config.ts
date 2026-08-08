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

  ...(process.env.NODE_ENV === "development" ? {
    async redirects() {
      return [
        {
          source: "/",
          destination: "/METC-website",
          permanent: false,
          basePath: false,
        },
      ];
    },
  } : {}),
};

export default nextConfig;
