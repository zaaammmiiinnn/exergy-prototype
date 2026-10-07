import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, MessageSquare, Bot, TrendingUp, CheckCircle, Clock, 
  ArrowRight, RefreshCw, AlertCircle, Sparkles, Filter 
} from 'lucide-react';
import { api } from '../api/client';

export const AdminDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAnalytics = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.getAnalytics();
      setData(res);
    } catch (err) {
      console.error('Analytics fetch error:', err);
      setError(err.message || 'Failed to fetch analytics data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  if (loading && !data) {
    return (
      <div className="flex items-center justify-center py-20 text-slate-500">
        <RefreshCw className="w-5 h-5 animate-spin text-[#0c758d] mr-2" />
        <span>Loading Exergy Solutions Analytics...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-sm space-y-3">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-5 h-5" />
          <span>{error}</span>
        </div>
        <button
          onClick={fetchAnalytics}
          className="px-4 py-2 bg-rose-600 text-white font-semibold rounded-lg text-xs"
        >
          Retry
        </button>
      </div>
    );
  }

  const m = data?.metrics || {};
  const statusDist = data?.status_distribution || {};
  const sourceDist = data?.source_distribution || {};
  const reasonDist = data?.reason_distribution || {};
  const recentLeads = data?.recent_leads || [];

  return (
    <div className="space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Operational Analytics Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Real-time telemetry on captured client inquiries, chatbot sessions, and engineering escalations.
          </p>
        </div>

        <button
          onClick={fetchAnalytics}
          disabled={loading}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors w-fit shadow-2xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-[#0c758d] ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Metrics</span>
        </button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Total Leads */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Total Leads</span>
            <Users className="w-4 h-4 text-[#0c758d]" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-display">
            {m.total_leads || 0}
          </div>
          <div className="text-[11px] text-[#0c758d] flex items-center gap-1 font-medium">
            <span>{m.new_leads || 0} awaiting engineering review</span>
          </div>
        </div>

        {/* AI Chatbot Sessions */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">AI Chat Sessions</span>
            <Bot className="w-4 h-4 text-[#30a66a]" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-display">
            {m.total_chat_sessions || 0}
          </div>
          <div className="text-[11px] text-slate-500">
            {m.total_chat_messages || 0} total queries handled by RAG
          </div>
        </div>

        {/* Escalated Sessions */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Agent Escalations</span>
            <MessageSquare className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-display">
            {m.escalated_sessions || 0}
          </div>
          <div className="text-[11px] text-cyan-600 font-medium">
            High-intent visitor escalations
          </div>
        </div>

        {/* Conversion Rate */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-semibold uppercase tracking-wider">Lead Qualification Rate</span>
            <TrendingUp className="w-4 h-4 text-[#30a66a]" />
          </div>
          <div className="text-3xl font-extrabold text-slate-900 font-display">
            {m.conversion_rate_percent || 0}%
          </div>
          <div className="text-[11px] text-slate-500">
            Qualified & closed proposals
          </div>
        </div>

      </div>

      {/* Charts & Breakdown Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Inquiries by Service / Reason */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Inquiries by Service & Technology
            </h3>
            <span className="text-xs text-slate-400">Breakdown</span>
          </div>

          <div className="space-y-3">
            {Object.entries(reasonDist).length === 0 ? (
              <p className="text-xs text-slate-500">No categorized inquiries yet.</p>
            ) : (
              Object.entries(reasonDist).map(([reason, count]) => {
                const percent = m.total_leads ? Math.round((count / m.total_leads) * 100) : 0;
                return (
                  <div key={reason} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-700 font-medium">{reason}</span>
                      <span className="text-[#0c758d] font-semibold">{count} ({percent}%)</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className="h-full bg-[#0c758d] rounded-full"
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Lead Sources & Pipeline Status */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 font-display">
              Pipeline Stage Distribution
            </h3>
            <span className="text-xs text-slate-400">Status</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {['New', 'In Review', 'Contacted', 'Qualified', 'Closed'].map((status) => {
              const count = statusDist[status] || 0;
              return (
                <div key={status} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1">
                  <div className="text-xs text-slate-500 font-medium">{status}</div>
                  <div className="text-xl font-bold text-slate-900">{count}</div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-700 mb-2">Acquisition Sources</div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#0c758d]" />
                <span className="text-slate-600">Contact Form: {sourceDist['Contact Form'] || 0}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#30a66a]" />
                <span className="text-slate-600">AI Chatbot: {sourceDist['Chatbot'] || 0}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Recent Leads Feed */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900 font-display">
              Recent Inquiries & Escalations
            </h3>
            <p className="text-xs text-slate-500">Latest leads captured across website touchpoints</p>
          </div>
          <Link
            to="/admin/leads"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0c758d] hover:text-[#095f73] transition-colors"
          >
            <span>View Full Lead Table</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="pb-3 font-semibold">Lead Contact</th>
                <th className="pb-3 font-semibold">Service / Reason</th>
                <th className="pb-3 font-semibold">Source</th>
                <th className="pb-3 font-semibold">Status</th>
                <th className="pb-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-50">
                  <td className="py-3">
                    <div className="font-semibold text-slate-900">{lead.name}</div>
                    <div className="text-[11px] text-slate-500">{lead.email} • {lead.phone}</div>
                  </td>
                  <td className="py-3 text-slate-700 font-medium">
                    {lead.reason_for_connecting}
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      lead.source === 'Chatbot'
                        ? 'bg-emerald-50 text-[#30a66a] border border-emerald-200'
                        : 'bg-[#0c758d]/10 text-[#0c758d] border border-[#0c758d]/20'
                    }`}>
                      {lead.source}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {lead.status}
                    </span>
                  </td>
                  <td className="py-3 text-slate-500 text-[11px]">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
