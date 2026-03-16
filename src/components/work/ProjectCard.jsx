import React from 'react';
import { motion } from 'framer-motion';
import { createPageUrl } from '@/utils';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';

const CATEGORY_COLORS = {
  '3D Animation':          '#D4A853',
  'Product Visualization': '#D4A853',
  'CGI Commercial':        '#2d8a4e',
  'Motion Graphics':       '#7C6BE8',
  'Brand Identity':        '#2d8a4e',
  'AI-Enhanced Creative':  '#2d8a4e',
};

export default function ProjectCard({ project, index }) {
  const color = CATEGORY_COLORS[project.category] || '#D4A853';

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 16, scale: 0.97 }}
      transition={{ duration: 0.5, delay: index * 0.07 }}
      layout
    >
      <Link to={createPageUrl(`ProjectDetail?slug=${project.slug}`)}>
        <div className="group relative rounded-2xl overflow-hidden cursor-pointer">
          {/* Hover outline glow */}
          <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-[#D4A853]/35 transition-all duration-500 z-10 pointer-events-none" />

          {/* Image */}
          <div className="aspect-[4/3] overflow-hidden bg-[#111]">
            <img
              src={project.hero_image}
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
          </div>

          {/* Arrow icon */}
          <div className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300">
            <ArrowUpRight size={15} className="text-white" />
          </div>

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
            <span
              className="text-[10px] font-semibold tracking-[0.25em] uppercase px-2.5 py-1 rounded-full mb-3 inline-block"
              style={{ color, background: color + '18', border: `1px solid ${color}30` }}
            >
              {project.category}
            </span>
            <h3 className="text-white font-bold text-lg leading-tight">{project.title}</h3>
            <p className="text-gray-400 text-sm mt-1">{project.client} · {project.year}</p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}