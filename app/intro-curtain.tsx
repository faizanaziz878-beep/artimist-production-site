/**
 * Opening sequence.
 *
 * Rendered server-side so it covers the page on the very first paint — no
 * flash of the site before the mark appears. A blocking script in <head>
 * decides play/skip before anything is drawn, which keeps it out of React's
 * hydration path entirely and costs no client bundle.
 */

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
  var timer = setTimeout(end, 2950);
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
      <div className="intro-grid">
        <i className="v" /><i className="v" /><i className="v" /><i className="v" />
        <i className="h" /><i className="h" /><i className="h" />
      </div>
      <div className="intro-mark">
        <img className="intro-ink" src="/brand/mark-black.svg" alt="" width={1628} height={640} />
        <img className="intro-accent" src="/brand/mark-red.svg" alt="" width={1628} height={640} />
      </div>
      <span className="intro-sweep" />
      <span className="intro-skip">Tap to skip</span>
    </div>
  );
}
