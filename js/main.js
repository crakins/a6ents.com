// Mobile nav toggle
const toggle = document.getElementById('nav-toggle');
const navLinks = document.getElementById('nav-links');

toggle.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});

// Close mobile nav on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// Intersection Observer — fade-in on scroll
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Contact form handling
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending...';
  status.textContent = '';
  status.className = 'form__status';

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    if (res.ok) {
      status.textContent = 'Message sent! We\'ll be in touch soon.';
      status.classList.add('form__status--success');
      form.reset();
    } else {
      throw new Error();
    }
  } catch {
    status.textContent = 'Something went wrong. Please email us directly.';
    status.classList.add('form__status--error');
  } finally {
    btn.disabled = false;
    btn.textContent = 'Send Message';
  }
});
