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

    if (isSupabaseReady()) {
      try {
        const supabase = createServiceRoleClient();
        const { data: existing } = await supabase
          .from("visitors")
          .select("*")
          .eq("visitor_uuid", cleanUuid)
          .maybeSingle();

        if (existing) {
          await supabase
            .from("visitors")
            .update({ last_seen_at: now, updated_at: now })
            .eq("id", existing.id);
          return existing as VisitorRecord;
        }

        const { data: created, error } = await supabase
          .from("visitors")
          .insert({
            visitor_uuid: cleanUuid,
            device_type: metadata?.deviceType || "desktop",
            first_seen_at: now,
            last_seen_at: now,
            created_at: now,
            updated_at: now,
          })
          .select()
          .single();

        if (!error && created) {
          return created as VisitorRecord;
        }
      } catch (err) {
        console.warn("[CHAT REPO] Supabase visitor query failed, falling back to local store:", err);
      }
    }

    // Memory fallback
    let visitor = globalStore.visitors.get(cleanUuid);
    if (!visitor) {
      visitor = {
        id: crypto.randomUUID(),
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
        // Check for existing open or pending conversation for this visitor
        const { data: existing } = await supabase
          .from("chat_sessions")
          .select("*")
          .or(`visitor_id.eq.${visitor.id},token_hash.eq.${visitor.visitor_uuid}`)
          .in("status", ["bot", "needs_human", "human_active", "open", "pending"])
          .order("last_message_at", { ascending: false })
          .limit(1)
          .maybeSingle();

        if (existing) {
          return {
            id: existing.id,
            visitor_id: existing.visitor_id || visitor.id,
            conversation_title: existing.conversation_title || "Customer Support Session",
            status: existing.status as ConversationStatus,
            current_node: existing.current_node || "main",
            mode: existing.mode || "menu",
            assigned_admin_id: existing.assigned_to || null,
            last_message_at: existing.last_message_at,
            unread_by_visitor: existing.unread_by_visitor || false,
            unread_by_admin: existing.unread_by_admin || false,
            page_url: existing.page_url,
            ip_hash: existing.ip_hash,
            user_agent: existing.user_agent,
            visitor_name: existing.visitor_name || visitor.name,
            visitor_email: existing.visitor_email || visitor.email,
            company_name: existing.company_name,
            created_at: existing.created_at,
            updated_at: existing.updated_at || existing.created_at,
          };
        }

        const newId = crypto.randomUUID();
        const { data: created, error } = await supabase
          .from("chat_sessions")
          .insert({
            id: newId,
            token_hash: visitor.visitor_uuid,
            visitor_id: visitor.id,
            status: "bot",
            current_node: "main",
            mode: "menu",
            page_url: options?.pageUrl || "/",
            user_agent: options?.userAgent,
            ip_hash: options?.ipHash,
            visitor_name: visitor.name,
            visitor_email: visitor.email,
            conversation_title: "Customer Support Session",
            last_message_at: now,
            created_at: now,
            updated_at: now,
          })
          .select()
          .single();

        if (!error && created) {
          return {
            id: created.id,
            visitor_id: visitor.id,
            conversation_title: created.conversation_title || "Customer Support Session",
            status: created.status as ConversationStatus,
            current_node: created.current_node,
            mode: created.mode,
            assigned_admin_id: created.assigned_to,
            last_message_at: created.last_message_at,
            unread_by_visitor: false,
            unread_by_admin: false,
            page_url: created.page_url,
            visitor_name: created.visitor_name,
            visitor_email: created.visitor_email,
            created_at: created.created_at,
            updated_at: created.updated_at,
          };
        }
      } catch (err) {
        console.warn("[CHAT REPO] Supabase conversation lookup failed, using local store:", err);
      }
    }

    // Memory fallback
    for (const [, conv] of globalStore.conversations) {
      if (
        conv.visitor_id === visitor.id &&
        conv.status !== "closed" &&
        conv.status !== "resolved"
      ) {
        return conv;
      }
    }

    const conversationId = crypto.randomUUID();
    const newConv: ConversationRecord = {
      id: conversationId,
      visitor_id: visitor.id,
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
        const { data } = await supabase
          .from("chat_sessions")
          .select("*")
          .eq("id", conversationId)
          .maybeSingle();

        if (data) {
          return {
            id: data.id,
            visitor_id: data.visitor_id || data.token_hash,
            conversation_title: data.conversation_title || "Customer Support Session",
            status: data.status as ConversationStatus,
            current_node: data.current_node,
            mode: data.mode,
            assigned_admin_id: data.assigned_to,
            last_message_at: data.last_message_at,
            unread_by_visitor: data.unread_by_visitor || false,
            unread_by_admin: data.unread_by_admin || false,
            page_url: data.page_url,
            ip_hash: data.ip_hash,
            user_agent: data.user_agent,
            visitor_name: data.visitor_name,
            visitor_email: data.visitor_email,
            company_name: data.company_name,
            created_at: data.created_at,
            updated_at: data.updated_at || data.created_at,
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
          .order("last_message_at", { ascending: false });

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

            return {
              id: item.id,
              visitor_id: item.visitor_id || item.token_hash,
              conversation_title: item.conversation_title || "Customer Support Session",
              status: (item.status as ConversationStatus) || "open",
              current_node: item.current_node,
              mode: item.mode,
              assigned_admin_id: item.assigned_to,
              last_message_at: item.last_message_at,
              unread_by_visitor: item.unread_by_visitor || false,
              unread_by_admin: item.unread_by_admin || false,
              page_url: item.page_url,
              ip_hash: item.ip_hash,
              user_agent: item.user_agent,
              visitor_name: item.visitor_name,
              visitor_email: item.visitor_email,
              company_name: item.company_name,
              created_at: item.created_at,
              updated_at: item.updated_at || item.created_at,
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
        await Promise.all([
          supabase.from("chat_messages").insert({
            id: msgId,
            session_id: payload.conversationId,
            sender: payload.senderType === "visitor" ? "visitor" : payload.senderType === "admin" ? "admin" : "bot",
            body: payload.messageContent,
            message_type: payload.messageType || "text",
            sender_id: payload.senderId || null,
            node_key: payload.nodeKey || null,
            meta: payload.metadata || {},
            created_at: now,
          }),
          supabase.from("chat_sessions").update({
            last_message_at: now,
            unread_by_visitor: payload.senderType === "admin",
            unread_by_admin: payload.senderType === "visitor",
            status: payload.senderType === "admin" ? "human_active" : undefined,
          }).eq("id", payload.conversationId),
        ]);
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
          .update({ status, updated_at: now })
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
          chat_session_id: payload.conversationId || null,
          visitor_id: payload.visitorId || null,
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
          .select("*")
          .order("priority", { ascending: false });

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
