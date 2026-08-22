import React from 'react';
import { Link } from 'react-router-dom';
import { ScanLine, Box, Building2, Clapperboard } from 'lucide-react';
import { METHOD_STRIP } from './hero.config.js';

const ICONS = { scan: ScanLine, box: Box, building: Building2, film: Clapperboard };

/** Restrained capability strip at the foot of the hero (brief §15). Real links to the methods. */
export default function HeroMethodStrip() {
  return (
    <nav className="idh-strip" aria-label="Interior design methods">
      {METHOD_STRIP.map((m) => {
        const Icon = ICONS[m.icon];
        return (
          <Link key={m.key} to={m.to} className="idh-strip-item">
            <span className="idh-strip-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.5} /></span>
            <span className="idh-strip-text">
              <span className="idh-strip-title">{m.title}</span>
              <span className="idh-strip-line">{m.line}</span>
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
