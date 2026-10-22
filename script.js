/* =========================================================
   WEI HAN PORTFOLIO
   This uses React + ReactDOM only.
   To edit projects, change the PROJECTS list below.
   To add media, place files in assets/projects/ and add their
   path to the media array for that project.
   ========================================================= */

// If the React CDN is blocked, keep the static fallback in index.html visible.
if (!window.React || !window.ReactDOM) {
  console.warn("React/ReactDOM did not load. Showing the static portfolio preview.");
} else {
const h = React.createElement;

/* EDIT PROJECTS HERE
   media examples:
   { type: "image", src: "assets/projects/my-photo.jpg", alt: "Screenshot" }
   { type: "video", src: "assets/projects/my-demo.mp4", alt: "Demo video" }
*/
const PROJECTS = [
  {
    id: "greenplan",
    number: "01",
    type: "Mobile app / UI UX",
    title: "GreenPlan",
    short: "A sustainability-focused concept designed to make greener everyday choices feel simple and achievable.",
    description: `GreenPlan is a sustainability-focused mobile app concept that encourages people to build greener habits through clear information and approachable actions.

The design focuses on making the experience easy to understand, with a straightforward layout and a visual style that supports the product's environmental purpose.

My contribution: UI design, user experience planning, and visual design.

Tools: Edit this line to list the tools you used.`,
    media: [
      // Replace/add your image paths here, for example:
      // { type: "image", src: "assets/projects/greenplan-screen-1.png", alt: "GreenPlan screen" }
    ],
    previewText: "GREEN / PLAN"
  },
  {
    id: "rp-helper",
    number: "02",
    type: "Web app / Development",
    title: "RP Helper",
    short: "A student-focused helper concept built to make useful information and common tasks easier to access.",
    description: `RP Helper is a student-focused project intended to make everyday information and useful resources easier to find.

This project brings together a clear interface and practical functionality, with an emphasis on keeping the experience approachable for students.

My contribution: Edit this section to describe exactly what you designed and built.

Tools: Edit this line to list the tools you used.`,
    media: [
      // Add photos or demo videos here:
      // { type: "image", src: "assets/projects/rp-helper-screen.png", alt: "RP Helper screen" },
      // { type: "video", src: "assets/projects/rp-helper-demo.mp4", alt: "RP Helper demo" }
    ],
    previewText: "RP / HELPER"
  },
  {
    id: "more-work",
    number: "03",
    type: "Add your category",
    title: "Your next project",
    short: "Use this card as a template. Replace the text and add your own photos or video.",
    description: `Replace this description with the full story of your project.

Suggested details:
• What problem were you solving?
• Who was the project for?
• What did you personally design or build?
• What tools did you use?
• What did you learn or achieve?`,
    media: [],
    previewText: "NEW / WORK"
  }
];

function Logo() {
  // If your logo file is named differently, update this path.
  const logoPath = "assets/logo-w.png";
  return h("a", { className: "brand", href: "#top", "aria-label": "Wei Han home" },
    h("img", {
      src: logoPath,
      alt: "Wei Han logo",
      onError: (event) => {
        event.currentTarget.style.display = "none";
        const fallback = event.currentTarget.nextSibling;
        if (fallback) fallback.style.display = "grid";
      }
    }),
    h("span", { className: "brand-fallback", style: { display: "none" } }, "WH"),
    h("span", null, "WEI HAN")
  );
}

function ProjectCard({ project, onOpen }) {
  const firstMedia = project.media && project.media[0];
  let preview;
  if (firstMedia && firstMedia.type === "video") {
    preview = h("video", { src: firstMedia.src, muted: true, playsInline: true, preload: "metadata" });
  } else if (firstMedia && firstMedia.type === "image") {
    preview = h("img", { src: firstMedia.src, alt: firstMedia.alt || project.title });
  } else {
    preview = h("div", { className: "preview-placeholder" }, project.previewText || project.title);
  }

  return h("button", {
      type: "button",
      className: "project-card",
      onClick: () => onOpen(project),
      "aria-label": `Open full details for ${project.title}`
    },
    h("div", { className: "project-preview" }, preview),
    h("div", { className: "project-content" },
      h("div", { className: "project-meta" },
        h("span", null, `${project.number} / ${project.type}`),
        h("span", null, "View ↗")
      ),
      h("h3", { className: "project-title" }, project.title),
      h("p", { className: "project-short" }, project.short),
      h("div", { className: "project-open" }, "VIEW FULL PROJECT DETAILS", h("span", null, "↗"))
    )
  );
}

function ProjectModal({ project, onClose }) {
  React.useEffect(() => {
    if (!project) return;
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [project, onClose]);

  if (!project) return null;

  const mediaItems = (project.media || []).map((item, index) => {
    if (item.type === "video") {
      return h("video", { key: `${item.src}-${index}`, controls: true, playsInline: true, preload: "metadata" },
        h("source", { src: item.src, type: item.src.toLowerCase().endsWith(".webm") ? "video/webm" : "video/mp4" }),
        "Your browser does not support this video."
      );
    }
    return h("img", { key: `${item.src}-${index}`, src: item.src, alt: item.alt || `${project.title} image ${index + 1}` });
  });

  return h("div", {
      className: "modal-backdrop",
      onMouseDown: (event) => { if (event.target === event.currentTarget) onClose(); }
    },
    h("section", { className: "modal", role: "dialog", "aria-modal": "true", "aria-labelledby": "modal-title" },
      h("div", { className: "modal-top" },
        h("div", null,
          h("div", { className: "kicker" }, `${project.number} / ${project.type}`),
          h("h3", { id: "modal-title" }, project.title)
        ),
        h("button", { className: "modal-close", type: "button", onClick: onClose, "aria-label": "Close project details" }, "×")
      ),
      h("div", { className: "modal-description" }, project.description),
      mediaItems.length > 0
        ? h("div", { className: "modal-gallery" }, mediaItems)
        : h("div", { className: "modal-description" },
            h("span", { className: "kicker" }, "PROJECT MEDIA"),
            h("p", null, "Add your photos or videos in the PROJECTS list near the top of script.js. The media will appear here automatically.")
          )
    )
  );
}

function App() {
  const [activeProject, setActiveProject] = React.useState(null);
  const currentYear = new Date().getFullYear();

  return h(React.Fragment, null,
    h("header", { className: "container topbar", id: "top" },
      h(Logo),
      h("nav", { className: "nav", "aria-label": "Main navigation" },
        h("a", { href: "#work" }, "Work"),
        h("a", { href: "#about" }, "About"),
        h("a", { href: "#contact", className: "contact-link" }, "Contact ↗")
      )
    ),

    h("main", null,
      h("section", { className: "hero" },
        h("div", { className: "container hero-content" },
          h("div", { className: "eyebrow" }, "Independent designer / digital builder"),
          h("h1", null,
            h("span", null, "Designing"),
            h("span", { className: "second-line" }, "with intention.")
          ),
          h("p", { className: "hero-copy" }, "I'm Wei Han. I bring design and technology together to create thoughtful digital experiences that feel clear, useful, and considered."),
          h("div", { className: "actions" },
            h("a", { className: "button button-primary", href: "#work" }, "Explore my work", h("span", null, "↘")),
            h("a", { className: "button button-secondary", href: "#about" }, "A little about me", h("span", null, "↗"))
          )
        )
      ),

      h("section", { className: "section container", id: "work" },
        h("div", { className: "section-heading" },
          h("div", null, h("div", { className: "kicker" }, "Selected work / 2023—2026"), h("h2", null, "Projects with purpose.")),
          h("p", { className: "section-note" }, "Select any project card to read the full description and view its photos or videos.")
        ),
        h("div", { className: "project-grid" },
          PROJECTS.map((project) => h(ProjectCard, { key: project.id, project, onOpen: setActiveProject }))
        )
      ),

      h("section", { className: "section about", id: "about" },
        h("div", { className: "container about-grid" },
          h("div", null, h("div", { className: "kicker" }, "A little about me"), h("h2", null, "Design meets doing.")),
          h("div", null,
            h("p", { className: "about-copy" },
              h("strong", null, "I enjoy turning ideas into useful digital experiences."),
              " I work across visual design, interface thinking, and hands-on building. I value clear communication, thoughtful details, and work that solves a real problem."
            ),
            h("div", { className: "skill-list" },
              ["UI / UX", "Visual design", "Web development", "Prototyping", "Creative problem-solving"].map((skill) => h("span", { className: "skill", key: skill }, skill))
            )
          )
        )
      ),

      h("section", { className: "section container", id: "contact" },
        h("div", { className: "contact-panel" },
          h("div", null,
            h("div", { className: "kicker" }, "Have a project in mind?"),
            h("h2", null, "Let's make it real."),
            h("p", null, "Replace the email address below with your preferred contact email.")
          ),
          h("a", { className: "button button-primary", href: "mailto:your.email@example.com" }, "Get in touch", h("span", null, "↗"))
        )
      )
    ),

    h("footer", null,
      h("div", { className: "container footer-inner" },
        h("span", null, `© ${currentYear} Wei Han`),
        h("span", null, "Designed with intention / Built with React + ReactDOM")
      )
    ),

    h(ProjectModal, { project: activeProject, onClose: () => setActiveProject(null) })
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(h(App));
\n} // End React/ReactDOM availability check.\n