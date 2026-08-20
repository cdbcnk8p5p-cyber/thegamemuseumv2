// The Game Museum — PS5 catalogue audit, August 2026.
// Exact user-supplied display covers + physical-copy archive images.
// This migration waits for the packaged image assets before changing records,
// so loading the code before the images cannot create broken cover links.
(() => {
  const PLATFORM = 'PlayStation 5';
  const STANDARD_SHELF = 'Standard Shelf';
  const SENTINEL = './assets/covers/avatar-frontiers-of-pandora-ps5.jpeg';

  const RECORDS = [
    {id:'GM-0004', title:'Avatar: Frontiers of Pandora', aliases:['avatar frontiers of pandora'], edition:'Standard', series:'', shop:'', price:null, date:'', image:'./assets/covers/avatar-frontiers-of-pandora-ps5.jpeg', archiveImage:'./assets/archive/avatar-frontiers-of-pandora-ps5-original.jpeg'},
    {id:'GM-0014', title:'Bus Simulator 21', aliases:['bus simulator 21'], edition:'Gold Edition', series:'', shop:'', price:null, date:'', image:'./assets/covers/bus-simulator-21-gold-edition-ps5.jpeg', archiveImage:'./assets/archive/bus-simulator-21-gold-edition-ps5-original.jpeg'},
    {id:'GM-0006', title:'F1 2021', aliases:['f1 2021','f1 21'], edition:'Standard', series:'Formula One', shop:'CEX', price:8, date:'', image:'./assets/covers/f1-2021-ps5.webp', archiveImage:'./assets/archive/f1-2021-ps5-original.jpeg'},
    {id:'GM-0007', title:'F1 22', aliases:['f1 22'], edition:'Standard', series:'Formula One', shop:'CEX', price:8, date:'', image:'./assets/covers/f1-22-ps5.webp', archiveImage:'./assets/archive/f1-22-ps5-original.jpeg'},
    {id:'GM-0008', title:'F1 23', aliases:['f1 23'], edition:'Standard', series:'Formula One', shop:'CEX', price:15, date:'', image:'./assets/covers/f1-23-ps5.webp', archiveImage:'./assets/archive/f1-23-ps5-original.jpeg'},
    {id:'GM-0009', title:'F1 24', aliases:['f1 24'], edition:'Standard', series:'Formula One', shop:'CEX', price:18, date:'', image:'./assets/covers/f1-24-ps5.webp', archiveImage:'./assets/archive/f1-24-ps5-original.jpeg'},
    {id:'GM-PS5-FIFA21', title:'FIFA 21', aliases:['fifa 21'], edition:'NXT LVL Edition', series:'FIFA / EA Sports FC', shop:'CEX', price:4, date:'', image:'./assets/covers/fifa-21-nxt-lvl-edition-ps5.jpeg', archiveImage:'./assets/archive/fifa-21-nxt-lvl-edition-ps5-original.jpeg'},
    {id:'GM-PS5-FIFA22', title:'FIFA 22', aliases:['fifa 22'], edition:'Standard', series:'FIFA / EA Sports FC', shop:'CEX', price:4, date:'', image:'./assets/covers/fifa-22-ps5.webp', archiveImage:'./assets/archive/fifa-22-ps5-original.jpeg'},
    {id:'GM-PS5-FIFA23', title:'FIFA 23', aliases:['fifa 23'], edition:'Standard', series:'FIFA / EA Sports FC', shop:'CEX', price:6, date:'', image:'./assets/covers/fifa-23-ps5.webp', archiveImage:'./assets/archive/fifa-23-ps5-original.jpeg'},
    {id:'GM-PS5-GTAV', title:'Grand Theft Auto V', aliases:['grand theft auto v','gta v'], edition:'Standard', series:'Grand Theft Auto', shop:'', price:null, date:'', image:'./assets/covers/grand-theft-auto-v-ps5.jpeg', archiveImage:'./assets/archive/grand-theft-auto-v-ps5-original.jpeg'},
    {id:'GM-0002', title:'High on Life', aliases:['high on life'], edition:'Standard', series:'', shop:'CEX', price:42, date:'', image:'./assets/covers/high-on-life-ps5.jpeg', archiveImage:'./assets/archive/high-on-life-ps5-original.jpeg'},
    {id:'GM-0005', title:'Hogwarts Legacy', aliases:['hogwarts legacy'], edition:'Standard', series:'', shop:'', price:null, date:'', image:'./assets/covers/hogwarts-legacy-ps5.jpeg', archiveImage:'./assets/archive/hogwarts-legacy-ps5-original.jpeg'},
    {id:'GM-0013', title:'Saints Row (2022)', aliases:['saints row 2022','saints row'], edition:'Day One Edition', series:'Saints Row', shop:'', price:null, date:'', image:'./assets/covers/saints-row-day-one-edition-ps5.jpeg', archiveImage:'./assets/archive/saints-row-day-one-edition-ps5-original.jpeg'},
    {id:'GM-0001', title:"Marvel's Spider-Man 2", aliases:['marvels spider man 2','spider man 2'], edition:'Standard', series:'', shop:'Forgotten Worlds, Stewarton', price:35, date:'', image:'./assets/covers/marvels-spider-man-2-ps5.jpeg', archiveImage:'./assets/archive/marvels-spider-man-2-ps5-original.jpeg'},
    {id:'GM-0003', title:'Still Wakes the Deep', aliases:['still wakes the deep'], edition:'Standard', series:'', shop:'CEX', price:20, date:'', image:'./assets/covers/still-wakes-the-deep-ps5.jpeg', archiveImage:'./assets/archive/still-wakes-the-deep-ps5-original.jpeg'},
    {id:'GM-0011', title:'The Last of Us Part I', aliases:['the last of us part i'], edition:'Standard', series:'The Last of Us', shop:'CEX Glasgow Union Street', price:30, date:'', image:'./assets/covers/the-last-of-us-part-i-ps5.jpeg', archiveImage:'./assets/archive/the-last-of-us-part-i-ps5-original.jpeg'},
    {id:'GM-0012', title:'The Last of Us Part II Remastered', aliases:['the last of us part ii remastered'], edition:'Standard', series:'The Last of Us', shop:'Smyths Glasgow Fort', price:null, date:'', image:'./assets/covers/the-last-of-us-part-ii-remastered-ps5.jpeg', archiveImage:'./assets/archive/the-last-of-us-part-ii-remastered-ps5-original.jpeg'},
    {id:'GM-0010', title:'WWE 2K23', aliases:['wwe 2k23'], edition:'Standard', series:'', shop:'', price:null, date:'', image:'./assets/covers/wwe-2k23-ps5.jpeg', archiveImage:'./assets/archive/wwe-2k23-ps5-original.jpeg'}
  ];

  const norm = value => String(value || '')
    .toLowerCase()
    .replace(/&/g,' and ')
    .replace(/[^a-z0-9]+/g,' ')
    .trim();

  const canonicalPlatform = value => {
    if (typeof window.MUSEUM_CANONICAL_PLATFORM === 'function') return window.MUSEUM_CANONICAL_PLATFORM(value);
    const p = norm(value);
    return (p === 'ps5' || p === 'playstation 5') ? PLATFORM : String(value || '').trim();
  };

  function match(record, game) {
    if (!game || canonicalPlatform(game.platform) !== PLATFORM) return false;
    if (record.id && String(game.id || '') === record.id) return true;
    const title = norm(game.title);
    return record.aliases.some(alias => title === norm(alias));
  }

  function applyRecord(game, record) {
    const keepId = game.id || record.id;
    Object.assign(game, {
      id: keepId,
      title: record.title,
      platform: PLATFORM,
      edition: record.edition,
      category: 'Main Collection',
      series: record.series,
      status: 'Owned',
      display: 'No',
      shop: record.shop,
      date: record.date,
      price: record.price,
      image: record.image,
      archiveImage: record.archiveImage,
      shelfSection: STANDARD_SHELF
    });
    return game;
  }

  function patchData(data) {
    if (!data || !Array.isArray(data.games)) return false;
    let changed = false;

    RECORDS.forEach(record => {
      const matches = data.games.filter(game => match(record, game));
      let target = matches[0];
      if (!target) {
        target = {id:record.id};
        data.games.push(target); // append: never steals the homepage Latest Catalogue Entry
        changed = true;
      }
      const before = JSON.stringify(target);
      applyRecord(target, record);
      if (JSON.stringify(target) !== before) changed = true;

      // Collapse any legacy duplicate PS5 copies into the authoritative record.
      if (matches.length > 1) {
        const duplicateSet = new Set(matches.slice(1));
        data.games = data.games.filter(game => !duplicateSet.has(game));
        changed = true;
      }
    });
    return changed;
  }

  async function assetsReady() {
    try {
      const response = await fetch(SENTINEL, {cache:'no-store'});
      return response.ok;
    } catch (_) { return false; }
  }

  function patchStorage() {
    try { if (window.MUSEUM_SEED) patchData(window.MUSEUM_SEED); } catch (_) {}
    try {
      for (let i=0; i<localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key || !key.startsWith('theGameMuseumV')) continue;
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        const data = JSON.parse(raw);
        if (patchData(data)) localStorage.setItem(key, JSON.stringify(data));
      }
    } catch (_) {}
    try {
      if (typeof state !== 'undefined' && patchData(state) && typeof save === 'function') save();
    } catch (_) {}
  }

  function rerender() {
    for (const fn of ['dashboard','collection','exhibits','statistics','timeline']) {
      try { if (typeof window[fn] === 'function') window[fn](); } catch (_) {}
      try { if (typeof eval(fn) === 'function') eval(fn)(); } catch (_) {}
    }
    try {
      document.getElementById('familyFilter')?.dispatchEvent(new Event('change',{bubbles:true}));
      document.getElementById('platformFilter')?.dispatchEvent(new Event('change',{bubbles:true}));
    } catch (_) {}
  }

  async function boot() {
    if (!(await assetsReady())) return;
    patchStorage();
    rerender();
    setTimeout(() => { patchStorage(); rerender(); }, 350);
  }

  document.getElementById('resetBtn')?.addEventListener('click', () => setTimeout(boot, 150));
  document.getElementById('importFile')?.addEventListener('change', () => setTimeout(boot, 450));

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(boot, 120), {once:true});
  else setTimeout(boot, 120);
})();
