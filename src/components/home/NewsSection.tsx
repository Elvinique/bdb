import React, { useState } from 'react';
import { useCampaign } from '../../context/CampaignContext';
import { NEWS_ARTICLES } from '../../config/campaignConfig';
import { NewsArticle } from '../../types';
import { FileText, Calendar, Clock, ArrowRight } from 'lucide-react';

export const NewsSection: React.FC = () => {
  const { setSelectedArticle } = useCampaign();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = ['all', 'Campaign', 'Community', 'Policy', 'Updates'];

  const filteredArticles = selectedCategory === 'all'
    ? NEWS_ARTICLES
    : NEWS_ARTICLES.filter(a => a.category === selectedCategory);

  return (
    <section
      id="news-section"
      className="py-16 sm:py-24 bg-white text-stone-900 border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-semibold uppercase tracking-wider border border-emerald-200">
              <FileText className="w-3.5 h-3.5 text-emerald-600" />
              <span>NEWSROOM & DISPATCHES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
              Latest Campaign Updates
            </h2>
            <p className="text-base text-stone-600">
              Verified reports, policy briefs, and grassroots milestones directly from our directorate of communications.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
                  selectedCategory === cat
                    ? 'bg-emerald-700 text-white border-emerald-800 shadow-sm'
                    : 'bg-stone-50 text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {cat === 'all' ? 'All Dispatches' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* 6 Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              className="flex flex-col justify-between rounded-3xl overflow-hidden bg-stone-50 border border-stone-200 shadow-xs hover:shadow-md transition duration-200 group"
            >
              <div>
                <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-stone-200">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-stone-900/80 text-white backdrop-blur-xs">
                      {article.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-stone-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-stone-400" />
                      {article.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-stone-400" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-stone-900 group-hover:text-emerald-800 transition line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-stone-600 line-clamp-3 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-stone-200/60 mt-2">
                <button
                  id={`read-article-${article.id}`}
                  onClick={() => setSelectedArticle(article)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-600 transition group-hover:translate-x-1"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
