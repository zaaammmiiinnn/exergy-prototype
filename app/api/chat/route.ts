import { NextResponse } from "next/server";
import {
  handleChatMessage,
  ChatSessionState,
  CHAT_MENU_TREE,
  ChatMenuItemNode,
} from "@/lib/chatbot/engine";
import { chatRepository } from "@/lib/chat/repository";
import {
  resolveVisitorSession,
  signVisitorToken,
  verifyVisitorToken,
} from "@/lib/auth/visitor";
import { calculateLeadScore } from "@/lib/leads/scoring";
import { sendAssessmentNotificationEmails } from "@/lib/email/resend";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      conversationId: clientConvId,
      sessionId,
      input,
      state,
      action,
      leadData,
      visitorToken: clientVisitorToken,
      deviceType = "desktop",
    } = body;

    // 1. Resolve secure visitor identity
    let visitorUuid: string;
    let currentToken: string;

    if (clientVisitorToken) {
      const verified = await verifyVisitorToken(clientVisitorToken);
      if (verified?.visitorUuid) {
        visitorUuid = verified.visitorUuid;
        currentToken = clientVisitorToken;
      } else {
        const session = await resolveVisitorSession();
        visitorUuid = session.visitorUuid;
        currentToken = session.token;
      }
    } else {
      const session = await resolveVisitorSession();
      visitorUuid = session.visitorUuid;
      currentToken = session.token;
    }

    const userAgent = req.headers.get("user-agent") || undefined;
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined;

    // 2. Look up or create persistent visitor record
    const visitor = await chatRepository.getOrCreateVisitor(visitorUuid, {
      deviceType,
      userAgent,
      clientIp,
    });

    // 3. Resolve active conversation
    let conversation = clientConvId || sessionId
      ? await chatRepository.getConversationById(clientConvId || sessionId)
      : null;

    if (!conversation || conversation.visitor_id !== visitor.id) {
      conversation = await chatRepository.getOrCreateConversation(visitor, {
        pageUrl: state?.currentNode ? `/${state.currentNode}` : "/",
        userAgent,
      });
    }

    // 4. Handle explicit lead dispatch
    if (action === "lead" || leadData) {
      const data = leadData || {};
      const { score, priority } = calculateLeadScore({
        email: data.email || "",
        sector: "General Industrial / Chatbot Inquirer",
        services: ["Turnkey Thermodynamic Consulting"],
        timeline: "immediate",
        mainChallenge: data.note || "Contact requested via Chatbot Handoff",
        source: "handoff",
      });

      const lead = await chatRepository.recordLead({
        visitorId: visitor.id,
        conversationId: conversation.id,
        name: data.name || visitor.name || "Chat Visitor",
        email: data.email || visitor.email || "",
        company: data.company || "Not specified",
        requirements: data.note || "Chat handoff consultation",
        inquiryCategory: "Industrial Engineering Consultation",
      });

      if (data.name || data.email) {
        await chatRepository.updateVisitorProfile(visitor.id, {
          name: data.name,
          email: data.email,
        });
      }

      sendAssessmentNotificationEmails({
        shortId: lead.id,
        name: data.name || "Inquirer",
        email: data.email || "",
        company: data.company || "Not provided",
        sector: "Industrial Inquiry (Chat Handoff)",
        services: ["Engineering Review"],
        timeline: "Immediate",
        mainChallenge: data.note || "Requested engineer follow-up via Exergy Assistant",
        score,
        priority,
      }).catch((err) => console.error("[CHAT LEAD EMAIL ERROR]", err));

      const res = NextResponse.json({
        success: true,
        conversationId: conversation.id,
        visitorUuid: visitor.visitor_uuid,
        visitorToken: currentToken,
        shortId: lead.id,
      });

      res.cookies.set("exergy_visitor_token", currentToken, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 86400 * 365,
        secure: process.env.NODE_ENV === "production",
      });

      return res;
    }

    // 5. Normal chat message processing
    const currentState: ChatSessionState = state || {
      currentNode: "main",
      mode: "menu",
      fallbackCount: 0,
    };

    // Save visitor message in database
    if (input && input.trim()) {
      await chatRepository.addMessage({
        conversationId: conversation.id,
        senderType: "visitor",
        messageContent: input.trim(),
        messageType: "text",
        senderId: visitor.visitor_uuid,
      });
    }

    // Retrieve active dynamic knowledge base
    const dynamicKnowledge = await chatRepository.getKnowledgeList();
    const qaItems = dynamicKnowledge.map((k) => ({
      id: k.id,
      question: k.question,
      answer: k.answer,
      keywords: k.keywords,
      synonyms: k.synonyms,
      category: k.category,
      source_page: k.source_page || "General",
      destination_url: k.destination_url,
      priority: k.priority,
      is_active: k.is_active,
    }));

    const output = handleChatMessage(currentState, input || "", qaItems, CHAT_MENU_TREE);

    // Save bot reply in database
    await chatRepository.addMessage({
      conversationId: conversation.id,
      senderType: "bot",
      messageContent: output.reply,
      messageType: output.navigationLink ? "navigation" : "text",
      metadata: {
        quickReplies: output.quickReplies,
        navigationLink: output.navigationLink,
        intent: output.intent,
      },
    });

    // Handle lead capture intent
    if (output.intent === "lead_captured" && output.leadPayload) {
      const payload = output.leadPayload;
      const { score, priority } = calculateLeadScore({
        email: payload.email,
        sector: "Industrial Operations",
        services: ["Engineering Review"],
        timeline: "immediate",
        mainChallenge: payload.note,
        source: "handoff",
      });

      await chatRepository.recordLead({
        visitorId: visitor.id,
        conversationId: conversation.id,
        name: payload.name,
        email: payload.email,
        company: payload.company,
        requirements: payload.note,
        inquiryCategory: "Industrial Engineering Review",
      });

      await chatRepository.updateVisitorProfile(visitor.id, {
        name: payload.name,
        email: payload.email,
      });

      await chatRepository.updateConversationStatus(conversation.id, "needs_human");

      sendAssessmentNotificationEmails({
        shortId: `CHAT-${conversation.id.slice(0, 8).toUpperCase()}`,
        name: payload.name,
        email: payload.email,
        company: payload.company,
        sector: "Industrial Operations",
        services: ["Plant Optimization Review"],
        timeline: "Immediate",
        mainChallenge: payload.note,
        score,
        priority,
      }).catch((err) => console.error("[CHAT EMAIL DISPATCH ERROR]", err));
    }

    const res = NextResponse.json({
      success: true,
      conversationId: conversation.id,
      visitorUuid: visitor.visitor_uuid,
      visitorToken: currentToken,
      output,
    });

    res.cookies.set("exergy_visitor_token", currentToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 86400 * 365,
      secure: process.env.NODE_ENV === "production",
    });

    return res;
  } catch (error: any) {
    console.error("[API CHAT ERROR]", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process chat message" },
      { status: 500 }
    );
  }
}
