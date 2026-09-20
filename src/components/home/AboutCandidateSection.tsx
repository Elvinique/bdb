import React, { useState } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { CANDIDATE_MILESTONES } from '../../config/campaignConfig';
import { CollapsibleSection } from '../common/CollapsibleSection';
import {
  GraduationCap,
  Briefcase,
  Users,
  Award,
  BookOpen,
  HeartHandshake,
  CheckCircle,
  Calendar
} from 'lucide-react';

export const AboutCandidateSection: React.FC = () => {
  const { config } = useCampaign();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredMilestones = activeCategory === 'all'
    ? CANDIDATE_MILESTONES
    : CANDIDATE_MILESTONES.filter(m => m.category === activeCategory);

  return (
    <section
      id="about-section"
      className="py-16 sm:py-24 bg-stone-50 text-stone-900 border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
            <span>ABOUT THE CANDIDATE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Rooted in Community, Tested in Leadership
          </h2>
          <p className="text-base sm:text-lg text-stone-600">
            A life dedicated to grassroots problem-solving, professional excellence, and empowering ordinary citizens across {config.constituencyName}.
          </p>
        </div>

        <CollapsibleSection
          theme="stone-50"
          collapsedHeightMobile="580px"
          expandLabel="Read Full Biography & Career Timeline"
          collapseLabel="Collapse Biography & Timeline"
          badge="Full Profile"
        >
          {/* Top Grid: Bio & Core Pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          
          {/* Candidate Portrait Card (4 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-stone-200 bg-white">
              <img
                src={config.candidatePhotoUrl}
                alt={config.candidateName}
                className="w-full h-[440px] object-cover object-top"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="p-6 bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-stone-900">{config.candidateName}</h3>
                  <span className="px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 text-xs font-semibold border border-emerald-200">
                    House of Reps Nominee
                  </span>
                </div>
                <p className="text-xs text-stone-500 font-medium">
                  {config.constituencyName} • {config.stateName}
                </p>
                <div className="pt-3 border-t border-stone-100 flex flex-wrap gap-2 text-xs text-stone-600">
                  <span className="px-2.5 py-1 bg-stone-100 rounded-full font-medium">Professional Engineer (COREN)</span>
                  <span className="px-2.5 py-1 bg-stone-100 rounded-full font-medium">Infrastructure Specialist</span>
                  <span className="px-2.5 py-1 bg-stone-100 rounded-full font-medium">Grassroots Youth Mentor</span>
                </div>
              </div>
            </div>

            {/* Core Values Card */}
            <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Foundational Values</span>
              </h4>
              <ul className="space-y-2.5 text-sm text-stone-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Integrity & Transparency:</strong> Stewardship with zero compromises.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Empathy & Accessibility:</strong> Leaders must walk the streets they represent.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Competence:</strong> Rigorous engineering preparation and purposeful legislative delivery.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span><strong>Youth Inclusion:</strong> Expanding seats at the table for next-gen voices.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Structured Biography & Philosophy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-stone-700">
            <div className="space-y-4 text-base leading-relaxed">
              <p>
                Born and raised with deep generational ties to the Ogoni homeland, <strong>{config.candidateName}</strong> understands the aspirations, resilience, and daily burdens of our people firsthand. An accomplished engineer and visionary administrator, his career has been anchored in solving structural problems with technical excellence and genuine grassroots empathy.
              </p>

              <p>
                Over the past decade and a half, Engr. Daniel has delivered impactful engineering, energy, and developmental initiatives across the Niger Delta. His consistent support for educational scholarships, artisan training workshops, clean drinking water access, and community peace initiatives across Khana and Gokana has established him as a trusted unifier and the authentic beacon of hope for 2027.
              </p>
            </div>

            {/* 4 Thematic Pillars of Experience */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h5 className="font-bold text-stone-900 text-sm">Engineering Qualifications</h5>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Degree in Engineering, licensed with COREN and the Nigerian Society of Engineers (NSE), with advanced certifications in infrastructure management.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h5 className="font-bold text-stone-900 text-sm">Professional Track Record</h5>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Extensive career leading complex infrastructure, rural electrification, and civil engineering projects empowering local Niger Delta technical talent.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <h5 className="font-bold text-stone-900 text-sm">Community Stewardship</h5>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Founder of grassroots intervention initiatives providing emergency relief, flood advocacy, and scholarships to over 10,000 citizens.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-white border border-stone-200 shadow-sm space-y-1.5">
                <div className="w-8 h-8 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
                  <Users className="w-4 h-4" />
                </div>
                <h5 className="font-bold text-stone-900 text-sm">Legislative Philosophy</h5>
                <p className="text-xs text-stone-500 leading-relaxed">
                  Lawmaking that directly solves constituents' problems, open physical offices in every LGA, and bi-annual public reporting.
                </p>
              </div>
            </div>

            {/* Quote Block */}
            <div className="p-5 rounded-xl bg-emerald-900 text-white shadow-md">
              <p className="font-editorial italic text-base sm:text-lg text-emerald-100">
                "Real leadership is not measured by the titles we accumulate, but by the tangible relief we bring to the market trader, the student, the artisan, and the vulnerable elderly citizen."
              </p>
              <p className="text-xs text-emerald-300 font-semibold mt-2 uppercase tracking-wider">
                — {config.candidateName}
              </p>
            </div>
          </div>
        </div>

        {/* Structured Milestone Timeline */}
        <div className="mt-16 pt-12 border-t border-stone-200">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight">
              Journey of Leadership & Service
            </h3>
            <p className="text-sm text-stone-600 mt-2">
              Key milestones demonstrating consistency, readiness, and steadfast commitment to public good.
            </p>
          </div>

          <div className="relative">
            {/* Central line for desktop */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-stone-300 -translate-x-1/2" />

            <div className="space-y-8 md:space-y-12">
              {CANDIDATE_MILESTONES.map((milestone, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <div
                    key={milestone.year}
                    className={`relative flex flex-col md:flex-row items-center ${
                      isEven ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Date badge on the timeline node */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-emerald-700 text-white font-bold text-xs items-center justify-center border-4 border-stone-50 shadow-md z-10">
                      {milestone.year}
                    </div>

                    {/* Content Card */}
                    <div className="w-full md:w-1/2 p-2 sm:p-4">
                      <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition">
                        <div className="flex items-center justify-between mb-2">
                          <span className="md:hidden inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                            {milestone.year}
                          </span>
                          <span className="text-[11px] uppercase tracking-wider font-semibold text-stone-400">
                            {milestone.category.replace('_', ' ')}
                          </span>
                        </div>

                        <h4 className="text-base sm:text-lg font-bold text-stone-900">
                          {milestone.title}
                        </h4>
                        <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                          {milestone.role}
                        </p>
                        <p className="text-sm text-stone-600 mt-2 leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CollapsibleSection>

      </div>
    </section>
  );
};
