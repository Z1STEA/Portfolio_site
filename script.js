/* Small JavaScript for this site.
   The website is plain HTML/CSS/JS — no React, npm, or build step is needed. */

// Automatically update the copyright year in the footer.
const yearElement = document.getElementById("current-year");
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}
