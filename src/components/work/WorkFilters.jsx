import React from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal } from 'lucide-react';

const CATEGORIES = [
  'All',
  '3D Animation',
  'Product Visualization',
  'CGI Commercial',
  'Motion Graphics',
  'Brand Identity',
  'AI-Enhanced Creative',
];

const SORT_OPTIONS = [
  { value: '-created_date', label: 'Newest First' },
  { value: 'created_date',  label: 'Oldest First' },
  { value: 'title',         label: 'A → Z' },
];

export default function WorkFilters({ activeCategory, setActiveCategory, sortBy, setSortBy }) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(cat => {
          const active = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`relative text-xs font-medium px-4 py-2 rounded-full border transition-all duration-250 ${
                active
                  ? 'border-[#D4A853]/60 text-[#D4A853] bg-[#D4A853]/10'
                  : 'border-white/[0.07] text-gray-500 hover:text-white hover:border-white/20 bg-white/[0.02]'
              }`}
            >
              {cat}
              {active && (
                <motion.span layoutId="filterPill"
                  className="absolute inset-0 rounded-full border border-[#D4A853]/30 bg-[#D4A853]/8 -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2 shrink-0">
        <SlidersHorizontal size={13} className="text-gray-600" />
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2 text-gray-400 text-xs focus:outline-none focus:border-[#D4A853]/40 cursor-pointer appearance-none"
        >
          {SORT_OPTIONS.map(o => (
            <option key={o.value} value={o.value} className="bg-[#111]">{o.label}</option>
          ))}
        </select>
      </div>
    </div>
  );
}