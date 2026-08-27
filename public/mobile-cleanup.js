(function () {
  'use strict';

  var isMobile = window.matchMedia && window.matchMedia('(max-width: 760px)').matches;
  if (!isMobile) return;

  var style = document.createElement('style');
  style.id = 'artimist-mobile-cleanup';
  style.textContent = `
    /* One mobile navigation position across every Artimist page. */
    .ap-header,
    .canonical-header,
    .st-header {
      position: fixed !important;
      top: 0 !important;
      left: 0 !important;
      right: 0 !important;
      width: 100% !important;
      min-height: 64px !important;
      padding: 10px 14px !important;
      z-index: 2147483000 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: space-between !important;
      transform: none !important;
      overflow: visible !important;
    }

    .ap-header,
    .canonical-header {
      background: rgba(9,9,9,.86) !important;
      border-bottom: 1px solid rgba(255,255,255,.09) !important;
      -webkit-backdrop-filter: blur(18px) saturate(1.1) !important;
      backdrop-filter: blur(18px) saturate(1.1) !important;
    }

    .ap-wordmark,
    .canonical-wordmark,
    .st-wordmark {
      position: relative !important;
      left: auto !important;
      top: auto !important;
      margin: 0 !important;
      z-index: 2 !important;
      flex: 0 0 auto !important;
    }

    .ap-primary-nav,
    .canonical-primary,
    .st-primary,
    .ap-header-right > .ap-pill:first-child,
    .ap-header-right > .ap-cta,
    .canonical-actions > .canonical-pill:first-child,
    .canonical-actions > .canonical-cta,
    .st-header [data-mode-toggle],
    .st-header .st-start-project {
      display: none !important;
    }

    .ap-header-right,
    .canonical-actions,
    .st-header-actions {
      position: relative !important;
      inset: auto !important;
      margin: 0 0 0 auto !important;
      padding: 0 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: flex-end !important;
      gap: 0 !important;
      z-index: 3 !important;
    }

    #apMenu,
    .canonical-actions button[aria-controls="site-index-panel"],
    #menuBtn,
    .st-menu-btn,
    button[aria-controls="indexPanel"] {
      position: relative !important;
      inset: auto !important;
      margin: 0 !important;
      min-width: auto !important;
      min-height: 40px !important;
      padding: 0 12px !important;
      border: 1px solid rgba(255,255,255,.18) !important;
      border-radius: 999px !important;
      background: rgba(10,10,10,.22) !important;
      color: #fff !important;
      font-size: 10px !important;
      line-height: 1 !important;
      letter-spacing: .13em !important;
      box-shadow: none !important;
      -webkit-appearance: none !important;
      appearance: none !important;
    }

    #apMenu svg,
    .canonical-actions button[aria-controls="site-index-panel"] svg,
    #menuBtn svg,
    .st-menu-btn svg {
      color: currentColor !important;
      stroke: currentColor !important;
      fill: none !important;
      width: 16px !important;
      height: 16px !important;
    }

    /* Remove floating decorative arrow-only controls on touch layouts. */
    .artimist-mobile-arrow-only {
      display: none !important;
    }

    /* Never allow iOS link/emoji blue to leak into our navigation icons. */
    .ap-shell a,
    .ap-shell button,
    .canonical-header a,
    .canonical-header button,
    .st a,
    .st button {
      -webkit-text-fill-color: currentColor;
    }

    .ap-index,
    .site-index-panel,
    .st-index,
    #indexPanel {
      z-index: 2147483640 !important;
    }
  `;
  document.head.appendChild(style);

  function cleanArrowNodes(root) {
    if (!root) return;
    var candidates = root.querySelectorAll('a,button,i,span');
    candidates.forEach(function (el) {
      var text = (el.textContent || '').replace(/[\s\uFE0E\uFE0F]/g, '');
      if (/^[↗↘↖↙➚➜➝➞➟➡]+$/.test(text)) {
        el.classList.add('artimist-mobile-arrow-only');
        return;
      }
      Array.prototype.forEach.call(el.childNodes, function (node) {
        if (node.nodeType !== Node.TEXT_NODE || !node.nodeValue) return;
        node.nodeValue = node.nodeValue
          .replace(/[\u2197\u2198\u2196\u2199]\uFE0F?/g, '')
          .replace(/\uFE0F/g, '');
      });
    });
  }

  cleanArrowNodes(document.body);

  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType === 1) cleanArrowNodes(node);
      });
    });
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
