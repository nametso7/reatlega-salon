/* ══════════════════════════════════════════════════════
   /*Reatlega Salon – main.js*/

document.addEventListener('DOMContentLoaded', function () {

  /* 1. HAMBURGER MENU*/
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
      hamburger.innerHTML = isOpen
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });

    // To close menu when nav link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  /*1. GALLERY FILTER*/
  const filterBtns   = document.querySelectorAll('.filter-btn'); // Unified class structure
  const galleryItems = document.querySelectorAll('.gallery-item');

  if (filterBtns.length > 0) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        // Update active button
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        galleryItems.forEach(function (item) {
          if (filter === 'all' || item.getAttribute('data-category') === filter) {
            item.classList.remove('hidden');
          } else {
            item.classList.add('hidden');
          }
        });
      });
    });
  }

  /* ── 3. GALLERY LIGHTBOX ───────────────────────── */
  const lightbox      = document.getElementById('lightbox');
  const lightboxImg   = document.getElementById('lightbox-img');
  const lightboxCapt  = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');

  if (lightbox) {
    galleryItems.forEach(function (item) {
      item.addEventListener('click', function () {
        const img     = item.querySelector('img');
        const caption = item.querySelector('.gallery-overlay p');
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCapt.textContent = caption ? caption.textContent : '';
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  /* ── 4. FAQ ACCORDION ──────────────────────────── */
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const answer  = btn.nextElementSibling;
      const isOpen  = btn.classList.contains('open');

      // Close all others
      faqQuestions.forEach(function (q) {
        q.classList.remove('open');
        q.setAttribute('aria-expanded', 'false');
        q.nextElementSibling.classList.remove('open');
      });

      // Toggle clicked
      if (!isOpen) {
        btn.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        answer.classList.add('open');
      }
    });
  });

  /* ── 5. BOOKING FORM VALIDATION ────────────────── */
  const bookingForm = document.getElementById('booking-form');

  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      // Helper
      function showError(inputId, errorId, message) {
        document.getElementById(errorId).textContent = message;
        document.getElementById(inputId).style.borderColor = '#c0392b';
        valid = false;
      }
      function clearError(inputId, errorId) {
        document.getElementById(errorId).textContent = '';
        document.getElementById(inputId).style.borderColor = '';
      }

      // Validate name
      const name = document.getElementById('full-name').value.trim();
      if (!name) {
        showError('full-name', 'name-error', 'Please enter your full name.');
      } else { clearError('full-name', 'name-error'); }

      // Validate phone
      const phone = document.getElementById('phone').value.trim();
      if (!phone) {
        showError('phone', 'phone-error', 'Please enter your phone number.');
      } else { clearError('phone', 'phone-error'); }

      // Validate email (optional but must be valid format if provided)
      const email = document.getElementById('email').value.trim();
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('email', 'email-error', 'Please enter a valid email address.');
      } else { clearError('email', 'email-error'); }

      // Validate service
      const service = document.getElementById('service').value;
      if (!service) {
        showError('service', 'service-error', 'Please select a service.');
      } else { clearError('service', 'service-error'); }

      // Validate date
      const date = document.getElementById('appt-date').value;
      if (!date) {
        showError('appt-date', 'date-error', 'Please select a preferred date.');
      } else {
        const today = new Date(); today.setHours(0,0,0,0);
        if (new Date(date) < today) {
          showError('appt-date', 'date-error', 'Please select a future date.');
        } else { clearError('appt-date', 'date-error'); }
      }

      // Validate time
      const time = document.getElementById('appt-time').value;
      if (!time) {
        showError('appt-time', 'time-error', 'Please select a preferred time.');
      } else { clearError('appt-time', 'time-error'); }

      // If valid – show success
      if (valid) {
        bookingForm.reset();
        document.getElementById('booking-success').style.display = 'flex';
        bookingForm.style.display = 'none';
      }
    });
  }

  /* ── 6. REVIEW FORM + STAR RATING ─────────────── */
  const stars      = document.querySelectorAll('.star');
  const ratingInput = document.getElementById('rating-value');

  if (stars.length > 0) {
    stars.forEach(function (star) {
      star.addEventListener('mouseover', function () {
        const val = parseInt(star.getAttribute('data-value'));
        stars.forEach(function (s) {
          s.classList.toggle('hover', parseInt(s.getAttribute('data-value')) <= val);
        });
      });
      star.addEventListener('mouseleave', function () {
        stars.forEach(function (s) { s.classList.remove('hover'); });
      });
      star.addEventListener('click', function () {
        const val = star.getAttribute('data-value');
        ratingInput.value = val;
        stars.forEach(function (s) {
          s.classList.toggle('selected', parseInt(s.getAttribute('data-value')) <= parseInt(val));
        });
      });
      // Keyboard support
      star.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          star.click();
        }
      });
    });
  }

  const reviewForm = document.getElementById('review-form');

  if (reviewForm) {
    reviewForm.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      function showErr(id, errId, msg) {
        document.getElementById(errId).textContent = msg;
        const el = document.getElementById(id);
        if (el) el.style.borderColor = '#c0392b';
        valid = false;
      }
      function clearErr(id, errId) {
        document.getElementById(errId).textContent = '';
        const el = document.getElementById(id);
        if (el) el.style.borderColor = '';
      }

      const rName = document.getElementById('review-name').value.trim();
      if (!rName) { showErr('review-name', 'rname-error', 'Please enter your name.'); }
      else { clearErr('review-name', 'rname-error'); }

      const rSvc = document.getElementById('review-service').value.trim();
      if (!rSvc) { showErr('review-service', 'rservice-error', 'Please enter the service you received.'); }
      else { clearErr('review-service', 'rservice-error'); }

      const rating = ratingInput ? ratingInput.value : '';
      if (!rating) {
        document.getElementById('rating-error').textContent = 'Please select a star rating.';
        valid = false;
      } else { document.getElementById('rating-error').textContent = ''; }

      const rText = document.getElementById('review-text').value.trim();
      if (!rText) { showErr('review-text', 'review-error', 'Please write your review.'); }
      else { clearErr('review-text', 'review-error'); }

      if (valid) {
        reviewForm.reset();
        stars.forEach(function (s) { s.classList.remove('selected', 'hover'); });
        if (ratingInput) ratingInput.value = '';
        document.getElementById('review-success').style.display = 'flex';
        reviewForm.style.display = 'none';
      }
    });
  }

  /* ── 7. NAVBAR SCROLL SHADOW ───────────────────── */
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.style.boxShadow = window.scrollY > 20
        ? '0 4px 20px rgba(0,0,0,0.12)'
        : '0 2px 12px rgba(0,0,0,0.08)';
    });
  }

});
