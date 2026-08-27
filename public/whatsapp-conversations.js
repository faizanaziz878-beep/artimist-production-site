(function () {
  'use strict';
  if (location.pathname.indexOf('/admin') === 0) return;

  var NUMBER = '18078084181';
  var SERVICE_LABELS = {
    '/home-design-services': 'home design help','/custom-house-design': 'custom house design and floor plans','/plan-modification-service': 'house plan modifications and floor plan changes','/3d-interior-design-service': '3D interior design and home visualization','/residential-renovation-permit-drawings': 'residential renovation and permit drawings','/architecture': 'architecture and interior design','/bim-drafting': 'BIM, Revit and CAD drafting','/visualization': 'architectural visualization and 3D rendering','/unreal-engine': 'Unreal Engine and interactive architecture','/international': 'international project delivery','/services': 'Artimist services','/case-studies': 'an Artimist project','/residential': 'residential design','/': 'a project with Artimist Productions'
  };
  function currentTopic(){var path=location.pathname.replace(/\/$/,'')||'/';if(SERVICE_LABELS[path])return SERVICE_LABELS[path];var keys=Object.keys(SERVICE_LABELS).filter(function(k){return k!=='/';});for(var i=0;i<keys.length;i++)if(path.indexOf(keys[i])===0)return SERVICE_LABELS[keys[i]];var h1=document.querySelector('h1');return h1&&h1.textContent?h1.textContent.trim().replace(/\s+/g,' ').slice(0,90):'a project with Artimist Productions';}
  function makeHref(source){var text='Hi Artimist Productions — I’m interested in '+currentTopic()+' and would like to discuss a project.';if(source)text+=' I came from '+source+'.';return 'https://wa.me/'+NUMBER+'?text='+encodeURIComponent(text);}
  function track(source){try{if(typeof window.gtag==='function')window.gtag('event','whatsapp_click',{source:source||'site_whatsapp',page_path:location.pathname,page_title:document.title});}catch(err){}}
  function isConversationLink(a){if(!a||!a.textContent||a.closest('form'))return false;var text=a.textContent.replace(/\s+/g,' ').trim().toLowerCase();return /(start a conversation|talk to|talk with|chat with|chat to|speak with|speak to|get in touch|contact us|contact the studio|discuss (this|your|a|the|project|service)|have a question|message (us|the studio)|whatsapp)/i.test(text);}
  function wireConversationLinks(root){var links=(root||document).querySelectorAll?(root||document).querySelectorAll('a'):[];Array.prototype.forEach.call(links,function(a){if(!isConversationLink(a)||a.dataset.artimistWhatsapp==='1')return;a.dataset.artimistWhatsapp='1';a.href=makeHref('the '+(a.textContent||'conversation link').replace(/\s+/g,' ').trim().slice(0,50));a.target='_blank';a.rel='noopener noreferrer';a.addEventListener('click',function(){track('conversation_cta');});});}
  function syncAskControls(){var studioAsk=document.querySelector('.st-ask-btn');document.body.classList.toggle('artimist-has-studio-ask',!!studioAsk);document.body.classList.toggle('artimist-studio-ask-open',!!(studioAsk&&studioAsk.classList.contains('is-open')));}
  function addStyle(){
    if(document.getElementById('artimist-whatsapp-style'))return;
    var style=document.createElement('style');style.id='artimist-whatsapp-style';style.textContent=[
      '.artimist-whatsapp{position:fixed;right:22px;bottom:22px;z-index:2147483200;display:flex;align-items:center;gap:12px;padding:12px 16px 12px 13px;border:1px solid rgba(255,255,255,.16);border-radius:999px;background:rgba(9,9,9,.92);color:#fff!important;text-decoration:none!important;box-shadow:0 16px 45px rgba(0,0,0,.34);-webkit-backdrop-filter:blur(18px) saturate(1.08);backdrop-filter:blur(18px) saturate(1.08);font-family:Arial,sans-serif;transition:transform .24s ease,border-color .2s ease,background .2s ease,opacity .2s ease}',
      '.artimist-whatsapp:hover{transform:translateY(-2px);border-color:rgba(217,100,118,.55);background:rgba(12,12,12,.97)}',
      '.artimist-whatsapp__mark{width:10px;height:10px;border-radius:50%;background:#b71f3d;box-shadow:0 0 0 5px rgba(156,31,53,.14);flex:none}',
      '.artimist-whatsapp__copy{display:flex;flex-direction:column;gap:2px;line-height:1}.artimist-whatsapp__copy small{font-size:7px;letter-spacing:.18em;color:rgba(255,255,255,.52);text-transform:uppercase}.artimist-whatsapp__copy strong{font-size:10px;font-weight:650;letter-spacing:.12em;text-transform:uppercase;white-space:nowrap}',
      '.askbot-launch{display:none!important}body.artimist-studio-ask-open .artimist-whatsapp{opacity:0;pointer-events:none;transform:translateY(8px)}',
      '@media(max-width:760px){body{padding-bottom:calc(104px + env(safe-area-inset-bottom))!important}.artimist-whatsapp{left:12px!important;right:auto!important;bottom:calc(14px + env(safe-area-inset-bottom))!important;box-sizing:border-box!important;width:calc((100vw - 34px)/2)!important;max-width:none!important;min-height:52px!important;height:52px!important;padding:0 13px!important;gap:8px!important;justify-content:center!important}.artimist-whatsapp__copy small{display:none!important}.artimist-whatsapp__copy strong{font-size:8.5px!important;letter-spacing:.075em!important}.artimist-whatsapp__mark{width:9px!important;height:9px!important}.st-ask-btn{left:auto!important;right:12px!important;bottom:calc(14px + env(safe-area-inset-bottom))!important;box-sizing:border-box!important;width:calc((100vw - 34px)/2)!important;max-width:none!important;min-width:0!important;min-height:52px!important;height:52px!important;padding:0 13px!important;border-radius:999px!important;font-size:0!important;line-height:1!important;white-space:nowrap!important;justify-content:center!important}.st-ask-btn:after{content:"ASK THE STUDIO";font:700 8.5px/1 Arial,sans-serif!important;letter-spacing:.075em!important;color:#fff!important}.st-ask-btn>*{font-size:0!important}.st-ask-btn .st-ask-q,.st-ask-btn i{width:22px!important;height:22px!important;min-width:22px!important;margin-right:7px!important;font-size:11px!important}.st-ask{right:12px!important;left:12px!important;bottom:calc(82px + env(safe-area-inset-bottom))!important;width:auto!important;max-height:calc(100dvh - 110px)!important}.st-contact,.st-footer,.st-clients,.hdh-bottom,.practice-next,.partners-v2-close,.st-seo-authority{padding-bottom:max(132px,calc(118px + env(safe-area-inset-bottom)))!important}body.artimist-dock-collision .artimist-whatsapp,body.artimist-dock-collision .st-ask-btn{opacity:0!important;pointer-events:none!important;transform:translateY(135%)!important}}',
      '@media(max-width:390px){.artimist-whatsapp,.st-ask-btn{width:calc((100vw - 32px)/2)!important}.artimist-whatsapp{left:10px!important}.st-ask-btn{right:10px!important}.artimist-whatsapp__copy strong,.st-ask-btn:after{font-size:7.8px!important;letter-spacing:.055em!important}}',
      '.st-scroll-cue::before{content:"\\2193";display:block;color:#fff;font:400 16px/1 Arial,sans-serif;transform:translateY(-1px)}',
      '.artimist-heading-write{opacity:.01!important;clip-path:inset(0 100% 0 0)!important;transform:translateY(.13em)!important;filter:blur(3px)!important;transition:none!important}',
      '.artimist-heading-write.is-writing{opacity:1!important;clip-path:inset(0)!important;transform:none!important;filter:none!important;transition:clip-path .9s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1),filter .6s ease,opacity .18s ease!important}',
      '.artimist-write-accent{position:relative;display:inline;color:#c73955!important;-webkit-text-fill-color:#c73955!important;white-space:pre-wrap}',
      '.artimist-write-char{display:inline;opacity:0;transform:translateY(.08em)}',
      '.artimist-heading-write.is-writing .artimist-write-char{animation:artimistTypeChar .035s steps(1,end) forwards;animation-delay:calc(.28s + (var(--char-index) * .045s))}',
      '.artimist-write-accent::after{content:"";display:inline-block;width:1px;height:.8em;margin-left:.07em;background:currentColor;vertical-align:-.04em;opacity:0}',
      '.artimist-heading-write.is-writing:not(.is-written) .artimist-write-accent::after{opacity:.9;animation:artimistCaret .62s steps(1,end) infinite}',
      '@keyframes artimistTypeChar{to{opacity:1;transform:none}}@keyframes artimistCaret{0%,48%{opacity:1}49%,100%{opacity:0}}',
      '@media(prefers-reduced-motion:reduce){.artimist-whatsapp{transition:none}}'
    ].join('');document.head.appendChild(style);
  }
  function addPersistentCta(){if(document.querySelector('.artimist-whatsapp'))return;var a=document.createElement('a');a.className='artimist-whatsapp';a.href=makeHref('the website');a.target='_blank';a.rel='noopener noreferrer';a.setAttribute('aria-label','Talk to Artimist Productions on WhatsApp');a.innerHTML='<span class="artimist-whatsapp__mark" aria-hidden="true"></span><span class="artimist-whatsapp__copy"><small>WhatsApp</small><strong>Talk to the studio</strong></span>';a.addEventListener('click',function(){track('persistent_whatsapp');});document.body.appendChild(a);}

  function initDockSafety(){
    var timer=0;
    function intersectionArea(a,b){return Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left))*Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));}
    function sync(){
      timer=0;
      if(!window.matchMedia||!window.matchMedia('(max-width:760px)').matches){document.body.classList.remove('artimist-dock-collision');return;}
      var dock=Array.prototype.slice.call(document.querySelectorAll('.artimist-whatsapp,.st-ask-btn')).filter(function(e){var r=e.getBoundingClientRect();return r.width>0&&r.height>0;});
      var controls=Array.prototype.slice.call(document.querySelectorAll('a,button,input,select,textarea,[role="button"]'));
      var blocked=false;
      dock.forEach(function(w){
        var wr=w.getBoundingClientRect();
        controls.forEach(function(el){
          if(blocked||el===w||w.contains(el)||el.contains(w)||dock.indexOf(el)>-1)return;
          var s=getComputedStyle(el),r=el.getBoundingClientRect();
          if(s.position==='fixed'||s.visibility==='hidden'||s.display==='none'||r.width<12||r.height<12||r.bottom<=0||r.top>=innerHeight)return;
          var overlap=intersectionArea(wr,r),smaller=Math.min(wr.width*wr.height,r.width*r.height);
          if(overlap>500&&overlap/Math.max(1,smaller)>.28)blocked=true;
        });
      });
      document.body.classList.toggle('artimist-dock-collision',blocked);
    }
    function queue(){if(timer)return;timer=requestAnimationFrame(sync);}
    addEventListener('scroll',queue,{passive:true});addEventListener('resize',queue,{passive:true});
    setTimeout(sync,350);setTimeout(sync,1400);
  }

  function initEditorialMotion(){
    var reduce=window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    var observer=null,prepared=[];
    function finish(node){
      node.classList.add('is-writing');
      var count=+(node.getAttribute('data-artimist-chars')||0);
      setTimeout(function(){node.classList.add('is-written');},Math.min(3800,850+count*45));
    }
    function prepare(rootNode){
      var pool=[];
      if(rootNode&&rootNode.nodeType===1&&rootNode.matches&&rootNode.matches('h1,h2,.st-h2,.st-feature-title'))pool.push(rootNode);
      if(rootNode&&rootNode.querySelectorAll)pool=pool.concat(Array.prototype.slice.call(rootNode.querySelectorAll('h1,h2,.st-h2,.st-feature-title')));
      pool.forEach(function(node){
        if(node.dataset.artimistWriting==='1'||node.closest('.st-header,.ap-header,.canonical-header,.site-index,.st-ask,.askbot-panel,[aria-hidden="true"]'))return;
        var plain=(node.textContent||'').trim();
        if(plain.length<3||plain.length>190)return;
        node.dataset.artimistWriting='1';node.classList.add('artimist-heading-write');prepared.push(node);
        var charCount=0;
        Array.prototype.slice.call(node.querySelectorAll('em')).forEach(function(em){
          if(em.children.length||em.dataset.artimistTyped==='1')return;
          var text=em.textContent||'';if(!text.trim()||text.length>64)return;
          em.dataset.artimistTyped='1';em.classList.add('artimist-write-accent');em.setAttribute('aria-label',text);
          em.textContent='';
          Array.prototype.forEach.call(text,function(ch){
            var span=document.createElement('span');span.className='artimist-write-char';span.setAttribute('aria-hidden','true');span.style.setProperty('--char-index',String(charCount++));span.textContent=ch;em.appendChild(span);
          });
        });
        node.setAttribute('data-artimist-chars',String(charCount));
        if(reduce||!observer)finish(node);else observer.observe(node);
      });
    }
    if(!reduce&&'IntersectionObserver' in window){
      observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){finish(entry.target);observer.unobserve(entry.target);}});},{rootMargin:'0px 0px -7% 0px',threshold:.08});
    }
    prepare(document);
    var wordingMutations=new MutationObserver(function(records){records.forEach(function(record){Array.prototype.forEach.call(record.addedNodes||[],prepare);});});
    wordingMutations.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(function(){prepare(document);prepared.forEach(function(node){if(!node.classList.contains('is-writing'))finish(node);});},2800);
  }

  function init(){addStyle();wireConversationLinks(document);addPersistentCta();syncAskControls();initDockSafety();initEditorialMotion();var observer=new MutationObserver(function(mutations){mutations.forEach(function(mutation){Array.prototype.forEach.call(mutation.addedNodes||[],function(node){if(node.nodeType===1)wireConversationLinks(node);});});syncAskControls();});observer.observe(document.documentElement,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
