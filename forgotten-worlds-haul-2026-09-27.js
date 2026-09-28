// The Game Museum — Forgotten Worlds Stewarton haul, 27 Sep 2026.
// Satisfies three existing wishlist targets and preserves their existing clean Museum cover artwork.
(()=>{
  const PURCHASE={shop:'Forgotten Worlds, Stewarton',date:'2026-09-27'};
  const TARGETS=[
    {id:'GM-FW-20260927-CELTIC',platform:'PlayStation 2',title:'Club Football 2005',series:'Club Football',edition:'Standard',price:10},
    {id:'GM-FW-20260927-GHOSTS360',platform:'Xbox 360',title:'Call of Duty: Ghosts',series:'Call of Duty',edition:'Standard',price:2},
    {id:'GM-FW-20260927-BF4PS3',platform:'PlayStation 3',title:'Battlefield 4',series:'Battlefield',edition:'Standard',price:1}
  ];
  const clean=v=>String(v??'').trim();
  const normal=v=>clean(v).toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();
  const canonical=value=>{
    if(typeof window.MUSEUM_CANONICAL_PLATFORM==='function')return window.MUSEUM_CANONICAL_PLATFORM(value);
    const k=normal(value),map={'ps2':'PlayStation 2','playstation 2':'PlayStation 2','ps3':'PlayStation 3','playstation 3':'PlayStation 3','xbox 360':'Xbox 360'};
    return map[k]||clean(value);
  };
  const same=(item,t)=>item&&canonical(item.platform)===t.platform&&normal(item.title)===normal(t.title);
  function patch(data){
    if(!data||!Array.isArray(data.games)||!Array.isArray(data.wishlist))return false;
    let changed=false;
    for(const t of TARGETS){
      const wish=data.wishlist.find(w=>same(w,t));
      const existing=data.games.find(g=>same(g,t));
      const image=clean(wish?.image)||clean(existing?.image);
      const game=existing||{id:t.id};
      if(!existing){data.games.push(game);changed=true;}
      const desired={
        id:existing?.id||t.id,title:t.title,platform:t.platform,series:t.series,edition:t.edition,
        category:'Main Collection',status:'Owned',display:'No',shelfSection:'Standard Shelf',
        shop:PURCHASE.shop,price:t.price,date:PURCHASE.date
      };
      if(image)desired.image=image;
      const before=JSON.stringify(game);
      Object.assign(game,desired);
      if(JSON.stringify(game)!==before)changed=true;
      if(wish&&normal(wish.status)!=='purchased'){wish.status='Purchased';changed=true;}
    }
    return changed;
  }
  function patchEverywhere(){
    try{if(window.MUSEUM_SEED)patch(window.MUSEUM_SEED);}catch(_){}
    try{
      for(let i=0;i<localStorage.length;i++){
        const key=localStorage.key(i);if(!key||!key.startsWith('theGameMuseumV'))continue;
        const raw=localStorage.getItem(key);if(!raw)continue;
        const data=JSON.parse(raw);if(patch(data))localStorage.setItem(key,JSON.stringify(data));
      }
    }catch(_){}
    try{if(typeof state!=='undefined'&&patch(state)&&typeof save==='function')save();}catch(_){}
  }
  function refresh(){
    patchEverywhere();
    for(const fn of ['collection','wishlist','dashboard','statistics','timeline','platformFilter']){
      try{if(typeof window[fn]==='function')window[fn]();}catch(_){}
    }
  }
  function boot(){refresh();setTimeout(refresh,180);setTimeout(refresh,700);}
  document.getElementById('resetBtn')?.addEventListener('click',()=>setTimeout(boot,180));
  document.getElementById('importFile')?.addEventListener('change',()=>setTimeout(boot,500));
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
  window.MUSEUM_FORGOTTEN_WORLDS_HAUL_20260927=TARGETS;
})();