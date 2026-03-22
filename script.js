document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.querySelectorAll('.nav-links a');

  if (toggle) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  links.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    });
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Teaser Presentation Slider Logic
  const slides = document.querySelectorAll('.slide');
  const progressBar = document.querySelector('.progress-bar');
  let currentSlide = 0;
  const slideDuration = 6500; // 6.5s per slide

  if (slides.length > 0) {
    function showSlide(index) {
      slides.forEach(s => s.classList.remove('active'));
      slides[index].classList.add('active');

      if (progressBar) {
        progressBar.style.transition = 'none';
        progressBar.style.width = '0%';
        setTimeout(() => {
          progressBar.style.transition = `width ${slideDuration}ms linear`;
          progressBar.style.width = '100%';
        }, 50);
      }
    }

    function nextSlide() {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    }

    showSlide(currentSlide);
    setInterval(nextSlide, slideDuration);
  }

  // Results table tab switcher
  const tabContainer = document.getElementById('resultTabs');
  if (tabContainer) {
    tabContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.table-tab');
      if (!btn) return;
      const tabId = btn.dataset.tab;

      // Toggle active tab button
      tabContainer.querySelectorAll('.table-tab').forEach(t => t.classList.remove('active'));
      btn.classList.add('active');

      // Toggle active panel
      document.querySelectorAll('.table-panel').forEach(p => p.classList.remove('active'));
      const target = document.getElementById('panel-' + tabId);
      if (target) target.classList.add('active');
    });
  }
});
