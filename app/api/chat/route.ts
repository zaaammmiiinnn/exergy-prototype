import { NextResponse } from "next/server";
import {
  handleChatMessage,
  ChatSessionState,
  CHAT_MENU_TREE,
  ChatMenuItemNode,
} from "@/lib/chatbot/engine";
import { chatQABankSeed, QABankItem } from "@/content/seed/chatbot";
import { calculateLeadScore } from "@/lib/leads/scoring";
import { sendAssessmentNotificationEmails } from "@/lib/email/resend";
import { createServiceRoleClient } from "@/lib/supabase/service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, input, state, action, leadData } = body;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    const isSupabaseConfigured = Boolean(
      supabaseUrl &&
      serviceKey &&
      !supabaseUrl.includes("your-project") &&
      !supabaseUrl.includes("dummy") &&
      !serviceKey.includes("your-service-role") &&
      !serviceKey.includes("dummy") &&
      supabaseUrl.startsWith("https://")
    );

    // Handle explicit lead dispatch
    if (action === "lead" || leadData) {
      const data = leadData || {};
      const currentYear = new Date().getFullYear();
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const shortId = `EX-${currentYear}-${randomSuffix}`;

      const { score, priority } = calculateLeadScore({
        email: data.email || "",
        sector: "General Industrial / Chatbot Inquirer",
        services: ["Turnkey Thermodynamic Consulting"],
        timeline: "immediate",
        mainChallenge: data.note || "Contact requested via Chatbot Handoff",
        source: "handoff",
      });

      // Dispatch notification emails asynchronously
      sendAssessmentNotificationEmails({
        shortId,
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

      if (isSupabaseConfigured) {
        try {
          const supabase = createServiceRoleClient();
          await supabase.from("leads").insert({
            short_id: shortId,
            source: "handoff",
            status: "new",
            full_name: data.name || "Chat Visitor",
            email: data.email || "",
            company: data.company || "Not provided",
            sector: "Industrial Operations",
            service_interest: ["Thermodynamic Consultation"],
            main_challenge: data.note || null,
            score,
            priority,
            chat_session_id: sessionId && sessionId.length === 36 ? sessionId : null,
          });

          if (sessionId && sessionId.length === 36) {
            await supabase.from("chat_sessions").upsert({
              id: sessionId,
              status: "needs_human",
              visitor_name: data.name,
              visitor_email: data.email,
              company_name: data.company,
              last_message_at: new Date().toISOString(),
            });
          }
        } catch (dbErr) {
          console.warn("[CHAT DB ERROR]", dbErr);
        }
      }

      return NextResponse.json({ success: true, shortId });
    }

    // Normal message handling
    const currentState: ChatSessionState = state || {
      currentNode: "main",
      mode: "menu",
      fallbackCount: 0,
    };

    // Query active chat_menu_items and chat_qa_bank from Supabase if connected
    let dbMenuTree = CHAT_MENU_TREE;
    let dbQABank: QABankItem[] = chatQABankSeed;

    if (isSupabaseConfigured) {
      try {
        const supabase = createServiceRoleClient();
        const [menuRes, qaRes] = await Promise.all([
          supabase.from("chat_menu_items").select("*").eq("is_active", true),
          supabase.from("chat_qa_bank").select("*").eq("is_active", true),
        ]);

        if (menuRes.data && menuRes.data.length > 0) {
          const tree: Record<string, ChatMenuItemNode> = { ...CHAT_MENU_TREE };
          for (const item of menuRes.data) {
            tree[item.node_key] = {
              key: item.node_key,
              parent: item.parent_key || undefined,
              position: item.position ?? 0,
              label: item.label,
              text: item.body || "",
              keywords: item.keywords || [],
              action: item.action || undefined,
            };
          }
          dbMenuTree = tree;
        }

        if (qaRes.data && qaRes.data.length > 0) {
          dbQABank = qaRes.data.map((item) => ({
            id: item.id,
            question: item.question,
            answer: item.answer,
            keywords: item.keywords || [],
            category: item.category || "general",
            source_page: item.source_page || "Home",
          }));
        }
      } catch (dbErr) {
        console.warn("[CHAT DB RETRIEVAL WARNING]", dbErr);
      }
    }

    const output = handleChatMessage(currentState, input || "", dbQABank, dbMenuTree);

    // If intent is lead_captured, also trigger lead creation and notifications
    if (output.intent === "lead_captured" && output.leadPayload) {
      const payload = output.leadPayload;
      const currentYear = new Date().getFullYear();
      const randomSuffix = Math.floor(1000 + Math.random() * 9000);
      const shortId = `EX-${currentYear}-${randomSuffix}`;

      const { score, priority } = calculateLeadScore({
        email: payload.email,
        sector: "Industrial Operations",
        services: ["Engineering Review"],
        timeline: "immediate",
        mainChallenge: payload.note,
        source: "handoff",
      });

      sendAssessmentNotificationEmails({
        shortId,
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

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      const isConfigured = Boolean(
        supabaseUrl &&
        serviceKey &&
        !supabaseUrl.includes("your-project") &&
        !supabaseUrl.includes("dummy") &&
        !serviceKey.includes("your-service-role") &&
        !serviceKey.includes("dummy")
      );

      if (isConfigured) {
        try {
          const supabase = createServiceRoleClient();
          await supabase.from("leads").insert({
            short_id: shortId,
            source: "handoff",
            status: "new",
            full_name: payload.name,
            email: payload.email,
            company: payload.company,
            sector: "Industrial Operations",
            service_interest: ["Plant Optimization Review"],
            main_challenge: payload.note || null,
            score,
            priority,
            chat_session_id: sessionId && sessionId.length === 36 ? sessionId : null,
          });

          if (sessionId && sessionId.length === 36) {
            await supabase.from("chat_sessions").upsert({
              id: sessionId,
              status: "needs_human",
              visitor_name: payload.name,
              visitor_email: payload.email,
              company_name: payload.company,
              last_message_at: new Date().toISOString(),
            });
          }
        } catch (dbErr) {
          console.warn("[CHAT PERSIST DB ERROR]", dbErr);
        }
      }
    }

    return NextResponse.json({
      success: true,
      output,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process chat message" },
      { status: 500 }
    );
  }
}
