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
    'DS':'Nintendo DS','Nintendo DS':'Nintendo DS','Switch':'Nintendo Switch','Nintendo Switch':'Nintendo Switch','Wii':'Nintendo Wii','Nintendo Wii':'Nintendo Wii','Mega Drive':'Sega Mega Drive','Sega Mega Drive':'Sega Mega Drive','PS1':'PlayStation 1','PS2':'PlayStation 2','PS3':'PlayStation 3','PS4':'PlayStation 4','PS5':'PlayStation 5','PSP':'PlayStation Portable','PS Vita':'PlayStation Vita','Xbox':'Xbox Original','Xbox Original':'Xbox Original','Xbox 360':'Xbox 360','Xbox One':'Xbox One','Xbox Series X':'Xbox Series X/S','Xbox Series X/S':'Xbox Series X/S'
  };
  function apply(data){
    if(!data||!Array.isArray(data.games)) return;
    data.games.forEach(g=>{ if(platformNames[g.platform]) g.platform=platformNames[g.platform]; if(updates[g.id]) Object.assign(g,updates[g.id]); });
    if(Array.isArray(data.wishlist)) data.wishlist.forEach(w=>{if(platformNames[w.platform]) w.platform=platformNames[w.platform]});
  }
  apply(window.MUSEUM_SEED);
  ['theGameMuseumV353','theGameMuseumV352','theGameMuseumV35','theGameMuseumV34','theGameMuseumV33','theGameMuseumV32'].forEach(key=>{
    try{const raw=localStorage.getItem(key);if(!raw)return;const data=JSON.parse(raw);apply(data);localStorage.setItem(key,JSON.stringify(data));}catch(_){}
  });
})();
