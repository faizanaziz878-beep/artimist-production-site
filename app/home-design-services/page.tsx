import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home Design Services, Floor Plans, Interiors & 3D | Artimist",
  description: "Home design help in simple terms: custom house plans, floor plan changes, interior design, renovation drawings, 3D visualization and drafting for homeowners worldwide.",
  alternates: { canonical: "/home-design-services" },
};

const paths = [
  {
    title: "Redesign my interior",
    text: "Rework the mood, layout, furniture, materials and lighting of one room or the entire home — then see it in realistic 3D.",
    href: "/3d-interior-design-service",
    image: "/img/homeint03.webp",
    label: "Interior design + 3D",
  },
  {
    title: "Change my floor plan",
    text: "Improve circulation, resize rooms, open up spaces or rethink an existing plan before construction starts.",
    href: "/plan-modification-service",
    image: "/img/permit04.webp",
    label: "Layout redesign",
  },
  {
    title: "Redesign my home",
    text: "Bring architecture, interiors and visualization together into one coherent direction for a renovation or new home.",
    href: "/custom-house-design",
    image: "/img/resext03.webp",
    label: "Whole-home design",
  },
];

const services = [
  { title: "Design my house", href: "/custom-house-design" },
  { title: "Design my interior", href: "/3d-interior-design-service" },
  { title: "Change my floor plan", href: "/plan-modification-service" },
  { title: "Plan my renovation", href: "/residential-renovation-permit-drawings" },
  { title: "Show me what it will look like", href: "/visualization" },
  { title: "Prepare clean drawings", href: "/architectural-drafting-services" },
];

const css = `
.hd{background:#090909;color:#f1ebe6;min-height:100vh;font-family:Arial,Helvetica,sans-serif;overflow:hidden}.hd *{box-sizing:border-box}.hd a{color:inherit;text-decoration:none}.hd-shell{width:min(1240px,calc(100% - 44px));margin:auto}.hd-serif{font-family:Georgia,'Times New Roman',serif;font-weight:400}.hd-eyebrow{font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#ce6d7e;font-weight:700}.hd-hero{position:relative;display:grid;grid-template-columns:.92fr 1.08fr;gap:54px;align-items:center;min-height:760px;padding:132px 0 76px}.hd-hero:before{content:'';position:absolute;width:560px;height:560px;border-radius:50%;background:rgba(139,28,47,.18);filter:blur(120px);left:-300px;top:40px;pointer-events:none}.hd-copy{position:relative;z-index:2}.hd h1{font-family:Georgia,'Times New Roman',serif;font-size:clamp(56px,7.2vw,104px);font-weight:400;line-height:.92;letter-spacing:-.052em;margin:18px 0 26px;max-width:8.4ch}.hd-lead{font-size:18px;line-height:1.65;color:#bdb2ac;max-width:620px}.hd-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:31px}.hd-btn{display:inline-flex;align-items:center;justify-content:center;padding:14px 21px;border-radius:999px;font-size:11px;letter-spacing:.08em;text-transform:uppercase;transition:transform .25s ease,background .25s ease,border-color .25s ease}.hd-btn:hover{transform:translateY(-2px)}.hd-primary{background:#a32840;color:#fff}.hd-secondary{border:1px solid rgba(255,255,255,.18);background:rgba(255,255,255,.025)}.hd-mini{display:flex;gap:25px;margin-top:34px;color:#8f8580;font-size:11px;text-transform:uppercase;letter-spacing:.08em}.hd-mini span{position:relative;padding-left:14px}.hd-mini span:before{content:'';position:absolute;width:5px;height:5px;border-radius:50%;background:#a32840;left:0;top:5px}.hd-media{position:relative;min-height:620px}.hd-main-img{position:absolute;inset:0 72px 0 0;border-radius:26px;overflow:hidden;border:1px solid rgba(255,255,255,.1);box-shadow:0 44px 110px rgba(0,0,0,.58)}.hd-main-img img,.hd-float img,.hd-proof img{width:100%;height:100%;object-fit:cover;display:block}.hd-main-img img{animation:hdBreath 13s ease-in-out infinite alternate}.hd-main-img:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.02) 50%,rgba(0,0,0,.68) 100%)}.hd-caption{position:absolute;z-index:2;left:22px;bottom:20px;font-size:9px;text-transform:uppercase;letter-spacing:.13em;color:#eee5df}.hd-float{position:absolute;right:0;bottom:46px;width:240px;height:300px;border-radius:18px;overflow:hidden;border:8px solid #090909;box-shadow:0 24px 70px rgba(0,0,0,.55)}.hd-stat{position:absolute;z-index:3;right:18px;top:34px;padding:14px 16px;border:1px solid rgba(255,255,255,.15);border-radius:999px;background:rgba(8,8,8,.68);backdrop-filter:blur(14px);font-size:10px;text-transform:uppercase;letter-spacing:.11em}
.hd-intro{padding:82px 0 72px}.hd-intro-panel{position:relative;padding:44px;border:1px solid rgba(255,255,255,.1);border-radius:22px;background:linear-gradient(135deg,rgba(255,255,255,.028),rgba(163,40,64,.055));overflow:hidden}.hd-intro-panel:before{content:'';position:absolute;left:0;top:0;width:4px;height:100%;background:#a32840}.hd-intro-copy{display:grid;grid-template-columns:.85fr 1.15fr;gap:50px;align-items:end}.hd-intro h2{font-family:Georgia,'Times New Roman',serif;font-size:clamp(40px,4.2vw,58px);line-height:1.01;letter-spacing:-.04em;margin:10px 0 0;max-width:12ch;font-weight:400}.hd-intro p{font-size:16px;line-height:1.6;color:#a99e98;margin:0;max-width:540px}
.hd-choice-list{display:grid;gap:14px;margin-top:34px}.hd-choice{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);min-height:285px;border:1px solid rgba(255,255,255,.1);border-radius:18px;background:#0d0c0c;overflow:hidden;transition:transform .3s ease,border-color .3s ease,box-shadow .3s ease}.hd-choice:hover{transform:translateY(-3px);border-color:rgba(206,109,126,.42);box-shadow:0 24px 60px rgba(0,0,0,.3)}.hd-choice:nth-child(even) .hd-choice-image{grid-column:2;grid-row:1}.hd-choice:nth-child(even) .hd-choice-copy{grid-column:1;grid-row:1}.hd-choice-image{position:relative;min-height:285px;background-size:cover;background-position:center;background-repeat:no-repeat;overflow:hidden;transition:transform .55s ease,filter .35s ease}.hd-choice-image:after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.02) 42%,rgba(0,0,0,.5) 100%)}.hd-choice:hover .hd-choice-image{filter:brightness(1.05)}.hd-choice-index{position:absolute;z-index:2;left:18px;top:18px;font-size:9px;letter-spacing:.13em;color:#f1e8e2;background:rgba(8,8,8,.62);border:1px solid rgba(255,255,255,.15);border-radius:999px;padding:8px 10px;backdrop-filter:blur(8px)}.hd-choice-arrow{position:absolute;z-index:2;right:18px;top:18px;width:38px;height:38px;display:grid;place-items:center;border:1px solid rgba(255,255,255,.18);border-radius:50%;background:rgba(8,8,8,.62);font-size:18px;color:#f2eae5;backdrop-filter:blur(8px);transition:transform .25s ease,background .25s ease}.hd-choice:hover .hd-choice-arrow{transform:translate(2px,-2px);background:#a32840}.hd-choice-copy{display:flex;flex-direction:column;justify-content:center;padding:34px 38px}.hd-choice-copy small{display:block;font-size:9px;color:#c66f80;letter-spacing:.13em;text-transform:uppercase;margin-bottom:10px}.hd-choice-copy h3{font-family:Georgia,'Times New Roman',serif;font-size:clamp(31px,3vw,43px);line-height:1.02;font-weight:400;letter-spacing:-.025em;margin:0}.hd-choice-copy p{font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.62;color:#998e88;margin:15px 0 0;max-width:520px}.hd-choice-cta{display:inline-flex;align-items:center;gap:9px;margin-top:24px;font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#ded4ce}.hd-choice-cta b{font-size:14px;font-weight:400;color:#ce6d7e}
.hd-transform{padding:82px 0;border-top:1px solid rgba(255,255,255,.09);border-bottom:1px solid rgba(255,255,255,.09)}.hd-transform-head{display:flex;justify-content:space-between;gap:30px;align-items:end;margin-bottom:30px}.hd-transform h2{font-family:Georgia,'Times New Roman',serif;font-size:clamp(40px,4.7vw,64px);font-weight:400;line-height:1;margin:8px 0 0;max-width:10ch}.hd-transform-copy{max-width:480px;color:#9e948e;line-height:1.6}.hd-flow{display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.1);border-radius:18px;overflow:hidden}.hd-flow article{position:relative;background:#0e0d0d;padding:28px;min-height:220px}.hd-flow span{display:block;font-size:10px;color:#c56a7c;letter-spacing:.15em;text-transform:uppercase}.hd-flow h3{font-family:Georgia,'Times New Roman',serif;font-size:28px;font-weight:400;margin:42px 0 9px}.hd-flow p{margin:0;color:#9e948e;line-height:1.55;font-size:14px}.hd-proof-wrap{padding:90px 0}.hd-proof{display:grid;grid-template-columns:1.2fr .8fr;min-height:620px;border-radius:22px;overflow:hidden;border:1px solid rgba(255,255,255,.1);background:#0e0d0d}.hd-proof-media{position:relative;min-height:620px}.hd-proof-media:after{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(0,0,0,.05),rgba(0,0,0,.25))}.hd-proof-copy{display:flex;flex-direction:column;justify-content:center;padding:52px}.hd-proof-copy h2{font-family:Georgia,'Times New Roman',serif;font-size:46px;line-height:1.03;font-weight:400;margin:12px 0 18px}.hd-proof-copy p{color:#a79d97;line-height:1.65;margin:0 0 27px}.hd-services{padding:80px 0;border-top:1px solid rgba(255,255,255,.09)}.hd-services-head{display:grid;grid-template-columns:.85fr 1.15fr;gap:70px;margin-bottom:30px}.hd-services h2{font-family:Georgia,'Times New Roman',serif;font-size:50px;font-weight:400;line-height:1;margin:8px 0 0}.hd-services-head p{color:#9f958f;font-size:17px;line-height:1.65}.hd-service-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.hd-service{padding:22px;border:1px solid rgba(255,255,255,.1);border-radius:14px;background:rgba(255,255,255,.02);font-family:Georgia,'Times New Roman',serif;font-size:22px;transition:background .25s ease,transform .25s ease}.hd-service:hover{background:rgba(163,40,64,.12);transform:translateY(-2px)}.hd-end{padding:60px 0 120px}.hd-end-panel{position:relative;overflow:hidden;border-radius:24px;padding:62px;background:linear-gradient(135deg,rgba(163,40,64,.24),rgba(255,255,255,.025));border:1px solid rgba(255,255,255,.11)}.hd-end-panel:after{content:'';position:absolute;width:360px;height:360px;border-radius:50%;background:rgba(208,76,101,.13);filter:blur(70px);right:-130px;top:-120px}.hd-end h2{position:relative;z-index:2;font-family:Georgia,'Times New Roman',serif;font-size:clamp(42px,5vw,68px);font-weight:400;letter-spacing:-.035em;line-height:.98;margin:0 0 17px;max-width:11ch}.hd-end p{position:relative;z-index:2;color:#b3a7a1;max-width:600px;font-size:17px;line-height:1.6}.hd-end .hd-actions{position:relative;z-index:2}@keyframes hdBreath{from{transform:scale(1.01)}to{transform:scale(1.055)}}
@media(max-width:900px){.hd-hero{grid-template-columns:1fr;min-height:auto;padding-top:118px}.hd h1{max-width:10ch}.hd-media{min-height:600px}.hd-intro-copy{grid-template-columns:1fr;gap:20px}.hd-choice,.hd-choice:nth-child(even){grid-template-columns:.9fr 1.1fr}.hd-choice:nth-child(even) .hd-choice-image{grid-column:1;grid-row:1}.hd-choice:nth-child(even) .hd-choice-copy{grid-column:2;grid-row:1}.hd-choice-image{min-height:230px}.hd-services-head{grid-template-columns:1fr;gap:24px}.hd-proof{grid-template-columns:1fr}.hd-proof-media{min-height:520px}.hd-service-grid{grid-template-columns:1fr 1fr}}
@media(max-width:640px){.hd-shell{width:calc(100% - 28px)}.hd-hero{padding:102px 0 56px;gap:34px}.hd h1{font-size:clamp(48px,14vw,68px);max-width:8.7ch}.hd-lead{font-size:16px}.hd-actions .hd-btn{width:100%}.hd-mini{gap:12px;flex-wrap:wrap;font-size:9px}.hd-media{min-height:470px}.hd-main-img{inset:0 34px 0 0;border-radius:16px}.hd-float{width:150px;height:196px;bottom:26px;border-width:6px;border-radius:12px}.hd-stat{right:8px;top:16px;font-size:8px;padding:10px 12px}.hd-intro{padding:58px 0 56px}.hd-intro-panel{padding:28px 22px 22px;border-radius:16px}.hd-intro h2{font-size:clamp(38px,11vw,50px);max-width:12ch}.hd-intro p{font-size:15px}.hd-choice-list{margin-top:24px;gap:12px}.hd-choice,.hd-choice:nth-child(even){display:block}.hd-choice:nth-child(even) .hd-choice-image,.hd-choice:nth-child(even) .hd-choice-copy{grid-column:auto;grid-row:auto}.hd-choice-image{min-height:220px}.hd-choice-copy{padding:24px 22px 27px}.hd-choice-copy h3{font-size:30px}.hd-transform{padding:64px 0}.hd-transform-head{display:block}.hd-transform-copy{margin-top:20px}.hd-flow{grid-template-columns:1fr}.hd-flow article{min-height:190px}.hd-flow h3{margin-top:28px}.hd-proof-wrap{padding:64px 0}.hd-proof-media{min-height:430px}.hd-proof-copy{padding:34px 24px}.hd-proof-copy h2{font-size:38px}.hd-services{padding:62px 0}.hd-service-grid{grid-template-columns:1fr}.hd-service{font-size:20px}.hd-end{padding:40px 0 95px}.hd-end-panel{padding:38px 24px;border-radius:16px}}
@media(prefers-reduced-motion:reduce){.hd-main-img img{animation:none}.hd-choice{transition:none}.hd-choice-image{transition:none}}
`;

export default function HomeDesignServicesPage() {
  return (
    <main className="hd">
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <section className="hd-shell hd-hero">
        <div className="hd-copy">
          <div className="hd-eyebrow">Home design / interiors / visualization</div>
          <h1>Redesign your home before you renovate it.</h1>
          <p className="hd-lead">
            Rethink the layout, shape the interior and see the finished space in realistic 3D before money is committed on site.
          </p>
          <div className="hd-actions">
            <Link className="hd-btn hd-primary" href="/contact">Start your home redesign</Link>
            <Link className="hd-btn hd-secondary" href="/case-studies/home-interior-design">View a finished project</Link>
          </div>
          <div className="hd-mini">
            <span>Remote collaboration</span>
            <span>Layout + interiors</span>
            <span>Photoreal 3D</span>
          </div>
        </div>

        <div className="hd-media" aria-label="Home interior design by Artimist Productions">
          <figure className="hd-main-img">
            <img src="/img/homeint01.webp" alt="Photoreal home interior design project by Artimist Productions" />
            <figcaption className="hd-caption">Interior design + material direction + visualization</figcaption>
          </figure>
          <div className="hd-stat">Design it. See it. Refine it.</div>
          <figure className="hd-float">
            <img src="/img/homeint03.webp" alt="Residential interior visualization by Artimist Productions" />
          </figure>
        </div>
      </section>

      <section className="hd-shell hd-intro">
        <div className="hd-intro-panel">
          <div className="hd-intro-copy">
            <div>
              <div className="hd-eyebrow">Start with the problem</div>
              <h2>What do you want to change?</h2>
            </div>
            <p>
              Start with the outcome, not the terminology. Pick the closest option and we will guide the rest.
            </p>
          </div>

          <div className="hd-choice-list" aria-label="Choose what you want to change">
            {paths.map((item, index) => (
              <Link className="hd-choice" href={item.href} key={item.href}>
                <div
                  className="hd-choice-image"
                  style={{ backgroundImage: `url(${item.image})` }}
                  role="img"
                  aria-label={item.title}
                >
                  <span className="hd-choice-index">0{index + 1}</span>
                  <span className="hd-choice-arrow" aria-hidden="true">↗</span>
                </div>
                <div className="hd-choice-copy">
                  <small>{item.label}</small>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <span className="hd-choice-cta">Explore this direction <b>↗</b></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="hd-transform">
        <div className="hd-shell">
          <div className="hd-transform-head">
            <div>
              <div className="hd-eyebrow">A clearer design process</div>
              <h2>From what exists to what it could become.</h2>
            </div>
            <p className="hd-transform-copy">
              Make the expensive decisions digitally first. We use your existing information to solve the space, then let you review the design before implementation.
            </p>
          </div>
          <div className="hd-flow">
            <article>
              <span>01 / Existing space</span>
              <h3>Show us what you have.</h3>
              <p>Plans, photographs, measurements, sketches or even a video walkthrough are enough to begin the conversation.</p>
            </article>
            <article>
              <span>02 / Redesign</span>
              <h3>We rethink the space.</h3>
              <p>Layout, circulation, furniture, materials, lighting and architectural decisions are developed as one coherent direction.</p>
            </article>
            <article>
              <span>03 / Visualize</span>
              <h3>See it before you build.</h3>
              <p>Realistic 3D views let you judge the design while changes are still easy, fast and inexpensive.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="hd-shell hd-proof-wrap">
        <div className="hd-proof">
          <div className="hd-proof-media">
            <img src="/img/drive-09.webp" alt="Warm contemporary interior visualization by Artimist Productions" loading="lazy" />
          </div>
          <div className="hd-proof-copy">
            <div className="hd-eyebrow">See the design before committing</div>
            <h2>A home should feel resolved before construction begins.</h2>
            <p>
              The goal is not simply a beautiful render. It is a design you understand — spatially, visually and materially — before it becomes expensive to change.
            </p>
            <div className="hd-actions">
              <Link className="hd-btn hd-primary" href="/3d-interior-design-service">Explore interior design</Link>
              <Link className="hd-btn hd-secondary" href="/case-studies/home-interior-design">View case study</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="hd-services">
        <div className="hd-shell">
          <div className="hd-services-head">
            <div>
              <div className="hd-eyebrow">More ways we can help</div>
              <h2>Choose the outcome, not the jargon.</h2>
            </div>
            <p>
              Start wherever the project currently is. We can focus on one room, revise an existing plan, develop the whole home or create the visuals and drawings needed to move forward.
            </p>
          </div>
          <div className="hd-service-grid">
            {services.map((service) => (
              <Link className="hd-service" href={service.href} key={service.href}>{service.title}</Link>
            ))}
          </div>
        </div>
      </section>

      <section className="hd-shell hd-end">
        <div className="hd-end-panel">
          <div className="hd-eyebrow">Your project can start with very little</div>
          <h2>Send us the room, plan or idea you already have.</h2>
          <p>
            We will help you identify the most useful next step — whether that is a better layout, a complete interior direction or realistic 3D views of the finished design.
          </p>
          <div className="hd-actions">
            <Link className="hd-btn hd-primary" href="/contact">Start a project</Link>
            <a className="hd-btn hd-secondary" href="https://wa.me/18078084181" target="_blank" rel="noreferrer">Talk to the studio</a>
          </div>
        </div>
      </section>
    </main>
  );
}
