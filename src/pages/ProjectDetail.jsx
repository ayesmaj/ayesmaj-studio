import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import ThreeBackground from '@/components/three/ThreeBackground';
import AyesmajNav from '@/components/ayesmaj/AyesmajNav';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';
import { ArrowLeft, Star, Play, ExternalLink, Loader2 } from 'lucide-react';

const CATEGORY_COLORS = {
  '3D Animation':          '#D4A853',
  'Product Visualization': '#D4A853',
  'CGI Commercial':        '#2d8a4e',
  'Motion Graphics':       '#7C6BE8',
  'Brand Identity':        '#2d8a4e',
  'AI-Enhanced Creative':  '#2d8a4e',
};

export default function ProjectDetail() {
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);

    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    if (!slug) { setLoading(false); return; }

    base44.entities.Project.filter({ slug }).then(results => {
      if (results.length > 0) {
        setProject(results[0]);
        document.title = `${results[0].title} — AYESMAJ Studios`;
      }
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090909] flex items-center justify-center">
        <Loader2 className="animate-spin text-[#D4A853]" size={32} />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-[#090909] text-white flex flex-col items-center justify-center gap-4">
        <p className="text-gray-400">Project not found.</p>
        <Link to={createPageUrl('Work')} className="text-[#D4A853] hover:underline">← Back to Work</Link>
      </div>
    );
  }

  const color = CATEGORY_COLORS[project.category] || '#D4A853';
  const gallery = project.gallery || [];

  return (
    <div className="min-h-screen bg-[#090909] text-white overflow-x-hidden">
      <ThreeBackground reducedMotion={reducedMotion} />
      <AyesmajNav />

      <main className="relative z-10">
        {/* HERO */}
        <div className="relative h-[70vh] min-h-[480px] overflow-hidden">
          <img src={project.hero_image} alt={project.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-[#090909]/40 to-black/20" />

          {/* Back button */}
          <div className="absolute top-28 left-6 z-20">
            <Link to={createPageUrl('Work')}>
              <motion.div
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
              >
                <ArrowLeft size={15} className="group-hover:-translate-x-1 transition-transform" /> Back to Work
              </motion.div>
            </Link>
          </div>

          {/* Hero content */}
          <div className="absolute bottom-0 left-0 right-0 px-6 pb-12 max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
              <span
                className="text-[10px] font-semibold tracking-[0.25em] uppercase px-2.5 py-1 rounded-full mb-4 inline-block"
                style={{ color, background: color + '18', border: `1px solid ${color}30` }}
              >
                {project.category}
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-2">{project.title}</h1>
              <p className="text-gray-400 text-base">{project.client} · {project.year}</p>
            </motion.div>
          </div>
        </div>

        {/* BODY */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-16">
              {/* Description */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <p className="text-xs tracking-[0.3em] text-[#D4A853] uppercase mb-4">About the Project</p>
                <div className="text-gray-300 leading-relaxed space-y-4 text-base whitespace-pre-line">
                  {project.full_description || project.short_description}
                </div>
              </motion.div>

              {/* Gallery */}
              {gallery.length > 0 && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <p className="text-xs tracking-[0.3em] text-[#D4A853] uppercase mb-6">Gallery</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {gallery.map((item, i) => (
                      <motion.div
                        key={i}
                        whileHover={{ scale: 1.01 }}
                        onClick={() => setLightboxIndex(i)}
                        className="group relative rounded-xl overflow-hidden cursor-pointer aspect-video bg-[#111]"
                      >
                        {item.type === 'video' ? (
                          <div className="w-full h-full flex items-center justify-center bg-black">
                            <Play size={36} className="text-white/60" />
                          </div>
                        ) : (
                          <img src={item.url} alt={item.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                        )}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                        {item.caption && (
                          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <p className="text-white text-xs">{item.caption}</p>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Testimonial */}
              {project.testimonial_quote && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
                  className="relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8"
                >
                  <div className="absolute top-6 right-6 text-6xl font-serif leading-none text-[#D4A853]/10 select-none">"</div>
                  <div className="flex gap-1 mb-5">
                    {[...Array(5)].map((_, j) => <Star key={j} size={13} className="fill-[#D4A853] text-[#D4A853]" />)}
                  </div>
                  <p className="text-gray-300 text-lg italic leading-relaxed mb-6">"{project.testimonial_quote}"</p>
                  <div className="flex items-center gap-3">
                    {project.testimonial_avatar && (
                      <img src={project.testimonial_avatar} alt={project.testimonial_author} className="w-10 h-10 rounded-full object-cover ring-1 ring-white/10" />
                    )}
                    <div>
                      <p className="text-white font-semibold text-sm">{project.testimonial_author}</p>
                      <p className="text-gray-500 text-xs">{project.testimonial_role}</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }} className="space-y-8">
              {/* Project details */}
              <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-5">
                <p className="text-xs tracking-[0.3em] text-[#D4A853] uppercase">Project Details</p>
                {[['Client', project.client], ['Year', project.year], ['Category', project.category]].filter(([,v]) => v).map(([label, val]) => (
                  <div key={label} className="border-t border-white/[0.05] pt-4">
                    <p className="text-gray-600 text-xs uppercase tracking-wider mb-1">{label}</p>
                    <p className="text-white text-sm font-medium">{val}</p>
                  </div>
                ))}
              </div>

              {/* Services used */}
              {project.services_used?.length > 0 && (
                <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 space-y-4">
                  <p className="text-xs tracking-[0.3em] text-[#D4A853] uppercase">Services</p>
                  <div className="flex flex-wrap gap-2">
                    {project.services_used.map(s => (
                      <span key={s} className="text-xs px-3 py-1.5 rounded-full border border-white/[0.07] text-gray-400 bg-white/[0.02]">{s}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="rounded-2xl border border-[#D4A853]/20 bg-[#D4A853]/5 p-6 text-center space-y-4">
                <p className="text-white font-semibold">Like what you see?</p>
                <p className="text-gray-500 text-sm">Let's build something like this for your brand.</p>
                <Link to={createPageUrl('Home') + '#contact'}>
                  <button className="w-full py-3 rounded-xl bg-gradient-to-r from-[#D4A853] to-[#B8860B] text-black font-bold text-sm hover:shadow-[0_0_24px_rgba(212,168,83,0.4)] transition-all duration-300">
                    Start a Project
                  </button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <AyesmajFooter />

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => setLightboxIndex(null)}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-6"
        >
          <button onClick={() => setLightboxIndex(null)} className="absolute top-6 right-6 text-gray-400 hover:text-white text-sm">✕ Close</button>
          <img
            src={gallery[lightboxIndex]?.url}
            alt={gallery[lightboxIndex]?.caption}
            className="max-w-full max-h-[85vh] rounded-xl object-contain"
            onClick={e => e.stopPropagation()}
          />
          <div className="absolute bottom-8 flex gap-3">
            {gallery.map((_, i) => (
              <button key={i} onClick={e => { e.stopPropagation(); setLightboxIndex(i); }}
                className={`w-2 h-2 rounded-full transition-colors ${i === lightboxIndex ? 'bg-[#D4A853]' : 'bg-white/20 hover:bg-white/40'}`}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}