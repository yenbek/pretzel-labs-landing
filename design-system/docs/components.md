# Components

Every component below lives in `css/pretzel.css`, renders in `components.html`, and (except the ones marked **derived**) appears on the home page `index.html`. That file is the full reference implementation. When in doubt, copy the block from there.

Conventions:

- Classes are `pl-` prefixed, BEM-ish: `.pl-block`, `.pl-block__part`, `.pl-block--variant`. State uses `.is-*` or ARIA attributes.
- Inline `style` is allowed for **content and measure only**: `background-image`, `max-width`, the layout knobs `--gap`/`--min`, bar widths, and tilt positions. Never inline colours, radii, shadows or font sizes.
- Paths are root-absolute (`/assets/…`).

Contents: [Page shell](#page-shell) · [Navigation](#navigation) · [Buttons](#buttons) · [Links](#text-links) · [Hero](#hero) · [Ticked claims](#ticked-claims) · [Section heads](#section-heads) · [Ring, media, scrim, zoom](#surfaces-ring-media-scrim-zoom) · [Glass](#glass-panel) · [Data bits](#data-bits-inside-glass) · [Bento](#bento) · [Reason tiles](#reason-tiles) · [Stepper](#stepper) · [Split feature](#split-feature) · [Compare table](#compare-table) · [CTA card](#cta-card) · [Footer](#footer) · [Derived](#derived-components)

---

## Page shell

```html
<body>
<div class="pl-page">              <!-- clips sideways overflow from decorative art -->
  <div class="pl-navbar">…</div>   <!-- nav -->
  <section class="pl-hero">…</section>
  <section class="pl-section" id="…"><div class="pl-container pl-stack">…</div></section>
  …
  <section class="pl-section pl-section--last" id="cta">…CTA card + footer…</section>
</div>
<script src="/js/pretzel.js" defer></script>
</body>
```

| Class | Does |
|---|---|
| `.pl-page` | Full-width wrapper, `overflow-x: clip` |
| `.pl-section` | `padding: 130px 30px 0` (top 90px at ≤1024) |
| `.pl-section--last` | Adds `padding-bottom: 100px`. Use on the final section |
| `.pl-container` | 1200px centred |
| `.pl-stack` | Vertical flex, gap 70px (`--gap` to change; the CTA → footer stack uses 100px) |
| `.pl-grid` | Auto-fit columns, `minmax(min(var(--min,320px),100%),1fr)`, gap `var(--gap,30px)` |

Sections have no background colour. The white page and grey cards do the separating, so don't add alternating band colours.

---

## Navigation

Identical on every page. Copy it from `index.html` or `_page.html`. A floating white capsule: fixed 20px from the top, max 800px, ringed.

```html
<div class="pl-navbar">
  <nav class="pl-nav" aria-label="Main">
    <a class="pl-nav__logo" href="/">
      <img src="/assets/eyebrow/7-64.webp" alt="Pretzel Labs" width="32" height="32" decoding="async"><span class="pl-nav__wordmark">Pretzel Labs</span></a>
    <div class="pl-nav__links">
      <a href="/#product">Product</a>
      <a href="/#how">Solutions</a>
      <a href="/#leaders">Customers</a>
      <a href="/#compare">Company</a>
    </div>
    <button class="pl-burger" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="pl-navmenu"><span></span><span></span><span></span></button>
    <a class="pl-btn pl-btn--dark pl-btn--sm" href="/#cta">Request access <span class="pl-btn__arrow">→</span></a>
    <div class="pl-navmenu" id="pl-navmenu">
      <a href="/#product">Product</a><a href="/#how">Solutions</a><a href="/#leaders">Customers</a><a href="/#compare">Company</a>
    </div>
  </nav>
</div>
```

- The links appear twice: inline (`.pl-nav__links`) and in the dropdown (`.pl-navmenu`). Keep both lists the same.
- Active page: `aria-current="page"` on the link in both lists (grey pill).
- At most 4 links, each 1–2 words. The dark button label is ≤14 characters, or it wraps at 375px.
- ≤1024: links hide and the burger + dropdown appear (pretzel.js: click toggles; outside click, Esc, link click and resizing past 1024 all close it). ≤640: the wordmark hides and the nav button shrinks to 13px.
- The nav is fixed and floats over the hero, so the first section of any page must be a hero (it has the 194px / 90px top padding to clear it).

---

## Buttons

Three kinds. **Don't make a fourth.** Every inner pill is **48px** tall (`--sm`: 38px).

| Kind | Classes | Use | Hover |
|---|---|---|---|
| Primary | `.pl-btn.pl-btn--primary` | The one main action per screen. Orange gradient, white arrow disc | `brightness(1.08)` |
| Dark | `.pl-btn.pl-btn--dark` | Secondary conversion on white (e.g. "View all features") | `brightness(1.25)` |
| Dark small | `.pl-btn.pl-btn--dark.pl-btn--sm` | **Nav only** | `brightness(1.25)` |
| Ghost | `.pl-btn.pl-btn--ghost` | Secondary action next to a primary, on a photo. No arrow | fill → surface |

Pattern: the `<a>` is the **halo**, the pill is a `<span>` inside it:

```html
<div class="pl-btn-row">
  <a class="pl-btn-halo" href="/#cta"><span class="pl-btn pl-btn--primary">Get a demo<span class="pl-btn__arrow">→</span></span></a>
  <a class="pl-btn-halo" href="/#how"><span class="pl-btn pl-btn--ghost">How it works</span></a>
</div>

<!-- single dark button on white -->
<a class="pl-btn-halo" href="/#cta"><span class="pl-btn pl-btn--dark">View all features<span class="pl-btn__arrow">→</span></span></a>
```

Rules:
- **Both buttons in a pair sit in halos.** A bare ghost next to a haloed primary reads as a different height.
- Labels are 2–3 words, in sentence case, with no full stop. A long secondary label makes the pair lopsided, and on phones (`.pl-btn-row` → full-width column) the difference is obvious.
- The arrow disc `→` belongs to primary and dark buttons. Ghost buttons never have one.
- ≤640: `.pl-btn-row` stacks full width. Only `<a class="pl-btn-halo">` children stretch, so keep the halo pattern.
- Use `<button class="pl-btn …">` for in-page actions (forms) with the same classes.

---

## Text links

```html
<a class="pl-link-cta" href="/#how">Learn more →</a>             <!-- 14px, centred: inside tiles -->
<a class="pl-link-cta pl-link-cta--lg" href="/#how">Learn more →</a>  <!-- 16px, left: under split-section copy -->
```

Orange, 600, with an invisible 8×14px padding cancelled by a negative margin. The click target grows but the text stays put. Hover shows a pale orange pill (and `--lg` turns ink). The arrow is the literal `→` character. Plain body links are muted and turn ink on hover. Footer links turn orange.

Email is always a `mailto:` text link, never a button.

---

## Hero

Full-bleed sky photo with a white veil (`::before`), a bottom fade into white (`::after`), centred content, and optional art. The home hero:

```html
<section class="pl-hero" id="hero">
  <div class="pl-hero__content">
    <h1 class="pl-h-xl">Your pipeline, <em>finally honest</em> with you.</h1>
    <p class="pl-lead">One or two sentences.</p>
    <div class="pl-btn-row">…primary + ghost…</div>
    <div class="pl-checks">…3 ticked claims…</div>
    <div class="pl-hero__spacer"></div>            <!-- reserves room for the art -->
  </div>
  <div class="pl-hero__art">
    <div class="pl-hero__float" data-pl-parallax>
      <img src="/assets/pretzel-2d.webp" srcset="/assets/pretzel-2d-460.webp 460w, /assets/pretzel-2d-840.webp 840w, /assets/pretzel-2d.webp 1377w" sizes="(max-width:453px) 228px, (max-width:640px) 330px, (max-width:1024px) 440px, 740px" alt="" decoding="async" fetchpriority="high">
    </div>
  </div>
</section>
```

- Content order is fixed: title → lead → button pair → claims. Gap 30px.
- `min-height: 100vh` on desktop, none at ≤1024. The background switches to `hero-clouds-1250.webp` at ≤640.
- The pretzel art is **home page only**. Interior pages use `.pl-hero--page` ([derived](#derived-components)).
- Preload both sky variants in `<head>` (see `_page.html`).

## Ticked claims

```html
<div class="pl-checks">
  <span><span class="pl-tick"><svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" focusable="false"><path d="M1.6 5.1 3.9 7.4 8.4 2.6" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg></span>No rep logging</span>
  …
</div>
```

Three claims, 2–5 words each, 16px 600 ink, gap 36px. The tick **is an SVG**. A text `✓` sits visibly high in the disc.

---

## Section heads

Three heads. Pick by layout:

**1. Split head**: big title left (with eyebrow art), lead + dark button right, bottoms aligned. For the first section under the hero.

```html
<div class="pl-grid pl-split-head">
  <div class="pl-split-head__main">
    <img class="pl-eyebrow-art" src="/assets/eyebrow/1.webp" alt="" loading="lazy" decoding="async">
    <h2 class="pl-h-lg">The engine behind every closed deal</h2>
  </div>
  <div class="pl-split-head__aside">
    <p class="pl-lead pl-muted" style="max-width:480px">Lead.</p>
    <a class="pl-btn-halo" href="…"><span class="pl-btn pl-btn--dark">Label<span class="pl-btn__arrow">→</span></span></a>
  </div>
</div>
```
Desktop: the aside is right-aligned and nudged down 5px (the 64px title has more air above its cap height). ≤1024: the aside is left-aligned. The two columns stay side by side until the container is narrower than ~730px, then stack.

**2. Pinned head**: title (+ optional lead) left, a 160px render pinned to the right edge, vertically centred. The default section head.

```html
<div class="pl-pin-head">                      <!-- style="--gap:12px" when there is a lead -->
  <img class="pl-pin" src="/assets/eyebrow/2.webp" alt="" loading="lazy" decoding="async">
  <h2 class="pl-h-md" style="max-width:440px">Revenue runs on <em>real signal</em>.</h2>
  <p class="pl-lead-sm" style="max-width:520px">Optional lead.</p>
</div>
```
≤1024: the pin shrinks to 96px and slips behind the text at 90% opacity. Keep the title's `max-width` so it doesn't run under the pin on desktop.

**3. Eyebrow art in a split section**: `.pl-eyebrow-art` above an `.pl-h-md` in `.pl-split__text` (see [Split feature](#split-feature)).

---

## Surfaces: ring, media, scrim, zoom

| Class | Does |
|---|---|
| `.pl-ring` | The 4px ring, orange on hover. Add it to **every** card-like container |
| `.pl-media` | Absolute, fills its card, `background: center/cover`. Set `style="background-image:url(…)"`. Also works on `<video class="pl-media">` |
| `.pl-scrim` | Base class, always present: absolute, fills the card. Add one modifier: `class="pl-scrim pl-scrim--frame"` |
| `.pl-scrim--frame` | White fade top 60% → clear → bottom 85%: title top, caption bottom |
| `.pl-scrim--strong` | Same with a stronger top (80%) for busy media (video) |
| `.pl-scrim--top` | Top 70% → clear at 45%: title-only tiles |
| `.pl-zoom` | On the card: the photo drifts in on hover (`.8s`), and `.pl-glass--live` inside lifts |

Order inside a card: media → scrim → content. Content sits above automatically in `.pl-tile` and `.pl-reason`. In other containers give content `position: relative`.

---

## Glass panel

The frosted "UI screenshot". **Always over a photo, inside a ringed card.**

```html
<div class="pl-glass pl-glass--lg pl-glass--live">
  <div class="pl-kv"><span>Forecast · Q2</span><span>Week 7 / 13</span></div>
  <div class="pl-stat">$1.8M<small> commit</small></div>
  <div class="pl-rows" style="--gap:12px">
    <div class="pl-kv pl-kv--14"><span>Best case</span><b>$2.4M</b></div>
    <div class="pl-bar pl-bar--6"><i class="is-ink" style="width:100%"></i></div>
    …
  </div>
</div>
```

| Class | Does |
|---|---|
| `.pl-glass` | White 55%, blur 14px, 1px white border, soft shadow, radius 24, padding 24, column gap 14 |
| `--lg` | Padding 28, gap 22, `max-width: 380px`. Inside split media cards and the stepper |
| `--live` | Lifts on card hover + a light travels round its edge every 9s (paused off screen, off under reduced motion). Use on the **one** main panel per card, not on tilted decoration |
| `--spread` | `justify-content: space-between` (fills a tile: add `.pl-fill`) |

Content is **illustrative product UI**: pastry-named demo accounts, plausible numbers, labels in the product's vocabulary (deal health, commit, best case, at risk, signals). See `content/voice-and-copy.md` → Demo data.

## Data bits (inside glass)

| Class | Renders |
|---|---|
| `.pl-kv` | Label ←→ value row, 13px. Spans are muted; `<b>` values are ink, browser-bold (700). `--14` for 14px |
| `.pl-tag` | Orange 600 status word ("At risk", "Captured") |
| `.pl-label` | 13px muted standalone label ("This quarter") |
| `.pl-stat` | 56px number, unit in `<small>` (20px muted). `--md`: 36px, balanced, min 2 lines |
| `.pl-rows` | Column of kv rows and bars, gap `var(--gap, 8px)` (10 / 12 seen) |
| `.pl-bar` | 5px track (`--6`: 6px) with `<i style="width:N%">` fill. Fill is orange; `.is-ink` black, `.is-ok` green. Convention: total = ink, committed / on-track = ok, risk / progress = orange |
| `.pl-dotlist` + `.pl-dot` | 10px status dot, name (flexes), value. Dots: default orange (urgent), `.is-warn`, `.is-ink` (neutral, e.g. coaching), `.is-ok` |

---

## Bento

A 3-column grid with fixed row heights (400px, 370px) and tiles that span. ≤1024: one column, rows `minmax(360px, auto)`.

```html
<div class="pl-bento">
  <div class="pl-tile pl-tile--spread pl-ring">…</div>                              <!-- 1×1 -->
  <div class="pl-tile pl-tile--sky pl-ring pl-zoom" style="--gap:16px">…</div>      <!-- 1×1 -->
  <div class="pl-tile pl-tile--roomy pl-tile--spread pl-bento__tall pl-ring">…</div> <!-- 1×2 -->
  <div class="pl-tile pl-tile--center pl-bento__wide pl-ring pl-zoom">…</div>       <!-- 2×1 -->
</div>
```

The four home tiles are the four tile recipes:

| Recipe | Markup inside the tile |
|---|---|
| **Photo, title top / caption bottom** (`--spread`) | `.pl-media` (+ optional `data-pl-glass`), `.pl-scrim--frame`, `h3.pl-h-sm`, `.pl-tile__foot` > `p.pl-caption` + `a.pl-link-cta` |
| **Photo + glass** (`--sky .pl-zoom`, `--gap:16px`) | `.pl-media`, `h3`, `.pl-glass.pl-glass--live.pl-glass--spread.pl-fill`, `.pl-tile__foot` |
| **Tall video** (`--roomy --spread .pl-bento__tall`) | `video.pl-media[poster][preload=none][muted][playsinline][data-src]`, `.pl-scrim--strong`, `h3`, `.pl-fill`, `.pl-tile__foot` |
| **Wide with tilted glass** (`--center .pl-bento__wide .pl-zoom`) | `.pl-media`, `.pl-scrim--top`, `h3`, `p.pl-caption`, `a.pl-link-cta`, `.pl-tilt-wrap` > 2× `.pl-glass.pl-tilt` with inline `left/top/bottom/width/aspect-ratio/transform:rotate(±6–8deg)` |

Rules: the tile title is `.pl-h-sm`, centred, 2–6 words. The caption is one sentence, max 320px. The tilted cards are positioned by eye for desktop only: at ≤1024 they lose position and rotation and stack flat. That is intended.

---

## Reason tiles

Grey cards with a line-art icon top-left and a title + one line at the bottom. Four in a row (`--min:260px`), min-height 320px, radius 30.

```html
<div class="pl-grid" style="--min:260px">
  <div class="pl-reason pl-ring">
    <img class="pl-icon" src="/assets/icons/1.webp" alt="" loading="lazy" decoding="async">
    <div class="pl-reason__body"><h3 class="pl-h-sm">See the deal, not the story</h3><p>What is real, not what reps hope.</p></div>
  </div>
  …
</div>
```

Title 3–6 words, line ≤8 words, contrast-style phrasing ("X, not Y"). Icons only here; never 3D renders. Use 3 or 4 tiles; with more, start a second row of the same count.

---

## Stepper

A big photo card that cycles through steps: pills on top-left, number + title + text bottom-left, a glass panel bottom-right whose tag, value and progress change with the step.

```html
<div class="pl-grid pl-stepper pl-ring pl-zoom" data-pl-stepper="4000">
  <div class="pl-media" style="background-image:url(/assets/feature-3.jpg)"></div>
  <div class="pl-stepper__main">
    <div class="pl-stepper__pills" role="tablist" aria-label="How it works steps">
      <button class="pl-pill" type="button" role="tab" aria-controls="pl-step-panel" aria-selected="true"
        data-pl-step data-num="01" data-title="Capture signals" data-text="…" data-tag="Captured" data-big="128 signals" data-progress="20%">Step 01</button>
      …one button per step…
    </div>
    <div class="pl-stepper__copy" id="pl-step-panel" role="tabpanel">
      <span class="pl-stepper__num" data-pl-field="num">01</span>
      <h3 class="pl-h-sm" data-pl-field="title">Capture signals</h3>
      <p data-pl-field="text">…</p>
    </div>
  </div>
  <div class="pl-stepper__panel">
    <div class="pl-glass pl-glass--live">
      <div class="pl-kv"><span>Strudel Corp</span><span class="pl-tag" data-pl-field="tag">Captured</span></div>
      <div class="pl-stat pl-stat--md" data-pl-field="big">128 signals</div>
      <div class="pl-bar pl-bar--6"><i data-pl-progress style="width:20%"></i></div>
    </div>
  </div>
</div>
```

- Each pill carries its whole step in `data-*`. `js/pretzel.js` copies them into the `[data-pl-field]` slots and sets the bar width.
- `data-pl-stepper="4000"` autoplays every 4s. `"0"` turns autoplay off. A click stops autoplay. Autoplay is off under reduced motion.
- **Paint step 1 in the HTML** so the card is complete before JS runs.
- 3–5 steps. Step title ≤6 words, text ≤18 words, `data-big` ≤20 characters (two lines at 36px), progress values evenly spaced, ending at 100%.
- One stepper per page (it uses the ids `pl-step-panel`; rename them if you need two).
- ≤1024: the glass panel drops into flow under the copy.

---

## Split feature

Copy on one side, a photo card with a glass panel on the other. Alternate the sides down the page.

```html
<!-- copy left, media right -->
<div class="pl-container pl-grid pl-split">
  <div class="pl-split__text">
    <img class="pl-eyebrow-art" src="/assets/eyebrow/4.webp" alt="" loading="lazy" decoding="async">
    <h2 class="pl-h-md">Commit a number you <em>actually trust.</em></h2>
    <p class="pl-lead-sm">Two or three short sentences.</p>
    <a class="pl-link-cta pl-link-cta--lg" href="…">Learn more →</a>
  </div>
  <div class="pl-media-card pl-ring pl-zoom">
    <div class="pl-media" style="background-image:url(/assets/feature-3.jpg)"></div>
    <div class="pl-glass pl-glass--lg pl-glass--live">…</div>
  </div>
</div>

<!-- media left, copy right: put the media card FIRST and add --reverse,
     so phones still show copy first -->
<div class="pl-container pl-grid pl-split pl-split--reverse">
  <div class="pl-media-card pl-ring pl-zoom">…</div>
  <div class="pl-split__text">…</div>
</div>
```

`.pl-media-card` is `aspect-ratio: 1.1/1` with padding 40 on desktop. At ≤1024 the aspect ratio is dropped and padding becomes 28, so the panel never clips. Lead `max-width` is 440px.

---

## Compare table

```html
<div class="pl-compare">
  <div class="pl-compare__head"><span>Situation</span><span>Without Pretzel Labs</span><span>With Pretzel Labs</span></div>
  <div class="pl-compare__row pl-ring">
    <div>Monday pipeline review</div>
    <div>The old way — muted.</div>
    <div>The new way — on a white inset cell.</div>
  </div>
  …
</div>
```

Columns `.7fr 1fr 1fr`. Label cell is Space Grotesk 20px; "without" is muted; "with" sits on a white radius-14 cell. ≤1024: the header hides and cells stack. 4–6 rows, each cell 1–2 sentences.

---

## CTA card

The last thing before the footer, on every marketing page.

```html
<section class="pl-section pl-section--last" id="cta">
  <div class="pl-container pl-stack" style="--gap:100px">
    <div class="pl-cta pl-ring">
      <img class="pl-cta__mark" src="/assets/eyebrow/7.webp" alt="" loading="lazy" decoding="async">
      <h2 class="pl-h-lg">Stop managing a reporting process. <em>Start leading a business.</em></h2>
      <p class="pl-lead">One sentence.</p>
      <a class="pl-btn-halo" href="…"><span class="pl-btn pl-btn--primary">Get a demo<span class="pl-btn__arrow">→</span></span></a>
      <img class="pl-cta__hills" src="/assets/cta-hills-cut2.webp" alt="" loading="lazy" decoding="async">
    </div>
    <footer class="pl-footer">…</footer>
  </div>
</section>
```

The hills stay **in flow**: `margin-top: auto` pins them to the bottom and they bleed past the card's side padding. Never position them absolutely (that's what broke this card in the original export). `min-height: 760px` leaves room for them. Only one button: the primary.

---

## Footer

Identical on every page. Copy it from `index.html`. Brand block (logo, category line, tagline) + three link columns + email.

```html
<footer class="pl-footer">
  <div class="pl-footer__brand">
    <span class="pl-footer__logo"><img src="/assets/eyebrow/7-64.webp" alt="Pretzel Labs" loading="lazy" decoding="async">Pretzel Labs</span>
    <span class="pl-footer__line">Deal Execution Intelligence · Early access 2026</span>
    <span>Built for revenue teams that want fewer surprises and better quarters.</span>
  </div>
  <div class="pl-footer__cols">
    <div class="pl-footer__col"><span>Product</span><a href="/#product">Features</a>…</div>
    <div class="pl-footer__col"><span>Solutions</span>…</div>
    <div class="pl-footer__col"><span>Company</span>…<a class="pl-footer__mail" href="mailto:hello@pretzel-labs.com">hello@pretzel-labs.com</a></div>
  </div>
</footer>
```

New pages are linked from the column they belong to. Keep 3 columns, each ≤5 links. Legal links (Privacy, Terms) go in Company.

---

## Derived components

Not on the home page. Built only from existing tokens for pages the home page doesn't have. Use them before inventing anything else.

| Class | For | Notes |
|---|---|---|
| `.pl-hero--page` | Interior page hero | Same sky, veil and fade. No art, no 100vh, 140px bottom padding (90 at ≤1024). Title `.pl-h-xl` for marketing pages, `.pl-h-lg` for legal/utility pages |
| `.pl-prose` | Legal text, articles | 720px measure, 16px on **1.6**. h2 = 28px Space Grotesk, h3 = 20px. Links orange |
| `.pl-card` (+ `--row`) | Small grey ringed cards: integration rows, FAQ items | Surface, radius 20, padding 24. Add `.pl-ring` |
| `.pl-chip` (+ `--accent`, `--ok`, `--warn`) | Status labels: "Coming soon", "Live", plan names | 13px 600 pill. Darker text shades for AA contrast |

Compositions built from these (pricing cards, integrations grid) are in `components.html` → Derived and in `patterns.md`.

---

## JS hooks (js/pretzel.js)

| Hook | Behaviour |
|---|---|
| `.pl-burger` + `#pl-navmenu` | Mobile menu |
| `[data-pl-stepper="ms"]`, `[data-pl-step]`, `[data-pl-field]`, `[data-pl-progress]` | Stepper |
| `[data-pl-parallax]` | Element follows the pointer (hero art) |
| `video[data-src]` | Loads near the viewport, plays at half speed, ping-pongs |
| `[data-pl-glass="/assets/x.jpg"]` | Mounts the fluted-glass shader into a `.pl-media` (lazy, optional, third-party code) |
| `.pl-glass--live` | Edge-light animation only while on screen |

No other script is needed. If a page needs new behaviour, add it to `pretzel.js` behind a new `data-pl-*` hook, so a page without the hook pays nothing.
