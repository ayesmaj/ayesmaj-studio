/**
 * ModelViewer — interactive GLB viewer for the Interior Design world.
 *
 * Spec §35: no 3D engine loads until the visitor deliberately enters — the
 * card renders as a light placeholder and three.js (plus the model) is
 * dynamically imported only on tap, so the pages stay at zero 3D cost.
 * Interaction model follows the 21st.dev "Interactive Globe" pattern:
 * drag to rotate, auto-rotates while idle (disabled under reduced motion).
 */
import React, { useEffect, useRef, useState } from 'react';
import { Box, RotateCcw } from 'lucide-react';

/* ── memory guards (owner report 2026-08-21: the 3D files crashed the site) ──
   1. Only ONE viewer is live at a time: activating a second tears the first
      down, so the page never holds several WebGL contexts + models.
   2. Phones / small screens / low-memory devices get the `-lite` file
      (textures <= 256-512px, fewer vertices) — never the desktop build.
   3. A viewer that scrolls far out of view unloads itself and goes back to
      the tap card; a lost WebGL context shows a message instead of hanging. */
let liveViewer = null;               // () => void — deactivates the current viewer
const LITE_QUERY = '(max-width: 860px), (pointer: coarse)';
function wantsLite() {
  if (typeof window === 'undefined') return false;
  const mem = navigator.deviceMemory;          // Chrome/Android only; undefined elsewhere
  return window.matchMedia(LITE_QUERY).matches || (typeof mem === 'number' && mem <= 4);
}
function pickFile(model) {
  return wantsLite() && model.lite ? { file: model.lite, weight: model.liteWeight || model.weight } : { file: model.file, weight: model.weight };
}

/**
 * Props (owner 2026-08-21: "3D appears instantly, big and free in the whole section, text on the side"):
 *   auto   — load when the section scrolls near (no tap); unloads again when far away
 *   stage  — full-bleed surface: no card chrome, fills its container, full orbit, model shifted by `shift`
 *   shift  — horizontal offset of the model as a fraction of the width (+ = right), so copy can sit beside it
 */
export default function ModelViewer({ model, ratio = '16 / 10', auto = false, stage = false, shift = 0 }) {
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [pick, setPick] = useState(() => ({ file: model.file, weight: model.weight }));
  const mountRef = useRef(null);
  const cleanupRef = useRef(null);

  // decide desktop vs lite on the client (matchMedia is not available at prerender)
  useEffect(() => { setPick(pickFile(model)); }, [model]);

  // auto mode: activate when the section comes within reach (the unload observer below handles leaving)
  useEffect(() => {
    if (!auto || !mountRef.current || !('IntersectionObserver' in window)) return undefined;
    const io = new IntersectionObserver((entries) => { if (entries[entries.length - 1].isIntersecting) setActive(true); }, { rootMargin: '500px 0px' });
    io.observe(mountRef.current);
    return () => io.disconnect();
  }, [auto]);

  // one live viewer per page; unload when scrolled far away
  useEffect(() => {
    if (!active) return undefined;
    if (liveViewer) liveViewer();
    const off = () => { setActive(false); setProgress(0); };
    liveViewer = off;
    const io = mountRef.current && 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => { if (!entries[0].isIntersecting) off(); }, { rootMargin: '800px 0px' })
      : null;
    io?.observe(mountRef.current);
    return () => { io?.disconnect(); if (liveViewer === off) liveViewer = null; };
  }, [active]);

  useEffect(() => {
    if (!active || !mountRef.current) return undefined;
    let dead = false;

    (async () => {
      try {
        const [THREE, { GLTFLoader }, { DRACOLoader }, { OrbitControls }] = await Promise.all([
          import('three'),
          import('three/examples/jsm/loaders/GLTFLoader.js'),
          import('three/examples/jsm/loaders/DRACOLoader.js'),
          import('three/examples/jsm/controls/OrbitControls.js'),
        ]);
        if (dead) return;

        const mount = mountRef.current;
        const lite = wantsLite();
        const renderer = new THREE.WebGLRenderer({ antialias: !lite, alpha: true, powerPreference: 'high-performance' });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, lite ? 1.25 : 1.5));
        renderer.domElement.addEventListener('webglcontextlost', (ev) => {
          ev.preventDefault();
          if (!dead) setError('The 3D view was stopped to protect this device. Tap to try again.');
        }, { once: true });
        renderer.setSize(mount.clientWidth, mount.clientHeight);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        mount.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, mount.clientWidth / mount.clientHeight, 0.1, 2000);
        scene.add(new THREE.HemisphereLight(0xfff6e8, 0x8a8072, 1.2));
        const sun = new THREE.DirectionalLight(0xffffff, 2.0);
        sun.position.set(4, 8, 5);
        scene.add(sun);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.06;
        if (stage) { controls.enableZoom = false; controls.enablePan = false; renderer.domElement.style.touchAction = 'pan-y'; }
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        controls.autoRotate = !reduced;
        controls.autoRotateSpeed = 0.9;
        // idle → auto-rotate resumes; interaction pauses it (globe pattern)
        let idleTimer;
        controls.addEventListener('start', () => {
          controls.autoRotate = false;
          clearTimeout(idleTimer);
        });
        controls.addEventListener('end', () => {
          idleTimer = setTimeout(() => { if (!reduced) controls.autoRotate = true; }, 3500);
        });

        const draco = new DRACOLoader();
        draco.setDecoderPath('/draco/');
        const loader = new GLTFLoader();
        loader.setDRACOLoader(draco);

        const gltf = await new Promise((resolve, reject) => {
          loader.load(
            pick.file,
            resolve,
            (e) => { if (e.total) setProgress(Math.round((e.loaded / e.total) * 100)); },
            reject,
          );
        });
        if (dead) { renderer.dispose(); renderer.domElement.remove(); return; }

        // frame the model: center it, pull the camera back by its size
        const root = gltf.scene;
        const box = new THREE.Box3().setFromObject(root);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        root.position.sub(center);
        scene.add(root);
        const maxDim = Math.max(size.x, size.y, size.z);
        // Frame from the bounding sphere. Stage mode keeps the model within half the width so the copy beside it stays clear.
        const radius = size.length() / 2;
        const vfov = THREE.MathUtils.degToRad(camera.fov);
        let dist = radius / Math.sin(vfov / 2) * 0.95;
        if (stage) {
          // Fit the box, not the sphere: tall models fill ~85% of the height, wide ones stay within maxFrac of the width.
          const hfov = 2 * Math.atan(Math.tan(vfov / 2) * camera.aspect);
          const maxFrac = mount.clientWidth > 860 ? 0.44 : 0.92;
          const halfW = Math.max(size.x, size.z) * 0.6; // three-quarter view widens the footprint
          const distV = (size.y / 2) / Math.tan(vfov / 2) * 1.18;
          const distH = halfW / (Math.tan(hfov / 2) * maxFrac);
          dist = Math.max(distV, distH, radius * 1.05);
        }
        camera.position.set(0.66, 0.4, 0.66).normalize().multiplyScalar(dist);
        controls.target.set(0, 0, 0);
        camera.near = maxDim / 100;
        camera.far = maxDim * 10;
        const applyShift = () => { const w = mount.clientWidth, h = mount.clientHeight; if (shift && w > 860) camera.setViewOffset(w, h, -w * shift, 0, w, h); else camera.clearViewOffset(); };
        applyShift();
        camera.updateProjectionMatrix();
        setProgress(100);

        let raf;
        const tick = () => { raf = requestAnimationFrame(tick); controls.update(); renderer.render(scene, camera); };
        tick();

        const ro = new ResizeObserver(() => {
          camera.aspect = mount.clientWidth / mount.clientHeight;
          applyShift();
          camera.updateProjectionMatrix();
          renderer.setSize(mount.clientWidth, mount.clientHeight);
        });
        ro.observe(mount);

        cleanupRef.current = () => {
          cancelAnimationFrame(raf);
          clearTimeout(idleTimer);
          ro.disconnect();
          controls.dispose();
          draco.dispose();
          scene.traverse((o) => {
            if (o.geometry) o.geometry.dispose();
            if (o.material) {
              (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
                Object.values(m).forEach((v) => v?.isTexture && v.dispose());
                m.dispose();
              });
            }
          });
          renderer.dispose();
          renderer.domElement.remove();
        };
      } catch (e) {
        if (!dead) setError('The model could not be loaded on this device.');
      }
    })();

    return () => { dead = true; cleanupRef.current?.(); cleanupRef.current = null; };
  }, [active, pick.file, stage, shift]);

  return (
    <figure className={`idv-figure${stage ? ' idv-figure--stage' : ''}`} style={stage ? { position: 'absolute', inset: 0, margin: 0 } : { margin: 0 }}>
      <div
        ref={mountRef}
        style={stage ? { position: 'absolute', inset: 0 } : {
          position: 'relative',
          aspectRatio: ratio,
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.9)',
          background: 'linear-gradient(160deg, var(--idv-canvas), var(--idv-bone))',
          boxShadow: 'var(--idv-shadow)',
        }}
      >
        {!active && auto ? (
          <div className="idv-mono-label" style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', color: 'rgba(245,245,240,.6)' }} aria-live="polite">
            PREPARING {model.name.toUpperCase()} · {pick.weight}
          </div>
        ) : null}
        {!active && !auto ? (
          <button
            type="button"
            onClick={() => setActive(true)}
            aria-label={`Load the interactive 3D model: ${model.name}`}
            style={{
              position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
              gap: 0, border: 0, background: 'transparent', cursor: 'pointer',
            }}
          >
            <span style={{ display: 'grid', justifyItems: 'center', gap: 12 }}>
              <span style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--idv-ink)', color: '#FAF7F1', display: 'grid', placeItems: 'center' }}>
                <Box size={26} strokeWidth={1.6} aria-hidden="true" />
              </span>
              <span className="idv-mono-label" style={{ color: 'var(--idv-ink)' }}>TAP TO EXPLORE IN 3D</span>
              <span className="idv-mono-label">{pick.weight}</span>
            </span>
          </button>
        ) : null}
        {active && progress < 100 && !error ? (
          <div aria-live="polite" style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', pointerEvents: 'none' }}>
            <span className="idv-mono-label" style={{ color: stage ? 'rgba(245,245,240,.75)' : 'var(--idv-ink)' }}>LOADING MODEL · {progress}%</span>
          </div>
        ) : null}
        {error ? (
          <button
            type="button"
            role="alert"
            onClick={() => { setError(null); setActive(false); }}
            style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', border: 0, background: 'transparent', cursor: 'pointer', padding: 24 }}
          >
            <span className="idv-mono-label" style={{ textAlign: 'center', lineHeight: 1.6 }}>{error}</span>
          </button>
        ) : null}
        {active && progress === 100 && !error ? (
          <span className="idv-mono-label" style={{ position: 'absolute', left: 12, bottom: 10, display: 'inline-flex', alignItems: 'center', gap: 6, pointerEvents: 'none', color: 'var(--idv-graphite)' }}>
            <RotateCcw size={11} aria-hidden="true" /> DRAG TO ORBIT
          </span>
        ) : null}
      </div>
      <figcaption>
        <span>{model.name}</span>
        <span>{model.credit}</span>
      </figcaption>
    </figure>
  );
}
