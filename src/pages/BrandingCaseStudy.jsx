import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import CircuitBackground from '@/components/home/CircuitBackground';
import AyesmajNav from '@/components/ayesmaj/AyesmajNav';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';
import { PROJECTS } from '@/components/branding/BrandingGrid.jsx';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function BrandingCaseStudy() {
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [lightboxIdx, setLightboxIdx] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');
    const found = PROJECTS.find(p => p.slug === slug);
    setProject(found || null);
    window.scrollTo(0, 0);
    if (found) document.title = `${found.brand} — AYESMAJ Studios`;
  }, []);

  if (!project) {
    return (
      <div style={{ background: '#030303', minHeight: '100vh' }} className="flex items-center justify-center">
        <p className="text-white/40 text-sm">Project not found.</p>
      </div>
    );
  }

  return (
    <div style={{ background: '#030303', minHeight: '100vh', overflowX: 'hidden' }}>
      <CircuitBackground />
      <AyesmajNav />

      <main className="relative z-10 pt-28 pb-0">
        {/* Hero */}
        <div className="relative w-full" style={{ height: '60vh', minHeight: 360 }}>
          <img
            src={project.img}
            alt={project.brand}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to top, #030303 0%, rgba(11,15,12,0.5) 50%, rgba(11,15,12,0.2) 100%)' }} />
          <div className="absolute inset-0"
            style={{ background: 'linear-gradient(to right, rgba(11,15,12,0.6) 0%, transparent 60%)' }} />

          {/* Back button */}
          <motion.button
            {...fade(0.1)}
            onClick={() => navigate(createPageUrl('Branding'))}
            className="absolute top-8 left-6 md:left-12 flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-4 py-3 rounded-full transition-all duration-300"
            style={{
              border: '1px solid rgba(255,176,0,0.3)',
              color: '#FFB000',
              background: 'rgba(11,15,12,0.7)',
              backdropFilter: 'blur(10px)',
              minHeight: '44px',
            }}
            whileHover={{ scale: 1.04, borderColor: 'rgba(255,176,0,0.6)' }}
            whileTap={{ scale: 0.97 }}
          >
            <ArrowLeft size={13} /> Back to Branding
          </motion.button>

          {/* Category badge */}
          <div className="absolute bottom-8 left-6 md:left-12">
            <motion.p {...fade(0.2)} className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: '#FFB000' }}>
              {project.category}
            </motion.p>
            <motion.h1 {...fade(0.3)} className="text-4xl md:text-6xl font-black text-white tracking-tight">
              {project.brand}
            </motion.h1>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-6xl mx-auto px-6 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* Overview */}
            <motion.div {...fade(0.1)} className="lg:col-span-2">
              <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#FFB000' }}>Overview</p>
              <p className="text-white/70 text-lg leading-relaxed">{project.overview}</p>
            </motion.div>

            {/* Services */}
            <motion.div {...fade(0.2)}>
              <p className="text-xs tracking-[0.4em] uppercase mb-4" style={{ color: '#FFB000' }}>Services</p>
              <ul className="space-y-3">
                {project.services.map(s => (
                  <li key={s} className="flex items-center gap-3 text-sm text-white/60">
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: '#B3FF3F' }} />
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="my-16 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,176,0,0.15), transparent)' }} />

          {/* Gallery */}
          {project.gallery && project.gallery.length > 0 && (
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="text-xs tracking-[0.4em] uppercase mb-8" style={{ color: '#FFB000' }}
              >
                Gallery
              </motion.p>
              <div className={`grid gap-4 ${project.gallery.length === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
                {project.gallery.map((url, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.1 }}
                    onClick={() => setLightboxIdx(i)}
                    className="relative overflow-hidden rounded-2xl cursor-pointer group"
                    style={{ border: '1px solid rgba(255,176,0,0.08)', aspectRatio: '16/9' }}
                    whileHover={{ scale: 1.01 }}
                  >
                    <img src={url} alt={`${project.brand} ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                      style={{ background: 'rgba(11,15,12,0.4)' }}>
                      <span className="text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full"
                        style={{ border: '1px solid rgba(255,176,0,0.5)', color: '#FFB000', background: 'rgba(11,15,12,0.7)' }}>
                        View Full
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Divider */}
          <div className="my-16 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,176,0,0.15), transparent)' }} />

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="text-center"
          >
            <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: '#FFB000' }}>Ready to Begin</p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Let's build your brand world.</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.button
                onClick={() => navigate(createPageUrl('Contact'))}
                whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(255,176,0,0.3)' }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold tracking-widest uppercase text-sm"
                style={{ background: 'linear-gradient(135deg, rgba(255,176,0,0.9), rgba(255,176,0,0.7))', color: '#030303', minHeight: '44px' }}
              >
                Start a Project <ArrowRight size={15} />
              </motion.button>
              <motion.button
                onClick={() => navigate(createPageUrl('Branding'))}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold tracking-widest uppercase text-sm"
                style={{ border: '1px solid rgba(255,176,0,0.25)', color: '#FFB000', minHeight: '44px' }}
              >
                <ArrowLeft size={15} /> Back to Branding
              </motion.button>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Lightbox */}
      {lightboxIdx !== null && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => setLightboxIdx(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(11,15,12,0.95)', backdropFilter: 'blur(12px)' }}
        >
          <img
            src={project.gallery[lightboxIdx]}
            alt="Fullscreen"
            className="max-w-full max-h-full rounded-2xl object-contain"
            onClick={e => e.stopPropagation()}
          />
          <button onClick={() => setLightboxIdx(null)}
            className="absolute top-6 right-6 text-white/50 hover:text-white text-2xl font-bold w-11 h-11 flex items-center justify-center rounded-full"
            style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(11,15,12,0.8)' }}>
            ✕
          </button>
        </motion.div>
      )}

      <AyesmajFooter />
    </div>
  );
}