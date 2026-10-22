import { NextResponse } from "next/server";
import { handleChatMessage, ChatSessionState } from "@/lib/chatbot/engine";
import { calculateLeadScore } from "@/lib/leads/scoring";
import { sendAssessmentNotificationEmails } from "@/lib/email/resend";
import { createServiceRoleClient } from "@/lib/supabase/service";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { sessionId, input, state, action, leadData } = body;

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

      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
      const isSupabaseConfigured = Boolean(
        supabaseUrl &&
        serviceKey &&
        !supabaseUrl.includes("your-project") &&
        !supabaseUrl.includes("dummy") &&
        !serviceKey.includes("your-service-role") &&
        !serviceKey.includes("dummy")
      );

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

    const output = handleChatMessage(currentState, input || "");

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
