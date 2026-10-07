const API_BASE = '/api';

const getHeaders = (includeAuth = false) => {
  const headers = {
    'Content-Type': 'application/json',
  };
  if (includeAuth) {
    const token = localStorage.getItem('exergy_admin_token');
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }
  return headers;
};

export const api = {
  // Auth
  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to login');
    return data;
  },

  async getMe() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      method: 'GET',
      headers: getHeaders(true),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Session expired');
    return data;
  },

  // Public Leads
  async createLead(leadData) {
    const res = await fetch(`${API_BASE}/leads`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(leadData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to submit inquiry');
    return data;
  },

  async submitLeadInquiry(leadData) {
    return this.createLead(leadData);
  },

  // Admin Leads
  async getAdminLeads({ search = '', status = '', reason = '' } = {}) {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (status) params.append('status', status);
    if (reason) params.append('reason', reason);

    const res = await fetch(`${API_BASE}/admin/leads?${params.toString()}`, {
      method: 'GET',
      headers: getHeaders(true),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch leads');
    return data;
  },

  async updateLead(leadId, updateData) {
    const res = await fetch(`${API_BASE}/admin/leads/${leadId}`, {
      method: 'PATCH',
      headers: getHeaders(true),
      body: JSON.stringify(updateData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to update lead');
    return data;
  },

  async deleteLead(leadId) {
    const res = await fetch(`${API_BASE}/admin/leads/${leadId}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to delete lead');
    return data;
  },

  // Analytics
  async getAnalytics() {
    const res = await fetch(`${API_BASE}/admin/analytics`, {
      method: 'GET',
      headers: getHeaders(true),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch analytics');
    return data;
  },

  // Chatbot
  async sendChatMessage(message, sessionId) {
    const res = await fetch(`${API_BASE}/chat`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ message, session_id: sessionId }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Chat query failed');
    return data;
  },

  async escalateChat(escalationData) {
    const res = await fetch(`${API_BASE}/chat/escalate`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(escalationData),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Escalation failed');
    return data;
  },

  async getChatLogs(limit = 100) {
    const res = await fetch(`${API_BASE}/admin/chat-logs?limit=${limit}`, {
      method: 'GET',
      headers: getHeaders(true),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch chat logs');
    return data;
  },
};
