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

export default function ModelViewer({ model, ratio = '16 / 10' }) {
  const [active, setActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const mountRef = useRef(null);
  const cleanupRef = useRef(null);

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
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
            model.file,
            resolve,
            (e) => { if (e.total) setProgress(Math.round((e.loaded / e.total) * 100)); },
            reject,
          );
        });
        if (dead) { renderer.dispose(); return; }

        // frame the model: center it, pull the camera back by its size
        const root = gltf.scene;
        const box = new THREE.Box3().setFromObject(root);
        const size = box.getSize(new THREE.Vector3());
        const center = box.getCenter(new THREE.Vector3());
        root.position.sub(center);
        scene.add(root);
        const maxDim = Math.max(size.x, size.y, size.z);
        camera.position.set(maxDim * 0.9, maxDim * 0.55, maxDim * 0.9);
        controls.target.set(0, 0, 0);
        camera.near = maxDim / 100;
        camera.far = maxDim * 10;
        camera.updateProjectionMatrix();
        setProgress(100);

        let raf;
        const tick = () => { raf = requestAnimationFrame(tick); controls.update(); renderer.render(scene, camera); };
        tick();

        const ro = new ResizeObserver(() => {
          camera.aspect = mount.clientWidth / mount.clientHeight;
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
  }, [active, model.file]);

  return (
    <figure className="idv-figure" style={{ margin: 0 }}>
      <div
        ref={mountRef}
        style={{
          position: 'relative',
          aspectRatio: ratio,
          borderRadius: 16,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.9)',
          background: 'linear-gradient(160deg, var(--idv-canvas), var(--idv-bone))',
          boxShadow: 'var(--idv-shadow)',
        }}
      >
        {!active ? (
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
              <span className="idv-mono-label">{model.weight}</span>
            </span>
          </button>
        ) : null}
        {active && progress < 100 && !error ? (
          <div aria-live="polite" style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', pointerEvents: 'none' }}>
            <span className="idv-mono-label" style={{ color: 'var(--idv-ink)' }}>LOADING MODEL · {progress}%</span>
          </div>
        ) : null}
        {error ? (
          <div role="alert" style={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center' }}>
            <span className="idv-mono-label">{error}</span>
          </div>
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
