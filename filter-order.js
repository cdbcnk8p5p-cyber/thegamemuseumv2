// Collection filter ordering + data-integrity safety layer.
// This file loads before app.js, so repair persisted Museum data immediately.
(() => {
  const aliases = new Map([
    ['ds','Nintendo DS'],['nintendo ds','Nintendo DS'],
    ['switch','Nintendo Switch'],['nintendo switch','Nintendo Switch'],
    ['wii','Nintendo Wii'],['nintendo wii','Nintendo Wii'],
    ['mega drive','Sega Mega Drive'],['sega mega drive','Sega Mega Drive'],
    ['ps1','PlayStation 1'],['playstation','PlayStation 1'],['playstation 1','PlayStation 1'],
    ['ps2','PlayStation 2'],['playstation 2','PlayStation 2'],
    ['ps3','PlayStation 3'],['playstation 3','PlayStation 3'],
    ['ps4','PlayStation 4'],['playstation 4','PlayStation 4'],
    ['ps5','PlayStation 5'],['playstation 5','PlayStation 5'],
    ['psp','PlayStation Portable'],['playstation portable','PlayStation Portable'],
    ['ps vita','PlayStation Vita'],['psvita','PlayStation Vita'],['playstation vita','PlayStation Vita'],
    ['xbox','Xbox Original'],['original xbox','Xbox Original'],['xbox original','Xbox Original'],
    ['xbox 360','Xbox 360'],['xbox one','Xbox One'],
    ['xbox series x','Xbox Series X/S'],['xbox series s','Xbox Series X/S'],
    ['xbox series x/s','Xbox Series X/S'],['xbox series s/x','Xbox Series X/S']
  ]);

  const clean=value=>String(value??'').trim().replace(/\s+/g,' ');
  const normal=value=>clean(value).toLowerCase();
  const canonical=value=>{const raw=clean(value);return raw?(aliases.get(raw.toLowerCase())||raw):raw};
  const blank=value=>value===undefined||value===null||value==='';

  const gameKey=g=>[
    normal(g?.title),
    normal(canonical(g?.platform)),
    normal(g?.edition||'Standard'),
    normal(g?.category||'Main Collection')
  ].join('|');
  const wishKey=w=>[normal(w?.title),normal(canonical(w?.platform))].join('|');

  function merge(kept,duplicate){
    Object.keys(duplicate||{}).forEach(key=>{
      if(blank(kept[key])&&!blank(duplicate[key])) kept[key]=duplicate[key];
    });
    return kept;
  }

  function dedupe(items,keyFn){
    const seen=new Map(),out=[];
    (items||[]).forEach(item=>{
      if(!item||typeof item!=='object')return;
      if(item.platform)item.platform=canonical(item.platform);
      const key=keyFn(item);
      if(seen.has(key))merge(seen.get(key),item);
      else{seen.set(key,item);out.push(item)}
    });
    return out;
  }

  function repair(data,seedIds){
    if(!data||typeof data!=='object')return data;
    if(Array.isArray(data.games)){
      data.games=dedupe(data.games,gameKey);
      data.games.forEach(game=>{const id=seedIds?.get(gameKey(game));if(id)game.id=id});
      data.games=dedupe(data.games,gameKey);
    }
    if(Array.isArray(data.wishlist))data.wishlist=dedupe(data.wishlist,wishKey);
    return data;
  }

  const seed=window.MUSEUM_SEED;
  if(seed)repair(seed);
  const seedIds=new Map((seed?.games||[]).map(game=>[gameKey(game),game.id]));

  for(let i=0;i<localStorage.length;i++){
    const key=localStorage.key(i);
    if(!key||!key.startsWith('theGameMuseumV'))continue;
    try{
      const raw=localStorage.getItem(key);
      if(!raw)continue;
      const data=JSON.parse(raw);
      repair(data,seedIds);
      localStorage.setItem(key,JSON.stringify(data));
    }catch(_){}
  }

  window.MUSEUM_DATA_INTEGRITY={repair,gameKey,wishKey,canonical};
})();

// Collection filter ordering override — keeps the working filter system intact.
window.addEventListener('DOMContentLoaded',()=>{
  const alpha=(a,b)=>a.localeCompare(b,undefined,{numeric:true,sensitivity:'base'});
  const family=document.getElementById('familyFilter');
  const consoleSelect=document.getElementById('platformFilter');
  const gallery=document.getElementById('categoryFilter');
  const sort=document.getElementById('sortFilter');

  function alphabetiseSelect(select,keepFirst=true){
    if(!select)return;
    const current=select.value;
    const options=[...select.options];
    const first=keepFirst?options.shift():null;
    options.sort((a,b)=>alpha(a.textContent,b.textContent));
    select.replaceChildren(...(first?[first]:[]),...options);
    if([...select.options].some(o=>o.value===current))select.value=current;
  }

  // All... stays first; the remaining choices are alphabetical.
  alphabetiseSelect(family,true);
  alphabetiseSelect(consoleSelect,true);

  if(gallery){
    const current=gallery.value;
    gallery.innerHTML='<option value="">All galleries</option><option value="Display Gallery">Display Gallery</option><option value="Main Collection">Main Collection</option>';
    if([...gallery.options].some(o=>o.value===current))gallery.value=current;
  }

  if(sort){
    const current=sort.value;
    sort.innerHTML='<option value="title">A–Z</option><option value="price">Highest price</option><option value="newest">Newest entries</option>';
    if([...sort.options].some(o=>o.value===current))sort.value=current;
  }

  // Console choices are rebuilt whenever Platform changes, so alphabetise them afterwards too.
  if(family&&consoleSelect){
    family.addEventListener('input',()=>setTimeout(()=>alphabetiseSelect(consoleSelect,true),0));
  }
});
