# Performance Max — setup, screen by screen

You chose to finish the Performance Max campaign. This is how to build it so it does not
waste money. Do the steps in order. **Step 0 is not optional** — skip it and the campaign
has nothing to aim at.

Everything you need to paste or upload is in this folder:

- `pmax-assets/` — the images and logos, already cropped to the exact sizes Google demands
- the copy blocks below — headlines, descriptions, search themes
- `web-ui-paste-sheet.md` — the negative keyword list (bottom of each campaign section)

---

## Step 0 — Create the conversion actions FIRST

Performance Max works by chasing conversions. If it has none to chase, it spends your budget
guessing. Right now your account records zero, because the conversion actions do not exist yet.

1. Google Ads → **Goals → Conversions → New conversion action → Website**
2. Enter `ayesmajstudios.com` → **Add a conversion action manually**
3. Create these two, and **only** these two:

| Name | Category | Value | Count |
|---|---|---|---|
| Contact form submit | Submit lead form | 100 | One |
| Phone number click | Phone call lead | 40 | One |

4. Each one shows a snippet containing `send_to: 'AW-18408920292/SOMELABEL'`.
   **Copy the part after the slash** for both and send them to me — I paste them into the site
   and deploy. Until then Ads sees nothing.

> **The one mistake that ruins Performance Max:** letting a soft action count as a conversion.
> Do **not** create or enable conversion actions for page views, scrolls, time on site, or
> "engaged sessions", and do not let Google add them for you. PMax will happily buy ten thousand
> cheap page views and report a triumph. Only the two actions above should be marked
> "Primary" — everything else must be **Secondary**.

---

## Step 1 — Campaign settings

| Setting | Value | Why |
|---|---|---|
| Budget | 30/day to start | Account bills in EUR, so this is €30 (~$32) |
| Bidding | **Maximize conversions**, no target CPA | A target with no data makes it refuse to spend or overspend |
| Locations | United States | Your market |
| Location options | **Presence: people in your targeted locations** | The default also shows ads to people abroad merely reading about the US |
| Languages | English | |
| **Final URL expansion** | **OFF** — "Do not send traffic to URLs you don't add" | Otherwise Google picks its own landing pages off your site |
| **Automatically created assets** | **OFF** (both text and final URL) | Otherwise Google writes its own ad copy from your pages. Every line in this file was checked against what your site can actually back up. Google's will not be. |
| Ad schedule | All day | B2B buyers search at odd hours |
| Customer acquisition | "Bid equally for new and existing customers" | You have no customer list loaded |

## Step 2 — Brand exclusions and negative keywords

**Brand exclusions** (campaign settings → Brand exclusions): add **AYESMAJ Studios**.
People searching your name will find you anyway — no reason to pay for them.

**Negative keywords** (campaign settings → Negative keywords): open `web-ui-paste-sheet.md`,
find the block under *Campaign negative keywords* for **Interior & Architectural Visualization**,
and paste the whole thing. That is ~160 terms blocking jobs, courses, tutorials, software names,
"free", "cheap", students, gaming and 3D printing.

---

## Step 3 — Asset group

Name it **Interior Visualization**.
**Final URL:** `https://ayesmajstudios.com/interior-design`

### Images — folder `pmax-assets/`

Upload every file. They are already the right dimensions and under Google's size limit.

| Folder | What it is | How many |
|---|---|---|
| `1 - LANDSCAPE` | 1200 x 628 | 6 files |
| `2 - SQUARE` | 1200 x 1200 | 6 files |
| `3 - PORTRAIT` | 960 x 1200 | 6 files |
| `4 - LOGO` | square + wide logo | 2 files |

Google Ads does not accept `.webp` uploads, which is what your site uses — these are converted
to JPG already, so they will go in without complaint.

### Video — do not skip this

**If you upload no video, Google generates one for you**: a slideshow of your stills with stock
music. For a studio that sells cinematic film, that is the worst possible ad.

Video assets can only be added as **YouTube links**, not file uploads. So:

1. Upload 2–3 of your films to your YouTube channel. **Unlisted is fine** — they only need a link.
2. Good candidates already on your site:
   - `public/interior-design/projects/poolside-villa/film/house-film-desktop.mp4` — the villa walkthrough
   - `public/interior-design/generated/bathrooms/film/bathroom-film.mp4`
   - `public/interior-design/generated/apartments/film/apartment-film.mp4`
3. Paste the YouTube URLs into the video section of the asset group.

### Audience signal — **skip it**

This is the screen you got stuck on. It is optional, and yours would be empty: Analytics only
started collecting data on your site today. Click Cancel, leave it blank, continue.
Revisit in 2–3 months when there is real visitor data.

### Text — paste these, and delete whatever Google wrote

Google fills these boxes by scraping your homepage. Its version says "Strategy, Design,
Technology" and never mentions a floor plan. **Delete every auto-written line and use these.**
They were drafted three ways, then attacked by three reviewers for false claims, character
limits and vagueness. Every line below survived. Character counts are exact — two headlines sit
at exactly 30, so do not retype them by hand.

**Business name** (max 25)

```
AYESMAJ Studios
```

**Headlines** — 8 of them, max 30 characters each

```
3D Interior Rendering
3D Floor Plan Rendering
A Walkthrough Film, Not Stills
Every Room Furnished
Materials You Can Judge
Renders for Interior Designers
Show Units Before They Exist
Send Us Your Floor Plan
```

**Long headlines** — 5, max 90 characters each

```
Show the client the finished room before a single wall is built
Furnished 3D floor plans, interior renders and walkthrough films from one studio.
See the empty shell and the finished room from the same camera, same windows.
A continuous film that moves through the property, room to room, not a slideshow.
Send us the flat plan and tell us the rooms. We reply with scope and a quote.
```

**Short description** — the required one, max 60 characters

```
See the finished room before anything is built.
```

**Descriptions** — 4, max 90 characters each

```
Send us the flat plan. Get a 3D floor plan with real furniture, flooring and light.
Clients decide from what they can see. Renders show material, light and furniture scale.
Add a continuous walkthrough film, or a 3D model your client turns in the browser.
Photoreal interiors so designers can present material, light and finish decisions.
```

**Call to action:** Get quote

### Search themes — max 25, and yours are currently wrong

Search themes tell PMax what people search for. Google pre-filled yours with **49 themes about
3D animation** — a different service, pointing at an interior landing page. The cap is 25 anyway.

Delete all of them and paste these 20:

```
3d interior rendering services
3d floor plan rendering company
turn 2d floor plan into 3d
interior design rendering for client presentations
3d rendering company for interior designers
architectural rendering services for architects
photorealistic interior renders of a house
3d walkthrough animation for real estate
architectural animation and walkthrough film
3d renderings for property developers selling pre construction units
architectural visualization for developers
kitchen remodel 3d rendering
bathroom design 3d render
3d floor plan rendering for real estate listings
new build home visualization for buyers
3d building visualization for a residential development
compare two interior design options in 3d
presentation renders for client approval
architectural visualization studio united states
3d rendering for a remodel proposal
```

### Sitelinks

Delete Google's suggestions (Our Work, Services Offered, Contact Us — they say nothing). Use:

| Text | URL |
|---|---|
| Selected Work | https://ayesmajstudios.com/Work |
| 3D Floor Plans | https://ayesmajstudios.com/interior-design/3d-floor-plan-house |
| Kitchen Renders | https://ayesmajstudios.com/interior-design/kitchens |
| Start a Project | https://ayesmajstudios.com/Contact |

---

## Before you press Publish — the checklist

- [ ] Two conversion actions created, and nothing soft marked Primary
- [ ] Locations: United States only, Presence
- [ ] Languages: English only
- [ ] Final URL set to `/interior-design`
- [ ] Asset optimization: text customization OFF, final URL expansion OFF
- [ ] Budget set to what you actually want to spend
- [ ] Search themes replaced (25 max)
- [ ] Negative keyword list pasted
- [ ] Brand exclusion for AYESMAJ Studios
- [ ] Images and logo uploaded from `pmax-assets/`
- [ ] At least one real video linked from YouTube
