import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';

const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/smadj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const root = path.resolve(import.meta.dirname, '..', '..');
const buildDir = path.join(root, 'portfolio', 'build');
const outputDir = path.join(root, 'portfolio', 'output');
const chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const standardJobs = [
  ['cv.html', 'Rafael_Smadja_CV_2026.pdf', 2],
  ['portfolio.html', 'Rafael_Smadja_Brand_Portfolio_2026.pdf', 25],
  ['combined.html', 'Rafael_Smadja_CV_and_Portfolio_2026.pdf', 27],
];
const compactJobs = [
  ['combined-compact.html', 'Rafael_Smadja_CV_and_Portfolio_2026_Under_5MB.pdf', 27],
];
const jobs = process.argv.includes('--compact') ? compactJobs : standardJobs;

await fs.mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: chrome,
  args: ['--allow-file-access-from-files', '--disable-web-security'],
});

try {
  for (const [sourceName, outputName, expectedPages] of jobs) {
    const page = await browser.newPage({ viewport: { width: 1280, height: 1600 }, deviceScaleFactor: 1 });
    await page.emulateMedia({ media: 'print' });
    await page.goto(pathToFileURL(path.join(buildDir, sourceName)).href, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map((img) => img.complete ? Promise.resolve() : new Promise((resolve) => {
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
      })));
    });
    const pageCount = await page.locator('section.page').count();
    if (pageCount !== expectedPages) throw new Error(`${sourceName}: expected ${expectedPages} page sections, found ${pageCount}`);
    await page.pdf({
      path: path.join(outputDir, outputName),
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
      displayHeaderFooter: false,
    });
    await page.close();
    console.log(`Exported ${outputName} (${pageCount} pages)`);
  }
} finally {
  await browser.close();
}
