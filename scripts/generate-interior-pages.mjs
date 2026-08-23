/**
 * generate-interior-pages — batch image generation for the Interior Design
 * page library (owner brief §27–40, 2026-08-22).
 *
 * Jobs come from a JSON file; each job is either
 *   • "edit": gpt-image-2 image edit with the ARCHITECTURE LOCK — the first
 *     source is the spatial source of truth, further sources are references
 *     (reference chaining: approved masters feed alternate angles/details);
 *   • "text": gpt-image-2 text-to-image for visuals with no source (layout
 *     diagrams, material editorials, moodboards).
 * Masters are written to source-assets/interior-generated/<page>/<id>.png; optimisation/crops happen
 * in scripts/optimize-interior-pages.py. Existing outputs are skipped unless
 * --force. --only <id> runs one job. --page <page> runs one page.
 *
 * Auth: OPENAI_API_KEY from the environment only.
 * Usage: node scripts/generate-interior-pages.mjs <jobs.json> [--page p] [--only id] [--force] [--dry]
 */
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2);
const jobsPath = args[0];
const opt = (k) => (args.includes(k) ? args[args.indexOf(k) + 1] : null);
const onlyPage = opt('--page'), onlyId = opt('--only');
const force = args.includes('--force'), dry = args.includes('--dry');
if (!jobsPath) { console.error('usage: node scripts/generate-interior-pages.mjs <jobs.json> [--page p] [--only id] [--force] [--dry]'); process.exit(1); }
const KEY = process.env.OPENAI_API_KEY;
if (!KEY && !dry) { console.error('OPENAI_API_KEY is not set'); process.exit(1); }

const ROOT = 'public/interior-design/generated';
const jobs = JSON.parse(fs.readFileSync(jobsPath, 'utf8')).filter((j) => (j.type === 'edit' || j.type === 'text') && (!onlyPage || j.page === onlyPage) && (!onlyId || j.id === onlyId));

/** §30 — the architecture lock, verbatim from the brief. */
const LOCK = `Use the supplied source image as the exact architectural source of truth.
Preserve exactly: overall room proportions, walls, windows, doors, ceiling, floor, fixed cabinetry, kitchen configuration, bathroom configuration, stair location, garage location, pool position, balcony position, furniture placement when already approved, camera direction when requested.
Improve only: material realism, lighting, texture quality, styling, photographic composition, atmosphere, presentation quality.
Do not redesign the architecture. Do not add new rooms. Do not move windows. Do not remove walls. Do not invent openings. Do not change the floor plan. Do not add people. Do not add typography. Do not add logos. Do not create a collage unless explicitly requested.`;

/** §29 — one premium AYESMAJ visual world. */
const WORLD = `Hyper-realistic, cinematic, architectural, sophisticated, high material realism, realistic scale, correct perspective, strong composition, premium editorial photography for a luxury design studio website, no obvious AI look. Material language where relevant: warm ivory plaster, natural oak, walnut, limestone, travertine, bronze, black metal, low-iron glass, olive or neutral fabrics, warm architectural lighting. No people, no text, no logos, no watermarks.`;

const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp' };
const blobOf = (p) => new Blob([fs.readFileSync(p)], { type: MIME[path.extname(p).toLowerCase()] || 'image/png' });

async function callEdit(job) {
  const form = new FormData();
  form.append('model', 'gpt-image-2');
  const refs = job.sources.slice(1);
  const prompt = `${LOCK}\n\n${job.lock === false ? '' : 'The FIRST image is the architectural source of truth.'} ${refs.length ? `The other ${refs.length} image(s) are references for materials, furniture identity, lighting and palette of the same project — keep them consistent.` : ''}\n\nArt direction: ${job.prompt}\n\n${job.world === false ? '' : WORLD}`;
  form.append('prompt', prompt);
  form.append('size', job.size || 'auto');
  form.append('quality', 'high');
  for (const s of job.sources) form.append('image[]', blobOf(s), path.basename(s));
  return fetch('https://api.openai.com/v1/images/edits', { method: 'POST', headers: { Authorization: `Bearer ${KEY}` }, body: form });
}
async function callText(job) {
  return fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST', headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'gpt-image-2', prompt: `${job.prompt}\n\n${WORLD}`, size: job.size || '2048x1024', quality: 'high', n: 1 }),
  });
}

let ok = 0, fail = 0;
for (const job of jobs) {
  const out = path.join('source-assets/interior-generated', job.page, `${job.id}.png`); // masters stay out of public/ (gitignored)
  if (fs.existsSync(out) && !force) { console.log(`skip ${job.id} (exists)`); continue; }
  console.log(`${job.type.toUpperCase()} ${job.page}/${job.id}  ${job.sources?.length ? '← ' + job.sources.map((s) => path.basename(s)).join(', ') : ''}`);
  if (dry) { for (const s of job.sources || []) if (!fs.existsSync(s)) console.error(`   MISSING source ${s}`); continue; }
  fs.mkdirSync(path.dirname(out), { recursive: true });
  let res;
  try {
    res = await (job.type === 'edit' ? callEdit(job) : callText(job));
    if (!res.ok) {
      const msg = (await res.text()).slice(0, 300);
      // size fallback for edits/generations that reject the requested size
      if (/size/i.test(msg) && job.size) { console.log(`   ${job.size} rejected, retrying auto`); job.size = null; res = await (job.type === 'edit' ? callEdit(job) : callText(job)); }
      if (!res.ok) { console.error(`   API ${res.status}: ${msg}`); fail++; continue; }
    }
    const data = await res.json();
    const b64 = data?.data?.[0]?.b64_json;
    if (!b64) { console.error('   no image in response'); fail++; continue; }
    fs.writeFileSync(out, Buffer.from(b64, 'base64'));
    console.log(`   wrote ${path.relative('.', out)} (${(fs.statSync(out).size / 1048576).toFixed(1)} MB)`);
    ok++;
  } catch (e) { console.error(`   failed: ${e.message}`); fail++; }
}
console.log(`GEN DONE ok=${ok} fail=${fail}`);
if (fail) process.exitCode = 1;
