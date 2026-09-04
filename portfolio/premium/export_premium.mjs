import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
import path from 'node:path';
import fs from 'node:fs/promises';

const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/smadj/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const premium = path.resolve(import.meta.dirname);
const root = path.resolve(premium, '..', '..');
const build = path.join(premium, 'build');
const output = path.join(root, 'portfolio', 'output');
const meta = JSON.parse(await fs.readFile(path.join(build, 'build-meta.json'), 'utf8'));
const chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

const jobs = [
  {
    mode: 'master',
    source: 'premium-master.html',
    output: 'Rafael_Smadja_CV_and_Portfolio_2026_Premium.pdf',
  },
  {
    mode: 'compact',
    source: 'premium-compact.html',
    output: 'Rafael_Smadja_CV_and_Portfolio_2026_Premium_Under_5MB.pdf',
  },
];

await fs.mkdir(output, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: chrome,
  args: ['--allow-file-access-from-files', '--disable-web-security'],
});

try {
  for (const job of jobs) {
    const expectedPages = meta[job.mode].page_count;
    const page = await browser.newPage({ viewport: { width: 1280, height: 1600 }, deviceScaleFactor: 1 });
    await page.emulateMedia({ media: 'print' });
    const url = pathToFileURL(path.join(build, job.source)).href;
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map((image) => image.complete
        ? Promise.resolve()
        : new Promise((resolve) => {
          image.addEventListener('load', resolve, { once: true });
          image.addEventListener('error', resolve, { once: true });
        })));
    });
    const failedImages = await page.evaluate(() => [...document.images]
      .filter((image) => !image.complete || image.naturalWidth === 0)
      .map((image) => image.src));
    if (failedImages.length) {
      throw new Error(`${job.source}: failed images: ${failedImages.join(', ')}`);
    }
    const count = await page.locator('section.page').count();
    if (count !== expectedPages) {
      throw new Error(`${job.source}: expected ${expectedPages} pages, found ${count}`);
    }
    const outputPath = path.join(output, job.output);
    await page.pdf({
      path: outputPath,
      format: 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      displayHeaderFooter: false,
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });
    const stat = await fs.stat(outputPath);
    console.log(`Exported ${job.output}: ${count} pages, ${(stat.size / 1024 / 1024).toFixed(2)} MB`);
    await page.close();
  }
} finally {
  await browser.close();
}
