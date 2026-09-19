import React, { useState, useEffect } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { X, Settings, Save, RotateCcw, CheckCircle2 } from 'lucide-react';

export const CandidateConfigModal: React.FC = () => {
  const {
    isConfigModalOpen,
    setIsConfigModalOpen,
    config,
    updateCandidateConfig,
    notify
  } = useCampaign();

  const [formData, setFormData] = useState({
    candidateName: config.candidateName,
    constituencyName: config.constituencyName,
    stateName: config.stateName,
    partyName: config.partyName,
    campaignSlogan: config.campaignSlogan,
    subSlogan: config.subSlogan,
    campaignEmail: config.campaignEmail,
    campaignPhone: config.campaignPhone,
    headquartersAddress: config.headquartersAddress
  });

  useEffect(() => {
    setFormData({
      candidateName: config.candidateName,
      constituencyName: config.constituencyName,
      stateName: config.stateName,
      partyName: config.partyName,
      campaignSlogan: config.campaignSlogan,
      subSlogan: config.subSlogan,
      campaignEmail: config.campaignEmail,
      campaignPhone: config.campaignPhone,
      headquartersAddress: config.headquartersAddress
    });
  }, [config]);

  if (!isConfigModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateCandidateConfig(formData);
    notify('Parameters Saved', 'Campaign parameters updated live across all sections.', 'success');
    setIsConfigModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white border border-stone-200 rounded-3xl shadow-2xl text-stone-900 overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800">
              <Settings className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-stone-900">
                Campaign Parameters & Identity Editor
              </h3>
              <p className="text-xs text-stone-500">
                Edit core candidate identity and contact data live
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsConfigModalOpen(false)}
            className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Candidate Name
              </label>
              <input
                type="text"
                value={formData.candidateName}
                onChange={(e) => setFormData({ ...formData, candidateName: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Political Party
              </label>
              <input
                type="text"
                value={formData.partyName}
                onChange={(e) => setFormData({ ...formData, partyName: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Federal Constituency
              </label>
              <input
                type="text"
                value={formData.constituencyName}
                onChange={(e) => setFormData({ ...formData, constituencyName: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                State
              </label>
              <input
                type="text"
                value={formData.stateName}
                onChange={(e) => setFormData({ ...formData, stateName: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Campaign Slogan
            </label>
            <input
              type="text"
              value={formData.campaignSlogan}
              onChange={(e) => setFormData({ ...formData, campaignSlogan: e.target.value })}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Sub-slogan / Mission Tagline
            </label>
            <input
              type="text"
              value={formData.subSlogan}
              onChange={(e) => setFormData({ ...formData, subSlogan: e.target.value })}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Official Email
              </label>
              <input
                type="email"
                value={formData.campaignEmail}
                onChange={(e) => setFormData({ ...formData, campaignEmail: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 mb-1">
                Official Phone
              </label>
              <input
                type="tel"
                value={formData.campaignPhone}
                onChange={(e) => setFormData({ ...formData, campaignPhone: e.target.value })}
                className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1">
              Campaign Headquarters Address
            </label>
            <input
              type="text"
              value={formData.headquartersAddress}
              onChange={(e) => setFormData({ ...formData, headquartersAddress: e.target.value })}
              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-4 border-t border-stone-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsConfigModalOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-50 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold shadow flex items-center gap-1.5"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Apply Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
