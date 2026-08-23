// interior-visual-review — screenshot sets for the visual source-of-truth (§1) and the
// consistency test (§13): reference pages + the six Interior Design pages at 1440 and 390.
// Usage: node scripts/interior-visual-review.mjs [baseUrl]   (default http://localhost:4173)
// Output: docs/screenshots/<page>-<viewport>-<n>.jpg  (reference pages: full-page hero only)
import { createRequire } from 'node:module';
import fs from 'node:fs';
import path from 'node:path';
const require = createRequire('C:/Users/smadj/Documents/the patel - appartments/website/package.json');
const { chromium } = require('playwright');

const BASE = process.argv[2] || 'http://localhost:4173';
const OUT = 'docs/screenshots';
fs.mkdirSync(OUT, { recursive: true });
const REFERENCE = [['home', '/'], ['studio', '/Studio'], ['motion-vfx', '/services/motion-vfx'], ['interior-landing', '/interior-design']];
const PAGES = ['kitchens', 'bathrooms', 'furniture-decor', 'apartments', 'homes', 'buildings'];
const VIEWPORTS = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844, isMobile: true, deviceScaleFactor: 2 } };

const browser = await chromium.launch();
async function shoot(page, file) { await page.screenshot({ path: path.join(OUT, file), type: 'jpeg', quality: 72 }); console.log('  ', file); }
async function settle(page) { await page.waitForSelector('h1', { state: 'attached', timeout: 15000 }).catch(() => console.log('   !! no h1 on', page.url())); await page.waitForTimeout(2200); await page.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; }); }
async function scrollTo(page, sel, nth = 0) {
  const ok = await page.evaluate(([s, n]) => { const el = document.querySelectorAll(s)[n]; if (!el) return false; el.scrollIntoView({ block: 'start' }); return true; }, [sel, nth]);
  await page.waitForTimeout(900); return ok;
}
for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
  const ctx = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, isMobile: !!vp.isMobile, hasTouch: !!vp.isMobile, deviceScaleFactor: vp.deviceScaleFactor || 1, reducedMotion: 'no-preference' });
  const page = await ctx.newPage();
  console.log(`${vpName} ${vp.width}x${vp.height}`);
  for (const [name, route] of REFERENCE) { await page.goto(BASE + route, { waitUntil: 'domcontentloaded' }); await settle(page); await shoot(page, `ref-${name}-${vpName}.jpg`); }
  for (const p of PAGES) {
    await page.goto(`${BASE}/interior-design/${p}`, { waitUntil: 'domcontentloaded' }); await settle(page);
    await shoot(page, `${p}-${vpName}-1-hero.jpg`);
    // dark mid-section: first dark chapter after the hero; bright mid: first bright chapter
    const dark = await scrollTo(page, 'section.idsp-dark, section.idv2-bgc'); if (dark) await shoot(page, `${p}-${vpName}-2-dark.jpg`);
    if (vpName === 'desktop') { const bright = await scrollTo(page, 'section.idv2-bright:not(.idsp-hero):not(.idsp-next), section.idv2-gradient-soft:not(.idsp-hero)'); if (bright) await shoot(page, `${p}-${vpName}-3-bright.jpg`); }
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    if (overflow > 0) console.log(`   !! horizontal overflow ${overflow}px on ${p} ${vpName}`);
  }
  await ctx.close();
}
await browser.close();
