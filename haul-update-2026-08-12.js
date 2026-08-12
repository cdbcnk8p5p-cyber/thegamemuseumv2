// 12 Aug 2026 haul/catalogue + wishlist sync
(() => {
  const additions = [
    {id:'GM-0162',title:'FIFA 21',platform:'PS5',edition:'Standard',category:'Main Collection',series:'FIFA / EA Sports FC',status:'Owned',display:'No',shop:'',date:'',price:null,notes:'Added during generation-crossover collection audit.'},
    {id:'GM-0163',title:'FIFA 08',platform:'PS2',edition:'Standard',category:'Main Collection',series:'FIFA / EA Sports FC',status:'Owned',display:'No',shop:'CEX Sauchiehall Street',date:'2026-08-12',price:2.00,image:'./assets/covers/fifa-08-ps2.jpg',archiveImage:'./assets/archive/fifa-08-ps2-original.jpg',notes:'Bought from CEX Sauchiehall Street for £2.00 on 12 August 2026.'},
    {id:'GM-0164',title:'Hogwarts Legacy',platform:'PS4',edition:'Standard',category:'Main Collection',series:'',status:'Owned',display:'No',shop:'CEX The Livingston Centre',date:'2026-08-11',price:12.00,image:'./assets/covers/hogwarts-legacy-ps4.jpg',archiveImage:'./assets/archive/hogwarts-legacy-ps4-original.jpg',notes:'Bought from CEX at The Livingston Centre for £12.00 on 11 August 2026.'},
    {id:'GM-0165',title:'eFootball PES 2020',platform:'PS4',edition:'Celtic FC Edition',category:'Main Collection',series:'PES',status:'Owned',display:'No',shop:'CEX Sauchiehall Street',date:'2026-08-12',price:18.00,image:'./assets/covers/efootball-pes-2020-celtic-fc-edition-ps4.jpg',archiveImage:'./assets/archive/efootball-pes-2020-celtic-fc-edition-ps4-original.jpg',notes:'Celtic FC Edition. Bought from CEX Sauchiehall Street for £18.00 on 12 August 2026.'},
    {id:'GM-0166',title:'FIFA 15',platform:'PS4',edition:'Standard',category:'Main Collection',series:'FIFA / EA Sports FC',status:'Owned',display:'No',shop:'CEX',date:'',price:0.50,image:'./assets/covers/fifa-15-ps4.webp',archiveImage:'./assets/archive/fifa-15-ps4-original.jpg',notes:'Existing collection copy discovered uncatalogued. Bought from CEX for £0.50; exact branch and purchase date unknown.'}
  ];

  const wishlistTargets = [
    {order:'Generation',platform:'PS2',title:'FIFA 09',type:'Generation Crossover',reason:'PS2 counterpart to owned PS3 copy',status:'Missing'},
    {order:'Generation',platform:'PS2',title:'FIFA 10',type:'Generation Crossover',reason:'PS2 counterpart to owned PS3 copy',status:'Missing'},
    {order:'Generation',platform:'PS2',title:'FIFA 11',type:'Generation Crossover',reason:'PS2 counterpart to owned PS3 copy',status:'Missing'},
    {order:'Generation',platform:'PS2',title:'FIFA 12',type:'Generation Crossover',reason:'PS2 counterpart to owned PS3 copy',status:'Missing'},
    {order:'Generation',platform:'PS2',title:'FIFA 13',type:'Generation Crossover',reason:'PS2 counterpart to owned PS3 copy',status:'Missing'},
    {order:'Generation',platform:'PS3',title:'FIFA 14',type:'Generation Crossover',reason:'Middle-generation counterpart to owned PS4 copy',status:'Missing'},
    {order:'Generation',platform:'PS2',title:'FIFA 14',type:'Generation Crossover',reason:'Earlier-generation counterpart to owned PS4 copy',status:'Missing'},
    {order:'Generation',platform:'PS4',title:'FIFA 21',type:'Generation Crossover',reason:'PS4 counterpart to owned PS5 copy',status:'Missing'},
    {order:'Generation',platform:'PS3',title:'PES 2015',type:'Generation Crossover',reason:'PS3 counterpart to owned PS4 copy',status:'Missing'},
    {order:'Generation',platform:'PS3',title:'PES 2017',type:'Generation Crossover',reason:'PS3 counterpart to owned PS4 copy',status:'Missing'},
    {order:'Generation',platform:'PS3',title:'Battlefield 4',type:'Generation Crossover',reason:'PS3 counterpart to owned PS4 copy',status:'Missing'},
    {order:'Generation',platform:'PS2',title:'The Simpsons Game',type:'Generation Crossover',reason:'PS2 counterpart to owned PS3 copy',status:'Missing'},
    {order:'Generation',platform:'PS3',title:'WWE SmackDown vs. Raw 2008',type:'Generation Crossover',reason:'PS3 counterpart to owned PS2 copy',status:'Missing'},
    {order:'Generation',platform:'PS4',title:'F1 21',type:'Generation Crossover',reason:'PS4 counterpart to owned PS5 copy',status:'Missing'},
    {order:'Generation',platform:'PS4',title:'F1 22',type:'Generation Crossover',reason:'PS4 counterpart to owned PS5 copy',status:'Missing'},
    {order:'Generation',platform:'PS4',title:'F1 23',type:'Generation Crossover',reason:'PS4 counterpart to owned PS5 copy',status:'Missing'},
    {order:'Generation',platform:'PS4',title:'F1 24',type:'Generation Crossover',reason:'PS4 counterpart to owned PS5 copy',status:'Missing'},
    {order:'Generation',platform:'PS4',title:'WWE 2K23',type:'Generation Crossover',reason:'PS4 counterpart to owned PS5 copy',status:'Missing'},
    {order:'Generation',platform:'PS4',title:'Saints Row (2022)',type:'Generation Crossover',reason:'PS4 counterpart to owned PS5 copy',status:'Missing'},
    {order:'Generation',platform:'Xbox 360',title:'Call of Duty: Ghosts',type:'Generation Crossover',reason:'Xbox 360 counterpart to owned Xbox One copy',status:'Missing'},
    {order:'Generation',platform:'Xbox 360',title:'Call of Duty: Advanced Warfare',type:'Generation Crossover',reason:'Xbox 360 counterpart to owned Xbox One copy',status:'Missing'},
    {order:'Generation',platform:'Xbox 360',title:'Call of Duty: Black Ops III',type:'Generation Crossover',reason:'Xbox 360 counterpart to owned Xbox One copy',status:'Missing'},
    {order:'Generation',platform:'Xbox One',title:'Far Cry 4',type:'Generation Crossover',reason:'Xbox One counterpart to owned Xbox 360 copy',status:'Missing'},
    {order:'Simpsons',platform:'PS2',title:'The Simpsons Road Rage',type:'Simpsons Collection',reason:'Specific Simpsons collection target',status:'Missing'},
    {order:'Simpsons',platform:'Xbox 360',title:'The Simpsons Game',type:'Simpsons Collection',reason:'Different physical platform case for The Simpsons Game',status:'Missing'},
    {order:'Simpsons',platform:'Wii',title:'The Simpsons Game',type:'Simpsons Collection',reason:'Different physical platform case for The Simpsons Game',status:'Missing'},
    {order:'Simpsons',platform:'PSP',title:'The Simpsons Game',type:'Simpsons Collection',reason:'Different physical platform case for The Simpsons Game',status:'Missing'},
    {order:'Simpsons',platform:'Nintendo DS',title:'The Simpsons Game',type:'Simpsons Collection',reason:'Different physical platform case for The Simpsons Game',status:'Missing'}
  ];

  const removeTargets = new Set(['PS2|FIFA 08','PS4|Hogwarts Legacy']);
  const allowedSimpsons = new Set(['PS2|The Simpsons Road Rage','PS2|The Simpsons Game','Xbox 360|The Simpsons Game','Wii|The Simpsons Game','PSP|The Simpsons Game','Nintendo DS|The Simpsons Game']);

  const apply = data => {
    if (!data) return;
    data.games ||= [];
    data.wishlist ||= [];

    additions.forEach(a => {
      const existing = data.games.find(g => g.title === a.title && g.platform === a.platform && g.category === a.category);
      if (existing) Object.assign(existing, a);
      else data.games.push({...a});
    });

    for (let i = data.wishlist.length - 1; i >= 0; i--) {
      const w = data.wishlist[i];
      const key = `${w.platform}|${w.title}`;
      if (removeTargets.has(key) || w.title === 'Grand Theft Auto V' || (w.type === 'Simpsons Collection' && !allowedSimpsons.has(key))) data.wishlist.splice(i, 1);
    }

    wishlistTargets.forEach(item => {
      if (!data.wishlist.some(w => w.platform === item.platform && w.title === item.title)) data.wishlist.push({...item});
    });
  };

  apply(window.MUSEUM_SEED);
  ['theGameMuseumV352','theGameMuseumV35','theGameMuseumV34'].forEach(key => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      const data = JSON.parse(raw);
      apply(data);
      localStorage.setItem(key, JSON.stringify(data));
    } catch (_) {}
  });

  const forceLatestFeature = () => {
    const featured = additions.find(g => g.id === 'GM-0165');
    const cover = document.querySelector('#latestCover');
    const title = document.querySelector('#latestTitle');
    const meta = document.querySelector('#latestMeta');
    const open = document.querySelector('#latestOpen');
    if (!featured || !cover || !title || !meta || !open) return;
    cover.innerHTML = `<img src="${featured.image}" alt="${featured.title} cover art">`;
    title.textContent = featured.title;
    meta.textContent = `${featured.platform} • ${featured.edition} • £18.00`;
    open.onclick = () => { if (typeof openGame === 'function') openGame(featured.id); };
  };
  setTimeout(forceLatestFeature, 0);
  setTimeout(forceLatestFeature, 150);
  setTimeout(forceLatestFeature, 750);
})();
