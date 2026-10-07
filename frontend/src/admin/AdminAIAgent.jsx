import React, { useState } from 'react';
import { 
  Bot, Sparkles, Search, Compass, RefreshCw, CheckCircle2, 
  ExternalLink, Building2, Factory, Zap, Shield, ArrowRight 
} from 'lucide-react';

export const AdminAIAgent = () => {
  const [scanning, setScanning] = useState(false);
  const [lastScanned, setLastScanned] = useState('2 hours ago');

  const simulatedProjects = [
    {
      id: 'uae-proj-101',
      title: 'Etihad ESCO — Federal Hospital Campus Cooling & Steam Retrofit',
      emirate: 'Dubai & Northern Emirates',
      entity: 'Etihad Energy Services (Etihad ESCO)',
      category: 'Healthcare & Public Infrastructure',
      contractValueAED: '14,200,000 AED',
      matchScore: 96,
      matchedExergyServices: ['Cooling optimization', 'Heating & steam', 'Water quality'],
      status: 'Open Tender / RFP',
      deadline: 'Nov 28, 2026',
      summary: 'Central chiller plant overhaul, low Delta-T syndrome remediation across 3 hospitals, and autoclave clean steam condensate loop integration.'
    },
    {
      id: 'uae-proj-102',
      title: 'KEZAD Food & Agro Industrial Zone — Evaporator Heat Recovery',
      emirate: 'Abu Dhabi (KEZAD)',
      entity: 'Al Ain Farms / Abu Dhabi Ports Logistics',
      category: 'Food & Beverage Processing',
      contractValueAED: '8,500,000 AED',
      matchScore: 94,
      matchedExergyServices: ['Process integration', 'Waste-heat recovery'],
      status: 'Techno-Economic Study',
      deadline: 'Dec 15, 2026',
      summary: 'Cross-process pinch analysis between dairy pasteurization effluent streams and milk powder spray drying air intake recuperation.'
    },
    {
      id: 'uae-proj-103',
      title: 'Dubai Industrial City — Paper Packaging Rotary Dryer Hood Recovery',
      emirate: 'Dubai Industrial City',
      entity: 'Gulf Kraft Paper Co.',
      category: 'Paper & Pulp Mills',
      contractValueAED: '5,800,000 AED',
      matchScore: 91,
      matchedExergyServices: ['Drying processes', 'Waste-heat recovery'],
      status: 'Private Bid Invitation',
      deadline: 'Dec 05, 2026',
      summary: 'Recuperation of moist exhaust air off 2 high-speed corrugating dryer hoods to cut natural gas firing by 22%.'
    },
    {
      id: 'uae-proj-104',
      title: 'Palm Jumeirah Luxury Resort — Laundry Water & DHW Heat Pump Retrofit',
      emirate: 'Dubai',
      entity: 'Master Developer Hospitality Asset Management',
      category: 'Hospitality & Resorts',
      contractValueAED: '4,100,000 AED',
      matchScore: 89,
      matchedExergyServices: ['Water quality', 'Cooling optimization'],
      status: 'Prequalification',
      deadline: 'Jan 10, 2027',
      summary: 'Chiller heat recovery to offset 100% of guest domestic hot water (DHW) gas boilers, paired with 40% commercial laundry water recycling.'
    }
  ];

  const handleRunScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setLastScanned('Just now');
    }, 1800);
  };

  return (
    <div className="space-y-8 max-w-6xl">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#30a66a] text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#30a66a]" />
            <span>Future AI Autonomous Capability Preview</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display">
            AI Lead & Project Opportunity Agent
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Autonomous multi-agent intelligence that monitors UAE industrial tenders, federal efficiency mandates, and matching commercial retrofits.
          </p>
        </div>

        <button
          onClick={handleRunScan}
          disabled={scanning}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0c758d] hover:bg-[#095f73] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all disabled:opacity-50 w-fit"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${scanning ? 'animate-spin' : ''}`} />
          <span>{scanning ? 'Scanning UAE Registries...' : 'Scan UAE Tenders'}</span>
        </button>
      </div>

      {/* Agent Status Banner */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#30a66a]">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-slate-900 text-sm">Agent Core: Exergy-Match-v1</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 text-[#30a66a] border border-emerald-200">
                  READY
                </span>
              </div>
              <p className="text-xs text-slate-500">Target Coverage: Abu Dhabi, Dubai, Sharjah, RAK Industrial Zones</p>
            </div>
          </div>

          <div className="text-xs text-slate-500">
            <span>Last automated crawler run: </span>
            <strong className="text-[#0c758d]">{lastScanned}</strong>
          </div>
        </div>

        {/* Monitored Portals */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-400 block text-[10px]">Portal</span>
            <span className="font-semibold text-slate-800">Etihad ESCO</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-400 block text-[10px]">Portal</span>
            <span className="font-semibold text-slate-800">DEWA Shams & Retrofit</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-400 block text-[10px]">Portal</span>
            <span className="font-semibold text-slate-800">MoIAT Industry 4.0</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-slate-400 block text-[10px]">Portal</span>
            <span className="font-semibold text-slate-800">KEZAD & JAFZA Zones</span>
          </div>
        </div>
      </div>

      {/* Matched Projects List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 font-display">
            AI-Matched High Probability UAE Opportunities ({simulatedProjects.length})
          </h2>
          <span className="text-xs text-slate-500">Filtered by &gt; 85% Exergy Solutions capability fit</span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {simulatedProjects.map((p) => (
            <div
              key={p.id}
              className="p-6 rounded-3xl bg-white border border-slate-200 hover:border-[#0c758d]/40 transition-all space-y-4 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#0c758d]">
                      {p.emirate}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="text-xs text-slate-500">{p.entity}</span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900">
                    {p.title}
                  </h3>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-auto">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 uppercase block font-semibold">Match Score</span>
                    <span className="text-sm font-extrabold text-[#30a66a] font-mono">
                      {p.matchScore}%
                    </span>
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900">
                    {p.contractValueAED}
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {p.summary}
              </p>

              <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-slate-400 text-[11px] mr-1">Matched Services:</span>
                  {p.matchedExergyServices.map((svc, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-2 py-0.5 rounded-md bg-[#0c758d]/10 text-[#0c758d] border border-[#0c758d]/20 text-[10px] font-semibold"
                    >
                      {svc}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 text-slate-500 text-[11px]">
                  <span>Status: <strong className="text-slate-800">{p.status}</strong></span>
                  <span>Deadline: <strong className="text-slate-800">{p.deadline}</strong></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap Note */}
      <div className="p-6 rounded-3xl bg-white border border-slate-200 text-xs text-slate-600 space-y-1 shadow-xs">
        <h4 className="font-bold text-slate-900">Autonomous Agent Roadmap</h4>
        <p>
          In the upcoming phase, this agent will automatically draft customized techno-commercial capability proposals, calculate expected exergy savings against tender terms of reference, and generate tender pre-qualification dossiers for the Exergy Solutions leadership team.
        </p>
      </div>

    </div>
  );
};
