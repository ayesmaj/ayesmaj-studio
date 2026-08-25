# AYESMAJ Studios — Google Ads launch kit

Built 2026-08-24. Account: the one holding tag **AW-10883427183**. Targeting: **United States**.
Everything imports **PAUSED** — nothing spends until you review and enable it.

## What's in the import file

`ayesmaj-google-ads-import.csv` — three Search campaigns, 18 ad groups, ~170 reviewed keywords,
one full responsive search ad per ad group (15 headlines + 4 descriptions), and ~160 negative
keywords applied to every campaign (plus per-campaign routing negatives so e.g. "architectural"
searches never trigger the CGI campaign).

| Campaign | Daily budget in file | Ad groups |
|---|---|---|
| Interior & Architectural Visualization | $30 | 3D Floor Plans · Architectural Visualization · Interior 3D Rendering · Kitchen Design Renders · Walkthrough Films · Home Scan to 3D |
| 3D, CGI & Motion | $15 | Product CGI · 3D Worlds & Models · 3D Animation · Cinematic Brand Film & AI Video · Explainer & Product Video · Storyboards |
| Branding & Web Experiences | $15 | Custom Website Design · Interactive & 3D Web · Brand Identity · Brand Strategy & Rebrand · AI Marketing & Video · AI Social Content |

$60/day ≈ $1,800/month total. Change any budget by editing the number in the campaign row before
importing, or in Editor afterwards. If you want to start smaller, launch **only the Interior
campaign first** — it has the highest intent and the strongest landing pages.

## How to import

1. Install **Google Ads Editor** (free): https://ads.google.com/home/tools/ads-editor/
2. Open it, add your account, let it download.
3. **Account > Import > From file…** → pick `ayesmaj-google-ads-import.csv`.
4. Review the preview (it will show campaigns/ad groups/keywords/ads to be created) → **Process** → **Keep**.
5. Check the campaigns look right in the tree → **Post** (top right) to upload to your account.
6. Everything arrives paused. Do the checklist below, then enable.

## Settings the CSV cannot carry — set these in the Google Ads web UI (5 minutes)

For **each** of the three campaigns → Settings:

1. **Locations → Location options**: set to **"Presence: People in or regularly in your targeted locations"**.
   The default ("presence or interest") also shows your ads to people *abroad* who are merely
   reading about the US — a classic budget leak.
2. **Networks**: untick **Google search partners** and **Display Network** if either is ticked.
3. **Automatically created assets** and **Search Partner expansion**: off.
4. **Ad schedule**: start 24/7 (B2B buyers search at odd hours); revisit after 2–4 weeks of data.
5. **Devices**: leave at 0% adjustments initially — decide from data, not guesses.

**Bidding** is already set to **Maximize clicks** in the file. That's deliberate: Target CPA and
Maximize conversions need conversion history to work; with a new account they thrash. Add a
portfolio max CPC limit of ~$8 (Tools > Bid strategies) so one keyword can't drink the budget.
Switch to Maximize conversions only after ~15–30 recorded conversions.

## Conversion tracking — one step left (do this BEFORE enabling)

The site already fires conversion events (form submit + phone taps), verified working. GA4 records
them today. For Google Ads to see them:

1. Google Ads → **Goals → Conversions → New conversion action → Website** → scan ayesmajstudios.com
   → **Add a conversion action manually**:
   - Category **Submit lead form**, name **Contact form submit**, value: use 100 (edit later), count **One**.
2. It shows a snippet containing `send_to: 'AW-10883427183/SOMELABEL'`. Copy the part after the slash.
3. Paste it into `src/lib/track.js` → `ADS_LABELS.lead` and tell Claude to deploy (or edit + push yourself).
4. Repeat for a **Phone call → clicks on your number** action → paste into `ADS_LABELS.phoneClick`.

Until those labels are in, Ads will show zero conversions even though GA4 records them.

## Assets to add in the web UI (Editor CSV import doesn't carry these)

Add at account level (Ads → Assets), they attach to all campaigns:

**Sitelinks** (text · final URL):
- `Selected Work` · https://ayesmajstudios.com/Work
- `Interior Visualization` · https://ayesmajstudios.com/interior-design
- `Pricing & Plans` · https://ayesmajstudios.com/Pricing
- `Start a Project` · https://ayesmajstudios.com/Contact

**Callouts**: `Phoenix Studio` · `Working Worldwide` · `Interactive 3D in Browser` ·
`AI-Generated Films` · `Same-Architecture Renders` · `Plans Published Online`

**Structured snippet** — header **Services**: `3D Floor Plans, Interior Rendering,
Architectural Visualization, Product CGI, Brand Films, Web Experiences, Brand Identity`

## Launch checklist

- [ ] Import CSV in Editor, review, Post
- [ ] Location options → Presence (all 3 campaigns)
- [ ] Search partners + Display off (all 3)
- [ ] Conversion actions created, labels pasted into `src/lib/track.js`, deployed
- [ ] Sitelinks / callouts / snippet added
- [ ] Billing set up in the account
- [ ] Enable the Interior campaign first (others when comfortable)

## First 2–4 weeks — what to actually look at

- **Search terms report** (Insights → Search terms) twice a week: add anything irrelevant as a
  negative. This is the single highest-value 10 minutes in early PPC.
- Expect CPCs of roughly $3–10 on these terms; a $30/day budget buys ~4–8 quality visits/day.
  The win condition is inquiries, not traffic.
- Don't touch bidding for 2 weeks. Don't add broad match. Don't accept Google's "auto-apply
  recommendations" (turn them **off**: Recommendations → Auto-apply → disable all).

## Known trade-offs (deliberate)

- Two ad-group pairs share a landing page (Cinematic Film + Explainer on /AiVideos; Custom Website +
  Interactive 3D on /WebExperiences). Fine to launch; dedicated pages would lift Quality Score later.
- No price claims in any ad: the published prices live only on /Pricing, and ads that state prices
  not visible on their landing page erode trust and can draw disapprovals. The ads sell the work and
  ask for the brief.
- Apartment-scan keywords were held back until an apartment-scan ad group with its own ad is worth
  adding — ask Claude when you want it.
