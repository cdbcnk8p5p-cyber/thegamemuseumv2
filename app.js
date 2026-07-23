const STORE='theGameMuseumV34', OLD='theGameMuseumV33', LEGACY='theGameMuseumV32', THEME='museumThemeV34';
const V34_MEDIA={
 'GM-0061':{image:'./assets/covers/nfs.jpg',price:50,shop:'CEX',notes:'Photographed from Grant\'s physical Xbox 360 copy. Original £50 CEX label recorded in the archive; the displayed museum cover has been cleaned and straightened.'},
 'GM-0023':{image:'./assets/covers/mafia.jpg',notes:'Photographed from Grant\'s physical Xbox Series X copy.'},
 'GM-0022':{image:'./assets/covers/gta.jpg',price:18,shop:'CEX',notes:'Photographed from Grant\'s physical Xbox Series X copy. Original £18 CEX label recorded in the archive; the displayed museum cover has been cleaned and straightened.'},
 'GM-0021':{image:'./assets/covers/fc25.jpg',price:18,shop:'CEX',notes:'Photographed from Grant\'s physical Xbox Series X copy. Original £18 CEX label recorded in the archive; the displayed museum cover has been cleaned and straightened.'},
 'GM-0020':{image:'./assets/covers/fc24.jpg',price:8,shop:'CEX',notes:'Photographed from Grant\'s physical Xbox Series X copy. Original £8 CEX label recorded in the archive; the displayed museum cover has been cleaned and straightened.'}
};
const EXHIBITS=[
 {id:'f1',name:'Formula One Exhibit',icon:'🏎️',series:['formula one'],copy:'A chronological wing celebrating Grant’s physical Formula One game collection.'},
 {id:'fc',name:'FIFA & EA Sports FC Exhibit',icon:'⚽',series:['fifa / ea sports fc'],copy:'FIFA and EA Sports FC are preserved together as one continuous football-gaming history.'},
 {id:'gta',name:'Grand Theft Auto Exhibit',icon:'🚔',series:['grand theft auto'],copy:'Every owned GTA release, platform variation and display edition gathered into one dedicated wing.'}
];

const COVER_ART={
 'spider-man 2':'https://cdn.cloudflare.steamstatic.com/steam/apps/2651280/library_600x900_2x.jpg',
 'high on life':'https://cdn.cloudflare.steamstatic.com/steam/apps/1583230/library_600x900_2x.jpg',
 'still wakes the deep':'https://cdn.cloudflare.steamstatic.com/steam/apps/1622910/library_600x900_2x.jpg',
 'avatar: frontiers of pandora':'https://cdn.cloudflare.steamstatic.com/steam/apps/2840770/library_600x900_2x.jpg',
 'hogwarts legacy':'https://cdn.cloudflare.steamstatic.com/steam/apps/990080/library_600x900_2x.jpg',
 'f1 21':'https://cdn.cloudflare.steamstatic.com/steam/apps/1134570/library_600x900_2x.jpg',
 'f1 22':'https://cdn.cloudflare.steamstatic.com/steam/apps/1692250/library_600x900_2x.jpg',
 'f1 23':'https://cdn.cloudflare.steamstatic.com/steam/apps/2108330/library_600x900_2x.jpg',
 'f1 24':'https://cdn.cloudflare.steamstatic.com/steam/apps/2488620/library_600x900_2x.jpg',
 'wwe 2k23':'https://cdn.cloudflare.steamstatic.com/steam/apps/1942660/library_600x900_2x.jpg',
 'the last of us part i':'https://cdn.cloudflare.steamstatic.com/steam/apps/1888930/library_600x900_2x.jpg',
 'saints row (2022)':'https://cdn.cloudflare.steamstatic.com/steam/apps/742420/library_600x900_2x.jpg',
 'bus simulator 21':'https://cdn.cloudflare.steamstatic.com/steam/apps/976590/library_600x900_2x.jpg',
 'call of duty: modern warfare ii':'https://cdn.cloudflare.steamstatic.com/steam/apps/1938090/library_600x900_2x.jpg',
 'call of duty: modern warfare iii':'https://cdn.cloudflare.steamstatic.com/steam/apps/2519060/library_600x900_2x.jpg',
 'ea sports fc 24':'https://cdn.cloudflare.steamstatic.com/steam/apps/2195250/library_600x900_2x.jpg',
 'ea sports fc 25':'https://cdn.cloudflare.steamstatic.com/steam/apps/2669320/library_600x900_2x.jpg',
 'grand theft auto v':'https://cdn.cloudflare.steamstatic.com/steam/apps/271590/library_600x900_2x.jpg',
 'battlefield v':'https://cdn.cloudflare.steamstatic.com/steam/apps/1238810/library_600x900_2x.jpg',
 'call of duty: ghosts':'https://cdn.cloudflare.steamstatic.com/steam/apps/209160/library_600x900_2x.jpg',
 'call of duty: advanced warfare':'https://cdn.cloudflare.steamstatic.com/steam/apps/209650/library_600x900_2x.jpg',
 'call of duty: infinite warfare':'https://cdn.cloudflare.steamstatic.com/steam/apps/292730/library_600x900_2x.jpg',
 'call of duty: black ops iii':'https://cdn.cloudflare.steamstatic.com/steam/apps/311210/library_600x900_2x.jpg',
 'call of duty: wwii':'https://cdn.cloudflare.steamstatic.com/steam/apps/476600/library_600x900_2x.jpg',
 'batman: arkham city':'https://cdn.cloudflare.steamstatic.com/steam/apps/200260/library_600x900_2x.jpg',
 'call of duty 2':'https://cdn.cloudflare.steamstatic.com/steam/apps/2630/library_600x900_2x.jpg',
 'call of duty 4: modern warfare':'https://cdn.cloudflare.steamstatic.com/steam/apps/7940/library_600x900_2x.jpg',
 'call of duty: black ops':'https://cdn.cloudflare.steamstatic.com/steam/apps/42700/library_600x900_2x.jpg',
 'call of duty: modern warfare 2':'https://cdn.cloudflare.steamstatic.com/steam/apps/10180/library_600x900_2x.jpg',
 'call of duty: modern warfare 3':'https://cdn.cloudflare.steamstatic.com/steam/apps/115300/library_600x900_2x.jpg',
 'grand theft auto iv':'https://cdn.cloudflare.steamstatic.com/steam/apps/12210/library_600x900_2x.jpg',
 'grand theft auto: san andreas':'https://cdn.cloudflare.steamstatic.com/steam/apps/12120/library_600x900_2x.jpg',
 'grand theft auto: vice city':'https://cdn.cloudflare.steamstatic.com/steam/apps/12110/library_600x900_2x.jpg'
};
function artwork(g){return g.image||COVER_ART[norm(g.title)]||''}
function platformClass(p){p=norm(p);if(p.includes('playstation')||/^ps[1-5]$/.test(p)||p==='psp')return'ps';if(p.includes('xbox'))return'xbox';if(p.includes('nintendo')||p.includes('switch')||p.includes('wii')||p.includes('gamecube')||p.includes('ds'))return'nintendo';if(p.includes('sega')||p.includes('dreamcast')||p.includes('saturn')||p.includes('mega drive'))return'sega';return'other'}

const clone=x=>JSON.parse(JSON.stringify(x));
let state=load(), pendingPhoto='';
function applyV34(s){s.games=(s.games||[]).map(g=>{let u=V34_MEDIA[g.id];return u?{...g,...u,notes:u.notes||g.notes}:g});return s}
function load(){try{let raw=localStorage.getItem(STORE)||localStorage.getItem(OLD)||localStorage.getItem(LEGACY);return applyV34(raw?JSON.parse(raw):clone(window.MUSEUM_SEED))}catch(e){return applyV34(clone(window.MUSEUM_SEED))}}
function save(){localStorage.setItem(STORE,JSON.stringify(state))}
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const norm=v=>String(v||'').trim().toLowerCase();
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const money=v=>new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP'}).format(Number(v)||0);
function toast(msg){let t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2300)}
function countBy(items,key){let m={};items.forEach(x=>{let k=x[key]||'Uncategorised';m[k]=(m[k]||0)+1});return Object.entries(m).sort((a,b)=>b[1]-a[1])}
function initials(title){return String(title).split(/\s+/).slice(0,3).map(x=>x[0]).join('').toUpperCase()}
function cover(game,large=false){let art=artwork(game);return `<div class="game-cover">${art?`<img src="${esc(art)}" alt="${esc(game.title)} cover art" loading="lazy" onerror="this.style.display='none';this.nextElementSibling.style.display='grid'"><div class="initials" style="display:none">${esc(initials(game.title))}</div>`:`<div class="initials">${esc(initials(game.title))}</div>`}</div>`}
function go(page){$$('.page,.bottom-nav button').forEach(x=>x.classList.remove('active'));$('#'+page).classList.add('active');$$(`[data-page="${page}"]`).forEach(x=>x.classList.add('active'));closeDrawer();scrollTo({top:0,behavior:'smooth'})}
function openDrawer(){$('#drawer').classList.add('open');$('#scrim').classList.add('show')}
function closeDrawer(){$('#drawer').classList.remove('open');$('#scrim').classList.remove('show')}
$('#menuBtn').onclick=openDrawer;$('#scrim').onclick=closeDrawer;
$$('[data-page]').forEach(b=>b.onclick=()=>go(b.dataset.page));$$('[data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));
function theme(v){document.body.classList.toggle('dark',v==='dark');localStorage.setItem(THEME,v)}
theme(localStorage.getItem(THEME)||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'));
$('#themeBtn').onclick=()=>theme(document.body.classList.contains('dark')?'light':'dark');

function bars(sel,entries){let max=Math.max(1,...entries.map(x=>x[1]));$(sel).innerHTML=entries.map(([k,v])=>`<div class="bar-row"><span>${esc(k)}</span><div class="bar-track"><div class="bar-fill" style="width:${v/max*100}%"></div></div><strong>${v}</strong></div>`).join('')||'<p class="muted">No data yet.</p>'}
function dashboard(){
 let g=state.games,w=state.wishlist||[],target=state.profile?.nextMajorMilestone||250,spent=g.reduce((s,x)=>s+(Number(x.price)||0),0),pct=Math.min(100,Math.round(g.length/target*100));
 $('#headlineTotal').textContent=g.length;$('#headlineCopy').textContent=`A living archive of physical games, special editions and the stories behind them. ${Math.max(0,target-g.length)} catalogue entries remain to the next major milestone.`;
 $('#mainCount').textContent=g.filter(x=>x.category==='Main Collection').length;$('#displayCount').textContent=g.filter(x=>x.category==='Display Gallery'||x.display==='Yes').length;$('#wishlistCount').textContent=w.filter(x=>norm(x.status)!=='purchased').length;$('#spendTotal').textContent=money(spent);
 $('#progressPercent').textContent=pct+'%';$('#progressBar').style.width=pct+'%';$('#progressText').textContent=`${g.length} games are currently available in this app build. Your spreadsheet remains the master museum archive while the catalogue audit continues.`;
 bars('#topPlatforms',countBy(g,'platform').slice(0,7));
 let latest=g[0];if(latest){$('#latestTitle').textContent=latest.title;$('#latestMeta').textContent=`${latest.platform} • ${latest.edition||'Standard'}${latest.price!=null?' • '+money(latest.price):''}`;$('#latestOpen').onclick=()=>openGame(latest.id)}
}
function platformFilter(){let s=$('#platformFilter'),cur=s.value,ps=[...new Set(state.games.map(x=>x.platform).filter(Boolean))].sort();s.innerHTML='<option value="">All platforms</option>'+ps.map(x=>`<option>${esc(x)}</option>`).join('');if(ps.includes(cur))s.value=cur}
function card(g){let pc=platformClass(g.platform);return `<button class="game-card" data-id="${esc(g.id)}">${cover(g)}<div class="game-info"><div class="badges"><span class="badge platform ${pc}">${esc(g.platform)}</span><span class="badge edition">${esc(g.edition||'Standard')}</span><span class="badge category">${esc(g.category||'Main Collection')}</span>${g.series?`<span class="badge series">${esc(g.series)}</span>`:''}</div><h3>${esc(g.title)}</h3></div></button>`}
function collection(){
 let q=norm($('#searchInput').value),p=$('#platformFilter').value,c=$('#categoryFilter').value,sort=$('#sortFilter').value;
 let arr=state.games.filter(g=>(!q||norm([g.title,g.platform,g.series,g.edition,g.category].join(' ')).includes(q))&&(!p||g.platform===p)&&(!c||g.category===c));
 arr.sort((a,b)=>sort==='platform'?String(a.platform).localeCompare(b.platform)||a.title.localeCompare(b.title):sort==='price'?(Number(b.price)||0)-(Number(a.price)||0):sort==='newest'?String(b.date||'').localeCompare(String(a.date||'')):a.title.localeCompare(b.title));
 $('#resultCount').textContent=`${arr.length} ${arr.length===1?'record':'records'}`;$('#collectionGrid').innerHTML=arr.map(card).join('')||'<article class="panel">No catalogue records found.</article>';$$('.game-card').forEach(x=>x.onclick=()=>openGame(x.dataset.id))
}
function openGame(id){let g=state.games.find(x=>String(x.id)===String(id));if(!g)return;let art=artwork(g);$('#dialogContent').innerHTML=`<div class="detail-layout"><div class="detail-cover-stage">${art?`<img src="${esc(art)}" alt="${esc(g.title)} cover art">`:`<div class="detail-fallback">${esc(initials(g.title))}</div>`}</div><div class="detail-content"><span class="eyebrow">CATALOGUE RECORD</span><h2>${esc(g.title)}</h2><p class="detail-subtitle">${esc(g.platform)} • ${esc(g.edition||'Standard')}</p><div class="detail-grid"><div class="detail"><span>Series</span><strong>${esc(g.series||'—')}</strong></div><div class="detail"><span>Gallery</span><strong>${esc(g.category||'—')}</strong></div><div class="detail"><span>Shop</span><strong>${esc(g.shop||'—')}</strong></div><div class="detail"><span>Price</span><strong>${g.price==null?'—':money(g.price)}</strong></div><div class="detail"><span>Purchase date</span><strong>${esc(g.date||'—')}</strong></div><div class="detail"><span>Display copy</span><strong>${esc(g.display||'No')}</strong></div></div>${g.notes?`<article class="collection-story"><h3>Collection story</h3><p>${esc(g.notes)}</p></article>`:''}</div></div>`;$('#gameDialog').showModal()}
$('#closeDialog').onclick=()=>$('#gameDialog').close();

function exhibitGames(ex){return state.games.filter(g=>ex.series.includes(norm(g.series))).sort((a,b)=>a.title.localeCompare(b.title)||a.platform.localeCompare(b.platform))}
function exhibits(){
 let total=state.games.length||1;
 $('#exhibitOverview').innerHTML=EXHIBITS.map((ex,i)=>{let games=exhibitGames(ex),pct=Math.min(100,Math.round(games.length/Math.max(1,games.length+5)*100));return `<button class="exhibit-card ${ex.id}" data-exhibit="${ex.id}"><span class="exhibit-icon">${ex.icon}</span><span class="eyebrow">PERMANENT EXHIBIT</span><h2>${esc(ex.name)}</h2><p>${games.length} owned catalogue records</p><div class="exhibit-meter"><div style="width:${pct}%"></div></div><small>Open the exhibit →</small></button>`}).join('');
 $('#exhibitDetail').innerHTML=EXHIBITS.map((ex,i)=>{let games=exhibitGames(ex);return `<section class="exhibit-wing ${i===0?'active':''}" data-wing="${ex.id}"><div class="exhibit-banner"><span class="eyebrow">CURATED FRANCHISE WING</span><h2>${ex.icon} ${esc(ex.name)}</h2><p>${esc(ex.copy)}</p><span class="exhibit-pill">${games.length} records</span><span class="exhibit-pill">${new Set(games.map(g=>g.platform)).size} platforms</span></div><div class="exhibit-games">${games.length?games.map(card).join(''):'<div class="exhibit-empty">No matching games have been catalogued yet.</div>'}</div></section>`}).join('');
 $$('.exhibit-card').forEach(b=>b.onclick=()=>{$$('.exhibit-wing').forEach(w=>w.classList.toggle('active',w.dataset.wing===b.dataset.exhibit));$('#exhibitDetail').scrollIntoView({behavior:'smooth',block:'start'})});
 $$('#exhibitDetail .game-card').forEach(x=>x.onclick=()=>openGame(x.dataset.id));
}

function wishlist(){
 let q=norm($('#wishSearch').value),pri=$('#wishPriority').value,items=(state.wishlist||[]).filter(w=>(!q||norm([w.title,w.platform,w.reason,w.order].join(' ')).includes(q))&&(!pri||norm(w.order).includes(norm(pri))));
 let groups={};items.forEach(w=>(groups[w.platform||'Other']??=[]).push(w));
 $('#wishlistGroups').innerHTML=Object.keys(groups).sort().map(platform=>`<section class="platform-group"><header class="platform-group-head"><h2>${esc(platform)}</h2><span>${groups[platform].length}</span></header>${groups[platform].map(w=>`<article class="wish-card"><div><h3>${esc(w.title)}</h3><p>${esc(w.reason||w.type||'Museum acquisition target')}</p></div><span class="priority">${esc(w.order||'Wishlist')}</span></article>`).join('')}</section>`).join('')||'<article class="panel">No wishlist matches found.</article>';
 $('#cexWishlist').innerHTML=items.slice(0,6).map(w=>`<article><strong>${esc(w.title)}</strong><span>${esc(w.platform)} • ${esc(w.order)}</span></article>`).join('')
}
function cex(){let q=norm($('#cexSearch').value),box=$('#cexResult');if(!q){box.innerHTML='';return}let own=state.games.filter(g=>norm(g.title).includes(q)),wish=(state.wishlist||[]).filter(w=>norm(w.title).includes(q));box.innerHTML=own.length?`<article class="cex-status yes"><span class="eyebrow">OWNERSHIP CHECK</span><h2>✅ Already preserved</h2><p>${own.map(g=>`${esc(g.title)} — ${esc(g.platform)}`).join('<br>')}</p></article>`:wish.length?`<article class="cex-status want"><span class="eyebrow">WISHLIST MATCH</span><h2>⭐ Museum target</h2><p>${wish.map(w=>`${esc(w.title)} — ${esc(w.platform)}`).join('<br>')}</p></article>`:`<article class="cex-status no"><span class="eyebrow">CATALOGUE CHECK</span><h2>❌ Not found</h2><p class="muted">Check the spreadsheet audit gap before buying, as the app currently contains the reconstructed catalogue.</p></article>`}
function stats(){let g=state.games,ps=countBy(g,'platform'),ss=countBy(g.filter(x=>x.series),'series'),priced=g.filter(x=>x.price!==null&&x.price!==''&&Number.isFinite(Number(x.price))),avg=priced.length?priced.reduce((s,x)=>s+Number(x.price),0)/priced.length:0;$('#platformTotal').textContent=ps.length;$('#seriesTotal').textContent=ss.length;$('#averagePrice').textContent=money(avg);$('#knownPrices').textContent=priced.length;bars('#platformChart',ps.slice(0,12));bars('#seriesChart',ss.slice(0,10));let total=Math.max(1,g.length),top=ps.slice(0,5),col=['#d7aa38','#153b5d','#477da5','#8aa9be','#b9cbd8'],start=0,segments=top.map((x,i)=>{let a=start,b=start+x[1]/total*360;start=b;return `${col[i]} ${a}deg ${b}deg`});$('#platformDonut').innerHTML=`<div style="position:relative"><div class="donut" style="background:conic-gradient(${segments.join(',')},var(--surface2) ${start}deg 360deg)"></div><div class="donut-label" style="inset:0;display:grid;place-items:center">${g.length}<br><small>games</small></div></div>`}
function timeline(){let dated=state.games.filter(x=>x.date).sort((a,b)=>String(b.date).localeCompare(String(a.date))),arr=dated.length?dated:state.games.slice(0,30);$('#timelineList').innerHTML=arr.map((g,i)=>`<article class="timeline-item"><span class="eyebrow">${esc(g.date||`CATALOGUE ENTRY ${i+1}`)}</span><h3>${esc(g.title)}</h3><p>${esc(g.platform)} • ${esc(g.edition||'Standard')}</p><p>${esc(g.shop||'Shop not recorded')}${g.price==null?'':' • '+money(g.price)}</p></article>`).join('')}
function render(){platformFilter();dashboard();collection();exhibits();wishlist();cex();stats();timeline()}
['searchInput','platformFilter','categoryFilter','sortFilter'].forEach(id=>$('#'+id).addEventListener('input',collection));$('#clearFilters').onclick=()=>{$('#searchInput').value='';$('#platformFilter').value='';$('#categoryFilter').value='';collection()};$('#wishSearch').oninput=wishlist;$('#wishPriority').oninput=wishlist;$('#cexSearch').oninput=cex;
$('#photoInput').onchange=async e=>{let f=e.target.files[0];if(!f)return;$('#photoName').textContent=f.name;pendingPhoto=await compress(f)};
function compress(file){return new Promise((res,rej)=>{let r=new FileReader;r.onerror=rej;r.onload=()=>{let im=new Image;im.onload=()=>{let max=900,scale=Math.min(1,max/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=Math.round(im.width*scale);c.height=Math.round(im.height*scale);c.getContext('2d').drawImage(im,0,0,c.width,c.height);res(c.toDataURL('image/jpeg',.78))};im.src=r.result};r.readAsDataURL(file)})}
$('#addForm').onsubmit=e=>{e.preventDefault();let f=new FormData(e.target);state.games.unshift({id:'GM-LOCAL-'+Date.now(),title:f.get('title'),platform:f.get('platform'),edition:f.get('edition')||'Standard',series:f.get('series')||'',shop:f.get('shop')||'',price:f.get('price')?Number(f.get('price')):null,date:f.get('date')||'',category:f.get('category')||'Main Collection',status:'Owned',display:f.get('category')==='Display Gallery'?'Yes':'No',notes:f.get('notes')||'',image:pendingPhoto||f.get('image')||''});save();e.target.reset();pendingPhoto='';$('#photoName').textContent='Choose image';render();toast('Added to The Game Museum');go('home')}
function download(name,type,text){let b=new Blob([text],{type}),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),500)}
$('#exportBtn').onclick=()=>download(`the-game-museum-v3.4-${new Date().toISOString().slice(0,10)}.json`,'application/json',JSON.stringify(state,null,2));
$('#csvBtn').onclick=()=>{let h=['ID','Game','Platform','Edition','Series','Category','Shop','Price','Purchase Date','Display Copy','Notes','Image'];let q=v=>`"${String(v??'').replaceAll('"','""')}"`;let rows=state.games.map(g=>[g.id,g.title,g.platform,g.edition,g.series,g.category,g.shop,g.price,g.date,g.display,g.notes,g.image].map(q).join(','));download(`game-museum-catalogue-${new Date().toISOString().slice(0,10)}.csv`,'text/csv;charset=utf-8',[h.join(','),...rows].join('\n'))};
$('#importFile').onchange=e=>{let f=e.target.files[0];if(!f)return;let r=new FileReader;r.onload=()=>{try{let x=JSON.parse(r.result);if(!Array.isArray(x.games))throw 0;state=x;save();render();toast('Backup imported')}catch{alert('That is not a valid Museum backup.')}};r.readAsText(f)};
$('#resetBtn').onclick=()=>{if(confirm('Reset app changes to the original spreadsheet import?')){state=clone(window.MUSEUM_SEED);save();render();toast('Museum reset')}};
if('serviceWorker'in navigator)addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));
render();