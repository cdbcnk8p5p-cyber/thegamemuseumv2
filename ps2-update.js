// PlayStation 2 artwork/archive + catalogue repair/update — 17 Aug 2026
(() => {
  const records = [
    {
      id:'GM-0112', aliases:['Canis Canem Edit'], title:'Canis Canem Edit', platform:'PlayStation 2',
      edition:'Standard', category:'Main Collection', series:'', status:'Owned', display:'No',
      image:'./assets/covers/canis-canem-edit-ps2.jpg', archiveImage:'./assets/archive/canis-canem-edit-ps2-original.jpg',
      shop:'CEX', date:'', price:10.00,
      notes:'Bought from CEX for £10.00. Exact branch and purchase date are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0113', aliases:['Celtic Club Football','Club Football: Celtic','Club Football Celtic'], title:'Club Football: Celtic', platform:'PlayStation 2',
      edition:'Standard', category:'Main Collection', series:'', status:'Owned', display:'No',
      image:'./assets/covers/club-football-celtic-ps2.jpg', archiveImage:'./assets/archive/club-football-celtic-ps2-original.jpg',
      shop:'CEX', date:'', price:8.00,
      notes:'2003/04 season Celtic edition. Bought from CEX for £8.00. Exact branch and purchase date are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0126', aliases:['F1 Career Challenge'], title:'F1 Career Challenge', platform:'PlayStation 2',
      edition:'Standard', category:'Main Collection', series:'Formula One', status:'Owned', display:'No',
      image:'./assets/covers/f1-career-challenge-ps2.jpg', archiveImage:'./assets/archive/f1-career-challenge-ps2-original.jpg',
      shop:'', date:'', price:null,
      notes:'Purchase shop, date and price are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0122', aliases:['F1 2002'], title:'F1 2002', platform:'PlayStation 2',
      edition:'Standard', category:'Main Collection', series:'Formula One', status:'Owned', display:'No',
      image:'./assets/covers/f1-2002-ps2.jpg', archiveImage:'./assets/archive/f1-2002-ps2-original.jpg',
      shop:'', date:'', price:null,
      notes:'Purchase shop, date and price are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0123', aliases:['F1 2003'], title:'F1 2003', platform:'PlayStation 2',
      edition:'Standard', category:'Main Collection', series:'Formula One', status:'Owned', display:'No',
      image:'./assets/covers/f1-2003-ps2.jpg', archiveImage:'./assets/archive/f1-2003-ps2-original.jpg',
      shop:'', date:'', price:null,
      notes:'Purchase shop, date and price are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0127', aliases:['Formula Challenge'], title:'Formula Challenge', platform:'PlayStation 2',
      edition:'Standard', category:'Main Collection', series:'Formula One', status:'Owned', display:'No',
      image:'./assets/covers/formula-challenge-ps2.jpg', archiveImage:'./assets/archive/formula-challenge-ps2-original.jpg',
      shop:'', date:'', price:null,
      notes:'Purchase shop, date and price are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0124', aliases:['F1 2004'], title:'F1 2004', platform:'PlayStation 2',
      edition:'Standard', category:'Main Collection', series:'Formula One', status:'Owned', display:'No',
      image:'./assets/covers/f1-2004-ps2.jpg', archiveImage:'./assets/archive/f1-2004-ps2-original.jpg',
      shop:'CEX', date:'', price:2.00,
      notes:'Bought from CEX for £2.00. Exact branch and purchase date are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0125', aliases:['F1 2005'], title:'F1 2005', platform:'PlayStation 2',
      edition:'Standard', category:'Main Collection', series:'Formula One', status:'Owned', display:'No',
      image:'./assets/covers/f1-2005-ps2.jpg', archiveImage:'./assets/archive/f1-2005-ps2-original.jpg',
      shop:'', date:'', price:null,
      notes:'Purchase shop, date and price are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0169', aliases:['F1 06','Formula 1 06','Formula One 06'], title:'F1 06', platform:'PlayStation 2',
      edition:'Standard', category:'Main Collection', series:'Formula One', status:'Owned', display:'No',
      image:'./assets/covers/f1-06-ps2.jpg', archiveImage:'./assets/archive/f1-06-ps2-original.jpg',
      shop:'Forgotten Worlds, Stewarton', date:'', price:4.00,
      notes:'Bought from Forgotten Worlds in Stewarton for £4.00. Purchase date is not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0114', aliases:['FIFA 2001','FIFA Football 2001'], title:'FIFA 2001', platform:'PlayStation 2',
      edition:'Standard', category:'Main Collection', series:'FIFA / EA Sports FC', status:'Owned', display:'No',
      image:'./assets/covers/fifa-2001-ps2.jpg', archiveImage:'./assets/archive/fifa-2001-ps2-original.jpg',
      shop:'', date:'', price:null,
      notes:'Purchase shop, date and price are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0115', aliases:['FIFA 2002','FIFA Football 2002'], title:'FIFA Football 2002', platform:'PlayStation 2',
      edition:'Standard', category:'Main Collection', series:'FIFA / EA Sports FC', status:'Owned', display:'No',
      image:'./assets/covers/fifa-football-2002-ps2.jpg', archiveImage:'./assets/archive/fifa-football-2002-ps2-original.jpg',
      shop:'', date:'', price:null,
      notes:'Purchase shop, date and price are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0116', aliases:['FIFA 2003','FIFA Football 2003'], title:'FIFA Football 2003', platform:'PlayStation 2',
      edition:'Standard', category:'Main Collection', series:'FIFA / EA Sports FC', status:'Owned', display:'No',
      image:'./assets/covers/fifa-football-2003-ps2.jpg', archiveImage:'./assets/archive/fifa-football-2003-ps2-original.jpg',
      shop:'', date:'', price:null,
      notes:'Purchase shop, date and price are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0117', aliases:['FIFA 2004','FIFA Football 2004'], title:'FIFA Football 2004', platform:'PlayStation 2',
      edition:'Standard', category:'Main Collection', series:'FIFA / EA Sports FC', status:'Owned', display:'No',
      image:'./assets/covers/fifa-football-2004-ps2.jpg', archiveImage:'./assets/archive/fifa-football-2004-ps2-original.jpg',
      shop:'', date:'', price:null,
      notes:'Purchase shop, date and price are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0118', aliases:['FIFA 2005','FIFA Football 2005'], title:'FIFA Football 2005', platform:'PlayStation 2',
      edition:'Standard', category:'Main Collection', series:'FIFA / EA Sports FC', status:'Owned', display:'No',
      image:'./assets/covers/fifa-football-2005-ps2.jpg', archiveImage:'./assets/archive/fifa-football-2005-ps2-original.jpg',
      shop:'', date:'', price:null,
      notes:'Purchase shop, date and price are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0119', aliases:['FIFA 06'], title:'FIFA 06', platform:'PlayStation 2',
      edition:'Standard', category:'Main Collection', series:'FIFA / EA Sports FC', status:'Owned', display:'No',
      image:'./assets/covers/fifa-06-ps2.jpg', archiveImage:'./assets/archive/fifa-06-ps2-original.jpg',
      shop:'', date:'', price:null,
      notes:'Purchase shop, date and price are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0120', aliases:['FIFA 07'], title:'FIFA 07', platform:'PlayStation 2',
      edition:'Standard', category:'Main Collection', series:'FIFA / EA Sports FC', status:'Owned', display:'No',
      image:'./assets/covers/fifa-07-ps2.jpg', archiveImage:'./assets/archive/fifa-07-ps2-original.jpg',
      shop:'', date:'', price:null,
      notes:'Purchase shop, date and price are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0121', aliases:['FIFA Street'], title:'FIFA Street', platform:'PlayStation 2',
      edition:'Standard', category:'Main Collection', series:'FIFA / EA Sports FC', status:'Owned', display:'No',
      image:'./assets/covers/fifa-street-ps2.jpg', archiveImage:'./assets/archive/fifa-street-ps2-original.jpg',
      shop:'', date:'', price:null,
      notes:'Purchase shop, date and price are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0170', aliases:['Grand Theft Auto III','Grand Theft Auto 3','GTA III'], title:'Grand Theft Auto III', platform:'PlayStation 2',
      edition:'Standard', category:'Main Collection', series:'Grand Theft Auto', status:'Owned', display:'No',
      image:'./assets/covers/grand-theft-auto-iii-ps2.jpg', archiveImage:'./assets/archive/grand-theft-auto-iii-ps2-original.jpg',
      shop:'CEX', date:'', price:4.00,
      notes:'Bought from CEX for £4.00. Exact branch and purchase date are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0111', aliases:['Grand Theft Auto: Liberty City Stories'], title:'Grand Theft Auto: Liberty City Stories', platform:'PlayStation 2',
      edition:'Standard', category:'Main Collection', series:'Grand Theft Auto', status:'Owned', display:'No',
      image:'./assets/covers/grand-theft-auto-liberty-city-stories-ps2.jpg', archiveImage:'./assets/archive/grand-theft-auto-liberty-city-stories-ps2-original.jpg',
      shop:'', date:'', price:null,
      notes:'Purchase shop, date and price are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0109', aliases:['Grand Theft Auto: San Andreas'], title:'Grand Theft Auto: San Andreas', platform:'PlayStation 2',
      edition:'Standard', category:'Main Collection', series:'Grand Theft Auto', status:'Owned', display:'No',
      image:'./assets/covers/grand-theft-auto-san-andreas-ps2.jpg', archiveImage:'./assets/archive/grand-theft-auto-san-andreas-ps2-original.jpg',
      shop:'', date:'', price:null,
      notes:'Purchase shop, date and price are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0110', aliases:['Grand Theft Auto: Vice City'], title:'Grand Theft Auto: Vice City', platform:'PlayStation 2',
      edition:'Standard', category:'Main Collection', series:'Grand Theft Auto', status:'Owned', display:'No',
      image:'./assets/covers/grand-theft-auto-vice-city-ps2.jpg', archiveImage:'./assets/archive/grand-theft-auto-vice-city-ps2-original.jpg',
      shop:'', date:'', price:null,
      notes:'Purchase shop, date and price are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0171', aliases:['Grand Theft Auto: Vice City Stories'], title:'Grand Theft Auto: Vice City Stories', platform:'PlayStation 2',
      edition:'Standard', category:'Main Collection', series:'Grand Theft Auto', status:'Owned', display:'No',
      image:'./assets/covers/grand-theft-auto-vice-city-stories-ps2.jpg', archiveImage:'./assets/archive/grand-theft-auto-vice-city-stories-ps2-original.jpg',
      shop:'CEX', date:'', price:22.00,
      notes:'Bought from CEX for £22.00. Exact branch and purchase date are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0131', aliases:['Tomb Raider: The Angel of Darkness','Lara Croft Tomb Raider: The Angel of Darkness'], title:'Tomb Raider: The Angel of Darkness', platform:'PlayStation 2',
      edition:'Standard', category:'Main Collection', series:'Tomb Raider', status:'Owned', display:'No',
      image:'./assets/covers/tomb-raider-angel-of-darkness-ps2.jpg', archiveImage:'./assets/archive/tomb-raider-angel-of-darkness-ps2-original.jpg',
      shop:'', date:'', price:null,
      notes:'Purchase shop, date and price are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0128', aliases:['Racing Simulation 3','RS3: Racing Simulation Three','RS3 Racing Simulation Three'], title:'RS3: Racing Simulation Three', platform:'PlayStation 2',
      edition:'Standard', category:'Main Collection', series:'', status:'Owned', display:'No',
      image:'./assets/covers/rs3-racing-simulation-three-ps2.jpg', archiveImage:'./assets/archive/rs3-racing-simulation-three-ps2-original.jpg',
      shop:'', date:'', price:null,
      notes:'Purchase shop, date and price are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0129', aliases:['The Simpsons: Hit & Run','The Simpsons Hit & Run','Simpsons Hit and Run'], title:'The Simpsons: Hit & Run', platform:'PlayStation 2',
      edition:'Standard', category:'Main Collection', series:'The Simpsons', status:'Owned', display:'No',
      image:'./assets/covers/the-simpsons-hit-and-run-ps2.jpg', archiveImage:'./assets/archive/the-simpsons-hit-and-run-ps2-original.jpg',
      shop:'CEX', date:'', price:25.00,
      notes:'Bought from CEX for £25.00. Exact branch and purchase date are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0130', aliases:['WWE SmackDown vs. Raw 2008','SmackDown vs. Raw 2008'], title:'WWE SmackDown vs. Raw 2008', platform:'PlayStation 2',
      edition:'Standard', category:'Main Collection', series:'WWE', status:'Owned', display:'No',
      image:'./assets/covers/wwe-smackdown-vs-raw-2008-ps2.jpg', archiveImage:'./assets/archive/wwe-smackdown-vs-raw-2008-ps2-original.jpg',
      shop:'', date:'', price:null,
      notes:'Purchase shop, date and price are not recorded. Physical copy photograph preserved in the archive.'
    }
  ];

  const wishlistTarget = {
    platform:'PlayStation 2',
    title:'Club Football 2005',
    edition:'Standard',
    type:'Lower Priority',
    order:'Lower',
    reason:'Discovered while cataloguing the Celtic Club Football PS2 copy; future collection pickup.',
    status:'Missing',
    image:'./assets/covers/club-football-2005-ps2.jpg'
  };

  const platformAliases={
    'ps2':'PlayStation 2','playstation 2':'PlayStation 2'
  };
  const canonicalPlatform=value=>platformAliases[String(value||'').trim().toLowerCase()]||String(value||'').trim();
  const normal=value=>String(value||'').trim().toLowerCase().replace(/\s+/g,' ');
  const titleMatches=(game,record)=>record.aliases.some(t=>normal(t)===normal(game?.title));

  function apply(data){
    if(!data||typeof data!=='object')return;
    data.games ||= [];
    data.wishlist ||= [];

    data.games.forEach(g=>{ if(g.platform)g.platform=canonicalPlatform(g.platform); });
    data.wishlist.forEach(w=>{ if(w.platform)w.platform=canonicalPlatform(w.platform); });

    records.forEach(record=>{
      const matchingIndexes=[];
      data.games.forEach((game,index)=>{
        const samePlatform=canonicalPlatform(game.platform)===record.platform;
        if(game.id===record.id || (samePlatform&&titleMatches(game,record)))matchingIndexes.push(index);
      });

      if(matchingIndexes.length){
        const keepIndex=matchingIndexes[0];
        Object.assign(data.games[keepIndex],record);
        // Remove any other stale/duplicate alias copies of the same physical record.
        for(let i=matchingIndexes.length-1;i>=1;i--)data.games.splice(matchingIndexes[i],1);
      }else{
        data.games.push({...record});
      }
    });

    // Exact-record safety after the targeted alias cleanup.
    const seenGames=new Set();
    data.games=data.games.filter(game=>{
      const key=[normal(game.title),normal(canonicalPlatform(game.platform)),normal(game.edition||'Standard'),normal(game.category||'Main Collection')].join('|');
      if(seenGames.has(key))return false;
      seenGames.add(key);
      return true;
    });

    const wishIndex=data.wishlist.findIndex(w=>canonicalPlatform(w.platform)==='PlayStation 2'&&normal(w.title)==='club football 2005');
    if(wishIndex>=0)Object.assign(data.wishlist[wishIndex],wishlistTarget);
    else data.wishlist.push({...wishlistTarget});

    const seenWishlist=new Set();
    data.wishlist=data.wishlist.filter(item=>{
      const key=[normal(item.title),normal(canonicalPlatform(item.platform))].join('|');
      if(seenWishlist.has(key))return false;
      seenWishlist.add(key);
      return true;
    });
  }

  apply(window.MUSEUM_SEED);
  ['theGameMuseumV353','theGameMuseumV352','theGameMuseumV35','theGameMuseumV34','theGameMuseumV33','theGameMuseumV32'].forEach(key=>{
    try{
      const raw=localStorage.getItem(key);
      if(!raw)return;
      const data=JSON.parse(raw);
      apply(data);
      localStorage.setItem(key,JSON.stringify(data));
    }catch(_){}
  });

  window.MUSEUM_PS2_RECORDS=records;
})();
