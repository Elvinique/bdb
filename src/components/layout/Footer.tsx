import React, { useState } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import {
  ShieldCheck,
  Heart,
  Send,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  CheckCircle2
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { config, navigateTo, setIsDonationModalOpen, setIsVolunteerModalOpen, setIsLegalModalOpen, setLegalModalTab, notify } = useCampaign();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      notify('Invalid Email', 'Please enter a valid email address.', 'warning');
      return;
    }
    setSubscribed(true);
    notify('Subscribed to Updates', 'Thank you! You will receive our official campaign newsletters and community alerts.', 'success');
    setNewsletterEmail('');
  };

  const openLegal = (tab: 'finance' | 'terms' | 'privacy') => {
    setLegalModalTab(tab);
    setIsLegalModalOpen(true);
  };

  return (
    <footer id="campaign-global-footer" className="bg-stone-950 text-stone-300 border-t border-stone-800">
      {/* Top Banner / Newsletter strip */}
      <div className="border-b border-stone-800/80 py-10 bg-stone-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-between">
            <div>
              <span className="text-xs font-semibold tracking-wider text-emerald-400 uppercase">
                STAY INFORMED • DIRECT CITIZEN DISPATCH
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1">
                Receive Regular Campaign & Legislative Dispatches
              </h3>
              <p className="text-sm text-stone-400 mt-2 max-w-xl">
                Get firsthand briefings on town hall dates, policy positions, and constituent action alerts. No spam, ever.
              </p>
            </div>

            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md md:ml-auto w-full">
              <input
                id="newsletter-email-input"
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="bg-stone-800 border border-stone-700 rounded-lg px-4 py-2.5 text-sm text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 flex-grow"
              />
              <button
                id="newsletter-submit-btn"
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition flex items-center justify-center gap-2 shrink-0"
              >
                {subscribed ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                    <span>Subscribed</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main 4-Column Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Candidate Profile & Slogan (spans 2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              {config.partyLogoUrl ? (
                <div className="w-11 h-11 rounded-full overflow-hidden bg-white border border-emerald-500/60 p-0.5 shadow-sm shrink-0">
                  <img src={config.partyLogoUrl} alt={config.partyName} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
              ) : (
                <div className="w-10 h-10 rounded-lg bg-emerald-800 border border-emerald-600/50 flex items-center justify-center text-white font-editorial font-bold text-base">
                  {config.candidateName.slice(0, 1) === '[' ? 'NG' : config.candidateName.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('')}
                </div>
              )}
              <div>
                <h4 className="font-bold text-white text-base tracking-tight">{config.candidateName}</h4>
                <p className="text-xs text-emerald-400 font-medium">{config.candidateTitle} • {config.partyName}</p>
              </div>
            </div>

            <p className="text-sm text-stone-400 leading-relaxed max-w-sm">
              "{config.campaignSlogan}" — Dedicated to accessible representation, community empowerment, and transparent legislative delivery for {config.constituencyName}, {config.stateName}.
            </p>

            <div className="space-y-2 text-xs text-stone-400 pt-2">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{config.headquartersAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{config.campaignEmail}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{config.campaignPhone}</span>
              </div>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  id="footer-nav-about"
                  onClick={() => navigateTo('about', 'about-section')}
                  className="text-stone-400 hover:text-white transition"
                >
                  About Candidate
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-vision"
                  onClick={() => navigateTo('vision', 'vision-section')}
                  className="text-stone-400 hover:text-white transition"
                >
                  Vision & Priorities
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-the-plan"
                  onClick={() => navigateTo('vision', 'the-plan-section')}
                  className="text-stone-400 hover:text-white transition"
                >
                  The Legislative Plan
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-constituency"
                  onClick={() => navigateTo('constituency', 'constituency-section')}
                  className="text-stone-400 hover:text-white transition"
                >
                  Our Constituency
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-news"
                  onClick={() => navigateTo('news', 'news-section')}
                  className="text-stone-400 hover:text-white transition"
                >
                  News & Updates
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-events"
                  onClick={() => navigateTo('events', 'events-section')}
                  className="text-stone-400 hover:text-white transition"
                >
                  Town Halls & Events
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-social-feed"
                  onClick={() => navigateTo('home', 'social-feed-section')}
                  className="text-stone-400 hover:text-white transition flex items-center gap-1.5"
                >
                  <span>Social Media Feed</span>
                  <span className="px-1.5 py-0.2 text-[10px] rounded bg-emerald-900/60 text-emerald-400 font-semibold">Live</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Get Involved */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4">
              Get Involved
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  id="footer-nav-volunteer"
                  onClick={() => setIsVolunteerModalOpen(true)}
                  className="text-stone-400 hover:text-white transition flex items-center gap-1.5"
                >
                  <span>Volunteer With Us</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-feedback"
                  onClick={() => navigateTo('home', 'community-voice-section')}
                  className="text-stone-400 hover:text-white transition"
                >
                  Voice Your Concern
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-donate"
                  onClick={() => setIsDonationModalOpen(true)}
                  className="text-emerald-400 hover:text-emerald-300 font-medium transition flex items-center gap-1.5"
                >
                  <Heart className="w-3.5 h-3.5 fill-emerald-400" />
                  <span>Donate to Campaign</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-transparency"
                  onClick={() => navigateTo('home', 'transparency-section')}
                  className="text-stone-400 hover:text-white transition"
                >
                  Campaign Transparency
                </button>
              </li>
              <li>
                <button
                  id="footer-nav-contact"
                  onClick={() => navigateTo('contact', 'contact-section')}
                  className="text-stone-400 hover:text-white transition"
                >
                  Contact Campaign Office
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal & Compliance */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Legal & Compliance</span>
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  id="footer-legal-finance"
                  onClick={() => openLegal('finance')}
                  className="text-stone-400 hover:text-white transition text-left"
                >
                  Campaign Finance Disclosures
                </button>
              </li>
              <li>
                <button
                  id="footer-legal-terms"
                  onClick={() => openLegal('terms')}
                  className="text-stone-400 hover:text-white transition text-left"
                >
                  Donation Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  id="footer-legal-privacy"
                  onClick={() => openLegal('privacy')}
                  className="text-stone-400 hover:text-white transition text-left"
                >
                  Privacy & Data Notice (NDPR)
                </button>
              </li>
              <li>
                <span className="text-xs text-stone-500 block pt-1">
                  Compliant with Nigerian Electoral Act & INEC voluntary campaign contribution guidelines.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Campaign Disclaimer */}
        <div className="mt-12 pt-8 border-t border-stone-800 text-xs text-stone-400 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p>
              © {config.electionYear} {config.candidateName} Campaign Organization. All rights reserved.
            </p>
            <p className="text-[11px] text-stone-500">
              Official digital campaign website and civic portal for the Federal House of Representatives election in {config.constituencyName}, {config.stateName}.
            </p>
          </div>

          <div className="flex items-center gap-3 text-stone-400">
            <span className="px-2.5 py-1 rounded bg-stone-900 border border-stone-800 text-[11px] font-mono text-emerald-400">
              PROTOTYPE DEMONSTRATION
            </span>
            <button
              id="footer-admin-link"
              onClick={() => navigateTo('admin')}
              className="text-stone-400 hover:text-stone-200 transition text-[11px] underline"
            >
              Campaign Staff Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
