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
    var keys = Object.keys(SERVICE_LABELS).filter(function (k) { return k !== '/'; });
    for (var i = 0; i < keys.length; i++) if (path.indexOf(keys[i]) === 0) return SERVICE_LABELS[keys[i]];
    var h1 = document.querySelector('h1');
    if (h1 && h1.textContent) return h1.textContent.trim().replace(/\s+/g, ' ').slice(0, 90);
    return 'a project with Artimist Productions';
  }

  function makeHref(source) {
    var text = 'Hi Artimist Productions — I’m interested in ' + currentTopic() + ' and would like to discuss a project.';
    if (source) text += ' I came from ' + source + '.';
    return 'https://wa.me/' + NUMBER + '?text=' + encodeURIComponent(text);
  }

  function track(source) {
    try { if (typeof window.gtag === 'function') window.gtag('event', 'whatsapp_click', { source: source || 'site_whatsapp', page_path: location.pathname, page_title: document.title }); } catch (err) {}
  }

  function isConversationLink(a) {
    if (!a || !a.textContent || a.closest('form')) return false;
    var text = a.textContent.replace(/\s+/g, ' ').trim().toLowerCase();
    return /(start a conversation|talk to|talk with|chat with|chat to|speak with|speak to|get in touch|contact us|contact the studio|discuss (this|your|a|the|project|service)|have a question|message (us|the studio)|whatsapp)/i.test(text);
  }

  function wireConversationLinks(root) {
    var links = (root || document).querySelectorAll ? (root || document).querySelectorAll('a') : [];
    Array.prototype.forEach.call(links, function (a) {
      if (!isConversationLink(a) || a.dataset.artimistWhatsapp === '1') return;
      a.dataset.artimistWhatsapp = '1';
      a.href = makeHref('the ' + (a.textContent || 'conversation link').replace(/\s+/g, ' ').trim().slice(0, 50));
      a.target = '_blank'; a.rel = 'noopener noreferrer';
      a.addEventListener('click', function () { track('conversation_cta'); });
    });
  }

  function syncAskControls() {
    var studioAsk = document.querySelector('.st-ask-btn');
    document.body.classList.toggle('artimist-has-studio-ask', !!studioAsk);
    document.body.classList.toggle('artimist-studio-ask-open', !!(studioAsk && studioAsk.classList.contains('is-open')));
  }

  function addStyle() {
    if (document.getElementById('artimist-whatsapp-style')) return;
    var style = document.createElement('style'); style.id = 'artimist-whatsapp-style';
    style.textContent = [
      '.artimist-whatsapp{position:fixed;right:22px;bottom:22px;z-index:2147483200;display:flex;align-items:center;gap:12px;padding:12px 16px 12px 13px;border:1px solid rgba(255,255,255,.16);border-radius:999px;background:rgba(9,9,9,.90);color:#fff!important;text-decoration:none!important;box-shadow:0 16px 45px rgba(0,0,0,.34);-webkit-backdrop-filter:blur(18px) saturate(1.08);backdrop-filter:blur(18px) saturate(1.08);font-family:Arial,sans-serif;transition:transform .24s ease,border-color .2s ease,background .2s ease,bottom .28s ease,opacity .2s ease}',
      '.artimist-whatsapp:hover{transform:translateY(-2px);border-color:rgba(217,100,118,.55);background:rgba(12,12,12,.96)}',
      '.artimist-whatsapp__mark{width:10px;height:10px;border-radius:50%;background:#9c1f35;box-shadow:0 0 0 5px rgba(156,31,53,.13);flex:none}',
      '.artimist-whatsapp__copy{display:flex;flex-direction:column;gap:2px;line-height:1}',
      '.artimist-whatsapp__copy small{font-size:7px;letter-spacing:.18em;color:rgba(255,255,255,.52);text-transform:uppercase}',
      '.artimist-whatsapp__copy strong{font-size:10px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap}',
      '.askbot-launch{display:none!important}',
      'body.artimist-has-studio-ask .artimist-whatsapp{bottom:86px}',
      'body.artimist-studio-ask-open .artimist-whatsapp{opacity:0;pointer-events:none;transform:translateY(8px)}',
      '@media(max-width:760px){.artimist-whatsapp{right:14px;bottom:calc(14px + env(safe-area-inset-bottom));padding:10px 13px 10px 11px;gap:9px;max-width:calc(100vw - 28px)}.artimist-whatsapp__copy strong{font-size:9px}.artimist-whatsapp__copy small{font-size:6px}body.artimist-has-studio-ask .artimist-whatsapp{bottom:calc(82px + env(safe-area-inset-bottom))}.st-ask-btn{right:14px!important;bottom:calc(14px + env(safe-area-inset-bottom))!important}.st-ask{right:14px!important;left:14px!important;bottom:calc(72px + env(safe-area-inset-bottom))!important;width:auto!important}}',
      '@media(prefers-reduced-motion:reduce){.artimist-whatsapp{transition:none}}'
    ].join(''); document.head.appendChild(style);
  }

  function addPersistentCta() {
    if (document.querySelector('.artimist-whatsapp')) return;
    var a = document.createElement('a'); a.className = 'artimist-whatsapp'; a.href = makeHref('the website'); a.target = '_blank'; a.rel = 'noopener noreferrer'; a.setAttribute('aria-label', 'Talk to Artimist Productions on WhatsApp');
    a.innerHTML = '<span class="artimist-whatsapp__mark" aria-hidden="true"></span><span class="artimist-whatsapp__copy"><small>WhatsApp</small><strong>Talk to the studio</strong></span>';
    a.addEventListener('click', function () { track('persistent_whatsapp'); }); document.body.appendChild(a);
  }

  function init() {
    addStyle(); wireConversationLinks(document); addPersistentCta(); syncAskControls();
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) { Array.prototype.forEach.call(mutation.addedNodes || [], function (node) { if (node.nodeType === 1) wireConversationLinks(node); }); }); syncAskControls();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
