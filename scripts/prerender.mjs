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
import { SITE } from '../src/data/siteConfig.js';

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
  if (route.startsWith('/interior-design/')) {
    crumbs.push({ name: 'Interior Design', item: SITE.url + '/interior-design' });
    if (route.startsWith('/interior-design/case-studies/')) {
      crumbs.push({ name: 'Case Studies', item: SITE.url + '/interior-design/case-studies' });
    }
  } else if (SERVICE_ROUTES[route]) {
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

/**
 * Every route we prerender, i.e. every URL that returns its own title, its own
 * description and a self-referencing canonical. Built from SEO_ROUTES rather
 * than from NAV/FOOTER_WORK, which is what this block used to use and which
 * caused two indexing problems in Search Console:
 *
 *   - NAV links to `/services` (lowercase). vercel.json 308s that to
 *     `/Services`, so the only crawlable link to that page pointed at a
 *     redirect -> "Page with redirect".
 *   - FOOTER_WORK links to `/Branding` and `/Reel`, which are NOT prerendered.
 *     They serve the SPA shell, whose canonical is the homepage, so Google saw
 *     them as copies of `/` -> "Duplicate without user-selected canonical".
 *
 * Sourcing from SEO_ROUTES makes both impossible by construction: a link can
 * only be emitted for a URL that is prerendered and self-canonical.
 */
const CRAWLABLE = Object.keys(SEO_ROUTES);
const INTERIOR = CRAWLABLE.filter((r) => r.startsWith('/interior-design'));
const TOP_LEVEL = CRAWLABLE.filter((r) => !r.startsWith('/interior-design/'));

/** Human anchor text: the service name where we have one, else the page h1. */
function labelFor(route) {
  return SERVICE_ROUTES[route] || SEO_ROUTES[route]?.h1 || route;
}

/**
 * One crawlable paragraph plus the internal links the shell never had.
 *
 * The 21 /interior-design/* pages previously had ZERO crawlable internal links
 * - they existed only in sitemap.xml. Sitemap-only URLs are the lowest crawl
 * priority Google has, which is why they sat in "Discovered - currently not
 * indexed" while the 18 pages this block did link to were all indexed.
 *
 * Interior pages are linked from the hub and from each other, so the whole
 * section is one hop from `/interior-design` (which every page links) and two
 * from anywhere. That is ordinary site architecture, not a link dump on every
 * page.
 */
function bodyFor(route, meta) {
  const targets = route.startsWith('/interior-design')
    ? [...TOP_LEVEL, ...INTERIOR]
    : TOP_LEVEL;
  const links = targets
    .filter((to) => to !== route)
    .map((to) => `<li><a href="${esc(to)}">${esc(labelFor(to))}</a></li>`)
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
