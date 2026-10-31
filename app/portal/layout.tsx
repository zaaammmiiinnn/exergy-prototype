import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Client Portal | Exergy Solutions",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
