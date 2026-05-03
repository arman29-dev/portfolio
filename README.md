# Arman Das — Portfolio

**Live:** [arman29-dev.github.io/portfolio](https://arman29-dev.github.io/portfolio)

A "Deep Space" dark-tech personal portfolio built with React (Vite), Framer Motion, and Three.js.

---

## ⚡ Tech Stack

- **React 18** + **Vite 5** — Blazing-fast dev/build
- **Framer Motion** — Scroll-linked animations & transitions
- **React Three Fiber / Drei** — 3D particle field background
- **Tailwind CSS** — Utility-first styling
- **Orbitron + JetBrains Mono + Syne** — Typography system

---

## 🚀 Local Development

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser
# → http://localhost:5173/portfolio/
```

---

## 📦 Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder, fully optimized and hashed.

---

## 🌐 Deploy to GitHub Pages

### One-time setup

1. **Create the GitHub repo** named exactly `portfolio` under your account `arman29-dev`.

2. **Initialize git and push** your code:

```bash
git init
git add .
git commit -m "Initial portfolio commit"
git remote add origin https://github.com/arman29-dev/portfolio.git
git push -u origin main
```

3. **Install the gh-pages package** (already in devDependencies):

```bash
npm install
```

### Deploy

```bash
npm run deploy
```

This runs `vite build` then pushes the `dist/` folder to the `gh-pages` branch automatically.

4. **Enable GitHub Pages** in your repo settings:
   - Go to **Settings → Pages**
   - Set source to **`gh-pages` branch**, `/ (root)`
   - Save

Your site will be live at:
```
https://arman29-dev.github.io/portfolio/
```

> ⚠️ Note: Since the repo is named `portfolio` (not a standard username.github.io), GitHub treats it as a project page, not a user page. The `base` in `vite.config.js` is set to `/portfolio/` to match this.
>
> If you rename the repo to exactly `arman29-dev.github.io`, change `base` in `vite.config.js` to `'/'` for a cleaner URL.

---

## 🗂 Project Structure

```
src/
├── components/
│   ├── Background.jsx   # Three.js particle field + grid
│   ├── Cursor.jsx       # Custom magnetic cursor
│   ├── Nav.jsx          # Sticky glassmorphism navbar
│   ├── Hero.jsx         # Terminal typing effect hero
│   ├── About.jsx        # Profile + stats
│   ├── Skills.jsx       # Animated skill bars grid
│   ├── Projects.jsx     # Interactive project cards
│   ├── Experience.jsx   # Scroll-triggered timeline
│   ├── Contact.jsx      # Glowing form + socials
│   └── Footer.jsx
├── App.jsx              # Root component + scroll progress
├── main.jsx
└── index.css            # Tailwind + custom CSS
```

---

## 🎨 Customization

| What | Where |
|---|---|
| Accent color | `tailwind.config.js` → `accent` + `index.css` CSS vars |
| Projects | `src/components/Projects.jsx` → `projects` array |
| Skills | `src/components/Skills.jsx` → `skillCategories` array |
| Experience | `src/components/Experience.jsx` → `experiences` array |
| Social links | `src/components/Contact.jsx` → `socials` array |
| Typing titles | `src/components/Hero.jsx` → `TITLES` array |

---

## 📄 License

MIT — feel free to fork and adapt.

---

## v2.0 — What's New

### Added
- **Profile Photo** — ASCII-art binary portrait with parallax depth effect, scanlines, and corner bracket accents
- **3D Laptop Model** — Fully procedural Three.js laptop with live code on screen, reactive to mouse movement, floating in hero
- **3D Globe Model** — Orbiting rings + dots globe in the About section
- **Resume Download** — Wired to `public/Arman_Das_Resume.pdf` in nav, hero CTA, and contact section
- **CrosshairCursor** — Tactical crosshair with bracket corners, axis lines, expanding on hover, with label hints
- **SplitText** — Hero name letters animate in 3D (rotateX) on load
- **DecryptedText** — Tagline and skill categories scramble-decrypt on scroll
- **TrueFocus** — Section titles blur-focus reveal on scroll
- **TiltCard** — Project cards tilt in 3D on hover with glare sheen
- **Magnet** — All CTAs and social links magnetically follow cursor

### Design System Change
- **Brutalist × Premium Dark** — Raw grid backgrounds, exposed section numbers (01–05), clipped polygon buttons, brutal left-border accents
- **Typography** — Orbitron (display) + JetBrains Mono (code/UI) + Syne (body)
- **Clipped polygons** on all buttons: `polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))`

### Files to update after download
| File | What to update |
|---|---|
| `public/profile.png` | Replace with your actual photo |
| `public/Arman_Das_Resume.pdf` | Already included — re-export if updated |
| `vite.config.js` | Change `base` if repo name changes |
