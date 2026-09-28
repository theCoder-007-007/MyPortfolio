document.addEventListener('DOMContentLoaded', () => {

  // Dark / Light Theme Toggle
  const themeBtn = document.getElementById('theme-btn');
  const currentTheme = localStorage.getItem('theme');

  if (currentTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeBtn.textContent = '☀️ Light Mode';
  }

  themeBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      themeBtn.textContent = '🌙 Dark Mode';
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      themeBtn.textContent = '☀️ Light Mode';
    }
  });

  // Dynamic Year Generator
  const yearSpan = document.getElementById('year');
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  // Contact Form Validation
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const messageError = document.getElementById('message-error');
      const formStatus = document.getElementById('form-status');

      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';
      formStatus.textContent = '';

      let isValid = true;

      if (name === '') {
        nameError.textContent = 'Please enter your name.';
        isValid = false;
      }

      if (email === '') {
        emailError.textContent = 'Please enter your email.';
        isValid = false;
      } else if (!email.includes('@') || !email.includes('.')) {
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
      }

      if (message === '') {
        messageError.textContent = 'Please write a message.';
        isValid = false;
      }

      if (isValid) {
        formStatus.textContent = 'Thank you! Your message has been sent successfully.';
        contactForm.reset();
      }
    });
  }

});