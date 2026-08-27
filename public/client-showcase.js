(function(){
  'use strict';
  if((location.pathname.replace(/\/$/,'')||'/')!=='/')return;

  function normalizeRoster(marquee){
    Array.prototype.slice.call(marquee.children).forEach(function(cell){
      var label=cell.querySelector('b,strong');
      var name=label?(label.textContent||'').trim():'';
      if(name==='Label Beauty Group') label.textContent='Hummane';
      if(name==='Commune') cell.remove();
    });
    var exists=Array.prototype.some.call(marquee.querySelectorAll('b,strong'),function(n){return (n.textContent||'').trim()==='Label Realty Group';});
    if(!exists){
      var cell=document.createElement('div');
      cell.className='st-client is-word';
      cell.innerHTML='<strong>Label Realty Group</strong>';
      marquee.appendChild(cell);
    }
  }

  function init(){
    var section=document.querySelector('.st-clients');
    var marquee=document.getElementById('marquee');
    if(!section||!marquee||section.dataset.artimistClients==='1'||!marquee.children.length)return false;
    section.dataset.artimistClients='1';
    normalizeRoster(marquee);

    var kicker=section.querySelector('.st-kicker');
    if(kicker){
      var intro=document.createElement('div');
      intro.className='artimist-client-intro';
      intro.innerHTML='<p>SELECTED RELATIONSHIPS</p><h2>Trusted to enter the work<br><em>and strengthen it.</em></h2><span>Selected clients and collaborators across architecture, visualization, production and digital work. References are available on request.</span>';
      kicker.parentNode.insertBefore(intro,kicker.nextSibling);
    }

    var cells=Array.prototype.slice.call(marquee.children);
    cells.forEach(function(cell,i){
      cell.classList.add('artimist-client-card');
      cell.setAttribute('data-client-no',String(i+1).padStart(2,'0'));
      var name=cell.querySelector('b,strong');
      if(name){
        var meta=document.createElement('small');
        meta.className='artimist-client-meta';
        meta.textContent='CLIENT / COLLABORATOR';
        cell.appendChild(meta);
      }
    });

    var original=marquee.innerHTML;
    marquee.innerHTML=original+original;

    var partners=section.querySelector('.st-partners');
    if(partners){
      partners.classList.add('artimist-partner-rail');
      var content=partners.innerHTML;
      partners.innerHTML='<div class="artimist-partner-track">'+content+content+'</div>';
    }

    var style=document.createElement('style');
    style.id='artimist-client-showcase-style';
    style.textContent=`
      .st-clients[data-artimist-clients="1"]{position:relative;overflow:hidden;padding:110px 0 0!important;background:radial-gradient(circle at 82% 12%,rgba(156,31,53,.12),transparent 31%),#0a0909!important;color:#f2ece7!important;border-top:1px solid rgba(255,255,255,.1)}
      .st-clients[data-artimist-clients="1"]:before{content:'';position:absolute;inset:0;pointer-events:none;background:linear-gradient(90deg,transparent 0 24.9%,rgba(255,255,255,.035) 25%,transparent 25.1% 49.9%,rgba(255,255,255,.035) 50%,transparent 50.1% 74.9%,rgba(255,255,255,.035) 75%,transparent 75.1%)}
      .artimist-client-intro{position:relative;z-index:2;display:grid;grid-template-columns:.42fr 1.1fr .65fr;gap:4vw;align-items:end;padding:42px 0 64px;border-top:1px solid rgba(255,255,255,.14)}
      .artimist-client-intro>p{margin:0;color:#cf5267;font:700 9px/1 Arial,sans-serif;letter-spacing:.19em}.artimist-client-intro h2{margin:0;font:400 clamp(46px,5vw,88px)/.91 Georgia,serif;letter-spacing:-.045em}.artimist-client-intro h2 em{color:#e7b5bd;font-weight:400}.artimist-client-intro>span{color:rgba(255,255,255,.5);font:400 13px/1.65 Arial,sans-serif}
      .st-clients[data-artimist-clients="1"] .st-marquee{position:relative;z-index:2;overflow:hidden!important;border-top:1px solid rgba(255,255,255,.12);border-bottom:1px solid rgba(255,255,255,.12);padding:0!important}.st-clients[data-artimist-clients="1"] .st-marquee:before,.st-clients[data-artimist-clients="1"] .st-marquee:after{content:'';position:absolute;z-index:5;top:0;bottom:0;width:9vw;pointer-events:none}.st-clients[data-artimist-clients="1"] .st-marquee:before{left:0;background:linear-gradient(90deg,#0a0909,transparent)}.st-clients[data-artimist-clients="1"] .st-marquee:after{right:0;background:linear-gradient(-90deg,#0a0909,transparent)}
      #marquee[data-artimist-client-motion]{display:flex!important;width:max-content!important;min-width:200%!important;animation:artimistClientFlow 34s linear infinite!important;will-change:transform}#marquee[data-artimist-client-motion]:hover{animation-play-state:paused!important}
      .artimist-client-card{position:relative!important;flex:0 0 min(31vw,470px)!important;min-height:315px!important;display:flex!important;flex-direction:column!important;align-items:center!important;justify-content:center!important;gap:17px!important;padding:42px 28px!important;border-right:1px solid rgba(255,255,255,.12)!important;background:linear-gradient(145deg,rgba(255,255,255,.025),rgba(255,255,255,0))!important;color:#f3ede8!important;overflow:hidden!important;transition:background .45s ease,transform .45s ease,opacity .45s ease!important}.artimist-client-card:before{content:attr(data-client-no);position:absolute;left:17px;top:17px;color:#cf5267;font:700 8px Arial,sans-serif;letter-spacing:.15em}.artimist-client-card:after{content:'';position:absolute;width:180px;height:180px;border-radius:50%;background:rgba(156,31,53,.1);filter:blur(55px);right:-80px;bottom:-90px;opacity:0;transition:opacity .5s}.artimist-client-card:hover{background:rgba(255,255,255,.045)!important}.artimist-client-card:hover:after,.artimist-client-card.is-active:after{opacity:1}
      .artimist-client-card img{max-width:54%!important;max-height:78px!important;width:auto!important;height:auto!important;object-fit:contain!important;filter:grayscale(1) brightness(1.4)!important;opacity:.88!important;transition:filter .5s ease,opacity .5s ease,transform .55s cubic-bezier(.2,.75,.2,1)!important}.artimist-client-card:hover img,.artimist-client-card.is-active img{filter:grayscale(0) brightness(1.05)!important;opacity:1!important;transform:scale(1.035)!important}.artimist-client-card strong,.artimist-client-card>b{max-width:90%;font:400 clamp(24px,2.4vw,36px)/1.05 Georgia,serif!important;letter-spacing:-.025em!important;text-align:center!important;color:#f2ece7!important}.artimist-client-meta{position:absolute;left:17px;bottom:16px;color:rgba(255,255,255,.34);font:700 7px Arial,sans-serif;letter-spacing:.14em}
      .artimist-partner-rail{position:relative!important;z-index:2!important;width:100%!important;max-width:none!important;margin:0!important;padding:0!important;overflow:hidden!important;border-top:1px solid rgba(255,255,255,.08)!important;background:#080808!important}.artimist-partner-track{display:flex!important;align-items:center!important;gap:42px!important;width:max-content!important;min-width:200%!important;padding:20px 0!important;animation:artimistPartnerFlow 40s linear infinite!important;color:rgba(255,255,255,.42)!important;font:700 8px Arial,sans-serif!important;letter-spacing:.15em!important;white-space:nowrap!important}.artimist-partner-track>*{margin:0!important}.artimist-partner-track b{color:#fff!important}.artimist-partner-track span:last-child{color:#cf5267!important}
      @keyframes artimistClientFlow{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}@keyframes artimistPartnerFlow{from{transform:translate3d(-50%,0,0)}to{transform:translate3d(0,0,0)}}
      @media(max-width:760px){.st-clients[data-artimist-clients="1"]{padding-top:82px!important}.artimist-client-intro{display:block!important;padding:28px 0 42px!important}.artimist-client-intro h2{font-size:48px!important;margin:16px 0 18px!important}.artimist-client-intro>span{display:block!important;max-width:34ch!important;font-size:13px!important}.st-clients[data-artimist-clients="1"] .st-kicker{font-size:9px!important;letter-spacing:.18em!important}.st-clients[data-artimist-clients="1"] .st-marquee{overflow:hidden!important}#marquee[data-artimist-client-motion]{animation-duration:22s!important}.artimist-client-card{flex-basis:76vw!important;min-height:285px!important;padding:36px 24px!important}.artimist-client-card strong,.artimist-client-card>b{font-size:32px!important}.artimist-client-card img{max-width:58%!important;max-height:72px!important}.artimist-client-card.is-active{background:rgba(255,255,255,.055)!important}.artimist-partner-track{animation-duration:27s!important;padding:17px 0!important;gap:30px!important}}
      @media(prefers-reduced-motion:reduce){#marquee[data-artimist-client-motion],.artimist-partner-track{animation:none!important}.artimist-client-card{transition:none!important}}
    `;
    document.head.appendChild(style);
    marquee.setAttribute('data-artimist-client-motion','1');

    if('IntersectionObserver' in window){
      var cardsNow=marquee.querySelectorAll('.artimist-client-card');
      var io=new IntersectionObserver(function(entries){entries.forEach(function(entry){entry.target.classList.toggle('is-active',entry.isIntersecting&&entry.intersectionRatio>.58);});},{threshold:[.25,.58,.8]});
      cardsNow.forEach(function(card){io.observe(card);});
    }
    return true;
  }

  var attempts=0;
  var timer=setInterval(function(){attempts++;if(init()||attempts>30)clearInterval(timer);},220);
  init();
})();
