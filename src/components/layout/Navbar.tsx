import React, { useState, useEffect } from 'react';
import { useCampaign, AppView } from '../../context/CampaignContext';
import {
  Menu,
  X,
  Heart,
  ChevronRight,
  Shield,
  Users,
  Compass,
  FileText,
  Calendar,
  PhoneCall,
  LayoutDashboard,
  Radio
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { config, activeView, navigateTo, setIsDonationModalOpen, setDonationPresetAmount } = useCampaign();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { label: string; view: AppView; sectionId?: string; icon: any }[] = [
    { label: 'Home', view: 'home', sectionId: 'hero-section', icon: Compass },
    { label: 'About', view: 'about', sectionId: 'about-section', icon: Users },
    { label: 'Vision & Plan', view: 'vision', sectionId: 'vision-section', icon: Shield },
    { label: 'Our Constituency', view: 'constituency', sectionId: 'constituency-section', icon: Compass },
    { label: 'News', view: 'news', sectionId: 'news-section', icon: FileText },
    { label: 'Social Feed', view: 'home', sectionId: 'social-feed-section', icon: Radio },
    { label: 'Events', view: 'events', sectionId: 'events-section', icon: Calendar },
    { label: 'Get Involved', view: 'get-involved', sectionId: 'get-involved-section', icon: Users },
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

  return (
    <header
      id="main-navigation-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-stone-900/95 backdrop-blur-md shadow-lg py-2.5 border-b border-stone-800'
          : 'bg-stone-900 text-stone-100 py-3.5 border-b border-stone-800/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand & Candidate Identity */}
        <button
          id="nav-brand-logo-btn"
          onClick={() => handleNavClick('home', 'hero-section')}
          className="flex items-center gap-3 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-lg p-1"
        >
          {/* Candidate avatar or party logo badge */}
          {config.partyLogoUrl ? (
            <div className="relative w-10 h-10 rounded-full overflow-hidden bg-white border border-emerald-500/60 p-0.5 shadow-md shrink-0 group-hover:ring-2 group-hover:ring-emerald-400 transition">
              <img src={config.partyLogoUrl} alt={config.partyName} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
          ) : (
            <div className="relative w-10 h-10 rounded-lg bg-emerald-800 border border-emerald-600/40 flex items-center justify-center text-emerald-100 shadow-inner group-hover:border-amber-400/60 transition">
              <span className="font-extrabold text-sm tracking-wider font-editorial">
                {config.candidateName.slice(0, 1) === '[' ? 'NG' : config.candidateName.split(' ').map(n => n[0]).filter(Boolean).slice(0, 2).join('')}
              </span>
              <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-amber-500 rounded-full border-2 border-stone-900 flex items-center justify-center">
                <span className="w-1.5 h-1.5 bg-stone-900 rounded-full"></span>
              </div>
            </div>
          )}

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-bold text-stone-100 text-sm md:text-base tracking-tight group-hover:text-emerald-300 transition">
                {config.candidateName}
              </span>
              <span className="hidden md:inline-flex px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800/80">
                NNPP • HOUSE OF REPS
              </span>
            </div>
            <span className="text-[11px] text-stone-400 tracking-normal line-clamp-1">
              {config.constituencyName} • {config.stateName}
            </span>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav aria-label="Desktop Navigation" className="hidden lg:flex items-center space-x-1">
          {navItems.map((item) => {
            const isActive = activeView === item.view;
            return (
              <button
                key={item.label}
                id={`nav-link-${item.view}`}
                onClick={() => handleNavClick(item.view, item.sectionId)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium tracking-wide transition-colors ${
                  isActive
                    ? 'text-emerald-300 bg-emerald-950/70 border border-emerald-800/60'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800/60'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2.5">
          {/* Admin Demo shortcut button */}
          <button
            id="nav-admin-dashboard-btn"
            onClick={() => handleNavClick('admin')}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition ${
              activeView === 'admin'
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'text-stone-300 bg-stone-800/80 hover:bg-stone-800 border-stone-700 hover:text-white'
            }`}
            title="Campaign Staff Portal Demonstration"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden xl:inline">Campaign Staff</span> Admin
          </button>

          {/* Primary Donate Button */}
          <button
            id="nav-primary-donate-btn"
            onClick={handleDonateClick}
            className="inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-semibold px-4 py-2 rounded-lg text-xs md:text-sm shadow-md hover:shadow-emerald-900/40 transition active:scale-95 border border-emerald-500/30"
          >
            <Heart className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
            <span>DONATE</span>
          </button>

          {/* Mobile Menu Toggle */}
          <button
            id="mobile-nav-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-stone-900 border-b border-stone-800 px-4 pt-3 pb-6 shadow-2xl animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col space-y-1">
            <div className="pb-2 mb-2 border-b border-stone-800 text-[11px] text-stone-400 flex items-center justify-between">
              <span>{config.campaignSlogan}</span>
              <span className="text-emerald-400 font-semibold">{config.partyName}</span>
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.view;
              return (
                <button
                  key={item.label}
                  id={`mobile-nav-link-${item.view}`}
                  onClick={() => handleNavClick(item.view, item.sectionId)}
                  className={`flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                    isActive
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800/80 font-semibold'
                      : 'text-stone-300 hover:bg-stone-800 hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-emerald-400" />
                    {item.label}
                  </span>
                  <ChevronRight className="w-4 h-4 text-stone-500" />
                </button>
              );
            })}

            <div className="pt-3 mt-2 border-t border-stone-800 grid grid-cols-2 gap-2">
              <button
                id="mobile-nav-admin-btn"
                onClick={() => handleNavClick('admin')}
                className="flex items-center justify-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 p-2.5 rounded-lg text-xs font-medium border border-stone-700"
              >
                <LayoutDashboard className="w-4 h-4 text-emerald-400" />
                Admin Demo
              </button>

              <button
                id="mobile-nav-donate-btn"
                onClick={handleDonateClick}
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white p-2.5 rounded-lg text-xs font-semibold shadow"
              >
                <Heart className="w-4 h-4 text-amber-300 fill-amber-300" />
                Support Campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
