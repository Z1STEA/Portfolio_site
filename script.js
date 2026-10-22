/* Small JavaScript interactions for this site.
   Plain HTML/CSS/JS only — no React, npm, or build step is needed. */

// Automatically update the copyright year.
const yearElement = document.getElementById("current-year");
if (yearElement) yearElement.textContent = new Date().getFullYear();

// Project details popup: clicking a work card opens a larger view with all its images.
const projectModal = document.getElementById("project-modal");
const modalTitle = document.getElementById("modal-title");
const modalType = document.getElementById("modal-type");
const modalDescription = document.getElementById("modal-description");
const modalGallery = document.getElementById("modal-gallery");
const modalContactLink = document.querySelector(".modal-contact-link");
let previouslyFocusedElement = null;

function openProject(card) {
  if (!projectModal || !card) return;

  const title = card.querySelector("h3")?.textContent.trim() || "Project";
  const type = card.querySelector(".work-type")?.textContent.trim() || "PROJECT DETAILS";
  const description = card.querySelector(".work-card-content > p")?.textContent.trim() || "";
  const gallery = card.querySelector(".work-gallery");

  modalTitle.textContent = title;
  modalType.textContent = type;
  modalDescription.textContent = description;
  modalGallery.replaceChildren();

  if (gallery) {
    gallery.querySelectorAll("img").forEach((image) => {
      const enlargedImage = document.createElement("img");
      enlargedImage.src = image.getAttribute("src");
      enlargedImage.alt = image.alt || `${title} project image`;
      modalGallery.appendChild(enlargedImage);
    });

    const placeholder = gallery.querySelector(".image-placeholder");
    if (placeholder && modalGallery.children.length === 0) {
      modalGallery.appendChild(placeholder.cloneNode(true));
    }
  }

  if (modalContactLink) modalContactLink.href = "#contact";
  previouslyFocusedElement = document.activeElement;
  projectModal.classList.add("is-open");
  projectModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  projectModal.querySelector(".modal-close")?.focus();
}

function closeProject() {
  if (!projectModal) return;
  projectModal.classList.remove("is-open");
  projectModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  if (previouslyFocusedElement && typeof previouslyFocusedElement.focus === "function") {
    previouslyFocusedElement.focus();
  }
}

// Click a project card or its gallery image to open details.
// Don't intercept links inside the card, so contact links keep working normally.
document.querySelectorAll(".work-card").forEach((card) => {
  card.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      // The card's "ask me" link scrolls to Contact; gallery links open details.
      if (event.target.closest(".project-image")) {
        event.preventDefault();
        openProject(card);
      }
      return;
    }
    openProject(card);
  });

  card.addEventListener("keydown", (event) => {
    if ((event.key === "Enter" || event.key === " ") && event.target === card) {
      event.preventDefault();
      openProject(card);
    }
  });
});

projectModal?.querySelectorAll("[data-close-modal]").forEach((element) => {
  element.addEventListener("click", closeProject);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && projectModal?.classList.contains("is-open")) {
    closeProject();
  }
});
