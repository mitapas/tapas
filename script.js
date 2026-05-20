/* =============================================
   Engr. Tapas Kumer – Portfolio JavaScript
   Smooth UX, Animations & Interactions
============================================= */

'use strict';

/* ===== NAVBAR ===== */
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navLinkItems = navLinks.querySelectorAll('a');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNavLink();
  handleScrollTop();
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  // Animate hamburger
  const spans = navToggle.querySelectorAll('span');
  navLinks.classList.contains('open')
    ? (spans[0].style.transform = 'rotate(45deg) translate(5px,5px)',
       spans[1].style.opacity = '0',
       spans[2].style.transform = 'rotate(-45deg) translate(5px,-5px)')
    : (spans[0].style.transform = '', spans[1].style.opacity = '', spans[2].style.transform = '');
});

navLinkItems.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = ''; spans[1].style.opacity = ''; spans[2].style.transform = '';
  });
});

function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = navLinks.querySelector(`a[href="#${id}"]`);
    if (link) {
      if (scrollPos >= top && scrollPos < top + height) {
        navLinkItems.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
}

/* ===== SCROLL TO TOP ===== */
const scrollTopBtn = document.getElementById('scrollTop');
function handleScrollTop() {
  if (window.scrollY > 400) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
}
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ===== TYPING ANIMATION ===== */
const typingPhrases = [
  'Electrical Engineering',
  'Solar Systems',
  'CBT&A Methodology',
  'Teacher Training',
  'Power Systems',
  'Outcome Based Education',
  'Digital Electronics',
];
let tpIdx = 0, tpChar = 0, tpDeleting = false;
const typingEl = document.getElementById('typingText');

function typeLoop() {
  const current = typingPhrases[tpIdx];
  if (!tpDeleting) {
    typingEl.textContent = current.substring(0, tpChar + 1);
    tpChar++;
    if (tpChar === current.length) {
      tpDeleting = true;
      setTimeout(typeLoop, 1800);
      return;
    }
  } else {
    typingEl.textContent = current.substring(0, tpChar - 1);
    tpChar--;
    if (tpChar === 0) {
      tpDeleting = false;
      tpIdx = (tpIdx + 1) % typingPhrases.length;
    }
  }
  setTimeout(typeLoop, tpDeleting ? 55 : 95);
}
setTimeout(typeLoop, 1200);

/* ===== HERO PARTICLES ===== */
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 30;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 4 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 8;
    const duration = Math.random() * 10 + 8;
    Object.assign(p.style, {
      position: 'absolute',
      left: `${x}%`, top: `${y}%`,
      width: `${size}px`, height: `${size}px`,
      borderRadius: '50%',
      background: Math.random() > 0.5 ? 'rgba(0,212,232,0.5)' : 'rgba(240,165,0,0.4)',
      animation: `particleFloat ${duration}s ${delay}s ease-in-out infinite`,
      pointerEvents: 'none',
    });
    container.appendChild(p);
  }

  // Add keyframe if not already present
  if (!document.getElementById('particleStyle')) {
    const style = document.createElement('style');
    style.id = 'particleStyle';
    style.textContent = `
      @keyframes particleFloat {
        0%,100%{ transform:translateY(0) scale(1); opacity:0.6; }
        50%{ transform:translateY(-25px) scale(1.2); opacity:0.2; }
      }
    `;
    document.head.appendChild(style);
  }
}
createParticles();

/* ===== INTERSECTION OBSERVER (Fade-In) ===== */
const fadeEls = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger children if parent
      entry.target.style.transitionDelay = `${(i % 4) * 0.08}s`;
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => fadeObserver.observe(el));

/* ===== ANIMATED COUNTERS ===== */
let countersStarted = false;
const counterEls = document.querySelectorAll('.counter-val[data-target]');

function animateCounters() {
  counterEls.forEach(el => {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800;
    const step = Math.ceil(target / (duration / 16));
    let current = 0;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { current = target; clearInterval(timer); }
      el.textContent = current.toLocaleString();
    }, 16);
  });
}

const counterSection = document.querySelector('.counters-row') || document.querySelector('.training-stats-box');
if (counterSection) {
  const counterObs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !countersStarted) {
      countersStarted = true;
      animateCounters();
    }
  }, { threshold: 0.3 });
  counterObs.observe(counterSection);
}

/* ===== EXPERTISE BAR FILL ===== */
const barEls = document.querySelectorAll('.exp-bar-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target.style.width;
      entry.target.style.width = '0';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          entry.target.style.width = target;
        });
      });
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
barEls.forEach(bar => {
  const orig = bar.style.width;
  bar.setAttribute('data-width', orig);
  bar.style.width = '0';
  barObserver.observe(bar);
});

/* ===== TESTIMONIALS SLIDER ===== */
const tTrack = document.getElementById('tsliderTrack');
const tPrev = document.getElementById('tPrev');
const tNext = document.getElementById('tNext');
const tDotsContainer = document.getElementById('tDots');
const testimonials = tTrack ? tTrack.querySelectorAll('.testimonial-card') : [];
let tCurrent = 0;
let tPerView = window.innerWidth <= 700 ? 1 : 2;
const tTotal = testimonials.length;

function initTDots() {
  if (!tDotsContainer) return;
  tDotsContainer.innerHTML = '';
  const totalSlides = Math.ceil(tTotal / tPerView);
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = `tdot${i === 0 ? ' active' : ''}`;
    dot.addEventListener('click', () => goToSlide(i));
    tDotsContainer.appendChild(dot);
  }
}

function goToSlide(idx) {
  if (!tTrack) return;
  const totalSlides = Math.ceil(tTotal / tPerView);
  tCurrent = Math.max(0, Math.min(idx, totalSlides - 1));
  const cardWidth = testimonials[0] ? testimonials[0].offsetWidth + 24 : 0;
  tTrack.style.transform = `translateX(-${tCurrent * cardWidth * tPerView}px)`;
  document.querySelectorAll('.tdot').forEach((d, i) => {
    d.classList.toggle('active', i === tCurrent);
  });
}

if (tPrev) tPrev.addEventListener('click', () => goToSlide(tCurrent - 1));
if (tNext) tNext.addEventListener('click', () => goToSlide(tCurrent + 1));

window.addEventListener('resize', () => {
  tPerView = window.innerWidth <= 700 ? 1 : 2;
  tCurrent = 0;
  initTDots();
  goToSlide(0);
});
initTDots();

// Auto-advance slider
setInterval(() => {
  const totalSlides = Math.ceil(tTotal / tPerView);
  goToSlide((tCurrent + 1) % totalSlides);
}, 5000);

/* ===== GALLERY FILTERS + LIGHTBOX ===== */
const galleryFilters = document.querySelectorAll('.gfilter');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lbImg = document.getElementById('lbImg');
const lbCaption = document.getElementById('lbCaption');
const lbClose = document.getElementById('lbClose');

galleryFilters.forEach(filter => {
  filter.addEventListener('click', () => {
    galleryFilters.forEach(f => f.classList.remove('active'));
    filter.classList.add('active');
    const cat = filter.getAttribute('data-filter');
    galleryItems.forEach(item => {
      const itemCat = item.getAttribute('data-cat');
      if (cat === 'all' || itemCat === cat) {
        item.style.display = '';
        item.style.opacity = '0';
        item.style.transform = 'scale(0.95)';
        setTimeout(() => {
          item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
          item.style.opacity = '1';
          item.style.transform = 'scale(1)';
        }, 50);
      } else {
        item.style.display = 'none';
      }
    });
  });
});

galleryItems.forEach(item => {
  item.addEventListener('click', () => {
    const img = item.querySelector('img');
    const caption = item.querySelector('.gallery-overlay span');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCaption.textContent = caption ? caption.textContent : '';
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

if (lbClose) {
  lbClose.addEventListener('click', closeLightbox);
}
if (lightbox) {
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });
}
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

/* ===== CONTACT FORM ===== */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cname').value.trim();
    const email = document.getElementById('cemail').value.trim();
    const message = document.getElementById('cmessage').value.trim();

    if (!name || !email || !message) {
      // Simple inline validation highlight
      [document.getElementById('cname'), document.getElementById('cemail'), document.getElementById('cmessage')].forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#e74c3c';
          field.style.boxShadow = '0 0 0 3px rgba(231,76,60,0.1)';
          setTimeout(() => { field.style.borderColor = ''; field.style.boxShadow = ''; }, 2500);
        }
      });
      return;
    }

    // Simulate submission
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      contactForm.reset();
      formSuccess.classList.add('show');
      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    }, 1600);
  });
}

/* ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS ===== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    }
  });
});

/* ===== EXPERTISE CARD TILT EFFECT (subtle) ===== */
document.querySelectorAll('.expertise-card, .service-card, .counter-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-6px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ===== NAV LINK SMOOTH UNDERLINE INDICATOR ===== */
updateActiveNavLink();
