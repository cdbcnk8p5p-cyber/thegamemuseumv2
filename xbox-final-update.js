// The Game Museum — final Xbox Cross Generation + Series X|S audit, August 2026.
// Exact supplied clean covers = Museum artwork. Physical-copy photos = archive evidence.
(()=>{
const CROSS='Xbox Cross Generation';
const REQUIRED=[
  './assets/covers/grand-theft-auto-v-xbox-series-x.webp',
  './assets/covers/mafia-the-old-country-xbox-series-x.jpeg',
  './assets/covers/call-of-duty-black-ops-6-xbox-cross-generation.webp',
  './assets/covers/call-of-duty-black-ops-7-xbox-cross-generation.jpeg',
  './assets/covers/call-of-duty-modern-warfare-ii-xbox-cross-generation.jpeg',
  './assets/covers/call-of-duty-modern-warfare-iii-xbox-cross-generation.jpeg',
  './assets/covers/call-of-duty-vanguard-xbox-cross-generation.jpeg',
  './assets/covers/ea-sports-fc-24-xbox-cross-generation.jpeg',
  './assets/covers/ea-sports-fc-25-xbox-cross-generation.jpeg',
  './assets/covers/call-of-duty-black-ops-cold-war-xbox-cross-generation.webp'
];
const RECORDS=[
  {id:'GM-0022',title:'Grand Theft Auto V',platform:'Xbox Series X',series:'Grand Theft Auto',edition:'Standard',shop:'CEX',price:18,cover:'./assets/covers/grand-theft-auto-v-xbox-series-x.webp',archive:'./assets/archive/grand-theft-auto-v-xbox-series-x-original.jpeg',explanation:'Physical Xbox Series X copy is the two-disc release.'},
  {id:'GM-0023',title:'Mafia: The Old Country',platform:'Xbox Series X',series:'Mafia',edition:'Standard',cover:'./assets/covers/mafia-the-old-country-xbox-series-x.jpeg',archive:'./assets/archive/mafia-the-old-country-xbox-series-x-original.jpeg'},
  {id:'GM-0015',title:'Call of Duty: Black Ops 6',platform:CROSS,series:'Call of Duty',edition:'Standard',shop:'CEX',price:20,cover:'./assets/covers/call-of-duty-black-ops-6-xbox-cross-generation.webp',archive:'./assets/archive/call-of-duty-black-ops-6-xbox-cross-generation-original.jpeg'},
  {id:'GM-0016',title:'Call of Duty: Black Ops 7',platform:CROSS,series:'Call of Duty',edition:'Standard',cover:'./assets/covers/call-of-duty-black-ops-7-xbox-cross-generation.jpeg',archive:'./assets/archive/call-of-duty-black-ops-7-xbox-cross-generation-original.jpeg'},
  {id:'GM-0017',title:'Call of Duty: Modern Warfare II',platform:CROSS,series:'Call of Duty',edition:'Cross-Gen Edition',shop:'CEX',price:10,cover:'./assets/covers/call-of-duty-modern-warfare-ii-xbox-cross-generation.jpeg',archive:'./assets/archive/call-of-duty-modern-warfare-ii-xbox-cross-generation-original.jpeg'},
  {id:'GM-0018',title:'Call of Duty: Modern Warfare III',platform:CROSS,series:'Call of Duty',edition:'Cross-Gen Edition',shop:'CEX',price:12,cover:'./assets/covers/call-of-duty-modern-warfare-iii-xbox-cross-generation.jpeg',archive:'./assets/archive/call-of-duty-modern-warfare-iii-xbox-cross-generation-original.jpeg'},
  {id:'GM-0019',title:'Call of Duty: Vanguard',platform:CROSS,series:'Call of Duty',edition:'Cross-Gen Edition',shop:'CEX',price:10,cover:'./assets/covers/call-of-duty-vanguard-xbox-cross-generation.jpeg',archive:'./assets/archive/call-of-duty-vanguard-xbox-cross-generation-original.jpeg'},
  {id:'GM-0020',title:'EA Sports FC 24',platform:CROSS,series:'FIFA / EA Sports FC',edition:'Standard',shop:'CEX',price:8,cover:'./assets/covers/ea-sports-fc-24-xbox-cross-generation.jpeg',archive:'./assets/archive/ea-sports-fc-24-xbox-cross-generation-original.jpeg'},
  {id:'GM-0021',title:'EA Sports FC 25',platform:CROSS,series:'FIFA / EA Sports FC',edition:'Standard',shop:'CEX',price:18,cover:'./assets/covers/ea-sports-fc-25-xbox-cross-generation.jpeg',archive:'./assets/archive/ea-sports-fc-25-xbox-cross-generation-original.jpeg'},
  {id:'GM-XCG-COLD-WAR',title:'Call of Duty: Black Ops Cold War',platform:CROSS,series:'Call of Duty',edition:'Standard',shop:'CEX',price:10,cover:'./assets/covers/call-of-duty-black-ops-cold-war-xbox-cross-generation.webp',archive:'./assets/archive/call-of-duty-black-ops-cold-war-xbox-cross-generation-original.jpeg'}
];
const normal=v=>String(v||'').toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,' ').trim();
const sameTitle=(a,b)=>normal(a)===normal(b);
const MEDIA_NOTE='Exact user-supplied clean cover used for the Museum display; physical-copy photo preserved in the archive.';
function preservedNotes(r,notes){
  let text=String(notes||'').trim();
  const generated=[MEDIA_NOTE,r.explanation||'','Purchase details not recorded.'];
  if(r.shop){
    const prefix=`Bought from ${r.shop} for £${Number(r.price).toFixed(2)}.`;
    generated.push(`${prefix} Purchase date unknown.`,`${prefix} Purchase date preserved from the existing Museum record.`);
  }
  for(const item of generated)if(item)text=text.split(item).join(' ');
  return text.replace(/\s+/g,' ').trim();
}
function story(r,old){
  const priorPurchase=Boolean(old.shop||old.price!=null||old.date);
  const purchase=r.shop?`Bought from ${r.shop} for £${Number(r.price).toFixed(2)}.${old.date?' Purchase date preserved from the existing Museum record.':' Purchase date unknown.'}`:(!priorPurchase?'Purchase details not recorded.':'');
  return [r.explanation||'',purchase,preservedNotes(r,old.notes),MEDIA_NOTE].filter(Boolean).join(' ');
}
function apply(game,r,fresh){
  const old={shop:String(game.shop||'').trim(),date:String(game.date||'').trim(),price:game.price==null?null:game.price,notes:String(game.notes||'').trim(),series:String(game.series||'').trim()};
  Object.assign(game,{id:r.id,title:r.title,platform:r.platform,edition:r.edition,category:'Main Collection',series:r.series||old.series,status:'Owned',display:'No',shelfSection:'Standard Shelf',image:r.cover,archiveImage:r.archive});
  if(r.shop){game.shop=r.shop;game.price=r.price;game.date=old.date||''}
  else if(fresh){game.shop='';game.price=null;game.date=''}
  else {game.shop=old.shop;game.price=old.price;game.date=old.date}
  game.notes=story(r,old);
}
function patch(data){
  if(!data||!Array.isArray(data.games))return false;
  let changed=false;
  for(const r of RECORDS){
    const found=data.games.filter(g=>g&&(String(g.id||'')===r.id||sameTitle(g.title,r.title)));
    let game=found.find(g=>String(g.id||'')===r.id)||found[0],fresh=!game;
    if(!game){game={id:r.id};data.games.push(game);changed=true}
    const before=JSON.stringify(game);apply(game,r,fresh);if(before!==JSON.stringify(game))changed=true;
    if(found.length>1){
      const dup=new Set(found.filter(g=>g!==game)),beforeLen=data.games.length;
      data.games=data.games.filter(g=>!dup.has(g));
      if(data.games.length!==beforeLen)changed=true;
    }
  }
  return changed;
}
function applyEverywhere(){
  try{if(window.MUSEUM_SEED)patch(window.MUSEUM_SEED)}catch(_){}
  try{
    const keys=[];
    for(let i=0;i<localStorage.length;i++){
      const k=localStorage.key(i);
      if(k&&k.startsWith('theGameMuseumV'))keys.push(k);
    }
    for(const k of keys){
      const raw=localStorage.getItem(k);if(!raw)continue;
      const data=JSON.parse(raw);
      if(patch(data))localStorage.setItem(k,JSON.stringify(data));
    }
  }catch(_){}
  try{if(typeof state!=='undefined'&&patch(state)&&typeof save==='function')save()}catch(_){}
}
function refresh(){
  applyEverywhere();
  for(const fn of ['platformFilter','collection','dashboard','statistics','timeline'])try{if(typeof window[fn]==='function')window[fn]()}catch(_){}
  try{document.getElementById('platformFilter')?.dispatchEvent(new Event('change',{bubbles:true}))}catch(_){}
}
const ready=src=>new Promise(resolve=>{
  const image=new Image();
  image.onload=()=>resolve(true);
  image.onerror=()=>resolve(false);
  image.src=`${src}?xboxFinalAudit=1`;
});
async function boot(){
  if(!(await Promise.all(REQUIRED.map(ready))).every(Boolean))return;
  refresh();
  setTimeout(refresh,180);
  setTimeout(refresh,700);
}
document.getElementById('resetBtn')?.addEventListener('click',()=>setTimeout(boot,180));
document.getElementById('importFile')?.addEventListener('change',()=>setTimeout(boot,450));
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
