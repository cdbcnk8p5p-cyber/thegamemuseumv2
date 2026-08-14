// Wishlist gallery and Platform -> Console filters.
(() => {
  const clean=v=>String(v??'').trim();
  const lower=v=>clean(v).toLowerCase();
  const alpha=(a,b)=>String(a).localeCompare(String(b),undefined,{numeric:true,sensitivity:'base'});
  const canonical=v=>{
    const p=lower(v);
    const map={
      'ds':'Nintendo DS','nintendo ds':'Nintendo DS',
      'switch':'Nintendo Switch','nintendo switch':'Nintendo Switch',
      'wii':'Nintendo Wii','nintendo wii':'Nintendo Wii',
      'mega drive':'Sega Mega Drive','sega mega drive':'Sega Mega Drive',
      'ps1':'PlayStation 1','playstation 1':'PlayStation 1',
      'ps2':'PlayStation 2','playstation 2':'PlayStation 2',
      'ps3':'PlayStation 3','playstation 3':'PlayStation 3',
      'ps4':'PlayStation 4','playstation 4':'PlayStation 4',
      'ps5':'PlayStation 5','playstation 5':'PlayStation 5',
      'psp':'PlayStation Portable','playstation portable':'PlayStation Portable',
      'ps vita':'PlayStation Vita','playstation vita':'PlayStation Vita',
      'xbox':'Xbox Original','xbox original':'Xbox Original',
      'xbox 360':'Xbox 360','xbox one':'Xbox One',
      'xbox series x':'Xbox Series X/S','xbox series x/s':'Xbox Series X/S'
    };
    return map[p]||clean(v);
  };
  const families={
    Nintendo:['Nintendo DS','Nintendo Switch','Nintendo Wii'],
    PlayStation:['PlayStation 1','PlayStation 2','PlayStation 3','PlayStation 4','PlayStation 5','PlayStation Portable','PlayStation Vita'],
    Sega:['Sega Mega Drive'],
    Xbox:['Xbox Original','Xbox 360','Xbox One','Xbox Series X/S']
  };
  const familyFor=p=>Object.keys(families).find(f=>families[f].includes(canonical(p)))||'Other';
  const coverHtml=w=>{
    const image=w.image||'';
    return `<div class="game-cover">${image?`<img src="${esc(image)}" alt="${esc(w.title)} cover art" loading="lazy"><div class="initials" style="display:none">${esc(initials(w.title))}</div>`:`<div class="initials">${esc(initials(w.title))}</div>`}</div>`;
  };

  function renderWishlistGallery(){
    const search=document.getElementById('wishSearch');
    const family=document.getElementById('wishFamilyFilter');
    const consoleSelect=document.getElementById('wishConsoleFilter');
    const type=document.getElementById('wishPriority');
    const grid=document.getElementById('wishlistGroups');
    if(!search||!family||!consoleSelect||!type||!grid)return;

    const q=lower(search.value);
    const familyValue=family.value;
    const consoleValue=consoleSelect.value;
    const typeValue=type.value;
    let items=(state.wishlist||[]).filter(w=>lower(w.status)!=='purchased').filter(w=>{
      const p=canonical(w.platform);
      const hay=lower([w.title,p,w.reason,w.order,w.type,w.edition].join(' '));
      return (!q||hay.includes(q))&&
        (!familyValue||familyFor(p)===familyValue)&&
        (!consoleValue||p===consoleValue)&&
        (!typeValue||lower(w.type)===lower(typeValue));
    }).sort((a,b)=>alpha(a.title,b.title)||alpha(canonical(a.platform),canonical(b.platform)));

    const count=document.getElementById('wishResultCount');
    if(count)count.textContent=`${items.length} ${items.length===1?'target':'targets'}`;
    grid.className='cover-grid wishlist-cover-grid';
    grid.innerHTML=items.map(w=>`<article class="game-card wishlist-game-card">
      ${coverHtml(w)}
      <div class="game-info">
        <span class="platform ${platformClass(canonical(w.platform))}">${esc(canonical(w.platform))}</span>
        <h3>${esc(w.title)}</h3>
        <p class="wishlist-card-meta">${esc([w.edition,w.type||w.order].filter(Boolean).join(' • '))}</p>
        ${w.reason?`<div class="wishlist-reason">${esc(w.reason)}</div>`:''}
      </div>
    </article>`).join('')||'<article class="panel">No wishlist targets found.</article>';

    const mini=document.getElementById('cexWishlist');
    if(mini){
      const priority=(state.wishlist||[]).filter(w=>lower(w.status)!=='purchased').slice(0,6);
      mini.innerHTML=priority.map(w=>`<article><strong>${esc(w.title)}</strong><span>${esc(canonical(w.platform))} • ${esc(w.order||w.type||'Wishlist')}</span></article>`).join('');
    }
  }

  function refreshConsoles(){
    const family=document.getElementById('wishFamilyFilter');
    const select=document.getElementById('wishConsoleFilter');
    if(!family||!select)return;
    const selectedFamily=family.value;
    const previous=select.value;
    if(!selectedFamily){
      select.innerHTML='<option value="">All consoles</option>';
      select.value='';
      select.disabled=true;
      return;
    }
    const available=[...new Set((state.wishlist||[]).filter(w=>lower(w.status)!=='purchased'&&familyFor(w.platform)===selectedFamily).map(w=>canonical(w.platform)))].sort(alpha);
    select.disabled=false;
    select.innerHTML=`<option value="">All ${selectedFamily} consoles</option>`+available.map(p=>`<option value="${esc(p)}">${esc(p)}</option>`).join('');
    if(available.includes(previous))select.value=previous;
  }

  function setup(){
    const family=document.getElementById('wishFamilyFilter');
    const consoleSelect=document.getElementById('wishConsoleFilter');
    const type=document.getElementById('wishPriority');
    const search=document.getElementById('wishSearch');
    const clear=document.getElementById('wishClearFilters');
    if(!family||!consoleSelect||!type||!search)return;

    const presentFamilies=[...new Set((state.wishlist||[]).filter(w=>lower(w.status)!=='purchased').map(w=>familyFor(w.platform)))].sort(alpha);
    family.innerHTML='<option value="">All platforms</option>'+presentFamilies.map(f=>`<option value="${esc(f)}">${esc(f)}</option>`).join('');

    const preferred=['Priority Acquisition','Shelf Completion','Generation Crossover','Simpsons Collection'];
    const actual=[...new Set((state.wishlist||[]).map(w=>clean(w.type)).filter(Boolean))];
    const types=[...preferred.filter(x=>actual.includes(x)),...actual.filter(x=>!preferred.includes(x)).sort(alpha)];
    type.innerHTML='<option value="">All priorities</option>'+types.map(t=>`<option value="${esc(t)}">${esc(t)}</option>`).join('');

    refreshConsoles();
    search.oninput=renderWishlistGallery;
    type.oninput=renderWishlistGallery;
    consoleSelect.oninput=renderWishlistGallery;
    family.oninput=()=>{consoleSelect.value='';refreshConsoles();renderWishlistGallery()};
    if(clear)clear.onclick=()=>{search.value='';family.value='';type.value='';refreshConsoles();renderWishlistGallery()};
    renderWishlistGallery();
  }

  try{wishlist=renderWishlistGallery}catch(_){}
  window.addEventListener('DOMContentLoaded',setup);
})();
