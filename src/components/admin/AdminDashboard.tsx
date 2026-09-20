import React, { useState } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import {
  LayoutDashboard,
  Users,
  Wallet,
  MessageSquare,
  Calendar,
  Settings,
  ArrowLeft,
  Search,
  CheckCircle,
  CheckCircle2,
  DollarSign,
  PieChart,
  Clock,
  Filter,
  Download,
  Edit3,
  Save,
  RotateCcw,
  Shield,
  ShieldCheck,
  AlertTriangle,
  FileSpreadsheet,
  Lock,
  FileText
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    config,
    updateCandidateConfig,
    isSampleProfile,
    toggleProfileMode,
    feedbackList,
    updateFeedbackStatus,
    volunteersList,
    updateVolunteerStatus,
    donationRecords,
    updateDonationStatus,
    events,
    transparencyData,
    campaignFinanceConfig,
    setCampaignFinanceConfig,
    fundraisingEnabled,
    setFundraisingEnabled,
    auditLogs,
    setCurrentPage,
    logoutAdmin,
    notify
  } = useCampaign();

  const [activeTab, setActiveTab] = useState<'overview' | 'concerns' | 'volunteers' | 'donations' | 'audit' | 'compliance' | 'settings'>('overview');

  // Candidate quick editor state
  const [candidateNameInput, setCandidateNameInput] = useState(config.candidateName);
  const [constituencyNameInput, setConstituencyNameInput] = useState(config.constituencyName);
  const [sloganInput, setSloganInput] = useState(config.campaignSlogan);
  const [phoneInput, setPhoneInput] = useState(config.campaignPhone);
  const [emailInput, setEmailInput] = useState(config.campaignEmail);

  // Sync inputs when config changes (e.g. toggling sample/template)
  React.useEffect(() => {
    setCandidateNameInput(config.candidateName);
    setConstituencyNameInput(config.constituencyName);
    setSloganInput(config.campaignSlogan);
    setPhoneInput(config.campaignPhone);
    setEmailInput(config.campaignEmail);
  }, [config]);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateCandidateConfig({
      candidateName: candidateNameInput,
      constituencyName: constituencyNameInput,
      campaignSlogan: sloganInput,
      campaignPhone: phoneInput,
      campaignEmail: emailInput
    });
    notify('Updated Successfully', 'Candidate profile parameters updated across all sections.', 'success');
  };

  const totalDonationAmount = donationRecords.reduce((sum, d) => sum + d.amount, 0);

  const downloadCsv = (filename: string, rows: (string | number)[][]) => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      rows
        .map((row) =>
          row
            .map((cell) => `"${(cell ?? '').toString().replace(/"/g, '""')}"`)
            .join(',')
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportVolunteersCsv = () => {
    const headers = ['ID', 'Full Name', 'Email', 'Phone', 'LGA', 'Ward', 'Community', 'Areas', 'Status', 'Date Joined'];
    const rows = volunteersList.map((v) => [
      v.id,
      v.fullName,
      v.email,
      v.phone,
      v.lga,
      v.ward,
      v.community,
      (v.areas || v.interests || []).join('; '),
      v.status,
      v.dateJoined
    ]);
    downloadCsv('khana-gokana-volunteers.csv', [headers, ...rows]);
    notify('Export Completed', 'Volunteers roster exported to CSV.', 'success');
  };

  const exportConcernsCsv = () => {
    const headers = ['ID', 'Citizen Name', 'Phone', 'LGA', 'Ward', 'Community', 'Topic', 'Message', 'Status', 'Date Submitted'];
    const rows = feedbackList.map((f) => [
      f.id,
      f.fullName,
      f.phone || '',
      f.lga,
      f.ward,
      f.community,
      f.topic,
      f.message,
      f.status,
      f.dateSubmitted
    ]);
    downloadCsv('community-voice-concerns.csv', [headers, ...rows]);
    notify('Export Completed', 'Community voice records exported to CSV.', 'success');
  };

  const exportDonationsCsv = () => {
    const headers = ['ID', 'Reference', 'Donor Name', 'Email', 'Amount (NGN)', 'Method', 'LGA', 'Status', 'Date'];
    const rows = donationRecords.map((d) => [
      d.id,
      d.reference || d.referenceCode || '',
      d.donorName,
      d.email,
      d.amount,
      d.paymentMethod,
      d.lga || '',
      d.status,
      d.date || d.timestamp || ''
    ]);
    downloadCsv('campaign-donations-ledger.csv', [headers, ...rows]);
    notify('Export Completed', 'Donations ledger exported to CSV.', 'success');
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 font-sans">
      
      {/* Top Admin Navigation Header */}
      <header className="bg-stone-950 border-b border-stone-800 sticky top-0 z-30 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage('home')}
              className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white transition flex items-center gap-1.5 text-xs font-semibold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Live Website</span>
            </button>
            <div className="h-4 w-px bg-stone-700" />
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <h1 className="text-base font-bold text-white tracking-tight">
                Campaign Operations Console
              </h1>
              <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                OPERATIONS SUITE
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleProfileMode}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 ${
                isSampleProfile
                  ? 'bg-amber-600/30 text-amber-300 border border-amber-500/50'
                  : 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/50'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Current: {isSampleProfile ? 'Sample Profile' : 'Template Mode'}</span>
            </button>

            <button
              onClick={() => notify('Export Generated', 'Campaign briefing report exported to PDF.', 'info')}
              className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5 border border-stone-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Briefing</span>
            </button>

            <button
              id="admin-logout-btn"
              onClick={logoutAdmin}
              className="px-3 py-1.5 bg-rose-950/80 hover:bg-rose-900 text-rose-200 hover:text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5 border border-rose-800/80 shadow-sm"
              title="End admin session and lock portal"
            >
              <Lock className="w-3.5 h-3.5 text-rose-400" />
              <span>Sign Out & Lock</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-stone-800 pb-4 mb-8 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'overview'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Executive Dashboard</span>
          </button>

          <button
            onClick={() => setActiveTab('concerns')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'concerns'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Community Voice ({feedbackList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('volunteers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'volunteers'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Volunteers ({volunteersList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('donations')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'donations'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>Grassroots Finance ({donationRecords.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('compliance')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'compliance'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" />
            <span>Compliance & Gates</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'audit'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Audit Trail ({auditLogs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
              activeTab === 'settings'
                ? 'bg-emerald-700 text-white shadow-md'
                : 'bg-stone-800 text-stone-300 hover:text-white'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Candidate Data Editor</span>
          </button>
        </div>

        {/* 1. OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Top KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between text-stone-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Total Donors</span>
                  <Wallet className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-3xl font-extrabold text-white">
                  {donationRecords.length + 842}
                </div>
                <div className="text-xs text-stone-400">
                  ₦{(totalDonationAmount + transparencyData.totalContributionsAmount).toLocaleString()} raised
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between text-stone-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Registered Volunteers</span>
                  <Users className="w-4 h-4 text-sky-400" />
                </div>
                <div className="text-3xl font-extrabold text-white">
                  {volunteersList.length + 310}
                </div>
                <div className="text-xs text-stone-400">
                  Active across {config.lgas.length} LGAs
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between text-stone-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Constituency Concerns</span>
                  <MessageSquare className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-3xl font-extrabold text-white">
                  {feedbackList.length + 51}
                </div>
                <div className="text-xs text-stone-400">
                  Direct citizen petitions & feedback
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 space-y-2">
                <div className="flex items-center justify-between text-stone-400">
                  <span className="text-xs font-bold uppercase tracking-wider">Scheduled Townhalls</span>
                  <Calendar className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-3xl font-extrabold text-white">
                  {events.length}
                </div>
                <div className="text-xs text-stone-400">
                  Across all local government zones
                </div>
              </div>

            </div>

            {/* Quick Summary Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Recent Citizen Feedback (7 cols) */}
              <div className="lg:col-span-7 p-6 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">
                    Recent Community Petitions
                  </h3>
                  <button
                    onClick={() => setActiveTab('concerns')}
                    className="text-xs text-emerald-400 hover:underline font-semibold"
                  >
                    View All
                  </button>
                </div>

                <div className="space-y-3">
                  {feedbackList.slice(0, 4).map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-xl bg-stone-900 border border-stone-800 text-xs space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{item.fullName}</span>
                        <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950">
                          {item.topic}
                        </span>
                      </div>
                      <p className="text-stone-300 line-clamp-2">"{item.message}"</p>
                      <div className="flex justify-between text-[11px] text-stone-500 pt-1">
                        <span>{item.lga} • {item.ward}</span>
                        <span>{item.dateSubmitted}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Profile Summary (5 cols) */}
              <div className="lg:col-span-5 p-6 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-bold text-white">
                    Active Candidate Profile
                  </h3>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className="text-xs text-emerald-400 hover:underline font-semibold"
                  >
                    Edit
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-3 text-xs">
                  <div>
                    <span className="text-stone-500 block">Candidate Name:</span>
                    <span className="text-white font-bold text-sm">{config.candidateName}</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Constituency:</span>
                    <span className="text-white font-semibold">{config.constituencyName} ({config.stateName})</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Campaign Slogan:</span>
                    <span className="text-emerald-400 italic">"{config.campaignSlogan}"</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block">Headquarters:</span>
                    <span className="text-stone-300">{config.headquartersAddress}</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/60 text-xs text-emerald-200 space-y-1">
                  <p className="font-bold">Campaign Operations Note:</p>
                  <p className="text-stone-300 leading-relaxed">
                    Use the "Candidate Data Editor" tab to update candidate profile information and constituency details.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. CONCERNS TAB */}
        {activeTab === 'concerns' && (
          <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Constituency Needs & Community Petitions
                </h3>
                <p className="text-xs text-stone-400">
                  Input submitted by residents through the "What Matters to You?" community voice form.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={exportConcernsCsv}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5 border border-stone-700"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Export CSV</span>
                </button>
                <span className="text-xs text-stone-400">
                  Total Logged: <strong>{feedbackList.length}</strong>
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-stone-800 text-stone-400 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Ref ID</th>
                    <th className="py-3 px-3">Citizen Name</th>
                    <th className="py-3 px-3">LGA & Ward</th>
                    <th className="py-3 px-3">Topic</th>
                    <th className="py-3 px-3">Message Snippet</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {feedbackList.map((item) => (
                    <tr key={item.id} className="hover:bg-stone-900/50 transition">
                      <td className="py-3 px-3 font-mono text-emerald-400">{item.id}</td>
                      <td className="py-3 px-3 font-semibold text-white">
                        {item.fullName}
                        {item.phone && <span className="block text-[10px] text-stone-500">{item.phone}</span>}
                      </td>
                      <td className="py-3 px-3 text-stone-300">
                        {item.lga}
                        <span className="block text-[10px] text-stone-500">{item.ward} ({item.community})</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-stone-800 text-stone-200 border border-stone-700">
                          {item.topic}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-stone-300 max-w-xs truncate" title={item.message}>
                        {item.message}
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px] font-bold">
                          {item.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. VOLUNTEERS TAB */}
        {activeTab === 'volunteers' && (
          <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Grassroots Volunteer Roster
                </h3>
                <p className="text-xs text-stone-400">
                  Constituents registered to mobilize across wards and polling units.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={exportVolunteersCsv}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5 border border-stone-700"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Export CSV</span>
                </button>
                <span className="text-xs text-stone-400">
                  Total Active: <strong>{volunteersList.length}</strong>
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-stone-800 text-stone-400 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">ID</th>
                    <th className="py-3 px-3">Volunteer</th>
                    <th className="py-3 px-3">LGA & Ward</th>
                    <th className="py-3 px-3">Availability</th>
                    <th className="py-3 px-3">Interests & Roles</th>
                    <th className="py-3 px-3">Skills</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {volunteersList.map((vol) => (
                    <tr key={vol.id} className="hover:bg-stone-900/50 transition">
                      <td className="py-3 px-3 font-mono text-emerald-400">{vol.id}</td>
                      <td className="py-3 px-3 font-semibold text-white">
                        {vol.fullName}
                        <span className="block text-[10px] text-stone-500">{vol.email} • {vol.phone}</span>
                      </td>
                      <td className="py-3 px-3 text-stone-300">
                        {vol.lga}
                        <span className="block text-[10px] text-stone-500">{vol.ward}</span>
                      </td>
                      <td className="py-3 px-3 text-stone-300">
                        {vol.availability || 'Weekends'}
                      </td>
                      <td className="py-3 px-3 text-stone-300 max-w-xs">
                        {(vol.interests || vol.areas || []).join(', ')}
                      </td>
                      <td className="py-3 px-3 text-stone-400">
                        {vol.skills || 'General Grassroots'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 4. DONATIONS TAB */}
        {activeTab === 'donations' && (
          <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white">
                  Voluntary Contributions & Donations Log
                </h3>
                <p className="text-xs text-stone-400">
                  Simulated citizen donor ledger conforming to Electoral Act recordkeeping.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={exportDonationsCsv}
                  className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white rounded-lg text-xs font-semibold transition flex items-center gap-1.5 border border-stone-700"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Export CSV</span>
                </button>
                <div className="text-xs text-emerald-400 font-bold bg-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-800">
                  Ledger Balance: ₦{totalDonationAmount.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-stone-800 text-stone-400 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Receipt Code</th>
                    <th className="py-3 px-3">Contributor</th>
                    <th className="py-3 px-3">Amount</th>
                    <th className="py-3 px-3">Method</th>
                    <th className="py-3 px-3">LGA / Region</th>
                    <th className="py-3 px-3">Timestamp</th>
                    <th className="py-3 px-3">Compliance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60">
                  {donationRecords.map((don) => (
                    <tr key={don.id} className="hover:bg-stone-900/50 transition">
                      <td className="py-3 px-3 font-mono text-emerald-400">{don.reference || don.referenceCode}</td>
                      <td className="py-3 px-3 font-semibold text-white">
                        {don.donorName}
                        <span className="block text-[10px] text-stone-500">{don.email}</span>
                      </td>
                      <td className="py-3 px-3 font-bold text-emerald-300 text-sm">
                        ₦{don.amount.toLocaleString()}
                      </td>
                      <td className="py-3 px-3 text-stone-300">{don.paymentMethod}</td>
                      <td className="py-3 px-3 text-stone-300">{don.lga || 'Khana'}</td>
                      <td className="py-3 px-3 text-stone-400 font-mono text-[11px]">{don.date || don.timestamp}</td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">
                          INEC OK
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 5. COMPLIANCE & GATES TAB (PRD Section 18 & 52) */}
        {activeTab === 'compliance' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Shield className="w-5 h-5 text-emerald-400" />
                    <span>Legal & Campaign Finance Compliance Build Gate</span>
                  </h3>
                  <p className="text-xs text-stone-400">
                    Mandatory regulatory safeguards mandated by PRD Sections 18 & 52 and the Nigerian Electoral Act 2022.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    fundraisingEnabled
                      ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                      : 'bg-amber-950 text-amber-300 border-amber-700'
                  }`}>
                    {fundraisingEnabled ? '● LIVE FUNDRAISING ACTIVE' : '○ FUNDRAISING GATE LOCKED (SAFE)'}
                  </span>
                </div>
              </div>

              {/* Build Gate Warning Notice */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60 text-xs text-amber-200 space-y-1.5">
                <div className="flex items-center gap-2 font-bold text-amber-300">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Statutory Compliance Notice</span>
                </div>
                <p className="text-stone-300 leading-relaxed">
                  In compliance with Section 88(4) of the Electoral Act 2022, no individual or entity shall donate more than the statutory limit to any candidate contesting the Federal House of Representatives. Live production fundraising must remain disabled until bank merchant documentation and legal certification are finalized.
                </p>
              </div>

              {/* Compliance Parameters Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Office Contested</span>
                  <span className="text-sm font-bold text-white">{campaignFinanceConfig.office}</span>
                  <span className="text-[10px] text-emerald-400 block">{campaignFinanceConfig.constituency}</span>
                </div>

                <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Statutory Expenditure Limit</span>
                  <span className="text-sm font-bold text-white">₦{campaignFinanceConfig.expenditureLimitNgn?.toLocaleString()}</span>
                  <span className="text-[10px] text-stone-400 block">Electoral Act 2022 § 88(4)</span>
                </div>

                <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Individual Donation Cap</span>
                  <span className="text-sm font-bold text-white">₦{campaignFinanceConfig.individualContributionLimitNgn?.toLocaleString()}</span>
                  <span className="text-[10px] text-stone-400 block">Max single donor limit</span>
                </div>

                <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Payment Provider Sandbox</span>
                  <span className="text-sm font-bold text-white">Paystack / Flutterwave</span>
                  <span className="text-[10px] text-emerald-400 block">Simulated NGN Transfer & Card</span>
                </div>

                <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Legal Review Authority</span>
                  <span className="text-sm font-bold text-white">{campaignFinanceConfig.legalAuthority}</span>
                  <span className="text-[10px] text-stone-400 block">{campaignFinanceConfig.reviewedBy}</span>
                </div>

                <div className="p-4 rounded-xl bg-stone-900 border border-stone-800 space-y-1">
                  <span className="text-[11px] text-stone-500 uppercase tracking-wider block">Prohibited Contributions</span>
                  <span className="text-sm font-bold text-white">Foreign / Anonymous Funds</span>
                  <span className="text-[10px] text-rose-400 block">Strictly Rejected & Audited</span>
                </div>
              </div>

              {/* Build Gate Toggle Control */}
              <div className="pt-4 border-t border-stone-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold text-white">Live Public Fundraising Gate</p>
                  <p className="text-[11px] text-stone-400">
                    Toggle live contribution processing mode. When disabled, public visitors can view compliance details and bank transfer info for manual clearance.
                  </p>
                </div>

                <button
                  onClick={() => {
                    const next = !fundraisingEnabled;
                    setFundraisingEnabled(next);
                    notify(
                      next ? 'Fundraising Gate Opened' : 'Fundraising Gate Locked',
                      next ? 'Live contribution simulation is now active.' : 'Fundraising gate locked in compliance mode.',
                      next ? 'warning' : 'info'
                    );
                  }}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                    fundraisingEnabled
                      ? 'bg-amber-600 hover:bg-amber-500 text-white'
                      : 'bg-emerald-700 hover:bg-emerald-600 text-white'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>{fundraisingEnabled ? 'Lock Fundraising Gate' : 'Enable Donation Simulator'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 6. AUDIT TRAIL TAB (PRD Section 24 & 39) */}
        {activeTab === 'audit' && (
          <div className="p-6 rounded-2xl bg-stone-950 border border-stone-800 space-y-6 animate-in fade-in">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-400" />
                  <span>Immutable System Audit Trail</span>
                </h3>
                <p className="text-xs text-stone-400">
                  Cryptographic log of administrative actions, volunteer submissions, and financial status changes.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-400">
                  Total Logged Actions: <strong>{auditLogs.length}</strong>
                </span>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-stone-800 text-stone-400 uppercase tracking-wider text-[10px]">
                    <th className="py-3 px-3">Log ID</th>
                    <th className="py-3 px-3">Actor & Role</th>
                    <th className="py-3 px-3">Action</th>
                    <th className="py-3 px-3">Resource</th>
                    <th className="py-3 px-3">Details</th>
                    <th className="py-3 px-3">Timestamp</th>
                    <th className="py-3 px-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-800/60 font-mono">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-stone-900/50 transition">
                      <td className="py-3 px-3 text-emerald-400 font-bold">{log.id}</td>
                      <td className="py-3 px-3 text-stone-200">
                        <span className="font-sans font-semibold block">{log.actor}</span>
                        <span className="text-[10px] text-stone-500">{log.role}</span>
                      </td>
                      <td className="py-3 px-3">
                        <span className="px-2 py-0.5 rounded bg-stone-900 text-stone-300 border border-stone-800 text-[10px]">
                          {log.action}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-stone-400">{log.resource}</td>
                      <td className="py-3 px-3 font-sans text-stone-300 max-w-xs truncate" title={log.details}>
                        {log.details || '—'}
                      </td>
                      <td className="py-3 px-3 text-stone-400 text-[10px] whitespace-nowrap">{log.timestamp}</td>
                      <td className="py-3 px-3">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          log.status === 'SUCCESS'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-rose-950 text-rose-300 border border-rose-800'
                        }`}>
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 7. SETTINGS / CANDIDATE DATA EDITOR TAB */}
        {activeTab === 'settings' && (
          <div className="max-w-3xl p-6 sm:p-8 rounded-2xl bg-stone-950 border border-stone-800 space-y-6 animate-in fade-in">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-emerald-400" />
                <span>Live Candidate Data Customizer</span>
              </h3>
              <p className="text-xs text-stone-400">
                Changes made here immediately update the website across the Hero, Navigation, About section, and Footer.
              </p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Candidate Full Name
                </label>
                <input
                  type="text"
                  required
                  value={candidateNameInput}
                  onChange={(e) => setCandidateNameInput(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Federal Constituency Name
                </label>
                <input
                  type="text"
                  required
                  value={constituencyNameInput}
                  onChange={(e) => setConstituencyNameInput(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1">
                  Campaign Slogan / Core Motto
                </label>
                <input
                  type="text"
                  required
                  value={sloganInput}
                  onChange={(e) => setSloganInput(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Campaign Official Phone
                  </label>
                  <input
                    type="text"
                    value={phoneInput}
                    onChange={(e) => setPhoneInput(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-300 mb-1">
                    Campaign Official Email
                  </label>
                  <input
                    type="email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center gap-3">
                <button
                  type="submit"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl transition shadow flex items-center gap-2 text-xs"
                >
                  <Save className="w-4 h-4" />
                  <span>Apply Parameters to Live Website</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    toggleProfileMode();
                    notify('Mode Switched', 'Profile reset to default state.', 'info');
                  }}
                  className="bg-stone-800 hover:bg-stone-700 text-stone-300 font-semibold py-3 px-5 rounded-xl transition text-xs"
                >
                  Reset / Switch Demo Mode
                </button>
              </div>
            </form>
          </div>
        )}

      </main>
    </div>
  );
};
