(function () {
  'use strict';

  var STYLE_ID = 'artimist-desktop-showcase-motion-style';

  function reducedMotion() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function installStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      @media (min-width: 761px) {
        .st-clients[data-artimist-clients="1"] .st-marquee > .artimist-client-track {
          display: flex !important;
          width: max-content !important;
          min-width: 0 !important;
          max-width: none !important;
          grid-template-columns: none !important;
          justify-content: flex-start !important;
          align-items: stretch !important;
          will-change: transform !important;
        }
        .st-clients[data-artimist-clients="1"] .artimist-client-card,
        .st-clients[data-artimist-clients="1"] .artimist-client-card:nth-child(n+6) {
          display: flex !important;
          flex: 0 0 clamp(260px, 20vw, 350px) !important;
          width: clamp(260px, 20vw, 350px) !important;
          min-width: clamp(260px, 20vw, 350px) !important;
          max-width: clamp(260px, 20vw, 350px) !important;
          min-height: 270px !important;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .artimist-client-track { transform: none !important; }
      }
    `;
    document.head.appendChild(style);
  }

  function start(track) {
    if (!track || track.dataset.artimistDesktopMotion === '1' || reducedMotion()) return false;
    track.dataset.artimistDesktopMotion = '1';
    installStyle();

    var x = 0;
    var last = performance.now();
    var paused = false;
    var raf = 0;

    function pause() { paused = true; }
    function resume() { paused = false; last = performance.now(); }

    track.addEventListener('mouseenter', pause);
    track.addEventListener('mouseleave', resume);
    track.addEventListener('pointerdown', pause, { passive: true });
    window.addEventListener('pointerup', resume, { passive: true });

    function tick(now) {
      if (!track.isConnected) {
        cancelAnimationFrame(raf);
        return;
      }

      var dt = Math.min(40, now - last);
      last = now;

      if (!paused && window.innerWidth > 760) {
        var half = track.scrollWidth / 2;
        if (half > 0) {
          x -= dt * 0.035;
          if (-x >= half) x += half;
          track.style.setProperty('transform', 'translate3d(' + x + 'px,0,0)', 'important');
        }
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return true;
  }

  function mount() {
    if ((location.pathname.replace(/\/$/, '') || '/') !== '/') return false;
    var track = document.querySelector('.st-clients[data-artimist-clients="1"] .artimist-client-track');
    return start(track);
  }

  var attempts = 0;
  var timer = setInterval(function () {
    attempts += 1;
    if (mount() || attempts > 40) clearInterval(timer);
  }, 180);

  var observer = new MutationObserver(function () { mount(); });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  mount();
})();
