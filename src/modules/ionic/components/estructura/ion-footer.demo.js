/**
 * @file ion-footer.demo.js
 * @description Demo didáctico de ion-footer.
 *
 * ion-footer es el componente simétrico a ion-header. Se coloca al final
 * de la página y permanece fijo en la parte inferior mientras el contenido
 * hace scroll.
 *
 * Dentro de ion-footer se usa siempre ion-toolbar para obtener el estilo
 * correcto. Acepta también el atributo `translucent` en iOS.
 *
 * Estructura típica de una página Ionic completa:
 *
 *   ion-header
 *   └── ion-toolbar → ion-title + ion-buttons
 *
 *   ion-content
 *   └── (contenido de la página)
 *
 *   ion-footer
 *   └── ion-toolbar → ion-buttons o ion-searchbar
 *
 * Documentación oficial:
 * https://ionicframework.com/docs/api/footer
 */

const CODE_BASIC = `<ion-footer>
  <ion-toolbar>
    <ion-title>Pie de página</ion-title>
  </ion-toolbar>
</ion-footer>`;

const CODE_BUTTONS = `<!-- Footer con botones de acción -->
<ion-footer>
  <ion-toolbar>
    <ion-buttons slot="start">
      <ion-button fill="clear">Cancelar</ion-button>
    </ion-buttons>
    <ion-buttons slot="end">
      <ion-button fill="solid" color="primary">Guardar</ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-footer>`;

const CODE_FULL_PAGE = `<!-- Estructura completa de una página Ionic -->
<ion-header>
  <ion-toolbar>
    <ion-title>Mi formulario</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content class="ion-padding">
  <ion-list>
    <ion-item>
      <ion-label position="stacked">Nombre</ion-label>
      <ion-input type="text"></ion-input>
    </ion-item>
    <ion-item>
      <ion-label position="stacked">Email</ion-label>
      <ion-input type="email"></ion-input>
    </ion-item>
  </ion-list>
</ion-content>

<ion-footer>
  <ion-toolbar>
    <ion-buttons slot="end" style="padding: 8px;">
      <ion-button expand="block" fill="solid" color="primary">
        Enviar formulario
      </ion-button>
    </ion-buttons>
  </ion-toolbar>
</ion-footer>`;

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
        <h2>ion-footer</h2>
        <p class="demo-desc">
          Pie fijo de página. Simétrico a <code>ion-header</code>.
          Permanece visible mientras el contenido hace scroll.
        </p>
      </div>

      <!-- ── GRUPO: Footer básico ───────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Footer básico</h3>
        <p class="demo-group-desc">
          Igual que el header, siempre debe contener al menos una
          <code>ion-toolbar</code> para obtener el estilo correcto.
        </p>
        <div class="demo-preview">
          <ion-footer style="position:relative;">
            <ion-toolbar>
              <ion-title>Pie de página</ion-title>
            </ion-toolbar>
          </ion-footer>
        </div>
        <pre class="demo-code"><code>${escapeHtml(CODE_BASIC)}</code></pre>
      </div>

      <!-- ── GRUPO: Footer con botones ─────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Footer con botones de acción</h3>
        <p class="demo-group-desc">
          Patrón común en formularios: botón "Cancelar" a la izquierda y
          "Guardar" a la derecha. Los mismos slots que <code>ion-header</code>.
        </p>
        <div class="demo-preview">
          <ion-footer style="position:relative;">
            <ion-toolbar>
              <ion-buttons slot="start">
                <ion-button fill="clear">Cancelar</ion-button>
              </ion-buttons>
              <ion-buttons slot="end">
                <ion-button fill="solid" color="primary" id="btn-footer-guardar">Guardar</ion-button>
              </ion-buttons>
            </ion-toolbar>
          </ion-footer>
        </div>
        <pre class="demo-code"><code>${escapeHtml(CODE_BUTTONS)}</code></pre>
      </div>

      <!-- ── GRUPO: Colores ─────────────────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Colores</h3>
        <p class="demo-group-desc">
          El atributo <code>color</code> en <code>ion-toolbar</code> funciona
          igual dentro del footer.
        </p>
        <div class="demo-row" style="flex-direction:column;gap:6px;">
          <div class="demo-preview" style="margin-bottom:0;">
            <ion-footer style="position:relative;">
              <ion-toolbar color="primary" style="--min-height:44px;">
                <ion-title>color="primary"</ion-title>
              </ion-toolbar>
            </ion-footer>
          </div>
          <div class="demo-preview" style="margin-bottom:0;">
            <ion-footer style="position:relative;">
              <ion-toolbar color="success" style="--min-height:44px;">
                <ion-title>color="success"</ion-title>
              </ion-toolbar>
            </ion-footer>
          </div>
        </div>
      </div>

      <!-- ── GRUPO: Estructura completa ────────────────────── -->
      <div class="demo-group">
        <h3 class="demo-group-title">Estructura completa de página</h3>
        <p class="demo-group-desc">
          Así queda una página Ionic típica con header, content y footer.
        </p>
        <pre class="demo-code"><code>${escapeHtml(CODE_FULL_PAGE)}</code></pre>
      </div>

    </section>
  `;
}

/**
 * @param {HTMLElement} container
 */
export function init(container) {
  const btnGuardar = container.querySelector('#btn-footer-guardar');

  btnGuardar.addEventListener('click', () => {
    const original = btnGuardar.textContent;
    btnGuardar.textContent = '¡Guardado!';
    btnGuardar.disabled = true;
    setTimeout(() => {
      btnGuardar.textContent = original;
      btnGuardar.disabled = false;
    }, 2000);
  });
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
