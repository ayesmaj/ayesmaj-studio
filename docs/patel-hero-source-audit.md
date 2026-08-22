# PATEL hero source audit (tower + bird flock port)

Source project: `C:/Users/smadj/Documents/the patel - appartments/website` (Next 16.3.0, React 19.2.8, three 0.179.1, R3F 9.7.0, drei 10.7.8).
Target: `C:/Users/smadj/Documents/ayesmaj-studio` (Vite 6, React ^18.2.0, three ^0.171.0 — no R3F/drei/zustand installed today; `package.json`).
Everything below was verified by reading the cited files. Nothing in PATEL was modified.

## 1. Tower asset used at runtime

- URL: `threeAssetConfig.tower = process.env.NEXT_PUBLIC_PATEL_TOWER_URL ?? "/models/patel-tall-tower.glb"` (`src/config/three-assets.ts:2`). File: `public/models/patel-tall-tower.glb`, **2,430,632 bytes**.
- Loaded with drei `useGLTF(threeAssetConfig.tower, "/draco/")` (`src/components/experience/procedural-world.tsx:182`), decoder path set globally via `useGLTF.setDecoderPath("/draco/")` (line 83), preloaded at line 258. Draco decoder files live in `public/draco/` (`draco_decoder.js` 512 KB, `draco_decoder.wasm` 192 KB, `draco_wasm_wrapper.js` 58 KB).
- Placement: `<primitive object={model} position={[0, TOWER_ROOT_Y, 0]} dispose={null} />` with `TOWER_ROOT_Y = 0.15` (`procedural-world.tsx:225`, `src/config/experience-geometry.ts:1`). **No scale applied in code**; the GLB is already authored at world scale (bbox `-2.90,0,-2.89` to `2.90,22,2.89`, i.e. ~5.8 x 22 x 5.77 units). `bird-flock.tsx:28` comments that the GLB root is scaled 0.1524 — that scale is baked inside the file, not applied at runtime. `scene-framing.ts:18-25` hardcodes the same bbox as `FALLBACK_TOWER_METRICS`; `measureTower()` (line 27) re-measures at runtime via `Box3.setFromObject` and stores it in the zustand store (`procedural-world.tsx:201`).
- Materials are **replaced by name** in `styleTowerMaterial` (`procedural-world.tsx:85-179`): `m.GlassReal`/`Glass` -> new `MeshPhysicalMaterial` (#0D1728, clearcoat 0.48, envMapIntensity 1.7 high / 1.45 otherwise, transmission 0); `Pool Water 03` -> physical w/ transmission 0.12; other `MeshStandardMaterial`s cloned and recoloured (`_WhiteGrey`, `m.ConcreteStone.000`, `m.StoneTile`, `m.DarkShine`, `_Black.016/.001`, `metal`, `AO`, `m.DarkStoneTile.001`, `Grass 02`, `Procedural Pool Tile`). Shadows: `castShadow` only on quality high and for meshes not named `*FacadeLinesProfile*`/`balcony*`; `receiveShadow` unless low (lines 202-207).
- **The 496 MB `the patel.glb` is not referenced anywhere** in `src/` or `scripts/` (grep for `the patel` returned nothing). Neither is `patel-birds.glb` (588 KB, sits unused in `public/models/`).
- `procedural-world.tsx` does **both**: `ActualTowerModel` loads the GLB (line 181); `ProceduralTower` (line 66) builds a box-geometry tower (22 `TowerFloor`s, podium, crown). In `ExteriorWorld` (line 241) the GLB is rendered inside `TowerModelBoundary` (error boundary -> `ProceduralFallbackTower` on load failure), and `<ProceduralTower visuals={false} />` (line 252) is rendered alongside **only for its invisible per-floor hitboxes** (`TowerFloor` lines 44-61, `meshBasicMaterial opacity 0 colorWrite false`) used for residence selection.
- `rooftop-terrace.tsx` adds a procedural instanced-mesh deck (hedges, trunks, canopies, loungers, umbrellas, chairs, tables, animated fire-pit flames — `rooftop-terrace.tsx:47-165`). It is **only mounted for the procedural fallback** (`procedural-world.tsx:231`); the comment at lines 246-250 says the GLB already carries its own roof deck/pool (`helicopterArea.001/.002/.003`) so the terrace is deliberately excluded from the GLB path. Not needed for the port.

## 2. Bird system

- Component: `src/components/patel/scene/bird-flock.tsx` (450 lines), mounted by `sky-and-birds.tsx:178` inside its own `<Suspense>`; `SkyAndBirds` is mounted by `ExteriorWorld` (`procedural-world.tsx:244`).
- Asset: `BIRD_URL = "/models/environment/bird.glb"` (`bird-flock.tsx:10`), `public/models/environment/bird.glb`, **514,732 bytes**, loaded via `useGLTF` (line 111), preloaded (line 450). Guarded by `scripts/check-bird-asset.mjs` (1 skinned mesh, 1 clip, < 1 MB, wings span X, head faces -Z).
- Animation: the file has a single clip `Armature.003Action.003` (13.333 s, 42 channels). The code does not use it whole: `THREE.AnimationUtils.subclip(animations[0], "flap", 4125, 6334, 1000)` (line 143, constants 64-66) cuts a ~2.2 s, three-beat loop. Each bird: `SkeletonUtils.clone(scene)` from `three-stdlib` (line 156), own `AnimationMixer`, `action.time = noise(i,1)*clip.duration`, timescale `0.85 + noise*0.3` (lines 191-197).
- Normalisation: bbox re-centred and scaled so wingspan (`size.x`) = `TARGET_WINGSPAN = 0.11` (lines 51, 161-167); `frustumCulled=false`, no shadows (169-177); wrapped in an inner group rotated `Math.PI` about Y because the gull faces -Z (185-189).
- **Not boids.** Header comment lines 12-22: one invisible leader on an autonomous loop, birds hold formation offsets. No separation/alignment/cohesion rules. Rules present: tower cylinder avoidance (`avoidTower`, lines 254-263, `TOWER_RADIUS=6.2`, `TOWER_TOP=23.5`), min altitude 4, min camera distance 6 (398-404), bounds clamp on the autonomous path only (355-359), per-bird wander sinusoids (391-394), banking roll from lateral leader velocity clamped +/-0.3 rad (418-428), quaternion slerp facing (431).
- Key maths (per frame, `useFrame`, lines 272-436):
  - Autonomous course: `natural = (cos(t*0.075)*21, 16.5 + sin(t*0.048)*5.2, sin(t*0.075)*19 + 2)` (285-290).
  - Pointer: `ndc.set(pointer.x, pointer.y, 0.5).unproject(camera); ndc.sub(camera.position).normalize()` (316-317); ray/cylinder intersection with the tower — `a = d.x²+d.z²; b = 2(o.x d.x + o.z d.z); c = o.x²+o.z²-R²`; if hit in front and below `TOWER_TOP`, `depth = near - 2.5`, else `CURSOR_DEPTH = 42` (330-343); `cursor = camera.position + ndc * max(depth, 7)` (344). Pointer-speed attenuation `attenuation = 1/(1 + pointerVelocity*0.03)`, `cursorWeight = influence * attenuation` with `pointerVelocity` low-passed by `1-exp(-6*delta)` (298-307).
  - Blend: `blended = natural*(1-w) + cursor*w` (349-350).
  - Leader: `ease = 1-exp(-9*delta)`; step clamped to `LEADER_MAX_SPEED(75)*delta` (372-379).
  - Bird follow: `follow = 1-exp(-(9/lag)*speed*delta)` with `lag = 0.7 + rank*0.55` (406-409).
- Count: `tierCount()` lines 95-100 — mobile (canvas width < 768) 5, high 20, medium 13, low 6; overridable via `count` prop. Visible fraction scaled by mode (`modeScale`: 1 in `film-transition`, 0.5 in `building-explorer`, 0 otherwise — lines 127-130, 382).
- Mobile / reduced motion: pointer term disabled unless `!mobile && matchMedia("(pointer: fine)")` (135-136); `reducedMotion` (store, set from `prefers-reduced-motion` in `patel-experience.tsx:59-62`) -> empty array and `return null` (149, 439); `document.hidden` skips the sim, delta clamped to 0.05 (276-277).

## 3. Required packages + versions (PATEL)

From `package.json` / `node_modules`: `three` 0.179.1 (`^0.179.1`), `@react-three/fiber` 9.7.0 (`^9.7.0`), `@react-three/drei` 10.7.8 (`^10.7.7`), `three-stdlib` 2.36.1 (**transitive via drei, not declared in package.json** but imported directly in `bird-flock.tsx:7`, `hdri-environment.tsx:6`, `camera-rig.tsx:7`), `zustand` 5.0.14 (`^5.0.8`), `gsap` `^3.13.0` + `@gsap/react` `^2.1.2` (scroll handoff only), `@types/three` `^0.179.0`. Static assets: `public/draco/*` (Draco is `extensionsRequired` on the tower GLB).

## 4. Camera configuration

- Canvas camera: `{ fov: 30, near: 0.1, far: 220, position: [9.5, 7.2, 52.1] }` (`scene-canvas.tsx:45`).
- Rig: `src/components/experience/camera-rig.tsx`. The building reveal (`film-transition` mode, lines 190-256) holds `storyFrames[0]` = `orbit(0.18, 53, 7.2, 10.4)` -> position `(cx + sin(0.18)*53, 7.2, cz + cos(0.18)*53)` ≈ `(9.5, 7.2, 52.1)`, target `(cx, 10.4, cz)` (lines 75-87; `cx,cz` = tower centre, 0,0). Scroll-driven reveal: `handoffT = 1 - portalSmoothed`; `revealT = smoothstep(clamp(handoffT/0.5))`; camera spun by `(1-revealT)*0.95` rad about the target and raised by `(1-revealT)*26` together with the target (212-233); `camera.lookAt(target)` instantly, no damping; fov forced to `TRANSITION_FOV = 30` (`camera-anchors.ts:105`). Mobile (`aspect < .8 || width < 720`) multiplies orbit radius by 1.3 (66).
- `tower-story` mode (258-266): interpolates the 7 `storyFrames` by `towerProgress` plus pointer parallax `x*0.22, y*0.1`, position lerp 0.055.
- Explorer orbit: drei `<OrbitControls enabled={mode==="building-explorer"} enablePan={false} enableDamping dampingFactor={.07} minDistance={4} maxDistance={160} minPolarAngle={PI*.25} maxPolarAngle={PI*.54} makeDefault />` (rooftop focus: 2.5/60, PI*.16/.48) (305-320). Explorer frame from `createTowerFrame(metrics, aspect, "explorer", 33, width)` (`scene-framing.ts:58-84`): fill 0.68 desktop / 0.64 mobile, azimuth 19° (9° mobile), elevation +2.1.
- `src/data/camera-anchors.ts` (`TRANSITION_PATH`, 6 keys, CatmullRom curve, `PORTAL_STAGE`) is for Residence 1802's "living window"; only `TRANSITION_FOV` (30) and `PORTAL_STAGE`/`stageProgress` are consumed by the rig/experience — not needed for a hero.

## 5. Lighting configuration

`src/components/patel/scene/miami-environment.tsx:22-69` (`DuskLighting`), colours from `DUSK` (`patel-environment-config.ts:37-47`):
- `ambientLight` 0.3 `#d8dcef`; `hemisphereLight` sky `#b3c0e2` / ground `#8a6f5e` 0.9.
- Key `directionalLight` pos `[22, 9, 5]` intensity 2.9 `#f8cd96`, `castShadow` unless low, shadow map 2048² high / 1024² else, ortho box L-10 R10 T26 B-3, `normalBias 0.035`.
- Rim `directionalLight` `[-14, 12, -12]` 0.42 `#f0d3a4`; fill `[-18, 13, 10]` 0.9 `#c3cfec`.
- Podium point lights: 5x `pointLight` 2.2 `#ffb477` distance 3.6 decay 2 (line 155); `ContactShadows` opacity .34 scale 16 blur 2.8 (154, not low).
- Fog `[#c4aab2, 68, 175]` (166).
- Renderer (`scene-canvas.tsx:35-44`): `shadows={{enabled: quality!=="low", type: PCFShadowMap}}`, `outputColorSpace = SRGBColorSpace`, `toneMapping = ACESFilmicToneMapping`, `toneMappingExposure = 1.12` (also `TONE_MAPPING_EXPOSURE = 1.12` in config line 50, not imported by the canvas), `setClearColor(0x000000, 0)`, `gl: {antialias: quality!=="low", alpha: true, powerPreference: "high-performance"}`.
- Low tier only: drei `<Environment resolution={96} frames={1}>` with three `Lightformer`s (48-52).

## 6. Environment source

- Config: `TRUE_HDRI_PATH = "/environment/patel-miami-sunset.exr"`, `HAS_TRUE_HDRI = true`, `FALLBACK_IBL_PATH = "/hdr/miami-sunset-pano.webp"` (`patel-environment-config.ts:32-34`). Files: `public/environment/patel-miami-sunset.exr` **12,311,760 bytes**; `public/hdr/miami-sunset-pano.webp` 412 KB (plus unused `miami-bluehour-pano.webp`, `miami-skyline-plate.webp`, `miami-sunset-exr-bg.webp`, `miami-sunset-pano-bg.webp`). The 2K `.exr` in the parent folder is not referenced by the site.
- Selection (`miami-environment.tsx:47-66`): quality `high` -> `<HdriEnvironment file={TRUE_HDRI_PATH} rotation={2.92} intensity={1.0} />`; `medium` -> `<PanoramaEnvironment file={FALLBACK_IBL_PATH} gradientBackground rotation={2.9} intensity={1.5} />`; `low` -> Lightformers.
- `hdri-environment.tsx`: `useLoader(EXRLoader, file)` from `three-stdlib` (35); sets `texture.mapping = EquirectangularReflectionMapping`, `scene.environment = texture`, **`scene.background = null`**, `scene.environmentRotation.set(0, rotation, 0)`, `scene.environmentIntensity = intensity` (61-75). A sky dome mesh exists but is hard-disabled (`showSky = false`, line 46). So the EXR is **lighting/reflections only**; the visible sky is the CSS `.patel-sky-panel` behind the transparent canvas (`patel-experience.tsx:224`).
- `panorama-environment.tsx`: drei `useTexture`, same equirect mapping, `SRGBColorSpace`; with `gradientBackground` the background stays `null` (122) and only `scene.environment` is set. It deliberately avoids drei `<Environment files=*.webp>` because of the gainmap loader path (comment 10-16).
- Low tier procedural sky: `SkyDome` ShaderMaterial + 12 sprite clouds in `sky-and-birds.tsx:58-159` (only when `quality === "low"`).

## 7. Model/texture sizes + performance controls

| Asset | Size | Inspect (`@gltf-transform/cli inspect`) |
|---|---|---|
| `public/models/patel-tall-tower.glb` | 2.43 MB | 12 meshes, 13 materials, **0 textures**, 0 animations; 517,877 upload verts / 2,059,122 render verts; heaviest `Plane.013` 281,583 verts (14.1 MB raw), `Rectangle.005` 81,064, `Rectangle.003` 80,142. Ext: `KHR_draco_mesh_compression` (required), clearcoat, emissive_strength, specular, anisotropy, ior. Blender I/O 5.2.39. |
| `public/models/environment/bird.glb` | 503 KB | 1 skinned mesh `Seagul.003` 4,154 verts / 5,061 tris; 3 webp textures 512x512 (normal 24 KB, baseColor 26 KB, metallicRoughness 20 KB; ~1.4 MB GPU each); 1 clip `Armature.003Action.003` 13.333 s. Ext: `EXT_texture_webp` (required), ior, specular. glTF-Transform 4.4.2. |
| `public/models/patel-birds.glb` (unused) | 575 KB | 6 skinned gulls `Seagul.003-.008` 6,618 verts each + `Cube.001`, 1 material, no textures, 6 clips 13.333 s. Draco required. |
| `public/environment/patel-miami-sunset.exr` | 11.7 MB | high tier only |
| `public/hdr/miami-sunset-pano.webp` | 412 KB | medium tier |
| `public/draco/*` | 763 KB | decoder |

Controls: quality tier set once in `patel-experience.tsx:58-69` — `low` if reduced-motion, `max-width:767px`, or `deviceMemory <= 2`; `medium` if `deviceMemory <= 4` or `innerWidth < 900`; else `high`. DPR `[1,1.5]` high / `[1,1.25]` medium / 1 low (`scene-canvas.tsx:36`); `frameloop="never"` while `loading`/`hero-film`, `"always"` after (33); antialias off on low; shadows off on low. **No LOD** on the tower (single mesh set). 2D fallback: `supportsWebGL()` false or scene error boundary -> `twoD` static image (`patel-experience.tsx:68, 226-228`); "Enter in 2D" button in `experience-loader.tsx:54`. Tower load is marked non-blocking on mobile (`patel-experience.tsx:67`).

## 8. Files to port / keep / generalise

Port (copy assets + logic):
- `public/models/patel-tall-tower.glb`, `public/draco/*`, `public/models/environment/bird.glb`, one environment (`public/hdr/miami-sunset-pano.webp` recommended for weight; `.exr` only if high-tier fidelity wanted).
- `src/components/patel/scene/bird-flock.tsx` (core), `scripts/check-bird-asset.mjs` (asset guard).
- `styleTowerMaterial` + `ActualTowerModel` from `procedural-world.tsx:83-226` (strip the store calls).
- `DuskLighting` + fog from `miami-environment.tsx:22-69, 166`; `DUSK`, `SUN_DIRECTION` from `patel-environment-config.ts`.
- `hdri-environment.tsx` or `panorama-environment.tsx` (pick one).
- Canvas/renderer settings from `scene-canvas.tsx:32-47`; reveal maths from `camera-rig.tsx:75-87, 203-255`; `createTowerFrame`/`measureTower` from `scene-framing.ts`.

Keep PATEL-specific (do not port): `src/config/site.ts` (residences, brand), `experience-store.ts` modes/floor/unit state, `experience-overlays.tsx`, `hero-film.tsx`, `experience-loader.tsx`, `client-patel-experience.tsx`, `patel-experience.tsx` (GSAP scroll + film handoff), `transition-refs.ts`, `camera-anchors.ts` (Residence 1802 portal), `floor-highlight.tsx`, `TowerFloor`/`ProceduralTower` hitboxes, `rooftop-terrace.tsx`, `ResidenceInterior`, palms/podium in `miami-environment.tsx:77-158` (Miami set dressing), `src/app/*`.

Generalise: `BirdFlock` — replace `useExperienceStore` reads (`quality`, `reducedMotion`, `mode` at lines 115-117) with props (`count`, `enabled`, `reducedMotion`), keep `influence`/`bounds` props; tower cylinder constants (31-32) -> props. `ActualTowerModel` -> `TowerModel({url, quality})`. `CameraRig` -> a small "reveal + idle orbit" rig with `OrbitControls` limits; drop mode machine.

## 9. Risks for three 0.171 / React 18 port

- **drei 10 and R3F 9 require React 19** (PATEL uses React 19.2.8). On React 18 use `@react-three/fiber@8.x` + `@react-three/drei@9.x` (drei 9 pins three-stdlib 2.x, which provides `SkeletonUtils`, `EXRLoader`, `OrbitControls` type). Re-check `useGLTF(url, "/draco/")` signature and `useGLTF.setDecoderPath` exist in the chosen drei 9 release.
- `Canvas` props used: `frameloop`, `shadows={{enabled,type}}`, `dpr=[min,max]`, `gl={{...}}`, `onCreated` — all exist in R3F 8; `shadows` object form is R3F 8.x+.
- three APIs used and their minimum version: `scene.environmentRotation` / `scene.backgroundRotation` (r162), `scene.environmentIntensity` (r163), `scene.backgroundIntensity`/`backgroundBlurriness` (r152), `renderer.outputColorSpace` + `SRGBColorSpace` (r152), `MathUtils.smoothstep`, `AnimationUtils.subclip`, `Box3.setFromObject` — all present in 0.171. `KHR_materials_anisotropy` GLTFLoader support landed r155; `EXT_texture_webp` older — fine.
- `THREE.ColorManagement` defaults and ACES tone mapping are the same between 0.171 and 0.179; material look should match. Check `MeshPhysicalMaterial.anisotropy*` from the GLB does not throw on 0.171 (it is supported).
- `SkeletonUtils` import: from `three-stdlib` in PATEL; on 0.171 can also use `three/examples/jsm/utils/SkeletonUtils.js` (used already in `scripts/check-bird-asset.mjs` style). `EXRLoader` likewise from `three/examples/jsm/loaders/EXRLoader.js`.
- React Compiler assumptions: comments cite `react-hooks/immutability` rule (React 19 / compiler lint). Irrelevant on React 18 but the `noise()` deterministic randomness should be kept.
- `"use client"` directives and `next/dynamic` must be replaced with `React.lazy`/plain imports in Vite; SSR guards (`typeof window`, `document.hidden`) still fine.
- Tower GLB Draco decoder: `useGLTF.setDecoderPath("/draco/")` is module-level in PATEL; in Vite ensure `public/draco/` is served at `/draco/` (same path) or pass the path explicitly.
- Weight: 2.4 MB GLB + 0.76 MB decoder + 0.5 MB bird + 0.4–12 MB env. The EXR (11.7 MB) should not ship to a hero on a studio site; prefer the webp panorama or a PMREM-baked smaller HDR.
- Bundle: PATEL's bird/camera code reads a zustand store; ayesmaj has no zustand — either add it or refactor to props/refs (recommended, see section 8).
- `gsap`/ScrollTrigger drive the reveal parameter (`transitionRefs.portalSmoothed`); if ayesmaj does not use GSAP, replace with a scroll listener or a one-shot `useFrame` timeline.


## 10. What was ported into AYESMAJ (2026-08-21)

`src/features/interior-design/hero/` — `hero.config.js` (assets, copy, camera, lights, tiers), `towerScene.js`
(vanilla three 0.171 engine), `birdFlock.js` (led flock, maths unchanged), `InteriorDesignHero.jsx`,
`HeroMethodStrip.jsx`, `hero.css`. Assets under `public/interior-design/hero/`: `patel-tower-{high,medium,low}.glb`
(the deployed 2.4 MB tower + meshopt-simplified 1.1 / 0.9 MB cuts, material names preserved — `--palette false`,
the default palette step renames every material and breaks the restyle), `patel-bird.glb`, the LDR
`miami-sunset-pano.webp` IBL, a gpt-image-2 Miami bay background (AVIF/WebP + phone crop).

Breakout technique: one WebGL context, one render per frame, two display surfaces. The GL canvas sits above the
screen bezel and is CSS `clip-path`ed to the region above the screen's top edge; a 2D canvas inside the screen
receives a `drawImage` of the same frame mapped through live DOM rects. Identical pixels on both sides of the edge —
no second camera, no clipping plane, no seam. Camera is level above the roof with `setViewOffset` (straight
verticals, pool visible). Not ported: R3F/drei/zustand/gsap, the scroll handoff, the residence explorer, PATEL
navigation and copy. Shadows are off for the hero budget. The `.exr` environment was not converted (no EXR tooling
on this machine) — the LDR panorama is the PATEL medium-tier look.
