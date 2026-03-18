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
  const [muted, setMuted]     = useState(true);
  const videoRef              = useRef(null);

  const handleMetadata = () => {
    if (videoRef.current && !playing) videoRef.current.currentTime = 1.5;
  };

  const handlePlay = () => {
    setPlaying(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.muted = muted;
      videoRef.current.play();
    }
  };

  const handleClose = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 1.5;
    }
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
          border: '1px solid rgba(0,196,106,0.12)',
          cursor: playing ? 'default' : 'pointer',
        }}
        onClick={!playing ? handlePlay : undefined}
      >
        {/* Video always rendered — paused at 1.5s as thumbnail */}
        <video
          ref={videoRef}
          src={video.src}
          loop playsInline muted={muted}
          controls={false}
          preload="metadata"
          onLoadedMetadata={handleMetadata}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Pre-play overlay */}
        {!playing && (
          <div className="absolute inset-0 flex flex-col justify-between"
            style={{ background: 'linear-gradient(to top, rgba(8,12,10,0.88) 0%, rgba(8,12,10,0.25) 50%, transparent 100%)' }}>
            <div className="flex-1 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(8,12,10,0.85)', border: '2px solid rgba(0,196,106,0.8)',
                  backdropFilter: 'blur(8px)', boxShadow: '0 0 32px rgba(0,196,106,0.3)' }}>
                <Play size={22} className="ml-1" style={{ color: '#00C46A' }} fill="#00C46A" />
              </div>
            </div>
            <div className="p-4 md:p-5">
              <p className="text-white font-bold text-sm md:text-base leading-tight">{video.title}</p>
              <p className="text-xs mt-1" style={{ color: '#00C46A' }}>{video.subtitle}</p>
            </div>
          </div>
        )}

        {/* Controls when playing
            Mobile: always visible (opacity-100)
            Desktop: hidden until hover (md:opacity-0 md:group-hover:opacity-100) */}
        {playing && (
          <div
            className="absolute inset-0 flex flex-col justify-between p-3 md:p-4
                        opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
            style={{ background: 'linear-gradient(to top,rgba(0,0,0,0.65)0%,transparent 40%,rgba(0,0,0,0.3)100%)' }}
          >
            <div className="flex justify-between items-start">
              <div className="text-[10px] font-bold tracking-widest uppercase px-2 py-1 rounded-full"
                style={{ background: 'rgba(0,196,106,0.15)', border: '1px solid rgba(0,196,106,0.4)', color: '#00C46A' }}>
                {video.subtitle}
              </div>
              {/* 44×44 min touch target */}
              <button onClick={handleClose}
                className="w-11 h-11 md:w-9 md:h-9 -mt-1 -mr-1 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.75)', border: '1px solid rgba(255,255,255,0.25)', color: 'white' }}>
                <X size={15} />
              </button>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-white font-bold text-xs leading-tight">{video.title}</p>
              <button onClick={toggleMute}
                className="w-11 h-11 md:w-9 md:h-9 -mb-1 -mr-1 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.65)', border: '1px solid rgba(255,255,255,0.25)', color: 'white' }}>
                {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
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
    <section id="commercials" className="relative py-24 md:py-32 px-4 md:px-6 overflow-hidden"
      style={{ background: 'transparent', scrollMarginTop: '90px' }}>
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg,transparent,rgba(0,196,106,0.08),transparent)' }} />

      <div className="max-w-7xl mx-auto">
        <motion.div {...fade(0)} className="text-center mb-10 md:mb-16">
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: '#00C46A' }}>Showreel</p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tight">
            Cinematic Commercials
          </h2>
          {/* Desktop hint */}
          <p className="text-xs mt-3 hidden md:block" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Click any card to play · Hover to control
          </p>
          {/* Mobile hint */}
          <p className="text-xs mt-3 md:hidden" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Tap any card to play
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {VIDEOS.map((v, i) => (
            <VideoCard key={v.title} video={v} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
