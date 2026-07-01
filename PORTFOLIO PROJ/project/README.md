# Sujeet Paswan — Portfolio

A dark, hacker-terminal themed personal portfolio built with React, Vite, Tailwind CSS, and lucide-react icons.

## Run locally

```bash
npm install
npm run dev
```

Open the printed local URL (usually `http://localhost:5173`).

## Build for production

```bash
npm run build
```

This outputs a static site into the `dist/` folder.

## Deploy

### Vercel (recommended, zero-config)
1. Push this folder to a GitHub repo.
2. Go to vercel.com → **Add New Project** → import the repo.
3. Framework preset: **Vite**. Click **Deploy**.

Or from the CLI:
```bash
npm i -g vercel
vercel
```

### Netlify
1. Push to GitHub, then **Add new site → Import an existing project** on netlify.com.
2. Build command: `npm run build`
3. Publish directory: `dist`

Or from the CLI:
```bash
npm run build
npx netlify-cli deploy --prod --dir=dist
```

### GitHub Pages
1. `npm run build`
2. Push the contents of `dist/` to a `gh-pages` branch (or use the `gh-pages` npm package).

## Things to personalize before going live

- `src/App.jsx`:
  - Social links (LinkedIn / GitHub / Email / Instagram) — currently `href="#"`
  - "Download Resume" button — link it to your actual resume PDF
  - Contact section email, phone, and location placeholders
  - Certificate names/issuers — replace with your real certificates
  - Project GitHub/Live Demo links — currently `href="#"`
  - Contact form currently only simulates sending — wire it up to a service like Formspree, EmailJS, or your own backend to actually receive messages
- `src/assets/hero.jpg` — swap in a higher-resolution version of your photo if you have one
- `index.html` — update the page `<title>` and meta description if needed

## Stack

- React 18 + Vite 5
- Tailwind CSS 3
- lucide-react icons
- No external animation library — all motion (scroll reveals, typing effect, matrix rain, parallax, glitch text) is hand-built with CSS keyframes + small React hooks, so there are no extra runtime dependencies.
