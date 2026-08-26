/**
 * Deterministic SEO audit over the built output. Run after `npm run build`:
 *
 *   npm run seo:audit
 *
 * Exits non-zero on any violation, so it can gate CI or a deploy. Every check
 * here guards a failure this site actually shipped at least once:
 *
 *  - orphaned sitemap URLs (27 of 42 had zero crawlable inbound links)
 *  - crawlable links pointing at redirects (/services -> 308 -> /Services)
 *  - linked-but-not-prerendered routes serving the homepage canonical
 *    (/Branding, /Reel before 2026-08-25)
 *  - sitemap/SEO_ROUTES drift (the sitemap was hand-maintained)
 *
 * Static analysis only - it reads dist/, it does not run a browser, so it
 * cannot check the hydrated DOM. Prerendered-vs-rendered parity stays a
 * manual/browser check.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { SEO_ROUTES } from '../src/data/seoMeta.js';
import { SITE } from '../src/data/siteConfig.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(ROOT, 'dist');

const problems = [];
const flag = (msg) => problems.push(msg);

const fileFor = (route) =>
  path.join(DIST, route === '/' ? 'index.html' : `${route.slice(1)}/index.html`);

const redirectSources = new Set(
  JSON.parse(fs.readFileSync(path.join(ROOT, 'vercel.json'), 'utf8')).redirects.map(
    (r) => r.source,
  ),
);

const routes = Object.keys(SEO_ROUTES);
const get = (html, re) => html.match(re)?.[1] ?? null;

const titles = new Map();
const descriptions = new Map();

for (const route of routes) {
  const f = fileFor(route);
  if (!fs.existsSync(f)) {
    flag(`${route}: no prerendered file at ${path.relative(ROOT, f)}`);
    continue;
  }
  const html = fs.readFileSync(f, 'utf8');

  const title = get(html, /<title>([^<]*)<\/title>/);
  const desc = get(html, /<meta[^>]*name="description"[^>]*content="([^"]*)"/);
  const canonical = get(html, /<link[^>]*rel="canonical"[^>]*href="([^"]*)"/);
  const robots = get(html, /<meta[^>]*name="robots"[^>]*content="([^"]*)"/);
  const h1s = [...html.matchAll(/<h1[\s>]/g)].length;

  if (!title) flag(`${route}: missing <title>`);
  if (!desc) flag(`${route}: missing meta description`);
  if (h1s !== 1) flag(`${route}: expected exactly 1 <h1>, found ${h1s}`);
  if (robots && /noindex/i.test(robots)) flag(`${route}: prerendered page carries noindex`);

  const expected = SITE.url + (route === '/' ? '/' : route);
  if (canonical !== expected && canonical !== expected.replace(/\/$/, '')) {
    flag(`${route}: canonical is ${canonical}, expected ${expected}`);
  }

  if (title) {
    if (titles.has(title)) flag(`${route}: duplicate <title> with ${titles.get(title)}`);
    titles.set(title, route);
  }
  if (desc) {
    if (descriptions.has(desc)) flag(`${route}: duplicate description with ${descriptions.get(desc)}`);
    descriptions.set(desc, route);
  }

  // The crawlable link block: every target must be a prerendered SEO route,
  // never a redirect alias, never the noindexed /he demo.
  const nav = get(html, /<nav aria-label="Site"><ul>([\s\S]*?)<\/ul>/);
  if (!nav) {
    flag(`${route}: crawlable nav block missing`);
    continue;
  }
  for (const [, href] of nav.matchAll(/href="([^"]+)"/g)) {
    if (redirectSources.has(href)) flag(`${route}: crawlable link to redirect ${href}`);
    else if (href.startsWith('/he/')) flag(`${route}: crawlable link to noindexed ${href}`);
    else if (!SEO_ROUTES[href]) flag(`${route}: crawlable link to non-prerendered ${href}`);
  }
}

// ── Sitemap: generated from SEO_ROUTES, so verify the build actually did ──
const smPath = path.join(DIST, 'sitemap.xml');
if (!fs.existsSync(smPath)) {
  flag('sitemap.xml missing from dist/');
} else {
  const sm = fs.readFileSync(smPath, 'utf8');
  const smRoutes = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
    (m) => m[1].replace(SITE.url, '').replace(/\/$/, '') || '/',
  );
  for (const r of smRoutes) {
    if (!SEO_ROUTES[r]) flag(`sitemap: ${r} is not in SEO_ROUTES`);
    if (redirectSources.has(r)) flag(`sitemap: ${r} is a redirect source`);
    if (!fs.existsSync(fileFor(r))) flag(`sitemap: ${r} has no prerendered file`);
    if (r.startsWith('/he/')) flag(`sitemap: noindexed route ${r} must not be listed`);
  }
  if (sm.includes('changefreq') || sm.includes('priority')) {
    flag('sitemap: contains changefreq/priority (Google ignores both; keep it clean)');
  }

  // Orphan check: every sitemap URL needs >=1 crawlable inbound link.
  const inbound = new Map(smRoutes.map((r) => [r, 0]));
  for (const route of routes) {
    const f = fileFor(route);
    if (!fs.existsSync(f)) continue;
    const nav = get(fs.readFileSync(f, 'utf8'), /<nav aria-label="Site"><ul>([\s\S]*?)<\/ul>/);
    if (!nav) continue;
    for (const href of new Set([...nav.matchAll(/href="([^"]+)"/g)].map((m) => m[1]))) {
      if (inbound.has(href)) inbound.set(href, inbound.get(href) + 1);
    }
  }
  for (const [r, n] of inbound) {
    if (n === 0) flag(`orphan: sitemap URL ${r} has zero crawlable inbound links`);
  }
}

if (problems.length) {
  console.error(`seo-audit: ${problems.length} problem(s)\n` + problems.map((p) => `  - ${p}`).join('\n'));
  process.exit(1);
}
console.log(
  `seo-audit: OK — ${routes.length} routes, ${titles.size} unique titles, sitemap clean, no orphans, no redirect links`,
);
