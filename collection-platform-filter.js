// The Game Museum — authoritative Collection filters + price cards.
// Loaded after app.js. This file deliberately renders last so the legacy single-platform
// listener cannot leave the Cross Generation shelf empty.
(() => {
  const FAMILY_ORDER = ['Nintendo', 'Sega', 'PlayStation', 'Xbox'];
  const CROSS = 'Xbox Cross Generation';
  const CROSS_IDS = new Set(['GM-0015','GM-0016','GM-0017','GM-0018','GM-0019','GM-0020','GM-0021','GM-XCG-COLD-WAR']);

  const titleKey = value => String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  const crossTitleKey = key => {
    if (!key) return false;
    if (key.includes('black ops cold war')) return true;
    if (key === 'call of duty black ops 6' || key === 'black ops 6') return true;
    if (key === 'call of duty black ops 7' || key === 'black ops 7') return true;
    if (key.startsWith('call of duty modern warfare ii') && !key.includes('modern warfare iii')) return true;
    if (key.startsWith('call of duty modern warfare iii')) return true;
    if (key === 'call of duty vanguard' || key === 'call of duty vanguard standard') return true;
    if (key.startsWith('ea sports fc 24') || key === 'fc 24' || key === 'fc24') return true;
    if (key.startsWith('ea sports fc 25') || key === 'fc 25' || key === 'fc25') return true;
    return false;
  };

  const canonical = value => typeof window.MUSEUM_CANONICAL_PLATFORM === 'function'
    ? window.MUSEUM_CANONICAL_PLATFORM(value)
    : String(value || '').trim();

  const isCrossGame = game => CROSS_IDS.has(String(game?.id || '')) || crossTitleKey(titleKey(game?.title));
  const effectivePlatform = game => isCrossGame(game) ? CROSS : canonical(game?.platform);

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

      let coldWar = state.games.find(g => String(g?.id || '') === 'GM-XCG-COLD-WAR' || titleKey(g?.title).includes('black ops cold war'));
      if (!coldWar) {
        coldWar = {
          id:'GM-XCG-COLD-WAR',
          title:'Call of Duty: Black Ops Cold War',
          platform:CROSS,
          edition:'Standard',
          category:'Main Collection',
          series:'Call of Duty',
          status:'Owned',
          display:'No',
          shop:'', date:'', price:null,
          notes:'Owned physical copy. Recategorised as Xbox Cross Generation; purchase details not recorded.'
        };
        state.games.push(coldWar);
        changed = true;
      }

      state.games.forEach(game => {
        if (!isCrossGame(game)) return;
        if (game.platform !== CROSS) {
          game.platform = CROSS;
          changed = true;
        }
      });

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
      const selected = canonical(consoleSelect.value);
      const c = gallery.value;
      const sortMode = sort.value;

      let arr = state.games.filter(g => {
        const gp = effectivePlatform(g);
        const hay = norm([g.title,gp,g.series,g.edition,g.category].join(' '));
        const platformMatch = !selected || (selected === CROSS ? isCrossGame(g) : gp === selected);
        return (!q || hay.includes(q)) &&
          (!fam || familyOf(gp) === fam) &&
          platformMatch &&
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
        if (isCrossGame(g)) g.platform = CROSS;
        return card(g);
      }).join('') || '<article class="panel">No catalogue records found.</article>';
      $$('.game-card').forEach(x => x.onclick = () => openGame(x.dataset.id));
    }

    // Keep future render() calls aligned with the new system.
    try { collection = renderCollection; } catch (_) {}
    try { platformFilter = () => populateConsoles(false); } catch (_) {}

    populateFamilies();
    populateConsoles(false);
    renderCollection();

    const renderLast = () => {
      // The legacy app.js listener was registered first. Render again after the event stack
      // so this authoritative renderer is always the final one visible to the user.
      setTimeout(() => {
        ensureCrossGeneration();
        populateConsoles(false);
        renderCollection();
      }, 0);
    };

    family.addEventListener('input', () => { populateConsoles(true); renderLast(); });
    family.addEventListener('change', () => { populateConsoles(true); renderLast(); });
    consoleSelect.addEventListener('input', renderLast);
    consoleSelect.addEventListener('change', renderLast);
    search.addEventListener('input', renderLast);
    gallery.addEventListener('input', renderLast);
    gallery.addEventListener('change', renderLast);
    sort.addEventListener('input', renderLast);
    sort.addEventListener('change', renderLast);

    const clear = document.getElementById('clearFilters');
    if (clear) clear.onclick = () => {
      search.value = '';
      family.value = '';
      gallery.value = '';
      sort.value = 'title';
      populateConsoles(true);
      renderLast();
    };

    let restoring = false;
    const observer = new MutationObserver(() => {
      if (restoring) return;
      const allowed = currentPlatforms().filter(p => !family.value || familyOf(p) === family.value);
      const values = [...consoleSelect.options].filter(o => o.value).map(o => canonical(o.value));
      if (allowed.join('|') !== values.join('|')) {
        restoring = true;
        const selectedBefore = canonical(consoleSelect.value);
        populateConsoles(false);
        if (allowed.includes(selectedBefore)) consoleSelect.value = selectedBefore;
        restoring = false;
        renderLast();
      }
    });
    observer.observe(consoleSelect, {childList:true});

    // Re-assert after all DOMContentLoaded work and any saved-state migrations finish.
    setTimeout(() => { ensureCrossGeneration(); populateFamilies(); populateConsoles(false); renderCollection(); }, 100);
    setTimeout(() => { ensureCrossGeneration(); populateFamilies(); populateConsoles(false); renderCollection(); }, 800);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
  else setup();
})();
