// The Game Museum — Xbox One Call of Duty: Ghosts shelf correction.
// The owned copy is a Limited Edition, so it is excluded from the Main Shelf.
// A Standard Edition Xbox One copy remains a wishlist target.
(() => {
  if (window.__MUSEUM_XBOX_ONE_GHOSTS_FIX__) return;
  window.__MUSEUM_XBOX_ONE_GHOSTS_FIX__ = true;

  const PLATFORM = 'Xbox One';
  const TITLE = 'Call of Duty: Ghosts';
  const COVER = './assets/covers/call-of-duty-ghosts-xbox-one-standard.webp';
  const norm = value => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
  const canonical = value => typeof window.MUSEUM_CANONICAL_PLATFORM === 'function'
    ? window.MUSEUM_CANONICAL_PLATFORM(value)
    : String(value || '').trim();

  const isOwnedGhosts = game => game && canonical(game.platform) === PLATFORM && norm(game.title) === norm(TITLE);
  const isWishlistGhosts = item => item && canonical(item.platform) === PLATFORM && norm(item.title) === norm(TITLE);

  function patch(data, coverReady = false) {
    if (!data || typeof data !== 'object') return false;
    let changed = false;
    data.games ||= [];
    data.wishlist ||= [];

    const beforeGames = data.games.length;
    data.games = data.games.filter(game => !isOwnedGhosts(game));
    if (data.games.length !== beforeGames) changed = true;

    let wish = data.wishlist.find(isWishlistGhosts);
    if (!wish) {
      wish = {
        order: 'Shelf',
        platform: PLATFORM,
        title: TITLE,
        edition: 'Standard',
        type: 'Shelf Completion',
        reason: 'Standard Xbox One copy needed; current physical copy is a Limited Edition and is excluded from the Main Shelf.',
        status: 'Missing'
      };
      data.wishlist.push(wish);
      changed = true;
    }

    const desired = {
      platform: PLATFORM,
      title: TITLE,
      edition: 'Standard',
      type: 'Shelf Completion',
      reason: 'Standard Xbox One copy needed; current physical copy is a Limited Edition and is excluded from the Main Shelf.',
      status: 'Missing'
    };
    Object.entries(desired).forEach(([key, value]) => {
      if (wish[key] !== value) { wish[key] = value; changed = true; }
    });
    if (coverReady && wish.image !== COVER) { wish.image = COVER; changed = true; }

    // Collapse any legacy duplicate wishlist target without touching other platforms.
    let seen = false;
    data.wishlist = data.wishlist.filter(item => {
      if (!isWishlistGhosts(item)) return true;
      if (seen) { changed = true; return false; }
      seen = true;
      return true;
    });

    return changed;
  }

  function assetReady() {
    return new Promise(resolve => {
      const image = new Image();
      image.onload = () => resolve(true);
      image.onerror = () => resolve(false);
      image.src = `${COVER}?museumGhostsStandard=1`;
    });
  }

  async function patchEverywhere() {
    const coverReady = await assetReady();
    try { if (window.MUSEUM_SEED) patch(window.MUSEUM_SEED, coverReady); } catch (_) {}
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key || !key.startsWith('theGameMuseumV')) continue;
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        const data = JSON.parse(raw);
        if (patch(data, coverReady)) localStorage.setItem(key, JSON.stringify(data));
      }
    } catch (_) {}
    try {
      if (typeof state !== 'undefined' && patch(state, coverReady) && typeof save === 'function') save();
    } catch (_) {}

    try { if (typeof collection === 'function') collection(); } catch (_) {}
    try { if (typeof wishlist === 'function') wishlist(); } catch (_) {}
    try { if (typeof dashboard === 'function') dashboard(); } catch (_) {}
    try { document.getElementById('wishFamilyFilter')?.dispatchEvent(new Event('change', {bubbles:true})); } catch (_) {}
  }

  document.getElementById('resetBtn')?.addEventListener('click', () => setTimeout(patchEverywhere, 220));
  document.getElementById('importFile')?.addEventListener('change', () => setTimeout(patchEverywhere, 520));
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(patchEverywhere, 120), {once:true});
  else setTimeout(patchEverywhere, 120);
})();
