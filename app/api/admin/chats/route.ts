import { NextResponse } from "next/server";
import { assertAdminAuthorized } from "@/app/actions/admin-auth";
import { chatRepository } from "@/lib/chat/repository";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    await assertAdminAuthorized(["founder", "admin", "employee"]);

    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || undefined;
    const search = searchParams.get("search") || undefined;

    const { conversations } = await chatRepository.listAllConversations({
      status,
      search,
    });

    return NextResponse.json({
      success: true,
      conversations,
    });
  } catch (error: any) {
    const isAuthError =
      error?.message?.includes("Unauthorized") || error?.message?.includes("Forbidden");
    return NextResponse.json(
      { success: false, error: error.message || "Failed to list conversations" },
      { status: isAuthError ? 403 : 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    // Only founders and admins can delete conversations (employees forbidden)
    await assertAdminAuthorized(["founder", "admin"]);

    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get("id");

    if (!conversationId) {
      return NextResponse.json(
        { success: false, error: "Missing conversation ID" },
        { status: 400 }
      );
    }

    const success = await chatRepository.deleteConversation(conversationId);
    return NextResponse.json({ success });
  } catch (error: any) {
    const isAuthError =
      error?.message?.includes("Unauthorized") || error?.message?.includes("Forbidden");
    return NextResponse.json(
      { success: false, error: error.message || "Failed to delete conversation" },
      { status: isAuthError ? 403 : 500 }
    );
  }
}
