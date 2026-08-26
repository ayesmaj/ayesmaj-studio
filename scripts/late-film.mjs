/**
 * late-film — "He's late" AYESMAJ Studios mini-story for Instagram.
 *
 * 6 locked keyframes (gpt-image-2, identity-chained) -> 5 Seedance 2.0
 * first->last-frame transitions -> match cut into the real website recording.
 *
 * Auth: OPENAI_API_KEY + REPLICATE_API_TOKEN from .env (gitignored).
 * Usage: node scripts/late-film.mjs <keyframes|clips|master> [--only N] [--force] [--dry]
 */
import { writeFile, mkdir, stat } from 'node:fs/promises';
import { existsSync, readFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import Replicate from 'replicate';

const DIR = 'source-assets/late-film';
const OUT = 'output/late-film';
/**
 * Video backends. Both take first+last frame, which is what the keyframe chain needs.
 * Seedance is the brief's choice; Kling v3 is the fallback if Seedance keeps returning
 * E005 (sensitive) on photorealistic people. Select with `--model kling`.
 */
const BACKENDS = {
  seedance: {
    model: 'bytedance/seedance-2.0',            // explicitly NOT -fast, per brief
    seconds: 4,                                 // runtime floor is 4s despite the schema
    input: (prompt, first, last, i, secs) => ({
      prompt, image: first, last_frame_image: last,
      duration: secs, resolution: '1080p', aspect_ratio: '16:9',
      generate_audio: true, seed: 990 + i,
    }),
  },
  kling: {
    model: 'kwaivgi/kling-v3-video',
    seconds: 5,
    input: (prompt, first, last, _i, secs) => ({
      prompt, start_image: first, end_image: last,
      duration: secs, mode: 'pro', generate_audio: true,
      negative_prompt: 'text overlays, captions, watermark, subtitles, distorted or morphing faces, changing clothing, extra limbs, camera cut, jump cut, slow motion',
    }),
  },
};
const TARGET = 16;                            // the top of the briefed 12-16s. Clip length is set by the
                                              // backend's floor, so the AI film is sped up to land here.
                                              // Applied to the AI clips only — the website payoff plays at natural speed.
const WEBSITE = 'videos websites/ayesmaj studios website -1.mp4';
const WEB_IN = 2.5;                           // clean frame: no Esc overlay, no scrollbar
const TAIL = 7.5;                             // seconds of real website footage after the cut
const HOLD = 0.6;                             // freeze on the reveal frame before it scrolls
const KEY = process.env.OPENAI_API_KEY;

/** The MASTER VISUAL LOCK — appended to every image and every video prompt. */
const LOCK = `This is one continuous scene in the exact same AYESMAJ Studios office. Preserve the same worker, face, hairstyle, clothing, shoes, bag, proportions and age in every frame. Preserve the same office architecture, branding, colors, furniture and lighting throughout. AYESMAJ Studios is a premium multidisciplinary creative studio specializing in branding, 3D, CGI, AI, web and cinematic content. The studio is bright, sophisticated and artistic, with warm ivory architectural walls, walnut, brushed champagne metal, black accents, glass, subtle purple and gold creative lighting, large digital displays, 3D models, material samples, creative books, moodboards and premium workstations. Cinematic commercial photography, realistic scale, physically believable light, no cheap corporate-office look, no cyberpunk, no random text, no changing architecture.`;

const WORKER = `The worker is a late-20s male creative director: beige oversized designer shirt, black tailored pants, clean white sneakers, black cross-body laptop bag, slightly messy hair. Not a businessman, no suit.`;

/**
 * Seedance rejects the image lock with E005 (sensitive): instructing a video model to
 * "preserve the same face" of a photorealistic person trips deepfake filters. The
 * first/last frame images already pin his appearance, so the video side only needs the
 * environment held steady — no identity language.
 */
const VIDEO_LOCK = `One continuous scene inside the same AYESMAJ Studios building, a premium multidisciplinary creative studio for branding, 3D, CGI, AI, web and cinematic content. Keep the architecture, branding, colours, furniture and lighting identical throughout: warm ivory architectural walls, walnut, brushed champagne metal, black accents, glass, subtle purple and gold creative lighting, large digital displays, 3D models, material samples, creative books, moodboards and premium workstations. Cinematic commercial photography, realistic scale, physically believable light, no cheap corporate-office look, no cyberpunk, no random text, no changing architecture.`;

/** 6 keyframes. sources[0] is the identity / architecture source of truth. */
const FRAMES = [
  {
    id: '01_late_outside', sources: [], prompt:
      `Cinematic wide establishing shot outside the headquarters of AYESMAJ Studios, a highly designed contemporary creative-studio building in a modern city creative district, large glass facade, warm limestone, brushed metal, bold architectural AYESMAJ "A" monogram near the entrance, sophisticated landscaping and visible creative office interior through the glass. Early morning bright daylight, premium advertising cinematography. In the foreground, the young male creative worker is sprinting toward the entrance because he is clearly late, black cross-body laptop bag bouncing slightly, takeaway coffee in one hand, worried but focused expression. Capture him mid-stride with one foot off the ground, slightly low camera angle, strong depth and dynamic composition. AYESMAJ office visible beyond the entrance. No crowd. No cars blocking him. No comedy exaggeration. Premium cinematic commercial. Camera: 28mm, low 1.2m angle.`,
  },
  {
    id: '02_entering_studio', sources: ['01_late_outside'], prompt:
      `Interior view from several meters inside AYESMAJ Studios looking toward the glass entrance. The same worker has just pushed through the glass door and is rushing into the studio, still carrying his bag, moving quickly toward camera. Behind him, the exterior entrance from the reference image remains clearly recognizable. The AYESMAJ interior opens dramatically behind camera: bright premium multidisciplinary creative office with huge monitors displaying abstract 3D artwork, brand boards, CGI product frames, architectural visualization, sophisticated walnut desks, sculptural furniture, champagne metal, plants, ivory walls, subtle purple-and-gold accent illumination. Camera positioned in the worker's path so he feels like he is running directly into the creative world. Bright realistic daylight, cinematic commercial quality, dynamic perspective, no dark gloomy office.`,
  },
  {
    id: '03_running_through_studio', sources: ['02_entering_studio', '01_late_outside'], prompt:
      `Dynamic cinematic tracking shot inside AYESMAJ Studios. The same late worker runs rapidly through the center aisle of a spectacular creative production studio. Camera travels backward in front of him at roughly chest height while he runs toward camera. On both sides of him are glimpses of AYESMAJ capabilities: left side a giant screen with premium product CGI and 3D animation; right side branding walls with logos, color palettes and packaging; another station showing architectural visualization and a furnished 3D floor plan; another workstation showing cinematic AI video editing; physical sculptures, material samples, design books and high-end creative equipment. Other AYESMAJ team members briefly look up as he races past, but they remain secondary. Beautiful foreground parallax as desks and monitors pass camera. Warm ivory, walnut, champagne metal, hints of purple and gold, natural daylight.`,
  },
  {
    id: '04_briefing_room_door', sources: ['02_entering_studio', '03_running_through_studio'], prompt:
      `Cinematic over-the-shoulder view behind the same worker as he reaches the glass doors of the AYESMAJ Studios briefing and presentation room at the end of the studio. His hand is just reaching for the door. Through the glass, approximately 8 to 10 creative professionals are already seated around a large premium conference table waiting for him. Everyone inside is facing a huge wall-mounted presentation screen. One empty chair is clearly visible near the front of the table, implying it belongs to him. A few people glance toward the late worker through the glass with restrained expressions, not angry, more like "finally". The briefing room is beautifully designed: warm wood, ivory walls, champagne accents, glass partitions, subtle AYESMAJ branding, soft daylight and architectural lighting. The huge screen is visible but still black and idle. Keep the worker dominant in the foreground.`,
  },
  {
    id: '05_everyone_waiting', sources: ['02_entering_studio', '04_briefing_room_door'], prompt:
      `Wide cinematic view from inside the same AYESMAJ briefing room shown in the reference image. The same late worker has just entered through the glass door and stopped beside the presentation screen, slightly out of breath, trying to immediately appear professional. His laptop bag is still across his body. Around the conference table sit the same 8 to 10 sophisticated creative-team members waiting silently, all looking toward him. One person has arms folded. Another looks at their watch. Another quietly holds a coffee. Keep expressions subtle and realistic rather than exaggerated comedy. The worker lifts one hand slightly as if saying "I am here". The large presentation screen behind him is dark and ready. Camera approximately 24 to 28mm from the opposite end of the conference table, foreground silhouettes of team members create cinematic framing.`,
  },
  {
    id: '06_website_reveal', sources: ['05_everyone_waiting', '02_entering_studio', '00_website_screen'], prompt:
      `Exact same AYESMAJ briefing room and exact same people as the first reference image. Camera is now positioned slightly behind and between several seated team members, looking toward the huge presentation screen. The late worker is standing beside the display, finally composed, one hand near the presentation controls. Everyone in the room is now facing the screen. The giant presentation screen displays EXACTLY the supplied website screenshot, which is the LAST reference image. Preserve that supplied screen image exactly: the dark AYESMAJ website hero with the large white headline and the three colored panels below it. Do not redesign, reinterpret, replace or regenerate the website interface. The screen must be a clean 16:9 rectangle, nearly front-facing and close to parallel with the camera, occupying most of the frame width, with believable screen illumination reflecting subtly onto nearby faces, the table and the room. Keep the room itself secondary and slightly darker so the screen dominates. Cinematic composition designed to transition seamlessly into the real screen recording.`,
  },
];

/** 5 Seedance transitions, first -> last frame. */
const CLIPS = [
  {
    from: '01_late_outside', to: '02_entering_studio',
    prompt: `The same worker urgently sprints toward AYESMAJ Studios because he is late. Camera performs a fast stabilized backward tracking move while maintaining him as the subject. His bag and shirt react naturally to running. He reaches the glass entrance, pushes the door open in one continuous physical motion and races inside. Camera follows him through the doorway without teleporting or clipping through architecture. Exterior daylight naturally transitions into the bright warm studio interior. Fast pace but smooth professional commercial camera movement. No slow motion. No changing outfit, building or environment.`,
    audio: `Audio: fast urgent footsteps on pavement, distant quiet city ambience, then a glass door swinging open. No background music, no dialogue.`,
  },
  {
    from: '02_entering_studio', to: '03_running_through_studio',
    prompt: `Continue immediately from the entrance. The camera turns and begins moving backward in front of the worker while he runs rapidly through AYESMAJ Studios. Fast but stabilized Steadicam tracking shot. Desks, screens, branding boards, CGI visuals, architectural models and creative workstations pass naturally along both sides, creating strong foreground parallax. Several coworkers briefly look up as he races past. The worker stays focused on the briefing room ahead. Keep the same running direction and momentum. No random camera orbit. No changing office. No new furniture appearing.`,
    audio: `Audio: faster footsteps on a hard studio floor, soft room tone of a busy creative office. No background music, no dialogue.`,
  },
  {
    from: '03_running_through_studio', to: '04_briefing_room_door',
    prompt: `The worker continues running but begins decelerating as the briefing room becomes visible ahead. Camera transitions from front-facing tracking to a smooth side arc and then naturally falls behind him. He approaches the glass briefing-room door. Through the glass, reveal the waiting team around the conference table and the large presentation screen. He slows quickly, straightens his shirt slightly while still moving and reaches toward the door handle. Humorous but subtle. No slapstick.`,
    audio: `Audio: footsteps slowing to a stop, a quick breath, fabric rustle as he straightens his shirt. No background music, no dialogue.`,
  },
  {
    from: '04_briefing_room_door', to: '05_everyone_waiting',
    prompt: `The worker opens the glass door and walks quickly into the briefing room, attempting to recover his professional composure after running. Camera travels through the doorway after him. The seated team members slowly turn toward him. One casually checks their watch. Another gives a restrained knowing expression. The worker briefly pauses, catches his breath, removes the bag from his shoulder and steps toward the presentation display. Do not make anyone laugh dramatically or act cartoonish. Premium dry visual humour.`,
    audio: `Audio: a door opens then the room falls almost completely silent, one small awkward chair movement, one quiet breath. No background music, no dialogue.`,
  },
  {
    // Ends on the real website frame, not on keyframe 06. A wide-room end_image pulls the
    // model back out and defeats the push-in; ending on the actual first frame of the
    // recording forces the dolly all the way in AND makes the match cut frame-exact.
    // The 06 composition still happens — the camera passes through it on the way in.
    from: '05_everyone_waiting', to: '00_website_screen',
    prompt: `The screen is already lit with the supplied website image and everyone is facing it. The camera performs one continuous fast dolly straight forward into the presentation screen, accelerating the whole time. It passes between the seated team members, past the standing man, past the edges of the conference table, and keeps travelling forward until the glowing website screen completely fills the entire frame edge to edge. By the final second the room, the people, the table, the walls and the screen bezel are ALL out of frame and nothing is visible except the website image itself, filling 100 percent of the frame, flat and front-facing. The website image stays perfectly stable, sharp and unchanged the whole time — do not animate, redesign or distort the interface. This is a push-in that ends completely inside the screen.`,
    audio: `Audio: silence, then a single soft click, then a low cinematic swell beginning as the screen lights up. No dialogue.`,
  },
];

const stage = process.argv[2];
const args = process.argv.slice(3);
const backend = BACKENDS[args.includes('--model') ? args[args.indexOf('--model') + 1] : 'seedance'];
if (!backend) { console.error(`--model must be one of: ${Object.keys(BACKENDS).join(', ')}`); process.exit(1); }
const only = args.includes('--only') ? Number(args[args.indexOf('--only') + 1]) : null;
const target = args.includes('--target') ? Number(args[args.indexOf('--target') + 1]) : TARGET;
const tag = args.includes('--tag') ? args[args.indexOf('--tag') + 1] : '';
const useOmni = args[args.indexOf('--from') + 1] === 'omni' && args.includes('--from');
const force = args.includes('--force');
const dry = args.includes('--dry');
const png = (id) => path.join(DIR, `${id}.png`);
const MIME = { '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp' };
const blobOf = (p) => new Blob([readFileSync(p)], { type: MIME[path.extname(p).toLowerCase()] || 'image/png' });
const sh = (c) => execSync(c, { stdio: 'inherit' });

await mkdir(DIR, { recursive: true });
await mkdir(OUT, { recursive: true });

/** Run a Replicate model and return the output file as a Buffer. */
async function replicateRun(model, input) {
  const output = await new Replicate().run(model, { input });
  const file = Array.isArray(output) ? output[0] : output;
  const blob = typeof file.blob === 'function' ? await file.blob() : await fetch(file.url ? file.url() : String(file)).then((r) => r.blob());
  return Buffer.from(await blob.arrayBuffer());
}

/* ---------------------------------------------------------------- keyframes */
if (stage === 'keyframes') {
  if (!KEY) { console.error('OPENAI_API_KEY is not set.'); process.exit(1); }
  for (let i = 0; i < FRAMES.length; i++) {
    if (only !== null && only !== i) continue;
    const f = FRAMES[i];
    const out = png(f.id);
    if (existsSync(out) && !force) { console.log(`skip ${f.id} (exists)`); continue; }
    const refs = f.sources.map(png);
    for (const r of refs) if (!existsSync(r)) { console.error(`MISSING ref ${r} — run earlier frames first`); process.exit(1); }
    console.log(`FRAME ${f.id}${refs.length ? '  <- ' + f.sources.join(', ') : '  (text-to-image)'}`);
    if (dry) continue;

    const instruction = refs.length
      ? `${LOCK}\n\n${WORKER}\n\nThe FIRST reference image is the source of truth for WHO THE MAN IS — reproduce his exact face, facial features, skin tone, hair colour and messy hairstyle, build, age, beige shirt, black trousers, white sneakers and black cross-body bag identically. It is the same individual person, not a similar-looking one.${refs.length > 1 ? ` The remaining reference image${refs.length > 2 ? 's' : ''} lock the space: the same AYESMAJ architecture, furniture, lighting and palette, continuing directly from where the previous shot ended.` : ''}\n\nArt direction: ${f.prompt}`
      : `${LOCK}\n\n${WORKER}\n\n${f.prompt}`;

    // ponytail: 2048x1024 is the only wide size this repo has proven on gpt-image-2.
    // Ask for true 16:9 first, fall back, then centre-crop to exactly 16:9 either way.
    let res, used;
    for (const size of ['2048x1152', '2048x1024']) {
      if (refs.length) {
        const form = new FormData();
        form.append('model', 'gpt-image-2');
        form.append('quality', 'high');
        form.append('size', size);
        form.append('prompt', instruction);
        for (const r of refs) form.append('image[]', blobOf(r), path.basename(r));
        res = await fetch('https://api.openai.com/v1/images/edits', { method: 'POST', headers: { Authorization: `Bearer ${KEY}` }, body: form });
      } else {
        res = await fetch('https://api.openai.com/v1/images/generations', {
          method: 'POST',
          headers: { Authorization: `Bearer ${KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ model: 'gpt-image-2', prompt: instruction, size, quality: 'high', n: 1 }),
        });
      }
      if (res.ok) { used = size; break; }
      const t = await res.text();
      if (!/size/i.test(t)) { console.error(`  FAIL ${f.id}: ${t.slice(0, 500)}`); process.exit(1); }
      console.log(`  size ${size} rejected, retrying`);
    }
    if (!used) { console.error(`  FAIL ${f.id}: no accepted size`); process.exit(1); }

    const j = await res.json();
    const raw = path.join(DIR, `.raw_${f.id}.png`);
    await writeFile(raw, Buffer.from(j.data[0].b64_json, 'base64'));
    sh(`ffmpeg -y -v error -i "${raw}" -vf "crop='min(iw,ih*16/9)':'min(ih,iw*9/16)',scale=1920:1080" "${out}"`);
    console.log(`  wrote ${f.id}.png (generated ${used})`);
  }
  console.log('\nKEYFRAMES DONE — review before running `clips`.');
  process.exit(0);
}

/* -------------------------------------------------------------------- clips */
if (stage === 'clips') {
  if (!dry && !process.env.REPLICATE_API_TOKEN) { console.error('REPLICATE_API_TOKEN is not set.'); process.exit(1); }
  const replicate = dry ? null : new Replicate();
  for (let i = 0; i < CLIPS.length; i++) {
    if (only !== null && only !== i) continue;
    const c = CLIPS[i];
    const out = path.join(DIR, `clip-0${i}.mp4`);
    if (existsSync(out) && !force) { console.log(`skip clip-0${i} (exists)`); continue; }
    for (const id of [c.from, c.to]) if (!existsSync(png(id))) { console.error(`MISSING keyframe ${id}.png`); process.exit(1); }
    console.log(`clip-0${i}: ${c.from} -> ${c.to}  [${backend.model} ${backend.seconds}s]`);
    if (dry) continue;
    const t0 = Date.now();
    const output = await replicate.run(backend.model, {
      input: backend.input(
        `${c.prompt}\n\n${VIDEO_LOCK}\n\n${c.audio}`,
        blobOf(png(c.from)),
        blobOf(png(c.to)),
        i,
        backend.seconds,
      ),
    });
    const file = Array.isArray(output) ? output[0] : output;
    const blob = typeof file.blob === 'function' ? await file.blob() : await fetch(file.url ? file.url() : String(file)).then((r) => r.blob());
    const bytes = Buffer.from(await blob.arrayBuffer());
    await writeFile(out, bytes);
    console.log(`  wrote clip-0${i}.mp4 (${(bytes.length / 1048576).toFixed(1)} MB) in ${Math.round((Date.now() - t0) / 1000)} s`);
  }
  process.exit(0);
}

/* ---------------------------------------------------------------------- pov */
/**
 * Single 15s first-person POV take on Seedance, text-to-video (no image inputs).
 * The prompt deliberately contains no face/reflection wording — that phrasing is what
 * Seedance's text classifier rejects with E005, confirmed by probe.
 */
if (stage === 'pov') {
  if (!dry && !process.env.REPLICATE_API_TOKEN) { console.error('REPLICATE_API_TOKEN is not set.'); process.exit(1); }
  const res = args.includes('--res') ? args[args.indexOf('--res') + 1] : '1080p';
  const promptFile = path.join(DIR, 'pov-prompt.txt');
  if (!existsSync(promptFile)) { console.error(`MISSING ${promptFile}`); process.exit(1); }
  const prompt = readFileSync(promptFile, 'utf8').trim();
  if (/face|reflection|mirror/i.test(prompt)) { console.error('prompt contains face/reflection wording — Seedance will reject with E005'); process.exit(1); }
  // Environment references only. In POV his face is never seen, so the face anchor
  // (02_entering_studio) is deliberately excluded — it would only invite the model to
  // cut to him in third person. reference_images are legal here because POV uses no
  // first/last frame ("cannot be combined with reference images").
  const POV_REFS = ['01_late_outside', '03_running_through_studio', '04_briefing_room_door',
    '05_everyone_waiting', '00_website_screen'];
  const withRefs = !args.includes('--no-refs');
  console.log(`pov: 15s / ${res} / ${prompt.length} chars, ${prompt.split(/\s+/).length} words${withRefs ? ` / ${POV_REFS.length} refs` : ' / no refs'}`);
  if (withRefs) POV_REFS.forEach((r) => console.log(`  ref ${r}`));
  if (dry) process.exit(0);
  const t0 = Date.now();
  const bytes = await replicateRun('bytedance/seedance-2.0', {
    prompt, duration: 15, resolution: res, aspect_ratio: '16:9', generate_audio: true, seed: 99,
    ...(withRefs ? { reference_images: POV_REFS.map((r) => blobOf(png(r))) } : {}),
  });
  const out = path.join(DIR, `pov-${res}${withRefs ? '-refs' : ''}.mp4`);
  await writeFile(out, bytes);
  console.log(`wrote ${path.basename(out)} (${(bytes.length / 1048576).toFixed(1)} MB) in ${Math.round((Date.now() - t0) / 1000)} s`);
  process.exit(0);
}

/* --------------------------------------------------------------------- omni */
/**
 * One-shot alternative: kling-v3-omni-video generates the whole 15s film in a single
 * pass. reference_images hold the man and the office across the entire duration (instead
 * of per-clip keyframe pinning), multi_prompt drives the six story beats, and 4k mode
 * fixes the soft faces that 1080p per-clip generation produced. start/end frames still
 * lock the opening and land the push-in on the real website frame natively.
 */
if (stage === 'omni') {
  if (!dry && !process.env.REPLICATE_API_TOKEN) { console.error('REPLICATE_API_TOKEN is not set.'); process.exit(1); }
  const mode = args.includes('--mode') ? args[args.indexOf('--mode') + 1] : '4k';

  // Max 7 references. Every distinct thing the film must keep consistent.
  const REFS = ['02_entering_studio', '01_late_outside', '03_running_through_studio',
    '04_briefing_room_door', '05_everyone_waiting', '06_website_reveal', '00_website_screen'];

  const SHOTS = [
    [2, `The same man from <<<image_1>>> sprints across the forecourt toward the AYESMAJ Studios glass entrance shown in <<<image_2>>>, late, coffee in one hand, black cross-body bag bouncing. Low stabilized camera tracking with him, early morning daylight.`],
    [2, `He pushes through the glass door and bursts into the bright AYESMAJ studio interior from <<<image_1>>>, moving fast toward camera. Camera retreats ahead of him through the doorway in one continuous move.`],
    [3, `Fast backward Steadicam in front of him as he runs down the centre aisle of the studio in <<<image_3>>>. Giant screens with product CGI, branding walls, architectural visualisation and a 3D floor plan slide past on both sides with strong foreground parallax. Colleagues glance up as he passes.`],
    [2, `He decelerates as he reaches the glass briefing-room door in <<<image_4>>>. Camera arcs to behind his shoulder. Through the glass, the seated team and the large dark presentation screen are visible. He straightens his shirt while still moving.`],
    [3, `He steps into the briefing room in <<<image_5>>>, slightly out of breath, and raises one hand as if to say "I'm here". The seated team all turn to look at him. One folds their arms, one checks a watch. Restrained dry humour, no slapstick.`],
    [3, `He turns to the presentation screen and it lights up with the AYESMAJ website from <<<image_7>>>. Everyone faces the screen. The camera dollies fast and continuously forward between the seated team, straight into the screen, until the website image completely fills the frame edge to edge and the room is entirely out of view.`],
  ];
  const total = SHOTS.reduce((s, [d]) => s + d, 0);

  const input = {
    prompt: `Premium cinematic commercial for AYESMAJ Studios, one continuous story of a late creative director arriving at work. ${VIDEO_LOCK} Keep the man's face, hair, beige shirt, black trousers, white sneakers and black cross-body bag identical to the reference images for the entire film.`,
    multi_prompt: JSON.stringify(SHOTS.map(([duration, prompt]) => ({ prompt, duration }))),
    duration: total,
    mode,
    generate_audio: true,
    negative_prompt: 'text overlays, captions, subtitles, watermark, distorted or morphing face, changing clothing, extra limbs, slow motion, blurry face',
    // The API allows EITHER start+end frames (max 2 images) OR reference_images — not both.
    // References win: they hold the man and the office across all 15s, and it was exactly a
    // wide-room end_image that defeated the push-in on the per-clip attempt.
    aspect_ratio: '16:9',
    reference_images: REFS.map((r) => blobOf(png(r))),
  };
  console.log(`omni: ${SHOTS.length} shots / ${total}s / ${mode} / ${REFS.length} refs`);
  SHOTS.forEach(([d], i) => console.log(`  shot ${i + 1}: ${d}s`));
  if (dry) process.exit(0);

  const t0 = Date.now();
  const output = await replicateRun('kwaivgi/kling-v3-omni-video', input);
  const out = path.join(DIR, `omni-${mode}.mp4`);
  await writeFile(out, output);
  const s = await stat(out);
  console.log(`wrote ${path.basename(out)} (${(s.size / 1048576).toFixed(1)} MB) in ${Math.round((Date.now() - t0) / 1000)} s`);
  process.exit(0);
}

/* ------------------------------------------------------------------- master */
if (stage === 'master') {
  const dur = (p) => Number(execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 "${p}"`).toString().trim());
  const clips = CLIPS.map((_, i) => path.join(DIR, `clip-0${i}.mp4`));
  if (!useOmni) for (const c of clips) if (!existsSync(c)) { console.error(`MISSING ${c} — run \`clips\` first`); process.exit(1); }

  // 1. Join the clips. The models land NEAR the target last frame, not exactly on it, so a
  //    3-frame dissolve at each seam absorbs the residual jump — a hard concat shows it.
  const X = 0.125;
  if (useOmni) {
    // Single-pass omni film: no seams to dissolve and the push-in is a real camera move,
    // so the join and zoompan steps below are skipped entirely.
    const src = path.join(DIR, 'omni-4k.mp4');
    if (!existsSync(src)) { console.error(`MISSING ${src} — run \`omni\` first`); process.exit(1); }
    clips.length = 0;
    clips.push(src);
  }
  const ds = clips.map(dur);
  const vf = clips.map((_, k) => `[${k}:v]fps=30,scale=1920:1080,setsar=1[v${k}]`);
  const af = clips.map((_, k) => `[${k}:a]aresample=48000,aformat=channel_layouts=stereo[a${k}]`);
  let vc = 'v0', ac = 'a0', acc = ds[0];
  for (let k = 1; k < clips.length; k++) {
    vf.push(`[${vc}][v${k}]xfade=transition=fade:duration=${X}:offset=${(acc - X).toFixed(3)}[vx${k}]`);
    af.push(`[${ac}][a${k}]acrossfade=d=${X}[ax${k}]`);
    vc = `vx${k}`; ac = `ax${k}`; acc += ds[k] - X;
  }
  const natural = path.join(DIR, 'film-ai-natural.mp4');
  sh(`ffmpeg -y -v error ${clips.map((c) => `-i "${c}"`).join(' ')} -filter_complex "${[...vf, ...af].join(';')}" -map "[${vc}]" -map "[${ac}]" -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p -c:a aac -b:a 192k -ar 48000 -ac 2 "${natural}"`);
  console.log(`joined ${clips.length} clips with ${X}s seam dissolves -> ${dur(natural).toFixed(1)}s`);

  // 2. Tighten to the briefed length. setpts scales the video clock; atempo scales audio
  //    tempo without shifting pitch.
  const SPEED = Math.min(2, Math.max(1, dur(natural) / target));   // atempo caps at 2x
  const film = path.join(DIR, 'film-ai.mp4');
  console.log(`AI film ${dur(natural).toFixed(1)}s -> ${SPEED.toFixed(3)}x -> ${(dur(natural) / SPEED).toFixed(1)}s`);
  if (SPEED === 1) sh(`ffmpeg -y -v error -i "${natural}" -c copy "${film}"`);
  else sh(`ffmpeg -y -v error -i "${natural}" -filter_complex "[0:v]setpts=PTS/${SPEED},fps=30[v];[0:a]atempo=${SPEED}[a]" -map "[v]" -map "[a]" -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p -c:a aac -b:a 192k -ar 48000 -ac 2 "${film}"`);

  // 2. the payoff: HOLD seconds frozen on the reveal frame, then the real recording scrolls
  const tail = path.join(DIR, 'film-web.mp4');
  const delay = Math.round(HOLD * 1000);
  sh(`ffmpeg -y -v error -ss ${WEB_IN} -t ${TAIL} -i "${WEBSITE}" -filter_complex "[0:v]crop=2290:1288:0:0,scale=1920:1080,fps=30,tpad=start_mode=clone:start_duration=${HOLD}[v];[0:a]adelay=${delay}|${delay}[a]" -map "[v]" -map "[a]" -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p -c:a aac -b:a 192k -ar 48000 -ac 2 "${tail}"`);

  // 3. The generated push-in stops at the wide room (end_image pulls the model back out,
  //    and there is no credit left to re-roll it), so finish the dolly optically: zoom
  //    into the measured screen rect so it fills frame, converging on the exact image the
  //    recording opens on. The AI frame goes soft at 2.6x, which the crossfade covers.
  const SCREEN = { cx: 899, cy: 376, z: 2.6, secs: 1.1 };
  const zoomed = path.join(DIR, 'film-ai-zoom.mp4');
  const zs = ((dur(film) - SCREEN.secs) * 30).toFixed(0);
  const zexpr = `if(lt(on,${zs}),1,1+${(SCREEN.z - 1).toFixed(2)}*(on-${zs})/${(SCREEN.secs * 30).toFixed(0)})`;
  // zoompan's x/y are the crop window's TOP-LEFT in original input coordinates, and the
  // window is iw/zoom x ih/zoom — not an offset into the zoomed image. Centre on the
  // screen by subtracting half the window, clamped so it never runs off the frame.
  const zx = `max(0,min(${SCREEN.cx}-(iw/zoom)/2,iw-iw/zoom))`;
  const zy = `max(0,min(${SCREEN.cy}-(ih/zoom)/2,ih-ih/zoom))`;
  if (useOmni) sh(`ffmpeg -y -v error -i "${film}" -c copy "${zoomed}"`);   // real push-in already there
  else sh(`ffmpeg -y -v error -i "${film}" -filter_complex "[0:v]zoompan=z='min(${zexpr},${SCREEN.z})':x='${zx}':y='${zy}':d=1:s=1920x1080:fps=30[v]" -map "[v]" -map 0:a -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p -c:a copy "${zoomed}"`);

  // 4. the match cut — the dissolve reads as the 2-4 frame motion blur
  const filmDur = dur(zoomed);
  const master = path.join(OUT, `ayesmaj-late${tag}-16x9.mp4`);
  const XF = 0.35;
  const off = (filmDur - XF).toFixed(3);
  // loudnorm to -14 LUFS: the raw generated audio sits near -32 dB mean, and Instagram
  // normalises to about -14 LUFS — without this the film plays noticeably quiet.
  sh(`ffmpeg -y -v error -i "${zoomed}" -i "${tail}" -filter_complex "[0:v][1:v]xfade=transition=fade:duration=${XF}:offset=${off}[v];[0:a][1:a]acrossfade=d=${XF},loudnorm=I=-14:TP=-1.5:LRA=11[a]" -map "[v]" -map "[a]" -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 192k -ar 48000 -ac 2 "${master}"`);

  // 4. Instagram deliverables. 16:9 is a poor feed citizen, so also cut 4:5 and 9:16.
  const pad = (w, h, name) => sh(`ffmpeg -y -v error -i "${master}" -filter_complex "[0:v]scale=${w}:-2,setsar=1[fg];[0:v]scale=-2:${h},crop=${w}:${h},boxblur=28:3,setsar=1[bg];[bg][fg]overlay=(W-w)/2:(H-h)/2" -c:v libx264 -preset slow -crf 20 -pix_fmt yuv420p -movflags +faststart -c:a aac -b:a 192k "${path.join(OUT, name)}"`);
  pad(1080, 1350, `ayesmaj-late${tag}-4x5-feed.mp4`);
  pad(1080, 1920, `ayesmaj-late${tag}-9x16-reels.mp4`);
  sh(`ffmpeg -y -v error -i "${master}" -an -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -movflags +faststart "${path.join(OUT, `ayesmaj-late${tag}-16x9-silent.mp4`)}"`);
  sh(`ffmpeg -y -v error -i "${master}" -frames:v 1 -update 1 "${path.join(OUT, `ayesmaj-late${tag}-poster.png`)}"`);

  for (const f of [`ayesmaj-late${tag}-16x9.mp4`, `ayesmaj-late${tag}-4x5-feed.mp4`, `ayesmaj-late${tag}-9x16-reels.mp4`, `ayesmaj-late${tag}-16x9-silent.mp4`]) {
    const p = path.join(OUT, f);
    const s = await stat(p);
    const d = execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 "${p}"`).toString().trim();
    console.log(`${f.padEnd(34)} ${(s.size / 1048576).toFixed(1)} MB  ${Number(d).toFixed(1)}s`);
  }
  process.exit(0);
}

console.error('usage: node scripts/late-film.mjs <keyframes|clips|master> [--only N] [--force] [--dry]');
process.exit(1);
