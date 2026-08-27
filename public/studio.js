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

  function replayWording(node) {
    if (!node || reduceMotion || !node.classList.contains('st-wording')) return;
    node.classList.remove('is-wording-in');
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { node.classList.add('is-wording-in'); });
    });
  }

  /* ---- data ------------------------------------------------------------ */
  var D = '/img/';

  var SCENES = [
    { image: D + 'tropical-club-01.webp', label: 'HOSPITALITY / WELLNESS', note: 'Landscape, movement and social life' },
    { image: D + 'cultural-campus-01.webp', label: 'PUBLIC / ARCHITECTURE', note: 'A district made from civic rooms' },
    { image: D + 'drive-09.webp', label: 'RESIDENTIAL / INTERIOR', note: 'Light, material and quiet precision' },
    { image: D + 'drive-12.webp', label: 'HOSPITALITY / ADAPTIVE REUSE', note: 'Old fabric, new atmosphere' }
  ];

  var P = '/media/projects/';
  var MO = '/media/motion/';
  var WK = '/media/walkthrough/';

  /* The five pieces the studio leads with. Where a walkthrough set exists the
     card opens the frames in place; everything else goes to the archive. */
  var FEATURED = [
    { no: '01', title: 'Bowl Stroke', cat: 'SPACE', meta: 'INTERNATIONAL / 2026',
      img: P + 'bowl-stroke.webp', poster: MO + 'bowlstroke-poster.webp',
      copy: 'A cinematic hospitality experience developed across exterior, dining, bar and private-room environments.',
      services: 'Architecture \u00b7 Interior \u00b7 3D Visualization \u00b7 Animation',
      frames: [WK + 'bowl/exterior-hero.webp', WK + 'bowl/exterior-arrival.webp', WK + 'bowl/interior-dining.webp', WK + 'bowl/interior-bar.webp', WK + 'bowl/interior-private.webp'] },
    { no: '02', title: 'Residential Exteriors', cat: 'IMAGE', meta: 'INTERNATIONAL / 2026',
      img: D + 'resext03.webp',
      copy: 'Houses read from the street and the approach \u2014 timber, glass and standing pine, shot at the hour the light does the most work.',
      services: 'Architecture \u00b7 Landscape \u00b7 3D Visualization',
      frames: [D + 'resext03.webp', D + 'resext01.webp', D + 'resext02.webp', D + 'resext04.webp'] },
    { no: '03', title: 'Residential \u2014 Exterior & Interior', cat: 'IMAGE', meta: 'INTERNATIONAL / 2026',
      img: D + 'resid01.webp', video: MO + 'residential-build.mp4',
      copy: 'One house carried from the courtyard and the pool through to the stair, the spa and the room you actually live in.',
      services: 'Architecture \u00b7 Interior \u00b7 Lighting \u00b7 3D Visualization',
      frames: [D + 'resid01.webp', D + 'resid02.webp', D + 'resid03.webp', D + 'resid04.webp', D + 'resid05.webp', D + 'resid06.webp'] },
    { no: '04', title: 'Home Interior', cat: 'IMAGE', meta: 'INTERIOR APPLICATION / 2026',
      img: D + 'homeint03.webp',
      copy: 'A full interior application \u2014 bedrooms, dressing, media and play, each room resolved in material and light rather than styled after the fact.',
      services: 'Interior Design \u00b7 Joinery \u00b7 Lighting \u00b7 Visualization',
      frames: [D + 'homeint03.webp', D + 'homeint01.webp', D + 'homeint02.webp', D + 'homeint04.webp', D + 'homeint05.webp', D + 'homeint06.webp', D + 'homeint07.webp', D + 'homeint08.webp', D + 'homeint09.webp', D + 'homeint10.webp', D + 'homeint11.webp'] },
    { no: '05', title: 'Commercial Interior', cat: 'IMAGE', meta: 'REFORMER PILATES STUDIO / 2026',
      img: D + 'comint01.webp',
      copy: 'A reformer pilates floor built around arched bays, warm oak and a lighting rhythm that keeps the equipment quiet.',
      services: 'Interior Design \u00b7 Branding \u00b7 Lighting \u00b7 Visualization' },
    { no: '06', title: 'EV Charging Station', cat: 'SPACE', meta: 'CONCEPT TO RENDER / 2026',
      img: D + 'ev01.webp',
      copy: 'A charging canopy taken from annotated concept sketch to finished frame \u2014 the thinking and the result shown side by side.',
      services: 'Concept Design \u00b7 Architecture \u00b7 Visualization',
      frames: [D + 'ev01.webp', D + 'ev02.webp', D + 'ev03.webp'] },
    { no: '07', title: 'RV Park Design', cat: 'SPACE', meta: 'UNITED STATES / 2026',
      img: D + 'rvpark.webp',
      copy: 'A wooded RV resort planned around a looped drive, a central green and a timber pavilion \u2014 every pad angled to keep the trees and the privacy between them.',
      services: 'Site Planning \u00b7 Landscape \u00b7 Architecture \u00b7 Aerial Visualization',
      frames: [D + 'rvpark.webp', D + 'airsidepark.webp'] },
    { no: '08', title: 'Permit Application Packages', cat: 'TECHNICAL', meta: 'UNITED STATES / 2026',
      img: D + 'permit01.webp',
      copy: 'Complete, code-compliant submittal sets \u2014 cover sheets, code data, egress, schedules and MEP coordination, organized the way a plan reviewer reads them.',
      services: 'Permit Drawings \u00b7 Code Review \u00b7 MEP Coordination \u00b7 Submittal Sets',
      frames: [D + 'permit01.webp', D + 'permit02.webp', D + 'permit03.webp', D + 'permit04.webp', D + 'permit05.webp', D + 'permit06.webp', D + 'permit07.webp', D + 'permit08.webp'] },
    { no: '09', title: 'Harmonic Horizons', cat: 'SPACE', meta: 'LAKESIDE CULTURAL DISTRICT / 2026',
      img: P + 'music-campus.webp', video: MO + 'music-campus-teaser.mp4',
      copy: 'A nature-integrated campus at Khanpur Dam where sound becomes landscape, sequence and form.',
      services: 'Architecture \u00b7 Master Planning \u00b7 Research \u00b7 Visualization' }
  ];

  /* The moving-image reel. Each entry is a real file in /media/motion. */
  /* The homepage carries the Bowl Stroke teaser only; the rest of the reel
     belongs on the animation page, not here. */
  var REELS = [
    { title: 'Bowl Stroke', note: 'Hospitality \u2014 exterior to private room', src: MO + 'bowl-stroke-teaser.mp4', poster: MO + 'bowlstroke-poster.webp' }
  ];

  var ROWS = [
    { no: '01', href: '/visual-archive', img: D + 'airside-district-01.webp', frames: [D + 'airside-district-01.webp', D + 'airsidepark.webp'], tags: 'Masterplan · Architecture · Visualization', title: 'Airside District', copy: 'A mixed-use district organised around civic rooms, arrival sequences and a continuous public ground.', meta: 'UNITED STATES / 2026' },
    { no: '02', href: '/unreal-engine', img: D + 'marina-arts-center-01.webp', tags: 'Culture · Real-time · Unreal', title: 'Marina Arts Center', copy: 'A waterfront arts building developed as a real-time environment so the client could walk it before committing.', meta: 'EUROPE / 2026' },
    { no: '03', href: '/visual-archive#technical-plates', img: D + 'water-research-01.webp', tags: 'Research · Parametric · Lab', title: 'Water Research Station', copy: 'A parametric shell study driven by daylight, prevailing wind and the rhythm of the tidal edge.', meta: 'RESEARCH / 2026' },
    { no: '04', href: '/visual-archive', img: D + 'tropical-club-03.webp', frames: [D + 'tropical-club-01.webp', D + 'tropical-club-02.webp', D + 'tropical-club-03.webp', D + 'tropical-club-04.webp'], tags: 'Hospitality · Interior · Landscape', title: 'Tropical Club', copy: 'Pool, pavilion and planting treated as one social landscape rather than three separate packages.', meta: 'ASIA PACIFIC / 2026' },
    { no: '05', href: '/visual-archive', img: D + 'waterfront-foundry-02.webp', tags: 'Hospitality · Adaptive Reuse · Visualization', title: 'Waterfront Foundry', copy: 'A brick industrial shell reimagined as a layered waterfront destination for culture, food and gathering.', meta: 'NORTH AMERICA / 2026' },
    { no: '06', href: '/residential', img: D + 'city-apartment-02.webp', frames: [D + 'city-apartment-01.webp', D + 'city-apartment-02.webp'], tags: 'Residential · Interior', title: 'City Apartment', copy: 'A compact urban interior resolved through material warmth, storage discipline and borrowed light.', meta: 'EUROPE / 2026' },
    { no: '07', href: '/visual-archive', img: D + 'rvpark.webp', frames: [D + 'rvpark.webp', D + 'airsidepark.webp'], tags: 'Site Planning \u00b7 Landscape \u00b7 Visualization', title: 'RV Park Design', copy: 'A looped drive, a central green and a timber pavilion, set into standing pine so the pads keep their privacy.', meta: 'UNITED STATES / 2026' },
    { no: '08', href: '/visual-archive', img: D + 'ev01.webp', frames: [D + 'ev01.webp', D + 'ev02.webp', D + 'ev03.webp'], tags: 'Concept \u00b7 Architecture \u00b7 Visualization', title: 'EV Charging Station', copy: 'A charging canopy developed from annotated sketch through to a finished dusk frame.', meta: 'CONCEPT STUDY / 2026' },
    { no: '09', href: '/visual-archive', img: D + 'comint01.webp', tags: 'Interior \u00b7 Branding \u00b7 Lighting', title: 'Reformer Pilates Studio', copy: 'Arched bays, warm oak and a lighting rhythm that keeps the equipment quiet.', meta: 'COMMERCIAL / 2026' }
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
    ['Farwa Kashif', 'Revit / BIM / CAD Expert', '/farwanew.webp'],
    ['Hanan Shahid', 'Unreal Engine Engineer & Architect', 'hanan-profile-2026.webp'],
    ['Rohma Fatima', 'Multidisciplinary Studio Team', 'rohma-profile-2026.webp'],
    ['Eunica Amir', 'Multidisciplinary Studio Team', 'eunica-profile-2026.webp'],
    ['Ezza Shahid', 'Interior Designer', 'ezza.jpeg'],
    ['Shumail', 'Studio Collaborator', 'shumail-profile-2026.webp'],
    ['Hamza Rizwan', 'Interior Designer — SketchUp & CAD', '/hamzanew.webp']
  ];

  var CLIENTS = [
    { name: 'Yellow Productions' }, { name: 'Johnny Beig' },
    { name: 'Dioz Group', img: D + 'dioz-group.webp' },
    { name: 'Label Beauty Group', img: D + 'hummane.webp' },
    { name: 'Alaskan Made', img: D + 'alaskan-made.webp' },
    { name: 'Commune' }
  ];

  /* The rail and the in-page half of the menu. */
  var SECTIONS = [
    ['Spatial portal', '#portal'], ['Selected work', '#work'], ['Complete index', '#archive'],
    ['Disciplines', '#disciplines'], ['Real-time', '#realtime'], ['Animation', '#animation'],
    ['Studio team', '#team'], ['Plans', '#plans'], ['Project brief', '#brief'],
    ['Clients', '#clients'], ['Contact', '#contact']
  ];

  /* The site index, exactly as the studio wants it read: sixteen entries, one
     column, every one of them a real destination. */
  var PAGES = [
    ['Work', '/#work'],
    ['Recent', '/#archive'],
    ['Architecture', '/architecture'],
    ['BIM & Drafting', '/bim-drafting'],
    ['Visualization', '/visualization'],
    ['Unreal Engine', '/unreal-engine'],
    ['Residential', '/residential'],
    ['Render atlas', '/visual-archive'],
    ['Services', '/services'],
    ['Skills', '/skills'],
    ['Process', '/process'],
    ['Team', '/team'],
    ['About', '/about'],
    ['Founder', '/founder-message'],
    ['Lab', '/services#research'],
    ['Partners', '/partners'],
    ['Contact', '/contact']
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

  /* ---- selected work ---------------------------------------------------- */
  var featMedia = byId('featMedia'), featTabs = byId('featTabs');
  var featIndex = -1;

  FEATURED.forEach(function (f, i) {
    var b = el('button', 'st-feature-tab');
    b.type = 'button';
    b.setAttribute('role', 'tab');
    b.innerHTML = '<small>' + f.no + '</small><span>' + esc(f.title) + '</span>';
    b.addEventListener('click', function () { showFeature(i); });
    featTabs.appendChild(b);
  });

  function showFeature(i) {
    if (i === featIndex) return;
    var f = FEATURED[i];
    featIndex = i;

    /* The video is the hero when there is one; the still is always underneath
       so there is never an empty frame while the file loads. */
    var media = '<img src="' + f.img + '" alt="' + esc(f.title) + '" loading="lazy">';
    if (f.video) {
      media += '<video muted loop playsinline preload="none"' +
        (f.poster ? ' poster="' + f.poster + '"' : '') +
        '><source src="' + f.video + '" type="video/mp4"></video>';
    }
    featMedia.innerHTML = media;
    var v = featMedia.querySelector('video');
    if (v) {
      v.addEventListener('canplay', function () { v.setAttribute('data-ready', '1'); }, { once: true });
      v.play().catch(function () {});
    }

    byId('featNo').textContent = f.no;
    byId('featCat').textContent = f.cat;
    var featureTitle = byId('featTitle');
    featureTitle.textContent = f.title;
    replayWording(featureTitle);
    byId('featCopy').textContent = f.copy;
    byId('featServices').textContent = f.services;
    byId('featMeta').textContent = f.meta;

    var cta = byId('featCta');
    if (f.frames && f.frames.length) {
      cta.textContent = 'ENTER WALKTHROUGH \u2197';
      cta.setAttribute('href', '#work');
      cta.dataset.frames = '1';
    } else {
      cta.textContent = 'VIEW IN THE ARCHIVE \u2197';
      cta.setAttribute('href', '#archive');
      delete cta.dataset.frames;
    }

    [].forEach.call(featTabs.children, function (b, n) {
      b.setAttribute('aria-selected', n === i ? 'true' : 'false');
    });
  }

  byId('featCta').addEventListener('click', function (e) {
    var f = FEATURED[featIndex];
    if (!f || !f.frames) return;
    e.preventDefault();
    openFrames(f);
  });

  showFeature(0);

  /* ---- walkthrough lightbox --------------------------------------------- */
  var lb = byId('lightbox'), lbImg = byId('lbImg'), lbCap = byId('lbCap'), lbNo = byId('lbNo');
  var lbFrames = [], lbAt = 0, lbTitle = '';

  function openFrames(f) {
    lbFrames = f.frames; lbAt = 0; lbTitle = f.title;
    paintFrame();
    lb.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    byId('lbClose').focus();
  }
  function paintFrame() {
    lbImg.src = lbFrames[lbAt];
    lbImg.alt = lbTitle + ' \u2014 frame ' + (lbAt + 1);
    lbCap.textContent = lbTitle;
    lbNo.textContent = String(lbAt + 1).padStart(2, '0') + ' / ' + String(lbFrames.length).padStart(2, '0');
  }
  function stepFrame(d) {
    if (!lbFrames.length) return;
    lbAt = (lbAt + d + lbFrames.length) % lbFrames.length;
    paintFrame();
  }
  function closeFrames() {
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  byId('lbClose').addEventListener('click', closeFrames);
  byId('lbPrev').addEventListener('click', function () { stepFrame(-1); });
  byId('lbNext').addEventListener('click', function () { stepFrame(1); });
  lb.addEventListener('click', function (e) { if (e.target === lb) closeFrames(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeFrames();
    if (e.key === 'ArrowRight') stepFrame(1);
    if (e.key === 'ArrowLeft') stepFrame(-1);
  });

  /* ---- moving image ------------------------------------------------------ */
  var reelVideo = byId('reelVideo'), reelList = byId('reelList');
  var reelAt = -1;
  if (REELS.length > 1) {
    reelList.hidden = false;
    REELS.forEach(function (r, i) {
      var b = el('button', 'st-reel-pick');
      b.type = 'button';
      b.innerHTML = '<img src="' + r.poster + '" alt="" loading="lazy"><span><b>' + esc(r.title) + '</b><small>' + esc(r.note) + '</small></span>';
      b.addEventListener('click', function () { showReel(i, true); });
      reelList.appendChild(b);
    });
  }
  function showReel(i, play) {
    var r = REELS[i];
    if (i !== reelAt) {
      reelAt = i;
      reelVideo.poster = r.poster;
      reelVideo.innerHTML = '<source src="' + r.src + '" type="video/mp4">';
      reelVideo.load();
      byId('reelTitle').textContent = r.title;
      byId('reelNote').textContent = r.note;
      [].forEach.call(reelList.children, function (b, n) {
        b.setAttribute('aria-current', n === i ? 'true' : 'false');
      });
    }
    if (play) reelVideo.play().catch(function () {});
  }
  if (REELS.length > 1) showReel(0, false);
  else reelAt = 0; /* keep preload="none" intact until the visitor chooses play */

  var rows = byId('rows');
  ROWS.forEach(function (r) {
    rows.insertAdjacentHTML('beforeend',
      '<a class="st-row" href="' + r.href + '" aria-label="View ' + esc(r.title) + '"' + (r.frames ? ' data-row-gallery="' + i + '"' : '') + ' data-reveal>' +
        '<div class="st-row-media"><img src="' + r.img + '" alt="' + esc(r.title) + '" loading="lazy" width="1600" height="1000"><span class="st-row-no">' + r.no + '</span></div>' +
        '<div><p class="st-row-tags">' + esc(r.tags) + '</p><h3>' + esc(r.title) + '</h3>' +
        '<p>' + esc(r.copy) + '</p><p class="st-row-meta">' + esc(r.meta) + '</p>' +
        '<span class="st-row-action">' + (r.frames ? 'View ' + String(r.frames.length).padStart(2, '0') + ' images' : 'Explore project') + ' <i aria-hidden="true">↗</i></span></div>' +
      '</a>');
  });
  rows.addEventListener('click', function (event) {
    var link = event.target.closest ? event.target.closest('[data-row-gallery]') : null;
    if (!link) return;
    var project = ROWS[Number(link.getAttribute('data-row-gallery'))];
    if (!project || !project.frames || !project.frames.length) return;
    event.preventDefault();
    openFrames(project);
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

  /* Most portraits sit in /media/team; a couple were uploaded to the top of
     /public instead, so an absolute name is taken as given. */
  function portrait(name) {
    return name.charAt(0) === '/' ? name : '/media/team/' + name;
  }

  /* team ring — evenly spaced around a circle, starting at the top */
  var ring = byId('ring');
  byId('teamCount').textContent = String(TEAM.length);
  TEAM.forEach(function (m, i) {
    var a = (i / TEAM.length) * Math.PI * 2 - Math.PI / 2;
    var node = el('article', 'st-member');
    node.style.left = (50 + Math.cos(a) * 41).toFixed(2) + '%';
    node.style.top = (50 + Math.sin(a) * 41).toFixed(2) + '%';
    node.innerHTML =
      '<div class="st-portrait" data-tilt><span><img src="' + portrait(m[2]) + '" alt="' + esc(m[0]) + '" loading="lazy" onerror="this.onerror=null;this.src=&quot;/img/portrait-placeholder.svg&quot;"></span></div>' +
      '<div class="st-member-card"><small>' + esc(m[1]) + '</small><b>' + esc(m[0]) + '</b></div>';
    ring.appendChild(node);
  });

  /* clients marquee — the list is duplicated so the loop is seamless */
  var marquee = byId('marquee');
  /* With a logo we show the mark and set the name underneath it. Without one the
     wordmark IS the name, so repeating it below would just print it twice. */
  function clientCell(c) {
    if (!c.img) return '<div class="st-client is-word"><strong>' + esc(c.name) + '</strong></div>';
    return '<div class="st-client"><img src="' + c.img + '" alt="' + esc(c.name) + '" loading="lazy"><b>' + esc(c.name) + '</b></div>';
  }
  marquee.innerHTML = CLIENTS.map(clientCell).join('') + CLIENTS.map(clientCell).join('');

  function indexRows(host, list, isPage) {
    list.forEach(function (s, i) {
      host.insertAdjacentHTML('beforeend',
        '<a href="' + s[1] + '"' + (isPage ? '' : ' data-index-link') + '>' +
        '<small>' + String(i + 1).padStart(2, '0') + '</small>' +
        '<span>' + esc(s[0]) + '</span>' +
        '<i aria-hidden="true">' + (isPage ? '&#8599;' : '&#8595;') + '</i></a>');
    });
  }
  indexRows(byId('indexPages'), PAGES, true);

  var rail = byId('rail');
  SECTIONS.forEach(function (s) {
    rail.insertAdjacentHTML('beforeend',
      '<a href="' + s[1] + '" title="' + esc(s[0]) + '"><small>' + esc(s[0]) + '</small><i></i></a>');
  });

  /* Re-apply the URL hash after the sections above are injected.
     On a fresh load the browser jumps to #team (or any anchor) before this
     script has built the team ring, work rows and plans, so the page height
     is still wrong and it lands in the wrong place. Nudging it once the DOM
     is complete puts the visitor where the link promised. */
  if (location.hash && location.hash.length > 1) {
    requestAnimationFrame(function () {
      var target = document.querySelector(location.hash);
      if (target) target.scrollIntoView();
    });
  }

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

  /* ---- day / night ----------------------------------------------------- */
  var modeBtn = byId('modeBtn');

  function applyMode(night) {
    root.setAttribute('data-mode', night ? 'night' : 'day');
    modeBtn.setAttribute('aria-pressed', night ? 'true' : 'false');
    byId('modeLabel').textContent = night ? 'NIGHT' : 'DAY';
    var model = byId('model');
    if (model && typeof model.toggleNight === 'function') model.toggleNight(night);
    try { localStorage.setItem('artimist_mode', night ? 'night' : 'day'); } catch (e) {}
  }

  /* Restore the visitor's last choice; default to day. */
  try { if (localStorage.getItem('artimist_mode') === 'night') applyMode(true); } catch (e) {}

  /* The model element is defined by a module that may load after this script,
     so re-apply night once it is ready. */
  (function syncModelNight() {
    var tries = 0;
    var poll = setInterval(function () {
      var model = byId('model');
      if (model && typeof model.toggleNight === 'function') {
        model.toggleNight(root.getAttribute('data-mode') === 'night');
        clearInterval(poll);
      } else if (++tries > 40) { clearInterval(poll); }
    }, 400);
  })();

  modeBtn.addEventListener('click', function () {
    var night = root.getAttribute('data-mode') !== 'night';
    applyMode(night);
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

  /* The viewer only accepts setView once the GLB has been parsed and the camera
     presets exist. Until then a chip click would be a silent no-op, so hold the
     last intent and replay it the moment the model is ready. */
  var modelPending = null;
  function modelReady() {
    var m = byId('model');
    return !!(m && m._views && m._views.orbit);
  }
  function callModel(fn, arg) {
    var m = byId('model');
    if (!m) return;
    if (modelReady()) { if (typeof m[fn] === 'function') m[fn](arg); return; }
    modelPending = [fn, arg];
  }
  (function drainModel() {
    var tries = 0;
    var poll = setInterval(function () {
      if (modelReady()) {
        document.querySelectorAll('[data-model-view],[data-model-mode]').forEach(function (b) { b.removeAttribute('data-waiting'); });
        if (modelPending) {
          var m = byId('model');
          if (typeof m[modelPending[0]] === 'function') m[modelPending[0]](modelPending[1]);
          modelPending = null;
        }
        clearInterval(poll);
      } else if (++tries > 120) { clearInterval(poll); }
    }, 250);
  })();
  document.querySelectorAll('[data-model-view],[data-model-mode]').forEach(function (b) { b.setAttribute('data-waiting', '1'); });

  /* ---- 3D model chips -------------------------------------------------- */
  var stageStatus = byId('stageStatus');
  document.querySelectorAll('[data-model-mode]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var mode = btn.getAttribute('data-model-mode');
      document.querySelectorAll('[data-model-mode]').forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      callModel('setMode', mode);
      stageStatus.textContent = mode === 'xray' ? 'X-RAY / STRUCTURE' : 'RENDERED / DRAG TO ORBIT';
    });
  });
  /* Each camera preset gets its own note, so the panel explains what you are
     looking at rather than repeating one generic line. */
  var VIEW_COPY = {
    orbit: ['01 / ORBIT', 'Drag to rotate, scroll to change distance. The model keeps turning on its own until you take hold of it.'],
    aerial: ['02 / AERIAL', 'Straight down over the roof plane — plant, parapet and the courtyard void read as a single plan.'],
    eye: ['03 / EYE LEVEL', 'Standing at the arrival threshold, at the height a person actually meets the building.'],
    detail: ['04 / DETAIL', 'Close on the slab edge and the service runs, where structure and coordination become legible.']
  };

  document.querySelectorAll('[data-model-view]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var view = btn.getAttribute('data-model-view');
      document.querySelectorAll('[data-model-view]').forEach(function (b) {
        b.setAttribute('aria-pressed', b === btn ? 'true' : 'false');
      });
      callModel('setView', view);
      var copy = VIEW_COPY[view];
      if (copy) { byId('viewTitle').textContent = copy[0]; byId('viewCopy').textContent = copy[1]; }
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

  /* ---- animated wording ------------------------------------------------
     Editorial headings reveal independently from their surrounding layout.
     No text is split into inaccessible spans; screen readers keep natural copy. */
  var wordings = [].slice.call(document.querySelectorAll(
    '.st-hero h1, .st-portal-head h2, .st-h2, .st-feature-title, .st-row h3, .st-footer h3'
  ));
  wordings.forEach(function (node) { node.classList.add('st-wording'); });
  function showWording(node) { node.classList.add('is-wording-in'); }
  if (reduceMotion || !('IntersectionObserver' in window)) {
    wordings.forEach(showWording);
  } else {
    var wordingObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          showWording(entry.target);
          wordingObserver.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: .12 });
    wordings.forEach(function (node) { wordingObserver.observe(node); });
    setTimeout(function () { wordings.forEach(showWording); }, 4000);
  }

  /* ---- visitor tracking ------------------------------------------------
     This page replaces the Next.js homepage, which is where the tracker used
     to live. Without this, homepage visits would vanish from the Visitors
     panel in the control room. Same endpoint, same shape, never blocking. */
  (function trackVisit() {
    var visitorId = '';
    try {
      visitorId = sessionStorage.getItem('artimist_v') || '';
      if (!visitorId) {
        visitorId = Math.random().toString(36).slice(2) + Date.now().toString(36);
        sessionStorage.setItem('artimist_v', visitorId);
      }
    } catch (e) {}
    try {
      fetch('/api/track', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ path: location.pathname, referrer: document.referrer || '', visitorId: visitorId }),
        keepalive: true
      }).catch(function () {});
    } catch (e) {}
  })();

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

  /* ---- ask a question ---------------------------------------------------
     Same endpoint as the brief, flagged so the studio can tell a quick
     question apart from a full brief in the inbox. */
  var askBtn = byId('askBtn'), askPanel = byId('askPanel'), askForm = byId('askForm');
  var askNote = byId('askNote'), askSend = byId('askSend');

  function setAsk(open) {
    askPanel.hidden = !open;
    askBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    askBtn.classList.toggle('is-open', open);
    if (open) byId('a-name').focus();
  }
  askBtn.addEventListener('click', function () { setAsk(askPanel.hidden); });
  byId('askClose').addEventListener('click', function () { setAsk(false); askBtn.focus(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !askPanel.hidden) { setAsk(false); askBtn.focus(); }
  });

  askForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = askForm.name.value.trim();
    var email = askForm.email.value.trim();
    var message = askForm.message.value.trim();
    askNote.className = 'st-ask-note';
    if (!name || !/^\S+@\S+\.\S+$/.test(email) || message.length < 10) {
      askNote.className = 'st-ask-note is-error';
      askNote.textContent = 'Name, a valid email and a question of at least ten characters, please.';
      return;
    }
    askSend.disabled = true;
    askNote.textContent = 'Sending\u2026';
    fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: name, email: email, company: '',
        projectType: 'Question', budget: '', timeline: '',
        message: 'QUESTION FROM THE SITE\n\n' + message
      })
    }).then(function (r) { return r.ok; }).then(function (ok) {
      if (ok) {
        askForm.reset();
        askNote.className = 'st-ask-note is-ok';
        askNote.textContent = 'Sent. You will get a reply from a person.';
      } else {
        askNote.className = 'st-ask-note is-error';
        askNote.textContent = 'That did not send. Email Faizan@artimistproductions.com instead.';
      }
    }).catch(function () {
      askNote.className = 'st-ask-note is-error';
      askNote.textContent = 'That did not send. Email Faizan@artimistproductions.com instead.';
    }).then(function () { askSend.disabled = false; });
  });
})();
