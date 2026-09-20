import React, { useState, ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CollapsibleSectionProps {
  children: ReactNode;
  id?: string;
  collapsedHeightMobile?: string; // e.g. '360px', '420px'
  expandLabel?: string;
  collapseLabel?: string;
  badge?: string;
  theme?: 'light' | 'dark' | 'stone-50';
  defaultExpanded?: boolean;
  className?: string;
}

export const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({
  children,
  id,
  collapsedHeightMobile = '380px',
  expandLabel = 'Read More / Expand Section',
  collapseLabel = 'Show Less / Collapse Section',
  badge,
  theme = 'light',
  defaultExpanded = false,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(defaultExpanded);

  // Gradient fade color based on section background theme
  const getGradientClass = () => {
    switch (theme) {
      case 'dark':
        return 'from-stone-900/0 via-stone-900/85 to-stone-900';
      case 'stone-50':
        return 'from-stone-50/0 via-stone-50/90 to-stone-50';
      case 'light':
      default:
        return 'from-white/0 via-white/90 to-white';
    }
  };

  const getButtonClass = () => {
    switch (theme) {
      case 'dark':
        return 'bg-stone-800/95 hover:bg-stone-700 text-stone-100 border-stone-700 hover:border-emerald-500/50 shadow-xl shadow-black/40';
      case 'stone-50':
        return 'bg-white hover:bg-stone-100 text-stone-800 border-stone-300 hover:border-emerald-600/50 shadow-lg shadow-stone-200/60';
      case 'light':
      default:
        return 'bg-stone-900 hover:bg-stone-800 text-white border-stone-800 hover:border-emerald-500 shadow-xl shadow-stone-900/20';
    }
  };

  return (
    <div className={`relative ${className}`} id={id}>
      {/* Collapsible container on mobile/tablet, unconstrained on large desktop */}
      <div
        className={`transition-all duration-500 ease-in-out lg:!max-h-none lg:!overflow-visible ${
          isExpanded ? 'max-h-none overflow-visible' : 'overflow-hidden'
        }`}
        style={!isExpanded ? { maxHeight: collapsedHeightMobile } : undefined}
      >
        {children}
      </div>

      {/* Gradient Fade Overlay on Mobile/Tablet when collapsed */}
      {!isExpanded && (
        <div
          className={`lg:hidden absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-b ${getGradientClass()} pointer-events-none transition-opacity duration-300`}
        />
      )}

      {/* Mobile/Tablet Expand / Collapse Trigger Bar */}
      <div className="lg:hidden mt-4 pt-2 flex justify-center sticky bottom-3 z-20 px-4">
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          aria-expanded={isExpanded}
          className={`group inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wide border transition-all duration-200 active:scale-95 backdrop-blur-md ${getButtonClass()}`}
        >
          <span>{isExpanded ? collapseLabel : expandLabel}</span>

          {badge && !isExpanded && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white shadow-xs">
              {badge}
            </span>
          )}

          {isExpanded ? (
            <ChevronUp className="w-4 h-4 text-emerald-400 group-hover:-translate-y-0.5 transition-transform" />
          ) : (
            <ChevronDown className="w-4 h-4 text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
          )}
        </button>
      </div>
    </div>
  );
};
