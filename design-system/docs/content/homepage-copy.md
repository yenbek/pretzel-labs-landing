# Home page copy inventory

Every visible string on the home page (`index.html`, identical to production `dist/index.html` as of 2026-10-24), by section. Use it to reuse approved phrasing on new pages and to see which lines need fixing.

**Status key**
- ✓ fine to reuse
- ⛔ crosses a red line in `product-brief.md` §9. Don't reuse; replace as proposed
- ⚠ naming, targeting or consistency issue (brief §2, §11)
- → link target

"Proposed" values come from `content-proposal.md` (not applied yet). Change copy on the live page only through that proposal or a newer decision.

---

## Head

| Slot | Current | Status | Proposed |
|---|---|---|---|
| `<title>` | Pretzel Labs | ⚠ no category, no meta description, no OG, no favicon | "Pretzel — Deal Execution Intelligence for Salesforce teams" + description: "Pretzel reads every email, call, and meeting on your deals and flags the ones slipping — missed follow-ups, unanswered emails, deals going dark." |

## 0 · Nav

| Slot | Current | Status | Proposed |
|---|---|---|---|
| Logo | Pretzel Labs → `/` | ✓ | — |
| Link 1 | Product → `#product` | ✓ | — |
| Link 2 | Solutions → `#how` | ⚠ label ≠ target | How it works |
| Link 3 | Customers → `#leaders` | ⚠ no customers exist | Solutions |
| Link 4 | Company → `#compare` | ⚠ label ≠ target | Compare |
| Dark button | Request access → `#cta` | ⚠ CTA set (see voice §8) | Start trial |

## 1 · Hero (`#hero`)

| Slot | Current | Status | Proposed |
|---|---|---|---|
| H1 | Your pipeline, *finally honest* with you. | ✓ (aimed at leaders; brief wants managers + AEs first) | Know which deals *need you* today. · alternates: "No deal goes *quiet* without you." / "Every follow-up, *accounted for*." |
| Lead | Pretzel Labs is an AI-powered Deal Intelligence and Execution solution built for data-driven B2B sales teams. | ⚠ wrong product name and category wording | Pretzel reads every email, call, and meeting on your deals and flags the ones slipping, before they're lost. |
| Primary | Get a demo → `#cta` | ⚠ CTA set | Start trial |
| Ghost | Watch a 4-min tour → `#` | ⚠ no video exists; dead link | How it works → `#how` |
| Claim 1 | Signal-driven forecast | ✓ | Salesforce, Gmail & Gong |
| Claim 2 | No rep logging | ✓ | (keep) |
| Claim 3 | Built for B2B revenue teams | ✓ | Priced by deals, not seats |
| *(removed)* | Eyebrow pill "Deal Execution Intelligence · Early access 2026" | removed from production on 2026-10-24 | — |

## 2 · Features (`#product`)

| Slot | Current | Status | Proposed |
|---|---|---|---|
| H2 | The engine behind every closed deal | ✓ | — |
| Lead | Deal intelligence for B2B sales teams that would rather act on signal than on reports. | ⚠ category wording | Deal execution intelligence for sales teams that would rather act on signal than reports. |
| Dark button | View all features → `#cta` | ⚠ no features page | Start trial |
| Tile 1 title | Every touch on one timeline | ✓ (live feature) | — |
| Tile 1 caption | Emails, calls, and meetings — captured automatically, with no rep logging. | ✓ | — |
| Tile 2 title | Know why a deal is at risk | ✓ | — |
| Tile 2 panel | Deal health · At risk · 72/100 · MEDDICC 3 / 6 | ✓ illustration | — |
| Tile 2 caption | MEDDICC coverage, threading, and comms — scored live. | ⛔ "live" | Follow-ups, silence, threading, and MEDDICC — scored daily. |
| Tile 3 title | AI to power your comms | ✓ vision, allowed | — |
| Tile 3 caption | Drafts in your voice, aware of every thread — plus a coach that plans your day. | ✓ vision | — |
| Tile 4 title | Forecasting you can defend | ✓ vision | — |
| Tile 4 caption | Pipeline, commit, and best case in one view — with slippage flagged early. | ✓ | — |
| Tile 4 panel A | This quarter · Pipeline $1.2M · Best case $880k · Commit $640k | ⚠ lower-case k; contradicts the leaders panel | $3.1M · $2.4M · $1.8M |
| Tile 4 panel B | Open pipeline · Acme Corp $48k · Brioche Cap. $31k · Croissant Inc. $22k · Strudel Corp $18k | ✓ illustration | — |
| "Learn more →" ×4 | → `#cta` | ⚠ goes nowhere useful | timeline/risk/AI → `#how`, forecast → `#leaders` |

## 3 · Why

| Slot | Current | Status | Proposed |
|---|---|---|---|
| H2 | Revenue runs on *real signal*. | ✓ | — |
| Tile 1 | See the deal, not the story / What is real, not what reps hope. | ✓ | — |
| Tile 2 | Risk, caught early / Weeks before close, not after. | ⚠ unprovable timing | Silence, caught early / Before the deal goes cold. |
| Tile 3 | Coaching that lands / Evidence, not vibes. | ✓ | — |
| Tile 4 | A number you can defend / Backed by real signal. | ✓ | No follow-up forgotten / A next step for every call. |

## 4 · How it works (`#how`)

| Slot | Current | Status | Proposed |
|---|---|---|---|
| H2 | Signal → insight → *action.* Closed loop. | ✓ | — |
| Lead | The right signal, analyzed, and turned into a next step — in under a minute. | ⛔ "under a minute" | …turned into a next step — every morning. |
| Panel account | Strudel Corp | ✓ | — |
| Step 01 | Capture signals · "Emails, meetings, calendar patterns, and stakeholder behavior — captured automatically." · tag Captured · 128 signals · 20% | ✓ | — |
| Step 02 | Get a live pulse of each deal · "Relationship maps, engagement, threading, and execution gaps — assembled in real time." · tag Live · Health 72 / 100 · 40% | ⛔ "live", "real time" | Get a daily pulse of each deal · "…— refreshed every day." · tag Today |
| Step 03 | Surface risk early · "EB disengagement or a stalled deal — flagged to your team over Slack and email." · At risk · CFO silent 19 days · 60% | ✓ vision | — |
| Step 04 | Enable action · "Tailored recommendations — run them yourself or let Pretzel handle it." · Next step · Book exec alignment · 80% | ⛔ autonomous action | "Tailored next steps — with a follow-up drafted and ready for you to send." |
| Step 05 | Capitalize on every win · "Each outcome feeds back into win patterns shared across the team." · Closed · Won · $180K · 100% | ✓ vision | — |

## 5 · For revenue leaders (`#leaders`)

| Slot | Current | Status | Proposed |
|---|---|---|---|
| H2 | Commit a number you *actually trust.* | ✓ | — |
| Lead | Signal truth on Monday. Risks before the board call. A forecast explained deal by deal. | ✓ | — |
| Link | Learn more → `#cta` | ⚠ | → `#compare` |
| Panel | Forecast · Q2 · Week 7 / 13 · $1.8M commit · Best case $2.4M · Commit $1.8M · At risk $340K | ✓ illustration | — |

## 6 · For sales managers (`#managers`)

| Slot | Current | Status | Proposed |
|---|---|---|---|
| H2 | Coach the *actual problem,* not the reported one. | ✓ | — |
| Lead | Monday shows you the three deals that need you — not forty. 1:1s run on evidence, not vibes. | ✓ | — |
| Link | Learn more → `#cta` | ⚠ | → `#compare` |
| Panel | Monday · 3 need you · 3 / 40 · Madeleine Corp $180K · Tartelette Systems $220K · Marcus T. · coaching | ✓ illustration | — |

## 7 · Before / after (`#compare`)

| Row | Without | With | Status |
|---|---|---|---|
| Head | Situation / Without Pretzel Labs / With Pretzel Labs | | ⚠ product name → "Without Pretzel" / "With Pretzel" |
| Monday pipeline review | Reps tell you what they want you to hear. You update slides from gut feel. | Signal-verified view surfaces the three deals that need your attention before you ask. | ✓ |
| Forecast commit | Built from rep optimism and manager rounding. Accurate under 25% of the time. | Backed by behavioral evidence. You commit a number you can explain deal by deal. | ⛔ unsourced stat → "…Nobody can say why it moved." |
| Deal goes dark | You find out when the rep mentions it or the close date passes. | Silence flagged on day three. Coaching cue surfaced. There is still time to act. | ⛔ timing → "Silence flagged once it crosses your threshold. There is still time to act." |
| Coaching a rep | "How is Torchlight looking?" Rep answers. You coach based on what they say. | "Engagement dropped after your demo — here is the behavioral pattern. What happened?" | ✓ |
| Top rep leaves | Their deal knowledge, stakeholder maps, and winning patterns leave with them. | Everything captured. The next rep inherits the full picture and picks up without starting over. | ✓ |
| New sales initiative | You train the team, then wait a quarter to see if anything changed in results. | You see behavioral signal change within days. Adjust before the window closes. | ✓ |

## 8 · CTA (`#cta`)

| Slot | Current | Status | Proposed |
|---|---|---|---|
| H2 | Stop managing a reporting process. *Start leading a business.* | ✓ | alt: "Stop chasing updates. *Start closing deals.*" |
| Lead | Private early access. A 30-minute conversation about your pipeline. | ⚠ CTA set | 14 days on your own pipeline. Connect Salesforce, Gmail, and Gong to start. |
| Primary | Get a demo → `#` | ⚠ dead link | Start trial → trial URL (doesn't exist yet) |

## 9 · Footer

| Slot | Current | Status | Proposed |
|---|---|---|---|
| Brand | Pretzel Labs | ✓ | — |
| Line | Deal Execution Intelligence · Early access 2026 | ⛔ "Early access 2026" is stale (it's late 2026) | Deal Execution Intelligence · For Salesforce teams |
| Tagline | Built for revenue teams that want fewer surprises and better quarters. | ✓ | — |
| Product | Features → `#product` · How it works → `#how` · Before & after → `#compare` | ✓ | — |
| Solutions | Revenue leaders → `#leaders` · Sales managers → `#managers` · Early access → `#cta` | ✓ (managers link fixed in this folder) | Early access → Start trial |
| Company | Customers → `#` · Resources → `#` · hello@pretzel-labs.com (mailto) | ⚠ dead links | Privacy → `/privacy` · Terms → `/terms` (pages must exist first) |

---

## Reusable lines (✓, good for new pages)

- "No rep logging" · "Every touch on one timeline" · "Emails, calls, and meetings — captured automatically, with no rep logging."
- "Revenue runs on *real signal*." · "Signal → insight → *action.*"
- "Evidence, not vibes." · "See the deal, not the story" · "What is real, not what reps hope." · "Coaching that lands"
- "Commit a number you *actually trust.*" · "A forecast explained deal by deal."
- "Coach the *actual problem,* not the reported one." · "the three deals that need you — not forty"
- "Built for revenue teams that want fewer surprises and better quarters."
- From the brief (safe): "Works with Salesforce, Gmail, and Gong." · "Priced by deals, not seats." · "Pretzel reads; it never writes to your CRM."
