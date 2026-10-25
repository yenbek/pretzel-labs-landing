# Pretzel Labs — design system & site kit

This folder is a self-contained static site and the design system behind it. Use it to:

- **run the Pretzel Labs landing page as the site's home page** (`index.html`), and
- **build more pages** that look like the same designer made them, from the same components, assets and wording.

Everything here was taken from the production home page (`../dist/index.html`). `index.html` in this folder rebuilds that page with the classes in `css/pretzel.css`. It was checked against production on 2026-10-24 and re-checked on 2026-10-25: full-page headless-Chrome screenshots at 1440, 1024, 768, 640, 390 and 360 px have identical page heights and no pixel differing by more than 24/255 on any channel (the few that differ at all are anti-aliasing on button edges). That holds with reduced motion on or off and with the fluted-glass shader on or off.

**For agents, reading order:** this file → `docs/components.md` → `docs/content/voice-and-copy.md`. Open `components.html` in a browser to see every component. Read the other docs when a task touches them.

---

## Folder map

```
index.html               home page, built entirely from the system. Your reference implementation.
_page.html               template: interior page (page hero, sections, CTA, footer)
_legal.html              template: long-form text (privacy, terms)
components.html          living gallery of every component, foundation and composition
css/pretzel.css          THE stylesheet: tokens, base, components, responsive rules. One file.
js/pretzel.js            all behaviour (menu, stepper, video, parallax, edge light). Opt-in by markup.
js/fluted-glass.js       optional WebGL "fluted glass" shader, lazy-loaded by pretzel.js
tokens.json              the same tokens, W3C Design Tokens style ($type/$value); composite values (shadows, gradients, clamp sizes) are CSS strings, so strict DTCG tools will reject them
assets/                  every image and video the site uses (catalogue: docs/foundations.md §7)
fonts/                   DM Sans + Space Grotesk, variable woff2, self-hosted
vercel.json              clean URLs + cache headers;  .vercelignore keeps docs/templates off the live site
docs/
  foundations.md         colour, type, spacing, radii, elevation, motion, breakpoints, imagery
  components.md          every component: markup, variants, knobs, rules, mobile behaviour
  patterns.md            section recipes, page recipes, page structure, links, SEO head
  content/
    voice-and-copy.md    how Pretzel sounds: wording rules, naming, CTA labels, red lines
    homepage-copy.md     every string on the home page, by section, with what to fix
    product-brief.md     product facts and claim guardrails (source of truth for copy)
    content-proposal.md  proposed copy changes for the home page (not applied yet)
```

## Run it

Pages use root-absolute paths (`/css/…`, `/assets/…`, `/#how`), so serve this folder as the web root. Opening the files with `file://` won't work.

```bash
npx serve design-system            # http://localhost:3000, clean URLs like /pricing → pricing.html
# or
python3 -m http.server 4391 --directory design-system   # use /pricing.html instead of /pricing; no Range support, so the video loops instead of ping-ponging
```

Deploy: `npx vercel deploy design-system --prod`. `vercel.json` turns on clean URLs, sets immutable caching for `assets/` and `fonts/`, and makes `css/`/`js/` revalidate.

---

## Build a new page in 8 steps

1. **Copy a template** to the folder root: `_page.html` → `pricing.html` (served at `/pricing`). Use `_legal.html` for long-form text. Keep pages flat at the root unless you need nesting. Root-absolute paths make nesting safe.
2. **Keep the nav and footer verbatim.** The only allowed change is `aria-current="page"` on the active nav link. If you add a page to the nav, change the nav block in *every* page, `index.html` included.
3. **Pick sections from `docs/patterns.md`.** Every section the home page has is a recipe there. Compose new sections only from existing components (`docs/components.md`).
4. **Write copy with `docs/content/voice-and-copy.md`**, and check every factual claim against `docs/content/product-brief.md` §9 (red lines).
5. **Set the head:** `<title>`, `<meta name="description">`, the preloads for the hero image you use, the favicon (see `patterns.md` → Head).
6. **Images:** use only files from `assets/`, each in its role (`foundations.md` §7). New art must match the families described there. Never overwrite an asset file (they are cached for a year); add a new filename.
7. **Check it** at 1440, 1024, 640 and 390 px: no horizontal scroll, nothing clipped, one orange button per screen. Then run the checklist below.
8. **Link it:** add it to the footer column it belongs to (and the nav, if it earns a top-level slot).

---

## The rules that make it look like Pretzel

Break any of these and the page stops looking like the home page.

1. **The 4px ring is the signature.** Every card-like container gets `.pl-ring` (`0 0 0 4px rgba(221,229,237,.7)`), which turns orange on hover. No borders or drop shadows on cards instead.
2. **Two fonts with fixed jobs.** Space Grotesk 600 for titles and big numbers. DM Sans for everything else, at weight 500 (not 400). Titles always have negative tracking (the `.pl-h-*` classes handle it).
3. **One italic phrase per title**, in `<em>`. It's orange only in the hero title (`.pl-h-xl`); elsewhere it's ink italic.
4. **Orange is scarce.** One primary (orange) button per screen. Secondary actions use the dark button or the ghost button. Three button kinds exist; don't make a fourth.
5. **Button pairs sit in halos** (`.pl-btn-halo`), both of them, with labels of 2–3 words.
6. **Glass only on photos.** `.pl-glass` panels always sit over a sky photo inside a ringed card. On white they look dirty.
7. **Closed sets.** Radii: 100 / 56 / 30 / 24 / 20 / 14 (plus 50% for discs). Spacing between blocks: 6 · 10 · 14 · 20 · 30 · 40 · 70 · 100. Component internals use a few more values taken from production (8, 12, 16, 22, 24, 28…); reuse a component's value rather than inventing one. Colours: the tokens. No new colours.
8. **Two breakpoints: 1024 and 640** (max-width). Don't add others.
9. **No fixed heights** on content containers. Use `min-height`. Fixed heights clipped content on phones in the original export.
10. **Grids use `.pl-grid`** (`minmax(min(var(--min), 100%), 1fr)`). A bare `minmax(320px, 1fr)` overflows on 375px phones.
11. **Anything absolutely positioned to fill "empty" desktop space must go static at ≤1024** (see the stepper panel and tilted cards).
12. **Performance budget:** no third-party scripts in the critical path, lazy-load everything below the first screen, `srcset` on big images, never hide the page until load (`docs/foundations.md` §9).

## Where to find what

| Task | Read |
|---|---|
| Add a section to a page | `docs/patterns.md` → Section recipes |
| Make a new kind of page (pricing, integrations, about, legal) | `docs/patterns.md` → Page recipes |
| Look up a class, its variants and mobile behaviour | `docs/components.md` |
| Exact colour / size / shadow / easing | `docs/foundations.md` or `tokens.json` |
| Pick an image | `docs/foundations.md` §7 |
| Write a heading, button label, claim | `docs/content/voice-and-copy.md` |
| Know what the product does and may say | `docs/content/product-brief.md` |
| Change home page wording | `docs/content/homepage-copy.md` + `content-proposal.md` |

## Pre-ship checklist

- [ ] Nav and footer byte-identical to `index.html` (apart from `aria-current`)
- [ ] One `<h1>`, one orange button per screen, button pairs in halos
- [ ] Each title has at most one italic phrase. Orange italic only in `.pl-h-xl`
- [ ] Every card-like container has `.pl-ring`. Glass only on photos
- [ ] No inline colours, radii, shadows or font sizes. Inline style only for `max-width`, `--gap`, `--min`, `background-image`, and the tilt positions
- [ ] 1440 / 1024 / 640 / 390: no horizontal scroll, nothing clipped, no text over a dark part of a photo
- [ ] Images below the first screen have `loading="lazy" decoding="async"`. The hero image is preloaded
- [ ] Every claim passes the red-line list (`product-brief.md` §9). Demo data uses pastry names
- [ ] `<title>` and `<meta name="description">` set
- [ ] Checked with `prefers-reduced-motion: reduce`

## Known gaps carried over from production

These are faithful to the live page on purpose. Fix them deliberately, not by accident.

- Several links are dead: hero "Watch a 4-min tour" and CTA "Get a demo" (`href="#"`), footer "Customers"/"Resources", and every "Learn more →" goes to `#cta`, which has no form. The brief wants all CTAs pointed at a trial sign-up URL that doesn't exist yet (`product-brief.md` §8).
- Some live copy crosses the brief's red lines ("Accurate under 25% of the time", "in under a minute", "real time", "let Pretzel handle it", "day three", "Early access 2026"). The list and replacements are in `docs/content/homepage-copy.md`.
- Nav labels don't match their targets (Solutions → How it works, etc.).
- There's no meta description, OG tags or favicon on the home page yet.
- On phones the compare table hides its column header, so "without / with" is carried only by cell styling.

The differences from production don't show in a static screenshot: the manager section got `id="managers"` and the footer's "Sales managers" link now points at it; internal links are root-absolute (`/#how`); the stepper has tab ARIA with arrow-key navigation, and no autoplay under reduced motion; the background video is muted (iOS needs that to autoplay) and isn't loaded under reduced motion. One hover differs: on `.pl-zoom` cards the live glass panel's shadow deepens (`--pl-glass-lift`). Production has the same rule, but its inline `box-shadow` overrides it, so only the scale-up shows there.

## Relationship to the rest of the repo

- `../dist/` is what's deployed today. `../export/` is the original Claude Design export. `../pretzel-labs-kit/` is the earlier, human-oriented kit (in Russian). **This folder supersedes that kit**: same assets, corrected values (the kit's h1 tracking, dark-button hover, mobile hero padding and some radii differed from production).
- To switch production to this folder, deploy `design-system/` instead of `dist/`. The rendered page is the same.
