/**
 * @file ion-split-pane.demo.js
 * @description Demo didáctico de ion-split-pane.
 *
 * ion-split-pane divide la pantalla en dos columnas cuando el ancho supera
 * un breakpoint configurable. Es el patrón estándar para apps en tablet
 * o escritorio con menú lateral permanente.
 *
 * Comportamiento:
 *  - Ancho < breakpoint → el panel lateral se oculta (drawer deslizable)
 *  - Ancho ≥ breakpoint → ambos paneles visibles simultáneamente
 *
 * Breakpoints predefinidos:
 *  - "xs"  → siempre visible (≥ 0px)
 *  - "sm"  → ≥ 576px
 *  - "md"  → ≥ 768px  (por defecto)
 *  - "lg"  → ≥ 992px
 *  - "xl"  → ≥ 1200px
 *  - false → siempre oculto (solo drawer)
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/split-pane
 */

const CODE_BASIC = `<!-- Estructura básica de ion-split-pane -->
<ion-app>
  <ion-split-pane content-id="main-content">

    <!-- Panel lateral (menú) -->
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar color="primary">
          <ion-title>Menú</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-item button="true">Inicio</ion-item>
          <ion-item button="true">Perfil</ion-item>
          <ion-item button="true">Configuración</ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>

    <!-- Panel principal — id debe coincidir con content-id -->
    <div id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>Contenido principal</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <p>Aquí va el contenido de la página activa.</p>
      </ion-content>
    </div>

  </ion-split-pane>
</ion-app>`;

const CODE_BREAKPOINT = `<!-- Cambiar el breakpoint de activación -->
<ion-split-pane when="lg" content-id="main-content">
  <!-- visible en pantallas ≥ 992px -->
</ion-split-pane>

<!-- Siempre visible (útil para prototipos de escritorio) -->
<ion-split-pane when="xs" content-id="main-content">
</ion-split-pane>`;

const CODE_EVENT = `<!-- Escuchar cuándo cambia el estado del split pane -->
const splitPane = document.querySelector('ion-split-pane');

splitPane.addEventListener('ionSplitPaneVisible', (e) => {
  const visible = e.detail.visible; // true | false
  console.log('Panel lateral visible:', visible);
});`;

/**
 * @returns {string} HTML del demo.
 */
export function render() {
  return `
    <section class="demo-page">

      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-split-pane</h2>
        <p class="demo-desc">
          Layout de dos columnas para tablet y escritorio. El panel lateral
          se oculta automáticamente en pantallas pequeñas y se convierte en
          un menú deslizable.
        </p>
      </div>

      <!-- ── GRUPO: Diagrama de estructura ──────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">¿Cómo funciona?</h3>
        <p class="demo-group-desc">
          <code>ion-split-pane</code> envuelve el menú lateral y el contenido principal.
          El atributo <code>content-id</code> conecta el split pane con el panel principal.
        </p>
        <div class="demo-splitpane-diagram">
          <div class="demo-splitpane-diagram__sidebar">
            <strong>ion-menu</strong>
            <p style="font-size:0.8rem;margin:6px 0 0;">Panel lateral<br>(content-id="main")</p>
            <div style="margin-top:12px;text-align:left;">
              <div class="demo-splitpane-diagram__item">🏠 Inicio</div>
              <div class="demo-splitpane-diagram__item">👤 Perfil</div>
              <div class="demo-splitpane-diagram__item">⚙️ Ajustes</div>
            </div>
          </div>
          <div class="demo-splitpane-diagram__main">
            <div style="background:var(--ion-color-primary);color:#fff;padding:10px;border-radius:6px 6px 0 0;font-size:0.85rem;">
              ion-toolbar — id="main"
            </div>
            <div style="padding:12px;font-size:0.85rem;">
              <p>Contenido principal activo.</p>
              <p>Aquí se renderiza la página del router.</p>
            </div>
          </div>
        </div>
        <p class="demo-group-desc" style="margin-top:10px;">
          En pantallas grandes ambos paneles son visibles. En pantallas pequeñas
          el panel lateral se convierte en <code>ion-menu</code> deslizable.
        </p>
      </div>

      <!-- ── GRUPO: Breakpoints ─────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Breakpoints (when)</h3>
        <p class="demo-group-desc">
          El atributo <code>when</code> determina a partir de qué ancho se muestra
          el panel lateral en modo split.
        </p>
        <ion-list inset="true">
          <ion-item>
            <ion-label><code>when="xs"</code></ion-label>
            <ion-note slot="end">Siempre visible (≥ 0px)</ion-note>
          </ion-item>
          <ion-item>
            <ion-label><code>when="sm"</code></ion-label>
            <ion-note slot="end">≥ 576px</ion-note>
          </ion-item>
          <ion-item>
            <ion-label><code>when="md"</code></ion-label>
            <ion-note slot="end">≥ 768px (por defecto)</ion-note>
          </ion-item>
          <ion-item>
            <ion-label><code>when="lg"</code></ion-label>
            <ion-note slot="end">≥ 992px</ion-note>
          </ion-item>
          <ion-item>
            <ion-label><code>when="xl"</code></ion-label>
            <ion-note slot="end">≥ 1200px</ion-note>
          </ion-item>
          <ion-item>
            <ion-label><code>when="false"</code></ion-label>
            <ion-note slot="end">Nunca visible (solo drawer)</ion-note>
          </ion-item>
        </ion-list>
        <pre class="demo-code"><code>${escapeHtml(CODE_BREAKPOINT)}</code></pre>
      </div>

      <!-- ── GRUPO: Código completo ─────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Estructura completa</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_BASIC)}</code></pre>
      </div>

      <!-- ── GRUPO: Evento ionSplitPaneVisible ─────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Evento ionSplitPaneVisible</h3>
        <p class="demo-group-desc">
          Se puede reaccionar al cambio de estado del split pane para
          adaptar la UI (ocultar el botón de menú en escritorio, por ejemplo).
        </p>
        <pre class="demo-code"><code>${escapeHtml(CODE_EVENT)}</code></pre>
      </div>

    </section>
  `;
}

/**
 * @param {HTMLElement} _container
 */
export function init(_container) {}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
