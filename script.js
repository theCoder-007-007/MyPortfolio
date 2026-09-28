document.addEventListener('DOMContentLoaded', () => {

  // Theme Switcher Logic
  const themeBtn = document.getElementById('theme-btn');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeBtn) themeBtn.textContent = '☀️ Light Mode';
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeBtn) themeBtn.textContent = '🌙 Dark Mode';
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      themeBtn.textContent = isDark ? '🌙 Dark Mode' : '☀️ Light Mode';
    });
  }

  // Dynamic Year Generator
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  // Active Navigation Link Indicator on Scroll
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    // Back to top button visibility
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  // Back to top scroll functionality
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Form Validation and Submission UX
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('name');
      const emailInput = document.getElementById('email');
      const messageInput = document.getElementById('message');

      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const messageError = document.getElementById('message-error');
      const formStatus = document.getElementById('form-status');

      // Clear previous error messages
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
      formStatus.className = 'form-status';
      formStatus.textContent = '';

      let isValid = true;

      if (!nameInput.value.trim()) {
        nameError.textContent = 'Please enter your name.';
        isValid = false;
      }

      const emailVal = emailInput.value.trim();
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailVal) {
        emailError.textContent = 'Please enter your email.';
        isValid = false;
      } else if (!emailPattern.test(emailVal)) {
        emailError.textContent = 'Please provide a valid email address.';
        isValid = false;
      }

      if (!messageInput.value.trim()) {
        messageError.textContent = 'Please enter a message.';
        isValid = false;
      }

      if (isValid) {
        formStatus.textContent = '✓ Thank you! Your message has been recorded.';
        formStatus.classList.add('success');
        contactForm.reset();
      }
    });
  }
});