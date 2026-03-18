import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const LOGO_URL = "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=800&q=80";

export default function Footer() {
  const go = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="relative border-t border-white/[0.04] bg-[#030303]">
      {/* Top glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,119,0.2), transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Brand */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-5">
              <img src={LOGO_URL} alt="AJ" className="h-10 w-auto" />
              <div>
                <div className="text-2xl font-extrabold tracking-widest text-white">AYESMAJ</div>
                <div className="text-[9px] tracking-[0.5em] text-gray-600 -mt-0.5">STUDIOS</div>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-xs mb-6">
              Intelligent media systems for premium brands.<br />3D · AI · Automation · Growth.
            </p>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff77] shadow-[0_0_6px_#00ff77]" />
              <span className="text-xs text-[#00ff77]/60 tracking-widest uppercase font-light">Systems Online</span>
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-3">
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-5">Navigate</h4>
            <ul className="space-y-3">
              {[['#system','System'],['#services','Services'],['#work','Work'],['#pricing','Pricing']].map(([href, label]) => (
                <li key={label}>
                  <button onClick={() => go(href)}
                    className="text-gray-600 hover:text-[#00ff77] transition-colors text-sm"
                  >
                    {label}
                  </button>
                </li>
              ))}
              <li>
                <Link to={createPageUrl('Contact')} className="text-gray-600 hover:text-[#00ff77] transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4">
            <h4 className="text-white text-xs font-bold tracking-[0.2em] uppercase mb-5">Contact</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><a href="mailto:hello@ayesmaj.com" className="hover:text-[#00ff77] transition-colors">hello@ayesmaj.com</a></li>
              <li>Global Remote Studio</li>
              <li className="text-gray-700">Los Angeles · London · Dubai</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/[0.04] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-700">
          <span>© 2025 AYESMAJ Studios. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gray-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-400 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}