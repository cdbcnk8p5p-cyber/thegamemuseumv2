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
    'Xbox Series X/S'
  ];

  const aliases = new Map([
    ['ds', 'Nintendo DS'],
    ['nintendo ds', 'Nintendo DS'],
    ['switch', 'Nintendo Switch'],
    ['nintendo switch', 'Nintendo Switch'],
    ['wii', 'Nintendo Wii'],
    ['nintendo wii', 'Nintendo Wii'],
    ['mega drive', 'Sega Mega Drive'],
    ['sega mega drive', 'Sega Mega Drive'],
    ['ps1', 'PlayStation 1'],
    ['playstation', 'PlayStation 1'],
    ['playstation 1', 'PlayStation 1'],
    ['ps2', 'PlayStation 2'],
    ['playstation 2', 'PlayStation 2'],
    ['ps3', 'PlayStation 3'],
    ['playstation 3', 'PlayStation 3'],
    ['ps4', 'PlayStation 4'],
    ['playstation 4', 'PlayStation 4'],
    ['ps5', 'PlayStation 5'],
    ['playstation 5', 'PlayStation 5'],
    ['psp', 'PlayStation Portable'],
    ['playstation portable', 'PlayStation Portable'],
    ['ps vita', 'PlayStation Vita'],
    ['psvita', 'PlayStation Vita'],
    ['playstation vita', 'PlayStation Vita'],
    ['xbox', 'Xbox Original'],
    ['original xbox', 'Xbox Original'],
    ['xbox original', 'Xbox Original'],
    ['xbox 360', 'Xbox 360'],
    ['xbox one', 'Xbox One'],
    ['xbox series x', 'Xbox Series X/S'],
    ['xbox series s', 'Xbox Series X/S'],
    ['xbox series x/s', 'Xbox Series X/S'],
    ['xbox series s/x', 'Xbox Series X/S']
  ]);

  const canonical = value => {
    const raw = String(value || '').trim();
    if (!raw) return raw;
    return aliases.get(raw.toLowerCase()) || raw;
  };

  const normaliseData = data => {
    if (!data || typeof data !== 'object') return false;
    let changed = false;
    for (const key of ['games', 'wishlist']) {
      if (!Array.isArray(data[key])) continue;
      data[key].forEach(item => {
        if (!item || !item.platform) return;
        const next = canonical(item.platform);
        if (next !== item.platform) {
          item.platform = next;
          changed = true;
        }
      });
    }
    return changed;
  };

  // Normalise the built-in seed before app.js reads it.
  if (window.MUSEUM_SEED) normaliseData(window.MUSEUM_SEED);

  // Normalise any existing on-device museum data so old abbreviations disappear everywhere.
  ['theGameMuseumV352', 'theGameMuseumV35', 'theGameMuseumV34'].forEach(key => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      const data = JSON.parse(raw);
      if (normaliseData(data)) localStorage.setItem(key, JSON.stringify(data));
    } catch (_) {}
  });

  const rank = name => {
    const i = PLATFORM_ORDER.indexOf(name);
    return i === -1 ? PLATFORM_ORDER.length : i;
  };

  const tidyPlatformFilter = select => {
    if (!select) return;
    const all = [...select.options].find(o => o.value === '');
    const options = [...select.options].filter(o => o.value !== '');
    const sorted = options.sort((a, b) => {
      const ar = rank(a.value), br = rank(b.value);
      return ar - br || a.textContent.localeCompare(b.textContent);
    });
    const current = [...select.options].filter(o => o.value !== '').map(o => o.value).join('|');
    const desired = sorted.map(o => o.value).join('|');
    if (current === desired) return;
    const selected = select.value;
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
