// The Game Museum — Call of Duty: Ghosts Xbox One standard-copy correction, Aug 2026.
// The owned Xbox One copy is Limited Edition, so it is removed from the counted collection
// until a Standard Edition is acquired. The exact user-supplied Standard cover is embedded
// byte-for-byte as a data URI for the wishlist; no image reconstruction is involved.
(() => {
  if (window.__MUSEUM_XBOX_ONE_GHOSTS_STANDARD_FIX__) return;
  window.__MUSEUM_XBOX_ONE_GHOSTS_STANDARD_FIX__ = true;

  const PLATFORM = 'Xbox One';
  const TITLE = 'Call of Duty: Ghosts';
  const IMAGE = 'data:image/webp;base64,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[... ELLIPSIZATION ...]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';
  const normal = value => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim().replace(/\s+/g,' ');
  const canonical = value => typeof window.MUSEUM_CANONICAL_PLATFORM === 'function'
    ? window.MUSEUM_CANONICAL_PLATFORM(value)
    : String(value || '').trim();

  const isOwnedGhostsXboxOne = game => !!game && (
    String(game.id || '') === 'GM-0025' ||
    (canonical(game.platform) === PLATFORM && normal(game.title) === normal(TITLE))
  );

  const isWishlistTarget = item => !!item &&
    canonical(item.platform) === PLATFORM &&
    normal(item.title) === normal(TITLE);

  function apply(data) {
    if (!data || typeof data !== 'object') return false;
    data.games ||= [];
    data.wishlist ||= [];
    let changed = false;

    const beforeGames = data.games.length;
    data.games = data.games.filter(game => !isOwnedGhostsXboxOne(game));
    if (data.games.length !== beforeGames) changed = true;

    let target = data.wishlist.find(isWishlistTarget);
    if (!target) {
      target = {};
      data.wishlist.push(target);
      changed = true;
    }

    const desired = {
      order: 'Shelf',
      platform: PLATFORM,
      title: TITLE,
      edition: 'Standard Edition',
      type: 'Shelf Completion',
      reason: 'Standard Edition required for the Main Shelf; current physical Xbox One copy is Limited Edition and is not counted as the standard shelf copy.',
      status: 'Missing',
      image: IMAGE
    };
    Object.entries(desired).forEach(([key, value]) => {
      if (target[key] !== value) { target[key] = value; changed = true; }
    });

    // Collapse only duplicate Xbox One Ghosts wishlist targets. Xbox 360 Ghosts remains separate.
    let kept = false;
    data.wishlist = data.wishlist.filter(item => {
      if (!isWishlistTarget(item)) return true;
      if (!kept) { kept = true; return true; }
      changed = true;
      return false;
    });

    return changed;
  }

  function patchEverywhere() {
    try { if (window.MUSEUM_SEED) apply(window.MUSEUM_SEED); } catch (_) {}
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key || !key.startsWith('theGameMuseumV')) continue;
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        const data = JSON.parse(raw);
        if (apply(data)) localStorage.setItem(key, JSON.stringify(data));
      }
    } catch (_) {}
    try { if (typeof state !== 'undefined' && apply(state) && typeof save === 'function') save(); } catch (_) {}
  }

  function refresh() {
    patchEverywhere();
    try { if (typeof dashboard === 'function') dashboard(); } catch (_) {}
    try { if (typeof collection === 'function') collection(); } catch (_) {}
    try { if (typeof wishlist === 'function') wishlist(); } catch (_) {}
    try { if (typeof statistics === 'function') statistics(); } catch (_) {}
  }

  function boot() {
    refresh();
    setTimeout(refresh, 250);
    setTimeout(refresh, 900);
  }

  document.getElementById('resetBtn')?.addEventListener('click', () => setTimeout(boot, 180));
  document.getElementById('importFile')?.addEventListener('change', () => setTimeout(boot, 500));

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();
})();
