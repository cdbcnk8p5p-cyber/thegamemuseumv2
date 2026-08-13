// The Game Museum — data integrity repair.
// Runs after catalogue update scripts and before app.js so corrupted local storage
// cannot inflate collection or wishlist totals.
(() => {
  const aliases = new Map([
    ['ds','Nintendo DS'],['nintendo ds','Nintendo DS'],
    ['switch','Nintendo Switch'],['nintendo switch','Nintendo Switch'],
    ['wii','Nintendo Wii'],['nintendo wii','Nintendo Wii'],
    ['mega drive','Sega Mega Drive'],['sega mega drive','Sega Mega Drive'],
    ['ps1','PlayStation 1'],['playstation','PlayStation 1'],['playstation 1','PlayStation 1'],
    ['ps2','PlayStation 2'],['playstation 2','PlayStation 2'],
    ['ps3','PlayStation 3'],['playstation 3','PlayStation 3'],
    ['ps4','PlayStation 4'],['playstation 4','PlayStation 4'],
    ['ps5','PlayStation 5'],['playstation 5','PlayStation 5'],
    ['psp','PlayStation Portable'],['playstation portable','PlayStation Portable'],
    ['ps vita','PlayStation Vita'],['psvita','PlayStation Vita'],['playstation vita','PlayStation Vita'],
    ['xbox','Xbox Original'],['original xbox','Xbox Original'],['xbox original','Xbox Original'],
    ['xbox 360','Xbox 360'],['xbox one','Xbox One'],
    ['xbox series x','Xbox Series X/S'],['xbox series s','Xbox Series X/S'],
    ['xbox series x/s','Xbox Series X/S'],['xbox series s/x','Xbox Series X/S']
  ]);

  const clean = value => String(value ?? '').trim().replace(/\s+/g,' ');
  const normal = value => clean(value).toLowerCase();
  const canonicalPlatform = value => {
    const raw = clean(value);
    return raw ? (aliases.get(raw.toLowerCase()) || raw) : raw;
  };
  const blank = value => value === undefined || value === null || value === '';

  function mergeRecord(kept, duplicate){
    // Preserve the first record's position/order, but rescue useful metadata from
    // a duplicate if the first record is missing it.
    Object.keys(duplicate || {}).forEach(key => {
      if (blank(kept[key]) && !blank(duplicate[key])) kept[key] = duplicate[key];
    });
    return kept;
  }

  const gameKey = game => [
    normal(game?.title),
    normal(canonicalPlatform(game?.platform)),
    normal(game?.edition || 'Standard'),
    normal(game?.category || 'Main Collection')
  ].join('|');

  // Wishlist titles already contain distinctions such as "Standard Edition",
  // so title + platform safely preserves intentional targets while removing repeats.
  const wishKey = item => [
    normal(item?.title),
    normal(canonicalPlatform(item?.platform))
  ].join('|');

  function dedupe(items, keyFn){
    const seen = new Map();
    const output = [];
    (items || []).forEach(item => {
      if (!item || typeof item !== 'object') return;
      if (item.platform) item.platform = canonicalPlatform(item.platform);
      const key = keyFn(item);
      if (!key || key.startsWith('|')) { output.push(item); return; }
      if (seen.has(key)) mergeRecord(seen.get(key), item);
      else { seen.set(key, item); output.push(item); }
    });
    return output;
  }

  function repair(data, seedIds){
    if (!data || typeof data !== 'object') return data;
    if (Array.isArray(data.games)) {
      data.games = dedupe(data.games, gameKey);
      // If an older update created the same game under a different ID, align it
      // with the canonical seed ID so app.js does not re-add the seed copy.
      data.games.forEach(game => {
        const seedId = seedIds?.get(gameKey(game));
        if (seedId) game.id = seedId;
      });
      data.games = dedupe(data.games, gameKey);
    }
    if (Array.isArray(data.wishlist)) data.wishlist = dedupe(data.wishlist, wishKey);
    return data;
  }

  const seed = window.MUSEUM_SEED;
  if (seed) repair(seed);
  const seedIds = new Map((seed?.games || []).map(game => [gameKey(game), game.id]));

  // Repair every historical Museum storage key, including future versioned keys.
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith('theGameMuseumV')) continue;
    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const data = JSON.parse(raw);
      repair(data, seedIds);
      localStorage.setItem(key, JSON.stringify(data));
    } catch (_) {}
  }

  window.MUSEUM_DATA_INTEGRITY = { repair, gameKey, wishKey, canonicalPlatform };
})();
