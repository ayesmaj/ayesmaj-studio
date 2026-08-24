/**
 * seedance-bathroom-film — one continuous 25 s move through the Art Deco
 * bathroom (studio concept), chained segments on Replicate seedance-2.0-fast.
 * Frames are this page's own generated stills; each segment starts on the
 * exact frame the previous one ended on, so the concat has no cut:
 *   doorway → vanity → tub/stone → shower → wide → dusk
 *
 * Auth: REPLICATE_API_TOKEN from the environment only (.env is gitignored).
 * Usage: node scripts/seedance-bathroom-film.mjs [--only N] [--dry]
 * Output: source-assets/interior-generated/bathrooms/seedance/seg-NN.mp4 +
 *         public/interior-design/generated/bathrooms/film/bathroom-film{,-mobile}.mp4 + poster
 */
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import Replicate from 'replicate';

const FRAMES = 'source-assets/interior-generated/bathrooms';
const OUT = 'source-assets/interior-generated/bathrooms/seedance';
const PUB = 'public/interior-design/generated/bathrooms/film';
const MODEL = 'bytedance/seedance-2.0-fast';
const SECONDS = 5;

const STYLE = 'Photoreal cinematic interior film of the same Art Deco bathroom - emerald fluted lacquer, champagne brass, ivory stone tub on a green-and-rust veined marble podium, blush velvet, warm daylight. One continuous single take, no cut, slow smooth steady camera, shallow depth of field, no people, no text, no captions.';

// [firstFrame, lastFrame, camera move]
const SEGMENTS = [
  ['27_bh_doorway.png', '60_bh_shot_vanity.png', 'Start standing in the doorway looking into the bathroom; the camera drifts slowly forward and left, closing in on the emerald fluted vanity with the round brass mirror.'],
  ['60_bh_shot_vanity.png', '61_bh_shot_tub.png', 'From the vanity the camera pans right and sinks lower, moving past the blush velvet stool to a low close view across the ivory stone bathtub rim and the veined marble podium steps.'],
  ['61_bh_shot_tub.png', '62_bh_shot_shower.png', 'The camera rises gently from the tub and turns toward the fluted glass and brass shower partition, warm light and a hint of steam behind the reeded glass.'],
  ['62_bh_shot_shower.png', '20_bh_hero.png', 'The camera pulls back smoothly from the shower, opening up to the full wide view of the bathroom - tub on its podium, emerald vanity, window with sheer curtain.'],
  ['20_bh_hero.png', '43_bh_dir_artdeco.png', 'Holding the same wide view, daylight slowly fades to dusk; the brass wall lights and a candle by the tub come on, deep blue evening light in the window.'],
];

const args = process.argv.slice(2);
const only = args.includes('--only') ? Number(args[args.indexOf('--only') + 1]) : null;
const dry = args.includes('--dry');

if (!dry && !process.env.REPLICATE_API_TOKEN) { console.error('REPLICATE_API_TOKEN is not set (put it in .env).'); process.exit(1); }
const replicate = dry ? null : new Replicate();
await mkdir(OUT, { recursive: true });
await mkdir(PUB, { recursive: true });

const blob = async (file) => new Blob([await readFile(path.join(FRAMES, file))], { type: 'image/png' });

for (let i = 0; i < SEGMENTS.length; i++) {
  const n = i;
  if (only !== null && only !== n) continue;
  const [first, last, move] = SEGMENTS[i];
  const out = path.join(OUT, `seg-0${n}.mp4`);
  if (existsSync(out) && only === null) { console.log(`skip seg-0${n} (exists)`); continue; }
  const input = {
    prompt: `${move} ${STYLE}`,
    image: await blob(first),
    last_frame_image: await blob(last),
    duration: SECONDS,
    resolution: '720p',
    aspect_ratio: '16:9',
    generate_audio: false,
    seed: 2000 + n,
  };
  console.log(`seg-0${n}: ${first} → ${last}`);
  if (dry) continue;
  const t0 = Date.now();
  const output = await replicate.run(MODEL, { input });
  const file = Array.isArray(output) ? output[0] : output;
  const bytes = Buffer.from(await (typeof file.blob === 'function' ? file.blob() : fetch(file.url ? file.url() : String(file)).then((r) => r.blob())).then((b) => b.arrayBuffer()));
  await writeFile(out, bytes);
  console.log(`  wrote ${path.basename(out)} (${(bytes.length / 1048576).toFixed(1)} MB) in ${Math.round((Date.now() - t0) / 1000)} s`);
}

if (dry || only !== null) process.exit(0);

// seamless join, then web encodes + poster
const list = path.join(OUT, 'concat.txt');
await writeFile(list, SEGMENTS.map((_, i) => `file 'seg-0${i}.mp4'`).join('\n'));
const master = path.join(OUT, 'bathroom-film-25s.mp4');
execSync(`ffmpeg -y -f concat -safe 0 -i "${list}" -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p -movflags +faststart -an "${master}"`, { stdio: 'inherit' });
execSync(`ffmpeg -y -i "${master}" -c:v libx264 -preset slow -crf 21 -pix_fmt yuv420p -movflags +faststart -an "${PUB}/bathroom-film.mp4"`, { stdio: 'inherit' });
execSync(`ffmpeg -y -i "${master}" -vf scale=854:480 -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart -an "${PUB}/bathroom-film-mobile.mp4"`, { stdio: 'inherit' });
execSync(`ffmpeg -y -i "${master}" -vf "select=eq(n\\,0)" -frames:v 1 "${PUB}/bathroom-film-poster.png"`, { stdio: 'inherit' });
const s = await stat(`${PUB}/bathroom-film.mp4`);
console.log(`FILM DONE ${PUB}/bathroom-film.mp4 (${(s.size / 1048576).toFixed(1)} MB)`);
