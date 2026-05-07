/**
 * @file ion-menu.demo.js
 * @description Demo didáctico de <ion-menu> e <ion-menu-button>.
 */

const CODE_EXAMPLE = `<ion-menu content-id="main-content" side="start" menu-id="main-menu">
  <ion-header>
    <ion-toolbar color="primary">
      <ion-title>Menú</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-list>
      <ion-item button="true" router-link="/home">Inicio</ion-item>
      <ion-item button="true" router-link="/cursos">Cursos</ion-item>
      <ion-item button="true" router-link="/perfil">Perfil</ion-item>
    </ion-list>
  </ion-content>
</ion-menu>

<ion-header>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-menu-button menu="main-menu"></ion-menu-button>
    </ion-buttons>
    <ion-title>Dashboard</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content id="main-content">...</ion-content>`;

const MENU_ITEMS = [
  { key: 'inicio', label: 'Inicio', icon: 'home-outline', desc: 'Resumen general y accesos rápidos.' },
  { key: 'modulos', label: 'Módulos', icon: 'layers-outline', desc: 'Contenido del curso por bloques temáticos.' },
  { key: 'favoritos', label: 'Favoritos', icon: 'heart-outline', desc: 'Lecciones guardadas por el estudiante.' },
  { key: 'ajustes', label: 'Ajustes', icon: 'settings-outline', desc: 'Preferencias de cuenta y notificaciones.' },
];

function menuItem(item, active) {
  return `
    <button class="demo-menu-item${active ? ' demo-menu-item--active' : ''}" data-menu-item="${item.key}">
      <ion-icon name="${item.icon}"></ion-icon>
      <span>${item.label}</span>
    </button>
  `;
}

export function render() {
  const active = MENU_ITEMS[0];

  return `
    <section class="demo-page">
      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-menu</h2>
        <p class="demo-desc">
          <code>ion-menu</code> crea un panel lateral deslizable.
          <code>ion-menu-button</code> lo abre/cierra desde toolbar u otras zonas.
        </p>
      </div>

      <div class="demo-group">
        <h3 class="demo-group-title">Demo interactivo: drawer lateral</h3>
        <p class="demo-group-desc">
          Pulsa el botón Menú para abrir/cerrar el panel y selecciona una sección.
        </p>

        <div class="demo-menu-shell">
          <div class="demo-menu-topbar">
            <ion-button size="small" id="menu-toggle-btn">
              <ion-icon slot="start" name="menu-outline"></ion-icon>
              Menú
            </ion-button>
            <span class="demo-menu-title">Dashboard docente</span>
          </div>

          <div class="demo-menu-body">
            <aside class="demo-menu-panel" id="menu-panel">
              <div class="demo-menu-panel-head">
                <div class="demo-menu-avatar">JS</div>
                <div>
                  <strong>Curso JS + Ionic</strong>
                  <p>Panel lateral de navegación</p>
                </div>
              </div>
              <div class="demo-menu-list" id="menu-list">
                ${MENU_ITEMS.map((it, i) => menuItem(it, i === 0)).join('')}
              </div>
            </aside>

            <main class="demo-menu-content" id="menu-content">
              <h4 id="menu-content-title">${active.label}</h4>
              <p id="menu-content-text">${active.desc}</p>
            </main>
          </div>
        </div>

        <div class="demo-nav-log" id="menu-log">
          Evento simulado: ionDidOpen (menu abierto)
        </div>
      </div>

      <div class="demo-group">
        <h3 class="demo-group-title">Eventos útiles</h3>
        <div class="demo-attr-table">
          <div class="demo-attr-row">
            <code>ionWillOpen / ionDidOpen</code>
            <span>Antes y después de abrir el menú.</span>
          </div>
          <div class="demo-attr-row">
            <code>ionWillClose / ionDidClose</code>
            <span>Antes y después de cerrar el menú.</span>
          </div>
          <div class="demo-attr-row">
            <code>content-id</code>
            <span>Debe apuntar al id del contenido principal que desplaza el menú.</span>
          </div>
          <div class="demo-attr-row">
            <code>side</code>
            <span>Define lado del menú: <code>start</code> o <code>end</code>.</span>
          </div>
        </div>
      </div>

      <div class="demo-group">
        <h3 class="demo-group-title">Código de ejemplo</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_EXAMPLE)}</code></pre>
      </div>
    </section>
  `;
}

export function init(container) {
  let open = true;
  let current = MENU_ITEMS[0].key;

  const panel = container.querySelector('#menu-panel');
  const toggleBtn = container.querySelector('#menu-toggle-btn');
  const log = container.querySelector('#menu-log');
  const title = container.querySelector('#menu-content-title');
  const text = container.querySelector('#menu-content-text');

  function setOpen(next) {
    open = next;
    panel.classList.toggle('demo-menu-panel--open', open);
    panel.classList.toggle('demo-menu-panel--closed', !open);
    if (open) {
      log.innerHTML = '<ion-icon name="log-in-outline"></ion-icon> Evento simulado: <code>ionDidOpen</code>';
    } else {
      log.innerHTML = '<ion-icon name="log-out-outline"></ion-icon> Evento simulado: <code>ionDidClose</code>';
    }
  }

  toggleBtn.addEventListener('click', () => {
    setOpen(!open);
  });

  container.querySelectorAll('[data-menu-item]').forEach((el) => {
    el.addEventListener('click', () => {
      const next = el.getAttribute('data-menu-item');
      if (!next || next === current) return;
      current = next;

      const item = MENU_ITEMS.find((m) => m.key === next);
      if (!item) return;

      container.querySelectorAll('[data-menu-item]').forEach((b) => b.classList.remove('demo-menu-item--active'));
      el.classList.add('demo-menu-item--active');

      title.textContent = item.label;
      text.textContent = item.desc;

      log.innerHTML = `<ion-icon name="navigate-outline"></ion-icon> Navegación simulada a: <code>${item.label}</code>`;

      if (window.innerWidth < 700) setOpen(false);
    });
  });

  setOpen(true);
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
