// Compatibility hook retained because wishlist-gallery.js already requests this path.
// The Ghosts correction itself lives in wishlist-covers.js; this hook now loads the approved Xbox Original + 360 audit layer.
(()=>{
  if(document.getElementById('museum-xbox-original-360-update'))return;
  const script=document.createElement('script');
  script.id='museum-xbox-original-360-update';
  script.src='./xbox-original-360-update.js?v=1';
  document.head.appendChild(script);
})();
