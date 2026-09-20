import React from 'react';
import { useCampaign } from '../../context/CampaignContext';
import {
  UserPlus,
  Radio,
  Home,
  Share2,
  Wallet,
  ArrowRight,
  Users
} from 'lucide-react';

export const GetInvolvedSection: React.FC = () => {
  const { setIsVolunteerModalOpen, setIsDonationModalOpen, navigateTo } = useCampaign();

  const involvementCards = [
    {
      id: 'volunteer',
      title: 'VOLUNTEER',
      subtitle: 'Field & Community Action',
      description: 'Give your time and skills to help us reach more communities, conduct ward listening tours, and register voters.',
      icon: UserPlus,
      cta: 'Volunteer Application',
      action: () => setIsVolunteerModalOpen(true),
      badge: 'High Impact'
    },
    {
      id: 'join',
      title: 'JOIN THE CAMPAIGN',
      subtitle: 'Stay Engaged',
      description: 'Stay connected and receive firsthand campaign briefings, townhall invites, and direct dispatches from the candidate.',
      icon: Radio,
      cta: 'Subscribe for Updates',
      action: () => {
        const el = document.getElementById('newsletter-email-input');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          el.focus();
        }
      },
      badge: 'Stay Informed'
    },
    {
      id: 'host',
      title: 'HOST A COMMUNITY EVENT',
      subtitle: 'Neighborhood Dialogues',
      description: 'Help bring conversations about our vision closer to your community by hosting a small compound or street listening session.',
      icon: Home,
      cta: 'Host a Ward Dialogue',
      action: () => navigateTo('contact', 'contact-section'),
      badge: 'Grassroots'
    },
    {
      id: 'digital',
      title: 'BECOME A DIGITAL ADVOCATE',
      subtitle: 'Civic Fact-Sharing',
      description: 'Help share campaign information responsibly online. Combat disinformation and elevate issues affecting our constituency.',
      icon: Share2,
      cta: 'Join Digital Corps',
      action: () => setIsVolunteerModalOpen(true),
      badge: 'Online'
    },
    {
      id: 'support',
      title: 'SUPPORT THE CAMPAIGN',
      subtitle: 'People-Powered Funding',
      description: 'Contribute to the campaign. Every voluntary naira directly powers community townhalls, campaign materials, and logistics.',
      icon: Wallet,
      cta: 'Make a Contribution',
      action: () => setIsDonationModalOpen(true),
      badge: 'Grassroots Fund'
    }
  ];

  return (
    <section
      id="get-involved-section"
      className="py-16 sm:py-24 bg-white text-stone-900 border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider border border-emerald-200">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>GRASSROOTS MOBILIZATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
            Be Part of the Movement
          </h2>
          <p className="text-base sm:text-lg text-stone-600 font-normal">
            No single person can transform our constituency alone. Whether you give an hour a week, host a dialogue, or mobilize your street, your participation builds a stronger voice.
          </p>
        </div>

        {/* 5 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {involvementCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className="flex flex-col justify-between p-7 rounded-3xl bg-stone-50 hover:bg-white border border-stone-200 hover:border-emerald-500/40 shadow-xs hover:shadow-md transition duration-200 group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white border border-stone-200 flex items-center justify-center text-emerald-700 shadow-xs group-hover:scale-105 transition">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-800 bg-emerald-100/60 px-2.5 py-1 rounded-full">
                      {card.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-stone-900 tracking-tight">
                      {card.title}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-700 mt-0.5">
                      {card.subtitle}
                    </p>
                    <p className="text-sm text-stone-600 mt-3 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-stone-200/80">
                  <button
                    id={`get-involved-${card.id}-btn`}
                    onClick={card.action}
                    className="w-full flex items-center justify-between text-xs font-bold text-emerald-800 hover:text-emerald-600 transition"
                  >
                    <span>{card.cta}</span>
                    <ArrowRight className="w-4 h-4 text-emerald-600 group-hover:translate-x-1 transition" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* Quick Stats & Volunteer Hotline Box */}
          <div className="flex flex-col justify-between p-7 rounded-3xl bg-emerald-900 text-white shadow-md">
            <div className="space-y-3">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
                VOLUNTEER HOTLINE
              </span>
              <h3 className="text-2xl font-bold tracking-tight">
                Ready to take action right away?
              </h3>
              <p className="text-sm text-emerald-100 leading-relaxed">
                Connect directly with your ward coordinator or visit our campaign headquarters during office hours (Mon–Sat, 9AM–6PM).
              </p>
            </div>

            <div className="pt-6 border-t border-emerald-800/80 space-y-3">
              <button
                onClick={() => setIsVolunteerModalOpen(true)}
                className="w-full bg-white hover:bg-emerald-50 text-emerald-900 font-bold py-3 rounded-xl text-xs transition shadow-sm"
              >
                Register as Campaign Volunteer
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
