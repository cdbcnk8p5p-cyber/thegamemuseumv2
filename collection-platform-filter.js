// The Game Museum — authoritative Collection filters + price cards.
// Loaded after app.js so it can replace the legacy single-platform filter safely.
(() => {
  const FAMILY_ORDER = ['Nintendo', 'Sega', 'PlayStation', 'Xbox'];
  const CROSS = 'Xbox Cross Generation';
  const titleKey = value => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
  const CROSS_TITLES = new Set([
    'call of duty black ops cold war',
    'call of duty black ops 6',
    'call of duty black ops 7',
    'call of duty modern warfare ii',
    'call of duty modern warfare iii',
    'call of duty vanguard',
    'ea sports fc 24',
    'ea sports fc 25'
  ]);

  const canonical = value => typeof window.MUSEUM_CANONICAL_PLATFORM === 'function'
    ? window.MUSEUM_CANONICAL_PLATFORM(value)
    : String(value || '').trim();
  const isCrossTitle = game => CROSS_TITLES.has(titleKey(game?.title));
  const effectivePlatform = game => isCrossTitle(game) ? CROSS : canonical(game?.platform);

  const familyOf = platform => {
    const name = canonical(platform);
    const p = name.toLowerCase();
    if (name === CROSS || p.includes('xbox')) return 'Xbox';
    if (p.includes('nintendo')) return 'Nintendo';
    if (p.includes('sega')) return 'Sega';
    if (p.includes('playstation')) return 'PlayStation';
    return '';
  };

  const rankPlatform = name => {
    const order = window.MUSEUM_PLATFORM_ORDER || [];
    const i = order.indexOf(canonical(name));
    return i === -1 ? order.length : i;
  };

  function ensureCrossGeneration(){
    try {
      if (typeof state === 'undefined' || !Array.isArray(state.games)) return;
      let changed = false;
      let coldWar = state.games.find(g => titleKey(g?.title) === 'call of duty black ops cold war');

      state.games.forEach(game => {
        if (!isCrossTitle(game)) return;
        if (game.platform !== CROSS) { game.platform = CROSS; changed = true; }
      });

      if (!coldWar) {
        state.games.push({
          id:'GM-XCG-COLD-WAR', title:'Call of Duty: Black Ops Cold War', platform:CROSS,
          edition:'Standard', category:'Main Collection', series:'Call of Duty', status:'Owned', display:'No',
          shop:'', date:'', price:null,
          notes:'Owned physical copy. Recategorised as Xbox Cross Generation; purchase details not recorded.'
        });
        changed = true;
      } else if (coldWar.platform !== CROSS) {
        coldWar.platform = CROSS;
        changed = true;
      }

      const seen = new Set();
      const before = state.games.length;
      state.games = state.games.filter(game => {
        const key = [titleKey(game?.title), effectivePlatform(game).toLowerCase(), String(game?.edition || 'Standard').toLowerCase(), String(game?.category || 'Main Collection').toLowerCase()].join('|');
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
      if (state.games.length !== before) changed = true;
      if (changed && typeof save === 'function') save();
    } catch (_) {}
  }

  function patchCardPrices(){
    try {
      if (typeof card !== 'function' || card.__museumPricePatched) return;
      const baseCard = card;
      const gbp = new Intl.NumberFormat('en-GB', {style:'currency', currency:'GBP'});
      const patched = function(g){
        const html = baseCard(g);
        const hasPrice = !(g?.price === null || g?.price === undefined || g?.price === '');
        const value = hasPrice ? gbp.format(Number(g.price) || 0) : 'Not recorded';
        return html.replace('</h3></div></button>', `</h3><div class="game-card-price"><span>Price</span><strong>${value}</strong></div></div></button>`);
      };
      patched.__museumPricePatched = true;
      card = patched;
      if (!document.getElementById('museum-card-price-style')) {
        const style = document.createElement('style');
        style.id = 'museum-card-price-style';
        style.textContent = '.game-card-price{margin-top:9px;padding-top:8px;border-top:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;gap:8px}.game-card-price span{font-size:10px;color:var(--muted);font-weight:700}.game-card-price strong{font-size:12px;color:var(--ink);font-weight:900;text-align:right}';
        document.head.appendChild(style);
      }
    } catch (_) {}
  }

  function setup(){
    ensureCrossGeneration();
    patchCardPrices();

    const family = document.getElementById('familyFilter');
    const consoleSelect = document.getElementById('platformFilter');
    const search = document.getElementById('searchInput');
    const gallery = document.getElementById('categoryFilter');
    const sort = document.getElementById('sortFilter');
    const resultCount = document.getElementById('resultCount');
    const grid = document.getElementById('collectionGrid');
    if (!family || !consoleSelect || !search || !gallery || !sort || !grid) return;

    const currentPlatforms = () => {
      ensureCrossGeneration();
      return [...new Set((state?.games || []).map(effectivePlatform).filter(Boolean))]
        .sort((a,b) => rankPlatform(a) - rankPlatform(b) || a.localeCompare(b, undefined, {numeric:true,sensitivity:'base'}));
    };

    function populateFamilies(){
      const current = family.value;
      const platforms = currentPlatforms();
      const families = FAMILY_ORDER.filter(name => platforms.some(p => familyOf(p) === name));
      family.innerHTML = '<option value="">All platform families</option>' + families.map(name => `<option value="${name}">${name}</option>`).join('');
      if (families.includes(current)) family.value = current;
    }

    function populateConsoles(resetInvalid=true){
      const current = canonical(consoleSelect.value);
      const selectedFamily = family.value;
      const choices = currentPlatforms().filter(p => !selectedFamily || familyOf(p) === selectedFamily);
      consoleSelect.innerHTML = '<option value="">All consoles</option>' + choices.map(p => `<option value="${p}">${p}</option>`).join('');
      if (choices.includes(current)) consoleSelect.value = current;
      else if (resetInvalid) consoleSelect.value = '';
    }

    function renderCollection(){
      ensureCrossGeneration();
      patchCardPrices();
      const q = norm(search.value);
      const fam = family.value;
      const p = canonical(consoleSelect.value);
      const c = gallery.value;
      const sortMode = sort.value;

      let arr = state.games.filter(g => {
        const gp = effectivePlatform(g);
        const hay = norm([g.title,gp,g.series,g.edition,g.category].join(' '));
        return (!q || hay.includes(q)) &&
          (!fam || familyOf(gp) === fam) &&
          (!p || gp === p) &&
          (!c || g.category === c);
      });

      arr.sort((a,b) => {
        if (sortMode === 'platform') return effectivePlatform(a).localeCompare(effectivePlatform(b)) || a.title.localeCompare(b.title);
        if (sortMode === 'price') return (Number(b.price)||0) - (Number(a.price)||0);
        if (sortMode === 'newest') return String(b.date||'').localeCompare(String(a.date||''));
        return a.title.localeCompare(b.title);
      });

      if (resultCount) resultCount.textContent = `${arr.length} ${arr.length === 1 ? 'record' : 'records'}`;
      grid.innerHTML = arr.map(g => {
        if (isCrossTitle(g) && g.platform !== CROSS) g.platform = CROSS;
        return card(g);
      }).join('') || '<article class="panel">No catalogue records found.</article>';
      $$('.game-card').forEach(x => x.onclick = () => openGame(x.dataset.id));
    }

    // Replace the legacy functions so future render() calls use the two-stage filter too.
    try { collection = renderCollection; } catch (_) {}
    try { platformFilter = () => populateConsoles(false); } catch (_) {}

    populateFamilies();
    populateConsoles(false);
    renderCollection();

    family.addEventListener('input', () => { populateConsoles(true); renderCollection(); });
    consoleSelect.addEventListener('input', renderCollection);
    search.addEventListener('input', renderCollection);
    gallery.addEventListener('input', renderCollection);
    sort.addEventListener('input', renderCollection);

    const clear = document.getElementById('clearFilters');
    if (clear) clear.onclick = () => {
      search.value = '';
      family.value = '';
      gallery.value = '';
      sort.value = 'title';
      populateConsoles(true);
      renderCollection();
    };

    // If an older listener rebuilds the console select first, immediately restore the authoritative list.
    let restoring = false;
    const observer = new MutationObserver(() => {
      if (restoring) return;
      const allowed = currentPlatforms().filter(p => !family.value || familyOf(p) === family.value);
      const values = [...consoleSelect.options].filter(o => o.value).map(o => canonical(o.value));
      if (allowed.join('|') !== values.join('|')) {
        restoring = true;
        populateConsoles(false);
        restoring = false;
      }
    });
    observer.observe(consoleSelect, {childList:true});

    setTimeout(() => { populateFamilies(); populateConsoles(false); renderCollection(); }, 100);
    setTimeout(() => { populateFamilies(); populateConsoles(false); renderCollection(); }, 700);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
  else setup();
})();
