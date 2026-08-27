(function(){
  'use strict';
  function esc(s){return String(s).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
  var plans=[
    {name:'Dedicated',price:'$10,000',tag:'Dedicated multidisciplinary team',desc:'For developers, studios and growing businesses that need several disciplines moving together every week under one accountable production lead.',features:['Multiple concurrent workstreams','Dedicated senior project lead','Architecture, BIM, interiors and visualization access','Priority scheduling and daily coordination window','Leadership quality review before delivery','Source files and structured handover','NDA and client-standard workflow support']},
    {name:'Studio Partner',price:'$25,000',tag:'Private production partnership',gold:true,desc:'A reserved Artimist production cell for high-volume or high-stakes programs where design, technical production, visualization, motion and digital delivery need to operate as one team.',features:['Reserved multidisciplinary production capacity','Parallel architecture, BIM, visualization and digital workstreams','Founder / senior leadership oversight','Priority access across the studio','Custom reporting, review rhythm and delivery standards','High-volume source-file and asset handover','NDA, white-label and partner-workflow support','Scope and capacity planned around the engagement']}
  ];
  function card(p){
    return '<article class="st-plan'+(p.gold?' is-gold':' is-premium')+'">'+
      '<span class="st-plan-tag">'+esc(p.tag)+'</span>'+
      '<h3>'+esc(p.name)+'</h3><div class="st-plan-price">'+esc(p.price)+'</div>'+
      '<p>'+esc(p.desc)+'</p><ul>'+p.features.map(function(f){return '<li>'+esc(f)+'</li>';}).join('')+'</ul>'+
      '<a href="#brief">Discuss '+esc(p.name)+'</a></article>';
  }
  function init(){
    var grid=document.getElementById('planGrid');
    if(!grid||grid.dataset.premiumPlans==='1')return false;
    grid.dataset.premiumPlans='1';
    plans.forEach(function(p){grid.insertAdjacentHTML('beforeend',card(p));});
    var style=document.createElement('style');style.id='artimist-premium-plan-style';
    style.textContent='\
      #planGrid{grid-template-columns:repeat(5,minmax(0,1fr))!important}\
      .st-plan.is-premium{border-color:rgba(217,100,118,.34)!important;background:linear-gradient(155deg,rgba(156,31,53,.13),rgba(255,255,255,.025))!important}\
      .st-plan.is-premium .st-plan-price{color:#efc0c8!important}\
      .st-plan.is-gold{position:relative;overflow:hidden;border-color:rgba(212,175,55,.62)!important;background:radial-gradient(circle at 88% 5%,rgba(235,199,94,.20),transparent 30%),linear-gradient(145deg,#17130a,#090806 58%,#151006)!important;box-shadow:0 28px 80px rgba(141,105,25,.18),inset 0 0 0 1px rgba(255,226,136,.08)!important}\
      .st-plan.is-gold:before{content:"PRIVATE PARTNERSHIP";position:absolute;right:18px;top:18px;color:#e4c76e;font:700 7px/1 Arial,sans-serif;letter-spacing:.18em}\
      .st-plan.is-gold:after{content:"";position:absolute;inset:-80% -25%;pointer-events:none;background:linear-gradient(105deg,transparent 42%,rgba(255,231,156,.10) 49%,rgba(255,244,200,.20) 50%,rgba(255,231,156,.08) 51%,transparent 58%);transform:translateX(-45%);animation:artimistGoldSweep 8s ease-in-out infinite}\
      .st-plan.is-gold>*{position:relative;z-index:1}.st-plan.is-gold .st-plan-tag,.st-plan.is-gold .st-plan-price{color:#e7ca73!important}.st-plan.is-gold h3{color:#fff7dc!important}.st-plan.is-gold li{border-color:rgba(230,198,104,.18)!important}.st-plan.is-gold>a{background:linear-gradient(135deg,#d6b552,#f0d983)!important;color:#171006!important;border-color:transparent!important;font-weight:700!important}\
      @keyframes artimistGoldSweep{0%,68%{transform:translateX(-55%)}88%,100%{transform:translateX(52%)}}\
      @media(max-width:1180px){#planGrid{grid-template-columns:repeat(2,minmax(0,1fr))!important}.st-plan.is-gold{grid-column:span 2}}\
      @media(max-width:760px){#planGrid{display:flex!important;grid-template-columns:none!important;overflow-x:auto!important;scroll-snap-type:x mandatory!important;gap:12px!important;padding:0 20px 10px!important;margin-left:-20px!important;margin-right:-20px!important;scrollbar-width:none!important}#planGrid::-webkit-scrollbar{display:none}.st-plan{flex:0 0 82vw!important;scroll-snap-align:center!important}.st-plan.is-gold{grid-column:auto!important;flex-basis:88vw!important}.st-plan.is-gold:before{top:16px;right:15px}}\
      @media(prefers-reduced-motion:reduce){.st-plan.is-gold:after{animation:none}}';
    document.head.appendChild(style);
    return true;
  }
  var tries=0,t=setInterval(function(){tries++;if(init()||tries>35)clearInterval(t);},180);init();
})();
