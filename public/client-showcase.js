(function(){
  'use strict';
  if((location.pathname.replace(/\/$/,'')||'/')!=='/')return;

  var ARROW_UP_RIGHT='<svg class="st-inline-arrow" viewBox="0 0 20 20" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.55" stroke-linecap="round" stroke-linejoin="round"><path d="M5 15 15 5M7 5h8v8"/></svg>';

  function normalizeVectorArrows(){
    var cta=document.getElementById('featCta');
    if(cta&&!cta.querySelector('svg.st-inline-arrow')){
      var label=(cta.textContent||'').replace(/[↗\uFE0E\uFE0F]/g,'').trim();
      if(label){cta.textContent=label+' ';cta.insertAdjacentHTML('beforeend',ARROW_UP_RIGHT);}
    }
    Array.prototype.forEach.call(document.querySelectorAll('.st-row-action i[aria-hidden="true"]'),function(icon){
      if(!icon.querySelector('svg.st-inline-arrow'))icon.innerHTML=ARROW_UP_RIGHT;
    });
  }

  function watchDynamicArrows(){
    normalizeVectorArrows();
    var cta=document.getElementById('featCta');
    if(!cta||!window.MutationObserver)return;
    var observer=new MutationObserver(function(){normalizeVectorArrows();});
    observer.observe(cta,{childList:true,subtree:true,characterData:true});
  }

  function installHomepageMobileFixes(){
    if(document.getElementById('artimist-home-mobile-fixes'))return;
    var style=document.createElement('style');
    style.id='artimist-home-mobile-fixes';
    style.textContent=`
      .st-feature-cta{display:inline-flex!important;align-items:center!important;gap:7px!important}
      .st-feature-cta .st-inline-arrow,.st-row-action .st-inline-arrow{width:14px!important;height:14px!important;display:inline-block!important;flex:0 0 auto!important;vertical-align:middle!important;color:currentColor!important}
      .st-row-action i{display:inline-flex!important;align-items:center!important;font-style:normal!important}
      @media(max-width:820px){
        .st-index{z-index:4000!important}
        .st-index-body{bottom:calc(76px + env(safe-area-inset-bottom,0px))!important;padding-bottom:26px!important;overscroll-behavior:contain!important}
        .st-index-foot{bottom:calc(18px + env(safe-area-inset-bottom,0px))!important}
        .st-contact{min-height:100svh!important;align-items:center!important}
        .st-contact>.st-shell{padding-top:84px!important;padding-bottom:calc(118px + env(safe-area-inset-bottom,0px))!important}
        .st-contact .st-eyebrow{line-height:1.45!important;margin-bottom:14px!important}
        .st-contact .st-h2{margin:0!important;font-size:clamp(44px,12.8vw,62px)!important;line-height:.94!important;letter-spacing:-.055em!important}
        .st-contact .st-h2 em{display:block!important;margin-top:.13em!important;line-height:1.02!important}
        .st-contact .st-underline{margin-top:24px!important}
        #work .st-feature-tabs{padding-bottom:calc(88px + env(safe-area-inset-bottom,0px))!important}
        #archive .st-index-rows{padding-bottom:calc(88px + env(safe-area-inset-bottom,0px))!important}
        .st-clients .st-partners{padding-bottom:calc(96px + env(safe-area-inset-bottom,0px))!important}
        .st-footer{padding-bottom:calc(112px + env(safe-area-inset-bottom,0px))!important}
        .st>.st-ask-btn{left:auto!important;right:12px!important;bottom:calc(14px + env(safe-area-inset-bottom,0px))!important;width:calc((100vw - 34px)/2)!important;max-width:none!important;min-width:0!important;height:52px!important;min-height:52px!important;padding:0 11px!important;justify-content:center!important;gap:7px!important;white-space:nowrap!important}
        .artimist-whatsapp{left:12px!important;right:auto!important;bottom:calc(14px + env(safe-area-inset-bottom,0px))!important;width:calc((100vw - 34px)/2)!important;max-width:none!important;height:52px!important;min-height:52px!important;box-sizing:border-box!important;justify-content:center!important}
      }
      @media(max-width:390px){
        .st>.st-ask-btn{right:10px!important;width:calc((100vw - 30px)/2)!important;font-size:7.7px!important;letter-spacing:.045em!important}
        .artimist-whatsapp{left:10px!important;width:calc((100vw - 30px)/2)!important}
        .st-contact .st-h2{font-size:clamp(40px,12.2vw,50px)!important}
      }
    `;
    document.head.appendChild(style);
  }

  function normalizeRoster(host){
    Array.prototype.slice.call(host.children).forEach(function(cell){
      var label=cell.querySelector('b,strong');
      var name=label?(label.textContent||'').trim():'';
      if(name==='Label Beauty Group')label.textContent='Label Realty Group';
      if(name==='Commune')cell.remove();
    });
    var names=Array.prototype.map.call(host.querySelectorAll('b,strong'),function(n){return(n.textContent||'').trim();});
    if(names.indexOf('Label Realty Group')<0){var c=document.createElement('div');c.className='st-client is-word';c.innerHTML='<strong>Label Realty Group</strong>';host.appendChild(c);}
  }

  function startMotion(track){
    if(!track||window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    var x=0,last=performance.now(),paused=false;
    function pause(){paused=true;}
    function resume(){paused=false;last=performance.now();}
    track.addEventListener('mouseenter',pause);
    track.addEventListener('mouseleave',resume);
    track.addEventListener('pointerdown',pause,{passive:true});
    window.addEventListener('pointerup',resume,{passive:true});
    document.addEventListener('visibilitychange',function(){paused=document.hidden;last=performance.now();});
    function tick(now){
      var dt=Math.min(40,now-last);last=now;
      if(!paused&&window.innerWidth<=760){
        var half=track.scrollWidth/2;
        if(half>0){x-=dt*.050;if(-x>=half)x+=half;track.style.setProperty('transform','translate3d('+x+'px,0,0)','important');}
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  function init(){
    var section=document.querySelector('.st-clients');
    var marquee=document.getElementById('marquee');
    if(!section||!marquee||section.dataset.artimistClients==='1'||!marquee.children.length)return false;
    section.dataset.artimistClients='1';normalizeRoster(marquee);

    var kicker=section.querySelector('.st-kicker');
    if(kicker){var intro=document.createElement('div');intro.className='artimist-client-intro';intro.innerHTML='<p>SELECTED RELATIONSHIPS</p><h2>Trusted by teams<br><em>who care about the work.</em></h2><span>Selected clients and collaborators across architecture, visualization, production and digital work. References are available on request.</span>';kicker.parentNode.insertBefore(intro,kicker.nextSibling);}

    var cells=Array.prototype.slice.call(marquee.children);
    cells.forEach(function(cell,i){cell.classList.add('artimist-client-card');cell.setAttribute('data-client-no',String(i+1).padStart(2,'0'));if(cell.querySelector('b,strong')){var meta=document.createElement('small');meta.className='artimist-client-meta';meta.textContent='CLIENT / COLLABORATOR';cell.appendChild(meta);}});

    var original=marquee.innerHTML;
    marquee.innerHTML='<div class="artimist-client-track">'+original+original+'</div>';
    var track=marquee.firstElementChild;

    var partners=section.querySelector('.st-partners');
    if(partners){partners.classList.add('artimist-partner-rail');var pc=partners.innerHTML;partners.innerHTML='<div class="artimist-partner-track">'+pc+pc+'</div>';}

    var style=document.createElement('style');style.id='artimist-client-showcase-style';style.textContent=`
      .st-clients[data-artimist-clients="1"]{position:relative;overflow:hidden;padding:104px 0 0!important;background:radial-gradient(circle at 82% 12%,rgba(156,31,53,.12),transparent 31%),#090909!important;color:#f2ece7!important;border-top:1px solid rgba(255,255,255,.1)}
      .artimist-client-intro{position:relative;z-index:2;display:grid;grid-template-columns:.42fr 1.1fr .65fr;gap:4vw;align-items:end;padding:38px 0 58px;border-top:1px solid rgba(255,255,255,.14)}.artimist-client-intro>p{margin:0;color:#cf5267;font:700 9px/1 Arial,sans-serif;letter-spacing:.19em}.artimist-client-intro h2{margin:0;font:400 clamp(46px,5vw,84px)/.92 Georgia,serif;letter-spacing:-.045em}.artimist-client-intro h2 em{color:#e7b5bd;font-weight:400}.artimist-client-intro>span{color:rgba(255,255,255,.55);font:400 13px/1.65 Arial,sans-serif}
      .st-clients[data-artimist-clients="1"] .st-marquee{position:relative;z-index:2;width:100%;overflow:hidden!important;border-top:1px solid rgba(255,255,255,.12);border-bottom:1px solid rgba(255,255,255,.12);padding:0!important}.st-clients[data-artimist-clients="1"] .st-marquee:before,.st-clients[data-artimist-clients="1"] .st-marquee:after{content:'';position:absolute;z-index:5;top:0;bottom:0;width:7vw;pointer-events:none}.st-clients[data-artimist-clients="1"] .st-marquee:before{left:0;background:linear-gradient(90deg,#090909,transparent)}.st-clients[data-artimist-clients="1"] .st-marquee:after{right:0;background:linear-gradient(-90deg,#090909,transparent)}
      .artimist-client-track{display:grid!important;width:100%!important;grid-template-columns:repeat(6,minmax(0,1fr))!important;will-change:auto;transform:none!important}
      .artimist-client-card{position:relative!important;min-width:0!important;width:auto!important;min-height:270px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:17px!important;padding:42px 28px!important;border-right:1px solid rgba(255,255,255,.12)!important;background:linear-gradient(145deg,rgba(255,255,255,.028),rgba(255,255,255,0))!important;color:#f3ede8!important;overflow:hidden!important}.artimist-client-card:before{content:attr(data-client-no);position:absolute;left:17px;top:17px;color:#cf5267;font:700 8px Arial,sans-serif;letter-spacing:.15em}.artimist-client-card:after{content:'';position:absolute;width:180px;height:180px;border-radius:50%;background:rgba(156,31,53,.12);filter:blur(55px);right:-80px;bottom:-90px;opacity:.45}.artimist-client-card img{max-width:54%!important;max-height:78px!important;width:auto!important;height:auto!important;object-fit:contain!important;filter:grayscale(1) brightness(1.42)!important;opacity:.92!important}.artimist-client-card strong,.artimist-client-card>b{max-width:90%;font:400 clamp(24px,2.4vw,36px)/1.05 Georgia,serif!important;letter-spacing:-.025em!important;text-align:center!important;color:#f2ece7!important;overflow-wrap:anywhere!important}.artimist-client-meta{position:absolute;left:17px;bottom:16px;color:rgba(255,255,255,.38);font:700 7px Arial,sans-serif;letter-spacing:.14em}
      .artimist-partner-rail{position:relative!important;z-index:2!important;width:100%!important;overflow:hidden!important;border-top:1px solid rgba(255,255,255,.08)!important;background:#080808!important}.artimist-partner-track{display:flex!important;align-items:center!important;gap:42px!important;width:max-content!important;min-width:200%!important;padding:19px 0!important;animation:artimistPartnerFlow 28s linear infinite!important;color:rgba(255,255,255,.46)!important;font:700 8px Arial,sans-serif!important;letter-spacing:.15em!important;white-space:nowrap!important}.artimist-partner-track>*{margin:0!important}.artimist-partner-track b{color:#fff!important}.artimist-partner-track span:last-child{color:#cf5267!important}@keyframes artimistPartnerFlow{from{transform:translate3d(-50%,0,0)}to{transform:translate3d(0,0,0)}}
      @media(max-width:1100px) and (min-width:761px){.artimist-client-track{grid-template-columns:repeat(3,minmax(0,1fr))!important}.artimist-client-card{min-height:250px!important}}
      @media(max-width:760px){.st-clients[data-artimist-clients="1"]{padding-top:78px!important}.artimist-client-intro{display:block!important;padding:26px 22px 38px!important}.artimist-client-intro h2{font-size:46px!important;margin:15px 0 16px!important}.artimist-client-intro>span{display:block!important;max-width:34ch!important;font-size:13px!important}.st-clients[data-artimist-clients="1"] .st-marquee{overflow:hidden!important;touch-action:pan-y!important}.artimist-client-track{display:flex!important;width:max-content!important;will-change:transform!important;transform:translate3d(0,0,0)}.artimist-client-card{flex:0 0 78vw!important;width:78vw!important;min-height:310px!important;padding:34px 22px!important}.artimist-client-card strong,.artimist-client-card>b{font-size:31px!important}.artimist-client-card img{max-width:58%!important;max-height:72px!important}.artimist-partner-track{animation-duration:20s!important;padding:15px 0!important;gap:30px!important}}
      @media(prefers-reduced-motion:reduce){.artimist-client-track,.artimist-partner-track{animation:none!important;transform:none!important}}
    `;document.head.appendChild(style);startMotion(track);return true;
  }

  installHomepageMobileFixes();
  watchDynamicArrows();
  var attempts=0,timer=setInterval(function(){attempts++;normalizeVectorArrows();if(init()||attempts>30)clearInterval(timer);},220);init();
})();