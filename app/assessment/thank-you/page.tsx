import React from "react";
import type { Metadata } from "next";
import { ThankYouClient } from "./thank-you-client";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Assessment Registered | Exergy Solutions",
  description: "Thank you for submitting your engineering facility assessment inquiry.",
  path: "/assessment/thank-you",
  noIndex: true,
});

export default function ThankYouPage() {
  return <ThankYouClient />;
}
