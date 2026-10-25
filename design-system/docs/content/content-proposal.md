> **Source of truth.** This is the only copy (it was also at `docs/content-proposal.md` in the repo root until 2026-10-25). Status: **proposal, not applied.** The file paths below refer to the production build (`dist/index.html`, `dist/app.js`). In this folder the same strings live in `index.html`, and the step texts sit in the `data-*` attributes of the stepper pills (no `STEPS` array). Design rules it cites from `pretzel-labs-kit/DESIGN.md` are now in `../components.md` and `voice-and-copy.md`.

# Landing Page — Content Change Proposal

> Copy-only changes to the current home page (`dist/index.html` + `dist/app.js`), aligned with [`product-brief.md`](./product-brief.md).
> No visual, layout, token, component or asset changes. Prepared 2026-10-24.

**Verified, not guessed.** Every proposed string was applied to a scratch copy of `dist/` and rendered in headless Chrome. The page heights came out identical to the current site at every width. These figures were measured before the hero pill was removed; removing it shortens the page by 68px at 1440 and 87px at 390.

| Width | Current page height | With proposal |
|---|---|---|
| 1440 | 7760px | 7760px |
| 1024 | 8643px | 8643px |
| 390 | 11185px | 11185px |

Hero, nav, the "Why" tiles, the bento cards, the compare table and the footer were checked visually at each width. No new line wraps, no overflow, and the button pairs keep matching widths.

---

## 1. Page structure today

| # | Section (id) | Layout | Job on the page | Speaks to |
|---|---|---|---|---|
| 0 | Nav | Floating white capsule, 4 links + dark button; burger ≤1024 | Wayfinding + conversion | All |
| 1 | Hero (`#hero`) | Eyebrow pill → H1 with italic orange phrase → lead → orange + ghost button pair in halos → 3 tick badges → 3D pretzel | Promise + primary CTA | **Revenue leaders** (forecast badge) |
| 2 | Features (`#product`) | H2 left, lead + dark button right; bento: 2 small cards, 1 tall card, 1 wide card, with glass mock panels | What the product does | Mixed |
| 3 | Why | H2 with italic phrase; 4 flat tiles with orange line icons, h4 + one-liner | Outcomes | Mixed |
| 4 | How it works (`#how`) | H2 + lead; photo card with 5 step pills auto-rotating every 4s; glass panel with tag, big value, progress bar | Mechanism | Mixed |
| 5 | Revenue leaders (`#leaders`) | Text left, forecast glass panel right | Buyer story | VP / CRO |
| 6 | Sales managers (no id) | Glass panel left, text right | Champion story | Managers |
| 7 | Before / after (`#compare`) | H2; 3-column table, 6 rows | Proof by contrast | Managers / leaders |
| 8 | CTA (`#cta`) | Grey card, small pretzel, H2 with italic phrase, lead, single orange button, hills at the bottom | Conversion | All |
| 9 | Footer | Logo, eyebrow, tagline; 3 link columns; mailto | Wayfinding | All |

**Gap against the brief.** The hero speaks to revenue leaders; the brief says sales managers + AEs come first. Nothing on the page names an integration. Every CTA leads nowhere. Five lines cross the brief's red lines (§9).

---

## 2. Rules the copy must respect

Taken from `pretzel-labs-kit/DESIGN.md`. These are the only constraints that touch words.

1. **One italic phrase per heading**, in the existing `<em>` slot. The H1 keeps its three parts: plain → orange italic → plain.
2. **Button labels: two or three words at most.** Both buttons in a pair sit in halos; long labels make the pair uneven.
3. **One orange button per screen.** Secondary conversion uses the dark button, which already exists in the nav and the Features header.
4. **The nav must fit at 375px.** The dark nav button must not wrap; anything at or under the current 14 characters is safe.
5. **Text slot budgets.** Keep each string within roughly ±15% of its current length. Shorter is always safe; longer was checked by rendering.
6. **No new elements.** Swap text and link targets only. Adding a section, badge or column is a layout change and out of scope here (§7).
7. **Mock panels stay illustrative.** Pastry-named demo accounts stay. Numbers can change but keep their width (e.g. `$1.2M` → `$3.1M`).

---

## 3. Positioning applied

| Brief decision | What it means on this page |
|---|---|
| Vision-forward | Keep the AI comms, deal health / MEDDICC and forecast cards. Remove only the red-line claims. |
| Hero for managers + AEs | New H1, lead and badges speak to the people who run deals daily. The leaders section keeps the forecast story. |
| Self-serve trial | One label everywhere: **Start trial**. The secondary action is **How it works** (scrolls to `#how`). |
| Naming | Product = **Pretzel**; company = Pretzel Labs (logo, footer). Category = **Deal Execution Intelligence**. |

---

## 4. Proposed changes by section

Δ = character change against the current string. Everything not listed stays as it is.

### 0 · Nav

| Slot | Current | Proposed | Why | Δ |
|---|---|---|---|---|
| Link 2 (`#how`) | Solutions | How it works | Label now matches its target | +3 |
| Link 3 (`#leaders`) | Customers | Solutions | There are no customer stories; this section is the role-based solutions | 0 |
| Link 4 (`#compare`) | Company | Compare | Label now matches its target | 0 |
| Dark button | Request access | Start trial | Self-serve trial (brief §1) | −3 |

Apply to the desktop links and to the burger menu (`#nav-menu`).

### 1 · Hero

| Slot | Current | Proposed | Why | Δ |
|---|---|---|---|---|
| Eyebrow pill | Deal Execution Intelligence · Early access 2026 | **Removed** (done in `dist/` on 2026-10-24, on request) | The H1 and everything below move up by the pill plus the 30px flex gap. The "For Salesforce teams" qualifier now needs another home: the CTA lead (§8) already carries it | — |
| H1 | Your pipeline, *finally honest* with you. | Know which deals *need you* today. | Managers + AEs first (brief §1, §11) | −7 |
| Lead | Pretzel Labs is an AI-powered Deal Intelligence and Execution solution built for data-driven B2B sales teams. | Pretzel reads every email, call, and meeting on your deals and flags the ones slipping, before they're lost. | Says what it does, not what category it is; consistent naming | −1 |
| Orange button | Get a demo | Start trial | Self-serve trial | +1 |
| Ghost button | Watch a 4-min tour | How it works | No tour video exists; ≤3 words | −6 |
| Badge 1 | Signal-driven forecast | Salesforce, Gmail & Gong | Names the stack that "no rep logging" depends on | +2 |
| Badge 2 | No rep logging | *(keep)* | — | 0 |
| Badge 3 | Built for B2B revenue teams | Priced by deals, not seats | Repeated the lead; a pricing hook suits a self-serve page | −1 |

**H1 alternates** (same three-part structure, all fit): "No deal goes *quiet* without you." · "Every follow-up, *accounted for*." · keep "Your pipeline, *finally honest* with you." (it's audience-neutral) if the team prefers it.

Mobile note: with the pill gone, the H1 sits about 12px below the floating nav at 390px. The pill used to sit equally close. If it feels tight, raise the mobile hero `padding-top` (currently 130px). That's a spacing change, so it's out of this copy-only scope.

### 2 · Features (`#product`)

| Slot | Current | Proposed | Why | Δ |
|---|---|---|---|---|
| Lead | Deal intelligence for B2B sales teams that would rather act on signal than on reports. | Deal execution intelligence for sales teams that would rather act on signal than reports. | One category name across the site | +3 |
| Dark button | View all features | Start trial | No features page exists; dark = secondary conversion per DESIGN.md | −6 |
| Card "Know why a deal is at risk", body | MEDDICC coverage, threading, and comms — scored live. | Follow-ups, silence, threading, and MEDDICC — scored daily. | "Live" is a red line (daily refresh); leads with what ships | +6 |
| Card "Forecasting", panel values | $1.2M · $880k · $640k | $3.1M · $2.4M · $1.8M | Matches the leaders panel (Commit $1.8M, Best case $2.4M) so the page tells one story | 0 |

Unchanged on purpose: H2, "Every touch on one timeline" (live today), "AI to power your comms" (vision, allowed), "Forecasting you can defend" (vision, allowed), the 72/100 + MEDDICC 3/6 panel (illustration).

### 3 · Why

| Slot | Current | Proposed | Why | Δ |
|---|---|---|---|---|
| Tile 2 title | Risk, caught early | Silence, caught early | Going dark is the core live signal | +3 |
| Tile 2 line | Weeks before close, not after. | Before the deal goes cold. | Removes an unprovable timing claim | −4 |
| Tile 4 title | A number you can defend | No follow-up forgotten | AE job; the forecast promise moves to the leaders section, which already says it | −1 |
| Tile 4 line | Backed by real signal. | A next step for every call. | AE outcome | +5 |

Tiles 1 ("See the deal, not the story") and 3 ("Coaching that lands") stay; they're manager outcomes.

### 4 · How it works (`#how`)

Steps 02–05 live in `dist/app.js` (`STEPS`). Step 01 also appears in `dist/index.html` as the first frame painted before JS runs.

| Slot | Current | Proposed | Why | Δ |
|---|---|---|---|---|
| Lead | …turned into a next step — in under a minute. | …turned into a next step — every morning. | "Under a minute" is a red line; data refreshes daily | −4 |
| Step 02 title | Get a live pulse of each deal | Get a daily pulse of each deal | Honest freshness | +1 |
| Step 02 text | …execution gaps — assembled in real time. | …execution gaps — refreshed every day. | "Real time" is a red line | −3 |
| Step 02 tag | Live | Today | Same | +1 |
| Step 04 text | Tailored recommendations — run them yourself or let Pretzel handle it. | Tailored next steps — with a follow-up drafted and ready for you to send. | "Let Pretzel handle it" is a red line (no autonomous action); AI drafting is allowed vision | +3 |

Steps 01, 03 and 05 stay. Step 03's Slack/email alerts and step 05's win patterns are allowed vision.

### 5 · Revenue leaders (`#leaders`)

No text changes; this is now the VP/CRO section the brief asks for. Retarget its "Learn more →" to `#compare`.

### 6 · Sales managers

No text changes; the copy is already manager-first. Add `id="managers"` to the section so the footer link can point at it (an attribute only, no visual effect). Retarget its "Learn more →" to `#compare`.

### 7 · Before / after (`#compare`)

| Slot | Current | Proposed | Why | Δ |
|---|---|---|---|---|
| Column 2 header | Without Pretzel Labs | Without Pretzel | Product naming | −5 |
| Column 3 header | With Pretzel Labs | With Pretzel | Product naming | −5 |
| Forecast commit · without | …Accurate under 25% of the time. | …Nobody can say why it moved. | Unsourced statistic (red line) | −3 |
| Deal goes dark · with | Silence flagged on day three. Coaching cue surfaced. There is still time to act. | Silence flagged once it crosses your threshold. There is still time to act. | "Day three" is a timing promise; thresholds are configurable (brief §6) | −5 |

The other four rows stay as they are (vision-forward, no red lines).

### 8 · CTA (`#cta`)

| Slot | Current | Proposed | Why | Δ |
|---|---|---|---|---|
| Lead | Private early access. A 30-minute conversation about your pipeline. | 14 days on your own pipeline. Connect Salesforce, Gmail, and Gong to start. | Self-serve trial; sets the Salesforce prerequisite | +8 |
| Orange button | Get a demo (`href="#"`) | Start trial → trial URL | Wire the one conversion that matters | +1 |

H2 stays: "Stop managing a reporting process. *Start leading a business.*" A manager-first alternate is "Stop chasing updates. *Start closing deals.*" It's shorter, so the card would be about one line shorter; that's allowed, but it's the only option here that changes the card's height.

### 9 · Footer

| Slot | Current | Proposed | Why |
|---|---|---|---|
| Eyebrow | Deal Execution Intelligence · Early access 2026 | Deal Execution Intelligence · For Salesforce teams | Matches hero |
| Solutions › Sales managers | → `#leaders` | → `#managers` | Pointed at the wrong section |
| Solutions › Early access | Early access → `#cta` | Start trial → trial URL | One CTA label |
| Company › Customers | Customers → `#` | Privacy → privacy page | No customers yet; a self-serve signup needs legal pages |
| Company › Resources | Resources → `#` | Terms → terms page | Same |

Tagline "Built for revenue teams that want fewer surprises and better quarters." and the mailto stay.

---

## 5. Links (no visual effect)

| Element | Current target | Proposed target |
|---|---|---|
| Nav dark button, hero orange, features dark, CTA orange, footer "Start trial" | `#cta` or `#` | Trial sign-up URL *(to be provided)* |
| Hero ghost "How it works" | `#` | `#how` |
| Feature card "Learn more →" ×4 | `#cta` | Timeline + risk → `#how` · AI comms → `#how` · Forecast → `#leaders` |
| Leaders + managers "Learn more →" | `#cta` | `#compare` |

---

## 6. Head tags (not visible on the page)

| Tag | Proposed |
|---|---|
| `<title>` | Pretzel — Deal Execution Intelligence for Salesforce teams |
| `meta description` | Pretzel reads every email, call, and meeting on your deals and flags the ones slipping — missed follow-ups, unanswered emails, deals going dark. |
| Open Graph | `og:title` = title, `og:description` = description, `og:image` = a hero still from `assets/` |
| Favicon | `assets/eyebrow/7-64.webp` (the existing logo mark) |

---

## 7. Out of scope for this proposal: needs layout or design work

These help the brief's goals but add or move elements, so they're listed for a later design pass:

- **Section order:** managers before leaders, so the page reads manager → leader. This moves sections.
- **Integrations strip** with logos (Salesforce, Gmail, Gong; recorders "soon"). This adds a block.
- **Pricing section** (Basic / Extended / Pro). This adds a block and needs a decision (brief §12).
- **"Coming soon" chips on vision cards** for trial users. This adds an element; it's optional under the vision-forward decision.
- **An AE-specific section.** Today AEs are served by the hero, the Why tiles and How it works only.

---

## 8. Before this goes live

1. **Trial URL.** No production sign-up URL exists yet, and billing runs in Stripe test mode on staging only (brief §8). Until then, the "Start trial" buttons have nowhere real to go.
2. **Privacy and Terms pages** must exist before the footer links are switched.
3. **Product side:** the app's sign-in page says "Sign up for free" while the trial needs a card. Align it with "Start trial".

---

## 9. How to apply

- Edit `dist/index.html` (all text and hrefs) and `dist/app.js` (`STEPS` rows 02 and 04). Step 01's copy is unchanged.
- Leave `export/` untouched; the README treats it as the design source of truth.
- Follow repo convention: put the edits in an idempotent `tools/apply-copy-2026-10.js` so the change is reviewable and re-runnable. A working Python version of every replacement above already exists from the verification run and can be ported.
- After applying, run the DESIGN.md §10 checklist at 1440 / 1024 / 640 / 390 and compare page heights against the table at the top.
