/**
 * generate-redesign-assets.mjs — AYESMAJ full-redesign image set (gpt-image-1).
 * - Key from .env only. Sequential w/ 429 backoff. Skips existing.
 * - Before/After pairs: AFTER generated first, then BEFORE is created via the
 *   images/edits endpoint USING THE AFTER AS REFERENCE → same subject, earlier stage.
 * Usage: node scripts/generate-redesign-assets.mjs [--force]
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
for (const line of fs.readFileSync(path.join(ROOT, ".env"), "utf8").split("\n")) {
  const m = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/);
  if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
}
const KEY = process.env.OPENAI_API_KEY;
if (!KEY) { console.error("no OPENAI_API_KEY"); process.exit(1); }
const MODEL = process.env.OPENAI_IMAGE_MODEL || "gpt-image-2";
const FORCE = process.argv.includes("--force");
const G = (p) => path.join(ROOT, "public", "generated", p);

const PALETTE = "black and charcoal base with soft ivory, champagne gold (#D8B75A) and violet-purple (#7A48FF) gradient accents";
const NT = "no text, no words, no letters, no logos, no watermark";

// ── flat generations ─────────────────────────────────────────────────────────
const GEN = [
  // ABOUT
  { dest: G("about/about-hero-world.png"), size: "1536x1024",
    prompt: `Epic premium cinematic creative-studio world combining branding, website design, AI content, storyboards, 3D animation and luxury visual identity into one artistic environment: floating glass screens, elegant packaging forms, sculptural product shapes, film-light beams, holographic wireframes. ${PALETTE}. Elegant futuristic composition, premium and curated, not messy. ${NT}. 8K.` },
  { dest: G("about/about-philosophy-01.png"), size: "1024x1024",
    prompt: `Artistic still-life representing "strategy with taste": a minimal chess piece carved from black marble on a beige stone plinth, single gold inlay line, soft cinematic light. ${PALETTE}. Gallery-grade, ${NT}.` },
  { dest: G("about/about-philosophy-02.png"), size: "1024x1024",
    prompt: `Artistic image representing "cinematic quality": a beam of warm film light passing through a glass prism onto dark velvet, subtle purple flare, anamorphic feel. ${PALETTE}. ${NT}.` },
  { dest: G("about/about-philosophy-03.png"), size: "1024x1024",
    prompt: `Artistic image representing "one visual system": perfectly aligned floating panes of dark glass forming one sculpture, each pane reflecting a different craft (color chip, wireframe, film frame), connected by one thin gold line. ${PALETTE}. ${NT}.` },
  { dest: G("about/about-philosophy-04.png"), size: "1024x1024",
    prompt: `Artistic image representing "future tools, human direction": an elegant human hand guiding a glowing violet holographic brush stroke above a dark drafting table. ${PALETTE}. Premium, ${NT}.` },
  // CONTACT
  { dest: G("contact/contact-luxury-bg.png"), size: "1536x1024",
    prompt: `Luxury bright creative-studio background: ivory and champagne tones, soft marble and warm stone surfaces, glass reflections, gentle gold and purple accent glow from one side, elegant cinematic atmosphere, clean premium conversion-section backdrop with generous empty space in the middle. ${NT}. High detail.` },
  { dest: G("contact/contact-side-visual.png"), size: "1024x1536",
    prompt: `Premium brand-world presentation scene: floating glass cards, elegant packaging box, website mockup pane and identity swatches arranged as a refined vertical composition, soft ivory/gold/purple aesthetic on light warm background, luxury creative-studio mood. ${NT}. High detail.` },
  // STORYBOARD — simple, obvious frames
  { dest: G("storyboards/sb-01-idea.png"), size: "1536x1024",
    prompt: `Storyboard frame 1 "Idea / Brief": clean cinematic photo of a designer's desk with an open notebook showing a simple product sketch, pencil, coffee, single warm lamp light, shallow depth of field. Instantly readable as the idea stage. ${PALETTE} mood, ${NT}.` },
  { dest: G("storyboards/sb-02-direction.png"), size: "1536x1024",
    prompt: `Storyboard frame 2 "Visual Direction": a moodboard wall with pinned color chips, fabric swatches, typography cards and reference photos, warm studio light. Instantly readable as choosing the look. ${PALETTE} mood, ${NT}.` },
  { dest: G("storyboards/sb-03-hero.png"), size: "1536x1024",
    prompt: `Storyboard frame 3 "Hero Build": one elegant unlabeled product bottle on a small film set with two softboxes and a dark backdrop being lit for its hero shot. Instantly readable as building the centerpiece. ${PALETTE}, ${NT}.` },
  { dest: G("storyboards/sb-04-expand.png"), size: "1536x1024",
    prompt: `Storyboard frame 4 "Expand the System": overhead flat-lay of one brand system — packaging box, bottle, business cards, phone showing a website, poster mock — all matching in ${PALETTE}. Instantly readable as one brand across many touchpoints. ${NT}.` },
  { dest: G("storyboards/sb-05-launch.png"), size: "1536x1024",
    prompt: `Storyboard frame 5 "Launch in Motion": a dark cinema-like room with a large bright screen playing a product film, light spilling onto seats, subtle motion streaks gold and purple. Instantly readable as the launch moment. ${NT}.` },
  // CLIENTS
  { dest: G("clients/clients-wall.png"), size: "1536x1024",
    prompt: `Premium gallery wall environment for a client-logo section: dark charcoal wall with softly lit empty brass frames and subtle picture lights, elegant museum atmosphere, shallow perspective, quiet gold and purple accent glow. Frames intentionally EMPTY. ${NT}. High detail.` },
];

// ── before/after pairs (after first, then before FROM the after) ─────────────
const PAIRS = [
  { after: G("before-after/web-after.png"),
    afterPrompt: `Premium cinematic website homepage mockup on a floating browser window: dark luxury interface, strong hero image of a product, elegant typography blocks, gold CTA button, ${PALETTE}. ${NT} beyond abstract UI shapes. 1536x1024 feel.`,
    before: G("before-after/web-before.png"),
    beforePrompt: `Recreate THIS SAME website as its weak earlier draft: flat gray wireframe boxes, placeholder image crosses, cramped generic layout, dull white background, no lighting, amateur feel. Same page structure and subject, clearly an unpolished early version. ${NT}.` },
  { after: G("before-after/product-after.png"),
    afterPrompt: `Final polished product render: one sculptural unlabeled cosmetic bottle in dark glass with gold cap, dramatic studio lighting, reflective black surface, purple rim light. ${PALETTE}. ${NT}.`,
    before: G("before-after/product-before.png"),
    beforePrompt: `Recreate THIS SAME bottle as a rough early pencil sketch on notebook paper: loose construction lines, annotations-like scribbles (illegible), flat, unrefined, clearly the concept stage of the same design. ${NT} readable.` },
  { after: G("before-after/space-after.png"),
    afterPrompt: `Final premium architectural visualization: warm luxury living space with stone wall, walnut wood, soft evening light, elegant furniture, ivory and gold palette with one violet accent artwork. ${NT}.`,
    before: G("before-after/space-before.png"),
    beforePrompt: `Recreate THIS SAME room as a rough architectural blueprint / pencil concept: white-on-blue line drawing or graphite sketch of the same layout and furniture, flat, technical, clearly the early planning stage. ${NT} readable.` },
  { after: G("before-after/brand-after.png"),
    afterPrompt: `Final refined brand identity board: abstract geometric brand mark embossed on dark paper, matching packaging box, foil color chips in gold/ivory/purple, arranged as an elegant flat-lay. ${NT} beyond abstract mark. High detail.`,
    before: G("before-after/brand-before.png"),
    beforePrompt: `Recreate THIS SAME identity as its messy early stage: pencil logo doodles on a crumpled sketchbook page, rejected variations crossed out, coffee stain, flat scan look — clearly the exploration stage of the same mark. ${NT} readable.` },
];

const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const exists = (p) => !FORCE && fs.existsSync(p) && fs.statSync(p).size > 30_000;

async function callWithRetry(fn, label) {
  for (let a = 1; a <= 6; a++) {
    const res = await fn();
    if (res.status === 429) { const w = a * 13000; console.log(`   429 → ${w / 1000}s`); await wait(w); continue; }
    const j = await res.json();
    if (j.error) throw new Error(`${label}: ${j.error.message}`);
    return j;
  }
  throw new Error(`${label}: retries exhausted`);
}

async function generate(dest, prompt, size) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const j = await callWithRetry(() => fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: { Authorization: `Bearer ${KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: MODEL, prompt, size, quality: "high", n: 1 }),
  }), path.basename(dest));
  fs.writeFileSync(dest, Buffer.from(j.data[0].b64_json, "base64"));
  console.log(`✅ ${path.relative(ROOT, dest)} (${Math.round(fs.statSync(dest).size / 1024)}KB)`);
}

// edits endpoint: the AFTER image is the reference → BEFORE is same subject, earlier stage
async function editFrom(refPath, dest, prompt) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  const j = await callWithRetry(() => {
    const fd = new FormData();
    fd.append("model", MODEL);
    fd.append("prompt", prompt);
    fd.append("size", "1536x1024");
    fd.append("quality", "high");
    fd.append("image", new Blob([fs.readFileSync(refPath)], { type: "image/png" }), "ref.png");
    return fetch("https://api.openai.com/v1/images/edits", {
      method: "POST", headers: { Authorization: `Bearer ${KEY}` }, body: fd,
    });
  }, path.basename(dest));
  fs.writeFileSync(dest, Buffer.from(j.data[0].b64_json, "base64"));
  console.log(`✅ ${path.relative(ROOT, dest)} [from ref]`);
}

console.log(`\n🎬 AYESMAJ redesign asset set — ${MODEL}\n`);
let fail = [];
for (const g of GEN) {
  if (exists(g.dest)) { console.log(`⏭️  ${path.relative(ROOT, g.dest)}`); continue; }
  try { await generate(g.dest, g.prompt, g.size); await wait(13000); }
  catch (e) { console.error(`❌ ${e.message}`); fail.push(g.dest); }
}
for (const p of PAIRS) {
  try {
    if (!exists(p.after)) { await generate(p.after, p.afterPrompt, "1536x1024"); await wait(13000); }
    else console.log(`⏭️  ${path.relative(ROOT, p.after)}`);
    if (!exists(p.before)) { await editFrom(p.after, p.before, p.beforePrompt); await wait(13000); }
    else console.log(`⏭️  ${path.relative(ROOT, p.before)}`);
  } catch (e) { console.error(`❌ ${e.message}`); fail.push(p.before); }
}
console.log(`\n✨ done. failed: ${fail.length}${fail.length ? " → " + fail.map(f => path.basename(f)).join(", ") : ""}\n`);
