// The Game Museum — cumulative Collection filters, PS3 catalogue batch, Display Games separation,
// price cards, sorting and Add Acquisition platform controls.
// Loaded after app.js so it can safely replace legacy collection behaviour.
(() => {
  const FAMILY_ORDER = ['Nintendo', 'Sega', 'PlayStation', 'Xbox'];
  const CROSS = 'Xbox Cross Generation';
  const CROSS_IDS = new Set(['GM-0015','GM-0016','GM-0017','GM-0018','GM-0019','GM-0020','GM-0021','GM-XCG-COLD-WAR']);
  const BATCH_UPDATES = {"GM-0088":{"id":"GM-0088","title":"Batman: Arkham City","platform":"PlayStation 3","edition":"Standard","category":"Main Collection","series":"","status":"Owned","display":"No","shop":"Forgotten Worlds, Stewarton","date":"","price":2,"image":"./assets/covers/batman-arkham-city-ps3.jpg","archiveImage":"./assets/archive/batman-arkham-city-ps3-original.jpg","notes":"Bought from Forgotten Worlds, Stewarton for £2. Purchase date not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive."},"GM-0089":{"id":"GM-0089","title":"F1 Championship Edition","platform":"PlayStation 3","edition":"Standard","category":"Main Collection","series":"Formula One","status":"Owned","display":"No","shop":"","date":"","price":null,"image":"./assets/covers/f1-championship-edition-ps3.jpg","archiveImage":"./assets/archive/f1-championship-edition-ps3-original.jpg","notes":"Purchase details not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive."},"GM-0090":{"id":"GM-0090","title":"F1 2010","platform":"PlayStation 3","edition":"Standard","category":"Main Collection","series":"Formula One","status":"Owned","display":"No","shop":"","date":"","price":null,"image":"./assets/covers/f1-2010-ps3.jpg","archiveImage":"./assets/archive/f1-2010-ps3-original.jpg","notes":"Purchase details not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive."},"GM-0091":{"id":"GM-0091","title":"F1 2011","platform":"PlayStation 3","edition":"Standard","category":"Main Collection","series":"Formula One","status":"Owned","display":"No","shop":"","date":"","price":null,"image":"./assets/covers/f1-2011-ps3.jpg","archiveImage":"./assets/archive/f1-2011-ps3-original.jpg","notes":"Purchase details not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive."},"GM-0092":{"id":"GM-0092","title":"F1 2012","platform":"PlayStation 3","edition":"Standard","category":"Main Collection","series":"Formula One","status":"Owned","display":"No","shop":"Forgotten Worlds, Stewarton","date":"","price":2,"image":"./assets/covers/f1-2012-ps3.jpg","archiveImage":"./assets/archive/f1-2012-ps3-original.jpg","notes":"Bought from Forgotten Worlds, Stewarton for £2. Purchase date not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive."},"GM-0093":{"id":"GM-0093","title":"F1 2013","platform":"PlayStation 3","edition":"Complete Edition","category":"Main Collection","series":"Formula One","status":"Owned","display":"No","shop":"CEX","date":"","price":15,"image":"./assets/covers/f1-2013-complete-edition-ps3.jpg","archiveImage":"./assets/archive/f1-2013-complete-edition-ps3-original.jpg","notes":"Bought from CEX for £15. Purchase date not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive."},"GM-0094":{"id":"GM-0094","title":"Ferrari Challenge: Trofeo Pirelli","platform":"PlayStation 3","edition":"Standard","category":"Main Collection","series":"","status":"Owned","display":"No","shop":"","date":"","price":null,"image":"./assets/covers/ferrari-challenge-trofeo-pirelli-ps3.jpg","archiveImage":"./assets/archive/ferrari-challenge-trofeo-pirelli-ps3-original.jpg","notes":"Purchase details not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive."},"GM-0095":{"id":"GM-0095","title":"FIFA 09","platform":"PlayStation 3","edition":"Standard","category":"Main Collection","series":"FIFA / EA Sports FC","status":"Owned","display":"No","shop":"","date":"","price":null,"image":"./assets/covers/fifa-09-ps3.jpg","archiveImage":"./assets/archive/fifa-09-ps3-original.jpg","notes":"Purchase details not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive."},"GM-0096":{"id":"GM-0096","title":"FIFA 10","platform":"PlayStation 3","edition":"Standard","category":"Main Collection","series":"FIFA / EA Sports FC","status":"Owned","display":"No","shop":"","date":"","price":null,"image":"./assets/covers/fifa-10-ps3.webp","archiveImage":"./assets/archive/fifa-10-ps3-original.jpg","notes":"Purchase details not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive."},"GM-0097":{"id":"GM-0097","title":"FIFA 11","platform":"PlayStation 3","edition":"Standard","category":"Main Collection","series":"FIFA / EA Sports FC","status":"Owned","display":"No","shop":"","date":"","price":null,"image":"./assets/covers/fifa-11-ps3.webp","archiveImage":"./assets/archive/fifa-11-ps3-original.jpg","notes":"Purchase details not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive."},"GM-0098":{"id":"GM-0098","title":"FIFA 12","platform":"PlayStation 3","edition":"Standard","category":"Main Collection","series":"FIFA / EA Sports FC","status":"Owned","display":"No","shop":"CEX","date":"","price":0.5,"image":"./assets/covers/fifa-12-ps3.webp","archiveImage":"./assets/archive/fifa-12-ps3-original.jpg","notes":"Bought from CEX for £0.5. Purchase date not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive."},"GM-0099":{"id":"GM-0099","title":"FIFA 13","platform":"PlayStation 3","edition":"Standard","category":"Main Collection","series":"FIFA / EA Sports FC","status":"Owned","display":"No","shop":"","date":"","price":null,"image":"./assets/covers/fifa-13-ps3.jpg","archiveImage":"./assets/archive/fifa-13-ps3-original.jpg","notes":"Purchase details not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive."},"GM-0100":{"id":"GM-0100","title":"Grand Theft Auto IV","platform":"PlayStation 3","edition":"Standard","category":"Main Collection","series":"Grand Theft Auto","status":"Owned","display":"No","shop":"Cash Converters","date":"","price":4.99,"image":"./assets/covers/grand-theft-auto-iv-ps3.jpg","archiveImage":"./assets/archive/grand-theft-auto-iv-ps3-original.jpg","notes":"Bought from Cash Converters for £4.99. Purchase date not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive."},"GM-0101":{"id":"GM-0101","title":"Grand Theft Auto: Episodes from Liberty City","platform":"PlayStation 3","edition":"Standard","category":"Main Collection","series":"Grand Theft Auto","status":"Owned","display":"No","shop":"CEX","date":"","price":8,"image":"./assets/covers/grand-theft-auto-episodes-from-liberty-city-ps3.webp","archiveImage":"./assets/archive/grand-theft-auto-episodes-from-liberty-city-ps3-original.jpg","notes":"Bought from CEX for £8. Purchase date not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive."},"GM-0102":{"id":"GM-0102","title":"Grand Theft Auto V","platform":"PlayStation 3","edition":"Standard","category":"Main Collection","series":"Grand Theft Auto","status":"Owned","display":"No","shop":"","date":"","price":null,"image":"./assets/covers/grand-theft-auto-v-ps3.jpg","archiveImage":"./assets/archive/grand-theft-auto-v-ps3-original.jpg","notes":"Purchase details not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive."},"GM-0103":{"id":"GM-0103","title":"L.A. Noire","platform":"PlayStation 3","edition":"Standard","category":"Main Collection","series":"","status":"Owned","display":"No","shop":"CEX","date":"","price":2.5,"image":"./assets/covers/la-noire-ps3.jpg","archiveImage":"./assets/archive/la-noire-ps3-original.jpg","notes":"Bought from CEX for £2.5. Purchase date not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive."},"GM-0104":{"id":"GM-0104","title":"PDC World Championship Darts: Pro Tour","platform":"PlayStation 3","edition":"Standard","category":"Main Collection","series":"","status":"Owned","display":"No","shop":"CEX","date":"","price":15,"image":"./assets/covers/pdc-world-championship-darts-pro-tour-ps3.webp","archiveImage":"./assets/archive/pdc-world-championship-darts-pro-tour-ps3-original.jpg","notes":"Bought from CEX for £15. Purchase date not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive."},"GM-0105":{"id":"GM-0105","title":"Red Dead Redemption","platform":"PlayStation 3","edition":"Standard","category":"Main Collection","series":"","status":"Owned","display":"No","shop":"Cash Converters","date":"","price":4,"image":"./assets/covers/red-dead-redemption-ps3.jpg","archiveImage":"./assets/archive/red-dead-redemption-ps3-original.jpg","notes":"Bought from Cash Converters for £4. Purchase date not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive."},"GM-0106":{"id":"GM-0106","title":"Saints Row: The Third","platform":"PlayStation 3","edition":"Standard","category":"Main Collection","series":"Saints Row","status":"Owned","display":"No","shop":"","date":"","price":null,"image":"./assets/covers/saints-row-the-third-ps3.jpg","archiveImage":"./assets/archive/saints-row-the-third-ps3-original.jpg","notes":"Purchase details not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive."},"GM-0107":{"id":"GM-0107","title":"The Simpsons Game","platform":"PlayStation 3","edition":"Standard","category":"Main Collection","series":"","status":"Owned","display":"No","shop":"CEX","date":"","price":22,"image":"./assets/covers/the-simpsons-game-ps3.webp","archiveImage":"./assets/archive/the-simpsons-game-ps3-original.jpg","notes":"Bought from CEX for £22. Purchase date not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive."},"GM-0108":{"id":"GM-0108","title":"The Last of Us","platform":"PlayStation 3","edition":"Standard","category":"Main Collection","series":"The Last of Us","status":"Owned","display":"No","shop":"CEX","date":"","price":5,"image":"./assets/covers/the-last-of-us-ps3.jpg","archiveImage":"./assets/archive/the-last-of-us-ps3-original.jpg","notes":"Bought from CEX for £5. Purchase date not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive."},"GM-0158":{"id":"GM-0158","title":"Grand Theft Auto V","platform":"PlayStation 3","edition":"Steelbook","category":"Display Gallery","series":"Grand Theft Auto","status":"Owned","display":"Yes","shop":"","date":"","price":null,"image":"./assets/covers/grand-theft-auto-v-steelbook-ps3.jpg","archiveImage":"./assets/archive/grand-theft-auto-v-steelbook-ps3-original.jpg","notes":"Display-only steelbook. Purchase details not recorded. Exact user-supplied steelbook artwork used for the Museum display; physical-copy photo preserved in the archive."},"GM-0066":{"id":"GM-0066","title":"F1 2016","platform":"PlayStation 4","edition":"Steelbook","category":"Display Gallery","series":"Formula One","status":"Owned","display":"Yes","shop":"Forgotten Worlds, Stewarton","date":"","price":8,"image":"./assets/covers/f1-2016-steelbook-ps4.jpg","archiveImage":"./assets/archive/f1-2016-steelbook-ps4-original.jpg","notes":"Bought from Forgotten Worlds, Stewarton for £8. Purchase date not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive. Display-only copy."},"GM-0160":{"id":"GM-0160","title":"FIFA 16","platform":"PlayStation 4","edition":"Deluxe Edition","category":"Display Gallery","series":"FIFA / EA Sports FC","status":"Owned","display":"Yes","shop":"","date":"","price":null,"image":"./assets/covers/fifa-16-deluxe-edition-ps4.jpg","archiveImage":"./assets/archive/fifa-16-deluxe-edition-ps4-original.jpg","notes":"Display-only Deluxe Edition. Purchase details not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive."},"GM-0067":{"id":"GM-0067","title":"F1 2017","platform":"PlayStation 4","edition":"Special Edition","category":"Display Gallery","series":"Formula One","status":"Owned","display":"Yes","shop":"CEX","date":"","price":5,"image":"./assets/covers/f1-2017-special-edition-ps4.jpg","archiveImage":"./assets/archive/f1-2017-special-edition-ps4-original.jpg","notes":"Bought from CEX for £5. Purchase date not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive. Display-only Special Edition; Standard Edition remains a wishlist target for the Main Shelf."},"GM-0069":{"id":"GM-0069","title":"F1 2019","platform":"PlayStation 4","edition":"Legends Edition: Senna and Prost","category":"Display Gallery","series":"Formula One","status":"Owned","display":"Yes","shop":"CEX","date":"","price":8,"image":"./assets/covers/f1-2019-legends-edition-ps4.webp","archiveImage":"./assets/archive/f1-2019-legends-edition-ps4-original.jpg","notes":"Bought from CEX for £8. Purchase date not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive. Display-only Legends Edition; Standard Edition remains a wishlist target for the Main Shelf."}};
  const BATCH_NEW = [{"id":"GM-0172","title":"F1 2014","platform":"PlayStation 3","edition":"Standard","category":"Main Collection","series":"Formula One","status":"Owned","display":"No","shop":"CEX","date":"","price":8,"image":"./assets/covers/f1-2014-ps3.webp","archiveImage":"./assets/archive/f1-2014-ps3-original.jpg","notes":"Bought from CEX for £8. Purchase date not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive."},{"id":"GM-0173","title":"F1 Race Stars","platform":"PlayStation 3","edition":"Standard","category":"Main Collection","series":"Formula One","status":"Owned","display":"No","shop":"CEX","date":"","price":3,"image":"./assets/covers/f1-race-stars-ps3.jpg","archiveImage":"./assets/archive/f1-race-stars-ps3-original.jpg","notes":"Bought from CEX for £3. Purchase date not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive."},{"id":"GM-0174","title":"2014 FIFA World Cup Brazil","platform":"PlayStation 3","edition":"Standard","category":"Main Collection","series":"FIFA / EA Sports FC","status":"Owned","display":"No","shop":"CEX","date":"","price":5,"image":"./assets/covers/2014-fifa-world-cup-brazil-ps3.webp","archiveImage":"./assets/archive/2014-fifa-world-cup-brazil-ps3-original.jpg","notes":"Bought from CEX for £5. Purchase date not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive. Included in the FIFA / EA Sports FC exhibit."},{"id":"GM-0175","title":"Grand Theft Auto III","platform":"PlayStation 2","edition":"Platinum","category":"Display Gallery","series":"Grand Theft Auto","status":"Owned","display":"Yes","shop":"","date":"","price":null,"image":"./assets/covers/grand-theft-auto-iii-platinum-ps2.jpg","archiveImage":"./assets/archive/grand-theft-auto-iii-platinum-ps2-original.jpg","notes":"Display-only Platinum copy; the standard PS2 copy remains on the Main Shelf. Purchase details not recorded. Exact user-supplied cover used for the Museum display; physical-copy photo preserved in the archive."},{"id":"GM-0176","title":"The Last of Us","platform":"PlayStation 3","edition":"Steelbook","category":"Display Gallery","series":"The Last of Us","status":"Owned","display":"Yes","shop":"","date":"","price":null,"image":"./assets/covers/the-last-of-us-steelbook-ps3.jpg","archiveImage":"./assets/archive/the-last-of-us-steelbook-ps3-original.jpg","notes":"Display-only steelbook. Purchase details not recorded. Exact user-supplied steelbook artwork used for the Museum display; physical-copy photo preserved in the archive."}];
  const DISPLAY_IDS = new Set(['GM-0061','GM-0066','GM-0067','GM-0069','GM-0158','GM-0159','GM-0160','GM-0175','GM-0176']);

  const titleKey = value => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
  const canonical = value => typeof window.MUSEUM_CANONICAL_PLATFORM === 'function' ? window.MUSEUM_CANONICAL_PLATFORM(value) : String(value || '').trim();
  const hasKnownPrice = game => game?.price !== null && game?.price !== undefined && game?.price !== '' && Number.isFinite(Number(game.price));
  const hasKnownDate = game => Boolean(String(game?.date || '').trim());
  const isDisplayGame = game => game?.category === 'Display Gallery' || String(game?.display || '').toLowerCase() === 'yes';

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
  const isCrossGame = game => canonical(game?.platform) === CROSS || CROSS_IDS.has(String(game?.id || '')) || isLegacyCrossTitle(titleKey(game?.title));
  const effectivePlatform = game => isCrossGame(game) ? CROSS : canonical(game?.platform);
  const familyOf = platform => {
    const name = canonical(platform), p = name.toLowerCase();
    if (name === CROSS || p.includes('xbox')) return 'Xbox';
    if (p.includes('nintendo')) return 'Nintendo';
    if (p.includes('sega')) return 'Sega';
    if (p.includes('playstation')) return 'PlayStation';
    return '';
  };
  const rankPlatform = name => {
    const order = window.MUSEUM_PLATFORM_ORDER || [], i = order.indexOf(canonical(name));
    return i === -1 ? order.length : i;
  };

  function sameValue(a,b) { return JSON.stringify(a) === JSON.stringify(b); }
  function mergeRecord(target, patch) {
    let changed = false;
    Object.entries(patch).forEach(([key,value]) => { if (!sameValue(target[key],value)) { target[key]=value; changed=true; } });
    return changed;
  }
  function findEquivalent(games, record) {
    return games.find(g => String(g?.id || '') === String(record.id)) || games.find(g =>
      titleKey(g?.title) === titleKey(record.title) && canonical(g?.platform) === canonical(record.platform) &&
      String(g?.edition || 'Standard').toLowerCase() === String(record.edition || 'Standard').toLowerCase()
    );
  }
  function applyPS3DisplayBatch(data) {
    if (!data || !Array.isArray(data.games)) return false;
    let changed = false;
    Object.values(BATCH_UPDATES).forEach(record => {
      let game = data.games.find(g => String(g?.id || '') === String(record.id));
      if (!game) { game = findEquivalent(data.games, record); }
      if (!game) { data.games.push(JSON.parse(JSON.stringify(record))); changed=true; }
      else if (mergeRecord(game, record)) changed=true;
    });
    BATCH_NEW.forEach(record => {
      let game = findEquivalent(data.games, record);
      if (!game) { data.games.push(JSON.parse(JSON.stringify(record))); changed=true; }
      else if (mergeRecord(game, record)) changed=true;
    });
    data.games.forEach(game => {
      if (DISPLAY_IDS.has(String(game?.id || ''))) {
        if (game.category !== 'Display Gallery') { game.category='Display Gallery'; changed=true; }
        if (game.display !== 'Yes') { game.display='Yes'; changed=true; }
      }
      if (String(game?.id || '') === 'GM-0121' || (titleKey(game?.title) === 'fifa street' && canonical(game?.platform) === 'PlayStation 2')) {
        if (game.series !== 'FIFA / EA Sports FC') { game.series='FIFA / EA Sports FC'; changed=true; }
      }
    });
    return changed;
  }
  function applyBatchEverywhere() {
    try { if (window.MUSEUM_SEED) applyPS3DisplayBatch(window.MUSEUM_SEED); } catch (_) {}
    try {
      for (let i=0;i<localStorage.length;i++) {
        const key=localStorage.key(i); if (!key || !key.startsWith('theGameMuseumV')) continue;
        const raw=localStorage.getItem(key); if (!raw) continue;
        const data=JSON.parse(raw); if (applyPS3DisplayBatch(data)) localStorage.setItem(key,JSON.stringify(data));
      }
    } catch (_) {}
    try { if (typeof state !== 'undefined' && applyPS3DisplayBatch(state) && typeof save === 'function') save(); } catch (_) {}
  }

  function ensureCrossGeneration() {
    try {
      if (typeof state === 'undefined' || !Array.isArray(state.games)) return;
      let changed=false;
      let coldWar=state.games.find(g => String(g?.id || '') === 'GM-XCG-COLD-WAR' || titleKey(g?.title).includes('black ops cold war'));
      if (!coldWar) {
        state.games.push({id:'GM-XCG-COLD-WAR',title:'Call of Duty: Black Ops Cold War',platform:CROSS,edition:'Standard',category:'Main Collection',series:'Call of Duty',status:'Owned',display:'No',shop:'',date:'',price:null,notes:'Owned physical copy. Recategorised as Xbox Cross Generation; purchase details not recorded.'}); changed=true;
      }
      state.games.forEach(game => {
        if (!CROSS_IDS.has(String(game?.id || '')) && !isLegacyCrossTitle(titleKey(game?.title))) return;
        if (game.platform !== CROSS) { game.platform=CROSS; changed=true; }
      });
      const seen=new Set(), before=state.games.length;
      state.games=state.games.filter(game => {
        const key=[titleKey(game?.title),effectivePlatform(game).toLowerCase(),String(game?.edition || 'Standard').toLowerCase(),String(game?.category || 'Main Collection').toLowerCase()].join('|');
        if (seen.has(key)) return false; seen.add(key); return true;
      });
      if (state.games.length !== before) changed=true;
      if (changed && typeof save === 'function') save();
    } catch (_) {}
  }

  function updateMuseumTotals() {
    try {
      const games = Array.isArray(state?.games) ? state.games : [];
      const display = games.filter(isDisplayGame).length;
      const main = games.filter(g => g?.category === 'Main Collection' && !isDisplayGame(g)).length;
      const all = main + display;
      const mainEl=document.getElementById('mainCount'), displayEl=document.getElementById('displayCount'), allEl=document.getElementById('wishlistCount');
      if (mainEl) mainEl.textContent=main;
      if (displayEl) displayEl.textContent=display;
      if (allEl) allEl.textContent=all;
      const headline=document.getElementById('headlineTotal'); if (headline) headline.textContent=all;
      const stats=[...document.querySelectorAll('#home .stat-grid article')];
      if (stats[0]) { stats[0].querySelector('small').textContent='Main Shelf Total'; stats[0].querySelector('span').textContent='main-shelf games'; }
      if (stats[1]) { stats[1].querySelector('small').textContent='Display Games Total'; stats[1].querySelector('span').textContent='display-only copies'; }
      if (stats[2]) { stats[2].querySelector('small').textContent='All Games Total'; stats[2].querySelector('span').textContent='main + display'; }
    } catch (_) {}
  }
  function patchDashboard() {
    try {
      if (typeof dashboard !== 'function' || dashboard.__museumTotalsPatched) return;
      const base=dashboard;
      const patched=function() { base(); updateMuseumTotals(); };
      patched.__museumTotalsPatched=true; dashboard=patched;
      updateMuseumTotals();
    } catch (_) {}
  }

  function patchCardPresentation() {
    try {
      if (typeof card !== 'function' || card.__museumCardPatched) return;
      const baseCard=card;
      const gbp=new Intl.NumberFormat('en-GB',{style:'currency',currency:'GBP'});
      const patched=function(g) {
        let html=baseCard(g)
          .replace('>Main Collection</span>','>Main Shelf</span>')
          .replace('>Display Gallery</span>','>Display Games</span>');
        const value=hasKnownPrice(g)?gbp.format(Number(g.price)):'Not recorded';
        return html.replace('</h3></div></button>',`</h3><div class="game-card-price"><span>Price</span><strong>${value}</strong></div></div></button>`);
      };
      patched.__museumCardPatched=true; card=patched;
      if (!document.getElementById('museum-card-price-style')) {
        const style=document.createElement('style'); style.id='museum-card-price-style';
        style.textContent='.game-card-price{margin-top:9px;padding-top:8px;border-top:1px solid var(--line);display:flex;justify-content:space-between;align-items:center;gap:8px}.game-card-price span{font-size:10px;color:var(--muted);font-weight:700}.game-card-price strong{font-size:12px;color:var(--ink);font-weight:900;text-align:right}'; document.head.appendChild(style);
      }
    } catch (_) {}
  }
  function patchOpenGameLabels() {
    try {
      if (typeof openGame !== 'function' || openGame.__museumGalleryPatched) return;
      const base=openGame;
      const patched=function(id) {
        base(id);
        [...document.querySelectorAll('#dialogContent .detail')].forEach(row => {
          const label=row.querySelector('span'), value=row.querySelector('strong');
          if (label?.textContent === 'Gallery' && value) {
            if (value.textContent === 'Main Collection') value.textContent='Main Shelf';
            if (value.textContent === 'Display Gallery') value.textContent='Display Games';
          }
        });
      };
      patched.__museumGalleryPatched=true; openGame=patched;
    } catch (_) {}
  }

  function setupAddAcquisitionPlatforms() {
    const form=document.getElementById('addForm'); if (!form) return;
    const gallerySelect=form.querySelector('select[name="category"]');
    if (gallerySelect) gallerySelect.innerHTML='<option value="Main Collection">Main Shelf</option><option value="Display Gallery">Display Games</option>';
    if (document.getElementById('addFamilyFilter')) return;
    const oldInput=form.querySelector('input[name="platform"]'); if (!oldInput) return;
    const consoleLabel=oldInput.closest('label'); if (!consoleLabel) return;
    const familyLabel=document.createElement('label'); familyLabel.textContent='Platform family';
    const familySelect=document.createElement('select'); familySelect.id='addFamilyFilter'; familySelect.required=true; familyLabel.appendChild(familySelect);
    const consoleSelect=document.createElement('select'); consoleSelect.id='addPlatformFilter'; consoleSelect.name='platform'; consoleSelect.required=true; oldInput.replaceWith(consoleSelect);
    [...consoleLabel.childNodes].forEach(node => { if (node.nodeType===Node.TEXT_NODE && node.textContent.trim()) node.textContent='Console'; }); consoleLabel.before(familyLabel);
    const supportedPlatforms=()=>{
      const standard=Array.isArray(window.MUSEUM_PLATFORM_ORDER)?window.MUSEUM_PLATFORM_ORDER:[];
      const fromState=Array.isArray(state?.games)?state.games.map(g=>effectivePlatform(g)):[];
      return [...new Set([...standard,...fromState].map(canonical).filter(p=>p&&familyOf(p)))].sort((a,b)=>rankPlatform(a)-rankPlatform(b)||a.localeCompare(b,undefined,{numeric:true,sensitivity:'base'}));
    };
    const populateFamilies=()=>{ const platforms=supportedPlatforms(),families=FAMILY_ORDER.filter(f=>platforms.some(p=>familyOf(p)===f)); familySelect.innerHTML='<option value="">Choose platform family</option>'+families.map(f=>`<option value="${f}">${f}</option>`).join(''); };
    const populateConsoles=()=>{ const family=familySelect.value,choices=supportedPlatforms().filter(p=>family&&familyOf(p)===family); consoleSelect.innerHTML='<option value="">Choose console</option>'+choices.map(p=>`<option value="${p}">${p}</option>`).join(''); consoleSelect.disabled=!family; };
    populateFamilies(); populateConsoles(); familySelect.addEventListener('change',populateConsoles);
    form.addEventListener('reset',()=>queueMicrotask(()=>{familySelect.value='';populateConsoles();}));
  }

  function setupCollection() {
    ensureCrossGeneration(); patchCardPresentation();
    const family=document.getElementById('familyFilter'),consoleSelect=document.getElementById('platformFilter'),search=document.getElementById('searchInput'),gallery=document.getElementById('categoryFilter'),sort=document.getElementById('sortFilter'),resultCount=document.getElementById('resultCount'),grid=document.getElementById('collectionGrid');
    if (!family||!consoleSelect||!search||!gallery||!sort||!grid) return;
    gallery.innerHTML='<option value="Main Collection">Main Shelf</option><option value="Display Gallery">Display Games</option><option value="">All Games</option>'; gallery.value='Main Collection';
    const currentPlatforms=()=>{ ensureCrossGeneration(); return [...new Set((state?.games||[]).map(effectivePlatform).filter(Boolean))].sort((a,b)=>rankPlatform(a)-rankPlatform(b)||a.localeCompare(b,undefined,{numeric:true,sensitivity:'base'})); };
    function populateFamilies() { const current=family.value,platforms=currentPlatforms(),families=FAMILY_ORDER.filter(name=>platforms.some(p=>familyOf(p)===name)); family.innerHTML='<option value="">All platform families</option>'+families.map(name=>`<option value="${name}">${name}</option>`).join(''); if (families.includes(current)) family.value=current; }
    function populateConsoles(resetInvalid=true) { const current=canonical(consoleSelect.value),selectedFamily=family.value,choices=currentPlatforms().filter(p=>!selectedFamily||familyOf(p)===selectedFamily); consoleSelect.innerHTML='<option value="">All consoles</option>'+choices.map(p=>`<option value="${p}">${p}</option>`).join(''); if (choices.includes(current)) consoleSelect.value=current; else if (resetInvalid) consoleSelect.value=''; }
    function updateSortOptions() { const current=sort.value,specificConsole=Boolean(consoleSelect.value),options=[['title','A–Z'],...(!specificConsole?[['platform','Platform']]:[]),['newest','Newest entry'],['oldest','Oldest entry'],['priceHigh','Highest price'],['priceLow','Lowest price']]; sort.innerHTML=options.map(([value,label])=>`<option value="${value}">${label}</option>`).join(''); sort.value=options.some(([value])=>value===current)?current:'title'; }
    function renderCollection() {
      ensureCrossGeneration(); patchCardPresentation(); updateMuseumTotals();
      const q=norm(search.value),fam=family.value,p=canonical(consoleSelect.value),c=gallery.value,sortMode=sort.value;
      let arr=state.games.filter(g=>{ const gp=effectivePlatform(g),hay=norm([g.title,gp,g.series,g.edition,g.category].join(' ')); return (!q||hay.includes(q))&&(!fam||familyOf(gp)===fam)&&(!p||gp===p)&&(!c||g.category===c); });
      if (sortMode==='priceHigh'||sortMode==='priceLow') arr=arr.filter(hasKnownPrice);
      arr.sort((a,b)=>{
        if (sortMode==='platform') return rankPlatform(effectivePlatform(a))-rankPlatform(effectivePlatform(b))||effectivePlatform(a).localeCompare(effectivePlatform(b))||a.title.localeCompare(b.title);
        if (sortMode==='priceHigh') return Number(b.price)-Number(a.price)||a.title.localeCompare(b.title);
        if (sortMode==='priceLow') return Number(a.price)-Number(b.price)||a.title.localeCompare(b.title);
        if (sortMode==='newest') { if (hasKnownDate(a)!==hasKnownDate(b)) return hasKnownDate(a)?-1:1; return String(b.date||'').localeCompare(String(a.date||''))||a.title.localeCompare(b.title); }
        if (sortMode==='oldest') { if (hasKnownDate(a)!==hasKnownDate(b)) return hasKnownDate(a)?-1:1; return String(a.date||'').localeCompare(String(b.date||''))||a.title.localeCompare(b.title); }
        return a.title.localeCompare(b.title);
      });
      if (resultCount) resultCount.textContent=`${arr.length} ${arr.length===1?'record':'records'}${(sortMode==='priceHigh'||sortMode==='priceLow')?' with recorded prices':''}`;
      grid.innerHTML=arr.map(g=>card(g)).join('')||`<article class="panel">${(sortMode==='priceHigh'||sortMode==='priceLow')?'No recorded prices found for this selection.':'No catalogue records found.'}</article>`;
      $$('.game-card').forEach(x=>x.onclick=()=>openGame(x.dataset.id));
    }
    try { collection=renderCollection; } catch (_) {}
    try { platformFilter=()=>{populateConsoles(false);updateSortOptions();}; } catch (_) {}
    populateFamilies(); populateConsoles(false); updateSortOptions(); renderCollection();
    family.addEventListener('input',()=>{populateConsoles(true);updateSortOptions();renderCollection();});
    consoleSelect.addEventListener('input',()=>{updateSortOptions();renderCollection();}); consoleSelect.addEventListener('change',()=>{updateSortOptions();renderCollection();});
    search.addEventListener('input',renderCollection); gallery.addEventListener('input',renderCollection); gallery.addEventListener('change',renderCollection); sort.addEventListener('input',renderCollection); sort.addEventListener('change',renderCollection);
    const clear=document.getElementById('clearFilters'); if (clear) clear.onclick=()=>{search.value='';family.value='';gallery.value='Main Collection';populateConsoles(true);updateSortOptions();sort.value='title';renderCollection();};
    let restoring=false; const observer=new MutationObserver(()=>{ if (restoring) return; const allowed=currentPlatforms().filter(p=>!family.value||familyOf(p)===family.value),values=[...consoleSelect.options].filter(o=>o.value).map(o=>canonical(o.value)); if (allowed.join('|')!==values.join('|')) {restoring=true;populateConsoles(false);updateSortOptions();restoring=false;} }); observer.observe(consoleSelect,{childList:true});
    setTimeout(()=>{populateFamilies();populateConsoles(false);updateSortOptions();renderCollection();},100);
    setTimeout(()=>{populateFamilies();populateConsoles(false);updateSortOptions();renderCollection();},700);
  }

  function setup() { applyBatchEverywhere(); ensureCrossGeneration(); patchDashboard(); patchCardPresentation(); patchOpenGameLabels(); setupCollection(); setupAddAcquisitionPlatforms(); updateMuseumTotals(); try { if (typeof dashboard==='function') dashboard(); } catch (_) {} }
  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',setup); else setup();
})();
