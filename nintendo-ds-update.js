// Nintendo DS platform artwork/archive update — 13 Aug 2026
(() => {
  const updates = {
    'GM-0143': {title:'Mario & Sonic at the Olympic Games',platform:'Nintendo DS',edition:'Standard',category:'Main Collection',series:'Mario & Sonic',image:'./assets/covers/mario-sonic-olympic-games-ds.jpg',archiveImage:'./assets/archive/mario-sonic-olympic-games-ds-original.jpg',shop:'',date:'',price:null,notes:'Older collection copy; purchase shop, date and price are not recorded. Physical copy photograph preserved in the archive.'},
    'GM-0144': {title:'New Super Mario Bros.',platform:'Nintendo DS',edition:'Standard',category:'Main Collection',series:'Super Mario',image:'./assets/covers/new-super-mario-bros-ds.jpg',archiveImage:'./assets/archive/new-super-mario-bros-ds-original.jpg',shop:'',date:'',price:null,notes:'Older collection copy; purchase shop, date and price are not recorded. Physical copy photograph preserved in the archive.'},
    'GM-0145': {title:'Cars',platform:'Nintendo DS',edition:'Standard',category:'Main Collection',series:'Cars',image:'./assets/covers/cars-ds.jpg',archiveImage:'./assets/archive/cars-ds-original.jpg',shop:'',date:'',price:null,notes:'Older collection copy; purchase shop, date and price are not recorded. Physical copy photograph preserved in the archive.'},
    'GM-0146': {title:"Scooby-Doo! Who's Watching Who?",platform:'Nintendo DS',edition:'Standard',category:'Main Collection',series:'Scooby-Doo',image:'./assets/covers/scooby-doo-whos-watching-who-ds.jpg',archiveImage:'./assets/archive/scooby-doo-whos-watching-who-ds-original.jpg',shop:'',date:'',price:null,notes:'Older collection copy; purchase shop, date and price are not recorded. Physical copy photograph preserved in the archive.'},
    'GM-0147': {title:'Call of Duty: Modern Warfare: Mobilized',platform:'Nintendo DS',edition:'Standard',category:'Main Collection',series:'Call of Duty',image:'./assets/covers/call-of-duty-modern-warfare-mobilized-ds.jpg',archiveImage:'./assets/archive/call-of-duty-modern-warfare-mobilized-ds-original.jpg',shop:'',date:'',price:null,notes:'Long-held/childhood collection copy; purchase shop, date and price are not recorded. Physical copy photograph preserved in the archive.'}
  };

  const platformNames={
    'DS':'Nintendo DS','Nintendo DS':'Nintendo DS',
    'Switch':'Nintendo Switch','Nintendo Switch':'Nintendo Switch',
    'Wii':'Nintendo Wii','Nintendo Wii':'Nintendo Wii',
    'Mega Drive':'Sega Mega Drive','Sega Mega Drive':'Sega Mega Drive',
    'PS1':'PlayStation 1','PlayStation 1':'PlayStation 1',
    'PS2':'PlayStation 2','PlayStation 2':'PlayStation 2',
    'PS3':'PlayStation 3','PlayStation 3':'PlayStation 3',
    'PS4':'PlayStation 4','PlayStation 4':'PlayStation 4',
    'PS5':'PlayStation 5','PlayStation 5':'PlayStation 5',
    'PSP':'PlayStation Portable','PlayStation Portable':'PlayStation Portable',
    'PS Vita':'PlayStation Vita','PlayStation Vita':'PlayStation Vita',
    'Xbox':'Xbox Original','Xbox Original':'Xbox Original',
    'Xbox 360':'Xbox 360','Xbox One':'Xbox One',
    'Xbox Series X':'Xbox Series X/S','Xbox Series S':'Xbox Series X/S','Xbox Series X/S':'Xbox Series X/S'
  };

  function canonicalPlatform(value){
    const raw=String(value||'').trim();
    return platformNames[raw]||raw;
  }

  function apply(data){
    if(!data||!Array.isArray(data.games)) return;
    data.games.forEach(g=>{
      g.platform=canonicalPlatform(g.platform);
      if(updates[g.id]) Object.assign(g,updates[g.id]);
    });
    if(Array.isArray(data.wishlist)) data.wishlist.forEach(w=>{w.platform=canonicalPlatform(w.platform)});
  }

  apply(window.MUSEUM_SEED);
  ['theGameMuseumV353','theGameMuseumV352','theGameMuseumV35','theGameMuseumV34','theGameMuseumV33','theGameMuseumV32'].forEach(key=>{
    try{
      const raw=localStorage.getItem(key);
      if(!raw)return;
      const data=JSON.parse(raw);
      apply(data);
      localStorage.setItem(key,JSON.stringify(data));
    }catch(_){}
  });

  const families={
    Nintendo:['Nintendo DS','Nintendo Switch','Nintendo Wii'],
    Sega:['Sega Mega Drive'],
    PlayStation:['PlayStation 1','PlayStation 2','PlayStation 3','PlayStation 4','PlayStation 5','PlayStation Portable','PlayStation Vita'],
    Xbox:['Xbox Original','Xbox 360','Xbox One','Xbox Series X/S']
  };

  function familyFor(platform){
    const p=canonicalPlatform(platform);
    return Object.keys(families).find(f=>families[f].includes(p))||'Other';
  }

  window.addEventListener('DOMContentLoaded',()=>{
    const filterBox=document.querySelector('#collection .filters');
    const consoleSelect=document.getElementById('platformFilter');
    const categorySelect=document.getElementById('categoryFilter');
    const sortSelect=document.getElementById('sortFilter');
    const searchInput=document.getElementById('searchInput');
    const clearButton=document.getElementById('clearFilters');
    if(!filterBox||!consoleSelect||!categorySelect||!sortSelect||!searchInput) return;

    let familySelect=document.getElementById('familyFilter');
    if(!familySelect){
      familySelect=document.createElement('select');
      familySelect.id='familyFilter';
      familySelect.setAttribute('aria-label','Platform family');
      filterBox.insertBefore(familySelect,consoleSelect);
    }

    const hasOther=state.games.some(g=>familyFor(g.platform)==='Other');
    familySelect.innerHTML='<option value="">All platforms</option>'+
      ['Nintendo','Sega','PlayStation','Xbox'].map(f=>`<option value="${f}">${f}</option>`).join('')+
      (hasOther?'<option value="Other">Other</option>':'');

    const platformSort=[...sortSelect.options].find(o=>o.value==='platform');
    if(platformSort) platformSort.remove();

    filterBox.classList.add('filter-shelf');
    searchInput.classList.add('filter-search');

    const fields=[
      [familySelect,'Platform'],
      [consoleSelect,'Console'],
      [categorySelect,'Gallery'],
      [sortSelect,'Sort']
    ];
    fields.forEach(([control,labelText])=>{
      if(control.parentElement?.classList.contains('filter-control')) return;
      const label=document.createElement('label');
      label.className='filter-control';
      const caption=document.createElement('span');
      caption.textContent=labelText;
      control.parentNode.insertBefore(label,control);
      label.append(caption,control);
    });

    if(!document.getElementById('museum-filter-style')){
      const style=document.createElement('style');
      style.id='museum-filter-style';
      style.textContent=`
        #collection .filters.filter-shelf{
          grid-template-columns:repeat(2,minmax(0,1fr)) !important;
          gap:10px !important;
          padding:12px;
          background:var(--surface);
          border:1px solid var(--line);
          border-radius:18px;
          box-shadow:var(--shadow);
        }
        #collection .filter-shelf .filter-search{grid-column:1/-1;}
        #collection .filter-control{display:grid;gap:6px;min-width:0;}
        #collection .filter-control>span{
          padding-left:3px;
          color:var(--muted);
          font-size:9px;
          font-weight:900;
          letter-spacing:1.1px;
          text-transform:uppercase;
        }
        #collection .filter-control select{min-width:0;padding:12px 10px;border-radius:12px;font-size:14px;}
        #collection .filter-control select:disabled{opacity:.55;}
        @media(max-width:350px){#collection .filters.filter-shelf{grid-template-columns:1fr !important;}.filter-search{grid-column:1 !important;}}
      `;
      document.head.appendChild(style);
    }

    function refreshConsoles(){
      const selectedFamily=familySelect.value;
      const previous=consoleSelect.value;
      if(!selectedFamily){
        consoleSelect.innerHTML='<option value="">All consoles</option>';
        consoleSelect.value='';
        consoleSelect.disabled=true;
        return;
      }
      const order=selectedFamily==='Other'
        ? [...new Set(state.games.filter(g=>familyFor(g.platform)==='Other').map(g=>canonicalPlatform(g.platform)))].sort()
        : families[selectedFamily];
      const available=new Set(state.games.filter(g=>familyFor(g.platform)===selectedFamily).map(g=>canonicalPlatform(g.platform)));
      const consoles=order.filter(p=>available.has(p));
      consoleSelect.disabled=false;
      consoleSelect.innerHTML=`<option value="">All ${selectedFamily} consoles</option>`+consoles.map(p=>`<option value="${p}">${p}</option>`).join('');
      if(consoles.includes(previous)) consoleSelect.value=previous;
    }

    function filteredCollection(){
      const q=norm(searchInput.value);
      const family=familySelect.value;
      const consoleName=consoleSelect.value;
      const category=categorySelect.value;
      const sort=sortSelect.value;
      let arr=state.games.filter(g=>{
        const p=canonicalPlatform(g.platform);
        return (!q||norm([g.title,p,g.series,g.edition,g.category].join(' ')).includes(q))&&
          (!family||familyFor(p)===family)&&
          (!consoleName||p===consoleName)&&
          (!category||g.category===category);
      });
      arr.sort((a,b)=>sort==='price'
        ?(Number(b.price)||0)-(Number(a.price)||0)
        :sort==='newest'
          ?String(b.date||'').localeCompare(String(a.date||''))||a.title.localeCompare(b.title)
          :a.title.localeCompare(b.title));
      document.getElementById('resultCount').textContent=`${arr.length} ${arr.length===1?'record':'records'}`;
      document.getElementById('collectionGrid').innerHTML=arr.map(card).join('')||'<article class="panel">No catalogue records found.</article>';
      $$('.game-card').forEach(x=>x.onclick=()=>openGame(x.dataset.id));
    }

    try{
      collection=filteredCollection;
      platformFilter=refreshConsoles;
    }catch(_){}

    familySelect.addEventListener('input',()=>{
      consoleSelect.value='';
      refreshConsoles();
      filteredCollection();
    });
    [searchInput,consoleSelect,categorySelect,sortSelect].forEach(control=>control.addEventListener('input',filteredCollection));

    if(clearButton) clearButton.onclick=()=>{
      searchInput.value='';
      familySelect.value='';
      categorySelect.value='';
      sortSelect.value='title';
      refreshConsoles();
      filteredCollection();
    };

    refreshConsoles();
    filteredCollection();
  });
})();
