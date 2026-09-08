import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { WORK_ARCHIVE, WORK_COUNTS } from '@/data/workArchive';
import { REAL_BRANDS } from '@/data/realBrands';
import './work-scale.css';

/* The page's one bright band. Its job is rhythm as much as proof: after two
   dark sections the archive needs daylight, or the whole page reads as one
   long night. Every number is counted from the generated manifests at build
   time - nothing here is a claim someone typed in. */

const films = WORK_ARCHIVE.filter((i) => i.video);
const minutes = Math.round(films.reduce((s, i) => s + (i.dur || 0), 0) / 60);

const FIGURES = [
  [WORK_ARCHIVE.length.toLocaleString(), 'Pieces in the archive', 'Every frame the studio has shipped'],
  [String(Object.keys(WORK_COUNTS).length), 'Disciplines', 'Identity, CGI, interiors, film, web'],
  [String(REAL_BRANDS.length), 'Brand worlds', 'Built end to end, concept to launch'],
  [`${films.length}`, `Films · ${minutes} minutes`, 'Commercials, brand films, motion'],
];

export default function WorkScale() {
  return (
    <section className="ws" aria-labelledby="ws-title">
      <div className="ws-inner">
        <header className="ws-head">
          <p className="ws-eyebrow">The Scale of It</p>
          <h2 className="ws-title" id="ws-title">
            Built across motion, branding, CGI, interiors and web.
          </h2>
        </header>

        <dl className="ws-figures">
          {/* Rendered, not revealed on scroll: a whileInView stagger here left the
              band visibly empty for seconds at a time under the archive's load.
              See the note in WorkDisciplines.jsx. */}
          {FIGURES.map(([value, label, note]) => (
            <div key={label} className="ws-figure">
              <dt className="ws-value">{value}</dt>
              <dd className="ws-label">
                <span className="ws-label-main">{label}</span>
                <span className="ws-label-note">{note}</span>
              </dd>
            </div>
          ))}
        </dl>

        <Link className="ws-cta" to="/Contact">
          Start a project <ArrowUpRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
