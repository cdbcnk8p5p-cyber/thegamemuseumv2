// Museum audit overrides. Loaded after data.js and before app.js.
(() => {
  const updates = {"GM-0132":{"shop":"CEX","date":"","price":18,"image":"./assets/covers/grand-theft-auto-2-ps1.jpg","archiveImage":"./assets/archive/grand-theft-auto-2-ps1-original.jpg","notes":"Bought from CEX for £18. Clean cover used for the museum display; original collection photo preserved in the archive."},"GM-0133":{"shop":"Cash Converters, Blackpool","date":"","price":2.25,"image":"./assets/covers/tomb-raider-ps1.jpg","archiveImage":"./assets/archive/tomb-raider-ps1-original.jpg","notes":"Bought from Cash Converters in Blackpool for £2.25. Purchase date unknown. Clean cover used for the museum display; original collection photo preserved in the archive."},"GM-0134":{"shop":"Cash Converters, Blackpool","date":"","price":1.25,"image":"./assets/covers/tomb-raider-iii-ps1.jpg","archiveImage":"./assets/archive/tomb-raider-iii-ps1-original.jpg","notes":"Bought from Cash Converters in Blackpool for £1.25. Purchase date unknown. Clean cover used for the museum display; original collection photo preserved in the archive."}};
  const patchGames = games => (games || []).forEach(g => {
    const u = updates[g.id];
    if (u) Object.assign(g, u);
  });
  patchGames(window.MUSEUM_SEED && window.MUSEUM_SEED.games);
  ['theGameMuseumV352','theGameMuseumV35','theGameMuseumV34'].forEach(key => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return;
      const saved = JSON.parse(raw);
      patchGames(saved.games);
      localStorage.setItem(key, JSON.stringify(saved));
    } catch (_) {}
  });
})();
