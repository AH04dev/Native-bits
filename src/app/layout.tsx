import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";


const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Native Bits - UI Components for Mobile Devices",
  description: "An open source collection of high quality, animated, interactive & fully customizable components for React Native & Flutter.",
  keywords: ["react native", "flutter", "ui components", "mobile ui", "animations", "ui library"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ background: '#060010' }}>
      <body className={inter.className} style={{ background: '#060010', color: '#ffffff', minHeight: '100vh', position: 'relative' }}>

        <div style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
