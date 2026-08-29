(() => {
  "use strict";

  const LEGACY_VISUALIZATION = "/architectural-visualization-services";
  const CANONICAL_VISUALIZATION = "/visualization";

  function normalizeLegacyVisualizationLinks(scope = document) {
    const links = scope.querySelectorAll ? scope.querySelectorAll(`a[href="${LEGACY_VISUALIZATION}"]`) : [];
    links.forEach((link) => {
      if (location.pathname.replace(/\/$/, "") === CANONICAL_VISUALIZATION) {
        const parent = link.closest(".lp2-related");
        if (parent) {
          link.remove();
          return;
        }
      }
      link.setAttribute("href", CANONICAL_VISUALIZATION);
    });
  }

  function normalizeBrandSemantics(scope = document) {
    if (!scope.querySelectorAll) return;
    scope.querySelectorAll('.intro-art[aria-label="Artimist Production"]').forEach((node) => {
      node.setAttribute("aria-label", "Artimist Productions");
    });
  }

  function run(scope = document) {
    normalizeLegacyVisualizationLinks(scope);
    normalizeBrandSemantics(scope);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", () => run());
  else run();

  new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      mutation.addedNodes.forEach((node) => {
        if (node.nodeType === 1) run(node);
      });
    });
  }).observe(document.documentElement, { childList: true, subtree: true });
})();
