// The Game Museum — Collection platform family -> console filter + card price display.
// Loaded after app.js so it can safely enhance the live collection renderer.
(() => {
  const FAMILY_ORDER = ['Nintendo', 'Sega', 'PlayStation', 'Xbox'];
  const CROSS = 'Xbox Cross Generation';

  const canonical = value => typeof window.MUSEUM_CANONICAL_PLATFORM === 'function'
    ? window.MUSEUM_CANONICAL_PLATFORM(value)
    : String(value || '').trim();

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
    const canonicalName = canonical(name);
    const i = order.indexOf(canonicalName);
    return i === -1 ? order.length : i;
  };

  const patchCardPrices = () => {
    try {
      if (typeof card !== 'function' || card.__museumPricePatched) return;
      const baseCard = card;
      const gbp = new Intl.NumberFormat('en-GB', {style:'currency', currency:'GBP'});
      const patched = function(g) {
        const html = baseCard(g);
        const hasPrice = !(g?.price === null || g?.price === undefined || g?.price === '');
        const value = hasPrice ? gbp.format(Number(g.price) || 0) : 'Not recorded';
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
  };

  const uniquePlatforms = () => {
    try {
      return [...new Set((state?.games || []).map(g => canonical(g?.platform)).filter(Boolean))]
        .sort((a, b) => rankPlatform(a) - rankPlatform(b) || a.localeCompare(b, undefined, {numeric:true, sensitivity:'base'}));
    } catch (_) {
      return [];
    }
  };

  const visibleCountForFamily = family => {
    if (!family) return null;
    const grid = document.getElementById('collectionGrid');
    if (!grid) return 0;
    let count = 0;
    grid.querySelectorAll('.game-card').forEach(cardEl => {
      let show = true;
      try {
        const game = state.games.find(g => String(g.id) === String(cardEl.dataset.id));
        show = !!game && familyOf(game.platform) === family;
      } catch (_) {}
      cardEl.hidden = !show;
      if (show) count++;
    });
    return count;
  };

  const setup = () => {
    patchCardPrices();

    const family = document.getElementById('familyFilter');
    const consoleSelect = document.getElementById('platformFilter');
    const resultCount = document.getElementById('resultCount');
    if (!family || !consoleSelect) return;

    const platforms = uniquePlatforms();
    const families = FAMILY_ORDER.filter(name => platforms.some(p => familyOf(p) === name));

    const scrubOther = () => {
      [...family.options].forEach(option => {
        if (String(option.value).toLowerCase() === 'other' || String(option.textContent).trim().toLowerCase() === 'other') option.remove();
      });
      if (family.value === 'Other') family.value = '';
    };

    const populateFamilies = () => {
      const current = family.value === 'Other' ? '' : family.value;
      family.innerHTML = '<option value="">All platform families</option>' +
        families.map(name => `<option value="${name}">${name}</option>`).join('');
      if (families.includes(current)) family.value = current;
      scrubOther();
    };

    const populateConsoles = (resetInvalid = true) => {
      const current = canonical(consoleSelect.value);
      const selectedFamily = family.value;
      const choices = platforms
        .filter(p => !selectedFamily || familyOf(p) === selectedFamily)
        .sort((a,b) => rankPlatform(a) - rankPlatform(b) || a.localeCompare(b, undefined, {numeric:true,sensitivity:'base'}));
      consoleSelect.innerHTML = '<option value="">All consoles</option>' +
        choices.map(p => `<option value="${p}">${p}</option>`).join('');
      if (choices.includes(current)) consoleSelect.value = current;
      else if (resetInvalid) consoleSelect.value = '';
    };

    const applyFamily = () => {
      const count = visibleCountForFamily(family.value);
      if (count !== null && resultCount) resultCount.textContent = `${count} ${count === 1 ? 'record' : 'records'}`;
    };

    const rerender = () => {
      patchCardPrices();
      try { if (typeof collection === 'function') collection(); } catch (_) {}
      queueMicrotask(applyFamily);
    };

    populateFamilies();
    populateConsoles(false);
    rerender();

    family.addEventListener('input', () => {
      if (family.value === 'Other') family.value = 'Xbox';
      populateConsoles(true);
      rerender();
    });

    ['searchInput', 'platformFilter', 'categoryFilter', 'sortFilter'].forEach(id => {
      document.getElementById(id)?.addEventListener('input', () => queueMicrotask(applyFamily));
    });

    document.getElementById('clearFilters')?.addEventListener('click', () => {
      family.value = '';
      queueMicrotask(() => {
        populateConsoles(true);
        rerender();
      });
    });

    // app.js or an older cached helper may rebuild the selects. Keep this filter authoritative.
    const familyObserver = new MutationObserver(() => scrubOther());
    familyObserver.observe(family, {childList:true});

    const consoleObserver = new MutationObserver(() => {
      const selectedFamily = family.value;
      if (!selectedFamily) return;
      const allowed = new Set(platforms.filter(p => familyOf(p) === selectedFamily));
      const hasOutside = [...consoleSelect.options].some(o => o.value && !allowed.has(canonical(o.value)));
      if (hasOutside) populateConsoles(false);
    });
    consoleObserver.observe(consoleSelect, { childList:true });

    // Re-assert once late-running scripts have finished.
    setTimeout(() => { populateFamilies(); populateConsoles(false); applyFamily(); }, 50);
    setTimeout(() => { populateFamilies(); populateConsoles(false); applyFamily(); }, 500);
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
  else setup();
})();
