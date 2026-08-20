// The Game Museum — Collection Shelf naming + PS1 Platinum correction.
// Keeps the existing shelfSection data key for backwards compatibility while
// presenting the concept everywhere as "Collection Shelf".
(() => {
  const STANDARD = 'Standard Shelf';
  const PLATINUM = 'PlayStation Platinum';
  const normal = value => String(value || '').trim().toLowerCase();
  const canonicalPlatform = value => typeof window.MUSEUM_CANONICAL_PLATFORM === 'function'
    ? window.MUSEUM_CANONICAL_PLATFORM(value)
    : String(value || '').trim();

  function patchGames(data) {
    if (!data || !Array.isArray(data.games)) return false;
    let changed = false;
    data.games.forEach(game => {
      const tombRaiderIII = String(game?.id || '') === 'GM-0134' || (
        normal(game?.title) === 'tomb raider iii' && canonicalPlatform(game?.platform) === 'PlayStation 1'
      );
      if (!tombRaiderIII) return;
      if (game.edition !== 'Platinum') { game.edition = 'Platinum'; changed = true; }
      if (game.shelfSection !== PLATINUM) { game.shelfSection = PLATINUM; changed = true; }
      if (game.category !== 'Main Collection') { game.category = 'Main Collection'; changed = true; }
      if (game.display !== 'No') { game.display = 'No'; changed = true; }
    });
    return changed;
  }

  function patchEverywhere() {
    try { if (window.MUSEUM_SEED) patchGames(window.MUSEUM_SEED); } catch (_) {}
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key || !key.startsWith('theGameMuseumV')) continue;
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        const data = JSON.parse(raw);
        if (patchGames(data)) localStorage.setItem(key, JSON.stringify(data));
      }
    } catch (_) {}
    try {
      if (typeof state !== 'undefined' && patchGames(state) && typeof save === 'function') save();
    } catch (_) {}
  }

  function renameCollectionShelfUI() {
    const wrap = document.getElementById('shelfSectionWrap');
    if (wrap) {
      const heading = wrap.querySelector('.shelf-section-heading span:first-child');
      if (heading) heading.textContent = 'COLLECTION SHELF';
      wrap.querySelector('#shelfSectionTabs')?.setAttribute('aria-label', 'Choose collection shelf');
    }
    const empty = document.getElementById('shelfSectionEmpty');
    if (empty) empty.textContent = 'No games found on this Collection Shelf for the current filters.';

    const addSelect = document.getElementById('addShelfSection');
    const addLabel = addSelect?.closest('label');
    if (addLabel) {
      [...addLabel.childNodes].forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) node.textContent = 'Collection Shelf';
      });
    }

    document.querySelectorAll('#dialogContent .detail').forEach(row => {
      const label = row.querySelector('span');
      if (label?.textContent === 'Shelf Section') label.textContent = 'Collection Shelf';
    });
  }

  function patchDetails() {
    try {
      if (typeof openGame !== 'function' || openGame.__museumCollectionShelfNaming) return;
      const base = openGame;
      const patched = function(id) {
        const result = base(id);
        renameCollectionShelfUI();
        return result;
      };
      patched.__museumCollectionShelfNaming = true;
      openGame = patched;
    } catch (_) {}
  }

  function shelfLabel(game) {
    try {
      const section = typeof window.MUSEUM_SHELF_SECTION === 'function'
        ? window.MUSEUM_SHELF_SECTION(game)
        : (game?.shelfSection || STANDARD);
      return section || STANDARD;
    } catch (_) { return game?.shelfSection || STANDARD; }
  }

  function patchCsvExport() {
    const button = document.getElementById('csvBtn');
    if (!button || button.dataset.collectionShelfCsv === 'yes') return;
    button.dataset.collectionShelfCsv = 'yes';
    button.onclick = () => {
      const headers = ['ID','Game','Platform','Edition','Collection Shelf','Series','Category','Shop','Price','Purchase Date','Display Copy','Notes','Image'];
      const quote = value => `"${String(value ?? '').replaceAll('"','""')}"`;
      const rows = (state?.games || []).map(game => [
        game.id, game.title, game.platform, game.edition, shelfLabel(game), game.series,
        game.category, game.shop, game.price, game.date, game.display, game.notes, game.image
      ].map(quote).join(','));
      if (typeof download === 'function') {
        download(`game-museum-catalogue-${new Date().toISOString().slice(0,10)}.csv`, 'text/csv;charset=utf-8', [headers.join(','), ...rows].join('\n'));
      }
    };
  }

  function refreshCollection() {
    try { if (typeof collection === 'function') collection(); } catch (_) {}
    try {
      const family = document.getElementById('familyFilter');
      const consoleSelect = document.getElementById('platformFilter');
      // Nudge the existing Collection Shelf system to rebuild its contextual options.
      family?.dispatchEvent(new Event('change', {bubbles:true}));
      consoleSelect?.dispatchEvent(new Event('change', {bubbles:true}));
    } catch (_) {}
  }

  function boot(attempt = 0) {
    patchEverywhere();
    patchDetails();
    renameCollectionShelfUI();
    patchCsvExport();

    if (document.getElementById('shelfSectionWrap') && document.getElementById('addShelfSection')) {
      refreshCollection();
      setTimeout(renameCollectionShelfUI, 40);
      return;
    }
    if (attempt < 18) setTimeout(() => boot(attempt + 1), 100);
  }

  const observer = new MutationObserver(() => renameCollectionShelfUI());
  if (document.body) observer.observe(document.body, {childList:true, subtree:true});
  else document.addEventListener('DOMContentLoaded', () => observer.observe(document.body, {childList:true, subtree:true}), {once:true});

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(() => boot(), 130));
  else setTimeout(() => boot(), 130);
})();
