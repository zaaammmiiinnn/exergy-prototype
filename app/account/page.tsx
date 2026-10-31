import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { constructMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = constructMetadata({
  title: "Client Account | Exergy Solutions",
  description: "Client portal account management.",
  path: "/account",
  noIndex: true,
});

export default function AccountPage() {
  redirect("/portal");
}
