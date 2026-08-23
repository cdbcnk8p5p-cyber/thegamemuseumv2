const CACHE='game-museum-v3-5-3-shelf-tabs-v37';
const CORE=[
  './',
  './index.html',
  './styles.css?v=2',
  './theme-palette.css?v=2',
  './platform-filter-gold-outline.css?v=2',
  './drawer-layer-fix.css?v=1',
  './app.js',
  './data.js',
  './platform-standard.js?v=1',
  './haul-update-2026-08-12.js?v=2',
  './nintendo-ds-update.js',
  './nintendo-sega-update.js?v=1',
  './ps2-update.js?v=1',
  './wishlist-covers.js?v=2',
  './data-integrity.js?v=1',
  './filter-order.js?v=3',
  './collection-platform-filter.js?v=2',
  './shelf-sections.js?v=2',
  './gta3-platinum-display-fix.js?v=1',
  './ps5-update.js?v=1',
  './psp-vita-update.js?v=1',
  './family-guy-ps2-update.js?v=1',
  './wishlist-expansion-2026-08-23.js?v=1',
  './wishlist-gallery.js?v=1',
  './wishlist-collection-filter-style.js?v=1',
  './theme-sync.js?v=2',
  './xbox-one-ghosts-standard-fix.js',
  './xbox-original-360-update.js?v=1',
  './xbox-one-update.js?v=1',
  './xbox-final-update.js?v=1',
  './wishlist-gallery.css?v=1',
  './manifest.webmanifest',
  './icon-192.png',
  './icon-512.png'
];
self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)));
});
self.addEventListener('activate', event => {
  event.waitUntil(Promise.all([
    self.clients.claim(),
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
  ]));
});
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request, {cache:'no-store'}).then(response => {
      const copy=response.clone();
      caches.open(CACHE).then(cache => cache.put(event.request,copy));
      return response;
    }).catch(() => caches.match(event.request).then(response => response || caches.match('./index.html')))
  );
});
