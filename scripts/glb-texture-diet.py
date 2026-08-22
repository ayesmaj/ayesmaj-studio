"""
glb-texture-diet — cap and re-encode every texture inside a .glb as WebP.

Why not gltf-transform's own --texture-compress: its libvips build fails on
some 32-bit/odd PNGs in these models (2026-08-21). Pillow handles them all.

What it does (GLB 2.0, single BIN chunk):
  * decodes each image bufferView with Pillow
  * resizes so the longest side <= MAX (power-of-two friendly via thumbnail)
  * re-encodes as WebP (quality Q), keeps alpha when present
  * rewrites the BIN chunk with only the bytes still referenced
  * switches textures to EXT_texture_webp (three.js GLTFLoader supports it)

Usage: python scripts/glb-texture-diet.py in.glb out.glb [--max 1024] [--q 78]
"""
import io
import json
import struct
import sys
from PIL import Image

args = sys.argv[1:]
src, dst = args[0], args[1]
MAX = int(args[args.index('--max') + 1]) if '--max' in args else 1024
Q = int(args[args.index('--q') + 1]) if '--q' in args else 78

data = open(src, 'rb').read()
magic, version, length = struct.unpack_from('<III', data, 0)
assert magic == 0x46546C67, 'not a GLB'
off = 12
chunks = []
while off < length:
    clen, ctype = struct.unpack_from('<II', data, off)
    chunks.append((ctype, data[off + 8: off + 8 + clen]))
    off += 8 + clen
gltf = json.loads(chunks[0][1].decode('utf-8'))
bin_old = next(c for t, c in chunks if t == 0x004E4942)

bvs = gltf['bufferViews']
images = gltf.get('images', [])
image_bv = {img['bufferView'] for img in images if 'bufferView' in img}

# Rebuild BIN: copy non-image bufferViews verbatim, replace image ones with WebP
out = bytearray()
new_bvs = []
before = after = 0
for i, bv in enumerate(bvs):
    start = bv.get('byteOffset', 0)
    blob = bin_old[start:start + bv['byteLength']]
    if i in image_bv:
        before += len(blob)
        im = Image.open(io.BytesIO(blob))
        im.load()
        has_alpha = im.mode in ('RGBA', 'LA') or (im.mode == 'P' and 'transparency' in im.info)
        im = im.convert('RGBA' if has_alpha else 'RGB')
        if max(im.size) > MAX:
            im.thumbnail((MAX, MAX), Image.LANCZOS)
        buf = io.BytesIO()
        im.save(buf, 'WEBP', quality=Q, method=6)
        blob = buf.getvalue()
        after += len(blob)
    # 4-byte alignment per spec
    while len(out) % 4:
        out.append(0)
    nbv = dict(bv)
    nbv['byteOffset'] = len(out)
    nbv['byteLength'] = len(blob)
    new_bvs.append(nbv)
    out.extend(blob)
while len(out) % 4:
    out.append(0)

gltf['bufferViews'] = new_bvs
gltf['buffers'][0]['byteLength'] = len(out)
for img in images:
    if 'bufferView' in img:
        img['mimeType'] = 'image/webp'
# EXT_texture_webp: texture.source -> extensions.EXT_texture_webp.source
for tex in gltf.get('textures', []):
    if 'source' in tex:
        tex.setdefault('extensions', {})['EXT_texture_webp'] = {'source': tex.pop('source')}
for key in ('extensionsUsed', 'extensionsRequired'):
    lst = gltf.setdefault(key, [])
    if 'EXT_texture_webp' not in lst:
        lst.append('EXT_texture_webp')

js = json.dumps(gltf, separators=(',', ':')).encode('utf-8')
while len(js) % 4:
    js += b' '
total = 12 + 8 + len(js) + 8 + len(out)
with open(dst, 'wb') as f:
    f.write(struct.pack('<III', 0x46546C67, 2, total))
    f.write(struct.pack('<II', len(js), 0x4E4F534A)); f.write(js)
    f.write(struct.pack('<II', len(out), 0x004E4942)); f.write(out)
print(f'{src.split("/")[-1]}: textures {before/1048576:.1f} -> {after/1048576:.1f} MB, file {len(data)/1048576:.1f} -> {total/1048576:.1f} MB (max {MAX}px, q{Q})')
