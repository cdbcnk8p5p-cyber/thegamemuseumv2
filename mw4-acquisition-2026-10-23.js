// The Game Museum — Call of Duty: Modern Warfare 4 acquisition, 23 Oct 2026.
// Uses the exact user-supplied clean cover and physical-copy archive photo.
(()=>{
  const TARGET={id:'GM-SMYTHS-20261023-MW4XSX',platform:'Xbox Series X',title:'Call of Duty: Modern Warfare 4',series:'Call of Duty',edition:'Standard',price:59.99,shop:'Smyths Toys',date:'2026-10-23',image:'./IMG_2426(1).jpeg',archiveImage:'./IMG_2427.jpeg'};
  const clean=v=>String(v??'').trim();
  const normal=v=>clean(v).toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,' ').replace(/\s+/g,' ').trim();
  const canonical=value=>{
    if(typeof window.MUSEUM_CANONICAL_PLATFORM==='function')return window.MUSEUM_CANONICAL_PLATFORM(value);
    const k=normal(value),map={'xbox series x':'Xbox Series X','series x':'Xbox Series X'};
    return map[k]||clean(value);
  };
  const same=item=>item&&canonical(item.platform)===TARGET.platform&&normal(item.title)===normal(TARGET.title);
  function patch(data){
    if(!data||typeof data!=='object')return data;
    const lists=['games','collection','items','owned'];
    let list=null;
    for(const k of lists){if(Array.isArray(data[k])){list=data[k];break;}}
    if(!list&&Array.isArray(data))list=data;
    if(!list)return data;
    let item=list.find(same);
    const fields={id:TARGET.id,title:TARGET.title,platform:TARGET.platform,series:TARGET.series,edition:TARGET.edition,status:'Owned',location:'Main Collection',shelf:'Main Shelf',collectionShelf:'Standard',image:TARGET.image,shop:TARGET.shop,price:TARGET.price,date:TARGET.date,archiveImage:TARGET.archiveImage};
    if(item)Object.assign(item,fields); else list.push(fields);
    return data;
  }
  function patchStorage(){
    for(let i=0;i<localStorage.length;i++){
      const key=localStorage.key(i); if(!key)continue;
      try{const raw=localStorage.getItem(key),data=JSON.parse(raw);const before=JSON.stringify(data);patch(data);const after=JSON.stringify(data);if(after!==before)localStorage.setItem(key,after);}catch(_){}
    }
  }
  function patchGlobals(){
    for(const k of ['MUSEUM_DATA','museumData','GAME_MUSEUM_DATA','seedData']){
      try{if(window[k])patch(window[k]);}catch(_){}
    }
  }
  patchGlobals();patchStorage();
  window.addEventListener('load',()=>{patchGlobals();patchStorage();});
})();