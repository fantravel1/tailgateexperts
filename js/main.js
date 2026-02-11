/* ============================================
   TAILGATEEXPERTS — MAIN JAVASCRIPT
   Navigation, search, animations, interactivity
   ============================================ */

(function () {
  'use strict';

  /* ---------- HEADER SCROLL EFFECT ---------- */
  const header = document.getElementById('site-header');

  function handleScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* ---------- MOBILE NAVIGATION ---------- */
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileOverlay = document.getElementById('mobile-overlay');

  if (mobileToggle && mobileOverlay) {
    mobileToggle.addEventListener('click', function () {
      const isActive = mobileToggle.classList.toggle('active');
      mobileOverlay.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isActive);
      document.body.style.overflow = isActive ? 'hidden' : '';
    });

    // Close on link click
    mobileOverlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileToggle.classList.remove('active');
        mobileOverlay.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- SMOOTH SCROLL FOR ANCHOR LINKS ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- SCROLL REVEAL ANIMATIONS ---------- */
  var revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show everything
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* ---------- METRIC BAR ANIMATIONS ---------- */
  var metricBars = document.querySelectorAll('.metric-fill');

  if ('IntersectionObserver' in window && metricBars.length > 0) {
    var barObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var fills = entry.target.querySelectorAll
              ? entry.target.querySelectorAll('.metric-fill')
              : [entry.target];

            fills.forEach(function (fill, index) {
              var width = fill.getAttribute('data-width');
              if (width) {
                setTimeout(function () {
                  fill.style.width = width + '%';
                  fill.classList.add('animated');
                }, index * 100);
              }
            });

            barObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    // Observe the parent section instead of individual bars
    var scoreSection = document.getElementById('tailgate-score');
    if (scoreSection) {
      barObserver.observe(scoreSection);
    }
  }

  /* ---------- STADIUM SEARCH ---------- */
  var stadiums = [
    { name: 'Arrowhead Stadium', city: 'Kansas City, MO', sport: 'NFL', score: '9.2' },
    { name: 'Lambeau Field', city: 'Green Bay, WI', sport: 'NFL', score: '9.4' },
    { name: 'Tiger Stadium (LSU)', city: 'Baton Rouge, LA', sport: 'CFB', score: '9.6' },
    { name: 'The Grove (Ole Miss)', city: 'Oxford, MS', sport: 'CFB', score: '9.0' },
    { name: 'Soldier Field', city: 'Chicago, IL', sport: 'NFL', score: '8.8' },
    { name: 'Michigan Stadium', city: 'Ann Arbor, MI', sport: 'CFB', score: '9.1' },
    { name: 'Neyland Stadium', city: 'Knoxville, TN', sport: 'CFB', score: '9.3' },
    { name: 'Bryant-Denny Stadium', city: 'Tuscaloosa, AL', sport: 'CFB', score: '9.0' },
    { name: 'Beaver Stadium', city: 'State College, PA', sport: 'CFB', score: '8.9' },
    { name: 'Memorial Stadium', city: 'Lincoln, NE', sport: 'CFB', score: '8.7' },
    { name: 'Highmark Stadium', city: 'Orchard Park, NY', sport: 'NFL', score: '9.0' },
    { name: 'GEHA Field at Arrowhead', city: 'Kansas City, MO', sport: 'NFL', score: '9.2' },
    { name: 'Camping World Stadium', city: 'Orlando, FL', sport: 'CFB', score: '7.5' },
    { name: 'AT&T Stadium', city: 'Arlington, TX', sport: 'NFL', score: '7.8' },
    { name: 'Mercedes-Benz Stadium', city: 'Atlanta, GA', sport: 'NFL', score: '7.6' },
    { name: 'Hard Rock Stadium', city: 'Miami Gardens, FL', sport: 'NFL', score: '7.4' },
    { name: 'Lincoln Financial Field', city: 'Philadelphia, PA', sport: 'NFL', score: '8.5' },
    { name: 'MetLife Stadium', city: 'East Rutherford, NJ', sport: 'NFL', score: '7.2' },
    { name: 'Gillette Stadium', city: 'Foxborough, MA', sport: 'NFL', score: '7.9' },
    { name: 'Nissan Stadium', city: 'Nashville, TN', sport: 'NFL', score: '8.1' },
    { name: 'Heinz Field', city: 'Pittsburgh, PA', sport: 'NFL', score: '8.3' },
    { name: 'M&T Bank Stadium', city: 'Baltimore, MD', sport: 'NFL', score: '7.8' },
    { name: 'Raymond James Stadium', city: 'Tampa, FL', sport: 'NFL', score: '8.0' },
    { name: 'Sanford Stadium', city: 'Athens, GA', sport: 'CFB', score: '9.2' },
    { name: 'Kyle Field', city: 'College Station, TX', sport: 'CFB', score: '9.1' },
    { name: 'Ohio Stadium', city: 'Columbus, OH', sport: 'CFB', score: '9.0' },
    { name: 'Rose Bowl', city: 'Pasadena, CA', sport: 'CFB', score: '8.4' },
    { name: 'Notre Dame Stadium', city: 'Notre Dame, IN', sport: 'CFB', score: '8.6' },
    { name: 'Williams-Brice Stadium', city: 'Columbia, SC', sport: 'CFB', score: '8.8' },
    { name: 'Jordan-Hare Stadium', city: 'Auburn, AL', sport: 'CFB', score: '9.0' },
    { name: 'Daytona International Speedway', city: 'Daytona Beach, FL', sport: 'NASCAR', score: '8.9' },
    { name: 'Talladega Superspeedway', city: 'Lincoln, AL', sport: 'NASCAR', score: '9.1' },
    { name: 'Bristol Motor Speedway', city: 'Bristol, TN', sport: 'NASCAR', score: '9.3' },
    { name: 'Wrigley Field', city: 'Chicago, IL', sport: 'MLB', score: '7.5' },
    { name: 'Fenway Park', city: 'Boston, MA', sport: 'MLB', score: '7.0' },
  ];

  var searchInput = document.getElementById('stadium-search');
  var searchResults = document.getElementById('search-results');

  if (searchInput && searchResults) {
    searchInput.addEventListener('input', function () {
      var query = this.value.trim().toLowerCase();

      if (query.length < 2) {
        searchResults.classList.remove('active');
        searchResults.innerHTML = '';
        return;
      }

      var matches = stadiums
        .filter(function (s) {
          return (
            s.name.toLowerCase().indexOf(query) !== -1 ||
            s.city.toLowerCase().indexOf(query) !== -1 ||
            s.sport.toLowerCase().indexOf(query) !== -1
          );
        })
        .slice(0, 6);

      if (matches.length === 0) {
        searchResults.classList.remove('active');
        searchResults.innerHTML = '';
        return;
      }

      var html = matches
        .map(function (s) {
          return (
            '<a href="coming-soon.html" class="search-result-item">' +
            '<span class="result-name">' + escapeHtml(s.name) + '</span>' +
            '<span class="result-meta">' + escapeHtml(s.city) + ' &middot; ' + escapeHtml(s.sport) + ' &middot; ' + escapeHtml(s.score) + '</span>' +
            '</a>'
          );
        })
        .join('');

      searchResults.innerHTML = html;
      searchResults.classList.add('active');
    });

    // Close search results when clicking outside
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.hero-search')) {
        searchResults.classList.remove('active');
      }
    });

    // Close on Escape
    searchInput.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        searchResults.classList.remove('active');
        searchInput.blur();
      }
    });
  }

  /* ---------- HELPER: Escape HTML ---------- */
  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  /* ---------- NEWSLETTER FORM (placeholder) ---------- */
  document.querySelectorAll('.cta-form, .coming-soon-form form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var input = this.querySelector('input[type="email"]');
      if (input && input.value) {
        var btn = this.querySelector('button[type="submit"]');
        if (btn) {
          var originalText = btn.textContent;
          btn.textContent = 'Subscribed!';
          btn.style.background = '#2d6a4f';
          input.value = '';
          setTimeout(function () {
            btn.textContent = originalText;
            btn.style.background = '';
          }, 3000);
        }
      }
    });
  });

})();
