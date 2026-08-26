# Index coverage — diagnosis and fix (2026-08-25)

Search Console reported **18 indexed / 15 not indexed** for ayesmajstudios.com.

## The smoking gun

The prerendered HTML (what Googlebot reads before running any JavaScript) linked to
exactly **18 URLs**. Indexed count: **18**. That is not a coincidence.

Everything else on the site — including all 21 `/interior-design/*` pages — appeared
**only in sitemap.xml**, with zero crawlable internal links pointing at it. A
sitemap-only URL is the weakest discovery signal Google accepts: it knows the URL
exists, but nothing on the site says the page matters.

Measured before the fix: **27 of 42 sitemap URLs had no crawlable inbound link.**

## Each reported reason, mapped to a cause

| Search Console reason | Pages | Actual cause | Status |
|---|---|---|---|
| Discovered – currently not indexed | 7 | Sitemap-only, zero internal links | **Fixed** |
| Crawled – currently not indexed | 1 | Same, plus thin crawlable text | **Fixed** (links); see below |
| Page with redirect | 5 | The crawlable nav linked `/services`, which 308s to `/Services` | **Fixed** |
| Duplicate without user-selected canonical | 1 | `/Branding` and `/Reel` are linked but not prerendered, so they serve the SPA shell whose canonical is the homepage | **Partly** — see open item |
| Excluded by 'noindex' | 1 | Intentional. Most likely `/he/interior-design/bathrooms` | **Working as designed** |

`Page with redirect` is normally harmless — a 308 to the right page is correct
behaviour. It mattered here only because the *only* crawlable link to `/Services`
was the redirecting one.

## What changed

`scripts/prerender.mjs` built its crawlable link list from `NAV` + `FOOTER_WORK`,
which contained a redirect (`/services`) and two non-prerendered URLs (`/Branding`,
`/Reel`). It now builds from `SEO_ROUTES`, so a link can only be emitted for a URL
that is prerendered and self-canonical — both failure modes are impossible by
construction rather than fixed by hand.

Interior pages now link to the hub and to each other, putting that section one hop
from `/interior-design` (linked everywhere) and two hops from anywhere on the site.

Also added `X-Robots-Tag: noindex, nofollow` on `/he/*`. The Hebrew demo is not
prerendered, so its raw HTML carried the homepage canonical and its noindex only
existed after React rendered.

## Verified live on production

| Check | Before | After |
|---|---|---|
| Sitemap URLs with ≥1 crawlable inbound link | 15 / 42 | **42 / 42** |
| Orphaned sitemap URLs | 27 | **0** |
| Inbound links per interior page | 0 | **20** |
| Links pointing at a redirect or non-canonical URL | 3 | **0** |
| `X-Robots-Tag` on `/he/*` | absent | `noindex, nofollow` |

## What you need to do in Search Console

Indexing is Google's decision on Google's schedule — the fix removes the obstacle,
it does not force a re-crawl. Do these:

1. **Sitemaps → resubmit** `https://ayesmajstudios.com/sitemap.xml`.
2. **URL Inspection** on `/interior-design`, then **Request indexing**. That page now
   links to all 20 interior pages, so recrawling it exposes the whole section at once.
   Do the same for your 3–4 highest-value pages (`/interior-design/3d-floor-plan-house`,
   `/interior-design/kitchens`, `/interior-design/bathrooms`).
3. **Page indexing → each reason → Validate Fix**, for "Page with redirect" and
   "Discovered – currently not indexed".
4. Re-check in **2–4 weeks**. Expect movement in that window, not in days.

## Resolved — /Branding and /Reel are now indexable

The two routes were the wrong way round. `/Brands` held the SEO metadata and the
sitemap entry, but it is a client-side `<Navigate>` stub; its own comment says the
canonical portfolio lives at `/Branding`. Google was handed a 200 page that bounces
away, while the real portfolio had no metadata and served the homepage canonical —
which is what produced *Duplicate without user-selected canonical*.

- `/Branding` and `/Reel` now have their own titles, descriptions and
  self-referencing canonicals, and 43 inbound crawlable links each.
- Each `h1` matches what the page actually renders, so the prerendered and rendered
  DOM agree.
- `/Brands` is out of the sitemap and is now a server-side 308 to `/Branding`.
  `/brands` previously chained through it; it now goes straight to the canonical page.
- Sitemap: 42 → 43 URLs.

**Client names are now in the crawlable HTML for the first time.** The portfolio
renders LaCroix, Boom Chicka Pop, ASHÉ Ritual Roast, Blenday and Noam client-side
only, so those brands existed nowhere a crawler could read them — the page could not
surface for any brand-name query despite being the studio's strongest trust signal.
They now appear in the meta description and in the prerendered paragraph on
`/Branding`, and on `/Reel` for the film work. Only the five real client entries are
named; CHARACTER DESIGN, INTERIOR DESIGN and BRAND IDENTITIES are category tiles.

## Honest expectation

The technical setup was already sound: all 42 sitemap URLs return 200, each has a
correct self-referencing canonical, none carry an accidental noindex, titles are
unique, robots.txt allows everything, and per-route schema is present. This was an
**internal linking** problem, not a broken-tags problem.

For a site this young, the remaining constraint is authority — Google crawls new
domains conservatively regardless of markup. Internal links were the one lever fully
under our control, and that lever is now pulled. Real external links to the interior
pages are the next one, and no code change substitutes for them.
