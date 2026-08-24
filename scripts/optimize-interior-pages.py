"""
optimize-interior-pages — builds the web library + manifest for the Interior
Design pages from scripts/interior-pages-media.json (owner brief §28, §39).

For every entry: source = the real asset (existing/import) or the generated
master in source-assets/interior-generated/<page>/<id>.png (edit/text). Writes
  public/interior-design/generated/<page>/<section>/<id>.webp   (max width by class)
  public/interior-design/generated/<page>/mobile/<id>.webp      (1080x1350 dedicated crop, heroes)
  public/interior-design/generated/navigation/<id>.webp         (800x500, 16:10)
and src/content/interior-design-generated-media.ts with measured sizes.

Usage: python scripts/optimize-interior-pages.py [--page p] [--status approved|review]
"""
import json, os, sys, datetime
from PIL import Image

MAXW = {'hero': 2400, 'wide': 2400, 'editorial': 1800, 'card': 1200, 'thumb': 800}
ROOT = 'public/interior-design/generated'
args = sys.argv[1:]
only_page = args[args.index('--page') + 1] if '--page' in args else None
gen_status = args[args.index('--status') + 1] if '--status' in args else 'review'
entries = json.load(open('scripts/interior-pages-media.json', encoding='utf-8'))
today = datetime.date.today().isoformat()
manifest, missing = [], []

def save_webp(im, path, q=84):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, 'WEBP', quality=q, method=6)

def crop_to(im, ratio, focus=0.5):
    w, h = im.size
    if w / h > ratio:  # too wide → crop width around focus
        cw = round(h * ratio); x0 = int(max(0, min(w - cw, w * focus - cw / 2))); return im.crop((x0, 0, x0 + cw, h))
    ch = round(w / ratio); y0 = (h - ch) // 2; return im.crop((0, y0, w, y0 + ch))

for e in entries:
    if only_page and e['page'] != only_page: continue
    gen = e['type'] in ('edit', 'text')
    src = f"source-assets/interior-generated/{e['page']}/{e['id']}.png" if gen else e['sources'][0]
    if not os.path.exists(src):
        missing.append(f"{e['page']}/{e['id']} ← {src}"); continue
    im = Image.open(src).convert('RGB')
    if e['page'] == 'navigation':
        out = f"{ROOT}/navigation/{e['id']}.webp"
        save_webp(crop_to(im, 16 / 10, e.get('focus', 0.5)).resize((800, 500), Image.LANCZOS), out, 80)
        web, mobile, widths = out, None, []
    else:
        section = e['section'] or 'sections'
        web = f"{ROOT}/{e['page']}/{section}/{e['id']}.webp"
        w = min(im.width, MAXW.get(e['cls'], 1800))
        save_webp(im.resize((w, round(im.height * w / im.width)), Image.LANCZOS) if w != im.width else im, web)
        # responsive variants: phones and mid layouts get far fewer pixels
        widths = [w]
        for vw in (1200, 800):
            if w > vw + 80:
                save_webp(im.resize((vw, round(im.height * vw / im.width)), Image.LANCZOS), web.replace('.webp', f'-w{vw}.webp'), 80)
                widths.append(vw)
        mobile = None
        if e.get('mobile') == 'crop':
            mobile = f"{ROOT}/{e['page']}/mobile/{e['id']}.webp"
            save_webp(crop_to(im, 1080 / 1350, e.get('focus', 0.5)).resize((1080, 1350), Image.LANCZOS), mobile, 82)
    wim = Image.open(web); W, H = wim.size
    from math import gcd
    g = gcd(W, H); ar = f"{W // g}:{H // g}" if max(W // g, H // g) <= 32 else f"{W / H:.2f}:1"
    manifest.append({
        'id': e['id'], 'page': e['page'], 'section': e['section'] or ('navigation' if e['page'] == 'navigation' else 'sections'),
        'file': '/' + web.replace('public/', '', 1), 'mobileFile': ('/' + mobile.replace('public/', '', 1)) if mobile else None,
        'alt': e['alt'], 'width': W, 'height': H, 'aspectRatio': ar, 'prompt': e.get('prompt', ''),
        'widths': sorted(widths) if e['page'] != 'navigation' else None,
        'sourceReferences': e['sources'], 'generatedAt': today, 'status': gen_status if gen else 'existing',
        'architectureLocked': bool(e.get('lock')), 'project': e.get('project'),
    })
    print(f"  {e['page']:16s} {e['id']:32s} {W}x{H}{'  +mobile' if mobile else ''}{'  [' + e['type'] + ']' if gen else ''}")

# manifest TS: replace the GENERATED_MEDIA array body
p = 'src/content/interior-design-generated-media.ts'
t = open(p, encoding='utf-8').read()
start = t.index('export const GENERATED_MEDIA: GeneratedMedia[] = ['); end = t.index('];', start) + 2
body = 'export const GENERATED_MEDIA: GeneratedMedia[] = ' + json.dumps(manifest, indent=2, ensure_ascii=False) + ';'
t = t[:start] + body + t[end:]
open(p, 'w', encoding='utf-8', newline='\n').write(t)
print(f"manifest: {len(manifest)} entries written; missing sources: {len(missing)}")
for m in missing: print('  MISSING', m)
