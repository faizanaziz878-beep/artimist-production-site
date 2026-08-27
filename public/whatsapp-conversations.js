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
        window.gtag('event', 'whatsapp_click', {
          source: 'persistent_whatsapp',
          page_path: location.pathname,
          page_title: document.title
        });
      }
    } catch (error) {}
  }

  function addStyle() {
    if (document.getElementById('artimist-whatsapp-style')) return;
    var style = document.createElement('style');
    style.id = 'artimist-whatsapp-style';
    style.textContent = [
      '.artimist-whatsapp{position:fixed;left:22px;right:auto;bottom:22px;z-index:930;display:flex;align-items:center;justify-content:center;gap:10px;min-height:48px;padding:0 17px;border:1px solid rgba(255,255,255,.18);border-radius:999px;background:rgba(9,9,9,.92);color:#fff!important;text-decoration:none!important;box-shadow:0 16px 45px rgba(0,0,0,.34);-webkit-backdrop-filter:blur(18px) saturate(1.08);backdrop-filter:blur(18px) saturate(1.08);font:700 9px/1 Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase;transition:transform .22s ease,border-color .2s ease,opacity .2s ease}',
      '.artimist-whatsapp:hover{transform:translateY(-2px);border-color:rgba(217,100,118,.58)}',
      '.artimist-whatsapp__mark{width:9px;height:9px;border-radius:50%;background:#b71f3d;box-shadow:0 0 0 5px rgba(156,31,53,.14);flex:none}',
      'body.artimist-ask-open .artimist-whatsapp{opacity:0;pointer-events:none;transform:translateY(8px)}',
      '@media(max-width:760px){body{padding-bottom:calc(92px + env(safe-area-inset-bottom))}.artimist-whatsapp{left:12px;bottom:calc(14px + env(safe-area-inset-bottom));box-sizing:border-box;width:calc((100vw - 34px)/2);min-height:52px;height:52px;padding:0 10px;font-size:8.2px;letter-spacing:.065em}.askbot-launch{right:12px!important;left:auto!important;bottom:calc(14px + env(safe-area-inset-bottom))!important;box-sizing:border-box!important;width:calc((100vw - 34px)/2)!important;min-width:0!important;min-height:52px!important;height:52px!important;padding:0 12px!important;justify-content:center!important;gap:8px!important;white-space:nowrap!important}.askbot-panel{right:12px!important;left:12px!important;bottom:calc(82px + env(safe-area-inset-bottom))!important;width:auto!important;max-height:calc(100dvh - 112px)!important}.st-contact,.st-footer,.st-clients,.hdh-bottom,.practice-next,.partners-v2-close,.st-seo-authority,.ed-footer{padding-bottom:max(118px,calc(106px + env(safe-area-inset-bottom)))!important}}',
      '@media(max-width:390px){.artimist-whatsapp{left:10px;width:calc((100vw - 30px)/2);font-size:7.7px}.askbot-launch{right:10px!important;width:calc((100vw - 30px)/2)!important;font-size:7.7px!important;letter-spacing:.055em!important}}',
      '@media(prefers-reduced-motion:reduce){.artimist-whatsapp{transition:none}}'
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
    link.innerHTML = '<span class="artimist-whatsapp__mark" aria-hidden="true"></span><span>WhatsApp</span>';
    link.addEventListener('click', track);
    document.body.appendChild(link);
  }

  function init() {
    addStyle();
    addPersistentCta();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();