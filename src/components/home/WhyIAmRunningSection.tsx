import React from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { ArrowRight, Quote, CheckCircle2 } from 'lucide-react';

export const WhyIAmRunningSection: React.FC = () => {
  const { config, navigateTo } = useCampaign();

  return (
    <section
      id="why-running-section"
      className="py-16 sm:py-24 bg-white text-stone-900 border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Large Editorial Campaign Photograph (5 cols) */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-stone-200 bg-stone-100">
              <img
                src={config.candidateSecondaryPhotoUrl}
                alt={`${config.candidateName} listening to community members`}
                className="w-full h-[450px] sm:h-[500px] object-cover object-center"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-stone-900/80 backdrop-blur-md text-white border border-stone-700/60">
                <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                  GRASSROOTS LISTENING
                </p>
                <p className="text-xs text-stone-200 mt-0.5">
                  Engaging with community members and artisan cooperatives in {config.constituencyName}.
                </p>
              </div>
            </div>

            {/* Subtle background decoration card */}
            <div className="hidden sm:block absolute -bottom-4 -right-4 w-40 h-40 bg-emerald-50 rounded-2xl -z-10 border border-emerald-100" />
          </div>

          {/* Right: Personal Candidate Statement (7 cols) */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold tracking-wider uppercase">
              <span>PERSONAL STATEMENT</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Why I Am Running
            </h2>

            <div className="relative">
              <Quote className="w-10 h-10 text-emerald-200 -mt-2 -ml-2 mb-2" />
              <blockquote className="text-xl sm:text-2xl font-editorial italic text-stone-800 leading-relaxed">
                "I am running because effective representation begins with listening. Our communities deserve leadership that understands their challenges, speaks with clarity, and works consistently to turn public priorities into meaningful action."
              </blockquote>
            </div>

            <p className="text-base text-stone-600 leading-relaxed font-normal">
              For too long, the disconnect between federal legislation and the daily realities of our streets, markets, and schools has grown wider. When our drains overflow during the rains, when talented youths lack vocational incubators, and when mothers walk miles for basic maternity medicines, it reminds us why courageous and competent representation matters.
            </p>

            <p className="text-base text-stone-600 leading-relaxed font-normal">
              My commitment is simple and sacred: to be an accessible bridge between the National Assembly and every ward, bringing federal presence, transparent accountability, and measurable opportunity directly home to {config.constituencyName}.
            </p>

            {/* Key commitments checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-sm text-stone-700 font-medium">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Never missing critical floor votes</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Open-door Ward Caseworker desks</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Bi-annual constituency scorecards</span>
              </div>
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero tolerance for empty rhetoric</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                id="why-running-read-story-btn"
                onClick={() => navigateTo('about', 'about-section')}
                className="inline-flex items-center gap-2 text-emerald-800 hover:text-emerald-700 font-bold text-base group underline decoration-2 decoration-emerald-500 underline-offset-8 transition"
              >
                <span>Read My Complete Story & Background</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
