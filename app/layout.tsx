import type { Metadata } from "next";
import "./globals.css";
import { HeroUIProvider } from "@heroui/react";
import Navbar from "@/component/Navbar";

export const metadata: Metadata = {
  title: "MYCO Medical Product Wheel",
  description:
    "Interactive product wheel for MYCO Medical products - Your trusted supplier for medical devices & disposables",
  keywords:
    "medical devices, medical supplies, syringes, scalpels, surgical instruments, MYCO Medical",
  authors: [{ name: "MYCO Medical" }],
  creator: "MYCO Medical",
  publisher: "MYCO Medical",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://myco-medical.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MYCO Medical Product Wheel",
    description: "Interactive product wheel for MYCO Medical products",
    url: "https://myco-medical.vercel.app",
    siteName: "MYCO Medical",
    images: [
      {
        url: "/icon-512x512.png",
        width: 512,
        height: 512,
        alt: "MYCO Medical Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MYCO Medical Product Wheel",
    description: "Interactive product wheel for MYCO Medical products",
    images: ["/icon-512x512.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="MYCO Medical" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icon-16x16.png"
        />
      </head>
      <body className="bg-white">
        <HeroUIProvider>
          <Navbar />
          {children}
        </HeroUIProvider>
      </body>
    </html>
  );
}
