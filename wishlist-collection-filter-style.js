// Wishlist filters — mirror the Collection's custom colour-coded dropdown treatment.
// Styling only: wishlist data, targets, covers and collection behaviour are untouched.
(()=>{
  const PALETTE={
    Nintendo:{background:'#d71920',border:'#ff565b'},
    PlayStation:{background:'#0758c7',border:'#3d8cff'},
    Sega:{background:'#111111',border:'#4c5965'},
    Xbox:{background:'#16811e',border:'#4dbb54'}
  };
  const TYPE_PALETTE={
    'Priority Acquisition':{background:'#b85d0b',border:'#e99834'},
    'Shelf Completion':{background:'#9b7414',border:'#d7aa38'},
    'Generation Crossover':{background:'#087f9f',border:'#37bdd8'},
    'Simpsons Collection':{background:'#ffd90f',border:'#fff36a',text:'#17202a'},
    'Saints Row Collection':{background:'#6b3aa8',border:'#9a63d4'},
    'Lower Priority':{background:'#84e600',border:'#b7ff53',text:'#17202a'}
  };
  const NEUTRAL={background:'#24384b',border:'#536a80'};
  const clean=v=>String(v??'').trim();
  const canonical=v=>typeof window.MUSEUM_CANONICAL_PLATFORM==='function'?window.MUSEUM_CANONICAL_PLATFORM(v):clean(v);
  const familyOf=value=>{
    const p=canonical(value).toLowerCase();
    if(p.includes('nintendo'))return'Nintendo';
    if(p.includes('playstation'))return'PlayStation';
    if(p.includes('sega'))return'Sega';
    if(p.includes('xbox'))return'Xbox';
    return'';
  };
  const coloursFor=family=>PALETTE[family]||NEUTRAL;
  const typeColoursFor=value=>TYPE_PALETTE[clean(value)]||NEUTRAL;
  const closeAll=except=>document.querySelectorAll('#wishlist .wishlist-museum-select.open').forEach(control=>{
    if(control===except)return;
    control.classList.remove('open');
    control.querySelector('.museum-custom-select-trigger')?.setAttribute('aria-expanded','false');
  });

  function ensureStyles(){
    if(document.getElementById('wishlist-collection-filter-style'))return;
    const style=document.createElement('style');
    style.id='wishlist-collection-filter-style';
    style.textContent=`
      #wishlist .wishlist-filter-shelf{position:relative!important;overflow:visible!important;z-index:510!important}
      #wishlist .wishlist-filter-control{position:relative;overflow:visible}
      #wishlist .wishlist-museum-select{position:relative;width:100%;min-width:0;z-index:540;overflow:visible}
      #wishlist .wishlist-museum-select.open{z-index:1200}
      #wishlist .wishlist-museum-select .museum-custom-select-trigger{width:100%;min-width:0;min-height:48px;border:1px solid #536a80;border-radius:14px;padding:12px 10px;display:flex;align-items:center;justify-content:space-between;gap:7px;text-align:left;font-size:14px;font-weight:850;cursor:pointer;box-shadow:inset 0 0 0 1px rgba(255,255,255,.05)}
      #wishlist .wishlist-museum-select .museum-custom-select-value{display:block;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
      #wishlist .wishlist-museum-select .museum-custom-select-arrow{font-size:17px;line-height:1;flex:0 0 auto;transition:transform .18s}
      #wishlist .wishlist-museum-select.open .museum-custom-select-arrow{transform:rotate(180deg)}
      #wishlist .wishlist-museum-select .museum-custom-select-menu{display:none;position:absolute!important;z-index:1300!important;top:calc(100% + 7px);left:0;right:0;max-height:min(330px,55vh);overflow:auto;padding:6px;background:#07131f;border:1px solid #334a5f;border-radius:14px;box-shadow:0 22px 55px rgba(0,0,0,.72);-webkit-overflow-scrolling:touch;isolation:isolate}
      #wishlist .wishlist-museum-select.open .museum-custom-select-menu{display:block}
      #wishlist .wishlist-museum-select .museum-custom-option{width:100%;border:1px solid #536a80;border-radius:10px;margin:0 0 6px;padding:11px 10px;display:flex;align-items:center;justify-content:space-between;gap:8px;color:#fff;text-align:left;font-size:13px;font-weight:850;cursor:pointer}
      #wishlist .wishlist-museum-select .museum-custom-option:last-child{margin-bottom:0}
      #wishlist .wishlist-museum-select .museum-custom-option-tick{opacity:0;font-weight:950}
      #wishlist .wishlist-museum-select .museum-custom-option.selected{box-shadow:inset 0 0 0 2px rgba(255,255,255,.45)}
      #wishlist .wishlist-museum-select .museum-custom-option.selected .museum-custom-option-tick{opacity:1}
      #wishlist:has(.wishlist-museum-select.open) .wishlist-filter-shelf{z-index:1100!important}
      #wishlist:has(.wishlist-museum-select.open) #wishlistGroups{position:relative;z-index:0!important}
      @media(max-width:620px){
        #wishlist .wishlist-museum-select .museum-custom-select-trigger{min-height:46px;padding:11px 8px;font-size:13px}
        #wishlist .wishlist-museum-select .museum-custom-option{font-size:12px;padding:10px 9px}
      }
      @media(max-width:390px){
        #wishlist .wishlist-museum-select .museum-custom-select-trigger{padding:10px 6px;font-size:12px}
        #wishlist .wishlist-museum-select .museum-custom-option{font-size:11px}
      }
    `;
    document.head.appendChild(style);
  }

  function makePicker(select,kind,familySelect){
    if(!select||select.dataset.wishlistMuseumSelect==='yes')return null;
    select.dataset.wishlistMuseumSelect='yes';
    select.style.display='none';
    select.setAttribute('aria-hidden','true');
    select.tabIndex=-1;

    const control=document.createElement('div');
    control.className=`wishlist-museum-select wishlist-museum-${kind}`;
    const trigger=document.createElement('button');
    trigger.type='button';
    trigger.className='museum-custom-select-trigger';
    trigger.setAttribute('aria-haspopup','listbox');
    trigger.setAttribute('aria-expanded','false');
    const valueText=document.createElement('span');
    valueText.className='museum-custom-select-value';
    const arrow=document.createElement('span');
    arrow.className='museum-custom-select-arrow';
    arrow.textContent='⌄';
    trigger.append(valueText,arrow);
    const menu=document.createElement('div');
    menu.className='museum-custom-select-menu';
    menu.setAttribute('role','listbox');
    control.append(trigger,menu);
    select.insertAdjacentElement('afterend',control);

    const coloursForOption=option=>{
      if(kind==='family')return coloursFor(option.value||'');
      if(kind==='console')return coloursFor(option.value?familyOf(option.value):(familySelect?.value||''));
      if(kind==='type')return typeColoursFor(option.value);
      return NEUTRAL;
    };
    const triggerColours=()=>{
      if(kind==='family')return coloursFor(select.value||'');
      if(kind==='console')return coloursFor(familySelect?.value||familyOf(select.value));
      if(kind==='type')return typeColoursFor(select.value);
      return NEUTRAL;
    };
    const paint=(el,colours)=>{
      const c=colours||NEUTRAL;
      el.style.background=c.background;
      el.style.borderColor=c.border;
      el.style.color=c.text||'#fff';
    };
    const sync=()=>{
      const selected=select.options[select.selectedIndex]||select.options[0];
      valueText.textContent=selected?.textContent||'';
      paint(trigger,triggerColours());
      [...menu.querySelectorAll('.museum-custom-option')].forEach(button=>{
        const chosen=button.dataset.value===select.value;
        button.classList.toggle('selected',chosen);
        button.setAttribute('aria-selected',String(chosen));
      });
      trigger.disabled=select.disabled;
      control.style.opacity=select.disabled?'.55':'1';
    };
    const rebuild=()=>{
      menu.innerHTML='';
      [...select.options].forEach(option=>{
        const button=document.createElement('button');
        button.type='button';
        button.className='museum-custom-option';
        button.dataset.value=option.value;
        button.setAttribute('role','option');
        const label=document.createElement('span');
        label.textContent=option.textContent;
        const tick=document.createElement('span');
        tick.className='museum-custom-option-tick';
        tick.textContent='✓';
        button.append(label,tick);
        paint(button,coloursForOption(option));
        button.addEventListener('click',event=>{
          event.preventDefault();
          event.stopPropagation();
          select.value=option.value;
          select.dispatchEvent(new Event('input',{bubbles:true}));
          select.dispatchEvent(new Event('change',{bubbles:true}));
          control.classList.remove('open');
          trigger.setAttribute('aria-expanded','false');
          setTimeout(sync,0);
        });
        menu.appendChild(button);
      });
      sync();
    };
    trigger.addEventListener('click',event=>{
      event.preventDefault();
      event.stopPropagation();
      if(select.disabled)return;
      const opening=!control.classList.contains('open');
      closeAll(control);
      control.classList.toggle('open',opening);
      trigger.setAttribute('aria-expanded',String(opening));
      if(opening)rebuild();
    });
    select.addEventListener('input',sync);
    select.addEventListener('change',sync);
    new MutationObserver(()=>setTimeout(rebuild,0)).observe(select,{childList:true,subtree:true,attributes:true,attributeFilter:['disabled']});
    rebuild();
    return{control,rebuild,sync};
  }

  function setup(attempt=0){
    const family=document.getElementById('wishFamilyFilter');
    const consoleSelect=document.getElementById('wishConsoleFilter');
    const type=document.getElementById('wishPriority');
    if(!family||!consoleSelect||!type){if(attempt<12)setTimeout(()=>setup(attempt+1),90);return;}
    ensureStyles();
    const familyPicker=makePicker(family,'family',family);
    const consolePicker=makePicker(consoleSelect,'console',family);
    const typePicker=makePicker(type,'type',family);
    const resync=()=>setTimeout(()=>{familyPicker?.sync();consolePicker?.rebuild();typePicker?.rebuild();},0);
    family.addEventListener('input',resync);
    family.addEventListener('change',resync);
    document.getElementById('wishClearFilters')?.addEventListener('click',()=>setTimeout(resync,10));
    document.addEventListener('click',()=>closeAll());
    document.addEventListener('keydown',event=>{if(event.key==='Escape')closeAll();});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(()=>setup(),100),{once:true});
  else setTimeout(()=>setup(),100);
})();
