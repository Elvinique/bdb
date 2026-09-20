import React, { useState } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { Settings, LayoutDashboard, Check, X, SlidersHorizontal } from 'lucide-react';

interface PresentationBannerProps {
  onOpenConfigEditor?: () => void;
}

export const PresentationBanner: React.FC<PresentationBannerProps> = ({ onOpenConfigEditor }) => {
  const { isSampleMode, setIsSampleMode, activeView, navigateTo, setIsConfigModalOpen } = useCampaign();
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  if (hidden) return null;

  return (
    <div className="fixed bottom-6 left-6 z-40 font-sans print:hidden">
      {/* Expanded Popover Panel */}
      {isOpen && (
        <div className="mb-3 w-80 bg-stone-900/95 text-stone-100 rounded-2xl border border-stone-700/80 shadow-2xl backdrop-blur-md p-4 animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <h4 className="text-xs font-bold text-stone-100 tracking-wide uppercase">
                Demo & Presentation Controls
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition"
              title="Close panel"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3 text-xs">
            {/* Profile Mode Toggle */}
            <div>
              <p className="text-[11px] text-stone-400 mb-1.5 font-medium">Candidate Profile Mode</p>
              <div className="grid grid-cols-2 gap-1.5 bg-stone-800/80 p-1 rounded-xl border border-stone-700/60">
                <button
                  id="demo-sample-profile-btn"
                  onClick={() => setIsSampleMode(true)}
                  className={`py-1.5 px-2 rounded-lg font-medium text-[11px] flex items-center justify-center gap-1 transition ${
                    isSampleMode
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {isSampleMode && <Check className="w-3 h-3 text-emerald-300" />}
                  Engr. Daniel
                </button>
                <button
                  id="demo-template-mode-btn"
                  onClick={() => setIsSampleMode(false)}
                  className={`py-1.5 px-2 rounded-lg font-medium text-[11px] flex items-center justify-center gap-1 transition ${
                    !isSampleMode
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'text-stone-400 hover:text-stone-200'
                  }`}
                >
                  {!isSampleMode && <Check className="w-3 h-3 text-emerald-300" />}
                  Template Tags
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                id="demo-customize-info-btn"
                onClick={() => {
                  setIsOpen(false);
                  if (onOpenConfigEditor) onOpenConfigEditor();
                  else setIsConfigModalOpen(true);
                }}
                className="flex items-center justify-center gap-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white py-2 px-3 rounded-xl border border-stone-700 transition font-medium text-[11px]"
              >
                <Settings className="w-3.5 h-3.5 text-amber-400" />
                Customize Info
              </button>

              {activeView === 'admin' ? (
                <button
                  id="demo-return-home-btn"
                  onClick={() => {
                    setIsOpen(false);
                    navigateTo('home');
                  }}
                  className="flex items-center justify-center gap-1.5 bg-emerald-700 hover:bg-emerald-600 text-white py-2 px-3 rounded-xl transition font-medium text-[11px]"
                >
                  Public Site
                </button>
              ) : (
                <button
                  id="demo-open-admin-btn"
                  onClick={() => {
                    setIsOpen(false);
                    navigateTo('admin');
                  }}
                  className="flex items-center justify-center gap-1.5 bg-emerald-800/60 hover:bg-emerald-700 text-emerald-200 hover:text-white py-2 px-3 rounded-xl border border-emerald-700/60 transition font-medium text-[11px]"
                >
                  <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
                  Staff Admin
                </button>
              )}
            </div>

            {/* Dismiss permanently for presentation */}
            <div className="pt-2 border-t border-stone-800 flex justify-between items-center text-[10px] text-stone-400">
              <span>Candidate Live Preview</span>
              <button
                onClick={() => setHidden(true)}
                className="text-stone-400 hover:text-rose-400 transition underline underline-offset-2"
              >
                Hide completely
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Pill Trigger */}
      <button
        id="demo-floating-trigger-btn"
        onClick={() => setIsOpen((prev) => !prev)}
        className="group flex items-center gap-2 bg-stone-900/90 hover:bg-stone-800 text-stone-200 hover:text-white px-3.5 py-2 rounded-full text-xs font-semibold shadow-xl backdrop-blur-md border border-stone-700/80 hover:border-amber-500/50 transition-all hover:scale-105 active:scale-95"
        title="Toggle Candidate Demo Controls"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
        </span>
        <SlidersHorizontal className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-45 transition-transform" />
        <span className="text-[11px] tracking-tight">Presentation Tools</span>
      </button>
    </div>
  );
};
