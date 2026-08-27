(function(){
  'use strict';
  if((location.pathname.replace(/\/$/,'')||'/')!=='/partners')return;

  function init(){
    var section=document.querySelector('.partners-v2-clients');
    var grid=section&&section.querySelector('.partners-v2-grid');
    if(!section||!grid||grid.dataset.artimistMotion==='1')return false;
    grid.dataset.artimistMotion='1';

    var style=document.createElement('style');
    style.id='artimist-partners-motion-style';
    style.textContent=`
      .partners-v2-clients{position:relative;overflow:hidden}
      .partners-v2-clients:before{content:'';position:absolute;width:38vw;height:38vw;right:-17vw;top:7%;border-radius:50%;background:rgba(156,31,53,.08);filter:blur(80px);pointer-events:none}
      .partners-v2-grid[data-artimist-motion="1"] article{position:relative;overflow:hidden;transition:transform .65s cubic-bezier(.2,.75,.2,1),background .5s ease,border-color .5s ease,opacity .6s ease;opacity:.48;transform:translateY(22px)}
      .partners-v2-grid[data-artimist-motion="1"] article.is-visible{opacity:1;transform:translateY(0)}
      .partners-v2-grid[data-artimist-motion="1"] article:after{content:'';position:absolute;width:150px;height:150px;border-radius:50%;background:rgba(156,31,53,.11);right:-85px;bottom:-85px;filter:blur(45px);opacity:0;transition:opacity .5s ease;pointer-events:none}
      .partners-v2-grid[data-artimist-motion="1"] article.is-active:after,.partners-v2-grid[data-artimist-motion="1"] article:hover:after{opacity:1}
      .partners-v2-grid[data-artimist-motion="1"] article img{transition:filter .55s ease,transform .65s cubic-bezier(.2,.75,.2,1),opacity .55s ease;filter:grayscale(1);opacity:.78}
      .partners-v2-grid[data-artimist-motion="1"] article.is-active img,.partners-v2-grid[data-artimist-motion="1"] article:hover img{filter:grayscale(0);opacity:1;transform:scale(1.035)}
      .reviews-v2-proof{background:linear-gradient(145deg,rgba(255,255,255,.035),rgba(255,255,255,.008))!important}
      .reviews-v2-proof .reviews-v2-source{display:block;margin-bottom:24px;color:#cf5267;font:700 8px/1 Arial,sans-serif;letter-spacing:.15em;text-transform:uppercase}
      .reviews-v2-proof blockquote{font-style:normal!important}
      .reviews-v2-live-review{animation:artimistReviewIn .7s cubic-bezier(.2,.75,.2,1) both}
      @keyframes artimistReviewIn{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:none}}
      @media(max-width:760px){
        .partners-v2-clients{padding-bottom:16px}
        .partners-v2-grid[data-artimist-motion="1"]{display:flex!important;gap:10px!important;width:max-content!important;max-width:none!important;margin:0!important;padding:0 0 0 14px!important;animation:artimistPartnerClientFlow 32s linear infinite!important;will-change:transform}
        .partners-v2-grid[data-artimist-motion="1"] article{flex:0 0 76vw!important;width:76vw!important;min-height:330px!important;margin:0!important;opacity:1!important;transform:none!important}
        .partners-v2-grid[data-artimist-motion="1"] article img{filter:grayscale(.35);opacity:.9}
        .partners-v2-grid[data-artimist-motion="1"] article.is-active{background:rgba(255,255,255,.045)!important;border-color:rgba(255,255,255,.18)!important}
        .partners-v2-grid[data-artimist-motion="1"]:active{animation-play-state:paused!important}
        .reviews-v2-grid{display:flex!important;overflow-x:auto!important;scroll-snap-type:x mandatory!important;gap:10px!important;margin-right:-14px!important;padding-right:14px!important;scrollbar-width:none!important}
        .reviews-v2-grid::-webkit-scrollbar{display:none!important}
        .reviews-v2-grid>article{flex:0 0 84vw!important;scroll-snap-align:center!important;min-height:310px!important}
        .partners-v2-feature aside>img,.partners-v2-cinema>img{animation:artimistPartnersDrift 12s ease-in-out infinite alternate!important;will-change:transform}
      }
      @keyframes artimistPartnerClientFlow{from{transform:translate3d(0,0,0)}to{transform:translate3d(-50%,0,0)}}
      @keyframes artimistPartnersDrift{from{transform:scale(1.02) translate3d(0,0,0)}to{transform:scale(1.06) translate3d(0,-7px,0)}}
      @media(prefers-reduced-motion:reduce){.partners-v2-grid[data-artimist-motion="1"],.partners-v2-feature aside>img,.partners-v2-cinema>img{animation:none!important}.partners-v2-grid[data-artimist-motion="1"] article{opacity:1!important;transform:none!important}}
    `;
    document.head.appendChild(style);

    var originals=Array.prototype.slice.call(grid.children);
    if(window.matchMedia&&window.matchMedia('(max-width:760px)').matches&&originals.length){
      originals.forEach(function(card){
        var clone=card.cloneNode(true);
        clone.setAttribute('aria-hidden','true');
        clone.querySelectorAll('a,button,input,select,textarea').forEach(function(el){el.setAttribute('tabindex','-1');});
        grid.appendChild(clone);
      });
    }

    if('IntersectionObserver' in window){
      var io=new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting)entry.target.classList.add('is-visible');
          entry.target.classList.toggle('is-active',entry.isIntersecting&&entry.intersectionRatio>.58);
        });
      },{threshold:[.15,.58,.85]});
      grid.querySelectorAll('article').forEach(function(card){io.observe(card);});
    }else{
      grid.querySelectorAll('article').forEach(function(card){card.classList.add('is-visible');});
    }
    return true;
  }

  var attempts=0;
  var timer=setInterval(function(){attempts++;if(init()||attempts>30)clearInterval(timer);},180);
  init();
})();
