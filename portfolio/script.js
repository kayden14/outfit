/**
 * [BRAND NAME] — Portfolio Script
 * Handles: nav scroll state, mobile menu, scroll-reveal animations
 */

(() => {
  'use strict';

  // ── 1. Nav — add .scrolled class past 80px ──────────────
  const header = document.querySelector('.site-header');

  function updateNav() {
    if (window.scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav(); // Run on load

  // ── 2. Mobile menu toggle ────────────────────────────────
  const hamburger  = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn   = document.querySelector('.mobile-menu__close');
  const mobileLinks = document.querySelectorAll('.mobile-menu__links a');

  function openMenu() {
    mobileMenu.classList.add('is-open');
    mobileMenu.removeAttribute('aria-hidden');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger?.addEventListener('click', openMenu);
  closeBtn?.addEventListener('click', closeMenu);

  // Close menu when a link is clicked
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMenu();
    }
  });

  // ── 3. Scroll-reveal (IntersectionObserver) ──────────────
  const revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); // fire once
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -48px 0px',
      }
    );

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback — just show everything
    revealEls.forEach(el => el.classList.add('is-visible'));
  }

  // ── 4. Newsletter form (prevent default + feedback) ──────
  const form = document.querySelector('.contact__form');
  const emailInput = document.querySelector('#email-input');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput?.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailInput.style.borderColor = '#c0392b';
      emailInput.placeholder = 'Please enter a valid email address.';
      setTimeout(() => {
        emailInput.style.borderColor = '';
        emailInput.placeholder = 'your@email.com';
      }, 3000);
      return;
    }
    // Replace with your actual newsletter API call
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'Thank you.';
    btn.style.color = '#C9A876';
    btn.disabled = true;
    emailInput.value = '';
    emailInput.placeholder = 'You are now on the list.';
  });

  // ── 5. Smooth hover scale on gallery captions ────────────
  // (handled purely in CSS — no JS needed)

})();
