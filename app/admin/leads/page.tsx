import { redirect } from "next/navigation";

export default function AdminLeadsPage() {
  // Directly redirect to /admin dashboard which houses the full assessment submissions table
  redirect("/admin");
}
