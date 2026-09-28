document.addEventListener('DOMContentLoaded', () => {

  // Theme Switcher with localStorage persistence
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

  // Scroll Progress Bar & Navigation Scroll Tracker
  const progressBar = document.getElementById('scroll-progress');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    // 1. Progress Bar Update
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) progressBar.style.width = `${scrolled}%`;

    // 2. Active Section Highlighting
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= (sectionTop - 150)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    // 3. Back to Top Button Visibility
    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  // Back to Top Scroll Event
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Project Modal System Data & Event Handlers
  const projectDetails = {
    ems: {
      title: "Employee Management System",
      tech: "HTML5, CSS3, JavaScript, SQL",
      summary: "A robust corporate web platform engineered to digitize employee onboarding, attendance tracking, and administrative record management.",
      highlights: [
        "Structured SQL schema ensuring data integrity.",
        "Responsive interface built with modular CSS and JavaScript.",
        "Role-based view filters for administrative monitoring."
      ]
    },
    hexecho: {
      title: "HexEcho — Autonomous Robot",
      tech: "Robotics, CAD Design, Embedded Firmware",
      summary: "Custom six-legged walking robot built with custom CAD components, wave gait stability algorithms, and ultrasonic obstacle avoidance.",
      highlights: [
        "Multi-servo inverse kinematics for stable walking gaits.",
        "Real-time ultrasonic sensor sweep for dynamic obstacle detection.",
        "Lightweight CAD chassis engineered for physical balance."
      ]
    },
    graphics: {
      title: "3D Classroom Simulation",
      tech: "C++, OpenGL, Computer Graphics Pipeline",
      summary: "Interactive 3D virtual environment demonstrating dynamic lighting models, custom geometric textures, animated object dynamics, and camera controls.",
      highlights: [
        "Phong reflection lighting calculation (ambient, diffuse, specular).",
        "Hierarchical animated ceiling fan mechanics.",
        "6-DOF camera movement for immersive exploration."
      ]
    },
    cyberbullying: {
      title: "Cyberbullying Detection System",
      tech: "Python, Data Analysis, Natural Language Processing",
      summary: "NLP machine learning framework targeted at identifying localized online harassment across Facebook, Instagram, X, and TikTok.",
      highlights: [
        "Custom dataset collected and preprocessed for regional context.",
        "Text feature extraction utilizing TF-IDF vectors.",
        "High accuracy classification of toxicity levels."
      ]
    }
  };

  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body');
  const modalClose = document.getElementById('modal-close');

  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', () => {
      const key = card.getAttribute('data-project');
      const data = projectDetails[key];

      if (data) {
        modalBody.innerHTML = `
          <h3 class="modal-title">${data.title}</h3>
          <p class="modal-subtitle">${data.tech}</p>
          <p>${data.summary}</p>
          <div class="modal-section">
            <h4>Key Architectural Highlights</h4>
            <ul>
              ${data.highlights.map(h => `<li>${h}</li>`).join('')}
            </ul>
          </div>
        `;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
      }
    });
  }

  // Client-Side Contact Form Validation
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
        emailError.textContent = 'Please enter a valid email address.';
        isValid = false;
      }

      if (!messageInput.value.trim()) {
        messageError.textContent = 'Please enter a message.';
        isValid = false;
      }

      if (isValid) {
        formStatus.textContent = '✓ Thank you! Your message has been sent.';
        formStatus.classList.add('success');
        contactForm.reset();
      }
    });
  }

});