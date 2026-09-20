import React from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { UserPlus, ArrowRight, ShieldCheck } from 'lucide-react';

export const FinalCtaSection: React.FC = () => {
  const { config, setIsVolunteerModalOpen, setIsDonationModalOpen, navigateTo } = useCampaign();

  return (
    <section
      id="final-cta-section"
      className="relative py-20 lg:py-28 bg-gradient-to-br from-emerald-950 via-stone-900 to-stone-950 text-white overflow-hidden border-b border-stone-800"
    >
      {/* Subtle decorative radial lights */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-emerald-700/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-900/70 text-emerald-300 border border-emerald-700/60 text-xs font-semibold uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>STAND FOR ACCOUNTABLE REPRESENTATION</span>
        </div>

        {/* Main Headline */}
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
          Ready for Leadership That Delivers?
        </h2>

        {/* Supporting message */}
        <p className="text-base sm:text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
          Join our movement for transparent, responsive, and accountable representation in {config.constituencyName}. Together, we will build a future our children and communities are proud of.
        </p>

        {/* Dual Primary Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <button
            id="final-cta-volunteer-btn"
            onClick={() => setIsVolunteerModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-8 py-4 rounded-xl shadow-xl hover:shadow-emerald-900/60 transition flex items-center gap-2.5 text-base active:scale-95 border border-emerald-400/30"
          >
            <UserPlus className="w-5 h-5 text-emerald-200" />
            <span>VOLUNTEER TODAY</span>
          </button>

          <button
            id="final-cta-donate-btn"
            onClick={() => setIsDonationModalOpen(true)}
            className="bg-stone-800 hover:bg-stone-700 text-stone-100 font-bold px-8 py-4 rounded-xl border border-stone-600 hover:border-stone-500 transition flex items-center justify-center text-base active:scale-95"
          >
            <span>SUPPORT THE CAMPAIGN</span>
          </button>

          <button
            id="final-cta-feedback-btn"
            onClick={() => navigateTo('home', 'community-voice-section')}
            className="bg-transparent hover:bg-stone-800/80 text-emerald-300 hover:text-white font-bold px-6 py-4 rounded-xl border border-emerald-800/80 transition flex items-center gap-2 text-sm"
          >
            <span>JOIN OUR COMMUNITY</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Footnote reassurance */}
        <p className="text-xs text-stone-400 pt-6">
          Authorized and sponsored by the Directorate of Campaign Mobilization for {config.candidateName} • House of Representatives {config.electionYear}
        </p>

      </div>
    </section>
  );
};
