// Final wishlist cleanup overrides. Loaded after audit-data.js and before app.js.
(() => {
  const clean = wishlist => {
    if (!Array.isArray(wishlist)) return;
    for (let i = wishlist.length - 1; i >= 0; i--) {
      const w = wishlist[i];
      if (w.title === 'Grand Theft Auto V') wishlist.splice(i, 1);
    }
  };

  if (window.MUSEUM_SEED) clean(window.MUSEUM_SEED.wishlist);

  ['theGameMuseumV352','theGameMuseumV35','theGameMuseumV34'].forEach(key => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      const saved = JSON.parse(raw);
      clean(saved.wishlist);
      localStorage.setItem(key, JSON.stringify(saved));
    } catch (_) {}
  });
})();
