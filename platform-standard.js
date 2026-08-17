// Museum-wide platform naming, ordering, Collection shelf selector and service-worker handoff.
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
    'Xbox Series X/S',
    'Xbox Cross Generation'
  ];

  const aliases = new Map([
    ['ds', 'Nintendo DS'], ['nintendo ds', 'Nintendo DS'],
    ['switch', 'Nintendo Switch'], ['nintendo switch', 'Nintendo Switch'],
    ['wii', 'Nintendo Wii'], ['nintendo wii', 'Nintendo Wii'],
    ['mega drive', 'Sega Mega Drive'], ['sega mega drive', 'Sega Mega Drive'],
    ['ps1', 'PlayStation 1'], ['playstation', 'PlayStation 1'], ['playstation 1', 'PlayStation 1'],
    ['ps2', 'PlayStation 2'], ['playstation 2', 'PlayStation 2'],
    ['ps3', 'PlayStation 3'], ['playstation 3', 'PlayStation 3'],
    ['ps4', 'PlayStation 4'], ['playstation 4', 'PlayStation 4'],
    ['ps5', 'PlayStation 5'], ['playstation 5', 'PlayStation 5'],
    ['psp', 'PlayStation Portable'], ['playstation portable', 'PlayStation Portable'],
    ['ps vita', 'PlayStation Vita'], ['psvita', 'PlayStation Vita'], ['playstation vita', 'PlayStation Vita'],
    ['xbox', 'Xbox Original'], ['original xbox', 'Xbox Original'], ['xbox original', 'Xbox Original'],
    ['xbox 360', 'Xbox 360'],
    ['xbox one', 'Xbox One'],
    ['xbox cross generation', 'Xbox Cross Generation'], ['xbox cross-generation', 'Xbox Cross Generation'], ['xbox cross gen', 'Xbox Cross Generation'], ['xbox cross-gen', 'Xbox Cross Generation'],
    ['xbox series x', 'Xbox Series X/S'], ['xbox series s', 'Xbox Series X/S'],
    ['xbox series x/s', 'Xbox Series X/S'], ['xbox series s/x', 'Xbox Series X/S']
  ]);

  const canonical = value => {
    const raw = String(value || '').trim();
    return raw ? (aliases.get(raw.toLowerCase()) || raw) : raw;
  };

  const dedupe = (items, keyFn) => {
    const map = new Map();
    items.forEach(item => map.set(keyFn(item), item));
    return [...map.values()];
  };

  const normaliseData = data => {
    if (!data || typeof data !== 'object') return false;
    let changed = false;

    if (Array.isArray(data.games)) {
      data.games.forEach(item => {
        if (!item?.platform) return;
        const next = canonical(item.platform);
        if (next !== item.platform) { item.platform = next; changed = true; }
      });
      const before = data.games.length;
      data.games = dedupe(data.games, g => g?.id || `${g?.title || ''}|${g?.platform || ''}|${g?.category || ''}`);
      if (data.games.length !== before) changed = true;
    }

    if (Array.isArray(data.wishlist)) {
      data.wishlist.forEach(item => {
        if (!item?.platform) return;
        const next = canonical(item.platform);
        if (next !== item.platform) { item.platform = next; changed = true; }
      });
      const before = data.wishlist.length;
      data.wishlist = dedupe(data.wishlist, w => `${w?.platform || ''}|${w?.title || ''}`);
      if (data.wishlist.length !== before) changed = true;
    }

    return changed;
  };

  if (window.MUSEUM_SEED) normaliseData(window.MUSEUM_SEED);

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (!key || !key.startsWith('theGameMuseumV')) continue;
    try {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const data = JSON.parse(raw);
      if (normaliseData(data)) localStorage.setItem(key, JSON.stringify(data));
    } catch (_) {}
  }

  const rank = name => {
    const i = PLATFORM_ORDER.indexOf(name);
    return i === -1 ? PLATFORM_ORDER.length : i;
  };

  const tidyPlatformFilter = select => {
    if (!select) return;
    const all = [...select.options].find(o => o.value === '');
    const selected = select.value;
    const sorted = [...select.options]
      .filter(o => o.value !== '')
      .sort((a, b) => rank(a.value) - rank(b.value) || a.textContent.localeCompare(b.textContent));
    const current = [...select.options].filter(o => o.value !== '').map(o => o.value).join('|');
    const desired = sorted.map(o => o.value).join('|');
    if (current === desired) return;
    select.replaceChildren(...(all ? [all] : []), ...sorted);
    if ([...select.options].some(o => o.value === selected)) select.value = selected;
  };

  const select = document.getElementById('platformFilter');
  if (select) {
    const observer = new MutationObserver(() => tidyPlatformFilter(select));
    observer.observe(select, { childList: true });
    queueMicrotask(() => tidyPlatformFilter(select));
  }

  function installShelfServiceWorkerRedirect() {
    try {
      if (!('serviceWorker' in navigator) || typeof ServiceWorkerContainer === 'undefined') return;
      const proto = ServiceWorkerContainer.prototype;
      const currentRegister = proto.register;
      if (!currentRegister || currentRegister.__museumShelfRedirect) return;
      const wrapped = function(scriptURL, options) {
        const raw = String(scriptURL || '');
        const next = /(^|\/)sw\.js(?:[?#].*)?$/.test(raw) ? './sw-shelf-tabs.js' : scriptURL;
        return currentRegister.call(this, next, options);
      };
      wrapped.__museumShelfRedirect = true;
      proto.register = wrapped;
    } catch (_) {}
  }

  function setupShelfSelector() {
    const collectionPage = document.getElementById('collection');
    const filters = collectionPage?.querySelector('.filters');
    const gallery = document.getElementById('categoryFilter');
    const search = document.getElementById('searchInput');
    const family = document.getElementById('familyFilter');
    const consoleSelect = document.getElementById('platformFilter');
    const sort = document.getElementById('sortFilter');
    if (!collectionPage || !filters || !gallery || !search || !family || !consoleSelect || !sort) return;

    if (!document.getElementById('shelfSelector')) {
      const selector = document.createElement('div');
      selector.id = 'shelfSelector';
      selector.className = 'shelf-selector reveal';
      selector.setAttribute('role', 'group');
      selector.setAttribute('aria-label', 'Choose collection shelf');

      const shelves = [
        { value: 'Main Collection', icon: '🎮', label: 'Main Shelf' },
        { value: 'Display Gallery', icon: '🏆', label: 'Display Shelf' },
        { value: '', icon: '🏛️', label: 'All Games' }
      ];

      shelves.forEach(({value, icon, label}) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'shelf-tab';
        button.dataset.shelf = value;
        button.setAttribute('aria-pressed', 'false');
        button.innerHTML = `<span class="shelf-tab-icon" aria-hidden="true">${icon}</span><span>${label}</span>`;
        selector.appendChild(button);
      });

      filters.before(selector);

      const buttons = [...selector.querySelectorAll('.shelf-tab')];
      const sync = () => {
        const value = gallery.value;
        buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.shelf === value)));
      };
      const choose = value => {
        gallery.value = value;
        sync();
        gallery.dispatchEvent(new Event('input', {bubbles:true}));
      };

      buttons.forEach(button => button.addEventListener('click', () => choose(button.dataset.shelf)));
      gallery.addEventListener('input', sync);
      gallery.addEventListener('change', sync);
      const clear = document.getElementById('clearFilters');
      if (clear) clear.addEventListener('click', () => setTimeout(sync, 0));
      if (!['Main Collection', 'Display Gallery', ''].includes(gallery.value)) gallery.value = 'Main Collection';
      sync();
    }

    // Remove the old Gallery control as a visible filter, including a label/wrapper if another layer added one.
    const galleryContainer = gallery.closest('label');
    if (galleryContainer && galleryContainer !== filters) galleryContainer.style.display = 'none';
    else gallery.style.display = 'none';
    gallery.setAttribute('aria-hidden', 'true');
    gallery.tabIndex = -1;

    // Rebuild the visible filter card into a clean search row + three controls.
    if (!document.getElementById('museumFilterControls')) {
      const owner = element => {
        const label = element.closest('label');
        return label && filters.contains(label) ? label : element;
      };
      const searchOwner = owner(search);
      const familyOwner = owner(family);
      const consoleOwner = owner(consoleSelect);
      const sortOwner = owner(sort);

      const row = document.createElement('div');
      row.id = 'museumFilterControls';
      row.className = 'museum-filter-controls';

      // Keep the search at the top and put Platform, Console and Sort together beneath it.
      filters.prepend(searchOwner);
      row.append(familyOwner, consoleOwner, sortOwner);
      searchOwner.after(row);
    }

    const familyForPlatform = value => {
      const p = canonical(value).toLowerCase();
      if (p.includes('nintendo')) return 'Nintendo';
      if (p.includes('playstation')) return 'PlayStation';
      if (p.includes('sega')) return 'Sega';
      if (p.includes('xbox')) return 'Xbox';
      return '';
    };
    const palette = {
      Nintendo: {background:'#d71920', border:'#ff565b'},
      PlayStation: {background:'#0758c7', border:'#3d8cff'},
      Sega: {background:'#111111', border:'#4c5965'},
      Xbox: {background:'#16811e', border:'#4dbb54'}
    };
    const applySelectColour = (element, familyName, fallbackBackground='#0b1926', fallbackBorder='#294158') => {
      const colours = palette[familyName];
      element.style.background = colours?.background || fallbackBackground;
      element.style.borderColor = colours?.border || fallbackBorder;
      element.style.color = '#fff';
      element.style.fontWeight = colours ? '850' : '600';
      element.style.boxShadow = colours ? `inset 0 0 0 1px ${colours.border}33` : 'none';
    };
    const syncFilterColours = () => {
      const selectedFamily = family.value || familyForPlatform(consoleSelect.value);
      applySelectColour(family, family.value ? family.value : selectedFamily);
      applySelectColour(consoleSelect, selectedFamily);
      applySelectColour(sort, '', '#34485d', '#536a80');
    };

    family.addEventListener('input', () => setTimeout(syncFilterColours, 0));
    family.addEventListener('change', () => setTimeout(syncFilterColours, 0));
    consoleSelect.addEventListener('input', syncFilterColours);
    consoleSelect.addEventListener('change', syncFilterColours);
    sort.addEventListener('input', syncFilterColours);
    sort.addEventListener('change', syncFilterColours);
    new MutationObserver(() => setTimeout(syncFilterColours, 0)).observe(consoleSelect, {childList:true});
    new MutationObserver(() => setTimeout(syncFilterColours, 0)).observe(family, {childList:true});
    setTimeout(syncFilterColours, 0);
    setTimeout(syncFilterColours, 250);

    if (!document.getElementById('museum-shelf-selector-style')) {
      const style = document.createElement('style');
      style.id = 'museum-shelf-selector-style';
      style.textContent = `
        .shelf-selector{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-top:14px;padding:6px;background:var(--surface);border:1px solid var(--line);border-radius:18px;box-shadow:var(--shadow)}
        .shelf-tab{min-width:0;border:1px solid transparent;background:transparent;color:var(--muted);border-radius:13px;padding:11px 8px;display:flex;align-items:center;justify-content:center;gap:7px;font-size:12px;font-weight:900;cursor:pointer;transition:.18s}
        .shelf-tab:hover{background:var(--surface2);color:var(--ink)}
        .shelf-tab[aria-pressed="true"]{background:linear-gradient(135deg,var(--navy),var(--navy2));border-color:rgba(215,170,56,.45);color:#fff;box-shadow:0 7px 18px rgba(9,24,39,.18)}
        .shelf-tab-icon{font-size:15px;line-height:1}
        #collection .filters{display:flex!important;flex-direction:column!important;gap:14px!important}
        #collection .filters>label,#collection .filters>#searchInput{width:100%;min-width:0}
        .museum-filter-controls{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;width:100%;align-items:end}
        .museum-filter-controls>label,.museum-filter-controls>select{min-width:0;width:100%;margin:0}
        .museum-filter-controls select{width:100%;transition:background .18s,border-color .18s,box-shadow .18s;color-scheme:dark}
        @media(max-width:620px){.museum-filter-controls{grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.museum-filter-controls label{font-size:9px}.museum-filter-controls select{padding:12px 8px;font-size:14px}.shelf-tab{gap:5px;padding:10px 5px;font-size:11px}}
        @media(max-width:390px){.shelf-tab{gap:4px;padding:10px 4px;font-size:10px}.shelf-tab-icon{font-size:14px}.museum-filter-controls{gap:6px}.museum-filter-controls select{padding:11px 6px;font-size:13px}}
      `;
      document.head.appendChild(style);
    }
  }

  installShelfServiceWorkerRedirect();

  const scheduleShelfSetup = () => setTimeout(setupShelfSelector, 0);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', scheduleShelfSetup);
  else scheduleShelfSetup();

  if ('serviceWorker' in navigator) {
    addEventListener('load', () => {
      setTimeout(() => navigator.serviceWorker.register('./sw-shelf-tabs.js').catch(() => {}), 1200);
    }, {once:true});
  }

  window.MUSEUM_PLATFORM_ORDER = PLATFORM_ORDER;
  window.MUSEUM_CANONICAL_PLATFORM = canonical;
})();
