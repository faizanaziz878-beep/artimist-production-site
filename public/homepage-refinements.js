(function(){
  'use strict';
  if((location.pathname.replace(/\/$/,'')||'/')!=='/')return;

  function refineServiceImages(){
    var map={
      '/custom-house-design':['/img/resext03.webp','Custom residential house design and exterior visualization by Artimist Productions'],
      '/3d-interior-design-service':['/img/homeint03.webp','Photoreal home interior design and 3D visualization by Artimist Productions'],
      '/plan-modification-service':['/img/resid02.webp','Residential design developed from floor plan changes into a complete home'],
      '/residential-renovation-permit-drawings':['/img/permit01.webp','Residential renovation and permit drawing package by Artimist Productions'],
      '/visualization':['/img/resid01.webp','Photoreal residential architectural visualization by Artimist Productions'],
      '/bim-drafting':['/img/permit04.webp','Architectural BIM drafting and coordinated drawing production by Artimist Productions']
    };
    Object.keys(map).forEach(function(href){var a=document.querySelector('.st-seo-authority__grid a[href="'+href+'"]');if(!a)return;var img=a.querySelector('img');if(img){img.src=map[href][0];img.alt=map[href][1];}});
  }

  function buildFooter(){
    if(document.querySelector('.artimist-mobile-footer'))return;
    var all=Array.prototype.slice.call(document.querySelectorAll('footer,section'));
    var legacy=all.find(function(el){return /young minds/i.test(el.textContent||'')&&/better work/i.test(el.textContent||'');});
    if(legacy)legacy.classList.add('artimist-legacy-mobile-footer');
    var footer=document.createElement('footer');footer.className='artimist-mobile-footer';
    var insta=document.querySelector('a[href*="instagram.com"]');var linked=document.querySelector('a[href*="linkedin.com"]');
    footer.innerHTML='\
      <div class="amf-head"><small>ARTIMIST PRODUCTIONS / WORLDWIDE</small><h2>One studio.<br><em>Many ways to help.</em></h2><p>Design, plan, visualize and produce with a multidisciplinary team working internationally.</p></div>\
      <nav class="amf-links" aria-label="Footer navigation">\
        <a href="/#work"><span>01</span><b>Selected work</b></a><a href="/home-design-services"><span>02</span><b>Home design help</b></a><a href="/services"><span>03</span><b>Services</b></a><a href="/team"><span>04</span><b>Team</b></a><a href="/#plans"><span>05</span><b>Monthly plans</b></a><a href="/contact"><span>06</span><b>Start a project</b></a>\
      </nav>\
      <div class="amf-world"><small>INTERNATIONAL PROJECT DELIVERY</small><div><span>USA</span><span>UK</span><span>CANADA</span><span>SWEDEN</span><span>WORLDWIDE</span></div><i aria-hidden="true"></i></div>\
      <div class="amf-connect"><a href="mailto:Faizan@artimistproductions.com">EMAIL THE STUDIO</a>'+(insta?'<a href="'+insta.href+'" target="_blank" rel="noopener">INSTAGRAM</a>':'')+(linked?'<a href="'+linked.href+'" target="_blank" rel="noopener">LINKEDIN</a>':'')+'</div>\
      <div class="amf-bottom"><span>© 2026 ARTIMIST PRODUCTIONS</span><span>Architecture · Interiors · BIM · Visualization · Digital</span></div>';
    document.body.appendChild(footer);
  }

  function addStyle(){
    var s=document.createElement('style');s.id='artimist-home-refinement-style';s.textContent=`
      .st-seo-authority__grid a{isolation:isolate}.st-seo-authority__grid img{filter:saturate(.92) contrast(1.03);transform:scale(1.01);animation:artimistServiceBreath 13s ease-in-out infinite alternate}.st-seo-authority__grid a:nth-child(even) img{animation-direction:alternate-reverse}.st-seo-authority__grid a:after{background:linear-gradient(0deg,rgba(5,5,5,.93) 0%,rgba(5,5,5,.48) 45%,rgba(5,5,5,.05) 78%)!important}.st-seo-authority__copy strong{font-size:28px!important}.st-seo-authority__copy small{color:#e06176!important}
      @keyframes artimistServiceBreath{from{transform:scale(1.01) translate3d(0,0,0)}to{transform:scale(1.055) translate3d(0,-7px,0)}}
      .artimist-mobile-footer{display:none;background:#080808;color:#f3ede8;border-top:1px solid rgba(255,255,255,.1);font-family:Arial,sans-serif}.artimist-mobile-footer a{color:inherit;text-decoration:none}
      @media(max-width:760px){
        .st-seo-authority{padding-top:72px!important;background:radial-gradient(circle at 90% 7%,rgba(156,31,53,.12),transparent 30%),#090909!important}.st-seo-authority h2{font-size:47px!important;line-height:.96!important;max-width:9ch!important}.st-seo-authority__lead{font-size:15px!important;line-height:1.6!important}.st-seo-authority__grid{gap:12px!important}.st-seo-authority__grid a{flex-basis:84vw!important;min-height:105vw!important;border-radius:8px!important}.st-seo-authority__copy{left:18px!important;bottom:18px!important}.st-seo-authority__copy strong{font-size:31px!important;line-height:1.04!important}.st-seo-authority__foot{display:grid!important;grid-template-columns:1fr 1fr!important;gap:9px!important}.st-seo-authority__foot a{text-align:center!important;padding:12px 8px!important;font-size:8px!important}
        .artimist-legacy-mobile-footer{display:none!important}.artimist-mobile-footer{display:block!important;position:relative;padding:72px 22px calc(100px + env(safe-area-inset-bottom));overflow:hidden;background:radial-gradient(circle at 92% 18%,rgba(156,31,53,.14),transparent 28%),#080808}.artimist-mobile-footer:before{content:'';position:absolute;inset:0;pointer-events:none;background-image:linear-gradient(rgba(255,255,255,.025) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.025) 1px,transparent 1px);background-size:52px 52px;mask-image:linear-gradient(to bottom,transparent,#000 25%,#000 72%,transparent)}
        .amf-head,.amf-links,.amf-world,.amf-connect,.amf-bottom{position:relative;z-index:1}.amf-head small,.amf-world>small{font:700 8px/1 Arial,sans-serif;letter-spacing:.19em;color:#d65c70}.amf-head h2{font:400 48px/.94 Georgia,serif;letter-spacing:-.045em;margin:16px 0}.amf-head h2 em{font-weight:400;color:#e8b6be}.amf-head p{max-width:31ch;margin:0 0 44px;color:rgba(255,255,255,.55);font-size:14px;line-height:1.6}
        .amf-links{display:grid;grid-template-columns:1fr 1fr;border-top:1px solid rgba(255,255,255,.12);border-left:1px solid rgba(255,255,255,.12)}.amf-links a{min-height:94px;padding:14px;display:flex;flex-direction:column;justify-content:space-between;border-right:1px solid rgba(255,255,255,.12);border-bottom:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.015)}.amf-links span{color:#d65c70;font-size:8px}.amf-links b{font:400 17px/1.12 Georgia,serif}
        .amf-world{padding:42px 0 34px;text-align:center}.amf-world>div{display:flex;justify-content:center;flex-wrap:wrap;gap:8px;margin:16px 0 26px}.amf-world>div span{padding:8px 10px;border:1px solid rgba(255,255,255,.12);border-radius:999px;font-size:8px;letter-spacing:.08em}.amf-world i{display:block;height:94px;opacity:.45;background:radial-gradient(circle at 15% 55%,#b9354d 0 2px,transparent 3px),radial-gradient(circle at 38% 37%,#b9354d 0 2px,transparent 3px),radial-gradient(circle at 51% 32%,#b9354d 0 2px,transparent 3px),radial-gradient(circle at 67% 39%,#b9354d 0 2px,transparent 3px),radial-gradient(circle at 82% 58%,#b9354d 0 2px,transparent 3px),linear-gradient(18deg,transparent 46%,rgba(255,255,255,.08) 47% 48%,transparent 49%),linear-gradient(-18deg,transparent 46%,rgba(255,255,255,.05) 47% 48%,transparent 49%);border:1px solid rgba(255,255,255,.06);border-radius:50%/35%}
        .amf-connect{display:flex;gap:8px;flex-wrap:wrap;padding:0 0 30px}.amf-connect a{padding:10px 12px;border:1px solid rgba(255,255,255,.14);border-radius:999px;font-size:8px;letter-spacing:.1em}.amf-bottom{padding-top:22px;border-top:1px solid rgba(255,255,255,.1);display:flex;flex-direction:column;gap:8px;color:rgba(255,255,255,.35);font-size:8px;letter-spacing:.08em;line-height:1.5}
      }
      @media(prefers-reduced-motion:reduce){.st-seo-authority__grid img{animation:none!important}}
    `;document.head.appendChild(s);
  }

  function init(){addStyle();refineServiceImages();buildFooter();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
