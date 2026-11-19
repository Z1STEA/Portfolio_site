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
  $('#clock').textContent = new Date().toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
}

updateClock();
setInterval(updateClock, 30000);

// Mobile navigation

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

// Play mode

const playMode = $('#playMode');

playMode.addEventListener('click', () => {
  const active = document.body.classList.toggle('play-mode');

  playMode.innerHTML = active
    ? '<span>✧</span> TURN OFF PLAY MODE'
    : '<span>✧</span> ACTIVATE PLAY MODE';
});

// Project modal

const backdrop = $('#modalBackdrop');
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
    `<div><span>0${i + 1}</span><b>${screen}</b><em>↗</em></div>`
  ).join('');

  $('#modalTags').innerHTML = project.tags.map(tag =>
    `<span>${tag}</span>`
  ).join('');

  backdrop.hidden = false;
  document.body.style.overflow = 'hidden';
  $('#modalClose').focus();
}

function closeProject() {
  backdrop.hidden = true;
  document.body.style.overflow = '';
}

$$('[data-project]').forEach(button => {
  button.addEventListener('click', () => openProject(button.dataset.project));
});

$('#modalClose').addEventListener('click', closeProject);

backdrop.addEventListener('click', e => {
  if (e.target === backdrop) closeProject();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !backdrop.hidden) {
    closeProject();
  }
});

// Copy email

const copyEmail = $('#copyEmail');

copyEmail.addEventListener('click', async () => {
  const email = 'weihan5925@gmail.com'; // Replace this with your real email.

  try {
    await navigator.clipboard.writeText(email);

    copyEmail.innerHTML = 'EMAIL COPIED ✓';

    setTimeout(() => {
      copyEmail.innerHTML = 'COPY MY EMAIL <span>↗</span>';
    }, 1800);

  } catch {
    window.location.href = `mailto:${email}`;
  }
});

// =====================================
// DESIGN PROCESS PROGRESSION
// =====================================

const processItems = $$('.process-item');

const processProgressFill = $('#processProgressFill');
const processProgressText = $('#processProgressText');

if (processItems.length > 0) {

  function updateProcess(index) {

    // Highlight the current process step

    processItems.forEach((item, i) => {

      if (i === index) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }

    });

    // Update the progress bar

    if (processProgressFill) {

      const progress = ((index + 1) / processItems.length) * 100;

      processProgressFill.style.width = progress + '%';

    }

    // Update the step number

    if (processProgressText) {

      processProgressText.textContent =
        'STEP 0' + (index + 1) + ' / 0' + processItems.length;

    }

  }

  // Start with the first step

  updateProcess(0);

  // Check which process card is visible

  if ('IntersectionObserver' in window) {

    const processObserver = new IntersectionObserver(entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          const index = processItems.indexOf(entry.target);

          if (index !== -1) {
            updateProcess(index);
          }

        }

      });

    }, {
      threshold: 0.2
    });

    // Watch all four process cards

    processItems.forEach(item => {
      processObserver.observe(item);
    });

  }

}
