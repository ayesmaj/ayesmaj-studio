import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const projects = [
  {
    title: 'Dark Mech',
    category: '3D Animation',
    result: 'Cinematic CGI Breakdown',
    img: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?w=900&q=80',
    span: 'lg:col-span-2'
  },
  {
    title: 'Luxury Pool Shoot',
    category: 'AI Photography',
    result: 'Real Estate Visual Campaign',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&q=80',
    span: ''
  },
  {
    title: 'AssistLine',
    category: 'Brand Identity',
    result: 'Full Logo System Delivery',
    img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=700&q=80',
    span: ''
  },
  {
    title: 'Tower Speaker',
    category: 'Product Visualization',
    result: 'E-commerce Launch Asset',
    img: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=700&q=80',
    span: ''
  },
  {
    title: 'Blenday',
    category: 'CGI Commercial',
    result: 'Product Ad Campaign',
    img: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80',
    span: ''
  },
  {
    title: 'Clean Sweep',
    category: 'Brand Campaign',
    result: 'AI Character + Visual Identity',
    img: 'https://images.unsplash.com/photo-1542744094-24638eff58bb?w=700&q=80',
    span: ''
  },
  {
    title: 'Provence Beauty',
    category: 'AI Video + 3D',
    result: 'Luxury Product Visual',
    img: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=700&q=80',
    span: ''
  },
  {
    title: 'LaCroix',
    category: 'CGI Commercial',
    result: 'Product Hero Shot',
    img: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=900&q=80',
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