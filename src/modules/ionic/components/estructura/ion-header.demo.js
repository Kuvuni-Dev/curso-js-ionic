/**
 * @file ion-header.demo.js
 * @description Demo didáctico de ion-header, ion-toolbar, ion-title e ion-buttons.
 *
 * Estos 4 componentes forman la cabecera de una página Ionic y casi siempre
 * se usan juntos. La jerarquía típica es:
 *
 *   ion-header
 *   └── ion-toolbar
 *       ├── ion-buttons (slot="start")
 *       ├── ion-title
 *       └── ion-buttons (slot="end")
 *
 * ion-header: define la zona de cabecera fija. Acepta el atributo `translucent`
 *             para un efecto de desenfoque (solo iOS).
 * ion-toolbar: barra horizontal dentro del header o footer.
 * ion-title:   título centrado (iOS) o alineado a la izquierda (Android/MD).
 * ion-buttons: agrupa botones a izquierda o derecha de la toolbar.
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/header
 * https://ionicframework.com/docs/api/toolbar
 * https://ionicframework.com/docs/api/title
 * https://ionicframework.com/docs/api/buttons
 */

const CODE_BASIC = `<ion-header>
  <ion-toolbar>
    <ion-title>Mi página</ion-title>
  </ion-toolbar>
</ion-header>`;

const CODE_BACK = `<ion-header>
  <ion-toolbar>

    <!-- slot="start" → izquierda del título -->
    <ion-buttons slot="start">
      <ion-back-button default-href="/home"></ion-back-button>
    </ion-buttons>

    <ion-title>Detalle</ion-title>

    <!-- slot="end" → derecha del título -->
    <ion-buttons slot="end">
      <ion-button fill="clear">
        <ion-icon slot="icon-only" name="share-outline"></ion-icon>
      </ion-button>
    </ion-buttons>

  </ion-toolbar>
</ion-header>`;

const CODE_MULTI = `<!-- Se pueden apilar varias toolbars dentro de un header -->
<ion-header>
  <ion-toolbar color="primary">
    <ion-title>Título principal</ion-title>
  </ion-toolbar>
  <ion-toolbar>
    <ion-searchbar placeholder="Buscar..."></ion-searchbar>
  </ion-toolbar>
</ion-header>`;

const CODE_COLOR = `<!-- El atributo color aplica el token Ionic a toda la toolbar -->
<ion-toolbar color="primary">...</ion-toolbar>
<ion-toolbar color="secondary">...</ion-toolbar>
<ion-toolbar color="danger">...</ion-toolbar>`;

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
        <h2>ion-header · ion-toolbar · ion-title · ion-buttons</h2>
        <p class="demo-desc">
          La cabecera de una página Ionic siempre sigue la misma jerarquía:
          <code>ion-header → ion-toolbar → ion-title + ion-buttons</code>.
        </p>
      </div>

      <!-- ── GRUPO: Header básico ───────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Header básico</h3>
        <p class="demo-group-desc">
          Estructura mínima. <code>ion-header</code> actúa como contenedor fijo
          y <code>ion-toolbar</code> proporciona el fondo y la altura estándar.
        </p>
        <div class="demo-preview">
          <ion-header mode="ios" style="position:relative;">
            <ion-toolbar>
              <ion-title>Mi página</ion-title>
            </ion-toolbar>
          </ion-header>
        </div>
        <pre class="demo-code"><code>${escapeHtml(CODE_BASIC)}</code></pre>
      </div>

      <!-- ── GRUPO: Con ion-buttons ─────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Con ion-buttons</h3>
        <p class="demo-group-desc">
          <code>ion-buttons</code> con <code>slot="start"</code> coloca botones a la izquierda
          del título y con <code>slot="end"</code> a la derecha.
        </p>
        <div class="demo-preview">
          <ion-header style="position:relative;">
            <ion-toolbar>
              <ion-buttons slot="start">
                <ion-button fill="clear">
                  <ion-icon slot="icon-only" name="arrow-back-outline"></ion-icon>
                </ion-button>
              </ion-buttons>
              <ion-title>Detalle</ion-title>
              <ion-buttons slot="end">
                <ion-button fill="clear">
                  <ion-icon slot="icon-only" name="share-outline"></ion-icon>
                </ion-button>
                <ion-button fill="clear">
                  <ion-icon slot="icon-only" name="ellipsis-vertical-outline"></ion-icon>
                </ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-header>
        </div>
        <pre class="demo-code"><code>${escapeHtml(CODE_BACK)}</code></pre>
      </div>

      <!-- ── GRUPO: Múltiples toolbars ─────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Múltiples toolbars</h3>
        <p class="demo-group-desc">
          Un <code>ion-header</code> puede contener varias toolbars apiladas.
          Útil para combinar título y barra de búsqueda.
        </p>
        <div class="demo-preview">
          <ion-header style="position:relative;">
            <ion-toolbar color="primary">
              <ion-title>Búsqueda</ion-title>
            </ion-toolbar>
            <ion-toolbar>
              <ion-item style="--background:transparent;">
                <ion-icon slot="start" name="search-outline"></ion-icon>
                <ion-input placeholder="Buscar componente..."></ion-input>
              </ion-item>
            </ion-toolbar>
          </ion-header>
        </div>
        <pre class="demo-code"><code>${escapeHtml(CODE_MULTI)}</code></pre>
      </div>

      <!-- ── GRUPO: Colores de toolbar ─────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Colores de toolbar</h3>
        <p class="demo-group-desc">
          El atributo <code>color</code> en <code>ion-toolbar</code> aplica el
          fondo y ajusta automáticamente el contraste del texto.
        </p>
        <div class="demo-row" style="flex-direction:column;gap:6px;">
          <div class="demo-preview" style="margin-bottom:0;">
            <ion-toolbar color="primary" style="--min-height:44px;">
              <ion-title>color="primary"</ion-title>
            </ion-toolbar>
          </div>
          <div class="demo-preview" style="margin-bottom:0;">
            <ion-toolbar color="secondary" style="--min-height:44px;">
              <ion-title>color="secondary"</ion-title>
            </ion-toolbar>
          </div>
          <div class="demo-preview" style="margin-bottom:0;">
            <ion-toolbar color="tertiary" style="--min-height:44px;">
              <ion-title>color="tertiary"</ion-title>
            </ion-toolbar>
          </div>
          <div class="demo-preview" style="margin-bottom:0;">
            <ion-toolbar color="danger" style="--min-height:44px;">
              <ion-title>color="danger"</ion-title>
            </ion-toolbar>
          </div>
        </div>
        <pre class="demo-code"><code>${escapeHtml(CODE_COLOR)}</code></pre>
      </div>

    </section>
  `;
}

/**
 * No requiere listeners adicionales para este demo.
 * @param {HTMLElement} _container
 */
export function init(_container) {}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
