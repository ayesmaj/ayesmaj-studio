import React, { useCallback, useEffect, useRef } from 'react';
import Seo from '@/components/ayesmaj/Seo';
import { useNavigate } from 'react-router-dom';
import AyesmajNav from '@/components/ayesmaj/AyesmajNav';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';
import WorkHero from '@/components/work/WorkHero';
import FeaturedWork from '@/components/work/FeaturedWork';
import WorkScale from '@/components/work/WorkScale';
import WorkArchive from '@/components/work/WorkArchive';
import WorkDisciplines from '@/components/work/WorkDisciplines';
import '@/components/work/work-tokens.css';

/* /Work — a lit archive rather than a file listing (redesign 2026-09-08,
   direction in docs/design-direction.md, components in
   docs/component-sources.md).

   The page moves through light instead of holding one temperature: a bronze
   hero, the featured spotlight, the full archive, an ivory daylight strip for
   proof, then a warm close. That rhythm is what separates "curated" from
   "listed" — the content was never the problem, the presentation was. */

export default function Work() {
  const navigate = useNavigate();
  const archiveRef = useRef(null);

  useEffect(() => {
    document.title = 'Selected Work | AYESMAJ Studios';
    window.scrollTo(0, 0);
    // Legacy curated-feed deep link; the ?a= / ?f= category links are handled
    // inside WorkArchive.
    if (new URLSearchParams(window.location.search).get('f') === 'Branding & Identity') {
      navigate('/Branding', { replace: true });
    }
  }, [navigate]);

  const scrollToArchive = useCallback(() => {
    archiveRef.current?.scrollIntoView({ block: 'start' });
  }, []);

  return (
    <div className="work-page" style={{ minHeight: '100vh', overflowX: 'clip', position: 'relative', color: '#F6F3ED' }}>
      <Seo
        title="Selected Work | AYESMAJ Studios"
        description="The complete AYESMAJ Studios archive — brand identities, cinematic film, AI campaigns, interiors, characters and 3D worlds, from concept to launch."
        path="/Work"
      />

      {/* Film grain over the whole page. 1.8% — enough to stop the large dark
          gradients banding on wide displays, not enough to notice. */}
      <div aria-hidden className="work-grain" />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <AyesmajNav />

        <main>
          <WorkHero onExplore={scrollToArchive} />

          <FeaturedWork />

          {/* THE ARCHIVE — all 828, grouped, films autoplaying from their
              preview loops. */}
          <section
            ref={archiveRef}
            id="archive"
            className="wk-archive-band"
            style={{ scrollMarginTop: 88 }}
            aria-labelledby="wk-archive-title"
          >
            <div className="wk-archive-inner">
              <header className="wk-archive-head">
                <p className="wk-eyebrow">The Complete Archive</p>
                <h2 className="wk-archive-title" id="wk-archive-title">
                  Everything, unfiltered.
                </h2>
                <p className="wk-archive-lede">
                  Jump to a discipline, or scroll the whole body of work.
                </p>
              </header>
              <WorkArchive />
            </div>
          </section>

          <WorkScale />

          <WorkDisciplines />
        </main>

        <AyesmajFooter />
      </div>
    </div>
  );
}
