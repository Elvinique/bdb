import React, { useState } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { CampaignEvent } from '../../types';
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  Ticket
} from 'lucide-react';
import { CollapsibleSection } from '../common/CollapsibleSection';

export const EventsSection: React.FC = () => {
  const { events, setSelectedEventForRsvp } = useCampaign();
  const [filterType, setFilterType] = useState<string>('all');

  const filteredEvents = filterType === 'all'
    ? events
    : events.filter(e => e.type === filterType);

  return (
    <section
      id="events-section"
      className="py-16 sm:py-24 bg-stone-50 text-stone-900 border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              <span>FIELD SCHEDULE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
              Upcoming Town Halls & Gatherings
            </h2>
            <p className="text-base text-stone-600">
              Meet the candidate in person, ask unscripted questions, and contribute your ideas to our legislative agenda.
            </p>
          </div>

          {/* Type Filter Buttons */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {['all', 'Town Hall', 'Youth Engagement', 'Community Outreach', 'Women’s Assembly'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
                  filterType === type
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {type === 'all' ? 'All Events' : type}
              </button>
            ))}
          </div>
        </div>

        <CollapsibleSection
          theme="stone-50"
          collapsedHeightMobile="420px"
          expandLabel="View All Scheduled Campaign Events"
          collapseLabel="Collapse Events Schedule"
          badge="Full Calendar"
        >
          {/* Events Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredEvents.map((evt) => (
            <div
              key={evt.id}
              className="p-7 rounded-3xl bg-white border border-stone-200 shadow-xs hover:shadow-md transition duration-200 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold uppercase tracking-wider">
                    {evt.type}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500">
                    <Users className="w-3.5 h-3.5 text-emerald-600" />
                    <span>
                      {evt.registeredCount} / {evt.capacity} registered
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-stone-900 tracking-tight leading-snug">
                  {evt.title}
                </h3>

                <p className="text-sm text-stone-600 leading-relaxed">
                  {evt.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-stone-100 text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-stone-800">{evt.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{evt.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-emerald-700 font-semibold">
                  Free Admission • All Constituents Welcome
                </span>
                <button
                  id={`event-rsvp-btn-${evt.id}`}
                  onClick={() => setSelectedEventForRsvp(evt)}
                  className="bg-emerald-700 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm"
                >
                  <Ticket className="w-3.5 h-3.5" />
                  <span>RSVP / RESERVE SEAT</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      </div>
    </section>
  );
};
