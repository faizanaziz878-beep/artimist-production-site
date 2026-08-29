(() => {
  "use strict";

  const LEGACY_VISUALIZATION = "/architectural-visualization-services";
  const CANONICAL_VISUALIZATION = "/visualization";

  const ROUTE_CONTEXT = [
    [/^\/custom-house-design/, "custom house design and residential architecture"],
    [/^\/plan-modification-service/, "floor plan modification and residential design"],
    [/^\/3d-interior-design-service/, "residential interior design and 3D visualization"],
    [/^\/residential-renovation-permit-drawings/, "residential renovation and permit drawing support"],
    [/^\/architecture/, "architectural design and planning"],
    [/^\/bim-drafting/, "BIM, Revit and architectural drafting"],
    [/^\/architectural-drafting-services/, "architectural drafting"],
    [/^\/revit-drafting-services/, "Revit drafting and BIM documentation"],
    [/^\/bim-modeling-services/, "BIM modeling and coordination"],
    [/^\/permit-drawing-services/, "permit drawing and architectural documentation"],
    [/^\/construction-documentation-services/, "construction documentation"],
    [/^\/visualization/, "architectural visualization and 3D rendering"],
    [/^\/services\/architectural-rendering/, "architectural rendering"],
    [/^\/services\/3d-interior-rendering/, "3D interior rendering"],
    [/^\/services\/real-estate-rendering/, "real estate rendering and property visualization"],
    [/^\/services\/architectural-animation/, "architectural animation and walkthrough visualization"],
    [/^\/unreal-engine/, "Unreal Engine real-time architectural visualization"],
    [/^\/case-studies\//, "Artimist Productions project case study"],
    [/^\/usa/, "architecture, BIM and visualization services for United States projects"],
    [/^\/canada/, "residential design, BIM and visualization services for Canadian projects"],
    [/^\/uk/, "architecture, BIM and visualization services for UK projects"],
    [/^\/sweden/, "architecture and visualization services for Swedish projects"],
  ];

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

  function routeContext() {
    const path = location.pathname.replace(/\/$/, "") || "/";
    const match = ROUTE_CONTEXT.find(([pattern]) => pattern.test(path));
    return match ? match[1] : "architecture, interiors, BIM and visualization";
  }

  function semanticAltFor(img) {
    const src = (img.getAttribute("src") || "").toLowerCase();
    const context = routeContext();
    if (/permit|technical|board-/.test(src)) return `Architectural technical drawing and documentation by Artimist Productions — ${context}`;
    if (/homeint|drive-/.test(src)) return `Residential interior design and 3D visualization by Artimist Productions — ${context}`;
    if (/resext|resid/.test(src)) return `Residential architecture and exterior visualization by Artimist Productions — ${context}`;
    if (/rvpark/.test(src)) return `RV park site planning and architectural visualization by Artimist Productions`;
    if (/bowl-stroke/.test(src)) return `Hospitality architecture and interior visualization by Artimist Productions`;
    if (/music-campus/.test(src)) return `Cultural and educational architecture visualization by Artimist Productions`;
    if (/generated-architecture|\/atlas\//.test(src)) return `Architectural project study by Artimist Productions — ${context}`;
    return `Artimist Productions project image — ${context}`;
  }

  function improveImageSemantics(scope = document) {
    if (!scope.querySelectorAll || location.pathname === "/") return;
    scope.querySelectorAll("img").forEach((img) => {
      const alt = (img.getAttribute("alt") || "").trim();
      if (!alt || /^(image|project image|render|visual|published work)$/i.test(alt)) {
        img.setAttribute("alt", semanticAltFor(img));
      }
      if (!img.getAttribute("decoding")) img.setAttribute("decoding", "async");
    });
  }

  function run(scope = document) {
    normalizeLegacyVisualizationLinks(scope);
    normalizeBrandSemantics(scope);
    improveImageSemantics(scope);
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
