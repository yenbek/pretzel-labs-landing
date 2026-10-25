> **Copy kept in the design system.** Original: `docs/product-brief.md` at the repo root, copied 2026-10-24. If the two differ, the newer file wins; re-sync them.

# Pretzel — Product Brief for the Landing Site

> Source of truth for anyone writing or reviewing copy on this site.
> Verified against the product repo (`Pretzel-labs`, branch `staging`, commit `a4913c5`) on **2026-10-24**.
> Re-verify the "Status" columns before each major copy change — the product moves fast.

---

## 1. Positioning decisions (2026-10-24)

| Decision | Choice | Implication for copy |
|---|---|---|
| Vision vs. shipped | **Vision-forward** | The site may describe the full product vision (AI follow-ups, deal health, forecast, alerts). Only the hard red lines in §9 are off-limits. |
| Primary hero audience | **Sales managers + AEs** | Hero and first sections speak to the people who run deals day to day. VP Sales / CRO get their own section further down. |
| Primary CTA | **Self-serve trial** | "Start your 14-day trial" → app sign-up. See §8 for what must be true before this goes live. |

---

## 2. What Pretzel is

**Category:** Deal Execution Intelligence (use this exact term; avoid mixing with "Deal Intelligence and Execution solution" / "Deal intelligence").

**Name:** Company is **Pretzel Labs**; the product is **Pretzel**. Use "Pretzel" in product copy, "Pretzel Labs" for the company/footer/legal.

**One-liner:** Pretzel shows every deal's real communication history and flags the ones where execution is slipping — before they're lost.

**Elevator pitch:** Deals rarely die because of a bad pitch. They die from inattention: a follow-up that never went out, a prospect email that sat unanswered, a champion who went quiet for three weeks. Pretzel connects to Salesforce, Gmail, and your call recorder, rebuilds the full story of every deal, and tells reps and managers exactly which deals need them today — with no manual logging.

**Three questions Pretzel answers for every opportunity:**
1. **What happened?** — every email, call, and meeting on one timeline.
2. **What's wrong?** — signals like missed follow-ups, unanswered inbound, going dark, declined meetings.
3. **What should I do?** — the next action (vision: AI-drafted, context-aware follow-up).

---

## 3. The problem (copy-ready)

- Reps juggle 15–30 open opportunities across Salesforce, Gmail, calendar, and Gong. No single place shows what actually happened on a deal.
- CRM data is stale because reps don't log activity.
- The most common losses are execution failures, not pitch failures:
  - no follow-up after a call,
  - a prospect email that got buried,
  - days of silence nobody noticed,
  - a stakeholder who dropped off,
  - a prospect who started declining meetings.
- Managers find out in the pipeline review — after the deal has already gone cold.

---

## 4. Who it's for

**ICP:** US B2B SaaS, **5–80 rep** sales teams, mid-to-large deals (**ACV $25K–$500K**, 30–150 day cycles), running **Salesforce + Google Workspace (+ Gong)**.

| Persona | Role in purchase | Job they hire Pretzel for | Hero priority |
|---|---|---|---|
| **Sales Manager** | Champion | See which 3 deals need me this week, not 40; coach on evidence | **Primary** |
| **Account Executive** | End user | Never miss a follow-up; triage 20+ deals in minutes | **Primary** |
| VP Sales / Head of Sales | Economic buyer | Pipeline health and execution discipline across teams | Secondary section |
| CRO | Economic buyer (larger orgs) | Forecast confidence from real engagement | Secondary section |
| RevOps / Enablement | Stakeholder | Activity captured without rep logging | Mention only |

**Not a fit (today):** HubSpot-only or Microsoft 365/Outlook-only teams (not supported yet — §7); high-velocity SMB motions where deals close too quickly for follow-up signals to matter.

---

## 5. Value pillars and their status

Status legend: **Live** = in the shipping app with real customer data · **Partial** = exists but incomplete · **Vision** = designed/roadmapped, not built.

| Pillar | Promise | Status | Notes |
|---|---|---|---|
| **Deal Communication Hub** | Every email and call on one deal timeline, no rep logging | **Live** | Strongest, most demo-ready part of the product. Calendar events not yet. |
| **Execution Signals** | Know which deals need you and why | **Live** | Rule-based, admin-configurable per org (§6). |
| **Team Execution View** | Managers see where each rep's deals are slipping | **Partial** | Communication concerns work; MEDDIC / multi-threading / competitor tiles have no data yet. |
| **AI-powered follow-ups** | Context-aware drafts from the full deal history, one-click send | **Vision** | No AI in the product today; Gmail access is read-only. |
| **Deal health score / MEDDICC** | Score every deal; show what's missing | **Vision** | Columns and UI exist; scores are not computed. |
| **Forecast** | Commit a number you can defend | **Partial** | Weighted pipeline, at-risk deals, aging, stage funnel exist. No quota, no history, prototype scoring. |
| **Proactive alerts (Slack / email)** | Pretzel pushes the risk to you | **Vision** | No alert delivery exists yet. |
| **Win-pattern learning** | Outcomes feed back into team playbooks | **Vision** | Not designed in detail. |

---

## 6. What's live — exact facts

### Signals (rule-based, configurable per org)

| Signal | Definition | Default |
|---|---|---|
| **Going dark** | No activity on the deal (or no activity from the prospect) for N days | 14 days (1–90) |
| **Stale touch** | No touch from the rep for N days | 7 days (1–90) |
| **Unanswered inbound** | Prospect emailed; no reply yet | On |
| **Missing follow-up after meeting** | A call happened; no follow-up email before the next meeting | On |
| **Repeated declines** | Prospect declined N meetings in a row | 2 (2–10) |
| **Silence gaps** | Count of gaps of N+ days in the deal's history | 10 and 20 days (3–60) |

Also computed per deal: days since last inbound / outbound / any activity / last meeting, longest silence, % inbound emails replied same day, % meetings followed up by next day, days in current stage, deal age, overdue close date.

Rules that make the signals trustworthy (good proof points):
- Out-of-office auto-replies don't count as activity.
- A risk flag clears only when the rep actually acts (an outbound email or call), not when time passes.

### Screens

- **Home** — four action cards (missing follow-up, unanswered inbound, no next meeting\*, going dark), each one click away from the filtered deal list. \*Needs calendar data; not active yet.
- **Deals** — multiple saved boards, tabs by stage or forecast category, ~80 columns, rich filters, per-user layouts.
- **Activity Timeline** — emails and call recordings (with transcripts) in order, with silence gaps marked.
- **Team Performance** (Extended/Pro) — rep × concern heatmap, team deals table.
- **Forecast** (Pro) — weighted pipeline, segment breakdown, top deals at risk, deal aging, stage funnel.
- **Onboarding** — 3-step wizard (Salesforce → Google Workspace → Gong) plus a setup checklist.

### Data freshness
Data refreshes **daily** (06:00 UTC). Gmail can push changes sooner, but the deal views update once a day.

---

## 7. Integrations

| Integration | Status | What Pretzel reads |
|---|---|---|
| **Salesforce** | **Live** | Opportunities, contacts, contact roles, accounts, users, stage and field history. Read-only — Pretzel never writes to Salesforce. |
| **Google Workspace (Gmail)** | **Live** | Email with external domains that exist in your CRM, only for mailboxes the admin selects; exclusion rules by address, domain, subject. Read-only. |
| **Gong** | **Live** (connect flow being fixed) | Calls, transcripts, participants; 3 years of history. |
| **Google Calendar** | Built, not yet active | Meetings, attendees, accept/decline. |
| **Granola, Fireflies, Fathom** | Pilot | Meeting metadata + transcripts; imports two years of history. Not yet feeding signals. |
| **HubSpot** | Coming soon | — |
| **Microsoft 365 / Outlook** | Coming soon | — |
| **Slack** | Vision (alerts) | — |

Safe integration line for the site today: **"Works with Salesforce, Gmail, and Gong."** Granola / Fireflies / Fathom can be listed as "coming soon" or "in beta".

---

## 8. Pricing and trial

Pricing is by **open New Business opportunities**, not seats. **Unlimited users.** Renewals, upsells, and closed deals don't count.

| Plan | Open deals | Monthly | Quarterly | Adds |
|---|---|---|---|---|
| **Basic** | 20 | $99 | $297 | Home, Deals, communication signals, timeline |
| **Extended** | 40 | $169 | $507 | + Team Performance, threading / committee / competition sections |
| **Pro** | 60 | $249 | $747 | + Forecast |

- **Trial:** 14 days, **payment card required** at signup, one trial per company.
- **Over the limit:** 7-day grace period, then analytics pause until you upgrade. No surprise overage charges.
- No annual plan.

**Self-serve trial: must be true before the CTA goes live**
1. **Production billing is not live.** Checkout and the trial run in Stripe test mode on staging only. The CTA can't take real signups until production billing ships.
2. **No production app URL** is defined in the product repo (only `staging-pretzel-labs.vercel.app`). The CTA needs a final sign-up URL.
3. **Card required** → never write "no credit card required" or "free trial, no strings". The app's sign-in page currently says "Sign up for free"; align both sides.
4. **Who can sign up:** Google sign-in only, work domains only (Gmail/Outlook/Yahoo etc. blocked). Microsoft 365 companies can't sign up yet.
5. **Who gets value:** Salesforce is required for anything to appear. Say "for Salesforce teams" near the CTA, or expect HubSpot signups that dead-end.
6. **Expectation gap:** trial users will look for whatever the page promises. Vision items (AI drafts, deal score, alerts) won't be in the app yet — consider a light "Coming soon" tag on those cards, or make sure onboarding sets expectations.

---

## 9. Claim guardrails

### Safe — say it confidently
- Every email and call on one deal timeline, captured automatically, with no rep logging.
- Flags missed follow-ups, unanswered prospect emails, deals going dark, and repeated declined meetings.
- Configurable thresholds per team.
- Pretzel reads; it never writes to your CRM. Read-only access to Gmail.
- Only CRM-matched external email is captured; admins choose which mailboxes are included.
- Priced by deals, not seats — unlimited users.
- Each company's data is isolated.

### Vision — allowed on the site (decision §1), know it's not shipped
AI-drafted follow-ups, deal health score, MEDDICC coverage, multi-threading and buying committee, competitor detection, Slack/email alerts, forecast you can defend, coaching that plans your day, win patterns.

### Red lines — do not publish
| Don't say | Why |
|---|---|
| "Real-time", "live", "in under a minute", "flagged on day three" as a timing promise | Data refreshes daily. |
| "Let Pretzel handle it", "Pretzel sends for you", or any autonomous action | Nothing can be sent or written back today. |
| "Accurate under 25% of the time" or any statistic without a linked source | Unsourced; the team's own messaging rules require a primary source for every stat. |
| "No credit card required" / "free" | A card is required for the trial. |
| SOC 2, SSO/SAML, MFA, "enterprise-grade security" | None exist. |
| "EU data residency" / "your data never leaves the EU" | Data warehouse is in the US. |
| "All credentials encrypted" | Only some credentials are encrypted at rest. |
| Real customer logos, testimonials, or case studies | There are no public customers yet. Pastry-named demo accounts (Brioche Cap., Madeleine Corp…) are fine as obvious illustrations. |
| Gong/Clari product names as Pretzel features, or implied partnerships | Comparative-advertising and trademark risk. |

---

## 10. Differentiation (for comparison sections)

- **Execution, not analytics.** Every signal points at an action, not a dashboard.
- **All channels, one deal.** Gong analyzes calls; Pretzel tracks follow-through across email, calls, and meetings per opportunity.
- **No new workflow.** Sits on top of Salesforce, Gmail, and Gong; reps don't log anything.
- **Signal, not noise.** A small, focused set of signals instead of 50 dashboards.
- **Priced by deals, not seats.** Competitors like Gong are typically priced per user.

| Adjacent tool | Their focus | Pretzel's angle |
|---|---|---|
| Gong / Gong Engage | Call intelligence, cadences | Deal-centric follow-through across all channels |
| Clari | Forecasting, RevOps | Day-to-day execution for reps and managers |
| Momentum | AI agents, CRM autofill | Focused deal-risk signals, simple setup |
| Scratchpad | Salesforce workspace UX | Communication truth, not field hygiene |
| People.ai | Enterprise activity capture | Mid-market, priced by deals |

---

## 11. Current site vs. this brief

- **Hero targets revenue leaders** ("Your pipeline, finally honest with you", "Signal-driven forecast" badge). Per §1, re-aim the hero and first sections at managers + AEs; move the forecast / board-call story into the existing "Revenue leaders" section.
  - Hero angles that fit managers + AEs:
    - "Know which deals need you today."
    - "No deal goes quiet without you knowing."
    - "Every follow-up, accounted for."
- **Every CTA is dead** — "Get a demo" / "Request access" / "Learn more" point to `#` or `#cta`, and there's no form. Replace them with the trial CTA (§8).
- **CTA wording is mixed** ("Request access", "Get a demo", "Private early access"). With a self-serve trial, use one primary label (e.g. "Start 14-day trial") and one secondary (e.g. "See how it works").
- **No integrations section**, even though "no rep logging" depends on it. Add the line from §7.
- **No pricing section** — with a self-serve trial, consider publishing §8.
- **Red-line copy on the page today:** "Accurate under 25% of the time", "let Pretzel handle it", "in under a minute", "Silence flagged on day three", "Early access 2026" (it's already late 2026).
- **Nav labels don't match their targets** (Solutions → How it works, Customers → Revenue leaders, Company → Before/after).
- **Missing for launch:** meta description, OG tags, favicon, privacy/terms links, copyright line.

---

## 12. Open questions

1. Production app URL and the date production billing goes live (blocks the trial CTA).
2. Publish pricing on the site, or keep it in the app only?
3. Whether to show "Coming soon" tags on vision cards for trial users.
4. Launch geography — US-first, or US + Canada + EMEA + Australia? Still undecided in the product docs.
5. Which recorders to list publicly (Granola / Fireflies / Fathom are in pilot).

---

## 13. Where this comes from (product repo `Pretzel-labs`)

- Positioning: `docs/positioning/product.md`, `roadmap.md`, `messaging-pillars-sales-execution-intelligence.md`, `gtm/` (features map, customer profiles, VPC maps, competitor battlecards)
- Product audit: `docs/audits/2026-09-02-mvp-product-audit.md`
- Signals: `docs/plans/engagement-metrics-spec.md`, `main/lib/deal-signal-defaults.ts`, `dbt/models/3_marts/mrt_deal_board.sql`
- Pricing: `main/lib/billing/catalog.ts`, `main/lib/product-access.ts`, `docs/billing/`
- Integrations: `main/connectors/`, `main/app/(app)/settings/integrations/page.tsx`
- Sync schedule: `.github/workflows/daily-data-sync.yml`
