# AYESMAJ Visual Source of Truth — for the Interior Design pages

Every value below is quoted from the current code (branch `web-experiences-3d-gallery`). New `/interior-design/*` pages **reuse these classes/components verbatim**; they do not re-declare tokens, buttons, nav, or footer.

Route facts (`src/App.jsx:55-69`, `src/pages.config.js:71-94`): `/services/motion-vfx` → `src/pages/AiVideos.jsx` (+ `AiVideos.css`); `/interior-design` → `src/pages/interior/InteriorDesign.jsx`; the 12 subpages live in `src/pages/interior/`. There is no `Studio.css`; `src/pages/Studio.jsx` is inline-styled.

Every Interior page is wrapped by `InteriorShell` (`src/components/interior/kit.jsx:62-77`), which renders `<div className="idv-page">` → `<Seo>` → `<AyesmajNav/>` → `<main>{children}</main>` → `<FloatingProjectTab/>` → `<AyesmajFooter/>` and imports `interior.css`, `interior2.css`, `interior-bg.css` (`kit.jsx:16-18`). `interior-bg.css` is also imported globally in `src/main.jsx:185`.

---

## Global header — `src/components/ayesmaj/AyesmajNav.jsx`

| Property | Value | Source |
|---|---|---|
| Position / height | `position: "fixed", top:0,left:0,right:0, height: 80, zIndex: 1000` | `AyesmajNav.jsx:99-103` |
| Horizontal padding | `padding: "0 clamp(20px, 4vw, 48px)"` | `:107` |
| Background (scrolled > 40px) | `scrolled ? "rgba(5,5,5,0.72)" : "transparent"`, `backdropFilter: scrolled ? "blur(18px)" : "none"`, `borderBottom: scrolled ? "1px solid rgba(255,255,255,0.09)" : "1px solid transparent"` | `:51`, `:108-111` |
| Override on Interior pages | `.idv-page .ayes-nav-root { background: rgba(8, 9, 8, 0.95) !important; backdrop-filter: blur(18px) !important; }` — opaque dark band always | `interior.css:43-46` |
| Entry animation | `initial={{ y: -80, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}` | `:96-98` |
| Logo | `<LogoMark size={40} />` inside a `<button aria-label="AYESMAJ Studios home">` | `:116-122` |
| Nav link container | `<nav className="ayes-nav-links" style={{ display: "flex", gap: 34, alignItems: "center" }}>` | `:125` |
| Nav link style | `padding: "8px 2px", fontFamily: FONTS.ui, fontSize: 11, fontWeight: 500, letterSpacing: "0.2em", textTransform: "uppercase", color: active ? "#F6F3ED" : "#AAA39A", transition: "color 0.25s ease"` | `:74-90` |
| Active underline | `<motion.span layoutId="ayes-nav-underline" style={{ position:"absolute", left:2, right:2, bottom:0, height:2, borderRadius:2, background: GRADIENT }} />` where `GRADIENT = "linear-gradient(90deg,#D8B75A 0%,#C88B58 30%,#A45FDB 70%,#7A48FF 100%)"` | `:14`, `:150-161` |
| Active-route test | `isActive()` — Services matches `SERVICES_RE`, Work matches `/^\/(Work|Branding|…)/`, else `pathname === item.to || pathname.startsWith(item.to + "/")` | `:18-23` |
| Dropdown panel | `panelStyle`: `top: "calc(100% + 16px)", background: "rgba(8,9,8,0.92)", border: "1px solid rgba(255,255,255,0.09)", backdropFilter: "blur(18px)", borderRadius: 24, boxShadow: "0 30px 80px rgba(0,0,0,0.55)"` | `:25-36` |
| CTA | `<CinematicButton label="Start a Project" accent="#D8B75A" onClick={() => go("/Contact")} />` in `.ayes-nav-cta` | `:299-301` |
| Focus ring | `.ayes-nav-root button:focus-visible { outline: 2px solid #D8B75A; outline-offset: 3px; border-radius: 6px; }` | `:524-530` |

Page content must clear the 80px bar itself — the nav is fixed and adds no spacer. Existing pattern: `MethodIntro` uses `paddingTop: 'clamp(140px, 16vw, 220px)'` (`kit.jsx:164`); the hub hero uses `padding: clamp(96px, 10vw, 140px) … 0` (`hero.css:39`); `.motion-page main { padding-top: 80px; }` (`AiVideos.css:14`).

### Logo — `src/components/ayesmaj/LogoMark.jsx`
- `<img src="/assets/ayesmaj/logo-a.webp" height={size}>` + real-text wordmark (`:17-23`).
- Wordmark: `fontFamily: FONTS.myriad, fontSize: Math.max(15, Math.round(size * 0.46)), fontWeight: 700, letterSpacing: "0.16em", color "#F6F3ED"` (`:26-37`).
- "STUDIOS" line: `fontSize: Math.max(8, Math.round(size * 0.2)), letterSpacing: "0.34em", marginTop: 3, background: "linear-gradient(90deg,#D8B75A 0%,#C88B58 30%,#A45FDB 70%,#7A48FF 100%)", WebkitBackgroundClip: "text", color: "transparent"` (`:39-55`).
- Gap between mark and text: `gap: size * 0.32` (`:16`). Sizes in use: nav 40, drawer 36, footer 34.

---

## Buttons

### Site-wide: `CinematicButton` — `src/components/ayesmaj/CinematicButton.jsx`
Props `label, accent="#FFB000", onClick, variant="outline"|"solid", size="md"|"lg"` (`:16-22`). Styles (`:49-69`):
```
height: isLg ? 60 : 54;  padding: isLg ? "0 40px" : "0 32px";  borderRadius: 999;
border: 1px solid (solid ? transparent : accent);
background: solid ? accent : "rgba(0,0,0,0.25)";  backdropFilter: blur(16px);
fontFamily: FONTS.ui; fontSize: isLg ? 13 : 12; fontWeight: 700; letterSpacing: "0.2em"; textTransform: uppercase;
transition: "background 0.35s ease, box-shadow 0.35s ease, color 0.35s ease"
```
Hover: `boxShadow = "0 0 32px ${accent}"`, outline variant bg → `"rgba(255,255,255,0.06)"` (`:70-74`). Magnetic drift `x*0.22, y*0.22` with `spring stiffness 200, damping 15, mass 0.4`, `whileTap scale 0.96` (`:33`, `:45-47`). Solid label/arrow color `#030303` (`:80`, `:86`). Arrow `ArrowRight size 16/18` (`:83-90`). Canonical uses: nav `accent="#D8B75A"`; footer `variant="solid" size="lg"` + `accent={IVORY}` outline.

### Interior world: `.idv-btn` — `src/pages/interior/interior.css:171-195`
```css
.idv-btn { display:inline-flex; align-items:center; gap:10px; font-family:var(--idv-sans); font-weight:600; font-size:13.5px;
  letter-spacing:0.02em; padding:15px 30px; border-radius:999px; border:1px solid var(--idv-ink); cursor:pointer; text-decoration:none;
  transition: transform 0.3s cubic-bezier(0.22,1,0.36,1), background 0.3s ease, box-shadow 0.3s ease, color 0.3s ease; }
.idv-btn--primary { background: var(--idv-ink); color: #FAF7F1; }
.idv-btn--primary:hover { transform: translateY(-2px); box-shadow: 0 14px 30px rgba(22,20,15,0.28); }
.idv-btn--ghost { background: #FFFFFF; color: var(--idv-ink); border-color: var(--idv-stone); }
.idv-btn--ghost:hover { border-color: var(--idv-ink); transform: translateY(-2px); }
.idv-btn svg { transition: transform 0.25s ease; }  .idv-btn:hover svg { transform: translateX(4px); }
.idv-btn:focus-visible { outline: 3px solid rgba(200,150,62,0.55); outline-offset: 3px; }
```
React wrapper: `IdvButton({ to, children, ghost=false, onClick })` → `idv-btn idv-btn--primary|--ghost` + `<ArrowRight size={16} strokeWidth={2}/>` (`kit.jsx:127-137`).

Dark-ground variants of the same class (no new class needed):
- Hero: `.idh-btn { background: transparent; color: #F5F5F0; border: 1px solid rgba(255,255,255,.38); text-transform: uppercase; letter-spacing: .14em; font-size: 12px; }` `.idh-btn--gold { color: var(--gold); border-color: rgba(216,183,90,.75); }` hover/focus → `border-color: var(--gold); color: var(--gold)` (`hero.css:50-52`), used as `className="idv-btn idh-btn idh-btn--gold"` (`InteriorDesignHero.jsx:98-99`).
- Inline ghost-on-black: `style={{ background:'transparent', color:'#F5F5F0', borderColor:'rgba(255,255,255,0.35)', padding:'10px 18px', fontSize:11.5 }}` (`InteriorDesign.jsx:315`).
- Small combo pills: `className="idv-btn idv-btn--ghost" style={{ padding:'10px 18px', fontSize:13 }}` (`kit.jsx:214`).

Motion-VFX page buttons (reference only, do not import): `.motion-button { min-height:56px; padding:0 27px; border-radius:999px }`, `--primary { color:#fff; background:#181511; box-shadow:0 18px 45px rgba(40,31,23,.2) }`, `--ghost { border:1px solid rgba(38,30,22,.24); background:rgba(255,255,255,.52) }` (`AiVideos.css:109-128`).

Floating CTA: `FloatingProjectTab` (`kit.jsx:29-60`) is already rendered by `InteriorShell` — desktop pill `right:26, bottom:26, padding:'13px 22px', background:'rgba(8,9,8,0.95)', border:'1px solid rgba(216,183,90,0.65)', fontSize:12, letterSpacing:'0.1em'`, hover `boxShadow:'inset 0 -2px 0 #A35BDA'`; mobile sticky bar under 860px. Pages must not add their own.

---

## Typography

### Fonts loaded — `index.html:26`
`https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&family=Source+Sans+3:wght@600;700&family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&display=swap`

### Stacks — `src/components/ayesmaj/theme.js:60-65`
```js
display: "'Anton', 'Bebas Neue', 'Oswald', system-ui, sans-serif",
card:    "'Outfit', 'DM Sans', system-ui, sans-serif",
ui:      "'DM Sans', 'Inter', system-ui, sans-serif",
myriad:  "'Myriad Pro', 'Myriad', 'Source Sans 3', 'Segoe UI', sans-serif",
```
Global: `body { font-family: 'DM Sans', system-ui, -apple-system, sans-serif; color: #F2EDE4; background: #030303 }` and `h1–h6 { font-family: 'Anton', 'Bebas Neue', 'Oswald', system-ui, sans-serif; letter-spacing: 0.005em; }` (`src/index.css:39-54`).
Interior tokens (`interior.css:27-30`): `--idv-serif: 'Outfit','DM Sans',…` · `--idv-sans: 'DM Sans','Inter',…` · `--idv-mono: 'DM Sans','Inter',…` · `--idv-display: 'Anton','Bebas Neue','Oswald',…`. Note `--idv-mono` is DM Sans, not a monospace. `.idv2-chip` alone references `var(--idv-font-mono, 'DM Mono', ui-monospace, monospace)` (`interior2.css:320`) — that var is never defined, so chips fall back to DM Mono/monospace.

### Scale actually used

| Class | font | size | line-height | letter-spacing | Source |
|---|---|---|---|---|---|
| `.idv2-display` | `--idv-display`, 400, uppercase | `clamp(66px, 8vw, 138px)` | `0.88` | `0.004em` | `interior2.css:21-29` |
| `.idv2-display--hero` | (modifier) | `clamp(46px, 4.6vw, 88px)` | `0.92` | — | `interior2.css:79` |
| `.idh-h1` (hub hero) | | `clamp(44px, 4.9vw, 92px)`; ≤1439px `clamp(42px, 4.6vw, 76px)`; ≤767px `clamp(38px, 11vw, 52px)` | `0.92` | — | `hero.css:45,127,143` |
| `.idv2-h2` | `--idv-display`, 400, uppercase | `clamp(48px, 6vw, 96px)`; ≤860px `clamp(36px, 10vw, 52px)` | `0.92` | `0.004em` | `interior2.css:30-38`, `:224` |
| `.idv-display` (method pages h1) | `--idv-display`, 400, uppercase | `clamp(52px, 6.5vw, 108px)`; ≤860px `clamp(40px, 11vw, 60px)` | `0.95` | `0.005em` | `interior.css:65-73`, `:422` |
| `.idv-h2` | same | `clamp(34px, 4.2vw, 64px)` | `1` | `0.005em` | `interior.css:75-83` |
| `.idv-h3` | `--idv-serif` (Outfit) 600 | `clamp(22px, 2.2vw, 32px)` | `1.1` | — | `interior.css:85-91` |
| `.idv-lede` | inherits sans | `clamp(15px, 1.3vw, 18px)` | `1.7` | — ; `color: var(--idv-graphite); max-width: 620px` | `interior.css:93-98` |
| `.idv-eyebrow` | `--idv-mono` 600 uppercase | `12px` | — | `0.22em`; `color: var(--idv-olive)` | `interior.css:56-63` |
| `.idv-mono-label` | `--idv-mono` 600 uppercase | `11px` | — | `0.2em`; `color: var(--idv-olive)` | `interior.css:109-116` |
| `.idv2-serif` | `'Instrument Serif', Georgia, serif`, italic, no uppercase | — | — | `0` | `interior2.css:45-50` |

Dark-section recolors: `.idv2-dark .idv-lede { color: rgba(245,245,240,0.74) }`, `.idv2-dark .idv-mono-label { color: rgba(245,245,240,0.55) }` (`interior2.css:85-86`); same for `.idv2-spatial` (`:104-105`) and `.idv2-hero` (`.76` / `.55`, `:69-70`).

Reference sizes elsewhere (for matching weight, not for import): Studio hero h1 `clamp(44px,7.6vw,116px)`, lh `0.94`, ls `0.01em` (`Studio.jsx:99`); Studio manifesto h2 `clamp(32px,5.2vw,76px)` lh `1.0` (`:110`); Motion-VFX h1 `clamp(72px, 7.7vw, 132px)` lh `.87` ls `-.018em` (`AiVideos.css:82-90`); Home hero h1 `clamp(40px, 6.8vw, 108px)` lh `0.92` ls `0.005em` (`HeroWorlds.jsx:81-82`); `SectionHeader` title `clamp(30px, 4.4vw, 64px)` lh `1.0` (`SectionHeader.jsx:56-59`); footer pre-footer h2 `clamp(2.6rem, 7vw, 6.4rem)` lh `1.02` (`AyesmajFooter.jsx:178-179`).

---

## Gradient text

**Interior world (use this):** `interior2.css:17,39-44`
```css
--idv2-grad: linear-gradient(92deg, #D8B75A 0%, #E08D4B 22%, #E0664B 42%, #C25AA8 66%, #A35BDA 84%, #7A48FF 100%);
.idv2-grad { background: var(--idv2-grad); -webkit-background-clip: text; background-clip: text; color: transparent; }
```
Usage: one gradient phrase per section, e.g. `<h2 className="idv2-h2">One project. <span className="idv2-grad">Multiple levels</span> of understanding.</h2>` (`InteriorDesign.jsx:101`). On dark heroes, never put `text-shadow` on it: `.idh-h1 .idv2-grad { text-shadow: none; filter: drop-shadow(0 2px 10px rgba(5,5,7,.55)); }` (`hero.css:47`).

Legacy interior accent (method pages, `interior.css:25,101-107`): `--idv-gradient: linear-gradient(90deg, #D8A23A 0%, #C58B57 30%, #A35BDA 70%, #7A48FF 100%)`, `.idv-accent { background: var(--idv-gradient); -webkit-background-clip: text; background-clip: text; color: transparent; }`. Also `.idv-stage-num`, `.idv-fan-num` use it.

Per-stage accent (`interior2.css:236-244`): `.idv2-acc-capture { --acc:#7FA6C8; --acc2:#A35BDA }`, `-understand { #D8B75A; #E0664B }`, `-experience { #E08D4B; #A35BDA }`, `-present { #D8B75A; #7A48FF }`; `.idv2-acc-text { background: linear-gradient(92deg, var(--acc,#D8B75A), var(--acc2,#7A48FF)); …clip text }`; `.idv2-acc-rule { height:2px; background: linear-gradient(90deg, var(--acc), var(--acc2), transparent); opacity:.8 }`.

**Site gradient (nav underline, logo "STUDIOS", footer, Studio page):** `linear-gradient(90deg,#D8B75A 0%,#C88B58 30%,#A45FDB 70%,#7A48FF 100%)` (`AyesmajNav.jsx:14`, `LogoMark.jsx:46`, `AyesmajFooter.jsx:20-21`, `Studio.jsx:14`). Studio applies it as `gradText = { backgroundImage: GRAD, WebkitBackgroundClip:'text', backgroundClip:'text', WebkitTextFillColor:'transparent', color:'transparent' }` (`Studio.jsx:16-22`). Motion-VFX em: `linear-gradient(100deg, #c99730 0%, #d26950 48%, #7e48dd 100%)` (`AiVideos.css:95`). Global utilities `.text-gradient-gold` `linear-gradient(135deg, #C8A44E 0%, #E6C36A 100%)` and `.text-gradient-purple` `linear-gradient(135deg, #A78BFA 0%, #22D3EE 100%)` exist in `index.css:150-161` but are not used in the Interior world.

---

## Colors / tokens

### `.idv-page` custom properties — `interior.css:9-34`
```
--idv-porcelain:#F5F0E9  (page ground)   --idv-bone:#EDE6DC  (alt section)   --idv-canvas:#E4DCCF (media placeholder)
--idv-panel:#FFFFFF (cards)   --idv-dark-panel:#101010
--idv-ink:#16140F   --idv-graphite:#4A463E   --idv-walnut:#8A8072 (captions)   --idv-olive:#6F6A5E (labels)
--idv-champagne:#C8963E (gold on ivory)   --idv-stone:#DCD3C4 (borders)   --idv-pool:#91AEB5
--idv-gradient: linear-gradient(90deg, #D8A23A 0%, #C58B57 30%, #A35BDA 70%, #7A48FF 100%)
--idv-max:1280px   --idv-pad:clamp(20px, 4vw, 64px)   --idv-shadow: 0 18px 44px rgba(62, 48, 24, 0.1)
```
`.idv-page { background: var(--idv-porcelain); color: var(--idv-ink); font-family: var(--idv-sans); min-height: 100vh; }` (`:36-39`).

### `.idv-page` v2 overrides — `interior2.css:9-18` (loaded after, wins)
```
--idv-max:1560px   --idv-pad:clamp(24px, 4.5vw, 84px)
--idv2-ink:#16140F   --idv2-ivory:#F5F0E9   --idv2-black:#0A0908   --idv2-black2:#11100E   --idv2-grad: (see above)
```

### `COLORS` — `theme.js:4-13`
```js
black:"#030303", black2:"#070707", black3:"#0B0B0B", white:"#F5F5F0", gray:"#A9A9A9", muted:"#6F6F6F",
border:"rgba(255,255,255,0.12)", glass:"rgba(255,255,255,0.045)"
```
Hard-coded brand constants used across nav/footer: gold `#D8B75A`, ivory `#F6F3ED`, nav inactive `#AAA39A`, menu text `#D7D1C8`, footer body `#B3ACA2`, footer muted `#8A8277`, purple `#A35BDA`/`#7A48FF`. Dark-section text in the Interior world is `#F5F5F0`.

---

## Backgrounds

### Bright grounds — `interior2.css:88-92`
```css
.idv2-bright { background: #F6F0E7; color: var(--idv2-ink); }
.idv2-gradient-soft { color: var(--idv2-ink); background: linear-gradient(115deg, #F5EFE4 0%, #F2E7CF 40%, #EDE4F2 100%); }
```
Legacy washes: `.idv-wash { background: radial-gradient(900px 480px at 88% -8%, rgba(163,91,218,0.13), transparent 62%), radial-gradient(760px 420px at 6% -4%, rgba(216,150,90,0.15), transparent 56%); }` (`interior.css:49-53`); `.idv-section--bone { background: var(--idv-bone) }` (`:124`); `.idv-cta { background: var(--idv-bone); border-top: 1px solid var(--idv-stone) }` + gradient hairline `::before` at `opacity .6` (`:382-394`).

### Dark grounds — `interior2.css:62-68, 81-84, 95-103`
```css
.idv2-dark { color:#F5F5F0; background: linear-gradient(180deg, var(--idv2-black) 0%, var(--idv2-black2) 100%); }
.idv2-hero { color:#F5F5F0; background:
  radial-gradient(1100px 620px at 82% 4%, rgba(122,72,255,0.2), transparent 60%),
  radial-gradient(820px 460px at 16% 110%, rgba(216,151,60,0.16), transparent 58%),
  linear-gradient(180deg, #060607 0%, #0B0A10 68%, #14100C 100%); }
.idv2-spatial { color:#F5F5F0; background:
  linear-gradient(rgba(155,92,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(155,92,255,0.05) 1px, transparent 1px),
  radial-gradient(900px 500px at 20% 15%, rgba(120,140,170,0.12), transparent 60%), linear-gradient(180deg, #0B0B0D, #100F12);
  background-size: 64px 64px, 64px 64px, auto, auto; }
```
Hub hero ground: `.idh { background:#070708 }` with the `.idh-atmo` layered vignette (`hero.css:4-34`). Bridges: `.idv2-spill { height:1px; background: var(--idv2-grad); opacity:0.55 }` (`interior2.css:108`).

### Generated background library — `interior-bg.css` + `DarkSectionBackground.jsx`
Files in `/interior-design/backgrounds/{web,mobile}/`: `01-cosmic-energy-flow`, `02-architectural-grid`, `03-stone-bronze-material`, `04-geometric-facets`, `05-silk-wave-flow`, `06-dark-concrete`, `07-cinematic-light-leak`, `08-topographic-contours` (`DarkSectionBackground.jsx:344-354`).

**CSS-only (subpages):** `className="idv2-section … idv2-bgc idv2-bgc-NN"` (`interior-bg.css:18-26`). `.idv2-bgc { background-size:cover !important; background-repeat:no-repeat !important; background-color:#08080A !important; }`. Each `-NN` bakes a readability gradient over the web image, e.g. `.idv2-bgc-01 { background-image: linear-gradient(90deg, rgba(5,5,6,.9) 0%, rgba(5,5,6,.66) 36%, rgba(5,5,6,.28) 70%, rgba(5,5,6,.14) 100%), url('/interior-design/backgrounds/web/01-cosmic-energy-flow.webp') !important; background-position: center right !important; }`. Positions: 01/03/04 `center right`; 02/08 `right bottom`; 05/07 `center bottom`; 06 `center`. `.idv2-bgc--right` flips 01–04/08 to `center left` (`:29-30`). Under 860px every class swaps to `/mobile/` with a 180deg gradient (`:33-42`). `.idv2-bgc--fade-top` adds a `clamp(80px,12vw,160px)` fade from `var(--bgc-fade, #050505)` (`:51-54`). Rule from memory: one asset per page, **03 stone-bronze is footer-only** (the footer pre-footer is `idv2-bgc idv2-bgc-03`, `AyesmajFooter.jsx:147`).

**React (hub / pages with parallax+grain):** `<DarkSectionBackground asset position="center right" mobilePosition="center" overlay={0.6} textSide="left"|"right"|"center"|"both" parallax="subtle"|"none" glow="none"|"gold"|"purple" />` (`DarkSectionBackground.jsx:366-369`). `asset` is one of the keys `cosmic-energy | architectural-grid | stone-bronze | geometric-facets | silk-wave | dark-concrete | cinematic-light | topographic`. Layers: `<picture>` (mobile webp ≤860px → avif → webp) with `inset:-12` and `y` drift `[-10,10]px` (off under reduced motion), overlay from `overlayFor(textSide, overlay)` (`:358-364`), optional glow `radial-gradient(700px 420px at 85% 100%, rgba(216,183,90,0.14), transparent 60%)` / `… at 85% 0%, rgba(163,91,218,0.16) …`, then SVG grain at `opacity 0.07, mixBlendMode 'overlay'` (`:398`). Parent must be `.idv2-section` (`position:relative; overflow:clip`, `interior2.css:57`); content sits in `.idv2-inner`/`.idv2-pin-wrap` which get `z-index:1` (`interior-bg.css:10`). Hub examples: `asset="architectural-grid" position="right bottom" overlay={0.7} textSide="left" parallax="none"` (`InteriorDesign.jsx:45`), `asset="geometric-facets" … overlay={0.58} glow="purple"` (`:129`), `asset="cosmic-energy" overlay={0.62}` (`:282`), `asset="topographic" overlay={0.55} glow="gold"` (`:427`).

---

## Section padding / containers

| Primitive | Value | Source |
|---|---|---|
| `.idv2-section` | `position: relative; overflow: clip;` (clip, not hidden — hidden kills `position:sticky`) | `interior2.css:53-57` |
| `.idv2-inner` | `max-width: var(--idv-max); margin: 0 auto; padding: clamp(84px, 9vw, 150px) var(--idv-pad); position: relative;` | `interior2.css:58` |
| `--idv-max` / `--idv-pad` | `1560px` / `clamp(24px, 4.5vw, 84px)` (v2 override of 1280px / `clamp(20px,4vw,64px)`) | `interior2.css:11-12` |
| `.idv-section` (legacy) | `max-width: var(--idv-max); margin:0 auto; padding: clamp(72px, 9vw, 150px) var(--idv-pad);` · `--flush { padding-top:0 }` · `--bone { background: var(--idv-bone); max-width:none }` | `interior.css:119-127` |
| `.idv2-full` | `min-height: 100svh; display:grid; align-items:end; color:#F5F5F0;` img absolute cover, `.idv2-full-scrim: linear-gradient(90deg, rgba(6,5,4,0.78) 0%, rgba(6,5,4,0.35) 46%, rgba(6,5,4,0.12) 100%)`, `.idv2-full .idv2-inner { padding-top: clamp(120px,14vw,200px) }` | `interior2.css:156-166` |
| Grids | `.idv-grid-2 { 1fr 1fr; gap clamp(24px,4vw,72px) }` `.idv-grid-3 { repeat(3,1fr); gap clamp(18px,2.5vw,36px) }` `.idv-grid-4 { repeat(4,1fr); gap clamp(14px,2vw,28px) }` | `interior.css:137-139` |
| Section head | `SectionHead({eyebrow,title,lede})` → `<header className="idv-reveal" style={{ display:'grid', gap:18, marginBottom:'clamp(36px, 5vw, 64px)' }}>` with `.idv-h2` | `kit.jsx:83-92` |
| Hub head block pattern | `<div className="idv2-reveal" style={{ display:'grid', gap:18, maxWidth:1000 }}> <Eyebrow/> <h2 className="idv2-h2"/> <p className="idv-lede"/>` | `InteriorDesign.jsx:99-103` |

Breakpoints in use: `860px` (interior mobile: grids collapse, type scale, bg mobile crops, PinSeq/scroll-film flatten, FloatingProjectTab bar), `900px` (case grid), `1023px` (nav collapses to burger; hero layout), `767px` (hero/footer mobile), `1439px` (hero h1 step). Site container elsewhere: `maxWidth: 1320, padding: '0 clamp(24px,5vw,80px)'` (`Studio.jsx:37`, footer `AyesmajFooter.jsx:173,411`).

---

## Radii / shadows

| Element | Radius | Shadow / border | Source |
|---|---|---|---|
| Figures / images | `16px` | frame: `border: 1px solid rgba(255,255,255,0.8); box-shadow: var(--idv-shadow)` | `interior.css:143-165` |
| `--idv-shadow` | — | `0 18px 44px rgba(62, 48, 24, 0.1)` | `interior.css:34` |
| `.idv-stage` / `.idv-case` | `20px` | `border: 1px solid rgba(255,255,255,0.9); box-shadow: var(--idv-shadow)`; hover `translateY(-6px)` + `0 28px 60px rgba(62,48,24,0.16)` / `0 30px 64px rgba(62,48,24,0.18)` | `interior.css:198-209`, `:363-375` |
| `.idv2-stage` | `20px`, img `12px` | `border-top: 3px solid var(--stage-accent, var(--idv-champagne)); box-shadow: 0 18px 44px rgba(62,48,24,0.1); background:#FFFDF9` | `interior2.css:134-141` |
| `.idv2-case-card` | `22px` | `box-shadow: 0 24px 56px rgba(62,48,24,0.16); background:#0B0B0D` | `interior2.css:335` |
| `.idv2-truths-media img` | `20px` | `border: 1px solid rgba(255,255,255,0.6); box-shadow: 0 30px 70px rgba(62,48,24,0.2)` | `interior2.css:176` |
| `.idv2-truths-panel` / `.idv2-float-label` | `14px` / `12px` | `background: rgba(10,9,8,0.88)` / `rgba(8,8,10,0.82)`; `border: 1px solid rgba(216,183,90,0.4)`; `backdrop-filter: blur(12px)` / `blur(10px)` | `interior2.css:177-183`, `:289-296` |
| `.idv2-collage-frame` | `14px` | `border: 1px solid rgba(255,255,255,0.16); box-shadow: 0 26px 60px rgba(0,0,0,0.55)` | `interior2.css:202-206` |
| `.idv2-honest` | `16px` | `gap:1px; background: var(--idv-stone); border: 1px solid var(--idv-stone)`; cells `#FFFDF9` | `interior2.css:197-198` |
| Pills (buttons, chips, switch, rail links) | `999px` | — | throughout |
| Hero screen | `22px` (18px ≤767px) | `border: 1px solid rgba(216,183,90,.42); box-shadow: 0 40px 90px rgba(0,0,0,.55), 0 8px 24px rgba(0,0,0,.35), inset 0 0 0 1px rgba(255,255,255,.04)` | `hero.css:61-69` |
| Nav panel / footer strip | `24px` / `14px` | `0 30px 80px rgba(0,0,0,0.55)` / `1px solid rgba(255,255,255,0.09)` | `AyesmajNav.jsx:33-34`, `AyesmajFooter.jsx:259-260` |

---

## Image treatments

`MediaFigure({ src, alt, caption, tag, ratio=''|'45'|'sq'|'wide', video=false, poster, className='', eager=false })` (`kit.jsx:95-112`) renders `<figure className="idv-figure idv-figure--frame">` with `<img loading="lazy" decoding="async">` or `<video muted loop playsInline autoPlay preload="none" aria-label={alt}>`, then `<figcaption><span>{caption}</span>{tag && <span>{tag}</span>}</figcaption>`.

CSS (`interior.css:142-168`):
```css
.idv-figure { margin:0; }
.idv-figure img, .idv-figure video { display:block; width:100%; height:auto; border-radius:16px; background: var(--idv-canvas); }
.idv-figure figcaption { display:flex; justify-content:space-between; gap:12px; padding-top:10px; font-family:var(--idv-mono); font-weight:600; font-size:11px; letter-spacing:0.16em; text-transform:uppercase; color:var(--idv-walnut); }
.idv-figure--frame img, .idv-figure--frame video { border:1px solid rgba(255,255,255,0.8); box-shadow: var(--idv-shadow); }
.idv-ratio { aspect-ratio:16/10; object-fit:cover }  .idv-ratio-45 { 4/5 }  .idv-ratio-sq { 1/1 }
```
Full-bleed/pinned media: `.idv2-pin img, .idv2-pin video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover }` + `.idv2-pin-scrim { linear-gradient(90deg, rgba(5,5,5,0.82) 0%, rgba(5,5,5,0.4) 50%, rgba(5,5,5,0.15) 100%) }` (`interior2.css:170-172`). Horizontal strip: `.idv-strip` (`flex; gap:14px; overflow-x:auto; scroll-snap-type:x mandatory`, children `flex:0 0 clamp(220px,26vw,340px)`, `78vw` ≤860px) (`interior.css:312-322`, `:423`). 3D stage: `<ModelViewer model auto stage shift={0.25}/>` inside `.idv2-m3d` within `.idv2-section idv2-spatial idv2-m3d-section` (`InteriorDesign.jsx:128-132`; CSS `interior2.css:302-331`).

---

## Cards

- **`.idv-case`** (`interior.css:363-379`): white panel, `border-radius:20px; overflow:hidden; border:1px solid rgba(255,255,255,0.9); background:var(--idv-panel); box-shadow:var(--idv-shadow)`; hover `translateY(-6px)`; img `transition: transform 0.6s cubic-bezier(0.22,1,0.36,1)` → `scale(1.035)`; `.idv-case-meta { padding:18px 20px 22px; display:grid; gap:6px }`, last span `--idv-serif 600`.
- **`.idv2-case-card`** (`interior2.css:334-356`): 12-col grid `.idv2-cases { grid-template-columns: repeat(12, minmax(0,1fr)); gap: clamp(14px,1.8vw,24px); grid-auto-rows: clamp(300px,34vw,500px) }`; spans `--a: span 7`, `--b: span 5`, `--wide: span 12` (all `span 12` ≤900px). Inside: `.idv2-case-link` (absolute cover link, image `transition: transform .7s` → `scale(1.04)`, `::after` scrim `linear-gradient(180deg, rgba(5,5,7,.08) 0%, rgba(5,5,7,0) 38%, rgba(5,5,7,.72) 78%, rgba(5,5,7,.9) 100%)`), `.idv2-case-num` (Anton 22px, `rgba(245,245,240,.85)`, top 18/left 20), `.idv2-case-meta` (left 22, right 84, bottom 22), `.idv2-case-name` (Anton `clamp(30px,3.2vw,48px)` lh `.95`), `.idv2-case-aud` (14.5px, `rgba(245,245,240,.78)`, `max-width:44ch`), `.idv2-case-arrow` (48px circle, `rgba(245,245,240,.12)` + `1px solid rgba(245,245,240,.35)`, hover → champagne fill, `translate(2px,-2px)`). JSX pattern: `InteriorDesign.jsx:377-398`.
- **`.idv2-stage`** (`interior2.css:133-141`): `.idv2-stages { grid-template-columns: 0.78fr 0.92fr 1.08fr 1.26fr }`; card `display:grid; gap:12px; border-radius:20px; padding:clamp(18px,2vw,28px); background:#FFFDF9; border-top:3px solid var(--stage-accent)`; `.idv2-stage-num` Anton 26px in `var(--stage-accent)`; img `aspect-ratio 4/3; border-radius 12px`. Set accent via inline `style={{ '--stage-accent': '#A35BDA' }}` (`InteriorDesign.jsx:106`).
- **`.idv-stage`** (`interior.css:198-219`): white, `border-radius:20px; padding:clamp(20px,2.4vw,32px); gap:14px`; `.idv-stage-num` Anton 20px, gradient-clipped.
- **`.idv2-chip`** (`interior2.css:319-324`): `font-size:10.5px; letter-spacing:.18em; uppercase; padding:9px 13px; border-radius:999px; border:1px solid rgba(255,255,255,.22); background:rgba(5,5,7,.45); color:rgba(245,245,240,.82)`; hover/focus → `border-color/color: var(--idv-champagne)`; `[aria-pressed="true"] { border-color: var(--idv-champagne); background: rgba(216,183,90,.16); color: var(--idv-champagne) }`; container `.idv2-chips { flex; wrap; gap:8px; margin-top:6px }`. Toggle via `aria-pressed` (`InteriorDesign.jsx:140`).
- **`.idv-switch`** (`MethodSwitcher`, `kit.jsx:115-125`, `interior.css:222-246`): white pill bar `padding:5px; border:1px solid var(--idv-stone); box-shadow:var(--idv-shadow)`; buttons `11px / 0.16em / uppercase / padding 9px 18px`; active `[aria-pressed='true'] { background:var(--idv-ink); color:#FAF7F1 }`.
- **`.idv2-line-link`** (`interior2.css:144-153`): `padding:16px 2px; border-top:1px solid rgba(255,255,255,0.16); 600 13.5px .12em uppercase`; hover champagne + `padding-left:8px`, arrow `translateX(5px)`.
- **`.idv2-rail`** sticky method nav (`MethodRail`, `kit.jsx:232-248`, `interior2.css:247-267`): `sticky top:0 z-index:40; padding:10px var(--idv-pad); background:rgba(8,9,8,0.92); blur(14px)`; links `11.5px .08em`, current `[aria-current='page'] { color:#07100A; background:var(--idv-champagne) }`.
- **`.idv2-portal`** (`NextPortal`, `kit.jsx:254-271`, `interior2.css:270-277`): black `#0B0A09`, `border-top:1px solid rgba(216,183,90,0.35)`, image at `opacity .34` → `.5` + `scale(1.03)` on hover.

---

## Motion

- **`rise()` (hub sections)** — `InteriorDesign.jsx:28-32`:
  ```js
  const rise = (d = 0) => ({ initial: { opacity: 0, y: 26 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: d, ease: [0.22, 1, 0.36, 1] } });
  ```
  Hero variant (`InteriorDesignHero.jsx:20`, `:72-74`): `EASE = [0.22, 1, 0.36, 1]`; `rise = (delay) => reduced ? { initial: false } : { initial:{opacity:0,y:22}, animate:{opacity:1,y:0}, transition:{duration:0.8, delay, ease:EASE} }` — staggered delays `0.9 → 1.55`.
- **Site `fade()` (whileInView)** — `AyesmajFooter.jsx:23-28`, `Studio.jsx:24-29`: `{ initial:{opacity:0,y:30}, whileInView:{opacity:1,y:0}, viewport:{once:true, margin:'-60px'}, transition:{duration:0.8, delay:d, ease:[0.22,1,0.36,1]} }`. Case cards use `y:36`, `margin:'-80px'`, `delay: i*0.1` (`InteriorDesign.jsx:382-385`).
- **CSS scroll reveal** — `.idv2-reveal` (`interior2.css:212-215`): `@supports (animation-timeline: view()) { animation: idv2-rise linear both; animation-timeline: view(); animation-range: entry 5% cover 28%; }` from `opacity:0; translateY(30px)`. Legacy `.idv-reveal` uses `translateY(36px)`, range `entry 5% cover 30%` (`interior.css:397-407`). No-op in browsers without `view()` (content simply shows).
- **Pinned sequences** — `.idv2-pin-wrap` + `.idv2-pin { position:sticky; top:0; height:100svh; overflow:hidden }` (`interior2.css:169-172`); reusable `PinSeq({ stages, height='350vh', accentClass, ariaLabel })` (`kit.jsx:279-329`) uses `useScroll({ target, offset:['start start','end end'] })`, flattens to stacked figures under 860px or reduced motion. Scroll-film pattern in `ScrollFilm` (`InteriorDesign.jsx:237-329`).
- **Framer `MotionConfig reducedMotion="user"`** wraps the nav (`AyesmajNav.jsx:93`); `useReducedMotion()` gates hero/pin/background parallax.
- **Reduced motion CSS**: `.idv-page *, ::before, ::after { animation:none !important; transition:none !important }` (`interior.css:409-414`); `.idv2-fan-card, .idv2-reveal { animation:none !important }` (`interior2.css:217-219`); `.idv2-bgwrap picture { transform:none !important }` (`interior-bg.css:45-47`); hero and case-card transitions off (`hero.css:156-160`, `interior2.css:356`).
- **Hover easing everywhere**: `cubic-bezier(0.22, 1, 0.36, 1)`, 0.3–0.35s lifts of `-2px` (buttons) / `-6px` (cards).

---

## Footer — `src/components/ayesmaj/AyesmajFooter.jsx`

`<AyesmajFooter/>` is one component with two layers; `InteriorShell` already renders it (`kit.jsx:74`).

1. **Pre-footer CTA** (`:146-267`): `<section className="idv2-bgc idv2-bgc-03" style={{ padding: "clamp(80px,10vw,150px) clamp(24px,5vw,80px) clamp(48px,6vw,80px)", borderTop: "1px solid rgba(255,255,255,0.09)" }}>` with the faint `logo-a.webp` watermark (`opacity 0.06`), h2 "LET'S BUILD SOMETHING **PEOPLE REMEMBER.**" (gradient span, `FONTS.display clamp(2.6rem,7vw,6.4rem)` lh `1.02`), `SITE.description` paragraph (`clamp(15px,1.6vw,17.5px)` lh `1.7`, `#D7D1C8`, max 560), two CTAs `CinematicButton "Start a Project" variant="solid" size="lg" accent="#D8B75A"` + `"View Our Work" accent="#F6F3ED" size="lg"`, then the brand film-strip marquee (`150×188`, radius 14, `ayes-marquee 40s linear infinite`, paused on hover, off under reduced motion).
2. **Global utility footer** (`:270-382`, CSS `:400-496`): `.ayes-ufoot` on `#070708` + `/assets/ayesmaj/footer/web/footer-bg.(avif|webp)` (mobile `footer-bg-1080.webp`), gradient hairline `::before`; inner `max-width:1320px; padding: clamp(64px,7vw,104px) clamp(24px,5vw,80px) clamp(48px,5vw,72px)`; grid `1.45fr 0.8fr 1.15fr 1.3fr 1.1fr` — Brand (`LogoMark size={34}`, blurb, socials 44px circles), Explore, Services, Selected Work (4 `BRANDS` thumbnails 56×40), Contact (email gradient-on-hover, phone, "Phoenix, Arizona / Working worldwide", live PHX time). Bottom bar: legal links, `© year SITE.name`, `SITE.tagline`. Mobile ≤767px: single column, `<details>` accordions.

**Rule:** because the global footer already ships the "LET'S BUILD SOMETHING PEOPLE REMEMBER" pre-footer with the 03 stone-bronze background, new Interior pages must **not** add another pre-footer/CTA band or reuse `idv2-bgc-03` anywhere above it. (`CtaBand` in `kit.jsx:140-154` exists and is used by the current 12 subpages; new pages skip it and let the footer carry the conversion.)

---

## Mobile nav — `AyesmajNav.jsx:324-500`, CSS `:503-508`

- `@media (max-width: 1023px) { .ayes-nav-links, .ayes-nav-cta { display:none !important } .ayes-nav-burger { display:flex !important } }`. Burger: 46×46 circle, `border: 1px solid COLORS.border`, `<Menu size={19}/>`, `aria-expanded`.
- Drawer: `position:fixed; inset:0; zIndex:1100; background:rgba(5,5,5,0.97); backdropFilter:blur(24px); padding:"22px clamp(20px,6vw,48px) 40px"`, `role="dialog" aria-modal`, fade `0.3s`; body scroll locked (`:67-70`); Escape closes (`:58-64`).
- Header row: `LogoMark size={36}` + 46px close circle. Primary links: `FONTS.display`, `fontSize "clamp(34px, 9vw, 52px)"`, uppercase, `letterSpacing 0.02em`, `padding 12px 0; minHeight 56`, active item gradient-clipped text; stagger `delay 0.05*i, duration 0.4, x:-20→0` (`:380-403`).
- Group labels "Services"/"Work": `11px 600 0.3em uppercase #70665A` (`:410`, `:440`); items `16px 500 #D7D1C8; padding 13px 0; minHeight 48; borderBottom 1px solid rgba(255,255,255,0.06)`.
- Contact block (mail/phone/location, gold 16px icons, `15px #AAA39A`, `minHeight 48`) then `CinematicButton "Start a Project" accent="#D8B75A" size="lg"` (`:469-497`).
- Interior-specific mobile additions already handled by the shell: `FloatingProjectTab` sticky bottom bar ≤860px (`kit.jsx:42-49`); `.idv2-rail` scrolls horizontally (`interior2.css:247-254`).

---

## Reuse map

| Need | Use exactly |
|---|---|
| Page wrapper (nav, footer, SEO, floating CTA, CSS imports) | `<InteriorShell path={…} jsonLd={…}>` — `@/components/interior/kit` |
| Header / mobile nav / logo | Already in shell (`AyesmajNav` → `LogoMark size={40}`); never re-render |
| Clear the fixed 80px header | First section `paddingTop: 'clamp(140px, 16vw, 220px)'` (`MethodIntro`) or hero `clamp(96px,10vw,140px)` |
| Page-level H1 (method pages) | `<h1 className="idv-display">` (or `.idv2-display` / `.idv2-display--hero` on dark heroes) |
| Section headline | `<h2 className="idv2-h2">` (hub scale) / `<h2 className="idv-h2">` via `SectionHead` |
| Gradient phrase in a headline | `<span className="idv2-grad">…</span>` — one per section |
| Per-stage accent gradient/rule | `idv2-acc-capture|understand|experience|present` on the section + `.idv2-acc-text` / `.idv2-acc-rule` |
| Eyebrow / small label | `<Eyebrow>` (`.idv-eyebrow`) / `className="idv-mono-label"` |
| Body lede | `className="idv-lede"` |
| Sub-heading (Outfit) | `className="idv-h3"` |
| Italic serif flourish | `className="idv2-serif"` |
| Primary button (bright) | `<IdvButton to>` → `.idv-btn.idv-btn--primary` |
| Secondary button (bright) | `<IdvButton to ghost>` → `.idv-btn.idv-btn--ghost` |
| Button on dark ground | `className="idv-btn idh-btn"` / `idh-btn idh-btn--gold` |
| Site CTA pill (nav/footer parity) | `<CinematicButton label accent="#D8B75A" variant="solid" size="lg">` |
| Section shell | `<section className="idv2-section [idv2-bright|idv2-dark|idv2-gradient-soft|idv2-spatial]"><div className="idv2-inner">` |
| Bright ground | `idv2-bright` (#F6F0E7) or `idv2-gradient-soft` |
| Dark ground, flat | `idv2-dark` |
| Dark ground with generated material (CSS-only) | `idv2-section … idv2-bgc idv2-bgc-0N` (+ `idv2-bgc--right`, `idv2-bgc--fade-top`); never 03 above the footer |
| Dark ground with parallax + grain (React) | `<DarkSectionBackground asset="…" overlay={0.55–0.7} textSide="left" glow="gold|purple|none" />` inside `.idv2-section` |
| Full-bleed image section | `.idv2-full` + `<img>` + `.idv2-full-scrim` + `.idv2-inner` |
| Pinned crossfade sequence | `<PinSeq stages height="350vh" accentClass="idv2-acc-…" />` |
| Pinned custom scroll moment | `.idv2-pin-wrap` + `.idv2-pin` + `.idv2-pin-scrim` |
| Gradient divider between sections | `<hr className="idv2-spill" />` |
| Image / video figure with caption | `<MediaFigure src alt caption tag ratio="wide|45|sq" video poster />` |
| Framed image CSS only | `.idv-figure.idv-figure--frame` + `.idv-ratio*` |
| Horizontal snap strip | `.idv-strip` |
| Two/three/four column grid | `.idv-grid-2` / `.idv-grid-3` / `.idv-grid-4` |
| Stage cards (01–04) | `.idv2-stages > .idv2-stage` with `--stage-accent`; legacy `.idv-stage` |
| Case-study cards | `.idv2-cases > .idv2-case-card--a|--b|--wide > .idv2-case-link` (+ num/meta/name/aud/arrow); simple white card `.idv-case` |
| Toggle chips (dark) | `.idv2-chips > .idv2-chip[aria-pressed]` |
| Method view switcher (bright) | `<MethodSwitcher options value onChange />` (`.idv-switch`) |
| Thin list links on dark | `.idv2-line-link` |
| Sticky method sub-nav | `<MethodRail />` (`.idv2-rail`) |
| "Next client question" hand-off | `<NextPortal methodKey image />` (`.idv2-portal`) |
| Three honest statements | `.idv2-honest` |
| Floating context label over media | `.idv2-float-label` / `.idv2-truths-panel` |
| Live 3D model stage | `<ModelViewer model auto stage shift={0.25} />` in `.idv2-m3d` within `.idv2-m3d-section` |
| Scroll-in reveal (CSS) | `className="idv2-reveal"` |
| Entry animation (framer) | `rise(delay)` → `{opacity:0,y:26}→{opacity:1,y:0}, 0.7s, [0.22,1,0.36,1]` |
| In-view animation (framer) | `fade(delay)` → `{opacity:0,y:30}`, `viewport {once:true, margin:'-60px'}`, 0.8s |
| Reduced motion | `useReducedMotion()` for framer; CSS already handles `.idv-page *` |
| Footer / conversion band | Nothing — `AyesmajFooter` (in shell) already has the pre-footer CTA; do not add `CtaBand` or any second pre-footer |
| Floating "Start a project" | Nothing — `FloatingProjectTab` is in the shell |
