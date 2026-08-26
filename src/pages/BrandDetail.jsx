import React, { useEffect, useRef, useState } from 'react';
import { motion, MotionConfig, useInView } from 'framer-motion';
import { ArrowLeft, ArrowRight, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import AyesmajNav from '@/components/ayesmaj/AyesmajNav';
import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';
import ImageGallery from '@/components/ui/image-gallery';
import { BRANDS, getBrand, getBrandAssetPath, getBrandVideo } from '@/data/brands';
import './BrandDetail.css';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] },
});

const getAccentTheme = (hex = '#9B59B6') => {
  const value = hex.replace('#', '');
  if (!/^[0-9a-f]{6}$/i.test(value)) {
    return { ink: '#68407a', buttonText: '#ffffff' };
  }

  const channels = [0, 2, 4].map((offset) => parseInt(value.slice(offset, offset + 2), 16));
  const linear = channels.map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.03928
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  const luminance = (0.2126 * linear[0]) + (0.7152 * linear[1]) + (0.0722 * linear[2]);
  const inkChannels = luminance > 0.34
    ? channels.map((channel) => Math.round(channel * 0.42))
    : channels;

  return {
    ink: `rgb(${inkChannels.join(', ')})`,
    buttonText: luminance > 0.46 ? '#17130f' : '#ffffff',
  };
};

const normalizeHex = (hex = '#9B59B6') => (/^#[0-9a-f]{6}$/i.test(hex) ? hex : '#9B59B6');

const blendHex = (from, to, amount) => {
  const start = normalizeHex(from).slice(1);
  const end = normalizeHex(to).slice(1);
  const channels = [0, 2, 4].map((offset) => {
    const first = parseInt(start.slice(offset, offset + 2), 16);
    const second = parseInt(end.slice(offset, offset + 2), 16);
    return Math.round(first + ((second - first) * amount));
  });
  return `#${channels.map((channel) => channel.toString(16).padStart(2, '0')).join('')}`.toUpperCase();
};

const getIdentityDirection = (brand) => {
  const keywords = `${brand.name} ${brand.subtitle} ${brand.category} ${brand.description} ${brand.tags.join(' ')}`.toLowerCase();

  if (/(luxury|spirits|wine|whiskey|beauty|ritual|interior|architectural)/.test(keywords)) {
    return {
      display: 'Editorial Serif',
      body: 'DM Sans',
      displayStack: 'Georgia, "Times New Roman", serif',
      bodyStack: '"DM Sans", Arial, sans-serif',
    };
  }

  if (/(ai|technology|digital|product visualization|cgi|3d|infrastructure)/.test(keywords)) {
    return {
      display: 'Outfit',
      body: 'DM Sans',
      displayStack: 'Outfit, "DM Sans", sans-serif',
      bodyStack: '"DM Sans", Inter, Arial, sans-serif',
    };
  }

  if (/(campaign|food|snack|motion|film|street)/.test(keywords)) {
    return {
      display: 'Outfit ExtraBold',
      body: 'DM Sans',
      displayStack: 'Outfit, "DM Sans", sans-serif',
      bodyStack: '"DM Sans", Arial, sans-serif',
    };
  }

  return {
    display: 'Outfit',
    body: 'DM Sans',
    displayStack: 'Outfit, "DM Sans", sans-serif',
    bodyStack: '"DM Sans", Arial, sans-serif',
  };
};

const identitySectionPattern = /(identity|logo|brand visuals|logo & mark)/i;

const getIdentityAssets = (brand) => {
  const identitySection = brand.sections?.find((section) => identitySectionPattern.test(section.title));
  const productSection = brand.sections?.find((section) => (
    !identitySectionPattern.test(section.title)
    && /(product|packaging|campaign|digital|launch|visual|apparel|environment)/i.test(section.title)
  ));
  // A logo is a distinct identity asset, not simply the first image in a
  // brand board. Every case study declares its real mark explicitly.
  const logoFile = brand.logo || identitySection?.images?.[0] || brand.images[0] || brand.featured;
  const productFile = (brand.featured !== logoFile ? brand.featured : null)
    || productSection?.images?.find((image) => image !== logoFile)
    || brand.images.find((image) => image !== logoFile)
    || brand.featured;

  return { logoFile, productFile };
};

function IdentityBoard({ brand }) {
  const accent = normalizeHex(brand.accent);
  const palette = [
    { name: 'Primary', value: accent },
    { name: 'Deep', value: blendHex(accent, '#17140F', 0.55) },
    { name: 'Signal', value: blendHex(accent, '#FFFFFF', 0.32) },
    { name: 'Soft', value: blendHex(accent, '#FFFFFF', 0.78) },
    { name: 'Paper', value: '#F8F5EF' },
  ];
  const typography = getIdentityDirection(brand);
  const { logoFile, productFile } = getIdentityAssets(brand);

  return (
    <motion.figure {...fade(0.04)} className="identity-board">
      <div className="identity-board-topline">
        <span>{brand.name} / Visual identity</span>
        <span>{brand.year} — AYESMAJ Studios</span>
      </div>

      <div className="identity-board-grid">
        <section className="identity-logo-panel" aria-label={`${brand.name} logo system`}>
          <p className="identity-board-label">Logo / signature</p>
          <div className="identity-logo-art">
            <img
              src={getBrandAssetPath(brand, logoFile)}
              alt={`${brand.name} logo`}
              loading="lazy"
            />
          </div>
          <div className="identity-brand-lockup">
            <strong>{brand.name}</strong>
            <span>{brand.subtitle}</span>
          </div>
        </section>

        <section className="identity-system-panel" aria-label={`${brand.name} colors and typography`}>
          <div className="identity-palette-block">
            <p className="identity-board-label">Color palette</p>
            <div className="identity-swatches">
              {palette.map((color) => (
                <div className="identity-swatch" key={color.name}>
                  <span style={{ background: color.value }} aria-hidden="true" />
                  <strong>{color.name}</strong>
                  <small>{color.value}</small>
                </div>
              ))}
            </div>
          </div>

          <div className="identity-type-block">
            <p className="identity-board-label">Typography</p>
            <div className="identity-type-sample">
              <span style={{ fontFamily: typography.displayStack }}>Aa</span>
              <div>
                <strong>{typography.display}</strong>
                <small>Display / headlines</small>
              </div>
            </div>
            <p className="identity-type-line" style={{ fontFamily: typography.bodyStack }}>
              {typography.body} — clarity across every brand touchpoint.
            </p>
          </div>
        </section>

        <section className="identity-product-panel" aria-label={`${brand.name} product or packaging direction`}>
          <img
            src={getBrandAssetPath(brand, productFile)}
            alt={`${brand.name} product, packaging, or campaign application`}
            loading="lazy"
          />
          <div className="identity-product-overlay" aria-hidden="true" />
          <div className="identity-product-caption">
            <span>Product / packaging</span>
            <strong>Built as one visual language.</strong>
          </div>
        </section>
      </div>

      <figcaption>
        <span>Logo</span><i aria-hidden="true" /><span>Palette</span><i aria-hidden="true" />
        <span>Typography</span><i aria-hidden="true" /><span>Application</span>
      </figcaption>
    </motion.figure>
  );
}

function VideoCard({ src, accent, title }) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.3 });

  const handleMetadata = () => {
    if (ref.current && !playing && Number.isFinite(ref.current.duration)) {
      ref.current.currentTime = Math.min(1.5, Math.max(0, ref.current.duration - 0.2));
    }
  };

  const toggle = () => {
    if (!ref.current) return;
    if (playing) {
      ref.current.pause();
      setPlaying(false);
      return;
    }

    ref.current.currentTime = 0;
    ref.current.play();
    setPlaying(true);
  };

  useEffect(() => {
    if (!inView && playing && ref.current) {
      ref.current.pause();
      setPlaying(false);
    }
  }, [inView, playing]);

  const toggleMute = () => {
    const next = !muted;
    setMuted(next);
    if (ref.current) ref.current.muted = next;
  };

  return (
    <motion.article {...fade()} className="case-video-card" style={{ '--video-accent': accent }}>
      <video
        ref={ref}
        src={src}
        loop
        playsInline
        muted={muted}
        preload="metadata"
        aria-label={title || 'Project film'}
        onLoadedMetadata={handleMetadata}
      />
      <div className="case-video-shade" aria-hidden="true" />
      <button
        type="button"
        className="case-video-toggle"
        onClick={toggle}
        aria-label={playing ? `Pause ${title || 'project film'}` : `Play ${title || 'project film'}`}
      >
        {playing
          ? <Pause size={21} fill="currentColor" aria-hidden="true" />
          : <Play size={21} fill="currentColor" aria-hidden="true" />}
      </button>
      <button
        type="button"
        className="case-video-mute"
        onClick={toggleMute}
        aria-label={muted ? 'Unmute project film' : 'Mute project film'}
      >
        {muted ? <VolumeX size={16} aria-hidden="true" /> : <Volume2 size={16} aria-hidden="true" />}
      </button>
      {title && <p className="case-video-title">{title}</p>}
    </motion.article>
  );
}

function ProjectNavCard({ brand, direction }) {
  if (!brand) return null;
  const isPrevious = direction === 'previous';

  return (
    <Link
      to={`/BrandDetail?slug=${brand.id}`}
      className={`case-project-nav-card ${isPrevious ? 'case-project-nav-card--previous' : ''}`}
    >
      <img src={getBrandAssetPath(brand, brand.featured)} alt="" aria-hidden="true" loading="lazy" />
      <div className="case-project-nav-copy">
        <span>{isPrevious ? 'Previous project' : 'Next project'}</span>
        <strong>{brand.name}</strong>
      </div>
      <span className="case-project-nav-arrow" aria-hidden="true">
        {isPrevious ? <ArrowLeft size={18} /> : <ArrowRight size={18} />}
      </span>
    </Link>
  );
}

export default function BrandDetail() {
  const [brand, setBrand] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const slug = new URLSearchParams(location.search).get('slug');
    const currentBrand = slug ? getBrand(slug) : null;
    setBrand(currentBrand);
    document.title = currentBrand
      ? `${currentBrand.name} — AYESMAJ Studios`
      : 'Brand Not Found — AYESMAJ Studios';
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.search]);

  const allIds = BRANDS.map((item) => item.id);
  const index = brand ? allIds.indexOf(brand.id) : -1;
  const previous = index > 0 ? BRANDS[index - 1] : null;
  const next = index >= 0 && index < allIds.length - 1 ? BRANDS[index + 1] : null;

  if (!brand) {
    return (
      <main className="case-not-found">
        <p>Brand not found</p>
        <Link to="/Branding"><ArrowLeft size={16} aria-hidden="true" /> Back to branding</Link>
      </main>
    );
  }

  const { accent } = brand;
  const accentTheme = getAccentTheme(accent);
  const identityDirection = getIdentityDirection(brand);
  const casePaper = blendHex(accent, '#FFFDF9', 0.9);
  const casePaperDeep = blendHex(accent, '#F4EEE5', 0.82);
  const caseSurface = blendHex(accent, '#FFFFFF', 0.94);
  const featuredImage = getBrandAssetPath(brand, brand.featured);
  const sections = brand.sections || [{ title: 'Selected Work', images: brand.images }];
  const existingIdentityIndex = sections.findIndex((section) => identitySectionPattern.test(section.title));
  const identityGallerySection = existingIdentityIndex >= 0
    ? { ...sections[existingIdentityIndex], showIdentityBoard: true }
    : { title: 'Identity System', images: [], showIdentityBoard: true };
  const remainingGallerySections = sections
    .filter((_, sectionIndex) => sectionIndex !== existingIdentityIndex)
    .map((section) => ({ ...section, showIdentityBoard: false }));

  const renderGallerySection = (section, sectionIndex) => {
    const visibleImages = section.showIdentityBoard && section.images.length === 1
      ? []
      : section.images;

    return (
      <div className="case-gallery-section" key={section.title}>
        <motion.header {...fade()} className="case-section-heading">
          <span>{String(sectionIndex + 1).padStart(2, '0')}</span>
          <h2>{section.showIdentityBoard ? 'Identity System' : section.title}</h2>
          <div aria-hidden="true" />
        </motion.header>
        {section.showIdentityBoard && <IdentityBoard brand={brand} />}
        {visibleImages.length > 0 && (
          <div className={section.showIdentityBoard ? 'case-gallery-after-board' : undefined}>
            <ImageGallery
              label={`${brand.name} - ${section.title}`}
              cards={visibleImages.map((image, imageIndex) => ({
                id: `${brand.id}-${sectionIndex}-${imageIndex}`,
                src: getBrandAssetPath(brand, image),
                alt: `${brand.name} - ${section.title} ${imageIndex + 1}`,
                eyebrow: `${String(sectionIndex + 1).padStart(2, '0')} / ${brand.name}`,
                title: section.title,
              }))}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        className="case-page"
        style={{
          '--case-accent': accent,
          '--case-accent-ink': accentTheme.ink,
          '--case-button-text': accentTheme.buttonText,
          '--case-paper': casePaper,
          '--case-paper-deep': casePaperDeep,
          '--case-surface': caseSurface,
          '--case-display-font': identityDirection.displayStack,
          '--case-body-font': identityDirection.bodyStack,
        }}
      >
        <AyesmajNav />

        <main>
          <section className="case-hero">
            <img className="case-hero-media" src={featuredImage} alt={`${brand.name} featured project artwork`} />
            <div className="case-hero-wash" aria-hidden="true" />
            <Link to="/Branding" className="case-back-link">
              <ArrowLeft size={16} aria-hidden="true" /> Branding work
            </Link>

            <div className="case-hero-inner">
              <motion.div
                className="case-hero-card"
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="case-eyebrow-row">
                  <p>{brand.category}</p>
                  <span>{brand.year}</span>
                </div>
                <h1>{brand.name}</h1>
                <p className="case-subtitle">{brand.subtitle}</p>
                <div className="case-tags" aria-label="Project services">
                  {brand.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </motion.div>
            </div>
          </section>

          <section className="case-intro">
            <motion.div {...fade()} className="case-intro-label">
              <span>Project story</span>
              <strong>Visual direction, built to feel unmistakable.</strong>
            </motion.div>
            <motion.p {...fade(0.08)}>{brand.description}</motion.p>
          </section>

          <section
            className="case-gallery-shell case-gallery-shell--identity"
            aria-label={`${brand.name} identity system`}
          >
            {renderGallerySection(identityGallerySection, 0)}
          </section>

          {remainingGallerySections.length > 0 && (
            <section className="case-gallery-shell" aria-label={`${brand.name} project gallery`}>
              {remainingGallerySections.map((section, sectionIndex) => (
                renderGallerySection(section, sectionIndex + 1)
              ))}
            </section>
          )}

          {brand.videos.length > 0 && (
            <section className="case-films">
              <motion.header {...fade()} className="case-films-heading">
                <p>Films &amp; motion</p>
                <h2>See the visual world move.</h2>
              </motion.header>
              <div className={`case-video-grid ${brand.videos.length === 1 ? 'case-video-grid--single' : ''}`}>
                {brand.videos.map((video, videoIndex) => {
                  const item = getBrandVideo(brand, video);
                  return (
                    <VideoCard
                      key={`${item.src}-${videoIndex}`}
                      src={item.src}
                      title={item.title}
                      accent={accent}
                    />
                  );
                })}
              </div>
            </section>
          )}

          <nav className="case-project-nav" aria-label="Browse case studies">
            <ProjectNavCard brand={previous} direction="previous" />
            <ProjectNavCard brand={next} direction="next" />
          </nav>

          <section className="case-cta">
            <img src={featuredImage} alt="" aria-hidden="true" loading="lazy" />
            <div className="case-cta-wash" aria-hidden="true" />
            <motion.div {...fade()} className="case-cta-copy">
              <p>Ready for your transformation?</p>
              <h2>Let’s build the next<br />brand people remember.</h2>
              <a href="/#start-a-project">
                Start your project <ArrowRight size={18} aria-hidden="true" />
              </a>
            </motion.div>
          </section>
        </main>

        <AyesmajFooter />
      </div>
    </MotionConfig>
  );
}
