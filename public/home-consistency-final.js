(function(){
  'use strict';
  if((location.pathname.replace(/\/$/,'')||'/')!=='/')return;

  function install(){
    var indexLabel=document.querySelector('.st-index-top>span');
    if(indexLabel)indexLabel.textContent='INDEX / 57 PAGES';

    if(!document.getElementById('artimist-home-consistency-final')){
      var style=document.createElement('style');
      style.id='artimist-home-consistency-final';
      style.textContent=`
        /* The legacy marquee wrapper must stop sizing the new client grid. */
        .st-clients[data-artimist-clients="1"] .st-marquee{
          width:100vw!important;min-width:100vw!important;max-width:100vw!important;
          margin-left:calc(50% - 50vw)!important;overflow:hidden!important;
        }
        .st-clients[data-artimist-clients="1"] #marquee.st-marquee-track{
          display:block!important;width:100%!important;min-width:100%!important;max-width:100%!important;
          animation:none!important;transform:none!important;overflow:visible!important;
        }
        .st-clients[data-artimist-clients="1"] #marquee>.artimist-client-track{
          display:grid!important;width:100%!important;min-width:100%!important;max-width:100%!important;
          grid-template-columns:repeat(5,minmax(0,1fr))!important;align-items:stretch!important;
          transform:none!important;animation:none!important;
        }
        .st-clients[data-artimist-clients="1"] #marquee>.artimist-client-track>.artimist-client-card{
          width:100%!important;min-width:0!important;max-width:none!important;box-sizing:border-box!important;
        }
        @media(max-width:1100px) and (min-width:761px){
          .st-clients[data-artimist-clients="1"] #marquee>.artimist-client-track{
            grid-template-columns:repeat(3,minmax(0,1fr))!important;
          }
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
          .st-clients[data-artimist-clients="1"] #marquee>.artimist-client-track>.artimist-client-card{
            flex:0 0 78vw!important;width:78vw!important;min-width:78vw!important;
          }
        }
      `;
      document.head.appendChild(style);
    }

    return !!document.querySelector('#marquee>.artimist-client-track');
  }

  install();
  var tries=0;
  var timer=setInterval(function(){
    tries++;
    if(install()||tries>40)clearInterval(timer);
  },120);
})();