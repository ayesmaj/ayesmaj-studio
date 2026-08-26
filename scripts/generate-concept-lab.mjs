import { mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';

const MODEL = 'gpt-image-2';
const API_URL = 'https://api.openai.com/v1/images/generations';
const OUTPUT_DIR = path.resolve('public/concepts');
const STAGING_DIR = path.join(OUTPUT_DIR, '.gpt-image-2-staging');

const apiKey = process.env.OPENAI_API_KEY?.trim();

if (!apiKey) {
  console.error('OPENAI_API_KEY is not configured. No images were changed.');
  process.exit(1);
}

const sharedDirection = `
Create a premium self-initiated portfolio artwork for AYESMAJ Studio.
Portrait 4:5 editorial composition, sophisticated commercial art direction,
bright optimistic lighting, refined materials, vivid but tasteful color,
photorealistic CGI quality, strong depth, and a clean luxury advertising finish.
Keep the main subject in the upper and middle areas because the website adds a
dark title overlay across the bottom. No readable text, no logo, no watermark,
no border, no mockup frame, and no duplicated objects.
`;

const concepts = [
  {
    file: 'solara-fragrance.webp',
    prompt: `${sharedDirection}\nA radiant amber-gold perfume bottle on a sculptural sunlit pedestal, warm citrus glass reflections, floating translucent fabric, soft peach and golden sky gradient, premium fragrance campaign.`
  },
  {
    file: 'verdant-skincare.webp',
    prompt: `${sharedDirection}\nA botanical skincare serum and cream system in pale green glass, fresh leaves, dew, smooth stone and shallow water, luminous morning greenhouse atmosphere, clean sustainable beauty campaign.`
  },
  {
    file: 'volt-energy.webp',
    prompt: `${sharedDirection}\nA sleek fictional electric-lime energy drink can bursting through pink and cobalt liquid ribbons, icy condensation, kinetic studio lighting, bold youth culture launch campaign.`
  },
  {
    file: 'aura-roast.webp',
    prompt: `${sharedDirection}\nA fictional specialty coffee identity scene with a beautifully designed coral and cream coffee bag, ceramic cup, roasted beans and warm sunrise shadows, tactile premium packaging photography.`
  },
  {
    file: 'nexus-mobility.webp',
    prompt: `${sharedDirection}\nA futuristic compact electric mobility pod with pearl white bodywork and cyan illuminated details, displayed in a bright minimal architectural plaza, elegant sustainable transportation product CGI.`
  },
  {
    file: 'orbit-footwear.webp',
    prompt: `${sharedDirection}\nA single futuristic performance sneaker suspended above a sculptural running track, lime and silver materials, dynamic motion trails, crisp daylight, premium athletic footwear campaign.`
  },
  {
    file: 'casa-lume.webp',
    prompt: `${sharedDirection}\nA joyful Mediterranean interior with cream plaster arches, terracotta floor, cobalt accents, bougainvillea, sculptural furniture and strong coastal sunlight, aspirational architecture editorial.`
  },
  {
    file: 'mono-ai.webp',
    prompt: `${sharedDirection}\nA polished fictional AI analytics product shown across a thin laptop and floating translucent data cards, pearl background, cyan and violet charts, bright premium SaaS launch visual, legible interface shapes without readable words.`
  },
  {
    file: 'nocturne-chocolate.webp',
    prompt: `${sharedDirection}\nA luxury fictional chocolate box in deep plum and warm gold, opened to reveal geometric artisan chocolates, silk ribbon, dramatic but luminous studio reflections, sophisticated confectionery packaging campaign.`
  },
  {
    file: 'kinetiq-sportswear.webp',
    prompt: `${sharedDirection}\nA dynamic fashion athlete in sculptural coral and cobalt performance clothing, mid-stride in a sunlit modern arena, flowing fabric and graphic motion blur, editorial sportswear art direction, face not prominent.`
  }
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function generate(concept) {
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: MODEL,
        prompt: concept.prompt,
        size: '1024x1536',
        quality: 'high',
        output_format: 'webp',
        output_compression: 82,
        background: 'opaque',
        moderation: 'auto'
      }),
      signal: AbortSignal.timeout(180_000)
    });

    const payload = await response.json();
    if (response.ok && payload.data?.[0]?.b64_json) {
      return Buffer.from(payload.data[0].b64_json, 'base64');
    }

    const retryable = response.status === 429 || response.status >= 500;
    if (!retryable || attempt === 3) {
      const requestId = response.headers.get('x-request-id');
      const message = payload.error?.message || `HTTP ${response.status}`;
      throw new Error(`${concept.file}: ${message}${requestId ? ` (request ${requestId})` : ''}`);
    }

    await sleep(attempt * 15_000);
  }

  throw new Error(`${concept.file}: generation failed`);
}

await rm(STAGING_DIR, { recursive: true, force: true });
await mkdir(STAGING_DIR, { recursive: true });

console.log(`Generating ${concepts.length} Concept Lab images with ${MODEL}...`);

for (const [index, concept] of concepts.entries()) {
  console.log(`[${index + 1}/${concepts.length}] ${concept.file}`);
  const image = await generate(concept);
  if (image.length < 10_000) throw new Error(`${concept.file}: returned image is unexpectedly small`);
  await writeFile(path.join(STAGING_DIR, concept.file), image);
}

for (const concept of concepts) {
  const staged = path.join(STAGING_DIR, concept.file);
  const verified = await readFile(staged);
  await writeFile(path.join(OUTPUT_DIR, concept.file), verified);
}

await rm(STAGING_DIR, { recursive: true, force: true });
console.log(`Replaced ${concepts.length} Concept Lab images using ${MODEL}.`);

