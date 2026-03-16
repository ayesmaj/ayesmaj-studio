import React from 'react';

export default function SectionWrapper({ id, children, className = '', style = {} }) {
  return (
    <section
      id={id}
      className={`relative py-24 md:py-32 px-6 ${className}`}
      style={{
        background: 'transparent',
        ...style
      }}
    >
      {/* Top blend gradient */}
      <div
        className="absolute top-0 inset-x-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(0,196,106,0.08), transparent)',
          zIndex: 1
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}