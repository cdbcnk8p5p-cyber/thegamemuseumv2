// Museum-wide platform naming, ordering, Collection shelf selector and colour-coded filters.
(() => {
  const PLATFORM_ORDER = [
    'Nintendo DS','Nintendo Switch','Nintendo Wii','Sega Mega Drive',
    'PlayStation 1','PlayStation 2','PlayStation 3','PlayStation 4','PlayStation 5','PlayStation Portable','PlayStation Vita',
    'Xbox Original','Xbox 360','Xbox One','Xbox Series X/S','Xbox Cross Generation'
  ];
  const aliases = new Map([
    ['ds','Nintendo DS'],['nintendo ds','Nintendo DS'],['switch','Nintendo Switch'],['nintendo switch','Nintendo Switch'],['wii','Nintendo Wii'],['nintendo wii','Nintendo Wii'],
    ['mega drive','Sega Mega Drive'],['sega mega drive','Sega Mega Drive'],
    ['ps1','PlayStation 1'],['playstation','PlayStation 1'],['playstation 1','PlayStation 1'],['ps2','PlayStation 2'],['playstation 2','PlayStation 2'],
    ['ps3','PlayStation 3'],['playstation 3','PlayStation 3'],['ps4','PlayStation 4'],['playstation 4','PlayStation 4'],['ps5','PlayStation 5'],['playstation 5','PlayStation 5'],
    ['psp','PlayStation Portable'],['playstation portable','PlayStation Portable'],['ps vita','PlayStation Vita'],['psvita','PlayStation Vita'],['playstation vita','PlayStation Vita'],
    ['xbox','Xbox Original'],['original xbox','Xbox Original'],['xbox original','Xbox Original'],['xbox 360','Xbox 360'],['xbox one','Xbox One'],
    ['xbox cross generation','Xbox Cross Generation'],['xbox cross-generation','Xbox Cross Generation'],['xbox cross gen','Xbox Cross Generation'],['xbox cross-gen','Xbox Cross Generation'],
    ['xbox series x','Xbox Series X/S'],['xbox series s','Xbox Series X/S'],['xbox series x/s','Xbox Series X/S'],['xbox series s/x','Xbox Series X/S']
  ]);
  const canonical = value => { const raw=String(value||'').trim(); return raw ? (aliases.get(raw.toLowerCase())||raw) : raw; };
  const dedupe = (items,keyFn) => { const map=new Map(); (items||[]).forEach(item=>map.set(keyFn(item),item)); return [...map.values()]; };
  const normaliseData = data => {
    if (!data || typeof data!=='object') return false; let changed=false;
    if (Array.isArray(data.games)) {
      data.games.forEach(item=>{ if(!item?.platform)return; const next=canonical(item.platform); if(next!==item.platform){item.platform=next;changed=true;} });
      const before=data.games.length; data.games=dedupe(data.games,g=>g?.id||`${g?.title||''}|${g?.platform||''}|${g?.category||''}`); if(data.games.length!==before)changed=true;
    }
    if (Array.isArray(data.wishlist)) {
      data.wishlist.forEach(item=>{ if(!item?.platform)return; const next=canonical(item.platform); if(next!==item.platform){item.platform=next;changed=true;} });
      const before=data.wishlist.length; data.wishlist=dedupe(data.wishlist,w=>`${w?.platform||''}|${w?.title||''}`); if(data.wishlist.length!==before)changed=true;
    }
    return changed;
  };
  if (window.MUSEUM_SEED) normaliseData(window.MUSEUM_SEED);
  for (let i=0;i<localStorage.length;i++) {
    const key=localStorage.key(i); if(!key||!key.startsWith('theGameMuseumV'))continue;
    try { const raw=localStorage.getItem(key); if(!raw)continue; const data=JSON.parse(raw); if(normaliseData(data))localStorage.setItem(key,JSON.stringify(data)); } catch(_) {}
  }
  const rank = name => { const i=PLATFORM_ORDER.indexOf(canonical(name)); return i===-1?PLATFORM_ORDER.length:i; };
  const familyOf = value => { const p=canonical(value).toLowerCase(); if(p.includes('nintendo'))return'Nintendo'; if(p.includes('playstation'))return'PlayStation'; if(p.includes('sega'))return'Sega'; if(p.includes('xbox'))return'Xbox'; return''; };
  window.MUSEUM_PLATFORM_ORDER=PLATFORM_ORDER;
  window.MUSEUM_CANONICAL_PLATFORM=canonical;

  const platformSelect=document.getElementById('platformFilter');
  const tidyPlatformFilter = select => {
    if(!select)return; const all=[...select.options].find(o=>o.value===''),selected=select.value;
    const sorted=[...select.options].filter(o=>o.value!=='').sort((a,b)=>rank(a.value)-rank(b.value)||a.textContent.localeCompare(b.textContent));
    const current=[...select.options].filter(o=>o.value!=='').map(o=>o.value).join('|'),desired=sorted.map(o=>o.value).join('|');
    if(current===desired)return; select.replaceChildren(...(all?[all]:[]),...sorted); if([...select.options].some(o=>o.value===selected))select.value=selected;
  };
  if(platformSelect){ new MutationObserver(()=>tidyPlatformFilter(platformSelect)).observe(platformSelect,{childList:true}); queueMicrotask(()=>tidyPlatformFilter(platformSelect)); }

  function redirectServiceWorker(){
    try {
      if(!('serviceWorker' in navigator)||typeof ServiceWorkerContainer==='undefined')return;
      const proto=ServiceWorkerContainer.prototype,base=proto.register; if(!base||base.__museumShelfRedirect)return;
      const wrapped=function(scriptURL,options){ const raw=String(scriptURL||''); const next=/(^|\/)sw\.js(?:[?#].*)?$/.test(raw)?'./sw-shelf-tabs.js':scriptURL; return base.call(this,next,options); };
      wrapped.__museumShelfRedirect=true; proto.register=wrapped;
    } catch(_) {}
  }
  redirectServiceWorker();

  const PALETTE={
    Nintendo:{background:'#d71920',border:'#ff565b'},PlayStation:{background:'#0758c7',border:'#3d8cff'},
    Sega:{background:'#111111',border:'#4c5965'},Xbox:{background:'#16811e',border:'#4dbb54'}
  };
  const NEUTRAL={background:'#24384b',border:'#536a80'};
  const coloursFor=family=>PALETTE[family]||NEUTRAL;

  function installBaseStyles(){
    if(document.getElementById('museum-shelf-selector-style'))return;
    const style=document.createElement('style'); style.id='museum-shelf-selector-style';
    style.textContent=`
      .shelf-selector{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:14px;padding:6px;background:var(--surface);border:1px solid var(--line);border-radius:18px;box-shadow:var(--shadow);position:relative;z-index:520}
      .shelf-tab{min-width:0;border:1px solid transparent;background:transparent;color:var(--muted);border-radius:13px;padding:11px 8px;display:flex;align-items:center;justify-content:center;gap:7px;font-size:12px;font-weight:900;cursor:pointer;transition:.18s}
      .shelf-tab:hover{background:var(--surface2);color:var(--ink)}
      .shelf-tab[aria-pressed="true"]{background:linear-gradient(135deg,var(--navy),var(--navy2));border-color:rgba(215,170,56,.45);color:#fff;box-shadow:0 7px 18px rgba(9,24,39,.18)}
      .shelf-tab-icon{font-size:15px;line-height:1}
      #collection .filters{display:flex!important;flex-direction:column!important;gap:14px!important;position:relative!important;z-index:510!important;overflow:visible!important}
      #collection .filters>label,#collection .filters>#searchInput{width:100%;min-width:0}
      .museum-filter-controls{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;width:100%;align-items:end;position:relative;z-index:530;overflow:visible}
      .museum-filter-controls>label,.museum-filter-controls>select{min-width:0;width:100%;margin:0;position:relative;overflow:visible}
      .museum-filter-controls select{width:100%;transition:background .18s,border-color .18s,box-shadow .18s;color-scheme:dark}
      #collection .results-line{position:relative;z-index:2}
      #collectionGrid{position:relative;z-index:1}
      @media(max-width:620px){.museum-filter-controls{grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.museum-filter-controls label{font-size:9px}.museum-filter-controls select{padding:12px 8px;font-size:14px}.shelf-tab{gap:5px;padding:10px 5px;font-size:11px}}
      @media(max-width:390px){.shelf-tab{gap:4px;padding:10px 4px;font-size:10px}.shelf-tab-icon{font-size:14px}.museum-filter-controls{gap:6px}.museum-filter-controls select{padding:11px 6px;font-size:13px}}
    `; document.head.appendChild(style);
  }

  function setupShelfAndLayout(){
    const page=document.getElementById('collection'),filters=page?.querySelector('.filters'),gallery=document.getElementById('categoryFilter'),search=document.getElementById('searchInput'),family=document.getElementById('familyFilter'),consoleSelect=document.getElementById('platformFilter'),sort=document.getElementById('sortFilter');
    if(!page||!filters||!gallery||!search||!family||!consoleSelect||!sort)return false;
    installBaseStyles();
    if(!document.getElementById('shelfSelector')){
      const selector=document.createElement('div'); selector.id='shelfSelector'; selector.className='shelf-selector reveal'; selector.setAttribute('role','group'); selector.setAttribute('aria-label','Choose collection shelf');
      [['Main Collection','🎮','Main Shelf'],['Display Gallery','🏆','Display Shelf'],['','🏛️','All Games']].forEach(([value,icon,label])=>{
        const b=document.createElement('button'); b.type='button'; b.className='shelf-tab'; b.dataset.shelf=value; b.setAttribute('aria-pressed','false'); b.innerHTML=`<span class="shelf-tab-icon" aria-hidden="true">${icon}</span><span>${label}</span>`; selector.appendChild(b);
      });
      filters.before(selector);
      const buttons=[...selector.querySelectorAll('.shelf-tab')];
      const sync=()=>buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.shelf===gallery.value)));
      buttons.forEach(b=>b.addEventListener('click',()=>{gallery.value=b.dataset.shelf;sync();gallery.dispatchEvent(new Event('input',{bubbles:true}));}));
      gallery.addEventListener('input',sync); gallery.addEventListener('change',sync); document.getElementById('clearFilters')?.addEventListener('click',()=>setTimeout(sync,0)); sync();
    }
    const galleryContainer=gallery.closest('label'); if(galleryContainer&&galleryContainer!==filters)galleryContainer.style.display='none'; else gallery.style.display='none'; gallery.setAttribute('aria-hidden','true');gallery.tabIndex=-1;
    if(!document.getElementById('museumFilterControls')){
      const owner=el=>{const label=el.closest('label');return label&&filters.contains(label)?label:el;};
      const searchOwner=owner(search),row=document.createElement('div'); row.id='museumFilterControls';row.className='museum-filter-controls';
      filters.prepend(searchOwner); row.append(owner(family),owner(consoleSelect),owner(sort)); searchOwner.after(row);
    }
    const paint=(el,familyName,fallback=NEUTRAL)=>{const c=PALETTE[familyName]||fallback;el.style.background=c.background;el.style.borderColor=c.border;el.style.color='#fff';el.style.fontWeight=familyName?'850':'600';};
    const syncColours=()=>{const selectedFamily=family.value||familyOf(consoleSelect.value);paint(family,family.value||selectedFamily,{background:'#0b1926',border:'#294158'});paint(consoleSelect,selectedFamily,{background:'#0b1926',border:'#294158'});paint(sort,'',NEUTRAL);};
    family.addEventListener('input',()=>setTimeout(syncColours,0));family.addEventListener('change',()=>setTimeout(syncColours,0));consoleSelect.addEventListener('input',syncColours);consoleSelect.addEventListener('change',syncColours);syncColours();setTimeout(syncColours,250);
    return true;
  }

  const closeAll=except=>document.querySelectorAll('.museum-custom-select.open').forEach(control=>{if(control===except)return;control.classList.remove('open');control.querySelector('.museum-custom-select-trigger')?.setAttribute('aria-expanded','false');});
  function customSelect(select,kind,familySelect){
    if(!select||select.dataset.museumCustomSelect==='yes')return null;select.dataset.museumCustomSelect='yes';select.style.display='none';select.setAttribute('aria-hidden','true');select.tabIndex=-1;
    const control=document.createElement('div');control.className=`museum-custom-select museum-custom-${kind}`;
    const trigger=document.createElement('button');trigger.type='button';trigger.className='museum-custom-select-trigger';trigger.setAttribute('aria-haspopup','listbox');trigger.setAttribute('aria-expanded','false');
    const valueText=document.createElement('span');valueText.className='museum-custom-select-value';const arrow=document.createElement('span');arrow.className='museum-custom-select-arrow';arrow.textContent='⌄';trigger.append(valueText,arrow);
    const menu=document.createElement('div');menu.className='museum-custom-select-menu';menu.setAttribute('role','listbox');control.append(trigger,menu);select.insertAdjacentElement('afterend',control);
    const optionFamily=option=>kind==='family'?(option.value||''):(option.value?familyOf(option.value):(familySelect?.value||''));
    const triggerFamily=()=>kind==='family'?(select.value||''):(familySelect?.value||familyOf(select.value));
    const paint=(el,fam)=>{const c=coloursFor(fam);el.style.background=c.background;el.style.borderColor=c.border;el.style.color='#fff';};
    const sync=()=>{const selected=select.options[select.selectedIndex]||select.options[0];valueText.textContent=selected?.textContent||(kind==='family'?'All platform families':'All consoles');paint(trigger,triggerFamily());[...menu.querySelectorAll('.museum-custom-option')].forEach(b=>{b.classList.toggle('selected',b.dataset.value===select.value);b.setAttribute('aria-selected',String(b.dataset.value===select.value));});};
    const rebuild=()=>{menu.innerHTML='';[...select.options].forEach(option=>{const b=document.createElement('button');b.type='button';b.className='museum-custom-option';b.dataset.value=option.value;b.setAttribute('role','option');const label=document.createElement('span');label.textContent=option.textContent;const tick=document.createElement('span');tick.className='museum-custom-option-tick';tick.textContent='✓';b.append(label,tick);paint(b,optionFamily(option));b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();select.value=option.value;select.dispatchEvent(new Event('input',{bubbles:true}));select.dispatchEvent(new Event('change',{bubbles:true}));control.classList.remove('open');trigger.setAttribute('aria-expanded','false');setTimeout(sync,0);});menu.appendChild(b);});sync();};
    trigger.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();const opening=!control.classList.contains('open');closeAll(control);control.classList.toggle('open',opening);trigger.setAttribute('aria-expanded',String(opening));if(opening)rebuild();});
    select.addEventListener('input',sync);select.addEventListener('change',sync);new MutationObserver(()=>setTimeout(rebuild,0)).observe(select,{childList:true,subtree:true});rebuild();return{control,rebuild,sync};
  }

  function installCustomPickers(){
    const family=document.getElementById('familyFilter'),consoleSelect=document.getElementById('platformFilter'),row=document.getElementById('museumFilterControls');if(!family||!consoleSelect||!row)return false;
    if(!document.getElementById('museum-custom-select-style')){
      const style=document.createElement('style');style.id='museum-custom-select-style';style.textContent=`
        .museum-custom-select{position:relative;width:100%;min-width:0;z-index:540;overflow:visible}
        .museum-custom-select.open{z-index:1200}
        .museum-custom-select-trigger{width:100%;min-width:0;min-height:48px;border:1px solid #536a80;border-radius:14px;padding:12px 10px;display:flex;align-items:center;justify-content:space-between;gap:7px;text-align:left;font-size:14px;font-weight:850;cursor:pointer;box-shadow:inset 0 0 0 1px rgba(255,255,255,.05)}
        .museum-custom-select-value{display:block;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.museum-custom-select-arrow{font-size:17px;line-height:1;flex:0 0 auto;transition:transform .18s}.museum-custom-select.open .museum-custom-select-arrow{transform:rotate(180deg)}
        .museum-custom-select-menu{display:none;position:absolute!important;z-index:1300!important;top:calc(100% + 7px);left:0;right:0;max-height:min(330px,55vh);overflow:auto;padding:6px;background:#07131f;border:1px solid #334a5f;border-radius:14px;box-shadow:0 22px 55px rgba(0,0,0,.72);-webkit-overflow-scrolling:touch;isolation:isolate}
        .museum-custom-select.open .museum-custom-select-menu{display:block}.museum-custom-option{width:100%;border:1px solid #536a80;border-radius:10px;margin:0 0 6px;padding:11px 10px;display:flex;align-items:center;justify-content:space-between;gap:8px;color:#fff;text-align:left;font-size:13px;font-weight:850;cursor:pointer}.museum-custom-option:last-child{margin-bottom:0}.museum-custom-option-tick{opacity:0;font-weight:950}.museum-custom-option.selected{box-shadow:inset 0 0 0 2px rgba(255,255,255,.45)}.museum-custom-option.selected .museum-custom-option-tick{opacity:1}
        #collection:has(.museum-custom-select.open) .filters,#collection:has(.museum-custom-select.open) .museum-filter-controls{z-index:1100!important}
        #collection:has(.museum-custom-select.open) #collectionGrid{z-index:0!important}
        @media(max-width:620px){.museum-custom-select-trigger{min-height:46px;padding:11px 8px;font-size:13px}.museum-custom-option{font-size:12px;padding:10px 9px}}@media(max-width:390px){.museum-custom-select-trigger{padding:10px 6px;font-size:12px}.museum-custom-option{font-size:11px}}
      `;document.head.appendChild(style);
    }
    const f=customSelect(family,'family',family),c=customSelect(consoleSelect,'console',family);family.addEventListener('input',()=>setTimeout(()=>{f?.sync();c?.rebuild();},0));family.addEventListener('change',()=>setTimeout(()=>{f?.sync();c?.rebuild();},0));document.getElementById('clearFilters')?.addEventListener('click',()=>setTimeout(()=>{f?.sync();c?.rebuild();},10));document.addEventListener('click',()=>closeAll());document.addEventListener('keydown',e=>{if(e.key==='Escape')closeAll();});return true;
  }

  function boot(attempt=0){const layout=setupShelfAndLayout();if(layout)installCustomPickers();if((!layout||!document.getElementById('museum-custom-select-style'))&&attempt<12)setTimeout(()=>boot(attempt+1),90);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(()=>boot(),40));else setTimeout(()=>boot(),40);
  if('serviceWorker'in navigator)addEventListener('load',()=>setTimeout(()=>navigator.serviceWorker.register('./sw-shelf-tabs.js').catch(()=>{}),1200),{once:true});
})();
