# Wei Han® — HTML/CSS/JavaScript Portfolio

This is the plain HTML version of the portfolio. It does not require React, Vite, npm, or a build step.

## Files

- `index.html` — page structure and content
- `style.css` — layout, colors, responsive styles, and animations
- `script.js` — menu, play mode, project case-study modals, clock, and email copy interaction
- `assets/` — optional visual assets

## Preview locally

Simply double-click `index.html` to open it in your browser. For a local server, VS Code's Live Server extension also works.

## Customize before publishing

1. In `script.js`, replace `your.email@example.com` with your actual email address.
2. Replace generic social profile links in `index.html` with your own links.
3. Update the project descriptions in `script.js` with your real case-study content, artifacts, and verified outcomes.
4. The project cards currently use CSS illustrations. You can swap these for your own screenshots/images.

## Publish with GitHub Pages

1. Create a GitHub repository, for example `wei-han-portfolio`.
2. Upload `index.html`, `style.css`, `script.js`, and the `assets` folder to the repository root.
3. On GitHub, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose the `main` branch and `/ (root)`, then save.
6. Wait for the Pages URL to appear.

Because this is plain HTML/CSS/JavaScript, there is no build command and no repository-specific Vite base path to configure.

## Notes

- Google Fonts are loaded online; system fallback fonts are included.
- No backend or API keys are needed.
- The project case studies are illustrative shells. Replace them with your actual work and evidence.
- Reduced-motion preferences are respected.
