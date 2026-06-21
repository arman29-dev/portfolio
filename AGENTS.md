# Portfolio — AGENTS.md

## Commands

| Action | Command |
|--------|---------|
| Dev server | `npm run dev` → `http://localhost:5173/portfolio/` |
| Build | `npm run build` → output in `dist/` |
| Deploy | Auto-deploys to GitHub Pages via `.github/workflows/deploy.yml` on push to `main` |

No test, lint, or typecheck scripts.

## Key facts

- **Base path `/portfolio/`** in `vite.config.js` — all URLs/assets relative to this path
- **No `package-lock.json`** — only `pnpm-lock.yaml` exists. CI uses `npm install` (not `ci`). Local `npm install` may fail on Node ≥26; use pnpm or Node 20.
- **Data is inline** — portfolio content (projects, skills, experience, socials) lives in each component file under `src/components/`. No CMS, no API, no database.
- **Accent color `#00f2ff`** — defined in `tailwind.config.js` as `accent`. Also used inline as `rgba(0,242,255,…)`.
- **Button style** — all CTA buttons use `clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))'`
- **Custom UI primitives** in `src/components/reactbits/`: `TiltCard`, `Magnet`, `TrueFocus`, `SplitText`, `DecryptedText`, `CrosshairCursor`, `PixelCard`
- **Fonts** (Google Fonts): Orbitron (display), JetBrains Mono (mono/UI), Syne (body)
- **Resume PDF** at `public/Arman_Das_Resume.pdf`
