/**
 * @file ion-list.demo.js
 * @description Demo didáctico de los componentes <ion-list> e <ion-item> de Ionic.
 *
 * ion-list es el contenedor de listas. Cada elemento de la lista es un ion-item.
 * Se pueden combinar con iconos, avatares, etiquetas y botones de acción.
 *
 * Componentes relacionados:
 *  - ion-list        → contenedor
 *  - ion-item        → fila individual
 *  - ion-label       → texto principal y secundario
 *  - ion-icon        → iconos en slots start/end
 *  - ion-badge       → contador/etiqueta numérica
 *  - ion-note        → texto secundario pequeño
 *  - ion-item-sliding → item con acciones deslizables
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/list
 * https://ionicframework.com/docs/api/item
 */

const CODE_EXAMPLE = `<!-- Lista básica -->
<ion-list>
  <ion-item>
    <ion-label>Elemento simple</ion-label>
  </ion-item>
  <ion-item>
    <ion-label>
      <h2>Título</h2>
      <h3>Subtítulo</h3>
      <p>Descripción secundaria</p>
    </ion-label>
  </ion-item>
</ion-list>

<!-- Lista con iconos -->
<ion-list>
  <ion-item>
    <ion-icon slot="start" name="home-outline"></ion-icon>
    <ion-label>Inicio</ion-label>
  </ion-item>
  <ion-item>
    <ion-icon slot="start" name="settings-outline" color="medium"></ion-icon>
    <ion-label>Configuración</ion-label>
    <ion-badge slot="end" color="danger">3</ion-badge>
  </ion-item>
</ion-list>

<!-- Lista con líneas (lines) -->
<ion-list lines="full">   <!-- full | inset | none -->
  <ion-item>...</ion-item>
</ion-list>

<!-- Item como botón navegable -->
<ion-item button="true" detail="true">
  <ion-label>Ir a detalle</ion-label>
</ion-item>`;

/**
 * Genera el HTML completo del demo.
 * @returns {string} HTML listo para insertar con innerHTML.
 */
export function render() {
  return `
    <section class="demo-page">

      <div class="demo-header">
        <ion-button fill="clear" onclick="location.hash='#/ionic'">
          <ion-icon slot="start" name="arrow-back-outline"></ion-icon>
          Volver al catálogo
        </ion-button>
        <h2>ion-list / ion-item</h2>
        <p class="demo-desc">
          Contenedor de listas. Cada fila es un <code>ion-item</code> que admite
          iconos, textos, badges y acciones deslizables.
        </p>
      </div>

      <!-- ── GRUPO: Lista básica ────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Lista básica</h3>
        <p class="demo-group-desc">
          <code>ion-label</code> admite <code>h2</code>, <code>h3</code> y <code>p</code>
          para crear jerarquía de texto dentro de cada item.
        </p>
        <ion-list inset="true">
          <ion-item>
            <ion-label>Elemento simple</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>
              <h2>Título del elemento</h2>
              <h3>Subtítulo opcional</h3>
              <p>Descripción secundaria en color gris</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>

      <!-- ── GRUPO: Con iconos y badges ────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Con iconos y badges</h3>
        <p class="demo-group-desc">
          Usa <code>slot="start"</code> para iconos a la izquierda y
          <code>slot="end"</code> para elementos a la derecha (badge, nota, botón).
        </p>
        <ion-list inset="true">
          <ion-item>
            <ion-icon slot="start" name="home-outline" color="primary"></ion-icon>
            <ion-label>Inicio</ion-label>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" name="notifications-outline" color="warning"></ion-icon>
            <ion-label>Notificaciones</ion-label>
            <ion-badge slot="end" color="danger">5</ion-badge>
          </ion-item>
          <ion-item>
            <ion-icon slot="start" name="settings-outline" color="medium"></ion-icon>
            <ion-label>Configuración</ion-label>
            <ion-note slot="end">v2.0</ion-note>
          </ion-item>
        </ion-list>
      </div>

      <!-- ── GRUPO: Variantes de líneas ────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Variantes de líneas (lines)</h3>
        <p class="demo-group-desc">
          <code>lines="full"</code> → línea de borde a borde.<br>
          <code>lines="inset"</code> → línea con margen izquierdo (por defecto).<br>
          <code>lines="none"</code> → sin líneas separadoras.
        </p>
        <ion-list lines="none" inset="true">
          <ion-item>
            <ion-label>Sin líneas (lines="none")</ion-label>
          </ion-item>
          <ion-item>
            <ion-label>Segundo elemento</ion-label>
          </ion-item>
        </ion-list>
      </div>

      <!-- ── GRUPO: Items clicables ────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Items clicables</h3>
        <p class="demo-group-desc">
          <code>button="true"</code> convierte el item en botón.<br>
          <code>detail="true"</code> añade la flecha de navegación a la derecha.
        </p>
        <ion-list inset="true">
          <ion-item button="true" detail="true" id="item-nav-js">
            <ion-icon slot="start" name="logo-javascript" color="warning"></ion-icon>
            <ion-label>Ir a JavaScript</ion-label>
          </ion-item>
          <ion-item button="true" detail="true" id="item-nav-ionic">
            <ion-icon slot="start" name="phone-portrait-outline" color="primary"></ion-icon>
            <ion-label>Ir al catálogo Ionic</ion-label>
          </ion-item>
        </ion-list>
      </div>

      <!-- ── BLOQUE DE CÓDIGO ───────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Código de ejemplo</h3>
        <pre class="demo-code"><code>${escapeHtml(CODE_EXAMPLE)}</code></pre>
      </div>

    </section>
  `;
}

/**
 * Adjunta los listeners interactivos del demo.
 * @param {HTMLElement} container
 */
export function init(container) {
  // Navegación desde los items clicables del demo
  container.querySelector('#item-nav-js')?.addEventListener('click', () => {
    location.hash = '#/js';
  });
  container.querySelector('#item-nav-ionic')?.addEventListener('click', () => {
    location.hash = '#/ionic';
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
