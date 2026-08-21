// The Game Museum — Xbox One audit, August 2026.
// Exact supplied clean covers = Museum artwork. Physical-copy photos = archive evidence.
(()=>{
const REQUIRED=[
  './assets/covers/battlefield-v-xbox-one.webp',
  './assets/covers/call-of-duty-advanced-warfare-xbox-one.webp',
  './assets/covers/call-of-duty-black-ops-iii-xbox-one.jpeg',
  './assets/covers/call-of-duty-black-ops-4-xbox-one.jpeg',
  './assets/covers/call-of-duty-infinite-warfare-xbox-one.webp',
  './assets/covers/call-of-duty-modern-warfare-2019-xbox-one.webp',
  './assets/covers/call-of-duty-wwii-xbox-one.webp',
  './assets/covers/forza-horizon-3-xbox-one.jpeg',
  './assets/covers/forza-motorsport-6-ten-year-anniversary-xbox-one.webp',
  './assets/covers/forza-motorsport-7-xbox-one.jpeg',
  './assets/covers/grand-theft-auto-v-xbox-one.webp',
  './assets/covers/madden-nfl-17-xbox-one.webp'
];
const RECORDS=[
  {id:'GM-0024',title:'Battlefield V',series:'',edition:'Standard',cover:'./assets/covers/battlefield-v-xbox-one.webp',archive:'./assets/archive/battlefield-v-xbox-one-original.jpeg'},
  {id:'GM-0026',title:'Call of Duty: Advanced Warfare',series:'Call of Duty',edition:'Standard',shop:'CEX',price:3,cover:'./assets/covers/call-of-duty-advanced-warfare-xbox-one.webp',archive:'./assets/archive/call-of-duty-advanced-warfare-xbox-one-original.jpeg'},
  {id:'GM-0028',title:'Call of Duty: Black Ops III',series:'Call of Duty',edition:'Standard',shop:'CEX',price:5,cover:'./assets/covers/call-of-duty-black-ops-iii-xbox-one.jpeg',archive:'./assets/archive/call-of-duty-black-ops-iii-xbox-one-original.jpeg'},
  {id:'GM-0029',title:'Call of Duty: Black Ops 4',series:'Call of Duty',edition:'Standard',shop:'CEX',price:4,cover:'./assets/covers/call-of-duty-black-ops-4-xbox-one.jpeg',archive:'./assets/archive/call-of-duty-black-ops-4-xbox-one-original.jpeg'},
  {id:'GM-0027',title:'Call of Duty: Infinite Warfare',series:'Call of Duty',edition:'Standard',shop:'CEX',price:4,cover:'./assets/covers/call-of-duty-infinite-warfare-xbox-one.webp',archive:'./assets/archive/call-of-duty-infinite-warfare-xbox-one-original.jpeg'},
  {id:'GM-0031',title:'Call of Duty: Modern Warfare (2019)',series:'Call of Duty',edition:'Standard',shop:'CEX',price:5,cover:'./assets/covers/call-of-duty-modern-warfare-2019-xbox-one.webp',archive:'./assets/archive/call-of-duty-modern-warfare-2019-xbox-one-original.jpeg'},
  {id:'GM-0030',title:'Call of Duty: WWII',series:'Call of Duty',edition:'Standard',shop:'Forgotten Worlds, Stewarton',price:5,cover:'./assets/covers/call-of-duty-wwii-xbox-one.webp',archive:'./assets/archive/call-of-duty-wwii-xbox-one-original.jpeg'},
  {id:'GM-0032',title:'Forza Horizon 3',series:'Forza',edition:'Standard',cover:'./assets/covers/forza-horizon-3-xbox-one.jpeg',archive:'./assets/archive/forza-horizon-3-xbox-one-original.jpeg'},
  {id:'GM-0033',title:'Forza Motorsport 6',series:'Forza',edition:'Ten Year Anniversary Edition / Standard Edition',cover:'./assets/covers/forza-motorsport-6-ten-year-anniversary-xbox-one.webp',archive:'./assets/archive/forza-motorsport-6-ten-year-anniversary-xbox-one-original.jpeg',explanation:'The physical retail Standard Edition of Forza Motorsport 6 was released as the Ten Year Anniversary Edition, so this copy fulfils the Main Shelf standard-edition slot.'},
  {id:'GM-0034',title:'Forza Motorsport 7',series:'Forza',edition:'Standard',cover:'./assets/covers/forza-motorsport-7-xbox-one.jpeg',archive:'./assets/archive/forza-motorsport-7-xbox-one-original.jpeg'},
  {id:'GM-XONE-GTAV',title:'Grand Theft Auto V',series:'Grand Theft Auto',edition:'Standard',cover:'./assets/covers/grand-theft-auto-v-xbox-one.webp',archive:'./assets/archive/grand-theft-auto-v-xbox-one-original.jpeg'},
  {id:'GM-0035',title:'Madden NFL 17',series:'',edition:'Standard',cover:'./assets/covers/madden-nfl-17-xbox-one.webp',archive:'./assets/archive/madden-nfl-17-xbox-one-original.jpeg'}
];
const normal=v=>String(v||'').toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,' ').trim();
const canonicalPlatform=v=>{
  if(typeof window.MUSEUM_CANONICAL_PLATFORM==='function')return window.MUSEUM_CANONICAL_PLATFORM(v);
  const p=normal(v);return p==='xbox one'?'Xbox One':String(v||'').trim();
};
const sameTitle=(a,b)=>normal(a)===normal(b);
function story(r,old,fresh){
  const media='Exact user-supplied clean cover used for the Museum display; physical-copy photo preserved in the archive.';
  const purchase=r.shop?`Bought from ${r.shop} for £${Number(r.price).toFixed(2)}. Purchase date unknown.`:(fresh?'Purchase details not recorded.':'');
  return [r.explanation||'',purchase,(!r.shop&&!fresh?old.notes:''),media].filter(Boolean).join(' ');
}
function apply(game,r,fresh){
  const old={shop:String(game.shop||'').trim(),date:String(game.date||'').trim(),price:game.price==null?null:game.price,notes:String(game.notes||'').trim(),series:String(game.series||'').trim()};
  Object.assign(game,{id:r.id,title:r.title,platform:'Xbox One',edition:r.edition,category:'Main Collection',series:r.series||old.series,status:'Owned',display:'No',shelfSection:'Standard Shelf',image:r.cover,archiveImage:r.archive});
  if(r.shop){game.shop=r.shop;game.price=r.price;game.date=''}
  else if(fresh){game.shop='';game.price=null;game.date=''}
  else {game.shop=old.shop;game.price=old.price;game.date=old.date}
  game.notes=story(r,old,fresh);
}
function patch(data){
  if(!data||!Array.isArray(data.games))return false;
  let changed=false;
  for(const r of RECORDS){
    const found=data.games.filter(g=>g&&canonicalPlatform(g.platform)==='Xbox One'&&(String(g.id||'')===r.id||sameTitle(g.title,r.title)));
    let game=found.find(g=>String(g.id||'')===r.id)||found[0],fresh=!game;
    if(!game){game={id:r.id};data.games.push(game);changed=true}
    const before=JSON.stringify(game);apply(game,r,fresh);if(before!==JSON.stringify(game))changed=true;
    if(found.length>1){const dup=new Set(found.filter(g=>g!==game)),beforeLen=data.games.length;data.games=data.games.filter(g=>!dup.has(g));if(data.games.length!==beforeLen)changed=true}
  }
  return changed;
}
function applyEverywhere(){
  try{if(window.MUSEUM_SEED)patch(window.MUSEUM_SEED)}catch(_){}
  try{
    const keys=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith('theGameMuseumV'))keys.push(k)}
    for(const k of keys){const raw=localStorage.getItem(k);if(!raw)continue;const data=JSON.parse(raw);if(patch(data))localStorage.setItem(k,JSON.stringify(data))}
  }catch(_){}
  try{if(typeof state!=='undefined'&&patch(state)&&typeof save==='function')save()}catch(_){}
}
function refresh(){
  applyEverywhere();
  for(const fn of ['platformFilter','collection','dashboard','statistics','timeline'])try{if(typeof window[fn]==='function')window[fn]()}catch(_){}
  try{document.getElementById('platformFilter')?.dispatchEvent(new Event('change',{bubbles:true}))}catch(_){}
}
const ready=src=>new Promise(resolve=>{const image=new Image();image.onload=()=>resolve(true);image.onerror=()=>resolve(false);image.src=`${src}?xboxOneAudit=1`});
async function boot(){if(!(await Promise.all(REQUIRED.map(ready))).every(Boolean))return;refresh();setTimeout(refresh,180);setTimeout(refresh,700)}
document.getElementById('resetBtn')?.addEventListener('click',()=>setTimeout(boot,180));
document.getElementById('importFile')?.addEventListener('change',()=>setTimeout(boot,450));
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
