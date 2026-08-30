/**
 * Opening sequence.
 *
 * The branded curtain is now reserved for the studio/home and visual archive.
 * Search/service/contact visitors should reach useful content immediately.
 */

import { IntroMark } from "./intro-mark";

const decideScript = `(function(){
  var d = document.documentElement;
  var path = location.pathname || '/';
  var savedTheme = null;
  try { savedTheme = localStorage.getItem('artimist-editorial-theme'); } catch (e) {}
  if (!savedTheme && window.matchMedia) savedTheme = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  d.setAttribute('data-theme', savedTheme === 'light' ? 'light' : 'dark');
  var brandMoment = path === '/' || path === '/visual-archive';
  var play = brandMoment;
  try {
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
  var timer = setTimeout(end, 1850);
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
