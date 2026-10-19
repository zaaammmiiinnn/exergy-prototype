import { redirect } from "next/navigation";
import { getCustomerSessionAction } from "@/app/actions/customer-auth";

export const dynamic = "force-dynamic";

export default async function TrackPage() {
  const session = await getCustomerSessionAction();
  if (!session) {
    redirect("/portal/login?redirect=/portal");
  }
  redirect("/portal");
}
