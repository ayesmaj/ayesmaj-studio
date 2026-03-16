import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const items = [
  { title: 'Nebula Watch',     cat: 'Product Visualization',   img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=80', span: 'md:col-span-1' },
  { title: 'Aurora Motors',   cat: 'CGI Commercial',           img: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=900&q=80', span: 'md:col-span-1' },
  { title: 'Prism Cosmetics', cat: 'Brand Animation',          img: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80', span: 'md:col-span-2' },
  { title: 'Vertex Gaming',   cat: 'Motion Graphics',          img: 'https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?w=900&q=80', span: 'md:col-span-1' },
  { title: 'Elevate Spirits', cat: '3D Animation',             img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80', span: 'md:col-span-1' },
];

export default function PortfolioSection() {
  return (
    <section className="relative py-28 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14"
        >
          <div>
            <p className="text-xs tracking-[0.35em] text-[#D4A853] uppercase mb-3">Selected Work</p>
            <h2 className="text-3xl md:text-5xl font-bold text-white">Built with intent</h2>
          </div>
          <button className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors group self-start md:self-auto">
            <Link to={createPageUrl('Work')} className="inline-flex items-center gap-2 group">View All Work <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" /></Link>
          </button>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {items.map((item, i) => (
            <motion.div key={item.title}
              initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`group relative rounded-2xl overflow-hidden cursor-pointer ${item.span} ${i === 2 ? 'aspect-[2/1]' : 'aspect-[4/3]'}`}
            >
              {/* Glow outline on hover */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent group-hover:ring-[#D4A853]/40 transition-all duration-500 z-10" />

              <img src={item.img} alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-107"
                style={{ transform: 'scale(1.04)' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-1 group-hover:translate-y-0 transition-transform duration-400">
                <p className="text-[#D4A853] text-xs font-medium tracking-widest uppercase mb-1.5">{item.cat}</p>
                <h3 className="text-white text-xl md:text-2xl font-bold">{item.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}