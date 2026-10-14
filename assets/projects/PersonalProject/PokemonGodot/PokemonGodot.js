'use strict';
const viewer = document.getElementById('image-viewer');
const viewerImage = document.getElementById('viewer-image');
const viewerTitle = document.getElementById('viewer-title');
document.querySelectorAll('.zoom-link').forEach(link => {
  link.addEventListener('click', event => {
    if (!viewer || typeof viewer.showModal !== 'function' || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    viewerImage.src = link.href;
    viewerImage.alt = link.querySelector('img').alt;
    viewerTitle.textContent = link.dataset.title;
    viewer.showModal();
    document.body.classList.add('viewer-open');
  });
});
document.getElementById('close-viewer')?.addEventListener('click', () => viewer.close());
viewer?.addEventListener('close', () => document.body.classList.remove('viewer-open'));
viewer?.addEventListener('click', event => {
  if (event.target !== viewer) return;
  const rect = viewer.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) viewer.close();
});
const navLinks = [...document.querySelectorAll('.sidebar nav a')];
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      navLinks.forEach(link => {
        const active = link.hash === `#${entry.target.id}`;
        link.classList.toggle('active', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-140px 0px -50% 0px', threshold: 0 });
  document.querySelectorAll('main section[id]').forEach(section => observer.observe(section));
}
if (typeof SITE_CONFIG !== 'undefined' && SITE_CONFIG.social?.github) {
  const link = document.createElement('a');
  link.href = SITE_CONFIG.social.github;
  link.textContent = SITE_CONFIG.nombre || 'Jhon Umasi';
  document.getElementById('author-link').replaceChildren(link);
}
