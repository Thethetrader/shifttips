import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Playfair_Display } from "next/font/google";
import "./globals.css";
import ServiceWorkerRegistrar from "@/components/app/ServiceWorkerRegistrar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const BASE_URL = "https://shifttips-565.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "ShiftTips — Suivi heures & pourboires pour serveurs",
    template: "%s | ShiftTips",
  },
  description:
    "ShiftTips, l'app gratuite pour les serveurs et serveuses : suis tes heures, tes pourboires et tes heures supplémentaires en 3 taps. Récapitulatif mensuel automatique. Installable sur iPhone et Android.",
  keywords: [
    "pourboires serveur",
    "suivi heures travail restauration",
    "app serveur restaurant",
    "calcul heures supplémentaires",
    "pourboires mensuel",
    "shifttips",
    "app restaurant gratuite",
  ],
  authors: [{ name: "ShiftTips" }],
  creator: "ShiftTips",
  publisher: "ShiftTips",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "SFTPS",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: BASE_URL,
    siteName: "ShiftTips",
    title: "ShiftTips — Suivi heures & pourboires pour serveurs",
    description:
      "L'app gratuite pour les serveurs : suis tes heures, tes pourboires et tes heures sup en 3 taps. Récap mensuel automatique.",
    images: [
      {
        url: "/logo-og.jpg",
        width: 1200,
        height: 630,
        alt: "ShiftTips — Suivi heures et pourboires",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ShiftTips — Suivi heures & pourboires pour serveurs",
    description:
      "L'app gratuite pour les serveurs : suis tes heures, tes pourboires et tes heures sup en 3 taps.",
    images: ["/logo-og.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
    shortcut: "/favicon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#0F5132",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable}`}
    >
      <head>
        <link rel="canonical" href={BASE_URL} />
        <meta name="application-name" content="ShiftTips" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="font-sans antialiased bg-cream text-ink">
        <ServiceWorkerRegistrar />
        {children}
      </body>
    </html>
  );
}
