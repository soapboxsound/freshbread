# Fresh Bread

Notes from the repo, README, and git history (2026-07-17 through 2026-07-18 on `main`, plus the uncommitted working tree). No env files were opened.

## What it is

Site for Fresh Bread, a New York music supervision and development company. The live copy calls it “Music Supervision & Development” and “The right cue for the moment. Built in New York.” Palette in CSS: ink `#1c1a19`, paper `#f7f4ef`, accent `#0b3b83`. Tone in `fresh-bread-cursor-brief.md`: bold, minimal, thick geometric type, one accent color.

The brief describes a single static coming-soon page (wordmark, “Coming Soon,” tagline, no form, no email capture). The working tree is a multi-page marketing site that keeps that look and adds Work, About, and Contact.

## How it’s built

**Committed `main` (`0cd7c5f`, 2026-07-18, tracks `origin/main` at `https://github.com/soapboxsound/freshbread.git`).** One static `index.html` plus `assets/favicon.png`, `assets/fresh-bread-solid.png`, and `assets/fresh-bread-wordmark.png`. Thirteen commits that day and the day before: placeholder page, logo swaps, a vinyl-groove canvas centered on the wordmark, a short-lived spin, then a hidden Web Audio 808 (default pattern spells FRESH), then a PNG favicon.

**Working tree (untracked / modified, not committed).** Next.js 15 App Router (`next` ^15.5.2), React 19, TypeScript (`strict`), Tailwind CSS 4 via `@tailwindcss/postcss`, ESLint with `next/core-web-vitals` and `next/typescript`. Scripts: `dev`, `build`, `start`, `lint`. Fonts from `next/font`: DM Sans (body), Syne (display), JetBrains Mono (sequencer). `next.config.ts` only sets image formats to AVIF and WebP. Alias `@/*` → `src/*`.

Routes in the README and `src/app`: `/` (wordmark, vinyl canvas, 808, links to work and contact), `/work`, `/about`, `/contact`. Header and footer wrap every page; a fixed accent bar sits on top. Legacy page is `public/coming-soon.html` (README: `/coming-soon.html`), still the old static page with grooves and the 808. Home grooves are a canvas centered on `#logo-mark`. The sequencer opens from a small accent dot (bottom left) or the Konami sequence ending in `b`, `a`; Escape or the backdrop closes it. Playback adds `seq-kick` / `seq-live` on `body` so the logo and top bar pulse.

## Current status

`origin/main` is the static coming-soon site. Locally, `index.html` and the repo-root `assets/` are deleted, and the Next app, `public/`, `README.md`, configs, and the brief are untracked. Nothing of the multi-page app is on the remote.

`npm run dev` is the documented way to run it (`http://localhost:3000`). There is no test suite, no `src/app` API route, and no deploy config in the tree. `.gitignore` ignores `.vercel`, `.next`, and `.env*.local`. (verify) whether anything is deployed, and which host.

## Unfinished

- The Next rewrite is local only. `main` still serves the static page once those deletes are committed.
- About copy says it is placeholder and “the real story lands before launch.”
- Work lists four invented credits in `src/lib/projects.ts` (Signal Loss, Night Shift, Room Tone, First Rise). The page says real credits land before October. Each “View” link is an in-page hash (`/work#slug`); there is no project route.
- Contact is a client form: `preventDefault`, then a “Got it” state. Copy says it wires to email before October. The address shown is `hello@freshbread.music`. (verify) that inbox, and whether “October” meant October 2026 — that month is already past as of 12 Nov 2026.
- The brief asked for the solid wordmark as the hero, the monogram as the favicon, and the outline kept as an alternate. Home and the legacy page use `fresh-bread-wordmark.png`; the favicon is `public/assets/favicon.png`. Also in `public/assets/` and unreferenced by the app or the legacy page: `fresh-bread-solid.png`, `fresh-bread-wordmark-drk.png`, `LOGO.png`, `SQ.png`. (verify) which files are the current brand set.
- Reduced motion turns off the CSS entrance animations. The groove canvas and sequencer audio are unaffected.
- Nav is a single row of four links, with no separate small-screen menu. (verify) that it holds on a phone.
