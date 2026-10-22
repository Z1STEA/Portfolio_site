# Wei Han Portfolio — React + ReactDOM only

This is a no-build React website. It uses **React and ReactDOM only** from CDN scripts:
- No npm
- No Vite
- No Babel
- No React Router
- No component libraries

## Open it
Open `index.html` in a browser while connected to the internet (React and ReactDOM are loaded from the CDN). For GitHub Pages, upload the files and folders while keeping the structure the same.

## Your logo
The header looks for `assets/logo-w.png`. Keep your logo at that path. If the logo is missing, a simple WH fallback will appear.

## Edit projects
Open `script.js` and find `const PROJECTS = [...]`. Each project has:
- `title`: card and popup title
- `type`: category shown above the title
- `short`: short card description
- `description`: full text shown in the popup
- `media`: photos and videos shown in the popup
- `previewText`: placeholder shown on the card if there is no media

## Add a photo
1. Put the image in `assets/projects/`, for example `my-photo.jpg`.
2. Add this inside the correct project's `media` array:

   ```js
   { type: "image", src: "assets/projects/my-photo.jpg", alt: "Screenshot of my project" }
   ```

## Add a video
1. Put the MP4 file in `assets/projects/`, for example `demo.mp4`.
2. Add this inside the correct project's `media` array:

   ```js
   { type: "video", src: "assets/projects/demo.mp4", alt: "Project demo video" }
   ```

Videos play with controls in the popup. Add as many photo/video entries as you want, separated by commas.

## Important
The project descriptions in this starter are editable example text. Update them to accurately describe your real contribution and tools. Change `your.email@example.com` in `script.js` to your contact email.


## If the page looks blank
This updated version includes a static fallback so the portfolio content remains visible if React cannot load. Interactive project popups require an internet connection because React and ReactDOM are loaded from a CDN. If you open `index.html` without internet, the fallback layout should still be visible.


## Latest design update
- Acid-lime green and black Marathon-inspired palette.
- Bright green/black header to make the logo easier to see.
- Horizontal project carousel with arrow buttons and swipe/scroll support.
- Animated hero title, hover feedback, visible keyboard focus, and reduced-motion support.

If the logo still does not show, check that `assets/logo-w.png` exists. The header also shows a WH text fallback if the image cannot load.
