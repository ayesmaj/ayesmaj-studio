/**
 * seedance-xp-films — continuous films for the Furniture and Apartments experience
 * pages, chained segments on Replicate seedance-2.0-fast (first→last frame, no cuts).
 *
 * Auth: REPLICATE_API_TOKEN from the environment only (.env is gitignored).
 * Usage: node scripts/seedance-xp-films.mjs <furniture|apartment> [--only N] [--dry]
 */
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import Replicate from 'replicate';

const FD = 'source-assets/interior-generated/furniture-decor';
const AP = 'source-assets/interior-generated/apartments';
const CANAL = 'public/interior-design/projects/canal-apartment/pairs';
const MODEL = 'bytedance/seedance-2.0-fast';
const SECONDS = 5;

const FILMS = {
  furniture: {
    out: `${FD}/seedance`,
    pub: 'public/interior-design/generated/furniture-decor/film',
    name: 'furniture-film',
    seedBase: 3000,
    style: 'Photoreal cinematic interior film of the same bright colorful luxury living room - cream shell, emerald velvet sofa, blush chairs, mustard accent, walnut, brass, colorful artwork, layered rug, strong daylight. One continuous single take, no cut, slow smooth steady camera, no people, no text, no captions.',
    segments: [
      [`${FD}/31_fd_empty.png`, `${FD}/34_fd_layout_open.png`, 'Start on the completely empty room; as the camera drifts slowly forward, furniture calmly assembles into place along the edges of the room - sofa against the wall, chairs at the window, the rug unrolling.'],
      [`${FD}/34_fd_layout_open.png`, `${FD}/30_fd_hero.png`, 'The camera keeps moving gently as the furniture rearranges into the final composition: the emerald sofa centered, blush chairs joining, artwork appearing on the wall, books, flowers and lamps landing softly.'],
      [`${FD}/30_fd_hero.png`, `${FD}/51_fd_shot_detail.png`, 'The camera pushes slowly in across the finished room, sinking low over the emerald sofa arm and the brass lamp toward the colorful artwork, shallow depth of field.'],
    ],
  },
  apartment: {
    out: `${AP}/seedance`,
    pub: 'public/interior-design/generated/apartments/film',
    name: 'apartment-film',
    seedBase: 4000,
    style: 'Photoreal cinematic interior film of the same canal-side apartment - walnut media wall, olive sofa, stone, warm daylight, water outside the windows. One continuous single take, no cut, slow smooth steady camera, no people, no text, no captions.',
    segments: [
      [`${AP}/04_apartment_3d_plan.png`, `${CANAL}/living-editorial-v2.webp`, 'Start on the furnished 3D floor plan seen from above; the camera dives slowly toward the living zone and the plan becomes the real living room with the walnut media wall.'],
      [`${CANAL}/living-editorial-v2.webp`, `${CANAL}/kitchen-editorial-v2.webp`, 'The camera glides from the living room across the apartment into the kitchen, ending on the stone worktop with the water at the window.'],
      [`${CANAL}/kitchen-editorial-v2.webp`, `${CANAL}/primary-editorial-v2.webp`, 'The camera leaves the kitchen and drifts down the corridor into the primary bedroom, settling on the bed in soft light.'],
      [`${CANAL}/primary-editorial-v2.webp`, `${CANAL}/bath-editorial-v2.webp`, 'The camera turns from the bedroom into the bathroom, ending on the vanity and the lit niche.'],
      [`${CANAL}/bath-editorial-v2.webp`, `${CANAL}/terrace-editorial-v2.webp`, 'The camera moves back through the apartment and out onto the terrace, ending on the chair by the window with the sun over the water.'],
    ],
  },
};

const key = process.argv[2];
const film = FILMS[key];
if (!film) { console.error('usage: node scripts/seedance-xp-films.mjs <furniture|apartment> [--only N] [--dry]'); process.exit(1); }
const args = process.argv.slice(3);
const only = args.includes('--only') ? Number(args[args.indexOf('--only') + 1]) : null;
const dry = args.includes('--dry');

if (!dry && !process.env.REPLICATE_API_TOKEN) { console.error('REPLICATE_API_TOKEN is not set (put it in .env).'); process.exit(1); }
const replicate = dry ? null : new Replicate();
await mkdir(film.out, { recursive: true });
await mkdir(film.pub, { recursive: true });

const MIME = { '.png': 'image/png', '.webp': 'image/webp', '.jpg': 'image/jpeg' };
const blob = async (p) => new Blob([await readFile(p)], { type: MIME[path.extname(p).toLowerCase()] || 'image/png' });

for (let i = 0; i < film.segments.length; i++) {
  if (only !== null && only !== i) continue;
  const [first, last, move] = film.segments[i];
  const out = path.join(film.out, `seg-0${i}.mp4`);
  if (existsSync(out) && only === null) { console.log(`skip seg-0${i} (exists)`); continue; }
  const input = {
    prompt: `${move} ${film.style}`,
    image: await blob(first),
    last_frame_image: await blob(last),
    duration: SECONDS,
    resolution: '720p',
    aspect_ratio: '16:9',
    generate_audio: false,
    seed: film.seedBase + i,
  };
  console.log(`seg-0${i}: ${path.basename(first)} → ${path.basename(last)}`);
  if (dry) continue;
  const t0 = Date.now();
  const output = await replicate.run(MODEL, { input });
  const file = Array.isArray(output) ? output[0] : output;
  const bytes = Buffer.from(await (typeof file.blob === 'function' ? file.blob() : fetch(file.url ? file.url() : String(file)).then((r) => r.blob())).then((b) => b.arrayBuffer()));
  await writeFile(out, bytes);
  console.log(`  wrote ${path.basename(out)} (${(bytes.length / 1048576).toFixed(1)} MB) in ${Math.round((Date.now() - t0) / 1000)} s`);
}

if (dry || only !== null) process.exit(0);

const list = path.join(film.out, 'concat.txt');
await writeFile(list, film.segments.map((_, i) => `file 'seg-0${i}.mp4'`).join('\n'));
const master = path.join(film.out, `${film.name}-master.mp4`);
execSync(`ffmpeg -y -f concat -safe 0 -i "${list}" -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p -movflags +faststart -an "${master}"`, { stdio: 'inherit' });
execSync(`ffmpeg -y -i "${master}" -c:v libx264 -preset slow -crf 21 -pix_fmt yuv420p -movflags +faststart -an "${film.pub}/${film.name}.mp4"`, { stdio: 'inherit' });
execSync(`ffmpeg -y -i "${master}" -vf scale=854:480 -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart -an "${film.pub}/${film.name}-mobile.mp4"`, { stdio: 'inherit' });
execSync(`ffmpeg -y -i "${master}" -frames:v 1 -update 1 "${film.pub}/${film.name}-poster.png"`, { stdio: 'inherit' });
const s = await stat(`${film.pub}/${film.name}.mp4`);
console.log(`FILM DONE ${film.pub}/${film.name}.mp4 (${(s.size / 1048576).toFixed(1)} MB)`);
