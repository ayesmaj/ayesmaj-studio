/**
 * scrub-encode - re-encode the scroll-scrubbed films so seeking is instant.
 *
 * A normal web encode places a keyframe every ~10 s; scrubbing by scroll then forces the
 * decoder to decode a whole GOP for every step, which reads as a stuck page. These copies
 * carry a keyframe every 6 frames (0.25 s) with scene-cut detection off, so any seek lands
 * within a couple of frames. Owner report 2026-08-23.
 *
 * Usage: node scripts/scrub-encode.mjs
 */
import { execSync } from 'node:child_process';
import { statSync, existsSync, renameSync } from 'node:fs';

const FILMS = [
  'public/interior-design/generated/bathrooms/film/bathroom-film.mp4',
  'public/interior-design/generated/apartments/film/apartment-film.mp4',
  'public/interior-design/generated/furniture-decor/film/furniture-film.mp4',
  'public/interior-design/projects/poolside-villa/film/house-film-desktop.mp4',
  'public/interior-design/projects/the-patel/film/patel-hero-film-desktop.mp4',
];

const mb = (p) => (statSync(p).size / 1048576).toFixed(1);

for (const src of FILMS) {
  if (!existsSync(src)) { console.log('missing', src); continue; }
  const before = mb(src);
  const tmp = src.replace(/\.mp4$/, '.scrub.mp4');
  execSync(
    `ffmpeg -y -loglevel error -i "${src}" -an -c:v libx264 -preset slow -crf 25 ` +
    `-g 6 -keyint_min 6 -sc_threshold 0 -pix_fmt yuv420p -movflags +faststart "${tmp}"`,
    { stdio: 'inherit' },
  );
  renameSync(tmp, src);
  console.log(`${src.split('/').pop()}  ${before} MB -> ${mb(src)} MB (keyframe every 0.25 s)`);
}
