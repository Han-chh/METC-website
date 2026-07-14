import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "METC — Learning by Making",
  description: "METC public website frontend foundation"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
