import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "healthy",
    service: "exergy-solutions",
    timestamp: new Date().toISOString(),
    admin_contact: "sarfraz@exergy-solutions.com",
    runtime: "cloudflare-workers",
  });
}
