/**
 * @file ion-refresher.demo.js
 * @description Demo didáctico del componente <ion-refresher> de Ionic.
 *
 * ion-refresher implementa el gesto "pull-to-refresh": el usuario arrastra
 * la lista hacia abajo para recargar contenido. Emite ionRefresh.
 * Debe llamarse a event.target.complete() cuando los datos están listos.
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/refresher
 */

const CODE_EXAMPLE = `<!-- Se coloca al inicio de ion-content -->
<ion-content>

  <ion-refresher slot="fixed">
    <ion-refresher-content
      pulling-icon="chevron-down-circle-outline"
      pulling-text="Arrastra para actualizar"
      refreshing-spinner="circles"
      refreshing-text="Actualizando…">
    </ion-refresher-content>
  </ion-refresher>

  <!-- Resto del contenido -->
  <ion-list>...</ion-list>

</ion-content>

<script>
  const refresher = document.querySelector('ion-refresher');

  refresher.addEventListener('ionRefresh', async (e) => {
    // Simular llamada a API
    const newData = await fetchLatestData();
    updateUI(newData);

    // SIEMPRE llamar a complete() para cerrar el refresher
    e.target.complete();
  });
</script>`;

// Noticias simuladas para "recargar"
const NEWS_BANKS = [
  [
    { id: 1, title: 'Ionic 8 lanzado con soporte para Signals',       tag: 'Release', time: 'Hace 5 min',  icon: 'rocket-outline',    color: '#7B61FF' },
    { id: 2, title: 'Angular 18 mejora el rendimiento un 30%',        tag: 'Angular', time: 'Hace 12 min', icon: 'logo-angular',      color: '#DD0031' },
    { id: 3, title: 'Capacitor 6 simplifica plugins nativos',         tag: 'Capacitor', time: 'Hace 1h',   icon: 'hardware-chip-outline', color: '#22C55E' },
    { id: 4, title: 'Nuevos componentes web en Chrome 125',           tag: 'Web',     time: 'Hace 2h',    icon: 'globe-outline',     color: '#3B82F6' },
    { id: 5, title: 'TypeScript 5.5 añade type predicates inferidos', tag: 'TypeScript', time: 'Hace 3h', icon: 'code-slash-outline', color: '#3178C6' },
  ],
  [
    { id: 6, title: 'React Native 0.75 mejora la arquitectura',       tag: 'React',   time: 'Hace 2 min',  icon: 'logo-react',        color: '#61DAFB' },
    { id: 7, title: 'Vite 5 reduce tiempos de build a la mitad',      tag: 'Tooling', time: 'Hace 8 min',  icon: 'flash-outline',     color: '#F59E0B' },
    { id: 8, title: 'Nuevo estándar CSS Houdini disponible',          tag: 'CSS',     time: 'Hace 30 min', icon: 'color-palette-outline', color: '#EC4899' },
    { id: 9, title: 'Node.js 22 entra en mantenimiento activo',       tag: 'Node',    time: 'Hace 1h',     icon: 'server-outline',    color: '#689F63' },
    { id: 10, title: 'Deno 2.0 compatible con paquetes npm',          tag: 'Runtime', time: 'Hace 2h',     icon: 'terminal-outline',  color: '#000' },
  ],
  [
    { id: 11, title: 'Web Components ganan adopción en enterprise',    tag: 'Web',     time: 'Hace 1 min',  icon: 'layers-outline',    color: '#F59E0B' },
    { id: 12, title: 'Tailwind CSS 4 usa motor CSS nativo',           tag: 'CSS',     time: 'Hace 15 min', icon: 'brush-outline',     color: '#06B6D4' },
    { id: 13, title: 'Google I/O 2026: todas las novedades web',      tag: 'Eventos', time: 'Hace 45 min', icon: 'calendar-outline',  color: '#EA4335' },
    { id: 14, title: 'Safari añade soporte a View Transitions',       tag: 'Browser', time: 'Hace 2h',     icon: 'logo-apple',        color: '#555' },
    { id: 15, title: 'Stencil.js 4 mejora el soporte para SSR',       tag: 'Stencil', time: 'Hace 3h',     icon: 'construct-outline', color: '#6366F1' },
  ],
];

function newsCard(item) {
  return `
  <div class="demo-rf-card">
    <div class="demo-rf-card-icon" style="background:${item.color}20;color:${item.color}">
      <ion-icon name="${item.icon}"></ion-icon>
    </div>
    <div class="demo-rf-card-body">
      <div class="demo-rf-card-top">
        <span class="demo-rf-tag" style="background:${item.color}20;color:${item.color}">${item.tag}</span>
        <span class="demo-rf-time">${item.time}</span>
      </div>
      <p class="demo-rf-title">${item.title}</p>
    </div>
  </div>`;
}

export function render() {
  return `
    <section class="demo-page">

      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-refresher</h2>
        <p class="demo-desc">
          Gesto <em>pull-to-refresh</em>: el usuario arrastra hacia abajo para
          recargar contenido. Emite <code>ionRefresh</code> y requiere llamar a
          <code>event.target.complete()</code> cuando los datos estén listos.
        </p>
      </div>

      <!-- ── GRUPO: Flujo del componente ───────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Flujo del gesto</h3>
        <div class="demo-inf-flow">
          <div class="demo-inf-flow-step">
            <ion-icon name="arrow-down-outline" class="demo-inf-flow-icon"></ion-icon>
            <span>Pull hacia abajo</span>
          </div>
          <ion-icon name="arrow-forward-outline" class="demo-inf-flow-arrow"></ion-icon>
          <div class="demo-inf-flow-step">
            <ion-icon name="refresh-outline" class="demo-inf-flow-icon"></ion-icon>
            <span>Spinner visible</span>
          </div>
          <ion-icon name="arrow-forward-outline" class="demo-inf-flow-arrow"></ion-icon>
          <div class="demo-inf-flow-step">
            <ion-icon name="cloud-download-outline" class="demo-inf-flow-icon"></ion-icon>
            <span>Petición a API</span>
          </div>
          <ion-icon name="arrow-forward-outline" class="demo-inf-flow-arrow"></ion-icon>
          <div class="demo-inf-flow-step">
            <ion-icon name="checkmark-circle-outline" class="demo-inf-flow-icon demo-inf-flow-icon--success"></ion-icon>
            <span><code>complete()</code></span>
          </div>
        </div>
      </div>

      <!-- ── GRUPO: Demo interactivo ────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Demo interactivo — Feed de noticias</h3>
        <p class="demo-group-desc">
          Arrastra la lista hacia abajo o pulsa el botón para simular
          el gesto pull-to-refresh y recargar las noticias.
        </p>

        <!-- Zona de pull simulada -->
        <div class="demo-rf-area" id="rf-area">
          <!-- Indicador pull -->
          <div class="demo-rf-puller" id="rf-puller">
            <div class="demo-rf-puller-inner" id="rf-puller-inner">
              <ion-icon name="chevron-down-circle-outline" id="rf-puller-icon"></ion-icon>
              <span id="rf-puller-text">Arrastra para actualizar</span>
            </div>
          </div>

          <!-- Lista de noticias -->
          <div class="demo-rf-list" id="rf-list">
            ${NEWS_BANKS[0].map(newsCard).join('')}
          </div>
        </div>

        <!-- Log del evento -->
        <div class="demo-sl-log" id="rf-log">
          Arrastra la lista hacia abajo para ver el evento ionRefresh…
        </div>

        <!-- Botón manual -->
        <ion-button size="small" fill="outline" id="rf-btn">
          <ion-icon slot="start" name="refresh-outline"></ion-icon>
          Simular ionRefresh
        </ion-button>
      </div>

      <!-- ── GRUPO: Atributos clave ─────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Atributos clave</h3>
        <div class="demo-attr-table">
          <div class="demo-attr-row">
            <code>slot="fixed"</code>
            <span>El refresher siempre debe ir como primer hijo de <code>ion-content</code>.</span>
          </div>
          <div class="demo-attr-row">
            <code>pulling-icon</code>
            <span>Icono mostrado mientras se arrastra. Por defecto: flecha circular.</span>
          </div>
          <div class="demo-attr-row">
            <code>pulling-text</code>
            <span>Texto durante el pull (antes de alcanzar el umbral).</span>
          </div>
          <div class="demo-attr-row">
            <code>refreshing-spinner</code>
            <span>Tipo de spinner durante la carga: <code>circles</code> · <code>crescent</code> · <code>bubbles</code> · etc.</span>
          </div>
          <div class="demo-attr-row">
            <code>ionRefresh</code>
            <span>Evento disparado cuando el usuario alcanza el umbral. <code>e.target.complete()</code> cierra el refresher.</span>
          </div>
          <div class="demo-attr-row">
            <code>closeDuration</code>
            <span>Tiempo en ms para cerrar el refresher tras llamar a <code>complete()</code>. Por defecto: <code>280ms</code>.</span>
          </div>
        </div>
      </div>

      <!-- ── CÓDIGO ─────────────────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Código de ejemplo</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_EXAMPLE)}</code></pre>
      </div>

    </section>
  `;
}

export function init(container) {
  let bankIndex    = 0;
  let refreshing   = false;
  let pullY        = 0;
  let touchStartY  = 0;
  let isPulling    = false;

  const area       = container.querySelector('#rf-area');
  const list       = container.querySelector('#rf-list');
  const puller     = container.querySelector('#rf-puller');
  const pullerText = container.querySelector('#rf-puller-text');
  const pullerIcon = container.querySelector('#rf-puller-icon');
  const log        = container.querySelector('#rf-log');
  const btn        = container.querySelector('#rf-btn');

  const PULL_THRESHOLD = 64; // px para activar

  function simulateRefresh() {
    if (refreshing) return;
    refreshing = true;

    // Estado: refrescando
    puller.style.height   = PULL_THRESHOLD + 'px';
    pullerIcon.name       = 'refresh-outline';
    pullerIcon.style.animation = 'rf-spin 0.8s linear infinite';
    pullerText.textContent = 'Actualizando…';
    btn.disabled = true;

    log.innerHTML = `<ion-icon name="refresh-outline" style="vertical-align:middle"></ion-icon>
      ionRefresh disparado — esperando <code>complete()</code>…`;

    setTimeout(() => {
      // Cambiar al siguiente banco de noticias
      bankIndex = (bankIndex + 1) % NEWS_BANKS.length;
      list.innerHTML = NEWS_BANKS[bankIndex].map(newsCard).join('');

      // Animación de entrada
      list.style.opacity = '0';
      requestAnimationFrame(() => {
        list.style.transition = 'opacity 0.3s';
        list.style.opacity    = '1';
      });

      // Cerrar puller
      puller.style.height = '0';
      pullerIcon.style.animation = '';
      pullerText.textContent = 'Arrastra para actualizar';
      pullerIcon.name = 'chevron-down-circle-outline';

      refreshing = false;
      btn.disabled = false;

      log.innerHTML =
        `<ion-icon name="checkmark-circle-outline" style="vertical-align:middle;color:var(--ion-color-success)"></ion-icon>
        ionRefresh completado — <code>complete()</code> llamado. Banco ${bankIndex + 1}/${NEWS_BANKS.length} cargado.`;
    }, 1200);
  }

  // ── Gesto pull en la lista ─────────────────────────────────
  area.addEventListener('touchstart', (e) => {
    if (refreshing) return;
    touchStartY = e.touches[0].clientY;
    isPulling   = area.scrollTop === 0;
  }, { passive: true });

  area.addEventListener('touchmove', (e) => {
    if (!isPulling || refreshing) return;
    pullY = Math.max(0, Math.min(PULL_THRESHOLD * 1.5, e.touches[0].clientY - touchStartY));
    puller.style.height = pullY + 'px';
    puller.style.transition = 'none';

    if (pullY >= PULL_THRESHOLD) {
      pullerIcon.name = 'refresh-outline';
      pullerText.textContent = 'Suelta para actualizar';
    } else {
      pullerIcon.name = 'chevron-down-circle-outline';
      pullerText.textContent = 'Arrastra para actualizar';
    }
  }, { passive: true });

  area.addEventListener('touchend', () => {
    if (!isPulling || refreshing) return;
    isPulling = false;
    if (pullY >= PULL_THRESHOLD) {
      simulateRefresh();
    } else {
      puller.style.transition = 'height 0.25s ease';
      puller.style.height = '0';
    }
    pullY = 0;
  });

  // Botón manual
  btn.addEventListener('click', simulateRefresh);
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
