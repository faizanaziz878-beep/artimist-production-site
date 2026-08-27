/* =============================================================================
   Artimist — shared page behaviour.

   Three jobs: the scroll/parallax/tilt motion system carried over from the
   Claude Design build, the site header with its day/night switch, and the
   index overlay. Every page loads this one file so the whole site behaves the
   same way.
   ========================================================================== */
(function () {
  'use strict';

  function loadSharedEnhancement(src, key) {
    if (document.querySelector('script[data-artimist-' + key + ']')) return;
    var script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.setAttribute('data-artimist-' + key, '1');
    document.head.appendChild(script);
  }
  loadSharedEnhancement('/mobile-cleanup.js', 'mobile-cleanup');
  loadSharedEnhancement('/whatsapp-conversations.js', 'whatsapp');

  var root = document.documentElement;

  /* iOS/Safari can render U+2197 as a blue emoji-style badge. Force the text
     presentation selector so directional marks stay monochrome and editorial. */
  function forceTextArrows(scope) {
    var walker = document.createTreeWalker(scope || document.body, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      if (node.nodeValue && node.nodeValue.indexOf('\u2197') !== -1) {
        node.nodeValue = node.nodeValue.replace(/\u2197(?!\uFE0E)/g, '\u2197\uFE0E');
      }
    }
  }
  forceTextArrows(document.body);

  /* ---- shell: header, index, day/night ---------------------------------- */
  var PAGES = [
    ['Work', '/#work'],
    ['Recent', '/#archive'],
    ['Architecture', '/architecture'],
    ['BIM & Drafting', '/bim-drafting'],
    ['Visualization', '/visualization'],
    ['Unreal Engine', '/unreal-engine'],
    ['Residential', '/residential'],
    ['Render atlas', '/visual-archive'],
    ['Services', '/services'],
    ['Skills', '/skills'],
    ['Process', '/process'],
    ['Team', '/team'],
    ['About', '/about'],
    ['Founder', '/founder-message'],
    ['Lab', '/services#research'],
    ['Partners', '/partners'],
    ['Contact', '/contact']
  ];

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  var here = location.pathname.replace(/\/$/, '') || '/';

  var shell = document.createElement('div');
  shell.className = 'ap-shell';
  shell.innerHTML =
    '<header class="ap-header">' +
      '<a class="ap-wordmark" href="/"><span><b>A</b>RTIMIST</span><small>CREATIVE PRODUCTION</small></a>' +
      '<nav class="ap-primary-nav" aria-label="Primary navigation"><a href="/#work">WORK</a><a href="/services">SERVICES</a><a href="/team">TEAM</a><a href="/#plans">PLANS</a><a href="/#brief">BRIEF</a></nav>' +
      '<div class="ap-header-right">' +
        '<button class="ap-pill" id="apMode" type="button" aria-pressed="false"><svg class="ap-icon ap-mode-icon" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="3.25"></circle><path d="M10 1.5v2M10 16.5v2M1.5 10h2M16.5 10h2M4 4l1.45 1.45M14.55 14.55L16 16M16 4l-1.45 1.45M5.45 14.55L4 16"></path></svg><span id="apModeLabel">DAY</span></button>' +
        '<button class="ap-pill" id="apMenu" type="button" aria-expanded="false" aria-controls="apIndex">MENU<svg class="ap-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M3 5.5h14M3 10h14M3 14.5h14"></path></svg></button>' +
        '<a class="ap-cta" href="/contact">START A PROJECT<svg class="ap-icon" viewBox="0 0 20 20" aria-hidden="true"><path d="M5 15 15 5M7 5h8v8"></path></svg></a>' +
      '</div>' +
    '</header>' +
    '<div class="ap-index" id="apIndex" role="dialog" aria-modal="true" aria-label="Site index">' +
      '<div class="ap-index-top"><span>INDEX / 2026</span>' +
        '<button class="ap-index-close" id="apClose" type="button">CLOSE <i aria-hidden="true">&times;</i></button></div>' +
      '<nav class="ap-index-list" id="apIndexList" aria-label="All pages"></nav>' +
      '<div class="ap-index-foot"><span>VANCOUVER &middot; OHIO &middot; STOCKHOLM &middot; LAHORE</span>' +
        '<a href="mailto:Faizan@artimistproductions.com">FAIZAN@ARTIMISTPRODUCTIONS.COM</a></div>' +
    '</div>';
  document.body.insertBefore(shell, document.body.firstChild);

  var list = document.getElementById('apIndexList');
  PAGES.forEach(function (p, i) {
    var base = p[1].split('#')[0];
    var current = base !== '/' && here.indexOf(base) === 0;
    list.insertAdjacentHTML('beforeend',
      '<a href="' + p[1] + '"' + (current ? ' aria-current="page"' : '') + '>' +
      '<small>' + String(i + 1).padStart(2, '0') + '</small><span>' + esc(p[0]) + '</span>' +
      '<i aria-hidden="true">&#8599;&#65038;</i></a>');
  });

  var panel = document.getElementById('apIndex');
  function setIndex(open) {
    panel.classList.toggle('is-open', open);
    document.getElementById('apMenu').setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  document.getElementById('apMenu').addEventListener('click', function () { setIndex(!panel.classList.contains('is-open')); });
  document.getElementById('apClose').addEventListener('click', function () { setIndex(false); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setIndex(false); });

  /* Day/night is stored, so the choice survives the next page and the next
     visit. Same key as the homepage, so the whole site agrees. */
  var modeBtn = document.getElementById('apMode');
  function applyMode(mode) {
    document.body.setAttribute('data-mode', mode);
    root.setAttribute('data-mode', mode);
    document.getElementById('apModeLabel').textContent = mode === 'night' ? 'NIGHT' : 'DAY';
    modeBtn.setAttribute('aria-pressed', mode === 'night' ? 'true' : 'false');
    try { localStorage.setItem('artimist_mode', mode); } catch (err) { /* private mode */ }
  }
  var stored = null;
  try { stored = localStorage.getItem('artimist_mode'); } catch (err) { stored = null; }
  applyMode(stored === 'night' ? 'night' : 'day');
  modeBtn.addEventListener('click', function () {
    applyMode(document.body.getAttribute('data-mode') === 'night' ? 'day' : 'night');
  });


  /* ---- motion ------------------------------------------------------------ */
  var progress = document.createElement('div'); progress.className = 'scroll-progress';
  var aura = document.createElement('div'); aura.className = 'pointer-aura'; aura.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress); document.body.appendChild(aura);

  var frame = 0;
  function onScroll() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(function () {
      var max = document.documentElement.scrollHeight - innerHeight;
      root.style.setProperty('--scroll', (max > 0 ? (scrollY / max) * 100 : 0) + '%');
      document.querySelectorAll('[data-parallax]').forEach(function (el, index) {
        var rect = el.getBoundingClientRect();
        var shift = (rect.top - innerHeight / 2) * (0.018 + (index % 3) * 0.006);
        el.style.setProperty('--parallax', shift + 'px');
      });
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('pointermove', function (e) {
    root.style.setProperty('--mx', e.clientX + 'px');
    root.style.setProperty('--my', e.clientY + 'px');
  }, { passive: true });

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) { entry.target.classList.add('in-view'); io.unobserve(entry.target); }
    });
  }, { rootMargin: '0px 0px -7% 0px', threshold: 0.06 });
  document.querySelectorAll('main section, main article').forEach(function (t) {
    t.classList.add('motion-section'); io.observe(t);
  });

  /* Tilt is a pointer affordance; on touch it would just fight the scroll. */
  if (!matchMedia('(pointer: coarse)').matches) {
    document.querySelectorAll('.practice-shot>div,.partners-v2-grid article,.about-v2-principles article,.services-v2-engage article,.capability-services article,.service-visual').forEach(function (card) {
      card.classList.add('tilt-card');
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width - 0.5;
        var y = (e.clientY - r.top) / r.height - 0.5;
        card.style.setProperty('--ry', (x * 5) + 'deg');
        card.style.setProperty('--rx', (y * -5) + 'deg');
        card.style.setProperty('--tz', '9px');
      });
      card.addEventListener('pointerleave', function () {
        card.style.setProperty('--ry', '0deg');
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--tz', '0px');
      });
    });
  }

  onScroll();
})();
