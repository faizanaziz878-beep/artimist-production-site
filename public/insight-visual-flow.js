(function () {
  'use strict';

  var STYLE_ID = 'artimist-insight-visual-flow-style';

  function installStyle() {
    if (document.getElementById(STYLE_ID)) return;
    var style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
      .article[data-artimist-visual-flow="1"] .article-wrap {
        width: min(1240px, calc(100% - 44px)) !important;
      }
      .article[data-artimist-visual-flow="1"] .article-lead {
        max-width: 68ch !important;
        margin-bottom: 34px !important;
      }
      .article[data-artimist-visual-flow="1"] .article-quicknav {
        display: flex;
        gap: 8px;
        overflow-x: auto;
        padding: 0 0 20px;
        margin: 0 0 28px;
        scrollbar-width: none;
      }
      .article[data-artimist-visual-flow="1"] .article-quicknav::-webkit-scrollbar { display: none; }
      .article[data-artimist-visual-flow="1"] .article-quicknav a {
        flex: 0 0 auto;
        text-decoration: none;
        border: 1px solid rgba(255,255,255,.12);
        color: rgba(255,255,255,.68);
        padding: 9px 12px;
        font-size: 10px;
        line-height: 1;
        letter-spacing: .1em;
        text-transform: uppercase;
        border-radius: 999px;
        transition: border-color .25s ease, color .25s ease, background .25s ease;
      }
      .article[data-artimist-visual-flow="1"] .article-quicknav a:hover {
        border-color: rgba(212,94,115,.7);
        color: #fff;
        background: rgba(212,94,115,.09);
      }
      .article[data-artimist-visual-flow="1"] .article-sec {
        grid-template-columns: 64px minmax(0, 1fr) !important;
        gap: 26px !important;
        padding: 54px 0 !important;
        min-height: 0 !important;
        contain-intrinsic-size: 260px !important;
      }
      .article[data-artimist-visual-flow="1"] .article-sec-copy {
        max-width: 780px !important;
      }
      .article[data-artimist-visual-flow="1"] .article-sec h2 {
        font-size: clamp(34px, 4vw, 54px) !important;
        letter-spacing: -.035em !important;
        max-width: 16ch;
      }
      .article[data-artimist-visual-flow="1"] .article-sec p {
        font-size: 16px !important;
        line-height: 1.72 !important;
        max-width: 68ch;
      }
      .article[data-artimist-visual-flow="1"] .article-more {
        margin-top: 14px;
        border-top: 1px solid rgba(255,255,255,.09);
      }
      .article[data-artimist-visual-flow="1"] .article-more summary {
        cursor: pointer;
        list-style: none;
        padding: 14px 0 3px;
        color: #d45e73;
        font-size: 10px;
        font-weight: 700;
        letter-spacing: .13em;
        text-transform: uppercase;
      }
      .article[data-artimist-visual-flow="1"] .article-more summary::-webkit-details-marker { display: none; }
      .article[data-artimist-visual-flow="1"] .article-more summary::after {
        content: '+';
        display: inline-block;
        margin-left: 8px;
        color: rgba(255,255,255,.45);
      }
      .article[data-artimist-visual-flow="1"] .article-more[open] summary::after { content: '−'; }
      .article[data-artimist-visual-flow="1"] .article-more-body {
        padding: 8px 0 2px;
      }
      .article[data-artimist-visual-flow="1"] .article-inline-visual {
        margin: 6px 0 42px !important;
        border: 1px solid rgba(255,255,255,.12) !important;
        background: #0f0d0e !important;
        overflow: hidden !important;
      }
      .article[data-artimist-visual-flow="1"] .article-inline-visual img {
        aspect-ratio: 16 / 8.2 !important;
        object-fit: cover !important;
        transition: transform 1.2s cubic-bezier(.2,.7,.2,1), filter .5s ease;
        filter: saturate(.9) contrast(1.03);
      }
      .article[data-artimist-visual-flow="1"] .article-inline-visual:hover img {
        transform: scale(1.018);
        filter: saturate(1) contrast(1.05);
      }
      .article[data-artimist-visual-flow="1"] .article-inline-visual figcaption {
        min-height: 0 !important;
        display: grid !important;
        grid-template-columns: 170px 1fr;
        gap: 18px;
        align-items: start;
        padding: 14px 18px 16px !important;
      }
      .article[data-artimist-visual-flow="1"] .article-inline-visual figcaption span {
        margin: 0 !important;
      }
      .article[data-artimist-visual-flow="1"] .article-visual-grid:empty { display: none !important; }
      .article[data-artimist-visual-flow="1"] .article-take {
        margin-top: 50px !important;
        padding: 36px 38px !important;
        background: linear-gradient(135deg, rgba(153,38,54,.18), rgba(255,255,255,.018)) !important;
      }
      .article[data-artimist-visual-flow="1"] .article-actions {
        padding-top: 10px;
      }
      @media (min-width: 960px) {
        .article[data-artimist-visual-flow="1"] .article-inline-visual:nth-of-type(even) {
          margin-left: 8vw !important;
          width: calc(100% - 8vw) !important;
        }
        .article[data-artimist-visual-flow="1"] .article-inline-visual:nth-of-type(odd) {
          margin-right: 8vw !important;
          width: calc(100% - 8vw) !important;
        }
      }
      @media (max-width: 760px) {
        .article[data-artimist-visual-flow="1"] .article-wrap {
          width: min(100% - 28px, 1040px) !important;
        }
        .article[data-artimist-visual-flow="1"] .article-quicknav {
          margin-left: -2px;
          margin-right: -14px;
          padding-right: 14px;
        }
        .article[data-artimist-visual-flow="1"] .article-sec {
          grid-template-columns: 1fr !important;
          gap: 8px !important;
          padding: 38px 0 !important;
        }
        .article[data-artimist-visual-flow="1"] .article-sec h2 {
          font-size: 34px !important;
          max-width: none;
        }
        .article[data-artimist-visual-flow="1"] .article-inline-visual {
          margin: 2px 0 28px !important;
          width: 100% !important;
        }
        .article[data-artimist-visual-flow="1"] .article-inline-visual img {
          aspect-ratio: 4 / 3 !important;
        }
        .article[data-artimist-visual-flow="1"] .article-inline-visual figcaption {
          grid-template-columns: 1fr !important;
          gap: 6px !important;
        }
        .article[data-artimist-visual-flow="1"] .article-take {
          padding: 28px 22px !important;
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .article[data-artimist-visual-flow="1"] .article-inline-visual img { transition: none !important; }
      }
    `;
    document.head.appendChild(style);
  }

  function buildQuickNav(article, sections) {
    if (article.querySelector('.article-quicknav') || !sections.length) return;
    var nav = document.createElement('nav');
    nav.className = 'article-quicknav';
    nav.setAttribute('aria-label', 'Article sections');
    sections.forEach(function (section, index) {
      var heading = section.querySelector('h2');
      if (!heading) return;
      var id = section.id || ('article-section-' + (index + 1));
      section.id = id;
      var link = document.createElement('a');
      link.href = '#' + id;
      link.textContent = String(index + 1).padStart(2, '0') + ' · ' + heading.textContent;
      nav.appendChild(link);
    });
    var lead = article.querySelector('.article-lead');
    if (lead) lead.insertAdjacentElement('afterend', nav);
  }

  function foldLongCopy(section) {
    var copy = section.querySelector('.article-sec-copy');
    if (!copy || copy.querySelector('.article-more')) return;
    var paragraphs = Array.prototype.slice.call(copy.querySelectorAll(':scope > p'));
    if (paragraphs.length < 2) return;

    var details = document.createElement('details');
    details.className = 'article-more';
    var summary = document.createElement('summary');
    summary.textContent = 'Read technical detail';
    var body = document.createElement('div');
    body.className = 'article-more-body';
    paragraphs.slice(1).forEach(function (paragraph) { body.appendChild(paragraph); });
    details.appendChild(summary);
    details.appendChild(body);
    copy.appendChild(details);
  }

  function interleaveVisuals(article, sections) {
    var grid = article.querySelector('.article-visual-grid');
    if (!grid || grid.dataset.artimistInterleaved === '1') return;
    grid.dataset.artimistInterleaved = '1';
    var visuals = Array.prototype.slice.call(grid.querySelectorAll(':scope > .article-visual'));
    if (!visuals.length) return;

    var positions = [];
    if (sections.length <= 2) positions = [0, 1];
    else {
      for (var i = 0; i < visuals.length; i += 1) {
        positions.push(Math.min(sections.length - 1, Math.round(((i + 1) * sections.length) / (visuals.length + 1)) - 1));
      }
    }

    visuals.forEach(function (visual, index) {
      var target = sections[positions[index]] || sections[sections.length - 1];
      if (!target) return;
      visual.classList.add('article-inline-visual');
      target.insertAdjacentElement('afterend', visual);
    });
  }

  function enhanceArticle() {
    var article = document.querySelector('.article');
    if (!article || article.dataset.artimistVisualFlow === '1') return false;
    if (!location.pathname.startsWith('/insights/') || location.pathname === '/insights') return false;

    installStyle();
    article.dataset.artimistVisualFlow = '1';
    var sections = Array.prototype.slice.call(article.querySelectorAll('.article-sec'));
    buildQuickNav(article, sections);
    sections.forEach(foldLongCopy);
    interleaveVisuals(article, sections);
    return true;
  }

  var attempts = 0;
  var timer = setInterval(function () {
    attempts += 1;
    if (enhanceArticle() || attempts > 30) clearInterval(timer);
  }, 180);

  var observer = new MutationObserver(function () { enhanceArticle(); });
  observer.observe(document.documentElement, { childList: true, subtree: true });
  enhanceArticle();
})();
