(function(){
  'use strict';
  if((location.pathname.replace(/\/$/,'')||'/')!=='/')return;

  function normalizeRoster(host){
    Array.prototype.slice.call(host.children).forEach(function(cell){
      var label=cell.querySelector('b,strong');
      var name=label?(label.textContent||'').trim():'';
      if(name==='Label Beauty Group') label.textContent='Hummane';
      if(name==='Commune') cell.remove();
    });
    var names=Array.prototype.map.call(host.querySelectorAll('b,strong'),function(n){return (n.textContent||'').trim();});
    if(names.indexOf('Label Realty Group')<0){var c=document.createElement('div');c.className='st-client is-word';c.innerHTML='<strong>Label Realty Group</strong>';host.appendChild(c);}
  }

  function startMotion(track){
    if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;
    var x=0,last=performance.now(),paused=false;
    track.addEventListener('mouseenter',function(){paused=true;});track.addEventListener('mouseleave',function(){paused=false;});
    function tick(now){
      var dt=Math.min(40,now-last);last=now;
      if(!paused){
        var half=track.scrollWidth/2;
        if(half>0){x-=dt*(window.innerWidth<=760?.050:.033);if(-x>=half)x+=half;track.style.transform='translate3d('+x+'px,0,0)';}
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
      .artimist-client-track{display:flex!important;width:max-content!important;will-change:transform;transform:translate3d(0,0,0)}
      .artimist-client-card{position:relative!important;flex:0 0 min(31vw,470px)!important;width:min(31vw,470px)!important;min-height:315px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:17px!important;padding:42px 28px!important;border-right:1px solid rgba(255,255,255,.12)!important;background:linear-gradient(145deg,rgba(255,255,255,.028),rgba(255,255,255,0))!important;color:#f3ede8!important;overflow:hidden!important}.artimist-client-card:before{content:attr(data-client-no);position:absolute;left:17px;top:17px;color:#cf5267;font:700 8px Arial,sans-serif;letter-spacing:.15em}.artimist-client-card:after{content:'';position:absolute;width:180px;height:180px;border-radius:50%;background:rgba(156,31,53,.12);filter:blur(55px);right:-80px;bottom:-90px;opacity:.45}.artimist-client-card img{max-width:54%!important;max-height:78px!important;width:auto!important;height:auto!important;object-fit:contain!important;filter:grayscale(1) brightness(1.42)!important;opacity:.92!important}.artimist-client-card strong,.artimist-client-card>b{max-width:90%;font:400 clamp(24px,2.4vw,36px)/1.05 Georgia,serif!important;letter-spacing:-.025em!important;text-align:center!important;color:#f2ece7!important}.artimist-client-meta{position:absolute;left:17px;bottom:16px;color:rgba(255,255,255,.38);font:700 7px Arial,sans-serif;letter-spacing:.14em}
      .artimist-partner-rail{position:relative!important;z-index:2!important;width:100%!important;overflow:hidden!important;border-top:1px solid rgba(255,255,255,.08)!important;background:#080808!important}.artimist-partner-track{display:flex!important;align-items:center!important;gap:42px!important;width:max-content!important;min-width:200%!important;padding:19px 0!important;animation:artimistPartnerFlow 28s linear infinite!important;color:rgba(255,255,255,.46)!important;font:700 8px Arial,sans-serif!important;letter-spacing:.15em!important;white-space:nowrap!important}.artimist-partner-track>*{margin:0!important}.artimist-partner-track b{color:#fff!important}.artimist-partner-track span:last-child{color:#cf5267!important}@keyframes artimistPartnerFlow{from{transform:translate3d(-50%,0,0)}to{transform:translate3d(0,0,0)}}
      @media(max-width:760px){.st-clients[data-artimist-clients="1"]{padding-top:78px!important}.artimist-client-intro{display:block!important;padding:26px 22px 38px!important}.artimist-client-intro h2{font-size:46px!important;margin:15px 0 16px!important}.artimist-client-intro>span{display:block!important;max-width:34ch!important;font-size:13px!important}.artimist-client-card{flex-basis:74vw!important;width:74vw!important;min-height:310px!important;padding:34px 22px!important}.artimist-client-card strong,.artimist-client-card>b{font-size:31px!important}.artimist-client-card img{max-width:58%!important;max-height:72px!important}.artimist-partner-track{animation-duration:20s!important;padding:15px 0!important;gap:30px!important}}
      @media(prefers-reduced-motion:reduce){.artimist-partner-track{animation:none!important}}
    `;document.head.appendChild(style);startMotion(track);return true;
  }
  var attempts=0,timer=setInterval(function(){attempts++;if(init()||attempts>30)clearInterval(timer);},220);init();
})();
