/**
 * scripts/unify-palette.mjs — palette codemod.
 * Swaps the old green-black backgrounds + old gold accent for the new
 * brand black + brand gold across all pages, so every page matches.
 *
 * Safe: only touches src/pages/*.jsx. Per-brand accent colors in
 * src/data/brands.js are NOT touched.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES = path.resolve(__dirname, "..", "src", "pages");

// [from, to] — case-insensitive hex swaps
const SWAPS = [
  [/#07100A/gi, "#030303"],   // old green-black page bg
  [/#0B0F0C/gi, "#030303"],   // old dark bg
  [/#0B0B0C/gi, "#030303"],   // layout bg variant
  [/#080C09/gi, "#030303"],   // animations bg
  [/#0d1610/gi, "#0B0B0B"],   // card bg
  [/#C8A44E/gi, "#FFB000"],   // old gold → brand gold
  [/#C8A34F/gi, "#FFB000"],   // old gold variant
  [/#E8C96D/gi, "#FFD36A"],   // old gold-light → brand gold-light
  [/200,164,78/g, "255,176,0"], // old gold rgb → brand gold rgb
  [/200,163,78/g, "255,176,0"], // old gold rgb variant
];

let changed = 0;
for (const file of fs.readdirSync(PAGES).filter((f) => f.endsWith(".jsx"))) {
  const p = path.join(PAGES, file);
  let src = fs.readFileSync(p, "utf8");
  const before = src;
  for (const [re, to] of SWAPS) src = src.replace(re, to);
  if (src !== before) {
    fs.writeFileSync(p, src);
    changed++;
    console.log(`✅  ${file}`);
  }
}
console.log(`\n${changed} page(s) palette-unified.`);
