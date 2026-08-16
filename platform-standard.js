// Museum-wide platform naming and ordering standard.
(() => {
  const PLATFORM_ORDER = [
    'Nintendo DS',
    'Nintendo Switch',
    'Nintendo Wii',
    'Sega Mega Drive',
    'PlayStation 1',
    'PlayStation 2',
    'PlayStation 3',
    'PlayStation 4',
    'PlayStation 5',
    'PlayStation Portable',
    'PlayStation Vita',
    'Xbox Original',
    'Xbox 360',
    'Xbox One',
    'Xbox Cross Generation',
    'Xbox Series X/S'
  ];

  const aliases = new Map([
    ['ds', 'Nintendo DS'], ['nintendo ds', 'Nintendo DS'],
    ['switch', 'Nintendo Switch'], ['nintendo switch', 'Nintendo Switch'],
    ['wii', 'Nintendo Wii'], ['nintendo wii', 'Nintendo Wii'],
    ['mega drive', 'Sega Mega Drive'], ['sega mega drive', 'Sega Mega Drive'],
    ['ps1', 'PlayStation 1'], ['playstation', 'PlayStation 1'], ['playstation 1', 'PlayStation 1'],
    ['ps2', 'PlayStation 2'], ['playstation 2', 'PlayStation 2'],
    ['ps3', 'PlayStation 3'], ['playstation 3', 'PlayStation 3'],
    ['ps4', 'PlayStation 4'], ['playstation 4', 'PlayStation 4'],
    ['ps5', 'PlayStation 5'], ['playstation 5', 'PlayStation 5'],
    ['psp', 'PlayStation Portable'], ['playstation portable', 'PlayStation Portable'],
    ['ps vita', 'PlayStation Vita'], ['psvita', 'PlayStation Vita'], ['playstation vita', 'PlayStation Vita'],
    ['xbox', 'Xbox Original'], ['original xbox', 'Xbox Original'], ['xbox original', 'Xbox Original'],
    ['xbox 360', 'Xbox 360'],
    ['xbox one', 'Xbox One'],
    ['xbox cross generation', 'Xbox Cross Generation'], ['xbox cross-generation', 'Xbox Cross Generation'], ['xbox cross gen', 'Xbox Cross Generation'], ['xbox cross-gen', 'Xbox Cross Generation'],
    ['xbox series x', 'Xbox Series X/S'], ['xbox series s', 'Xbox Series X/S'],
    ['xbox series x/s', 'Xbox Series X/S'], ['xbox series s/x', 'Xbox Series X/S']
  ]);

  const canonical = value => {
    const raw = String(value || '').trim();
    return raw ? (aliases.get(raw.toLowerCase()) || raw) : raw;
  };

  const dedupe = (items, keyFn) => {
    const map = new Map();
    items.forEach(item => map.set(keyFn(item), item));
    return [...map.values()];
  };

  const normaliseData = data => {
    if (!data || typeof data !== 'object') return false;
    let changed = false;

    if (Array.isArray(data.games)) {
      data.games.forEach(item => {
        if (!item?.platform) return;
        const next = canonical(item.platform);
        if (next !== item.platform) { item.platform = next; changed = true; }
      });
      const before = data.games.length;
      data.games = dedupe(data.games, g => g?.id || `${g?.title || ''}|${g?.platform || ''}|${g?.category || ''}`);
      if (data.games.length !== before) changed = true;
    }

    if (Array.isArray(data.wishlist)) {
      data.wishlist.forEach(item => {
        if (!item?.platform) return;
        const next = canonical(item.platform);
        if (next !== item.platform) { item.platform = next; changed = true; }
      });
      const before = data.wishlist.length;
      data.wishlist = dedupe(data.wishlist, w => `${w?.platform || ''}|${w?.title || ''}`);
      if (data.wishlist.length !== before) changed = true;
    }

    return changed;
  };

  if (window.MUSEUM_SEED) normaliseData(window.MUSEUM_SEED);

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith('theGameMuseumV')) continue;
    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const data = JSON.parse(raw);
      if (normaliseData(data)) localStorage.setItem(key, JSON.stringify(data));
    } catch (_) {}
  }

  const rank = name => {
    const i = PLATFORM_ORDER.indexOf(name);
    return i === -1 ? PLATFORM_ORDER.length : i;
  };

  const tidyPlatformFilter = select => {
    if (!select) return;
    const all = [...select.options].find(o => o.value === '');
    const selected = select.value;
    const sorted = [...select.options]
      .filter(o => o.value !== '')
      .sort((a, b) => rank(a.value) - rank(b.value) || a.textContent.localeCompare(b.textContent));
    const current = [...select.options].filter(o => o.value !== '').map(o => o.value).join('|');
    const desired = sorted.map(o => o.value).join('|');
    if (current === desired) return;
    select.replaceChildren(...(all ? [all] : []), ...sorted);
    if ([...select.options].some(o => o.value === selected)) select.value = selected;
  };

  const select = document.getElementById('platformFilter');
  if (select) {
    const observer = new MutationObserver(() => tidyPlatformFilter(select));
    observer.observe(select, { childList: true });
    queueMicrotask(() => tidyPlatformFilter(select));
  }

  window.MUSEUM_PLATFORM_ORDER = PLATFORM_ORDER;
  window.MUSEUM_CANONICAL_PLATFORM = canonical;
})();
