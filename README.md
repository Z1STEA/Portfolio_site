# Wei Han — Editable HTML Portfolio

This portfolio uses plain HTML, CSS, and JavaScript. It does not need React, npm, or a build step.

## Preview it
Open `index.html` in your browser, or use the VS Code Live Server extension.

## Edit text
Open `index.html`. Sections are marked with comments:
- `HERO / INTRO`: headline and intro
- `WORK / PROJECT CARDS`: project names, categories, descriptions, and images
- `ABOUT`: biography
- `CONTACT`: email link

## Add or change project images
1. Put your image files in `assets/projects/`.
2. In the matching work card in `index.html`, change or add image tags:

   ```html
   <div class="work-gallery">
     <img src="assets/projects/my-project-cover.png" alt="Project cover">
     <img src="assets/projects/my-project-screen-2.png" alt="Second project screen">
     <img src="assets/projects/my-project-detail.png" alt="Project detail">
   </div>
   ```

3. You can use one image or multiple images in the same card. The gallery layout adapts automatically. Click any work card or its preview image on the website to open a project-details popup with the images enlarged.
4. Copy a whole `<article class="work-card"> ... </article>` block to create another project card. Update its number, type, title, description, image paths, and link.

## Customize design
Edit `style.css`. The main colors are at the top in `:root`:
- `--background`
- `--section-background`
- `--text`
- `--muted-text`
- `--accent`
- `--border`

## Contact email
In `index.html`, replace `your.email@example.com` in the `mailto:` link with your real email address.
