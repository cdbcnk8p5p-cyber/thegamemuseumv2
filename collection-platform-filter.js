// The Game Museum — authoritative Collection filters, sorting, price cards and acquisition platform controls.
// Loaded after app.js so it can safely replace the legacy single-platform collection behaviour.
(() => {
  const FAMILY_ORDER = ['Nintendo', 'Sega', 'PlayStation', 'Xbox'];
  const CROSS = 'Xbox Cross Generation';

  // Migration-only IDs for games that existed before Xbox Cross Generation became a Museum platform.
  // Future games do NOT need to be added here: setting game.platform to Xbox Cross Generation is enough.
  const CROSS_IDS = new Set(['GM-0015','GM-0016','GM-0017','GM-0018','GM-0019','GM-0020','GM-0021','GM-XCG-COLD-WAR']);

  const titleKey = value => String(value || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');

  const isLegacyCrossTitle = key => {
    if (!key) return false;
    if (key.includes('black ops cold war')) return true;
    if (key === 'call of duty black ops 6' || key === 'black ops 6') return true;
    if (key === 'call of duty black ops 7' || key === 'black ops 7') return true;
    if (key.startsWith('call of duty modern warfare iii')) return true;
    if (key.startsWith('call of duty modern warfare ii') && !key.includes('modern warfare iii')) return true;
    if (key === 'call of duty vanguard' || key === 'call of duty vanguard standard') return true;
    if (key.startsWith('ea sports fc 24') || key === 'fc 24' || key === 'fc24') return true;
    if (key.startsWith('ea sports fc 25') || key === 'fc 25' || key === 'fc25') return true;
    return false;
  };

  const canonical = value => typeof window.MUSEUM_CANONICAL_PLATFORM === 'function'
    ? window.MUSEUM_CANONICAL_PLATFORM(value)
    : String(value || '').trim();

  const isCrossGame = game =>
    canonical(game?.platform) === CROSS ||
    CROSS_IDS.has(String(game?.id || '')) ||
    isLegacyCrossTitle(titleKey(game?.title));

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

  const hasKnownPrice = game =>
    game?.price !== null && game?.price !== undefined && game?.price !== '' && Number.isFinite(Number(game.price));

  const hasKnownDate = game => Boolean(String(game?.date || '').trim());

  function ensureCrossGeneration(){
    try {
      if (typeof state === 'undefined' || !Array.isArray(state.games)) return;
      let changed = false;

      let coldWar = state.games.find(g =>
        String(g?.id || '') === 'GM-XCG-COLD-WAR' || titleKey(g?.title).includes('black ops cold war')
      );

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
          shop:'',
          date:'',
          price:null,
          notes:'Owned physical copy. Recategorised as Xbox Cross Generation; purchase details not recorded.'
        };
        state.games.push(coldWar);
        changed = true;
      }

      state.games.forEach(game => {
        // Only migrate the old known records. A future game already saved as CROSS works naturally.
        if (!CROSS_IDS.has(String(game?.id || '')) && !isLegacyCrossTitle(titleKey(game?.title))) return;
        if (game.platform !== CROSS) {
          game.platform = CROSS;
          changed = true;
        }
      });

      const seen = new Set();
      const before = state.games.length;
      state.games = state.games.filter(game => {
        const key = [
          titleKey(game?.title),
          effectivePlatform(game).toLowerCase(),
          String(game?.edition || 'Standard').toLowerCase(),
          String(game?.category || 'Main Collection').toLowerCase()
        ].join('|');
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
        const value = hasKnownPrice(g) ? gbp.format(Number(g.price)) : 'Not recorded';
        return html.replace(
          '</h3></div></button>',
          `</h3><div class="game-card-price"><span>Price</span><strong>${value}</strong></div></div></button>`
        );
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

  function setupAddAcquisitionPlatforms(){
    const form = document.getElementById('addForm');
    if (!form || document.getElementById('addFamilyFilter')) return;

    const oldInput = form.querySelector('input[name="platform"]');
    if (!oldInput) return;
    const consoleLabel = oldInput.closest('label');
    if (!consoleLabel) return;

    const familyLabel = document.createElement('label');
    familyLabel.textContent = 'Platform family';
    const familySelect = document.createElement('select');
    familySelect.id = 'addFamilyFilter';
    familySelect.required = true;
    familyLabel.appendChild(familySelect);

    const consoleSelect = document.createElement('select');
    consoleSelect.id = 'addPlatformFilter';
    consoleSelect.name = 'platform';
    consoleSelect.required = true;
    oldInput.replaceWith(consoleSelect);

    // Change the existing label text without disturbing the new select.
    [...consoleLabel.childNodes].forEach(node => {
      if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) node.textContent = 'Console';
    });
    consoleLabel.before(familyLabel);

    const supportedPlatforms = () => {
      const standard = Array.isArray(window.MUSEUM_PLATFORM_ORDER) ? window.MUSEUM_PLATFORM_ORDER : [];
      const fromState = Array.isArray(state?.games) ? state.games.map(g => effectivePlatform(g)) : [];
      return [...new Set([...standard, ...fromState].map(canonical).filter(p => p && familyOf(p)))]
        .sort((a,b) => rankPlatform(a) - rankPlatform(b) || a.localeCompare(b, undefined, {numeric:true,sensitivity:'base'}));
    };

    const populateFamilies = () => {
      const platforms = supportedPlatforms();
      const families = FAMILY_ORDER.filter(f => platforms.some(p => familyOf(p) === f));
      familySelect.innerHTML = '<option value="">Choose platform family</option>' +
        families.map(f => `<option value="${f}">${f}</option>`).join('');
    };

    const populateConsoles = () => {
      const family = familySelect.value;
      const choices = supportedPlatforms().filter(p => family && familyOf(p) === family);
      consoleSelect.innerHTML = '<option value="">Choose console</option>' +
        choices.map(p => `<option value="${p}">${p}</option>`).join('');
      consoleSelect.disabled = !family;
    };

    populateFamilies();
    populateConsoles();
    familySelect.addEventListener('change', populateConsoles);
    form.addEventListener('reset', () => queueMicrotask(() => {
      familySelect.value = '';
      populateConsoles();
    }));
  }

  function setupCollection(){
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
      family.innerHTML = '<option value="">All platform families</option>' +
        families.map(name => `<option value="${name}">${name}</option>`).join('');
      if (families.includes(current)) family.value = current;
    }

    function populateConsoles(resetInvalid=true){
      const current = canonical(consoleSelect.value);
      const selectedFamily = family.value;
      const choices = currentPlatforms().filter(p => !selectedFamily || familyOf(p) === selectedFamily);
      consoleSelect.innerHTML = '<option value="">All consoles</option>' +
        choices.map(p => `<option value="${p}">${p}</option>`).join('');
      if (choices.includes(current)) consoleSelect.value = current;
      else if (resetInvalid) consoleSelect.value = '';
    }

    function updateSortOptions(){
      const current = sort.value;
      const specificConsole = Boolean(consoleSelect.value);
      const options = [
        ['title','A–Z'],
        ...(!specificConsole ? [['platform','Platform']] : []),
        ['newest','Newest entry'],
        ['oldest','Oldest entry'],
        ['priceHigh','Highest price'],
        ['priceLow','Lowest price']
      ];

      sort.innerHTML = options.map(([value,label]) => `<option value="${value}">${label}</option>`).join('');
      if (options.some(([value]) => value === current)) sort.value = current;
      else sort.value = 'title';
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

      // Price views are intentionally "known prices only" so unknown values never bury useful results.
      if (sortMode === 'priceHigh' || sortMode === 'priceLow') {
        arr = arr.filter(hasKnownPrice);
      }

      arr.sort((a,b) => {
        if (sortMode === 'platform') {
          return rankPlatform(effectivePlatform(a)) - rankPlatform(effectivePlatform(b)) ||
            effectivePlatform(a).localeCompare(effectivePlatform(b)) ||
            a.title.localeCompare(b.title);
        }
        if (sortMode === 'priceHigh') return Number(b.price) - Number(a.price) || a.title.localeCompare(b.title);
        if (sortMode === 'priceLow') return Number(a.price) - Number(b.price) || a.title.localeCompare(b.title);
        if (sortMode === 'newest') {
          if (hasKnownDate(a) !== hasKnownDate(b)) return hasKnownDate(a) ? -1 : 1;
          return String(b.date || '').localeCompare(String(a.date || '')) || a.title.localeCompare(b.title);
        }
        if (sortMode === 'oldest') {
          if (hasKnownDate(a) !== hasKnownDate(b)) return hasKnownDate(a) ? -1 : 1;
          return String(a.date || '').localeCompare(String(b.date || '')) || a.title.localeCompare(b.title);
        }
        return a.title.localeCompare(b.title);
      });

      if (resultCount) {
        const suffix = (sortMode === 'priceHigh' || sortMode === 'priceLow') ? ' with recorded prices' : '';
        resultCount.textContent = `${arr.length} ${arr.length === 1 ? 'record' : 'records'}${suffix}`;
      }

      grid.innerHTML = arr.map(g => card(g)).join('') ||
        `<article class="panel">${(sortMode === 'priceHigh' || sortMode === 'priceLow') ? 'No recorded prices found for this selection.' : 'No catalogue records found.'}</article>`;
      $$('.game-card').forEach(x => x.onclick = () => openGame(x.dataset.id));
    }

    // Replace legacy functions so any later render() call uses this authoritative implementation.
    try { collection = renderCollection; } catch (_) {}
    try { platformFilter = () => { populateConsoles(false); updateSortOptions(); }; } catch (_) {}

    populateFamilies();
    populateConsoles(false);
    updateSortOptions();
    renderCollection();

    family.addEventListener('input', () => {
      populateConsoles(true);
      updateSortOptions();
      renderCollection();
    });

    consoleSelect.addEventListener('input', () => {
      updateSortOptions();
      renderCollection();
    });
    consoleSelect.addEventListener('change', () => {
      updateSortOptions();
      renderCollection();
    });
    search.addEventListener('input', renderCollection);
    gallery.addEventListener('input', renderCollection);
    sort.addEventListener('input', renderCollection);
    sort.addEventListener('change', renderCollection);

    const clear = document.getElementById('clearFilters');
    if (clear) clear.onclick = () => {
      search.value = '';
      family.value = '';
      gallery.value = '';
      populateConsoles(true);
      updateSortOptions();
      sort.value = 'title';
      renderCollection();
    };

    // If an older listener rebuilds the console select, immediately restore the authoritative list.
    let restoring = false;
    const observer = new MutationObserver(() => {
      if (restoring) return;
      const allowed = currentPlatforms().filter(p => !family.value || familyOf(p) === family.value);
      const values = [...consoleSelect.options].filter(o => o.value).map(o => canonical(o.value));
      if (allowed.join('|') !== values.join('|')) {
        restoring = true;
        populateConsoles(false);
        updateSortOptions();
        restoring = false;
      }
    });
    observer.observe(consoleSelect, {childList:true});

    setTimeout(() => { populateFamilies(); populateConsoles(false); updateSortOptions(); renderCollection(); }, 100);
    setTimeout(() => { populateFamilies(); populateConsoles(false); updateSortOptions(); renderCollection(); }, 700);
  }

  function setup(){
    setupCollection();
    setupAddAcquisitionPlatforms();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
  else setup();
})();
