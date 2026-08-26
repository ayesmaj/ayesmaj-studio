/**
 * generate-project-covers.mjs — premium portfolio covers for every brand.
 * REFERENCE-FIRST: each brand's real featured image is passed to /images/edits
 * so the product, packaging, label text and logo are PRESERVED — the model only
 * elevates environment, lighting and composition. gpt-image-2. Metadata saved.
 * Usage: node scripts/generate-project-covers.mjs [--force] [slug ...]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { BRANDS } from "../src/data/brands.js";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
for (const line of fs.readFileSync(path.join(ROOT, ".env"), "utf8").split("\n")) {
  const m = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const KEY = process.env.OPENAI_API_KEY;
if (!KEY) { console.error("no OPENAI_API_KEY"); process.exit(1); }
const MODEL = process.env.OPENAI_IMAGE_MODEL || "gpt-image-2";
const FORCE = process.argv.includes("--force");
const ONLY = process.argv.slice(2).filter((a) => !a.startsWith("--"));

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

function promptFor(b) {
  return `Ultra-premium cinematic portfolio cover for the "${b.name}" project (${b.category}). ` +
    `CRITICAL: keep the product, packaging shape, label text and logo EXACTLY as they appear in the reference image — do not redraw, invent or alter ANY text, logo or label. ` +
    `Elevate everything around it: dramatic cinematic campaign lighting, richer premium environment, stronger depth and composition, refined color grading true to the brand's own palette. ` +
    `One clear focal point, gallery-grade, real campaign-cover energy. 4:5 portrait. No added text, no watermark.`;
}

async function gen(b, i, total) {
  const outDir = path.join(ROOT, "public", "generated", "projects", b.id);
  const dest = path.join(outDir, "cover.png");
  if (!FORCE && fs.existsSync(dest) && fs.statSync(dest).size > 40_000) {
    console.log(`⏭️  [${i}/${total}] ${b.id}`); return;
  }
  const ref = path.join(ROOT, "public", "brands", b.id, b.featured);
  if (!fs.existsSync(ref)) { console.log(`⚠️  [${i}/${total}] ${b.id}: missing ref ${b.featured}`); return; }
  fs.mkdirSync(outDir, { recursive: true });
  console.log(`🎨 [${i}/${total}] ${b.id} (ref: ${b.featured})…`);
  const prompt = promptFor(b);

  for (let a = 1; a <= 6; a++) {
    const fd = new FormData();
    fd.append("model", MODEL);
    fd.append("prompt", prompt);
    fd.append("size", "1024x1536");
    fd.append("quality", "high");
    const ext = path.extname(ref).toLowerCase();
    const mime = ext === ".png" ? "image/png" : ext === ".webp" ? "image/webp" : "image/jpeg";
    fd.append("image", new Blob([fs.readFileSync(ref)], { type: mime }), b.featured);
    const res = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST", headers: { Authorization: `Bearer ${KEY}` }, body: fd,
    });
    if (res.status === 429) { const w = a * 13000; console.log(`   429 → ${w / 1000}s`); await wait(w); continue; }
    const j = await res.json();
    if (j.error) throw new Error(`${b.id}: ${j.error.message}`);
    fs.writeFileSync(dest, Buffer.from(j.data[0].b64_json, "base64"));
    fs.writeFileSync(path.join(outDir, "cover.meta.json"), JSON.stringify({
      slug: b.id, prompt, reference: `brands/${b.id}/${b.featured}`,
      model: MODEL, size: "1024x1536", usage: "portfolio cover",
      generated: new Date().toISOString(),
    }, null, 2));
    console.log(`✅ ${b.id} → ${Math.round(fs.statSync(dest).size / 1024)}KB`);
    return;
  }
  throw new Error(`${b.id}: retries exhausted`);
}

const list = ONLY.length ? BRANDS.filter((b) => ONLY.includes(b.id)) : BRANDS;
console.log(`\n🎬 Project covers — ${MODEL} — ${list.length} brands (reference-first)\n`);
const fail = [];
for (let i = 0; i < list.length; i++) {
  try { await gen(list[i], i + 1, list.length); await wait(13000); }
  catch (e) { console.error(`❌ ${e.message}`); fail.push(list[i].id); }
}
console.log(`\n✨ done. failed: ${fail.length}${fail.length ? " → " + fail.join(", ") : ""}\n`);
