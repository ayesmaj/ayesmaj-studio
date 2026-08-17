import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const projects = [
  {
    title: 'Character Design',
    category: '3D Animation',
    result: 'Cinematic CGI Breakdown',
    img: '/characters/1.jpeg',
    span: 'lg:col-span-2'
  },
  {
    title: 'Interior Design',
    category: 'AI Photography',
    result: 'Real Estate Visual Campaign',
    img: '/brands/interior-design/1.jpeg',
    span: ''
  },
  {
    title: 'Brand Identities',
    category: 'Brand Identity',
    result: 'Full Logo System Delivery',
    img: '/logos/1.png',
    span: ''
  },
  {
    title: 'NOAM Audio',
    category: 'Product Visualization',
    result: 'E-commerce Launch Asset',
    img: '/brands/noam/1.png',
    span: ''
  },
  {
    title: 'Blenday',
    category: 'CGI Commercial',
    result: 'Product Ad Campaign',
    img: '/brands/blenday/1.png',
    span: ''
  },
  {
    title: 'ASHÉ Campaign',
    category: 'Brand Campaign',
    result: 'Full Brand World Delivery',
    img: '/brands/ashe/5.png',
    span: ''
  },
  {
    title: 'Boom Chicka Pop',
    category: 'Packaging Design',
    result: 'CGI Product Reveal',
    img: '/brands/boom-chica/2.png',
    span: ''
  },
  {
    title: 'LaCroix',
    category: 'CGI Commercial',
    result: 'Product Hero Shot',
    img: '/brands/lacroix/1.jpg',
    span: 'lg:col-span-2'
  },
];

function ProjectThumb({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={`relative rounded-2xl overflow-hidden cursor-pointer group ${project.span}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="aspect-[4/3] lg:aspect-auto lg:h-72">
        <img src={project.img} alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

        {/* Base overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Hover overlay */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col justify-end p-6"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 60%, transparent 100%)' }}
            >
              <div className="absolute top-4 right-4 w-9 h-9 rounded-full border border-[#00ff77]/40 bg-[#00ff77]/10 flex items-center justify-center">
                <ArrowUpRight size={15} className="text-[#00ff77]" />
              </div>
              <span className="text-[10px] tracking-[0.3em] text-[#00ff77] uppercase mb-2">{project.category}</span>
              <div className="text-xs text-white/60 font-mono">{project.result}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Always visible title */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-white font-bold text-lg">{project.title}</h3>
          {!hovered && <p className="text-gray-500 text-xs mt-0.5">{project.category}</p>}
        </div>

        {/* Ring glow on hover */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-[#00ff77]/20 transition-all duration-500 pointer-events-none" />
      </div>
    </div>
  );
}

export default function ShowcaseSection() {
  return (
    <section id="work" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14"
        >
          <div>
            <p className="text-[11px] tracking-[0.35em] text-[#00ff77]/70 uppercase mb-4">Showcase</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Selected Work
            </h2>
          </div>
          <Link to={createPageUrl('Work')}
            className="group flex items-center gap-2 text-sm text-gray-500 hover:text-[#00ff77] transition-colors"
          >
            View all projects <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <motion.div key={p.title}
              initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.6, delay: i * 0.08 }}
              className={p.span}
            >
              <ProjectThumb project={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
