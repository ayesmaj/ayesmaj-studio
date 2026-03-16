import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { ArrowLeft } from 'lucide-react';

const PLACEHOLDER = 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1600&q=80';

export default function CaseStudyHero({ brand }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={brand.hero_image_url || brand.thumbnail_url || PLACEHOLDER}
          alt={brand.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(11,11,11,0.3) 0%, rgba(11,11,11,0.65) 50%, rgba(11,11,11,1) 100%)' }} />
        {/* Vignette sides */}
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(11,11,11,0.6) 100%)' }} />
      </div>

      {/* Back link */}
      <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
        className="absolute top-28 left-6 md:left-10 z-10">
        <Link to={createPageUrl('Brands')}
          className="flex items-center gap-2 text-[11px] tracking-[0.3em] text-gray-500 uppercase hover:text-[#00ff77] transition-colors">
          <ArrowLeft size={12} /> All Brands
        </Link>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        {brand.logo_url && (
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            src={brand.logo_url} alt={brand.name}
            className="h-14 md:h-20 w-auto object-contain mx-auto mb-8"
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        )}
        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35 }}
          className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-[1.0]"
        >
          {brand.name}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="text-gray-400 text-lg leading-relaxed max-w-xl mx-auto"
        >
          {brand.short_description}
        </motion.p>

        {/* Tags */}
        {brand.tags?.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            className="flex flex-wrap justify-center gap-2 mt-8">
            {brand.tags.map(tag => (
              <span key={tag} className="px-3 py-1 rounded-full border border-white/10 text-[10px] tracking-[0.25em] text-gray-500 uppercase">
                {tag}
              </span>
            ))}
          </motion.div>
        )}
      </div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 2, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
      </motion.div>
    </section>
  );
}