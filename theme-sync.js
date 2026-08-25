// The Game Museum — keep browser/PWA chrome and neutral Museum controls aligned with the saved theme.
(() => {
  const LIGHT = '#f4f5f7';
  const DARK = '#24282f';
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const appleStatus = document.querySelector('meta[name="apple-mobile-web-app-status-bar-style"]');
  const themeButton = document.getElementById('themeBtn');

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
