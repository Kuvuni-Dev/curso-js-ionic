let _toggle;
let _label;

export function initTheme(toggle, label) {
  _toggle = toggle;
  _label = label;
  toggle.addEventListener('ionChange', (e) => applyTheme(e.detail.checked));

  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  if (prefersDark.matches) applyTheme(true);
}

export function applyTheme(dark) {
  document.documentElement.classList.toggle('ion-palette-dark', dark);
  _toggle.checked = dark;
  _label.textContent = dark ? 'Oscuro' : 'Claro';
}
