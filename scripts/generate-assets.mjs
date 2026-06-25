/**
 * scripts/generate-assets.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Generates the AYESMAJ Studios cinematic hero assets with OpenAI GPT Image.
 * Reads the API key ONLY from the environment (.env) — never hardcoded.
 *
 * Usage:
 *   node scripts/generate-assets.mjs            (reads .env)
 *   node scripts/generate-assets.mjs --force    (regenerate even if file exists)
 *
 * Output → public/assets/ayesmaj/hero/
 *
 * If OPENAI_API_KEY is missing, the script warns and exits 0 (the website still
 * works using whatever placeholder assets already exist).
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// ── Load .env manually (no dependency) ───────────────────────────────────────
const envPath = path.join(ROOT, ".env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}

const KEY   = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_IMAGE_MODEL || "gpt-image-1";
const FORCE = process.argv.includes("--force");

if (!KEY) {
  console.warn("⚠️  OPENAI_API_KEY not set — skipping asset generation.");
  console.warn("    The website will use existing placeholder assets.");
  process.exit(0);
}

const OUT = path.join(ROOT, "public", "assets", "ayesmaj", "hero");
fs.mkdirSync(OUT, { recursive: true });

// ── Asset definitions ────────────────────────────────────────────────────────
const NOTEXT =
  "no text, no words, no letters, no logos, no watermark, no captions";

const ASSETS = [
  {
    file: "hero-world-website.png",
    size: "1024x1536", // portrait — fills a tall diagonal panel
    prompt:
      `Ultra-premium cinematic futuristic website-design world. Deep black environment, glowing neon GREEN UI light (#B3FF3F, #6CFF8F). Floating browser windows, responsive website mockups, mobile phone screens, clean luxury web dashboards and interface grids receding into deep perspective. Reflective black floor, volumetric light, high-end creative studio atmosphere — elegant, not cluttered. Cinematic lighting, sharp focus, 8K, ${NOTEXT}.`,
  },
  {
    file: "hero-world-ai-marketing.png",
    size: "1024x1536",
    prompt:
      `Ultra-premium cinematic AI marketing world. Deep black environment with warm GOLD and ORANGE neon glow (#FFB000, #FF8A00). Floating cinematic video frames, AI campaign dashboards, social-media content panels, analytics graphs and brand-film thumbnails arranged in elegant depth. A lone silhouette stands before a glowing orange portal at the center. Reflective floor, premium advertising-studio mood. Cinematic lighting, 8K, ${NOTEXT}.`,
  },
  {
    file: "hero-world-3d.png",
    size: "1024x1536",
    prompt:
      `Ultra-premium cinematic 3D world-design environment. Deep black with PURPLE / VIOLET neon atmosphere (#9B5CFF, #C084FC). Floating 3D models, a wireframe sports car, polygon terrain, holographic futuristic architecture and a distant glowing planet. Immersive digital landscape, reflective floor, worldbuilding-studio feel. Cinematic lighting, sharp, 8K, ${NOTEXT}.`,
  },
  {
    file: "hero-full-composite.png",
    size: "1536x1024", // landscape — full-bleed fallback / OG image
    prompt:
      `Ultra-premium cinematic triptych: one wide image split into three diagonal worlds. LEFT third glows neon GREEN with floating website mockups and UI panels. CENTER third glows GOLD-ORANGE with a silhouette before a radiant portal and floating cinematic video frames. RIGHT third glows PURPLE with 3D wireframe models, holographic city and a planet. Deep black base, reflective floor, diagonal glowing dividers between the three worlds. Top-tier creative-studio key art, cinematic lighting, 8K, ${NOTEXT}.`,
  },
  {
    file: "logo-glow.png",
    size: "1024x1024",
    prompt:
      `A single premium futuristic capital letter "A" monogram, sharp geometric angular design, polished metallic white material with subtle GOLD on the left edge and PURPLE on the right edge rim-light. Pure black background, cinematic glow, luxury creative-studio identity, centered, symmetrical, high resolution. Only the letter A symbol, ${NOTEXT}.`,
  },
];

// ── Generate one asset ───────────────────────────────────────────────────────
async function generate(asset, index) {
  const dest = path.join(OUT, asset.file);
  if (!FORCE && fs.existsSync(dest) && fs.statSync(dest).size > 40_000) {
    console.log(`⏭️   [${index + 1}/${ASSETS.length}] ${asset.file} — exists, skipping`);
    return "skip";
  }

  console.log(`🎨  [${index + 1}/${ASSETS.length}] ${asset.file} — generating…`);

  // Retry on 429 rate limit (5 images/min on standard tier)
  for (let attempt = 1; attempt <= 6; attempt++) {
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: MODEL,
        prompt: asset.prompt,
        size: asset.size,
        quality: "high",
        n: 1,
      }),
    });

    if (res.status === 429) {
      const wait = attempt * 13000;
      console.log(`    ⏳ rate limited, waiting ${wait / 1000}s (attempt ${attempt}/6)…`);
      await new Promise((r) => setTimeout(r, wait));
      continue;
    }

    const json = await res.json();
    if (json.error) throw new Error(json.error.message);

    const b64 = json.data[0].b64_json;
    fs.writeFileSync(dest, Buffer.from(b64, "base64"));
    console.log(`✅  [${index + 1}/${ASSETS.length}] ${asset.file} → ${Math.round(fs.statSync(dest).size / 1024)} KB`);
    return "ok";
  }
  throw new Error("gave up after 6 rate-limit retries");
}

// ── Run sequentially (respect rate limit) ────────────────────────────────────
console.log(`\n🎬  AYESMAJ asset generator — model: ${MODEL}`);
console.log(`    Output: ${OUT}\n`);

let ok = 0, skip = 0;
const fail = [];
for (let i = 0; i < ASSETS.length; i++) {
  try {
    const r = await generate(ASSETS[i], i);
    if (r === "ok") { ok++; if (i < ASSETS.length - 1) await new Promise(r => setTimeout(r, 13000)); }
    else skip++;
  } catch (e) {
    console.error(`❌  ${ASSETS[i].file}: ${e.message}`);
    fail.push(ASSETS[i].file);
  }
}

console.log(`\n✨  Done — ${ok} generated, ${skip} skipped, ${fail.length} failed.`);
if (fail.length) console.log("   Failed:", fail.join(", "));
console.log("");
