(function(){
  'use strict';
  if(!window.matchMedia||!window.matchMedia('(max-width:760px)').matches)return;
  var path=location.pathname.replace(/\/$/,'');
  var sets={
    '/bim-drafting':[
      ['/media/editorial/bim-coordination-study.jpg','BIM coordination and technical production study','BIM + COORDINATION'],
      ['/img/permit01.webp','Coordinated architectural drawing package','DRAWINGS + DOCUMENTATION']
    ],
    '/architecture':[
      ['/img/resext03.webp','Contemporary residential architecture design','RESIDENTIAL DESIGN'],
      ['/img/airside-district-01.webp','Architecture and site planning study','SITE + ARCHITECTURE']
    ],
    '/visualization':[
      ['/img/resid01.webp','Photoreal residential architectural visualization','ARCHITECTURAL VISUALIZATION'],
      ['/media/projects/bowl-stroke.webp','Hospitality interior and exterior visualization','SPACE + ATMOSPHERE']
    ],
    '/services':[
      ['/img/services/design-house-premium-2026.jpg','Custom house design and floor planning','HOUSE DESIGN'],
      ['/img/services/design-interior-premium-2026.jpg','3D interior design visualization','INTERIOR + 3D']
    ]
  };
  if(!sets[path])return;

  function build(){
    if(document.querySelector('.artimist-mobile-scope-visuals'))return;
    var scope=document.querySelector('.practice-scope>.shell')||document.querySelector('.services-v2-standard>.shell');
    if(!scope)return;
    var target=scope.querySelector('.practice-scope-list')||scope.lastElementChild;
    if(!target)return;
    var wrap=document.createElement('div');wrap.className='artimist-mobile-scope-visuals';
    sets[path].forEach(function(v){var f=document.createElement('figure');f.innerHTML='<img src="'+v[0]+'" alt="'+v[1]+'" loading="lazy" decoding="async"><figcaption>'+v[2]+'</figcaption>';wrap.appendChild(f);});
    scope.insertBefore(wrap,target);
    var style=document.createElement('style');
    style.textContent='.artimist-mobile-scope-visuals{display:flex;gap:10px;overflow-x:auto;scroll-snap-type:x mandatory;margin:0 -14px 34px;padding:0 14px 4px;scrollbar-width:none}.artimist-mobile-scope-visuals::-webkit-scrollbar{display:none}.artimist-mobile-scope-visuals figure{position:relative;flex:0 0 82vw;height:58vw;margin:0;overflow:hidden;border:1px solid rgba(255,255,255,.12);scroll-snap-align:center;background:#111}.artimist-mobile-scope-visuals img{width:100%;height:100%;object-fit:cover;animation:artimistScopeVisual 13s ease-in-out infinite alternate}.artimist-mobile-scope-visuals figcaption{position:absolute;left:12px;bottom:12px;padding:8px 10px;background:rgba(6,6,6,.72);color:#fff;font:700 9px Arial,sans-serif;letter-spacing:.12em;backdrop-filter:blur(8px)}@keyframes artimistScopeVisual{from{transform:scale(1.01)}to{transform:scale(1.05) translateY(-5px)}}@media(prefers-reduced-motion:reduce){.artimist-mobile-scope-visuals img{animation:none}}';
    document.head.appendChild(style);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build);else build();
})();
