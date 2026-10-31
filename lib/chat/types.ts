export type SenderType = "visitor" | "bot" | "admin" | "system";
export type ConversationStatus = "open" | "pending" | "resolved" | "closed" | "needs_human" | "bot" | "human_active";
export type MessageType = "text" | "system" | "link" | "navigation";

export interface VisitorRecord {
  id: string;
  visitor_uuid: string;
  user_id?: string | null;
  name?: string | null;
  email?: string | null;
  phone?: string | null;
  device_type: string;
  first_seen_at: string;
  last_seen_at: string;
  created_at: string;
  updated_at: string;
}

export interface ConversationRecord {
  id: string;
  visitor_id: string;
  conversation_title: string;
  status: ConversationStatus;
  current_node?: string;
  mode?: string;
  assigned_admin_id?: string | null;
  last_message_at: string;
  unread_by_visitor: boolean;
  unread_by_admin: boolean;
  page_url?: string | null;
  ip_hash?: string | null;
  user_agent?: string | null;
  visitor_name?: string | null;
  visitor_email?: string | null;
  company_name?: string | null;
  created_at: string;
  updated_at: string;
}

export interface MessageRecord {
  id: string;
  conversation_id: string;
  sender_type: SenderType;
  sender_id?: string | null;
  message_content: string;
  message_type: MessageType;
  metadata?: {
    quickReplies?: { label: string; action: string; url?: string }[];
    navigationLink?: { label: string; url: string };
    sourcePage?: string;
    nodeKey?: string;
    [key: string]: any;
  } | null;
  read_at?: string | null;
  created_at: string;
}

export interface CustomerLeadRecord {
  id: string;
  visitor_id?: string | null;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  inquiry_category?: string | null;
  customer_requirements?: string | null;
  lead_status: string;
  created_at: string;
  updated_at?: string;
}

export interface KnowledgeRecord {
  id: string;
  category: string;
  question: string;
  keywords: string[];
  synonyms?: string[];
  answer: string;
  destination_url?: string;
  is_active: boolean;
  priority: number;
  source_page?: string;
  hit_count?: number;
  created_at?: string;
  updated_at?: string;
}
