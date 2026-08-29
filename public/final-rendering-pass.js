(() => {
  const TARGETS = new Set([
    "/visualization",
    "/services/architectural-rendering",
    "/services/3d-interior-rendering",
    "/services/real-estate-rendering",
  ]);

  const STYLE_ID = "artimist-final-rendering-pass";
  const STATEMENTS = {
    "/services/architectural-rendering": {
      eyebrow: "Architectural visualization / decision image",
      title: "Every frame has a job.",
      copy: "A strong architectural render should explain massing, material, light and context at a glance — not simply make the model look expensive.",
    },
    "/services/3d-interior-rendering": {
      eyebrow: "Interior visualization / material judgement",
      title: "Atmosphere with enough accuracy to decide.",
      copy: "The image needs to carry proportion, furniture scale, finish, warmth and lighting together so the room can be judged before site decisions become costly.",
    },
    "/services/real-estate-rendering": {
      eyebrow: "Development visualization / campaign system",
      title: "One development. One visual language.",
      copy: "Hero exterior, arrival, amenities, units and aerial context should feel like one coordinated property story rather than unrelated images from separate scenes.",
    },
  };

  function path() {
    return window.location.pathname.replace(/\/$/, "") || "/";
  }

  function addStyles() {
    if (document.getElementById(STYLE_ID)) return;
    const style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = `
      /* FINAL RENDERING FAMILY */
      .sv-root.sv-final{background:#080809;overflow:clip}
      .sv-final .sv-wrap{max-width:1380px;padding-inline:clamp(22px,4vw,62px)}
      .sv-final .sv-back{padding-top:96px;color:rgba(238,231,226,.52)}
      .sv-final .sv-hero:not(.sv-hero--motion){position:relative;grid-template-columns:minmax(360px,.78fr) minmax(0,1.22fr);gap:0;min-height:min(780px,82vh);padding:18px 0 76px;align-items:center}
      .sv-final .sv-hero:not(.sv-hero--motion) .sv-hero-copy{position:relative;z-index:3;margin-right:-72px;padding:clamp(30px,4.2vw,62px);background:linear-gradient(145deg,rgba(12,10,11,.96),rgba(12,10,11,.76));border:1px solid rgba(255,255,255,.12);border-left:3px solid #a9324b;box-shadow:0 30px 90px rgba(0,0,0,.36);backdrop-filter:blur(18px)}
      .sv-final .sv-hero:not(.sv-hero--motion) h1{font-size:clamp(58px,7.6vw,112px);line-height:.88;letter-spacing:-.055em;margin:17px 0 24px;text-wrap:balance}
      .sv-final .sv-hero:not(.sv-hero--motion) .sv-tagline{font-size:clamp(24px,2.2vw,36px);line-height:1.08}
      .sv-final .sv-hero:not(.sv-hero--motion) .sv-lead{font-size:15px;line-height:1.72;max-width:54ch;margin-top:24px;color:#b8aca6}
      .sv-final .sv-hero:not(.sv-hero--motion) .sv-proof{border-radius:0;aspect-ratio:auto;height:min(720px,75vh);min-height:610px;box-shadow:0 32px 100px rgba(0,0,0,.5)}
      .sv-final .sv-hero:not(.sv-hero--motion) .sv-proof img{transition:transform 1.2s cubic-bezier(.2,.7,.2,1),filter .7s ease;filter:saturate(.9) contrast(1.03)}
      .sv-final .sv-hero:not(.sv-hero--motion):hover .sv-proof img{transform:scale(1.018);filter:saturate(1) contrast(1.04)}
      .sv-final .sv-hero:not(.sv-hero--motion) .sv-proof:after{background:linear-gradient(90deg,rgba(8,8,9,.26),transparent 45%),linear-gradient(0deg,rgba(8,8,9,.55),transparent 38%)}
      .sv-final .sv-story-nav{position:sticky;top:8px;z-index:20;display:flex;gap:6px;align-items:center;width:max-content;max-width:100%;margin:-46px auto 62px;padding:7px;background:rgba(13,11,12,.78);border:1px solid rgba(255,255,255,.12);border-radius:999px;backdrop-filter:blur(16px);overflow:auto;scrollbar-width:none}
      .sv-final .sv-story-nav::-webkit-scrollbar{display:none}
      .sv-final .sv-story-nav a{flex:none;color:#b9ada7;text-decoration:none;font-size:9px;letter-spacing:.12em;text-transform:uppercase;padding:9px 13px;border-radius:999px;transition:.25s ease}
      .sv-final .sv-story-nav a:hover{background:rgba(153,38,54,.25);color:#fff}
      .sv-final .sv-gallery{grid-template-columns:repeat(12,1fr);gap:14px;padding:0 0 86px;align-items:start}
      .sv-final .sv-gallery figure{border-radius:0;aspect-ratio:4/3;box-shadow:0 24px 70px rgba(0,0,0,.2)}
      .sv-final .sv-gallery figure:nth-child(1){grid-column:1/span 7;aspect-ratio:16/10}
      .sv-final .sv-gallery figure:nth-child(2){grid-column:8/span 5;margin-top:110px}
      .sv-final .sv-gallery figure:nth-child(3){grid-column:3/span 8;margin-top:-20px;aspect-ratio:16/9}
      .sv-final .sv-gallery figure:before{content:attr(data-shot);position:absolute;z-index:2;left:13px;top:13px;padding:7px 9px;background:rgba(8,8,9,.68);font-size:8px;letter-spacing:.13em;color:rgba(255,255,255,.72);backdrop-filter:blur(8px)}
      .sv-final .sv-gallery img{transition:transform .8s cubic-bezier(.2,.7,.2,1)}
      .sv-final .sv-editorial-statement{display:grid;grid-template-columns:.52fr 1fr;gap:clamp(36px,8vw,120px);align-items:end;margin:0 0 86px;padding:clamp(54px,6vw,92px) 0;border-top:1px solid rgba(255,255,255,.11);border-bottom:1px solid rgba(255,255,255,.11)}
      .sv-final .sv-editorial-statement small{display:block;color:#c9536a;font-size:9px;letter-spacing:.18em;text-transform:uppercase;margin-bottom:16px}
      .sv-final .sv-editorial-statement h2{font-size:clamp(48px,6vw,88px);line-height:.9;letter-spacing:-.045em}
      .sv-final .sv-editorial-statement p{max-width:58ch;margin:0 0 4px;color:#b6aaa4;font-size:clamp(17px,1.5vw,22px);line-height:1.55}
      .sv-final .sv-body{display:block;padding:16px 0 86px;border-top:0}
      .sv-final .sv-sec{display:grid;grid-template-columns:120px minmax(220px,.55fr) minmax(0,1fr);gap:clamp(24px,4vw,60px);align-items:start;min-height:0;padding:34px 0;border:0;border-top:1px solid rgba(255,255,255,.12);border-radius:0;background:transparent}
      .sv-final .sv-sec:last-child{border-bottom:1px solid rgba(255,255,255,.12)}
      .sv-final .sv-sec-index{margin:8px 0 0;font-size:9px;color:#c9536a}
      .sv-final .sv-sec h2{font-size:clamp(31px,3.2vw,48px);line-height:1.02}
      .sv-final .sv-sec p{max-width:62ch;font-size:15px;line-height:1.78;color:#a99e98}
      .sv-final .sv-items-wrap{text-align:left;padding:72px 0 78px;border-top:0}
      .sv-final .sv-items-wrap>.sv-kicker{margin-bottom:24px}
      .sv-final .sv-items{display:grid;grid-template-columns:repeat(2,1fr);gap:0;margin:0;border-top:1px solid rgba(255,255,255,.12);counter-reset:svitem}
      .sv-final .sv-item{counter-increment:svitem;position:relative;display:flex;align-items:flex-end;min-height:128px;padding:22px 22px 22px 70px;border:0;border-radius:0;border-bottom:1px solid rgba(255,255,255,.12);font-family:Georgia,'Times New Roman',serif;font-size:clamp(20px,2vw,30px);line-height:1.08;color:#ddd3ce}
      .sv-final .sv-item:nth-child(odd){border-right:1px solid rgba(255,255,255,.12)}
      .sv-final .sv-item:before{content:"0" counter(svitem);position:absolute;left:20px;top:22px;color:#c9536a;font-family:'Helvetica Neue',Arial,sans-serif;font-size:9px;letter-spacing:.14em}
      .sv-final .sv-cta-row{padding:0 0 92px;text-align:left}
      .sv-final .sv-cta{width:100%;min-height:170px;justify-content:space-between;padding:32px 38px;border-radius:0;background:radial-gradient(circle at 85% 0,rgba(189,64,90,.35),transparent 32%),#8f2335;font-family:Georgia,'Times New Roman',serif;font-size:clamp(28px,4vw,58px);letter-spacing:-.02em;text-transform:none;transition:transform .3s ease,background .3s ease}
      .sv-final .sv-cta:hover{transform:translateY(-3px);background:radial-gradient(circle at 85% 0,rgba(225,92,117,.44),transparent 34%),#992636}
      .sv-final .sv-more{text-align:left;padding-top:52px}
      .sv-final .sv-more-links{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:22px;border-top:1px solid rgba(255,255,255,.12)}
      .sv-final .sv-more-links a{display:flex;align-items:flex-end;min-height:110px;padding:18px;border:0;border-radius:0;border-bottom:1px solid rgba(255,255,255,.12);border-right:1px solid rgba(255,255,255,.12);font-family:Georgia,'Times New Roman',serif;font-size:21px}
      .sv-final .is-final-reveal{opacity:0;transform:translateY(28px);transition:opacity .7s ease,transform .7s cubic-bezier(.2,.7,.2,1)}
      .sv-final .is-final-reveal.is-in{opacity:1;transform:none}

      /* VISUALIZATION HUB FINAL PASS */
      .lp2.lp2-final-visualization .lp2-hero{min-height:100svh;padding-bottom:clamp(60px,8vh,110px)}
      .lp2.lp2-final-visualization .lp2-hero-image{filter:saturate(.86) contrast(1.06)}
      .lp2.lp2-final-visualization .lp2-hero-shade{background:linear-gradient(90deg,rgba(5,6,8,.96) 0%,rgba(5,6,8,.78) 39%,rgba(5,6,8,.18) 70%,rgba(5,6,8,.48) 100%),linear-gradient(0deg,rgba(5,6,8,.96),transparent 60%)}
      .lp2.lp2-final-visualization .lp2-hero-copy{width:min(940px,68vw)}
      .lp2.lp2-final-visualization .lp2-hero h1{font-size:clamp(70px,10.5vw,172px);max-width:930px}
      .lp2.lp2-final-visualization .lp2-hero-proof{right:clamp(18px,4vw,64px);bottom:clamp(40px,7vh,90px);width:min(34vw,560px);transform:rotate(1.2deg);box-shadow:0 35px 90px rgba(0,0,0,.42)}
      .lp2.lp2-final-visualization .lp2-opening-proof{display:grid;grid-template-columns:1.25fr .75fr .75fr;gap:1px;padding:1px;background:rgba(255,255,255,.12)}
      .lp2.lp2-final-visualization .lp2-opening-proof figure{position:relative;margin:0;min-height:520px;overflow:hidden;background:#101114}
      .lp2.lp2-final-visualization .lp2-opening-proof figure:nth-child(2),.lp2.lp2-final-visualization .lp2-opening-proof figure:nth-child(3){min-height:420px}
      .lp2.lp2-final-visualization .lp2-opening-proof img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .8s cubic-bezier(.2,.7,.2,1)}
      .lp2.lp2-final-visualization .lp2-opening-proof figure:hover img{transform:scale(1.025)}
      .lp2.lp2-final-visualization .lp2-opening-proof figcaption{position:absolute;left:14px;bottom:14px;padding:8px 10px;background:rgba(8,9,11,.75);font:500 8px/1 'Artimist Mono',monospace;letter-spacing:.13em;text-transform:uppercase;backdrop-filter:blur(10px)}
      .lp2.lp2-final-visualization .lp2-trust article{min-height:220px}
      .lp2.lp2-final-visualization .lp2-split-visual{padding:0;overflow:hidden;place-items:stretch;background:#111317}
      .lp2.lp2-final-visualization .lp2-split-visual .lp2-generated-visual{width:100%;height:100%;min-height:760px;object-fit:cover;filter:saturate(.9) contrast(1.03)}
      .lp2.lp2-final-visualization .lp2-split-visual:after{content:"COMPOSE / LIGHT / RESOLVE";position:absolute;right:24px;bottom:24px;padding:9px 12px;background:rgba(8,9,11,.76);font:500 8px/1 'Artimist Mono',monospace;letter-spacing:.14em;color:#fff;backdrop-filter:blur(10px)}
      .lp2.lp2-final-visualization .lp2-process>div{grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,.13);border:0}
      .lp2.lp2-final-visualization .lp2-process article{position:relative;min-height:460px;padding:0 26px 28px;overflow:hidden;border:0;background:#0f1012}
      .lp2.lp2-final-visualization .lp2-process .lp2-step-art{position:absolute;inset:0;width:100%;height:58%;object-fit:cover;opacity:.72;filter:saturate(.72);mask-image:linear-gradient(#000 72%,transparent)}
      .lp2.lp2-final-visualization .lp2-process article small{position:relative;margin-top:240px}
      .lp2.lp2-final-visualization .lp2-process h3,.lp2.lp2-final-visualization .lp2-process article p{position:relative}
      .lp2.lp2-final-visualization .lp2-proof-grid{grid-template-columns:1.4fr .8fr .8fr;gap:1px;background:rgba(255,255,255,.12)}
      .lp2.lp2-final-visualization .lp2-proof figure{border:0}
      .lp2.lp2-final-visualization .lp2-proof figure:first-child img{aspect-ratio:16/10}
      .lp2.lp2-final-visualization .final-viz-nav{position:sticky;z-index:20;top:8px;display:flex;gap:5px;width:max-content;max-width:calc(100% - 28px);margin:-28px auto 0;padding:7px;background:rgba(8,9,11,.76);border:1px solid rgba(255,255,255,.14);border-radius:999px;backdrop-filter:blur(16px);overflow:auto;scrollbar-width:none}
      .lp2.lp2-final-visualization .final-viz-nav::-webkit-scrollbar{display:none}
      .lp2.lp2-final-visualization .final-viz-nav a{flex:none;padding:9px 13px;border-radius:999px;color:rgba(255,255,255,.7);font-size:9px;letter-spacing:.11em;text-transform:uppercase}
      .lp2.lp2-final-visualization .final-viz-nav a:hover{background:rgba(154,44,68,.28);color:#fff}

      @media(max-width:900px){
        .sv-final .sv-hero:not(.sv-hero--motion){grid-template-columns:1fr;min-height:auto;gap:0}
        .sv-final .sv-hero:not(.sv-hero--motion) .sv-hero-copy{margin:0 16px -54px;padding:30px;order:2}
        .sv-final .sv-hero:not(.sv-hero--motion) .sv-proof{order:1;height:auto;min-height:0;aspect-ratio:4/3}
        .sv-final .sv-story-nav{margin:12px auto 52px;top:6px}
        .sv-final .sv-editorial-statement{grid-template-columns:1fr;gap:24px}
        .sv-final .sv-sec{grid-template-columns:70px 1fr;gap:20px}
        .sv-final .sv-sec p{grid-column:2}
        .lp2.lp2-final-visualization .lp2-hero-copy{width:88vw}
        .lp2.lp2-final-visualization .lp2-hero-proof{width:min(50vw,420px);opacity:.9}
        .lp2.lp2-final-visualization .lp2-opening-proof{grid-template-columns:1fr 1fr}
        .lp2.lp2-final-visualization .lp2-opening-proof figure:first-child{grid-column:1/3}
        .lp2.lp2-final-visualization .lp2-opening-proof figure{min-height:380px}
      }
      @media(max-width:620px){
        .sv-final .sv-wrap{padding-inline:16px}
        .sv-final .sv-back{padding-top:82px}
        .sv-final .sv-hero:not(.sv-hero--motion){padding-top:0}
        .sv-final .sv-hero:not(.sv-hero--motion) .sv-hero-copy{margin:0 8px -38px;padding:24px}
        .sv-final .sv-hero:not(.sv-hero--motion) h1{font-size:clamp(45px,14vw,64px)}
        .sv-final .sv-hero:not(.sv-hero--motion) .sv-tagline{font-size:23px}
        .sv-final .sv-gallery{display:flex;overflow-x:auto;gap:10px;padding:0 0 58px;scroll-snap-type:x mandatory;scrollbar-width:none}
        .sv-final .sv-gallery::-webkit-scrollbar{display:none}
        .sv-final .sv-gallery figure,.sv-final .sv-gallery figure:nth-child(1),.sv-final .sv-gallery figure:nth-child(2),.sv-final .sv-gallery figure:nth-child(3){flex:0 0 84vw;margin:0;aspect-ratio:4/3;scroll-snap-align:center}
        .sv-final .sv-editorial-statement{padding:48px 4px;margin-bottom:54px}
        .sv-final .sv-editorial-statement h2{font-size:clamp(42px,13vw,62px)}
        .sv-final .sv-sec{grid-template-columns:44px 1fr;padding:26px 4px}
        .sv-final .sv-sec h2{font-size:31px}
        .sv-final .sv-items{grid-template-columns:1fr}
        .sv-final .sv-item:nth-child(odd){border-right:0}
        .sv-final .sv-cta{min-height:138px;padding:26px 22px}
        .sv-final .sv-more-links{grid-template-columns:1fr}
        .sv-final .sv-more-links a{border-right:0}
        .lp2.lp2-final-visualization .lp2-hero h1{font-size:clamp(58px,18vw,92px)}
        .lp2.lp2-final-visualization .lp2-hero-proof{width:62vw;right:-8vw;bottom:90px;opacity:.56}
        .lp2.lp2-final-visualization .lp2-opening-proof{display:flex;overflow-x:auto;gap:1px;scroll-snap-type:x mandatory;scrollbar-width:none}
        .lp2.lp2-final-visualization .lp2-opening-proof figure,.lp2.lp2-final-visualization .lp2-opening-proof figure:first-child{flex:0 0 86vw;min-height:420px;scroll-snap-align:center}
        .lp2.lp2-final-visualization .lp2-split-visual .lp2-generated-visual{min-height:520px}
        .lp2.lp2-final-visualization .lp2-process>div{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}
        .lp2.lp2-final-visualization .lp2-process article{flex:0 0 84vw;scroll-snap-align:center}
        .lp2.lp2-final-visualization .lp2-proof-grid{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}
        .lp2.lp2-final-visualization .lp2-proof figure{flex:0 0 84vw;scroll-snap-align:center}
      }
      @media(prefers-reduced-motion:reduce){
        .sv-final .is-final-reveal{opacity:1;transform:none;transition:none}
        .sv-final .sv-gallery img,.sv-final .sv-proof img,.lp2.lp2-final-visualization img{transition:none!important}
      }
    `;
    document.head.appendChild(style);
  }

  function revealWithin(root, selector) {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const nodes = [...root.querySelectorAll(selector)].filter((node) => !node.classList.contains("is-final-reveal"));
    if (!nodes.length) return;
    nodes.forEach((node) => node.classList.add("is-final-reveal"));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -4% 0px" });
    nodes.forEach((node) => observer.observe(node));
  }

  function enhanceService(current) {
    const root = document.querySelector(".sv-root");
    if (!root || root.classList.contains("sv-final")) return false;
    root.classList.add("sv-final");
    root.dataset.renderingPage = current.split("/").pop() || "rendering";

    const hero = root.querySelector(".sv-hero");
    const gallery = root.querySelector(".sv-gallery");
    const body = root.querySelector(".sv-body");
    const items = root.querySelector(".sv-items-wrap");
    const cta = root.querySelector(".sv-cta-row");
    const more = root.querySelector(".sv-more");
    if (!hero || !gallery || !body || !items || !cta) return true;

    hero.id = "overview";
    gallery.id = "visuals";
    body.id = "method";
    items.id = "deliverables";
    cta.id = "start";
    if (more) more.id = "related";

    gallery.querySelectorAll("figure").forEach((figure, index) => {
      figure.dataset.shot = `0${index + 1} / SELECTED VIEW`;
    });

    if (!root.querySelector(".sv-story-nav")) {
      const nav = document.createElement("nav");
      nav.className = "sv-story-nav";
      nav.setAttribute("aria-label", "Page sections");
      nav.innerHTML = `<a href="#overview">Overview</a><a href="#visuals">Visuals</a><a href="#method">Method</a><a href="#deliverables">Deliverables</a><a href="#start">Start project</a>`;
      hero.insertAdjacentElement("afterend", nav);
    }

    const statement = STATEMENTS[current];
    if (statement && !root.querySelector(".sv-editorial-statement")) {
      const section = document.createElement("section");
      section.className = "sv-editorial-statement";
      section.innerHTML = `<div><small>${statement.eyebrow}</small><h2>${statement.title}</h2></div><p>${statement.copy}</p>`;
      gallery.insertAdjacentElement("afterend", section);
    }

    revealWithin(root, ".sv-gallery figure,.sv-editorial-statement,.sv-sec,.sv-item,.sv-cta-row,.sv-more");
    return true;
  }

  function enhanceVisualization() {
    const root = document.querySelector(".lp2");
    if (!root || root.classList.contains("lp2-final-visualization")) return false;
    root.classList.add("lp2-final-visualization");
    const hero = root.querySelector(".lp2-hero");
    const intro = root.querySelector(".lp2-intro");
    const proof = root.querySelector(".lp2-proof");
    const process = root.querySelector(".lp2-process");
    const cta = root.querySelector(".lp2-cta");
    if (hero) hero.id = "viz-overview";
    if (intro) intro.id = "viz-scope";
    if (process) process.id = "viz-process";
    if (proof) proof.id = "viz-work";
    if (cta) cta.id = "viz-start";

    if (hero && !root.querySelector(".final-viz-nav")) {
      const nav = document.createElement("nav");
      nav.className = "final-viz-nav";
      nav.setAttribute("aria-label", "Visualization page sections");
      nav.innerHTML = `<a href="#viz-overview">Overview</a><a href="#viz-scope">Scope</a><a href="#viz-process">Process</a><a href="#viz-work">Work</a><a href="#viz-start">Start project</a>`;
      hero.insertAdjacentElement("afterend", nav);
    }
    return true;
  }

  function mount() {
    const current = path();
    if (!TARGETS.has(current)) return;
    addStyles();
    if (current === "/visualization") enhanceVisualization();
    else enhanceService(current);
  }

  let lastPath = "";
  function check() {
    const current = path();
    if (current !== lastPath) lastPath = current;
    mount();
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", check, { once: true });
  else check();

  const observer = new MutationObserver(() => check());
  observer.observe(document.documentElement, { childList: true, subtree: true });
  window.addEventListener("popstate", () => setTimeout(check, 0));
})();
