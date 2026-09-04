(function () {
  'use strict';
  if (location.pathname.indexOf('/admin') === 0) return;

  var NUMBER = '18078084181';
  var SERVICE_LABELS = {
    '/home-design-services': 'home design help',
    '/custom-house-design': 'custom house design and floor plans',
    '/plan-modification-service': 'house plan modifications and floor plan changes',
    '/3d-interior-design-service': '3D interior design and home visualization',
    '/residential-renovation-permit-drawings': 'residential renovation and permit drawings',
    '/architecture': 'architecture and interior design',
    '/bim-drafting': 'BIM, Revit and CAD drafting',
    '/visualization': 'architectural visualization and 3D rendering',
    '/unreal-engine': 'Unreal Engine and interactive architecture',
    '/international': 'international project delivery',
    '/services': 'Artimist services',
    '/case-studies': 'an Artimist project',
    '/residential': 'residential design',
    '/': 'a project with Artimist Productions'
  };

  function currentTopic() {
    var path = location.pathname.replace(/\/$/, '') || '/';
    if (SERVICE_LABELS[path]) return SERVICE_LABELS[path];
    var keys = Object.keys(SERVICE_LABELS).filter(function (key) { return key !== '/'; });
    for (var i = 0; i < keys.length; i += 1) {
      if (path.indexOf(keys[i]) === 0) return SERVICE_LABELS[keys[i]];
    }
    return 'a project with Artimist Productions';
  }

  function makeHref() {
    var text = 'Hi Artimist Productions — I’m interested in ' + currentTopic() + ' and would like to discuss a project.';
    return 'https://wa.me/' + NUMBER + '?text=' + encodeURIComponent(text);
  }

  function track() {
    try {
      if (typeof window.gtag === 'function') {
        window.gtag('event', 'whatsapp_click', { source: 'persistent_whatsapp', page_path: location.pathname, page_title: document.title });
      }
    } catch (error) {}
  }

  function addStyle() {
    if (document.getElementById('artimist-whatsapp-style')) return;
    var style = document.createElement('style');
    style.id = 'artimist-whatsapp-style';
    style.textContent = [
      '.artimist-whatsapp{position:fixed;left:22px;bottom:22px;z-index:930;box-sizing:border-box;display:flex;align-items:center;justify-content:center;gap:10px;width:190px;min-height:50px;padding:0 17px;border:1px solid rgba(255,255,255,.18);border-radius:999px;background:rgba(9,9,9,.92);color:#fff!important;text-decoration:none!important;box-shadow:0 16px 45px rgba(0,0,0,.34);-webkit-backdrop-filter:blur(18px) saturate(1.08);backdrop-filter:blur(18px) saturate(1.08);font:700 9px/1 Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;transition:transform .22s ease,border-color .2s ease,opacity .2s ease}',
      '.artimist-whatsapp:hover{transform:translateY(-2px);border-color:rgba(217,100,118,.58)}',
      '.artimist-whatsapp__mark{width:9px;height:9px;border-radius:50%;background:#b71f3d;box-shadow:0 0 0 5px rgba(156,31,53,.14);flex:none}',
      'body.artimist-ask-open .artimist-whatsapp,body.artimist-dock-suppressed .artimist-whatsapp{opacity:0!important;pointer-events:none!important;transform:translateY(8px)!important}',
      '.st-scroll-cue{position:relative}.st-scroll-cue:empty::before,.st-scroll-cue:not(:has(svg))::before{content:"↓";display:grid;place-items:center;font:300 28px/1 Arial,sans-serif;color:currentColor}',
      '.artimist-reveal-heading{opacity:0;transform:translateY(28px);clip-path:inset(0 0 100% 0);transition:opacity .55s ease,transform .8s cubic-bezier(.2,.8,.2,1),clip-path 1.05s cubic-bezier(.2,.8,.2,1)}',
      '.artimist-reveal-heading.is-artimist-visible{opacity:1;transform:none;clip-path:inset(0)}',
      '.artimist-reveal-heading em,.artimist-type{display:inline;color:#c73f58!important;white-space:normal}',
      '@media(max-width:760px){.artimist-whatsapp{left:auto;right:14px;bottom:calc(14px + env(safe-area-inset-bottom));width:48px;min-height:48px;height:48px;padding:0}.artimist-whatsapp>span:last-child{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}.artimist-whatsapp__mark{width:22px;height:22px;background:transparent;box-shadow:none;border:1.5px solid #fff;border-radius:50%}.artimist-whatsapp__mark:after{content:"";display:block;width:6px;height:6px;border-left:1.5px solid #fff;transform:translate(0,15px) rotate(22deg)}}',
      '@media(prefers-reduced-motion:reduce){.artimist-whatsapp,.artimist-reveal-heading{transition:none}.artimist-reveal-heading{opacity:1;transform:none;clip-path:none}}'
    ].join('');
    document.head.appendChild(style);
  }

  function addPersistentCta() {
    if (document.querySelector('.artimist-whatsapp')) return;
    var link = document.createElement('a');
    link.className = 'artimist-whatsapp';
    link.href = makeHref();
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.setAttribute('aria-label', 'Talk to Artimist Productions on WhatsApp');
    link.innerHTML = '<span class="artimist-whatsapp__mark" aria-hidden="true"></span><span>Talk to the studio</span>';
    link.addEventListener('click', track);
    document.body.appendChild(link);
  }

  var HEADING_SELECTOR = 'main h1,main h2,.st-hero h1,.st-wording h2,.ed-hero h1,.ed-hero h2';
  var typographyObserver = null;

  function revealHeading(heading) {
    if (!heading || heading.dataset.artimistReveal === '1') return;
    heading.dataset.artimistReveal = '1';
    heading.classList.add('artimist-reveal-heading');
    Array.prototype.forEach.call(heading.querySelectorAll('em'), function (accent) {
      accent.classList.add('artimist-type');
    });
    if (typographyObserver) typographyObserver.observe(heading);
    else heading.classList.add('is-artimist-visible');
  }

  function enhanceTypography(scope) {
    var headings = [];
    if (scope && scope.nodeType === 1) {
      if (scope.matches && scope.matches(HEADING_SELECTOR)) headings.push(scope);
      if (scope.querySelectorAll) headings = headings.concat(Array.prototype.slice.call(scope.querySelectorAll(HEADING_SELECTOR)));
    } else {
      headings = Array.prototype.slice.call(document.querySelectorAll(HEADING_SELECTOR));
    }
    headings.forEach(revealHeading);
  }

  function initTypography() {
    if ('IntersectionObserver' in window) {
      typographyObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-artimist-visible');
          typographyObserver.unobserve(entry.target);
        });
      }, { threshold: .12, rootMargin: '0px 0px -7% 0px' });
    }
    enhanceTypography(document);
    window.setTimeout(function () {
      Array.prototype.forEach.call(document.querySelectorAll('.artimist-reveal-heading'), function (heading) {
        heading.classList.add('is-artimist-visible');
        if (typographyObserver) typographyObserver.unobserve(heading);
      });
    }, 1800);
  }

  function isActuallyOpen(node) {
    if (!node || node.hidden || node.getAttribute('aria-hidden') === 'true') return false;
    var style = window.getComputedStyle(node);
    if (style.display === 'none' || style.visibility === 'hidden' || parseFloat(style.opacity || '1') === 0) return false;
    var rect = node.getBoundingClientRect();
    return rect.width > 1 && rect.height > 1 && rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth;
  }

  function updateDockSafety() {
    // Keep the two conversion controls visible on normal page content.
    // Suppress only for an overlay that is explicitly open and actually visible.
    var overlays = Array.prototype.slice.call(document.querySelectorAll(
      '.site-index-panel.is-open,.ap-index.is-open,#indexPanel.is-open,[role="dialog"][open],dialog[open]'
    ));
    var overlayOpen = overlays.some(isActuallyOpen);
    document.body.classList.toggle('artimist-dock-suppressed', overlayOpen);
  }

  function init() {
    addStyle();
    addPersistentCta();
    initTypography();
    updateDockSafety();
    var queued = false;
    function schedule() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () { queued = false; updateDockSafety(); });
    }
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule, { passive: true });
    new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        Array.prototype.forEach.call(mutation.addedNodes, function (node) {
          if (node.nodeType === 1) enhanceTypography(node);
        });
      });
      schedule();
    }).observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['class','hidden','aria-hidden','open'] });
    addEventListener('click', schedule, true);
    addEventListener('keydown', schedule, true);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
