import React, { useState } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { Eye, Settings, ShieldAlert, Sparkles, LayoutDashboard, Check } from 'lucide-react';

interface PresentationBannerProps {
  onOpenConfigEditor: () => void;
}

export const PresentationBanner: React.FC<PresentationBannerProps> = ({ onOpenConfigEditor }) => {
  const { isSampleMode, setIsSampleMode, activeView, navigateTo } = useCampaign();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return (
      <button
        id="reopen-demo-banner-btn"
        onClick={() => setDismissed(false)}
        className="fixed bottom-4 left-4 z-40 flex items-center gap-2 bg-stone-900/90 text-stone-200 hover:text-white px-3 py-1.5 rounded-full text-xs font-medium shadow-lg backdrop-blur-sm border border-stone-700 transition"
      >
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        Candidate Demo Controls
      </button>
    );
  }

  return (
    <aside aria-label="Candidate Presentation Mode" className="bg-gradient-to-r from-stone-900 via-emerald-950 to-stone-900 text-stone-200 text-xs border-b border-emerald-800/40 py-2 px-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30 text-[11px]">
            <Sparkles className="w-3 h-3 text-amber-400" />
            PRESENTATION PROTOTYPE
          </span>
          <span className="hidden sm:inline text-stone-300">
            For Federal House of Representatives Candidate Presentation
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-2">
          {/* Toggle between Sample Candidate Profile & Raw Template Placeholders */}
          <div className="flex items-center bg-stone-800/90 rounded-lg p-0.5 border border-stone-700">
            <button
              id="toggle-sample-mode-btn"
              onClick={() => setIsSampleMode(true)}
              className={`px-2.5 py-1 rounded-md transition font-medium text-[11px] flex items-center gap-1.5 ${
                isSampleMode
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Preview with realistic candidate profile (Engr. Buradum Baribefe Daniel)"
            >
              {isSampleMode && <Check className="w-3 h-3" />}
              Sample Profile
            </button>
            <button
              id="toggle-placeholder-mode-btn"
              onClick={() => setIsSampleMode(false)}
              className={`px-2.5 py-1 rounded-md transition font-medium text-[11px] flex items-center gap-1.5 ${
                !isSampleMode
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-stone-400 hover:text-stone-200'
              }`}
              title="Show editable template tags ([CANDIDATE NAME], [FEDERAL CONSTITUENCY])"
            >
              {!isSampleMode && <Check className="w-3 h-3" />}
              [Template Mode]
            </button>
          </div>

          {/* Quick Config Editor */}
          <button
            id="edit-campaign-config-btn"
            onClick={onOpenConfigEditor}
            className="flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white px-2.5 py-1 rounded-md border border-stone-700 transition text-[11px] font-medium"
            title="Edit Candidate Name, Constituency, Party, Slogan"
          >
            <Settings className="w-3 h-3 text-amber-400" />
            <span>Customize Info</span>
          </button>

          {/* Admin Dashboard Switcher */}
          {activeView === 'admin' ? (
            <button
              id="return-to-site-btn"
              onClick={() => navigateTo('home')}
              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-2.5 py-1 rounded-md transition text-[11px] font-semibold"
            >
              <Eye className="w-3 h-3" />
              <span>Back to Public Site</span>
            </button>
          ) : (
            <button
              id="open-admin-portal-demo-btn"
              onClick={() => navigateTo('admin')}
              className="flex items-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white px-2.5 py-1 rounded-md border border-stone-700 transition text-[11px] font-medium"
              title="Demonstrate the Campaign Staff & Campaign Manager Admin Backend"
            >
              <LayoutDashboard className="w-3 h-3 text-emerald-400" />
              <span>Admin Demo</span>
            </button>
          )}

          <button
            id="dismiss-banner-btn"
            onClick={() => setDismissed(true)}
            className="text-stone-400 hover:text-stone-200 p-1 ml-1"
            title="Minimize banner"
          >
            ×
          </button>
        </div>
      </div>
    </aside>
  );
};
