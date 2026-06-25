/**
 * scripts/generate-web-experience-assets.mjs
 * Generates the /WebExperiences page mockup assets via OpenAI gpt-image-1.
 * Key read ONLY from .env (OPENAI_API_KEY). Output → public/assets/ayesmaj/web-experiences/
 * Usage: node scripts/generate-web-experience-assets.mjs [--force]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

// load .env
const envPath = path.join(ROOT, ".env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const m = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
const KEY = process.env.OPENAI_API_KEY;
const MODEL = process.env.OPENAI_IMAGE_MODEL && process.env.OPENAI_IMAGE_MODEL !== "gpt-image-2"
  ? process.env.OPENAI_IMAGE_MODEL : "gpt-image-1"; // gpt-image-2 not a real model id
const FORCE = process.argv.includes("--force");

const OUT = path.join(ROOT, "public", "assets", "ayesmaj", "web-experiences");
fs.mkdirSync(OUT, { recursive: true });

if (!KEY) {
  console.warn("⚠️  No OPENAI_API_KEY — skipping. Page will use placeholder gradients.");
  process.exit(0);
}

const NT = "no text, no words, no letters, no logo, no watermark";
const ASSETS = [
  { file: "web-hero-desktop-showcase.jpg", size: "1536x1024",
    prompt: `Ultra-premium cinematic website-design mockup shown on a large futuristic desktop browser window, dark luxury interface, neon GREEN accents, gold CTA details, elegant interior-design website preview, black glass frame, reflective floor, cinematic lighting, 8K, ${NT}.` },
  { file: "web-hero-laptop-dashboard.jpg", size: "1536x1024",
    prompt: `Premium laptop website dashboard mockup, dark glass UI, GREEN and GOLD analytics panels, luxury AI-platform style, cinematic lighting, reflective black surface, 8K, ${NT}.` },
  { file: "web-hero-mobile-showcase.jpg", size: "1024x1536",
    prompt: `Premium smartphone website mockup, dark luxury skincare/product website aesthetic, GREEN and GOLD accents, cinematic lighting, black glass phone frame, vertical, 8K, ${NT}.` },
  { file: "project-luxeline.jpg", size: "1536x1024",
    prompt: `Premium luxury interior-design website screenshot mockup, dark elegant architecture, warm cinematic lighting, black and gold UI, 16:9, 8K, ${NT}.` },
  { file: "project-nexora.jpg", size: "1536x1024",
    prompt: `Premium AI analytics platform website screenshot mockup, dark UI, GREEN data visualization, dashboard cards, futuristic SaaS aesthetic, 16:9, 8K, ${NT}.` },
  { file: "project-natura.jpg", size: "1536x1024",
    prompt: `Premium skincare e-commerce website screenshot mockup, dark green luxury botanical aesthetic, product bottle, clean layout, gold accents, 16:9, 8K, ${NT}.` },
  { file: "web-ui-glass-card.jpg", size: "1024x1536",
    prompt: `Futuristic dark glass UI card panel, translucent material, GREEN neon outline, small abstract interface rows, icons and progress bars, isolated on pure black, cinematic, 8K, ${NT}.` },
];

async function gen(a, i) {
  const dest = path.join(OUT, a.file);
  if (!FORCE && fs.existsSync(dest) && fs.statSync(dest).size > 40_000) {
    console.log(`⏭️  [${i + 1}/${ASSETS.length}] ${a.file} exists`); return "skip";
  }
  console.log(`🎨  [${i + 1}/${ASSETS.length}] ${a.file}…`);
  for (let attempt = 1; attempt <= 6; attempt++) {
    const res = await fetch("https://api.openai.com/v1/images/generations", {
      method: "POST",
      headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: MODEL, prompt: a.prompt, size: a.size, quality: "high", n: 1 }),
    });
    if (res.status === 429) { const w = attempt * 13000; console.log(`   ⏳ rate-limited ${w/1000}s`); await new Promise(r => setTimeout(r, w)); continue; }
    const j = await res.json();
    if (j.error) throw new Error(j.error.message);
    fs.writeFileSync(dest, Buffer.from(j.data[0].b64_json, "base64"));
    console.log(`✅  ${a.file} → ${Math.round(fs.statSync(dest).size/1024)} KB`); return "ok";
  }
  throw new Error("rate-limit retries exhausted");
}

console.log(`\n🎬  Web Experiences assets — ${MODEL}\n`);
let ok = 0, skip = 0; const fail = [];
for (let i = 0; i < ASSETS.length; i++) {
  try { const r = await gen(ASSETS[i], i); if (r === "ok") { ok++; if (i < ASSETS.length - 1) await new Promise(r => setTimeout(r, 13000)); } else skip++; }
  catch (e) { console.error(`❌  ${ASSETS[i].file}: ${e.message}`); fail.push(ASSETS[i].file); }
}
console.log(`\n✨  ${ok} generated, ${skip} skipped, ${fail.length} failed.${fail.length ? " " + fail.join(", ") : ""}\n`);
