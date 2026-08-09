import { useEffect } from 'react';
import { SITE } from '@/data/siteConfig';

/**
 * Seo — per-page head manager for the SPA. Upserts title, description,
 * canonical, Open Graph, Twitter cards, robots, and optional JSON-LD.
 * Each page overwrites the previous page's tags, so no cleanup is needed.
 */
function upsert(selector, create) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  return el;
}

function setMeta(attr, key, content) {
  upsert(`meta[${attr}="${key}"]`, () => {
    const m = document.createElement('meta');
    m.setAttribute(attr, key);
    return m;
  }).setAttribute('content', content);
}

export default function Seo({
  title,
  description,
  path = '/',
  image,
  type = 'website',
  noindex = false,
  jsonLd = null,
}) {
  useEffect(() => {
    const url = SITE.url + path;
    const img = SITE.url + (image || SITE.defaultOgImage);

    document.title = title;
    setMeta('name', 'description', description);

    upsert('link[rel="canonical"]', () => {
      const l = document.createElement('link');
      l.setAttribute('rel', 'canonical');
      return l;
    }).setAttribute('href', url);

    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:image', img);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:type', type);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', img);

    setMeta('name', 'robots', noindex ? 'noindex,nofollow' : 'index,follow');

    const existing = document.head.querySelector('script[data-seo]');
    if (jsonLd) {
      const script =
        existing ||
        (() => {
          const s = document.createElement('script');
          s.setAttribute('type', 'application/ld+json');
          s.setAttribute('data-seo', '');
          document.head.appendChild(s);
          return s;
        })();
      script.textContent = JSON.stringify(jsonLd);
    } else if (existing) {
      existing.remove(); // ponytail: prevents stale JSON-LD leaking across SPA navigations
    }
  }, [title, description, path, image, type, noindex, jsonLd]);

  return null;
}
