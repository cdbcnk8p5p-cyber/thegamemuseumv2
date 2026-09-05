// The Game Museum — CEX Glasgow Forge haul, 5 September 2026.
// Existing user-supplied wishlist covers become Museum display art; supplied physical-copy photos + receipt are archive evidence.
(()=>{
  const RECEIPT='./assets/archive/cex-glasgow-forge-haul-receipt-2026-09-05.jpeg';
  const RECORDS=[
    {
      id:'GM-0025',title:'Call of Duty: Ghosts',platform:'Xbox One',edition:'Standard',category:'Main Collection',series:'Call of Duty',status:'Owned',display:'No',shelfSection:'Standard Shelf',
      image:'./assets/covers/call-of-duty-ghosts-standard-xbox-one.jpg',archiveImage:'./assets/archive/call-of-duty-ghosts-xbox-one-2026-09-05.jpeg',receiptImage:RECEIPT,
      shop:'CEX Glasgow Forge',price:6.00,date:'2026-09-05',
      notes:'Bought from CEX Glasgow Forge for £6.00 on 5 September 2026. The case sticker showed £8.00, but the receipt confirms the actual purchase price was £6.00. This Standard Edition is the current owned Xbox One copy; the previously owned Limited Edition had been sold and is not part of the collection or Display Shelf. Existing user-supplied Standard Edition wishlist cover reused as the Museum display artwork; physical-copy photograph and receipt preserved as archive evidence.'
    },
    {
      id:'GM-PS4-FIFA21-2026-09-05',title:'FIFA 21',platform:'PlayStation 4',edition:'Standard',category:'Main Collection',series:'FIFA / EA Sports FC',status:'Owned',display:'No',shelfSection:'Standard Shelf',
      image:'./assets/covers/fifa-21-ps4.webp',archiveImage:'./assets/archive/fifa-21-ps4-2026-09-05.jpeg',receiptImage:RECEIPT,
      shop:'CEX Glasgow Forge',price:3.00,date:'2026-09-05',
      notes:'Bought from CEX Glasgow Forge for £3.00 on 5 September 2026. Existing user-supplied wishlist cover reused as the Museum display artwork; physical-copy photograph and receipt preserved as archive evidence. This purchase completes the PlayStation 4 Generation Crossover target.'
    },
    {
      id:'GM-PS2-SIMPSONS-GAME-2026-09-05',title:'The Simpsons Game',platform:'PlayStation 2',edition:'Standard',category:'Main Collection',series:'The Simpsons',status:'Owned',display:'No',shelfSection:'Standard Shelf',
      image:'./assets/covers/the-simpsons-game-ps2.jpg',archiveImage:'./assets/archive/the-simpsons-game-ps2-2026-09-05.jpeg',receiptImage:RECEIPT,
      shop:'CEX Glasgow Forge',price:12.00,date:'2026-09-05',
      notes:'Bought from CEX Glasgow Forge for £12.00 on 5 September 2026. Existing user-supplied wishlist cover reused as the Museum display artwork; physical-copy photograph and receipt preserved as archive evidence. This single purchase completes both the Generation Crossover and Simpsons Collection wishlist memberships for the PlayStation 2 target.'
    },
    {
      id:'GM-PS2-CLUB-FOOTBALL-LIVERPOOL-2026-09-05',title:'Club Football: Liverpool',platform:'PlayStation 2',edition:'Standard',category:'Main Collection',series:'Club Football',status:'Owned',display:'No',shelfSection:'Standard Shelf',
      image:'./assets/covers/club-football-liverpool-ps2.jpeg',archiveImage:'./assets/archive/club-football-liverpool-ps2-2026-09-05.jpeg',receiptImage:RECEIPT,
      shop:'CEX Glasgow Forge',price:2.50,date:'2026-09-05',
      notes:'Bought from CEX Glasgow Forge for £2.50 on 5 September 2026. Exact user-supplied clean cover used for the Museum display without alteration; physical-copy photograph and receipt preserved as archive evidence.'
    }
  ];

  const clean=v=>String(v??'').trim();
  const normal=v=>clean(v).toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();
  const canonicalPlatform=v=>{
    if(typeof window.MUSEUM_CANONICAL_PLATFORM==='function')return window.MUSEUM_CANONICAL_PLATFORM(v);
    const key=normal(v);
    const map={
      'ps2':'PlayStation 2','playstation 2':'PlayStation 2',
      'ps4':'PlayStation 4','playstation 4':'PlayStation 4',
      'xbox one':'Xbox One'
    };
    return map[key]||clean(v);
  };

  const sameGame=(game,record)=>game&&canonicalPlatform(game.platform)===record.platform&&normal(game.title)===normal(record.title);
  const isGhostsXboxOne=game=>game&&canonicalPlatform(game.platform)==='Xbox One'&&normal(game.title)==='call of duty ghosts';
  const wishlistTargets=[
    {platform:'PlayStation 4',titles:['FIFA 21']},
    {platform:'Xbox One',titles:['Call of Duty: Ghosts','Call of Duty: Ghosts Standard Edition']},
    {platform:'PlayStation 2',titles:['The Simpsons Game']}
  ];
  const isCompletedWish=item=>wishlistTargets.some(target=>canonicalPlatform(item?.platform)===target.platform&&target.titles.some(title=>normal(item?.title)===normal(title)));

  function patch(data){
    if(!data||typeof data!=='object')return false;
    data.games ||= [];
    data.wishlist ||= [];
    let changed=false;

    // The sold Ghosts Limited Edition must not survive in any gallery. Keep one canonical Standard record only.
    const ghosts=data.games.filter(isGhostsXboxOne);
    if(ghosts.length){
      const canonical=ghosts.find(game=>String(game.id||'')==='GM-0025')||ghosts.find(game=>normal(game.edition)==='standard')||ghosts[0];
      const stale=new Set(ghosts.filter(game=>game!==canonical));
      if(stale.size){data.games=data.games.filter(game=>!stale.has(game));changed=true;}
    }

    for(const record of RECORDS){
      let matches=data.games.filter(game=>String(game?.id||'')===record.id||sameGame(game,record));
      let game=matches.find(game=>String(game.id||'')===record.id)||matches[0];
      if(!game){game={};data.games.push(game);changed=true;}
      const before=JSON.stringify(game);
      Object.assign(game,record);
      if(before!==JSON.stringify(game))changed=true;
      matches=data.games.filter(candidate=>candidate!==game&&(String(candidate?.id||'')===record.id||sameGame(candidate,record)));
      if(matches.length){const dup=new Set(matches);data.games=data.games.filter(candidate=>!dup.has(candidate));changed=true;}
    }

    const beforeWishlist=data.wishlist.length;
    data.wishlist=data.wishlist.filter(item=>!isCompletedWish(item));
    if(data.wishlist.length!==beforeWishlist)changed=true;
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
    for(const fn of ['dashboard','collection','wishlist','statistics','timeline']){
      try{if(typeof window[fn]==='function')window[fn]();}catch(_){}
    }
    try{document.getElementById('platformFilter')?.dispatchEvent(new Event('change',{bubbles:true}));}catch(_){}
    try{document.getElementById('wishPriority')?.dispatchEvent(new Event('change',{bubbles:true}));}catch(_){}
  }

  const ASSETS=[RECEIPT,...RECORDS.flatMap(record=>[record.image,record.archiveImage])];
  const ready=src=>new Promise(resolve=>{
    const image=new Image();
    image.onload=()=>resolve(true);
    image.onerror=()=>resolve(false);
    image.src=`${src}?haul20260905=1`;
  });

  async function boot(){
    if(!(await Promise.all(ASSETS.map(ready))).every(Boolean))return;
    refresh();
    // The older Ghosts compatibility correction can still fire during initial boot; these later passes make today's acquisition authoritative.
    setTimeout(refresh,450);
    setTimeout(refresh,900);
    setTimeout(refresh,1500);
  }

  document.getElementById('resetBtn')?.addEventListener('click',()=>{setTimeout(boot,650);setTimeout(refresh,1400);});
  document.getElementById('importFile')?.addEventListener('change',()=>{setTimeout(boot,950);setTimeout(refresh,1700);});
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});
  else boot();

  window.MUSEUM_HAUL_2026_09_05={records:RECORDS,patch};
})();
