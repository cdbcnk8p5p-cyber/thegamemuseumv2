// 12 Aug 2026 haul/catalogue update
(() => {
  const additions = [
    {id:'GM-0163',title:'FIFA 08',platform:'PS2',edition:'Standard',category:'Main Collection',series:'FIFA / EA Sports FC',status:'Owned',display:'No',shop:'CEX Sauchiehall Street',date:'2026-08-12',price:2.00,image:'./assets/covers/fifa-08-ps2.jpg',archiveImage:'./assets/archive/fifa-08-ps2-original.jpg',notes:'Bought from CEX Sauchiehall Street for £2.00 on 12 August 2026.'},
    {id:'GM-0164',title:'Hogwarts Legacy',platform:'PS4',edition:'Standard',category:'Main Collection',series:'',status:'Owned',display:'No',shop:'CEX The Livingston Centre',date:'2026-08-11',price:12.00,image:'./assets/covers/hogwarts-legacy-ps4.jpg',archiveImage:'./assets/archive/hogwarts-legacy-ps4-original.jpg',notes:'Bought from CEX at The Livingston Centre for £12.00 on 11 August 2026.'},
    {id:'GM-0165',title:'eFootball PES 2020',platform:'PS4',edition:'Celtic FC Edition',category:'Main Collection',series:'PES',status:'Owned',display:'No',shop:'CEX Sauchiehall Street',date:'2026-08-12',price:18.00,image:'./assets/covers/efootball-pes-2020-celtic-fc-edition-ps4.jpg',archiveImage:'./assets/archive/efootball-pes-2020-celtic-fc-edition-ps4-original.jpg',notes:'Celtic FC Edition. Bought from CEX Sauchiehall Street for £18.00 on 12 August 2026.'},
    {id:'GM-0166',title:'FIFA 15',platform:'PS4',edition:'Standard',category:'Main Collection',series:'FIFA / EA Sports FC',status:'Owned',display:'No',shop:'CEX',date:'',price:0.50,image:'./assets/covers/fifa-15-ps4.webp',archiveImage:'./assets/archive/fifa-15-ps4-original.jpg',notes:'Existing collection copy discovered uncatalogued. Bought from CEX for £0.50; exact branch and purchase date unknown.'}
  ];

  const removeTargets = new Set(['PS2|FIFA 08','PS4|Hogwarts Legacy']);

  const apply = data => {
    if (!data) return;
    data.games ||= [];
    additions.forEach(a => {
      const existing = data.games.find(g => g.title === a.title && g.platform === a.platform && g.category === a.category);
      if (existing) Object.assign(existing, a);
      else data.games.push({...a});
    });

    // The dashboard uses games[0] as Latest Acquisition. Keep the Celtic FC Edition
    // at the front because it is the chosen featured acquisition from 12 Aug 2026.
    const latestIndex = data.games.findIndex(g => g.id === 'GM-0165' || (g.title === 'eFootball PES 2020' && g.platform === 'PS4'));
    if (latestIndex > 0) {
      const [latest] = data.games.splice(latestIndex, 1);
      data.games.unshift(latest);
    }

    if (Array.isArray(data.wishlist)) {
      for (let i = data.wishlist.length - 1; i >= 0; i--) {
        const w = data.wishlist[i];
        if (removeTargets.has(`${w.platform}|${w.title}`)) data.wishlist.splice(i, 1);
      }
    }
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
})();
