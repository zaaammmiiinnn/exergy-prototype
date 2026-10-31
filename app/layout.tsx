import type { Metadata, Viewport } from "next";
import { Sora, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site/site-chrome";
import { IntroAnimation } from "@/components/IntroAnimation";
import { JsonLd } from "@/components/seo/json-ld";
import { getOrganizationSchema, getWebSiteSchema, SITE_URL } from "@/lib/seo/schema";

const sora = Sora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#061821",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Exergy Solutions | Turn Wasted Energy and Water into Profit",
    template: "%s | Exergy Solutions",
  },
  description:
    "We apply thermodynamics and exergy analysis to slash the capex and opex of energy- and water-intensive operations — delivered as guaranteed, turnkey implementation.",
  applicationName: "Exergy Solutions",
  authors: [{ name: "Exergy Solutions FZE", url: SITE_URL }],
  creator: "Exergy Solutions",
  publisher: "Exergy Solutions",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Exergy Solutions | Turn Wasted Energy and Water into Profit",
    description:
      "We apply thermodynamics and exergy analysis to slash the capex and opex of energy- and water-intensive operations — delivered as guaranteed, turnkey implementation.",
    url: SITE_URL,
    siteName: "Exergy Solutions",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Exergy Solutions - Industrial Energy & Water Thermodynamic Optimization",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Exergy Solutions | Turn Wasted Energy and Water into Profit",
    description:
      "We apply thermodynamics and exergy analysis to slash the capex and opex of energy- and water-intensive operations — delivered as guaranteed, turnkey implementation.",
    site: "@exergysolutions",
    creator: "@exergysolutions",
    images: [`${SITE_URL}/og-image.png`],
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
    google: "wSxLQ0M8nYmHOTLuTkjc1s6yqHb15xDMzwdseox4wp0",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const globalSchemas = [getOrganizationSchema(), getWebSiteSchema()];

  return (
    <html
      lang="en"
      className={`scroll-smooth ${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <meta
          name="google-site-verification"
          content="wSxLQ0M8nYmHOTLuTkjc1s6yqHb15xDMzwdseox4wp0"
        />
        <JsonLd data={globalSchemas} />
      </head>
      <body className="min-h-screen bg-[hsl(190,30%,98%)] text-[hsl(200,40%,12%)] flex flex-col font-sans antialiased selection:bg-teal-100 selection:text-teal-900">
        <IntroAnimation />
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
