/* =============================================================================
   Artimist — shared page behaviour.

   Three jobs: the scroll/parallax/tilt motion system carried over from the
   Claude Design build, the site header with its day/night switch, and the
   index overlay. Every page loads this one file so the whole site behaves the
   same way.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.documentElement;

  /* ---- shell: header, index, day/night ---------------------------------- */
  var PAGES = [
    ['Home', '/'], ['Services', '/services'], ['Architecture', '/architecture'],
    ['BIM & Drafting', '/bim-drafting'], ['Visualization', '/visualization'],
    ['Unreal & Real-time', '/unreal-engine'], ['Residential', '/residential'],
    ['Visual archive', '/visual-archive'], ['Process', '/process'],
    ['Studio team', '/team'], ['About', '/about'],
    ["Founder's message", '/founder-message'], ['Partners', '/partners'],
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
      '<div class="ap-header-right">' +
        '<button class="ap-pill" id="apMode" type="button" aria-pressed="false"><i></i><span id="apModeLabel">DAY</span>&nbsp;/&nbsp;<span id="apClock">00:00</span></button>' +
        '<button class="ap-pill" id="apMenu" type="button" aria-expanded="false" aria-controls="apIndex">MENU&nbsp;<span aria-hidden="true">&#10683;</span></button>' +
        '<a class="ap-cta" href="/contact">START A PROJECT <span aria-hidden="true">&#8599;</span></a>' +
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
    var current = p[1] === '/' ? here === '/' : here.indexOf(p[1]) === 0;
    list.insertAdjacentHTML('beforeend',
      '<a href="' + p[1] + '"' + (current ? ' aria-current="page"' : '') + '>' +
      '<small>' + String(i + 1).padStart(2, '0') + '</small><span>' + esc(p[0]) + '</span>' +
      '<i aria-hidden="true">&#8599;</i></a>');
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

  function tick() {
    var d = new Date();
    document.getElementById('apClock').textContent =
      String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }
  tick(); setInterval(tick, 20000);

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
