import React from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { ShieldCheck, PieChart, Users, Calendar, Coins, TrendingUp } from 'lucide-react';

export const TransparencySection: React.FC = () => {
  const { transparencyData } = useCampaign();

  return (
    <section
      id="transparency-section"
      className="py-16 sm:py-24 bg-stone-50 text-stone-900 border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>ACCOUNTABILITY IN PRACTICE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Campaign Transparency
          </h2>
          <p className="text-base sm:text-lg text-stone-600">
            Responsible leadership starts before election day. We believe citizens deserve clear, open accounting of how voluntary campaign resources are raised and spent.
          </p>
          <div className="inline-block px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-mono font-semibold border border-amber-300/60">
            Prototype Data • For Demonstration Purposes
          </div>
        </div>

        {/* 4 Sample Prototype Metrics Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          
          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-lg bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <Coins className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Campaign Contributions
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-stone-900">
              ₦{transparencyData.totalContributionsAmount.toLocaleString()}
            </p>
            <p className="text-[11px] text-stone-400">Voluntary citizen contributions (Prototype)</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-lg bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-700">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Citizen Donors
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-stone-900">
              {transparencyData.supporterCount.toLocaleString()}+
            </p>
            <p className="text-[11px] text-stone-400">Individuals supporting grassroots movement</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-lg bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700">
              <Calendar className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Community Events
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-stone-900">
              {transparencyData.eventsCompleted}
            </p>
            <p className="text-[11px] text-stone-400">Ward sessions, listening tours & townhalls</p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm space-y-2">
            <div className="w-10 h-10 rounded-lg bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-700">
              <Users className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Active Volunteers
            </p>
            <p className="text-2xl sm:text-3xl font-extrabold text-stone-900">
              {transparencyData.activeVolunteers.toLocaleString()}+
            </p>
            <p className="text-[11px] text-stone-400">Registered across all electoral wards</p>
          </div>

        </div>

        {/* How Campaign Resources Are Used */}
        <div className="p-6 sm:p-10 rounded-3xl bg-white border border-stone-200 shadow-sm">
          <div className="max-w-2xl mb-8 space-y-2">
            <h3 className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight">
              How Campaign Resources Are Used
            </h3>
            <p className="text-sm text-stone-600">
              Every voluntary naira is deployed directly into field community engagement, voter education, and grassroots outreach.
            </p>
          </div>

          {/* Segmented Progress Bar Visualization */}
          <div className="mb-8">
            <div className="w-full h-5 rounded-full overflow-hidden flex bg-stone-100 p-0.5 border border-stone-200">
              {transparencyData.resourceAllocation.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    width: `${item.percentage}%`,
                    backgroundColor: item.color
                  }}
                  className="h-full first:rounded-l-full last:rounded-r-full transition-all duration-500 hover:opacity-90 relative group"
                  title={`${item.category}: ${item.percentage}%`}
                />
              ))}
            </div>
          </div>

          {/* Detailed Resource Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transparencyData.resourceAllocation.map((cat, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-stone-50 border border-stone-200 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: cat.color }}
                    />
                    <h4 className="text-sm font-bold text-stone-900">
                      {cat.category}
                    </h4>
                  </div>
                  <span className="text-sm font-extrabold text-stone-900">
                    {cat.percentage}%
                  </span>
                </div>

                <p className="text-xs text-stone-500 leading-relaxed">
                  {cat.description}
                </p>

                <div className="pt-2 border-t border-stone-200 text-xs font-semibold text-stone-700 flex justify-between">
                  <span className="text-stone-400">Allocated (Est):</span>
                  <span>₦{cat.amount.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-stone-200 text-xs text-stone-500 text-center">
            Independent audit reports will be compiled and published bi-annually during the campaign cycle.
          </div>
        </div>

      </div>
    </section>
  );
};
