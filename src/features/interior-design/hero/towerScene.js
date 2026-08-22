/**
 * towerScene — the real-time PATEL tower for the Interior Design hero.
 *
 * One WebGL context, one render per frame, two display surfaces:
 *   • glCanvas  — full stage, above the screen bezel, CSS clip-path'd to the
 *                 region ABOVE the screen's top edge (the breakout).
 *   • innerCanvas — a 2D canvas inside the screen that receives a drawImage of
 *                 the same frame, mapped through live DOM rects.
 * Both surfaces show the identical image, so the edge is seamless by
 * construction: no second camera, no clipping plane, no seam to tune.
 *
 * Ported from the PATEL site (see docs/patel-hero-source-audit.md): material
 * restyling by name, dusk lighting, LDR panorama IBL, ACES 1.12, led bird
 * flock. Three is imported here so it only loads when the hero mounts.
 */
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { BirdFlock } from './birdFlock.js';
import { HERO_ASSETS, SCENE, DUSK } from './hero.config.js';

/* PATEL material restyle (procedural-world.tsx styleTowerMaterial), verbatim values. */
function styleTowerMaterial(source, tier) {
  const name = source.name;
  if (name === 'm.GlassReal' || name === 'Glass ' || name === 'Glass') {
    return new THREE.MeshPhysicalMaterial({ name, color: '#111d30', metalness: 0.06, roughness: 0.24, clearcoat: 0.4, clearcoatRoughness: 0.24, envMapIntensity: tier === 'high' ? 1.15 : 1.0, transmission: 0, side: THREE.FrontSide });
  }
  if (name === 'Pool Water 03') {
    return new THREE.MeshPhysicalMaterial({ name, color: '#1c3a5c', metalness: 0.02, roughness: 0.12, clearcoat: 0.9, clearcoatRoughness: 0.08, transmission: 0.12, thickness: 0.18, transparent: true, opacity: 0.86, envMapIntensity: 1.65, side: THREE.FrontSide });
  }
  const m = source.clone();
  if (!m.isMeshStandardMaterial) return m;
  m.side = THREE.FrontSide; m.transparent = false; m.opacity = 1; m.depthWrite = true; m.envMapIntensity = 0.95;
  m.emissive.set('#000000'); m.emissiveIntensity = 0;
  if (name === '_WhiteGrey' || name === 'm.ConcreteStone.000' || name === 'm.StoneTile') { m.color.set(name === '_WhiteGrey' ? '#D6CEC1' : '#cfc5b6'); m.metalness = 0; m.roughness = name === 'm.StoneTile' ? 0.58 : 0.52; m.envMapIntensity = 0.75; }
  else if (name === 'm.DarkShine') { m.color.set('#b9a17a'); m.metalness = 0.7; m.roughness = 0.36; m.envMapIntensity = 1.05; }
  else if (name === '_Black.016' || name === '_Black.001') { m.color.set('#20262b'); m.metalness = 0.42; m.roughness = 0.25; }
  else if (name === 'metal') { m.color.set('#c2b39c'); m.metalness = 0.6; m.roughness = 0.32; }
  else if (name === 'AO') { m.color.set('#b9a17a'); m.metalness = 0.66; m.roughness = 0.38; m.envMapIntensity = 1.05; }
  else if (name === 'm.DarkStoneTile.001') { m.color.set('#302f31'); m.metalness = 0.08; m.roughness = 0.62; }
  else if (name === 'Grass 02') { m.color.set('#3e5a49'); m.metalness = 0; m.roughness = 0.92; }
  else if (name === 'Procedural Pool Tile') { m.color.set('#7699a6'); m.metalness = 0.05; m.roughness = 0.28; }
  m.needsUpdate = true;
  return m;
}

const deg = THREE.MathUtils.degToRad;
const damp = (a, b, lambda, dt) => THREE.MathUtils.damp(a, b, lambda, dt);

/**
 * @param {{ glCanvas: HTMLCanvasElement, innerCanvas: HTMLCanvasElement, host: HTMLElement,
 *           tier: 'high'|'medium'|'low'|'reduced', mobile: boolean,
 *           onProgress?: (p:number)=>void }} o
 */
export async function createTowerScene(o) {
  const { glCanvas, innerCanvas, host, tier, mobile } = o;
  const reduced = tier === 'reduced';
  const quality = reduced ? 'medium' : tier;
  const dpr = Math.min(window.devicePixelRatio || 1, SCENE.dpr[quality] ?? 1.25);

  const createdAt = performance.now();
  const renderer = new THREE.WebGLRenderer({ canvas: glCanvas, antialias: quality !== 'low', alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(dpr);
  let envTex = null, draco = null, flock = null;
  const onLost = (ev) => { ev.preventDefault(); stop(); o.onLost?.(); };
  glCanvas.addEventListener('webglcontextlost', onLost);
  let running = false, raf = 0;
  const stop = () => { running = false; host.dataset.running = '0'; cancelAnimationFrame(raf); window.removeEventListener('pointermove', onMove); };
  const onMove = (e) => pointerMove(e);
  let pointerMove = () => {};
  try {
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = SCENE.toneMappingExposure;
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(SCENE.fov, 1, SCENE.near, SCENE.far);

  // Lighting — PATEL DuskLighting (miami-environment.tsx), shadows off for the hero budget.
  scene.add(new THREE.AmbientLight(DUSK.ambient, 0.3));
  scene.add(new THREE.HemisphereLight(DUSK.skyFill, DUSK.ground, 0.9));
  const key = new THREE.DirectionalLight(DUSK.sun, 2.3); key.position.set(22, 9, 5); scene.add(key);
  const rim = new THREE.DirectionalLight(DUSK.rim, 0.42); rim.position.set(-14, 12, -12); scene.add(rim);
  const fill = new THREE.DirectionalLight(DUSK.fill, 1.25); fill.position.set(-18, 13, 10); scene.add(fill);

  // IBL — the PATEL medium-tier LDR panorama (PanoramaEnvironment: rotation 2.9, intensity 1.5).
  envTex = await new THREE.TextureLoader().loadAsync(HERO_ASSETS.environment);
  envTex.mapping = THREE.EquirectangularReflectionMapping;
  envTex.colorSpace = THREE.SRGBColorSpace;
  scene.environment = envTex;
  scene.environmentIntensity = SCENE.environmentIntensity;
  scene.environmentRotation.set(0, SCENE.environmentRotation, 0);

  // Tower
  draco = new DRACOLoader(); draco.setDecoderPath(HERO_ASSETS.draco);
  const loader = new GLTFLoader(); loader.setDRACOLoader(draco);
  const towerUrl = HERO_ASSETS.tower[quality === 'low' ? 'low' : quality === 'medium' ? 'medium' : 'high'];
  const expected = HERO_ASSETS.towerBytes[quality === 'low' ? 'low' : quality === 'medium' ? 'medium' : 'high'];
  const gltf = await new Promise((res, rej) => loader.load(towerUrl, res, (e) => { const total = e.total || expected; if (total && o.onProgress) o.onProgress(Math.min(0.92, e.loaded / total)); }, rej));
  const tower = gltf.scene;
  const styled = new Map();
  tower.traverse((obj) => {
    if (!obj.isMesh) return;
    const style = (mat) => { if (!styled.has(mat)) styled.set(mat, styleTowerMaterial(mat, quality)); return styled.get(mat); };
    obj.material = Array.isArray(obj.material) ? obj.material.map(style) : style(obj.material);
    obj.castShadow = false; obj.receiveShadow = false;
  });
  tower.position.y = SCENE.towerRootY;

  // Rig: yaw (parallax + drag) around the tower's own vertical axis.
  const rig = new THREE.Group();
  rig.add(tower);
  scene.add(rig);
  tower.updateWorldMatrix(true, true);
  const box = new THREE.Box3().setFromObject(tower);
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  rig.position.set(center.x, 0, center.z);
  tower.position.x -= center.x; tower.position.z -= center.z; // tower spins about its own centre
  const baseY = box.min.y, roofY = box.max.y, midY = baseY + size.y * (mobile ? 0.58 : 0.5);

  // Birds (PATEL led flock). Reduced motion: a few distant drifters, no pointer term.
  // Touch devices: a slow autonomous flock, fewer birds, no pointer term (brief §12 Mobile).
  {
    const bird = await loader.loadAsync(HERO_ASSETS.bird);
    const count = reduced ? SCENE.birds.reduced : mobile ? SCENE.birds.mobile : SCENE.birds[quality] ?? 8;
    const pointerEnabled = !reduced && !mobile && window.matchMedia('(pointer: fine)').matches;
    flock = new BirdFlock(bird.scene, bird.animations, { count, influence: reduced || mobile ? 0 : SCENE.birdInfluence, pointerEnabled });
    scene.add(flock.group);
  }
  o.onProgress?.(1);
  host.dataset.tier = tier; host.dataset.birds = String(flock ? flock.birds.length : 0);

  /* ── camera: level lens above the roof (straight verticals), view-offset
        so the tower sits where the layout wants it. ───────────────────── */
  const azimuth = deg(mobile ? SCENE.azimuthDeg.mobile : SCENE.azimuthDeg.desktop);
  const fillFrac = mobile ? SCENE.fill.mobile : SCENE.fill.desktop;
  const camY = roofY + 3.2;
  let w = 1, h = 1;
  const fx = mobile ? 0.5 : 0.58; // tower centre at this fraction of the canvas width
  const fy = mobile ? 0.52 : 0.5; // tower mid-height at this fraction of the canvas height
  function frame() {
    const rect = host.getBoundingClientRect();
    w = Math.max(1, Math.round(rect.width)); h = Math.max(1, Math.round(rect.height));
    renderer.setSize(w, h, false);
    const halfTan = Math.tan(deg(SCENE.fov) / 2);
    const distance = size.y / (fillFrac * 2 * halfTan) * (mobile ? 1.08 : 1);
    camera.position.set(center.x + Math.sin(azimuth) * distance, camY, center.z + Math.cos(azimuth) * distance);
    camera.lookAt(center.x, camY, center.z); // level
    const F = 2; // full frame is 2× the window; fov widened so the window keeps SCENE.fov
    camera.fov = THREE.MathUtils.radToDeg(2 * Math.atan(F * halfTan));
    camera.aspect = w / h;
    const fullW = w * F, fullH = h * F;
    const pitch = Math.atan((camY - midY) / distance);           // tower mid sits this far below the horizon
    const d = (Math.tan(pitch) / (F * halfTan)) * (fullH / 2);     // …which is this many full-frame pixels
    const x0 = fullW / 2 - fx * w;
    const y0 = fullH / 2 + d - fy * h;
    camera.setViewOffset(fullW, fullH, x0, y0, w, h);
    camera.updateProjectionMatrix();
  }
  frame();

  /* ── interaction ──────────────────────────────────────────────────── */
  const pointer = { x: 0, y: 0 };                    // NDC over the host
  const target = { yaw: 0, pitch: 0 };
  let dragYaw = 0, dragging = false, dragX = 0;
  const maxDrag = deg(SCENE.drag.maxDeg);
  pointerMove = (e) => {
    const r = rects.host;
    pointer.x = THREE.MathUtils.clamp(((e.clientX - r.left) / r.width) * 2 - 1, -1, 1);
    pointer.y = THREE.MathUtils.clamp(-(((e.clientY - r.top) / r.height) * 2 - 1), -1, 1);
    if (!reduced) { target.yaw = pointer.x * deg(SCENE.parallax.yawDeg); target.pitch = -pointer.y * deg(SCENE.parallax.pitchDeg); }
    if (dragging) { dragYaw = THREE.MathUtils.clamp(dragYaw + (e.clientX - dragX) * deg(SCENE.drag.degPerPx), -maxDrag, maxDrag); dragX = e.clientX; }
  };
  const onDown = (e) => { dragging = true; dragX = e.clientX; glCanvas.setPointerCapture?.(e.pointerId); glCanvas.style.cursor = 'grabbing'; };
  const onUp = (e) => { dragging = false; glCanvas.releasePointerCapture?.(e.pointerId); glCanvas.style.cursor = 'grab'; };
  glCanvas.addEventListener('pointerdown', onDown);
  glCanvas.addEventListener('pointerup', onUp);
  glCanvas.addEventListener('pointercancel', onUp);
  glCanvas.style.cursor = 'grab';
  glCanvas.style.touchAction = 'pan-y'; // page scroll stays natural on touch

  /* ── intro (brief §14 stages 3–5): tower resolves, rises, settles ───── */
  let intro = reduced ? 1 : 0;
  const introGate = createdAt + 450;
  const easeOut = (t) => 1 - Math.pow(1 - t, 3);

  /* ── frame loop with blit ─────────────────────────────────────────── */
  const ictx = innerCanvas.getContext('2d');
  const clock = new THREE.Clock();
  let lastClip = '', visible = false;
  // Layout reads happen only when something moved (resize / scroll), never per frame.
  const rects = { host: host.getBoundingClientRect(), g: null, s: null, dirty: true };
  const markDirty = () => { rects.dirty = true; };
  const readRects = () => { rects.host = host.getBoundingClientRect(); rects.g = glCanvas.getBoundingClientRect(); rects.s = innerCanvas.getBoundingClientRect(); rects.dirty = false; };
  const tick = () => {
    raf = requestAnimationFrame(tick);
    const dt = Math.min(clock.getDelta(), 0.05);
    if (intro < 1 && performance.now() > introGate) intro = Math.min(1, intro + dt / 1.6);
    const e = easeOut(intro);
    rig.position.y = (1 - e) * -2.4;
    rig.scale.setScalar(0.96 + 0.04 * e);
    if (!dragging) dragYaw = damp(dragYaw, 0, SCENE.drag.springLambda, dt);
    rig.rotation.y = damp(rig.rotation.y, target.yaw + dragYaw, 6, dt);
    rig.rotation.x = damp(rig.rotation.x, target.pitch, 6, dt);
    if (flock && intro > 0.3 && !document.hidden) flock.update(dt, camera, pointer);
    renderer.render(scene, camera);

    // blit the same frame into the screen's inner canvas, mapped through (cached) rects
    if (rects.dirty) readRects();
    const g = rects.g, s = rects.s;
    if (g.width > 0 && s.width > 0) {
      const k = glCanvas.width / g.width;
      const cw = Math.round(s.width * k), ch = Math.round(s.height * k);
      if (innerCanvas.width !== cw || innerCanvas.height !== ch) { innerCanvas.width = cw; innerCanvas.height = ch; }
      // snap the source offset to device pixels so both surfaces agree on the breakout line
      const sy = Math.round((s.top - g.top) * k), sx = Math.round((s.left - g.left) * k);
      ictx.clearRect(0, 0, cw, ch);
      ictx.drawImage(glCanvas, sx, sy, cw, ch, 0, 0, cw, ch);
      const clip = `inset(0 0 ${Math.max(0, Math.round(g.height - sy / k))}px 0)`;
      if (clip !== lastClip) { glCanvas.style.clipPath = clip; lastClip = clip; }
    }
  };
  const start = () => {
    if (running || !visible || document.hidden) return;
    running = true; host.dataset.running = '1'; rects.dirty = true; clock.start(); raf = requestAnimationFrame(tick);
    window.addEventListener('pointermove', onMove, { passive: true });
  };

  const ro = new ResizeObserver(() => { frame(); markDirty(); });
  ro.observe(host);
  const io = new IntersectionObserver((entries) => { visible = entries[entries.length - 1].isIntersecting; if (visible) start(); else stop(); }, { rootMargin: '120px 0px' });
  io.observe(host); // fires immediately with the current state
  const onVis = () => (document.hidden ? stop() : start());
  document.addEventListener('visibilitychange', onVis);
  window.addEventListener('scroll', markDirty, { passive: true });

  return {
    dispose() {
      stop(); ro.disconnect(); io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      window.removeEventListener('scroll', markDirty);
      glCanvas.removeEventListener('webglcontextlost', onLost);
      glCanvas.removeEventListener('pointerdown', onDown);
      glCanvas.removeEventListener('pointerup', onUp);
      glCanvas.removeEventListener('pointercancel', onUp);
      flock?.dispose();
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose();
        if (obj.material) (Array.isArray(obj.material) ? obj.material : [obj.material]).forEach((m) => { Object.values(m).forEach((v) => v?.isTexture && v.dispose()); m.dispose(); });
      });
      envTex?.dispose(); draco?.dispose(); renderer.dispose();
      renderer.forceContextLoss?.();
    },
  };
  } catch (err) {
    // Never leave an orphaned WebGL context behind (unmount mid-load, 404, decode failure).
    stop(); glCanvas.removeEventListener('webglcontextlost', onLost);
    flock?.dispose(); envTex?.dispose(); draco?.dispose(); renderer.dispose(); renderer.forceContextLoss?.();
    throw err;
  }
}
