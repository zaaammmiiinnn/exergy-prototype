import { NextResponse } from "next/server";
import { submitAssessment } from "@/app/actions/submit-assessment";
import { assessmentSchema } from "@/lib/leads/schema";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await submitAssessment(body);

    if (!result.success) {
      return NextResponse.json(result, { status: 400 });
    }

    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    console.error("[API_ASSESSMENT_ERROR]", err);
    return NextResponse.json(
      {
        success: false,
        error: err?.message || "Failed to process assessment submission.",
      },
      { status: 500 }
    );
  }
}
