const projects = {
  greenplan: {
    id: '01', name: 'GreenPlan', type: 'MOBILE APP / UX CASE STUDY',
    tagline: 'Make greener choices feel effortless.',
    desc: 'A sustainability-focused experience that turns everyday eco-actions into approachable habits. Explore the journey from problem framing to interface decisions.',
    outcome: 'Designed around clarity, small wins, and a low-friction daily loop.',
    tags: ['UX strategy', 'Mobile UI', 'Prototyping'],
    screens: ['Discover', 'Take action', 'Track impact'], color: 'mint', glyph: '✳'
  },
  rphelper: {
    id: '02', name: 'RP-Helper', type: 'PRODUCT CONCEPT / INTERACTION DESIGN',
    tagline: 'Less friction. More flow.',
    desc: 'A utility concept built to make common tasks easier to understand and quicker to complete, with a focus on hierarchy, feedback, and predictable interactions.',
    outcome: 'A clear interface model with task-focused flows and responsive feedback.',
    tags: ['Interaction design', 'Design system', 'Usability'],
    screens: ['Overview', 'Task flow', 'Confirmation'], color: 'violet', glyph: '◈'
  },
  lab: {
    id: '03', name: 'Interface Lab', type: 'CREATIVE CODING / EXPERIMENT',
    tagline: 'Small interactions, big personality.',
    desc: 'A collection of interface experiments exploring motion, hover states, playful feedback, and the relationship between visual language and usability.',
    outcome: 'A reusable playground for testing ideas before they become product patterns.',
    tags: ['Micro-interactions', 'Motion', 'CSS'],
    screens: ['Motion', 'Feedback', 'Play'], color: 'orange', glyph: '⌁'
  }
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const now = new Date();
$('#year').textContent = now.getFullYear();
$('#footerYear').textContent = `© ${now.getFullYear()}`;
function updateClock() {
  $('#clock').textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
}
updateClock();
setInterval(updateClock, 30000);

const menuToggle = $('#menuToggle');
const navLinks = $('#navLinks');
menuToggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
  menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  menuToggle.textContent = open ? '×' : '☰';
});
$$('#navLinks a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.textContent = '☰';
}));

const playMode = $('#playMode');
playMode.addEventListener('click', () => {
  const active = document.body.classList.toggle('play-mode');
  playMode.innerHTML = active ? '<span>✧</span> TURN OFF PLAY MODE' : '<span>✧</span> ACTIVATE PLAY MODE';
});

const modalBackdrop = $('#modalBackdrop');
const modal = $('.project-modal');
function openProject(key) {
  const project = projects[key];
  if (!project) return;
  modal.className = `project-modal ${project.color}`;
  $('#modalKicker').textContent = `CASE STUDY / ${project.id} / ${project.type}`;
  $('#modalTitle').textContent = project.name;
  $('#modalTagline').textContent = project.tagline;
  $('#modalGlyph').textContent = project.glyph;
  $('#modalDesc').textContent = project.desc;
  $('#modalOutcome').textContent = project.outcome;
  $('#modalSteps').innerHTML = project.screens.map((screen, i) =>
    `<button class="modal-step" type="button" data-step="${i}">
      <span>0${i + 1}</span>
      <b>${screen}</b>
      <em>↗</em>
    </button>`
  ).join('');

  $$('#modalSteps [data-step]').forEach(button => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.step);

      const details = [
        project.desc,
        `TASK FLOW: ${project.screens.join(' → ')}`,
        `OUTCOME: ${project.outcome}`
      ];

      $('#modalDesc').textContent =
        details[index] || project.desc;

      $$('#modalSteps [data-step]').forEach(item => {
        item.classList.toggle('active', item === button);
      });
    });
  });
  $('#modalTags').innerHTML = project.tags.map(tag => `<span>${tag}</span>`).join('');
  modalBackdrop.hidden = false;
  document.body.style.overflow = 'hidden';
  $('#modalClose').focus();
}
function closeProject() {
  modalBackdrop.hidden = true;
  document.body.style.overflow = '';
}


const galleryPhotos = [
  {
    src: 'assets/projects/greenplan-cover.png',
    title: 'GreenPlan'
  },
  {
    src: 'assets/projects/greenplan-mobile.png',
    title: 'GreenPlan Mobile'
  }
];

const galleryVideos = [
  {
    src: 'assets/projects/rp-helper-demo-1.mp4',
    title: 'RP Helper Demo'
  },
  {
    src: 'assets/projects/rp-helper-demo-2.mp4',
    title: 'RP Helper Demo 2'
  },
  {
    src: 'assets/projects/rp-helper-phone-demo.mp4',
    title: 'RP Helper Phone Demo'
  },
  {
    src: 'assets/projects/rp-helper-synthesia.mp4',
    title: 'RP Helper Walkthrough'
  }
];

const gameDevProjects = [
  {
    title: 'Your Game Jam Game',
    type: 'GAME JAM / GAME DEVELOPMENT',
    description: 'Add a short description of the game, what you built, and what you learned during the game jam.',
    image: 'assets/projects/game-jam-game.png',
    link: 'https://itch.io/',
    linkText: 'PLAY THE GAME ↗'
  },
  {
    title: 'Your Older Game',
    type: 'PERSONAL GAME PROJECT',
    description: 'Describe your older game, its gameplay, and your role in making it.',
    image: 'assets/projects/old-game.png',
    link: 'https://itch.io/',
    linkText: 'VIEW PROJECT ↗'
  }
];

const gameDevGallery = $('#gameDevGallery');

if (gameDevGallery) {
  gameDevGallery.innerHTML = gameDevProjects.map(game => `
    <article class="game-dev-card">
      <img
        class="game-dev-image"
        src="${game.image}"
        alt="${game.title} screenshot"
        loading="lazy"
      >
      <div class="game-dev-content">
        <span class="game-dev-type">${game.type}</span>
        <h3>${game.title}</h3>
        <p>${game.description}</p>
        <a
          class="game-dev-link"
          href="${game.link}"
          target="_blank"
          rel="noopener noreferrer"
        >${game.linkText}</a>
      </div>
    </article>
  `).join('');
}

$('#photoGallery').innerHTML = galleryPhotos.map(item => `
  <figure class="gallery-item">
    <img src="${item.src}" alt="${item.title}" loading="lazy">
    <figcaption>${item.title}</figcaption>
  </figure>
`).join('');

$('#videoGallery').innerHTML = galleryVideos.map(item => `
  <figure class="gallery-item">
    <video controls preload="metadata">
      <source src="${item.src}" type="video/mp4">
    </video>
    <figcaption>${item.title}</figcaption>
  </figure>
`).join('');


$$('[data-project]').forEach(button => {
  button.addEventListener('click', () => {
    openProject(button.dataset.project);
  });
});

$('#modalClose').addEventListener('click', closeProject);

modalBackdrop.addEventListener('click', e => {
  if (e.target === modalBackdrop) {
    closeProject();
  }
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !modalBackdrop.hidden) {
    closeProject();
  }
});

const copyEmail = $('#copyEmail');
copyEmail.addEventListener('click', async () => {
  const email = 'weihan5925c@gmail.com'; // Replace this with your real email.
  try {
    await navigator.clipboard.writeText(email);
    copyEmail.innerHTML = 'EMAIL COPIED ✓';
    setTimeout(() => copyEmail.innerHTML = 'COPY MY EMAIL <span>↗</span>', 1800);
  } catch {
    window.location.href = `mailto:${email}`;
  }
});


function enableScrollAnimations() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  if (!('IntersectionObserver' in window)) {
    $$('.section, .gallery-item, .project-card').forEach(element => {
      element.classList.add('visible');
    });
    return;
  }

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  $$('.section, .gallery-item, .project-card').forEach(element => {
    element.classList.add('scroll-reveal');
    revealObserver.observe(element);
  });
}

enableScrollAnimations();


const ambientBackdrop = document.querySelector('.ambient-backdrop');

if (ambientBackdrop) {
  let ticking = false;

  function updateBackdrop() {
    const scrollableHeight =
      document.documentElement.scrollHeight - window.innerHeight;

    const progress = scrollableHeight > 0
      ? window.scrollY / scrollableHeight
      : 0;

      ambientBackdrop.style.setProperty(
        '--scroll-progress',
        progress.toFixed(3)
      );

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateBackdrop);
      ticking = true;
    }
  }, { passive: true });

  window.addEventListener('mousemove', event => {
    ambientBackdrop.style.setProperty('--mouse-x', `${event.clientX}px`);
    ambientBackdrop.style.setProperty('--mouse-y', `${event.clientY}px`);
  }, { passive: true });

  updateBackdrop();
}
