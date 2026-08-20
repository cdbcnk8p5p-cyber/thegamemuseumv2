// The Game Museum — Xbox One Call of Duty: Ghosts shelf correction.
// The owned Xbox One copy is Limited Edition, so it does not count as the Standard Main Shelf copy.
// This correction waits for the exact user-supplied Standard Edition wishlist cover before applying.
(() => {
  const PLATFORM = 'Xbox One';
  const COVER = './assets/covers/call-of-duty-ghosts-standard-xbox-one.webp';
  const normal = value => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

  const isOwnedGhosts = game => {
    if (!game) return false;
    const platform = typeof window.MUSEUM_CANONICAL_PLATFORM === 'function'
      ? window.MUSEUM_CANONICAL_PLATFORM(game.platform)
      : String(game.platform || '').trim();
    return platform === PLATFORM && (
      String(game.id || '') === 'GM-0025' || normal(game.title) === 'call of duty ghosts'
    );
  };

  const isWishlistGhosts = item => {
    if (!item) return false;
    const platform = typeof window.MUSEUM_CANONICAL_PLATFORM === 'function'
      ? window.MUSEUM_CANONICAL_PLATFORM(item.platform)
      : String(item.platform || '').trim();
    const title = normal(item.title);
    return platform === PLATFORM && (
      title === 'call of duty ghosts' || title === 'call of duty ghosts standard edition'
    );
  };

  function patch(data) {
    if (!data || typeof data !== 'object') return false;
    data.games ||= [];
    data.wishlist ||= [];
    let changed = false;

    const beforeGames = data.games.length;
    data.games = data.games.filter(game => !isOwnedGhosts(game));
    if (data.games.length !== beforeGames) changed = true;

    let wish = data.wishlist.find(isWishlistGhosts);
    if (!wish) {
      wish = {};
      data.wishlist.push(wish);
      changed = true;
    }

    const desired = {
      order: 'Shelf',
      platform: PLATFORM,
      title: 'Call of Duty: Ghosts Standard Edition',
      edition: 'Standard',
      type: 'Shelf Completion',
      reason: 'The owned Xbox One copy is Limited Edition; a Standard Edition is required for the Main Shelf.',
      status: 'Missing',
      image: COVER
    };
    for (const [key, value] of Object.entries(desired)) {
      if (wish[key] !== value) {
        wish[key] = value;
        changed = true;
      }
    }

    // Collapse any duplicate Xbox One Standard wishlist targets created by older saves/imports.
    let kept = false;
    data.wishlist = data.wishlist.filter(item => {
      if (!isWishlistGhosts(item)) return true;
      if (item === wish && !kept) { kept = true; return true; }
      changed = true;
      return false;
    });

    return changed;
  }

  function patchEverywhere() {
    try { if (window.MUSEUM_SEED) patch(window.MUSEUM_SEED); } catch (_) {}
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key || !key.startsWith('theGameMuseumV')) continue;
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        const data = JSON.parse(raw);
        if (patch(data)) localStorage.setItem(key, JSON.stringify(data));
      }
    } catch (_) {}
    try {
      if (typeof state !== 'undefined' && patch(state) && typeof save === 'function') save();
    } catch (_) {}
  }

  function refresh() {
    patchEverywhere();
    for (const fn of ['dashboard','collection','wishlist','statistics']) {
      try { if (typeof window[fn] === 'function') window[fn](); } catch (_) {}
      try { if (typeof eval(fn) === 'function') eval(fn)(); } catch (_) {}
    }
    try { document.getElementById('wishConsoleFilter')?.dispatchEvent(new Event('change', {bubbles:true})); } catch (_) {}
  }

  function assetsReady() {
    return new Promise(resolve => {
      const image = new Image();
      image.onload = () => resolve(true);
      image.onerror = () => resolve(false);
      image.src = `${COVER}?museumGhostsStandard=1`;
    });
  }

  async function boot() {
    if (!(await assetsReady())) return;
    refresh();
    setTimeout(refresh, 250);
  }

  document.getElementById('resetBtn')?.addEventListener('click', () => setTimeout(boot, 180));
  document.getElementById('importFile')?.addEventListener('change', () => setTimeout(boot, 500));

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();
})();
