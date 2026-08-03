// Pause other videos when one starts.
document.querySelectorAll('video').forEach((video) => {
  video.addEventListener('play', () => {
    document.querySelectorAll('video').forEach((other) => {
      if (other !== video) other.pause();
    });
  });
});

// Selective scroll reveals: enough movement to feel polished without animating everything.
const revealGroups = [
  ['.section-heading, .page-hero .container, .case-hero .container', ''],
  ['.project-card', ''],
  ['.about .col-lg-7, .case-grid > :first-child', 'reveal-left'],
  ['.about .col-lg-5, .case-grid > :last-child', 'reveal-right'],
  ['.design-gallery figure, .video-grid figure, .info-card', '']
];

revealGroups.forEach(([selector, direction]) => {
  document.querySelectorAll(selector).forEach((element, index) => {
    element.classList.add('reveal');
    if (direction) element.classList.add(direction);
    // Small stagger only inside repeated content.
    if (selector.includes('figure') || selector.includes('project-card') || selector.includes('info-card')) {
      element.style.transitionDelay = `${Math.min(index % 3, 2) * 90}ms`;
    }
  });
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('is-visible');
    observer.unobserve(entry.target);
  });
}, { threshold: 0.13, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

// One intentionally unique text-over-background scroll effect on the homepage.
const statement = document.querySelector('.scroll-statement');
if (statement && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const updateStatement = () => {
    const rect = statement.getBoundingClientRect();
    const progress = Math.max(-1, Math.min(1, (window.innerHeight / 2 - (rect.top + rect.height / 2)) / window.innerHeight));
    statement.style.setProperty('--statement-shift', `${progress * 90}px`);
  };
  updateStatement();
  window.addEventListener('scroll', updateStatement, { passive: true });
}
