"""interior-og — 1200x630 Open Graph images for the six Interior Design pages (brief §28 /og),
cropped from each page's hero in the web library. Usage: python scripts/interior-og.py"""
import os
from PIL import Image
from math import floor
PAGES = {'kitchens': 'kitchens/hero/01_kitchen_hero.webp', 'bathrooms': 'bathrooms/hero/01_bathroom_hero.webp',
         'furniture-decor': 'furniture-decor/hero/01_furniture_decor_hero.webp', 'apartments': 'apartments/hero/01_apartment_hero.webp',
         'homes': 'homes/hero/01_home_hero.webp', 'buildings': 'buildings/sections/02_building_full_exterior.webp'}
ROOT = 'public/interior-design/generated'; os.makedirs(f'{ROOT}/og', exist_ok=True)
for page, rel in PAGES.items():
    src = f'{ROOT}/{rel}'
    if not os.path.exists(src): print('  MISSING', page, src); continue
    im = Image.open(src).convert('RGB'); w, h = im.size; r = 1200 / 630
    if w / h > r: cw = floor(h * r); x0 = (w - cw) // 2; im = im.crop((x0, 0, x0 + cw, h))
    else: ch = floor(w / r); y0 = (h - ch) // 2; im = im.crop((0, y0, w, y0 + ch))
    im.resize((1200, 630), Image.LANCZOS).save(f'{ROOT}/og/{page}.jpg', 'JPEG', quality=86, optimize=True)
    print(f'  og/{page}.jpg  {os.path.getsize(f"{ROOT}/og/{page}.jpg")//1024} KB')
