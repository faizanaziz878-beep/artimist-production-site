"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import type { SiteSettings } from "../../lib/content";
import { getStudioOffices, serviceWorlds as defaultServices } from "../../lib/content";
import { UiIcon } from "../ui-icon";

function Arrow({ down = false }: { down?: boolean }) {
  return <UiIcon className={down ? "about-arrow-down" : "ui-icon"} name={down ? "chevron" : "arrow"} size={16} />;
}

const principles = [
  ["01", "Understand before styling", "We begin with people, place, purpose and constraint. The visual language follows the idea."],
  ["02", "Keep one direction", "Architecture, imagery, motion and digital work should feel authored by the same studio."],
  ["03", "Show the thinking", "Plans, models, studies and iterations matter because they make the final result believable."],
  ["04", "Deliver clearly", "A strong concept only becomes useful when files, drawings and decisions are resolved properly."],
] as const;

const process = [
  ["01", "Listen", "Brief, context and priorities."],
  ["02", "Frame", "A clear creative and technical direction."],
  ["03", "Develop", "Space, drawings, imagery and experience."],
  ["04", "Resolve", "Coordination, detail and review."],
  ["05", "Deliver", "Useful final outputs and source files."],
] as const;

const pageCss = `
.aboutx{--bg:#08090b;--paper:#e8e3db;--ink:#111214;--text:#f0ebe5;--muted:rgba(240,235,229,.62);--line:rgba(255,255,255,.14);--wine:#a12e47;min-height:100vh;background:var(--bg);color:var(--text);font-family:"Artimist Geist","Helvetica Neue",Arial,sans-serif;overflow:hidden}.aboutx *{box-sizing:border-box}.aboutx a{color:inherit}.aboutx h1,.aboutx h2,.aboutx h3{font-family:"Bodoni 72",Didot,"Iowan Old Style",Baskerville,Georgia,serif;font-weight:400;text-wrap:balance}.aboutx-shell{width:min(1540px,calc(100% - clamp(40px,7vw,112px)));margin:auto}.aboutx-kicker{font:650 9px/1.3 "Artimist Mono",monospace;letter-spacing:.17em;text-transform:uppercase;color:#db6379}.aboutx-progress{position:fixed;z-index:500;left:0;top:0;width:calc(var(--ed-progress,0) * 100%);height:2px;background:#a12e47}.aboutx-hero{position:relative;min-height:100svh;display:flex;align-items:flex-end;isolation:isolate;overflow:hidden;padding:120px 0 72px}.aboutx-hero>img{position:absolute;z-index:-3;inset:0;width:100%;height:100%;object-fit:cover;filter:saturate(.78) contrast(1.04)}.aboutx-hero:after{content:"";position:absolute;z-index:-2;inset:0;background:linear-gradient(90deg,rgba(5,6,8,.93),rgba(5,6,8,.35) 57%,rgba(5,6,8,.08)),linear-gradient(0deg,rgba(5,6,8,.9),transparent 58%)}.aboutx-hero-grid{position:absolute;z-index:-1;inset:88px 16px 16px;border:1px solid rgba(255,255,255,.15);pointer-events:none}.aboutx-hero-grid:before,.aboutx-hero-grid:after,.aboutx-hero-grid i{content:"";position:absolute;background:rgba(255,255,255,.14)}.aboutx-hero-grid:before{left:11%;top:0;bottom:0;width:1px}.aboutx-hero-grid:after{left:62%;top:0;bottom:0;width:1px}.aboutx-hero-grid i:nth-child(1){top:27%;left:0;right:0;height:1px}.aboutx-hero-grid i:nth-child(2){top:68%;left:0;right:0;height:1px}.aboutx-hero-inner{width:100%;display:grid;grid-template-columns:1.2fr .8fr;gap:clamp(44px,7vw,120px);align-items:end}.aboutx-hero h1{margin:26px 0 0;font-size:clamp(76px,10.7vw,174px);line-height:.79;letter-spacing:-.062em;max-width:1080px}.aboutx-hero h1 em{color:#e7b4be;font-weight:400}.aboutx-hero-side{max-width:520px;padding-bottom:18px}.aboutx-hero-side p{margin:0;font-family:"Bodoni 72",Didot,serif;font-size:clamp(24px,2.35vw,38px);line-height:1.13;color:rgba(255,255,255,.88)}.aboutx-hero-side a{display:inline-flex;align-items:center;gap:10px;margin-top:30px;padding-bottom:6px;border-bottom:1px solid rgba(255,255,255,.44);font:650 9px/1.2 "Artimist Mono",monospace;letter-spacing:.12em;text-transform:uppercase;text-decoration:none}.aboutx-hero-foot{position:absolute;left:clamp(20px,3.5vw,58px);right:clamp(20px,3.5vw,58px);bottom:22px;display:flex;justify-content:space-between;gap:24px;color:rgba(255,255,255,.5);font:600 8px/1.4 "Artimist Mono",monospace;letter-spacing:.11em;text-transform:uppercase}.aboutx-intro{background:var(--paper);color:var(--ink);padding:clamp(110px,11vw,180px) 0}.aboutx-intro-grid{display:grid;grid-template-columns:.52fr 1.48fr;gap:clamp(50px,8vw,140px)}.aboutx-intro h2{margin:0;font-size:clamp(58px,7.4vw,118px);line-height:.86;letter-spacing:-.052em}.aboutx-intro h2 em{color:#972c42;font-weight:400}.aboutx-intro-copy{align-self:end;max-width:850px}.aboutx-intro-copy p:first-child{margin:0;font-family:"Bodoni 72",Didot,serif;font-size:clamp(26px,3vw,46px);line-height:1.13}.aboutx-intro-copy p:last-child{max-width:680px;margin:30px 0 0;color:rgba(17,18,20,.62);font-size:14px;line-height:1.75}.aboutx-founder{display:grid;grid-template-columns:.95fr 1.05fr;min-height:740px;background:#0c0d10}.aboutx-founder-media{position:relative;overflow:hidden}.aboutx-founder-media img{width:100%;height:100%;object-fit:cover;display:block}.aboutx-founder-copy{display:flex;flex-direction:column;justify-content:center;padding:clamp(60px,8vw,130px)}.aboutx-founder-copy h2{margin:35px 0 25px;font-size:clamp(50px,6.2vw,96px);line-height:.88;letter-spacing:-.05em}.aboutx-founder-copy p{max-width:600px;margin:0;color:var(--muted);font-size:15px;line-height:1.75}.aboutx-founder-copy a{display:inline-flex;align-items:center;justify-content:space-between;gap:20px;margin-top:40px;padding:18px 0;border-top:1px solid var(--line);border-bottom:1px solid var(--line);text-decoration:none;font-family:"Bodoni 72",Didot,serif;font-size:clamp(22px,2vw,31px)}.aboutx-principles{padding:clamp(100px,10vw,160px) 0}.aboutx-section-head{display:grid;grid-template-columns:.3fr .7fr;gap:50px;align-items:start;margin-bottom:70px}.aboutx-section-head h2{margin:0;font-size:clamp(54px,6.6vw,104px);line-height:.86;letter-spacing:-.05em}.aboutx-principle-grid{display:grid;grid-template-columns:repeat(4,1fr);border-top:1px solid var(--line);border-left:1px solid var(--line)}.aboutx-principle-grid article{min-height:340px;padding:28px;display:flex;flex-direction:column;border-right:1px solid var(--line);border-bottom:1px solid var(--line)}.aboutx-principle-grid article>span{font:600 8px/1 var(--ap-mono,"Artimist Mono",monospace);color:#d85c73}.aboutx-principle-grid h3{margin:auto 0 18px;font-size:clamp(28px,2.7vw,42px);line-height:.98}.aboutx-principle-grid p{margin:0;color:var(--muted);font-size:12px;line-height:1.65}.aboutx-workband{display:grid;grid-template-columns:1.35fr .65fr;grid-template-rows:330px 330px;gap:12px;padding:12px;background:#08090b}.aboutx-workband figure{position:relative;margin:0;overflow:hidden;background:#151515}.aboutx-workband figure:first-child{grid-row:1/3}.aboutx-workband img{display:block;width:100%;height:100%;object-fit:cover;transition:transform 1s cubic-bezier(.2,.7,.2,1)}.aboutx-workband figure:hover img{transform:scale(1.018)}.aboutx-workband figcaption{position:absolute;left:18px;bottom:16px;padding:8px 10px;background:rgba(7,7,8,.76);backdrop-filter:blur(10px);font:600 8px/1.2 "Artimist Mono",monospace;letter-spacing:.12em;text-transform:uppercase}.aboutx-services{padding:clamp(110px,11vw,180px) 0;background:var(--paper);color:var(--ink)}.aboutx-services-list{margin-top:70px;border-top:1px solid rgba(0,0,0,.22)}.aboutx-service{display:grid;grid-template-columns:70px .75fr 1.25fr auto;gap:28px;align-items:center;padding:26px 0;border-bottom:1px solid rgba(0,0,0,.2)}.aboutx-service small{font:600 9px/1 "Artimist Mono",monospace;color:#9b2e45}.aboutx-service h3{margin:0;font-size:clamp(29px,3.1vw,48px);line-height:.95}.aboutx-service p{max-width:620px;margin:0;color:rgba(17,18,20,.58);font-size:13px;line-height:1.6}.aboutx-process{padding:clamp(110px,11vw,180px) 0}.aboutx-process-grid{display:grid;grid-template-columns:repeat(5,1fr);margin-top:70px;border-top:1px solid var(--line)}.aboutx-process-grid article{min-height:310px;padding:26px 26px 30px 0;border-bottom:1px solid var(--line);display:flex;flex-direction:column}.aboutx-process-grid article+article{padding-left:26px;border-left:1px solid var(--line)}.aboutx-process-grid span{font:600 8px/1 "Artimist Mono",monospace;color:#d85c73}.aboutx-process-grid h3{margin:auto 0 14px;font-size:clamp(27px,2.6vw,40px)}.aboutx-process-grid p{margin:0;color:var(--muted);font-size:12px;line-height:1.6}.aboutx-contact{padding:clamp(100px,10vw,160px) 0;background:radial-gradient(circle at 82% 12%,rgba(166,46,72,.22),transparent 34%),#0c0b0d}.aboutx-contact-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:clamp(50px,8vw,140px)}.aboutx-contact h2{margin:35px 0 0;font-size:clamp(58px,7.4vw,118px);line-height:.84;letter-spacing:-.055em}.aboutx-contact h2 em{color:#e5b2bc;font-weight:400}.aboutx-contact-links{align-self:end;border-top:1px solid var(--line)}.aboutx-contact-links a{display:grid;grid-template-columns:1fr auto;align-items:center;gap:20px;padding:20px 0;border-bottom:1px solid var(--line);text-decoration:none}.aboutx-contact-links span{display:block;color:rgba(255,255,255,.45);font:600 8px/1.4 "Artimist Mono",monospace;letter-spacing:.11em;text-transform:uppercase}.aboutx-contact-links strong{display:block;margin-top:6px;font-family:"Bodoni 72",Didot,serif;font-size:clamp(21px,2vw,30px);font-weight:400}.aboutx-reveal{opacity:0;transform:translateY(24px);transition:opacity .85s cubic-bezier(.2,.7,.2,1),transform .85s cubic-bezier(.2,.7,.2,1)}.aboutx-reveal.is-seen{opacity:1;transform:none}@media(max-width:980px){.aboutx-hero-inner,.aboutx-intro-grid,.aboutx-founder,.aboutx-contact-grid{grid-template-columns:1fr}.aboutx-hero-side{max-width:620px}.aboutx-founder-media{min-height:65vw}.aboutx-principle-grid{grid-template-columns:1fr 1fr}.aboutx-process-grid{grid-template-columns:1fr 1fr}.aboutx-process-grid article+article{padding-left:0;border-left:0}.aboutx-service{grid-template-columns:50px 1fr auto}.aboutx-service p{grid-column:2/4}.aboutx-workband{grid-template-rows:280px 220px}}
@media(max-width:620px){.aboutx-shell{width:calc(100% - 28px)}.aboutx-hero{padding:104px 0 74px}.aboutx-hero h1{font-size:clamp(60px,18vw,88px)}.aboutx-hero-foot{display:none}.aboutx-hero-grid{inset:76px 10px 10px}.aboutx-intro,.aboutx-principles,.aboutx-services,.aboutx-process,.aboutx-contact{padding-top:86px;padding-bottom:96px}.aboutx-intro h2,.aboutx-contact h2{font-size:clamp(52px,15vw,74px)}.aboutx-founder-media{min-height:108vw}.aboutx-founder-copy{padding:70px 20px}.aboutx-principle-grid{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;border-left:0;scrollbar-width:none}.aboutx-principle-grid::-webkit-scrollbar{display:none}.aboutx-principle-grid article{flex:0 0 82vw;scroll-snap-align:center;border-left:1px solid var(--line)}.aboutx-workband{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;gap:10px;padding-left:14px;scrollbar-width:none}.aboutx-workband figure,.aboutx-workband figure:first-child{flex:0 0 86vw;height:112vw;grid-row:auto;scroll-snap-align:center}.aboutx-section-head{grid-template-columns:1fr;gap:22px}.aboutx-service{grid-template-columns:38px 1fr auto;gap:15px}.aboutx-service p{grid-column:2/4}.aboutx-process-grid{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none}.aboutx-process-grid article{flex:0 0 74vw;scroll-snap-align:center}.aboutx-contact-links{margin-top:30px}.aboutx-contact-links strong{font-size:22px;overflow-wrap:anywhere}}
@media(prefers-reduced-motion:reduce){.aboutx-reveal{opacity:1;transform:none;transition:none}.aboutx-workband img{transition:none}}
`;

export function AboutExperience({ settings }: { settings: SiteSettings }) {
  const locations = getStudioOffices(settings);
  const services = useMemo(() => {
    try {
      const parsed = JSON.parse(settings.servicesJson || "[]");
      return Array.isArray(parsed) && parsed.length ? parsed as typeof defaultServices : defaultServices;
    } catch {
      return defaultServices;
    }
  }, [settings.servicesJson]);

  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty("--ed-progress", String(total > 0 ? window.scrollY / total : 0));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-seen")), { threshold: 0.1 });
    document.querySelectorAll(".aboutx-reveal").forEach((node) => observer.observe(node));
    return () => { window.removeEventListener("scroll", onScroll); observer.disconnect(); };
  }, []);

  const network = locations.length ? locations.map((location) => location.label).join(" · ") : "Worldwide";

  return <main className="aboutx" id="top">
    <style dangerouslySetInnerHTML={{ __html: pageCss }} />
    <div className="aboutx-progress" aria-hidden="true" />

    <section className="aboutx-hero">
      <img src="/media/walkthrough/music/campus-overview.webp" alt="Harmonic Horizons cultural campus architecture by Artimist Productions" fetchPriority="high" />
      <div className="aboutx-hero-grid" aria-hidden="true"><i/><i/></div>
      <div className="aboutx-shell aboutx-hero-inner">
        <div className="aboutx-reveal"><span className="aboutx-kicker">About / Artimist Productions</span><h1>One studio.<br/><em>Many disciplines.</em></h1></div>
        <div className="aboutx-hero-side aboutx-reveal"><p>Architecture is the foundation. Visualization, BIM, interiors, motion and real-time craft make the idea easier to understand, build and believe in.</p><a href="#practice">Enter the practice <Arrow down /></a></div>
      </div>
      <div className="aboutx-hero-foot"><span>Architecture · BIM · Visualization · Interiors · Motion</span><span>{network}</span></div>
    </section>

    <section className="aboutx-intro" id="practice"><div className="aboutx-shell aboutx-intro-grid">
      <div className="aboutx-reveal"><span className="aboutx-kicker">01 / The practice</span><h2>Ideas need<br/><em>continuity.</em></h2></div>
      <div className="aboutx-intro-copy aboutx-reveal"><p>Artimist connects design thinking and production so the project does not lose its direction between the first idea and the final output.</p><p>Clients can bring us one focused task or a larger multidisciplinary brief. The aim stays the same: clear decisions, coherent visual language and work that is professionally useful—not just attractive on a screen.</p></div>
    </div></section>

    <section className="aboutx-founder">
      <div className="aboutx-founder-media"><img src="/media/atlas/atlas-13.webp" alt="Artimist spatial study with material, daylight and water" loading="lazy" /></div>
      <div className="aboutx-founder-copy aboutx-reveal"><span className="aboutx-kicker">02 / Point of view</span><h2>Design should make the next decision easier.</h2><p>That principle shapes how the studio works across architecture, drawings, CGI and interactive environments. Every medium should clarify the project rather than decorate it.</p><Link href="/founder-message"><span>A note from Faizan Aziz</span><Arrow /></Link></div>
    </section>

    <section className="aboutx-principles"><div className="aboutx-shell">
      <header className="aboutx-section-head aboutx-reveal"><span className="aboutx-kicker">03 / Principles</span><h2>How the studio thinks.</h2></header>
      <div className="aboutx-principle-grid">{principles.map(([number,title,copy])=><article className="aboutx-reveal" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </div></section>

    <section className="aboutx-workband" aria-label="Selected Artimist work">
      <figure><img src="/media/walkthrough/canopy/pavilion-sunset.webp" alt="Parametric pavilion architecture at sunset" loading="lazy"/><figcaption>Architecture / Atmosphere</figcaption></figure>
      <figure><img src="/media/walkthrough/canopy/technical-sequence.webp" alt="Parametric architectural drawing and development sequence" loading="lazy"/><figcaption>Process / Drawing</figcaption></figure>
      <figure><img src="/media/editorial/sound-to-form.webp" alt="Artimist sound-to-form architectural research study" loading="lazy"/><figcaption>Research / Form</figcaption></figure>
    </section>

    <section className="aboutx-services"><div className="aboutx-shell">
      <header className="aboutx-section-head aboutx-reveal"><span className="aboutx-kicker">04 / Disciplines</span><h2>One direction,<br/>different tools.</h2></header>
      <div className="aboutx-services-list">{services.slice(0,8).map((service)=><article className="aboutx-service aboutx-reveal" key={service.code}><small>{service.code}</small><h3>{service.title}</h3><p>{service.subtitle || service.copy}</p><UiIcon name="arrow" size={16}/></article>)}</div>
    </div></section>

    <section className="aboutx-process"><div className="aboutx-shell">
      <header className="aboutx-section-head aboutx-reveal"><span className="aboutx-kicker">05 / Method</span><h2>Five moves.<br/>One continuous idea.</h2></header>
      <div className="aboutx-process-grid">{process.map(([number,title,copy])=><article className="aboutx-reveal" key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </div></section>

    <section className="aboutx-contact"><div className="aboutx-shell aboutx-contact-grid">
      <div className="aboutx-reveal"><span className="aboutx-kicker">06 / Start somewhere useful</span><h2>Bring us the<br/><em>real problem.</em></h2></div>
      <div className="aboutx-contact-links aboutx-reveal">
        <Link href="/case-studies"><div><span>Project evidence</span><strong>See how we work</strong></div><Arrow/></Link>
        <Link href="/team"><div><span>People</span><strong>Meet the studio</strong></div><Arrow/></Link>
        <Link href="/services"><div><span>Capabilities</span><strong>Explore services</strong></div><Arrow/></Link>
        <Link href="/contact"><div><span>New project</span><strong>Brief the studio</strong></div><Arrow/></Link>
        <a href={`mailto:${settings.contactEmail}`}><div><span>Direct email</span><strong>{settings.contactEmail}</strong></div><Arrow/></a>
      </div>
    </div></section>
  </main>;
}
