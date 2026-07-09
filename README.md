# tomerzamir.github.io — v2

A rebuild of my personal site. **Material Tonal Chapters — Coastal palette**:
four full-bleed pastel surfaces mapped to a Dublin-coastline mood, Fraunces
italic display type, and an anchoring Deep Ocean CTA across all four sections.

Live: **https://tomerzamir.github.io/portfolio**

## Stack

- **HTML** — one hand-authored `index.html`
- **CSS** — one hand-authored `styles.css`
- **JS** — one hand-authored `script.js`, no dependencies
- **Fonts** — Fraunces (display), Inter (body), JetBrains Mono (accents),
  Frank Ruhl Libre + Noto Serif Hebrew (Hebrew epigraph), via Google Fonts

No build step. No framework. No trackers.

## Design system

Grounded in **Material Design 3** with a curated pastel palette.

- **Type**
  - Display · Fraunces (variable, italic + `opsz` + `SOFT` axes)
  - Body · Inter
  - Mono · JetBrains Mono
- **Palette (light) — Coastal**
  | Chapter | Color | Hex |
  |---|---|---|
  | Hero | Lagoon Turquoise | `#A6DBDC` |
  | Work | Sea Foam | `#B7DDD4` |
  | About | Sky | `#BCD4E6` |
  | Contact | Dusk Rose | `#E8C4C4` |
  | Footer / base | Bone | `#F5F1E8` |
  | CTA anchor | Deep Ocean | `#1A4A6B` |
  | Accent | Driftwood | `#6B4F26` |
- **Palette (dark)** — deep-sea twins: Deep Teal-Charcoal (Hero), Roasted
  Coffee (Work), Royal Ink (About), Deep Wine (Contact), with a Sky Blue
  (`#7BC0E0`) CTA and gold accent.
- **Shape** — M3 scale (4 / 8 / 12 / 16 / 28 / pill)
- **Elevation** — layered shadows, cool navy-tinted (never flat black)
- **Motion** — M3 emphasized easing (`cubic-bezier(0.2, 0, 0, 1)`) with a
  duration token set (200–900 ms)
- **State layers** — 8% hover / 10% focus / 10% pressed overlays on
  interactive surfaces (M3 spec)

Key color pairings verified against WCAG AA. Focus rings are 2px Deep Ocean
(Sky Blue in dark) at 2px offset on every surface.

## Signature moments

1. **Tonal chapter page-turn** — Lagoon → Sea Foam → Sky → Dusk Rose across
   four full-bleed surfaces (each with its own deep-sea dark twin).
2. **Fraunces ambient settle** — a one-shot settle of the hero name on load
   (the `SOFT` axis relaxes). No cursor parallax, no letter-by-letter stagger.
3. **Typographic work index** — no card grid. Projects are numbered rows with
   Fraunces italic folio numerals, mono chip stacks, and prominent thumbnails.
4. **Marginalia pull-quotes** — Einstein and Turing rendered as editorial
   callouts inside the About prose, with a left-rule that draws in on scroll.
5. **Hebrew epigraph** — Herzl's "אם תרצו אין זו אגדה" set right-to-left in a
   proper Hebrew serif stack, closing the Hero chapter.
6. **Jobs coda** — a centered lead-in above the Contact form.
7. **Material filled form** — floating labels, bottom-border thickening on
   focus, dual-signal success (color pulse + checkmark + text).
8. **Persistent dock nav** — a bottom-center pill with a moving dot marking
   the active section, driven by `IntersectionObserver`.
9. **Idle hint** — after a few still seconds (pointer devices only), a hand
   cursor appears on the logo and "taps" to invite a click. It retires for the
   session once the easter egg is found.
10. **Sailboat easter egg** — triple-click the logo and a little sailboat
    sails across the screen, its passenger waving in sunglasses.

## Quotes (from the original site, preserved verbatim)

1. **Theodor Herzl** — "אם תרצו אין זו אגדה"  (Hero epigraph, RTL)
2. **Albert Einstein** — "Intellectual growth should commence at birth and
   cease only at death."  (About marginalia)
3. **Alan Turing** — "We can only see a short distance ahead, but we can
   see plenty there that needs to be done."  (About marginalia)
4. **Steve Jobs** — "The only way to do great work is to love what you do."
   (Contact coda)

## Accessibility

- Semantic landmarks throughout (`header`, `main`, `footer`, `nav`, `section`,
  `blockquote` for quotations)
- Skip link (moves focus into content), visible focus outlines, `aria-current`
  on the active dock item
- Key contrast pairings verified WCAG AA (many AAA)
- Every animation gated on `prefers-reduced-motion: reduce`
- Progressive enhancement — the site works without JavaScript
- Hebrew rendered with correct `dir="rtl"` + `lang="he"` and a Hebrew serif
  font stack

## Local development

No build — just serve the folder:

```sh
python3 -m http.server 4173
# → http://localhost:4173
```

## Deploy (GitHub Pages)

The site is static and served straight from the repo root; `.nojekyll` tells
Pages to skip Jekyll processing.

1. Push to the default branch.
2. In the repo: **Settings → Pages → Build and deployment → Source: Deploy
   from a branch**, branch = `main`, folder = `/ (root)`.
3. Pages publishes at the repo's URL within a minute or two.

## File tree

```
.
├── assets/            # imagery + video
│   ├── IoT.png
│   ├── snowboarding.mp4
│   └── voice.png
├── index.html         # markup
├── styles.css         # design system + layout
├── script.js          # interactions
├── .nojekyll          # tell GitHub Pages to skip Jekyll
└── README.md
```
