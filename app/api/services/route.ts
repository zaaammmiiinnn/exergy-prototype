import { NextResponse } from "next/server";
import { getLiveServices } from "@/lib/services/service";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const services = await getLiveServices();
    const published = services.filter((s) => s.is_published !== false);
    return NextResponse.json(published);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to load services" }, { status: 500 });
  }
}
