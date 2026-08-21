/**
 * generate-backgrounds — text-to-image pass for Interior Design dark section
 * backgrounds (owner brief 2026-08-21). Companion to interior-enhance.mjs,
 * which does image *edits*; this one generates from prompts.
 *
 * Backgrounds only: prompts forbid text, logos, people, objects, interface.
 * Output masters land in public/interior-design/backgrounds/masters/ and are
 * then cropped/optimized by scripts/optimize-backgrounds.py.
 *
 * Auth: OPENAI_API_KEY from env only (.env is gitignored).
 * Usage: node scripts/generate-backgrounds.mjs <prompts.json> <out-dir> [onlyId]
 */
import fs from 'node:fs';
import path from 'node:path';

const KEY = process.env.OPENAI_API_KEY;
if (!KEY) { console.error('OPENAI_API_KEY is not set'); process.exit(1); }

const [promptsPath, outDir, onlyId] = process.argv.slice(2);
if (!promptsPath || !outDir) { console.error('usage: node scripts/generate-backgrounds.mjs <prompts.json> <out-dir> [onlyId]'); process.exit(1); }
fs.mkdirSync(outDir, { recursive: true });

const SIZES = ['2048x1024', '1536x1024']; // widest first; fall back if unsupported
const entries = JSON.parse(fs.readFileSync(promptsPath, 'utf8')).filter((e) => !onlyId || e.id === onlyId);

for (const e of entries) {
  const out = path.join(outDir, e.file);
  if (!onlyId && fs.existsSync(out)) { console.log(`skip ${e.file} (exists)`); continue; }
  let done = false;
  for (const size of SIZES) {
    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: 'gpt-image-2', prompt: e.prompt, size, n: 1 }),
    });
    if (!res.ok) {
      const msg = (await res.text()).slice(0, 200);
      if (size !== SIZES[SIZES.length - 1] && /size/i.test(msg)) { console.log(`  ${size} unsupported, falling back`); continue; }
      console.error(`${e.file}: API ${res.status}: ${msg}`);
      break;
    }
    const data = await res.json();
    const b64 = data?.data?.[0]?.b64_json;
    if (!b64) { console.error(`${e.file}: no image in response`); break; }
    fs.writeFileSync(out, Buffer.from(b64, 'base64'));
    console.log(`wrote ${e.file} @ ${size} (${(fs.statSync(out).size / 1024).toFixed(0)} KB)`);
    done = true;
    break;
  }
  if (!done) process.exitCode = 1;
}
