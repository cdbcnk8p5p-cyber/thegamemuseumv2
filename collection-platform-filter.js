// The Game Museum — Collection platform family -> console filter.
// Keeps the existing app renderer intact while restoring the two-stage filter UI.
(() => {
  const FAMILY_ORDER = ['Nintendo', 'Sega', 'PlayStation', 'Xbox', 'Other'];

  const familyOf = platform => {
    const p = String(platform || '').trim();
    if (p.startsWith('Nintendo ')) return 'Nintendo';
    if (p.startsWith('Sega ')) return 'Sega';
    if (p.startsWith('PlayStation ')) return 'PlayStation';
    if (p.startsWith('Xbox ')) return 'Xbox';
    return 'Other';
  };

  const canonical = value => typeof window.MUSEUM_CANONICAL_PLATFORM === 'function'
    ? window.MUSEUM_CANONICAL_PLATFORM(value)
    : String(value || '').trim();

  const rankPlatform = name => {
    const order = window.MUSEUM_PLATFORM_ORDER || [];
    const i = order.indexOf(name);
    return i === -1 ? order.length : i;
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
    grid.querySelectorAll('.game-card').forEach(card => {
      let show = true;
      try {
        const game = state.games.find(g => String(g.id) === String(card.dataset.id));
        show = !!game && familyOf(canonical(game.platform)) === family;
      } catch (_) {}
      card.hidden = !show;
      if (show) count++;
    });
    return count;
  };

  const setup = () => {
    const family = document.getElementById('familyFilter');
    const consoleSelect = document.getElementById('platformFilter');
    const resultCount = document.getElementById('resultCount');
    if (!family || !consoleSelect) return;

    const platforms = uniquePlatforms();
    const families = FAMILY_ORDER.filter(name => platforms.some(p => familyOf(p) === name));

    const populateFamilies = () => {
      const current = family.value;
      family.innerHTML = '<option value="">All platform families</option>' +
        families.map(name => `<option value="${name}">${name}</option>`).join('');
      if (families.includes(current)) family.value = current;
    };

    const populateConsoles = (resetInvalid = true) => {
      const current = consoleSelect.value;
      const selectedFamily = family.value;
      const choices = platforms.filter(p => !selectedFamily || familyOf(p) === selectedFamily);
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
      try { if (typeof collection === 'function') collection(); } catch (_) {}
      queueMicrotask(applyFamily);
    };

    populateFamilies();
    populateConsoles(false);
    applyFamily();

    family.addEventListener('input', () => {
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

    const observer = new MutationObserver(() => {
      const selectedFamily = family.value;
      if (!selectedFamily) return;
      const allowed = new Set(platforms.filter(p => familyOf(p) === selectedFamily));
      const hasOutside = [...consoleSelect.options].some(o => o.value && !allowed.has(o.value));
      if (hasOutside) populateConsoles(false);
    });
    observer.observe(consoleSelect, { childList:true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', setup);
  else setup();
})();
