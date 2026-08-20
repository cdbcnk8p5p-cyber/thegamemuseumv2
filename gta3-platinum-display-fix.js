// The Game Museum — authoritative Collection recovery layer.
// Keeps the modern shelf UI, Display Shelf classification and Collection Shelf badges stable.
(() => {
  if (window.__MUSEUM_COLLECTION_RECOVERY_V2__) return;
  window.__MUSEUM_COLLECTION_RECOVERY_V2__ = true;

  const STANDARD = 'Standard Shelf';
  const PLATINUM = 'PlayStation Platinum';
  const normal = value => String(value || '').trim().toLowerCase();
  const canonical = value => typeof window.MUSEUM_CANONICAL_PLATFORM === 'function'
    ? window.MUSEUM_CANONICAL_PLATFORM(value)
    : String(value || '').trim();

  const isGta3Platinum = game => String(game?.id || '') === 'GM-0175' || (
    normal(game?.title) === 'grand theft auto iii' &&
    canonical(game?.platform) === 'PlayStation 2' &&
    (normal(game?.edition).includes('platinum') || normal(game?.shelfSection).includes('platinum'))
  );

  const isTombRaider3 = game => String(game?.id || '') === 'GM-0134' || (
    normal(game?.title) === 'tomb raider iii' && canonical(game?.platform) === 'PlayStation 1'
  );

  const isNfsDisplay = game => String(game?.id || '') === 'GM-0061' || (
    canonical(game?.platform) === 'Xbox 360' &&
    normal(game?.title).includes('need for speed') &&
    normal(game?.title).includes('most wanted')
  );

  const isPspPlatinum = game => canonical(game?.platform) === 'PlayStation Portable' && [
    'gangs of london',
    'grand theft auto: vice city stories'
  ].includes(normal(game?.title));

  function patch(data) {
    if (!data || !Array.isArray(data.games)) return false;
    let changed = false;

    data.games.forEach(game => {
      if (isTombRaider3(game)) {
        if (game.edition !== 'Platinum') { game.edition = 'Platinum'; changed = true; }
        if (game.shelfSection !== PLATINUM) { game.shelfSection = PLATINUM; changed = true; }
        if (game.category !== 'Main Collection') { game.category = 'Main Collection'; changed = true; }
        if (game.display !== 'No') { game.display = 'No'; changed = true; }
      }

      // GTA III Platinum is intentionally a Display Shelf copy.
      if (isGta3Platinum(game)) {
        if (game.edition !== 'Platinum') { game.edition = 'Platinum'; changed = true; }
        if (game.shelfSection !== PLATINUM) { game.shelfSection = PLATINUM; changed = true; }
        if (game.category !== 'Display Gallery') { game.category = 'Display Gallery'; changed = true; }
        if (game.display !== 'Yes') { game.display = 'Yes'; changed = true; }
      }

      if (isNfsDisplay(game) && game.shop !== 'CEX - Livingston') {
        game.shop = 'CEX - Livingston';
        changed = true;
      }

      if (isPspPlatinum(game)) {
        if (game.edition !== 'Platinum') { game.edition = 'Platinum'; changed = true; }
        if (game.shelfSection !== PLATINUM) { game.shelfSection = PLATINUM; changed = true; }
        if (game.category !== 'Main Collection') { game.category = 'Main Collection'; changed = true; }
        if (game.display !== 'No') { game.display = 'No'; changed = true; }
      }
    });
    return changed;
  }

  function patchEverywhere() {
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

  function shelfOf(game) {
    try {
      if (typeof window.MUSEUM_COLLECTION_SHELF === 'function') return window.MUSEUM_COLLECTION_SHELF(game) || STANDARD;
    } catch (_) {}
    const raw = String(game?.shelfSection || '').trim();
    if (raw) return raw;
    return normal(game?.edition).includes('platinum') ? PLATINUM : STANDARD;
  }

  function shelfClass(section) {
    const s = normal(section);
    if (s.includes('platinum')) return 'platinum';
    if (s.includes('essential')) return 'essentials';
    if (s.includes('playstation hits')) return 'ps-hits';
    if (s.includes('xbox classic')) return 'xbox-classics';
    if (s.includes('nintendo select')) return 'nintendo-selects';
    if (s.includes("player's choice") || s.includes('players choice')) return 'nintendo-choice';
    return 'other';
  }

  let badgeRepairing = false;
  function repairShelfBadges() {
    if (badgeRepairing) return;
    badgeRepairing = true;
    try {
      const games = typeof state !== 'undefined' && Array.isArray(state?.games) ? state.games : [];
      document.querySelectorAll('#collectionGrid .game-card[data-id]').forEach(cardEl => {
        const game = games.find(item => String(item.id) === String(cardEl.dataset.id));
        if (!game) return;
        const section = shelfOf(game);
        const badges = [...cardEl.querySelectorAll('.shelf-section-badge')];
        badges.forEach(badge => badge.remove());
        if (!section || section === STANDARD) return;
        const row = cardEl.querySelector('.badges');
        if (!row) return;
        const badge = document.createElement('span');
        badge.className = `badge shelf-section-badge ${shelfClass(section)}`;
        badge.textContent = section;
        row.appendChild(badge);
      });
    } finally {
      badgeRepairing = false;
    }
  }

  function loadFreshScript(id, src, onload) {
    if (document.getElementById(id)) return;
    const script = document.createElement('script');
    script.id = id;
    script.src = src;
    script.onload = () => { try { onload?.(); } catch (_) {} };
    document.head.appendChild(script);
  }

  function recoverModernUi() {
    const missingModernUi = !document.getElementById('shelfSelector') || !document.getElementById('museumFilterControls');
    if (missingModernUi) {
      loadFreshScript(
        'museum-platform-recovery-script',
        './platform-standard.js?recovery=20260820-2',
        () => setTimeout(recoverCollectionShelves, 120)
      );
    } else {
      recoverCollectionShelves();
    }
  }

  function recoverCollectionShelves() {
    if (!document.getElementById('museumFilterControls')) return;
    if (!document.getElementById('shelfSectionWrap')) {
      loadFreshScript(
        'museum-shelf-recovery-script',
        './shelf-sections.js?recovery=20260820-3',
        () => setTimeout(authoritativeRefresh, 180)
      );
    }
  }

  function authoritativeRefresh() {
    patchEverywhere();
    try { if (typeof collection === 'function') collection(); } catch (_) {}
    try { if (typeof dashboard === 'function') dashboard(); } catch (_) {}
    try {
      const category = document.getElementById('categoryFilter');
      category?.dispatchEvent(new Event('change', {bubbles:true}));
    } catch (_) {}
    setTimeout(repairShelfBadges, 0);
  }

  function attachGridGuard() {
    const grid = document.getElementById('collectionGrid');
    if (!grid || grid.dataset.museumRecoveryObserved === 'yes') return;
    grid.dataset.museumRecoveryObserved = 'yes';
    new MutationObserver(() => setTimeout(repairShelfBadges, 0)).observe(grid, {childList:true, subtree:true});
  }

  function boot() {
    recoverModernUi();
    attachGridGuard();
    // Win after all legacy shelf/data migrations and their delayed retries have settled.
    setTimeout(authoritativeRefresh, 120);
    setTimeout(() => { recoverModernUi(); attachGridGuard(); authoritativeRefresh(); }, 500);
    setTimeout(() => { recoverModernUi(); attachGridGuard(); authoritativeRefresh(); }, 1200);
    setTimeout(authoritativeRefresh, 2200);
  }

  document.getElementById('resetBtn')?.addEventListener('click', () => setTimeout(authoritativeRefresh, 250));
  document.getElementById('importFile')?.addEventListener('change', () => setTimeout(authoritativeRefresh, 550));

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, {once:true});
  else boot();
})();
