// Xbox cross-generation recategorisation runs before app.js loads its saved state.
(() => {
  const CROSS = 'Xbox Cross Generation';
  const titleKey = value => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
  const targetKeys = new Set([
    'call of duty black ops cold war',
    'black ops cold war',
    'call of duty black ops 6',
    'black ops 6',
    'call of duty black ops 7',
    'black ops 7',
    'call of duty modern warfare ii',
    'call of duty modern warfare iii',
    'call of duty vanguard',
    'ea sports fc 24',
    'ea sports fc24',
    'fc 24',
    'fc24',
    'ea sports fc 25',
    'ea sports fc25',
    'fc 25',
    'fc25'
  ]);
  const isTarget = title => targetKeys.has(titleKey(title));
  const isColdWar = title => titleKey(title).includes('black ops cold war');

  function apply(data){
    if (!data || typeof data !== 'object') return;
    data.games ||= [];

    let coldWar = null;
    data.games.forEach(game => {
      if (!game || !isTarget(game.title)) return;
      game.platform = CROSS;
      if (isColdWar(game.title)) coldWar ||= game;
    });

    if (coldWar) {
      coldWar.id = 'GM-XCG-COLD-WAR';
      coldWar.title = 'Call of Duty: Black Ops Cold War';
      coldWar.platform = CROSS;
      coldWar.edition ||= 'Standard';
      coldWar.category ||= 'Main Collection';
      coldWar.series ||= 'Call of Duty';
      coldWar.status ||= 'Owned';
      coldWar.display ||= 'No';
    } else {
      data.games.push({
        id:'GM-XCG-COLD-WAR',
        title:'Call of Duty: Black Ops Cold War',
        platform:CROSS,
        edition:'Standard',
        category:'Main Collection',
        series:'Call of Duty',
        status:'Owned',
        display:'No',
        shop:'',
        date:'',
        price:null,
        notes:'Owned physical copy. Recategorised as Xbox Cross Generation; purchase details not recorded.'
      });
    }

    const seen = new Set();
    data.games = data.games.filter(game => {
      const key = [titleKey(game?.title), String(game?.platform || '').toLowerCase(), String(game?.edition || 'Standard').toLowerCase(), String(game?.category || 'Main Collection').toLowerCase()].join('|');
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  apply(window.MUSEUM_SEED);
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith('theGameMuseumV')) continue;
    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const data = JSON.parse(raw);
      apply(data);
      localStorage.setItem(key, JSON.stringify(data));
    } catch (_) {}
  }
})();

// Collection filter ordering + runtime data integrity safety layer.
window.addEventListener('DOMContentLoaded',()=>{
  const clean=v=>String(v??'').trim().replace(/\s+/g,' ');
  const normal=v=>clean(v).toLowerCase();
  const canonicalPlatform=v=>{
    if(typeof window.MUSEUM_CANONICAL_PLATFORM==='function')return window.MUSEUM_CANONICAL_PLATFORM(v);
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
      'xbox cross generation':'Xbox Cross Generation','xbox cross-generation':'Xbox Cross Generation','xbox cross gen':'Xbox Cross Generation','xbox cross-gen':'Xbox Cross Generation',
      'xbox series x':'Xbox Series X/S','xbox series x/s':'Xbox Series X/S'
    };
    return map[p]||clean(v);
  };

  // Add a compact price row to every collection information card.
  try{
    if(typeof card==='function'&&!card.__museumPricePatched){
      const baseCard=card;
      const gbp=new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP'});
      const patched=function(g){
        const html=baseCard(g);
        const price=(g?.price===null||g?.price===undefined||g?.price==='')?'Not recorded':gbp.format(Number(g.price)||0);
        return html.replace('</h3></div></button>',`</h3><p class="game-card-price"><span>Price</span><strong>${price}</strong></p></div></button>`);
      };
      patched.__museumPricePatched=true;
      card=patched;

      if(!document.getElementById('museum-card-price-style')){
        const style=document.createElement('style');
        style.id='museum-card-price-style';
        style.textContent='.game-card-price{margin-top:9px!important;padding-top:8px;border-top:1px solid var(--line);display:flex;align-items:center;justify-content:space-between;gap:8px}.game-card-price span{font-size:10px;color:var(--muted);font-weight:700}.game-card-price strong{font-size:12px;color:var(--ink);font-weight:900;text-align:right}';
        document.head.appendChild(style);
      }
    }
  }catch(_){}

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

  const family=document.getElementById('familyFilter');
  const consoleSelect=document.getElementById('platformFilter');
  const gallery=document.getElementById('categoryFilter');
  const sort=document.getElementById('sortFilter');
  const platformOrder=window.MUSEUM_PLATFORM_ORDER||[];
  const familyOrder=['Nintendo','Sega','PlayStation','Xbox','Other'];

  function orderSelect(select,ranker){
    if(!select)return;
    const current=select.value;
    const options=[...select.options];
    const first=options.find(o=>o.value==='');
    const rest=options.filter(o=>o.value!=='').sort((a,b)=>ranker(a.value)-ranker(b.value)||a.textContent.localeCompare(b.textContent,undefined,{numeric:true,sensitivity:'base'}));
    select.replaceChildren(...(first?[first]:[]),...rest);
    if([...select.options].some(o=>o.value===current))select.value=current;
  }

  orderSelect(family,name=>{const i=familyOrder.indexOf(name);return i===-1?familyOrder.length:i});
  orderSelect(consoleSelect,name=>{const canonical=canonicalPlatform(name),i=platformOrder.indexOf(canonical);return i===-1?platformOrder.length:i});

  if(gallery){
    const current=gallery.value;
    gallery.innerHTML='<option value="">All galleries</option><option value="Display Gallery">Display Gallery</option><option value="Main Collection">Main Collection</option>';
    if([...gallery.options].some(o=>o.value===current))gallery.value=current;
  }

  if(sort){
    const current=sort.value;
    sort.innerHTML='<option value="title">A–Z</option><option value="platform">Platform</option><option value="newest">Newest entries</option><option value="price">Highest price</option>';
    if([...sort.options].some(o=>o.value===current))sort.value=current;
  }
});
