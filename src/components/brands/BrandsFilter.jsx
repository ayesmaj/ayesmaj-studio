import React from 'react';
import { motion } from 'framer-motion';

const ALL_SERVICES = ['Branding', '3D', 'Motion', 'Packaging', 'AI Campaign', 'Photography', 'CGI'];
const ALL_INDUSTRIES = ['Beauty', 'Food & Beverage', 'Tech', 'Real Estate', 'Health', 'Automotive', 'Retail', 'Services'];

function Pill({ label, active, onClick }) {
  return (
    <button onClick={onClick}
      className={`relative px-4 py-1.5 rounded-full text-[11px] font-semibold tracking-wider uppercase transition-all duration-300
        ${active
          ? 'text-black bg-[#00ff77] shadow-[0_0_20px_rgba(0,255,119,0.35)]'
          : 'text-gray-600 border border-white/[0.07] hover:border-white/20 hover:text-gray-400'
        }`}
    >
      {label}
    </button>
  );
}

export default function BrandsFilter({ brands, activeIndustry, setActiveIndustry, activeService, setActiveService, activeYear, setActiveYear }) {
  const years = ['All', ...Array.from(new Set(brands.map(b => b.year).filter(Boolean))).sort((a, b) => b - a)];

  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="max-w-7xl mx-auto px-6 pb-14"
    >
      <div className="border border-white/[0.05] rounded-2xl p-6 bg-white/[0.015] backdrop-blur-sm space-y-5">
        {/* Industry */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] text-gray-700 uppercase w-20 flex-shrink-0">Industry</span>
          <Pill label="All" active={activeIndustry === 'All'} onClick={() => setActiveIndustry('All')} />
          {ALL_INDUSTRIES.map(i => (
            <Pill key={i} label={i} active={activeIndustry === i} onClick={() => setActiveIndustry(i)} />
          ))}
        </div>
        {/* Service */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] text-gray-700 uppercase w-20 flex-shrink-0">Service</span>
          <Pill label="All" active={activeService === 'All'} onClick={() => setActiveService('All')} />
          {ALL_SERVICES.map(s => (
            <Pill key={s} label={s} active={activeService === s} onClick={() => setActiveService(s)} />
          ))}
        </div>
        {/* Year */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] tracking-[0.3em] text-gray-700 uppercase w-20 flex-shrink-0">Year</span>
          {years.map(y => (
            <Pill key={y} label={y} active={activeYear === y} onClick={() => setActiveYear(y)} />
          ))}
        </div>
      </div>
    </motion.div>
  );
}