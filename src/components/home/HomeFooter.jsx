import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';

const LOGO_URL = "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/6996504f9438187ae1bf2677/a8c2ec503_AYESMAJ_transparent.png";

export default function HomeFooter() {
  const go = (id) => document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  const NAV_LINKS = [
  { label: 'Work', page: 'Work' },
  { label: 'Branding', page: 'Branding' },
  { label: 'Reel', page: 'Reel' },
  { label: 'Clients', page: 'Clients' },
  { label: 'About', page: 'About' },
  { label: 'Contact', page: 'Contact' }];


  return (
    <footer className="relative"
    style={{ background: '#0B0F0C', borderTop: '1px solid rgba(200,163,78,0.04)' }}>

      <div className="absolute inset-x-0 top-0 h-px"
      style={{ background: 'linear-gradient(90deg, transparent, rgba(200,163,78,0.08), transparent)' }} />

      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src={LOGO_URL} alt="AYESMAJ" className="h-16 w-auto" />
              <div>
                
                
              </div>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#3a4a3e' }}>
              Premium 3D animation & visual storytelling studio.<br />Creating cinematic experiences globally.
            </p>
            <div className="flex items-center gap-2 mt-5">
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#C8A44E', boxShadow: '0 0 6px #C8A44E' }} />
              <span className="text-[10px] tracking-widest uppercase" style={{ color: 'rgba(200,164,78,0.5)' }}>Studio Active</span>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-[10px] tracking-[0.4em] uppercase font-bold mb-5" style={{ color: '#C8A44E' }}>Navigate</h4>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ label, page }) =>
              <li key={label}>
                  <Link to={createPageUrl(page)} className="text-sm font-medium transition-colors duration-300 hover:text-white"
                style={{ color: '#3a4a3e' }}>{label}</Link>
                </li>
              )}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-[10px] tracking-[0.4em] uppercase font-bold mb-5" style={{ color: '#C8A44E' }}>Contact</h4>
            <ul className="space-y-2 text-sm" style={{ color: '#3a4a3e' }}>
              <li><a href="mailto:ayesmajstudios@gmail.com" className="transition-colors hover:text-white" style={{ color: '#3a4a3e' }}>ayesmajstudios@gmail.com</a></li>
              <li>Los Angeles · London · Dubai</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs"
        style={{ borderTop: '1px solid rgba(255,255,255,0.04)', color: '#2a3a2e' }}>
          <span>© 2025 AYESMAJ Studios. All rights reserved.</span>
          <div className="flex gap-5">
            <a href="#" className="hover:text-gray-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-gray-500 transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>);

}