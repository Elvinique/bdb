import React from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { CollapsibleSection } from '../common/CollapsibleSection';
import {
  Landmark,
  Scale,
  ShieldCheck,
  TrendingUp,
  FileCheck2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const GreenChamberMandateSection: React.FC = () => {
  const { config, navigateTo } = useCampaign();

  return (
    <section
      id="green-chamber-mandate-section"
      className="py-16 sm:py-24 bg-gradient-to-b from-stone-950 via-stone-900 to-stone-950 text-white border-b border-stone-800 relative overflow-hidden"
    >
      {/* Ambient background glow accents in emerald and gold */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-900/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 text-emerald-300 text-xs font-bold uppercase tracking-wider border border-emerald-700/60 shadow-sm">
            <Landmark className="w-4 h-4 text-amber-400" />
            <span>THE FEDERAL MANDATE • ABUJA 2027</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            The Green Chamber Mandate
          </h2>

          <p className="text-base sm:text-lg text-stone-300 font-normal leading-relaxed">
            Taking Khana & Gokana from the margins into the core of national decision-making. Sponsoring bills, attracting federal capital appropriations, and upholding constitutional oversight.
          </p>
        </div>

        {/* Reusable Collapsible wrapper for Mobile/Tablet */}
        <CollapsibleSection
          theme="dark"
          collapsedHeightMobile="560px"
          expandLabel="Read Complete Legislative Mandate"
          collapseLabel="Collapse Mandate Details"
          badge="Abuja Pillars"
        >
          {/* Top Feature Grid: Dual Showcase Cards (Building & Mace) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            
            {/* Card 1: National Assembly Complex (Abuja) */}
            <div className="group relative rounded-3xl overflow-hidden border border-stone-700/80 bg-stone-850/90 shadow-2xl hover:border-emerald-500/60 transition-all duration-300 flex flex-col justify-between">
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-900">
                <img
                  src="/assets/images/national-assembly-abuja.jpg"
                  alt="National Assembly Complex Abuja - Federal House of Representatives"
                  className="w-full h-full object-cover object-center filter brightness-[0.95] group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/90 backdrop-blur-md text-emerald-400 border border-stone-700/80 text-[11px] font-bold uppercase tracking-wider shadow-md">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Three Arms Zone, Abuja
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Landmark className="w-4 h-4" />
                  <span>The Green Chamber</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  Federal House of Representatives
                </h3>
                <p className="text-sm text-stone-300 leading-relaxed font-normal">
                  The people's parliament where 360 federal lawmakers deliberate on the laws shaping Nigeria. Engr. Daniel’s candidacy represents a decisive mission to give Khana and Gokana an energetic, visible, and principled federal presence in Abuja.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs text-stone-300">
                  <span className="px-2.5 py-1 rounded-lg bg-stone-800 border border-stone-700">360 Federal Constituencies</span>
                  <span className="px-2.5 py-1 rounded-lg bg-stone-800 border border-stone-700">Plenary Debates</span>
                  <span className="px-2.5 py-1 rounded-lg bg-stone-800 border border-stone-700">National Budget Approval</span>
                </div>
              </div>
            </div>

            {/* Card 2: The Legislative Mace */}
            <div className="group relative rounded-3xl overflow-hidden border border-stone-700/80 bg-stone-850/90 shadow-2xl hover:border-amber-500/60 transition-all duration-300 flex flex-col justify-between">
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-stone-900">
                <img
                  src="/assets/images/house-reps-mace.jpg"
                  alt="Ceremonial Legislative Mace of the Nigerian Federal House of Representatives"
                  className="w-full h-full object-cover object-center filter brightness-[0.98] group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
                
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900/90 backdrop-blur-md text-amber-300 border border-stone-700/80 text-[11px] font-bold uppercase tracking-wider shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Supreme Parliamentary Authority
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-7 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Scale className="w-4 h-4" />
                  <span>Constitutional Authority</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  The Legislative Mace
                </h3>
                <p className="text-sm text-stone-300 leading-relaxed font-normal">
                  The ceremonial mace is the sacred instrument of parliamentary sovereignty. In the Green Chamber, no law is passed and no sitting is valid without the Mace. It symbolizes that power belongs to the citizens—and that the mandate of Khana & Gokana will be respected when national decisions are made.
                </p>
                <div className="pt-2 flex flex-wrap gap-2 text-xs text-stone-300">
                  <span className="px-2.5 py-1 rounded-lg bg-stone-800 border border-stone-700">Symbol of Law & Order</span>
                  <span className="px-2.5 py-1 rounded-lg bg-stone-800 border border-stone-700">Constitutional Sovereignty</span>
                  <span className="px-2.5 py-1 rounded-lg bg-stone-800 border border-stone-700">Legislative Integrity</span>
                </div>
              </div>
            </div>

          </div>

          {/* Three Pillars of Representation in the Green Chamber */}
          <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/90 border border-stone-800 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">CONSTITUTIONAL RESPONSIBILITIES</span>
                <h4 className="text-xl font-bold text-white mt-0.5">
                  What Engr. Daniel Will Deliver in the Green Chamber
                </h4>
              </div>
              <span className="text-xs font-medium text-stone-400">
                10th / 11th National Assembly Cycle
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Pillar 1 */}
              <div className="space-y-3 p-5 rounded-2xl bg-stone-800/60 border border-stone-700/60">
                <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-700/60 flex items-center justify-center text-emerald-400">
                  <FileCheck2 className="w-5 h-5" />
                </div>
                <h5 className="text-base font-bold text-white">1. Purposeful Lawmaking</h5>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Drafting and co-sponsoring high-impact federal bills on environmental cleanup enforcement, decentralized mini-grid renewable energy, and agro-processing incentives for Rivers State.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="space-y-3 p-5 rounded-2xl bg-stone-800/60 border border-stone-700/60">
                <div className="w-10 h-10 rounded-xl bg-amber-950 border border-amber-700/60 flex items-center justify-center text-amber-400">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <h5 className="text-base font-bold text-white">2. Federal Appropriations</h5>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Aggressive budget advocacy to guarantee that Khana and Gokana receive federal infrastructure appropriations—including federal roads, clean water schemes, and smart technical colleges.
                </p>
              </div>

              {/* Pillar 3 */}
              <div className="space-y-3 p-5 rounded-2xl bg-stone-800/60 border border-stone-700/60">
                <div className="w-10 h-10 rounded-xl bg-sky-950 border border-sky-700/60 flex items-center justify-center text-sky-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h5 className="text-base font-bold text-white">3. Rigorous Oversight</h5>
                <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
                  Serving on critical committees (Works, Environment, Power, Youth Development) to scrutinize federal spending, audit contractors, and ensure projects in Ogoni are completed on time.
                </p>
              </div>
            </div>

            {/* Bottom Callout Banner */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-stone-800 text-xs text-stone-300">
              <p className="italic text-center sm:text-left text-stone-300">
                "Effective federal representation is not an entitlement; it is an engineering discipline of accountability and presence."
              </p>
              <button
                onClick={() => navigateTo('vision', 'vision-section')}
                className="inline-flex items-center gap-1.5 font-bold text-emerald-400 hover:text-emerald-300 transition shrink-0 underline underline-offset-4"
              >
                <span>View Full Legislative Policy Agenda</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </CollapsibleSection>

      </div>
    </section>
  );
};
