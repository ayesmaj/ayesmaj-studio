import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, X, Volume2, VolumeX } from 'lucide-react';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }
});

const VIDEOS = [
  {
    title: 'Factory — CGI Commercial',
    subtitle: 'CGI Commercial · Animation',
    src: '/videos/factory.mp4',
  },
  {
    title: 'BLENDAY Brand Film',
    subtitle: 'Cinematic · Brand Campaign',
    src: '/brands/blenday/6.mp4',
  },
  {
    title: 'Optimus — 3D Animation',
    subtitle: '3D Animation · Character CGI',
    src: '/videos/optimus.mp4',
  },
];

function VideoCard({ video, delay }) {
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef(null);

  const handlePlay = () => {
    setPlaying(true);
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.muted = muted;
        videoRef.current.play();
      }
    }, 50);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    if (videoRef.current) videoRef.current.pause();
    setPlaying(false);
  };

  const toggleMute = (e) => {
    e.stopPropagation();
    const next = !muted;
    setMuted(next);
    if (videoRef.current) videoRef.current.muted = next;
  };

  return (
    <motion.div {...fade(delay)}>
      <div
        className="relative overflow-hidden rounded-2xl group"
        style={{
          aspectRatio: '16/9',
          border: `1px solid ${hovered ? 'rgba(0,196,106,0.4)' : 'rgba(0,196,106,0.08)'}`,
          boxShadow: hovered ? '0 0 40px rgba(0,196,106,0.18)' : 'none',
          transition: 'border-color 0.3s, box-shadow 0.3s',
          cursor: playing ? 'default' : 'pointer',
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={!playing ? handlePlay : undefined}
      >
        {/* Dark background before play */}
        {!playing && (
          <>
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0B0F0C 0%, #111815 100%)' }} />

            {/* Play button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ scale: hovered ? 1.12 : 1 }}
                transition={{ duration: 0.3 }}
                className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(8,12,10,0.85)',
                  border: '2px solid rgba(0,196,106,0.8)',
                  backdropFilter: 'blur(8px)',
                  boxShadow: '0 0 32px rgba(0,196,106,0.3)',
                }}
              >
                <Play size={22} className="ml-1" style={{ color: '#00C46A' }} fill="#00C46A" />
              </motion.div>
            </div>

            {/* Bottom info */}
            <div className="absolute bottom-0 inset-x-0 p-5">
              <p className="text-white font-bold text-base leading-tight">{video.title}</p>
              <p className="text-xs mt-1" style={{ color: '#00C46A' }}>{video.subtitle}</p>
            </div>
          </>
        )}

        {/* Actual video element */}
        <video
          ref={videoRef}
          src={video.src}
          loop
          playsInline
          muted={muted}
          controls={false}
          className="w-full h-full object-cover"
          style={{ display: playing ? 'block' : 'none' }}
        />

        {/* Controls overlay when playing */}
        {playing && (
          <div className="absolute inset-0 flex flex-col justify-between p-4 opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 40%, rgba(0,0,0,0.3) 100%)' }}
          >
            {/* Top row */}
            <div className="flex justify-between items-start">
              <div className="text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full"
                style={{ background: 'rgba(0,196,106,0.15)', border: '1px solid rgba(0,196,106,0.4)', color: '#00C46A' }}>
                {video.subtitle}
              </div>
              <button onClick={handleClose}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-all"
                style={{ background: 'rgba(0,0,0,0.7)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
                <X size={14} />
              </button>
            </div>

            {/* Bottom row */}
            <div className="flex items-center justify-between">
              <p className="text-white font-bold text-sm">{video.title}</p>
              <button onClick={toggleMute}
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}>
                {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
              </button>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function CommercialsSection() {
  return (
    <section id="commercials" className="relative py-32 px-6 overflow-hidden" style={{ background: 'transparent', scrollMarginTop: '90px' }}>
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,196,106,0.08), transparent)' }} />

      <div className="max-w-7xl mx-auto">
        <motion.div {...fade(0)} className="text-center mb-16">
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: '#00C46A' }}>Showreel</p>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Cinematic Commercials</h2>
          <p className="text-sm mt-4" style={{ color: 'rgba(255,255,255,0.35)' }}>Click any card to play · Hover to control</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {VIDEOS.map((v, i) => (
            <VideoCard key={v.title} video={v} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}