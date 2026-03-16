import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowUpRight, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
});

function CinematicVideo({ poster, videoUrl }) {
  const [playing, setPlaying] = useState(false);
  const [hovered, setHovered] = useState(false);
  const videoRef = useRef(null);

  const handlePlay = () => {
    setPlaying(true);
    setTimeout(() => videoRef.current?.play(), 50);
  };

  return (
    <motion.div
      {...fade(0.1)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-full mx-auto rounded-2xl overflow-hidden"
      style={{
        maxWidth: '1200px',
        aspectRatio: '16/9',
        background: 'rgba(8,12,10,0.95)',
        border: `1px solid ${hovered ? 'rgba(0,196,106,0.35)' : 'rgba(200,163,78,0.18)'}`,
        boxShadow: hovered
          ? '0 0 60px rgba(0,196,106,0.18), 0 40px 80px rgba(0,0,0,0.7)'
          : '0 20px 60px rgba(0,0,0,0.6)',
        transition: 'border-color 0.4s, box-shadow 0.4s',
      }}
    >
      {/* Poster / play state */}
      {!playing && (
        <>
          <img
            src={poster}
            alt="Video thumbnail"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter: 'brightness(0.65)' }}
          />
          {/* Dark vignette */}
          <div className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.55) 100%)' }} />

          {/* Gold top line */}
          <div className="absolute top-0 inset-x-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(200,163,78,0.5), transparent)' }} />

          {/* Premium play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              onClick={handlePlay}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center justify-center rounded-full"
              style={{
                width: 80,
                height: 80,
                background: 'rgba(0,196,106,0.15)',
                border: '2px solid rgba(0,196,106,0.7)',
                backdropFilter: 'blur(12px)',
                boxShadow: '0 0 40px rgba(0,196,106,0.3)',
              }}
            >
              <Play size={28} fill="#00C46A" color="#00C46A" style={{ marginLeft: 4 }} />
            </motion.button>
          </div>

          {/* Bottom gradient */}
          <div className="absolute bottom-0 inset-x-0 h-24"
            style={{ background: 'linear-gradient(to top, rgba(8,12,10,0.9), transparent)' }} />
        </>
      )}

      {/* Actual video */}
      {videoUrl ? (
        <video
          ref={videoRef}
          src={videoUrl}
          poster={poster}
          controls={playing}
          className="w-full h-full object-cover"
          style={{ display: playing ? 'block' : 'none' }}
        />
      ) : (
        playing && (
          <div className="w-full h-full flex items-center justify-center" style={{ background: '#0B0F0C' }}>
            <p className="text-white/40 text-sm">Video coming soon</p>
          </div>
        )
      )}
    </motion.div>
  );
}

export default function BrandingProjectBlock({ project }) {
  const navigate = useNavigate();

  return (
    <motion.section
      {...fade(0)}
      className="relative py-20 px-6"
      style={{
        background: 'linear-gradient(180deg, rgba(8,12,10,0) 0%, rgba(0,8,4,0.6) 40%, rgba(8,12,10,0) 100%)',
        borderTop: '1px solid rgba(200,163,78,0.07)',
      }}
    >
      <div className="max-w-7xl mx-auto flex flex-col items-center">

        {/* 1. Category label */}
        <motion.p {...fade(0)} className="text-xs tracking-[0.5em] uppercase font-bold mb-3" style={{ color: '#C8A44E' }}>
          {project.category}
        </motion.p>

        {/* 2. Brand name */}
        <motion.h2 {...fade(0.05)} className="text-4xl md:text-6xl font-black text-white tracking-tight text-center mb-3">
          {project.brand}
        </motion.h2>

        {/* 3. Short description */}
        <motion.p {...fade(0.1)} className="text-base md:text-lg text-center mb-10 max-w-2xl" style={{ color: 'rgba(255,255,255,0.45)' }}>
          {project.desc}
        </motion.p>

        {/* 4. Cinematic Video Player */}
        <div className="w-full flex justify-center mb-10">
          <CinematicVideo poster={project.img} videoUrl={project.video_url || null} />
        </div>

        {/* 5. Image gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <motion.div {...fade(0.15)} className="w-full mb-10">
            <div className={`grid gap-3 ${
              project.gallery.length === 1 ? 'grid-cols-1 max-w-lg mx-auto' :
              project.gallery.length === 2 ? 'grid-cols-2 max-w-2xl mx-auto' :
              project.gallery.length === 3 ? 'grid-cols-3' :
              'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4'
            }`}>
              {project.gallery.slice(0, 6).map((imgUrl, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.03, borderColor: 'rgba(0,196,106,0.4)' }}
                  className="relative overflow-hidden rounded-xl"
                  style={{
                    aspectRatio: '4/3',
                    border: '1px solid rgba(200,163,78,0.12)',
                    transition: 'border-color 0.3s',
                  }}
                >
                  <img
                    src={imgUrl}
                    alt={`${project.brand} ${i + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* 6. Services / Deliverables row */}
        {project.services && (
          <motion.div {...fade(0.2)} className="flex flex-wrap justify-center gap-2 mb-10">
            {project.services.map(s => (
              <span key={s} className="px-4 py-1.5 rounded-full text-xs tracking-widest uppercase font-bold"
                style={{ border: '1px solid rgba(200,163,78,0.2)', color: 'rgba(200,163,78,0.8)', background: 'rgba(200,163,78,0.04)' }}>
                {s}
              </span>
            ))}
          </motion.div>
        )}

        {/* 7. Buttons */}
        <motion.div {...fade(0.25)} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 28px rgba(0,196,106,0.3)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(createPageUrl('BrandingCaseStudy') + `?slug=${project.slug}`)}
            className="flex items-center gap-2 px-8 py-3 rounded-full text-sm font-black tracking-widest uppercase"
            style={{
              background: 'rgba(0,196,106,0.1)',
              border: '1px solid rgba(0,196,106,0.5)',
              color: '#00C46A',
              minHeight: '48px',
            }}
          >
            View Full Case Study <ArrowUpRight size={15} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05, background: 'rgba(200,163,78,0.12)' }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(createPageUrl('Contact') + `?subject=Project+Inquiry&message=${encodeURIComponent('Project similar to: ' + project.brand)}`)}
            className="flex items-center gap-2 px-8 py-3 rounded-full text-sm font-black tracking-widest uppercase"
            style={{
              background: 'transparent',
              border: '1px solid rgba(200,163,78,0.3)',
              color: '#C8A44E',
              minHeight: '48px',
              transition: 'background 0.3s',
            }}
          >
            Start Similar Project <ExternalLink size={14} />
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
}