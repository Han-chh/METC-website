import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "METC — Math and Engineering Teaching Club",
  description: "A student-created, student-centered math and engineering teaching club."
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
