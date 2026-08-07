import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "METC — Math and Engineering Teaching Club",
  description: "A student-created, student-centered math and engineering teaching club.",
  icons: {
    icon: "/METC-website/images/metc-graduation-logo.jpg"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
