document.addEventListener('DOMContentLoaded', () => {

  // Theme Switcher Logic
  const themeBtn = document.getElementById('theme-btn');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeBtn) themeBtn.textContent = '🌙 Dark Mode';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeBtn) themeBtn.textContent = '☀️ Light Mode';
  }

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const newTheme = isDark ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      themeBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
    });
  }

  // Dynamic Year Output
  const yearSpan = document.getElementById('year');
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  // Scroll Progress & Active Section Highlighting
  const progressBar = document.getElementById('scroll-progress');
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    if (progressBar) progressBar.style.width = `${scrolled}%`;

    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= (sectionTop - 180)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });

    if (backToTopBtn) {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Particle Canvas Background Animation
  const canvas = document.getElementById('hero-particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particles = [];

    function resizeCanvas() {
      canvas.width = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }
      draw() {
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < 40; i++) {
      particles.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // IntersectionObserver for Scroll Animations
  const observerOptions = { threshold: 0.15 };
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');

        // Trigger Counter Animation if present
        const counter = entry.target.querySelector('.stat-number');
        if (counter && !counter.classList.contains('counted')) {
          counter.classList.add('counted');
          const target = +counter.getAttribute('data-target');
          let count = 0;
          const inc = target / 20;
          const updateCount = () => {
            count += inc;
            if (count < target) {
              counter.innerText = Math.ceil(count);
              setTimeout(updateCount, 40);
            } else {
              counter.innerText = target;
            }
          };
          updateCount();
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el));

  // Beginner Student Project Data for Modals
  const projectDetails = {
    ems: {
      title: "Employee Management System",
      tech: "HTML5, CSS3, JavaScript, SQL",
      summary: "A practice project where I built basic webpage forms to enter and view simple employee details connected to a SQL database.",
      highlights: [
        "Created input forms to learn HTML5 validation.",
        "Wrote simple SQL queries to store and retrieve test entries.",
        "Learned fundamental JavaScript functions to toggle view tables."
      ]
    },
    hexecho: {
      title: "HexEcho — Walking Robot",
      tech: "Arduino/Embedded, CAD Design",
      summary: "A student robotics project where I assembled a six-legged robot using simple 3D CAD parts and programmed basic gait steps.",
      highlights: [
        "Programmed servo motors to move robot legs in steps.",
        "Attached an ultrasonic distance sensor so the robot stops before hitting walls.",
        "Designed basic body frames using CAD modeling software."
      ]
    },
    graphics: {
      title: "3D Classroom Project",
      tech: "C++, OpenGL",
      summary: "A computer graphics course assignment where I drew a simple 3D room using C++ and OpenGL.",
      highlights: [
        "Used basic OpenGL functions to draw walls, tables, and a ceiling fan.",
        "Added basic lighting to make objects look 3D.",
        "Implemented keyboard controls to move the camera view around."
      ]
    },
    cyberbullying: {
      title: "Cyberbullying Detection Experiment",
      tech: "Python, Data Analysis",
      summary: "A simple Python script created to test basic machine learning algorithms on public social media comment samples.",
      highlights: [
        "Learned how to clean text comments in Python.",
        "Tested TF-IDF feature extraction to turn words into numbers.",
        "Ran basic classifiers to see how well they detect offensive words."
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
          <p style="color: var(--text-muted); font-size: 0.95rem;">${data.summary}</p>
          <div class="modal-section">
            <h4>What I Learned Building This:</h4>
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
        emailError.textContent = 'Please enter a valid email.';
        isValid = false;
      }

      if (!messageInput.value.trim()) {
        messageError.textContent = 'Please write a message.';
        isValid = false;
      }

      if (isValid) {
        formStatus.textContent = '✓ Thanks! Message submitted successfully.';
        formStatus.classList.add('success');
        contactForm.reset();
      }
    });
  }

});