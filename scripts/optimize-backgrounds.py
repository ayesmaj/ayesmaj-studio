"""
optimize-backgrounds — turn generated masters into the served set.

For each master in public/interior-design/backgrounds/masters/:
  web/<name>.webp        2:1 desktop crop (max 2400 wide, never upscaled)
  web/<name>.avif        same crop, AVIF (skipped with a note if Pillow lacks AVIF)
  web/<name>-1080.webp   16:9 fallback crop
  mobile/<name>.webp     1080x1600 portrait crop, focus per prompts.json mobileFocus
and writes backgrounds-manifest.json (owner brief §2).

Usage: python scripts/optimize-backgrounds.py
"""
import json, os
from PIL import Image

ROOT = 'public/interior-design/backgrounds'
cfg = json.load(open(f'{ROOT}/prompts.json', encoding='utf-8'))

def crop_ratio(im, ratio, focus='center'):
    """Crop to width/height = ratio, anchoring horizontally by focus."""
    w, h = im.size
    if w / h > ratio:
        nw = int(h * ratio)
        x = {'left': 0, 'right': w - nw}.get(focus, (w - nw) // 2)
        return im.crop((x, 0, x + nw, h))
    nh = int(w / ratio)
    y = (h - nh) // 2
    return im.crop((0, y, w, y + nh))

def has_avif():
    try:
        Image.new('RGB', (8, 8)).save(os.devnull if os.name != 'nt' else 'NUL', 'AVIF')
        return True
    except Exception:
        return False

AVIF = has_avif()
manifest = []
for e in cfg:
    src = f"{ROOT}/masters/{e['file']}"
    if not os.path.exists(src):
        print(f"missing master: {e['file']}"); continue
    name = os.path.splitext(e['file'])[0]
    im = Image.open(src).convert('RGB')

    web = crop_ratio(im, 2.0)
    if web.width > 2400: web = web.resize((2400, 1200), Image.LANCZOS)
    web.save(f"{ROOT}/web/{name}.webp", 'WEBP', quality=80, method=6)
    avif_path = f"{ROOT}/web/{name}.avif"
    if AVIF:
        web.save(avif_path, 'AVIF', quality=55)
    fb = crop_ratio(im, 16 / 9)
    if fb.width > 1920: fb = fb.resize((1920, 1080), Image.LANCZOS)
    fb.save(f"{ROOT}/web/{name}-1080.webp", 'WEBP', quality=80, method=6)

    focus = {'right': 'right', 'left': 'left'}.get(e.get('mobileFocus', 'center'), 'center')
    mob = crop_ratio(im, 1080 / 1600, focus)
    mob = mob.resize((1080, 1600), Image.LANCZOS)
    mob.save(f"{ROOT}/mobile/{name}.webp", 'WEBP', quality=76, method=6)

    manifest.append({
        'id': e['id'], 'title': e['title'],
        'master': f"/interior-design/backgrounds/masters/{e['file']}",
        'webp': f"/interior-design/backgrounds/web/{name}.webp",
        'avif': f"/interior-design/backgrounds/web/{name}.avif" if AVIF else None,
        'fallback1080': f"/interior-design/backgrounds/web/{name}-1080.webp",
        'mobile': f"/interior-design/backgrounds/mobile/{name}.webp",
        'recommendedSections': e.get('recommendedSections', []),
        'textSafeArea': e['textSafeArea'], 'focalPosition': e['focalPosition'],
        'overlayStrength': e['overlayStrength'], 'prompt': e['prompt'],
    })
    sizes = [os.path.getsize(f"{ROOT}/web/{name}.webp") // 1024, os.path.getsize(f"{ROOT}/mobile/{name}.webp") // 1024]
    print(f"{name}: master {im.size[0]}x{im.size[1]} -> web {web.size[0]}x{web.size[1]} {sizes[0]}KB, mobile {sizes[1]}KB{'' if AVIF else ' (no AVIF support in this Pillow)'}")

json.dump(manifest, open(f'{ROOT}/backgrounds-manifest.json', 'w', encoding='utf-8'), indent=1)
print(f"manifest: {len(manifest)} assets, avif={'yes' if AVIF else 'no'}")
