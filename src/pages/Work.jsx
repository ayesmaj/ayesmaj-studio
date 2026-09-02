import React, { useEffect } from 'react';
import Seo from '@/components/ayesmaj/Seo';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AyesmajNav from '@/components/ayesmaj/AyesmajNav';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';
import CinematicButton from '@/components/ayesmaj/CinematicButton';
import SectionHeader from '@/components/ayesmaj/SectionHeader';
import { FONTS } from '@/components/ayesmaj/theme';
import WorkArchive from '@/components/work/WorkArchive';
import { WORK_ARCHIVE } from '@/data/workArchive';

const GRADIENT = 'linear-gradient(90deg,#D8B75A 0%,#C58B57 28%,#A35BDA 72%,#7A48FF 100%)';
const GOLD = '#D8B75A';

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
});

/* One gallery, one filter system. The page used to stack a curated feed (nine
   pills, ~30 cards, its own modal) on top of the full archive (its own chips,
   1,021 tiles, its own lightbox) - two sections doing the same job (owner
   report 2026-09-02). The archive absorbed the feed: it holds every piece the
   feed showed, and the case-study door the feed's brand cards provided now
   lives in the archive lightbox, which links straight to /BrandDetail. */

export default function Work() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Selected Work | AYESMAJ Studios';
    window.scrollTo(0, 0);
    // Legacy curated-feed deep link; the equivalent archive links (?a=) are
    // handled inside WorkArchive, including the old ?f= names.
    if (new URLSearchParams(window.location.search).get('f') === 'Branding & Identity') {
      navigate('/Branding', { replace: true });
    }
  }, [navigate]);

  const section = { maxWidth: 1380, margin: '0 auto', padding: '0 clamp(24px,5vw,80px)' };

  return (
    <div style={{ background: '#0D0F0E', minHeight: '100vh', overflowX: 'clip', position: 'relative', color: '#F6F3ED' }}>
      <Seo
        title="Selected Work | AYESMAJ Studios"
        description="The complete AYESMAJ Studios archive — brand identities, cinematic websites, AI campaigns, interiors, characters and 3D worlds, from concept to launch."
        path="/Work"
      />

      {/* soft vignette */}
      <div aria-hidden style={{ position: 'fixed', inset: 0, pointerEvents: 'none', background: 'radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,0.03) 0%, transparent 45%), radial-gradient(90% 70% at 50% 110%, rgba(122,72,255,0.05) 0%, transparent 55%)' }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <AyesmajNav />

        <main>
          {/* HERO */}
          <section style={{ ...section, paddingTop: 'clamp(140px,16vw,200px)', paddingBottom: 'clamp(40px,5vw,64px)' }}>
            <SectionHeader
              as="h1"
              align="left"
              max={980}
              eyebrow="SELECTED WORK"
              title={<>DIGITAL WORLDS BUILT TO BE{' '}<span style={{ backgroundImage: GRADIENT, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>REMEMBERED</span></>}
              subtitle={`${WORK_ARCHIVE.length.toLocaleString()} pieces — brand systems, interiors, characters, films, logos, AI campaigns. The complete archive, unfiltered.`}
              accent={GOLD}
            />
          </section>

          {/* THE ARCHIVE — the one gallery */}
          <div className="idv2-bgc idv2-bgc-04 idv2-bgc--fade-top" style={{ '--bgc-fade': '#0D0F0E' }}>
            <section style={{ ...section, paddingBottom: 'clamp(64px,8vw,120px)' }}>
              <WorkArchive />
            </section>
          </div>

          {/* CTA */}
          <div className="idv2-bgc idv2-bgc-07 idv2-bgc--fade-top">
            <section style={{ ...section, paddingBottom: 'clamp(80px,10vw,140px)', textAlign: 'center' }}>
              <motion.div {...fade(0.1)}>
                <h2 style={{ fontFamily: FONTS.display, fontSize: 'clamp(30px,4.6vw,64px)', fontWeight: 800, textTransform: 'uppercase', lineHeight: 0.98, color: '#F6F3ED', margin: '0 0 28px' }}>
                  Your Brand Could Be Next
                </h2>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <CinematicButton label="Start a Project" accent={GOLD} size="lg" onClick={() => navigate('/Contact')} />
                </div>
              </motion.div>
            </section>
          </div>
        </main>

        <AyesmajFooter />
      </div>
    </div>
  );
}
