/**
 * Build the /Work archive: scan every media asset in public/, classify it,
 * deduplicate, generate the derivatives the page needs, and write
 * src/data/workArchive.js.
 *
 *   node scripts/work-archive.mjs
 *
 * Why this exists: public/ holds 6.4GB of media, 4GB of it video, and 40 of the
 * 53 source films were never even committed. The page can therefore never point
 * at an original. Every item gets a ~20KB poster; every video also gets a 3s
 * silent preview loop for its tile and an h264 web encode for the lightbox.
 * Those derivatives live in public/work-thumbs/, which .gitignore explicitly
 * un-ignores, so they deploy.
 *
 * Derivatives are COMMITTED, not built in CI: Vercel's build has no ffmpeg.
 * Re-run locally after adding work.
 *
 * ORDER MATTERS. Identity (hash) is computed from the ORIGINAL in pass 1, the
 * duplicate set is resolved in pass 2, and derivatives are written in pass 3 for
 * survivors only. Doing it the other way round - generate, then dedupe, then
 * prune the losers - meant every run deleted derivatives that the next run
 * dutifully rebuilt: 190 posters and 30 video transcodes of pure churn per run.
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
const NL = String.fromCharCode(10);

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
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') return !stems.has(f.slice(0, -ext.length));
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
    if (p.includes('ai-posts')) return { cat: 'AI Posts', group: 'AI Posts' };
    if (p.includes('motion-posters')) return { cat: 'AI Video', group: 'Motion Posters' };
    if (p.includes('showreel')) return { cat: 'AI Video', group: 'Showreel' };
    if (p.includes('web-experiences')) return { cat: 'Web', group: 'Web Experiences' };
    return { cat: 'Studio', group: 'Studio Visuals' };
  }
  if (seg[0] === 'generated' || seg[0] === 'images') return { cat: 'Studio', group: 'Studio Visuals' };
  if (isVid) return { cat: 'AI Video', group: 'Films' };
  return { cat: 'Studio', group: 'Studio Visuals' };
}

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
const scanned = files.length;
files = preferWebp(files).filter(f => !EXCLUDE_RE.some(re => re.test('/' + f)));
files = files.filter(f => { try { return fs.statSync(path.join(PUB, f)).size > 6 * 1024; } catch { return false; } });
console.log(`scan: ${scanned} media files, ${files.length} after exclusions`);

fs.mkdirSync(THUMBS, { recursive: true });
const ffprobe = (abs, args) => execFileSync('ffprobe', ['-v', 'error', ...args, abs], { encoding: 'utf8' }).trim();

/* 8x8 horizontal-gradient dHash, taken from the ORIGINAL so identity never
   depends on which derivative files happen to exist on disk. */
const dhash = async (abs) => {
  const buf = await sharp(abs).greyscale().resize(9, 8, { fit: 'fill' }).raw().toBuffer();
  let bits = '';
  for (let y = 0; y < 8; y++) for (let x = 0; x < 8; x++) bits += buf[y * 9 + x] < buf[y * 9 + x + 1] ? '1' : '0';
  return bits;
};

/* ── Pass 1: identity ───────────────────────────────────────────────────── */
const cand = [];
let unreadable = 0;
for (const rel of files) {
  const abs = path.join(PUB, rel);
  const isVid = VID.has(path.extname(rel).toLowerCase());
  const id = crypto.createHash('sha1').update(rel).digest('hex').slice(0, 12);
  try {
    let w, h, dur = null, bits;
    if (isVid) {
      const nums = ffprobe(abs, ['-select_streams', 'v:0', '-show_entries', 'stream=width,height:format=duration', '-of', 'csv=p=0'])
        .split(/[,\n]/).map(Number).filter(Number.isFinite);
      [w, h] = nums; dur = Math.round(nums[2] || 0);
      const tmp = path.join(THUMBS, `${id}.probe.png`);
      execFileSync('ffmpeg', ['-nostdin', '-v', 'error', '-y', '-ss', String(Math.max(0.5, (dur || 5) * 0.2)), '-i', abs, '-frames:v', '1', tmp]);
      bits = await dhash(tmp);
      fs.unlinkSync(tmp);
    } else {
      const meta = await sharp(abs).metadata();
      w = meta.width; h = meta.height;
      bits = await dhash(abs);
    }
    if (!w || !h) throw new Error('no dimensions');
    cand.push({ rel, abs, id, isVid, w, h, dur, bits, ...classify(rel) });
  } catch (e) {
    unreadable++;
    console.warn(`skip (unreadable): ${rel} - ${String(e.message || e).slice(0, 70)}`);
  }
}

/* ── Pass 2: deduplicate ────────────────────────────────────────────────────
   public/ mirrors whole folders - /logos/ duplicates /brands/logos/, interior
   renders are saved again at a second size under generated/. Exact hash buckets
   miss those: re-encoding the same picture flips a few bits. Compare by Hamming
   distance instead; 4 of 64 catches re-encodes and rescales while staying well
   clear of genuinely different pictures. Keep the largest copy, then webp over
   png, then the shortest path as a stable tiebreak. A video only duplicates
   another video with the same poster AND the same duration. */
const NEAR = 4;
const toBig = (bits) => BigInt('0b' + bits);
const popcount = (x) => { let n = 0; while (x) { n += Number(x & 1n); x >>= 1n; } return n; };
const better = (a, b) => {
  const area = (x) => x.w * x.h;
  if (area(a) !== area(b)) return area(a) > area(b) ? a : b;
  const webp = (x) => (x.rel.endsWith('.webp') ? 1 : 0);
  if (webp(a) !== webp(b)) return webp(a) > webp(b) ? a : b;
  return a.rel.length <= b.rel.length ? a : b;
};
const survivors = [];
let dropped = 0;
for (const it of cand) {
  const bits = toBig(it.bits);
  const hit = survivors.find((k) => k.dur === it.dur && popcount(toBig(k.bits) ^ bits) <= NEAR);
  if (!hit) { survivors.push(it); continue; }
  dropped++;
  const win = better(hit, it);
  if (win !== hit) survivors[survivors.indexOf(hit)] = win;
}
console.log(`dedupe: dropped ${dropped} duplicate copies, ${unreadable} unreadable`);

/* ── Pass 3: derivatives, survivors only ───────────────────────────────── */
let posters = 0, previews = 0, webs = 0, reused = 0;
const items = [];
for (const it of survivors) {
  const thumbRel = `work-thumbs/${it.id}.webp`;
  const thumbAbs = path.join(PUB, thumbRel);
  const item = { src: '/' + it.rel, thumb: '/' + thumbRel, w: it.w, h: it.h, cat: it.cat, group: it.group };
  if (it.slug) item.slug = it.slug;

  if (it.isVid) {
    const at = Math.max(0.5, (it.dur || 5) * 0.2);
    const previewRel = `work-thumbs/${it.id}-p.mp4`;
    const webRel = `work-thumbs/${it.id}-hd.mp4`;
    const previewAbs = path.join(PUB, previewRel);
    const webAbs = path.join(PUB, webRel);

    if (!fs.existsSync(thumbAbs)) {
      const tmp = thumbAbs + '.png';
      execFileSync('ffmpeg', ['-nostdin', '-v', 'error', '-y', '-ss', String(at), '-i', it.abs, '-frames:v', '1', tmp]);
      await sharp(tmp).resize({ width: 480 }).webp({ quality: 68 }).toFile(thumbAbs);
      fs.unlinkSync(tmp);
      posters++;
    } else reused++;

    /* Tile loop: 3s, silent, 480px. The originals total 4GB and one is 600MB -
       autoplaying those as grid tiles is not an option. */
    if (!fs.existsSync(previewAbs)) {
      execFileSync('ffmpeg', ['-nostdin', '-v', 'error', '-y', '-ss', String(at), '-t', '3', '-i', it.abs, '-an',
        '-vf', 'scale=480:-2', '-c:v', 'libx264', '-crf', '30', '-preset', 'veryfast',
        '-pix_fmt', 'yuv420p', '-movflags', '+faststart', previewAbs]);
      previews++;
    }

    /* Lightbox encode. Three problems, one file: 40 of 53 masters were never
       committed, so production served the SPA fallback for them; nine are HEVC,
       which no mainstream browser decodes in MP4 (canPlayType returns "" for
       hvc1 and hev1, and the element fails with error code 4); and the masters
       run to 600MB. h264 High, capped at 1280 wide, faststart. */
    if (!fs.existsSync(webAbs)) {
      execFileSync('ffmpeg', ['-nostdin', '-v', 'error', '-y', '-i', it.abs,
        '-vf', "scale='min(1280,iw)':-2", '-c:v', 'libx264', '-profile:v', 'high',
        '-crf', '28', '-preset', 'medium', '-pix_fmt', 'yuv420p',
        '-c:a', 'aac', '-b:a', '96k', '-movflags', '+faststart', webAbs]);
      webs++;
    }
    item.video = true;
    item.dur = it.dur || 0;
    item.preview = '/' + previewRel;
    item.web = '/' + webRel;
  } else {
    if (!fs.existsSync(thumbAbs)) {
      await sharp(it.abs).resize({ width: 480, withoutEnlargement: true }).webp({ quality: 68 }).toFile(thumbAbs);
      posters++;
    } else reused++;
  }
  items.push(item);
}

/* Stable pseudo-shuffle so a category interleaves instead of showing 300
   near-identical frames in a row. Hash-ordered = deterministic across runs. */
items.sort((a, b) => (crypto.createHash('sha1').update(a.src).digest('hex') < crypto.createHash('sha1').update(b.src).digest('hex') ? -1 : 1));

const counts = {};
for (const it of items) counts[it.cat] = (counts[it.cat] || 0) + 1;

fs.writeFileSync(OUT,
  `/* GENERATED by scripts/work-archive.mjs - do not edit by hand.${NL}` +
  `   ${items.length} assets, every path verified on disk when generated.${NL}` +
  `   Re-run after adding work: node scripts/work-archive.mjs */${NL}${NL}` +
  `export const WORK_ARCHIVE = ${JSON.stringify(items)};${NL}${NL}` +
  `export const WORK_COUNTS = ${JSON.stringify(counts, null, 2)};${NL}`);

console.log(`derivatives: ${posters} posters, ${previews} preview loops, ${webs} web encodes, ${reused} reused`);
console.log('counts:', counts);
console.log(`wrote src/data/workArchive.js (${items.length} items)`);

/* Guard: every generated file must be committable. A blanket `*.mp4` in
   .gitignore once swallowed all 83 preview loops - `git add` reported nothing,
   the posters committed fine, and production served the SPA fallback for every
   preview. Fail loudly here instead of shipping a page of stills. */
try {
  const ignored = execFileSync('git', ['check-ignore', '--no-index', '--stdin'],
    { cwd: ROOT, input: items.flatMap(i => [i.thumb, i.preview, i.web].filter(Boolean).map(f => 'public' + f)).join(NL), encoding: 'utf8' });
  const list = ignored.split(NL).filter(Boolean);
  if (list.length) {
    console.error(`${NL}ERROR: ${list.length} generated files are gitignored and would not deploy:`);
    for (const f of list.slice(0, 5)) console.error('  ' + f);
    console.error('Add a negation to .gitignore (e.g. !public/work-thumbs/*.mp4).');
    process.exitCode = 1;
  }
} catch (e) {
  if (typeof e.status === 'number' && e.status !== 1) console.warn('gitignore check skipped:', e.message.slice(0, 60));
}

/* Orphan sweep: delete derivatives whose item no longer survives. Safe now that
   derivatives are only written for survivors - nothing deleted here will be
   rebuilt on the next run. */
const live = new Set(items.flatMap(i => [i.thumb, i.preview, i.web].filter(Boolean).map(f => path.basename(f))));
let pruned = 0;
for (const f of fs.readdirSync(THUMBS)) if (!live.has(f)) { fs.unlinkSync(path.join(THUMBS, f)); pruned++; }
if (pruned) console.log(`pruned ${pruned} orphaned derivatives`);
