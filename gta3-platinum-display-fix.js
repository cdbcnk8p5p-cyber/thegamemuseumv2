// GTA III Platinum is a Display Shelf copy with its own PlayStation Platinum Collection Shelf.
(() => {
  const canonical = value => typeof window.MUSEUM_CANONICAL_PLATFORM === 'function'
    ? window.MUSEUM_CANONICAL_PLATFORM(value)
    : String(value || '').trim();
  const key = value => String(value || '').trim().toLowerCase();

  function patch(data) {
    if (!data || !Array.isArray(data.games)) return false;
    let changed = false;
    data.games.forEach(game => {
      const isGta3Platinum = String(game?.id || '') === 'GM-0175' || (
        key(game?.title) === 'grand theft auto iii' &&
        canonical(game?.platform) === 'PlayStation 2' &&
        (key(game?.edition).includes('platinum') || key(game?.shelfSection).includes('platinum'))
      );
      if (!isGta3Platinum) return;
      if (game.edition !== 'Platinum') { game.edition = 'Platinum'; changed = true; }
      if (game.shelfSection !== 'PlayStation Platinum') { game.shelfSection = 'PlayStation Platinum'; changed = true; }
      if (game.category !== 'Display Gallery') { game.category = 'Display Gallery'; changed = true; }
      if (game.display !== 'Yes') { game.display = 'Yes'; changed = true; }
    });
    return changed;
  }

  function apply() {
    try { if (window.MUSEUM_SEED) patch(window.MUSEUM_SEED); } catch (_) {}
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const storageKey = localStorage.key(i);
        if (!storageKey || !storageKey.startsWith('theGameMuseumV')) continue;
        const raw = localStorage.getItem(storageKey);
        if (!raw) continue;
        const data = JSON.parse(raw);
        if (patch(data)) localStorage.setItem(storageKey, JSON.stringify(data));
      }
    } catch (_) {}
    try {
      if (typeof state !== 'undefined' && patch(state) && typeof save === 'function') save();
    } catch (_) {}
  }

  function refresh() {
    apply();
    try { if (typeof collection === 'function') collection(); } catch (_) {}
    try { if (typeof dashboard === 'function') dashboard(); } catch (_) {}
    try {
      const category = document.getElementById('categoryFilter');
      category?.dispatchEvent(new Event('change', {bubbles:true}));
    } catch (_) {}
  }

  const boot = () => {
    // Shelf/collection migration scripts settle first, then this authoritative correction wins.
    setTimeout(refresh, 180);
    setTimeout(refresh, 700);
  };

  document.getElementById('resetBtn')?.addEventListener('click', () => setTimeout(refresh, 180));
  document.getElementById('importFile')?.addEventListener('change', () => setTimeout(refresh, 450));

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();
})();
