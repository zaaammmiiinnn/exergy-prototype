import { NextResponse } from "next/server";
import { chatRepository } from "@/lib/chat/repository";
import { resolveVisitorSession, verifyVisitorToken } from "@/lib/auth/visitor";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const { visitorToken: clientVisitorToken, conversationId } = body;

    let visitorUuid: string;
    if (clientVisitorToken) {
      const verified = await verifyVisitorToken(clientVisitorToken);
      visitorUuid = verified?.visitorUuid || (await resolveVisitorSession()).visitorUuid;
    } else {
      visitorUuid = (await resolveVisitorSession()).visitorUuid;
    }

    const visitor = await chatRepository.getOrCreateVisitor(visitorUuid);

    // If current conversation exists, mark it as closed
    if (conversationId) {
      const conv = await chatRepository.getConversationById(conversationId);
      if (conv && (conv.visitor_id === visitor.id || conv.visitor_id === visitor.visitor_uuid)) {
        await chatRepository.updateConversationStatus(conv.id, "closed");
      }
    }

    // Force creation of fresh conversation
    const newConv = await chatRepository.getOrCreateConversation(visitor, {
      pageUrl: "/",
    });

    return NextResponse.json({
      success: true,
      conversationId: newConv.id,
      visitorUuid: visitor.visitor_uuid,
    });
  } catch (error: any) {
    console.error("[API CHAT CLEAR ERROR]", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to clear conversation" },
      { status: 500 }
    );
  }
}
