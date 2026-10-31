import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { getCustomerSessionAction } from "@/app/actions/customer-auth";
import { constructMetadata } from "@/lib/seo/metadata";

export const dynamic = "force-dynamic";

export const metadata: Metadata = constructMetadata({
  title: "Track Project | Exergy Solutions",
  description: "Client tracking and project portal.",
  path: "/track",
  noIndex: true,
});

export default async function TrackPage() {
  const session = await getCustomerSessionAction();
  if (!session) {
    redirect("/portal/login?redirect=/portal");
  }
  redirect("/portal");
}
