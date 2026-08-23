/**
 * seedance-villa-film — one continuous 30 s walk through the Poolside Villa,
 * generated as chained segments on Replicate (bytedance/seedance-2.0-fast).
 *
 * Each segment is conditioned on a FIRST frame and a LAST frame from the
 * project's own master frames, and the next segment starts on exactly the
 * frame the previous one ended on — so the concat has no cut:
 *   floor plan → whole house → living room → kitchen → bathroom → master bedroom → pool
 *
 * Auth: REPLICATE_API_TOKEN from the environment only (.env is gitignored).
 * Usage: node scripts/seedance-villa-film.mjs [--only N] [--dry]
 * Output: <frames>/../seedance/seg-NN.mp4 + villa-film-30s.mp4
 */
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import Replicate from 'replicate';

const FRAMES = 'C:/Users/smadj/Documents/inetrior design/public/generated/vellora-house-film/frames';
const OUT = 'C:/Users/smadj/Documents/inetrior design/public/generated/vellora-house-film/seedance';
const MODEL = 'bytedance/seedance-2.0-fast';
const SECONDS = 5; // 7 × 5 s = 35 s (sketch opening added 2026-08-22)

const STYLE = 'Photoreal architectural visualization of the same modern villa, continuous single take, no cut, smooth steady cinematic camera, natural golden-hour light, consistent materials and furniture, no people, no text.';

// [firstFrame, lastFrame, camera move]
const SEGMENTS = [
  ['sketch-opening.png', '00_ground_floor_plan.png', 'Start on a hand-drawn pencil sketch of the floor plan in a notebook on a wooden table; the camera moves straight down over it and the sketch lines redraw and resolve into the clean finished architectural floor plan rendering, seen flat from above.'],
  ['00_ground_floor_plan.png', '02_exterior_front_day.png', 'Start on the flat architectural floor plan seen from above; the drawing lifts into three dimensions and the camera rises and pulls back as the walls grow into the finished white villa with its front facade in daylight.'],
  ['02_exterior_front_day.png', '05_living_master.png', 'The camera glides forward through the front entrance and into the bright living room, settling on the lounge seating, stone walls and the open view.'],
  ['05_living_master.png', '09_kitchen_master.png', 'The camera moves smoothly from the living room across the open plan into the kitchen, ending on the long stone island and cabinetry.'],
  ['09_kitchen_master.png', '17_primary_bath_master.png', 'The camera leaves the kitchen, drifts down the hallway and into the primary bathroom, ending on the freestanding bath and stone vanity.'],
  ['17_primary_bath_master.png', '14_primary_bedroom_master.png', 'The camera turns from the bathroom through the doorway into the primary bedroom, ending on the bed facing the glass wall and terrace.'],
  ['14_primary_bedroom_master.png', '27_pool_hero.png', 'The camera passes through the bedroom glass doors out onto the terrace and sweeps across the pool deck, ending on the hero view of the pool and the villa at golden hour.'],
];

const args = process.argv.slice(2);
const only = args.includes('--only') ? Number(args[args.indexOf('--only') + 1]) : null;
const dry = args.includes('--dry');

if (!dry && !process.env.REPLICATE_API_TOKEN) { console.error('REPLICATE_API_TOKEN is not set (put it in .env).'); process.exit(1); }
const replicate = dry ? null : new Replicate();
await mkdir(OUT, { recursive: true });

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
    seed: 1000 + n,
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

// seamless join: every segment ends on the frame the next one starts with
const list = path.join(OUT, 'concat.txt');
await writeFile(list, SEGMENTS.map((_, i) => `file 'seg-0${i}.mp4'`).join('\n'));
const final = path.join(OUT, 'villa-film-35s.mp4');
execSync(`ffmpeg -y -f concat -safe 0 -i "${list}" -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p -movflags +faststart -an "${final}"`, { stdio: 'inherit' });
const s = await stat(final);
console.log(`FILM DONE ${final} (${(s.size / 1048576).toFixed(1)} MB)`);
