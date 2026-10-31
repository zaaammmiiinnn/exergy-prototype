import { NextResponse } from "next/server";
import { assertAdminAuthorized } from "@/app/actions/admin-auth";
import { chatRepository } from "@/lib/chat/repository";

export async function POST(req: Request) {
  try {
    const adminSession = await assertAdminAuthorized(["founder", "admin", "employee"]);
    const body = await req.json();
    const { conversationId, message, senderName } = body;

    if (!conversationId || !message || !message.trim()) {
      return NextResponse.json(
        { success: false, error: "Conversation ID and message are required." },
        { status: 400 }
      );
    }

    const conversation = await chatRepository.getConversationById(conversationId);
    if (!conversation) {
      return NextResponse.json(
        { success: false, error: "Conversation not found." },
        { status: 404 }
      );
    }

    const adminMessage = await chatRepository.addMessage({
      conversationId,
      senderType: "admin",
      senderId: adminSession.email,
      messageContent: message.trim(),
      messageType: "text",
      metadata: {
        adminName: senderName || adminSession.name || "Engineering Support",
        adminRole: adminSession.role,
      },
    });

    return NextResponse.json({
      success: true,
      message: adminMessage,
    });
  } catch (error: any) {
    const isAuthError =
      error?.message?.includes("Unauthorized") || error?.message?.includes("Forbidden");
    return NextResponse.json(
      { success: false, error: error.message || "Failed to dispatch reply" },
      { status: isAuthError ? 403 : 500 }
    );
  }
}
