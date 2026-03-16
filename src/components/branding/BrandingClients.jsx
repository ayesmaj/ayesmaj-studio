import React from 'react';
import { motion } from 'framer-motion';

const CLIENTS = [
  'ASHÉ Ritual Roast',
  'Boom Chicka Pop',
  'NOAM Audio',
  'Blenday',
  'Angie\'s Boomchickapop',
  'Bean & Co.',
];

export default function BrandingClients() {
  return (
    <section className="relative py-24 px-6">
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(200,163,78,0.12), transparent)' }} />

      <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-14"
        >
          <p className="text-xs tracking-[0.5em] uppercase mb-4" style={{ color: '#C8A44E' }}>Our Clients</p>
          <h2 className="text-4xl font-black text-white tracking-tight">Trusted by Brands</h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CLIENTS.map((client, i) => (
            <motion.div
              key={client}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ borderColor: 'rgba(0,196,106,0.35)', boxShadow: '0 0 20px rgba(0,196,106,0.1)' }}
              className="px-4 py-5 rounded-xl flex items-center justify-center cursor-default transition-all duration-300"
              style={{
                border: '1px solid rgba(200,163,78,0.1)',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              <span className="text-xs font-bold tracking-wider uppercase text-center leading-snug"
                style={{ color: 'rgba(255,255,255,0.5)' }}>
                {client}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}