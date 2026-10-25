# Foundations

Every value below is a token in `css/pretzel.css` (`:root`) and in `tokens.json`. They were taken from the production home page. If a value you need isn't here, the answer is almost always "use the nearest one that is", not "add one".

---

## 1. Colour

| Token | Value | Role |
|---|---|---|
| `--pl-ink` | `#1d1d1d` | Titles, body text, selected pill, dark dots |
| `--pl-muted` | `#4d585f` | Secondary text: leads off the hero, captions, nav links, glass labels, "without" column |
| `--pl-accent` | `#f64c26` | The orange: italic phrase in the hero title, "Learn more →", progress fill, step number, tags ("At risk") |
| `--pl-accent-hi` | `#ff6a45` | **Only** the light end of the primary button gradient. Never a fill or text colour by itself |
| `--pl-surface` | `#edf1f4` | Grey cards (reason tiles, compare rows, CTA card), hover fills |
| `--pl-surface-hi` | `#e3e9ef` | Burger button hover |
| `--pl-sky` | `#cfe3f7` | Under a photo tile, so it isn't grey while the photo loads |
| `--pl-paper` | `#ffffff` | Page background, nav, ghost button, "with" cells |
| `--pl-ok` | `#10b981` | "Commit" bars, on-track dots |
| `--pl-warn` | `#ff8b06` | Needs-attention dots |
| `--pl-risk` | `#f51c23` | Derived chips only. The home page shows risk in accent orange |
| `--pl-track` | `rgba(29,29,29,.08)` | Empty part of a progress bar |

**Rules**

- The page is white with grey cards and sky photographs. Colour comes from the photos and from the orange, nothing else.
- No more than two orange spots per screen: typically one primary button plus "Learn more" links or one tag.
- Text on photos is always ink, on the light part of the photo, usually over a white scrim (`.pl-scrim--*`). Muted text over a photo is only allowed inside glass.
- There is no dark mode. The brand is a light, airy sky. Don't invent one.

## 2. Typography

Two self-hosted variable fonts (`fonts/`), latin subset.

| Family | Weight | Used for |
|---|---|---|
| Space Grotesk | 600 | All titles, big numbers (`.pl-stat`), step numbers, compare row labels |
| DM Sans | **500** (base) | All other text |
| DM Sans | 600 | Buttons, nav links, tags, ticked claims (glass values in `<b>` render at the browser's `bolder`, 700, as in production) |

### Scale

| Class | Size (desktop) | ≤1024px | Line height | Tracking | Use |
|---|---|---|---|---|---|
| `.pl-h-xl` | `clamp(52px, 7vw, 100px)` | `clamp(40px, 11vw, 72px)` | 1 | −1.4px | Hero title. One per page |
| `.pl-h-lg` | `clamp(40px, 5vw, 64px)` | `clamp(34px, 9vw, 56px)`; in `.pl-cta` `clamp(30px, 8vw, 44px)` | 1.05 | −1.5px | Big section title (Features head), CTA title, legal page H1 |
| `.pl-h-md` | `clamp(34px, 4vw, 48px)` | `clamp(30px, 8vw, 44px)` | 1.2 | −1px | Standard section title |
| `.pl-h-sm` | 28px | same | 1.2 | −0.5px | Card, tile and step titles |
| `.pl-h-xs` | 20px | same | 1.2 | 0 | Compare row label, small list titles |
| `.pl-stat` | 56px | same | 1 | −2px | Big number in glass. Unit in `<small>` (20px muted) |
| `.pl-stat--md` | 36px | same | 1.05 | −1.5px | Stepper panel value |
| `.pl-stepper__num` | 64px orange | same | 1 | −2px | Step number |
| `.pl-lead` | 20px / 26px | same | — | — | Hero lead (ink); section and CTA leads (add `.pl-muted`) |
| `.pl-lead-sm` | 18px muted | same | 1.3 | — | Lead under a `.pl-h-md` |
| body | 16px | same | 1.3 | — | Default text |
| `.pl-caption` | 14px muted, max 320px | same | 1.4 | — | Tile captions |
| `.pl-label` / `.pl-kv` | 13px | same | — | — | Text inside glass panels |

**Rules**

- Titles use `text-wrap: balance` (built into the classes); paragraphs use `text-wrap: pretty`.
- Heading level (h1/h2/h3) follows document structure. Size comes from the class. A legal page's H1 uses `.pl-h-lg`; a section's H2 usually uses `.pl-h-md`.
- Set the measure with `max-width` inline on titles and leads. Values seen: titles 440 / 520 / 560 / 640 / 760px, leads 480 / 520 / 560 / 600px, split-section copy 440px.
- No italics in body text, no underlines (links are coloured), no all-caps.

## 3. Spacing and layout

**Ladder:** `6 · 10 · 14 · 20 · 30 · 40 · 70 · 100` px. Gaps between blocks and section-level padding come from this set. Component internals keep a few production values outside it (2, 4, 8, 12, 16, 18, 22, 24, 28, 36). Those live inside the component classes; don't introduce new ones in page markup.

| What | Value |
|---|---|
| Container | `max-width: 1200px; margin: 0 auto` (`.pl-container`) |
| Side gutter | 30px (sections, nav bar) |
| Section top padding | 130px; **90px at ≤1024** (`.pl-section`) |
| Section head → body | 70px (`.pl-stack`) |
| CTA card → footer | 100px (`.pl-stack` with `--gap:100px`) |
| Bottom of page | 100px (`.pl-section--last`) |
| Hero top padding | 194px desktop, 90px at ≤1024 (clears the floating nav) |
| Grid gaps | 30px (bento, reason tiles, split head), 40px (stepper), 70px (split feature), 20px (compare rows) |
| Card padding | 30px tiles, 40px big cards, 24px glass, 28px large glass, 24px tiles at ≤640 |

**Knobs.** Two layout custom properties are registered with `inherits: false`, so they never leak into nested components. Set them on the element that uses them:

- `--gap`: used by `.pl-stack`, `.pl-grid`, `.pl-pin-head`, `.pl-tile`, `.pl-glass`, `.pl-rows`, `.pl-card`
- `--min`: column floor for `.pl-grid` (default 320px; reason tiles use 260px)

## 4. Radii

A closed set. Nothing in between. (Round discs such as the arrow disc, tick and status dots use `50%`; the burger bars use 2px.)

| Token | px | On |
|---|---|---|
| `--pl-r-pill` | 100 | Buttons, halos, pills, progress bars, nav links, chips |
| `--pl-r-nav` | 56 | The nav capsule |
| `--pl-r-xl` | 30 | Reason tiles, stepper card, split media card, CTA card |
| `--pl-r-lg` | 24 | Glass panels, mobile menu |
| `--pl-r-md` | 20 | Bento tiles, compare rows, derived `.pl-card` |
| `--pl-r-sm` | 14 | Inset cells (compare "with" column) |

## 5. Elevation

There are no ordinary drop shadows on cards. Depth comes from:

| Name | Value | Where |
|---|---|---|
| Ring | `0 0 0 4px rgba(221,229,237,.7)` | Every card, the nav, compare rows (`.pl-ring`) |
| Ring hover | `0 0 0 4px rgba(246,76,38,.55)` | Same elements on hover, `.3s` |
| Glass | `0 8px 30px rgba(29,29,29,.08)` + `1px` white 70% border + `blur(14px)` over white 55% | `.pl-glass` |
| Glass lift | `0 16px 40px rgba(29,29,29,.14)` + `scale(1.03)` | `.pl-glass--live` while its card is hovered |
| Button bevel | `inset ±4px ±4px 8px rgba(255,255,255,.3)` | Primary and dark buttons |
| Button glow | primary `0 8px 16px rgba(246,76,38,.45)`; dark `0 8px 16px rgba(29,29,29,.5)`; nav `0 4px 16px` | Under buttons |
| Mobile menu | ring + `0 12px 30px rgba(29,29,29,.1)` | `.pl-navmenu` |
| Hero art | `drop-shadow(0 30px 40px rgba(60,30,10,.25))` | The big pretzel |

## 6. Motion

One custom easing curve: **`cubic-bezier(.2, .8, .2, 1)`** (`--pl-ease`), used for movement (photo drift, glass lift, menu, bars, hero art). Short colour, filter and ring transitions use the browser default `ease`, as in production.

| What | Duration |
|---|---|
| Colour, background, filter (buttons, links, pills) | `.2s` |
| Ring colour on hover | `.3s` |
| Glass lift on card hover | `.5s` ease |
| Progress bar width | `.5s` ease |
| Photo drift on card hover: `scale(1.06) translate(-1.5%, -1%)` | `.8s` ease |
| Hero pretzel follows the pointer (±20px x, ±12px y, ±2°) | `.6s` ease |
| Edge light: one lap round a live glass panel | `9s` linear, loops |
| Stepper autoplay | every 4s, stops on click |
| Background video | half speed, plays forward then backward |

**Rules.** Anything that moves continuously pauses off screen (pretzel.js does this for the edge light) and stops under `prefers-reduced-motion: reduce` (CSS + pretzel.js handle the edge light, transitions, parallax, stepper autoplay and the background video, which stays on its poster). Hover effects never move text, only photos and glass.

## 7. Imagery: asset catalogue

Four families with fixed roles. Don't mix families inside one block, and don't use an image outside its role.

### Sky photographs: backgrounds only

Pastel blue sky, soft clouds with a peach/pink light. They're always a *background* (hero, behind glass, behind tiles), never an illustration in their own right.

| File | Size | Role |
|---|---|---|
| `hero-clouds.jpg` | 2000×1597, 151 KB | Hero background (>640px). Preload it |
| `hero-clouds-1250.webp` | 1250×999, 56 KB | Hero background (≤640px). Preload with `media` |
| `feature-2.jpg` | 1400×1118 | Blue sky, small clouds: behind glass (risk tile, manager card) |
| `feature-3.jpg` | 1400×1118 | Big peach clouds: wide tile, stepper, leaders card |
| `feature-timeline.jpg` | 1400×1118 | Bright blue, wispy: timeline tile (with fluted-glass shader) |

### 3D pretzel renders: section markers

Photoreal baked pastries on transparent backgrounds. Each one marks a section.

| File | Size | Looks like | Role |
|---|---|---|---|
| `eyebrow/1.webp` | 370² | Round salted pretzel | Eyebrow art above a title (`.pl-eyebrow-art`, 216px; 120px ≤1024) |
| `eyebrow/2.webp` | 320² | Bagel-like ring | Pin at the right of a title (`.pl-pin`, 160px; 96px ≤1024) |
| `eyebrow/3.webp` | 320² | Pale knotted pretzel | Pin |
| `eyebrow/4.webp` | 370² | Orange knotted pretzel | Eyebrow art |
| `eyebrow/5.webp` | 370² | Golden pretzel | Eyebrow art |
| `eyebrow/6.webp` | 320² | Square pastry with seeds | Pin |
| `eyebrow/7.webp` | 240² | Classic pretzel (the mark) | CTA card mark, 120px |
| `eyebrow/7-64.webp` | 64² | Same, small | Logo in nav and footer (32px slots), favicon |

On a new page, reuse these in order and don't repeat one within a page. Pins sit beside `.pl-h-md` titles with no lead art; eyebrow art sits above titles in split layouts.

### Line-art icons: flat tiles only

Hand-drawn orange (`#f64c26`-ish) strokes on transparent backgrounds, pretzel-themed. 112px wide, shown at **56px**.

| File | Motif |
|---|---|
| `icons/1.webp` | Heart-shaped pretzel |
| `icons/2.webp` | Pretzel in a paper bag |
| `icons/3.webp` | Coffee cup with pretzel logo |
| `icons/4.webp` | Pretzel with "shine" lines |

Only on grey reason tiles (`.pl-reason`). Never in the same block as a 3D render.

### Hero art, landscape, video

| File | Size | Role |
|---|---|---|
| `pretzel-2d.webp` (+ `-460`, `-840`) | 1377×1207 | Big brown pretzel at the bottom of the home hero. **Always with `srcset`/`sizes`**, as in index.html, or phones download 1377px for a 228px box |
| `cta-hills-cut2.webp` | 1600×538, transparent sky | **Only** the bottom edge of the CTA card, in flow (`.pl-cta__hills`) |
| `feature-1.mp4` + `feature-1.webp` poster | 624×624 video, 1200×960 poster (both `cover`) | Pretzels floating in a teal sky. Tall bento tile only. `preload="none"`, loaded near viewport |

### Making new imagery

Match the family exactly: sky photos are pastel and low-contrast with a warm light, 1400px wide JPEG (or WebP if it comes out smaller at equal quality). Renders are single pastries, soft top light, transparent WebP at about 1.7× the display size. Icons are single-weight orange line drawings. Never use stock photos of people or offices, UI screenshots, or third-party logos (trademark: `product-brief.md` §9).

## 8. Breakpoints

Two, both `max-width`. They're the only ones.

| | ≤1024px (tablet) | ≤640px (phone) |
|---|---|---|
| Nav | Links → burger + dropdown menu | Wordmark hidden (mark only); nav button 13px |
| Sections | Top padding 130 → 90 | — |
| Hero | No `min-height: 100vh`; smaller art | Mobile sky image (`hero-clouds-1250.webp`) |
| Titles | Step down (see §2) | — |
| Grids | Bento → one column. Stepper, splits and split head are auto-fit grids: still two columns at 1024, one column once the container is narrower than ~820 / 770 / 730px | — |
| Absolute decor | Tilted glass and the stepper panel go static | — |
| Pins / eyebrow art | 160 → 96px (behind text, 90% opacity) / 216 → 120px | — |
| Buttons | — | Button pairs full width, equal |
| Tiles | — | Bento tile padding 24px |
| Compare | Header hidden, cells stack | — |

Also `@media (min-width:1025px)`: the split-head aside is nudged down 5px for optical alignment.

## 9. Performance budget (the home page's numbers)

Production: FCP 124 ms desktop, LCP 1.4 s on slow 4G, 12 requests, 0 cross-origin. New pages must not regress this.

1. No CDN or third-party scripts in the critical path. Fonts are local. No frameworks are needed: pages are static HTML + one CSS + one deferred JS.
2. Preload the LCP image (the hero sky), with `media` for the mobile and desktop variants, plus the two fonts.
3. Everything below the first screen gets `loading="lazy" decoding="async"`. The logo and hero art are eager.
4. Serve images at their rendered size: `naturalWidth` no more than 2× the box. Use `srcset` for anything big.
5. **Never hide the page until load** (`opacity:0` reveal). Measured on this site: FCP went from 124 ms to 4.1 s and LCP stopped registering.
6. Video: `preload="none"`, `data-src`, loaded by pretzel.js near the viewport.
7. The fluted-glass shader pulls ~122 KB (React + shader lib) from esm.sh. Only use `data-pl-glass` on photo tiles where it's wanted. pretzel.js lazy-loads it, and the photo shows as a normal background if it fails.

## 10. Accessibility baseline

- Focus: `:focus-visible` shows a 2px orange outline (global). Don't remove it.
- Decorative images (renders, icons, hills, hero art) get `alt=""`. The logo image gets `alt="Pretzel Labs"`.
- The burger keeps `aria-expanded`/`aria-label` in sync. The stepper uses `role="tablist"`/`tab`/`tabpanel` with `aria-selected`.
- Body text contrast: ink on white 16.9:1, muted on white 7.3:1, muted on surface 6.4:1. The orange (`#f64c26` on white, 3.5:1) passes AA only for large text (≥24px, or ≥18.7px bold): the hero title's italic phrase. The 14–16px orange "Learn more" links and glass tags fall short (3.5:1 < 4.5:1). That is inherited from production; don't spread it to body copy or new small text. Derived chips use darker shades of each hue for their 13px text (≥4.6:1 on white and on `--pl-surface`).
