// Collection filter ordering + runtime data integrity safety layer.
window.addEventListener('DOMContentLoaded',()=>{
  const clean=v=>String(v??'').trim().replace(/\s+/g,' ');
  const normal=v=>clean(v).toLowerCase();
  const canonicalPlatform=v=>{
    const p=normal(v);
    const map={
      'ps1':'PlayStation 1','playstation 1':'PlayStation 1',
      'ps2':'PlayStation 2','playstation 2':'PlayStation 2',
      'ps3':'PlayStation 3','playstation 3':'PlayStation 3',
      'ps4':'PlayStation 4','playstation 4':'PlayStation 4',
      'ps5':'PlayStation 5','playstation 5':'PlayStation 5',
      'psp':'PlayStation Portable','playstation portable':'PlayStation Portable',
      'ps vita':'PlayStation Vita','playstation vita':'PlayStation Vita',
      'ds':'Nintendo DS','nintendo ds':'Nintendo DS',
      'switch':'Nintendo Switch','nintendo switch':'Nintendo Switch',
      'wii':'Nintendo Wii','nintendo wii':'Nintendo Wii',
      'mega drive':'Sega Mega Drive','sega mega drive':'Sega Mega Drive',
      'xbox':'Xbox Original','xbox original':'Xbox Original',
      'xbox 360':'Xbox 360','xbox one':'Xbox One',
      'xbox series x':'Xbox Series X/S','xbox series x/s':'Xbox Series X/S'
    };
    return map[p]||clean(v);
  };

  const dedupe=(items,keyFn)=>{
    const seen=new Set();
    return (items||[]).filter(item=>{
      const key=keyFn(item);
      if(seen.has(key))return false;
      seen.add(key);
      return true;
    });
  };

  try{
    if(typeof state!=='undefined'){
      state.games=dedupe(state.games,g=>[
        normal(g?.title),normal(canonicalPlatform(g?.platform)),normal(g?.edition||'Standard'),normal(g?.category||'Main Collection')
      ].join('|')).filter(g=>!(normal(g?.title)==='fifa 08'&&normal(canonicalPlatform(g?.platform))==='playstation 3'));

      state.wishlist=dedupe(state.wishlist,w=>[normal(w?.title),normal(canonicalPlatform(w?.platform))].join('|'));
      const fifa08PS3=state.wishlist.some(w=>normal(w?.title)==='fifa 08'&&normal(canonicalPlatform(w?.platform))==='playstation 3');
      if(!fifa08PS3)state.wishlist.unshift({order:'1 - Highest',platform:'PlayStation 3',title:'FIFA 08',type:'Priority Acquisition',reason:'Completes the PS3 FIFA gap',status:'Missing'});
      if(typeof render==='function')render();
    }
  }catch(_){}

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

  if(family&&consoleSelect){
    family.addEventListener('input',()=>setTimeout(()=>alphabetiseSelect(consoleSelect,true),0));
  }
});
