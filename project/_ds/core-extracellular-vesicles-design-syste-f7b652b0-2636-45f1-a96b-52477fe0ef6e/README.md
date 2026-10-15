# CORE Extracellular Vesicles — Design System

A photography-first, **"museum gallery"** design language for **CORE Extracellular Vesicles**, a life-sciences company building the foundational platform for extracellular vesicle (EV) science. The system treats CORE's science — isolation reagents, characterization instruments, and EV-based therapeutic candidates — the way Apple treats a product: as a luminous artifact resting on a quiet surface, framed by confident-but-quiet typography and a single interactive blue.

> **The discipline in one line:** UI chrome recedes so the science can speak. Edge-to-edge tiles alternate light and dark canvases; one Action Blue carries every interactive element; exactly one drop-shadow exists in the entire system, and it belongs to product imagery.

---

## Company context

**CORE Extracellular Vesicles** designs the tools and therapies that make extracellular vesicles usable at scale. Extracellular vesicles are nanoscale, membrane-bound particles (exosomes and microvesicles) that cells release to carry proteins, lipids, and RNA between one another — a native delivery system biology already trusts. CORE's premise: if EVs are nature's courier network, the field needs instruments and reagents precise enough to isolate, characterize, and engineer them reproducibly.

The portfolio (as represented in this system) spans three surfaces:

- **Marketing website** — the public face. A vertical stack of full-bleed "tiles", each a single product or idea: an isolation reagent, a benchtop characterization instrument, the therapeutic pipeline, the science story. This is where the museum-gallery language lives most purely.
- **Catalog / store** — the ordering surface for research products (isolation kits, antibodies, reference standards, consumables). Same chassis, switched to a denser grid of white utility cards with hairline borders and a persistent sub-nav.
- **Product / configurator pages** — deep pages for a single instrument or kit, with option chips, spec tables, and a floating sticky "add to quote / order" bar.

### Sources analyzed
This design system was authored from a single provided artifact:

- **`Apple-design-analysis` (alpha)** — a structured YAML + prose analysis of Apple's web design language (homepage, environment, store, iPhone buy page, accessories index), supplied as the aesthetic direction for CORE. All tokens (colors, type ladder, radii, spacing, components) derive from it.

No codebase, Figma file, or existing CORE product was provided. The brand voice, copy, product names, and screens in the UI kits are **plausible constructions** built to exercise the design language — they are scaffolding for the system, not canonical CORE content. Replace product names, imagery, and copy with real CORE assets when available.

> **Provenance note:** The visual *grammar* is adapted from an analysis of Apple's design language. This system reuses the structural ideas (tile rhythm, one accent, one shadow, the SF Pro type ladder) for an original life-sciences brand. It does not reproduce Apple's logos, product names, photography, or proprietary marks.

---

## Content fundamentals

How CORE writes. The copy is the quiet partner to the photography — it states, it doesn't sell.

- **Voice: declarative and unhurried.** Headlines are short noun phrases or simple claims, never clever. "Isolation, perfected." "See every vesicle." "The platform for EV science." No exclamation points outside rare product reveals.
- **Person: "you" for the researcher, never "I".** The brand addresses the scientist directly and warmly — "Run your protocol in half the steps" — but never anthropomorphizes itself with "we believe" filler. When CORE must speak as itself it uses the company name: "CORE built Vesa to remove the variables."
- **Casing: sentence case everywhere.** Headlines, sub-nav labels, buttons ("Learn more", "Order", "Add to quote") are sentence case. The only Title Case is product names (**Vesa**, **CoreIsolate**, **Lumen**) and the company name.
- **Two-beat tile pattern.** Almost every tile is **name → one-line tagline → one or two short CTAs.** The tagline carries the single idea; the body, when present, is one short paragraph at most. If a tile needs two paragraphs, it's two tiles.
- **CTAs are verbs, paired.** The recurring pair is a primary action and a learn action: "Order" + "Learn more"; "Request a demo" + "Read the data". Both render as blue (one solid pill, one ghost pill).
- **Numbers are evidence, used sparingly.** When CORE quotes a figure it is specific and load-bearing ("Recovers 94% of CD9+ vesicles", "Down to 30 nm resolution") — never a vanity stat wall. One number per tile, maximum.
- **No emoji. No unicode decoration.** The brand never uses emoji or dingbats. Emphasis comes from weight (600) and from surface change, not from glyphs.
- **Scientific register, plain words.** Domain terms (exosome, tetraspanin, nanoparticle tracking) appear where accurate, but sentences stay short and jargon-light. The reader is a working scientist, not a specialist in CORE's marketing.
- **Legal / fine print is honest and small.** Disclaimers ("For research use only. Not for use in diagnostic procedures.") live in `fine-print` / `micro-legal` at the foot of the page, never hidden, never loud.

**Representative copy**
- Hero: *"The platform for extracellular vesicle science."*
- Product tile: *"Vesa. See every vesicle. Single-particle characterization down to 30 nm — on the bench, in twenty minutes."*
- Pipeline tile: *"Engineered vesicles, delivered where they're needed. Eight programs in discovery."*
- CTA pair: *Order* · *Learn more*
- Fine print: *"For research use only. Not for use in diagnostic procedures."*

---

## Visual foundations

The motifs and rules that make a surface read as CORE.

### Color
- **One interactive color.** **Action Blue `#0066cc`** carries every link, every pill CTA, and the focus-ring root. There is **no second brand color.** Resist adding one — emphasis is achieved by surface change, not by a new hue.
- **Three blues, one job each.** Action Blue `#0066cc` (light surfaces) · Focus Blue `#0071e3` (keyboard focus ring, selected chip border) · Sky Link Blue `#2997ff` (inline links on *dark* tiles only, where Action Blue would disappear).
- **Near-black ink, not pure black.** Text is `#1d1d1f`, chosen so the page feels photographic rather than printed. Pure black `#000000` is reserved for the global nav bar and true void (video backgrounds).
- **Two light canvases + three dark tiles.** White `#ffffff` and parchment `#f5f5f7` alternate on light; `#272729 / #2a2a2c / #252527` are micro-stepped dark tiles used to create the faintest separation when two darks meet. The surface change *is* the section divider.
- **Imagery color vibe: cool, clinical, luminous.** EV renders, instrument photography, and reagent vials are shot cool-neutral on white or near-black sweeps — think lab light, not warm studio. No grain, no warm filters, no duotone. The product is crisp, color-accurate, and self-lit.

### Type
- **SF Pro Display (≥19px headlines) + SF Pro Text (body/UI).** Display = weight 600 with negative tracking (`-0.28 → -0.374px`) for the signature tight headline cadence. Body = **17px / 400 / 1.47**, never 16px — the extra pixel sets the reading pace.
- **Weight ladder is 300 / 400 / 600 / 700. 500 is deliberately absent.** Weight 300 is real and rare — reserved for large airy reads (`button-large` 18/300, `lead-airy` 24/300).
- **Line-height is context-specific.** Display 1.07–1.19 (tight); body 1.47 (editorial); footer/store link stacks an unusually relaxed 2.41 (`dense-link`) — that relaxed leading is what makes dense link columns scannable.

### Spacing & layout
- **Base 8px.** Structural layout snaps to 8/12/16/24; sub-base values (4/5/6/7) only for tight typographic nudges. Tokens: `4 · 8 · 12 · 17 · 24 · 32 · 48 · 80`.
- **80px section padding inside a tile; 0 gap between tiles.** Tiles touch edge-to-edge; the color change provides the break.
- **Content widths:** ~980px text-heavy sections · ~1440px product/utility grids · full-bleed for hero tiles. Content locks at 1440px on wide desktop; margins absorb the rest.
- **Whitespace is the pedestal.** ≥64px of air above a tile headline, 48–64px below; the nearest content to a product render is ≥40px away. The footer is the *only* deliberately dense region.

### Backgrounds
- **Photography and flat color only. No decorative gradients — zero gradient tokens exist.** Atmospheric depth comes from the imagery itself (a dark instrument sweep, a luminous vesicle render), never from a CSS gradient overlay. This is the rare luxury brand with no gradient in its tokens.
- Full-bleed tiles, rectangular, edge-to-edge. No borders, no frames on tiles.

### Elevation & depth
- **Exactly one shadow:** `rgba(0,0,0,0.22) 3px 5px 30px` — applied **only** to product imagery resting on a surface, to give the object weight. Never on cards, buttons, or text.
- **Other "elevation" is non-shadow:** (a) surface-color change (light tile ↔ dark tile), and (b) `backdrop-filter: blur()` on the frosted sub-nav and floating sticky bar (parchment at 80%). Utility cards get a 1px hairline, not a shadow.

### Borders & radii
- **Radii grammar, no in-between:** `0` full-bleed tiles · `8px` compact utility buttons + inline image · `11px` the rare pearl capsule · `18px` utility/catalog cards · `pill (9999px)` the signature — primary blue CTA, configurator chips, search input, sticky-bar CTA. Don't mix grammars.
- **Borders are hairlines, not lines.** Utility cards: 1px `#e0e0e0`. Secondary buttons: a 3px `#f0f0f0` ring that reads as soft shadow, not a hard edge. Live hairlines often `rgba(0,0,0,0.08)`.

### Motion & states
- **Press, not hover, is the documented state.** Every button uses `transform: scale(0.95)` on `:active` — the single system-wide micro-interaction (`transition ~0.18s`).
- **No bounce, no decorative animation.** Transitions are short and eased; fades and the scale-press are the whole motion vocabulary. Hover is intentionally undocumented (links may underline; that's it).
- **Focus ring:** 2px solid Focus Blue `#0071e3` outline on keyboard focus.

### Transparency & blur
- Used **functionally, not decoratively:** frosted sub-nav and sticky bar (parchment 80% + backdrop blur) to float over content; translucent gray chip (`rgba(210,210,215,0.64)`) for circular controls floating over photography. Never a frosted card for its own sake.

### Cards, at a glance
A CORE card is: **white fill, 1px `#e0e0e0` hairline, 18px radius, 24px padding, no shadow** — the product render inside it carries the system product-shadow. Image crops are 1:1 with an 8px inner radius. That's the whole card.

---

## Iconography

CORE's iconography is **quiet, thin-stroke, monoline** — icons are wayfinding and utility, never decoration. They sit at small sizes (14–20px) in the nav, sub-nav, and inline with utility labels, in `ink` on light or `on-dark` on dark.

- **System used: [Lucide](https://lucide.dev) (CDN).** Lucide's ~1.5–2px monoline, rounded-join style is the closest open match to the thin SF-style system glyphs the analysis implies (search, bag/cart, chevrons, plus, x, sliders). It is loaded from CDN in the UI kits — see `ui_kits/*/index.html`. **This is a substitution** — the source analysis references Apple's proprietary SF Symbols, which cannot be redistributed. If CORE has its own icon set, swap the CDN link.
- **SVG, not icon-font, not PNG.** Icons render as inline SVG (Lucide) so they inherit `currentColor` and crisp at any size. No raster icons, no icon webfont.
- **No emoji. No unicode glyph icons.** The brand never substitutes emoji or unicode dingbats for icons. A missing icon is omitted, not faked.
- **Circular control chip over photography.** In-image controls (carousel, close, gallery thumbnails) use the 44×44 translucent gray circle (`button-icon-circular`) with a thin Lucide glyph centered.
- **The logo is a wordmark.** "CORE" set in SF Pro Display 600 with the brand's negative tracking, optionally followed by a thin EV mark. Logo lockups live in `assets/` — see below. (No mark was provided; the wordmark lockups here are constructed and should be replaced with the official logo when available.)

---

## Fonts

- **SF Pro Display / SF Pro Text** are proprietary to Apple and are **not redistributed** here. On Apple platforms the `-apple-system` / `system-ui` stack in `colors_and_type.css` resolves to the real SF Pro automatically.
- **Cross-platform fallback: [Inter](https://fonts.google.com/specimen/Inter)** (loaded from Google Fonts in each HTML file). Inter is the closest open-source match. When substituting Inter: nudge `letter-spacing` down ~`-0.01em` on display sizes, enable `font-feature-settings: "ss03"` for the SF-like rounded "a", and tighten body line-height ~0.03 (1.47 → 1.44) for Inter's taller x-height.
- ⚠️ **Substitution flag — action needed:** If CORE has licensed display/UI fonts, drop the web font files into `fonts/` and update the `--font-display` / `--font-text` stacks. See `fonts/README.md`.

---

## Index — what's in this folder

| Path | What it is |
|---|---|
| `README.md` | This file — context, content + visual foundations, iconography, index |
| `colors_and_type.css` | All design tokens (base + semantic), type utility classes, `.press` micro-interaction |
| `SKILL.md` | Agent-Skill manifest so this system can be used in Claude Code |
| `fonts/` | Font substitution notes (SF Pro → system / Inter) |
| `assets/` | Logos/wordmark lockups + any brand imagery |
| `preview/` | Small HTML cards rendered in the Design System tab (colors, type, spacing, components) |
| `ui_kits/website/` | **Marketing website** UI kit — museum-gallery tiles, nav, footer, JSX components, `index.html` |
| `ui_kits/store/` | **Catalog / store** UI kit — utility-card grid, product/configurator page, JSX components, `index.html` |

**Where to start:** read this README, then open `colors_and_type.css` for tokens, then the two UI kit `index.html` files to see the language assembled. Build new artifacts by composing the JSX components in the UI kits and pulling tokens from the CSS.
