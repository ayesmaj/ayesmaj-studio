/**
 * Build the /Work archive: scan every media asset in public/, classify it,
 * generate a grid thumbnail for each, and write src/data/workArchive.js.
 *
 *   node scripts/work-archive.mjs
 *
 * Why this exists: public/ holds 6.4GB of media - 4.1GB of video - so the
 * archive page can never reference originals in its grid. Every tile uses a
 * generated ~480px webp thumb (~20KB); the full asset loads only when a
 * visitor opens it. And like branding-featured.mjs, the manifest is generated
 * from the filesystem, so the page cannot reference a missing file and new
 * work appears by re-running this script.
 *
 * Thumbs are COMMITTED, not built in CI: Vercel's build has no ffmpeg, and
 * video posters need it. Re-run locally after adding assets.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';
import { BRANDS } from '../src/data/brands.js';

/* Brand folders that have a real case-study page. Only these get a slug, so
   the lightbox can never link to a detail page that does not exist. */
const BRAND_IDS = new Set(BRANDS.map((b) => b.id));

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUB = path.join(ROOT, 'public');
const THUMBS = path.join(PUB, 'work-thumbs');
const OUT = path.join(ROOT, 'src/data/workArchive.js');

const IMG = new Set(['.webp', '.png', '.jpg', '.jpeg', '.avif']);
const VID = new Set(['.mp4', '.webm']);

/* ── What is NOT work ──────────────────────────────────────────────────────
   Infrastructure, duplicates and derivatives. Each rule states why. */
const EXCLUDE_DIRS = new Set([
  'work-thumbs',            // our own output
  'email', 'footer',        // site chrome assets
]);
const EXCLUDE_RE = [
  /-w\d{3,4}\.(webp|png|jpe?g)$/i,  // responsive duplicates of a base image
  /poster\.(webp|png|jpe?g)$/i,     // film posters: stills of videos already shown
  /contact-sheet/i,                  // film contact sheets: derivative strips
  /storyboard-ref\./i,               // internal reference material
  /wordmark|favicon|og-image|logo-a\.|logo-full\.|logo-transparent\./i, // identity chrome
  /\/logos?\.(webp|png)$/i,          // top-level site logo files
  /keyframes\.webp$/i,               // film keyframe strips, derivative
  /\/_rejected\//i,                  // superseded takes kept for reference, not work
];

/* png/webp twins: prefer the webp, drop the png. */
const preferWebp = (files) => {
  const stems = new Set(files.filter(f => f.endsWith('.webp')).map(f => f.slice(0, -5)));
  return files.filter(f => {
    const ext = path.extname(f).toLowerCase();
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      return !stems.has(f.slice(0, -ext.length));
    }
    return true;
  });
};

/* ── Classification: the folder structure IS the taxonomy ── */
const pretty = (s) => s.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  .replace(/\bAi\b/g, 'AI').replace(/\b3d\b/gi, '3D').trim();

function classify(rel) {
  const p = rel.replace(/\\/g, '/');
  const seg = p.split('/');
  const isVid = VID.has(path.extname(p).toLowerCase());

  if (seg[0] === 'brands') {
    const b = seg[1];
    if (b === 'characters') return { cat: 'Characters', group: 'Characters' };
    if (b === 'logos') return { cat: 'Logos', group: 'Logo Design' };
    if (b === 'general') return { cat: 'Branding', group: 'Studio' };
    if (b === 'interior-design') return { cat: 'Interior', group: 'Interior Design' };
    const out = { cat: 'Branding', group: pretty(b) };
    if (BRAND_IDS.has(b)) out.slug = b;
    return out;
  }
  if (seg[0] === 'interior-design') {
    if (seg[1] === 'projects') return { cat: 'Interior', group: pretty(seg[2] || 'Projects') };
    return { cat: 'Interior', group: 'Interior Design' };
  }
  if (seg[0] === 'characters') return { cat: 'Characters', group: 'Characters' };
  if (seg[0] === 'logos') return { cat: 'Logos', group: 'Logo Design' };
  if (seg[0] === 'storyboards-10') return { cat: 'Storyboards', group: 'Storyboards' };
  if (seg[0] === 'concepts') return { cat: 'Concepts', group: 'Concepts' };
  if (seg[0] === 'videos') {
    const d = (seg[1] || '').toLowerCase();
    if (d.includes('3d')) return { cat: '3D & CGI', group: '3D Animation' };
    if (d.includes('ai post')) return { cat: 'AI Posts', group: 'AI Posts' };
    if (d.includes('ai video')) return { cat: 'AI Video', group: 'AI Video' };
    if (d.includes('website')) return { cat: 'Web', group: 'Web Experiences' };
    if (d.includes('stroyboard') || d.includes('storyboard')) return { cat: 'Storyboards', group: 'Storyboards' };
    return { cat: 'AI Video', group: 'Films' };
  }
  if (seg[0] === 'assets') {
    const sub = p;
    if (sub.includes('ai-posts')) return { cat: 'AI Posts', group: 'AI Posts' };
    if (sub.includes('motion-posters')) return { cat: 'AI Video', group: 'Motion Posters' };
    if (sub.includes('showreel')) return { cat: 'AI Video', group: 'Showreel' };
    if (sub.includes('web-experiences')) return { cat: 'Web', group: 'Web Experiences' };
    return { cat: 'Studio', group: 'Studio Visuals' };
  }
  if (seg[0] === 'generated' || seg[0] === 'images') return { cat: 'Studio', group: 'Studio Visuals' };
  if (isVid) return { cat: 'AI Video', group: 'Films' };
  return { cat: 'Studio', group: 'Studio Visuals' };
}

/* ── Scan ── */
function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) {
      if (EXCLUDE_DIRS.has(e.name.toLowerCase())) continue;
      walk(path.join(dir, e.name), out);
    } else {
      const ext = path.extname(e.name).toLowerCase();
      if (IMG.has(ext) || VID.has(ext)) out.push(path.relative(PUB, path.join(dir, e.name)));
    }
  }
  return out;
}

let files = walk(PUB).map(f => f.replace(/\\/g, '/'));
const before = files.length;
files = preferWebp(files).filter(f => !EXCLUDE_RE.some(re => re.test('/' + f)));
files = files.filter(f => { try { return fs.statSync(path.join(PUB, f)).size > 6 * 1024; } catch { return false; } });
console.log(`scan: ${before} media files, ${files.length} after exclusions`);

fs.mkdirSync(THUMBS, { recursive: true });

/* Perceptual hash of the generated 480px thumb, not the original: two copies of
   the same picture produce the same thumb, so this catches byte-identical files
   AND re-encoded or resized variants, at a fraction of the cost of hashing
   full-size originals. 8x8 horizontal-gradient dHash. */
const dhash = async (abs) => {
  const buf = await sharp(abs).greyscale().resize(9, 8, { fit: "fill" }).raw().toBuffer();
  let bits = "";
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++)
    bits += buf[y * 9 + x] < buf[y * 9 + x + 1] ? "1" : "0";
  return bits;
};

const ffprobe = (abs, args) => execFileSync('ffprobe', ['-v', 'error', ...args, abs], { encoding: 'utf8' }).trim();

const items = [];
let made = 0, kept = 0, failed = 0, previews = 0;
for (const rel of files) {
  const abs = path.join(PUB, rel);
  const ext = path.extname(rel).toLowerCase();
  const isVid = VID.has(ext);
  const id = crypto.createHash('sha1').update(rel).digest('hex').slice(0, 12);
  const thumbRel = `work-thumbs/${id}.webp`;
  const thumbAbs = path.join(PUB, thumbRel);
  const previewRel = `work-thumbs/${id}-p.mp4`;
  const previewAbs = path.join(PUB, previewRel);

  try {
    let w, h, dur;
    if (isVid) {
      const probe = ffprobe(abs, ['-select_streams', 'v:0', '-show_entries', 'stream=width,height:format=duration', '-of', 'csv=p=0']);
      const nums = probe.split(/[,\n]/).map(Number).filter(Number.isFinite);
      [w, h] = nums; dur = Math.round(nums[2] || 0);
      // Poster frame from 20% in - past any black lead-in, before any outro card.
      const at = Math.max(0.5, (dur || 5) * 0.2);
      if (!fs.existsSync(thumbAbs)) {
        const tmp = thumbAbs + '.png';
        execFileSync('ffmpeg', ['-nostdin', '-v', 'error', '-y', '-ss', String(at), '-i', abs, '-frames:v', '1', tmp]);
        await sharp(tmp).resize({ width: 480 }).webp({ quality: 68 }).toFile(thumbAbs);
        fs.unlinkSync(tmp);
        made++;
      } else kept++;
      /* Silent preview loop for grid autoplay. The originals total 5.3GB and
         one is 600MB - autoplaying those as tiles would be absurd, so each
         video gets a 3s 480px cut starting at the same frame as its poster.
         The full asset still plays in the lightbox. */
      if (!fs.existsSync(previewAbs)) {
        execFileSync('ffmpeg', ['-nostdin', '-v', 'error', '-y',
          '-ss', String(at), '-t', '3', '-i', abs, '-an',
          '-vf', 'scale=480:-2', '-c:v', 'libx264', '-crf', '30', '-preset', 'veryfast',
          '-pix_fmt', 'yuv420p', '-movflags', '+faststart', previewAbs]);
        previews++;
      }
    } else {
      const meta = await sharp(abs).metadata();
      w = meta.width; h = meta.height;
      if (!fs.existsSync(thumbAbs)) {
        await sharp(abs).resize({ width: 480, withoutEnlargement: true }).webp({ quality: 68 }).toFile(thumbAbs);
        made++;
      } else kept++;
    }
    if (!w || !h) throw new Error('no dimensions');
    const hash = await dhash(thumbAbs);
    const { cat, group, slug } = classify(rel);
    const item = { src: '/' + rel, thumb: '/' + thumbRel, w, h, cat, group, hash, _dur: isVid ? (dur || 0) : null };
    if (slug) item.slug = slug;
    if (isVid) { item.video = true; item.dur = dur || 0; item.preview = '/' + previewRel; }
    items.push(item);
  } catch (e) {
    failed++;
    console.warn(`skip (unreadable): ${rel} - ${String(e.message || e).slice(0, 80)}`);
  }
}

/* ── Deduplicate ────────────────────────────────────────────────────────────
   public/ mirrors whole folders: /logos/ duplicates /brands/logos/, /characters/
   duplicates /brands/characters/, and so on - 115 copies of pictures already in
   the archive. Showing the same piece twice makes the body of work look padded.
   Keep the best copy: largest pixel area, then webp over png/jpg, then the
   shortest path as a stable tiebreak. A video only counts as a duplicate of
   another video with the same poster AND the same duration. */
/* Exact hash buckets are not enough: the same render saved at two sizes gets
   re-encoded, which flips a few bits. Compare by Hamming distance instead -
   4 bits out of 64 catches re-encodes and rescales while staying far away from
   genuinely different pictures. 889 items is ~400k comparisons, which is free.
   A video only duplicates another video with the same poster AND duration. */
const NEAR = 4;
const toBig = (bits) => BigInt("0b" + bits);
const popcount = (x) => { let n = 0; while (x) { n += Number(x & 1n); x >>= 1n; } return n; };
const better = (a, b) => {
  const area = (x) => x.w * x.h;
  if (area(a) !== area(b)) return area(a) > area(b) ? a : b;
  const webp = (x) => (x.src.endsWith(".webp") ? 1 : 0);
  if (webp(a) !== webp(b)) return webp(a) > webp(b) ? a : b;
  return a.src.length <= b.src.length ? a : b;
};
const survivors = [];
let dropped = 0;
for (const it of items) {
  const bits = toBig(it.hash);
  const hit = survivors.find((k) => k._dur === it._dur && popcount(toBig(k.hash) ^ bits) <= NEAR);
  if (!hit) { survivors.push(it); continue; }
  dropped++;
  const win = better(hit, it);
  if (win !== hit) survivors[survivors.indexOf(hit)] = win;
}
items.length = 0;
items.push(...survivors);
for (const it of items) { delete it.hash; delete it._dur; }
console.log(`dedupe: dropped ${dropped} duplicate copies`);

/* Stable pseudo-shuffle so "All" interleaves categories instead of showing 300
   near-identical frames in a row. Hash-ordered = deterministic across runs. */
items.sort((a, b) => (crypto.createHash('sha1').update(a.src).digest('hex') < crypto.createHash('sha1').update(b.src).digest('hex') ? -1 : 1));

const counts = {};
for (const it of items) counts[it.cat] = (counts[it.cat] || 0) + 1;

const file =
  `/* GENERATED by scripts/work-archive.mjs - do not edit by hand.\n` +
  `   ${items.length} assets, every path verified on disk when generated.\n` +
  `   Re-run after adding work: node scripts/work-archive.mjs */\n\n` +
  `export const WORK_ARCHIVE = ${JSON.stringify(items)};\n\n` +
  `export const WORK_COUNTS = ${JSON.stringify(counts, null, 2)};\n`;
fs.writeFileSync(OUT, file);

console.log(`thumbs: ${made} generated, ${kept} reused, ${failed} unreadable; ${previews} preview loops`);
console.log('counts:', counts);
console.log(`wrote src/data/workArchive.js (${items.length} items)`);

const NL = String.fromCharCode(10);
/* Guard: every generated file must be committable. A blanket `*.mp4` in
   .gitignore once swallowed all 83 preview loops - `git add` reported nothing,
   the thumbs committed fine, and production served the SPA fallback for every
   preview. Fail loudly here instead of shipping a page of stills. */
try {
  const ignored = execFileSync('git', ['check-ignore', '--no-index', '--stdin'],
    { cwd: ROOT, input: items.flatMap(i => [i.thumb, i.preview].filter(Boolean).map(f => 'public' + f)).join(NL), encoding: 'utf8' });
  const list = ignored.split(NL).filter(Boolean);
  if (list.length) {
    console.error(`
ERROR: ${list.length} generated files are gitignored and would not deploy:`);
    for (const f of list.slice(0, 5)) console.error('  ' + f);
    console.error('Add a negation to .gitignore (e.g. !public/work-thumbs/*.mp4).');
    process.exitCode = 1;
  }
} catch (e) {
  // git check-ignore exits 1 when nothing matches - that is the good case.
  if (typeof e.status === 'number' && e.status !== 1) console.warn('gitignore check skipped:', e.message.slice(0, 60));
}

/* Orphan sweep: delete thumbs whose source no longer exists. */
const live = new Set(items.flatMap(i => [path.basename(i.thumb), i.preview && path.basename(i.preview)].filter(Boolean)));
let pruned = 0;
for (const f of fs.readdirSync(THUMBS)) if (!live.has(f)) { fs.unlinkSync(path.join(THUMBS, f)); pruned++; }
if (pruned) console.log(`pruned ${pruned} orphaned thumbs`);
