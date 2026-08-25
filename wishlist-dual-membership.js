// The Game Museum — dual wishlist membership for The Simpsons Game on PlayStation 2.
// Keeps one physical target/count while allowing it to appear in both Generation Crossover and Simpsons Collection filters.
(() => {
  const clean=value=>String(value??'').trim();
  const normal=value=>clean(value).toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();
  const canonicalPlatform=value=>{
    if(typeof window.MUSEUM_CANONICAL_PLATFORM==='function')return window.MUSEUM_CANONICAL_PLATFORM(value);
    const key=normal(value);
    if(key==='ps2'||key==='playstation 2')return'PlayStation 2';
    return clean(value);
  };
  const isTarget=item=>item&&canonicalPlatform(item.platform)==='PlayStation 2'&&normal(item.title)==='the simpsons game';
  const desiredTypes=['Generation Crossover','Simpsons Collection'];

  function apply(data){
    if(!data||!Array.isArray(data.wishlist))return false;
    const item=data.wishlist.find(isTarget);
    if(!item)return false;
    const before=JSON.stringify(item);
    const existing=Array.isArray(item.types)?item.types:[];
    item.types=[...new Set([...existing,...desiredTypes].map(clean).filter(Boolean))];
    if(!item.type)item.type='Generation Crossover';
    return JSON.stringify(item)!==before;
  }

  function patchEverywhere(){
    try{if(window.MUSEUM_SEED)apply(window.MUSEUM_SEED);}catch(_){}
    try{
      for(let i=0;i<localStorage.length;i++){
        const key=localStorage.key(i);
        if(!key||!key.startsWith('theGameMuseumV'))continue;
        const raw=localStorage.getItem(key);
        if(!raw)continue;
        const data=JSON.parse(raw);
        if(apply(data))localStorage.setItem(key,JSON.stringify(data));
      }
    }catch(_){}
    try{if(typeof state!=='undefined'&&apply(state)&&typeof save==='function')save();}catch(_){}
  }

  function refresh(){
    patchEverywhere();
    try{if(typeof wishlist==='function')wishlist();}catch(_){}
    try{if(typeof dashboard==='function')dashboard();}catch(_){}
  }

  document.getElementById('resetBtn')?.addEventListener('click',()=>setTimeout(refresh,180));
  document.getElementById('importFile')?.addEventListener('change',()=>setTimeout(refresh,500));
  refresh();
  window.MUSEUM_WISHLIST_DUAL_MEMBERSHIP={apply,isTarget,desiredTypes:[...desiredTypes]};
})();
