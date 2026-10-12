# Rayyan Ahmed – Portfolio v2.1 (Three.js · 4 colour themes · minimal motion)

Next.js 14 (App Router) · Tailwind CSS · Three.js · Framer Motion · Lenis smooth scroll.

> Drop-in replacement for your existing project. Your `main` branch (and its Vercel production deploy) stays untouched while you try it on a new branch.

## What is new in v2.1

| Area | What you get |
| --- | --- |
| **3D hero** | A liquid "orb" (Three.js shader) + wireframe shell + particles. It follows your cursor, drifts on scroll, and **recolours itself live** when the theme changes. Loaded lazily, pauses off-screen and in background tabs, shows one still frame for `prefers-reduced-motion`, falls back to a CSS glow if WebGL is missing. |
| **4 colour themes** | Aurora (violet + cyan, default) · Terminal (emerald + lime) · Ember (crimson + amber, your original brand) · Arctic (blue + ice). Palette button in the navbar, choice saved in `localStorage`, no flash on reload, cross-fades with the View Transitions API. |
| **Minimal 2026 motion** | Word-by-word mask reveal on the headline, magnetic buttons, cursor spotlight on cards, count-up stats, scroll progress bar, floating glass nav with a sliding active pill, film-grain texture, giant gradient footer wordmark. Old noisy effects (pulse, bounce, floating badges) are gone. |
| **Accessibility** | Every animation respects `prefers-reduced-motion`; tabs/menu/theme picker are keyboard operable; text on every accent colour passes WCAG AA (`--on-accent`). |

## Run it

```bash
npm install          # installs three, framer-motion, lenis, ...
npm run dev          # http://localhost:3000
npm run build        # production check before pushing
```

## Branch + Vercel preview (safe for your live site)

```bash
cd D:\Work\git\rayyan-portfolio
git checkout main && git pull
git checkout -b redesign-v2
# delete the old pages/ app/ components/ folders, then copy this folder's contents in
npm install && npm run dev

git add -A && git commit -m "Redesign v2.1: Three.js hero, themes, minimal motion"
git push -u origin redesign-v2      # Vercel builds a Preview URL automatically
# happy? -> git checkout main && git merge redesign-v2 && git push
```

## Themes: how they work and how to customise

- Colours are CSS variables in `app/globals.css` (`:root[data-theme='aurora'] { --accent: 167 139 250; ... }`) as `R G B` triplets, so Tailwind classes like `bg-accent/20` and `text-accent` re-skin automatically.
- `lib/themes.js` lists the themes shown in the picker (id, label, swatch).
- **Change the default theme:** set `DEFAULT_THEME` in `lib/themes.js` (and move that theme's block to `:root` in `globals.css`, or just keep `aurora` as `:root`).
- **Add a 5th theme:** (1) copy a `:root[data-theme='...']` block in `globals.css` and change the numbers, (2) add one entry to `themes` in `lib/themes.js`. The 3D scene picks it up with no code change.
- Rule for new themes: `--on-accent` (text on the accent) must stay dark enough for 4.5:1 contrast on `--accent`.

## The 3D scene (`components/HeroScene.jsx`)

- Plain `three` (no react-three-fiber) to keep the bundle small. Code-split with `next/dynamic` and started on `requestIdleCallback`, so it never delays first paint.
- Tweak the look in one place: `uStrength` (blob wobble, `0.2`), `COUNT` (particles), the radius `1.7`, colours via theme variables.
- Mobile gets fewer particles/segments and a lower pixel ratio.

## Add your own assets to /public

| File | What |
| --- | --- |
| `profile.webp` | Square portrait, under 200 KB (shown in About; initials avatar until it exists). |
| `Rayyan-Ahmed-CV.pdf` | Your CV (or set `resumeUrl: ''` in `lib/data.js`). |
| `portfolio/*.png` | Keep your existing project screenshots (convert to WebP when you can). |

## Content: everything lives in `lib/data.js`

Search for `TODO`: email, project roles/stacks/descriptions, experience bullets, stats. Add **real** testimonials to `testimonials` (the section hides itself while empty). Optional: `timezone: 'Asia/Karachi'` shows your live local time in the footer.

## Environment variables

Copy `.env.example` to `.env.local` and add the same keys in Vercel → Settings → Environment Variables. `NEXT_PUBLIC_FORMSPREE_ID` makes the contact form email you (without it the form opens the visitor's mail app).

## Motion table

| Effect | Trigger | Tech | Reduced-motion fallback |
| --- | --- | --- | --- |
| Headline word reveal | page load | Framer Motion (`SplitReveal`) | shown instantly |
| Section reveals | scroll into view | Framer Motion (`Reveal`) | shown instantly |
| Stat count-up | scroll into view | Framer Motion `animate` | final number |
| Smooth scrolling | scroll | Lenis | native scrolling |
| Magnetic buttons, cursor glow, card spotlight | fine pointer only | pointer events + CSS vars | disabled |
| 3D orb | idle after load, pointer, scroll | Three.js | one still frame |
| Theme switch | click | View Transitions API | instant |

## Not yet verified

The sandbox this was written in could not reach the npm registry, so `npm run build` has **not** been run on this exact code. What was checked: all files bundle cleanly with esbuild, all imports/icons exist, no unused imports, and the Three.js shaders were compiled and rendered in headless Chromium (WebGL2) for all four themes. If `npm run build` shows anything, send me the output and I will fix it.
