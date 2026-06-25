/**
 * scripts/unify-style.mjs — one-off codemod.
 * Swaps the old HomeNav / Footer / HomeFooter for the new cinematic
 * AyesmajNav / AyesmajFooter across every page so the whole site matches Home.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PAGES = path.resolve(__dirname, "..", "src", "pages");

const NAV_IMPORT = "import AyesmajNav from '@/components/ayesmaj/AyesmajNav';";
const FOOTER_IMPORT = "import AyesmajFooter from '@/components/ayesmaj/AyesmajFooter';";

// Ordered replacements (footer before generic <Footer/> so anchors stay safe)
const REPLACEMENTS = [
  [/import HomeFooter from ['"]@\/components\/home\/HomeFooter['"];/g, FOOTER_IMPORT],
  [/import Footer from ['"]@\/components\/sections\/Footer['"];/g, FOOTER_IMPORT],
  [/<HomeFooter\s*\/>/g, "<AyesmajFooter />"],
  [/<Footer\s*\/>/g, "<AyesmajFooter />"],
  [/import HomeNav from ['"]@\/components\/home\/HomeNav['"];/g, NAV_IMPORT],
  [/<HomeNav\s*\/>/g, "<AyesmajNav />"],
];

let changed = 0;
for (const file of fs.readdirSync(PAGES).filter((f) => f.endsWith(".jsx"))) {
  const p = path.join(PAGES, file);
  let src = fs.readFileSync(p, "utf8");
  const before = src;
  for (const [re, rep] of REPLACEMENTS) src = src.replace(re, rep);

  // Collapse any accidental duplicate AyesmajFooter import lines (keep first)
  const lines = src.split("\n");
  let seenFooter = false;
  const out = lines.filter((l) => {
    if (l.trim() === FOOTER_IMPORT) {
      if (seenFooter) return false;
      seenFooter = true;
    }
    return true;
  });
  src = out.join("\n");

  if (src !== before) {
    fs.writeFileSync(p, src);
    changed++;
    console.log(`✅  ${file}`);
  }
}
console.log(`\n${changed} page(s) updated.`);
