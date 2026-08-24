"""
model-diet — put every interior-design GLB on a hard memory budget.

Owner report 2026-08-21: "the 3d files make the website crash". Cause: decoded
texture memory (building.glb ~766 MB of GPU RAM, kitchen-island ~475 MB,
house ~473 MB, the-patel ~323 MB) and a 4M-vertex Patel mesh.

Per model this produces two files:
  <key>.glb       desktop  — GPU texture budget <= 130 MB, vertices trimmed
  <key>-lite.glb  mobile   — GPU texture budget <=  40 MB, trimmed harder

Texture size is chosen from the model's own texture count (1024/512/256 so
that count x mipmapped-RGBA-size fits the budget), then meshes are simplified
with meshoptimizer via gltf-transform, then scripts/glb-texture-diet.py
re-encodes every texture as WebP at that cap. Draco stays (decoder in /draco/).

Usage: python scripts/model-diet.py [key ...]   (default: all models)
"""
import json
import os
import shutil
import struct
import subprocess
import sys
import tempfile

DIR = 'public/interior-design/models'
SRC_DIR = 'source-assets/models'       # untouched originals, outside public/ so they never deploy
MEM = {2048: 22.37, 1024: 5.59, 512: 1.4, 256: 0.35, 128: 0.09}  # MB per mipmapped RGBA texture
BUDGET = {'desktop': 130, 'lite': 40}
Q = {'desktop': 76, 'lite': 66}
# Hard vertex ceiling per tier. Buckets alone left huge scans huge (the Patel kept
# 2.8M verts -> multi-second Draco decode and a stuttering page). Target the ceiling
# directly so every served model lands in the same budget. Owner report 2026-08-23.
VERT_CEIL = {'desktop': 420_000, 'lite': 160_000}
# The Patel is the hero model: thin balcony fins speckle below ~1M verts, so it gets a
# larger budget (still ~7x lighter than the old cut).
VERT_CEIL_OVERRIDE = {'the-patel': {'desktop': 1_000_000, 'lite': 300_000}}

def ratio(verts, tier, key=None):
    if not verts: return 1.0
    ceil = VERT_CEIL_OVERRIDE.get(key, VERT_CEIL)[tier]
    r = min(1.0, ceil / verts)
    return round(max(r, 0.02), 3)

def glb_json(path):
    with open(path, 'rb') as f:
        hdr = f.read(12); clen, ctype = struct.unpack('<II', f.read(8)); js = f.read(clen)
    return json.loads(js)

def count_vertices(g):
    acc = g.get('accessors', [])
    n = 0
    for m in g.get('meshes', []):
        for p in m.get('primitives', []):
            a = p.get('attributes', {}).get('POSITION')
            if a is not None: n += acc[a]['count']
    return n

def pick_size(n_tex, budget):
    for s in (1024, 512, 256, 128):
        if n_tex * MEM[s] <= budget: return s
    return 128

def run(cmd):
    r = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if r.returncode != 0:
        print(r.stdout[-800:], r.stderr[-800:]); raise SystemExit(f'failed: {cmd}')

keys = sys.argv[1:] or sorted(f[:-4] for f in os.listdir(DIR) if f.endswith('.glb') and not f.endswith('-lite.glb'))
os.makedirs(SRC_DIR, exist_ok=True)
report = {}
for key in keys:
    served = f'{DIR}/{key}.glb'
    src = f'{SRC_DIR}/{key}.glb'
    if not os.path.exists(src):
        shutil.copy2(served, src)          # first run: stash the original
    g = glb_json(src)
    n_tex, verts = len(g.get('images', [])), count_vertices(g)
    report[key] = {'source_mb': round(os.path.getsize(src) / 1048576, 1), 'textures': n_tex, 'vertices': verts}
    for tier, out in (('desktop', served), ('lite', f'{DIR}/{key}-lite.glb')):
        size = pick_size(n_tex, BUDGET[tier]); r = ratio(verts, tier, key)
        with tempfile.TemporaryDirectory() as td:
            mid = os.path.join(td, 'mid.glb').replace('\\', '/')
            simplify = 'true' if r < 1.0 else 'false'
            run(f'npx --yes @gltf-transform/cli optimize "{src}" "{mid}" --compress draco --texture-compress false '
                f'--texture-size {size} --simplify {simplify} --simplify-ratio {r} --simplify-error 0.001 '
                f'--weld true --prune true --instance true --flatten false --join false')
            run(f'python scripts/glb-texture-diet.py "{mid}" "{out}" --max {size} --q {Q[tier]}')
        mb = os.path.getsize(out) / 1048576
        report[key][tier] = {'mb': round(mb, 1), 'tex': size, 'gpu_mb': round(n_tex * MEM[size]), 'ratio': r}
        print(f'{key:16s} {tier:8s} {mb:6.1f} MB  tex<={size:4d}  ~{n_tex * MEM[size]:4.0f} MB GPU  ratio {r}')
json.dump(report, open(f'{DIR}/diet-report.json', 'w'), indent=2)
print('DIET DONE')
