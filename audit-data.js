// Museum audit overrides. Loaded after data.js and before app.js.
(() => {
  const updates = {"GM-0132":{"shop":"CEX","date":"","price":18,"image":"./assets/covers/grand-theft-auto-2-ps1.jpg","archiveImage":"./assets/archive/grand-theft-auto-2-ps1-original.jpg","notes":"Bought from CEX for £18. Clean cover used for the museum display; original collection photo preserved in the archive."},"GM-0133":{"shop":"Cash Converters, Blackpool","date":"","price":2.25,"image":"./assets/covers/tomb-raider-ps1.jpg","archiveImage":"./assets/archive/tomb-raider-ps1-original.jpg","notes":"Bought from Cash Converters in Blackpool for £2.25. Purchase date unknown. Clean cover used for the museum display; original collection photo preserved in the archive."},"GM-0134":{"shop":"Cash Converters, Blackpool","date":"","price":1.25,"image":"./assets/covers/tomb-raider-iii-ps1.jpg","archiveImage":"./assets/archive/tomb-raider-iii-ps1-original.jpg","notes":"Bought from Cash Converters in Blackpool for £1.25. Purchase date unknown. Clean cover used for the museum display; original collection photo preserved in the archive."}};

  const fifa21 = {id:'GM-0162',title:'FIFA 21',platform:'PS5',edition:'Standard',category:'Main Collection',series:'FIFA / EA Sports FC',status:'Owned',display:'No',shop:'',date:'',price:null,notes:'Added during generation-crossover collection audit.'};

  const generationWishlist = [
    {order:'Generation',platform:'PS2',title:'FIFA 08',type:'Generation Crossover',reason:'PS2 counterpart to the PS3 generation-transition release',status:'Missing'},
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
    {order:'Generation',platform:'PS2',title:'The Simpsons Game',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Generation',platform:'PS2',title:'The Simpsons Game',type:'Generation Crossover',reason:'PS2 counterpart to owned PS3 copy',status:'Missing'},
    {order:'Generation',platform:'PS2',title:'The Simpsons Game',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Generation',platform:'PS3',title:'WWE SmackDown vs. Raw 2008',type:'Generation Crossover',reason:'PS3 counterpart to owned PS2 copy',status:'Missing'},
    {order:'Generation',platform:'PS4',title:'F1 21',type:'Generation Crossover',reason:'PS4 counterpart to owned PS5 copy',status:'Missing'},
    {order:'Generation',platform:'PS4',title:'F1 22',type:'Generation Crossover',reason:'PS4 counterpart to owned PS5 copy',status:'Missing'},
    {order:'Generation',platform:'PS4',title:'F1 23',type:'Generation Crossover',reason:'PS4 counterpart to owned PS5 copy',status:'Missing'},
    {order:'Generation',platform:'PS4',title:'F1 24',type:'Generation Crossover',reason:'PS4 counterpart to owned PS5 copy',status:'Missing'},
    {order:'Generation',platform:'PS4',title:'Hogwarts Legacy',type:'Generation Crossover',reason:'PS4 counterpart to owned PS5 copy',status:'Missing'},
    {order:'Generation',platform:'PS4',title:'WWE 2K23',type:'Generation Crossover',reason:'PS4 counterpart to owned PS5 copy',status:'Missing'},
    {order:'Generation',platform:'PS4',title:'Saints Row (2022)',type:'Generation Crossover',reason:'PS4 counterpart to owned PS5 copy',status:'Missing'},
    {order:'Generation',platform:'Xbox 360',title:'Call of Duty: Ghosts',type:'Generation Crossover',reason:'Xbox 360 counterpart to owned Xbox One copy',status:'Missing'},
    {order:'Generation',platform:'Xbox 360',title:'Call of Duty: Advanced Warfare',type:'Generation Crossover',reason:'Xbox 360 counterpart to owned Xbox One copy',status:'Missing'},
    {order:'Generation',platform:'Xbox 360',title:'Call of Duty: Black Ops III',type:'Generation Crossover',reason:'Xbox 360 counterpart to owned Xbox One copy',status:'Missing'},
    {order:'Generation',platform:'Xbox One',title:'Far Cry 4',type:'Generation Crossover',reason:'Xbox One counterpart to owned Xbox 360 copy',status:'Missing'},
    {order:'Generation',platform:'Xbox One',title:'Grand Theft Auto V',type:'Generation Crossover',reason:'Fills the Xbox 360 to Series X GTA V generation run',status:'Missing'},
    {order:'Generation',platform:'PS5',title:'Grand Theft Auto V',type:'Generation Crossover',reason:'Completes the physical PlayStation GTA V generation run',status:'Missing'}
  ];

  const simpsonsWishlist = [
    {order:'Simpsons',platform:'NES',title:'The Simpsons: Bart vs. the Space Mutants',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'Sega Master System',title:'The Simpsons: Bart vs. the Space Mutants',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'Mega Drive',title:'The Simpsons: Bart vs. the Space Mutants',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'Game Gear',title:'The Simpsons: Bart vs. the Space Mutants',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'Game Boy',title:"Bart Simpson's Escape from Camp Deadly",type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'NES',title:'The Simpsons: Bart vs. the World',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'Sega Master System',title:'The Simpsons: Bart vs. the World',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'NES',title:"Krusty's Fun House",type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'SNES',title:"Krusty's Fun House",type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'Mega Drive',title:"Krusty's Fun House",type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'Sega Master System',title:"Krusty's Fun House",type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'Game Gear',title:"Krusty's Fun House",type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'Game Boy',title:"Krusty's Fun House",type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'Game Boy',title:'The Simpsons: Bart vs. the Juggernauts',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'NES',title:'The Simpsons: Bartman Meets Radioactive Man',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'Game Gear',title:'The Simpsons: Bartman Meets Radioactive Man',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'SNES',title:"The Simpsons: Bart's Nightmare",type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'Mega Drive',title:"The Simpsons: Bart's Nightmare",type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'Game Boy',title:'The Simpsons: Itchy & Scratchy in Miniature Golf Madness',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'Game Boy',title:'The Simpsons: Bart & the Beanstalk',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'SNES',title:'Virtual Bart',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'Mega Drive',title:'Virtual Bart',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'SNES',title:'The Itchy & Scratchy Game',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'Mega Drive',title:'The Itchy & Scratchy Game',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'Game Boy Color',title:'The Simpsons: Night of the Living Treehouse of Horror',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'PS1',title:'The Simpsons Wrestling',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'PS2',title:'The Simpsons Road Rage',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'Xbox Original',title:'The Simpsons Road Rage',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'Nintendo GameCube',title:'The Simpsons Road Rage',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'Game Boy Advance',title:'The Simpsons Road Rage',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'PS2',title:'The Simpsons Skateboarding',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'Xbox Original',title:'The Simpsons: Hit & Run',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'Nintendo GameCube',title:'The Simpsons: Hit & Run',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'PS2',title:'The Simpsons Game',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'Xbox 360',title:'The Simpsons Game',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'Nintendo Wii',title:'The Simpsons Game',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'PSP',title:'The Simpsons Game',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'},
    {order:'Simpsons',platform:'Nintendo DS',title:'The Simpsons Game',type:'Simpsons Collection',reason:'Physical Simpsons platform variant',status:'Missing'}
  ];

  const patchGames = games => (games || []).forEach(g => {
    const u = updates[g.id];
    if (u) Object.assign(g, u);
  });

  const ensureGame = games => {
    if (!Array.isArray(games)) return;
    if (!games.some(g => g.id === fifa21.id || (g.title === fifa21.title && g.platform === fifa21.platform && g.category === fifa21.category))) games.push({...fifa21});
  };

  const ensureWishlistItems = (wishlist, items) => {
    if (!Array.isArray(wishlist)) return;
    items.forEach(item => {
      if (!wishlist.some(w => w.platform === item.platform && w.title === item.title)) wishlist.push({...item});
    });
  };

  if (window.MUSEUM_SEED) {
    patchGames(window.MUSEUM_SEED.games);
    ensureGame(window.MUSEUM_SEED.games);
    ensureWishlistItems(window.MUSEUM_SEED.wishlist, generationWishlist);
    ensureWishlistItems(window.MUSEUM_SEED.wishlist, simpsonsWishlist);
  }

  ['theGameMuseumV352','theGameMuseumV35','theGameMuseumV34'].forEach(key => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      const saved = JSON.parse(raw);
      patchGames(saved.games);
      ensureGame(saved.games);
      ensureWishlistItems(saved.wishlist, generationWishlist);
      ensureWishlistItems(saved.wishlist, simpsonsWishlist);
      localStorage.setItem(key, JSON.stringify(saved));
    } catch (_) {}
  });
})();