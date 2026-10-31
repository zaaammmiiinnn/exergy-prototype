import { NextResponse } from "next/server";
import { assertAdminAuthorized } from "@/app/actions/admin-auth";
import { chatRepository } from "@/lib/chat/repository";
import type { ConversationStatus } from "@/lib/chat/types";

export async function POST(req: Request) {
  try {
    await assertAdminAuthorized(["founder", "admin", "employee"]);
    const body = await req.json();
    const { conversationId, status } = body;

    if (!conversationId || !status) {
      return NextResponse.json(
        { success: false, error: "Conversation ID and status are required." },
        { status: 400 }
      );
    }

    const validStatuses: ConversationStatus[] = ["open", "pending", "resolved", "closed", "needs_human"];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid conversation status." },
        { status: 400 }
      );
    }

    await chatRepository.updateConversationStatus(conversationId, status);

    return NextResponse.json({ success: true, status });
  } catch (error: any) {
    const isAuthError =
      error?.message?.includes("Unauthorized") || error?.message?.includes("Forbidden");
    return NextResponse.json(
      { success: false, error: error.message || "Failed to update status" },
      { status: isAuthError ? 403 : 500 }
    );
  }
}
