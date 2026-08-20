// The Game Museum — PSP + PS Vita catalogue audit, August 2026.
// Exact user-supplied display covers + physical-copy archive images.
(() => {
  const PSP = 'PlayStation Portable';
  const VITA = 'PlayStation Vita';
  const STANDARD = 'Standard Shelf';
  const PLATINUM = 'PlayStation Platinum';
  const SENTINEL = './assets/covers/wall-e-psp.webp';

  const RECORDS = [
    {id:'GM-PSP-WALLE', title:'WALL-E', aliases:['wall e','walle','disney pixar wall e'], platform:PSP, edition:'Standard', shelfSection:STANDARD, series:'', image:'./assets/covers/wall-e-psp.webp', archiveImage:'./assets/archive/wall-e-psp-original.jpeg'},
    {id:'GM-PSP-FIFA11', title:'FIFA 11', aliases:['fifa 11'], platform:PSP, edition:'Standard', shelfSection:STANDARD, series:'FIFA / EA Sports FC', image:'./assets/covers/fifa-11-psp.jpeg', archiveImage:'./assets/archive/fifa-11-psp-original.jpeg'},
    {id:'GM-PSP-GANGS-LONDON', title:'Gangs of London', aliases:['gangs of london'], platform:PSP, edition:'Platinum', shelfSection:PLATINUM, series:'', image:'./assets/covers/gangs-of-london-platinum-psp.jpeg', archiveImage:'./assets/archive/gangs-of-london-platinum-psp-original.jpeg'},
    {id:'GM-PSP-GTA-LCS', title:'Grand Theft Auto: Liberty City Stories', aliases:['grand theft auto liberty city stories','gta liberty city stories'], platform:PSP, edition:'Standard', shelfSection:STANDARD, series:'Grand Theft Auto', image:'./assets/covers/grand-theft-auto-liberty-city-stories-psp.webp', archiveImage:'./assets/archive/grand-theft-auto-liberty-city-stories-psp-original.jpeg'},
    {id:'GM-PSP-GTA-VCS', title:'Grand Theft Auto: Vice City Stories', aliases:['grand theft auto vice city stories','gta vice city stories'], platform:PSP, edition:'Platinum', shelfSection:PLATINUM, series:'Grand Theft Auto', image:'./assets/covers/grand-theft-auto-vice-city-stories-platinum-psp.jpeg', archiveImage:'./assets/archive/grand-theft-auto-vice-city-stories-platinum-psp-original.jpeg'},
    {id:'GM-PSP-HP-GOF', title:'Harry Potter and the Goblet of Fire', aliases:['harry potter and the goblet of fire','harry potter goblet of fire'], platform:PSP, edition:'Standard', shelfSection:STANDARD, series:'Harry Potter', image:'./assets/covers/harry-potter-and-the-goblet-of-fire-psp.webp', archiveImage:'./assets/archive/harry-potter-and-the-goblet-of-fire-psp-original.jpeg'},
    {id:'GM-PSP-TDU', title:'Test Drive Unlimited', aliases:['test drive unlimited'], platform:PSP, edition:'Standard', shelfSection:STANDARD, series:'Test Drive', image:'./assets/covers/test-drive-unlimited-psp.webp', archiveImage:'./assets/archive/test-drive-unlimited-psp-original.jpeg'},
    {id:'GM-VITA-FIFA13', title:'FIFA 13', aliases:['fifa 13'], platform:VITA, edition:'Standard', shelfSection:STANDARD, series:'FIFA / EA Sports FC', image:'./assets/covers/fifa-13-ps-vita.jpeg', archiveImage:'./assets/archive/fifa-13-ps-vita-original.jpeg'},
    {id:'GM-VITA-NFS-MW2012', title:'Need for Speed: Most Wanted (2012)', aliases:['need for speed most wanted','need for speed most wanted 2012','nfs most wanted'], platform:VITA, edition:'Standard', shelfSection:STANDARD, series:'Need for Speed', image:'./assets/covers/need-for-speed-most-wanted-2012-ps-vita.jpeg', archiveImage:'./assets/archive/need-for-speed-most-wanted-2012-ps-vita-original.jpeg'}
  ];

  const norm = value => String(value || '').toLowerCase().replace(/&/g,' and ').replace(/[^a-z0-9]+/g,' ').trim();
  const canonicalPlatform = value => {
    if (typeof window.MUSEUM_CANONICAL_PLATFORM === 'function') return window.MUSEUM_CANONICAL_PLATFORM(value);
    const p = norm(value);
    if (p === 'psp' || p === 'playstation portable') return PSP;
    if (p === 'ps vita' || p === 'vita' || p === 'playstation vita') return VITA;
    return String(value || '').trim();
  };

  function matches(record, game) {
    if (!game || canonicalPlatform(game.platform) !== record.platform) return false;
    if (record.id && String(game.id || '') === record.id) return true;
    const title = norm(game.title);
    return record.aliases.some(alias => title === norm(alias));
  }

  function applyRecord(game, record) {
    const id = game.id || record.id;
    Object.assign(game, {
      id,
      title:record.title,
      platform:record.platform,
      edition:record.edition,
      category:'Main Collection',
      series:record.series,
      status:'Owned',
      display:'No',
      shop:'',
      date:'',
      price:null,
      image:record.image,
      archiveImage:record.archiveImage,
      shelfSection:record.shelfSection,
      notes:`Purchase details not recorded. Exact user-supplied ${record.edition === 'Platinum' ? 'Platinum ' : ''}cover used for the Museum display; physical-copy photo preserved in the archive.`
    });
    return game;
  }

  function patchData(data) {
    if (!data || !Array.isArray(data.games)) return false;
    let changed = false;
    RECORDS.forEach(record => {
      const found = data.games.filter(game => matches(record, game));
      let target = found[0];
      if (!target) {
        target = {id:record.id};
        data.games.push(target);
        changed = true;
      }
      const before = JSON.stringify(target);
      applyRecord(target, record);
      if (before !== JSON.stringify(target)) changed = true;
      if (found.length > 1) {
        const duplicates = new Set(found.slice(1));
        data.games = data.games.filter(game => !duplicates.has(game));
        changed = true;
      }
    });
    return changed;
  }

  function patchEverywhere() {
    try { if (window.MUSEUM_SEED) patchData(window.MUSEUM_SEED); } catch (_) {}
    try {
      for (let i=0;i<localStorage.length;i++) {
        const key = localStorage.key(i);
        if (!key || !key.startsWith('theGameMuseumV')) continue;
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        const data = JSON.parse(raw);
        if (patchData(data)) localStorage.setItem(key, JSON.stringify(data));
      }
    } catch (_) {}
    try { if (typeof state !== 'undefined' && patchData(state) && typeof save === 'function') save(); } catch (_) {}
  }

  function refresh() {
    patchEverywhere();
    try { if (typeof platformFilter === 'function') platformFilter(); } catch (_) {}
    try { if (typeof collection === 'function') collection(); } catch (_) {}
    try { if (typeof dashboard === 'function') dashboard(); } catch (_) {}
    try { document.getElementById('platformFilter')?.dispatchEvent(new Event('change',{bubbles:true})); } catch (_) {}
  }

  function assetsReady() {
    return new Promise(resolve => {
      const image = new Image();
      image.onload = () => resolve(true);
      image.onerror = () => resolve(false);
      image.src = `${SENTINEL}?museumHandheldAudit=1`;
    });
  }

  async function boot() {
    if (!(await assetsReady())) return;
    refresh();
    setTimeout(refresh,180);
    setTimeout(refresh,700);
  }

  document.getElementById('resetBtn')?.addEventListener('click', () => setTimeout(boot,180));
  document.getElementById('importFile')?.addEventListener('change', () => setTimeout(boot,450));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();
})();
