import React, { useState } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { LEGISLATIVE_PRIORITIES } from '../../config/campaignConfig';
import { AlertCircle, Target, CheckCircle2, ArrowRight } from 'lucide-react';

export const InteractivePlanSection: React.FC = () => {
  const { setSelectedPriority } = useCampaign();
  const [activePlanId, setActivePlanId] = useState<string>('youth-employment');

  const activePriority = LEGISLATIVE_PRIORITIES.find(p => p.id === activePlanId) || LEGISLATIVE_PRIORITIES[0];

  return (
    <section
      id="the-plan-section"
      className="py-16 sm:py-24 bg-stone-900 text-stone-100 border-b border-stone-800 relative overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-950/40 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-amber-950/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-semibold uppercase tracking-wider border border-emerald-800">
            <span>THE ACTION FRAMEWORK</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How We Turn Priorities into Reality
          </h2>
          <p className="text-base text-stone-400">
            Click on any sector below to inspect our structured 3-part framework: The Challenge, The Legislative Approach, and The Target Impact.
          </p>
        </div>

        {/* Horizontal Category Tab Selector */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4 mb-10 gap-2 no-scrollbar">
          {LEGISLATIVE_PRIORITIES.slice(0, 6).map((priority) => {
            const isSelected = priority.id === activePlanId;
            return (
              <button
                key={priority.id}
                id={`plan-tab-${priority.id}`}
                onClick={() => setActivePlanId(priority.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide whitespace-nowrap transition border ${
                  isSelected
                    ? 'bg-emerald-700 text-white border-emerald-500 shadow-md shadow-emerald-900/40'
                    : 'bg-stone-800/80 text-stone-300 border-stone-700 hover:bg-stone-800 hover:text-white'
                }`}
              >
                {priority.title.split('&')[0].trim()}
              </button>
            );
          })}
        </div>

        {/* 3-Column Challenge / Approach / Impact Card Layout */}
        <div className="bg-stone-800/90 border border-stone-700/80 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-sm">
          <div className="border-b border-stone-700/80 pb-6 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                ACTIVE SECTOR BLUEPRINT
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                {activePriority.title}
              </h3>
            </div>
            <button
              id="plan-deep-dive-btn"
              onClick={() => setSelectedPriority(activePriority)}
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300 hover:text-white bg-emerald-950/80 hover:bg-emerald-900 px-4 py-2 rounded-lg border border-emerald-700/60 transition self-start md:self-auto"
            >
              <span>View Full Legislative Brief</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* 1. THE CHALLENGE */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-rose-950/60 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-rose-400 font-bold text-xs uppercase tracking-wider">
                  <div className="w-7 h-7 rounded-lg bg-rose-950/80 border border-rose-800/60 flex items-center justify-center">
                    <AlertCircle className="w-4 h-4 text-rose-400" />
                  </div>
                  <span>1. The Ground Reality</span>
                </div>
                <h4 className="text-lg font-bold text-white">
                  The Challenge
                </h4>
                <p className="text-sm text-stone-300 leading-relaxed">
                  {activePriority.challenge}
                </p>
              </div>
              <div className="pt-4 border-t border-stone-800 text-xs text-stone-400">
                Identified through direct community listening sessions and ward townhalls.
              </div>
            </div>

            {/* 2. THE APPROACH */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-amber-950/60 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <div className="w-7 h-7 rounded-lg bg-amber-950/80 border border-amber-800/60 flex items-center justify-center">
                    <Target className="w-4 h-4 text-amber-400" />
                  </div>
                  <span>2. The Legislative Strategy</span>
                </div>
                <h4 className="text-lg font-bold text-white">
                  The Approach
                </h4>
                <p className="text-sm text-stone-300 leading-relaxed">
                  {activePriority.approach}
                </p>
              </div>
              <div className="pt-4 border-t border-stone-800 text-xs text-stone-400">
                Constitutional advocacy, bill sponsorship, and inter-agency coordination.
              </div>
            </div>

            {/* 3. THE IMPACT */}
            <div className="p-6 rounded-2xl bg-stone-900/80 border border-emerald-950/60 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2.5 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <div className="w-7 h-7 rounded-lg bg-emerald-950/80 border border-emerald-800/60 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  </div>
                  <span>3. Expected Outcomes</span>
                </div>
                <h4 className="text-lg font-bold text-white">
                  The Impact
                </h4>
                <p className="text-sm text-stone-300 leading-relaxed">
                  {activePriority.impact}
                </p>
              </div>
              <div className="pt-4 border-t border-stone-800 text-xs text-stone-400">
                Tracked against bi-annual published constituency accountability scorecards.
              </div>
            </div>

          </div>

          {/* Key Initiatives bullet strip */}
          <div className="mt-8 pt-6 border-t border-stone-700/60">
            <h5 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-3">
              Target Field Initiatives Under this Priority:
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {activePriority.keyInitiatives.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 text-xs text-stone-300 bg-stone-900/60 p-2.5 rounded-lg border border-stone-700/50"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
