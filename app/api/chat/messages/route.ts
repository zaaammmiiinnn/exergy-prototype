import { NextResponse } from "next/server";
import { chatRepository } from "@/lib/chat/repository";
import { resolveVisitorSession, verifyVisitorToken } from "@/lib/auth/visitor";
import { getAdminSessionAction } from "@/app/actions/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get("conversationId");
    const markRead = searchParams.get("markRead") === "true";
    const tokenParam = searchParams.get("visitorToken");

    // Check if caller is admin
    const adminSession = await getAdminSessionAction();
    const isAdmin = Boolean(adminSession && adminSession.email);

    let visitorUuid: string | null = null;
    if (!isAdmin) {
      if (tokenParam) {
        const verified = await verifyVisitorToken(tokenParam);
        visitorUuid = verified?.visitorUuid || null;
      }
      if (!visitorUuid) {
        const session = await resolveVisitorSession();
        visitorUuid = session.visitorUuid;
      }
    }

    if (!conversationId) {
      if (isAdmin) {
        const { conversations } = await chatRepository.listAllConversations();
        return NextResponse.json({ success: true, conversations });
      }

      if (!visitorUuid) {
        return NextResponse.json({ success: false, error: "Unauthorized visitor" }, { status: 401 });
      }

      const visitor = await chatRepository.getOrCreateVisitor(visitorUuid);
      const conversation = await chatRepository.getOrCreateConversation(visitor);
      const messages = await chatRepository.getMessages(conversation.id);

      if (markRead && conversation.unread_by_visitor) {
        await chatRepository.markReadByVisitor(conversation.id);
      }

      return NextResponse.json({
        success: true,
        conversation,
        messages,
      });
    }

    const conversation = await chatRepository.getConversationById(conversationId);
    if (!conversation) {
      return NextResponse.json({ success: false, error: "Conversation not found" }, { status: 404 });
    }

    // Security boundary: if not admin, ensure visitor owns this conversation
    if (!isAdmin) {
      const visitor = await chatRepository.getOrCreateVisitor(visitorUuid!);
      if (conversation.visitor_id !== visitor.id && conversation.visitor_id !== visitor.visitor_uuid) {
        return NextResponse.json(
          { success: false, error: "Forbidden: You cannot access another visitor's conversation." },
          { status: 403 }
        );
      }

      if (markRead && conversation.unread_by_visitor) {
        await chatRepository.markReadByVisitor(conversation.id);
      }
    } else {
      if (markRead && conversation.unread_by_admin) {
        await chatRepository.markReadByAdmin(conversation.id);
      }
    }

    const messages = await chatRepository.getMessages(conversation.id);

    return NextResponse.json({
      success: true,
      conversation,
      messages,
    });
  } catch (error: any) {
    console.error("[API CHAT MESSAGES ERROR]", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
