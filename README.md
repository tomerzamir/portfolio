# tomerzamir.github.io — v2

My personal site, rebuilt from scratch. Three hand-authored files, no build
step, no framework, no dependencies, no trackers.

Live: **https://tomerzamir.github.io/portfolio**

## Build approach

The whole site is `index.html` + `styles.css` + `script.js` served straight
from the repo root. Nothing compiles, bundles, or runs at deploy time — GitHub
Pages just serves the files, and `.nojekyll` tells it to skip Jekyll.

Everything is **progressive enhancement**: the markup is semantic and complete
on its own, CSS handles all layout and theming, and JS only layers on
interactions. With JavaScript disabled the site still reads, navigates, and
submits the contact form.

- **HTML** (`index.html`) — one document, four `<section>` "chapters" plus
  header/footer. Semantic landmarks throughout; the contact form posts to
  Formspree and degrades to a normal form POST without JS.
- **CSS** (`styles.css`) — a design-token layer (~500 custom properties:
  color, type scale, shape, elevation, motion) driving all layout. Theming is
  pure CSS variables swapped by a single `data-theme` attribute, with light/dark
  twins for every surface. Uses `color-mix()`, container-relative units, and
  `@media (prefers-color-scheme / prefers-reduced-motion)`.
- **JS** (`script.js`) — a single IIFE, no globals leaked. Interactions:
  - `IntersectionObserver` for scroll-reveal and the active-section dock nav
  - `data-theme` toggle persisted to `localStorage`, animated with the
    View Transitions API (`document.startViewTransition`) where supported
  - Contact form submitted via `fetch` + `FormData` with an `AbortController`
    timeout and inline success/error states
  - Clipboard-copy on the email card, with a legacy `execCommand` fallback
  - Small CSS-driven easter egg triggered from JS

Every animation is gated on `prefers-reduced-motion`, and every capability
(`fetch`, `clipboard`, `IntersectionObserver`, View Transitions) is
feature-detected before use.

## Design system

Grounded in **Material Design 3** with a custom pastel "Coastal" palette — four
full-bleed tonal surfaces, each with a deep-sea dark-mode twin.

- **Type** — Fraunces (variable display: `ital` + `opsz` + `SOFT` axes),
  Inter (body), JetBrains Mono (accents); Frank Ruhl Libre + Noto Serif Hebrew
  for the RTL epigraph. All via Google Fonts.
- **Shape** — M3 scale (4 / 8 / 12 / 16 / 28 / pill).
- **Elevation** — layered, navy-tinted shadows (never flat black).
- **Motion** — M3 emphasized easing (`cubic-bezier(0.2, 0, 0, 1)`), 200–900 ms
  duration tokens.
- **State layers** — 8% hover / 10% focus / 10% pressed overlays per M3 spec.

## Accessibility

- Semantic landmarks, skip link, visible focus rings (2px, 2px offset) on every
  surface, `aria-current` on the active dock item.
- Key contrast pairings verified WCAG AA (many AAA).
- Correct `dir="rtl"` + `lang="he"` on Hebrew content.
- Works without JavaScript; all motion respects `prefers-reduced-motion`.

## Local development

```sh
python3 -m http.server 4173
# → http://localhost:4173
```

## Deploy (GitHub Pages)

Static, served from the repo root. Push to `main`, then set **Settings → Pages →
Source: Deploy from a branch**, branch `main`, folder `/ (root)`. Pages publishes
within a minute or two.

## File tree

```
.
├── assets/            # imagery + video
├── index.html         # markup — four tonal chapters
├── styles.css         # design tokens + layout
├── script.js          # interactions (single IIFE)
├── .nojekyll          # skip Jekyll on Pages
└── README.md
```
