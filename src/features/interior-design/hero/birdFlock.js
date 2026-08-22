/**
 * BirdFlock — vanilla-three port of the PATEL led flock
 * (the patel - appartments/website/src/components/patel/scene/bird-flock.tsx).
 *
 * One invisible leader flies an autonomous ellipse around the tower; the birds
 * hold loose formation offsets behind it. The pointer bends the leader's course
 * (via the camera ray, so the flock sits under the cursor at any angle) but
 * never becomes its destination. Tower cylinder + roof avoidance, min altitude,
 * min camera distance, banking into turns, and the wing-flap subclip are all
 * as in the source. Math is unchanged; only the React wrapper is gone.
 */
import * as THREE from 'three';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js'; // r171 exports clone() as a named export

const TOWER_RADIUS = 6.2;
const TOWER_TOP = 23.5;
const MIN_CAMERA_DISTANCE = 6;
const LEADER_LAMBDA = 9;
const LEADER_MAX_SPEED = 75;
const CURSOR_DEPTH = 42;
const MIN_ALTITUDE = 4;
const TARGET_WINGSPAN = 0.11;
const FLAP_START_MS = 4125;
const FLAP_END_MS = 6334;
const FLAP_FPS = 1000;
const DEFAULT_BOUNDS = { x: [-26, 26], y: [9, 26], z: [-24, 24] };

function noise(index, salt) {
  const x = Math.sin(index * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export class BirdFlock {
  /**
   * @param {THREE.Group} gltfScene  loaded bird.glb scene (shared source, cloned per bird)
   * @param {THREE.AnimationClip[]} animations
   * @param {{count:number, influence:number, pointerEnabled:boolean, bounds?:object}} opts
   */
  constructor(gltfScene, animations, opts) {
    this.group = new THREE.Group();
    this.influence = opts.influence;
    this.pointerEnabled = opts.pointerEnabled;
    this.bounds = opts.bounds || DEFAULT_BOUNDS;
    this.birds = [];

    const clip = animations[0]
      ? THREE.AnimationUtils.subclip(animations[0], 'flap', FLAP_START_MS, FLAP_END_MS, FLAP_FPS)
      : null;
    if (!clip) return;

    const n = opts.count;
    for (let index = 0; index < n; index++) {
      const model = SkeletonUtils.clone(gltfScene);
      const box = new THREE.Box3().setFromObject(model);
      const size = box.getSize(new THREE.Vector3());
      const centre = box.getCenter(new THREE.Vector3());
      const scale = TARGET_WINGSPAN / Math.max(size.x, 0.001);
      model.position.sub(centre);
      model.scale.setScalar(scale);
      model.position.multiplyScalar(scale);
      model.traverse((o) => { if (o.isMesh) { o.castShadow = false; o.receiveShadow = false; o.frustumCulled = false; } });

      const inner = new THREE.Group();
      inner.rotation.y = Math.PI; // Blender gull faces -Z
      inner.add(model);
      const carrier = new THREE.Group();
      carrier.add(inner);

      const mixer = new THREE.AnimationMixer(model);
      const action = mixer.clipAction(clip);
      action.play();
      action.time = noise(index, 1) * clip.duration;
      action.setEffectiveTimeScale(0.85 + noise(index, 2) * 0.3);

      const rank = index / Math.max(n - 1, 1);
      const side = index % 2 === 0 ? 1 : -1;
      const spread = 0.45 + rank * 1.35;
      this.birds.push({
        carrier, mixer,
        position: new THREE.Vector3(
          side * spread * (0.6 + noise(index, 3) * 0.5),
          this.bounds.y[0] + noise(index, 4) * (this.bounds.y[1] - this.bounds.y[0]),
          -rank * 9 + (noise(index, 5) - 0.5) * 5,
        ),
        velocity: new THREE.Vector3(1, 0, 0),
        offset: new THREE.Vector3(side * spread, (noise(index, 6) - 0.5) * 1.9, -rank * 1.5 - noise(index, 7) * 0.7),
        phase: noise(index, 8) * Math.PI * 2,
        speed: 0.85 + noise(index, 9) * 0.3,
        lag: 0.7 + rank * 0.55,
        roll: 0,
      });
      this.group.add(carrier);
    }

    this.s = {
      leader: new THREE.Vector3(26, 18, 14), // enters from the far right sky (brief §14 stage 6)
      ndc: new THREE.Vector3(), leaderVelocity: new THREE.Vector3(), natural: new THREE.Vector3(),
      cursor: new THREE.Vector3(), blended: new THREE.Vector3(), target: new THREE.Vector3(),
      delta: new THREE.Vector3(), toCamera: new THREE.Vector3(), flat: new THREE.Vector2(),
      previousPointer: new THREE.Vector2(), pointerVelocity: 0, settled: false,
      dummy: new THREE.Object3D(), quaternion: new THREE.Quaternion(), rollQuaternion: new THREE.Quaternion(),
      forwardAxis: new THREE.Vector3(0, 0, 1), up: new THREE.Vector3(0, 1, 0), right: new THREE.Vector3(),
    };
    this.time = 0;
    this.liveInfluence = 0;
    this.screenError = 0; // px between the leader and the cursor, for verification
  }

  avoidTower(point) {
    const flat = this.s.flat.set(point.x, point.z);
    const distance = flat.length();
    if (distance < TOWER_RADIUS && point.y < TOWER_TOP) {
      if (distance < 0.001) flat.set(1, 0);
      flat.normalize().multiplyScalar(TOWER_RADIUS);
      point.x = flat.x; point.z = flat.y;
    }
  }

  /** @param {number} rawDelta seconds  @param {THREE.Camera} camera  @param {{x:number,y:number}} pointer NDC */
  update(rawDelta, camera, pointer) {
    if (this.birds.length === 0) return;
    const delta = Math.min(rawDelta, 0.05);
    this.time += delta;
    const s = this.s; const time = this.time; const bounds = this.bounds;

    const orbit = time * 0.075;
    s.natural.set(Math.cos(orbit) * 21, 16.5 + Math.sin(time * 0.048) * 5.2, Math.sin(orbit) * 19 + 2);

    let cursorWeight = 0;
    const wanted = this.pointerEnabled && pointer.active ? this.influence : 0;
    this.liveInfluence = THREE.MathUtils.damp(this.liveInfluence, wanted, 3, delta);
    if (this.liveInfluence > 0.001) {
      const dx = pointer.x - s.previousPointer.x;
      const dy = pointer.y - s.previousPointer.y;
      const speed = Math.hypot(dx, dy) / Math.max(delta, 0.001);
      s.pointerVelocity += (speed - s.pointerVelocity) * (1 - Math.exp(-6 * delta));
      s.previousPointer.set(pointer.x, pointer.y);
      const attenuation = 1 / (1 + s.pointerVelocity * 0.03);
      cursorWeight = this.liveInfluence * attenuation;

      s.ndc.set(pointer.x, pointer.y, 0.5).unproject(camera);
      s.ndc.sub(camera.position).normalize();
      const ox = camera.position.x, oz = camera.position.z;
      const a = s.ndc.x * s.ndc.x + s.ndc.z * s.ndc.z;
      const b = 2 * (ox * s.ndc.x + oz * s.ndc.z);
      const c = ox * ox + oz * oz - TOWER_RADIUS * TOWER_RADIUS;
      let depth = CURSOR_DEPTH;
      const disc = b * b - 4 * a * c;
      if (disc > 0 && a > 1e-6) {
        const near = (-b - Math.sqrt(disc)) / (2 * a);
        if (near > 1 && near < depth) {
          const hitY = camera.position.y + s.ndc.y * near;
          if (hitY < TOWER_TOP) depth = near - 2.5;
        }
      }
      s.cursor.copy(camera.position).addScaledVector(s.ndc, Math.max(depth, MIN_CAMERA_DISTANCE + 1));
      if (s.cursor.y < MIN_ALTITUDE) s.cursor.y = MIN_ALTITUDE;
    }

    s.blended.copy(s.natural).multiplyScalar(1 - cursorWeight);
    if (cursorWeight > 0) s.blended.addScaledVector(s.cursor, cursorWeight);
    if (cursorWeight < 0.5) {
      s.blended.x = THREE.MathUtils.clamp(s.blended.x, bounds.x[0], bounds.x[1]);
      s.blended.y = THREE.MathUtils.clamp(s.blended.y, bounds.y[0], bounds.y[1]);
      s.blended.z = THREE.MathUtils.clamp(s.blended.z, bounds.z[0], bounds.z[1]);
    }
    if (s.blended.y < MIN_ALTITUDE) s.blended.y = MIN_ALTITUDE;
    this.avoidTower(s.blended);

    if (!s.settled) {
      s.settled = true;
      this.birds.forEach((bird) => bird.position.copy(s.leader).add(bird.offset));
    }
    const ease = 1 - Math.exp(-LEADER_LAMBDA * delta);
    s.delta.copy(s.blended).sub(s.leader).multiplyScalar(ease);
    const step = LEADER_MAX_SPEED * delta;
    if (s.delta.length() > step) s.delta.setLength(step);
    s.leader.add(s.delta);
    s.leaderVelocity.copy(s.delta).divideScalar(Math.max(delta, 0.001));
    if (pointer.active && pointer.width) {
      const p = s.ndc.copy(s.leader).project(camera);
      this.screenError = Math.hypot((p.x - pointer.x) * pointer.width / 2, (p.y - pointer.y) * pointer.height / 2);
    }

    for (const bird of this.birds) {
      s.target.copy(s.leader).add(bird.offset);
      s.target.x += Math.sin(time * 0.42 + bird.phase) * 1.5;
      s.target.y += Math.sin(time * 0.63 + bird.phase * 1.7) * 0.9;
      s.target.z += Math.cos(time * 0.37 + bird.phase) * 1.5;
      this.avoidTower(s.target);
      if (s.target.y < MIN_ALTITUDE) s.target.y = MIN_ALTITUDE;

      s.toCamera.copy(s.target).sub(camera.position);
      const camDistance = s.toCamera.length();
      if (camDistance < MIN_CAMERA_DISTANCE && camDistance > 0.001) {
        s.target.copy(camera.position).addScaledVector(s.toCamera.divideScalar(camDistance), MIN_CAMERA_DISTANCE);
      }

      const follow = 1 - Math.exp(-(LEADER_LAMBDA / bird.lag) * bird.speed * delta);
      s.delta.copy(s.target).sub(bird.position).multiplyScalar(follow);
      bird.velocity.copy(s.delta).divideScalar(Math.max(delta, 0.001));
      bird.position.add(s.delta);
      bird.carrier.position.copy(bird.position);

      if (bird.velocity.lengthSq() > 0.0001) {
        s.dummy.position.copy(bird.position);
        s.dummy.lookAt(s.target);
        s.quaternion.copy(s.dummy.quaternion);
        s.right.crossVectors(s.up, bird.velocity).normalize();
        const lateral = s.leaderVelocity.dot(s.right);
        bird.roll = THREE.MathUtils.lerp(bird.roll, THREE.MathUtils.clamp(-lateral * 0.055, -0.3, 0.3), 1 - Math.exp(-3 * delta));
        s.quaternion.multiply(s.rollQuaternion.setFromAxisAngle(s.forwardAxis, bird.roll));
        bird.carrier.quaternion.slerp(s.quaternion, 1 - Math.exp(-4 * delta));
      }
      bird.mixer.update(delta * bird.speed);
    }
  }

  dispose() {
    for (const bird of this.birds) { bird.mixer.stopAllAction(); bird.mixer.uncacheRoot(bird.mixer.getRoot()); }
    this.birds = []; // geometry/materials are disposed by the scene traversal in towerScene.dispose()
  }
}
