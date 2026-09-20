import React, { useState } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import {
  MapPin,
  Users,
  Building,
  Briefcase,
  AlertTriangle,
  ArrowRight,
  Compass,
  CheckCircle2
} from 'lucide-react';
import { CollapsibleSection } from '../common/CollapsibleSection';

export const ConstituencySection: React.FC = () => {
  const { config, navigateTo } = useCampaign();
  const [selectedLgaIndex, setSelectedLgaIndex] = useState<number>(0);

  const activeLga = config.lgas[selectedLgaIndex] || config.lgas[0];

  return (
    <section
      id="constituency-section"
      className="py-16 sm:py-24 bg-stone-50 text-stone-900 border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-emerald-700" />
            <span>OUR CONSTITUENCY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            {config.constituencyName}
          </h2>
          <p className="text-base sm:text-lg text-stone-600">
            A vibrant, hardworking federal constituency in {config.stateName}. Spanning diverse communities, trade markets, bustling residential wards, and creative youth clusters.
          </p>
        </div>

        <CollapsibleSection
          theme="stone-50"
          collapsedHeightMobile="500px"
          expandLabel="Explore All Wards & Community Needs"
          collapseLabel="Collapse Community Details"
          badge="Wards & Profiles"
        >
          {/* 2-Column Interactive Map & LGA Profile View */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Interactive Visual Map Graphic (6 cols) */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider">
                  CONSTITUENCY MAP VISUALIZATION
                </span>
                <h3 className="text-xl font-bold text-stone-900">
                  Select an LGA / District
                </h3>
              </div>
              <span className="text-xs text-stone-400 bg-stone-100 px-2.5 py-1 rounded-full font-medium">
                Interactive Map Guide
              </span>
            </div>

            {/* Stylized Visual Map SVG Representation */}
            <div className="relative w-full h-[320px] bg-emerald-950/5 rounded-2xl border border-emerald-900/10 p-4 flex items-center justify-center overflow-hidden">
              {/* Decorative grid pattern */}
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#064e3b_1px,transparent_1px)] [background-size:16px_16px]" />

              {/* Visual Map SVG with clickable zones */}
              <svg viewBox="0 0 500 320" className="w-full h-full max-w-md drop-shadow-md">
                {/* Zone 1: Primary LGA polygon */}
                <path
                  d="M 60,60 L 250,40 L 290,180 L 120,240 L 50,160 Z"
                  className={`cursor-pointer transition-all duration-300 stroke-2 ${
                    selectedLgaIndex === 0
                      ? 'fill-emerald-700/85 stroke-emerald-900 filter drop-shadow-md'
                      : 'fill-emerald-800/30 stroke-emerald-700/60 hover:fill-emerald-800/50'
                  }`}
                  onClick={() => setSelectedLgaIndex(0)}
                />
                <text
                  x="150"
                  y="130"
                  className={`text-xs font-bold pointer-events-none transition-colors ${
                    selectedLgaIndex === 0 ? 'fill-white' : 'fill-stone-700'
                  }`}
                  textAnchor="middle"
                >
                  {config.lgas[0]?.name || 'District 1'}
                </text>
                <circle cx="150" cy="150" r="4" className="fill-amber-400 stroke-2 stroke-stone-900" />

                {/* Zone 2: Secondary LGA polygon */}
                <path
                  d="M 250,40 L 440,70 L 450,220 L 300,270 L 290,180 Z"
                  className={`cursor-pointer transition-all duration-300 stroke-2 ${
                    selectedLgaIndex === 1
                      ? 'fill-emerald-700/85 stroke-emerald-900 filter drop-shadow-md'
                      : 'fill-emerald-800/30 stroke-emerald-700/60 hover:fill-emerald-800/50'
                  }`}
                  onClick={() => setSelectedLgaIndex(1)}
                />
                <text
                  x="360"
                  y="150"
                  className={`text-xs font-bold pointer-events-none transition-colors ${
                    selectedLgaIndex === 1 ? 'fill-white' : 'fill-stone-700'
                  }`}
                  textAnchor="middle"
                >
                  {config.lgas[1]?.name || 'District 2'}
                </text>
                <circle cx="360" cy="170" r="4" className="fill-amber-400 stroke-2 stroke-stone-900" />

                {/* Map boundary indicators */}
                <line x1="20" y1="290" x2="480" y2="290" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />
                <text x="30" y="308" className="text-[10px] fill-stone-400 font-mono">
                  {config.stateName} Federal Electoral Boundary
                </text>
              </svg>

              {/* Map floating selector legend */}
              <div className="absolute bottom-3 right-3 flex gap-2">
                {config.lgas.map((lga, idx) => (
                  <button
                    key={lga.name}
                    onClick={() => setSelectedLgaIndex(idx)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition border ${
                      selectedLgaIndex === idx
                        ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {lga.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick stats ribbon */}
            <div className="grid grid-cols-3 gap-3 text-center pt-2">
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-lg sm:text-xl font-extrabold text-stone-900">
                  {config.lgas.length}
                </span>
                <p className="text-[11px] text-stone-500 font-medium">Local Govts</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-lg sm:text-xl font-extrabold text-stone-900">
                  {config.lgas.reduce((acc, curr) => acc + curr.wardsCount, 0)}
                </span>
                <p className="text-[11px] text-stone-500 font-medium">Electoral Wards</p>
              </div>
              <div className="p-3 bg-stone-50 rounded-xl border border-stone-200">
                <span className="text-lg sm:text-xl font-extrabold text-stone-900">
                  {activeLga.populationEst}
                </span>
                <p className="text-[11px] text-stone-500 font-medium">Est. Population</p>
              </div>
            </div>
          </div>

          {/* Right: Selected LGA Profile & Community Needs (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-stone-200 shadow-sm space-y-6">
              
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                    DISTRICT OVERVIEW
                  </span>
                  <h3 className="text-2xl font-bold text-stone-900 mt-1">
                    {activeLga.name}
                  </h3>
                  <p className="text-xs text-stone-500 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Zonal Headquarters: {activeLga.headquarters}</span>
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                  {activeLga.wardsCount} Wards
                </span>
              </div>

              <p className="text-sm text-stone-600 leading-relaxed">
                {activeLga.description}
              </p>

              {/* Priority Community Focus */}
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200/80">
                <p className="text-xs font-bold text-emerald-900 uppercase tracking-wider mb-1">
                  Legislative Focus For This District
                </p>
                <p className="text-sm font-semibold text-emerald-950">
                  {activeLga.priorityFocus}
                </p>
              </div>

              {/* Key Needs Documented */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                  <span>Top Documented Community Concerns</span>
                </h4>
                <div className="space-y-2">
                  {activeLga.keyNeeds.map((need, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2.5 text-xs text-stone-700 bg-stone-50 p-2.5 rounded-lg border border-stone-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-medium">{need}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Your Community Matters Banner & CTA */}
              <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h5 className="font-bold text-sm text-stone-900">Your Community Matters</h5>
                  <p className="text-xs text-stone-500">Do you live in {activeLga.name}? Speak directly to our policy team.</p>
                </div>
                <button
                  id="tell-us-what-matters-btn"
                  onClick={() => navigateTo('home', 'community-voice-section')}
                  className="w-full sm:w-auto bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center justify-center gap-2 shrink-0"
                >
                  <span>TELL US WHAT MATTERS TO YOU</span>
                  <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
                </button>
              </div>

            </div>
          </div>
        </div>
      </CollapsibleSection>
      </div>
    </section>
  );
};
