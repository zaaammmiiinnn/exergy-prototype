"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { ChatWidget } from "@/components/chat/chat-widget";
import { WhatsAppLauncher } from "@/components/site/whatsapp-launcher";
import { IntroAnimation } from "@/components/IntroAnimation";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <IntroAnimation />
      <Navbar />
      <main className="flex-1">{children}</main>
      <WhatsAppLauncher />
      <ChatWidget />
      <Footer />
    </>
  );
}
