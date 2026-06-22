# Portfolio — AGENTS.md

## Commands

| Action | Command |
|--------|---------|
| Dev server | `npm run dev` → `http://localhost:5173/portfolio/` |
| Build | `npm run build` → output in `dist/` |
| Deploy | Auto-deploys to GitHub Pages via `.github/workflows/deploy.yml` on push to `main` |

No test, lint, or typecheck scripts.

## Rules

- NEVER commit and push until asked — always confirm first.
- Always update this file with recent changes before committing/pushing.
- If in build mode and given a task, always confirm before executing.
- After any task, run `say "Task completed"` as a voice notification.

## Key facts

- **Base path `/portfolio/`** in `vite.config.js` — all URLs/assets relative to this path
- **No `package-lock.json`** — only `pnpm-lock.yaml` exists. CI uses `npm install` (not `ci`). Local `npm install` may fail on Node ≥26; use pnpm or Node 20.
- **Data is inline** — portfolio content (projects, skills, experience, socials) lives in each component file under `src/components/`. No CMS, no API, no database.
- **Accent color `#00f2ff`** — defined in `tailwind.config.js` as `accent`. Also used inline as `rgba(0,242,255,…)`.
- **Button style** — all CTA buttons use `clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'`
- **Custom UI primitives** in `src/components/reactbits/`: `TiltCard`, `Magnet`, `TrueFocus`, `SplitText`, `DecryptedText`, `CrosshairCursor`, `PixelCard`, `GradualBlur`, `MagnetLines`, `ElectricBorder`
- **Fonts** (Google Fonts): Orbitron (display), JetBrains Mono (mono/UI), Syne (body)
- **Resume PDF** at `public/Arman_Das_Resume.pdf`

## Saved Background Effects (Jun 22)

These are scroll‑driven R3F background effects implemented + reviewed. Keep them around for reference/future use.

| # | Effect | Status | File |
|---|--------|--------|------|
| H | Morphing Particle Field (2500 particles, 4‑shape morph, scroll‑driven) | Built, "looks good" | `git` |
| I | Wireframe Constellation (1000 particles + 3000 edges, scatter→sphere→torus→helix) | Built, iterating | `git` |
| 1 | **Camera Flythrough** — CatmullRomCurve3 path, camera rig follows scroll, 4000 particles + 4000 edges in a wireframe tube tunnel, fog | **Final** | `src/components/Background.jsx` |

## Recent changes (Jun 22)

- **Hero.jsx** — ASCII art name (6‑line ARMAN + 6‑line DAS in `█████╗` block letters) replaces SplitText heading. Font size `clamp(0.45rem, 1.4vw, 1.3rem)` (JetBrains Mono). ASCII art moved into left column (not full‑width) so right column stays at same y‑position. Photo frame repositioned to top‑right (`top: calc(28% - 6.5rem)`, `right: -5rem`). Laptop camera lowered (`[0, 0.3, 5.5]`). Code snippet repositioned to bottom‑right (`right-8 bottom-2`) to avoid overlapping laptop. Layout uses `self-start` on both columns for consistent top alignment.
- **About.jsx** — "NEURAL.NETWORK.ACTIVE" label given `z-10` to render above GlobeModel canvas.
- **Projects.jsx** — OpenCV project removed. DB Reader marked `featured: true`.

## Recent changes (Jun 21)

- **Background.jsx** — rewritten with `ShaderMaterial` (GPU‑computed, per‑pixel color). Wave amplitude scales 0→1.5 with `scrollProgress` (flat at top, dramatic at bottom). Color ramps dark‑navy→mid‑blue→cyan→white per height. No more `meshStandardMaterial`/`vertexColors` — eliminates triangle faceting entirely. 80×80 divisions, mouse pull, continuous time‑based wave motion.
- **Hero.jsx** — Canvas now uses `alpha: true` + `gl.setClearAlpha(0)` so the laptop‑model background is transparent, not opaque black.
- **About.jsx** — same Canvas transparency fix for the globe‑model section.
- **GlobeModel.jsx** — brighter sphere colour (`#061a2e`), higher wireframe opacity (0.35), emissive intensity 0.15, thicker rings, stronger directional lights (intensity 3/1.5).
- **Nav.jsx** — removed desktop "↓ Resume" button; mobile "↓ Download Resume" preserved.
- **Hero.jsx** — removed Contact button from CTA row.
- **Section components** (About, Skills, Projects, Experience, Contact) — enhanced entrance animations: headers slide from `x:-80` + `scale(0.9)`, cards alternate direction with `rotateY`, section‑number drift via `useScroll`/`useTransform`.
- **App.jsx** — passes `scrollYProgress` to `Background`, `<main>` gains `perspective: 1200px`.
