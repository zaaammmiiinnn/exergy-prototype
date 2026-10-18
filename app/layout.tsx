import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { ChatWidget } from "@/components/chat/chat-widget";
import { IntroAnimation } from "@/components/IntroAnimation";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Exergy Solutions | Turn Wasted Energy and Water into Profit",
  description:
    "We apply thermodynamics and exergy analysis to slash the capex and opex of energy- and water-intensive operations — delivered as guaranteed, turnkey implementation.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  icons: {
    icon: "https://horizons-cdn.hostinger.com/7ad3b21d-4954-4ffa-80db-3f8b05d3a164/19a079c855d5710fe1ed0f1611a8efd2.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`scroll-smooth ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-[#0A1628] text-[#F1F5F9] flex flex-col font-sans antialiased selection:bg-[#2C7FB8]/20 selection:text-[#2C7FB8]">
        <IntroAnimation />
        <Navbar />
        <main className="flex-1">{children}</main>
        <ChatWidget />
        <Footer />
      </body>
    </html>
  );
}
