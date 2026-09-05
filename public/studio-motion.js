/* Small, optional enhancements: no hidden content and no animation loop. */
(() => {
  "use strict";
  // The owner has locked homepage imagery, composition and motion.
  if ((location.pathname.replace(/\/$/, "") || "/") === "/") return;
  if (window.__artimistStudioMotion) return;
  window.__artimistStudioMotion = true;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
  const seen = new WeakSet();
  const zoomed = new WeakSet();
  const galleries = new Map();
  const reveal = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    reveal.unobserve(entry.target);
    if (!reduced.matches) entry.target.animate([
      { opacity: 0.35, translate: "0 22px" },
      { opacity: 1, translate: "0 0" }
    ], { duration: 720, easing: "cubic-bezier(.2,.7,.2,1)" });
  }), { threshold: 0.08 });
  let dialog;
  function openImage(image, caption, trigger) {
    if (!dialog) {
      dialog = document.createElement("dialog");
      dialog.className = "astra-image-dialog";
      dialog.setAttribute("aria-label", "Enlarged studio image");
      const close = document.createElement("button");
      close.type = "button"; close.textContent = "×"; close.setAttribute("aria-label", "Close image");
      close.addEventListener("click", () => dialog.close());
      dialog.append(close, document.createElement("img"), document.createElement("p"));
      dialog.addEventListener("click", event => { if (event.target === dialog) {
        const rect = dialog.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
      } });
      document.body.append(dialog);
    }
    const large = dialog.querySelector("img");
    large.src = image.currentSrc || image.src; large.alt = image.alt;
    dialog.querySelector("p").textContent = caption || image.alt;
    dialog.addEventListener("close", () => trigger.isConnected && trigger.focus({ preventScroll: true }), { once: true });
    dialog.showModal();
  }
  function install() {
    document.querySelectorAll(".servicesx-group, .servicesx-intro, .lp2-intro>div, .lp2-split-copy, .lp2-proof figure, .hsp-sec, .hsp-journey header, .astra-explorer-intro").forEach(el => {
      if (seen.has(el)) return; seen.add(el); reveal.observe(el);
    });
    document.querySelectorAll(".lp2-opening-proof figure, .hsp-journey figure, .hsp-visual, .servicesx-group figure, .aboutx-workband figure, .teamx-capability-media figure, .sp-input-gallery figure, .article-visual").forEach(figure => {
      if (zoomed.has(figure) || figure.closest("a")) return;
      const img = figure.querySelector("img");
      if (!img) return;
      zoomed.add(figure);
      const button = document.createElement("button");
      button.type = "button"; button.className = "astra-zoom"; button.textContent = "⤢";
      button.setAttribute("aria-label", "Enlarge image: " + (img.alt || "studio visual"));
      button.addEventListener("click", () => openImage(img, figure.querySelector("figcaption")?.textContent, button));
      figure.append(button);
    });
    document.querySelectorAll(".lp2-opening-proof, .hsp-journey>div, .aboutx-workband, .teamx-capability-media, .sp-input-gallery>div").forEach(track => {
      if (galleries.has(track)) return;
      const items = Array.from(track.querySelectorAll(":scope>figure"));
      if (items.length < 2) return;
      const controls = document.createElement("div");
      controls.className = "astra-gallery-tools"; controls.setAttribute("aria-label", "Image sequence controls");
      const prev = document.createElement("button"), next = document.createElement("button"), count = document.createElement("output");
      prev.type = next.type = "button"; prev.textContent = "←"; next.textContent = "→";
      prev.setAttribute("aria-label", "Previous image"); next.setAttribute("aria-label", "Next image");
      count.setAttribute("aria-label", "Current image");
      controls.append(prev, count, next); track.after(controls);
      let current = 0;
      const update = () => {
        controls.hidden = track.scrollWidth <= track.clientWidth + 4;
        const left = track.getBoundingClientRect().left;
        current = items.reduce((best, item, i) => Math.abs(item.getBoundingClientRect().left - left) < Math.abs(items[best].getBoundingClientRect().left - left) ? i : best, 0);
        count.textContent = String(current + 1).padStart(2, "0") + " / " + String(items.length).padStart(2, "0");
        prev.disabled = current === 0; next.disabled = current === items.length - 1;
      };
      const move = delta => {
        const item = items[Math.max(0, Math.min(items.length - 1, current + delta))];
        track.scrollTo({ left: track.scrollLeft + item.getBoundingClientRect().left - track.getBoundingClientRect().left - parseFloat(getComputedStyle(track).paddingLeft), behavior: reduced.matches ? "instant" : "smooth" });
      };
      prev.addEventListener("click", () => move(-1)); next.addEventListener("click", () => move(1));
      track.addEventListener("scroll", update, { passive: true });
      const resize = new ResizeObserver(update); resize.observe(track);
      galleries.set(track, { resize, controls }); update();
    });
    for (const [track, state] of galleries) if (!track.isConnected) {
      state.resize.disconnect(); state.controls.remove(); galleries.delete(track);
    }
  }
  let scheduled = false;
  new MutationObserver(mutations => {
    if (scheduled || !mutations.some(m => Array.from(m.addedNodes).some(n => n.nodeType === 1) || Array.from(m.removedNodes).some(n => n.nodeType === 1))) return;
    scheduled = true; requestAnimationFrame(() => { scheduled = false; install(); });
  }).observe(document.body, { childList: true, subtree: true });
  reduced.addEventListener("change", () => {
    if (reduced.matches) document.getAnimations().forEach(animation => {
      if (animation.effect?.target?.closest(".astra-explorer, .lp2, .hsp, .servicesx") && animation.effect.getTiming().iterations !== Infinity) animation.finish();
    });
  });
  install();
})();
