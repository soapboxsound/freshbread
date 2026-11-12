# Fresh Bread — Coming Soon Page: Cursor Brief

## Project
One-page "coming soon" site for Fresh Bread, a new music supervision and development company. Starting point is attached: `index.html` (single self-contained file, no build step, no dependencies besides a Google Fonts link).

## What's already built
- Centered wordmark "fresh bread" set in Archivo Black (lowercase, tight leading), with "Coming Soon" and the tagline "Music Supervision & Development" beneath it.
- Palette: ink `#1c1a19` on paper `#f7f4ef`, with brand blue `#0B3B83` as the accent (used on the divider bar, the "Coming Soon" label, and a thin bar across the top of the viewport).
- Body font: Inter.
- Fully responsive via `clamp()` sizing, no JS, no backend, no form.

## What Cursor needs to do
Swap the placeholder text wordmark for the real brand assets — three logo files, attached in this brief:
1. **fb monogram** — black lowercase "fb" lockup, for use as a favicon / small-scale mark.
2. **fresh bread outline** — two-line stacked wordmark, outline/stroke version.
3. **fresh bread solid** — same stacked wordmark, solid black fill.

Tasks:
- Replace the CSS-text hero with the solid wordmark logo (asset #3) as an `<img>` or inline SVG, sized responsively (it should scale the same way the current text does via `clamp()`, not fixed pixels).
- Generate a favicon from the fb monogram (asset #1).
- Keep the outline version (asset #2) in the project as an alternate/hover state or for later use elsewhere on the site — not required on this page unless it improves the design.
- Preserve the existing layout, spacing, and accent-blue treatment (divider + "Coming Soon" label + top bar) — the brief is to drop in real assets, not redesign the layout.
- Keep it a single static page, no backend, no email capture (explicitly not wanted at this stage).

## Brand notes
- Tone: bold, confident, minimal — thick geometric letterforms, black-on-cream, one accent color.
- No contact info or signup form on this page by design.
