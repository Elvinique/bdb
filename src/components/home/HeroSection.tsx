import React, { useState } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { ArrowRight, MapPin, Calendar, CheckCircle2, Image as ImageIcon, UserCheck } from 'lucide-react';

export const HeroSection: React.FC = () => {
  const { config, navigateTo, setIsDonationModalOpen } = useCampaign();
  const [viewMode, setViewMode] = useState<'portrait' | 'poster'>('portrait');
  const [showFullPosterModal, setShowFullPosterModal] = useState(false);

  return (
    <section
      id="hero-section"
      className="relative bg-gradient-to-b from-stone-900 via-stone-900 to-stone-950 text-white overflow-hidden py-16 lg:py-24 border-b border-stone-800"
    >
      {/* Subtle atmospheric ambient glow in deep emerald and warm amber */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-900/15 rounded-full blur-3xl pointer-events-none -mr-40 -mt-20" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left / Main Text Column (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Subtle Eyebrow Badge with NNPP Party Logo */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-700/50 text-xs font-semibold tracking-wider uppercase shadow-sm">
              {config.partyLogoUrl ? (
                <img src={config.partyLogoUrl} alt={config.partyName} className="w-4 h-4 object-contain rounded-full bg-white p-0.5" referrerPolicy="no-referrer" />
              ) : (
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              )}
              <span>NNPP • HOUSE OF REPRESENTATIVES</span>
            </div>

            {/* Candidate Name & Slogan Headlines */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-950/80 border border-sky-600/50 text-sky-300 text-xs font-bold tracking-widest uppercase shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" />
                <span>THE BEACON OF HOPE 2027</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                {config.candidateName}
              </h1>

              {/* Prominently Placed, Optimized Slogan with Slow Beacon Blink Animation */}
              <div className="pt-1 pb-1">
                <div className="inline-flex flex-col sm:flex-row items-start sm:items-center gap-4 p-3 sm:p-3.5 pr-6 rounded-2xl bg-gradient-to-r from-stone-900/95 via-stone-850/90 to-stone-900/80 border border-emerald-500/40 shadow-2xl backdrop-blur-md animate-slow-glow">
                  <div className="relative flex items-center justify-center p-2.5 px-3.5 rounded-xl bg-gradient-to-b from-white via-white to-stone-100 shadow-md border border-white/60 shrink-0">
                    <img
                      src="/assets/images/lets-build-as-one.png"
                      alt="Let's Build As One - Campaign Slogan"
                      className="h-16 sm:h-20 md:h-22 w-auto object-contain animate-slow-blink drop-shadow-sm"
                    />
                  </div>
                  <div>
                    <div className="inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                      <span>OFFICIAL CAMPAIGN MOTTO</span>
                    </div>
                    <p className="text-xl sm:text-2xl font-extrabold text-white font-serif tracking-tight mt-0.5">
                      "Let's Build As One"
                    </p>
                    <p className="text-xs text-stone-300 max-w-sm mt-0.5">
                      The united grassroots mandate for Khana & Gokana Federal Constituency 2027.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Campaign Core Mission Description */}
            <p className="text-base sm:text-lg text-stone-300 max-w-2xl leading-relaxed font-normal">
              An engineering leader dedicated to real infrastructure development, youth empowerment, environmental restoration, and transparent representation for the hardworking people of Khana and Gokana.
            </p>

            {/* Location & Election Badge */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-stone-400">
              <div className="flex items-center gap-1.5 bg-stone-800/80 px-3 py-1.5 rounded-md border border-stone-700 text-stone-300">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span className="font-medium">{config.constituencyName} • {config.stateName}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-stone-800/80 px-3 py-1.5 rounded-md border border-stone-700 text-stone-300">
                <Calendar className="w-3.5 h-3.5 text-emerald-400" />
                <span>General Elections {config.electionYear}</span>
              </div>
            </div>

            {/* Primary & Secondary Action CTAs */}
            <div className="pt-3 flex flex-wrap items-center gap-4">
              <button
                id="hero-cta-support-btn"
                onClick={() => setIsDonationModalOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-6 py-3.5 rounded-lg shadow-lg hover:shadow-emerald-900/50 transition flex items-center justify-center text-sm md:text-base active:scale-95 border border-emerald-400/30"
              >
                <span>SUPPORT THE CAMPAIGN</span>
              </button>

              <button
                id="hero-cta-meet-candidate-btn"
                onClick={() => navigateTo('about', 'why-running-section')}
                className="bg-stone-800 hover:bg-stone-700 text-stone-100 font-semibold px-6 py-3.5 rounded-lg border border-stone-700 hover:border-stone-600 transition flex items-center gap-2 text-sm md:text-base active:scale-95"
              >
                <span>MEET THE CANDIDATE</span>
                <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-0.5 transition" />
              </button>
            </div>

            {/* Grounded Grassroots Endorsement summary */}
            <div className="pt-4 border-t border-stone-800/80 flex flex-wrap items-center gap-6 text-xs text-stone-400">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Endorsed by Grassroots Ward Coalitions in Khana & Gokana</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>100% Transparent Citizen Funding</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Editorial Portrait & Official Poster Toggle (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Media Switcher Tab (Portrait vs Official Poster) */}
              <div className="flex items-center justify-between mb-3">
                <div className="inline-flex bg-stone-900/90 rounded-lg p-1 border border-stone-700/80">
                  <button
                    id="hero-toggle-portrait"
                    onClick={() => setViewMode('portrait')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition ${
                      viewMode === 'portrait'
                        ? 'bg-emerald-700 text-white shadow'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Candidate Portrait</span>
                  </button>
                  <button
                    id="hero-toggle-poster"
                    onClick={() => setViewMode('poster')}
                    className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition ${
                      viewMode === 'poster'
                        ? 'bg-emerald-700 text-white shadow'
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Official Poster</span>
                  </button>
                </div>

                <button
                  id="hero-view-full-poster-btn"
                  onClick={() => setShowFullPosterModal(true)}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-medium underline underline-offset-4 flex items-center gap-1"
                >
                  <span>Enlarge Poster</span>
                </button>
              </div>

              {/* Outer decorative card frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-stone-700/80 bg-stone-800 group">
                <img
                  src={viewMode === 'portrait' ? config.candidatePhotoUrl : (config.campaignPosterUrl || config.candidateSecondaryPhotoUrl)}
                  alt={`${config.candidateName} - Federal House Candidate`}
                  className="w-full h-[460px] sm:h-[520px] object-cover object-top filter brightness-[0.98] contrast-[1.02] transition duration-500 group-hover:scale-[1.02]"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />

                {/* Subtle gradient vignette at the bottom for portrait mode */}
                {viewMode === 'portrait' && (
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent opacity-90" />
                )}

                {/* Candidate Badge Card on Image */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-stone-900/90 backdrop-blur-md border border-stone-700/70 shadow-lg">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                        {config.partyLogoUrl && (
                          <img src={config.partyLogoUrl} alt="NNPP" className="w-3.5 h-3.5 rounded-full bg-white object-contain" referrerPolicy="no-referrer" />
                        )}
                        <span>NNPP OFFICIAL CANDIDATE</span>
                      </p>
                      <h4 className="text-base font-bold text-white tracking-tight">
                        {config.candidateName}
                      </h4>
                      <p className="text-xs text-stone-400">
                        Federal House of Reps • {config.constituencyName}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 pl-3 border-l border-stone-800 shrink-0">
                      <div className="bg-white/95 p-1 px-1.5 rounded-lg shadow-sm border border-stone-200/80">
                        <img
                          src="/assets/images/lets-build-as-one.png"
                          alt="Let's Build As One"
                          className="h-8 sm:h-10 w-auto object-contain animate-slow-blink"
                          title="Official Campaign Motto: Let's Build As One"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Full Poster Modal View */}
      {showFullPosterModal && (
        <div 
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/80 backdrop-blur-sm"
          onClick={() => setShowFullPosterModal(false)}
        >
          <div 
            className="relative max-w-lg w-full bg-stone-900 rounded-2xl overflow-hidden border border-stone-700 shadow-2xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <div className="flex items-center gap-2">
                <img src={config.partyLogoUrl || '/assets/images/party-logo.png'} alt="NNPP Logo" className="w-6 h-6 rounded-full bg-white object-contain p-0.5" referrerPolicy="no-referrer" />
                <span className="font-bold text-sm text-white">Official Campaign Poster 2027</span>
              </div>
              <button
                onClick={() => setShowFullPosterModal(false)}
                className="text-stone-400 hover:text-white p-1 rounded-lg text-sm bg-stone-800"
              >
                ✕
              </button>
            </div>
            <div className="mt-3 rounded-xl overflow-hidden bg-stone-950 border border-stone-800 flex items-center justify-center">
              <img
                src={config.campaignPosterUrl || '/assets/images/official-poster.png'}
                alt={`${config.candidateName} Official Campaign Poster`}
                className="w-full max-h-[70vh] object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-stone-400">
              <span>Khana/Gokana Federal Constituency • Rivers State</span>
              <a
                href={config.campaignPosterUrl || '/assets/images/official-poster.png'}
                download="Engr-Buradum-Baribefe-Daniel-Official-Poster.png"
                className="px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-semibold transition"
              >
                Download Poster
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
