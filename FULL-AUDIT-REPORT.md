# SEO Audit — ayesmajstudios.com

**Date:** 2026-08-16
**Target:** https://ayesmajstudios.com
**Method:** LLM-first analysis with script-backed evidence (bundled `seo` skill scripts, live HTTP fetches, rendered-DOM verification)

## Overall Score: 48 / 100 — Poor

| Category | Weight | Score | Notes |
|---|---|---|---|
| Technical SEO | 25% | 40 | Empty server HTML, no canonical, no real 404s |
| Content Quality | 20% | 55 | Real content exists but only after JS executes |
| On-Page SEO | 15% | 45 | Good homepage title/meta; nothing per-URL server-side |
| Schema / Structured Data | 15% | 60 | Valid Organization + WebSite; nothing page-level |
| Performance (CWV) | 10% | 40 | *Unmeasured* — see Environment Limitations |
| Image Optimization | 10% | 40 | Not assessable from server HTML (zero `<img>`) |
| AI Search Readiness (GEO) | 5% | 65 | Clean crawl policy; no `llms.txt` |

The score reflects **search-engine readiness, not site quality.** The site itself is well-built and the copy is strong. Nearly all of the loss comes from one architectural fact below.

---

## Root Cause: Client-Side-Only Rendering

**Finding.** Every URL on the site returns the same 2,622-byte HTML shell containing no content.

**Evidence.**

```
$ for u in / /Privacy /Terms /Worlds3D /Animations /Brands; do curl -s "https://ayesmajstudios.com$u" | md5sum; done
35a4ee95e5d7   (identical for all six URLs)
```

Parsed homepage HTML:

| Element | Value |
|---|---|
| HTML size | 2,622 bytes |
| `<h1>` | **0** |
| `<img>` | **0** |
| internal links | **0** |
| external links | **0** |
| `<link rel=canonical>` | **absent** |
| `<title>` | homepage title — *on every URL* |

**Impact.** This is the direct cause of the 11 URLs reported in Search Console as *Crawled – currently not indexed*. A crawler that does not execute JavaScript sees eleven URLs with identical, empty HTML and the same `<title>`. Google's renderer runs JS on a deferred, best-effort second pass; for a low-authority domain it is frequently postponed or skipped. Content that exists only after hydration is content Google may never weigh.

**Confidence:** Confirmed.

**Verified counter-check.** The pages *do* render correctly for users. `/Privacy` in a real browser produces a title of `Privacy Policy — AYESMAJ Studios`, one `<h1>`, and 3,817 characters of body text. The content is genuinely good — it is simply invisible in the server response.

**Fix.** Prerender at build time so each route ships static HTML with its own `<title>`, meta description, canonical, and body copy. For this Vite SPA that is a build-step addition, not a rewrite. `Seo.jsx` already computes the correct per-page values — they just need to exist before hydration.

---

## Critical Findings

### 1. No canonical tags anywhere
`<link rel="canonical">` is absent from the server HTML on every URL. With an SPA that answers on any path, this invites duplicate-URL ambiguity (`/Work` vs `/work` vs `/Work?x=1`).
**Confidence:** Confirmed. **Fix:** emit a self-referencing canonical per route during prerender.

### 2. Unknown URLs return HTTP 200 — the site cannot 404
```
GET /nonexistent-xyz123  →  200
GET /llms.txt            →  200  (byte-identical to homepage)
```
Every path returns the shell. Google classifies these as **Soft 404s**, wasting crawl budget and diluting site quality signals.
**Confidence:** Confirmed. **Fix:** serve a real 404 status for unmatched routes, or prerender a 404 page Vercel returns with the correct status.

### 3. `og:image` is a relative path
```
og:image = /assets/ayesmaj/hero/hero-full-composite.png
```
Open Graph requires an **absolute** URL. As written, link previews on LinkedIn, Facebook, WhatsApp, iMessage, and Slack will show no image.
**Confidence:** Confirmed. **Fix:** `https://ayesmajstudios.com/assets/ayesmaj/hero/hero-full-composite.png`.

### 4. `og:url` missing
Required property absent. **Fix:** emit per-page absolute `og:url`.

---

## Warnings

| # | Finding | Evidence | Fix |
|---|---|---|---|
| 5 | Twitter Card tags entirely absent | 0 / 6 present | Add `twitter:card=summary_large_image`, title, description, image |
| 6 | `og:title` too long | 70 chars (max ~60) | Shorten for social; keep the full `<title>` for search |
| 7 | No `llms.txt` | 200 response is the SPA fallback, not a file | Add a real `/llms.txt` in `public/` |
| 8 | `Organization.sameAs` is empty | `"sameAs": []` in live JSON-LD | Populate with real Instagram/YouTube/LinkedIn profiles — this is the main entity-disambiguation signal |
| 9 | Schema stops at site level | Only Organization + WebSite | Add per-page `Service` and `BreadcrumbList`; `ImageObject`/`VideoObject` on gallery pages |
| 10 | 5 security headers missing | Score 45/100 — no CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy | Add via `vercel.json` headers |
| 11 | HSTS lacks `includeSubDomains` | `max-age=63072000` | Append the directive |
| 12 | Single 1.37 MB JS bundle | 1,372,106 bytes (382 KB gzip), one chunk | Code-split by route; Vite already warns about this at build |

---

## Passing

- **HTTPS** with HSTS (`max-age=63072000`)
- **robots.txt** valid, `Allow: /`, correctly references the sitemap
- **sitemap.xml** valid XML, 21 URLs, with `changefreq` and `priority`
- **Title & meta description** present, well-written, correct length on the homepage
- **`lang`, `charset`, `viewport`** all correctly declared
- **JSON-LD** Organization + WebSite, `@id`-linked with a proper `publisher` reference — clean, valid, no deprecated types
- **No AI-crawler blocks** — GPTBot, ClaudeBot, PerplexityBot are all permitted

---

## Deployment Provenance (process risk, not an SEO finding)

Production is **not reproducible from the git repository.**

| Signal | Live site | Committed `main` |
|---|---|---|
| Google Fonts | DM Sans, Outfit, Source Sans 3 | Space Grotesk |
| JSON-LD blocks | 1 | 0 |
| Bundle size | 1,372,106 B | — (main does not build) |

The live bundle matches a local **working-tree** build byte-for-byte. Production was published by a CLI deploy from a developer machine, including uncommitted files. Meanwhile `main` could not build at all until today (a `siteConfig.js` that was imported but never tracked).

This is why the site looks healthy while every git-triggered build failed. It also means the deployed site cannot currently be rebuilt, rolled back, or code-reviewed from the repo.

---

## Environment Limitations

- **Core Web Vitals unmeasured.** Google PageSpeed Insights API returned rate-limit errors on retry. LCP/INP/CLS are **not** reported here. The 1.37 MB single-chunk bundle is a *hypothesis* for poor mobile LCP, not a measurement. Re-run with an API key to confirm.
- **Image optimization not assessable.** Server HTML contains zero `<img>` elements, so formats, dimensions, `alt` text, and lazy-loading could not be evaluated without rendering every page.
- One discarded check: grepping the minified production bundle for route names produced contradictory results (reported `Privacy` absent while the browser rendered a full Privacy page). Minification makes that method unreliable; rendered-DOM evidence was used instead.
