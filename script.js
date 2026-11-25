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

const yearLabel = $('#year');
if (yearLabel) yearLabel.textContent = now.getFullYear();

const footerYear = $('#footerYear');
if (footerYear) footerYear.textContent = `© ${now.getFullYear()}`;


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




/* Soft liquid ribbon that drags behind the pointer */
const liquidCanvas = document.querySelector('.liquid-trail');

if (liquidCanvas &&
    window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const ctx = liquidCanvas.getContext('2d');
  let width = window.innerWidth;
  let height = window.innerHeight;
  let pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
  let pointer = { x: width / 2, y: height / 2, active: false };
  let points = [];
  let lastTime = 0;

  function resizeLiquidCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    liquidCanvas.width = Math.round(width * pixelRatio);
    liquidCanvas.height = Math.round(height * pixelRatio);
    liquidCanvas.style.width = width + 'px';
    liquidCanvas.style.height = height + 'px';
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  }

  window.addEventListener('resize', resizeLiquidCanvas);
  resizeLiquidCanvas();

  document.addEventListener('pointermove', (event) => {
    const now = performance.now();
    const previous = points[points.length - 1];
    const dx = previous ? event.clientX - previous.x : 0;
    const dy = previous ? event.clientY - previous.y : 0;
    const speed = Math.min(Math.hypot(dx, dy), 34);

    pointer.x = event.clientX;
    pointer.y = event.clientY;
    pointer.active = true;

    points.push({
      x: pointer.x,
      y: pointer.y,
      life: 1,
      width: 7 + speed * 0.18,
      hue: (now / 32) % 90
    });

    if (points.length > 34) points.shift();
  });

  document.addEventListener('pointerleave', () => {
    pointer.active = false;
  });

  function drawLiquidTrail(time) {
    const delta = Math.min((time - (lastTime || time)) / 16.67, 2);
    lastTime = time;

    ctx.clearRect(0, 0, width, height);
    points = points.filter(point => point.life > 0.035);

    if (points.length > 1) {
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      for (let i = 1; i < points.length; i++) {
        const previous = points[i - 1];
        const current = points[i];
        const progress = i / points.length;
        const alpha = Math.min(previous.life, current.life) * progress * 0.22;
        const strokeWidth = current.width * progress;

        ctx.beginPath();
        ctx.moveTo(previous.x, previous.y);
        ctx.quadraticCurveTo(
          (previous.x + current.x) / 2,
          (previous.y + current.y) / 2 - Math.min(10, strokeWidth),
          current.x,
          current.y
        );
        ctx.strokeStyle = i % 3 === 0
          ? `rgba(212,255,63,${alpha})`
          : `rgba(143,123,255,${alpha * 1.45})`;
        ctx.lineWidth = strokeWidth;
        ctx.shadowBlur = 15;
        ctx.shadowColor = i % 3 === 0 ? 'rgba(212,255,63,.22)' : 'rgba(143,123,255,.28)';
        ctx.stroke();
      }
    }

    ctx.shadowBlur = 0;
    points.forEach(point => {
      point.life -= 0.018 * delta;
      point.width *= 0.997;
    });

    requestAnimationFrame(drawLiquidTrail);
  }

  requestAnimationFrame(drawLiquidTrail);
}


/* Scroll reveal choreography */
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets = [
  '.section-heading',
  '.approach-title',
  '.process-item',
  '.about-layout > *',
  '.profile-heading',
  '.profile-subhead',
  '.profile-entry',
  '.achievement-list > div',
  '.contact-inner > *',
  '.early-ui-concept'
];

if (!reduceMotion && 'IntersectionObserver' in window) {
  const revealElements = document.querySelectorAll(revealTargets.join(','));
  revealElements.forEach((element, index) => {
    element.setAttribute('data-reveal', index % 5 === 0 ? 'left' : 'up');
    element.style.setProperty('--reveal-delay', `${(index % 4) * 85}ms`);
  });

  // Cards enter in small waves instead of appearing all at once.
  document.querySelectorAll('.project-card, .game-dev-card').forEach((element, index) => {
    element.setAttribute('data-reveal', 'up');
    element.style.setProperty('--reveal-delay', `${(index % 3) * 110}ms`);
  });

  document.body.classList.add('js-scroll-ready');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -45px 0px'
  });

  document.querySelectorAll('[data-reveal]').forEach(element => revealObserver.observe(element));
}

// Scroll progress indicator, updated efficiently once per animation frame.
const progressFill = document.querySelector('.scroll-progress span');
let progressTicking = false;

function updateScrollProgress() {
  if (!progressFill) return;
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? window.scrollY / scrollableHeight : 0;
  progressFill.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
  progressTicking = false;
}

window.addEventListener('scroll', () => {
  if (!progressTicking) {
    requestAnimationFrame(updateScrollProgress);
    progressTicking = true;
  }
}, { passive: true });
updateScrollProgress();

/* Chapter awareness: stable in both directions, including short final sections. */
const chapterLinks = [...document.querySelectorAll('[data-chapter]')];
const chapterSections = chapterLinks
  .map(link => document.getElementById(link.dataset.chapter))
  .filter(Boolean);
const chapterCurrent = document.getElementById('chapterRailCurrent');
const chapterFill = document.getElementById('chapterRailFill');
const backToTop = document.querySelector('.back-to-top');
const chapterNames = ['WORK', 'GAME DEV', 'PROCESS', 'ABOUT', 'BACKGROUND', 'CONTACT'];
let activeChapterIndex = -1;
let chapterUpdatePending = false;

function activateChapter(index) {
  if (index < 0 || index >= chapterSections.length || index === activeChapterIndex) return;
  activeChapterIndex = index;

  chapterLinks.forEach((link, linkIndex) => {
    if (linkIndex === index) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });

  if (chapterCurrent) {
    chapterCurrent.textContent = `0${index + 1} / ${chapterNames[index] || 'SECTION'}`;
  }
  if (chapterFill) {
    const progress = chapterSections.length > 1
      ? (index / (chapterSections.length - 1)) * 100
      : 0;
    chapterFill.style.height = `${progress}%`;
  }
}

function updateActiveChapter() {
  chapterUpdatePending = false;
  if (!chapterSections.length) return;

  const scrollBottom = window.scrollY + window.innerHeight;
  const pageBottom = document.documentElement.scrollHeight - 4;

  // The final section can be too short to reach the reading line before
  // the browser reaches the bottom of the page, so explicitly activate it.
  if (scrollBottom >= pageBottom) {
    activateChapter(chapterSections.length - 1);
    return;
  }

  const readingLine = Math.min(window.innerHeight * 0.32, 260);
  let nextIndex = 0;

  chapterSections.forEach((section, index) => {
    if (section.getBoundingClientRect().top <= readingLine) nextIndex = index;
  });

  activateChapter(nextIndex);
}

function requestChapterUpdate() {
  if (chapterUpdatePending) return;
  chapterUpdatePending = true;
  window.requestAnimationFrame(updateActiveChapter);
}

if (chapterSections.length) {
  window.addEventListener('scroll', requestChapterUpdate, { passive: true });
  window.addEventListener('resize', requestChapterUpdate);
  window.addEventListener('load', requestChapterUpdate);
  window.addEventListener('hashchange', requestChapterUpdate);

  // Update immediately when a chapter link is selected, then confirm after scrolling.
  chapterLinks.forEach((link, index) => {
    link.addEventListener('click', () => activateChapter(index));
  });

  requestChapterUpdate();
}

let backTopTicking = false;
window.addEventListener('scroll', () => {
  if (backTopTicking) return;
  backTopTicking = true;
  requestAnimationFrame(() => {
    if (backToTop) {
      backToTop.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.75);
    }
    backTopTicking = false;
  });
}, { passive: true });


// Hide the floating back-to-top control while the contact area is on screen,
// so it never competes with or covers the main contact button.
const contactSection = document.querySelector('#contact');
if (contactSection && backToTop && 'IntersectionObserver' in window) {
  const contactVisibilityObserver = new IntersectionObserver(entries => {
    const contactIsVisible = entries.some(entry => entry.isIntersecting);
    backToTop.classList.toggle('is-contact-visible', contactIsVisible);
  }, {
    threshold: 0.08
  });
  contactVisibilityObserver.observe(contactSection);
}
