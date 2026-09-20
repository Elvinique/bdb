import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../../config/campaignConfig';
import { Camera, MapPin, Calendar, Image as ImageIcon } from 'lucide-react';
import { CollapsibleSection } from '../common/CollapsibleSection';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = ['all', 'Community', 'Youth', 'Women', 'Outreach', 'Events'];

  const filteredItems = activeCategory === 'all'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(item => item.category === activeCategory);

  return (
    <section
      id="gallery-section"
      className="py-16 sm:py-24 bg-stone-50 text-stone-900 border-b border-stone-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-semibold uppercase tracking-wider">
              <Camera className="w-3.5 h-3.5 text-emerald-700" />
              <span>FIELD ENGAGEMENT ARCHIVE</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-stone-900 tracking-tight">
              Moments from the Ground
            </h2>
            <p className="text-base text-stone-600">
              Photographs capturing real community conversations, market visits, youth symposiums, and civic outreach.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
                  activeCategory === cat
                    ? 'bg-stone-900 text-white border-stone-900'
                    : 'bg-white text-stone-600 border-stone-200 hover:bg-stone-100'
                }`}
              >
                {cat === 'all' ? 'All Moments' : cat}
              </button>
            ))}
          </div>
        </div>

        <CollapsibleSection
          theme="stone-50"
          collapsedHeightMobile="420px"
          expandLabel="View Complete Photo Archive"
          collapseLabel="Collapse Photo Archive"
          badge="Photo Gallery"
        >
          {/* Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden bg-stone-200 border border-stone-300 shadow-sm aspect-4/3"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Overlay on hover or active */}
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent opacity-95 sm:opacity-0 sm:group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  {item.category} • {item.date}
                </span>
                <h4 className="text-sm font-bold text-white mt-1 leading-snug">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-300 mt-1 line-clamp-2">
                  {item.caption}
                </p>
                <div className="flex items-center gap-1.5 text-[11px] text-stone-400 mt-2">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>{item.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CollapsibleSection>

      </div>
    </section>
  );
};
