// The Game Museum — wishlist expansion, 23 Aug 2026.
// Adds the approved Generation Crossover targets and Xbox Saints Row collection targets.
// Exact user-supplied cover files are used unchanged.
(()=>{
  const TARGETS=[
    // Generation Crossover
    {order:'Generation',platform:'PlayStation 1',title:'FIFA 2001',edition:'Standard',type:'Generation Crossover',reason:'PS1 counterpart to the owned PlayStation 2 copy.',status:'Missing',image:'./assets/covers/fifa-2001-ps1.webp'},
    {order:'Generation',platform:'PlayStation 1',title:'FIFA Football 2002',edition:'Standard',type:'Generation Crossover',reason:'PS1 counterpart to the owned PlayStation 2 copy.',status:'Missing',image:'./assets/covers/fifa-football-2002-ps1.webp'},
    {order:'Generation',platform:'PlayStation 1',title:'FIFA Football 2003',edition:'Standard',type:'Generation Crossover',reason:'PS1 counterpart to the owned PlayStation 2 copy.',status:'Missing',image:'./assets/covers/fifa-football-2003-ps1.webp'},
    {order:'Generation',platform:'PlayStation 1',title:'FIFA Football 2004',edition:'Standard',type:'Generation Crossover',reason:'PS1 counterpart to the owned PlayStation 2 copy.',status:'Missing',image:'./assets/covers/fifa-football-2004-ps1.jpeg'},
    {order:'Generation',platform:'PlayStation 1',title:'FIFA Football 2005',edition:'Standard',type:'Generation Crossover',reason:'PS1 counterpart to the owned PlayStation 2 copy.',status:'Missing',image:'./assets/covers/fifa-football-2005-ps1.jpeg'},
    {order:'Generation',platform:'PlayStation 2',title:'Ferrari Challenge: Trofeo Pirelli',edition:'Standard',type:'Generation Crossover',reason:'PS2 counterpart to the owned PlayStation 3 copy.',status:'Missing',image:'./assets/covers/ferrari-challenge-trofeo-pirelli-ps2.webp'},
    {order:'Generation',platform:'PlayStation 3',title:'Grand Theft Auto: San Andreas',edition:'Standard',type:'Generation Crossover',reason:'PS3 counterpart to the owned PlayStation 2 copy.',status:'Missing',image:'./assets/covers/grand-theft-auto-san-andreas-ps3.jpeg'},
    {order:'Generation',platform:'PlayStation 3',title:'FIFA 15',edition:'Standard',type:'Generation Crossover',reason:'PS3 counterpart to the owned PlayStation 4 copy.',status:'Missing',image:'./assets/covers/fifa-15-ps3.webp'},
    {order:'Generation',platform:'PlayStation 3',title:'FIFA 16',edition:'Standard',type:'Generation Crossover',reason:'PS3 counterpart to the owned PlayStation 4 copy.',status:'Missing',image:'./assets/covers/fifa-16-ps3.webp'},
    {order:'Generation',platform:'PlayStation 3',title:'FIFA 17',edition:'Standard',type:'Generation Crossover',reason:'PS3 counterpart to the owned PlayStation 4 copy.',status:'Missing',image:'./assets/covers/fifa-17-ps3.webp'},
    {order:'Generation',platform:'PlayStation 3',title:'FIFA 18',edition:'Legacy Edition',type:'Generation Crossover',reason:'PS3 Legacy Edition counterpart to the later-generation FIFA collection.',status:'Missing',image:'./assets/covers/fifa-18-legacy-edition-ps3.jpeg',aliases:['FIFA 18 Legacy Edition']},
    {order:'Generation',platform:'PlayStation 3',title:'FIFA 19',edition:'Legacy Edition',type:'Generation Crossover',reason:'PS3 Legacy Edition counterpart to the later-generation FIFA collection.',status:'Missing',image:'./assets/covers/fifa-19-legacy-edition-ps3.webp',aliases:['FIFA 19 Legacy Edition']},
    {order:'Generation',platform:'PlayStation 3',title:'Madden NFL 17',edition:'Standard',type:'Generation Crossover',reason:'PS3 counterpart to the owned PlayStation 4 copy.',status:'Missing',image:'./assets/covers/madden-nfl-17-ps3.jpeg'},
    {order:'Generation',platform:'PlayStation 4',title:'FIFA 22',edition:'Standard',type:'Generation Crossover',reason:'PS4 counterpart to the owned PlayStation 5 copy.',status:'Missing',image:'./assets/covers/fifa-22-ps4.webp'},
    {order:'Generation',platform:'PlayStation 4',title:'FIFA 23',edition:'Standard',type:'Generation Crossover',reason:'PS4 counterpart to the owned PlayStation 5 copy.',status:'Missing',image:'./assets/covers/fifa-23-ps4.webp'},
    {order:'Generation',platform:'PlayStation 4',title:'Bus Simulator 21',edition:'Gold Edition',type:'Generation Crossover',reason:'PS4 Gold Edition counterpart to the owned PlayStation 5 Gold Edition copy.',status:'Missing',image:'./assets/covers/bus-simulator-21-gold-edition-ps4.jpeg',aliases:['Bus Simulator 21 Gold Edition']},
    {order:'Generation',platform:'PlayStation 4',title:'Red Dead Redemption',edition:'Standard',type:'Generation Crossover',reason:'PS4 counterpart to the owned PlayStation 3 copy.',status:'Missing',image:'./assets/covers/red-dead-redemption-ps4.webp'},
    {order:'Generation',platform:'PlayStation 5',title:'Red Dead Redemption',edition:'Standard',type:'Generation Crossover',reason:'PS5 counterpart to the owned PlayStation 3 copy.',status:'Missing',image:'./assets/covers/red-dead-redemption-ps5.jpeg'},
    {order:'Generation',platform:'Xbox Original',title:'Call of Duty 3',edition:'Standard',type:'Generation Crossover',reason:'Original Xbox counterpart to the owned Xbox 360 copy.',status:'Missing',image:'./assets/covers/call-of-duty-3-xbox-original.webp'},
    {order:'Generation',platform:'Xbox Original',title:'Need for Speed: Most Wanted (2005)',edition:'Standard',type:'Generation Crossover',reason:'Original Xbox counterpart to the owned Xbox 360 copy.',status:'Missing',image:'./assets/covers/need-for-speed-most-wanted-2005-xbox-original.jpeg'},
    {order:'Generation',platform:'Xbox 360',title:'Madden NFL 17',edition:'Standard',type:'Generation Crossover',reason:'Xbox 360 counterpart to the owned Xbox One copy.',status:'Missing',image:'./assets/covers/madden-nfl-17-xbox-360.jpeg'},
    {order:'Generation',platform:'Xbox One',title:'L.A. Noire',edition:'Standard',type:'Generation Crossover',reason:'Xbox One counterpart to the owned Xbox 360 copy.',status:'Missing',image:'./assets/covers/la-noire-xbox-one.jpeg'},
    {order:'Generation',platform:'Xbox One',title:'Minecraft: Xbox One Edition',edition:'Standard',type:'Generation Crossover',reason:'Xbox One counterpart to the owned Minecraft: Xbox 360 Edition copy.',status:'Missing',image:'./assets/covers/minecraft-xbox-one-edition-xbox-one.webp'},

    // Complete physical Xbox Saints Row collection. Saints Row IV Standard Edition on Xbox 360
    // already exists as a Shelf Completion target and is intentionally not duplicated here.
    {order:'Collection',platform:'Xbox 360',title:'Saints Row',edition:'Standard',type:'Saints Row Collection',reason:'Required for the complete physical Saints Row collection on Xbox.',status:'Missing',image:'./assets/covers/saints-row-xbox-360.webp'},
    {order:'Collection',platform:'Xbox 360',title:'Saints Row 2',edition:'Standard',type:'Saints Row Collection',reason:'Required for the complete physical Saints Row collection on Xbox.',status:'Missing',image:'./assets/covers/saints-row-2-xbox-360.webp'},
    {order:'Collection',platform:'Xbox 360',title:'Saints Row: The Third',edition:'Standard',type:'Saints Row Collection',reason:'Required for the complete physical Saints Row collection on Xbox.',status:'Missing',image:'./assets/covers/saints-row-the-third-xbox-360.jpeg'},
    {order:'Collection',platform:'Xbox 360',title:'Saints Row: Gat out of Hell',edition:'Standard',type:'Saints Row Collection',reason:'Required for the complete physical Saints Row collection on Xbox.',status:'Missing',image:'./assets/covers/saints-row-gat-out-of-hell-xbox-360.jpeg'},
    {order:'Collection',platform:'Xbox One',title:'Saints Row IV: Re-Elected & Gat out of Hell',edition:'Bundle',type:'Saints Row Collection',reason:'UK physical Xbox One release containing Re-Elected and Gat out of Hell; required for the complete physical Saints Row collection on Xbox.',status:'Missing',image:'./assets/covers/saints-row-iv-re-elected-and-gat-out-of-hell-xbox-one.webp',aliases:['Saints Row IV Re-Elected & Gat out of Hell','Saints Row IV: Re-Elected and Gat out of Hell']},
    {order:'Collection',platform:'Xbox One',title:'Saints Row: The Third Remastered',edition:'Standard',type:'Saints Row Collection',reason:'Required for the complete physical Saints Row collection on Xbox. Remaster is tracked as a collection target, not as a Generation Crossover.',status:'Missing',image:'./assets/covers/saints-row-the-third-remastered-xbox-one.webp'},
    {order:'Collection',platform:'Xbox Cross Generation',title:'Saints Row (2022)',edition:'Standard',type:'Saints Row Collection',reason:'Xbox One / Series X|S physical cross-generation release required for the complete physical Saints Row collection on Xbox.',status:'Missing',image:'./assets/covers/saints-row-2022-xbox-cross-generation.webp',aliases:['Saints Row']}
  ];

  const clean=v=>String(v??'').trim();
  const normal=v=>clean(v).toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,' ').replace(/\b(standard|legacy|gold) edition\b/g,' ').replace(/\s+/g,' ').trim();
  const canonicalPlatform=value=>{
    if(typeof window.MUSEUM_CANONICAL_PLATFORM==='function')return window.MUSEUM_CANONICAL_PLATFORM(value);
    const key=clean(value).toLowerCase();
    const map={
      'ps1':'PlayStation 1','playstation':'PlayStation 1','playstation 1':'PlayStation 1',
      'ps2':'PlayStation 2','playstation 2':'PlayStation 2',
      'ps3':'PlayStation 3','playstation 3':'PlayStation 3',
      'ps4':'PlayStation 4','playstation 4':'PlayStation 4',
      'ps5':'PlayStation 5','playstation 5':'PlayStation 5',
      'xbox':'Xbox Original','xbox original':'Xbox Original',
      'xbox 360':'Xbox 360','xbox one':'Xbox One',
      'xbox cross generation':'Xbox Cross Generation','xbox cross-generation':'Xbox Cross Generation'
    };
    return map[key]||clean(value);
  };
  const namesFor=t=>[t.title,...(t.aliases||[])].map(normal);
  const matches=(item,target)=>item&&canonicalPlatform(item.platform)===target.platform&&namesFor(target).includes(normal(item.title));

  function patch(data){
    if(!data||typeof data!=='object')return false;
    if(!Array.isArray(data.wishlist))data.wishlist=[];
    let changed=false;

    TARGETS.forEach(target=>{
      const found=data.wishlist.filter(item=>matches(item,target));
      const item=found[0]||{};
      if(!found.length){data.wishlist.push(item);changed=true;}

      const desired={
        order:target.order,
        platform:target.platform,
        title:target.title,
        edition:target.edition,
        type:target.type,
        reason:target.reason,
        status:target.status,
        image:target.image
      };
      const before=JSON.stringify(item);
      Object.assign(item,desired);
      if(JSON.stringify(item)!==before)changed=true;

      if(found.length>1){
        const duplicates=new Set(found.slice(1));
        const beforeLength=data.wishlist.length;
        data.wishlist=data.wishlist.filter(entry=>!duplicates.has(entry));
        if(data.wishlist.length!==beforeLength)changed=true;
      }
    });

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
      keys.forEach(key=>{
        try{
          const raw=localStorage.getItem(key);
          if(!raw)return;
          const data=JSON.parse(raw);
          if(patch(data))localStorage.setItem(key,JSON.stringify(data));
        }catch(_){}
      });
    }catch(_){}
    try{if(typeof state!=='undefined'&&patch(state)&&typeof save==='function')save();}catch(_){}
  }

  function refresh(){
    patchEverywhere();
    for(const fn of ['wishlist','dashboard']){
      try{if(typeof window[fn]==='function')window[fn]();}catch(_){}
    }
  }

  function boot(){
    refresh();
    setTimeout(refresh,180);
    setTimeout(refresh,700);
  }

  document.getElementById('resetBtn')?.addEventListener('click',()=>setTimeout(boot,180));
  document.getElementById('importFile')?.addEventListener('change',()=>setTimeout(boot,500));
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
  window.MUSEUM_WISHLIST_EXPANSION_20260823=TARGETS;
})();
