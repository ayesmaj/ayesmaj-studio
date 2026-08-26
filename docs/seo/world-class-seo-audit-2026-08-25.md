# AYESMAJ Studios — SEO audit and implementation report (2026-08-25)

An external 12-phase SEO brief was reviewed against the repository and the live site.
This document is the honest triage: what was already true, what was implemented today,
what is proposed, and what deliberately was not done. Companion docs:
[index-coverage-2026-08-25.md](index-coverage-2026-08-25.md) (the indexing diagnosis
that preceded this).

## Executive summary

The site's technical SEO foundation was already sound before this pass, and the
week's indexing problems were internal-linking problems, not tag problems. Today's
batch closes the remaining structural gaps that could be closed without owner-only
facts: internal links no longer pass through redirects, unknown URLs no longer
masquerade as the homepage, the sitemap can no longer drift from the pages, the
Organization entity now has its public profiles, and a deterministic audit gate
(`npm run seo:audit`) makes the shipped guarantees permanent.

The biggest technical defect found — **the site header rendered no real links at
all** (every nav item a `<button>` calling `navigate()`) — was converted to real
router links the same day at the owner's request (see P1).

The biggest *non*-technical gaps are the ones no code can fill: external links,
case-study proof, and the technology-vertical positioning — all owner decisions.

## What was already strong (verified, not assumed)

- All 44 prerendered routes: unique titles, unique descriptions, self-referencing
  canonicals, exactly one h1, per-route Open Graph/Twitter/JSON-LD.
- Build fails on SEO regressions (prerender validation; now extended by `seo:audit`).
- Crawlable link graph: 0 orphaned sitemap URLs (was 27 before 2026-08-25),
  no crawlable link passes through a redirect.
- robots.txt open; `/he/*` demo correctly excluded via `X-Robots-Tag`.
- Search Console reality check: the alarming "15 not indexed" was largely stale
  data and correct-by-design exclusions; interior pages and both ads landing
  pages are indexed.

## Implemented in this batch (5 commits)

| Commit | What | Why |
|---|---|---|
| Internal links → canonicals | NAV, SERVICES_MENU and Services.jsx cards linked `/services/*` aliases that 308 to the canonical routes | Zero internal links through redirects; URL bar shows canonical paths |
| Real not-found state | Unknown URLs (served the homepage shell by the SPA catch-all) now render a 404 view that sets `noindex,nofollow`, removes the inherited homepage canonical, and titles itself | Kills the soft-404 / duplicate-of-homepage signal Search Console reported |
| Generated sitemap | `dist/sitemap.xml` is written by the prerender from `SEO_ROUTES`; `public/sitemap.xml` deleted; no `changefreq`/`priority`/fake `lastmod` | The hand-maintained file drifted twice in one week; parity now holds by construction |
| Organization `sameAs` | Instagram, LinkedIn, Facebook — the three profiles the owner published in their own email signature | Entity completeness; no guessed URLs (YouTube/Behance stay empty) |
| `npm run seo:audit` | Deterministic gate over `dist/`: orphans, redirect links, canonical mismatches, duplicate titles, sitemap parity | Every check guards a failure this site actually shipped once |

A true HTTP 404 status is not achievable behind the SPA catch-all without breaking
client-only routes (`/he/*`, detail pages); the render-time noindex is the
Google-honoured minimum, and the static-404 alternative is documented below as a
proposal, not silently attempted.

## P1 — resolved same day (owner-approved follow-up)

**Header navigation rendered zero `<a>` elements** — every nav item was a button
calling `navigate()`, so the rendered chrome had no followable links, no
middle-click/new-tab, and button semantics for screen readers. Converted the same
day: every navigational control in the header, both mega menus, the Work dropdown
and the mobile drawer is now a real router `<Link>` (anchors with canonical hrefs),
and `CinematicButton` gained a `to` prop so the four CTAs render anchors too.
Browser-verified after conversion: 8 anchors in the header and 32 internal anchors
in the drawer (previously 0 combined), zero redirect-alias hrefs, SPA navigation
preserved (no full reloads), mega menus open on hover/focus with `aria-expanded`,
drawer scroll-lock and close-on-navigate intact. The only remaining header buttons
are the burger and the drawer close — correctly buttons, since they perform actions
rather than navigate.

## The external brief, phase by phase

| Phase | Verdict |
|---|---|
| 1 Technical audit + `seo-audit` script | **Done** (`scripts/seo-audit.mjs`, static; hydration parity stays a browser check) |
| 2 Prerender/hydration parity | **Partly done** (h1s match by policy since /Branding; full parity check needs a browser harness — proposal) |
| 3 Canonicals/links/redirects | **Done** (this batch + 2026-08-25 fixes) |
| 4 Sitemap generation | **Done** (no lastmod at all rather than a dishonest build timestamp) |
| 5 Structured data / entity | **Done for what exists** (`sameAs` filled; legal name, branded email, YouTube/Behance = owner input) |
| 6 Performance / CWV | **Not in this batch** — real measurement work; substantial groundwork already shipped this week (model re-cuts, render gating, keyframe re-encodes, srcset, content-visibility). Needs its own measured pass |
| 7 Image/video search, watch pages | **Proposal** — needs owner decisions on which films get public watch pages |
| 8 Technology cluster (`/technology/*`) | **Proposal only** — positioning decision; no page will be generated from guesses |
| 9 Case-study system (`/work/*`) | **Proposal + fact checklist** — see owner input below |
| 10 Keyword data | **Blocked on data** — no `seo-inputs/` exports exist; nothing will be invented |
| 11 Content quality rewrite | **Owner-paced** — copy changes are positioning changes |
| 12 Conversion measurement | **Already done this week** (GA4 + Ads conversion tracking live and verified; `src/lib/track.js`) |

Rejected from the brief, with reasons:
- **`lastmod` from build time** — a lie; omitted entirely instead.
- **Migrating URL casing to lowercase** — the brief itself says don't; agreed.
- **AI-specific files (`llms.txt`, "GEO schema")** — the brief itself rejects them; agreed.
- **Filler content / thin pages** — nothing generated.

## Owner input required (nothing below can be done truthfully without you)

1. **Exact legal entity name** (`SITE.legalName` carries a `[REVIEW]` marker).
2. **Branded mailbox** — the domain still has no MX record; `hello@ayesmajstudios.com`
   needs Zoho/Workspace setup before it can appear anywhere.
3. **YouTube / Behance profile URLs** — confirm and they join `sameAs`.
4. **Is `/Insights` ready?** It is prerendered and linked but held out of the sitemap
   (`SITEMAP_EXCLUDE` in `scripts/prerender.mjs`). Say the word and it's one line.
5. **Case-study facts** for Podos AI / Syntropic / Electric Fuel America: permission
   to name, scope, role, dates, approved assets, any NDA limits. The brief's
   required-facts checklist is good; it needs your answers, not my guesses.
6. **Technology cluster go/no-go** — `/technology/*` pages are a positioning
   commitment. Approve the direction and the architecture proposal gets written
   against your real projects.

## Verification

```bash
npm run build       # 44 routes, 43 sitemap urls, 44 unique titles
npm run seo:audit   # exits non-zero on any regression
```

Browser-verified on the built output: unknown URL → noindex + no canonical + real
title; next SPA navigation → canonical correctly recreated; /Services canonical
survives hydration as /Services; nav/menus behave unchanged.

## Adversarial review (before deploy)

A three-lens review (regression / SEO-correctness / audit-script correctness) ran
against the batch and confirmed six real defects, all fixed and re-verified:

1. **/Services rewrote its own canonical back to the redirect source on hydration**
   — `Services.jsx` passed `path="/services"` to `Seo`, so the rendered DOM undid
   the prerendered canonical. The exact failure the batch existed to remove.
2. **NotFound leaked `noindex` onto Seo-less pages** — ~15 routes (About, Studio,
   Branding, Reel, the legal pages…) never render `Seo`; a 404 → SPA-navigate left
   them noindexed for the session. Cleanup now restores `index,follow`.
3. **/Insights was excluded from the sitemap but linked from 43 pages** — the
   exclusion now applies to the link graph too, restoring its pre-batch obscurity
   until the owner decides (see owner input #4).
4. **An empty sitemap passed the audit clean** (mutation-tested) — reverse parity
   added: every indexable route must be present, exit non-zero otherwise.
5. **The h1 check counted h1s but never compared text** — each route's prerendered
   h1 must now equal its `SEO_ROUTES` h1.
6. **Running the prerender twice stamped the homepage body onto every route** —
   it now refuses to run against an already-prerendered shell.

Both mutation tests were re-run after the fixes: the empty sitemap fails the audit,
the double prerender throws. `npm run build` now ends with the audit, so these
guarantees hold on every future build, not just today's.
