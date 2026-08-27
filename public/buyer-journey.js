(function(){
  'use strict';
  if((location.pathname.replace(/\/$/,'')||'/')!=='/') return;

  var items=[
    ['01','Design my house','Custom plans and a home layout built around your site and life.','/custom-house-design','/graphics/custom-house-floor-plan-design.svg'],
    ['02','Design my interior','Rooms, materials, furniture and realistic 3D views before you build.','/3d-interior-design-service','/graphics/3d-interior-design-visualization.svg'],
    ['03','Change my floor plan','Modify an existing plan, redraw a sketch or improve a layout without starting over.','/plan-modification-service','/graphics/house-plan-modification-before-after.svg'],
    ['04','Plan my renovation','Remodel, addition, extension and permit-drawing support.','/residential-renovation-permit-drawings','/graphics/residential-renovation-permit-drawings.svg'],
    ['05','Show me the design in 3D','Photoreal rendering for houses, interiors, developments and ideas.','/visualization','/img/resid01.webp'],
    ['06','Prepare clean drawings','Floor plans, elevations, CAD, Revit and professional production support.','/architectural-drafting-services','/img/permit01.webp']
  ];

  function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}

  function buildBuyerJourney(){
    if(document.querySelector('.artimist-needs')) return;
    var anchor=document.querySelector('#disciplines')||document.querySelector('#realtime')||document.querySelector('main section:nth-of-type(3)');
    if(!anchor||!anchor.parentNode) return;
    var style=document.createElement('style');
    style.textContent='.artimist-needs{background:#0a0909;color:#f2ece7;padding:100px 0 110px;overflow:hidden}.artimist-needs__wrap{width:min(1500px,calc(100% - 56px));margin:auto}.artimist-needs__eyebrow{color:#cc5368;font:700 10px/1 Arial,sans-serif;letter-spacing:.22em;text-transform:uppercase}.artimist-needs h2{max-width:900px;margin:18px 0 22px;font:400 clamp(48px,6.4vw,105px)/.93 Georgia,serif;letter-spacing:-.045em}.artimist-needs__lead{max-width:720px;margin:0 0 48px;color:#aaa09a;font:400 17px/1.55 Georgia,serif}.artimist-needs__grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.artimist-need{position:relative;min-height:420px;overflow:hidden;border:1px solid rgba(255,255,255,.1);background:#111;color:#fff;text-decoration:none}.artimist-need img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;transform:scale(1.02);transition:transform 1.2s cubic-bezier(.2,.8,.2,1);animation:artimistNeedDrift 15s ease-in-out infinite alternate}.artimist-need:after{content:"";position:absolute;inset:0;background:linear-gradient(0deg,rgba(5,5,5,.94),rgba(5,5,5,.36) 58%,rgba(5,5,5,.04))}.artimist-need article{position:absolute;z-index:2;left:22px;right:22px;bottom:22px}.artimist-need small{color:#d76b7d;font:700 9px Arial,sans-serif;letter-spacing:.16em}.artimist-need h3{margin:9px 0 8px;font:400 31px/1.02 Georgia,serif}.artimist-need p{margin:0;color:#c3b9b3;font:400 12px/1.55 Arial,sans-serif}.artimist-need:hover img{transform:scale(1.055)}.artimist-needs__all{display:inline-flex;margin-top:28px;padding-bottom:7px;border-bottom:1px solid rgba(255,255,255,.5);font:700 11px Arial,sans-serif;letter-spacing:.1em;text-transform:uppercase}.artimist-needs.is-pending .artimist-need{opacity:0;transform:translateY(24px)}.artimist-needs.is-in .artimist-need{opacity:1;transform:none;transition:opacity .75s ease,transform .9s cubic-bezier(.2,.75,.2,1)}.artimist-needs.is-in .artimist-need:nth-child(2){transition-delay:.07s}.artimist-needs.is-in .artimist-need:nth-child(3){transition-delay:.14s}.artimist-needs.is-in .artimist-need:nth-child(4){transition-delay:.21s}.artimist-needs.is-in .artimist-need:nth-child(5){transition-delay:.28s}.artimist-needs.is-in .artimist-need:nth-child(6){transition-delay:.35s}@keyframes artimistNeedDrift{from{transform:scale(1.02) translateY(0)}to{transform:scale(1.055) translateY(-6px)}}@media(max-width:900px){.artimist-needs__grid{grid-template-columns:1fr 1fr}}@media(max-width:680px){.artimist-needs{padding:76px 0 86px}.artimist-needs__wrap{width:calc(100% - 28px)}.artimist-needs__lead{font-size:16px}.artimist-needs__grid{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;margin-right:-14px;padding-right:14px;scrollbar-width:none}.artimist-needs__grid::-webkit-scrollbar{display:none}.artimist-need{flex:0 0 84vw;min-height:108vw;scroll-snap-align:center}.artimist-need h3{font-size:29px}}@media(prefers-reduced-motion:reduce){.artimist-need img{animation:none}.artimist-needs.is-pending .artimist-need{opacity:1;transform:none}}';
    document.head.appendChild(style);
    var section=document.createElement('section');section.className='artimist-needs is-pending';section.setAttribute('aria-label','Home design help');
    var cards=items.map(function(x){return '<a class="artimist-need" href="'+esc(x[3])+'"><img src="'+esc(x[4])+'" alt="'+esc(x[1])+'" loading="lazy"><article><small>'+x[0]+' / COMMON REQUEST</small><h3>'+esc(x[1])+'</h3><p>'+esc(x[2])+'</p></article></a>';}).join('');
    section.innerHTML='<div class="artimist-needs__wrap"><div class="artimist-needs__eyebrow">FOR HOMEOWNERS / START WITH THE PROBLEM</div><h2>You do not need to know what the service is called.</h2><p class="artimist-needs__lead">Tell us what you are trying to change, design or visualize. We will guide you to the right next step.</p><div class="artimist-needs__grid">'+cards+'</div><a class="artimist-needs__all" href="/home-design-services">See all home design help</a></div>';
    anchor.parentNode.insertBefore(section,anchor);
    if('IntersectionObserver' in window){var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){section.classList.remove('is-pending');section.classList.add('is-in');io.disconnect();}});},{threshold:.08});io.observe(section);}else{section.classList.remove('is-pending');section.classList.add('is-in');}
  }

  function alignWorldwideCopy(){
    var foot=document.querySelector('.st-index-foot span');if(foot)foot.textContent='WORLDWIDE · USA · UK · CANADA · SWEDEN';
    var offices=document.querySelector('.st-offices');if(offices){var p=offices.querySelector('p');if(p)p.textContent='INTERNATIONAL PROJECT DELIVERY';}
  }

  function init(){buildBuyerJourney();alignWorldwideCopy();setTimeout(alignWorldwideCopy,800);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
