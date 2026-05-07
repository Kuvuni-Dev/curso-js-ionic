/**
 * @file ion-page.demo.js
 * @description Demo didáctico de ion-page.
 *
 * ion-page es el contenedor de cada pantalla/vista en una aplicación Ionic.
 * Toda ruta del router debe renderizarse dentro de un ion-page.
 *
 * Características clave:
 *  - Ocupa el 100% del ancho y alto disponible.
 *  - Gestiona las animaciones de entrada/salida de página.
 *  - Hace de contexto para el header, content y footer propios de esa vista.
 *  - Es necesario para que las transiciones de navegación funcionen correctamente.
 *
 * Estructura estándar de un ion-page:
 *
 *   ion-page
 *   ├── ion-header
 *   │   └── ion-toolbar → ion-title
 *   ├── ion-content
 *   │   └── (contenido de la vista)
 *   └── ion-footer (opcional)
 *       └── ion-toolbar
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/page
 */

const CODE_BASIC = `<!-- Estructura completa de una ion-page -->
<ion-page>

  <ion-header>
    <ion-toolbar>
      <ion-title>Inicio</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-content class="ion-padding">
    <h2>Bienvenido</h2>
    <p>Contenido de la página de inicio.</p>
    <ion-button expand="block" href="/detalle">
      Ir a detalle
    </ion-button>
  </ion-content>

</ion-page>`;

const CODE_MULTIPLE = `<!-- Cada vista del router tiene su propio ion-page -->

<!-- home.html -->
<ion-page id="home">
  <ion-header>...</ion-header>
  <ion-content>Pantalla de inicio</ion-content>
</ion-page>

<!-- detalle.html -->
<ion-page id="detalle">
  <ion-header>
    <ion-toolbar>
      <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
      </ion-buttons>
      <ion-title>Detalle</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>Pantalla de detalle</ion-content>
</ion-page>`;

const CODE_VANILLA = `/**
 * En apps Ionic vanilla (sin framework), ion-page se puede
 * usar directamente como contenedor de cada vista renderizada.
 *
 * El router de esta app lo hace así:
 */

function renderHome() {
  appRoot.innerHTML = \`
    <ion-page>
      <ion-content class="ion-padding">
        <h2>Inicio</h2>
      </ion-content>
    </ion-page>
  \`;
}`;

/**
 * @returns {string}
 */
export function render() {
  return `
    <section class="demo-page">

      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-page</h2>
        <p class="demo-desc">
          Contenedor de cada vista o pantalla. Gestiona las animaciones de
          transición y sirve como contexto para el header, content y footer
          propios de esa ruta.
        </p>
      </div>

      <!-- ── GRUPO: Diagrama de anatomía ────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Anatomía de una página</h3>
        <p class="demo-group-desc">
          Un <code>ion-page</code> ocupa el 100% del viewport y contiene
          siempre la misma estructura de tres partes.
        </p>
        <div class="demo-anatomy">
          <div class="demo-anatomy__header">
            <code>ion-header</code>
            <span>Fijo — no hace scroll</span>
          </div>
          <div class="demo-anatomy__content">
            <code>ion-content</code>
            <span>Scrollable — ocupa el espacio restante</span>
          </div>
          <div class="demo-anatomy__footer">
            <code>ion-footer</code> <em style="font-size:0.8rem;">(opcional)</em>
            <span>Fijo — no hace scroll</span>
          </div>
        </div>
      </div>

      <!-- ── GRUPO: Estructura básica ──────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Estructura básica</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_BASIC)}</code></pre>
      </div>

      <!-- ── GRUPO: Múltiples páginas ──────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Múltiples páginas y navegación</h3>
        <p class="demo-group-desc">
          Cada ruta tiene su propio <code>ion-page</code>. El router de Ionic
          anima la transición entre ellas (slide, fade, etc.).
        </p>
        <pre class="demo-code"><code>${escapeHtml(CODE_MULTIPLE)}</code></pre>
      </div>

      <!-- ── GRUPO: Ionic vanilla ───────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Ionic vanilla (sin framework)</h3>
        <p class="demo-group-desc">
          En este proyecto usamos un router propio basado en hash.
          Cada función de vista puede renderizar un <code>ion-page</code>
          directamente en el DOM.
        </p>
        <pre class="demo-code"><code>${escapeHtml(CODE_VANILLA)}</code></pre>
      </div>

      <!-- ── GRUPO: Animaciones ─────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Animaciones de transición</h3>
        <ion-list inset="true">
          <ion-item>
            <ion-icon slot="start" name="phone-portrait-outline" color="tertiary"></ion-icon>
            <ion-label>
              <h3>iOS</h3>
              <p>Slide horizontal — la nueva página entra por la derecha.</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" name="logo-android" color="success"></ion-icon>
            <ion-label>
              <h3>Material Design</h3>
              <p>Fade + slide vertical — la nueva página aparece desde abajo.</p>
            </ion-label>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" name="settings-outline" color="medium"></ion-icon>
            <ion-label>
              <h3>Personalizable</h3>
              <p>Se puede sobreescribir con <code>ion-router-link animation</code> o la API de animaciones.</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>

    </section>
  `;
}

/** @param {HTMLElement} _container */
export function init(_container) {}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
