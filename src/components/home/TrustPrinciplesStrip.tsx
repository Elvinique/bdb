import React from 'react';
import { CAMPAIGN_PRINCIPLES } from '../../config/campaignConfig';
import { Ear, Megaphone, CheckCircle2, ShieldCheck } from 'lucide-react';

export const TrustPrinciplesStrip: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Ear':
        return <Ear className="w-5 h-5 text-emerald-400" />;
      case 'Megaphone':
        return <Megaphone className="w-5 h-5 text-emerald-400" />;
      case 'CheckCircle2':
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case 'ShieldCheck':
      default:
        return <ShieldCheck className="w-5 h-5 text-emerald-400" />;
    }
  };

  return (
    <section
      id="principles-strip"
      className="bg-stone-900 border-b border-stone-800 text-stone-200 py-8 relative z-20"
      aria-label="Core Campaign Principles"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {CAMPAIGN_PRINCIPLES.map((principle) => (
            <div
              key={principle.id}
              className="flex items-start gap-4 p-3.5 rounded-xl hover:bg-stone-800/60 transition duration-200 group border border-transparent hover:border-stone-700/60"
            >
              <div className="w-11 h-11 rounded-lg bg-emerald-950/80 border border-emerald-800/80 flex items-center justify-center shrink-0 group-hover:border-emerald-500/60 group-hover:scale-105 transition shadow-inner">
                {getIcon(principle.iconName)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white tracking-wider uppercase font-sans">
                    {principle.title}
                  </h3>
                  <span className="text-[10px] uppercase font-semibold px-1.5 py-0.5 rounded bg-stone-800 text-stone-400">
                    {principle.tagline}
                  </span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {principle.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
