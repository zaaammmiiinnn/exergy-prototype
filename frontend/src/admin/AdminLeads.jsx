import React, { useState, useEffect } from 'react';
import { 
  Users, Search, Filter, RefreshCw, Edit3, Trash2, CheckCircle2, 
  X, Phone, Mail, Calendar, MessageSquare, Download, AlertCircle 
} from 'lucide-react';
import { api } from '../api/client';

export const AdminLeads = () => {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  
  // Selected lead for modal inspection & edit
  const [selectedLead, setSelectedLead] = useState(null);
  const [editStatus, setEditStatus] = useState('');
  const [editNotes, setEditNotes] = useState('');
  const [saving, setSaving] = useState(false);

  const fetchLeads = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await api.getAdminLeads({
        search,
        status: statusFilter === 'All' ? '' : statusFilter,
      });
      setLeads(res.leads || []);
    } catch (err) {
      console.error('Fetch leads error:', err);
      setError(err.message || 'Failed to load leads table');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [statusFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchLeads();
  };

  const handleOpenModal = (lead) => {
    setSelectedLead(lead);
    setEditStatus(lead.status);
    setEditNotes(lead.notes || '');
  };

  const handleUpdateLead = async () => {
    if (!selectedLead) return;
    setSaving(true);
    try {
      const res = await api.updateLead(selectedLead.id, {
        status: editStatus,
        notes: editNotes,
      });
      // update state
      setLeads((prev) =>
        prev.map((l) => (l.id === selectedLead.id ? res.lead : l))
      );
      setSelectedLead(res.lead);
      alert('Lead successfully updated!');
    } catch (err) {
      alert(err.message || 'Failed to update lead');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteLead = async (leadId) => {
    if (!window.confirm(`Are you sure you want to delete lead #${leadId}?`)) return;
    try {
      await api.deleteLead(leadId);
      setLeads((prev) => prev.filter((l) => l.id !== leadId));
      if (selectedLead?.id === leadId) setSelectedLead(null);
    } catch (err) {
      alert(err.message || 'Failed to delete lead');
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) return;
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Reason', 'Source', 'Status', 'Notes', 'Created At'];
    const rows = leads.map(l => [
      l.id,
      `"${l.name}"`,
      `"${l.email}"`,
      `"${l.phone}"`,
      `"${l.reason_for_connecting}"`,
      `"${l.source}"`,
      `"${l.status}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`,
      `"${l.created_at}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `exergy_leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statusColors = {
    New: 'bg-emerald-50 text-[#30a66a] border-emerald-200',
    'In Review': 'bg-sky-50 text-sky-600 border-sky-200',
    Contacted: 'bg-amber-50 text-amber-600 border-amber-200',
    Qualified: 'bg-teal-50 text-teal-700 border-teal-200',
    Closed: 'bg-slate-100 text-slate-600 border-slate-200',
  };

  return (
    <div className="space-y-6">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            Lead Management & Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Review, qualify, and update contact form submissions and chatbot escalations.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold border border-slate-200 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={fetchLeads}
            disabled={loading}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0c758d] hover:bg-[#095f73] text-white text-xs font-bold transition-colors shadow-2xs"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
        <form onSubmit={handleSearchSubmit} className="w-full md:w-80 flex items-center gap-2">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search name, phone, email, reason..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-[#0c758d] text-slate-900 placeholder-slate-400 text-xs focus:outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold shrink-0"
          >
            Search
          </button>
        </form>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <span className="text-xs text-slate-500 shrink-0">Filter Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-xs focus:outline-none focus:border-[#0c758d]"
          >
            <option value="All">All Statuses ({leads.length})</option>
            <option value="New">New</option>
            <option value="In Review">In Review</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Closed">Closed</option>
          </select>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4">ID</th>
                <th className="py-3.5 px-4">Contact Person</th>
                <th className="py-3.5 px-4">Service / Reason</th>
                <th className="py-3.5 px-4">Source</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Submitted</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading && leads.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-500">
                    <RefreshCw className="w-5 h-5 animate-spin mx-auto mb-2 text-[#0c758d]" />
                    Loading leads...
                  </td>
                </tr>
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-500">
                    No leads found matching your search criteria.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                    onClick={() => handleOpenModal(lead)}
                  >
                    <td className="py-3.5 px-4 font-mono text-slate-400 font-bold">
                      #{lead.id}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 text-sm">{lead.name}</div>
                      <div className="text-[11px] text-slate-500 mt-0.5">
                        {lead.email} • {lead.phone}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">
                      {lead.reason_for_connecting}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        lead.source === 'Chatbot'
                          ? 'bg-emerald-50 text-[#30a66a] border border-emerald-200'
                          : 'bg-[#0c758d]/10 text-[#0c758d] border border-[#0c758d]/20'
                      }`}>
                        {lead.source}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border ${
                        statusColors[lead.status] || 'bg-slate-100 text-slate-700'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenModal(lead)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-[#0c758d] hover:text-white text-slate-600 transition-colors"
                          title="Inspect Lead"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-1.5 rounded-lg bg-slate-100 hover:bg-rose-600 hover:text-white text-slate-600 transition-colors"
                          title="Delete Lead"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Lead Inspection & Status Update */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[11px] font-mono text-[#0c758d] font-bold uppercase tracking-wider">
                  Lead Details #{selectedLead.id}
                </span>
                <h3 className="text-xl font-bold text-slate-900 font-display mt-0.5">
                  {selectedLead.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 flex items-center gap-1">
                  <Phone className="w-3 h-3 text-[#0c758d]" /> Phone
                </span>
                <a href={`tel:${selectedLead.phone}`} className="font-semibold text-slate-900 hover:underline block truncate">
                  {selectedLead.phone}
                </a>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500 flex items-center gap-1">
                  <Mail className="w-3 h-3 text-[#0c758d]" /> Email
                </span>
                <a href={`mailto:${selectedLead.email}`} className="font-semibold text-slate-900 hover:underline block truncate">
                  {selectedLead.email}
                </a>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500">Service Category</span>
                <span className="font-semibold text-slate-900 block truncate">
                  {selectedLead.reason_for_connecting}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="text-slate-500">Capture Source</span>
                <span className="font-semibold text-slate-900 block">
                  {selectedLead.source}
                </span>
              </div>
            </div>

            {/* Update Status and Notes Form */}
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Update Lead Pipeline Status
                </label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-[#0c758d]"
                >
                  <option value="New">New</option>
                  <option value="In Review">In Review</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Engineering Notes & Facility Data
                </label>
                <textarea
                  rows="4"
                  placeholder="Record call summary, plant specifications, or next audit date..."
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:bg-white focus:outline-none focus:border-[#0c758d] placeholder-slate-400 resize-none"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <span className="text-[11px] text-slate-500">
                Created: {new Date(selectedLead.created_at).toLocaleString()}
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium"
                >
                  Close
                </button>
                <button
                  type="button"
                  disabled={saving}
                  onClick={handleUpdateLead}
                  className="px-5 py-2 rounded-xl bg-[#0c758d] hover:bg-[#095f73] text-white font-bold text-xs transition-colors flex items-center gap-1.5 disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
