import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ZoomIn } from 'lucide-react';

export default function CaseStudyGallery({ brand }) {
  const [lightbox, setLightbox] = useState(null);
  const gallery = brand.gallery || [];

  if (gallery.length === 0 && !brand.hero_image_url) return null;

  // Build display list: featured image first, then gallery
  const featured = brand.hero_image_url ? { url: brand.hero_image_url } : gallery[0];
  const rest = brand.hero_image_url ? gallery : gallery.slice(1);

  return (
    <section className="py-8 px-6">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Section label */}
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-[11px] tracking-[0.4em] text-[#00ff77]/60 uppercase mb-10">
          Visual Showcase
        </motion.p>

        {/* Featured image */}
        {featured && (
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.9 }}
            className="relative rounded-3xl overflow-hidden aspect-video cursor-zoom-in group"
            onClick={() => setLightbox(featured.url)}
          >
            <img src={featured.url} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
            <div className="absolute inset-0 rounded-3xl ring-1 ring-white/[0.04] group-hover:ring-[#00ff77]/15 transition-all duration-500" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/10">
                <ZoomIn size={16} className="text-white" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            {rest.map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.06 }}
                className="relative rounded-2xl overflow-hidden aspect-square cursor-zoom-in group"
                onClick={() => setLightbox(item.url)}
              >
                <img src={item.url} alt={item.caption || ''} className="w-full h-full object-cover transition-transform duration-600 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-[#00ff77]/[0.04] transition-all duration-400" />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-[#00ff77]/15 transition-all duration-400" />
                {item.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                    <p className="text-white text-xs">{item.caption}</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-6 right-6 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-[#00ff77]/30 transition-colors">
              <X size={18} className="text-white" />
            </button>
            <motion.img initial={{ scale: 0.92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }} transition={{ duration: 0.3 }}
              src={lightbox} alt=""
              className="max-w-full max-h-full rounded-2xl object-contain"
              style={{ boxShadow: '0 0 100px rgba(0,0,0,0.8)' }}
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}