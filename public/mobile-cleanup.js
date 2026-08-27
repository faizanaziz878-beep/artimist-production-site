(function () {
  'use strict';

  var isMobile = window.matchMedia && window.matchMedia('(max-width: 760px)').matches;
  if (!isMobile) return;

  document.documentElement.setAttribute('data-artimist-mobile', '1');

  // Mobile layout is owned by the responsive CSS in the application. Keep this
  // file as a tiny compatibility loader only; never rewrite visible text, icons
  // or navigation in the DOM after React has rendered it.
  if (!document.querySelector('script[data-artimist-mobile-visual-breaks]')) {
    var visualScript = document.createElement('script');
    visualScript.src = '/mobile-visual-breaks.js';
    visualScript.defer = true;
    visualScript.setAttribute('data-artimist-mobile-visual-breaks', '1');
    document.head.appendChild(visualScript);
  }
})();
