import React from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { X, Calendar, Clock, Share2, ArrowLeft } from 'lucide-react';

export const ArticleModal: React.FC = () => {
  const { selectedArticle, setSelectedArticle, notify } = useCampaign();

  if (!selectedArticle) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    notify('Link Copied', 'Article link copied to clipboard.', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-stone-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white border border-stone-200 rounded-3xl shadow-2xl text-stone-900 overflow-hidden my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-stone-200 bg-stone-50">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800">
              {selectedArticle.category}
            </span>
            <span className="text-xs text-stone-400">Campaign Dispatch</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              title="Share article"
              className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSelectedArticle(null)}
              className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scroll Content */}
        <div className="p-6 sm:p-10 max-h-[80vh] overflow-y-auto space-y-6">
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-xs text-stone-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {selectedArticle.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {selectedArticle.readTime}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight leading-snug">
              {selectedArticle.title}
            </h2>
          </div>

          <div className="rounded-2xl overflow-hidden aspect-16/9 bg-stone-100">
            <img
              src={selectedArticle.imageUrl}
              alt={selectedArticle.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-4 text-base text-stone-700 leading-relaxed font-normal">
            <p className="text-lg font-editorial italic text-stone-800 border-l-4 border-emerald-600 pl-4 py-1">
              "{selectedArticle.excerpt}"
            </p>
            <p>{selectedArticle.content}</p>
            <p>
              In our conversations with ward leaders, artisans, and youth representatives, one truth remains paramount: sustainable representation is not an occasional visit during elections; it is a permanent covenant of mutual respect and accountable stewardship.
            </p>
            <p>
              The campaign secretariat will continue publishing weekly updates as field tours progress across every ward.
            </p>
          </div>

          <div className="pt-6 border-t border-stone-200 flex justify-between items-center">
            <span className="text-xs text-stone-400">
              Published by Directorate of Media & Strategic Communications
            </span>
            <button
              onClick={() => setSelectedArticle(null)}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-700"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Newsroom</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
