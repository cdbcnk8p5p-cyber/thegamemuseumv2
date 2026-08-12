// Force the chosen featured acquisition on the Museum Hall.
(() => {
  const featuredId = 'GM-0165';
  const featured = (window.MUSEUM_SEED?.games || []).find(g => g.id === featuredId) || {
    id: featuredId,
    title: 'eFootball PES 2020',
    platform: 'PS4',
    edition: 'Celtic FC Edition',
    price: 18,
    image: './assets/covers/efootball-pes-2020-celtic-fc-edition-ps4.jpg'
  };

  const money = v => new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP'}).format(Number(v)||0);
  const esc = v => String(v ?? '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  const renderFeatured = () => {
    const cover = document.querySelector('#latestCover');
    const title = document.querySelector('#latestTitle');
    const meta = document.querySelector('#latestMeta');
    const open = document.querySelector('#latestOpen');
    if (!cover || !title || !meta || !open) return;

    cover.innerHTML = `<img src="${esc(featured.image)}" alt="${esc(featured.title)} cover art">`;
    title.textContent = featured.title;
    meta.textContent = `${featured.platform} • ${featured.edition || 'Standard'}${featured.price != null ? ' • ' + money(featured.price) : ''}`;
    open.onclick = () => { if (typeof openGame === 'function') openGame(featuredId); };
  };

  renderFeatured();
  requestAnimationFrame(renderFeatured);
  setTimeout(renderFeatured, 250);
})();
