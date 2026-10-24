import { NextResponse } from "next/server";
import { getLiveIndustries } from "@/lib/industries/industry";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const industries = await getLiveIndustries();
    const published = industries.filter((ind) => ind.is_published !== false);
    return NextResponse.json(published);
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || "Failed to load industries" }, { status: 500 });
  }
}
