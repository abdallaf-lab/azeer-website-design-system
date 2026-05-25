import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex-sans",
});

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-plex-arabic",
});

const SITE_URL = "https://azeer.ai";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "WhatsApp CSAT Surveys, Automated | Azeer",
    template: "%s | Azeer",
  },
  description:
    "Auto-send CSAT surveys after every WhatsApp chat. Live dashboard, agent leaderboard, daily recovery list. Arabic + English.",
  keywords: [
    "whatsapp csat survey",
    "customer satisfaction whatsapp",
    "csat for ecommerce",
    "customer feedback automation",
    "post-chat survey",
    "measure agent performance whatsapp",
  ],
  alternates: {
    canonical: "/features/csat",
    languages: {
      en: "/features/csat",
      ar: "/ar/features/csat",
      "x-default": "/features/csat",
    },
  },
  openGraph: {
    type: "website",
    siteName: "Azeer",
    title: "WhatsApp CSAT Surveys, Automated | Azeer",
    description:
      "Auto-send CSAT surveys after every WhatsApp chat. Live dashboard, agent leaderboard, daily recovery list. Arabic + English.",
    url: "/features/csat",
    images: [{ url: "/og/csat.png", width: 1200, height: 630, alt: "Azeer CSAT dashboard preview" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "WhatsApp CSAT Surveys, Automated | Azeer",
    description:
      "Auto-send CSAT surveys after every WhatsApp chat. Live dashboard, agent leaderboard, daily recovery list.",
    images: ["/og/csat.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#7C64FE",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexArabic.variable}`}>
      <body>{children}</body>
    </html>
  );
}
