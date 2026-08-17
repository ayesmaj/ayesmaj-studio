import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const PLACEHOLDER = '/brands/ashe/1.webp';

export default function BrandCard({ brand }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`group relative rounded-3xl overflow-hidden border transition-all duration-500 cursor-pointer flex flex-col
        ${hovered ? 'border-[#00ff77]/20 shadow-[0_0_60px_rgba(0,255,119,0.08)]' : 'border-white/[0.05]'}`}
      style={{ background: '#111111' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative h-56 overflow-hidden">
        <img
          src={brand.thumbnail_url || PLACEHOLDER}
          alt={brand.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />

        {/* Arrow */}
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.8 }}
          transition={{ duration: 0.25 }}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#00ff77] flex items-center justify-center"
        >
          <ArrowUpRight size={16} className="text-black" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-7 flex flex-col gap-4 flex-1">
        {/* Logo + Name */}
        <div className="flex items-center gap-3">
          {brand.logo_url ? (
            <img src={brand.logo_url} alt={brand.name} className="h-8 w-auto object-contain max-w-[80px] brightness-[2] contrast-50" />
          ) : null}
          <h3 className="text-white font-extrabold text-xl tracking-tight">{brand.name}</h3>
        </div>

        {/* Description */}
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
          {brand.short_description || '—'}
        </p>

        {/* Tags */}
        {brand.tags?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
            {brand.tags.slice(0, 3).map(tag => (
              <span key={tag} className="px-2.5 py-0.5 rounded-full border border-white/[0.07] text-[10px] text-gray-600 tracking-widest uppercase">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* CTA */}
        <Link
          to={createPageUrl('BrandDetail') + `?slug=${brand.slug}`}
          className="mt-2 w-full py-3 rounded-2xl border border-white/[0.07] text-center text-xs font-bold tracking-widest uppercase text-gray-400 hover:border-[#00ff77]/30 hover:text-[#00ff77] hover:bg-[#00ff77]/[0.04] transition-all duration-300"
          onClick={e => e.stopPropagation()}
        >
          View Case Study
        </Link>
      </div>
    </div>
  );
}