// The Game Museum — Family Guy: Video Game! PS2 acquisition, 20 Aug 2026.
// Exact supplied cover = Museum artwork. Physical-copy photo + receipt = archive evidence.
(()=>{
  const RECORD={
    id:'GM-PS2-FAMILY-GUY',
    title:'Family Guy: Video Game!',
    platform:'PlayStation 2',
    edition:'Standard',
    category:'Main Collection',
    series:'Family Guy',
    status:'Owned',
    display:'No',
    shelfSection:'Standard Shelf',
    image:'./assets/covers/family-guy-video-game-ps2.jpeg',
    archiveImage:'./assets/archive/family-guy-video-game-ps2-original.jpeg',
    receiptImage:'./assets/archive/family-guy-video-game-ps2-cex-receipt-2026-08-20.jpeg',
    shop:'CEX Glasgow Forge',
    price:18.00,
    date:'2026-08-20',
    notes:'Bought from CEX Glasgow Forge for £18.00 on 20 August 2026. Receipt supplied as purchase evidence. Exact user-supplied cover used for the Museum display without alteration; physical-copy photograph preserved in the archive.'
  };
  const ASSETS=[RECORD.image,RECORD.archiveImage,RECORD.receiptImage];
  const normal=value=>String(value||'').toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,' ').trim();
  const aliases=new Set(['family guy video game','family guy the game']);
  const isMatch=game=>game&&normal(game.platform)==='playstation 2'&&(String(game.id||'')===RECORD.id||aliases.has(normal(game.title)));

  function patch(data){
    if(!data||typeof data!=='object')return false;
    data.games ||= [];
    const matches=data.games.filter(isMatch);
    let game=matches[0],changed=false;
    if(!game){game={};data.games.push(game);changed=true;}
    const before=JSON.stringify(game);
    Object.assign(game,RECORD);
    if(before!==JSON.stringify(game))changed=true;
    if(matches.length>1){
      const duplicates=new Set(matches.slice(1));
      const oldLength=data.games.length;
      data.games=data.games.filter(item=>!duplicates.has(item));
      if(data.games.length!==oldLength)changed=true;
    }
    return changed;
  }

  function patchEverywhere(){
    try{if(window.MUSEUM_SEED)patch(window.MUSEUM_SEED);}catch(_){}
    try{
      const keys=[];
      for(let i=0;i<localStorage.length;i++){
        const key=localStorage.key(i);
        if(key&&key.startsWith('theGameMuseumV'))keys.push(key);
      }
      for(const key of keys){
        const raw=localStorage.getItem(key);if(!raw)continue;
        const data=JSON.parse(raw);
        if(patch(data))localStorage.setItem(key,JSON.stringify(data));
      }
    }catch(_){}
    try{if(typeof state!=='undefined'&&patch(state)&&typeof save==='function')save();}catch(_){}
  }

  function refresh(){
    patchEverywhere();
    for(const fn of ['dashboard','collection','statistics','timeline','wishlist']){
      try{if(typeof window[fn]==='function')window[fn]();}catch(_){}
    }
    try{document.getElementById('platformFilter')?.dispatchEvent(new Event('change',{bubbles:true}));}catch(_){}
  }

  const ready=src=>new Promise(resolve=>{
    const image=new Image();
    image.onload=()=>resolve(true);
    image.onerror=()=>resolve(false);
    image.src=`${src}?familyGuyPS2=1`;
  });

  async function boot(){
    if(!(await Promise.all(ASSETS.map(ready))).every(Boolean))return;
    refresh();
    setTimeout(refresh,180);
    setTimeout(refresh,700);
  }

  document.getElementById('resetBtn')?.addEventListener('click',()=>setTimeout(boot,180));
  document.getElementById('importFile')?.addEventListener('change',()=>setTimeout(boot,450));
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();

  window.MUSEUM_FAMILY_GUY_PS2_RECORD=RECORD;
})();