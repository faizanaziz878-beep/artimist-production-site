(function(){
  'use strict';
  if((location.pathname.replace(/\/$/,'')||'/')!=='/')return;

  function canonicalizeLinks(){
    document.querySelectorAll('a[href="/architectural-visualization-services"]').forEach(function(link){
      link.setAttribute('href','/visualization');
    });
  }

  function ensureVisualArchiveLink(){
    var foot=document.querySelector('.st-seo-authority__foot');
    if(foot&&!foot.querySelector('a[href="/visual-archive"]')){
      var link=document.createElement('a');
      link.href='/visual-archive';
      link.textContent='Visual archive';
      foot.appendChild(link);
    }
    var footerList=document.querySelector('.st-footer-grid ul:nth-of-type(2)');
    if(footerList&&!footerList.querySelector('a[href="/visual-archive"]')){
      var item=document.createElement('li');
      var archive=document.createElement('a');
      archive.href='/visual-archive';
      archive.textContent='Visual archive';
      item.appendChild(archive);
      footerList.appendChild(item);
    }
  }

  function ensureDesktopMotion(){
    if(document.querySelector('script[data-artimist-desktop-showcase="1"]'))return;
    var script=document.createElement('script');
    script.src='/desktop-showcase-motion.js';
    script.defer=true;
    script.dataset.artimistDesktopShowcase='1';
    document.body.appendChild(script);
  }

  function install(){
    canonicalizeLinks();
    ensureVisualArchiveLink();

    if(!document.getElementById('artimist-home-consistency-final')){
      var style=document.createElement('style');
      style.id='artimist-home-consistency-final';
      style.textContent=`
        /* Keep the client showcase full-bleed while allowing the rail to move. */
        .st-clients[data-artimist-clients="1"] .st-marquee{
          width:100vw!important;min-width:100vw!important;max-width:100vw!important;
          margin-left:calc(50% - 50vw)!important;overflow:hidden!important;
        }
        .st-clients[data-artimist-clients="1"] #marquee.st-marquee-track{
          display:block!important;width:100%!important;min-width:100%!important;max-width:100%!important;
          animation:none!important;overflow:hidden!important;
        }
        .st-clients[data-artimist-clients="1"] #marquee>.artimist-client-track{
          display:flex!important;width:max-content!important;min-width:0!important;max-width:none!important;
          grid-template-columns:none!important;justify-content:flex-start!important;align-items:stretch!important;
          animation:none!important;will-change:transform!important;
        }
        .st-clients[data-artimist-clients="1"] #marquee>.artimist-client-track>.artimist-client-card,
        .st-clients[data-artimist-clients="1"] #marquee>.artimist-client-track>.artimist-client-card:nth-child(n+6){
          display:flex!important;flex:0 0 clamp(260px,20vw,350px)!important;
          width:clamp(260px,20vw,350px)!important;min-width:clamp(260px,20vw,350px)!important;
          max-width:clamp(260px,20vw,350px)!important;box-sizing:border-box!important;
        }
        @media(max-width:760px){
          .st-clients[data-artimist-clients="1"] #marquee.st-marquee-track{
            display:block!important;width:100%!important;min-width:100%!important;max-width:100%!important;
            overflow:hidden!important;
          }
          .st-clients[data-artimist-clients="1"] #marquee>.artimist-client-track{
            display:flex!important;width:max-content!important;min-width:0!important;max-width:none!important;
            transform:translate3d(0,0,0);will-change:transform!important;
          }
          .st-clients[data-artimist-clients="1"] #marquee>.artimist-client-track>.artimist-client-card,
          .st-clients[data-artimist-clients="1"] #marquee>.artimist-client-track>.artimist-client-card:nth-child(n+6){
            display:flex!important;flex:0 0 78vw!important;width:78vw!important;min-width:78vw!important;max-width:78vw!important;
          }
        }
        @media(prefers-reduced-motion:reduce){
          .st-clients[data-artimist-clients="1"] #marquee>.artimist-client-track{transform:none!important;will-change:auto!important;}
        }
      `;
      document.head.appendChild(style);
    }

    ensureDesktopMotion();
    return !!document.querySelector('#marquee>.artimist-client-track');
  }

  install();
  var tries=0;
  var timer=setInterval(function(){
    tries++;
    if(install()||tries>40)clearInterval(timer);
  },120);

  new MutationObserver(function(){canonicalizeLinks();ensureVisualArchiveLink();}).observe(document.documentElement,{childList:true,subtree:true});
})();