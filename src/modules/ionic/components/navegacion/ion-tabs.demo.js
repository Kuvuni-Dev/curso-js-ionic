/**
 * @file ion-tabs.demo.js
 * @description Demo didáctico de <ion-tabs>, <ion-tab-bar> e <ion-tab-button>.
 *
 * Nota: en esta app CDN se simula la UI para evitar dependencias de chunks
 * de lazy-loading en componentes no básicos. El código de ejemplo muestra
 * la estructura real recomendada en Ionic.
 */

const CODE_EXAMPLE = `<ion-tabs>
  <ion-router-outlet></ion-router-outlet>

  <ion-tab-bar slot="bottom">
    <ion-tab-button tab="home" href="/tabs/home">
      <ion-icon name="home-outline"></ion-icon>
      <ion-label>Inicio</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="search" href="/tabs/search">
      <ion-icon name="search-outline"></ion-icon>
      <ion-label>Buscar</ion-label>
    </ion-tab-button>

    <ion-tab-button tab="profile" href="/tabs/profile">
      <ion-icon name="person-outline"></ion-icon>
      <ion-label>Perfil</ion-label>
    </ion-tab-button>
  </ion-tab-bar>
</ion-tabs>`;

const TABS = [
  {
    key: 'home',
    label: 'Inicio',
    icon: 'home-outline',
    color: '#3B82F6',
    title: 'Pantalla principal',
    text: 'Aquí suele vivir el dashboard, accesos rápidos y resúmenes del usuario.',
  },
  {
    key: 'search',
    label: 'Buscar',
    icon: 'search-outline',
    color: '#22C55E',
    title: 'Búsqueda global',
    text: 'La pestaña de búsqueda concentra filtros, histórico y resultados.',
  },
  {
    key: 'profile',
    label: 'Perfil',
    icon: 'person-outline',
    color: '#EC4899',
    title: 'Cuenta y ajustes',
    text: 'Configuraciones, datos personales y preferencias de la app.',
  },
  {
    key: 'settings',
    label: 'Ajustes',
    icon: 'settings-outline',
    color: '#F59E0B',
    title: 'Preferencias avanzadas',
    text: 'Seguridad, notificaciones y opciones técnicas por módulo.',
  },
];

function tabButton(tab, active) {
  return `
    <button class="demo-tab-btn${active ? ' demo-tab-btn--active' : ''}" data-tab="${tab.key}">
      <ion-icon name="${tab.icon}"></ion-icon>
      <span>${tab.label}</span>
      ${active ? '<i class="demo-tab-indicator"></i>' : ''}
    </button>
  `;
}

export function render() {
  const active = TABS[0];

  return `
    <section class="demo-page">
      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-tabs</h2>
        <p class="demo-desc">
          <code>ion-tabs</code> organiza la app en secciones de primer nivel.
          La barra inferior (<code>ion-tab-bar</code>) contiene botones
          (<code>ion-tab-button</code>) para saltar entre rutas hermanas.
        </p>
      </div>

      <div class="demo-group">
        <h3 class="demo-group-title">Anatomía: tabs en 3 capas</h3>
        <div class="demo-nav-anatomy">
          <div class="demo-nav-layer demo-nav-layer--top">
            <ion-icon name="layers-outline"></ion-icon>
            <span>ion-tabs</span>
          </div>
          <div class="demo-nav-layer demo-nav-layer--middle">
            <ion-icon name="albums-outline"></ion-icon>
            <span>ion-router-outlet (contenido)</span>
          </div>
          <div class="demo-nav-layer demo-nav-layer--bottom">
            <ion-icon name="reorder-four-outline"></ion-icon>
            <span>ion-tab-bar + ion-tab-button</span>
          </div>
        </div>
      </div>

      <div class="demo-group">
        <h3 class="demo-group-title">Demo interactivo: shell con tabs</h3>
        <p class="demo-group-desc">
          Pulsa una pestaña para cambiar la vista activa.
          En una app real, cada tab suele mapear a una ruta hija.
        </p>

        <div class="demo-tab-shell">
          <div class="demo-tab-content" id="tab-content">
            <div class="demo-tab-badge" id="tab-badge" style="background:${active.color}20;color:${active.color}">
              ${active.label}
            </div>
            <h4 id="tab-title">${active.title}</h4>
            <p id="tab-text">${active.text}</p>
          </div>

          <div class="demo-tab-bar" id="tab-bar">
            ${TABS.map((t, i) => tabButton(t, i === 0)).join('')}
          </div>
        </div>

        <div class="demo-nav-log" id="tab-log">
          Evento simulado: tabChange -> home
        </div>
      </div>

      <div class="demo-group">
        <h3 class="demo-group-title">Buenas prácticas</h3>
        <div class="demo-attr-table">
          <div class="demo-attr-row">
            <code>4-5 tabs máximo</code>
            <span>Si hay más secciones, usa menú lateral o subnavegación.</span>
          </div>
          <div class="demo-attr-row">
            <code>Estados persistentes por tab</code>
            <span>Cada tab puede conservar su propio stack de navegación.</span>
          </div>
          <div class="demo-attr-row">
            <code>Icono + etiqueta</code>
            <span>Facilita escaneo rápido y mejora accesibilidad.</span>
          </div>
          <div class="demo-attr-row">
            <code>tab="..."</code>
            <span>Identificador único de cada <code>ion-tab-button</code>.</span>
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
  let current = TABS[0].key;
  const content = container.querySelector('#tab-content');
  const badge = container.querySelector('#tab-badge');
  const title = container.querySelector('#tab-title');
  const text = container.querySelector('#tab-text');
  const log = container.querySelector('#tab-log');

  container.querySelectorAll('[data-tab]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = btn.getAttribute('data-tab');
      if (!next || next === current) return;

      current = next;
      const tab = TABS.find((t) => t.key === next);
      if (!tab) return;

      container.querySelectorAll('[data-tab]').forEach((b) => b.classList.remove('demo-tab-btn--active'));
      btn.classList.add('demo-tab-btn--active');

      content.classList.add('demo-nav-fade');
      setTimeout(() => {
        badge.textContent = tab.label;
        badge.style.background = `${tab.color}20`;
        badge.style.color = tab.color;
        title.textContent = tab.title;
        text.textContent = tab.text;
        content.classList.remove('demo-nav-fade');
      }, 120);

      log.innerHTML = `<ion-icon name="swap-horizontal-outline"></ion-icon> Evento simulado: <code>tabChange</code> -> ${tab.key}`;
    });
  });
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
