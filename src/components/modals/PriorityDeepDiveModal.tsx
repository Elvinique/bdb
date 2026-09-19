import React from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { X, Target, AlertCircle, CheckCircle2, FileText, ArrowRight } from 'lucide-react';

export const PriorityDeepDiveModal: React.FC = () => {
  const { selectedPriority, setSelectedPriority, setIsVolunteerModalOpen } = useCampaign();

  if (!selectedPriority) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white border border-stone-200 rounded-3xl shadow-2xl text-stone-900 overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-200 bg-stone-50">
          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
              POLICY BLUEPRINT
            </span>
            <h3 className="text-2xl font-bold text-stone-900">
              {selectedPriority.title}
            </h3>
          </div>

          <button
            onClick={() => setSelectedPriority(null)}
            className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-600 flex items-center justify-center transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[75vh] overflow-y-auto space-y-6">
          
          <p className="text-base text-stone-700 leading-relaxed font-normal">
            {selectedPriority.fullDescription}
          </p>

          {/* 3 Pillars Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800 uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>The Challenge</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                {selectedPriority.challenge}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-800 uppercase tracking-wider">
                <Target className="w-4 h-4 text-amber-600" />
                <span>The Approach</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                {selectedPriority.approach}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Expected Impact</span>
              </div>
              <p className="text-xs text-stone-700 leading-relaxed">
                {selectedPriority.impact}
              </p>
            </div>

          </div>

          {/* Target Initiatives List */}
          <div className="space-y-3 pt-2">
            <h4 className="text-sm font-bold text-stone-900 uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-700" />
              <span>Concrete Legislative & Constituency Actions</span>
            </h4>
            <div className="space-y-2.5">
              {selectedPriority.keyInitiatives.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-700"
                >
                  <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center shrink-0 text-[10px]">
                    {idx + 1}
                  </span>
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Constitutional Note */}
          <div className="p-4 rounded-xl bg-stone-100 border border-stone-200 text-xs text-stone-500 leading-relaxed">
            <strong>Constitutional Scope:</strong> Members of the House of Representatives operate primarily through lawmaking, motions, committee hearings, and federal budget appropriations. Where projects require executive execution, the office works collaboratively with relevant federal ministries, departments, and state agencies.
          </div>

          {/* Modal Action CTA */}
          <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-stone-600">
              Passionate about this priority? Join our policy advisory cluster.
            </span>
            <button
              onClick={() => {
                setSelectedPriority(null);
                setIsVolunteerModalOpen(true);
              }}
              className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition flex items-center justify-center gap-2 shadow"
            >
              <span>Join This Policy Committee</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
