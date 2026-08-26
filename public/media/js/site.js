/* ============================================================
   ARTIMIST PRODUCTIONS — shared site runtime
   Injects header + top-left INDEX + ask button + footer on every
   page, runs the motion system, and wires the contact pipeline.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- single source of truth for navigation ---------- */
  var PAGES = [
    { n: "01", t: "Home",              h: "/index.html",           d: "Atmosphere before the door" },
    { n: "02", t: "Selected Work",     h: "/work.html",            d: "Projects & atmospheres" },
    { n: "03", t: "Services",          h: "/services.html",        d: "Six connected practices" },
    { n: "04", t: "Architecture",      h: "/architecture.html",    d: "Space & interior" },
    { n: "05", t: "BIM & Drafting",    h: "/bim-drafting.html",    d: "Technical production" },
    { n: "06", t: "Visualization",     h: "/visualization.html",   d: "Image & motion" },
    { n: "07", t: "About",             h: "/about.html",           d: "The practice" },
    { n: "08", t: "Founder's Message", h: "/founder-message.html", d: "A note from Faizan" },
    { n: "09", t: "Partners",          h: "/partners.html",        d: "Clients & collaborators" },
    { n: "10", t: "Team",              h: "/team.html",            d: "The people" },
    { n: "11", t: "Plans",             h: "/plans.html",           d: "Monthly engagement" },
    { n: "12", t: "Brief",             h: "/brief.html",           d: "Build your project brief" },
    { n: "13", t: "Contact",           h: "/contact.html",         d: "Start a project" }
  ];

  var CFG = window.ARTIMIST_PAGE || {};
  var head = CFG.headStyle || "light"; // dark | light | solid

  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function here(h) {
    var p = location.pathname.replace(/\/$/, "");
    if (p === "" || p === "/index" ) p = "/index.html";
    if (!/\.html$/.test(p) && p !== "") p += ".html";
    return p === h;
  }

  /* ---------- build shell ---------- */
  function buildShell() {
    var brand =
      '<a class="brand" href="/index.html" aria-label="Artimist Productions home">' +
        '<b><i>A</i>RTIMIST</b><span>CREATIVE PRODUCTION</span>' +
      "</a>";

    var dots = '<u aria-hidden="true"><i></i><i></i><i></i><i></i></u>';

    var hdr = document.createElement("header");
    hdr.className = "site-head is-" + head;
    hdr.innerHTML =
      '<div class="head-left">' +
        '<button class="index-btn" data-nav-open aria-label="Open site index" aria-haspopup="dialog">' +
          dots + "<span>Index</span>" +
        "</button>" + brand +
      "</div>" +
      '<div class="head-right">' +
        '<span class="clock-pill"><i></i><span data-clock>— / --:--</span></span>' +
        '<a class="cta-pill" href="/brief.html">START A PROJECT ↗</a>' +
        '<button class="menu-pill" data-nav-open aria-label="Open menu">MENU ' + dots + "</button>" +
      "</div>";

    var items = PAGES.map(function (p) {
      return (
        '<a href="' + p.h + '"' + (here(p.h) ? ' class="current" aria-current="page"' : "") + ">" +
          "<small>" + p.n + "</small><b>" + esc(p.t) + "</b><em>" + esc(p.d) + "</em>" +
        "</a>"
      );
    }).join("");

    var ov = document.createElement("div");
    ov.className = "nav-overlay";
    ov.setAttribute("role", "dialog");
    ov.setAttribute("aria-modal", "true");
    ov.setAttribute("aria-label", "Site index");
    ov.innerHTML =
      '<div class="nav-top">' + brand +
        '<button class="nav-close" data-nav-close>CLOSE ✕</button></div>' +
      '<div class="nav-body"><nav class="nav-list">' + items + "</nav>" +
        '<aside class="nav-side">' +
          "<h4>THE PRACTICE</h4>" +
          "<p>Architecture, visualization, BIM, motion and digital production carried by one creative intelligence.</p>" +
          '<a href="/brief.html">BUILD A BRIEF ↗</a>' +
          '<a href="/plans.html">ENGAGEMENT PLANS ↗</a>' +
          '<a href="/contact.html">START A PROJECT ↗</a>' +
          '<a href="https://www.instagram.com/artimistproductions" target="_blank" rel="noopener">INSTAGRAM ↗</a>' +
          '<a href="https://wa.me/18078084181" target="_blank" rel="noopener">WHATSAPP ↗</a>' +
        "</aside></div>" +
      '<div class="nav-foot"><span>ARTIMIST PRODUCTIONS © ' + new Date().getFullYear() + "</span>" +
        "<span>VANCOUVER / OHIO / STOCKHOLM / LAHORE</span></div>";

    var fab = document.createElement("button");
    fab.className = "ask-fab";
    fab.setAttribute("data-ask-open", "");
    fab.textContent = "Ask a question";

    var modal = document.createElement("div");
    modal.className = "ask-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Ask a question");
    modal.innerHTML =
      '<div class="ask-card">' +
        '<button class="ask-close" data-ask-close aria-label="Close">✕</button>' +
        '<p class="eyebrow" style="color:var(--wine)">ASK ARTIMIST</p>' +
        "<h3>Tell us what<br><em>you are building.</em></h3>" +
        "<p>Send the question, the site, the deadline — whatever you have. A reply comes back from the studio directly.</p>" +
        buildForm("ask") +
      "</div>";

    var foot = document.createElement("footer");
    foot.className = "site-foot";
    var col = function (h, links) {
      return '<div class="foot-col"><h5>' + h + "</h5>" + links + "</div>";
    };
    foot.innerHTML =
      '<div class="shell"><div class="foot-grid">' +
        '<div class="foot-brand"><b><i>A</i>RTIMIST</b><span>CREATIVE PRODUCTION</span>' +
          "<p>Architecture, visualization and creative production for places, products and worlds people can believe in.</p></div>" +
        col("PRACTICE",
          '<a href="/architecture.html">Architecture &amp; Interior</a>' +
          '<a href="/visualization.html">Visualization &amp; Motion</a>' +
          '<a href="/bim-drafting.html">BIM &amp; Drafting</a>' +
          '<a href="/services.html">All services</a>') +
        col("STUDIO",
          '<a href="/about.html">About the practice</a>' +
          '<a href="/founder-message.html">Founder’s message</a>' +
          '<a href="/team.html">The team</a>' +
          '<a href="/partners.html">Partners &amp; clients</a>') +
        col("CONNECT",
          '<a href="/brief.html">Build a brief</a>' +
          '<a href="/plans.html">Engagement plans</a>' +
          '<a href="/contact.html">Start a project</a>' +
          '<a href="https://wa.me/18078084181" target="_blank" rel="noopener">WhatsApp</a>' +
          '<a href="https://www.instagram.com/artimistproductions" target="_blank" rel="noopener">Instagram</a>' +
          "<p>Vancouver · Ohio · Stockholm · Lahore</p>") +
      "</div>" +
      '<div class="foot-bottom"><span>© ' + new Date().getFullYear() +
        " ARTIMIST PRODUCTIONS — ALL RIGHTS RESERVED</span>" +
        '<span><a href="/admin.html">STUDIO ACCESS</a></span></div></div>';

    var prog = document.createElement("div"); prog.className = "scroll-progress";
    var aura = document.createElement("div"); aura.className = "pointer-aura"; aura.setAttribute("aria-hidden", "true");

    document.body.insertBefore(hdr, document.body.firstChild);
    document.body.insertBefore(prog, document.body.firstChild);
    document.body.appendChild(aura);
    document.body.appendChild(ov);
    if (!CFG.noAsk) { document.body.appendChild(fab); document.body.appendChild(modal); }
    if (!CFG.noFooter) document.body.appendChild(foot);
  }

  /* ---------- contact form markup (shared) ---------- */
  function buildForm(id) {
    return (
      '<form data-contact-form="' + id + '" novalidate>' +
        '<div class="field-row">' +
          '<div class="field"><label for="' + id + '-n">Your name</label>' +
            '<input id="' + id + '-n" name="name" type="text" required autocomplete="name" maxlength="120"></div>' +
          '<div class="field"><label for="' + id + '-e">Email</label>' +
            '<input id="' + id + '-e" name="email" type="email" required autocomplete="email" maxlength="180"></div>' +
        "</div>" +
        '<div class="field-row">' +
          '<div class="field"><label for="' + id + '-c">Company / project</label>' +
            '<input id="' + id + '-c" name="company" type="text" maxlength="140"></div>' +
          '<div class="field"><label for="' + id + '-s">Interested in</label>' +
            '<select id="' + id + '-s" name="service">' +
              "<option>General enquiry</option><option>Architecture &amp; Interior</option>" +
              "<option>Visualization &amp; Motion</option><option>BIM &amp; Drafting</option>" +
              "<option>Unreal &amp; Interactive</option><option>Brand, Web &amp; Commerce</option>" +
              "<option>Research &amp; Experiment</option></select></div>" +
        "</div>" +
        '<div class="field"><label for="' + id + '-m">Your message</label>' +
          '<textarea id="' + id + '-m" name="message" required maxlength="4000"></textarea></div>' +
        '<input type="text" name="company_website" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;width:1px;height:1px;opacity:0">' +
        '<button class="btn-send" type="submit">Send to the studio ↗</button>' +
        '<p class="form-status" role="status" aria-live="polite"></p>' +
        '<p class="form-note">Replies come straight from the studio. We never share your details.</p>' +
      "</form>"
    );
  }
  window.ARTIMIST_FORM = buildForm;

  /* ---------- overlay + modal behaviour ---------- */
  function panels() {
    var ov = document.querySelector(".nav-overlay");
    var modal = document.querySelector(".ask-modal");
    var last = null;

    function open(el) {
      last = document.activeElement;
      el.classList.add("open");
      document.body.style.overflow = "hidden";
      var f = el.querySelector("a,button,input");
      if (f) setTimeout(function () { f.focus(); }, 60);
    }
    function close(el) {
      el.classList.remove("open");
      if (!document.querySelector(".nav-overlay.open,.ask-modal.open")) document.body.style.overflow = "";
      if (last && last.focus) last.focus();
    }
    document.addEventListener("click", function (e) {
      var t = e.target;
      if (t.closest("[data-nav-open]")) { e.preventDefault(); open(ov); }
      else if (t.closest("[data-nav-close]")) { close(ov); }
      else if (t.closest("[data-ask-open]")) { e.preventDefault(); if (modal) open(modal); }
      else if (t.closest("[data-ask-close]")) { if (modal) close(modal); }
      else if (modal && t === modal) { close(modal); }
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      document.querySelectorAll(".nav-overlay.open,.ask-modal.open").forEach(close);
    });
    // close the index when a link inside it is followed
    if (ov) ov.addEventListener("click", function (e) { if (e.target.closest("a")) close(ov); });
  }

  /* ---------- header clock (NIGHT / 20:26) ---------- */
  function clock() {
    var els = document.querySelectorAll("[data-clock]");
    if (!els.length) return;
    function tick() {
      var d = new Date(), h = d.getHours();
      var label = h >= 6 && h < 18 ? "DAY" : "NIGHT";
      var txt = label + " / " + String(h).padStart(2, "0") + ":" + String(d.getMinutes()).padStart(2, "0");
      els.forEach(function (e) { e.textContent = txt; });
    }
    tick(); setInterval(tick, 20000);
  }

  /* ---------- motion system ---------- */
  function motion() {
    var root = document.documentElement, frame = 0;
    function onScroll() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(function () {
        var max = document.documentElement.scrollHeight - innerHeight;
        root.style.setProperty("--scroll", (max > 0 ? (scrollY / max) * 100 : 0) + "%");
        document.querySelectorAll("[data-parallax]").forEach(function (el, i) {
          var r = el.getBoundingClientRect();
          el.style.setProperty("--parallax", ((r.top - innerHeight / 2) * (0.018 + (i % 3) * 0.006)) + "px");
        });
        var hd = document.querySelector(".site-head");
        if (hd && head === "dark") hd.classList.toggle("is-solid", scrollY > innerHeight * 0.82);
      });
    }
    addEventListener("scroll", onScroll, { passive: true });
    addEventListener("pointermove", function (e) {
      root.style.setProperty("--mx", e.clientX + "px");
      root.style.setProperty("--my", e.clientY + "px");
    }, { passive: true });
    onScroll();

    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in-view"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -7% 0px", threshold: 0.06 });
    document.querySelectorAll("main section, main article").forEach(function (t) {
      t.classList.add("motion-section"); io.observe(t);
    });

    if (!matchMedia("(pointer: coarse)").matches) {
      document.querySelectorAll(
        ".practice-shot>div,.partners-v2-grid article,.about-v2-principles article,.services-v2-engage article,.work-thumbs figure,.team-node figure"
      ).forEach(function (c) {
        c.classList.add("tilt-card");
        c.addEventListener("pointermove", function (e) {
          var r = c.getBoundingClientRect();
          c.style.setProperty("--ry", ((e.clientX - r.left) / r.width - 0.5) * 5 + "deg");
          c.style.setProperty("--rx", ((e.clientY - r.top) / r.height - 0.5) * -5 + "deg");
          c.style.setProperty("--tz", "9px");
        });
        c.addEventListener("pointerleave", function () {
          c.style.setProperty("--ry", "0deg"); c.style.setProperty("--rx", "0deg"); c.style.setProperty("--tz", "0px");
        });
      });
    }
  }

  /* ---------- contact submission ---------- */
  function forms() {
    document.addEventListener("submit", function (e) {
      var f = e.target;
      if (!f.matches("[data-contact-form]")) return;
      e.preventDefault();
      var btn = f.querySelector(".btn-send"), st = f.querySelector(".form-status");
      var data = {
        name: (f.name && f.name.value || "").trim(),
        email: (f.email && f.email.value || "").trim(),
        company: (f.company && f.company.value || "").trim(),
        service: (f.service && f.service.value || "").trim(),
        message: (f.message && f.message.value || "").trim(),
        company_website: (f.company_website && f.company_website.value || ""),
        page: location.pathname
      };
      function say(cls, msg) { st.className = "form-status show " + cls; st.textContent = msg; }
      if (!data.name || !data.email || !data.message) return say("err", "Please add your name, email and a short message.");
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return say("err", "That email address does not look right.");

      btn.disabled = true; var old = btn.textContent; btn.textContent = "Sending…";
      fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data)
      })
        .then(function (r) { return r.json().then(function (j) { return { ok: r.ok, j: j }; }); })
        .then(function (r) {
          if (!r.ok || !r.j.ok) throw new Error(r.j && r.j.error || "Send failed");
          say("ok", "Thank you — your message reached the studio. We reply personally, usually within one business day.");
          f.reset();
        })
        .catch(function () {
          say("err", "We could not send that just now. Please email the studio directly or reach us on WhatsApp and we will pick it up.");
        })
        .finally(function () { btn.disabled = false; btn.textContent = old; });
    });
  }

  /* ---------- visitor tracking (privacy-light) ---------- */
  function track() {
    try {
      var k = "artimist_v";
      var isNew = !localStorage.getItem(k);
      if (isNew) localStorage.setItem(k, String(Date.now()));
      fetch("/api/track", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          path: location.pathname, ref: document.referrer || "", isNew: isNew,
          w: screen.width, tz: Intl.DateTimeFormat().resolvedOptions().timeZone || ""
        }),
        keepalive: true
      }).catch(function () {});
    } catch (e) {}
  }

  /* ---------- boot ---------- */
  function boot() {
    buildShell(); panels(); clock(); motion(); forms(); track();
    if (window.ARTIMIST_ONREADY) try { window.ARTIMIST_ONREADY(); } catch (e) { console.warn(e); }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
