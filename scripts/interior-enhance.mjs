/**
 * interior-enhance — GPT Image 2 enhancement pass for Interior Design media.
 *
 * Turns approved source frames (3D screenshots, plan renders) into editorial
 * imagery while keeping the architecture locked. Used for: room imagery,
 * case-study heroes, method covers, presentation mockups, OG images.
 * NOT used for: verified dimensions, technical plans, engineering or permit
 * documentation, or anything presented as scan accuracy.
 *
 * Auth: reads OPENAI_API_KEY from the environment (.env is gitignored).
 * The key that appeared in the project briefing chat is COMPROMISED — rotate
 * it at platform.openai.com before running this. Never commit a key.
 *
 * Usage:
 *   node scripts/interior-enhance.mjs <source-image> <out-image> ["extra art direction"]
 */
import fs from 'node:fs';
import path from 'node:path';

const KEY = process.env.OPENAI_API_KEY;
if (!KEY) {
  console.error('interior-enhance: OPENAI_API_KEY is not set. Add it to your environment or .env (never to git).');
  process.exit(1);
}

const [src, out, extra = ''] = process.argv.slice(2);
if (!src || !out) {
  console.error('usage: node scripts/interior-enhance.mjs <source-image> <out-image> ["extra art direction"]');
  process.exit(1);
}

/** The architectural lock — the source image is the spatial source of truth. */
const LOCK_PROMPT = `Use the supplied project image as the architectural source of truth.

Preserve exactly:
- room proportions
- walls
- windows
- doors
- stairs
- pool
- garage
- furniture placement
- camera direction

Improve only:
- material realism
- lighting
- photographic quality
- visual polish
- editorial composition

Do not redesign the project.
Do not add or remove rooms.
Do not move openings.
Do not add text.
Do not add logos.
${extra ? '\nAdditional art direction: ' + extra : ''}`;

const form = new FormData();
form.append('model', 'gpt-image-2');
form.append('prompt', LOCK_PROMPT);
form.append('size', 'auto');
form.append('image', new Blob([fs.readFileSync(src)]), path.basename(src));

const res = await fetch('https://api.openai.com/v1/images/edits', {
  method: 'POST',
  headers: { Authorization: `Bearer ${KEY}` },
  body: form,
});
if (!res.ok) {
  console.error(`interior-enhance: API ${res.status}: ${(await res.text()).slice(0, 400)}`);
  process.exit(1);
}
const data = await res.json();
const b64 = data?.data?.[0]?.b64_json;
if (!b64) {
  console.error('interior-enhance: no image in response');
  process.exit(1);
}
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, Buffer.from(b64, 'base64'));
console.log(`interior-enhance: wrote ${out} (${(fs.statSync(out).size / 1024).toFixed(0)} KB) — remember the WebP pass before shipping`);
