// Hamburger nav toggle for mobile (<=768px)
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('navToggle');
  const nav = document.querySelector('header nav');
  if (!toggle || !nav) return;

  function setOpen(open) {
    if (open) {
      nav.classList.add('open');
      toggle.classList.remove('fa-bars');
      toggle.classList.add('fa-xmark');
      toggle.setAttribute('aria-label', 'Close menu');
    } else {
      nav.classList.remove('open');
      toggle.classList.remove('fa-xmark');
      toggle.classList.add('fa-bars');
      toggle.setAttribute('aria-label', 'Open menu');
    }
  }

  // Toggle on click
  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.contains('open');
    setOpen(!isOpen);
  });

  // Close when clicking outside the nav 
  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('open')) return;
    if (nav.contains(e.target) || e.target === toggle) return;
    setOpen(false);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') setOpen(false);
  });
});
