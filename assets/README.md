# Wei Han® — React UI/UX Portfolio

A cyber-inspired, non-minimalist portfolio built with React + Vite.

## Files
- `src/main.jsx` — React components and editable portfolio content
- `src/styles.css` — layout, colors, responsive design, animations
- `index.html` — document metadata
- `public/assets/` — optional images and logo assets
- `vite.config.js` — Vite and GitHub Pages base path
- `package.json` — scripts and dependencies

## Run on Windows
Open this folder in VS Code, open Terminal, and run:

```powershell
npm install
npm run dev
```

Open the local URL Vite prints, usually `http://localhost:5173`.

## Edit easily
In `src/main.jsx`:
- Edit the `projects` array near the top for names, descriptions, tags, outcomes, and case-study steps.
- Change `CONTACT_EMAIL` to your real email.
- Change `SOCIAL_LINKS` to your profile URLs.
- Update the About component text and skills.

In `src/styles.css`, edit colors, typography, spacing, animation, and responsive layout. Main color variables are near the top: `--lime`, `--purple`, and `--orange`.

## Deploy to GitHub Pages
1. Create a repository, for example `wei-han-portfolio`.
2. In `vite.config.js`, set `base: '/wei-han-portfolio/'` to your repo name. If the repo is `YOUR-USERNAME.github.io`, use `base: '/'`.
3. Push the project to GitHub.
4. Run `npm install` and `npm run deploy`.
5. On GitHub, open **Settings → Pages**, choose **Deploy from a branch**, select `gh-pages` and `/(root)`, then save.

The case study content is starter copy. Replace it with your real research, process artifacts, and verified outcomes before using it professionally.
