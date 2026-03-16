import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeContactBackground({ reducedMotion }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || reducedMotion) return;

    const container = containerRef.current;
    let W = window.innerWidth, H = window.innerHeight;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(55, W / H, 0.1, 500);
    camera.position.z = 22;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ── Magnetic particle field ────────────────────────────────────────────
    const COUNT = 1800;
    const geo   = new THREE.BufferGeometry();
    const pos   = new Float32Array(COUNT * 3);
    const originPos = new Float32Array(COUNT * 3); // home positions
    const col   = new Float32Array(COUNT * 3);
    const green = new THREE.Color(0x00ff77);
    const teal  = new THREE.Color(0x00ccff);
    const white = new THREE.Color(0x666666);

    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 65;
      const z = (Math.random() - 0.5) * 60;
      pos[i * 3] = x;  pos[i * 3 + 1] = y;  pos[i * 3 + 2] = z;
      originPos[i * 3] = x; originPos[i * 3 + 1] = y; originPos[i * 3 + 2] = z;
      const base = Math.random() < 0.3 ? teal : Math.random() < 0.5 ? green : white;
      const c = base.clone().lerp(white, Math.random() * 0.6);
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));

    const ptMat = new THREE.PointsMaterial({
      size: 0.09, vertexColors: true, transparent: true, opacity: 0.55,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    });
    const particles = new THREE.Points(geo, ptMat);
    scene.add(particles);

    // ── Floating letter / symbol strands (line segments) ──────────────────
    const strandGroup = new THREE.Group();
    for (let s = 0; s < 8; s++) {
      const pts = [];
      let cx = (Math.random() - 0.5) * 50;
      let cy = (Math.random() - 0.5) * 30;
      const cz = -8 - Math.random() * 14;
      const segments = 8 + Math.floor(Math.random() * 10);
      for (let p = 0; p <= segments; p++) {
        cx += (Math.random() - 0.5) * 2.5;
        cy += (Math.random() - 0.5) * 2.5;
        pts.push(new THREE.Vector3(cx, cy, cz));
      }
      const sGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const sMat = new THREE.LineBasicMaterial({
        color: Math.random() > 0.5 ? 0x00ff77 : 0x00aaff,
        transparent: true, opacity: 0.05 + Math.random() * 0.07,
      });
      const strand = new THREE.Line(sGeo, sMat);
      strand.userData = {
        floatOffset: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.004,
      };
      strandGroup.add(strand);
    }
    scene.add(strandGroup);

    // ── Glowing center orb ────────────────────────────────────────────────
    const orbGeo = new THREE.SphereGeometry(1.6, 32, 32);
    const orbMat = new THREE.MeshBasicMaterial({
      color: 0x00ff77, wireframe: true, transparent: true, opacity: 0.04,
    });
    const centerOrb = new THREE.Mesh(orbGeo, orbMat);
    scene.add(centerOrb);

    // ── Click burst ───────────────────────────────────────────────────────
    const bursts = [];
    const addBurst = (x, y) => {
      const ndc = new THREE.Vector2(
        (x / W) * 2 - 1,
        -(y / H) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(ndc, camera);
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      const pt = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, pt);

      for (let r = 0; r < 4; r++) {
        const rGeo = new THREE.RingGeometry(0.04, 0.1, 52);
        const rMat = new THREE.MeshBasicMaterial({
          color: r % 2 === 0 ? 0x00ff77 : 0x00ccff,
          transparent: true, opacity: 0.75 - r * 0.15,
          side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false,
        });
        const ring = new THREE.Mesh(rGeo, rMat);
        ring.position.copy(pt);
        ring.userData = { age: 0, delay: r * 0.12, maxAge: 1.8 };
        scene.add(ring);
        bursts.push(ring);
      }

      // Shockwave: repel nearby particles
      const pa = geo.attributes.position.array;
      for (let i = 0; i < COUNT; i++) {
        const dx = pa[i * 3] - pt.x;
        const dy = pa[i * 3 + 1] - pt.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 12) {
          const force = (12 - dist) / 12 * 3.5;
          pa[i * 3]     += (dx / dist || 0) * force;
          pa[i * 3 + 1] += (dy / dist || 0) * force;
        }
      }
      geo.attributes.position.needsUpdate = true;
    };
    window.addEventListener('click', e => addBurst(e.clientX, e.clientY));

    // ── Mouse attraction ──────────────────────────────────────────────────
    let mx = 0, my = 0, tmx = 0, tmy = 0;
    let mouse3D = new THREE.Vector3(0, 0, 0);
    const onMove = e => {
      tmx = (e.clientX / W)  * 2 - 1;
      tmy = -(e.clientY / H) * 2 + 1;
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(tmx, tmy), camera);
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
      raycaster.ray.intersectPlane(plane, mouse3D);
    };
    window.addEventListener('mousemove', onMove);

    const clock = new THREE.Clock();
    let raf;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      mx += (tmx - mx) * 0.05;
      my += (tmy - my) * 0.05;

      // Particles: gently drift back to origin + subtle mouse repulsion
      const pa = geo.attributes.position.array;
      for (let i = 0; i < COUNT; i++) {
        const ox = originPos[i * 3], oy = originPos[i * 3 + 1];
        const px = pa[i * 3],       py = pa[i * 3 + 1];

        // Return to origin
        pa[i * 3]     += (ox - px) * 0.008;
        pa[i * 3 + 1] += (oy - py) * 0.008;

        // Subtle mouse repulsion
        const mdx = px - mouse3D.x;
        const mdy = py - mouse3D.y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 8 && mdist > 0.01) {
          const force = (8 - mdist) / 8 * 0.12;
          pa[i * 3]     += (mdx / mdist) * force;
          pa[i * 3 + 1] += (mdy / mdist) * force;
        }
      }
      geo.attributes.position.needsUpdate = true;

      // Particles global rotation
      particles.rotation.y = t * 0.008 + mx * 0.06;
      particles.rotation.x = my * 0.04;

      // Strands float
      strandGroup.children.forEach((s, i) => {
        s.position.y = Math.sin(t * 0.3 + s.userData.floatOffset) * 0.8;
        s.rotation.z += s.userData.rotSpeed;
        s.material.opacity = 0.04 + Math.sin(t * 0.4 + i) * 0.025;
      });

      // Center orb breathe
      const breathe = 1 + Math.sin(t * 0.7) * 0.07;
      centerOrb.scale.set(breathe, breathe, breathe);
      centerOrb.rotation.y += 0.003;
      centerOrb.rotation.x += 0.002;

      // Burst rings
      for (let i = bursts.length - 1; i >= 0; i--) {
        const r = bursts[i];
        r.userData.age += 0.016;
        const progress = Math.max(0, (r.userData.age - r.userData.delay) / r.userData.maxAge);
        if (progress > 1) { scene.remove(r); bursts.splice(i, 1); continue; }
        const eased = 1 - Math.pow(1 - progress, 2.5);
        const s = 1 + eased * 22;
        r.scale.set(s, s, 1);
        r.material.opacity = (1 - eased) * 0.65;
      }

      // Camera drift
      camera.position.x += (mx * 3  - camera.position.x) * 0.03;
      camera.position.y += (my * 2  - camera.position.y) * 0.03;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', e => addBurst(e.clientX, e.clientY));
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10"
      style={{ background: 'radial-gradient(ellipse at 30% 40%, #020d07 0%, #050505 45%, #030303 100%)' }}
    />
  );
}