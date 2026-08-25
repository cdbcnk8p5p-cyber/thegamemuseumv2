// The Game Museum — keep browser/PWA chrome and neutral Museum controls aligned with the saved theme.
(() => {
  const LIGHT = '#f4f5f7';
  const DARK = '#24282f';
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const appleStatus = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
  const themeButton = document.getElementById('themeBtn');

  const installBottomNavIcons = () => {
    const icons = {
      collection: '<svg class="museum-bottom-nav-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M7.2 7.2h9.6a4.5 4.5 0 0 1 4.3 3.2l1.2 3.8a3 3 0 0 1-5.5 2.4l-1.2-2H8.4l-1.2 2a3 3 0 0 1-5.5-2.4l1.2-3.8a4.5 4.5 0 0 1 4.3-3.2Z"/><path d="M7 10v4M5 12h4"/><path d="M16.4 10.6h.1M18.5 12.5h.1"/></svg>',
      cex: '<svg class="museum-bottom-nav-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M3 5h2l1.6 8.4a2.4 2.4 0 0 0 2.4 2h7.8a2.4 2.4 0 0 0 2.3-1.7L21 8H6"/><circle cx="9.5" cy="19.3" r="1.25"/><circle cx="18" cy="19.3" r="1.25"/></svg>'
    };

    Object.entries(icons).forEach(([page, icon]) => {
      const button = document.querySelector(`.bottom-nav button[data-page="${page}"]`);
      if (!button || button.querySelector('.museum-bottom-nav-icon')) return;
      [...button.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).forEach(node => node.remove());
      button.insertAdjacentHTML('afterbegin', icon);
    });
  };

  const neutralise = element => {
    if (!element) return;
    element.style.setProperty('background', 'var(--surface2)');
    element.style.setProperty('border-color', 'var(--line-strong)');
    element.style.setProperty('color', 'var(--ink)');
  };

  const syncNeutralControls = () => {
    const collectionFamily = document.getElementById('familyFilter');
    const collectionConsole = document.getElementById('platformFilter');
    const wishFamily = document.getElementById('wishFamilyFilter');
    const wishConsole = document.getElementById('wishConsoleFilter');
    const wishType = document.getElementById('wishPriority');

    if (collectionFamily && !collectionFamily.value) {
      neutralise(collectionFamily.nextElementSibling?.querySelector('.museum-custom-select-trigger'));
      collectionFamily.nextElementSibling?.querySelectorAll('.museum-custom-option[data-value=""]').forEach(neutralise);
    }
    if (collectionConsole && !collectionConsole.value && !collectionFamily?.value) {
      neutralise(collectionConsole.nextElementSibling?.querySelector('.museum-custom-select-trigger'));
      collectionConsole.nextElementSibling?.querySelectorAll('.museum-custom-option[data-value=""]').forEach(neutralise);
    }
    if (wishFamily && !wishFamily.value) {
      neutralise(wishFamily.nextElementSibling?.querySelector('.museum-custom-select-trigger'));
      wishFamily.nextElementSibling?.querySelectorAll('.museum-custom-option[data-value=""]').forEach(neutralise);
    }
    if (wishConsole && !wishConsole.value && !wishFamily?.value) {
      neutralise(wishConsole.nextElementSibling?.querySelector('.museum-custom-select-trigger'));
      wishConsole.nextElementSibling?.querySelectorAll('.museum-custom-option[data-value=""]').forEach(neutralise);
    }
    if (wishType && !wishType.value) {
      neutralise(wishType.nextElementSibling?.querySelector('.museum-custom-select-trigger'));
      wishType.nextElementSibling?.querySelectorAll('.museum-custom-option[data-value=""]').forEach(neutralise);
    }
  };

  const syncThemeChrome = () => {
    const dark = document.body.classList.contains('dark');
    const colour = dark ? DARK : LIGHT;
    if (themeMeta) themeMeta.setAttribute('content', colour);
    if (appleStatus) appleStatus.setAttribute('content', dark ? 'black-translucent' : 'default');
    document.documentElement.style.backgroundColor = colour;
    document.documentElement.style.colorScheme = dark ? 'dark' : 'light';
    if (themeButton) {
      themeButton.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      themeButton.setAttribute('title', dark ? 'Switch to light mode' : 'Switch to dark mode');
    }
    syncNeutralControls();
  };

  const bodyObserver = new MutationObserver(syncThemeChrome);
  bodyObserver.observe(document.body, {attributes:true, attributeFilter:['class']});

  ['familyFilter','platformFilter','wishFamilyFilter','wishConsoleFilter','wishPriority','sortFilter']
    .forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', () => setTimeout(syncNeutralControls, 0));
      el.addEventListener('change', () => setTimeout(syncNeutralControls, 0));
    });

  const uiObserver = new MutationObserver(() => setTimeout(syncNeutralControls, 0));
  uiObserver.observe(document.body, {childList:true, subtree:true});

  installBottomNavIcons();
  syncThemeChrome();
  setTimeout(syncThemeChrome, 80);
  setTimeout(syncThemeChrome, 300);
  setTimeout(syncThemeChrome, 900);
})();

// CEX Mode 2.0 stays isolated from the main catalogue code and loads after the Museum runtime is ready.
(() => {
  if (document.getElementById('museum-cex-mode-v2-script')) return;
  const script = document.createElement('script');
  script.id = 'museum-cex-mode-v2-script';
  script.src = './cex-mode-v2.js?v=3';
  document.body.appendChild(script);
})();
