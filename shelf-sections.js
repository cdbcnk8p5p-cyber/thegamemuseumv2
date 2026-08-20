// The Game Museum — context-aware Collection Shelves.
// Branded re-release lines stay as real physical shelves without adding more top-level Museum tabs.
(() => {
  const STANDARD = 'Standard Shelf';
  const SECTION_ORDER = [
    STANDARD,
    'PlayStation Platinum',
    'PlayStation Essentials',
    'PlayStation Hits',
    'Xbox Classics',
    'Nintendo Selects',
    "Nintendo Player's Choice"
  ];

  const normal = value => String(value || '').trim().toLowerCase();
  const canonicalPlatform = value => typeof window.MUSEUM_CANONICAL_PLATFORM === 'function'
    ? window.MUSEUM_CANONICAL_PLATFORM(value)
    : String(value || '').trim();

  const familyOf = value => {
    const p = normal(canonicalPlatform(value));
    if (p.includes('playstation')) return 'PlayStation';
    if (p.includes('xbox')) return 'Xbox';
    if (p.includes('nintendo')) return 'Nintendo';
    if (p.includes('sega')) return 'Sega';
    return '';
  };

  const canonicalSection = value => {
    const raw = String(value || '').trim();
    const key = normal(raw);
    if (!key || key === 'standard' || key === 'standard shelf' || key === 'main shelf') return STANDARD;
    if (key.includes('platinum')) return 'PlayStation Platinum';
    if (key.includes('essential')) return 'PlayStation Essentials';
    if (key.includes('playstation hits') || key === 'ps hits') return 'PlayStation Hits';
    if (key.includes('xbox classic')) return 'Xbox Classics';
    if (key.includes('nintendo select')) return 'Nintendo Selects';
    if (key.includes("player's choice") || key.includes('players choice')) return "Nintendo Player's Choice";
    return raw || STANDARD;
  };

  function derivedSection(game) {
    if (!game) return STANDARD;
    if (game.shelfSection) return canonicalSection(game.shelfSection);
    const family = familyOf(game.platform);
    const text = normal([game.edition, game.title, game.notes].filter(Boolean).join(' '));
    if (family === 'PlayStation' && text.includes('platinum')) return 'PlayStation Platinum';
    if (family === 'PlayStation' && text.includes('essential')) return 'PlayStation Essentials';
    if (family === 'PlayStation' && (text.includes('playstation hits') || text.includes('ps hits'))) return 'PlayStation Hits';
    if (family === 'Xbox' && /\bclassics?\b/.test(text)) return 'Xbox Classics';
    if (family === 'Nintendo' && text.includes('nintendo selects')) return 'Nintendo Selects';
    if (family === 'Nintendo' && (text.includes("player's choice") || text.includes('players choice'))) return "Nintendo Player's Choice";
    return STANDARD;
  }

  // Keep the old internal API for compatibility, while exposing the new Museum terminology too.
  window.MUSEUM_SHELF_SECTION = derivedSection;
  window.MUSEUM_COLLECTION_SHELF = derivedSection;

  function patchData(data) {
    if (!data || !Array.isArray(data.games)) return false;
    let changed = false;

    data.games.forEach(game => {
      const platform = canonicalPlatform(game.platform);
      const title = normal(game.title);

      // PS1 Tomb Raider III is the Platinum physical copy.
      if (String(game.id || '') === 'GM-0134' || (title === 'tomb raider iii' && platform === 'PlayStation 1')) {
        if (game.edition !== 'Platinum') { game.edition = 'Platinum'; changed = true; }
        if (game.shelfSection !== 'PlayStation Platinum') { game.shelfSection = 'PlayStation Platinum'; changed = true; }
        if (game.category !== 'Main Collection') { game.category = 'Main Collection'; changed = true; }
        if (game.display !== 'No') { game.display = 'No'; changed = true; }
      }

      const section = derivedSection(game);
      if (section !== STANDARD && game.shelfSection !== section) {
        game.shelfSection = section;
        changed = true;
      }

      // GTA III Platinum was previously classed as Display because Collection Shelves did not exist yet.
      if (String(game.id || '') === 'GM-0175' || (
          title === 'grand theft auto iii' &&
          platform === 'PlayStation 2' &&
          section === 'PlayStation Platinum')) {
        if (game.edition !== 'Platinum') { game.edition = 'Platinum'; changed = true; }
        if (game.shelfSection !== 'PlayStation Platinum') { game.shelfSection = 'PlayStation Platinum'; changed = true; }
        if (game.category !== 'Main Collection') { game.category = 'Main Collection'; changed = true; }
        if (game.display !== 'No') { game.display = 'No'; changed = true; }
      }

      // Purchase-location correction supplied after the Display Shelf audit.
      if (String(game.id || '') === 'GM-0061' || (
          title.includes('need for speed') &&
          title.includes('most wanted') &&
          platform === 'Xbox 360')) {
        if (game.shop !== 'CEX - Livingston') { game.shop = 'CEX - Livingston'; changed = true; }
      }
    });
    return changed;
  }

  function patchEverywhere() {
    try { if (window.MUSEUM_SEED) patchData(window.MUSEUM_SEED); } catch (_) {}
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (!key || !key.startsWith('theGameMuseumV')) continue;
        const raw = localStorage.getItem(key);
        if (!raw) continue;
        const data = JSON.parse(raw);
        if (patchData(data)) localStorage.setItem(key, JSON.stringify(data));
      }
    } catch (_) {}
    try {
      if (typeof state !== 'undefined' && patchData(state) && typeof save === 'function') save();
    } catch (_) {}
  }

  const sectionRank = section => {
    const index = SECTION_ORDER.indexOf(section);
    return index === -1 ? SECTION_ORDER.length : index;
  };

  const sectionClass = section => {
    if (section === STANDARD) return 'standard';
    if (section === 'PlayStation Platinum') return 'platinum';
    if (section === 'PlayStation Essentials') return 'essentials';
    if (section === 'PlayStation Hits') return 'ps-hits';
    if (section === 'Xbox Classics') return 'xbox-classics';
    if (section === 'Nintendo Selects') return 'nintendo-selects';
    if (section === "Nintendo Player's Choice") return 'nintendo-choice';
    return 'other';
  };

  const sectionLabel = section => section === STANDARD ? 'Standard Shelf' : section;

  function injectStyles() {
    if (document.getElementById('museum-shelf-section-style')) return;
    const style = document.createElement('style');
    style.id = 'museum-shelf-section-style';
    style.textContent = `
      .shelf-section-wrap{width:100%;padding-top:2px;position:relative;z-index:35}
      .shelf-section-heading{display:flex;align-items:center;justify-content:space-between;gap:10px;margin:0 4px 8px}
      .shelf-section-heading span:first-child{font-size:10px;font-weight:950;letter-spacing:1.5px;color:var(--muted)}
      .shelf-section-heading small{font-size:9px;color:var(--muted);font-weight:700;text-align:right}
      .shelf-section-tabs{display:flex;gap:8px;flex-wrap:wrap}
      .shelf-section-tab{border:1px solid #40566a;background:#17293a;color:#dce7ef;border-radius:12px;padding:10px 12px;font-size:11px;font-weight:900;line-height:1.15;cursor:pointer;transition:.16s;min-height:38px}
      .shelf-section-tab[aria-pressed="true"]{box-shadow:0 7px 18px rgba(0,0,0,.28),inset 0 0 0 1px rgba(255,255,255,.16);transform:translateY(-1px)}
      .shelf-section-tab.standard[aria-pressed="true"]{background:linear-gradient(135deg,#2c4255,#182b3d);border-color:#d5ae46;color:#fff}
      .shelf-section-tab.platinum{background:linear-gradient(135deg,#7f8a96,#c7d0d9);border-color:#e1e7ec;color:#111b24}
      .shelf-section-tab.platinum[aria-pressed="true"]{box-shadow:0 0 0 2px rgba(225,231,236,.32),0 8px 20px rgba(0,0,0,.34)}
      .shelf-section-tab.essentials,.shelf-section-tab.ps-hits{background:#b51f2b;border-color:#e45b65;color:#fff}
      .shelf-section-tab.xbox-classics{background:#16811e;border-color:#4dbb54;color:#fff}
      .shelf-section-tab.nintendo-selects,.shelf-section-tab.nintendo-choice{background:#d71920;border-color:#ff565b;color:#fff}
      .shelf-section-tab.other{background:#34485d;border-color:#62798d;color:#fff}
      .badge.shelf-section-badge{font-weight:900}
      .badge.shelf-section-badge.platinum{background:linear-gradient(135deg,#89949f,#d3dae0);color:#101820}
      .badge.shelf-section-badge.essentials,.badge.shelf-section-badge.ps-hits{background:#b51f2b;color:#fff}
      .badge.shelf-section-badge.xbox-classics{background:#16811e;color:#fff}
      .badge.shelf-section-badge.nintendo-selects,.badge.shelf-section-badge.nintendo-choice{background:#d71920;color:#fff}
      .shelf-section-empty{display:none;margin:12px 0 0;padding:16px;border:1px dashed var(--line);border-radius:14px;background:var(--surface);color:var(--muted);font-size:12px;font-weight:700}
      @media(max-width:620px){.shelf-section-tabs{gap:6px}.shelf-section-tab{padding:9px 10px;font-size:10px;flex:1 1 auto}.shelf-section-heading small{display:none}}
    `;
    document.head.appendChild(style);
  }

  function patchCards() {
    try {
      if (typeof card !== 'function' || card.__museumShelfSectionPatched) return;
      const base = card;
      const patched = function(game) {
        let html = base(game);
        const section = derivedSection(game);
        if (section !== STANDARD) {
          const text = typeof esc === 'function' ? esc(sectionLabel(section)) : sectionLabel(section);
          const badge = `<span class="badge shelf-section-badge ${sectionClass(section)}">${text}</span>`;
          html = html.replace(/(<div class="badges">[\s\S]*?)(<\/div><h3>)/, `$1${badge}$2`);
        }
        return html;
      };
      patched.__museumShelfSectionPatched = true;
      card = patched;
    } catch (_) {}
  }

  function patchDetails() {
    try {
      if (typeof openGame !== 'function' || openGame.__museumShelfSectionPatched) return;
      const base = openGame;
      const patched = function(id) {
        base(id);
        try {
          const game = state?.games?.find(item => String(item.id) === String(id));
          const grid = document.querySelector('#dialogContent .detail-grid');
          if (!game || !grid || grid.querySelector('[data-shelf-section-detail]')) return;
          const row = document.createElement('div');
          row.className = 'detail';
          row.dataset.shelfSectionDetail = 'yes';
          const value = typeof esc === 'function' ? esc(sectionLabel(derivedSection(game))) : sectionLabel(derivedSection(game));
          row.innerHTML = `<span>Collection Shelf</span><strong>${value}</strong>`;
          const galleryRow = [...grid.children].find(child => child.querySelector('span')?.textContent === 'Gallery');
          if (galleryRow) galleryRow.insertAdjacentElement('afterend', row); else grid.appendChild(row);
        } catch (_) {}
      };
      patched.__museumShelfSectionPatched = true;
      openGame = patched;
    } catch (_) {}
  }

  let selectedSection = STANDARD;
  let applying = false;

  function matchingContextGames() {
    try {
      const family = document.getElementById('familyFilter')?.value || '';
      const consoleValue = canonicalPlatform(document.getElementById('platformFilter')?.value || '');
      const gallery = document.getElementById('categoryFilter')?.value || '';
      return (state?.games || []).filter(game => {
        const platform = canonicalPlatform(game.platform);
        return (!family || familyOf(platform) === family) &&
               (!consoleValue || platform === consoleValue) &&
               (!gallery || game.category === gallery);
      });
    } catch (_) { return []; }
  }

  function availableSections() {
    const found = [...new Set(matchingContextGames().map(derivedSection))];
    if (!found.length) return [STANDARD];
    return found.sort((a,b) => sectionRank(a) - sectionRank(b) || a.localeCompare(b));
  }

  function ensureSectionUI() {
    const filters = document.querySelector('#collection .filters');
    const row = document.getElementById('museumFilterControls');
    if (!filters || !row) return null;
    let wrap = document.getElementById('shelfSectionWrap');
    if (!wrap) {
      wrap = document.createElement('div');
      wrap.id = 'shelfSectionWrap';
      wrap.className = 'shelf-section-wrap';
      wrap.innerHTML = '<div class="shelf-section-heading"><span>COLLECTION SHELF</span><small>Changes with platform & console</small></div><div id="shelfSectionTabs" class="shelf-section-tabs" role="group" aria-label="Choose collection shelf"></div>';
      row.insertAdjacentElement('afterend', wrap);

      const empty = document.createElement('div');
      empty.id = 'shelfSectionEmpty';
      empty.className = 'shelf-section-empty';
      empty.textContent = 'No games found on this Collection Shelf for the current filters.';
      document.querySelector('#collection .results-line')?.insertAdjacentElement('afterend', empty);
    }
    return wrap;
  }

  function renderSectionTabs() {
    const wrap = ensureSectionUI();
    const tabs = document.getElementById('shelfSectionTabs');
    if (!wrap || !tabs) return;
    const sections = availableSections();
    if (!sections.includes(selectedSection)) selectedSection = sections.includes(STANDARD) ? STANDARD : sections[0];
    tabs.innerHTML = '';
    sections.forEach(section => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `shelf-section-tab ${sectionClass(section)}`;
      button.dataset.section = section;
      button.setAttribute('aria-pressed', String(section === selectedSection));
      button.textContent = sectionLabel(section);
      button.addEventListener('click', () => {
        selectedSection = section;
        [...tabs.querySelectorAll('.shelf-section-tab')].forEach(tab => tab.setAttribute('aria-pressed', String(tab.dataset.section === selectedSection)));
        try { if (typeof collection === 'function') collection(); } catch (_) {}
        setTimeout(applySectionToGrid, 0);
      });
      tabs.appendChild(button);
    });
  }

  function applySectionToGrid() {
    if (applying) return;
    applying = true;
    try {
      const grid = document.getElementById('collectionGrid');
      const count = document.getElementById('resultCount');
      const empty = document.getElementById('shelfSectionEmpty');
      if (!grid) return;
      const cards = [...grid.querySelectorAll('.game-card[data-id]')];
      if (!cards.length) {
        if (empty) empty.style.display = 'none';
        return;
      }
      let visible = 0;
      cards.forEach(cardEl => {
        const game = state?.games?.find(item => String(item.id) === String(cardEl.dataset.id));
        const show = game && derivedSection(game) === selectedSection;
        cardEl.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      if (count) {
        const sortMode = document.getElementById('sortFilter')?.value || '';
        const priceSuffix = (sortMode === 'priceHigh' || sortMode === 'priceLow') ? ' with recorded prices' : '';
        count.textContent = `${visible} ${visible === 1 ? 'record' : 'records'} • ${sectionLabel(selectedSection)}${priceSuffix}`;
      }
      if (empty) empty.style.display = visible ? 'none' : 'block';
    } finally {
      applying = false;
    }
  }

  function refreshSections() {
    renderSectionTabs();
    setTimeout(applySectionToGrid, 0);
  }

  function wireCollection() {
    const grid = document.getElementById('collectionGrid');
    if (!grid) return;
    const refresh = () => setTimeout(refreshSections, 20);
    ['familyFilter','platformFilter','categoryFilter'].forEach(id => {
      const el = document.getElementById(id);
      el?.addEventListener('input', refresh);
      el?.addEventListener('change', refresh);
    });
    ['searchInput','sortFilter'].forEach(id => {
      const el = document.getElementById(id);
      el?.addEventListener('input', () => setTimeout(applySectionToGrid, 20));
      el?.addEventListener('change', () => setTimeout(applySectionToGrid, 20));
    });
    document.getElementById('clearFilters')?.addEventListener('click', () => {
      selectedSection = STANDARD;
      setTimeout(refreshSections, 30);
    });
    new MutationObserver(() => setTimeout(applySectionToGrid, 0)).observe(grid, {childList:true});
    refreshSections();
  }

  function possibleSectionsForConsole(platform) {
    const p = canonicalPlatform(platform);
    const options = [STANDARD];
    if (['PlayStation 1','PlayStation 2','PlayStation 3'].includes(p)) options.push('PlayStation Platinum');
    if (p === 'PlayStation 3') options.push('PlayStation Essentials');
    if (p === 'PlayStation 4') options.push('PlayStation Hits');
    if (['Xbox Original','Xbox 360'].includes(p)) options.push('Xbox Classics');
    if (p === 'Nintendo Wii') options.push('Nintendo Selects');
    return options;
  }

  function wireAddForm() {
    const form = document.getElementById('addForm');
    const platform = document.getElementById('addPlatformFilter');
    if (!form || !platform || document.getElementById('addShelfSection')) return;
    const platformLabel = platform.closest('label');
    if (!platformLabel) return;

    const label = document.createElement('label');
    label.textContent = 'Collection Shelf';
    const select = document.createElement('select');
    select.id = 'addShelfSection';
    select.name = 'shelfSection';
    label.appendChild(select);
    platformLabel.insertAdjacentElement('afterend', label);

    const populate = () => {
      const options = possibleSectionsForConsole(platform.value);
      select.innerHTML = options.map(section => `<option value="${section}">${sectionLabel(section)}</option>`).join('');
    };
    platform.addEventListener('change', populate);
    platform.addEventListener('input', populate);
    populate();

    const baseSubmit = form.onsubmit;
    if (typeof baseSubmit === 'function' && !baseSubmit.__museumShelfSectionPatched) {
      const patched = function(event) {
        const chosen = select.value || STANDARD;
        const before = new Set((state?.games || []).map(game => String(game.id)));
        const result = baseSubmit.call(this, event);
        try {
          const added = (state?.games || []).find(game => !before.has(String(game.id)));
          if (added) {
            added.shelfSection = chosen;
            if (typeof save === 'function') save();
          }
        } catch (_) {}
        return result;
      };
      patched.__museumShelfSectionPatched = true;
      form.onsubmit = patched;
    }
  }

  function patchCsvExport() {
    const button = document.getElementById('csvBtn');
    if (!button || button.dataset.shelfSectionCsv === 'yes') return;
    button.dataset.shelfSectionCsv = 'yes';
    button.onclick = () => {
      const headers = ['ID','Game','Platform','Edition','Collection Shelf','Series','Category','Shop','Price','Purchase Date','Display Copy','Notes','Image'];
      const quote = value => `"${String(value ?? '').replaceAll('"','""')}"`;
      const rows = (state?.games || []).map(game => [
        game.id,game.title,game.platform,game.edition,sectionLabel(derivedSection(game)),game.series,game.category,game.shop,game.price,game.date,game.display,game.notes,game.image
      ].map(quote).join(','));
      if (typeof download === 'function') download(`game-museum-catalogue-${new Date().toISOString().slice(0,10)}.csv`,'text/csv;charset=utf-8',[headers.join(','),...rows].join('\n'));
    };
  }

  function boot(attempt = 0) {
    patchEverywhere();
    injectStyles();
    patchCards();
    patchDetails();
    if (document.getElementById('museumFilterControls') && typeof state !== 'undefined') {
      try { if (typeof collection === 'function') collection(); } catch (_) {}
      wireCollection();
      wireAddForm();
      patchCsvExport();
      try { if (typeof dashboard === 'function') dashboard(); } catch (_) {}
      return;
    }
    if (attempt < 15) setTimeout(() => boot(attempt + 1), 100);
  }

  document.getElementById('resetBtn')?.addEventListener('click', () => setTimeout(() => { patchEverywhere(); refreshSections(); }, 50));
  document.getElementById('importFile')?.addEventListener('change', () => setTimeout(() => { patchEverywhere(); refreshSections(); }, 300));

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => setTimeout(() => boot(), 80));
  else setTimeout(() => boot(), 80);
})();
