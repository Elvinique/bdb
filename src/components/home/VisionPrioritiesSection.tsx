import React from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { LEGISLATIVE_PRIORITIES } from '../../config/campaignConfig';
import { LegislativePriority } from '../../types';
import {
  GraduationCap,
  Briefcase,
  HeartPulse,
  Building2,
  TrendingUp,
  Users,
  ShieldAlert,
  Landmark,
  ArrowRight,
  Sparkles
} from 'lucide-react';

export const VisionPrioritiesSection: React.FC = () => {
  const { config, setSelectedPriority } = useCampaign();

  const getPriorityIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-6 h-6 text-emerald-600" />;
      case 'Briefcase':
        return <Briefcase className="w-6 h-6 text-amber-600" />;
      case 'HeartPulse':
        return <HeartPulse className="w-6 h-6 text-rose-600" />;
      case 'Building2':
        return <Building2 className="w-6 h-6 text-sky-600" />;
      case 'TrendingUp':
        return <TrendingUp className="w-6 h-6 text-emerald-600" />;
      case 'Users':
        return <Users className="w-6 h-6 text-indigo-600" />;
      case 'ShieldAlert':
        return <ShieldAlert className="w-6 h-6 text-amber-600" />;
      case 'Landmark':
      default:
        return <Landmark className="w-6 h-6 text-emerald-700" />;
    }
  };

  return (
    <section
      id="vision-section"
      className="py-16 sm:py-24 bg-white text-stone-900 border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider border border-emerald-200">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>LEGISLATIVE AGENDA</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Our Vision for {config.constituencyName}
          </h2>
          <p className="text-base sm:text-lg text-stone-600 font-normal">
            Practical priorities for stronger communities and better representation. Rooted in realistic legislative powers, proactive committee oversight, and measurable constituency interventions.
          </p>
        </div>

        {/* 8 Priority Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {LEGISLATIVE_PRIORITIES.map((priority) => (
            <div
              key={priority.id}
              className="flex flex-col justify-between p-6 rounded-2xl bg-stone-50 hover:bg-white border border-stone-200 hover:border-emerald-500/40 shadow-sm hover:shadow-md transition duration-200 group"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-stone-200 flex items-center justify-center shadow-xs group-hover:scale-105 transition">
                  {getPriorityIcon(priority.iconName)}
                </div>

                <div>
                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition">
                    {priority.title}
                  </h3>
                  <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                    {priority.shortDescription}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-stone-200/80">
                <button
                  id={`priority-learn-more-${priority.id}`}
                  onClick={() => setSelectedPriority(priority)}
                  className="w-full flex items-center justify-between text-xs font-bold text-emerald-800 hover:text-emerald-600 transition group-hover:translate-x-0.5"
                >
                  <span>Explore Plan & Roadmap</span>
                  <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Grounded Note on Representation */}
        <div className="mt-12 p-4 rounded-xl bg-stone-100 border border-stone-200 text-xs text-stone-600 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p>
            <strong>Note on Legislative Scope:</strong> In accordance with constitutional limits, our manifesto focuses on sponsoring bills, moving motions of urgent public importance, national budget appropriation advocacy, and transparent constituency project execution.
          </p>
          <span className="text-emerald-700 font-semibold shrink-0">
            No Empty Promises
          </span>
        </div>

      </div>
    </section>
  );
};
