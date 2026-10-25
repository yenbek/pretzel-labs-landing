# Voice and copy

How Pretzel sounds on the site, worked out from the live home page and the product brief. Facts and claim limits live in `product-brief.md`. This file is about how to say things.

**Precedence:** `product-brief.md` §9 (red lines) > this file > the current home page copy. The home page still has a few lines that break the red lines (listed in `homepage-copy.md`). Don't copy those.

---

## 1. Who we're talking to

US B2B SaaS sales teams of 5–80 reps on Salesforce + Google Workspace (+ Gong). In order: **sales managers** and **account executives** (primary), then VP Sales / CRO (one section further down), then RevOps (a mention). Speak in their moments: the Monday pipeline review, the 1:1, the board call, the follow-up that never went out.

## 2. Voice

| We are | So we write | Not |
|---|---|---|
| **Direct** | Short declaratives. Subject, verb, object. | Hedged or padded sentences, "leverage", "empower", "unlock" |
| **Evidence-minded** | Signal, evidence, behaviour, what actually happened | Hype, superlatives, "revolutionary", "best-in-class" |
| **On the manager's side** | "the three deals that need you" | Blaming reps, surveillance language ("monitor your reps") |
| **Dry, a little wry** | Contrast pairs: "Evidence, not vibes." "See the deal, not the story." | Jokes, puns on pretzels in body copy (pastry names in demo data are the wink) |
| **Concrete** | Real artefacts: emails, calls, meetings, close dates, MEDDICC | Abstractions: "insights", "synergy", "data-driven transformation" |

Signature devices, used sparingly:

- **"X, not Y" contrast**: tile lines, titles. At most one per section.
- **Triads with arrows**: "Signal → insight → action." The `→` is part of the brand.
- **Fragments for rhythm** in leads: "Signal truth on Monday. Risks before the board call. A forecast explained deal by deal."
- **Second person, present tense**: "Monday shows you the three deals that need you."

## 3. Structure rules by slot

| Slot | Length | Rules | Good examples (live) |
|---|---|---|---|
| Hero title (`.pl-h-xl`) | 4–8 words | Three parts: plain → *orange italic phrase* → plain. Ends with a full stop | "Your pipeline, *finally honest* with you." |
| Section title (`.pl-h-md` / `.pl-h-lg`) | 4–10 words | At most one `<em>` phrase (the point of the sentence). Full stop optional; be consistent within a page | "Coach the *actual problem,* not the reported one." |
| Lead (`.pl-lead`, `.pl-lead-sm`) | 1–2 sentences, ≤30 words | Says what it does for the reader. No category jargon | "Monday shows you the three deals that need you — not forty." |
| Tile / card title (`.pl-h-sm`) | 2–6 words | Sentence case, no full stop | "Every touch on one timeline" |
| Tile caption (`.pl-caption`) | 1 sentence, ≤16 words | Concrete nouns, an em dash allowed | "Emails, calls, and meetings — captured automatically, with no rep logging." |
| Reason line | ≤8 words | Full stop. Contrast pair works best | "Evidence, not vibes." |
| Ticked claim | 2–5 words | No full stop, no verbs needed | "No rep logging" |
| Step title | ≤6 words, imperative or noun phrase | | "Surface risk early" |
| Step text | ≤18 words | What happens, then an em dash and the outcome | "Emails, meetings… — captured automatically." |
| Compare row label | 2–4 words | A moment in the manager's week | "Monday pipeline review" |
| Compare cells | 1–2 sentences each | "Without": the painful status quo. "With": the specific change | |
| Button | **2–3 words** | Sentence case, verb first, no full stop. Arrow disc comes from the component, not the text | "Get a demo", "View all features" |
| Nav button | ≤14 characters | Must fit at 375px | "Request access" |
| Text link | "Learn more →" | Always this phrase and arrow, unless a more specific 2–3 word label exists | |
| Glass panel text | Labels 1–3 words | Product vocabulary, see §6 | "Deal health", "Week 7 / 13" |

**Length budget.** When replacing an existing string, stay within about ±15% of its length. Titles balance and buttons pair; longer text changes the layout. Shorter is always safe.

## 4. Naming and terminology

| Use | Don't use |
|---|---|
| **Pretzel** — the product, in product copy ("Pretzel reads every email…") | "the Pretzel platform", "Pretzel AI" |
| **Pretzel Labs** — the company: logo, footer, legal, "About" | Pretzel Labs as the product name in feature copy |
| **Deal Execution Intelligence** — the category, exactly this, title case | "Deal Intelligence and Execution solution", "deal intelligence", "revenue intelligence" |
| deals, opportunities, pipeline, forecast, commit, best case | "leads", "accounts" when you mean deals |
| signals | "alerts" (except for the Slack/email alert vision feature), "insights" |
| reps, AEs, managers, revenue leaders | "users", "resources", "headcount" |
| follow-up, going dark, silence, unanswered, declined meeting | Euphemisms ("engagement opportunity") |
| MEDDICC (with two Cs) | MEDDIC, Meddicc |
| Salesforce, Gmail, Google Workspace, Gong | Salesforce logos, "SFDC" in marketing copy |

## 5. Formatting conventions

- **Sentence case** for every title, button, nav label and tile title. Proper nouns and "Deal Execution Intelligence" keep their capitals.
- **Em dash** `—` with spaces, for an aside or outcome. Use it at most once per sentence.
- **Arrow** `→` in text links and the stepper triad. Never `->` or `>`.
- **Middle dot** `·` as a separator in labels and meta: "Forecast · Q2", "Won · $180K".
- **Money:** `$` + number + capital `K` / `M`, no space: `$180K`, `$1.8M`, `$2.4M`. (The live page has a lower-case `$880k`/`$48k`; new copy uses capitals.) Ranges: `$25K–$500K` with an en dash.
- **Numbers:** numerals for anything in UI (`3 / 40`, `72/100`, `19 days`). In prose, words for one to nine unless it's a metric ("three deals", "14 days").
- **Oxford comma:** yes ("Emails, calls, and meetings").
- American English: behavior, analyze, color.
- No exclamation marks. No emoji.

## 6. Demo data (glass panels, mock UI)

Everything inside a glass panel is an obvious illustration.

- **Company names are pastries:** Brioche Cap., Croissant Inc., Strudel Corp, Madeleine Corp, Tartelette Systems. (The live page also has the generic "Acme Corp" and "Torchlight"; new names should be pastries.) Make new ones the same way: Babka Labs, Danish Dynamics, Kouign Co., Éclair Systems, Churro Group.
- **People:** first name + initial ("Marcus T."). Never real people.
- **Numbers are plausible for the ICP:** deals $18K–$500K, quarters in $M, a 13-week quarter, health out of 100, MEDDICC out of 6.
- **Keep one story per page.** The leaders panel says Commit $1.8M / Best case $2.4M, so other panels on the same page shouldn't contradict it.
- Label vocabulary: Deal health, At risk, Captured, Next step, Closed, Won, Commit, Best case, Pipeline, Open pipeline, This quarter, Week N / 13, N need you, silent N days.

## 7. Red lines (short version: full table in `product-brief.md` §9)

Never publish:

- Timing promises: "real-time", "live" (as in "updated live"), "in under a minute", "flagged on day three". Data refreshes **daily**. "Live" as a status label (an integration that works today, a chip) is fine.
- Autonomous action: "Pretzel sends for you", "let Pretzel handle it". Nothing is sent or written back.
- Unsourced statistics ("accurate under 25% of the time").
- "Free", "no credit card required". The trial needs a card.
- Security or compliance claims: SOC 2, SSO/SAML, MFA, "enterprise-grade security", EU data residency, "all credentials encrypted".
- Real customer logos, testimonials, case studies. There are no public customers yet.
- Gong or Clari features presented as Pretzel's, or implied partnerships.

Allowed, because the site is vision-forward (brief §1): AI-drafted follow-ups, deal health score, MEDDICC coverage, multi-threading and buying committee, competitor detection, Slack/email alerts, forecasting, coaching, win patterns. Phrase them as what Pretzel does, but never with timing or autonomy claims. If a page targets trial sign-ups, consider a "Coming soon" chip on vision features (brief §8.6).

Safe claims to lean on: every email and call on one deal timeline with no rep logging · flags missed follow-ups, unanswered prospect emails, deals going dark, repeated declines · thresholds configurable per team · read-only: never writes to your CRM, read-only access to Gmail · only CRM-matched external email is captured, admins choose which mailboxes · each company's data is isolated · priced by deals, not seats, with unlimited users · works with Salesforce, Gmail, and Gong.

## 8. CTA vocabulary

The site is moving from "demo / early access" to a **self-serve 14-day trial** (brief §1, §8), which isn't live yet.

| State | Primary | Secondary | Nav |
|---|---|---|---|
| **Today (live page)** | Get a demo | Watch a 4-min tour *(no video exists)* | Request access |
| **Proposed** (`content-proposal.md`) | Start trial | How it works | Start trial |

Use one label set across the whole site, never a mix. New pages copy whatever the home page currently uses. When the trial goes live, all of them change together.

## 9. Before you ship copy

- [ ] Every claim is on the safe list, or is an allowed vision item without timing/autonomy language
- [ ] One italic phrase per title, in `<em>`, and it's the phrase that matters
- [ ] Button labels ≤3 words and consistent with the site's current CTA set
- [ ] "Pretzel" for product, "Pretzel Labs" for company, "Deal Execution Intelligence" verbatim
- [ ] Demo data is pastry-named and consistent across the page
- [ ] Money as `$180K` / `$1.8M`; em dashes spaced; arrows are `→`
- [ ] Rendered at 390px: no new awkward wraps in titles or buttons
