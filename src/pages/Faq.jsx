import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import AyesmajNav from '@/components/ayesmaj/AyesmajNav';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';
import { FONTS } from '@/components/ayesmaj/theme';
import { SITE, SERVICES_MENU } from '@/data/siteConfig';

const BG = '#0B0D0C';
const GOLD = '#D8B75A';
const INK = '#F6F3ED';
const BODY = '#D7D1C8';
const MUTE = '#AAA39A';
const BORDER = 'rgba(255,255,255,0.09)';
const GRADIENT = 'linear-gradient(90deg,#D8B75A 0%,#C88B58 30%,#A45FDB 70%,#7A48FF 100%)';

const fade = (d = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay: d, ease: [0.22, 1, 0.36, 1] },
});

const sP = { fontFamily: FONTS.ui, fontSize: 16, lineHeight: 1.75, color: BODY, margin: '0 0 16px' };
const sA = { color: GOLD, textDecorationColor: 'rgba(216,183,90,0.5)' };

const SERVICES_LIST = SERVICES_MENU.map((s) => s.label).join(', ');

// One array drives both the visible accordions and the FAQPage JSON-LD.
const QA = [
  {
    q: 'What services does AYESMAJ Studios offer?',
    a: `We are a multi-discipline studio covering ${SERVICES_LIST}. Everything is built as one connected creative system, so your identity, website, content, and motion all speak the same language.`,
  },
  {
    q: 'What does your process look like?',
    a: 'Every project moves through five stages: Strategy, Design, Content, Motion, and Launch. We start by understanding your brand and goals, design the visual system, produce the content and motion, and take it live.',
  },
  {
    q: 'How do payments work?',
    a: 'We accept bank transfer, PayPal, and credit card. Monthly plans are billed at the start of each cycle; one-time projects require 50% upfront, with the balance on delivery.',
  },
  {
    q: 'Can I cancel my plan?',
    a: 'Yes. Monthly plans can be cancelled with 7 days notice before the next billing date. There are no lock-in contracts.',
  },
  {
    q: 'Who owns the files and rights to the work?',
    a: 'You do. Once a project is paid in full, you receive all source files, exports, and full commercial rights to the work we created for you.',
  },
  {
    q: 'How fast is delivery?',
    a: 'It depends on the plan: Starter delivers within 7 days, Growth within 5 days with priority handling, and Studio Pro includes same-day revisions. Timelines start once your brief is confirmed.',
  },
  {
    q: 'Where are you located, and do you work internationally?',
    a: `Our studio operates from ${SITE.location}. Collaboration happens over email and video calls, so distance is never an obstacle.`,
  },
  {
    q: 'What does a "brand world" include?',
    a: 'A brand world is a complete visual system rather than disconnected deliverables: brand identity, cinematic content, a premium website, AI-assisted production, and immersive 3D — all designed to work together as one connected creative system.',
  },
  {
    q: 'How do you use AI in your work?',
    a: 'We use AI to produce content at scale — images, posts, and campaign assets — always directed, curated, and refined by human designers. AI accelerates production; strategy, taste, and creative direction stay human.',
  },
  {
    q: 'How do I get started?',
    a: `Send us a message through the Contact page or email ${SITE.email}. Tell us about your project, timeline, and goals, and we will reply with a tailored quote or set up a free discovery call.`,
  },
];

const faqJsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: QA.map(({ q, a }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: a },
  })),
});

export default function Faq() {
  useEffect(() => {
    document.title = `FAQ — ${SITE.name}`;
    let m = document.querySelector('meta[name="description"]');
    if (!m) { m = document.createElement('meta'); m.setAttribute('name', 'description'); document.head.appendChild(m); }
    m.setAttribute('content', `Answers to common questions about ${SITE.name} — services, process, pricing, delivery, and how to start.`);
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="ayz-legal" style={{ background: BG, minHeight: '100vh', overflowX: 'hidden', color: INK }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: faqJsonLd }} />
      <AyesmajNav />

      <header style={{ maxWidth: 820, margin: '0 auto', padding: '150px 24px 8px' }}>
        <motion.p {...fade(0)} style={{ fontFamily: FONTS.ui, fontSize: 11, fontWeight: 600, letterSpacing: '0.35em', textTransform: 'uppercase', color: GOLD, margin: '0 0 16px' }}>
          Answers
        </motion.p>
        <motion.h1 {...fade(0.08)} style={{ fontFamily: FONTS.display, fontSize: 'clamp(34px,5.5vw,58px)', fontWeight: 400, textTransform: 'uppercase', lineHeight: 1, color: INK, margin: '0 0 14px' }}>
          Frequently Asked Questions
        </motion.h1>
        <motion.p {...fade(0.14)} style={{ ...sP, color: MUTE, maxWidth: 620 }}>
          Services, process, pricing, delivery — the practical answers. For package details, see{' '}
          <Link to="/Pricing" style={sA}>Pricing</Link>.
        </motion.p>
      </header>

      <div className="idv2-bgc idv2-bgc-08 idv2-bgc--fade-top">
      <main style={{ maxWidth: 820, margin: '0 auto', padding: '20px 24px 110px' }}>
        {QA.map(({ q, a }, i) => (
          <motion.div key={q} {...fade(Math.min(i * 0.04, 0.2))}>
            <details className="ayz-faq" style={{ borderBottom: `1px solid ${BORDER}` }}>
              <summary style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 18, padding: '22px 0', cursor: 'pointer', listStyle: 'none', fontFamily: FONTS.ui, fontSize: 16, fontWeight: 600, lineHeight: 1.4, color: INK }}>
                <h2 style={{ font: 'inherit', margin: 0 }}>{q}</h2>
                <span className="ayz-faq-plus" aria-hidden="true" style={{ flexShrink: 0, fontSize: 24, lineHeight: 1, fontWeight: 400, background: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', transition: 'transform 0.3s ease' }}>
                  +
                </span>
              </summary>
              <p style={{ ...sP, paddingBottom: 22, marginBottom: 0, maxWidth: 720 }}>{a}</p>
            </details>
          </motion.div>
        ))}

        <motion.p {...fade()} style={{ ...sP, marginTop: 44, color: MUTE }}>
          Didn't find your answer? Reach out through the{' '}
          <Link to="/Contact" style={sA}>Contact</Link> page or email{' '}
          <a href={`mailto:${SITE.email}`} style={sA}>{SITE.email}</a> — we reply to every message.
        </motion.p>
      </main>
      </div>

      <AyesmajFooter />

      <style>{`
        .ayz-faq summary::-webkit-details-marker { display: none; }
        .ayz-faq[open] .ayz-faq-plus { transform: rotate(45deg); }
        .ayz-legal a:focus-visible, .ayz-faq summary:focus-visible { outline: 2px solid ${GOLD}; outline-offset: 3px; border-radius: 4px; }
        @media (prefers-reduced-motion: reduce) {
          .ayz-faq-plus { transition: none; }
        }
      `}</style>
    </div>
  );
}
