import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, X } from 'lucide-react';
import CircuitBackground from '@/components/home/CircuitBackground';
import HomeNav from '@/components/home/HomeNav';
import HomeFooter from '@/components/home/HomeFooter';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

const SHOWREEL_ID = 'LcubqCpY18U';

const VIDEOS = [
  {
    id: 1,
    title: 'AYESMAJ Studios — Logo Reveal',
    desc: 'Cinematic brand identity reveal for AYESMAJ Studios.',
    thumb: `https://img.youtube.com/vi/ef2-AP2al_0/maxresdefault.jpg`,
    youtube: 'ef2-AP2al_0',
  },
  {
    id: 2,
    title: 'Boom Chicka Pop — Product Reveal',
    desc: "Cinematic CGI packaging reveal for Angie's Boom Chicka Pop.",
    thumb: '/brands/boom-chica/1.png',
    youtube: null,
  },
  {
    id: 3,
    title: 'ASHÉ Ritual Roast — Brand Film',
    desc: 'Premium coffee brand identity and packaging reveal.',
    thumb: '/brands/ashe/1.png',
    youtube: null,
  },
];

function VideoCard({ video, onPlay }) {
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      className="relative overflow-hidden rounded-2xl cursor-pointer"
      style={{
        aspectRatio: '16/9',
        border: `1px solid ${hovered ? 'rgba(0,196,106,0.4)' : 'rgba(200,163,78,0.12)'}`,
        boxShadow: hovered ? '0 0 40px rgba(0,196,106,0.18), 0 20px 60px rgba(0,0,0,0.5)' : '0 10px 40px rgba(0,0,0,0.4)',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onPlay(video)}
    >
      <img src={video.thumb} alt={video.title} className="w-full h-full object-cover"
        style={{ transform: hovered ? 'scale(1.06)' : 'scale(1)', transition: 'transform 0.6s ease' }} />
      <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,12,10,0.9) 0%, rgba(8,12,10,0.3) 50%, transparent 100%)' }} />

      {/* Play button */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          animate={{ scale: hovered ? 1.1 : 1, opacity: hovered ? 1 : 0.7 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-center rounded-full"
          style={{ width: 64, height: 64, background: 'rgba(0,196,106,0.15)', border: '2px solid rgba(0,196,106,0.7)', backdropFilter: 'blur(8px)', boxShadow: '0 0 30px rgba(0,196,106,0.3)' }}
        >
          <Play size={22} fill="#00C46A" color="#00C46A" style={{ marginLeft: 3 }} />
        </motion.div>
      </div>

      {/* Title */}
      <div className="absolute bottom-0 inset-x-0 p-5">
        <h3 className="text-white font-black text-base mb-1">{video.title}</h3>
        <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>{video.desc}</p>
      </div>
    </motion.div>
  );
}

export default function Reel() {
  const [modal, setModal] = useState(null);

  useEffect(() => {
    document.title = 'Showreel — AYESMAJ Studios';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ background: '#0B0F0C', minHeight: '100vh', overflowX: 'hidden' }}>
      <CircuitBackground />
      <HomeNav />

      <main className="relative z-10 pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero */}
          <motion.div {...fade(0)} className="text-center mb-16">
            <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: '#00C46A' }}>Showreel</p>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-4">
              Watch Our Work
            </h1>
            <p className="text-base md:text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Cinematic brand films, product reveals, and campaign reels — built to move people.
            </p>
          </motion.div>

          {/* Featured showreel — full width embed */}
          <motion.div {...fade(0.15)} className="mb-12">
            <div className="relative rounded-2xl overflow-hidden" style={{ aspectRatio: '16/9', border: '1px solid rgba(0,196,106,0.15)', boxShadow: '0 0 60px rgba(0,196,106,0.1), 0 30px 80px rgba(0,0,0,0.6)' }}>
              <iframe
                src={`https://www.youtube.com/embed/${SHOWREEL_ID}?rel=0&modestbranding=1`}
                className="w-full h-full"
                style={{ border: 'none' }}
                allowFullScreen
                allow="autoplay; encrypted-media"
                title="AYESMAJ Studios Showreel"
              />
            </div>
            <p className="text-center mt-4 text-xs tracking-[0.4em] uppercase" style={{ color: 'rgba(0,196,106,0.5)' }}>Official Showreel 2025</p>
          </motion.div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VIDEOS.slice(1).map((v, i) => (
              <motion.div key={v.id} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: i * 0.1 }}>
                <VideoCard video={v} onPlay={setModal} />
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal */}
      {modal && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => setModal(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-6"
          style={{ background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)' }}
        >
          <div className="relative w-full max-w-4xl" onClick={e => e.stopPropagation()}>
            <button onClick={() => setModal(null)} className="absolute -top-10 right-0 text-white/60 hover:text-white transition-colors">
              <X size={24} />
            </button>
            {modal.youtube ? (
              <iframe src={`https://www.youtube.com/embed/${modal.youtube}?autoplay=1`}
                className="w-full rounded-2xl" style={{ aspectRatio: '16/9', border: 'none' }} allowFullScreen allow="autoplay" />
            ) : (
              <div className="w-full rounded-2xl overflow-hidden flex items-center justify-center" style={{ aspectRatio: '16/9', background: '#0B0F0C', border: '1px solid rgba(200,163,78,0.2)' }}>
                <div className="text-center">
                  <img src={modal.thumb} alt={modal.title} className="w-full h-full object-cover absolute inset-0" style={{ opacity: 0.4 }} />
                  <div className="relative z-10 p-8">
                    <p className="text-white font-bold text-xl mb-2">{modal.title}</p>
                    <p className="text-white/40 text-sm">Video coming soon</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      )}

      <HomeFooter />
    </div>
  );
}