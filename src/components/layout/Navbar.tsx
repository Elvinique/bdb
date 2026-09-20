import React, { useState, useEffect } from 'react';
import { useCampaign, AppView } from '../../context/CampaignContext';
import {
  Home,
  Quote,
  Landmark,
  Users,
  Shield,
  Target,
  Compass,
  FileText,
  Calendar,
  MessageSquare,
  Camera,
  Phone,
  Lock,
  Heart,
  Menu,
  X,
  ChevronRight,
  HandHeart
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    config,
    activeView,
    navigateTo,
    setIsDonationModalOpen,
    setIsVolunteerModalOpen,
    setDonationPresetAmount
  } = useCampaign();

  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  // Desktop horizontal nav items
  const desktopNavItems: { label: string; view: AppView; sectionId?: string }[] = [
    { label: 'Home', view: 'home', sectionId: 'hero-section' },
    { label: 'Why Running', view: 'home', sectionId: 'why-running-section' },
    { label: 'Green Chamber', view: 'home', sectionId: 'green-chamber-mandate-section' },
    { label: 'About', view: 'about', sectionId: 'about-section' },
    { label: 'Vision & Agenda', view: 'vision', sectionId: 'vision-section' },
    { label: 'Constituency', view: 'constituency', sectionId: 'constituency-section' },
    { label: 'News', view: 'news', sectionId: 'news-section' },
    { label: 'Events', view: 'events', sectionId: 'events-section' },
    { label: 'Get Involved', view: 'get-involved', sectionId: 'get-involved-section' },
  ];

  // Mobile drawer links matching NNPP registration site structure (Images 1 & 2)
  const mobileNavItems = [
    { label: 'Home / Overview', view: 'home' as AppView, sectionId: 'hero-section', icon: Home },
    { label: 'Why I Am Running', view: 'home' as AppView, sectionId: 'why-running-section', icon: Quote },
    { label: 'The Green Chamber Mandate', view: 'home' as AppView, sectionId: 'green-chamber-mandate-section', icon: Landmark, badge: 'Abuja 2027' },
    { label: 'About Candidate', view: 'about' as AppView, sectionId: 'about-section', icon: Users },
    { label: 'Vision & Priorities', view: 'vision' as AppView, sectionId: 'vision-section', icon: Shield },
    { label: 'Action Blueprint', view: 'vision' as AppView, sectionId: 'the-plan-section', icon: Target },
    { label: 'Constituency & Wards', view: 'constituency' as AppView, sectionId: 'constituency-section', icon: Compass },
    { label: 'News & Media', view: 'news' as AppView, sectionId: 'news-section', icon: FileText },
    { label: 'Events & Town Halls', view: 'events' as AppView, sectionId: 'events-section', icon: Calendar },
    { label: 'Community Voice Registry', view: 'home' as AppView, sectionId: 'community-voice-section', icon: MessageSquare },
    { label: 'Media Gallery', view: 'home' as AppView, sectionId: 'gallery-section', icon: Camera },
    { label: 'Contact Office', view: 'contact' as AppView, sectionId: 'contact-section', icon: Phone },
  ];

  const handleNavClick = (view: AppView, sectionId?: string) => {
    setMobileMenuOpen(false);
    navigateTo(view, sectionId);
  };

  const handleDonateClick = () => {
    setMobileMenuOpen(false);
    setDonationPresetAmount(10000);
    setIsDonationModalOpen(true);
  };

  const handleVolunteerClick = () => {
    setMobileMenuOpen(false);
    setIsVolunteerModalOpen(true);
  };

  return (
    <header
      id="main-navigation-header"
      className="sticky top-0 z-40 w-full max-w-full font-sans transition-all duration-300"
    >
      {/* 1. Civic Institutional Micro-Bar (Matches NNPP Green Header Top Strip) */}
      <div className="bg-emerald-950 text-stone-300 text-[10px] sm:text-[11px] border-b border-emerald-800/60 px-3 sm:px-6 lg:px-8 py-1.5 overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 tracking-wide font-medium truncate">
            {/* Nigerian Flag Emblem */}
            <span className="inline-flex items-center rounded-xs overflow-hidden shadow-xs h-2.5 w-4 shrink-0 border border-emerald-800">
              <span className="w-1/3 h-full bg-emerald-600" />
              <span className="w-1/3 h-full bg-white" />
              <span className="w-1/3 h-full bg-emerald-600" />
            </span>
            <span className="text-emerald-400 font-bold tracking-wider uppercase text-[10px] hidden xs:inline">
              NNPP
            </span>
            <span className="text-emerald-700 hidden xs:inline">•</span>
            <span className="text-stone-300 text-[10px] tracking-normal truncate">
              {config.constituencyName} Federal Constituency 2027
            </span>
          </div>

          <div className="flex items-center gap-3 text-[10px] shrink-0">
            <span className="hidden md:inline text-amber-400 font-medium italic tracking-wide">
              "Let's Build As One"
            </span>
            <span className="text-emerald-800 hidden md:inline">•</span>
            <button
              id="header-staff-portal-link"
              onClick={() => handleNavClick('admin')}
              className="flex items-center gap-1.5 text-stone-300 hover:text-white transition font-medium"
              title="Official Campaign Operations Portal"
            >
              <Lock className="w-3 h-3 text-emerald-400" />
              <span>Staff Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar (Clean & Fully Responsive) */}
      <div
        className={`transition-all duration-300 w-full max-w-full ${
          isScrolled
            ? 'bg-stone-900/98 backdrop-blur-xl shadow-2xl py-2.5 border-b border-stone-800'
            : 'bg-stone-900/92 backdrop-blur-md py-3 sm:py-3.5 border-b border-stone-800/80 text-stone-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand & Candidate Identity (Left) */}
          <button
            id="nav-brand-logo-btn"
            onClick={() => handleNavClick('home', 'hero-section')}
            className="flex items-center gap-2.5 sm:gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl p-1 min-w-0"
          >
            {/* Party Logo in Dignified Circular Medal with Double Emerald Ring (matching NNPP logo-wrap) */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white border-2 border-emerald-500/80 p-0.5 shadow-md shrink-0 group-hover:ring-2 group-hover:ring-emerald-400/40 transition duration-300">
              <img
                src={config.partyLogoUrl || '/assets/images/party-logo.png'}
                alt={config.partyName}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Candidate Name & Constituency Subtitle */}
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-extrabold text-stone-100 text-xs xs:text-sm sm:text-base tracking-tight truncate group-hover:text-emerald-400 transition-colors">
                  {config.candidateName}
                </span>
                <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase bg-emerald-950 text-emerald-400 border border-emerald-800 shrink-0">
                  NNPP
                </span>
              </div>
              <p className="text-[10px] sm:text-[11px] text-stone-400 font-medium tracking-normal truncate">
                House of Reps • {config.constituencyName}
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links (Only visible on large screens) */}
          <nav aria-label="Desktop Navigation" className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {desktopNavItems.map((item) => {
              const isActive = activeView === item.view;
              return (
                <button
                  key={item.label}
                  id={`nav-link-${item.view}-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => handleNavClick(item.view, item.sectionId)}
                  className={`relative px-2.5 py-1.5 text-xs font-medium tracking-wide transition-all rounded-lg duration-200 ${
                    isActive
                      ? 'text-emerald-400 font-semibold bg-emerald-950/40'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-2.5 right-2.5 h-0.5 bg-emerald-400 rounded-full shadow-sm shadow-emerald-400/50" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Desktop Right Action CTAs (Volunteer & Donate) */}
          <div className="hidden lg:flex items-center gap-2.5 shrink-0">
            <button
              id="nav-secondary-volunteer-btn"
              onClick={handleVolunteerClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-stone-200 hover:text-white bg-stone-800/80 hover:bg-stone-800 border border-stone-700 hover:border-emerald-500/60 transition shadow-sm active:scale-95"
            >
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>Volunteer</span>
            </button>

            <button
              id="nav-primary-donate-btn"
              onClick={handleDonateClick}
              className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold px-4 py-2 rounded-full text-xs tracking-wider uppercase shadow-lg shadow-emerald-950/60 hover:shadow-emerald-600/30 hover:brightness-110 active:scale-95 transition-all border border-emerald-400/40"
            >
              <span>DONATE</span>
            </button>
          </div>

          {/* Mobile Menu Toggle Button: Exact NNPP Square Button Design [☰] (Image 2) */}
          <div className="lg:hidden flex items-center shrink-0">
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setMobileMenuOpen(true)}
              className="w-10 h-10 rounded-xl border border-stone-700/80 bg-stone-800/90 hover:bg-stone-700 text-stone-200 hover:text-white flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-emerald-500 transition active:scale-95 shadow-sm"
              aria-label="Open Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              <Menu className="w-5 h-5 text-stone-200" />
            </button>
          </div>

        </div>
      </div>

      {/* 3. Full Mobile Navigation Drawer Modal (Exact Replicating Image 1 from NNPP Site) */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="lg:hidden fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-sm flex flex-col justify-start animate-in fade-in duration-200"
          onClick={() => setMobileMenuOpen(false)}
        >
          {/* Slide-Down White Card Drawer Sheet matching Image 1 */}
          <div
            className="w-full max-h-[92vh] bg-white text-stone-900 rounded-b-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-top duration-300 border-b border-stone-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drawer Top Header (Matching Image 1: Logo + Title + Square [✕] Close Button) */}
            <div className="px-5 py-4 border-b border-stone-200 flex items-center justify-between bg-stone-50/90">
              <div className="flex items-center gap-3 min-w-0">
                <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white border-2 border-emerald-600/80 p-0.5 shadow-sm shrink-0">
                  <img
                    src={config.partyLogoUrl || '/assets/images/party-logo.png'}
                    alt={config.partyName}
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <h4 className="text-sm font-extrabold text-stone-900 tracking-tight leading-tight truncate">
                    {config.candidateName}
                  </h4>
                  <p className="text-[10px] font-bold text-emerald-800 tracking-wider uppercase truncate">
                    OFFICIAL CAMPAIGN WEBSITE
                  </p>
                </div>
              </div>

              {/* Square Close Button [✕] (Image 1) */}
              <button
                id="mobile-nav-close-btn"
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-xl border border-stone-300 bg-white hover:bg-stone-100 text-stone-700 hover:text-stone-950 flex items-center justify-center transition active:scale-95 shadow-xs shrink-0"
                aria-label="Close Navigation Menu"
              >
                <X className="w-5 h-5 text-stone-700" />
              </button>
            </div>

            {/* Drawer Scrollable Navigation Links (Image 1 style) */}
            <div className="overflow-y-auto px-4 py-3 space-y-1 divide-y divide-stone-100">
              <div className="space-y-1 pb-2">
                {mobileNavItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.label}
                      id={`mobile-menu-link-${item.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}
                      onClick={() => handleNavClick(item.view, item.sectionId)}
                      className="group flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-stone-800 hover:text-emerald-900 hover:bg-emerald-50/80 font-medium text-xs sm:text-sm transition text-left"
                    >
                      <span className="flex items-center gap-3 min-w-0">
                        <span className="w-8 h-8 rounded-lg bg-stone-100 group-hover:bg-emerald-100 text-stone-600 group-hover:text-emerald-700 flex items-center justify-center shrink-0 transition-colors">
                          <Icon className="w-4 h-4" />
                        </span>
                        <span className="truncate">{item.label}</span>
                      </span>

                      <div className="flex items-center gap-2 shrink-0">
                        {item.badge && (
                          <span className="px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300/60">
                            {item.badge}
                          </span>
                        )}
                        <ChevronRight className="w-4 h-4 text-stone-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition" />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Action Buttons & Portal Strip (Image 1 style) */}
              <div className="pt-3 pb-2 space-y-2.5">
                {/* Primary Donate Action */}
                <button
                  id="mobile-drawer-donate-btn"
                  onClick={handleDonateClick}
                  className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md transition active:scale-98"
                >
                  <Heart className="w-4 h-4 text-emerald-200 fill-emerald-200" />
                  <span>SUPPORT / DONATE TO CAMPAIGN</span>
                </button>

                {/* Secondary Volunteer Action */}
                <button
                  id="mobile-drawer-volunteer-btn"
                  onClick={handleVolunteerClick}
                  className="w-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 text-xs sm:text-sm border border-stone-300 transition active:scale-98"
                >
                  <HandHeart className="w-4 h-4 text-emerald-700" />
                  <span>Join as Campaign Volunteer</span>
                </button>

                {/* Discreet Campaign Staff Portal link */}
                <div className="pt-1 text-center">
                  <button
                    onClick={() => handleNavClick('admin')}
                    className="inline-flex items-center gap-1.5 text-stone-500 hover:text-stone-800 text-xs font-medium py-1"
                  >
                    <Lock className="w-3.5 h-3.5 text-stone-400" />
                    <span>Official Campaign Staff Portal</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
