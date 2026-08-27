(function () {
  'use strict';

  var isMobile = window.matchMedia && window.matchMedia('(max-width: 760px)').matches;
  if (!isMobile) return;

  var style = document.createElement('style');
  style.id = 'artimist-mobile-cleanup';
  style.textContent = `
    .ap-header,.canonical-header,.st-header{position:fixed!important;top:0!important;left:0!important;right:0!important;width:100%!important;min-height:64px!important;padding:10px 14px!important;z-index:2147483000!important;display:flex!important;align-items:center!important;justify-content:space-between!important;transform:none!important;overflow:visible!important;background:rgba(9,9,9,.88)!important;border-bottom:1px solid rgba(255,255,255,.09)!important;-webkit-backdrop-filter:blur(18px) saturate(1.1)!important;backdrop-filter:blur(18px) saturate(1.1)!important}
    .ap-wordmark,.canonical-wordmark,.st-wordmark{position:relative!important;left:auto!important;top:auto!important;right:auto!important;margin:0!important;z-index:2!important;flex:0 0 auto!important}
    .ap-primary-nav,.canonical-primary,.st-nav,.ap-header-right>.ap-pill:first-child,.ap-header-right>.ap-cta,.canonical-actions>.canonical-pill:first-child,.canonical-actions>.canonical-cta,.st-head-right>#modeBtn,.st-head-right>.st-cta{display:none!important}
    .ap-header-right,.canonical-actions,.st-head-right{position:relative!important;inset:auto!important;margin:0 0 0 auto!important;padding:0!important;display:flex!important;align-items:center!important;justify-content:flex-end!important;gap:0!important;z-index:3!important;width:auto!important}
    #apMenu,.canonical-actions button[aria-controls="site-index-panel"],#menuBtn,button[aria-controls="indexPanel"]{position:relative!important;inset:auto!important;margin:0!important;min-width:auto!important;min-height:40px!important;padding:0 12px!important;border:1px solid rgba(255,255,255,.18)!important;border-radius:999px!important;background:rgba(10,10,10,.22)!important;color:#fff!important;font-size:10px!important;line-height:1!important;letter-spacing:.13em!important;box-shadow:none!important;-webkit-appearance:none!important;appearance:none!important}
    #apMenu svg,.canonical-actions button[aria-controls="site-index-panel"] svg,#menuBtn svg{color:currentColor!important;stroke:currentColor!important;fill:none!important;width:16px!important;height:16px!important}

    /* Keep the secondary practice navigation compact, single-line and scrollable. */
    .practice-local-nav,.about-v2-index,.founder-v2-index,.services-v2-index{position:sticky!important;top:64px!important;z-index:80!important;width:100%!important;max-width:none!important;height:48px!important;min-height:48px!important;margin:0!important;padding:0 14px!important;display:flex!important;align-items:center!important;gap:20px!important;overflow-x:auto!important;overflow-y:hidden!important;white-space:nowrap!important;flex-wrap:nowrap!important;scrollbar-width:none!important;-webkit-overflow-scrolling:touch!important;border-bottom:1px solid rgba(16,16,16,.14)!important}
    .practice-local-nav::-webkit-scrollbar,.about-v2-index::-webkit-scrollbar,.founder-v2-index::-webkit-scrollbar,.services-v2-index::-webkit-scrollbar{display:none!important}
    .practice-local-nav span,.about-v2-index span,.founder-v2-index span{display:none!important}
    .practice-local-nav a,.about-v2-index a,.founder-v2-index a,.services-v2-index a{flex:0 0 auto!important;min-height:48px!important;height:48px!important;padding:0!important;display:inline-flex!important;align-items:center!important;font-size:10px!important;line-height:1!important;letter-spacing:.09em!important;background:transparent!important;border:0!important}
    .practice-page,.about-v2,.founder-v2,.services-v2{scroll-padding-top:122px!important}

    /* No emoji arrows, ever. Controlled SVG/CSS only. */
    .artimist-mobile-arrow-only,.practice-scope-list article>a,.ap-index-list a>i,.st-index-list a>i,.site-index-sheet li a>i{display:none!important}
    .practice-scope-list article{grid-template-columns:34px 1fr!important;gap:14px!important}
    .practice-opening-copy a::after,.practice-next a::after,.services-v2-story>a::after,.practice-feature a::after{content:''!important;display:inline-block!important;width:7px!important;height:7px!important;margin-left:9px!important;border-top:1px solid currentColor!important;border-right:1px solid currentColor!important;transform:rotate(45deg)!important;vertical-align:1px!important}
    .st-rail,.practice-scroll{display:none!important}
    .ap-shell a,.ap-shell button,.canonical-header a,.canonical-header button,.st a,.st button,.practice-page a,.practice-page button{-webkit-text-fill-color:currentColor!important;text-decoration-color:currentColor!important}
    .ap-index,.site-index-panel,.st-index,#indexPanel{z-index:2147483640!important}

    /* Restrained mobile motion: visual movement without making the page noisy. */
    .practice-editorial-art img,.practice-gallery img,.services-v2-media img,.about-v2-film img{animation:artimistMobileDrift 14s ease-in-out infinite alternate!important;will-change:transform}
    .practice-scope{position:relative!important;background-image:radial-gradient(circle at 85% 12%,rgba(156,31,53,.10),transparent 34%)!important;background-size:130% 130%!important;animation:artimistAmbient 14s ease-in-out infinite alternate!important}
    .practice-scope-list article{transition:transform .45s ease,background .45s ease!important}
    .practice-scope-list article:active{transform:translateX(5px)!important;background:rgba(255,255,255,.035)!important}
    @keyframes artimistMobileDrift{from{transform:scale(1.015) translate3d(0,0,0)}to{transform:scale(1.045) translate3d(0,-7px,0)}}
    @keyframes artimistAmbient{from{background-position:20% 20%}to{background-position:80% 70%}}
    @media(prefers-reduced-motion:reduce){.practice-editorial-art img,.practice-gallery img,.services-v2-media img,.about-v2-film img,.practice-scope{animation:none!important}}
  `;
  document.head.appendChild(style);

  function stripDirectionalGlyphs(scope) {
    if (!scope) return;
    var walker = document.createTreeWalker(scope, NodeFilter.SHOW_TEXT);
    var node;
    while ((node = walker.nextNode())) {
      if (!node.nodeValue) continue;
      node.nodeValue = node.nodeValue
        .replace(/[↗↘↖↙➡➚➜➝➞➟⬆⬈]\uFE0F?/g, '')
        .replace(/\uFE0F/g, '');
    }
  }

  function cleanArrowNodes(root) {
    if (!root || !root.querySelectorAll) return;
    stripDirectionalGlyphs(root);
    root.querySelectorAll('a,button,i,span').forEach(function (el) {
      var text = (el.textContent || '').replace(/[\s\uFE0E\uFE0F]/g, '');
      if (/^[↗↘↖↙➚➜➝➞➟➡⬆⬈]+$/.test(text)) el.classList.add('artimist-mobile-arrow-only');
    });
  }

  cleanArrowNodes(document.body);
  var observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      mutation.addedNodes.forEach(function (node) {
        if (node.nodeType === 1) cleanArrowNodes(node);
        if (node.nodeType === 3 && node.parentNode) stripDirectionalGlyphs(node.parentNode);
      });
    });
  });
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
