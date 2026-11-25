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
  },
  pocketplan: {
    id: '04', name: 'PocketPlan', type: 'WEB APP / PERSONAL FINANCE',
    tagline: 'Make money habits easier to understand.',
    desc: 'A mobile-first personal budget tracker for recording income and expenses, setting a monthly spending limit, and seeing where money goes.',
    outcome: 'A simple finance dashboard with clear totals, transaction categories, and locally saved data.',
    tags: ['Dashboard UI', 'JavaScript', 'Responsive design'],
    screens: ['Overview', 'Add transaction', 'Monthly budget'], color: 'mint', glyph: '◉'
  },
  tabsplit: {
    id: '05', name: 'TabSplit', type: 'WEB APP / GROUP BILL SPLITTING',
    tagline: 'Make splitting the bill less awkward.',
    desc: 'A group bill-splitting tool that lets people add items, assign them to diners, and calculate each person’s share with service charge and tax.',
    outcome: 'A clearer way to split shared and individual items, with a bill summary that can be copied into a group chat.',
    tags: ['Product design', 'Vanilla JavaScript', 'SGD'],
    screens: ['Add people and items', 'Assign items', 'Split the total'], color: 'violet', glyph: '÷'
  }
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const now = new Date();

$('#year').textContent = now.getFullYear();
$('#footerYear').textContent = `© ${now.getFullYear()}`;


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
/* Expand and collapse the past game-development projects */
const gameDevGrid = document.querySelector('.game-dev-grid');
const gameDevToggle = document.querySelector('#gameDevToggle');

if (gameDevGrid && gameDevToggle) {
  gameDevToggle.addEventListener('click', () => {
    const isExpanded = gameDevGrid.classList.toggle('is-expanded');

    gameDevToggle.setAttribute('aria-expanded', String(isExpanded));
    gameDevToggle.innerHTML = isExpanded
      ? 'SHOW LESS <span aria-hidden="true">−</span>'
      : 'VIEW MORE GAME PROJECTS <span aria-hidden="true">＋</span>';
  });
}
