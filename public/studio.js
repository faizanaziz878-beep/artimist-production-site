/* ============================================================================
   Artimist studio experience — behaviour.

   Vanilla, no dependencies, no build step. Everything degrades: if this file
   fails to load the page is still readable, the form still posts, and every
   section is visible.
   ========================================================================== */
(function () {
  'use strict';

  var root = document.querySelector('.st');
  if (!root) return;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- data ------------------------------------------------------------ */
  var D = '/media/design/';

  var SCENES = [
    { image: D + 'tropical-club-01.webp', label: 'HOSPITALITY / WELLNESS', note: 'Landscape, movement and social life' },
    { image: D + 'cultural-campus-01.webp', label: 'PUBLIC / ARCHITECTURE', note: 'A district made from civic rooms' },
    { image: D + 'drive-09.png', label: 'RESIDENTIAL / INTERIOR', note: 'Light, material and quiet precision' },
    { image: D + 'drive-12.png', label: 'HOSPITALITY / ADAPTIVE REUSE', note: 'Old fabric, new atmosphere' }
  ];

  var WALL = [
    { img: D + 'waterfront-foundry-02.webp', title: 'Waterfront Foundry', meta: 'HOSPITALITY / ADAPTIVE REUSE', href: '#archive' },
    { img: D + 'cultural-campus-02.webp', title: 'Cultural Campus', meta: 'PUBLIC / ARCHITECTURE', href: '#archive' },
    { img: D + 'tropical-club-02.webp', title: 'Tropical Club', meta: 'HOSPITALITY / WELLNESS', href: '#archive' },
    { img: D + 'city-apartment-01.webp', title: 'City Apartment', meta: 'RESIDENTIAL / INTERIOR', href: '#archive' },
    { img: D + 'patisserie-01.webp', title: 'Patisserie', meta: 'RETAIL / F&B', href: '#archive' }
  ];

  var ROWS = [
    { no: '01', img: D + 'airside-district-01.webp', tags: 'Masterplan · Architecture · Visualization', title: 'Airside District', copy: 'A mixed-use district organised around civic rooms, arrival sequences and a continuous public ground.', meta: 'UNITED STATES / 2026' },
    { no: '02', img: D + 'marina-arts-center-01.webp', tags: 'Culture · Real-time · Unreal', title: 'Marina Arts Center', copy: 'A waterfront arts building developed as a real-time environment so the client could walk it before committing.', meta: 'EUROPE / 2026' },
    { no: '03', img: D + 'water-research-01.webp', tags: 'Research · Parametric · Lab', title: 'Water Research Station', copy: 'A parametric shell study driven by daylight, prevailing wind and the rhythm of the tidal edge.', meta: 'RESEARCH / 2026' },
    { no: '04', img: D + 'tropical-club-03.webp', tags: 'Hospitality · Interior · Landscape', title: 'Tropical Club', copy: 'Pool, pavilion and planting treated as one social landscape rather than three separate packages.', meta: 'ASIA PACIFIC / 2026' },
    { no: '05', img: D + 'waterfront-foundry-02.webp', tags: 'Hospitality · Adaptive Reuse · Visualization', title: 'Waterfront Foundry', copy: 'A brick industrial shell reimagined as a layered waterfront destination for culture, food and gathering.', meta: 'NORTH AMERICA / 2026' },
    { no: '06', img: D + 'city-apartment-02.webp', tags: 'Residential · Interior', title: 'City Apartment', copy: 'A compact urban interior resolved through material warmth, storage discipline and borrowed light.', meta: 'EUROPE / 2026' }
  ];

  var DISCIPLINES = [
    { no: '01', title: 'Architecture & Interior', copy: 'Concept, planning, residential and commercial architecture, interiors, landscape and documentation support.', href: '/services' },
    { no: '02', title: 'Visualization & Motion', copy: 'Photoreal stills, animation and cinematic direction for architecture, development, hospitality and campaigns.', href: '/services/architectural-animation' },
    { no: '03', title: 'BIM & Production', copy: 'Revit, CAD, Scan to BIM, format conversion and coordinated drawing support inside your own standards.', href: '/services' },
    { no: '04', title: 'Unreal & Interactive', copy: 'Real-time walkthroughs, interactive environments, immersive sales tools and digital twins.', href: '/unreal-engine' },
    { no: '05', title: 'Brand, Web & Commerce', copy: 'Identity, product, packaging, websites, campaigns and e-commerce production under one direction.', href: '/contact' },
    { no: '06', title: 'Research & Experiment', copy: 'Parametric studies, spatial systems, material tests and experimental digital work.', href: '/visual-archive' }
  ];

  var PLANS = [
    { name: 'Core', price: '$2,000', tag: 'For a focused workstream', desc: 'Consistent senior production support for a defined queue of architecture, BIM, visualization or design tasks.', features: ['One active priority at a time', 'Up to 80 production hours', 'Weekly progress review', 'Unlimited request queue', 'Standard turnaround', 'NDA available'] },
    { name: 'Studio', price: '$3,500', tag: 'Most chosen', featured: true, desc: 'A flexible multidisciplinary team for projects that move between design, technical production and presentation.', features: ['Two active priorities', 'Up to 140 production hours', 'Dedicated project lead', 'Twice-weekly updates', 'Priority turnaround', 'NDA + source-file handover'] },
    { name: 'Embedded', price: '$6,000', tag: 'For continuous delivery', desc: 'A senior team working inside your rhythm, standards and tooling as an extension of your own studio.', features: ['Parallel workstreams', 'Up to 260 production hours', 'Named lead + second reviewer', 'Daily contact window', 'Fastest turnaround', 'Full source-file handover'] }
  ];

  var TEAM = [
    ['Faizan Aziz', 'Founder & Creative Director', 'faizan-founder-hd.webp'],
    ['Mahnoor Shiekh', 'Interior Architect & 3D Visualizer', 'mahnoor.webp'],
    ['Jannat Niaz', 'Architectural Designer', 'jannat.webp'],
    ['Aden Mansoor', 'Project Lead Architect', 'aden-profile-2026.webp'],
    ['Sufyan Ilyas', 'Studio Collaborator', 'sufyan-team-2026.webp'],
    ['Zarmeen Khan', 'People & Operations', 'zarmeen.webp'],
    ['Abdur Rehman', '2D / 3D Animator & Graphics', 'abdur-profile-2026.webp'],
    ['Farwa Kashif', 'Revit / BIM / CAD Expert', 'farwa-profile-2026.webp'],
    ['Hanan Shahid', 'Unreal Engine Engineer & Architect', 'hanan-profile-2026.webp'],
    ['Rohma Fatima', 'Multidisciplinary Studio Team', 'rohma-profile-2026.webp'],
    ['Eunica Amir', 'Multidisciplinary Studio Team', 'eunica-profile-2026.webp'],
    ['Ezza Shahid', 'Interior Designer', 'ezza.jpeg'],
    ['Shumail', 'Studio Collaborator', 'shumail-profile-2026.webp'],
    ['Hamza Rizwan', 'Interior Designer — SketchUp & CAD', 'hamza-rizwan.webp']
  ];

  var CLIENTS = [
    { name: 'Yellow Productions' }, { name: 'Johnny Beig' },
    { name: 'Dioz Group', img: D + 'dioz-group.png' },
    { name: 'Label Beauty Group', img: D + 'hummane.png' },
    { name: 'Alaskan Made', img: D + 'alaskan-made.webp' },
    { name: 'Commune' }
  ];

  var SECTIONS = [
    ['Spatial portal', '#portal'], ['Selected work', '#work'], ['Complete index', '#archive'],
    ['Disciplines', '#disciplines'], ['Real-time', '#realtime'], ['Animation', '#animation'],
    ['Studio team', '#team'], ['Plans', '#plans'], ['Project brief', '#brief'],
    ['Clients', '#clients'], ['Contact', '#contact']
  ];

  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function byId(id) { return document.getElementById(id); }

  /* ---- render lists ---------------------------------------------------- */
  var scenesHost = byId('scenes');
  SCENES.forEach(function (s, i) {
    var d = el('div', 'st-hero-scene' + (i === 0 ? ' is-on' : ''));
    d.style.backgroundImage = 'url(' + s.image + ')';
    d.setAttribute('role', 'img');
    d.setAttribute('aria-label', s.label);
    scenesHost.appendChild(d);
  });

  var wall = byId('wall');
  WALL.forEach(function (w) {
    wall.insertAdjacentHTML('beforeend',
      '<a href="' + w.href + '"><img src="' + w.img + '" alt="' + esc(w.title) + '" loading="lazy">' +
      '<figcaption><h3>' + esc(w.title) + '</h3><small>' + esc(w.meta) + '</small></figcaption></a>');
  });

  var rows = byId('rows');
  ROWS.forEach(function (r) {
    rows.insertAdjacentHTML('beforeend',
      '<article class="st-row" data-reveal>' +
        '<div class="st-row-media"><img src="' + r.img + '" alt="' + esc(r.title) + '" loading="lazy"><span class="st-row-no">' + r.no + '</span></div>' +
        '<div><p class="st-row-tags">' + esc(r.tags) + '</p><h3>' + esc(r.title) + '</h3>' +
        '<p>' + esc(r.copy) + '</p><p class="st-row-meta">' + esc(r.meta) + '</p></div>' +
      '</article>');
  });

  var dl = byId('disciplineList');
  DISCIPLINES.forEach(function (d) {
    dl.insertAdjacentHTML('beforeend',
      '<a href="' + d.href + '"><small>' + d.no + '</small><h3>' + esc(d.title) + '</h3>' +
      '<i style="font-style:normal">&#8599;</i><p>' + esc(d.copy) + '</p></a>');
  });

  var planGrid = byId('planGrid');
  PLANS.forEach(function (p) {
    planGrid.insertAdjacentHTML('beforeend',
      '<article class="st-plan' + (p.featured ? ' is-featured' : '') + '">' +
        '<span class="st-plan-tag">' + esc(p.tag) + '</span>' +
        '<h3>' + esc(p.name) + '</h3><div class="st-plan-price">' + esc(p.price) + '</div>' +
        '<p>' + esc(p.desc) + '</p><ul>' +
        p.features.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') +
        '</ul><a href="#brief">Choose ' + esc(p.name) + '</a></article>');
  });

  /* team ring — evenly spaced around a circle, starting at the top */
  var ring = byId('ring');
  byId('teamCount').textContent = String(TEAM.length);
  TEAM.forEach(function (m, i) {
    var a = (i / TEAM.length) * Math.PI * 2 - Math.PI / 2;
    var node = el('article', 'st-member');
    node.style.left = (50 + Math.cos(a) * 39).toFixed(2) + '%';
    node.style.top = (50 + Math.sin(a) * 39).toFixed(2) + '%';
    node.innerHTML =
      '<div class="st-portrait" data-tilt><span><img src="/media/team/' + m[2] + '" alt="' + esc(m[0]) + '" loading="lazy"></span></div>' +
      '<div class="st-member-card"><small>' + esc(m[1]) + '</small><b>' + esc(m[0]) + '</b></div>';
    ring.appendChild(node);
  });

  /* clients marquee — the list is duplicated so the loop is seamless */
  var marquee = byId('marquee');
  function clientCell(c) {
    return '<div class="st-client">' + (c.img
      ? '<img src="' + c.img + '" alt="' + esc(c.name) + '" loading="lazy">'
      : esc(c.name)) + '</div>';
  }
  marquee.innerHTML = CLIENTS.map(clientCell).join('') + CLIENTS.map(clientCell).join('');

  var indexList = byId('indexList');
  SECTIONS.forEach(function (s, i) {
    indexList.insertAdjacentHTML('beforeend',
      '<a href="' + s[1] + '" data-index-link><small>' + String(i + 1).padStart(2, '0') + '</small>' +
      '<span>' + esc(s[0]) + '</span><i style="font-style:normal;color:rgba(255,255,255,.4);font-size:10px">&#8599;</i></a>');
  });

  var rail = byId('rail');
  SECTIONS.forEach(function (s) {
    rail.insertAdjacentHTML('beforeend',
      '<a href="' + s[1] + '" title="' + esc(s[0]) + '"><small>' + esc(s[0]) + '</small><i></i></a>');
  });

  /* ---- hero scene rotator ---------------------------------------------- */
  var sceneNodes = scenesHost.children;
  var scene = 0, paused = false;
  function paintScene() {
    for (var i = 0; i < sceneNodes.length; i++) {
      sceneNodes[i].classList.toggle('is-on', i === scene);
    }
    byId('sceneNo').textContent = String(scene + 1).padStart(2, '0');
    byId('sceneBar').style.width = ((scene + 1) / SCENES.length) * 100 + '%';
    byId('sceneLabel').textContent = SCENES[scene].label;
    byId('sceneNote').textContent = SCENES[scene].note;
  }
  function nextScene() { scene = (scene + 1) % SCENES.length; paintScene(); }
  paintScene();
  var sceneTimer = reduceMotion ? null : setInterval(function () { if (!paused) nextScene(); }, 6200);
  byId('nextBtn').addEventListener('click', nextScene);
  byId('pauseBtn').addEventListener('click', function () {
    paused = !paused;
    this.textContent = paused ? 'PLAY' : 'PAUSE';
  });

  /* ---- clock ----------------------------------------------------------- */
  function stampClock() {
    var d = new Date();
    byId('clock').textContent =
      String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }
  stampClock();
  setInterval(stampClock, 20000);

  /* ---- day / night ----------------------------------------------------- */
  var modeBtn = byId('modeBtn');
  modeBtn.addEventListener('click', function () {
    var night = root.getAttribute('data-mode') !== 'night';
    root.setAttribute('data-mode', night ? 'night' : 'day');
    modeBtn.setAttribute('aria-pressed', night ? 'true' : 'false');
    byId('modeLabel').textContent = night ? 'NIGHT' : 'DAY';
    var model = byId('model');
    if (model && typeof model.toggleNight === 'function') model.toggleNight(night);
  });

  /* ---- index overlay --------------------------------------------------- */
  var panel = byId('indexPanel'), menuBtn = byId('menuBtn');
  function setIndex(open) {
    panel.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.style.overflow = open ? 'hidden' : '';
  }
  menuBtn.addEventListener('click', function () { setIndex(!panel.classList.contains('is-open')); });
  byId('indexClose').addEventListener('click', function () { setIndex(false); });
  panel.addEventListener('click', function (e) {
    if (e.target.closest('[data-index-link]')) setIndex(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && panel.classList.contains('is-open')) setIndex(false);
  });

  /* Mark the stage live once the model element has painted a canvas, so the
     fallback caption disappears only when there is something to look at. */
  (function watchModel() {
    var stage = document.querySelector('.st-stage');
    var model = byId('model');
    if (!stage || !model) return;
    var tries = 0;
    var poll = setInterval(function () {
      if (model.querySelector('canvas')) { stage.classList.add('is-live'); clearInterval(poll); }
      else if (++tries > 60) { clearInterval(poll); }
    }, 500);
  })();

  /* ---- 3D model chips -------------------------------------------------- */
  var stageStatus = byId('stageStatus');
  document.querySelectorAll('[data-model-mode]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var mode = btn.getAttribute('data-model-mode');
      document.querySelectorAll('[data-model-mode]').forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      var model = byId('model');
      if (model && typeof model.setMode === 'function') model.setMode(mode);
      stageStatus.textContent = mode === 'xray' ? 'X-RAY / STRUCTURE + SERVICES' : 'RENDERED / DRAG TO ORBIT';
    });
  });
  document.querySelectorAll('[data-model-view]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('[data-model-view]').forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      var model = byId('model');
      if (model && typeof model.setView === 'function') model.setView(btn.getAttribute('data-model-view'));
    });
  });

  /* ---- scroll progress ------------------------------------------------- */
  var bar = byId('progress');
  function onScroll() {
    var max = document.body.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- cursor aura + card tilt ----------------------------------------- */
  var aura = byId('aura'), queued = false, lastTilt = null;
  window.addEventListener('pointermove', function (e) {
    if (queued) return;
    queued = true;
    requestAnimationFrame(function () { queued = false; });
    aura.style.left = e.clientX + 'px';
    aura.style.top = e.clientY + 'px';
    if (reduceMotion) return;
    var card = e.target.closest ? e.target.closest('[data-tilt]') : null;
    if (lastTilt && lastTilt !== card) { lastTilt.style.transform = ''; lastTilt = null; }
    if (!card) return;
    var r = card.getBoundingClientRect();
    var dx = (e.clientX - r.left) / r.width - 0.5;
    var dy = (e.clientY - r.top) / r.height - 0.5;
    card.style.transform =
      'perspective(1300px) rotateY(' + (dx * 6.3).toFixed(2) + 'deg) rotateX(' + (-dy * 6.3).toFixed(2) + 'deg) translateZ(22px)';
    lastTilt = card;
  }, { passive: true });

  /* ---- scroll reveal --------------------------------------------------- */
  var revealables = [].slice.call(document.querySelectorAll('[data-reveal]'));
  function showAll() { revealables.forEach(function (n) { n.classList.add('is-in'); }); }
  if (reduceMotion || !('IntersectionObserver' in window)) {
    showAll();
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    revealables.forEach(function (n) { io.observe(n); });
    /* Failsafe: nothing may stay invisible because an observer misfired. */
    setTimeout(showAll, 4000);
  }

  /* ---- brief form ------------------------------------------------------ */
  var form = byId('briefForm'), note = byId('briefNote'), submit = byId('briefSubmit');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      company: form.company.value.trim(),
      projectType: form.projectType.value,
      budget: form.budget.value,
      timeline: form.timeline.value.trim(),
      message: form.message.value.trim()
    };
    note.className = 'st-note';
    if (!data.name || !/^\S+@\S+\.\S+$/.test(data.email) || !data.projectType || data.message.length < 20) {
      note.className = 'st-note is-error';
      note.textContent = 'Please add your name, a valid email, a project type and a brief of at least 20 characters.';
      return;
    }
    submit.disabled = true;
    note.textContent = 'Sending…';
    fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(data)
    }).then(function (r) {
      return r.json().catch(function () { return {}; }).then(function (body) { return { ok: r.ok, body: body }; });
    }).then(function (res) {
      if (res.ok) {
        form.reset();
        note.className = 'st-note is-ok';
        note.textContent = 'Received. A copy is on its way to your inbox and one of us will reply personally.';
      } else {
        note.className = 'st-note is-error';
        note.textContent = res.body.error || 'That did not send. Email Faizan@artimistproductions.com and we will pick it up.';
      }
    }).catch(function () {
      note.className = 'st-note is-error';
      note.textContent = 'That did not send. Email Faizan@artimistproductions.com and we will pick it up.';
    }).then(function () { submit.disabled = false; });
  });
})();
