import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, X } from 'lucide-react';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }
});

const VIDEOS = [
  {
    title: 'ASHÉ Ember Reserve',
    subtitle: 'CGI Commercial · 60s',
    thumb: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6996504f9438187ae1bf2677/e5d787329_ChatGPTImageFeb25202608_40_30PM.png',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    title: 'ASHÉ Brand Film',
    subtitle: 'Cinematic · 90s Campaign',
    thumb: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6996504f9438187ae1bf2677/c74fb56a0_ChatGPTImageFeb25202608_40_29PM.png',
    videoId: 'dQw4w9WgXcQ',
  },
  {
    title: 'ASHÉ Product Reveal',
    subtitle: '3D Animation · 45s',
    thumb: 'https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6996504f9438187ae1bf2677/7134d90cb_ChatGPTImageFeb25202608_40_52PM.png',
    videoId: 'dQw4w9WgXcQ',
  },
];

export default function CommercialsSection() {
  const [playing, setPlaying] = useState(null);

  return (
    <section id="commercials" className="relative py-32 px-6 overflow-hidden" style={{ background: 'transparent', scrollMarginTop: '90px' }}>
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,196,106,0.08), transparent)' }} />

      <div className="max-w-7xl mx-auto">
        <motion.div {...fade(0)} className="text-center mb-16">
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: '#00C46A' }}>Showreel</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Cinematic Commercials</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VIDEOS.map((v, i) => (
            <motion.div key={v.title} {...fade(i * 0.1)}>
              <div
                className="relative overflow-hidden rounded-2xl cursor-pointer group"
                style={{ aspectRatio: '16/9', border: '1px solid rgba(0,196,106,0.08)' }}
                onClick={() => setPlaying(v)}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 0 40px rgba(0,196,106,0.2)'; e.currentTarget.style.borderColor = 'rgba(0,196,106,0.35)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = 'rgba(0,196,106,0.08)'; }}
              >
                <img src={v.thumb} alt={v.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: 'rgba(11,15,12,0.5)' }} />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                       background: 'rgba(11,15,12,0.8)',
                       border: '2px solid rgba(0,196,106,0.7)',
                       backdropFilter: 'blur(4px)',
                     }}
                    >
                     <Play size={22} className="ml-1" style={{ color: '#00C46A' }} />
                  </motion.div>
                </div>

                {/* Bottom info */}
                <div className="absolute bottom-0 inset-x-0 p-5">
                  <p className="text-white font-bold text-base">{v.title}</p>
                  <p className="text-xs mt-0.5" style={{ color: '#00C46A' }}>{v.subtitle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Video modal */}
      {playing && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.92)' }}
          onClick={() => setPlaying(null)}
        >
          <button className="absolute top-6 right-6 text-white opacity-60 hover:opacity-100 transition-opacity"
            onClick={() => setPlaying(null)}>
            <X size={28} />
          </button>
          <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${playing.videoId}?autoplay=1`}
              className="w-full h-full"
              allowFullScreen
              allow="autoplay"
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}