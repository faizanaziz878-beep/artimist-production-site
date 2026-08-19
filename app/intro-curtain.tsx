/**
 * Opening sequence.
 *
 * Rendered server-side so it covers the page on the very first paint — no
 * flash of the site before the mark appears. A blocking script in <head>
 * decides play/skip before anything is drawn, which keeps it out of React's
 * hydration path entirely and costs no client bundle.
 */

import { IntroMark } from "./intro-mark";

const decideScript = `(function(){
  var d = document.documentElement;
  var play = true;
  try {
    // The control room is a tool, not a brand moment. Never gate it.
    if (location.pathname.indexOf('/admin') === 0) play = false;
    if (sessionStorage.getItem('artimist-intro')) play = false;
    if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches) play = false;
    if (play) sessionStorage.setItem('artimist-intro', '1');
  } catch (e) {}
  d.setAttribute('data-intro', play ? 'play' : 'skip');
  if (!play) return;
  var end = function () {
    if (d.getAttribute('data-intro') !== 'play') return;
    d.setAttribute('data-intro', 'done');
  };
  var timer = setTimeout(end, 2600);
  var skip = function () { clearTimeout(timer); end(); };
  ['pointerdown', 'keydown', 'wheel', 'touchstart'].forEach(function (evt) {
    window.addEventListener(evt, skip, { once: true, passive: true });
  });
})();`;

export function IntroScript() {
  return <script dangerouslySetInnerHTML={{ __html: decideScript }} />;
}

export function IntroCurtain() {
  return (
    <div className="intro" aria-hidden="true">
      <div className="intro-paper" />
      <IntroMark />
      <span className="intro-stamp">Artimist / setting out</span>
      <span className="intro-skip">Tap to skip</span>
    </div>
  );
}
