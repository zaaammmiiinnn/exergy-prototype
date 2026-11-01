import { createServiceRoleClient } from "@/lib/supabase/service";
import { chatQABankSeed, QABankItem } from "@/content/seed/chatbot";
import type {
  VisitorRecord,
  ConversationRecord,
  MessageRecord,
  CustomerLeadRecord,
  KnowledgeRecord,
  ConversationStatus,
  SenderType,
  MessageType,
} from "./types";

// In-Memory Fallback Store (for local dev, tests, and resilience)
class ChatMemoryStore {
  visitors = new Map<string, VisitorRecord>(); // visitor_uuid -> VisitorRecord
  conversations = new Map<string, ConversationRecord>(); // conversation_id -> ConversationRecord
  messages = new Map<string, MessageRecord[]>(); // conversation_id -> MessageRecord[]
  leads = new Map<string, CustomerLeadRecord>(); // id -> CustomerLeadRecord
  knowledge: KnowledgeRecord[] = [];

  constructor() {
    this.seedKnowledge();
  }

  seedKnowledge() {
    this.knowledge = chatQABankSeed.map((item, idx) => ({
      id: item.id || `qa-${idx + 1}`,
      category: item.category || "general",
      question: item.question,
      keywords: item.keywords || [],
      synonyms: item.synonyms || [],
      answer: item.answer,
      destination_url: item.destination_url || undefined,
      is_active: item.is_active !== false,
      priority: item.priority || 5,
      source_page: item.source_page || "General",
      hit_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }));
  }
}

// Global singleton for in-memory fallback persistence across requests in Node / Worker
const globalStore: ChatMemoryStore =
  (globalThis as any).__EXERGY_CHAT_STORE__ || new ChatMemoryStore();
if (process.env.NODE_ENV !== "production") {
  (globalThis as any).__EXERGY_CHAT_STORE__ = globalStore;
}

export function isSupabaseReady(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  return Boolean(
    url &&
    key &&
    !url.includes("your-project") &&
    !url.includes("dummy") &&
    !key.includes("your-service-role") &&
    !key.includes("dummy") &&
    url.startsWith("https://")
  );
}

export const chatRepository = {
  /**
   * Get or create a visitor identity by visitor UUID
   */
  async getOrCreateVisitor(
    visitorUuid: string,
    metadata?: { deviceType?: string; userAgent?: string; clientIp?: string }
  ): Promise<VisitorRecord> {
    const now = new Date().toISOString();
    const cleanUuid = visitorUuid.trim();

    // Memory store
    let visitor = globalStore.visitors.get(cleanUuid);
    if (!visitor) {
      visitor = {
        id: cleanUuid,
        visitor_uuid: cleanUuid,
        user_id: null,
        name: null,
        email: null,
        phone: null,
        device_type: metadata?.deviceType || "desktop",
        first_seen_at: now,
        last_seen_at: now,
        created_at: now,
        updated_at: now,
      };
      globalStore.visitors.set(cleanUuid, visitor);
    } else {
      visitor.last_seen_at = now;
      visitor.updated_at = now;
    }
    return visitor;
  },

  /**
   * Update visitor profile details (name, email, phone)
   */
  async updateVisitorProfile(
    visitorId: string,
    profile: { name?: string; email?: string; phone?: string }
  ): Promise<void> {
    const now = new Date().toISOString();
    const updates: any = { updated_at: now };
    if (profile.name) updates.name = profile.name;
    if (profile.email) updates.email = profile.email;
    if (profile.phone) updates.phone = profile.phone;

    if (isSupabaseReady()) {
      try {
        const supabase = createServiceRoleClient();
        await supabase.from("visitors").update(updates).eq("id", visitorId);
      } catch (err) {
        console.warn("[CHAT REPO] Failed to update visitor in Supabase:", err);
      }
    }

    // Update memory
    for (const [, v] of globalStore.visitors) {
      if (v.id === visitorId) {
        if (profile.name) v.name = profile.name;
        if (profile.email) v.email = profile.email;
        if (profile.phone) v.phone = profile.phone;
        v.updated_at = now;
        break;
      }
    }
  },

  /**
   * Get or create active conversation for a visitor
   */
  async getOrCreateConversation(
    visitor: VisitorRecord,
    options?: { pageUrl?: string; userAgent?: string; ipHash?: string }
  ): Promise<ConversationRecord> {
    const now = new Date().toISOString();

    if (isSupabaseReady()) {
      try {
        const supabase = createServiceRoleClient();
        // Check for existing session for this visitor in chat_sessions
        const { data: existing } = await supabase
          .from("chat_sessions")
          .select("*")
          .eq("token_hash", visitor.visitor_uuid)
          .maybeSingle();

        if (existing) {
          const convRecord: ConversationRecord = {
            id: existing.id,
            visitor_id: existing.token_hash,
            conversation_title: "Customer Support Session",
            status: (existing.status as ConversationStatus) || "bot",
            current_node: "main",
            mode: "menu",
            assigned_admin_id: null,
            last_message_at: existing.created_at,
            unread_by_visitor: false,
            unread_by_admin: false,
            page_url: options?.pageUrl || "/",
            ip_hash: options?.ipHash,
            user_agent: options?.userAgent,
            visitor_name: visitor.name,
            visitor_email: visitor.email,
            company_name: null,
            created_at: existing.created_at,
            updated_at: existing.created_at,
          };
          globalStore.conversations.set(existing.id, convRecord);
          return convRecord;
        }

        const newId = crypto.randomUUID();
        const { data: created, error } = await supabase
          .from("chat_sessions")
          .insert({
            id: newId,
            token_hash: visitor.visitor_uuid,
            status: "bot",
            created_at: now,
          })
          .select()
          .single();

        if (!error && created) {
          const convRecord: ConversationRecord = {
            id: created.id,
            visitor_id: visitor.visitor_uuid,
            conversation_title: "Customer Support Session",
            status: created.status as ConversationStatus,
            current_node: "main",
            mode: "menu",
            assigned_admin_id: null,
            last_message_at: created.created_at,
            unread_by_visitor: false,
            unread_by_admin: false,
            page_url: options?.pageUrl || "/",
            user_agent: options?.userAgent,
            visitor_name: visitor.name,
            visitor_email: visitor.email,
            created_at: created.created_at,
            updated_at: created.created_at,
          };
          globalStore.conversations.set(created.id, convRecord);
          return convRecord;
        }
      } catch (err) {
        console.warn("[CHAT REPO] Supabase conversation lookup failed, using local store:", err);
      }
    }

    // Memory fallback
    for (const [, conv] of globalStore.conversations) {
      if (
        (conv.visitor_id === visitor.id || conv.visitor_id === visitor.visitor_uuid) &&
        conv.status !== "closed" &&
        conv.status !== "resolved"
      ) {
        return conv;
      }
    }

    const conversationId = crypto.randomUUID();
    const newConv: ConversationRecord = {
      id: conversationId,
      visitor_id: visitor.visitor_uuid || visitor.id,
      conversation_title: "Customer Support Session",
      status: "open",
      current_node: "main",
      mode: "menu",
      assigned_admin_id: null,
      last_message_at: now,
      unread_by_visitor: false,
      unread_by_admin: false,
      page_url: options?.pageUrl || "/",
      user_agent: options?.userAgent,
      visitor_name: visitor.name,
      visitor_email: visitor.email,
      created_at: now,
      updated_at: now,
    };
    globalStore.conversations.set(conversationId, newConv);
    globalStore.messages.set(conversationId, []);
    return newConv;
  },

  /**
   * Get a conversation by ID
   */
  async getConversationById(conversationId: string): Promise<ConversationRecord | null> {
    if (isSupabaseReady()) {
      try {
        const supabase = createServiceRoleClient();
        let { data } = await supabase
          .from("chat_sessions")
          .select("*, chat_messages(id, body, created_at, sender)")
          .eq("id", conversationId)
          .maybeSingle();

        if (!data) {
          const { data: byToken } = await supabase
            .from("chat_sessions")
            .select("*, chat_messages(id, body, created_at, sender)")
            .eq("token_hash", conversationId)
            .maybeSingle();
          data = byToken;
        }

        if (data) {
          const msgs = (data.chat_messages || []).sort(
            (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
          const latest = msgs[msgs.length - 1];

          let extractedEmail: string | undefined;
          let extractedName: string | undefined;

          for (const m of msgs) {
            const body = m.body || "";
            const emailMatch = body.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/);
            if (emailMatch && !extractedEmail) extractedEmail = emailMatch[0];
            if (m.sender === "bot") {
              const meetMatch = body.match(/Nice to meet you,\s*([A-Za-z\s]+?)[.?!]/i);
              if (meetMatch && !extractedName) extractedName = meetMatch[1].trim();
            }
          }

          return {
            id: data.id,
            visitor_id: data.token_hash,
            conversation_title: extractedName ? `${extractedName} (Visitor)` : "Customer Support Session",
            status: (data.status as ConversationStatus) || "bot",
            current_node: "main",
            mode: "menu",
            assigned_admin_id: null,
            last_message_at: latest?.created_at || data.created_at,
            unread_by_visitor: latest?.sender === "admin",
            unread_by_admin: latest?.sender === "visitor",
            page_url: "/",
            ip_hash: undefined,
            user_agent: undefined,
            visitor_name: extractedName,
            visitor_email: extractedEmail,
            company_name: undefined,
            created_at: data.created_at,
            updated_at: latest?.created_at || data.created_at,
          };
        }
      } catch (err) {
        console.warn("[CHAT REPO] Supabase getConversationById failed:", err);
      }
    }

    return globalStore.conversations.get(conversationId) || null;
  },

  /**
   * List all conversations (for Admin Dashboard) with filtering and search
   */
  async listAllConversations(filters?: {
    status?: string;
    search?: string;
  }): Promise<{
    conversations: (ConversationRecord & {
      latestMessage?: string;
      messageCount: number;
    })[];
  }> {
    const searchLower = filters?.search?.toLowerCase().trim();
    const statusFilter = filters?.status?.toLowerCase().trim();

    if (isSupabaseReady()) {
      try {
        const supabase = createServiceRoleClient();
        let query = supabase
          .from("chat_sessions")
          .select("*, chat_messages(id, body, created_at, sender)")
          .order("created_at", { ascending: false });

        if (statusFilter && statusFilter !== "all") {
          query = query.eq("status", statusFilter);
        }

        const { data, error } = await query;
        if (!error && data) {
          let list = data.map((item: any) => {
            const msgs = (item.chat_messages || []).sort(
              (a: any, b: any) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
            );
            const latest = msgs[msgs.length - 1];

            let extractedEmail: string | undefined;
            let extractedName: string | undefined;

            for (const m of msgs) {
              const body = m.body || "";
              const emailMatch = body.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/);
              if (emailMatch && !extractedEmail) extractedEmail = emailMatch[0];

              if (m.sender === "bot") {
                const meetMatch = body.match(/Nice to meet you,\s*([A-Za-z\s]+?)[.?!]/i);
                if (meetMatch && !extractedName) extractedName = meetMatch[1].trim();
              }
            }

            return {
              id: item.id,
              visitor_id: item.token_hash,
              conversation_title: extractedName ? `${extractedName} (Visitor)` : `Visitor ${item.token_hash?.slice(-6) || "Guest"}`,
              status: (item.status as ConversationStatus) || "bot",
              current_node: "main",
              mode: "menu",
              assigned_admin_id: null,
              last_message_at: latest?.created_at || item.created_at,
              unread_by_visitor: latest?.sender === "admin",
              unread_by_admin: latest?.sender === "visitor",
              page_url: "/",
              ip_hash: undefined,
              user_agent: undefined,
              visitor_name: extractedName || (item.token_hash ? `Visitor ${item.token_hash.slice(-6)}` : "Visitor"),
              visitor_email: extractedEmail,
              company_name: undefined,
              created_at: item.created_at,
              updated_at: latest?.created_at || item.created_at,
              latestMessage: latest?.body || "No messages yet",
              messageCount: msgs.length,
            };
          });

          if (searchLower) {
            list = list.filter(
              (c: any) =>
                c.visitor_name?.toLowerCase().includes(searchLower) ||
                c.visitor_email?.toLowerCase().includes(searchLower) ||
                c.visitor_id?.toLowerCase().includes(searchLower) ||
                c.company_name?.toLowerCase().includes(searchLower) ||
                c.id.toLowerCase().includes(searchLower)
            );
          }

          return { conversations: list };
        }
      } catch (err) {
        console.warn("[CHAT REPO] Supabase listAllConversations failed, falling back to memory:", err);
      }
    }

    // Memory fallback
    let all = Array.from(globalStore.conversations.values()).sort(
      (a: ConversationRecord, b: ConversationRecord) =>
        new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime()
    );

    if (statusFilter && statusFilter !== "all") {
      all = all.filter((c) => {
        if (statusFilter === "open") return c.status === "open" || c.status === "bot";
        if (statusFilter === "needs_human") return c.status === "needs_human" || c.status === "pending";
        return c.status === statusFilter;
      });
    }

    if (searchLower) {
      all = all.filter(
        (c) =>
          c.visitor_name?.toLowerCase().includes(searchLower) ||
          c.visitor_email?.toLowerCase().includes(searchLower) ||
          c.visitor_id.toLowerCase().includes(searchLower) ||
          c.company_name?.toLowerCase().includes(searchLower) ||
          c.id.toLowerCase().includes(searchLower)
      );
    }

    const result = all.map((c) => {
      const msgs = globalStore.messages.get(c.id) || [];
      const latest = msgs[msgs.length - 1];
      return {
        ...c,
        latestMessage: latest?.message_content || "No messages yet",
        messageCount: msgs.length,
      };
    });

    return { conversations: result };
  },

  /**
   * Insert a message into a conversation
   */
  async addMessage(payload: {
    conversationId: string;
    senderType: SenderType;
    messageContent: string;
    messageType?: MessageType;
    senderId?: string;
    metadata?: any;
    nodeKey?: string;
  }): Promise<MessageRecord> {
    const now = new Date().toISOString();
    const msgId = crypto.randomUUID();

    const newMsg: MessageRecord = {
      id: msgId,
      conversation_id: payload.conversationId,
      sender_type: payload.senderType,
      sender_id: payload.senderId || null,
      message_content: payload.messageContent,
      message_type: payload.messageType || "text",
      metadata: payload.metadata || null,
      read_at: null,
      created_at: now,
    };

    if (isSupabaseReady()) {
      try {
        const supabase = createServiceRoleClient();
        await supabase.from("chat_messages").insert({
          id: msgId,
          session_id: payload.conversationId,
          sender: payload.senderType === "visitor" ? "visitor" : payload.senderType === "admin" ? "admin" : "bot",
          body: payload.messageContent,
          created_at: now,
        });

        if (payload.senderType === "admin") {
          await supabase.from("chat_sessions").update({
            status: "human_active",
          }).eq("id", payload.conversationId);
        }
      } catch (err) {
        console.warn("[CHAT REPO] Supabase addMessage failed, saved to memory:", err);
      }
    }

    // Memory store
    let convMsgs = globalStore.messages.get(payload.conversationId);
    if (!convMsgs) {
      convMsgs = [];
      globalStore.messages.set(payload.conversationId, convMsgs);
    }
    convMsgs.push(newMsg);

    const conv = globalStore.conversations.get(payload.conversationId);
    if (conv) {
      conv.last_message_at = now;
      if (payload.senderType === "admin") {
        conv.unread_by_visitor = true;
        conv.unread_by_admin = false;
        conv.status = "open";
      } else if (payload.senderType === "visitor") {
        conv.unread_by_admin = true;
      }
    }

    return newMsg;
  },

  /**
   * Get all messages for a conversation
   */
  async getMessages(conversationId: string): Promise<MessageRecord[]> {
    if (isSupabaseReady()) {
      try {
        const supabase = createServiceRoleClient();
        const { data, error } = await supabase
          .from("chat_messages")
          .select("*")
          .eq("session_id", conversationId)
          .order("created_at", { ascending: true });

        if (!error && data) {
          return data.map((m: any) => ({
            id: m.id,
            conversation_id: m.session_id,
            sender_type: (m.sender as SenderType) || "bot",
            sender_id: m.sender_id,
            message_content: m.body,
            message_type: (m.message_type as MessageType) || "text",
            metadata: m.meta,
            read_at: m.read_at,
            created_at: m.created_at,
          }));
        }
      } catch (err) {
        console.warn("[CHAT REPO] Supabase getMessages failed:", err);
      }
    }

    return globalStore.messages.get(conversationId) || [];
  },

  /**
   * Mark messages in a conversation as read by visitor
   */
  async markReadByVisitor(conversationId: string): Promise<void> {
    if (isSupabaseReady()) {
      try {
        const supabase = createServiceRoleClient();
        await supabase
          .from("chat_sessions")
          .update({ unread_by_visitor: false })
          .eq("id", conversationId);
      } catch {}
    }

    const conv = globalStore.conversations.get(conversationId);
    if (conv) conv.unread_by_visitor = false;
  },

  /**
   * Mark messages in a conversation as read by admin
   */
  async markReadByAdmin(conversationId: string): Promise<void> {
    if (isSupabaseReady()) {
      try {
        const supabase = createServiceRoleClient();
        await supabase
          .from("chat_sessions")
          .update({ unread_by_admin: false })
          .eq("id", conversationId);
      } catch {}
    }

    const conv = globalStore.conversations.get(conversationId);
    if (conv) conv.unread_by_admin = false;
  },

  /**
   * Update conversation status (open, pending, resolved, closed)
   */
  async updateConversationStatus(
    conversationId: string,
    status: ConversationStatus
  ): Promise<void> {
    const now = new Date().toISOString();
    if (isSupabaseReady()) {
      try {
        const supabase = createServiceRoleClient();
        await supabase
          .from("chat_sessions")
          .update({ status })
          .eq("id", conversationId);
      } catch (err) {
        console.warn("[CHAT REPO] Supabase update status failed:", err);
      }
    }

    const conv = globalStore.conversations.get(conversationId);
    if (conv) {
      conv.status = status;
      conv.updated_at = now;
    }
  },

  /**
   * Delete a conversation (Founder/Admin authorized)
   */
  async deleteConversation(conversationId: string): Promise<boolean> {
    if (isSupabaseReady()) {
      try {
        const supabase = createServiceRoleClient();
        await supabase.from("chat_sessions").delete().eq("id", conversationId);
      } catch (err) {
        console.warn("[CHAT REPO] Supabase deleteConversation failed:", err);
      }
    }

    globalStore.messages.delete(conversationId);
    return globalStore.conversations.delete(conversationId);
  },

  /**
   * Record Customer Lead
   */
  async recordLead(payload: {
    visitorId?: string;
    conversationId?: string;
    name: string;
    email: string;
    phone?: string;
    company?: string;
    inquiryCategory?: string;
    requirements?: string;
  }): Promise<CustomerLeadRecord> {
    const now = new Date().toISOString();
    const leadId = crypto.randomUUID();
    const currentYear = new Date().getFullYear();
    const shortId = `EX-${currentYear}-${Math.floor(1000 + Math.random() * 9000)}`;

    const newLead: CustomerLeadRecord = {
      id: leadId,
      visitor_id: payload.visitorId || null,
      name: payload.name,
      email: payload.email,
      phone: payload.phone || null,
      company: payload.company || "Not specified",
      inquiry_category: payload.inquiryCategory || "Customer Support Live Chat",
      customer_requirements: payload.requirements || "Inquiry from website chatbot",
      lead_status: "new",
      created_at: now,
      updated_at: now,
    };

    if (isSupabaseReady()) {
      try {
        const supabase = createServiceRoleClient();
        await supabase.from("leads").insert({
          id: leadId,
          short_id: shortId,
          source: "chatbot",
          status: "new",
          full_name: payload.name,
          email: payload.email,
          phone: payload.phone || null,
          company: payload.company || "Not specified",
          sector: payload.inquiryCategory || "Industrial Support",
          service_interest: ["Thermodynamic Consultation"],
          main_challenge: payload.requirements || null,
          score: 85,
          priority: "hot",
          created_at: now,
          updated_at: now,
        });
      } catch (err) {
        console.warn("[CHAT REPO] Supabase recordLead failed, stored in memory:", err);
      }
    }

    globalStore.leads.set(leadId, newLead);
    return newLead;
  },

  /**
   * Knowledge Base Management (Q&A bank / Chatbot Knowledge)
   */
  async getKnowledgeList(): Promise<KnowledgeRecord[]> {
    if (isSupabaseReady()) {
      try {
        const supabase = createServiceRoleClient();
        const { data, error } = await supabase
          .from("chat_qa_bank")
          .select("*");

        if (!error && data && data.length > 0) {
          return data.map((d: any) => ({
            id: d.id,
            category: d.category || "general",
            question: d.question,
            keywords: d.keywords || [],
            synonyms: d.synonyms || [],
            answer: d.answer,
            destination_url: d.destination_url,
            is_active: d.is_active !== false,
            priority: d.priority || 0,
            source_page: d.source_page || "General",
            hit_count: d.hit_count || 0,
            created_at: d.created_at,
            updated_at: d.updated_at,
          }));
        }
      } catch (err) {
        console.warn("[CHAT REPO] Supabase getKnowledgeList failed:", err);
      }
    }

    return globalStore.knowledge;
  },

  async addKnowledgeItem(item: Omit<KnowledgeRecord, "id">): Promise<KnowledgeRecord> {
    const now = new Date().toISOString();
    const newId = `qa-${Date.now()}`;
    const record: KnowledgeRecord = {
      ...item,
      id: newId,
      created_at: now,
      updated_at: now,
    };

    if (isSupabaseReady()) {
      try {
        const supabase = createServiceRoleClient();
        await supabase.from("chat_qa_bank").insert({
          question: item.question,
          answer: item.answer,
          keywords: item.keywords,
          synonyms: item.synonyms || [],
          category: item.category,
          source_page: item.source_page || "General",
          destination_url: item.destination_url || null,
          priority: item.priority || 5,
          is_active: item.is_active !== false,
          created_at: now,
          updated_at: now,
        });
      } catch (err) {
        console.warn("[CHAT REPO] Supabase addKnowledgeItem failed:", err);
      }
    }

    globalStore.knowledge.unshift(record);
    return record;
  },

  async updateKnowledgeItem(
    id: string,
    updates: Partial<KnowledgeRecord>
  ): Promise<KnowledgeRecord | null> {
    const now = new Date().toISOString();

    if (isSupabaseReady()) {
      try {
        const supabase = createServiceRoleClient();
        await supabase
          .from("chat_qa_bank")
          .update({
            ...updates,
            updated_at: now,
          })
          .eq("id", id);
      } catch (err) {
        console.warn("[CHAT REPO] Supabase updateKnowledgeItem failed:", err);
      }
    }

    const idx = globalStore.knowledge.findIndex((k) => k.id === id);
    if (idx >= 0) {
      globalStore.knowledge[idx] = {
        ...globalStore.knowledge[idx],
        ...updates,
        updated_at: now,
      };
      return globalStore.knowledge[idx];
    }
    return null;
  },

  async deleteKnowledgeItem(id: string): Promise<boolean> {
    if (isSupabaseReady()) {
      try {
        const supabase = createServiceRoleClient();
        await supabase.from("chat_qa_bank").delete().eq("id", id);
      } catch (err) {
        console.warn("[CHAT REPO] Supabase deleteKnowledgeItem failed:", err);
      }
    }

    const initialLen = globalStore.knowledge.length;
    globalStore.knowledge = globalStore.knowledge.filter((k) => k.id !== id);
    return globalStore.knowledge.length < initialLen;
  },
};
