import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import CircuitBackground from '@/components/home/CircuitBackground';
import HomeNav from '@/components/home/HomeNav';
import HomeFooter from '@/components/home/HomeFooter';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }
});

const PORTFOLIO = [
  {
    id: 1,
    title: 'Product Animation Series',
    category: 'Product Animation',
    image: '/brands/noam/1.png',
    description: 'High-end 3D product animations showcasing detailed mechanical movements and material interactions.'
  },
  {
    id: 2,
    title: 'Character Animation Showcase',
    category: 'Character Design',
    image: '/brands/characters/2.png',
    description: 'Dynamic character animations for commercials and brand campaigns with expressive movement.'
  },
  {
    id: 3,
    title: 'Motion Design Compilation',
    category: 'Motion Design',
    image: '/brands/blenday/2.png',
    description: 'Kinetic typography and motion graphics for digital marketing and brand storytelling.'
  }
];

export default function ServiceAnimation() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'Animation Services — AYESMAJ Studios';
  }, []);

  return (
    <div style={{ background: '#0B0F0C', minHeight: '100vh', overflowX: 'hidden' }}>
      <CircuitBackground />
      <HomeNav />

      <main className="relative z-10 pt-28 pb-0">
        {/* Hero */}
        <section className="relative w-full py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <motion.button
              {...fade(0)}
              onClick={() => navigate(createPageUrl('Home'))}
              className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase px-4 py-2 rounded-full mb-8 transition-all duration-300"
              style={{
                border: '1px solid rgba(200,163,78,0.3)',
                color: '#C8A44E',
                background: 'rgba(11,15,12,0.5)',
                backdropFilter: 'blur(10px)'
              }}
              whileHover={{ scale: 1.04 }}
            >
              <ArrowLeft size={13} /> Back to Home
            </motion.button>

            <motion.h1 {...fade(0.1)} className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
              3D Animation & Motion Design
            </motion.h1>

            <motion.p {...fade(0.2)} className="text-lg md:text-xl max-w-2xl mb-8" style={{ color: 'rgba(255,255,255,0.6)' }}>
              From cinematic product reveals to dynamic character work, we bring your concepts to life through cutting-edge 3D animation and motion design. Each frame crafted with precision and creative vision.
            </motion.p>

            <div className="flex flex-wrap gap-4">
              <motion.button
                {...fade(0.3)}
                onClick={() => navigate(createPageUrl('Contact'))}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold tracking-widest uppercase text-sm transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, rgba(200,163,78,0.9), rgba(200,163,78,0.7))', color: '#0B0F0C' }}
                whileHover={{ scale: 1.03 }}
              >
                Start Your Project <ArrowRight size={15} />
              </motion.button>
              <motion.button
                {...fade(0.4)}
                onClick={() => navigate(createPageUrl('Reel'))}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold tracking-widest uppercase text-sm transition-all duration-300"
                style={{ border: '1px solid rgba(200,163,78,0.3)', color: '#C8A44E' }}
                whileHover={{ scale: 1.03 }}
              >
                View Showreel
              </motion.button>
            </div>
          </div>
        </section>

        {/* Capabilities */}
        <section className="py-20 px-6 border-t" style={{ borderColor: 'rgba(200,163,78,0.1)' }}>
          <div className="max-w-6xl mx-auto">
            <motion.h2 {...fade(0)} className="text-3xl md:text-4xl font-black text-white mb-16 text-center">
              What We Create
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Product Animation',
                  description: 'High-fidelity 3D product visualizations showcasing mechanics, materials, and functionality with photorealistic detail.'
                },
                {
                  title: 'Character Animation',
                  description: 'Expressive character work for commercials, campaigns, and brand stories with natural movement and personality.'
                },
                {
                  title: 'Motion Graphics',
                  description: 'Kinetic typography, data visualization, and dynamic graphics that elevate your brand narrative.'
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  {...fade(0.1 + i * 0.1)}
                  className="p-8 rounded-2xl transition-all duration-300"
                  style={{
                    border: '1px solid rgba(200,163,78,0.15)',
                    background: 'rgba(200,163,78,0.02)'
                  }}
                  whileHover={{
                    borderColor: 'rgba(200,163,78,0.35)',
                    background: 'rgba(200,163,78,0.08)'
                  }}
                >
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.5)' }}>{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section className="py-20 px-6 border-t" style={{ borderColor: 'rgba(200,163,78,0.1)' }}>
          <div className="max-w-6xl mx-auto">
            <motion.h2 {...fade(0)} className="text-3xl md:text-4xl font-black text-white mb-16 text-center">
              Recent Work
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PORTFOLIO.map((item, i) => (
                <motion.div
                  key={item.id}
                  {...fade(0.1 + i * 0.08)}
                  className="group relative overflow-hidden rounded-2xl cursor-pointer"
                  style={{ border: '1px solid rgba(200,163,78,0.15)', aspectRatio: '16/10' }}
                  whileHover={{ scale: 1.01 }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to top, rgba(11,15,12,0.9) 0%, rgba(11,15,12,0.3) 60%, transparent 100%)'
                    }}
                  />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-xs tracking-[0.4em] uppercase mb-2" style={{ color: '#C8A44E' }}>
                      {item.category}
                    </p>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-6 border-t" style={{ borderColor: 'rgba(200,163,78,0.1)' }}>
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 {...fade(0)} className="text-4xl md:text-5xl font-black text-white mb-6">
              Ready to Animate Your Vision?
            </motion.h2>
            <motion.p {...fade(0.1)} className="text-lg mb-10" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Let's discuss how we can bring your ideas to life through stunning animation and motion design.
            </motion.p>
            <motion.button
              {...fade(0.2)}
              onClick={() => navigate(createPageUrl('Contact'))}
              className="inline-flex items-center gap-3 px-10 py-5 rounded-full font-bold tracking-widest uppercase text-base transition-all duration-300"
              style={{ background: 'linear-gradient(135deg, rgba(200,163,78,0.9), rgba(200,163,78,0.7))', color: '#0B0F0C' }}
              whileHover={{ scale: 1.05 }}
            >
              Start a Conversation <ArrowRight size={18} />
            </motion.button>
          </div>
        </section>
      </main>

      <HomeFooter />
    </div>
  );
}