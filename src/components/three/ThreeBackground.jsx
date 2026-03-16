import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeBackground({ reducedMotion }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current || reducedMotion) return;

    const container = containerRef.current;
    const W = window.innerWidth, H = window.innerHeight;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 1000);
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // ── Particles ──────────────────────────────────────────────────────────
    const COUNT = 2200;
    const geo = new THREE.BufferGeometry();
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const velocities = new Float32Array(COUNT * 3);
    const green = new THREE.Color(0x00ff77);
    const white = new THREE.Color(0x888888);

    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 130;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 90;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 90;
      const c = green.clone().lerp(white, Math.random() * 0.82);
      col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
      sizes[i] = 0.05 + Math.random() * 0.18;
      velocities[i * 3]     = (Math.random() - 0.5) * 0.004;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.003;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.003;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
    geo.setAttribute('size',     new THREE.BufferAttribute(sizes, 1));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12, vertexColors: true, transparent: true, opacity: 0.6,
      blending: THREE.AdditiveBlending, depthWrite: false, sizeAttenuation: true,
    });
    const particles = new THREE.Points(geo, particleMat);
    scene.add(particles);

    // ── Horizontal scan lines ──────────────────────────────────────────────
    const lineMat = new THREE.LineBasicMaterial({ color: 0x00ff77, transparent: true, opacity: 0.04 });
    const lineObjects = [];
    for (let i = 0; i < 14; i++) {
      const y = (Math.random() - 0.5) * 70;
      const z = -12 - Math.random() * 12;
      const lg = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(-90, y, z),
        new THREE.Vector3( 90, y, z)
      ]);
      const line = new THREE.Line(lg, lineMat.clone());
      line.userData = { speed: 0.0003 + Math.random() * 0.0006, baseOp: 0.015 + Math.random() * 0.025 };
      scene.add(line);
      lineObjects.push(line);
    }

    // ── Moving grid floor ─────────────────────────────────────────────────
    const gridPts = [];
    for (let i = -70; i <= 70; i += 4) {
      gridPts.push(-70, -26, i,  70, -26, i,  i, -26, -70,  i, -26,  70);
    }
    const gridGeo = new THREE.BufferGeometry();
    gridGeo.setAttribute('position', new THREE.Float32BufferAttribute(gridPts, 3));
    const grid = new THREE.LineSegments(gridGeo, new THREE.LineBasicMaterial({
      color: 0x00ff77, transparent: true, opacity: 0.02
    }));
    scene.add(grid);

    // ── Floating geometric orbs ───────────────────────────────────────────
    const orbGroup = new THREE.Group();
    const orbData = [];
    for (let i = 0; i < 6; i++) {
      const radius = 0.4 + Math.random() * 1.2;
      const orbGeo = new THREE.IcosahedronGeometry(radius, 1);
      const orbMat = new THREE.MeshBasicMaterial({
        color: 0x00ff77, wireframe: true, transparent: true,
        opacity: 0.06 + Math.random() * 0.08,
      });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      orb.position.set(
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 25,
        -5 - Math.random() * 20
      );
      orbGroup.add(orb);
      orbData.push({ mesh: orb, rotSpeed: new THREE.Vector3(
        (Math.random() - 0.5) * 0.006,
        (Math.random() - 0.5) * 0.008,
        (Math.random() - 0.5) * 0.005,
      ), floatOffset: Math.random() * Math.PI * 2 });
    }
    scene.add(orbGroup);

    // ── Click ripple rings ────────────────────────────────────────────────
    const ripples = [];
    const addRipple = (x, y) => {
      const ndc = new THREE.Vector2(
        (x / window.innerWidth) * 2 - 1,
        -(y / window.innerHeight) * 2 + 1
      );
      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(ndc, camera);
      const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), -2);
      const target = new THREE.Vector3();
      raycaster.ray.intersectPlane(plane, target);

      for (let r = 0; r < 3; r++) {
        const rGeo = new THREE.RingGeometry(0.05, 0.12, 48);
        const rMat = new THREE.MeshBasicMaterial({
          color: 0x00ff77, transparent: true, opacity: 0.7 - r * 0.18,
          side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false,
        });
        const ring = new THREE.Mesh(rGeo, rMat);
        ring.position.copy(target);
        ring.userData = { age: 0, delay: r * 0.18, maxAge: 1.6 };
        scene.add(ring);
        ripples.push(ring);
      }
    };
    const onClick = e => addRipple(e.clientX, e.clientY);
    window.addEventListener('click', onClick);

    // ── Mouse tracking ────────────────────────────────────────────────────
    let mx = 0, my = 0, tmx = 0, tmy = 0;
    const onMove = e => {
      tmx = (e.clientX / window.innerWidth)  * 2 - 1;
      tmy = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove);

    // ── Animate ───────────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let raf;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t   = clock.getElapsedTime();
      const dt  = clock.getDelta ? 0.016 : 0.016;

      mx += (tmx - mx) * 0.045;
      my += (tmy - my) * 0.045;

      // Drift particles
      const pa = geo.attributes.position.array;
      for (let i = 0; i < COUNT; i++) {
        pa[i * 3]     += velocities[i * 3];
        pa[i * 3 + 1] += velocities[i * 3 + 1];
        pa[i * 3 + 2] += velocities[i * 3 + 2];
        // Wrap edges
        if (Math.abs(pa[i * 3])     > 65) velocities[i * 3]     *= -1;
        if (Math.abs(pa[i * 3 + 1]) > 45) velocities[i * 3 + 1] *= -1;
        if (Math.abs(pa[i * 3 + 2]) > 45) velocities[i * 3 + 2] *= -1;
      }
      geo.attributes.position.needsUpdate = true;

      // Particles follow mouse gently
      particles.rotation.y  = t * 0.01 + mx * 0.08;
      particles.rotation.x  = my * 0.05;

      // Scan lines pulse
      lineObjects.forEach((l, i) => {
        l.material.opacity = l.userData.baseOp + Math.sin(t * 0.5 + i * 0.9) * 0.01;
      });

      // Grid scroll
      grid.position.z    = (t * 1.0) % 4;
      grid.material.opacity = 0.018 + Math.sin(t * 0.2) * 0.006;

      // Orbs float & rotate
      orbData.forEach(({ mesh, rotSpeed, floatOffset }) => {
        mesh.rotation.x += rotSpeed.x;
        mesh.rotation.y += rotSpeed.y;
        mesh.rotation.z += rotSpeed.z;
        mesh.position.y += Math.sin(t * 0.4 + floatOffset) * 0.004;
      });

      // Ripple expansion
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.userData.age += 0.016;
        const progress = Math.max(0, (r.userData.age - r.userData.delay) / r.userData.maxAge);
        if (progress > 1) { scene.remove(r); ripples.splice(i, 1); continue; }
        const eased = 1 - Math.pow(1 - progress, 3);
        const s = 1 + eased * 18;
        r.scale.set(s, s, 1);
        r.material.opacity = (1 - eased) * (r.userData.delay === 0 ? 0.7 : 0.45);
      }

      // Camera drift
      camera.position.x += (mx * 2.5 - camera.position.x) * 0.04;
      camera.position.y += (my * 1.8 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
      window.removeEventListener('resize', onResize);
      cancelAnimationFrame(raf);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [reducedMotion]);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10"
      style={{ background: 'radial-gradient(ellipse at 50% 0%, #040f08 0%, #050505 50%, #030303 100%)' }}
    />
  );
}