// The Game Museum — Xbox Original + Xbox 360 audit, August 2026.
// Exact supplied covers = Museum artwork. Physical-copy photos = archive evidence.
(()=>{
const S=['./assets/covers/call-of-duty-finest-hour-xbox-original.webp','./assets/covers/just-dance-3-standard-xbox-360.webp','./assets/covers/the-walking-dead-xbox-360.jpeg'];
const R=[["GM-XO-0001","Call of Duty: Finest Hour","O","Call of Duty","w","",null,"",0],["GM-XO-0002","FIFA Football 2004","O","FIFA / EA Sports FC","w","",null,"",0],["GM-0036","Batman: Arkham City","3","","w","",null,"",0],["GM-0037","Call of Duty 2","3","Call of Duty","j","CEX",10.0,"",0],["GM-0038","Call of Duty 3","3","Call of Duty","j","CEX",4.0,"",0],["GM-0039","Call of Duty 4: Modern Warfare","3","Call of Duty","w","CEX",2.0,"",0],["GM-0040","Call of Duty: Black Ops","3","Call of Duty","w","CEX",4.0,"",0],["GM-X360-BO2","Call of Duty: Black Ops II","3","Call of Duty","j","CEX",8.0,"",0],["GM-0041","Call of Duty: Modern Warfare 2","3","Call of Duty","j","CEX",3.0,"",0],["GM-0042","Call of Duty: Modern Warfare 3","3","Call of Duty","j","CEX",2.0,"",0],["GM-0043","Call of Duty: World at War","3","Call of Duty","j","",null,"",0],["GM-0044","Call of Juarez","3","Call of Juarez","j","CEX",3.0,"",0],["GM-0045","Call of Juarez: Bound in Blood","3","Call of Juarez","w","CEX",2.5,"",0],["GM-0046","Call of Juarez: The Cartel","3","Call of Juarez","j","CEX",2.5,"",0],["GM-0047","Disney Universe","3","","w","",null,"",0],["GM-0048","Far Cry 4","3","","w","",null,"",0],["GM-0049","Grand Theft Auto IV","3","Grand Theft Auto","j","",null,"",0],["GM-0050","Grand Theft Auto V","3","Grand Theft Auto","w","CEX Cumbernauld",4.0,"2026-02-12",1],["GM-0051","Halo: Reach","3","","w","",null,"",0],["GM-0052","Injustice: Gods Among Us","3","","j","",null,"",0],["GM-0054","Just Dance 4","3","","j","",null,"",0],["GM-0055","Kinect Adventures!","3","","j","",null,"",0],["GM-0056","Kinect Joy Ride","3","","w","",null,"",0],["GM-0057","Kinect Sports","3","","j","CEX",1.0,"",0],["GM-X360-KINECTIMALS","Kinectimals","3","","j","",null,"",0],["GM-X360-KS2","Kinect Sports: Season Two","3","","j","CEX",2.0,"",0],["GM-0058","L.A. Noire","3","","w","",null,"",0],["GM-0059","Left 4 Dead","3","","j","",null,"",0],["GM-0060","Left 4 Dead 2","3","","w","",null,"",0],["GM-X360-LOLLIPOP","Lollipop Chainsaw","3","","w","",null,"",0],["GM-X360-MINECRAFT","Minecraft: Xbox 360 Edition","3","","j","",null,"",0],["GM-0062","The Walking Dead","3","","j","",null,"",0]];
const W=[
{order:'Shelf',platform:'Xbox 360',title:'Just Dance 3 Standard Edition',edition:'Standard',type:'Shelf Completion',reason:'The owned Special Edition is being sold; a Standard Edition is needed for the Main Shelf.',status:'Missing',image:'./assets/covers/just-dance-3-standard-xbox-360.webp'},
{order:'Shelf',platform:'Xbox 360',title:'Saints Row IV Standard Edition',edition:'Standard',type:'Shelf Completion',reason:'The owned Commander in Chief Edition is being sold; a Standard Edition is needed for the Main Shelf.',status:'Missing',image:'./assets/covers/saints-row-iv-standard-xbox-360.webp'}
];
const n=v=>String(v||'').toLowerCase().replace(/&/g,' and ').replace(/\biv\b/g,' 4 ').replace(/[^a-z0-9]+/g,' ').trim();
const plat=v=>{if(typeof window.MUSEUM_CANONICAL_PLATFORM==='function')return window.MUSEUM_CANONICAL_PLATFORM(v);const p=n(v);if(p==='xbox'||p==='xbox original')return'Xbox Original';if(p==='xbox 360')return'Xbox 360';return String(v||'').trim()};
const base=v=>n(String(v||'').replace(/standard edition|special edition|commander in chief edition/ig,''));
const slug=v=>String(v||'').toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const path=(title,p,kind,ext)=>`./assets/${kind}/${slug(title)}-${p==='O'?'xbox-original':'xbox-360'}${kind==='archive'?'-original':''}.${ext}`;
const remove=g=>g&&plat(g.platform)==='Xbox 360'&&['just dance 3','saints row 4'].includes(base(g.title));
function apply(g,r,fresh){
 const [id,title,pc,series,ct,shop,price,date,receipt]=r,p=pc==='O'?'Xbox Original':'Xbox 360';
 const old={series:String(g.series||'').trim(),shop:String(g.shop||'').trim(),date:String(g.date||'').trim(),price:g.price==null?null:g.price,notes:String(g.notes||'').trim()};
 Object.assign(g,{id,title,platform:p,edition:'Standard',category:'Main Collection',series:series||old.series,status:'Owned',display:'No',shelfSection:'Standard Shelf',image:path(title,pc,'covers',ct==='w'?'webp':'jpeg'),archiveImage:path(title,pc,'archive','jpeg')});
 if(receipt)g.receiptImage='./assets/archive/grand-theft-auto-v-xbox-360-cex-receipt-2026-02-12.jpeg';
 if(shop){
   g.shop=shop;g.price=price;g.date=date||'';
   g.notes=receipt?`Bought from ${shop} for £${Number(price).toFixed(2)} on 12 February 2026. Receipt supplied as purchase evidence. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive.`:`Bought from ${shop} for £${Number(price).toFixed(2)}. Purchase date unknown. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive.`;
 }else{
   if(fresh){g.shop='';g.price=null;g.date=''}else{g.shop=old.shop;g.price=old.price;g.date=old.date}
   g.notes=old.notes||'Purchase details not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive.';
 }
}
function patch(d){
 if(!d||!Array.isArray(d.games))return false;if(!Array.isArray(d.wishlist))d.wishlist=[];let ch=false;
 const l=d.games.length;d.games=d.games.filter(g=>!remove(g));if(d.games.length!==l)ch=true;
 for(const r of R){
   const p=r[2]==='O'?'Xbox Original':'Xbox 360',found=d.games.filter(g=>g&&plat(g.platform)===p&&(String(g.id||'')===r[0]||base(g.title)===base(r[1])));
   let g=found.find(x=>String(x.id||'')===r[0])||found[0],fresh=!g;if(!g){g={id:r[0]};d.games.push(g);ch=true}
   const before=JSON.stringify(g);apply(g,r,fresh);if(before!==JSON.stringify(g))ch=true;
   if(found.length>1){const dup=new Set(found.filter(x=>x!==g)),x=d.games.length;d.games=d.games.filter(v=>!dup.has(v));if(d.games.length!==x)ch=true}
 }
 for(const t of W){
   const found=d.wishlist.filter(x=>x&&plat(x.platform)==='Xbox 360'&&base(x.title)===base(t.title)),w=found[0]||{};
   if(!found.length){d.wishlist.push(w);ch=true}const before=JSON.stringify(w);Object.assign(w,t);if(before!==JSON.stringify(w))ch=true;
   if(found.length>1){const dup=new Set(found.slice(1)),x=d.wishlist.length;d.wishlist=d.wishlist.filter(v=>!dup.has(v));if(d.wishlist.length!==x)ch=true}
 }
 return ch
}
function all(){
 try{if(window.MUSEUM_SEED)patch(window.MUSEUM_SEED)}catch(_){}
 try{const ks=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith('theGameMuseumV'))ks.push(k)}for(const k of ks){const raw=localStorage.getItem(k);if(!raw)continue;const d=JSON.parse(raw);if(patch(d))localStorage.setItem(k,JSON.stringify(d))}}catch(_){}
 try{if(typeof state!=='undefined'&&patch(state)&&typeof save==='function')save()}catch(_){}
}
function refresh(){all();for(const f of ['collection','dashboard','statistics','timeline','wishlist'])try{if(typeof window[f]==='function')window[f]()}catch(_){}try{document.getElementById('platformFilter')?.dispatchEvent(new Event('change',{bubbles:true}))}catch(_){}try{document.getElementById('wishFamilyFilter')?.dispatchEvent(new Event('change',{bubbles:true}))}catch(_){} }
const ready=src=>new Promise(ok=>{const i=new Image();i.onload=()=>ok(true);i.onerror=()=>ok(false);i.src=`${src}?xboxOriginal360Audit=1`});
async function boot(){if(!(await Promise.all(S.map(ready))).every(Boolean))return;refresh();setTimeout(refresh,180);setTimeout(refresh,700)}
document.getElementById('resetBtn')?.addEventListener('click',()=>setTimeout(boot,180));
document.getElementById('importFile')?.addEventListener('change',()=>setTimeout(boot,450));
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
