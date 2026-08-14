// Nintendo Switch + Nintendo Wii + Sega Mega Drive artwork/archive update — 14 Aug 2026
(() => {
  const records = [
    {
      id:'GM-0138', aliases:['FIFA 22 Legacy Edition','FIFA 22'], title:'FIFA 22', platform:'Nintendo Switch',
      edition:'Legacy Edition', category:'Main Collection', series:'FIFA / EA Sports FC', status:'Owned', display:'No',
      image:'./assets/covers/fifa-22-switch.jpg', archiveImage:'./assets/archive/fifa-22-switch-original.jpg',
      shop:'', date:'', price:null,
      notes:'Bought for Nintendo Switch during the past few years; exact purchase date, shop and price are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0139', aliases:['Little Friends: Dogs & Cats'], title:'Little Friends: Dogs & Cats', platform:'Nintendo Switch',
      edition:'Standard', category:'Main Collection', series:'', status:'Owned', display:'No',
      image:'./assets/covers/little-friends-dogs-cats-switch.webp', archiveImage:'./assets/archive/little-friends-dogs-cats-switch-original.jpg',
      shop:'', date:'', price:null,
      notes:'Physical game-card copy. Bought for Nintendo Switch during the past few years; exact purchase date, shop and price are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0136', aliases:['Mario Kart 8 Deluxe'], title:'Mario Kart 8 Deluxe', platform:'Nintendo Switch',
      edition:'Standard', category:'Main Collection', series:'Mario', status:'Owned', display:'No',
      image:'./assets/covers/mario-kart-8-deluxe-switch.jpg', archiveImage:'./assets/archive/mario-kart-8-deluxe-switch-original.jpg',
      shop:'', date:'', price:null,
      notes:'Bought for Nintendo Switch during the past few years; exact purchase date, shop and price are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0140', aliases:['Minecraft'], title:'Minecraft', platform:'Nintendo Switch',
      edition:'Standard', category:'Main Collection', series:'', status:'Owned', display:'No',
      image:'./assets/covers/minecraft-switch.jpg', archiveImage:'./assets/archive/minecraft-switch-original.jpg',
      shop:'', date:'', price:null,
      notes:'Bought for Nintendo Switch during the past few years; exact purchase date, shop and price are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0141', aliases:['Need for Speed: Hot Pursuit Remastered'], title:'Need for Speed: Hot Pursuit Remastered', platform:'Nintendo Switch',
      edition:'Standard', category:'Main Collection', series:'Need for Speed', status:'Owned', display:'No',
      image:'./assets/covers/need-for-speed-hot-pursuit-remastered-switch.jpg', archiveImage:'./assets/archive/need-for-speed-hot-pursuit-remastered-switch-original.jpg',
      shop:'', date:'', price:null,
      notes:'Bought for Nintendo Switch during the past few years; exact purchase date, shop and price are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0137', aliases:['New Super Mario Bros. U Deluxe'], title:'New Super Mario Bros. U Deluxe', platform:'Nintendo Switch',
      edition:'Standard', category:'Main Collection', series:'Mario', status:'Owned', display:'No',
      image:'./assets/covers/new-super-mario-bros-u-deluxe-switch.jpg', archiveImage:'./assets/archive/new-super-mario-bros-u-deluxe-switch-original.jpg',
      shop:'', date:'', price:null,
      notes:'Bought for Nintendo Switch during the past few years; exact purchase date, shop and price are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0142', aliases:['Super Mario Galaxy + Super Mario Galaxy 2'], title:'Super Mario Galaxy + Super Mario Galaxy 2', platform:'Nintendo Switch',
      edition:'Standard', category:'Main Collection', series:'Mario', status:'Owned', display:'No',
      image:'./assets/covers/super-mario-galaxy-1-2-switch.jpg', archiveImage:'./assets/archive/super-mario-galaxy-1-2-switch-original.jpg',
      shop:'', date:'', price:null,
      notes:'Bought for Nintendo Switch during the past few years; exact purchase date, shop and price are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0167', aliases:['Super Mario Galaxy'], title:'Super Mario Galaxy', platform:'Nintendo Wii',
      edition:'Standard', category:'Main Collection', series:'Mario', status:'Owned', display:'No',
      image:'./assets/covers/super-mario-galaxy-wii.jpg', archiveImage:'./assets/archive/super-mario-galaxy-wii-original.jpg',
      shop:'CEX', date:'', price:10.00,
      notes:'Bought from CEX for £10.00. Exact branch and purchase date are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0168', aliases:['Super Mario Galaxy 2'], title:'Super Mario Galaxy 2', platform:'Nintendo Wii',
      edition:'Standard', category:'Main Collection', series:'Mario', status:'Owned', display:'No',
      image:'./assets/covers/super-mario-galaxy-2-wii.webp', archiveImage:'./assets/archive/super-mario-galaxy-2-wii-original.jpg',
      shop:'CEX', date:'', price:15.00,
      notes:'Bought from CEX for £15.00. Exact branch and purchase date are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0135', aliases:['F1 2009'], title:'F1 2009', platform:'Nintendo Wii',
      edition:'Standard', category:'Main Collection', series:'Formula One', status:'Owned', display:'No',
      image:'./assets/covers/f1-2009-wii.jpg', archiveImage:'./assets/archive/f1-2009-wii-original.jpg',
      shop:'CEX', date:'', price:2.50,
      notes:'Bought from CEX for £2.50. Exact branch and purchase date are not recorded. Physical copy photograph preserved in the archive.'
    },
    {
      id:'GM-0157', aliases:['Sonic the Hedgehog'], title:'Sonic the Hedgehog', platform:'Sega Mega Drive',
      edition:'Standard', category:'Main Collection', series:'Sonic', status:'Owned', display:'No',
      image:'./assets/covers/sonic-the-hedgehog-mega-drive.webp', archiveImage:'./assets/archive/sonic-the-hedgehog-mega-drive-original.jpg',
      shop:'', date:'', price:null,
      notes:'Original childhood collection copy; purchase shop, date and price are not recorded. Physical copy photograph preserved in the archive.'
    }
  ];

  const aliases = {
    'Switch':'Nintendo Switch','Nintendo Switch':'Nintendo Switch',
    'Wii':'Nintendo Wii','Nintendo Wii':'Nintendo Wii',
    'Mega Drive':'Sega Mega Drive','Sega Mega Drive':'Sega Mega Drive'
  };
  const canonicalPlatform = value => aliases[String(value||'').trim()] || String(value||'').trim();
  const normal = value => String(value||'').trim().toLowerCase();

  function matches(game, record){
    if (!game) return false;
    if (game.id === record.id) return true;
    const platform = canonicalPlatform(game.platform);
    return platform === record.platform && record.aliases.some(title => normal(title) === normal(game.title));
  }

  function gameKey(game){
    return [normal(game.title), normal(canonicalPlatform(game.platform)), normal(game.edition||'Standard'), normal(game.category||'Main Collection')].join('|');
  }

  function apply(data){
    if (!data || typeof data !== 'object') return;
    data.games ||= [];

    data.games.forEach(game => { if (game.platform) game.platform = canonicalPlatform(game.platform); });

    records.forEach(record => {
      const existing = data.games.find(game => matches(game, record));
      if (existing) Object.assign(existing, record);
      else data.games.push({...record});
    });

    // Idempotent safety: keep only one copy of each exact physical record.
    const seen = new Set();
    data.games = data.games.filter(game => {
      const key = gameKey(game);
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }

  apply(window.MUSEUM_SEED);
  ['theGameMuseumV353','theGameMuseumV352','theGameMuseumV35','theGameMuseumV34','theGameMuseumV33','theGameMuseumV32'].forEach(key => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      const data = JSON.parse(raw);
      apply(data);
      localStorage.setItem(key, JSON.stringify(data));
    } catch (_) {}
  });
})();
