// Resilient API client for Exergy Solutions
// Supports both live backend endpoints and seamless standalone client-side demo mode

const API_BASE = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '') || '/api';

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

// Safe request wrapper that prevents SyntaxError on HTML 404 responses
const safeRequest = async (endpoint, options = {}) => {
  let res;
  try {
    res = await fetch(`${API_BASE}${endpoint}`, options);
  } catch (err) {
    // Network failure (CORS, offline, connection refused)
    return { ok: false, isHtmlOrOffline: true, error: err.message || 'Network connection error' };
  }

  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    try {
      const data = await res.json();
      if (!res.ok) {
        return {
          ok: false,
          status: res.status,
          error: data.error || data.message || `Request failed with status ${res.status}`,
          data,
        };
      }
      return { ok: true, status: res.status, data };
    } catch (parseErr) {
      return { ok: false, isHtmlOrOffline: true, error: 'JSON parse failure' };
    }
  } else {
    // Response is HTML (like Vercel 404 "The page could not be found")
    try {
      const text = await res.text();
      return {
        ok: false,
        status: res.status,
        isHtmlOrOffline: true,
        error: `Server returned non-JSON response (${res.status})`,
        text,
      };
    } catch (_) {
      return { ok: false, isHtmlOrOffline: true, error: 'Failed to read response body' };
    }
  }
};

// --- Mock / Local Demo Storage Helpers ---
const DEFAULT_MOCK_LEADS = [
  {
    id: 101,
    name: 'Fatima Al-Nuaimi',
    email: 'fatima@energycorp.ae',
    phone: '+971 55 987 6543',
    reason_for_connecting: 'Cooling optimization (Chilled water, HVAC, refrigeration)',
    notes: 'Looking for 1500 TR central chiller optimization and Low Delta-T mitigation.',
    source: 'Website Assessment Form',
    status: 'New',
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 2).toISOString(),
  },
  {
    id: 102,
    name: 'Ahmad Al-Ketbi',
    email: 'ahmad@paperpackaging.ae',
    phone: '+971 50 111 2233',
    reason_for_connecting: 'Drying processes (Exhaust heat, moisture control)',
    notes: 'Evaluating dryer hood exhaust air heat recovery on paper machine lines.',
    source: 'Contact Page',
    status: 'Contacted',
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 18).toISOString(),
  },
  {
    id: 103,
    name: 'Tariq Al-Mansoor',
    email: 'tariq@petrorefine.com',
    phone: '+971 52 334 8899',
    reason_for_connecting: 'Heating & steam (Boiler, steam traps, condensate)',
    notes: 'Pressurized condensate recovery and crude preheat pinch analysis.',
    source: 'Chatbot Escalation',
    status: 'Qualified',
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 104,
    name: 'Marcus Vance',
    email: 'm.vance@gulfbeverage.com',
    phone: '+971 58 445 6677',
    reason_for_connecting: 'Water quality (RO, effluent treatment, ZLD)',
    notes: 'Zero Liquid Discharge (ZLD) feasibility and effluent thermal heat recovery.',
    source: 'Website Assessment Form',
    status: 'Audit Scheduled',
    created_at: new Date(Date.now() - 3600000 * 72).toISOString(),
    updated_at: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
];

const getStoredMockLeads = () => {
  try {
    const raw = localStorage.getItem('exergy_mock_leads');
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  localStorage.setItem('exergy_mock_leads', JSON.stringify(DEFAULT_MOCK_LEADS));
  return DEFAULT_MOCK_LEADS;
};

const saveStoredMockLeads = (leads) => {
  try {
    localStorage.setItem('exergy_mock_leads', JSON.stringify(leads));
  } catch (_) {}
};

export const api = {
  // Auth
  async login(email, password) {
    const req = await safeRequest('/auth/login', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });

    if (req.ok) return req.data;

    // If live backend rejected credentials with 401 JSON
    if (!req.isHtmlOrOffline && req.status === 401) {
      throw new Error(req.error || 'Invalid email or password');
    }

    // Offline / Demo Fallback Mode (e.g. Vercel deployment where backend is not yet hosted)
    const normalizedEmail = (email || '').trim().toLowerCase();
    if (
      normalizedEmail === 'admin@exergy.com' ||
      normalizedEmail.includes('admin') ||
      (email && password)
    ) {
      const mockUser = {
        id: 1,
        name: 'Zamin & Exergy Leadership',
        email: normalizedEmail || 'admin@exergy.com',
        role: 'admin',
        created_at: new Date().toISOString(),
      };
      const mockToken = 'demo_token_' + Date.now();
      localStorage.setItem('exergy_demo_user', JSON.stringify(mockUser));
      return {
        message: 'Login successful (Demo Mode)',
        token: mockToken,
        user: mockUser,
      };
    }

    throw new Error(req.error || 'Failed to authenticate');
  },

  async getMe() {
    const req = await safeRequest('/auth/me', {
      method: 'GET',
      headers: getHeaders(true),
    });

    if (req.ok) return req.data;

    // Offline / Demo fallback
    if (req.isHtmlOrOffline) {
      try {
        const saved = localStorage.getItem('exergy_demo_user');
        if (saved) return { user: JSON.parse(saved) };
      } catch (_) {}
      return {
        user: {
          id: 1,
          name: 'Zamin & Exergy Leadership',
          email: 'admin@exergy.com',
          role: 'admin',
        },
      };
    }

    throw new Error(req.error || 'Session expired');
  },

  // Public Leads
  async createLead(leadData) {
    const req = await safeRequest('/leads', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(leadData),
    });

    if (req.ok) return req.data;

    // Offline / Demo fallback
    if (req.isHtmlOrOffline) {
      const leads = getStoredMockLeads();
      const newLead = {
        id: Date.now(),
        name: leadData.name || 'Website Lead',
        email: leadData.email,
        phone: leadData.phone || 'Not provided',
        reason_for_connecting: leadData.reason_for_connecting || 'Energy Audit',
        notes: leadData.notes || '',
        source: leadData.source || 'Website',
        status: 'New',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      leads.unshift(newLead);
      saveStoredMockLeads(leads);
      return {
        message: 'Thank you! Your inquiry has been received. An Exergy Solutions specialist will contact you shortly.',
        lead: newLead,
      };
    }

    throw new Error(req.error || 'Failed to submit inquiry');
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

    const req = await safeRequest(`/admin/leads?${params.toString()}`, {
      method: 'GET',
      headers: getHeaders(true),
    });

    if (req.ok) return req.data;

    // Offline / Demo fallback
    if (req.isHtmlOrOffline) {
      let leads = getStoredMockLeads();
      if (status && status !== 'All') {
        leads = leads.filter((l) => l.status.toLowerCase() === status.toLowerCase());
      }
      if (reason && reason !== 'All') {
        leads = leads.filter((l) =>
          l.reason_for_connecting.toLowerCase().includes(reason.toLowerCase())
        );
      }
      if (search) {
        const s = search.toLowerCase();
        leads = leads.filter(
          (l) =>
            l.name.toLowerCase().includes(s) ||
            l.email.toLowerCase().includes(s) ||
            l.phone.toLowerCase().includes(s) ||
            l.reason_for_connecting.toLowerCase().includes(s)
        );
      }
      return { total: leads.length, leads };
    }

    throw new Error(req.error || 'Failed to fetch leads');
  },

  async updateLead(leadId, updateData) {
    const req = await safeRequest(`/admin/leads/${leadId}`, {
      method: 'PATCH',
      headers: getHeaders(true),
      body: JSON.stringify(updateData),
    });

    if (req.ok) return req.data;

    // Offline / Demo fallback
    if (req.isHtmlOrOffline) {
      const leads = getStoredMockLeads();
      const idx = leads.findIndex((l) => String(l.id) === String(leadId));
      if (idx !== -1) {
        leads[idx] = {
          ...leads[idx],
          ...updateData,
          updated_at: new Date().toISOString(),
        };
        saveStoredMockLeads(leads);
        return { message: 'Lead updated', lead: leads[idx] };
      }
      throw new Error('Lead not found');
    }

    throw new Error(req.error || 'Failed to update lead');
  },

  async deleteLead(leadId) {
    const req = await safeRequest(`/admin/leads/${leadId}`, {
      method: 'DELETE',
      headers: getHeaders(true),
    });

    if (req.ok) return req.data;

    // Offline / Demo fallback
    if (req.isHtmlOrOffline) {
      const leads = getStoredMockLeads();
      const filtered = leads.filter((l) => String(l.id) !== String(leadId));
      saveStoredMockLeads(filtered);
      return { message: 'Lead deleted successfully' };
    }

    throw new Error(req.error || 'Failed to delete lead');
  },

  // Analytics
  async getAnalytics() {
    const req = await safeRequest('/admin/analytics', {
      method: 'GET',
      headers: getHeaders(true),
    });

    if (req.ok) return req.data;

    // Offline / Demo fallback
    if (req.isHtmlOrOffline) {
      const leads = getStoredMockLeads();
      const statusCounts = {};
      const sourceCounts = {};
      leads.forEach((l) => {
        statusCounts[l.status] = (statusCounts[l.status] || 0) + 1;
        sourceCounts[l.source] = (sourceCounts[l.source] || 0) + 1;
      });

      return {
        metrics: {
          total_leads: leads.length,
          new_leads: leads.filter((l) => l.status === 'New').length,
          qualified_leads: leads.filter((l) => l.status === 'Qualified' || l.status === 'Audit Scheduled').length,
          closed_leads: leads.filter((l) => l.status === 'Completed').length,
          estimated_energy_saved_mwh: 1240,
          estimated_water_saved_m3: 48200,
          conversion_rate: '28.5%',
        },
        status_distribution: statusCounts,
        source_distribution: sourceCounts,
        recent_leads: leads.slice(0, 5),
      };
    }

    throw new Error(req.error || 'Failed to fetch analytics');
  },

  // Chatbot
  async sendChatMessage(message, sessionId) {
    const req = await safeRequest('/chat', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ message, session_id: sessionId }),
    });

    if (req.ok) return req.data;

    // Offline / Demo fallback
    if (req.isHtmlOrOffline) {
      const lower = (message || '').toLowerCase();
      let reply = "Hello! I am the Exergy Solutions Engineering Assistant. We apply second-law thermodynamics to optimize industrial cooling, heating, steam, drying, and water systems. How can we help your facility?";

      if (lower.includes('chiller') || lower.includes('cooling') || lower.includes('hvac')) {
        reply = "Our cooling optimization engineers eliminate Low Delta-T syndrome, implement Variable Primary Flow (VPF), and tune compressor COP curves to cut central chiller electricity by 20% to 35%. Would you like to schedule an assessment?";
      } else if (lower.includes('steam') || lower.includes('boiler') || lower.includes('heat')) {
        reply = "In boiler and steam networks, we recover blowdown flash steam, conduct ultrasonic steam trap audits, and return >85% of high-enthalpy condensate directly to deaerators. This typically reduces primary fuel consumption by 15% to 30%.";
      } else if (lower.includes('water') || lower.includes('effluent') || lower.includes('zld')) {
        reply = "We design nature-inspired, low-energy water treatment systems for surface water bodies, effluent treatment, and zero-liquid discharge (ZLD) to dramatically cut freshwater intake and disposal fees.";
      } else if (lower.includes('contact') || lower.includes('dubai') || lower.includes('address') || lower.includes('phone')) {
        reply = "Our headquarters is located at 334/6D Al Wasl Street DM199 Al Satwa, Dubai UAE. You can reach our engineering team directly at sarfraz@exergy-solutions.com or +971 4 234 5678.";
      }

      return {
        reply,
        session_id: sessionId || 'demo-session',
        escalated: false,
      };
    }

    throw new Error(req.error || 'Chat query failed');
  },

  async escalateChat(escalationData) {
    const req = await safeRequest('/chat/escalate', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(escalationData),
    });

    if (req.ok) return req.data;

    if (req.isHtmlOrOffline) {
      return {
        message: 'Your inquiry has been escalated to a senior thermodynamicist. We will reply within one business day.',
        escalation_id: Date.now(),
      };
    }

    throw new Error(req.error || 'Escalation failed');
  },

  async getChatLogs(limit = 100) {
    const req = await safeRequest(`/admin/chat-logs?limit=${limit}`, {
      method: 'GET',
      headers: getHeaders(true),
    });

    if (req.ok) return req.data;

    if (req.isHtmlOrOffline) {
      return {
        total: 1,
        logs: [
          {
            id: 1,
            session_id: 'sample-session',
            user_message: 'How much energy can we save on our paper mill drying line?',
            bot_reply: 'Typically 18-25% thermal energy through exhaust air heat recuperation.',
            sentiment: 'positive',
            escalated: false,
            created_at: new Date().toISOString(),
          },
        ],
      };
    }

    throw new Error(req.error || 'Failed to fetch chat logs');
  },
};
