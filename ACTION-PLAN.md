# SEO Action Plan — ayesmajstudios.com

Ordered by impact ÷ effort. Items 1–4 are ~30 minutes total and fix real, confirmed breakage.

---

## Quick wins — do these first (~30 min, no architecture change)

### 1. Fix `og:image` — broken social previews *(5 min)*
`index.html` currently has a relative path. Open Graph requires absolute.

```html
<meta property="og:image" content="https://ayesmajstudios.com/assets/ayesmaj/hero/hero-full-composite.png" />
<meta property="og:url"   content="https://ayesmajstudios.com/" />
<meta property="og:site_name" content="AYESMAJ Studios" />
```
**Why:** every link you share right now — LinkedIn, WhatsApp, iMessage, Slack — renders with no image.

### 2. Add Twitter Card tags *(5 min)*
```html
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="AYESMAJ Studios — Cinematic Branding & 3D Worlds" />
<meta name="twitter:description" content="Brand identity, cinematic content, premium websites, AI production and immersive 3D — one connected creative system." />
<meta name="twitter:image" content="https://ayesmajstudios.com/assets/ayesmaj/hero/hero-full-composite.png" />
```

### 3. Populate `Organization.sameAs` *(10 min)*
`siteConfig.js` has `instagram/youtube/linkedin` as empty strings, and the live JSON-LD ships `"sameAs": []`. Fill in the real profile URLs and feed them into the schema block. This is the single strongest signal telling Google which real-world entity "AYESMAJ Studios" is.

### 4. Add security headers *(10 min)*
Create/extend `vercel.json`:
```json
{
  "headers": [{
    "source": "/(.*)",
    "headers": [
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
      { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" },
      { "key": "Permissions-Policy", "value": "camera=(), microphone=(), geolocation=()" },
      { "key": "Strict-Transport-Security", "value": "max-age=63072000; includeSubDomains" }
    ]
  }]
}
```

---

## The one that actually matters

### 5. Prerender the site *(highest impact — half a day)*

**This is the fix for "Crawled – currently not indexed".** Nothing else on this list will move indexing much while every URL serves an empty 2.6 KB shell with the homepage title.

Options, cheapest first:

| Approach | Effort | Notes |
|---|---|---|
| `vite-plugin-prerender` / `puppeteer-prerender-plugin` | Low | Static HTML per route at build time; no code changes |
| `vite-react-ssg` | Medium | Requires adopting its router conventions |
| Migrate to Next.js | High | Real SSR/ISR — only worth it if the site keeps growing |

Recommended: **build-time prerendering.** Your routes are a fixed, known list (21 URLs, already enumerated in `sitemap.xml`) with no per-user content — the ideal case for it.

Each prerendered page must ship:
- its own `<title>` and meta description (`Seo.jsx` already computes these — they just need to exist pre-hydration)
- a self-referencing `<link rel="canonical">`
- real body copy and headings in the HTML

**Verify after deploy:**
```bash
curl -s https://ayesmajstudios.com/Privacy | grep -o "<title>[^<]*</title>"
```
Should return the Privacy title, not the homepage title. Today it returns the homepage title.

### 6. Return real 404s *(1 hour)*
Every unknown path currently returns HTTP 200, so Google logs Soft 404s. Prerender a 404 page and configure Vercel to serve it with a 404 status for unmatched routes.

---

## After prerendering

### 7. Per-page structured data
Add `Service` schema to each of the six service pages and `BreadcrumbList` sitewide. Add `ImageObject`/`VideoObject` on the gallery pages — you have substantial video content that is currently invisible to search.

> Do **not** add `FAQPage` schema. Rich results for it are restricted to government and healthcare sites since August 2023. Do not add `HowTo` — deprecated September 2023.

### 8. Code-split the bundle
One 1.37 MB chunk (382 KB gzip). Route-level `React.lazy()` would cut initial load substantially. Vite already warns about this on every build.

### 9. Add `/llms.txt`
Currently absent — the 200 response is the SPA fallback. A real file in `public/` improves how AI search tools summarize the studio.

### 10. Re-measure Core Web Vitals
PageSpeed was rate-limited during this audit, so LCP/INP/CLS are unknown. Re-run with an API key after prerendering and code-splitting, when the numbers will actually mean something.

---

## Process fix (do this regardless)

**Production is deployed from a laptop, not from git.** The live site runs uncommitted files: it serves DM Sans/Outfit while `main` still requests Space Grotesk, and it has JSON-LD that `main` doesn't. Until today `main` could not build at all.

Consequences: the live site can't be rolled back, rebuilt, or reviewed from the repo, and any machine-only file disappears the moment someone else deploys.

Fix: merge the branch (`web-experiences-3d-gallery` — now building green on Vercel), then deploy **only** through git pushes. Never `vercel --prod` from a working tree again.

---

## Measurement

After prerendering ships:
1. Search Console → **Validate Fix** on the *Crawled – currently not indexed* report
2. **URL Inspection** → *View Crawled Page* on `/Privacy` — confirm content appears in the raw HTML
3. Re-submit `sitemap.xml`
4. Expect 2–4 weeks for reprocessing; monitor the Pages report weekly

**Do not** expect item 5 to show results overnight. Indexing recovery is measured in weeks.
