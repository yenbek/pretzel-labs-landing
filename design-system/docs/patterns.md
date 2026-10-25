# Patterns: sections and pages

How the components combine. `components.md` has the markup of each part. This file covers what goes where.

---

## 1. Anatomy of every page

```
nav (fixed, verbatim)
hero                   home: .pl-hero with art · interior: .pl-hero--page
2–6 content sections   each: .pl-section > .pl-container > head + body
CTA card + footer      .pl-section--last (legal pages: footer only)
```

- **Rhythm:** sections are separated only by their 130px top padding; inside a section, head → body is 70px. Don't add dividers, background bands or extra spacers.
- **Alternate weight:** follow a dense block (bento, stepper, compare) with a lighter one (split feature, reason tiles). Don't stack two photo-heavy blocks without a grey or white block between them.
- **Alternate sides:** consecutive split features flip sides (`.pl-split` then `.pl-split--reverse`).
- **Renders:** each section head carries one 3D render (eyebrow art or pin). Use a different one per section, cycling `eyebrow/1–6`. `7` is reserved for the logo and CTA.
- **Orange budget:** one primary button per screen. The CTA card's primary is the page's last.
- **Anchors:** give each section an `id` that matches its nav or footer link.

## 2. Section recipes (all on the home page)

| Recipe | Head | Body | Use it for | Home example |
|---|---|---|---|---|
| **Feature overview** | Split head (`.pl-h-lg` + eyebrow art / lead + dark button) | Bento, 4 tiles | First section under the hero: what the product does | `#product` |
| **Reasons / outcomes** | Pinned head (`.pl-h-md`, no lead) | 3–4 reason tiles | Benefits, principles, "why" | Why section |
| **Process** | Pinned head with lead (`--gap:12px`) | Stepper, 3–5 steps | How it works, onboarding, a workflow | `#how` |
| **Persona / use case** | none (the head is inside) | Split feature: eyebrow art + `.pl-h-md` + lead + link / media card with glass | One audience or job per block; stack 2–3, alternating sides | `#leaders`, `#managers` |
| **Before / after** | Pinned head | Compare table, 4–6 rows | Contrast with the status quo | `#compare` |
| **Closing CTA** | — | CTA card | End of every marketing page | `#cta` |

Skeleton of a standard section:

```html
<section class="pl-section" id="slug">
  <div class="pl-container pl-stack">
    <!-- head: .pl-split-head or .pl-pin-head -->
    <!-- body: .pl-bento / .pl-grid of .pl-reason / .pl-stepper / .pl-compare -->
  </div>
</section>
```

The split feature puts the grid on the container itself: `<div class="pl-container pl-grid pl-split">`.

## 3. Page recipes

Each one is built from the recipes above plus the derived components. Start from `_page.html` (or `_legal.html`).

### Product / feature detail page (`/product`, `/signals`, …)
1. `.pl-hero--page`: `.pl-h-xl` title, lead, primary + ghost pair
2. Feature overview (bento) **or** process (stepper) for the mechanism
3. 2–3 split features, one capability each, alternating sides, each glass panel showing that capability's UI
4. Reasons tiles for outcomes
5. CTA card

### Solution / persona page (`/managers`, `/leaders`, `/reps`)
1. `.pl-hero--page`: title in the persona's words ("Coach the *actual problem*…")
2. Split features, one per job-to-be-done (3)
3. Before / after table scoped to that persona's moments (Monday review, 1:1s…)
4. CTA card
The persona copy and priorities come from `content/product-brief.md` §4: managers and AEs are primary, VP/CRO secondary, RevOps mention only.

### Pricing page (`/pricing`)
Only if the team decides to publish pricing (`product-brief.md` §12, open question).
1. `.pl-hero--page`: no ticked claims; lead says what pricing is based on ("Priced by open deals, not seats")
2. Plan cards: `.pl-grid --min:260px` of `.pl-reason.pl-ring` cards. Each card: `.pl-chip` plan name → `.pl-stat` price with `<small> / month</small>` → one line of limits → dark button. The recommended plan gets the **only** primary button and a `.pl-chip--accent`. Composition in `components.html` → Derived.
3. Compare table for plan differences (label column = feature)
4. FAQ: `.pl-card.pl-ring` items in a `.pl-stack` with `--gap:20px`, `.pl-h-xs` question + muted answer
5. CTA card
Facts (limits, trial terms, "card required") must match `product-brief.md` §8 exactly.

### Integrations page (`/integrations`)
1. `.pl-hero--page`
2. Grid of `.pl-card.pl-card--row.pl-ring` (`--min:220px; --gap:20px`): name in `.pl-h-xs` + status chip (`--ok` Live, `--accent` Coming soon). **Names as text: no third-party logos** (no licence, trademark risk)
3. Split feature explaining what's read and what never is ("Pretzel reads; it never writes to your CRM")
4. CTA card
Statuses come from `product-brief.md` §7 and change often. Re-check them.

### Company / about page (`/company`)
1. `.pl-hero--page`
2. Reasons tiles for principles
3. `.pl-prose` block for the story (inside `.pl-section`)
4. CTA card
No team photos, customer logos or testimonials unless real and approved (`product-brief.md` §9).

### Legal / long-form (`/privacy`, `/terms`)
`_legal.html` as is: `.pl-hero--page` with a `.pl-h-lg` title and a "Last updated" lead, then `.pl-prose`, then the footer. No CTA card, no buttons, no italic phrase. **Agents don't write legal text.** Paste what the company provides.

### 404
`.pl-hero--page` with `.pl-h-xl` ("This page went *quiet*." fits the voice), a lead, and one primary button home. Then the footer.

## 4. Head

```html
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Page name — Pretzel</title>            <!-- home: "Pretzel — Deal Execution Intelligence for Salesforce teams" (proposed) -->
<meta name="description" content="≤155 characters, plain statement of what the page offers.">
<meta property="og:title" content="…"><meta property="og:description" content="…">
<meta property="og:image" content="https://<domain>/assets/hero-clouds.jpg">
<link rel="preload" as="font" type="font/woff2" href="/fonts/dmsans-rP2Hp2ywxg089UriCZOIHTWEBlw.woff2" crossorigin>
<link rel="preload" as="font" type="font/woff2" href="/fonts/spacegrotesk-V8mDoQDjQSkFtoMM3T6r8E7mPbF4C_k3HqU.woff2" crossorigin>
<link rel="preload" as="image" href="/assets/hero-clouds-1250.webp" media="(max-width:640px)" fetchpriority="high">
<link rel="preload" as="image" href="/assets/hero-clouds.jpg" media="(min-width:641px)" fetchpriority="high">
<link rel="stylesheet" href="/css/pretzel.css">
<link rel="icon" href="/assets/eyebrow/7-64.webp" type="image/webp">
```

Title pattern: `<Page> — Pretzel` for product pages, `<Page> — Pretzel Labs` for company and legal pages.

## 5. Links and URLs

- Pages live at the folder root as `slug.html` and are linked as `/slug` (clean URLs on Vercel; `npx serve` does the same locally).
- Home sections are linked as `/#product`, `/#how`, `/#leaders`, `/#managers`, `/#compare`, `/#cta`. This works from any page, including the home page itself.
- Slugs are lowercase-hyphenated nouns: `/pricing`, `/integrations`, `/managers`, `/privacy`.
- Conversion links: today they point to `/#cta`. When the trial sign-up URL exists (`product-brief.md` §8), change **every** primary button and the nav button at once.
- Adding a top-level nav item means changing the nav block in **every** page, both link lists (inline and dropdown). Check that it still fits at 375px.

## 6. When you need something that isn't here

1. Look for a close match on the home page. There almost always is one.
2. Compose from existing parts: a ringed container (`.pl-reason`, `.pl-card`, `.pl-media-card`, `.pl-tile`) + a radius and spacing from the sets + one of the three buttons + the type classes.
3. If you truly need a new component, add it to section 18 (derived) of `css/pretzel.css` using only tokens, render it in `components.html`, and document it in `components.md` → Derived. Don't add new colours, radii, shadows, fonts or breakpoints.
