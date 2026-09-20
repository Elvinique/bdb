import React, { useState, useEffect } from 'react';
import { useCampaign, AppView } from '../../context/CampaignContext';
import {
  Menu,
  X,
  ChevronRight,
  Shield,
  Users,
  Compass,
  FileText,
  Calendar,
  Lock,
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

  const navItems: { label: string; view: AppView; sectionId?: string; icon: any }[] = [
    { label: 'Home', view: 'home', sectionId: 'hero-section', icon: Compass },
    { label: 'About', view: 'about', sectionId: 'about-section', icon: Users },
    { label: 'Vision & Agenda', view: 'vision', sectionId: 'vision-section', icon: Shield },
    { label: 'Constituency', view: 'constituency', sectionId: 'constituency-section', icon: Compass },
    { label: 'News', view: 'news', sectionId: 'news-section', icon: FileText },
    { label: 'Events', view: 'events', sectionId: 'events-section', icon: Calendar },
    { label: 'Get Involved', view: 'get-involved', sectionId: 'get-involved-section', icon: HandHeart },
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
      className="sticky top-0 z-40 w-full font-sans transition-all duration-300"
    >
      {/* 1. Civic Institutional Micro-Bar */}
      <div className="bg-stone-950 text-stone-400 text-[11px] border-b border-stone-800/80 px-4 sm:px-6 lg:px-8 py-1.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 tracking-wide font-medium">
            {/* Nigerian Flag Emblem */}
            <span className="inline-flex items-center rounded-xs overflow-hidden shadow-xs h-2.5 w-4 shrink-0 border border-emerald-900/60">
              <span className="w-1/3 h-full bg-emerald-600" />
              <span className="w-1/3 h-full bg-white" />
              <span className="w-1/3 h-full bg-emerald-600" />
            </span>
            <span className="text-stone-300 font-semibold tracking-wider uppercase text-[10px] hidden sm:inline">
              Federal Republic of Nigeria
            </span>
            <span className="text-stone-600 hidden sm:inline">•</span>
            <span className="text-stone-400 text-[10px] tracking-normal">
              Khana/Gokana Federal Constituency 2027
            </span>
          </div>

          <div className="flex items-center gap-4 text-[10px]">
            <span className="hidden md:inline text-amber-400 font-medium italic tracking-wide">
              "Let's Build As One"
            </span>
            <span className="text-stone-700 hidden md:inline">•</span>
            <button
              id="header-staff-portal-link"
              onClick={() => handleNavClick('admin')}
              className="flex items-center gap-1.5 text-stone-400 hover:text-emerald-400 transition font-medium"
              title="Official Campaign Operations Portal"
            >
              <Lock className="w-3 h-3 text-stone-500" />
              <span>Staff Portal</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Main High-Glass Navigation Header */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-stone-900/95 backdrop-blur-xl shadow-2xl py-2.5 border-b border-stone-800'
            : 'bg-stone-900/90 backdrop-blur-md py-3.5 border-b border-stone-800/80 text-stone-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          {/* Brand & Candidate Identity */}
          <button
            id="nav-brand-logo-btn"
            onClick={() => handleNavClick('home', 'hero-section')}
            className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl p-1 shrink-0"
          >
            {/* Party Logo in Dignified Circular Medal */}
            <div className="relative w-11 h-11 rounded-full overflow-hidden bg-white border border-stone-700 p-0.5 shadow-md shrink-0 group-hover:border-emerald-500 group-hover:ring-2 group-hover:ring-emerald-500/20 transition duration-300">
              <img
                src={config.partyLogoUrl || '/assets/images/party-logo.png'}
                alt={config.partyName}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Candidate Name & Constituency Details */}
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-stone-100 text-sm sm:text-base tracking-tight group-hover:text-emerald-400 transition-colors">
                  {config.candidateName}
                </span>
                <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/70">
                  NNPP
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-medium tracking-normal line-clamp-1">
                House of Representatives • Khana/Gokana
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links (Clean Minimalist Active States) */}
          <nav aria-label="Desktop Navigation" className="hidden lg:flex items-center space-x-1 xl:space-x-2">
            {navItems.map((item) => {
              // Exact active condition to prevent multiple buttons showing active
              const isActive = activeView === item.view;
              return (
                <button
                  key={item.label}
                  id={`nav-link-${item.view}`}
                  onClick={() => handleNavClick(item.view, item.sectionId)}
                  className={`relative px-3 py-1.5 text-xs font-medium tracking-wide transition-all rounded-lg duration-200 ${
                    isActive
                      ? 'text-emerald-400 font-semibold bg-emerald-950/40'
                      : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-emerald-400 rounded-full shadow-sm shadow-emerald-400/50" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTAs */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Secondary Volunteer Button */}
            <button
              id="nav-secondary-volunteer-btn"
              onClick={handleVolunteerClick}
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-stone-200 hover:text-white bg-stone-800/80 hover:bg-stone-800 border border-stone-700/90 hover:border-emerald-500/60 transition shadow-sm active:scale-95"
            >
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span>Volunteer</span>
            </button>

            {/* Primary Regal Donate Button */}
            <button
              id="nav-primary-donate-btn"
              onClick={handleDonateClick}
              className="inline-flex items-center justify-center bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600 hover:from-emerald-500 hover:to-emerald-500 text-white font-bold px-4 sm:px-5 py-2 rounded-full text-xs tracking-wider uppercase shadow-lg shadow-emerald-950/60 hover:shadow-emerald-600/30 hover:brightness-110 active:scale-95 transition-all border border-emerald-400/40"
            >
              <span>DONATE</span>
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-nav-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-stone-300 hover:text-white hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-stone-900/98 backdrop-blur-2xl border-b border-stone-800 px-5 pt-4 pb-6 shadow-2xl animate-in slide-in-from-top-3 duration-200"
        >
          <div className="flex flex-col space-y-1.5">
            <div className="pb-3 mb-2 border-b border-stone-800 flex items-center justify-between text-xs text-stone-400">
              <span className="font-medium">{config.constituencyName}</span>
              <span className="text-emerald-400 font-bold tracking-wider uppercase text-[10px] bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/80">
                NNPP 2027
              </span>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.view;
              return (
                <button
                  key={item.label}
                  id={`mobile-nav-link-${item.view}`}
                  onClick={() => handleNavClick(item.view, item.sectionId)}
                  className={`flex items-center justify-between w-full px-3.5 py-2.5 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/80 font-semibold'
                      : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <Icon className="w-4 h-4 text-emerald-400" />
                    {item.label}
                  </span>
                  <ChevronRight className="w-4 h-4 text-stone-500" />
                </button>
              );
            })}

            <div className="pt-4 mt-2 border-t border-stone-800 grid grid-cols-2 gap-2.5">
              <button
                id="mobile-nav-volunteer-btn"
                onClick={handleVolunteerClick}
                className="flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 p-2.5 rounded-xl text-xs font-semibold border border-stone-700 transition"
              >
                <Users className="w-4 h-4 text-emerald-400" />
                Volunteer
              </button>

              <button
                id="mobile-nav-donate-btn"
                onClick={handleDonateClick}
                className="flex items-center justify-center bg-gradient-to-r from-emerald-600 to-emerald-500 text-white p-2.5 rounded-xl text-xs font-bold tracking-wide uppercase shadow transition"
              >
                Donate
              </button>
            </div>

            {/* Discreet Staff Portal link at bottom of mobile menu */}
            <div className="pt-3 text-center">
              <button
                onClick={() => handleNavClick('admin')}
                className="inline-flex items-center gap-1.5 text-stone-400 hover:text-stone-200 text-xs font-medium"
              >
                <Lock className="w-3 h-3 text-stone-400" />
                Campaign Staff Operations
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
