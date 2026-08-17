/**
 * prerender — emit static HTML per route after `vite build`.
 *
 * Why: the app is a client-rendered SPA, so every URL previously served the
 * same shell with the same <title> and no body content. Crawlers that do not
 * execute JS saw ~21 identical, empty pages, which is what Search Console
 * reported as "Crawled - currently not indexed".
 *
 * This does NOT server-render React. It only writes the parts a crawler needs
 * before hydration: a unique title, description, canonical, Open Graph and
 * Twitter tags, plus one paragraph of real text and the internal links. That
 * avoids executing components in Node, where window/IntersectionObserver/video
 * do not exist and an SSR retrofit would break.
 *
 * main.jsx uses createRoot (not hydrateRoot), so React discards the injected
 * markup on mount. Users never see it; only crawlers and no-JS clients do.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { SEO_ROUTES, SERVICE_ROUTES } from '../src/data/seoMeta.js';
import { SITE, NAV, FOOTER_WORK, LEGAL_LINKS } from '../src/data/siteConfig.js';

/** Open Graph and Twitter truncate around here; search titles may run longer. */
const OG_TITLE_MAX = 60;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

const esc = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

/** Replace an existing tag if present, otherwise append before </head>. */
function upsertHead(html, pattern, tag) {
  return pattern.test(html)
    ? html.replace(pattern, tag)
    : html.replace('</head>', `    ${tag}\n  </head>`);
}

function headFor(route, meta) {
  const url = SITE.url + (route === '/' ? '/' : route);
  const img = SITE.url + (meta.image || SITE.defaultOgImage);
  const social = meta.ogTitle || meta.title;
  return [
    `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:title" content="${esc(social)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:image" content="${esc(img)}" />`,
    `<meta name="twitter:title" content="${esc(social)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(img)}" />`,
  ];
}

/**
 * Page-level JSON-LD. The shell already carries Organization and WebSite, so
 * these reference the Organization by @id rather than restating it.
 */
function jsonLdFor(route, meta) {
  if (route === '/') return null;

  const url = SITE.url + route;
  const crumbs = [{ name: 'Home', item: SITE.url + '/' }];
  if (SERVICE_ROUTES[route]) {
    crumbs.push({ name: 'Services', item: SITE.url + '/Services' });
  }
  crumbs.push({ name: meta.h1, item: url });

  const graph = [
    {
      '@type': 'BreadcrumbList',
      '@id': `${url}#breadcrumb`,
      itemListElement: crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: c.item,
      })),
    },
  ];

  if (SERVICE_ROUTES[route]) {
    graph.push({
      '@type': 'Service',
      '@id': `${url}#service`,
      name: meta.h1,
      description: meta.description,
      serviceType: SERVICE_ROUTES[route],
      url,
      provider: { '@id': `${SITE.url}/#organization` },
      areaServed: 'Worldwide',
    });
  }

  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

/** One crawlable paragraph plus the internal links the shell never had. */
function bodyFor(route, meta) {
  const links = [...NAV, ...FOOTER_WORK, ...LEGAL_LINKS]
    .filter((l) => l.to !== route)
    .map((l) => `<li><a href="${esc(l.to)}">${esc(l.label)}</a></li>`)
    .join('');
  return (
    `<div id="prerendered-seo">` +
    `<h1>${esc(meta.h1)}</h1>` +
    `<p>${esc(meta.blurb)}</p>` +
    `<nav aria-label="Site"><ul>${links}</ul></nav>` +
    `</div>`
  );
}

function render(shell, route, meta) {
  let html = shell;

  html = html.replace(
    /<title>[\s\S]*?<\/title>/,
    `<title>${esc(meta.title)}</title>`,
  );
  html = upsertHead(
    html,
    /<meta\s+name="description"[^>]*>/,
    `<meta name="description" content="${esc(meta.description)}" />`,
  );
  for (const tag of headFor(route, meta)) {
    const attr = tag.match(/(?:property|name|rel)="([^"]+)"/)[1];
    const key = tag.startsWith('<link')
      ? new RegExp(`<link[^>]*rel="${attr}"[^>]*>`)
      : new RegExp(`<meta[^>]*(?:property|name)="${attr}"[^>]*>`);
    html = upsertHead(html, key, tag);
  }

  // Page-level JSON-LD, appended so the shell's Organization/WebSite block
  // stays intact and can be referenced by @id.
  const jsonLd = jsonLdFor(route, meta);
  if (jsonLd) {
    html = html.replace(
      '</head>',
      `    <script type="application/ld+json">${jsonLd}</script>\n  </head>`,
    );
  }

  // Inject crawlable content into the empty mount node.
  html = html.replace(
    /<div id="root">\s*<\/div>/,
    `<div id="root">${bodyFor(route, meta)}</div>`,
  );
  return html;
}

function sitemapRoutes() {
  const xml = fs.readFileSync(path.join(ROOT, 'public', 'sitemap.xml'), 'utf8');
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) =>
    m[1].replace(SITE.url, '').replace(/\/$/, '') || '/',
  );
}

function main() {
  const shellPath = path.join(DIST, 'index.html');
  if (!fs.existsSync(shellPath)) {
    throw new Error('prerender: dist/index.html missing — run after vite build');
  }
  const shell = fs.readFileSync(shellPath, 'utf8');

  // Build check: a sitemap URL with no metadata would ship as a duplicate of
  // the homepage, which is the exact bug this script exists to remove.
  const missing = sitemapRoutes().filter((r) => !SEO_ROUTES[r]);
  if (missing.length) {
    throw new Error(
      `prerender: sitemap routes missing from src/data/seoMeta.js: ${missing.join(', ')}`,
    );
  }

  const unknownService = Object.keys(SERVICE_ROUTES).filter(
    (r) => !SEO_ROUTES[r],
  );
  if (unknownService.length) {
    throw new Error(
      `prerender: SERVICE_ROUTES entries not in SEO_ROUTES: ${unknownService.join(', ')}`,
    );
  }

  const titles = new Set();
  let count = 0;
  let services = 0;
  for (const [route, meta] of Object.entries(SEO_ROUTES)) {
    const html = render(shell, route, meta);

    if (!html.includes(`<title>${esc(meta.title)}</title>`)) {
      throw new Error(`prerender: title not applied for ${route}`);
    }
    if (!html.includes('id="prerendered-seo"')) {
      throw new Error(`prerender: content not injected for ${route}`);
    }

    const social = meta.ogTitle || meta.title;
    if (social.length > OG_TITLE_MAX) {
      throw new Error(
        `prerender: og:title for ${route} is ${social.length} chars (max ${OG_TITLE_MAX}) — add an ogTitle to seoMeta.js`,
      );
    }
    if (SERVICE_ROUTES[route]) {
      if (!html.includes('"@type":"Service"')) {
        throw new Error(`prerender: Service schema missing for ${route}`);
      }
      services += 1;
    }
    titles.add(meta.title);

    const out =
      route === '/' ? shellPath : path.join(DIST, route.slice(1), 'index.html');
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, html);
    count += 1;
  }

  if (titles.size !== count) {
    throw new Error(
      `prerender: ${count} routes but only ${titles.size} unique titles`,
    );
  }
  console.log(
    `prerender: ${count} routes, ${titles.size} unique titles, ` +
      `${count - 1} breadcrumbs, ${services} service schemas`,
  );
}

main();
