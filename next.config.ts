import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel 静态部署
  output: "export",

  // 允许本地开发来源
  allowedDevOrigins: ["127.0.0.1"],

  // Turbopack 配置
  turbopack: {
    root: process.cwd(),
  },

  // Vercel 静态部署关闭图片优化
  // 因为 export 模式不支持 Next Image Server Optimization
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
