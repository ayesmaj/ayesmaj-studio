import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ClientCard({ logo: Logo, name, description }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative group"
    >
      {/* Glow effect behind card */}
      <motion.div
        animate={{
          opacity: hovered ? 0.4 : 0.2,
          scale: hovered ? 1.1 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 rounded-4xl blur-2xl pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgba(0,196,106,0.3), rgba(212,175,55,0.2))',
          transform: 'translate(-2px, -2px)',
        }}
      />

      {/* Card */}
      <motion.div
        animate={{
          scale: hovered ? 1.03 : 1,
          borderColor: hovered ? 'rgba(0,196,106,0.3)' : 'rgba(255,255,255,0.08)',
          background: hovered ? 'rgba(0,0,0,0.45)' : 'rgba(0,0,0,0.35)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="relative p-8 rounded-4xl border cursor-pointer transition-all duration-300 backdrop-blur-sm"
        style={{
          borderColor: 'rgba(255,255,255,0.08)',
          background: 'rgba(0,0,0,0.35)',
        }}
      >
        {/* Logo container */}
        <motion.div
          animate={{ filter: hovered ? 'brightness(1.15)' : 'brightness(1)' }}
          transition={{ duration: 0.3 }}
          className="flex justify-center mb-6 h-12 items-center"
        >
          {typeof Logo === 'string' ? (
            <img src={Logo} alt={name} className="h-full object-contain" />
          ) : (
            <Logo className="h-full w-auto" />
          )}
        </motion.div>

        {/* Brand name with animated underline */}
        <div className="relative text-center mb-2">
          <h3 className="text-lg font-semibold text-white">{name}</h3>
          <motion.div
            animate={{
              scaleX: hovered ? 1 : 0,
              opacity: hovered ? 1 : 0,
            }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="absolute bottom-0 left-1/2 h-0.5 origin-center"
            style={{
              width: '40px',
              transform: 'translateX(-50%)',
              background: 'linear-gradient(90deg, transparent, #d4af37, transparent)',
            }}
          />
        </div>

        {/* Description */}
        <p
          className="text-center text-sm font-normal leading-relaxed mt-4"
          style={{ color: 'rgba(255,255,255,0.6)', maxWidth: '220px', margin: '8px auto 0' }}
        >
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
}